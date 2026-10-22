'use client';

import React, { useState } from 'react';
import { SoleaScrollProvider } from '@/components/providers/SoleaScrollProvider';
import { SoleaNavbar } from '@/components/sections/solea/SoleaNavbar';
import { SoleaHero } from '@/components/sections/solea/SoleaHero';
import { SoleaAbout } from '@/components/sections/solea/SoleaAbout';
import { SoleaWorkTogether } from '@/components/sections/solea/SoleaWorkTogether';
import { SoleaRecentProjects } from '@/components/sections/solea/SoleaRecentProjects';
import { SoleaTestimonials } from '@/components/sections/solea/SoleaTestimonials';
import { SoleaPricing } from '@/components/sections/solea/SoleaPricing';
import { SoleaSupport } from '@/components/sections/solea/SoleaSupport';
import { SoleaBlog } from '@/components/sections/solea/SoleaBlog';
import { SoleaContact } from '@/components/sections/solea/SoleaContact';
import { SoleaMenuCard } from '@/components/sections/solea/SoleaMenuCard';

export const SoleaPageClient: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <SoleaScrollProvider>
      {/* Floating Sticky Navbar (appears only after scroll > 450px) */}
      <SoleaNavbar onOpenMenu={() => setIsMenuOpen(true)} />

      {/* Hero Section (100vh single viewport with hamburger) */}
      <SoleaHero onOpenMenu={() => setIsMenuOpen(true)} />

      {/* Dark Espresso Floating Menu Card */}
      <SoleaMenuCard
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />

      {/* About Me Section */}
      <SoleaAbout />

      {/* How We Work Together Section */}
      <SoleaWorkTogether />

      {/* My Recent Projects Section */}
      <SoleaRecentProjects />

      {/* What Women Are Saying (Testimonials) */}
      <SoleaTestimonials />

      {/* Pricing Plans (Choose Your Journey) */}
      <SoleaPricing />

      {/* Process & Ebook Support Banner */}
      <SoleaSupport />

      {/* Industry News / Blog */}
      <SoleaBlog />

      {/* Contact Form & Footer */}
      <SoleaContact />
    </SoleaScrollProvider>
  );
};
