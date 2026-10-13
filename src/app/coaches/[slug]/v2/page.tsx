import React from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { getCoachBySlug } from '@/lib/coaches';
import { CoachHeroV2 } from '@/components/sections/coach-profile-v2/CoachHeroV2';
import { CoachAboutV2 } from '@/components/sections/coach-profile-v2/CoachAboutV2';
import { CoachSpecialtiesV2 } from '@/components/sections/coach-profile-v2/CoachSpecialtiesV2';
import { CoachFitV2 } from '@/components/sections/coach-profile-v2/CoachFitV2';
import { CoachApproachV2 } from '@/components/sections/coach-profile-v2/CoachApproachV2';
import { CoachServicesV2 } from '@/components/sections/coach-profile-v2/CoachServicesV2';
import { CoachTestimonialsV2 } from '@/components/sections/coach-profile-v2/CoachTestimonialsV2';
import { CoachCredentialsV2 } from '@/components/sections/coach-profile-v2/CoachCredentialsV2';
import { CoachArticlesV2 } from '@/components/sections/coach-profile-v2/CoachArticlesV2';
import { CoachFinalCtaV2 } from '@/components/sections/coach-profile-v2/CoachFinalCtaV2';
import { StickyBookingBarV2 } from '@/components/sections/coach-profile-v2/StickyBookingBarV2';

interface CoachPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: CoachPageProps): Promise<Metadata> {
  const { slug } = await params;
  const coach = await getCoachBySlug(slug);

  if (!coach) {
    return {
      title: 'کوچ یافت نشد | بلومیا کلاب',
    };
  }

  const title = `${coach.name} | کوچ متخصص ${coach.title} | بلومیا کلاب`;
  const description =
    coach.description ||
    `رزرو جلسه معارفه رایگان با ${coach.name}، کوچ دارای مدرک بین‌المللی ICF در بلومیا کلاب.`;

  return {
    title,
    description,
    keywords: [
      coach.name,
      coach.title,
      'کوچینگ بلومیا',
      'کوچ حرفه‌ای ICF',
      'جلسه معارفه رایگان',
      ...(coach.specialties || []),
    ],
    alternates: {
      canonical: `https://bloomiaclub.com/coaches/${coach.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://bloomiaclub.com/coaches/${coach.slug}`,
      type: 'profile',
      images: [
        {
          url: coach.imageUrl || '/og-image.jpg',
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
      images: [coach.imageUrl || '/og-image.jpg'],
    },
  };
}

export default async function CoachProfileV2Page({ params }: CoachPageProps) {
  const { slug } = await params;
  const coach = await getCoachBySlug(slug);

  if (!coach) {
    notFound();
  }

  // JSON-LD Person Schema
  const jsonLdPerson = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: coach.name,
    jobTitle: coach.title,
    description: coach.description,
    image: coach.imageUrl || undefined,
    url: `https://bloomiaclub.com/coaches/${coach.slug}`,
    knowsAbout: coach.specialties,
    sameAs: [coach.linkedinUrl, coach.instagramUrl].filter(Boolean),
    worksFor: {
      '@type': 'Organization',
      name: 'بلومیا کلاب',
      url: 'https://bloomiaclub.com',
    },
  };

  // JSON-LD BreadcrumbList
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
    <>
      <Script
        id={`jsonld-person-${coach.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
        strategy="beforeInteractive"
      />
      <Script
        id={`jsonld-breadcrumb-${coach.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
        strategy="beforeInteractive"
      />

      <main className="min-h-screen bg-brand-surface">
        {/* Section 1 — Hero: Name, photo, bio, CTA */}
        <CoachHeroV2 coach={coach} />

        {/* Section 3 — About: Storytelling bio */}
        <CoachAboutV2 coach={coach} />

        {/* Section 4 — Specialties: Pill badges */}
        <CoachSpecialtiesV2 coach={coach} />

        {/* Section 5 — Fit: "Is this coach for you?" */}
        <CoachFitV2 coach={coach} />

        {/* Section 6 — Approach: 3-step process */}
        <CoachApproachV2 coach={coach} />

        {/* Section 7 — Services: Packages & pricing */}
        <CoachServicesV2 coach={coach} />

        {/* Section 8 — Testimonials: Client reviews */}
        <CoachTestimonialsV2 coach={coach} />

        {/* Section 9 — Credentials: Education & certifications */}
        <CoachCredentialsV2 coach={coach} />

        {/* Section 10 — Articles: Blog posts by this coach */}
        <CoachArticlesV2 coach={coach} />

        {/* Section 11 — Final CTA: Dark section */}
        <CoachFinalCtaV2 coach={coach} />

        {/* Section 12 — Sticky Booking Bar */}
        <StickyBookingBarV2 coach={coach} />
      </main>
    </>
  );
}
