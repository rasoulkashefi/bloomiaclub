'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, Phone, ArrowLeft } from 'lucide-react';
import { DottedGlowBackground } from '@/components/ui/dotted-glow-background';

export const EventsCtaSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-brand-teal-950 text-white py-16 sm:py-24">
      {/* Background Dotted Glow */}
      <DottedGlowBackground
        className="inset-0"
        gap={18}
        radius={1.7}
        color="rgba(255, 255, 255, 0.14)"
        glowColor="rgba(67, 132, 122, 0.7)"
        opacity={0.8}
      />

      {/* Decorative gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none bg-gradient-to-t from-brand-teal-950 via-transparent to-brand-teal-950/80"
        aria-hidden="true"
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-teal-900/90 border border-brand-teal-700/60 text-brand-teal-100 text-xs font-bold shadow-soft">
          <span>رویدادهای سازمانی و کوچینگ فردی</span>
        </div>

        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.3] text-white max-w-3xl mx-auto">
          نیاز به کارگاه اختصاصی سازمانی یا جلسات کوچینگ فردی دارید؟
        </h2>

        <p className="text-sm sm:text-base lg:text-lg text-brand-neutral-200/90 leading-relaxed max-w-2xl mx-auto pt-1">
          علاوه بر وبینارهای عمومی، کوچ‌های بلومیا کلاب کارگاه‌های درون‌سازمانی و جلسات کوچینگ ۱ به ۱ را متناسب با اهداف شخصی و تیمی شما طراحی و اجرا می‌کنند.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/coaches"
            className="w-full sm:w-auto min-h-[44px] px-8 py-3.5 rounded-full bg-white text-brand-teal-950 hover:bg-brand-teal-50 text-sm font-extrabold transition-all duration-200 shadow-soft hover:shadow-elevated inline-flex items-center justify-center gap-2"
          >
            <span>مشاهده لیست کوچ‌ها و جلسات فردی</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>

          <Link
            href="/contact"
            className="w-full sm:w-auto min-h-[44px] px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white text-sm font-bold transition-colors inline-flex items-center justify-center gap-2 backdrop-blur-md"
          >
            <Phone className="w-4 h-4 text-brand-teal-200" />
            <span>درخواست کارگاه سازمانی</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
