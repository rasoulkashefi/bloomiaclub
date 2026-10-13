import React from 'react';
import Link from 'next/link';
import { HelpCircle, ChevronLeft, Calendar } from 'lucide-react';

export const FaqHeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-brand-surface py-16 md:py-24 border-b border-brand-surface-border">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-teal-100/35 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-brand-teal-50/60 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="inline-flex items-center gap-1.5 text-xs text-brand-neutral-500 mb-6 bg-white px-3.5 py-1.5 rounded-full border border-brand-surface-border">
          <Link href="/" className="hover:text-brand-teal-900 transition-colors">
            صفحه اصلی
          </Link>
          <ChevronLeft className="w-3.5 h-3.5 text-brand-neutral-400" />
          <span className="text-brand-teal-900 font-semibold">پرسش‌های متداول</span>
        </nav>

        {/* Semantic H1 (Strict Single H1) */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-brand-neutral-900 leading-tight md:leading-tight tracking-tight mb-6 max-w-4xl mx-auto">
          پرسش‌های متداول؛ پاسخ شفاف به تمام ابهامات شما
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-brand-neutral-600 leading-relaxed max-w-3xl mx-auto mb-8 font-normal">
          هر آنچه پیش از شروع مسیر کوچینگ، انتخاب کوچ و حضور در جلسات باید بدانید. ما شفافیت و صداقت را سنگ‌بنای اعتماد مراجعان خود قرار داده‌ایم.
        </p>

        {/* Direct Action Link */}
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/coaching/free-intro-session"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white bg-brand-teal-900 hover:bg-brand-teal-800 transition-all shadow-soft min-h-[44px]"
          >
            <Calendar className="w-4 h-4 text-brand-teal-200" />
            <span>رزرو جلسه معارفه ۴۵ دقیقه‌ای رایگان</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
