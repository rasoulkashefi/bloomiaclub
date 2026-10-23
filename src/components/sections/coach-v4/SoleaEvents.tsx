'use client';

import React, { useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowLeft, Calendar, Video } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { SoleaConsultationBanner } from './SoleaConsultationBanner';
import type { CoachProfile } from '@/lib/coaches';
import type { EventItem } from '@/lib/events';

interface SoleaEventsProps {
  coach?: CoachProfile;
  events?: EventItem[];
  onOpenBooking?: (offeringTitle?: string) => void;
}

const formatStatDate = (dateStr?: string): string => {
  if (!dateStr) return 'به زودی';
  const monthMatch = dateStr.match(/(فروردین|اردیبهشت|خرداد|تیر|مرداد|شهریور|مهر|آبان|آذر|دی|بهمن|اسفند)/);
  const dayMatch = dateStr.match(/\b([۱-۹]|[۱-۲][۰-۹]|۳[۰-۱]|\d{1,2})\b/);
  if (dayMatch && monthMatch) {
    return `${dayMatch[1]} ${monthMatch[1]}`;
  }
  return dateStr.replace(/۱۴\d\d/, '').replace(/جمعه|شنبه|یکشنبه|دوشنبه|سه‌شنبه|چهارشنبه|پنج‌شنبه|پنجشنبه/g, '').trim();
};

const formatStatTime = (event: EventItem): string => {
  const weekday = event.formattedDate?.match(/(جمعه|شنبه|یکشنبه|دوشنبه|سه‌شنبه|چهارشنبه|پنج‌شنبه|پنجشنبه)/)?.[1];
  const time = event.formattedTime ? event.formattedTime.replace('تا', '-').trim() : '';
  if (weekday && time) return `${weekday} · ${time}`;
  return time || weekday || 'زمان برگزاری';
};

