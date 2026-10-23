import { Metadata } from 'next';
import { getAllCoaches } from '@/lib/coaches';
import { freeIntroFaqs } from '@/data/freeIntroFaqs';
import { FreeIntroHeroSection } from '@/components/sections/free-intro/FreeIntroHeroSection';
import { FreeIntroBookingSection } from '@/components/sections/free-intro/FreeIntroBookingSection';
import { FreeIntroProcessSection } from '@/components/sections/free-intro/FreeIntroProcessSection';
import { FreeIntroGuaranteesSection } from '@/components/sections/free-intro/FreeIntroGuaranteesSection';
import { FreeIntroCoachesSection } from '@/components/sections/free-intro/FreeIntroCoachesSection';
import { FreeIntroTestimonialsSection } from '@/components/sections/free-intro/FreeIntroTestimonialsSection';
import { FreeIntroFaqSection } from '@/components/sections/free-intro/FreeIntroFaqSection';
import { FreeIntroCtaSection } from '@/components/sections/free-intro/FreeIntroCtaSection';

export const revalidate = 3600; // Revalidate every hour

const CANONICAL_URL = 'https://bloomiaclub.com/coaching/free-intro-session';

export const metadata: Metadata = {
  title: 'رزرو جلسه معارفه رایگان کوچینگ (جلسه صفر)',
  description:
    'یک جلسه ۴۵ دقیقه‌ای کاملاً رایگان با کوچ‌های تأییدشده بین‌المللی بلومیا؛ بدون تعهد مالی و با حفظ ۱۰۰٪ محرمانگی گفتگوها برای شفاف‌سازی مسیر فردی و شغلی شما.',
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: 'رزرو جلسه معارفه رایگان کوچینگ | بلومیا کلاب',
    description:
      'یک جلسه ۴۵ دقیقه‌ای کاملاً رایگان با کوچ‌های تأییدشده بین‌المللی بلومیا؛ بدون تعهد مالی و با حفظ ۱۰۰٪ محرمانگی گفتگوها برای شفاف‌سازی مسیر فردی و شغلی شما.',
    url: CANONICAL_URL,
    siteName: 'بلومیا کلاب | Bloomia Club',
    locale: 'fa_IR',
    type: 'website',
    images: [
      {
        url: '/images/og-coaching.jpg',
        width: 1200,
        height: 630,
        alt: 'جلسه معارفه رایگان بلومیا کلاب',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'رزرو جلسه معارفه رایگان کوچینگ | بلومیا کلاب',
    description:
      'یک جلسه ۴۵ دقیقه‌ای کاملاً رایگان با کوچ‌های تأییدشده بین‌المللی بلومیا؛ بدون تعهد مالی و با حفظ ۱۰۰٪ محرمانگی گفتگوها.',
    images: ['/images/og-coaching.jpg'],
  },
};

export default async function FreeIntroSessionPage() {
  const coaches = await getAllCoaches();

  // Structured Data: Service Schema
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'جلسه معارفه رایگان کوچینگ بلومیا کلاب',
    description:
      'جلسه اختصاصی ۴۵ دقیقه‌ای آنلاین با کوچ‌های معتبر ICF برای ارزیابی چالش‌ها و تعیین نقشه راه توسعه فردی و شغلی.',
    provider: {
      '@type': 'Organization',
      name: 'بلومیا کلاب (Bloomia Club)',
      url: 'https://bloomiaclub.com',
    },
    serviceType: 'Life and Career Coaching',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'IRR',
      availability: 'https://schema.org/InStock',
    },
    areaServed: 'IR',
    url: CANONICAL_URL,
  };

  // Structured Data: FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: freeIntroFaqs.map((faq) => ({
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
        item: 'https://bloomiaclub.com/coaching/what-is-coaching',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'جلسه معارفه رایگان',
        item: CANONICAL_URL,
      },
    ],
  };

  return (
    <>
      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
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
        <FreeIntroHeroSection />
        <FreeIntroBookingSection coaches={coaches} />
        <FreeIntroProcessSection />
        <FreeIntroGuaranteesSection />
        <FreeIntroCoachesSection coaches={coaches} />
        <FreeIntroTestimonialsSection />
        <FreeIntroFaqSection />
        <FreeIntroCtaSection />
      </main>
    </>
  );
}
