import React from 'react';
import Link from 'next/link';
import { Calendar, Phone, ArrowLeft, ShieldCheck, CheckCircle } from 'lucide-react';

export const FinalCtaSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-linear-to-b from-brand-surface to-brand-teal-50/60 border-b border-brand-surface-border relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
        <div className="space-y-4 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-coral-100 text-brand-coral-800 text-xs sm:text-sm font-semibold">
            <CheckCircle className="w-4 h-4 text-brand-coral-600" />
            <span>یک قدم تا شفافیت و آرامش ذهنی</span>
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-neutral-900 tracking-tight leading-tight">
            آماده‌اید مسیر شکوفایی خود را آغاز کنید؟
          </h2>

          <p className="text-base sm:text-lg text-brand-neutral-600 leading-relaxed max-w-2xl mx-auto">
            اولین جلسه معارفه ۳۰ دقیقه‌ای با مربی متخصص، ۱۰۰٪ رایگان است. فرصتی امن برای بیان دغدغه‌ها و شناخت پتانسیل‌های پنهان درونتان.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href="/coaching/free-intro-session"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-brand-coral-600 hover:bg-brand-coral-700 text-white font-bold text-base shadow-soft hover:shadow-soft-lg active:scale-98 transition-all min-h-[50px]"
          >
            <Calendar className="w-5 h-5" />
            <span>رزرو جلسه معارفه رایگان (جلسه صفر)</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>

          <Link
            href="/coaches"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-brand-surface-paper hover:bg-brand-neutral-100 text-brand-teal-900 border border-brand-teal-300 font-semibold text-base transition-colors min-h-[50px] shadow-xs"
          >
            <span>بررسی لیست کامل مربیان</span>
          </Link>
        </div>

        {/* Reassurance pills */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-brand-neutral-600 font-medium">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-brand-teal-700" />
            بدون نیاز به کارت بانکی
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-brand-teal-700" />
            برگزاری کاملاً آنلاین و تصویری
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-brand-teal-700" />
            مربیان تأییدشده ICF
          </span>
        </div>
      </div>
    </section>
  );
};
