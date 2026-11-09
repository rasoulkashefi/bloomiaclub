'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { CheckCircle2, AlertCircle, X, Calendar, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
import { SoleaFaq } from '@/components/sections/coach-v4/SoleaFaq';
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

  // Dynamic introductory session directly from coach.services (synced from Atyno)
  const introService = useMemo(() => {
    return (
      coach?.services?.find((s) => s.isFree || s.title?.includes('صفر') || s.title?.includes('معارفه') || s.title?.includes('آشنایی') || s.id?.includes('intro')) ||
      coach?.services?.[0]
    );
  }, [coach]);

  const defaultIntroTitle = useMemo(() => {
    if (!introService) return 'رزرو آنلاین جلسه معارفه';
    return introService.duration ? `${introService.title} (${introService.duration})` : introService.title;
  }, [introService]);

  const defaultBookingUrl = useMemo(() => {
    return introService?.bookingUrl || coach?.bookingUrl || '';
  }, [introService, coach]);

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
    title: defaultIntroTitle,
    bookingUrl: defaultBookingUrl,
    mode: 'online',
  });

  // Background Preload Engine: Warms up Atyno calendar in browser cache during idle
  const [shouldPreloadIframe, setShouldPreloadIframe] = useState(false);

  useEffect(() => {
    if (!isAtynoCoach || !defaultBookingUrl) return;
    if (typeof navigator !== 'undefined' && (navigator as any).connection?.saveData) {
      return;
    }

    let idleId: number | null = null;
    let timeoutId: NodeJS.Timeout | null = null;

    const startWarmup = () => {
      if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
        idleId = (window as any).requestIdleCallback(() => setShouldPreloadIframe(true), { timeout: 3000 });
      } else {
        timeoutId = setTimeout(() => setShouldPreloadIframe(true), 2000);
      }
    };

    if (typeof document !== 'undefined' && document.readyState === 'complete') {
      startWarmup();
    } else if (typeof window !== 'undefined') {
      window.addEventListener('load', startWarmup, { once: true });
    }

    return () => {
      if (idleId && typeof window !== 'undefined' && 'cancelIdleCallback' in window) {
        (window as any).cancelIdleCallback(idleId);
      }
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isAtynoCoach, defaultBookingUrl]);

  const [paymentNotice, setPaymentNotice] = useState<{
    type: 'success' | 'failed';
    bookingUid?: string;
  } | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const params = new URLSearchParams(window.location.search);
      const payment = params.get('payment');
      const bookingUid = params.get('bookingUid');

      if (payment === 'success') {
        setPaymentNotice({ type: 'success', bookingUid: bookingUid || undefined });
        const cleanUrl = window.location.pathname;
        window.history.replaceState({}, '', cleanUrl);
      } else if (payment === 'failed') {
        setPaymentNotice({ type: 'failed' });
        const cleanUrl = window.location.pathname;
        window.history.replaceState({}, '', cleanUrl);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleCopyBookingUid = () => {
    if (!paymentNotice?.bookingUid) return;
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(paymentNotice.bookingUid);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleOpenBooking = (offeringTitle?: string, bookingUrl?: string, mode?: string) => {
    const effectiveTitle = offeringTitle || defaultIntroTitle;
    const effectiveUrl = bookingUrl || defaultBookingUrl;
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

      {/* Frequently Asked Questions (SEO & GEO) */}
      <SoleaFaq coach={coach} onOpenBooking={handleOpenBooking} />

      {/* Contact Form & Footer */}
      <SoleaContact coach={coach} onOpenBooking={handleOpenBooking} />

      {/* Internal Lead Booking Modal (Direct Coordination via WhatsApp/SMS/Telegram) */}
      <CoachLeadBookingModal
        isOpen={leadModalOpen}
        onClose={() => setLeadModalOpen(false)}
        coachName={coachName}
        coachTitle={coachTitle}
        coachAvatar={coachAvatar}
        initialOfferingTitle={selectedOffering || defaultIntroTitle}
        offerings={offerings}
      />

      {/* Atyno Booking Modal for Atyno-integrated Coaches */}
      {isAtynoCoach && (
        <AtynoBookingModal
          isOpen={atynoModalState.isOpen}
          onClose={() => setAtynoModalState((prev) => ({ ...prev, isOpen: false }))}
          title={atynoModalState.title || defaultIntroTitle}
          bookingUrl={atynoModalState.bookingUrl || defaultBookingUrl}
          coachName={coachName}
          coachSlug={coach?.slug}
          mode={atynoModalState.mode}
          onFallbackLead={() => {
            setSelectedOffering(atynoModalState.title || defaultIntroTitle);
            setLeadModalOpen(true);
          }}
        />
      )}

      {/* Background Preload for Atyno Calendar (Warms up browser HTTP cache during idle) */}
      {isAtynoCoach && shouldPreloadIframe && defaultBookingUrl && (
        <div
          aria-hidden="true"
          style={{ position: 'fixed', top: -9999, left: -9999, width: 1, height: 1, opacity: 0, pointerEvents: 'none' }}
        >
          <iframe
            src={defaultBookingUrl}
            tabIndex={-1}
            title="atyno-warmup"
          />
        </div>
      )}

      {/* Payment Result Notification Modal (Returning from Payment Gateway) */}
      <AnimatePresence>
        {paymentNotice && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6" dir="rtl">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPaymentNotice(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 text-center shadow-2xl border border-[#e5e5e2]"
            >
              <button
                type="button"
                onClick={() => setPaymentNotice(null)}
                aria-label="بستن"
                className="absolute top-4 left-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/5 text-[#6b6b6b] hover:bg-black/10 active:scale-95 transition"
              >
                <X className="h-4 w-4" />
              </button>

              {paymentNotice.type === 'success' ? (
                <>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#dfece9] text-[#1f3d3a] ring-8 ring-[#dfece9]/50">
                    <CheckCircle2 className="h-8 w-8 stroke-[2.2]" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-[#1f3d3a]">
                    رزرو و پرداخت شما با موفقیت تأیید شد!
                  </h3>
                  <p className="mt-2 text-sm text-[#6b6b6b] leading-relaxed">
                    جلسه شما با {coachName} با موفقیت در تقویم ثبت شد. جزئیات جلسه و لینک ورود اختصاصی به شماره همراه و ایمیل شما پیامک و ارسال گردید.
                  </p>

                  {paymentNotice.bookingUid && (
                    <div className="mt-5 flex items-center justify-between rounded-xl bg-[#fafaf8] border border-[#e5e5e2] p-3 text-xs sm:text-sm">
                      <span className="text-[#6b6b6b]">کد پیگیری رزرو:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-[#1f3d3a]" dir="ltr">
                          {paymentNotice.bookingUid}
                        </span>
                        <button
                          type="button"
                          onClick={handleCopyBookingUid}
                          className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-white border border-[#e5e5e2] text-[#1f3d3a] hover:bg-[#dfece9]/50 transition"
                          title="کپی کد پیگیری"
                        >
                          {copiedCode ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={() => setPaymentNotice(null)}
                      className="w-full inline-flex items-center justify-center rounded-2xl bg-[#1f3d3a] py-3.5 px-6 text-sm font-bold text-white transition hover:bg-[#2b544e] active:scale-98 shadow-sm cursor-pointer"
                    >
                      متوجه شدم
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-700 ring-8 ring-amber-50/50">
                    <AlertCircle className="h-8 w-8 stroke-[2.2]" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-[#1e1e1e]">
                    پرداخت انجام نشد یا لغو گردید
                  </h3>
                  <p className="mt-2 text-sm text-[#6b6b6b] leading-relaxed">
                    تراکنش بانکی تکمیل نشد. در صورتی که مبلغی از حساب شما کسر شده است، ظرف حداکثر ۷۲ ساعت توسط بانک به حسابتان بازگردانده می‌شود.
                  </p>

                  <div className="mt-6 flex flex-col gap-2.5">
                    <button
                      type="button"
                      onClick={() => {
                        setPaymentNotice(null);
                        handleOpenBooking();
                      }}
                      className="w-full inline-flex items-center justify-center rounded-2xl bg-[#1f3d3a] py-3.5 px-6 text-sm font-bold text-white transition hover:bg-[#2b544e] active:scale-98 shadow-sm cursor-pointer"
                    >
                      تلاش مجدد برای رزرو
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentNotice(null)}
                      className="w-full inline-flex items-center justify-center rounded-2xl bg-black/5 py-3 px-6 text-sm font-semibold text-[#1e1e1e] transition hover:bg-black/10 active:scale-98 cursor-pointer"
                    >
                      بستن
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </SoleaScrollProvider>
  );
};
