import React, { cache } from 'react';
import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { Lora, Plus_Jakarta_Sans } from 'next/font/google';
import { getCoachBySlug, getAllCoaches } from '@/lib/coaches';
import { getCoachArticles } from '@/lib/coach-articles';
import { getEventsByCoachSlug } from '@/lib/events';
import { CoachV4Client } from './CoachV4Client';

const getCachedCoach = cache(async (slug: string) => getCoachBySlug(slug));

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

export const revalidate = 3600; // ISR 1 hour (+ on-demand Sanity webhook revalidation)

function getCoachAlternateNames(coach: { name: string; slug: string }): string[] {
  const variants = new Set<string>();
  if (coach.name.includes('\u200c')) {
    variants.add(coach.name.replace(/\u200c/g, ' '));
  }
  const englishFromSlug = coach.slug
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (ch) => ch.toUpperCase());
  if (englishFromSlug && /[a-zA-Z]/.test(englishFromSlug)) {
    variants.add(englishFromSlug);
  }
  if (coach.slug === 'shabnam_nematimalek') {
    variants.add('شبنم نعمتی ملک');
    variants.add('Shabnam Nematimalek');
    variants.add('Shabnam Nemati Malek');
  }
  if (coach.slug === 'saloomeh_fathijou') {
    variants.add('سالومه فتحی جو');
    variants.add('Saloomeh Fathijou');
    variants.add('Salomeh Fathijou');
    variants.add('Saloomeh Fathi Jou');
    variants.add('Salomeh Fathi Jou');
  }
  if (coach.slug === 'mahya_shakoori') {
    variants.add('Mahya Shakoori');
    variants.add('Mahya Shakouri');
  }
  if (coach.slug === 'Arezoo_Ghaffari') {
    variants.add('Arezoo Ghaffari');
    variants.add('Arezoo Ghafari');
  }
  if (coach.slug === 'parmiss-yari') {
    variants.add('Parmiss Yari');
    variants.add('Parmis Yari');
  }
  if (coach.slug === 'fatemeh-derakhsh') {
    variants.add('دکتر فاطمه درخوش');
    variants.add('فاطمه درخش');
    variants.add('دکتر فاطمه درخش');
    variants.add('Fatemeh Derakhsh');
    variants.add('Fatemeh Darkhosh');
    variants.add('Fateme Darkhosh');
    variants.add('Dr. Fatemeh Derakhsh');
    variants.add('Dr. Fatemeh Darkhosh');
  }
  if (coach.slug === 'fatemeh_esmaeeli') {
    variants.add('Fatemeh Esmaeeli');
    variants.add('Fatemeh Esmaeili');
  }
  return Array.from(variants).filter((v) => v && v !== coach.name);
}

