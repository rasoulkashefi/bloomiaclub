import React from 'react';
import type { Metadata } from 'next';
import { getAllCoaches } from '@/lib/coaches';
import { getLatestPosts } from '@/lib/posts';
import { HeroSection } from '@/components/sections/home/HeroSection';
import { BookingFeaturesSection } from '@/components/sections/home/BookingFeaturesSection';
import { CoachesSection } from '@/components/sections/home/CoachesSection';
import { ProcessSection } from '@/components/sections/home/ProcessSection';
import { StatsSection } from '@/components/sections/home/StatsSection';
import { TestimonialsSection } from '@/components/sections/home/TestimonialsSection';
import { LatestPostsSection } from '@/components/sections/home/LatestPostsSection';
import { CommunitySection } from '@/components/sections/home/CommunitySection';
import { FaqSection } from '@/components/sections/home/FaqSection';
import { FinalCtaSection } from '@/components/sections/home/FinalCtaSection';

export const revalidate = 3600; // ISR 1 hour (+ on-demand Sanity webhook revalidation)

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://bloomiaclub.com',
  },
};

export default async function HomePage() {
  // Fetch all coaches deterministically so every coach receives homepage internal link equity
  const [coaches, posts] = await Promise.all([
    getAllCoaches(),
    getLatestPosts(3),
  ]);

  return (
    <div className="w-full flex flex-col">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Smart Booking & Advantage Section */}
      <BookingFeaturesSection />

      {/* 3. Coaches Grid Section */}
      <CoachesSection coaches={coaches} />

      {/* 4. 4-Step Process Section */}
      <ProcessSection />

      {/* 5. Standards & Trust Stats Section */}
      <StatsSection />

      {/* 6. Client Stories & Testimonials */}
      <TestimonialsSection />

      {/* 7. Latest Blog Posts from Sanity */}
      <LatestPostsSection posts={posts} />

      {/* 8. Bloomia Community & Network */}
      <CommunitySection />

      {/* 9. Structured FAQ with JSON-LD */}
      <FaqSection />

      {/* 10. High-Conversion Final CTA */}
      <FinalCtaSection />
    </div>
  );
}
