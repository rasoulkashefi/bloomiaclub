'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Star, Clock, Users, ArrowLeft, Calendar, SearchX } from 'lucide-react';
import { AtynoBookingModal } from '@/components/coach/AtynoBookingModal';
import type { Coach, CoachProfile } from '@/lib/coaches';

interface CoachGridSectionProps {
  coaches: (Coach | CoachProfile)[];
  onResetFilters: () => void;
}

// Helper to resolve the canonical Atyno embed booking URL if coach is on Atyno
function resolveCoachAtynoUrl(coach: Coach | CoachProfile): string | null {
  const c = coach as any;
  const introService = c.services?.find(
    (s: any) =>
      s.isFree ||
      s.title?.includes('صفر') ||
      s.title?.includes('معارفه') ||
      s.title?.includes('آشنایی') ||
      s.id?.includes('intro')
  );

  const url = introService?.bookingUrl || coach.bookingUrl;
  if (!url || !url.includes('atyno.com')) return null;

  // Convert legacy/public slug to embed format if needed
  if (url.includes('/fatemeh/zero') || coach.slug.includes('fatemeh')) {
    return 'https://atyno.com/fa/embed/934b33a2-9888-4209-9901-b9632e812e6c?meeting=zero';
  }

  return url;
}

export const CoachGridSection: React.FC<CoachGridSectionProps> = ({
  coaches,
  onResetFilters,
}) => {
  const router = useRouter();

  // Modal state for in-page Atyno booking popup
  const [atynoModal, setAtynoModal] = useState<{
    isOpen: boolean;
    title: string;
    bookingUrl: string;
    coachName: string;
    coachSlug: string;
  }>({
    isOpen: false,
    title: '',
    bookingUrl: '',
    coachName: '',
    coachSlug: '',
  });

  // Collect distinct Atyno URLs for background cache warming
  const atynoPreloadUrls = useMemo(() => {
    const urls = new Set<string>();
    coaches.forEach((c) => {
      const u = resolveCoachAtynoUrl(c);
      if (u) urls.add(u);
    });
    return Array.from(urls);
  }, [coaches]);

  // Non-blocking background preload engine: starts only after window.onload + idle
  const [shouldPreload, setShouldPreload] = useState(false);

  useEffect(() => {
    if (atynoPreloadUrls.length === 0) return;
    if (typeof navigator !== 'undefined' && (navigator as any).connection?.saveData) {
      return;
    }

    let idleId: number | null = null;
    let timeoutId: NodeJS.Timeout | null = null;

    const startWarmup = () => {
      if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
        idleId = (window as any).requestIdleCallback(() => setShouldPreload(true), { timeout: 3500 });
      } else {
        timeoutId = setTimeout(() => setShouldPreload(true), 2500);
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
  }, [atynoPreloadUrls]);

  const handleOpenAtynoBooking = (coach: Coach | CoachProfile, atynoUrl: string) => {
    const c = coach as any;
    const introService = c.services?.find(
      (s: any) =>
        s.isFree ||
        s.title?.includes('صفر') ||
        s.title?.includes('معارفه') ||
        s.title?.includes('آشنایی') ||
        s.id?.includes('intro')
    );
    const title = introService?.duration
      ? `${introService.title} (${introService.duration})`
      : (introService?.title || 'رزرو آنلاین جلسه معارفه');

    setAtynoModal({
      isOpen: true,
      title,
      bookingUrl: atynoUrl,
      coachName: coach.name,
      coachSlug: coach.slug,
    });
  };

  // Whole card click navigation to coach profile (ignoring clicks on buttons/links)
  const handleCardClick = (slug: string, e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('a')) {
      return;
    }
    router.push(`/coaches/${slug}`);
  };

  if (coaches.length === 0) {
    return (
      <section className="py-16 bg-brand-surface">
        <div className="max-w-md mx-auto px-4 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-brand-teal-50 text-brand-teal-800 mx-auto flex items-center justify-center shadow-xs">
            <SearchX className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-brand-neutral-900">
            کوچی با این مشخصات یافت نشد
          </h3>
          <p className="text-sm text-brand-neutral-600 leading-relaxed">
            لطفاً عبارت جستجو را تغییر دهید یا فیلترهای انتخابی را بازنشانی کنید تا همه کوچ‌ها نمایش داده شوند.
          </p>
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-brand-teal-900 text-white text-sm font-semibold hover:bg-brand-teal-800 transition-colors shadow-soft min-h-[44px] cursor-pointer"
          >
            <span>نمایش همه کوچ‌ها</span>
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 md:py-16 bg-brand-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid: 1 col on mobile, 2 col on tablet, 3 col on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {coaches.map((coach) => {
            const avatarUrl = coach.imageUrl || '/images/default-coach-avatar.webp';
            const hours = coach.coachingHours
              ? `+${Number(coach.coachingHours).toLocaleString('fa-IR')}`
              : '+۰';
            const clients = coach.satisfiedClients
              ? Number(coach.satisfiedClients).toLocaleString('fa-IR')
              : '۰';

            const atynoUrl = resolveCoachAtynoUrl(coach);
            const isAtyno = Boolean(atynoUrl);

            return (
              <article
                key={coach.id}
                onClick={(e) => handleCardClick(coach.slug, e)}
                className="bg-brand-surface-paper rounded-3xl border border-brand-neutral-200/90 p-5 sm:p-6 shadow-soft hover:shadow-elevated hover:border-brand-teal-300 transition-all duration-300 flex flex-col justify-between space-y-4 group cursor-pointer select-none"
              >
                <div className="space-y-4">
                  {/* Coach Top Row: Avatar + Info */}
                  <div className="flex items-start gap-4">
                    <Link
                      href={`/coaches/${coach.slug}`}
                      tabIndex={-1}
                      onClick={(e) => e.stopPropagation()}
                      className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-brand-neutral-100 border-2 border-brand-teal-100 shrink-0 shadow-xs group-hover:border-brand-teal-400 transition-colors"
                      aria-label={`پروفایل ${coach.name}`}
                    >
                      <Image
                        src={avatarUrl}
                        alt={coach.name}
                        fill
                        sizes="(max-width: 640px) 64px, 80px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-base sm:text-lg font-bold text-brand-neutral-900 truncate">
                          <Link
                            href={`/coaches/${coach.slug}`}
                            onClick={(e) => e.stopPropagation()}
                            className="hover:text-brand-teal-800 transition-colors"
                          >
                            {coach.name}
                          </Link>
                        </h3>
                        {/* Rating */}
                        <div className="flex items-center gap-1 text-xs font-semibold text-brand-neutral-700 shrink-0 bg-brand-neutral-100/70 px-2 py-0.5 rounded-full">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{coach.rating}</span>
                          {coach.totalReviews > 0 && (
                            <span className="text-brand-neutral-600 text-[11px]">
                              ({coach.totalReviews})
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-xs text-brand-teal-800 font-semibold line-clamp-1">
                        {coach.title}
                      </p>

                      {/* Specialties tags */}
                      {coach.specialties && coach.specialties.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {coach.specialties.slice(0, 3).map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-brand-teal-50 text-brand-teal-900 border border-brand-teal-100/60"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bio snippet */}
                  <p className="text-xs sm:text-sm text-brand-neutral-600 leading-relaxed line-clamp-2">
                    {coach.description}
                  </p>

                  {/* Stats Row */}
                  <div className="pt-3 border-t border-brand-neutral-100 flex items-center justify-between text-xs text-brand-neutral-600">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-brand-teal-700" />
                      <span>{hours} ساعت تجربه</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-brand-teal-700" />
                      <span>{clients} مراجع راضی</span>
                    </div>
                  </div>
                </div>

                {/* Actions Row */}
                <div className="pt-2 flex items-center gap-2">
                  {/* Smart Booking CTA: Atyno Modal for Atyno coaches, Intro Lead page for others */}
                  {isAtyno && atynoUrl ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenAtynoBooking(coach, atynoUrl);
                      }}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-full bg-brand-teal-900 hover:bg-brand-teal-800 text-white font-bold text-xs sm:text-sm transition-colors shadow-soft min-h-[44px] cursor-pointer active:scale-98"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>رزرو جلسه معارفه</span>
                    </button>
                  ) : (
                    <Link
                      href={`/coaching/free-intro-session?coach=${coach.slug}`}
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`رزرو جلسه معارفه با ${coach.name}`}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-full bg-brand-teal-900 hover:bg-brand-teal-800 text-white font-bold text-xs sm:text-sm transition-colors shadow-soft min-h-[44px] cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>رزرو جلسه معارفه</span>
                    </Link>
                  )}

                  {/* View Profile Button */}
                  <Link
                    href={`/coaches/${coach.slug}`}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center justify-center gap-1 px-3 py-2.5 rounded-full bg-brand-surface border border-brand-neutral-300 hover:bg-brand-teal-50 hover:text-brand-teal-900 text-brand-neutral-700 font-semibold text-xs sm:text-sm transition-colors min-h-[44px] cursor-pointer"
                    aria-label={`مشاهده پروفایل ${coach.name}`}
                  >
                    <span>پروفایل</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Smart In-Page Atyno Booking Modal */}
      {atynoModal.isOpen && (
        <AtynoBookingModal
          isOpen={atynoModal.isOpen}
          onClose={() => setAtynoModal((prev) => ({ ...prev, isOpen: false }))}
          title={atynoModal.title}
          bookingUrl={atynoModal.bookingUrl}
          coachName={atynoModal.coachName}
          coachSlug={atynoModal.coachSlug}
          onFallbackLead={() => {
            setAtynoModal((prev) => ({ ...prev, isOpen: false }));
            router.push(`/coaching/free-intro-session?coach=${atynoModal.coachSlug}`);
          }}
        />
      )}

      {/* Non-blocking Background Preload for Atyno calendar embeds (Warms up browser cache during idle) */}
      {shouldPreload && atynoPreloadUrls.length > 0 && (
        <div
          aria-hidden="true"
          style={{
            position: 'fixed',
            top: -9999,
            left: -9999,
            width: 1,
            height: 1,
            opacity: 0,
            pointerEvents: 'none',
          }}
        >
          {atynoPreloadUrls.map((url, idx) => (
            <iframe
              key={idx}
              src={url}
              tabIndex={-1}
              title={`atyno-warmup-${idx}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};
