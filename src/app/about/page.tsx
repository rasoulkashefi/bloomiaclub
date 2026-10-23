import { Metadata } from 'next';
import { getAllCoaches } from '@/lib/coaches';
import { AboutHeroSection } from '@/components/sections/about/AboutHeroSection';
import { AboutStorySection } from '@/components/sections/about/AboutStorySection';
import { AboutMissionVisionSection } from '@/components/sections/about/AboutMissionVisionSection';
import { AboutValuesSection } from '@/components/sections/about/AboutValuesSection';
import { AboutApproachSection } from '@/components/sections/about/AboutApproachSection';
import { AboutCoachesSpotlightSection } from '@/components/sections/about/AboutCoachesSpotlightSection';
import { AboutCtaSection } from '@/components/sections/about/AboutCtaSection';

export const revalidate = 86400; // 24 hours ISR

const CANONICAL_URL = 'https://bloomiaclub.com/about';

export const metadata: Metadata = {
  title: 'درباره ما | پلتفرم تخصصی کوچینگ و رشد فردی',
  description:
    'بلومیا فضایی امن و حرفه‌ای برای گفتگوهای عمیق، شفافیت ذهنی و رشد اصیل است. آشنایی با داستان، ارزش‌ها، مأموریت و کوچ‌های تأییدشده ICF در بلومیا کلاب.',
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: 'درباره بلومیا کلاب | پلتفرم تخصصی کوچینگ و رشد فردی',
    description:
      'بلومیا فضایی امن و حرفه‌ای برای گفتگوهای عمیق، شفافیت ذهنی و رشد اصیل است. آشنایی با داستان، ارزش‌ها، مأموریت و استانداردهای بلومیا کلاب.',
    url: CANONICAL_URL,
    siteName: 'بلومیا کلاب | Bloomia Club',
    locale: 'fa_IR',
    type: 'website',
    images: [
      {
        url: '/images/og-about.jpg',
        width: 1200,
        height: 630,
        alt: 'درباره بلومیا کلاب',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'درباره بلومیا کلاب | پلتفرم تخصصی کوچینگ',
    description: 'فضایی امن برای گفتگوهای عمیق، رشد پایدار و همراهی با برترین کوچ‌های ICF.',
    images: ['/images/og-about.jpg'],
  },
};

export default async function AboutPage() {
  const coaches = await getAllCoaches();

  // Structured Data: AboutPage & Organization Schema
  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'درباره بلومیا کلاب',
    description:
      'بلومیا کلاب پلتفرم تخصصی کوچینگ فردی، شغلی و سازمانی مبتنی بر استانداردهای بین‌المللی ICF است.',
    url: CANONICAL_URL,
    inLanguage: 'fa-IR',
    mainEntity: {
      '@type': 'Organization',
      name: 'بلومیا کلاب (Bloomia Club)',
      url: 'https://bloomiaclub.com',
      logo: 'https://bloomiaclub.com/images/bloomia-club-logo.webp',
      description:
        'پلتفرم تخصصی کوچینگ و توسعه انسانی با همراهی کوچ‌های تأییدشده فدراسیون بین‌المللی کوچینگ (ICF).',
      foundingDate: '2023',
      sameAs: [
        'https://instagram.com/bloomiaclub',
        'https://linkedin.com/company/bloomiaclub',
        'https://t.me/bloomiaclub',
      ],
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
        name: 'درباره ما',
        item: CANONICAL_URL,
      },
    ],
  };

  return (
    <>
      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main dir="rtl" className="min-h-screen bg-brand-surface">
        <AboutHeroSection />
        <AboutStorySection />
        <AboutMissionVisionSection />
        <AboutValuesSection />
        <AboutApproachSection />
        <AboutCoachesSpotlightSection coaches={coaches} />
        <AboutCtaSection />
      </main>
    </>
  );
}
