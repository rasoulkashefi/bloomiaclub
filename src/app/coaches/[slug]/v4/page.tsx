import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Lora, Plus_Jakarta_Sans } from 'next/font/google';
import { getCoachBySlug } from '@/lib/coaches';
import { CoachV4Client } from './CoachV4Client';

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

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const coach = await getCoachBySlug(slug);
  if (!coach) {
    return {
      title: 'کوچ یافت نشد | بلومیا کلاب',
      robots: { index: false },
    };
  }

  return {
    title: `${coach.name} | کوچ ${coach.title} | بلومیا کلاب (نسخه ۴)`,
    description: coach.shortBio || coach.description,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function CoachV4Page({ params }: PageProps) {
  const { slug } = await params;
  const coach = await getCoachBySlug(slug);

  if (!coach) {
    notFound();
  }

  if (coach.slug === 'fatemeh_esmaeeli' || coach.bookingUrl?.includes('calendly')) {
    coach.bookingUrl = 'https://atyno.com/fatemeh/zero';
  }

  return (
    <div
      dir="rtl"
      className="font-sans min-h-screen w-full bg-[#fafaf8] text-[#1e1e1e] antialiased selection:bg-[#1f3d3a] selection:text-white [font-feature-settings:'ss01']"
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

      <CoachV4Client coach={coach} />
    </div>
  );
}
