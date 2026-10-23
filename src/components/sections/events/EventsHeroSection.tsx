'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Video, Users, CheckCircle2, ArrowDown } from 'lucide-react';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { DottedGlowBackground } from '@/components/ui/dotted-glow-background';

interface EventsHeroSectionProps {
  totalEventsCount: number;
}

export const EventsHeroSection: React.FC<EventsHeroSectionProps> = ({ totalEventsCount }) => {
  return (
    <section className="relative overflow-hidden bg-brand-teal-950 text-white pt-8 pb-16 sm:pt-12 sm:pb-24 lg:pb-28">
      {/* Background Dotted Glow */}
      <DottedGlowBackground
        className="inset-0"
        gap={20}
        radius={1.6}
        color="rgba(255, 255, 255, 0.12)"
        glowColor="rgba(67, 132, 122, 0.65)"
        opacity={0.7}
      />

      {/* Decorative gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none bg-gradient-to-b from-brand-teal-950/60 via-transparent to-brand-teal-950"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb with light styling for dark hero */}
        <div className="mb-6 sm:mb-8">
          <Breadcrumbs
            items={[
              { label: 'صفحه اصلی', href: '/' },
              { label: 'رویدادها و وبینارها' },
            ]}
          />
        </div>

        {/* Top Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-teal-900/80 border border-brand-teal-700/60 text-brand-teal-100 text-xs font-bold shadow-soft mb-6 backdrop-blur-md">
          <Calendar className="w-3.5 h-3.5 text-brand-teal-300" />
          <span>تقویم وبینارها، کارگاه‌ها و نشست‌های تخصصی بلومیا</span>
        </div>

        {/* Hero Title & Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-8 space-y-5">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.25] text-white">
              رویدادها و کارگاه‌های{' '}
              <span className="text-brand-teal-200">تخصصی کوچینگ</span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-brand-neutral-200/90 leading-[1.8] max-w-2xl pt-1">
              یادگیری عمیق و کاربردی در کنار کوچ‌های معتبر فدراسیون بین‌المللی کوچینگ (ICF). شرکت در وبینارها از طریق ایسمینار و ایوند با دسترسی دائمی به ویدیوهای ضبط‌شده و جلسات پرسش و پاسخ زنده.
            </p>

            {/* Quick values pills */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5 sm:gap-4 text-xs sm:text-sm text-brand-teal-100/90 font-medium">
              <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                <CheckCircle2 className="w-4 h-4 text-brand-teal-300" />
                ثبت‌نام مستقیم در ایسمینار و ایوند
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                <CheckCircle2 className="w-4 h-4 text-brand-teal-300" />
                دسترسی مادام‌العمر به فایل ضبط‌شده
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                <CheckCircle2 className="w-4 h-4 text-brand-teal-300" />
                پرسش و پاسخ اختصاصی با کوچ
              </span>
            </div>
          </div>

          {/* Quick Action & Jump Card */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl p-6 text-white shadow-soft">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs text-brand-neutral-300 font-medium">پلتفرم‌های برگزاری</span>
                <span className="text-xs font-bold text-brand-teal-200">ایسمینار · ایوند · آنلاین</span>
              </div>
              <p className="text-sm text-brand-neutral-200 mt-3 leading-relaxed">
                تمام رویدادها کاملاً تعاملی بوده و فرایند ثبت‌نام در بسترهای معتبر و امن برگزارکننده انجام می‌شود.
              </p>
              <a
                href="#upcoming-events"
                className="mt-5 w-full inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-3 rounded-full bg-brand-teal-100 text-brand-teal-950 hover:bg-white text-sm font-bold transition-all duration-200 shadow-soft"
              >
                <span>مشاهده رویدادهای پیش‌رو</span>
                <ArrowDown className="w-4 h-4 shrink-0" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
