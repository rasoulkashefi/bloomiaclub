import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCoachBySlug, getAllCoaches } from '@/lib/coaches';
import { CoachProfileHeroSection } from '@/components/sections/coach-profile/CoachProfileHeroSection';
import { CoachProfileAboutSection } from '@/components/sections/coach-profile/CoachProfileAboutSection';
import { CoachProfileInteractive } from '@/components/sections/coach-profile/CoachProfileInteractive';
import { CoachProfileFaqSection } from '@/components/sections/coach-profile/CoachProfileFaqSection';

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

export default async function CoachDetailPage({ params }: CoachPageProps) {
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

      <main className="min-h-screen bg-brand-surface">
        <CoachProfileHeroSection coach={coach} />
        <CoachProfileAboutSection coach={coach} />
        <CoachProfileInteractive coach={coach} />
        <CoachProfileFaqSection />
      </main>
    </>
  );
}
