'use client';

import React, { useState, useMemo } from 'react';
import { SoleaScrollProvider } from '@/components/providers/SoleaScrollProvider';
import { SoleaNavbar } from '@/components/sections/coach-v4/SoleaNavbar';
import { SoleaHero } from '@/components/sections/coach-v4/SoleaHero';
import { SoleaAbout } from '@/components/sections/coach-v4/SoleaAbout';
import { SoleaWorkTogether } from '@/components/sections/coach-v4/SoleaWorkTogether';
import { SoleaEvents } from '@/components/sections/coach-v4/SoleaEvents';
import { SoleaTestimonials } from '@/components/sections/coach-v4/SoleaTestimonials';
import { SoleaPricing } from '@/components/sections/coach-v4/SoleaPricing';
import { SoleaSupport } from '@/components/sections/coach-v4/SoleaSupport';
import { SoleaBlog } from '@/components/sections/coach-v4/SoleaBlog';
import { SoleaContact } from '@/components/sections/coach-v4/SoleaContact';
import { SoleaMenuCard } from '@/components/sections/coach-v4/SoleaMenuCard';
import { CoachLeadBookingModal, type BookingOfferingItem } from '@/components/coach/CoachLeadBookingModal';
import { AtynoBookingModal } from '@/components/coach/AtynoBookingModal';
import { formatToman } from '@/lib/format';
import { getCanonicalSlug, type CoachProfile } from '@/lib/coaches';
import type { EventItem } from '@/lib/events';

interface CoachV4ClientProps {
  coach?: CoachProfile;
  events?: EventItem[];
}

export const CoachV4Client: React.FC<CoachV4ClientProps> = ({ coach, events }) => {
  const canonical = getCanonicalSlug(coach?.slug || '');
  const isAtynoCoach = Boolean(coach?.bookingUrl && coach.bookingUrl.includes('atyno.com'));
  const coachName = coach?.name || 'کوچ بلومیا';
  const coachTitle = coach?.title || 'کوچ حرفه‌ای و بین‌المللی ICF';
  const coachAvatar =
    coach?.aboutImage ||
    coach?.imageUrl ||
    coach?.coverImage ||
    (canonical === 'mahya_shakouri' ? '/images/solea/mahya_about.jpg' : '/images/solea/fatemeh_about.jpg');

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [selectedOffering, setSelectedOffering] = useState<string | undefined>(undefined);

  const [atynoModalState, setAtynoModalState] = useState<{
    isOpen: boolean;
    title: string;
    bookingUrl: string;
    mode?: string;
  }>({
    isOpen: false,
    title: '',
    bookingUrl: '',
    mode: 'online',
  });

  // Dynamic introductory session directly from coach.services (synced from Atyno)
  const introService = useMemo(() => {
    return (
      coach?.services?.find((s) => s.isFree || s.title?.includes('صفر') || s.title?.includes('معارفه')) ||
      coach?.services?.[0]
    );
  }, [coach]);

  const defaultIntroTitle = useMemo(() => {
    if (!introService) return 'رزرو آنلاین جلسه معارفه';
    return introService.duration ? `${introService.title} (${introService.duration})` : introService.title;
  }, [introService]);

  const handleOpenBooking = (offeringTitle?: string, bookingUrl?: string, mode?: string) => {
    const effectiveTitle = offeringTitle || defaultIntroTitle;
    const effectiveUrl = bookingUrl || introService?.bookingUrl || coach?.bookingUrl || '';
    const effectiveMode =
      mode ||
      (introService as any)?.locationType ||
      (introService as any)?.mode ||
      (coach?.sessionMode === 'in-person' ? 'in-person' : 'online');
    if (isAtynoCoach) {
      setAtynoModalState({
        isOpen: true,
        title: effectiveTitle,
        bookingUrl: effectiveUrl,
        mode: effectiveMode,
      });
    } else {
      setSelectedOffering(effectiveTitle);
      setLeadModalOpen(true);
    }
  };

  const offerings: BookingOfferingItem[] = useMemo(() => {
    const list: BookingOfferingItem[] = [];
    if (coach?.services && coach.services.length > 0) {
      coach.services.forEach((s) => {
        list.push({
          id: s.id,
          title: s.title,
          priceLabel: s.isFree ? 'رایگان' : (s.price ? `${formatToman(s.price)}` : undefined),
        });
      });
    }
    if (coach?.packagesData && coach.packagesData.length > 0) {
      coach.packagesData.forEach((p) => {
        list.push({
          id: p.id,
          title: p.title,
          priceLabel: p.price ? `${formatToman(p.price)}` : undefined,
        });
      });
    }
    return list;
  }, [coach]);

  return (
    <SoleaScrollProvider>
      {/* Floating Sticky Navbar (appears only after scroll > 450px) */}
      <SoleaNavbar
        coach={coach}
        onOpenMenu={() => setIsMenuOpen(true)}
        onOpenBooking={handleOpenBooking}
      />

      {/* Hero Section (100vh single viewport with hamburger) */}
      <SoleaHero
        coach={coach}
        onOpenMenu={() => setIsMenuOpen(true)}
        onOpenBooking={handleOpenBooking}
      />

      {/* Floating Menu Card */}
      <SoleaMenuCard
        coach={coach}
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onOpenBooking={handleOpenBooking}
      />

      {/* About Me Section */}
      <SoleaAbout coach={coach} />

      {/* How We Work Together Section */}
      <SoleaWorkTogether coach={coach} onOpenBooking={handleOpenBooking} />

      {/* Featured Events & Consultation Section */}
      <SoleaEvents
        coach={coach}
        events={events}
        onOpenBooking={handleOpenBooking}
      />

      {/* What Women Are Saying (Testimonials) */}
      <SoleaTestimonials coach={coach} />

      {/* Pricing Plans (Choose Your Journey) */}
      <SoleaPricing coach={coach} onOpenBooking={handleOpenBooking} />

      {/* Process & Ebook Support Banner */}
      <SoleaSupport coach={coach} />

      {/* Industry News / Blog */}
      <SoleaBlog coach={coach} />

      {/* Contact Form & Footer */}
      <SoleaContact coach={coach} onOpenBooking={handleOpenBooking} />

      {/* Internal Lead Booking Modal for Non-Atyno Coaches (Telegram Bot Connected) */}
      {!isAtynoCoach && (
        <CoachLeadBookingModal
          isOpen={leadModalOpen}
          onClose={() => setLeadModalOpen(false)}
          coachName={coachName}
          coachTitle={coachTitle}
          coachAvatar={coachAvatar}
          initialOfferingTitle={selectedOffering}
          offerings={offerings}
        />
      )}

      {/* Atyno Booking Modal for Atyno-integrated Coaches */}
      {isAtynoCoach && (
        <AtynoBookingModal
          isOpen={atynoModalState.isOpen}
          onClose={() => setAtynoModalState((prev) => ({ ...prev, isOpen: false }))}
          title={atynoModalState.title}
          bookingUrl={atynoModalState.bookingUrl}
          coachName={coachName}
          coachSlug={coach?.slug}
          mode={atynoModalState.mode}
        />
      )}
    </SoleaScrollProvider>
  );
};