export const SoleaEvents: React.FC<SoleaEventsProps> = ({ coach, events = [], onOpenBooking }) => {
  const hasEvents = Array.isArray(events) && events.length > 0;
  const coachName = coach?.name || 'فاطمه اسماعیلی';
  const coachSlug = coach?.slug || 'fatemeh_esmaeeli';
  const viewAllUrl = `/events?coach=${coachSlug}`;

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: events.length > 2,
      align: 'start',
      skipSnaps: false,
      direction: 'rtl',
    },
    [
      Autoplay({
        delay: 4500,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // If coach has no events, only render the consultation banner
  if (!hasEvents) {
    return (
      <section className="w-full bg-[#2b544e] py-16 lg:py-20 text-white overflow-hidden">
        <div className="mx-auto max-w-[1360px] px-6 sm:px-10 lg:px-[30px]">
          <SoleaConsultationBanner coach={coach} onOpenBooking={onOpenBooking} />
        </div>
      </section>
    );
  }

  return (
    <section id="events" className="w-full bg-[#2b544e] py-20 lg:py-[120px] text-white overflow-hidden">
      <div className="mx-auto max-w-[1360px] px-6 sm:px-10 lg:px-[30px]">
        
        {/* Section Header with View All Button & Optional Carousel Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-12">
          <div>
            <span className="inline-block text-xs uppercase tracking-widest text-[#dfece9]/90 font-medium mb-3">
              کارگاه‌ها و دوره‌های تعاملی {coachName}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.3] text-white">
              رویدادها و کارگاه‌های
              <br />
              منتخب من
            </h2>
          </div>

          {/* Header Action: View All Link + Carousel Next/Prev Controls */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <Link
              href={viewAllUrl}
              className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-5 sm:px-6 py-3 text-xs sm:text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white hover:text-[#1f3d3a] hover:shadow-xl active:scale-98 min-h-[44px]"
            >
              <span>مشاهده همه رویدادها</span>
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            </Link>

            {events.length > 2 && (
              <div className="hidden md:flex items-center gap-2">
                <button
                  type="button"
                  onClick={scrollPrev}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition-all hover:bg-white hover:text-[#1f3d3a] active:scale-95"
                  aria-label="رویداد قبلی"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={scrollNext}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition-all hover:bg-white hover:text-[#1f3d3a] active:scale-95"
                  aria-label="رویداد بعدی"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Event Cards Display: Centered if 1 item, Carousel if multiple */}
        {events.length === 1 ? (
          <div className="max-w-[700px] mx-auto">
            {events.map((event) => (
              <article
                key={event.id || event.slug}
                className="group flex flex-col justify-between overflow-hidden rounded-[2.5rem] bg-white p-7 sm:p-10 text-[#1e1e1e] shadow-xl"
              >
                <div>
                  {/* Category & Status Badges */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f2f7f6] px-3.5 py-1 text-xs font-bold text-[#1f3d3a]">
                      <Video className="w-3.5 h-3.5 text-[#1f3d3a]" />
                      <span>{event.eventTypeName || 'کارگاه تعاملی'}</span>
                    </span>

                    <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold bg-[#dfece9] text-[#1f3d3a]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#1f3d3a] animate-pulse" />
                      <span>{event.statusName || 'در حال ثبت‌نام'}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold leading-[1.4] text-[#1e1e1e] group-hover:text-[#1f3d3a] transition-colors">
                    <Link href={`/events/${event.slug}`}>
                      {event.title}
                    </Link>
                  </h3>

                  {/* Excerpt */}
                  <p className="mt-3 text-xs sm:text-sm leading-[1.75] text-[#6b6b6b] line-clamp-3">
                    {event.excerpt}
                  </p>

                  {/* 3 Key Highlights Grid (Matching Solea Card Style) */}
                  <div className="my-7 grid grid-cols-3 gap-2 border-y border-black/10 py-5 text-center">
                    <div>
                      <span className="block text-lg sm:text-2xl font-bold text-[#1e1e1e]">
                        {formatStatDate(event.formattedDate)}
                      </span>
                      <span className="mt-1 block text-xs text-[#6b6b6b] line-clamp-1">
                        {formatStatTime(event)}
                      </span>
                    </div>

                    <div>
                      <span className="block text-lg sm:text-2xl font-bold text-[#1e1e1e]">
                        {event.duration || '۹۰ دقیقه'}
                      </span>
                      <span className="mt-1 block text-xs text-[#6b6b6b] line-clamp-1">
                        {event.platformName || 'آنلاین'}
                      </span>
                    </div>

                    <div>
                      <span className="block text-lg sm:text-2xl font-bold text-[#1f3d3a]">
                        {event.formattedPrice || 'رایگان'}
                      </span>
                      <span className="mt-1 block text-xs text-[#6b6b6b] line-clamp-1">
                        {event.originalPrice ? 'با تخفیف ویژه' : 'هزینه ثبت‌نام'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Photo / Poster */}
                <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden rounded-2xl bg-[#f2f7f6]">
                  <Image
                    src={event.coverImage || '/images/solea/img_5.png'}
                    alt={event.coverImageAlt || event.title}
                    fill
                    unoptimized={Boolean(event.coverImage?.includes('sanity.io'))}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 700px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70" />
                  <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between text-white text-xs">
                    <span className="rounded-full bg-black/55 backdrop-blur-md px-3 py-1 font-medium truncate max-w-[85%]">
                      {event.location}
                    </span>
                  </div>
                </div>

                {/* Card Action Button */}
                <div className="mt-6 pt-2">
                  <Link
                    href={`/events/${event.slug}`}
                    className="inline-flex w-full items-center justify-between rounded-full border border-[#e5e5e2] bg-[#fafaf8] px-5 py-3 text-xs sm:text-sm font-bold text-[#1f3d3a] transition-all duration-300 group-hover:border-[#1f3d3a] group-hover:bg-[#1f3d3a] group-hover:text-white shadow-soft-sm min-h-[44px]"
                  >
                    <span>مشاهده جزئیات و ثبت‌نام کارگاه</span>
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
            <div className="flex -ms-6">
              {events.map((event, idx) => (
                <div
                  key={event.id || event.slug || idx}
                  className="min-w-0 flex-[0_0_100%] ps-6 md:flex-[0_0_50%]"
                >
                  <article
                    className="group flex flex-col justify-between overflow-hidden rounded-[2.5rem] bg-white p-7 sm:p-10 text-[#1e1e1e] shadow-xl h-full"
                  >
                    <div>
                      {/* Category & Status Badges */}
                      <div className="flex items-center justify-between gap-3 mb-5">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f2f7f6] px-3.5 py-1 text-xs font-bold text-[#1f3d3a]">
                          <Video className="w-3.5 h-3.5 text-[#1f3d3a]" />
                          <span>{event.eventTypeName || 'کارگاه تعاملی'}</span>
                        </span>

                        <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold bg-[#dfece9] text-[#1f3d3a]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#1f3d3a] animate-pulse" />
                          <span>{event.statusName || 'در حال ثبت‌نام'}</span>
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl sm:text-2xl font-bold leading-[1.4] text-[#1e1e1e] group-hover:text-[#1f3d3a] transition-colors">
                        <Link href={`/events/${event.slug}`}>
                          {event.title}
                        </Link>
                      </h3>

                      {/* Excerpt */}
                      <p className="mt-3 text-xs sm:text-sm leading-[1.75] text-[#6b6b6b] line-clamp-3">
                        {event.excerpt}
                      </p>

                      {/* 3 Key Highlights Grid */}
                      <div className="my-7 grid grid-cols-3 gap-2 border-y border-black/10 py-5 text-center">
                        <div>
                          <span className="block text-lg sm:text-2xl font-bold text-[#1e1e1e]">
                            {formatStatDate(event.formattedDate)}
                          </span>
                          <span className="mt-1 block text-xs text-[#6b6b6b] line-clamp-1">
                            {formatStatTime(event)}
                          </span>
                        </div>

                        <div>
                          <span className="block text-lg sm:text-2xl font-bold text-[#1e1e1e]">
                            {event.duration || '۹۰ دقیقه'}
                          </span>
                          <span className="mt-1 block text-xs text-[#6b6b6b] line-clamp-1">
                            {event.platformName || 'آنلاین'}
                          </span>
                        </div>

                        <div>
                          <span className="block text-lg sm:text-2xl font-bold text-[#1f3d3a]">
                            {event.formattedPrice || 'رایگان'}
                          </span>
                          <span className="mt-1 block text-xs text-[#6b6b6b] line-clamp-1">
                            {event.originalPrice ? 'با تخفیف ویژه' : 'هزینه ثبت‌نام'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Photo / Poster */}
                    <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden rounded-2xl bg-[#f2f7f6]">
                      <Image
                        src={event.coverImage || '/images/solea/img_5.png'}
                        alt={event.coverImageAlt || event.title}
                        fill
                        unoptimized={Boolean(event.coverImage?.includes('sanity.io'))}
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70" />
                      <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between text-white text-xs">
                        <span className="rounded-full bg-black/55 backdrop-blur-md px-3 py-1 font-medium truncate max-w-[85%]">
                          {event.location}
                        </span>
                      </div>
                    </div>

                    {/* Card Action Button */}
                    <div className="mt-6 pt-2">
                      <Link
                        href={`/events/${event.slug}`}
                        className="inline-flex w-full items-center justify-between rounded-full border border-[#e5e5e2] bg-[#fafaf8] px-5 py-3 text-xs sm:text-sm font-bold text-[#1f3d3a] transition-all duration-300 group-hover:border-[#1f3d3a] group-hover:bg-[#1f3d3a] group-hover:text-white shadow-soft-sm min-h-[44px]"
                      >
                        <span>مشاهده جزئیات و ثبت‌نام کارگاه</span>
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                      </Link>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Book your free Clarity consultation Banner Card */}
        <SoleaConsultationBanner coach={coach} onOpenBooking={onOpenBooking} />

      </div>
    </section>
  );
};
