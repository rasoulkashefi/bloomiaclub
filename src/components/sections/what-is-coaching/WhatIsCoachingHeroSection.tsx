import React from 'react';
import Link from 'next/link';
import { Compass, Calendar, ArrowDown, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const WhatIsCoachingHeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-brand-surface py-16 md:py-24 border-b border-brand-surface-border">
      {/* Subtle organic ambient circles */}
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-brand-teal-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-brand-teal-50/60 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-teal-50 border border-brand-teal-200/60 text-brand-teal-900 text-xs sm:text-sm font-semibold mb-6">
          <Compass className="w-4 h-4 text-brand-teal-700" />
          <span>راهنمای جامع و استاندارد کوچینگ حرفه‌ای</span>
        </div>

        {/* Semantic H1 (Strict Single H1) */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-brand-neutral-900 leading-tight md:leading-tight tracking-tight mb-6 max-w-4xl mx-auto">
          کوچینگ چیست؟ هنر کشف پتانسیل و طراحی مسیر آگاهانه
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-brand-neutral-600 leading-relaxed max-w-3xl mx-auto mb-10 font-normal">
          کوچینگ یک فرآیند ساختارمند، هدف‌محور و مشارکتی مبتنی بر استانداردهای فدراسیون بین‌المللی کوچینگ (ICF) است که فاصله میان نقطه اکنون و نقطه مطلوب زندگی یا حرفه شما را کوتاه می‌کند.
        </p>

        {/* Value Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mb-10 text-right">
          <div className="flex items-center gap-2.5 p-3 sm:p-3.5 rounded-2xl bg-white border border-brand-surface-border shadow-soft-sm">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-brand-teal-700 shrink-0" />
            <div className="text-xs sm:text-sm text-brand-neutral-800 font-semibold">
              شراکت برابر، نه نصیحت
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 sm:p-3.5 rounded-2xl bg-white border border-brand-surface-border shadow-soft-sm">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-brand-teal-700 shrink-0" />
            <div className="text-xs sm:text-sm text-brand-neutral-800 font-semibold">
              تمرکز بر حال و آینده
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 sm:p-3.5 rounded-2xl bg-white border border-brand-surface-border shadow-soft-sm">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-brand-teal-700 shrink-0" />
            <div className="text-xs sm:text-sm text-brand-neutral-800 font-semibold">
              استاندارد جهانی ICF
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 sm:p-3.5 rounded-2xl bg-white border border-brand-surface-border shadow-soft-sm">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-brand-teal-700 shrink-0" />
            <div className="text-xs sm:text-sm text-brand-neutral-800 font-semibold">
              اقدام و تغییر پایدار
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto">
          <Link
            href="/coaching/free-intro-session"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-base font-bold text-white bg-brand-teal-900 hover:bg-brand-teal-800 active:scale-98 transition-all shadow-soft min-h-[48px]"
          >
            <Calendar className="w-4 h-4 text-brand-teal-200" />
            <span>رزرو جلسه معارفه رایگان</span>
          </Link>

          <a
            href="#comparison"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-brand-neutral-700 bg-white hover:bg-brand-surface-muted border border-brand-surface-border active:scale-98 transition-all min-h-[48px]"
          >
            <span>مقایسه کوچینگ با سایر متدها</span>
            <ArrowDown className="w-4 h-4 text-brand-neutral-500" />
          </a>
        </div>
      </div>
    </section>
  );
};
