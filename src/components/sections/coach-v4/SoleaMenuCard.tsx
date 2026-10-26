'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, ChevronUp, Globe } from 'lucide-react';
import type { CoachProfile } from '@/lib/coaches';

const LinkedinIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

interface SoleaMenuCardProps {
  coach?: CoachProfile;
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking?: (offeringTitle?: string) => void;
}

export const SoleaMenuCard: React.FC<SoleaMenuCardProps> = ({
  coach,
  isOpen,
  onClose,
  onOpenBooking,
}) => {
  const [pagesExpanded, setPagesExpanded] = useState(false);
  const isMahya = coach?.slug?.includes('mahya');
  const isFatemeh = coach?.slug === 'fatemeh_esmaeeli';
  const isAtynoCoach = Boolean(coach?.bookingUrl && coach.bookingUrl.includes('atyno.com'));
  const coachName = coach?.name || (isFatemeh ? 'فاطمه اسماعیلی' : (isMahya ? 'محیا شکوری' : 'کوچ بلومیا'));
  const bookingLink = coach?.bookingUrl || (isFatemeh ? 'https://atyno.com/fatemeh/zero' : '#contact');

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px]"
          />

          {/* Menu Card positioned at top-start (top-right in RTL) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20, x: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20, x: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed start-4 top-4 z-50 w-[calc(100vw-32px)] max-w-[380px] overflow-hidden rounded-[20px] bg-[#1f3d3a] p-7 text-white shadow-2xl sm:start-8 sm:top-8 sm:p-8"
          >
            {/* Header: Close Button */}
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="font-serif text-lg font-bold text-white">
                {coachName}
              </span>
              <button
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="بستن منو"
              >
                <X className="h-5 w-5 stroke-[2]" />
              </button>
            </div>

            {/* Navigation links */}
            <nav className="mt-5 flex flex-col gap-2 font-serif">
              <Link
                href="#about"
                onClick={onClose}
                className="py-1 text-2xl font-normal leading-[1.6] text-white transition-colors hover:text-[#dfece9] sm:text-[28px]"
              >
                درباره من
              </Link>
              <Link
                href="#services"
                onClick={onClose}
                className="py-1 text-2xl font-normal leading-[1.6] text-white transition-colors hover:text-[#dfece9] sm:text-[28px]"
              >
                حوزه‌های همراهی
              </Link>
              <Link
                href="#events"
                onClick={onClose}
                className="py-1 text-2xl font-normal leading-[1.6] text-white transition-colors hover:text-[#dfece9] sm:text-[28px]"
              >
                رویدادها و کارگاه‌ها
              </Link>
              <Link
                href="#testimonials"
                onClick={onClose}
                className="py-1 text-2xl font-normal leading-[1.6] text-white transition-colors hover:text-[#dfece9] sm:text-[28px]"
              >
                نظرات مراجعان
              </Link>
              <Link
                href="#pricing"
                onClick={onClose}
                className="py-1 text-2xl font-normal leading-[1.6] text-white transition-colors hover:text-[#dfece9] sm:text-[28px]"
              >
                بسته‌ها و تعرفه
              </Link>

              {/* Pages Accordion */}
              <div className="py-1">
                <button
                  type="button"
                  onClick={() => setPagesExpanded(!pagesExpanded)}
                  className={`flex w-full items-center justify-between text-start text-2xl font-normal leading-[1.6] transition-colors sm:text-[28px] ${
                    pagesExpanded ? 'text-[#dfece9]' : 'text-white hover:text-[#dfece9]'
                  }`}
                >
                  <span>بخش‌های تکمیلی</span>
                  {pagesExpanded ? (
                    <ChevronUp className="h-5 w-5 stroke-[2]" />
                  ) : (
                    <ChevronDown className="h-5 w-5 stroke-[2]" />
                  )}
                </button>

                <AnimatePresence>
                  {pagesExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-2.5 pt-3 ps-3 font-sans text-sm text-white/80 border-s border-white/20 my-1">
                        <Link
                          href="#consultation"
                          onClick={onClose}
                          className="transition-colors hover:text-[#dfece9]"
                        >
                          جلسه معارفه رایگان (جلسه صفر)
                        </Link>
                        <Link
                          href="#blog"
                          onClick={onClose}
                          className="transition-colors hover:text-[#dfece9]"
                        >
                          مقالات و یادداشت‌ها
                        </Link>
                        <Link
                          href="/"
                          onClick={onClose}
                          className="transition-colors hover:text-[#dfece9]"
                        >
                          باشگاه کوچ‌های بلومیا کلاب
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="#blog"
                onClick={onClose}
                className="text-2xl font-normal text-white transition-colors hover:text-[#dfece9] sm:text-[28px]"
              >
                مقالات
              </Link>
              <Link
                href="#contact"
                onClick={onClose}
                className="text-2xl font-normal text-white transition-colors hover:text-[#dfece9] sm:text-[28px]"
              >
                تماس و رزرو
              </Link>
            </nav>

            {/* Divider */}
            <div className="my-5 border-t border-white/15" />

            {/* Booking Contact */}
            <div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onOpenBooking) {
                    onOpenBooking();
                  } else {
                    window.location.href = bookingLink;
                  }
                }}
                className="inline-flex items-center justify-center w-full rounded-xl bg-[#dfece9] px-4 py-3 font-sans text-sm font-semibold text-[#1f3d3a] transition-all hover:bg-white cursor-pointer"
              >
                رزرو آنلاین جلسه معارفه
              </button>
            </div>

            {/* Social Icons */}
            <div className="mt-5 flex items-center justify-center gap-3">
              {coach?.instagramUrl && (
                <a
                  href={coach.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/90 transition-all hover:border-white hover:bg-white hover:text-[#1f3d3a]"
                  aria-label="اینستاگرام"
                >
                  <InstagramIcon />
                </a>
              )}
              {coach?.linkedinUrl && (
                <a
                  href={coach.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/90 transition-all hover:border-white hover:bg-white hover:text-[#1f3d3a]"
                  aria-label="لینکدین"
                >
                  <LinkedinIcon />
                </a>
              )}
              <a
                href="https://bloomiaclub.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/90 transition-all hover:border-white hover:bg-white hover:text-[#1f3d3a]"
                aria-label="بلومیا کلاب"
              >
                <Globe className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
