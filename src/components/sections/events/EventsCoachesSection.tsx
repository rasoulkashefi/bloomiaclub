'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Users, ArrowLeft, Star } from 'lucide-react';
import type { EventCoach } from '@/lib/events';

interface EventsCoachesSectionProps {
  coaches: EventCoach[];
}

export const EventsCoachesSection: React.FC<EventsCoachesSectionProps> = ({ coaches }) => {
  if (!coaches || coaches.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 bg-brand-surface border-b border-brand-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-surface-paper text-brand-teal-900 text-xs font-bold border border-brand-neutral-200 shadow-soft-sm">
              <Users className="w-3.5 h-3.5 text-brand-teal-700" />
              <span>هدایتگران و مدرسان کارگاه‌ها</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-neutral-900 tracking-tight leading-snug">
              کوچ‌های ارائه‌دهنده رویدادها
            </h2>
            <p className="text-sm sm:text-base text-brand-neutral-600 leading-relaxed">
              با همراهی تیمی از باتجربه‌ترین کوچ‌های معتبر با صدها ساعت تجربه کوچینگ فردی و سازمانی.
            </p>
          </div>

          <Link
            href="/coaches"
            className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 rounded-full border border-brand-neutral-300 bg-brand-surface-paper hover:bg-brand-neutral-100 text-brand-neutral-800 text-xs font-bold transition-colors self-start sm:self-auto shadow-soft-sm"
          >
            <span>مشاهده همه کوچ‌ها</span>
            <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
          </Link>
        </div>

        {/* Coaches Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coaches.map((c) => (
            <div
              key={c.slug}
              className="group bg-brand-surface-paper rounded-3xl p-6 border border-brand-neutral-200/90 shadow-soft hover:shadow-elevated hover:border-brand-teal-300 transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="relative w-24 h-24 rounded-full overflow-hidden bg-brand-teal-100 border-2 border-brand-teal-200/80 mb-4 group-hover:scale-105 transition-transform duration-300 shadow-soft-sm">
                <Image
                  src={c.imageUrl || '/images/coaches/default.webp'}
                  alt={c.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>

              <h3 className="text-base font-extrabold text-brand-neutral-900 group-hover:text-brand-teal-800 transition-colors">
                {c.name}
              </h3>

              <p className="text-xs text-brand-neutral-500 mt-1 line-clamp-1">
                {c.title}
              </p>

              {c.rating && (
                <div className="mt-3 inline-flex items-center gap-1 text-xs text-brand-neutral-600 bg-brand-surface px-2.5 py-1 rounded-full border border-brand-neutral-200">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span className="font-bold">{c.rating.toLocaleString('fa-IR')}</span>
                  <span className="text-brand-neutral-400">از ۵</span>
                </div>
              )}

              <div className="mt-5 pt-4 border-t border-brand-neutral-150 w-full flex items-center justify-center gap-3">
                <Link
                  href={`/coaches/${c.slug}`}
                  className="text-xs font-bold text-brand-teal-800 hover:text-brand-teal-950 inline-flex items-center gap-1 transition-colors"
                >
                  <span>مشاهده پروفایل</span>
                  <ArrowLeft className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
