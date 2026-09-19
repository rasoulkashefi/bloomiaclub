'use client';

import React from 'react';
import { Search, X, ShieldCheck, Award, CalendarCheck } from 'lucide-react';

interface CoachHeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  totalCount: number;
}

export const CoachHeroSection: React.FC<CoachHeroSectionProps> = ({
  searchQuery,
  setSearchQuery,
  totalCount,
}) => {
  return (
    <section className="relative pt-12 pb-8 md:pt-16 md:pb-12 bg-brand-surface-paper border-b border-brand-surface-border overflow-hidden">
      {/* Subtle organic background ambient glow */}
      <div
        className="pointer-events-none absolute top-0 right-1/4 w-96 h-96 bg-brand-teal-50/80 rounded-full blur-3xl -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-teal-50 border border-brand-teal-200/60 text-brand-teal-900 text-xs font-semibold">
          <Award className="w-3.5 h-3.5 text-brand-teal-700" />
          <span>کوچ‌های دارای مدرک بین‌المللی ICF</span>
        </div>

        {/* Main H1 Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-neutral-900 tracking-tight leading-tight max-w-4xl mx-auto">
          همراه حرفه‌ای مسیر رشد و تحول شما
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-brand-neutral-600 max-w-2xl mx-auto leading-relaxed">
          مشخصات، سوابق و حوزه‌های تخصصی کوچ‌های مورد تایید بلومیا را بررسی کنید و با رزرو جلسه معارفه رایگان، گام نخست را بردارید.
        </p>

        {/* Live Search Bar */}
        <div className="max-w-md mx-auto relative pt-2">
          <div className="relative flex items-center">
            <Search className="absolute right-4 w-5 h-5 text-brand-neutral-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجوی نام کوچ یا زمینه تخصص (مثال: شغلی، فردی)..."
              className="w-full pr-12 pl-10 py-3.5 rounded-full bg-brand-surface border border-brand-neutral-300 focus:border-brand-teal-800 focus:ring-2 focus:ring-brand-teal-800/20 text-sm text-brand-neutral-900 placeholder:text-brand-neutral-400 transition-all shadow-xs outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute left-3.5 p-1 text-brand-neutral-400 hover:text-brand-neutral-600 rounded-full hover:bg-brand-neutral-100 transition-colors touch-auto"
                aria-label="پاک کردن جستجو"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs sm:text-sm text-brand-neutral-600">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-teal-700" />
            <span>فیلتر سخت‌گیرانه صلاحیت علمی و اخلاقی</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarCheck className="w-4 h-4 text-brand-teal-700" />
            <span>امکان رزرو جلسه معارفه رایگان (جلسه صفر)</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-brand-teal-700" />
            <span>پایبندی کامل به کدهای اخلاقی ICF</span>
          </div>
        </div>
      </div>
    </section>
  );
};
