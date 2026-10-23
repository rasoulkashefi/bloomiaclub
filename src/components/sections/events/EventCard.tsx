'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ExternalLink, ArrowLeft } from 'lucide-react';
import type { EventItem } from '@/lib/events';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';

interface EventCardProps {
  event: EventItem;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const isFree = event.price === 0;

  return (
    <article className="group flex flex-col h-full bg-brand-surface-paper rounded-3xl overflow-hidden border border-brand-neutral-200/90 shadow-soft hover:shadow-elevated hover:border-brand-teal-400/50 transition-all duration-300 hover:-translate-y-1">
      {/* Cover Image & Badges */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-brand-neutral-100 block shrink-0">
        <Link href={`/events/${event.slug}`} tabIndex={-1} aria-hidden="true">
          <Image
            src={event.coverImage}
            alt={event.coverImageAlt || event.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-3.5 right-3.5 left-3.5 z-10 flex items-center justify-between gap-2">
          {/* Format badge */}
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-brand-surface-paper/95 backdrop-blur-md text-brand-teal-900 shadow-soft-sm border border-brand-neutral-200/60">
            {event.eventTypeName}
          </span>

          {/* Platform badge */}
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-brand-teal-900/90 backdrop-blur-md text-white shadow-soft-sm">
            {event.platformName}
          </span>
        </div>

        {/* Status Indicator at bottom of cover */}
        <div className="absolute bottom-3 right-3 z-10">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold backdrop-blur-md ${
              event.status === 'open'
                ? 'bg-brand-teal-50/95 text-brand-teal-900 border border-brand-teal-200'
                : event.status === 'soon'
                  ? 'bg-amber-50/95 text-amber-900 border border-amber-200'
                  : 'bg-brand-neutral-100/95 text-brand-neutral-700 border border-brand-neutral-300'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                event.status === 'open'
                  ? 'bg-brand-teal-600 animate-pulse'
                  : event.status === 'soon'
                    ? 'bg-amber-500'
                    : 'bg-brand-neutral-400'
              }`}
            />
            {event.statusName}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-1 p-5 sm:p-6 justify-between gap-5">
        <div className="space-y-3.5">
          {/* Date & Time Metadata */}
          <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-brand-neutral-600 font-medium">
            <div className="flex items-center gap-1 text-brand-teal-800 font-semibold">
              <Calendar className="w-3.5 h-3.5 shrink-0" />
              <span>{event.formattedDate}</span>
            </div>
            {event.formattedTime && (
              <>
                <span className="w-1 h-1 rounded-full bg-brand-neutral-300" />
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 shrink-0 text-brand-neutral-500" />
                  <span>{event.formattedTime}</span>
                </div>
              </>
            )}
          </div>

          {/* Title */}
          <h3 className="text-base sm:text-lg font-bold text-brand-neutral-900 group-hover:text-brand-teal-900 transition-colors line-clamp-2 leading-snug">
            <Link href={`/events/${event.slug}`} className="touch-auto">
              {event.title}
            </Link>
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-brand-neutral-600 line-clamp-2 leading-relaxed">
            {event.excerpt}
          </p>

          {/* Coach info miniature */}
          {event.coach && (
            <div className="pt-2 flex items-center justify-between border-t border-brand-neutral-100">
              <Link
                href={`/coaches/${event.coach.slug}`}
                className="flex items-center gap-2.5 group/coach hover:opacity-80 transition-opacity"
              >
                <div className="relative w-8 h-8 rounded-full overflow-hidden bg-brand-teal-100 border border-brand-teal-200 shrink-0">
                  <Image
                    src={event.coach.imageUrl || '/images/coaches/default.webp'}
                    alt={event.coach.name}
                    fill
                    className="object-cover"
                    sizes="32px"
                  />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-brand-neutral-900 group-hover/coach:text-brand-teal-800">
                    کوچ: {event.coach.name}
                  </p>
                  <p className="text-[11px] text-brand-neutral-500 line-clamp-1">{event.coach.title}</p>
                </div>
              </Link>
            </div>
          )}
        </div>

        {/* Pricing & Actions */}
        <div className="pt-3 border-t border-brand-neutral-200/70 space-y-3">
          {/* Price line */}
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-brand-neutral-500">هزینه ثبت‌نام:</span>
            <div className="flex items-center gap-1.5">
              {event.originalPrice && event.originalPrice > event.price && (
                <span className="text-xs text-brand-neutral-400 line-through">
                  {event.originalPrice.toLocaleString('fa-IR')}
                </span>
              )}
              <span
                className={`text-sm sm:text-base font-extrabold ${
                  isFree ? 'text-brand-teal-700' : 'text-brand-neutral-900'
                }`}
              >
                {event.formattedPrice}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            {/* View Details button */}
            <Link
              href={`/events/${event.slug}`}
              className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-3 py-2 rounded-full border border-brand-neutral-300 text-brand-neutral-800 hover:bg-brand-neutral-100 hover:border-brand-neutral-400 text-xs font-bold transition-colors"
            >
              <span>جزئیات رویداد</span>
              <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
            </Link>

            {/* External Registration Button */}
            <a
              href={event.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-3 py-2 rounded-full bg-brand-teal-900 hover:bg-brand-teal-800 text-white text-xs font-bold transition-all shadow-soft active:scale-[0.98]"
            >
              <span>ثبت‌نام در {event.platformName}</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};
