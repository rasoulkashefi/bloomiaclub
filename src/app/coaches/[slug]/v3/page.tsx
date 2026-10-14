import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';

import { getCoachBySlug, type CoachProfile } from '@/lib/coaches';
import { getCoachArticles } from '@/lib/coach-articles';

import { CoachBookingProvider } from '@/components/coach/CoachBooking';
import { CoachHeader } from '@/components/coach/CoachHeader';
import { CoachHero } from '@/components/coach/CoachHero';
import { CoachTrustStrip } from '@/components/coach/CoachTrustStrip';
import { CoachAbout } from '@/components/coach/CoachAbout';
import { CoachAudience } from '@/components/coach/CoachAudience';
import { CoachExpertise } from '@/components/coach/CoachExpertise';
import { CoachMethod } from '@/components/coach/CoachMethod';
import { CoachServices } from '@/components/coach/CoachServices';
import { CoachPackages } from '@/components/coach/CoachPackages';
import { CoachTestimonials } from '@/components/coach/CoachTestimonials';
import { CoachArticles } from '@/components/coach/CoachArticles';
import { CoachEvents } from '@/components/coach/CoachEvents';
import { CoachCredentials } from '@/components/coach/CoachCredentials';
import { CoachFAQ } from '@/components/coach/CoachFAQ';
import { CoachFinalCTA } from '@/components/coach/CoachFinalCTA';
import { CoachFooter } from '@/components/coach/CoachFooter';
import { CoachStickyCTA } from '@/components/coach/CoachStickyCTA';
import { CoachJsonLd } from '@/components/coach/CoachJsonLd';
import { getSectionFlags } from '@/components/coach/coach-sections';
import type { SectionTone } from '@/components/coach/editorial/Section';

export const revalidate = 600;

/* Deduplicates the lookup between generateMetadata and the page render. */
const getCoach = cache(getCoachBySlug);

const SITE_URL = 'https://bloomiaclub.com';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const coach = await getCoach(slug);
  if (!coach) return { title: { absolute: 'کوچ یافت نشد | بلومیا' }, robots: { index: false } };

  const title = `${coach.name} | ${coach.title} | بلومیا`;
  const description = coach.shortBio || coach.description;
  const url = `${SITE_URL}/coaches/${coach.slug}`;
  const image = coach.imageUrl || coach.coverImage || '/og-image.jpg';

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'profile',
      locale: 'fa_IR',
      siteName: 'بلومیا کلاب',
      title,
      description,
      url,
      images: [{ url: image, alt: coach.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

/**
 * Coach personal website. This file only composes sections and hands them server data;
 * every section decides on its own whether it has anything real to show.
 */
export default async function CoachProfileV3Page({ params }: PageProps) {
  const { slug } = await params;
  const base = await getCoach(slug);
  if (!base) notFound();

  const fetchedArticles = await getCoachArticles(base.slug);
  const articles = fetchedArticles.length > 0 ? fetchedArticles : (base.articles ?? []);
  const coach: CoachProfile = { ...base, articles };
  const flags = getSectionFlags(coach);

  /* Neutral sections alternate paper/surface so adjacent sections never share a tone,
     whichever optional sections are hidden. Method, testimonials and the closing CTA are fixed. */
  let last: SectionTone = 'surface';
  const next = (): SectionTone => (last = last === 'paper' ? 'surface' : 'paper');
  const tone = {
    about: flags.about ? next() : undefined,
    audience: flags.audience ? next() : undefined,
    expertise: flags.expertise ? next() : undefined,
    services: flags.services ? next() : undefined,
    packages: flags.packages ? next() : undefined,
  };
  const afterTestimonials = {
    articles: flags.articles ? next() : undefined,
    events: flags.events ? next() : undefined,
    credentials: flags.credentials ? next() : undefined,
    faqs: flags.faqs ? next() : undefined,
  };

  return (
    <CoachBookingProvider coach={coach}>
      <CoachJsonLd coach={coach} />
      <CoachHeader coach={coach} />

      <div className="bg-brand-surface selection:bg-brand-teal-900 selection:text-white">
        <CoachHero coach={coach} />
        <CoachTrustStrip coach={coach} />
        <CoachAbout coach={coach} tone={tone.about} />
        <CoachAudience coach={coach} tone={tone.audience} />
        <CoachExpertise coach={coach} tone={tone.expertise} />
        <CoachMethod coach={coach} />
        <CoachServices coach={coach} tone={tone.services} />
        <CoachPackages coach={coach} tone={tone.packages} />
        <CoachTestimonials coach={coach} tone="tint" />
        <CoachArticles coach={coach} tone={afterTestimonials.articles} />
        <CoachEvents coach={coach} tone={afterTestimonials.events} />
        <CoachCredentials coach={coach} tone={afterTestimonials.credentials} />
        <CoachFAQ coach={coach} tone={afterTestimonials.faqs} />
        <CoachFinalCTA coach={coach} />
      </div>

      <CoachFooter coach={coach} />
      <CoachStickyCTA coach={coach} />
    </CoachBookingProvider>
  );
}
