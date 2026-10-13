import { Metadata } from 'next';
import { LegalHeroSection } from '@/components/sections/legal/LegalHeroSection';
import { LegalGeoSummarySection } from '@/components/sections/legal/LegalGeoSummarySection';
import { LegalContentSection } from '@/components/sections/legal/LegalContentSection';
import { LegalCtaSection } from '@/components/sections/legal/LegalCtaSection';

export const revalidate = 86400; // 24 hours ISR

const CANONICAL_URL = 'https://bloomiaclub.com/legal';

export const metadata: Metadata = {
  title: 'قوانین و شرایط استفاده | منشور محرمانگی و حریم خصوصی | بلومیا کلاب',
  description:
    'قوانین و مقررات رسمی بلومیا کلاب؛ شرایط استفاده از جلسات کوچینگ، منشور محرمانگی بر پایه استانداردهای ICF، سیاست لغو و بازپرداخت، و حفاظت از حریم خصوصی مراجعان.',
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: 'قوانین و شرایط استفاده | منشور محرمانگی بلومیا کلاب',
    description:
      'قوانین و مقررات رسمی بلومیا کلاب؛ شرایط استفاده از جلسات کوچینگ، منشور محرمانگی بر پایه استانداردهای ICF و حفاظت از حریم خصوصی مراجعان.',
    url: CANONICAL_URL,
    siteName: 'بلومیا کلاب | Bloomia Club',
    locale: 'fa_IR',
    type: 'website',
    images: [
      {
        url: '/images/og-about.jpg',
        width: 1200,
        height: 630,
        alt: 'قوانین و حریم خصوصی بلومیا کلاب',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'قوانین و حریم خصوصی | بلومیا کلاب',
    description: 'منشور اخلاقی و قوانین رسمی ارائه خدمات کوچینگ در بلومیا کلاب.',
    images: ['/images/og-about.jpg'],
  },
};

export default function LegalPage() {
  // Structured Data: WebPage & Terms Schema
  const legalPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'قوانین، شرایط استفاده و منشور محرمانگی بلومیا کلاب',
    description:
      'چارچوب حقوقی و منشور اخلاقی ارائه خدمات کوچینگ فردی، شغلی و سازمانی در بلومیا کلاب مبتنی بر اصول ICF.',
    url: CANONICAL_URL,
    inLanguage: 'fa-IR',
    mainEntity: {
      '@type': 'Organization',
      name: 'بلومیا کلاب (Bloomia Club)',
      url: 'https://bloomiaclub.com',
      logo: 'https://bloomiaclub.com/images/bloomia-club-logo.webp',
    },
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
        name: 'قوانین و حریم خصوصی',
        item: CANONICAL_URL,
      },
    ],
  };

  return (
    <>
      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(legalPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main dir="rtl" className="min-h-screen bg-brand-surface">
        <LegalHeroSection />
        <LegalGeoSummarySection />
        <LegalContentSection />
        <LegalCtaSection />
      </main>
    </>
  );
}
