import React from 'react';
import type { Metadata } from 'next';
import { getAllCoaches } from '@/lib/coaches';
import { CoachExplorer } from '@/components/sections/coaches/CoachExplorer';
import { CoachFaqSection } from '@/components/sections/coaches/CoachFaqSection';
import { CoachSeoGuideSection } from '@/components/sections/coaches/CoachSeoGuideSection';
import { coachFaqs } from '@/data/coachFaqs';

export const revalidate = 3600; // ISR: Revalidate every 1 hour

export const metadata: Metadata = {
  title: 'کوچ‌های بلومیا کلاب | تخصص‌های رشد فردی، شغلی و کسب‌وکار با مدرک ICF',
  description:
    'فهرست برترین کوچ‌های حرفه‌ای و دارای گواهینامه بین‌المللی ICF در بلومیا کلاب. بررسی سوابق، تخصص‌ها، نظرات مراجعین و رزرو آنلاین جلسه معارفه رایگان (جلسه صفر).',
  keywords: [
    'کوچ‌های بلومیا',
    'کوچ حرفه‌ای',
    'کوچ توسعه فردی',
    'کوچ شغلی',
    'کوچ کسب‌وکار',
    'مدرک بین‌المللی ICF',
    'جلسه معارفه رایگان کوچینگ',
    'کوچینگ آنلاین',
  ],
  alternates: {
    canonical: 'https://bloomiaclub.com/coaches',
  },
  openGraph: {
    title: 'تیم کوچ‌های معتبر بلومیا کلاب | دارای تاییدیه بین‌المللی ICF',
    description:
      'همراهی در مسیر رشد و موفقیت با زبده‌ترین کوچ‌های ایران. انتخاب کوچ متخصص و رزرو جلسه معارفه رایگان.',
    url: 'https://bloomiaclub.com/coaches',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'کوچ‌های بلومیا کلاب',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'تیم کوچ‌های معتبر بلومیا کلاب | دارای تاییدیه بین‌المللی ICF',
    description:
      'همراهی در مسیر رشد و موفقیت با زبده‌ترین کوچ‌های ایران. انتخاب کوچ متخصص و رزرو جلسه معارفه رایگان.',
    images: ['/og-image.jpg'],
  },
};

export default async function CoachesPage() {
  const coaches = await getAllCoaches();

  // JSON-LD CollectionPage & ItemList Schema
  const jsonLdCollection = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'تیم کوچ‌های معتبر بلومیا کلاب',
    description:
      'فهرست برترین کوچ‌های حرفه‌ای و دارای گواهینامه بین‌المللی ICF در زمینه‌های مختلف رشد فردی، شغلی و کسب‌وکار.',
    url: 'https://bloomiaclub.com/coaches',
    inLanguage: 'fa-IR',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: coaches.length,
      itemListElement: coaches.map((coach, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Person',
          name: coach.name,
          jobTitle: coach.title,
          description: coach.description,
          image: coach.imageUrl || undefined,
          url: `https://bloomiaclub.com/coaches/${coach.slug}`,
          knowsAbout: coach.specialties,
        },
      })),
    },
  };

  // JSON-LD FAQPage Schema for GEO and Google Search
  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: coachFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
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
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdCollection) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

      <main className="min-h-screen bg-brand-surface">
        <CoachExplorer initialCoaches={coaches} />
        <CoachFaqSection />
        <CoachSeoGuideSection />
      </main>
    </>
  );
}
