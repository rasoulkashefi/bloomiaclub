import { Metadata } from 'next';
import { contactFaqs } from '@/data/contactFaqs';
import { ContactHeroSection } from '@/components/sections/contact/ContactHeroSection';
import { ContactInfoCardsSection } from '@/components/sections/contact/ContactInfoCardsSection';
import { ContactFormSection } from '@/components/sections/contact/ContactFormSection';
import { ContactCorporateSection } from '@/components/sections/contact/ContactCorporateSection';
import { ContactFaqSection } from '@/components/sections/contact/ContactFaqSection';
import { ContactCtaSection } from '@/components/sections/contact/ContactCtaSection';

export const revalidate = 86400; // 24 hours ISR

const CANONICAL_URL = 'https://bloomiaclub.com/contact';

export const metadata: Metadata = {
  title: 'تماس با ما | پشتیبانی، مشاوره و کوچینگ سازمانی',
  description:
    'راه‌های ارتباط با بلومیا کلاب؛ تلفن مستقیم ۰۲۱۹۱۰۰۰۰۰۰، ایمیل info@bloomiaclub.com، هماهنگی جلسات حضوری در تهران، و ثبت درخواست کوچینگ سازمانی و رهبری.',
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: 'تماس با بلومیا کلاب | پشتیبانی، مشاوره و کوچینگ سازمانی',
    description:
      'راه‌های ارتباط با بلومیا کلاب؛ تلفن مستقیم ۰۲۱۹۱۰۰۰۰۰۰، ایمیل info@bloomiaclub.com، هماهنگی جلسات حضوری در تهران، و ثبت درخواست کوچینگ سازمانی و رهبری.',
    url: CANONICAL_URL,
    siteName: 'بلومیا کلاب | Bloomia Club',
    locale: 'fa_IR',
    type: 'website',
    images: [
      {
        url: '/images/og-contact.jpg',
        width: 1200,
        height: 630,
        alt: 'تماس با بلومیا کلاب',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'تماس با بلومیا کلاب | پشتیبانی و مشاوره',
    description: 'خط مستقیم ۰۲۱۹۱۰۰۰۰۰۰ و فرم آنلاین ارتباط با تیم بلومیا کلاب.',
    images: ['/images/og-contact.jpg'],
  },
};

export default function ContactPage() {
  // Structured Data: ContactPage Schema
  const contactPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'تماس با بلومیا کلاب',
    description:
      'صفحه رسمی اطلاعات ارتباطی، شماره تماس، ایمیل و ثبت درخواست مشاوره و کوچینگ سازمانی بلومیا کلاب.',
    url: CANONICAL_URL,
    inLanguage: 'fa-IR',
    mainEntity: {
      '@type': 'Organization',
      name: 'بلومیا کلاب (Bloomia Club)',
      url: 'https://bloomiaclub.com',
      logo: 'https://bloomiaclub.com/images/bloomia-club-logo.webp',
      telephone: '+98-21-91000000',
      email: 'info@bloomiaclub.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'خیابان ولیعصر، مرکز نوآوری و توسعه کسب‌وکار',
        addressLocality: 'تهران',
        addressRegion: 'تهران',
        addressCountry: 'IR',
      },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+98-21-91000000',
          contactType: 'customer service',
          areaServed: 'IR',
          availableLanguage: ['Persian', 'fa'],
        },
      ],
      sameAs: [
        'https://instagram.com/bloomiaclub',
        'https://linkedin.com/company/bloomiaclub',
        'https://t.me/bloomiaclub',
      ],
    },
  };

  // Structured Data: FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: contactFaqs.map((faq) => ({
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
        name: 'تماس با ما',
        item: CANONICAL_URL,
      },
    ],
  };

  return (
    <>
      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
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
        <ContactHeroSection />
        <ContactInfoCardsSection />
        <ContactFormSection />
        <ContactCorporateSection />
        <ContactFaqSection />
        <ContactCtaSection />
      </main>
    </>
  );
}
