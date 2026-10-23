import { Metadata } from 'next';
import { whatIsCoachingFaqs } from '@/data/whatIsCoachingFaqs';
import { WhatIsCoachingHeroSection } from '@/components/sections/what-is-coaching/WhatIsCoachingHeroSection';
import { WhatIsCoachingDefinitionSection } from '@/components/sections/what-is-coaching/WhatIsCoachingDefinitionSection';
import { WhatIsCoachingComparisonSection } from '@/components/sections/what-is-coaching/WhatIsCoachingComparisonSection';
import { WhatIsCoachingDomainsSection } from '@/components/sections/what-is-coaching/WhatIsCoachingDomainsSection';
import { WhatIsCoachingProcessSection } from '@/components/sections/what-is-coaching/WhatIsCoachingProcessSection';
import { WhatIsCoachingIcfSection } from '@/components/sections/what-is-coaching/WhatIsCoachingIcfSection';
import { WhatIsCoachingFaqSection } from '@/components/sections/what-is-coaching/WhatIsCoachingFaqSection';
import { WhatIsCoachingCtaSection } from '@/components/sections/what-is-coaching/WhatIsCoachingCtaSection';

export const revalidate = 86400; // 24 hours ISR

const CANONICAL_URL = 'https://bloomiaclub.com/coaching/what-is-coaching';

export const metadata: Metadata = {
  title: 'کوچینگ چیست؟ راهنمای جامع و استانداردهای بین‌المللی ICF',
  description:
    'کوچینگ چیست و چه تفاوتی با مشاوره و روان‌درمانی دارد؟ آشنایی با اصول علمی کوچینگ، استانداردهای بین‌المللی ICF و فرآیند تحول فردی و سازمانی در بلومیا کلاب.',
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: 'کوچینگ چیست؟ راهنمای جامع و استانداردهای ICF | بلومیا کلاب',
    description:
      'کوچینگ چیست و چه تفاوتی با مشاوره و روان‌درمانی دارد؟ آشنایی با اصول علمی کوچینگ، استانداردهای بین‌المللی ICF و فرآیند تحول فردی و سازمانی در بلومیا کلاب.',
    url: CANONICAL_URL,
    siteName: 'بلومیا کلاب | Bloomia Club',
    locale: 'fa_IR',
    type: 'article',
    images: [
      {
        url: '/images/og-what-is-coaching.jpg',
        width: 1200,
        height: 630,
        alt: 'راهنمای جامع کوچینگ چیست در بلومیا کلاب',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'کوچینگ چیست؟ راهنمای جامع | بلومیا کلاب',
    description:
      'آشنایی با اصول علمی کوچینگ، استانداردهای بین‌المللی ICF و مقایسه با مشاوره و روان‌درمانی.',
    images: ['/images/og-what-is-coaching.jpg'],
  },
};

export default function WhatIsCoachingPage() {
  // Structured Data: Article / Guide Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'کوچینگ چیست؟ راهنمای جامع و استانداردهای ICF',
    description:
      'کوچینگ یک فرآیند ساختارمند، هدف‌محور و مشارکتی مبتنی بر استانداردهای فدراسیون بین‌المللی کوچینگ (ICF) است که فاصله میان نقطه اکنون و نقطه مطلوب شما را کوتاه می‌کند.',
    inLanguage: 'fa-IR',
    url: CANONICAL_URL,
    publisher: {
      '@type': 'Organization',
      name: 'بلومیا کلاب (Bloomia Club)',
      url: 'https://bloomiaclub.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://bloomiaclub.com/images/bloomia-club-logo.webp',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': CANONICAL_URL,
    },
  };

  // Structured Data: FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: whatIsCoachingFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  // Structured Data: Breadcrumb Schema
  const breadcrumbSchema = {
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
        name: 'خدمات کوچینگ',
        item: 'https://bloomiaclub.com/coaches',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'کوچینگ چیست؟',
        item: CANONICAL_URL,
      },
    ],
  };

  return (
    <>
      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main dir="rtl" className="min-h-screen bg-brand-surface">
        <WhatIsCoachingHeroSection />
        <WhatIsCoachingDefinitionSection />
        <WhatIsCoachingComparisonSection />
        <WhatIsCoachingDomainsSection />
        <WhatIsCoachingProcessSection />
        <WhatIsCoachingIcfSection />
        <WhatIsCoachingFaqSection />
        <WhatIsCoachingCtaSection />
      </main>
    </>
  );
}
