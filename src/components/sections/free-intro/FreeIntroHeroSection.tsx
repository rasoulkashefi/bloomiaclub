import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ShieldCheck, Clock, Award, ArrowDown } from 'lucide-react';

export const FreeIntroHeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-brand-teal-950 text-white min-h-[560px] md:min-h-[640px] flex items-center justify-center py-16 md:py-24">
      {/* Background Image with Ambient Overlay */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source srcSet="/images/coaching-free-intro-session.avif" type="image/avif" />
          <source srcSet="/images/coaching-free-intro-session.webp" type="image/webp" />
          <Image
            src="/images/coaching-free-intro-session.png"
            alt="جلسه معارفه رایگان با کوچ‌های بلومیا"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center filter brightness-40"
          />
        </picture>
        {/* Soft Organic Teal Vignette & Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-teal-950/85 via-brand-teal-950/75 to-brand-teal-950/95" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-teal-900/80 border border-brand-teal-700/60 backdrop-blur-sm text-brand-teal-100 text-xs sm:text-sm font-medium mb-6">
          <Calendar className="w-4 h-4 text-brand-teal-300 shrink-0" />
          <span>جلسه معارفه اختصاصی و رایگان (Zero Session)</span>
        </div>

        {/* Semantic H1 (Strict Single H1) */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight md:leading-tight tracking-tight mb-6 max-w-4xl mx-auto">
          مسیر تحول و شکوفایی شما از این جلسه آغاز می‌شود
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-brand-teal-100/90 leading-relaxed max-w-3xl mx-auto mb-10 font-normal">
          یک گفتگوی ۴۵ دقیقه‌ای کاملاً رایگان و اختصاصی با کوچ‌های تأییدشده بین‌المللی بلومیا؛ بدون نیاز به تعهد مالی و با حفظ ۱۰۰٪ محرمانگی، برای کشف شفافیت ذهنی و طراحی نقشه راه اختصاصی شما.
        </p>

        {/* Value Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mb-10 text-right">
          <div className="flex items-center gap-2.5 p-3 sm:p-3.5 rounded-xl bg-brand-teal-900/50 border border-brand-teal-800/60 backdrop-blur-sm">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-brand-teal-300 shrink-0" />
            <div className="text-xs sm:text-sm text-brand-teal-100 font-medium">
              ۴۵ دقیقه گفتگوی ۱ به ۱
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 sm:p-3.5 rounded-xl bg-brand-teal-900/50 border border-brand-teal-800/60 backdrop-blur-sm">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-brand-teal-300 shrink-0" />
            <div className="text-xs sm:text-sm text-brand-teal-100 font-medium">
              ۱۰۰٪ رایگان و بدون تعهد
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 sm:p-3.5 rounded-xl bg-brand-teal-900/50 border border-brand-teal-800/60 backdrop-blur-sm">
            <Award className="w-4 h-4 sm:w-5 sm:h-5 text-brand-teal-300 shrink-0" />
            <div className="text-xs sm:text-sm text-brand-teal-100 font-medium">
              استاندارد بین‌المللی ICF
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 sm:p-3.5 rounded-xl bg-brand-teal-900/50 border border-brand-teal-800/60 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-brand-teal-300 shrink-0" />
            <div className="text-xs sm:text-sm text-brand-teal-100 font-medium">
              ۲ راهکار عملی در پایان
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto">
          <a
            href="#booking-form"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-base font-bold text-brand-teal-950 bg-white hover:bg-brand-teal-50 active:scale-98 transition-all shadow-soft min-h-[48px]"
          >
            <span>رزرو جلسه رایگان معارفه</span>
            <ArrowDown className="w-4 h-4 text-brand-teal-900" />
          </a>

          <a
            href="#process"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-white/90 bg-brand-teal-900/60 hover:bg-brand-teal-800/80 border border-brand-teal-700/80 active:scale-98 transition-all min-h-[48px]"
          >
            <span>روند برگزاری جلسه</span>
          </a>
        </div>
      </div>
    </section>
  );
};
