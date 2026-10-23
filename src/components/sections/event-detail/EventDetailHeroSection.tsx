'use client';

import React from 'react';
import Link from 'next/image';
import Image from 'next/image';
import NextLink from 'next/link';
import { Calendar, Clock, Video, ExternalLink, ShieldCheck, Star } from 'lucide-react';
import type { EventItem } from '@/lib/events';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';

interface EventDetailHeroSectionProps {
  event: EventItem;
}

export const EventDetailHeroSection: React.FC<EventDetailHeroSectionProps> = ({ event }) => {
  return (
    <section className="relative pt-8 pb-12 sm:pt-12 sm:pb-16 bg-gradient-to-b from-brand-teal-50/60 via-brand-surface to-brand-surface border-b border-brand-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumbs
            items={[
              { label: 'صفحه اصلی', href: '/' },
              { label: 'رویدادها و وبینارها', href: '/events' },
              { label: event.title },
            ]}
          />
        </div>

        {/* Badges Bar */}
        <div className="flex flex-wrap items-center gap-2.5 mb-5">
          <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-extrabold bg-brand-teal-900 text-white shadow-soft-sm">
            {event.eventTypeName}
          </span>

          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-brand-surface-paper text-brand-teal-900 border border-brand-teal-200 shadow-soft-sm">
            {event.platformName}
          </span>

          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
              event.status === 'open'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : event.status === 'soon'
                  ? 'bg-amber-50 text-amber-800 border border-amber-200'
                  : 'bg-brand-neutral-100 text-brand-neutral-700 border border-brand-neutral-300'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                event.status === 'open'
                  ? 'bg-emerald-600 animate-pulse'
                  : event.status === 'soon'
                    ? 'bg-amber-500'
                    : 'bg-brand-neutral-400'
              }`}
            />
            {event.statusName}
          </span>
        </div>

        {/* Event Title (H1) */}
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-brand-neutral-900 tracking-tight leading-[1.3] max-w-4xl">
          {event.title}
        </h1>

        {/* Excerpt */}
        <p className="mt-4 text-base sm:text-lg text-brand-neutral-600 leading-relaxed max-w-3xl">
          {event.excerpt}
        </p>

        {/* Meta Grid & Host Coach Bar */}
        <div className="mt-8 pt-6 border-t border-brand-neutral-200/80 flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Coach info */}
          {event.coach && (
            <NextLink
              href={`/coaches/${event.coach.slug}`}
              className="flex items-center gap-3.5 group hover:opacity-90 transition-opacity"
            >
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-brand-teal-100 border-2 border-brand-teal-300 shrink-0 shadow-soft-sm">
                <Image
                  src={event.coach.imageUrl || '/images/coaches/default.webp'}
                  alt={event.coach.name}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-extrabold text-brand-neutral-900 group-hover:text-brand-teal-800 transition-colors">
                    کوچ مدرس: {event.coach.name}
                  </span>
                  {event.coach.rating && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                      {event.coach.rating.toLocaleString('fa-IR')}
                    </span>
                  )}
                </div>
                <p className="text-xs text-brand-neutral-500 mt-0.5">{event.coach.title}</p>
              </div>
            </NextLink>
          )}

          {/* Quick timing tags */}
          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-brand-neutral-700 font-medium">
            <div className="flex items-center gap-2 bg-brand-surface-paper px-3.5 py-2 rounded-2xl border border-brand-neutral-200 shadow-soft-sm">
              <Calendar className="w-4 h-4 text-brand-teal-800 shrink-0" />
              <span>{event.formattedDate}</span>
            </div>
            {event.formattedTime && (
              <div className="flex items-center gap-2 bg-brand-surface-paper px-3.5 py-2 rounded-2xl border border-brand-neutral-200 shadow-soft-sm">
                <Clock className="w-4 h-4 text-brand-teal-800 shrink-0" />
                <span>{event.formattedTime}</span>
              </div>
            )}
            <div className="flex items-center gap-2 bg-brand-surface-paper px-3.5 py-2 rounded-2xl border border-brand-neutral-200 shadow-soft-sm">
              <Video className="w-4 h-4 text-brand-teal-800 shrink-0" />
              <span>{event.location}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