export async function generateStaticParams() {
  const coaches = await getAllCoaches();
  return coaches.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: CoachPageProps): Promise<Metadata> {
  const { slug } = await params;
  const coach = await getCachedCoach(slug);

  if (!coach) {
    return {
      title: 'کوچ یافت نشد',
      robots: { index: false },
    };
  }

  const cleanTitle = coach.title?.includes('کوچ') ? coach.title : `کوچ متخصص ${coach.title}`;
  // Root layout applies template "%s | بلومیا کلاب"; avoid duplicating brand suffix
  const pageTitle = `${coach.name} | ${cleanTitle}`;
  const fullTitle = `${pageTitle} | بلومیا کلاب`;
  const spacedName = coach.name.includes('\u200c') ? coach.name.replace(/\u200c/g, ' ') : '';
  const namePhrase = spacedName ? `${coach.name} (${spacedName})` : coach.name;

  const introService =
    coach.services?.find(
      (s) =>
        s.isFree ||
        s.title?.includes('صفر') ||
        s.title?.includes('معارفه') ||
        s.title?.includes('آشنایی') ||
        s.id?.includes('intro')
    ) || coach.services?.[0];
  const isFreeIntro = introService ? (introService.isFree !== false && (!introService.price || introService.price === 0)) : true;

  const rawBio = coach.shortBio || coach.description;
  const description = rawBio
    ? `${namePhrase}، ${cleanTitle} در بلومیا کلاب؛ ${rawBio}`
    : isFreeIntro
      ? `رزرو آنلاین جلسه معارفه رایگان با ${namePhrase}، ${cleanTitle} در بلومیا کلاب.`
      : `رزرو آنلاین جلسه معارفه با ${namePhrase}، ${cleanTitle} در بلومیا کلاب.`;

  const canonicalUrl = `https://bloomiaclub.com/coaches/${coach.slug}`;
  const dedicatedOg = `/images/coaches/og-${coach.slug}.jpg`;
  const coachImage = coach.imageUrl || coach.aboutImage || coach.coverImage || '/og-image.jpg';

  const isMothersCoach = coach.slug.includes('fatemeh') && coach.slug.includes('esmaeeli');

  return {
    title: pageTitle,
    description,
    keywords: [
      coach.name,
      `${coach.name} کوچ`,
      ...(spacedName ? [spacedName, `${spacedName} کوچ`] : []),
      coach.title,
      'کوچینگ بلومیا',
      'کوچ حرفه‌ای ICF',
      isFreeIntro ? 'جلسه معارفه رایگان' : 'جلسه معارفه کوچینگ',
      isMothersCoach ? 'کوچ مادران' : 'کوچینگ فردی',
      isMothersCoach ? 'کوچینگ مادران' : 'توسعه فردی',
      isMothersCoach ? 'رهایی از احساس گناه مادری' : 'خودآگاهی',
      isMothersCoach ? 'فرسودگی مادرانه' : 'وضوح ذهنی',
      isMothersCoach ? 'کوچینگ نوجوانان' : 'تعادل کار و زندگی',
      ...(coach.specialties || []),
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
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
      title: fullTitle,
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
  const coach = await getCachedCoach(slug);

  if (!coach) {
    notFound();
  }

  // Enforce single canonical URL for slug aliases or casing differences
  if (coach.slug && slug !== coach.slug) {
    permanentRedirect(`/coaches/${coach.slug}`);
  }

  // Ensure canonical atyno booking URL for coaches using Atyno
  if (coach.slug === 'fatemeh_esmaeeli' || coach.bookingUrl?.includes('calendly')) {
    coach.bookingUrl = 'https://atyno.com/fatemeh/zero';
  } else if (coach.slug === 'payam-esmi' && !coach.bookingUrl) {
    coach.bookingUrl = 'https://atyno.com/fa/embed/a7efb113-6e61-4623-838c-2f223cf476e8?meeting=intro-call';
  } else if ((coach.slug === 'Arezoo_Ghaffari' || coach.slug === 'arezoo-ghaffari') && !coach.bookingUrl) {
    coach.bookingUrl = 'https://atyno.com/fa/embed/f2f11bdb-3377-4df4-bc88-bc575de4a379?meeting=intro-call';
  } else if ((coach.slug === 'fatemeh-derakhsh' || coach.slug === 'fatemeh_derakhsh') && !coach.bookingUrl) {
    coach.bookingUrl = 'https://atyno.com/fa/embed/a4ab73e8-e192-43b8-86dd-dc15102a1242?meeting=zero-coaching-session';
  } else if (coach.slug === 'parmiss-yari' && (!coach.bookingUrl || coach.bookingUrl.includes('zero-coaching-session'))) {
    coach.bookingUrl = 'https://atyno.com/fa/embed/62eb65e6-f7bc-4b8c-8ea0-e3a7c974a9bd?meeting=zero-coaching';
  }

  const [fetchedArticles, coachEvents] = await Promise.all([
    getCoachArticles(coach.slug, 6),
    getEventsByCoachSlug(coach.slug),
  ]);

  if (fetchedArticles && fetchedArticles.length > 0) {
    coach.articles = fetchedArticles;
  }

  const introService = coach.services?.find((s) => s.isFree || s.title?.includes('صفر') || s.title?.includes('معارفه') || s.title?.includes('آشنایی') || s.id?.includes('intro')) || coach.services?.[0];
  const isFreeIntro = introService ? (introService.isFree !== false && (!introService.price || introService.price === 0)) : true;

  // JSON-LD Person Schema for SEO & GEO
  const alternateNames = getCoachAlternateNames(coach);
  const sameAsUrls = [coach.linkedinUrl, coach.instagramUrl].filter(Boolean);

  const jsonLdPerson: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: coach.name,
    ...(alternateNames.length > 0 ? { alternateName: alternateNames } : {}),
    jobTitle: coach.title,
    description: coach.shortBio || coach.description,
    image: coach.imageUrl || undefined,
    url: `https://bloomiaclub.com/coaches/${coach.slug}`,
    ...(coach.languages && coach.languages.length > 0 ? { knowsLanguage: coach.languages } : {}),
    knowsAbout: [
      ...(coach.specialties || []),
      'استانداردهای بین‌المللی کوچینگ ICF',
      'کوچینگ فردی و رشد شخصی',
    ],
    ...(sameAsUrls.length > 0 ? { sameAs: sameAsUrls } : {}),
    worksFor: {
      '@type': 'Organization',
      name: 'بلومیا کلاب',
      url: 'https://bloomiaclub.com',
    },
    makesOffer: {
      '@type': 'Offer',
      name: isFreeIntro ? 'جلسه معارفه رایگان کوچینگ (جلسه صفر)' : (introService?.title || 'جلسه معارفه و آشنایی کوچینگ'),
      price: isFreeIntro ? '0' : String((introService?.price || 0) * 10),
      priceCurrency: 'IRR',
      url:
        coach.bookingUrl && /^https?:\/\//i.test(coach.bookingUrl)
          ? coach.bookingUrl
          : `https://bloomiaclub.com/coaching/free-intro-session?coach=${coach.slug}`,
      availability: 'https://schema.org/InStock',
    },
  };

  if (coach.credentials && coach.credentials.length > 0) {
    jsonLdPerson.hasCredential = coach.credentials.map((c) => ({
      '@type': 'EducationalOccupationalCredential',
      name: c.title,
      ...(c.organization
        ? {
            recognizedBy: {
              '@type': 'Organization',
              name: c.organization,
            },
          }
        : {}),
    }));
  }

  // JSON-LD FAQPage Schema for AI Search Engines (ChatGPT, Perplexity, Google SGE)
  const jsonLdFaq = coach.faqs && coach.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: coach.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  } : null;

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

      {/* Speculative Preconnect for Atyno calendar iframe (Zero bandwidth, instant TLS handshake) */}
      {Boolean(coach.bookingUrl?.includes('atyno.com')) && (
        <>
          <link rel="preconnect" href="https://atyno.com" crossOrigin="anonymous" />
          <link rel="dns-prefetch" href="https://atyno.com" />
        </>
      )}

      {/* JSON-LD Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }} />
      {jsonLdFaq && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
      )}

      <CoachV4Client coach={coach} events={coachEvents} />
    </div>
  );
}
