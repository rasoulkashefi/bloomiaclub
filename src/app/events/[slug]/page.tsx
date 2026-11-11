import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getEventBySlug, getAllEventSlugs, getAllEvents } from '@/lib/events';
import { EventDetailHeroSection } from '@/components/sections/event-detail/EventDetailHeroSection';
import { EventDetailContentSection } from '@/components/sections/event-detail/EventDetailContentSection';
import { EventsCtaSection } from '@/components/sections/events/EventsCtaSection';

export const revalidate = 3600; // ISR 1 hour

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllEventSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    return {
      title: 'رویداد یافت نشد',
    };
  }

  const rawTitle = event.metaTitle || event.title;
  const hasBrand = /بلومیا/.test(rawTitle);
  const metadataTitle = hasBrand ? { absolute: rawTitle } : rawTitle;
  const socialTitle = hasBrand ? rawTitle : `${rawTitle} | بلومیا کلاب`;
  const description = event.metaDescription || event.excerpt;
  const canonicalUrl = `https://bloomiaclub.com/events/${slug}`;

  return {
    title: metadataTitle,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: socialTitle,
      description,
      url: canonicalUrl,
      siteName: 'بلومیا کلاب',
      locale: 'fa_IR',
      type: 'website',
      images: [
        {
          url: event.coverImage,
          width: 1200,
          height: 675,
          alt: event.coverImageAlt || event.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: [event.coverImage],
    },
  };
}

export default async function EventDetailPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  // Schema.org Event JSON-LD
  const jsonLdEvent = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.excerpt,
    startDate: event.date,
    endDate: event.endDate || event.date,
    eventStatus:
      event.status === 'open'
        ? 'https://schema.org/EventScheduled'
        : 'https://schema.org/EventPostponed',
    eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
    location: {
      '@type': 'VirtualLocation',
      url: event.registrationUrl,
      name: event.platformName,
    },
    image: [event.coverImage],
    performer: {
      '@type': 'Person',
      name: event.coach.name,
      jobTitle: event.coach.title,
      url: `https://bloomiaclub.com/coaches/${event.coach.slug}`,
    },
    organizer: {
      '@type': 'Organization',
      name: 'بلومیا کلاب',
      url: 'https://bloomiaclub.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://bloomiaclub.com/images/bloomia-club-logo.webp',
      },
    },
    offers: {
      '@type': 'Offer',
      price: event.price,
      priceCurrency: 'IRR',
      url: event.registrationUrl,
      validFrom: event.date,
      availability:
        event.status === 'sold_out'
          ? 'https://schema.org/SoldOut'
          : 'https://schema.org/InStock',
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
      {
        '@type': 'ListItem',
        position: 3,
        name: event.title,
        item: `https://bloomiaclub.com/events/${event.slug}`,
      },
    ],
  };

  // FAQPage JSON-LD (matches visible event FAQs for SEO & GEO)
  const jsonLdFaq =
    event.faqs && event.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: event.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        }
      : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdEvent) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }} />
      {jsonLdFaq && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
      )}

      <main className="min-h-screen bg-brand-surface">
        <EventDetailHeroSection event={event} />
        <EventDetailContentSection event={event} />
        <EventsCtaSection />
      </main>
    </>
  );
}
