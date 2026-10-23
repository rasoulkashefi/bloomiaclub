import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Lora, Plus_Jakarta_Sans } from 'next/font/google';
import { getCoachBySlug, getAllCoaches } from '@/lib/coaches';
import { getCoachArticles } from '@/lib/coach-articles';
import { getEventsByCoachSlug } from '@/lib/events';
import { CoachV4Client } from './CoachV4Client';

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-lora',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

interface CoachPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  const coaches = await getAllCoaches();
  return coaches.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: CoachPageProps): Promise<Metadata> {
  const { slug } = await params;
  const coach = await getCoachBySlug(slug);

  if (!coach) {
    return {
      title: 'کوچ یافت نشد | بلومیا کلاب',
      robots: { index: false },
    };
  }

  const title = `${coach.name} | کوچ متخصص ${coach.title}`;
  const description =
    coach.shortBio ||
    coach.description ||
    `رزرو آنلاین جلسه معارفه رایگان با ${coach.name}، کوچ دارای مدرک بین‌المللی ICF در بلومیا کلاب.`;

  const canonicalUrl = `https://bloomiaclub.com/coaches/${coach.slug}`;
  const dedicatedOg = `/images/coaches/og-${coach.slug}.jpg`;
  const coachImage = coach.imageUrl || coach.aboutImage || coach.coverImage || '/og-image.jpg';

  return {
    title,
    description,
    keywords: [
      coach.name,
      coach.title,
      'کوچینگ بلومیا',
      'کوچ حرفه‌ای ICF',
      'جلسه معارفه رایگان',
      'کوچینگ فردی و توسعه شغلی',
      ...(coach.specialties || []),
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'بلومیا کلاب',
      locale: 'fa_IR',
      type: 'profile',
      images: [
        {
          url: dedicatedOg,
          width: 1200,
          height: 630,
          alt: `${coach.name} - ${coach.title} | بلومیا کلاب`,
        },
        {
          url: coachImage,
          width: 800,
          height: 800,
          alt: coach.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [dedicatedOg],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function CoachDetailPage({ params }: CoachPageProps) {
  const { slug } = await params;
  const coach = await getCoachBySlug(slug);

  if (!coach) {
    notFound();
  }

  // Ensure canonical atyno booking URL for coaches using Atyno
  if (coach.slug === 'fatemeh_esmaeeli' || coach.bookingUrl?.includes('calendly')) {
    coach.bookingUrl = 'https://atyno.com/fatemeh/zero';
  }

  const [fetchedArticles, coachEvents] = await Promise.all([
    getCoachArticles(coach.slug, 6),
    getEventsByCoachSlug(coach.slug),
  ]);

  if (fetchedArticles && fetchedArticles.length > 0) {
    coach.articles = fetchedArticles;
  }

  // JSON-LD Person Schema for SEO & GEO
  const jsonLdPerson = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: coach.name,
    jobTitle: coach.title,
    description: coach.shortBio || coach.description,
    image: coach.imageUrl || undefined,
    url: `https://bloomiaclub.com/coaches/${coach.slug}`,
    knowsAbout: coach.specialties,
    sameAs: [coach.linkedinUrl, coach.instagramUrl].filter(Boolean),
    worksFor: {
      '@type': 'Organization',
      name: 'بلومیا کلاب',
      url: 'https://bloomiaclub.com',
    },
    makesOffer: {
      '@type': 'Offer',
      name: 'جلسه معارفه رایگان کوچینگ (جلسه صفر)',
      price: '0',
      priceCurrency: 'IRR',
      url: coach.bookingUrl || 'https://bloomiaclub.com/coaching/free-intro-session',
      availability: 'https://schema.org/InStock',
    },
  };

  // JSON-LD Breadcrumbs
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
        name: 'کوچ‌ها',
        item: 'https://bloomiaclub.com/coaches',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: coach.name,
        item: `https://bloomiaclub.com/coaches/${coach.slug}`,
      },
    ],
  };

  return (
    <div
      dir="rtl"
      className={`${lora.variable} ${plusJakarta.variable} font-sans min-h-screen w-full bg-[#fafaf8] text-[#1e1e1e] antialiased selection:bg-[#1f3d3a] selection:text-white [font-feature-settings:'ss01']`}
    >
      <style>{`
        .font-serif {
          font-family: var(--font-vazirmatn), system-ui, -apple-system, sans-serif !important;
          letter-spacing: normal !important;
        }
        h1, h2, h3, h4, h5, h6 {
          text-wrap: balance;
        }
      `}</style>

      {/* JSON-LD Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }} />

      <CoachV4Client coach={coach} events={coachEvents} />
    </div>
  );
}
