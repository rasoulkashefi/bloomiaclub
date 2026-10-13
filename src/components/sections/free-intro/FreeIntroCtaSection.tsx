import React from 'react';
import { Calendar, ArrowUp } from 'lucide-react';

export const FreeIntroCtaSection: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-brand-teal-950 text-white relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-teal-800/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-brand-teal-700/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-teal-900/80 border border-brand-teal-800 text-brand-teal-200 text-xs sm:text-sm font-semibold">
          <Calendar className="w-4 h-4 text-brand-teal-300" />
          <span>فرصتی بدون ریسک برای رشد</span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-snug">
          آماده‌اید شفافیت و جهت‌گیری جدید زندگی و کار خود را کشف کنید؟
        </h2>

        <p className="text-sm sm:text-base text-brand-teal-100/85 leading-relaxed max-w-2xl mx-auto">
          همین حالا نوبت جلسه ۴۵ دقیقه‌ای رایگان خود را ثبت کنید تا نخستین گام ملموس به سوی اهدافتان برداشته شود.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#booking-form"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-base font-bold text-brand-teal-950 bg-white hover:bg-brand-teal-50 active:scale-98 transition-all shadow-soft min-h-[48px]"
          >
            <span>رزرو آنلاین جلسه رایگان</span>
            <ArrowUp className="w-4 h-4 text-brand-teal-900" />
          </a>
        </div>
      </div>
    </section>
  );
};
