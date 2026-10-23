import React from 'react';
import type { Metadata } from 'next';
import { getAllEvents } from '@/lib/events';
import { EventsHeroSection } from '@/components/sections/events/EventsHeroSection';
import { EventsFilterAndListSection } from '@/components/sections/events/EventsFilterAndListSection';
import { EventsWhyAttendSection } from '@/components/sections/events/EventsWhyAttendSection';
import { EventsCoachesSection } from '@/components/sections/events/EventsCoachesSection';
import { EventsFaqSection } from '@/components/sections/events/EventsFaqSection';
import { EventsCtaSection } from '@/components/sections/events/EventsCtaSection';

export const revalidate = 3600; // ISR 1 hour

interface EventsPageProps {
  searchParams?: Promise<{ coach?: string }>;
}

export async function generateMetadata({ searchParams }: EventsPageProps): Promise<Metadata> {
  const resolved = searchParams ? await searchParams : {};
  const coachSlug = resolved.coach;

  const title = coachSlug
    ? `رویدادها و وبینارهای کوچ در بلومیا کلاب`
    : 'رویدادها، وبینارها و کارگاه‌های تخصصی کوچینگ | بلومیا کلاب';

  const description =
    'تقویم کارگاه‌ها، مسترکلاس‌ها و وبینارهای آنلاین کوچینگ و رشد فردی با تدریس کوچ‌های بین‌المللی ICF در بلومیا کلاب. ثبت‌نام از طریق ایسمینار و ایوند با دسترسی به ویدیوهای ضبط‌شده.';

  const canonicalUrl = coachSlug
    ? `https://bloomiaclub.com/events?coach=${coachSlug}`
    : 'https://bloomiaclub.com/events';

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'بلومیا کلاب',
      locale: 'fa_IR',
      type: 'website',
      images: [
        {
          url: '/images/og-events.jpg',
          width: 1200,
          height: 630,
          type: 'image/jpeg',
          alt: 'رویدادها، وبینارها و کارگاه‌های تخصصی بلومیا کلاب',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/og-events.jpg'],
    },
    keywords: [
      'وبینار کوچینگ',
      'کارگاه رشد فردی',
      'ایسمینار بلومیا',
      'ایوند کوچینگ',
      'وبینار فرزندپروری',
      'کارگاه مسیر شغلی',
      'کوچینگ ICF',
    ],
  };
}

export default async function EventsPage({ searchParams }: EventsPageProps) {
  const resolved = searchParams ? await searchParams : {};
  const coachParam = resolved.coach || '';

  const allEvents = await getAllEvents();

  // Unique coaches who host events
  const coachesMap = new Map();
  allEvents.forEach((e) => {
    if (e.coach?.slug && !coachesMap.has(e.coach.slug)) {
      coachesMap.set(e.coach.slug, e.coach);
    }
  });
  const eventCoaches = Array.from(coachesMap.values());

  // JSON-LD Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'رویدادها و وبینارهای تخصصی بلومیا کلاب',
    description:
      'تقویم کارگاه‌ها، وبینارها و دوره‌های آنلاین توسعه فردی و کوچینگ بلومیا کلاب با ثبت‌نام مستقیم در ایسمینار و ایوند',
    url: 'https://bloomiaclub.com/events',
    inLanguage: 'fa-IR',
    publisher: {
      '@type': 'Organization',
      name: 'بلومیا کلاب',
      url: 'https://bloomiaclub.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://bloomiaclub.com/images/bloomia-club-logo.webp',
      },
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: allEvents.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Event',
          name: item.title,
          description: item.excerpt,
          startDate: item.date,
          eventStatus:
            item.status === 'open'
              ? 'https://schema.org/EventScheduled'
              : 'https://schema.org/EventPostponed',
          eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
          location: {
            '@type': 'VirtualLocation',
            url: item.registrationUrl,
          },
          organizer: {
            '@type': 'Organization',
            name: 'بلومیا کلاب',
            url: 'https://bloomiaclub.com',
          },
          performer: {
            '@type': 'Person',
            name: item.coach.name,
          },
          offers: {
            '@type': 'Offer',
            price: item.price,
            priceCurrency: 'IRR',
            url: item.registrationUrl,
            availability:
              item.status === 'sold_out'
                ? 'https://schema.org/SoldOut'
                : 'https://schema.org/InStock',
          },
        },
      })),
    },
  };

  // BreadcrumbList JSON-LD
  const jsonLdBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'صفحه اصلی',
        item: 'https://bloomiaclub.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'رویدادها و وبینارها',
        item: 'https://bloomiaclub.com/events',
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }} />

      <main className="min-h-screen bg-brand-surface">
        <EventsHeroSection totalEventsCount={allEvents.length} />
        <EventsFilterAndListSection events={allEvents} initialCoachSlug={coachParam} />
        <EventsWhyAttendSection />
        <EventsCoachesSection coaches={eventCoaches} />
        <EventsFaqSection />
        <EventsCtaSection />
      </main>
    </>
  );
}
