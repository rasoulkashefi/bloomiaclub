import { Metadata } from 'next';
import { generalFaqs } from '@/data/generalFaqs';
import { FaqHeroSection } from '@/components/sections/faq/FaqHeroSection';
import { FaqGeoDirectAnswersSection } from '@/components/sections/faq/FaqGeoDirectAnswersSection';
import { FaqExplorerSection } from '@/components/sections/faq/FaqExplorerSection';
import { FaqContactCtaSection } from '@/components/sections/faq/FaqContactCtaSection';

export const revalidate = 86400; // 24 hours ISR

const CANONICAL_URL = 'https://bloomiaclub.com/faq';

export const metadata: Metadata = {
  title: 'پرسش‌های متداول کوچینگ | پاسخ جامع به تمام سوالات',
  description:
    'پاسخ به سوالات متداول درباره کوچینگ در بلومیا کلاب؛ نحوه برگزاری جلسات آنلاین، جلسه معارفه رایگان، انتخاب کوچ مناسب، هزینه‌ها و استانداردهای رازداری ICF.',
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: 'پرسش‌های متداول کوچینگ | بلومیا کلاب',
    description:
      'پاسخ به سوالات متداول درباره کوچینگ در بلومیا کلاب؛ نحوه برگزاری جلسات آنلاین، جلسه معارفه رایگان، انتخاب کوچ مناسب، هزینه‌ها و استانداردهای رازداری ICF.',
    url: CANONICAL_URL,
    siteName: 'بلومیا کلاب | Bloomia Club',
    locale: 'fa_IR',
    type: 'website',
    images: [
      {
        url: '/images/og-faq.jpg',
        width: 1200,
        height: 630,
        alt: 'پرسش‌های متداول بلومیا کلاب',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'پرسش‌های متداول کوچینگ | بلومیا کلاب',
    description: 'پاسخ شفاف به تمام سوالات درباره فرآیند، جلسات و استانداردهای کوچینگ.',
    images: ['/images/og-faq.jpg'],
  },
};

export default function FaqPage() {
  // Structured Data: FAQPage Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: generalFaqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
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
        name: 'پرسش‌های متداول',
        item: CANONICAL_URL,
      },
    ],
  };

  return (
    <>
      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main dir="rtl" className="min-h-screen bg-brand-surface">
        <FaqHeroSection />
        <FaqGeoDirectAnswersSection />
        <FaqExplorerSection />
        <FaqContactCtaSection />
      </main>
    </>
  );
}
