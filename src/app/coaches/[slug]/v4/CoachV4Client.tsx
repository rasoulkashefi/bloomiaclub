'use client';

import React, { useState } from 'react';
import { SoleaScrollProvider } from '@/components/providers/SoleaScrollProvider';
import { SoleaNavbar } from '@/components/sections/coach-v4/SoleaNavbar';
import { SoleaHero } from '@/components/sections/coach-v4/SoleaHero';
import { SoleaAbout } from '@/components/sections/coach-v4/SoleaAbout';
import { SoleaWorkTogether } from '@/components/sections/coach-v4/SoleaWorkTogether';
import { SoleaRecentProjects } from '@/components/sections/coach-v4/SoleaRecentProjects';
import { SoleaTestimonials } from '@/components/sections/coach-v4/SoleaTestimonials';
import { SoleaPricing } from '@/components/sections/coach-v4/SoleaPricing';
import { SoleaSupport } from '@/components/sections/coach-v4/SoleaSupport';
import { SoleaBlog } from '@/components/sections/coach-v4/SoleaBlog';
import { SoleaContact } from '@/components/sections/coach-v4/SoleaContact';
import { SoleaMenuCard } from '@/components/sections/coach-v4/SoleaMenuCard';
import type { CoachProfile } from '@/lib/coaches';

interface CoachV4ClientProps {
  coach?: CoachProfile;
}

export const CoachV4Client: React.FC<CoachV4ClientProps> = ({ coach }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <SoleaScrollProvider>
      {/* Floating Sticky Navbar (appears only after scroll > 450px) */}
      <SoleaNavbar coach={coach} onOpenMenu={() => setIsMenuOpen(true)} />

      {/* Hero Section (100vh single viewport with hamburger) */}
      <SoleaHero coach={coach} onOpenMenu={() => setIsMenuOpen(true)} />

      {/* Floating Menu Card */}
      <SoleaMenuCard
        coach={coach}
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />

      {/* About Me Section */}
      <SoleaAbout coach={coach} />

      {/* How We Work Together Section */}
      <SoleaWorkTogether coach={coach} />

      {/* My Recent Projects Section */}
      <SoleaRecentProjects coach={coach} />

      {/* What Women Are Saying (Testimonials) */}
      <SoleaTestimonials coach={coach} />

      {/* Pricing Plans (Choose Your Journey) */}
      <SoleaPricing coach={coach} />

      {/* Process & Ebook Support Banner */}
      <SoleaSupport coach={coach} />

      {/* Industry News / Blog */}
      <SoleaBlog coach={coach} />

      {/* Contact Form & Footer */}
      <SoleaContact coach={coach} />
    </SoleaScrollProvider>
  );
};
