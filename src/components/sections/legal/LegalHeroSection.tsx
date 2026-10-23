import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ChevronLeft, Clock } from 'lucide-react';

export const LegalHeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-brand-surface py-16 md:py-24 border-b border-brand-surface-border">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-teal-100/35 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-brand-teal-50/60 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Breadcrumb (Strictly single line) */}
        <nav aria-label="مسیریابی" className="inline-flex items-center gap-1.5 text-xs text-brand-neutral-500 mb-6 bg-white px-3.5 py-1.5 rounded-full border border-brand-surface-border whitespace-nowrap flex-nowrap">
          <Link href="/" className="hover:text-brand-teal-900 transition-colors shrink-0">
            صفحه اصلی
          </Link>
          <ChevronLeft className="w-3.5 h-3.5 text-brand-neutral-400 shrink-0" />
          <span className="text-brand-teal-900 font-semibold shrink-0">قوانین و حریم خصوصی</span>
        </nav>

        {/* Semantic H1 (Strict Single H1) */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-neutral-900 leading-tight md:leading-tight tracking-tight mb-6 max-w-4xl mx-auto">
          قوانین، شرایط استفاده و منشور محرمانگی بلومیا کلاب
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-brand-neutral-600 leading-relaxed max-w-3xl mx-auto mb-6 font-normal">
          چارچوب شفاف حقوقی، تعهدات دوجانبه کوچ و مراجع، و خط‌مشی حفاظت از اطلاعات شخصی بر پایه منشور اخلاقی فدراسیون بین‌المللی کوچینگ (ICF).
        </p>

        {/* Last updated badge */}
        <div className="inline-flex items-center gap-2 text-xs text-brand-neutral-500 bg-white px-3.5 py-1.5 rounded-full border border-brand-surface-border">
          <Clock className="w-3.5 h-3.5 text-brand-teal-700" />
          <span>آخرین به‌روزرسانی: مهرماه ۱۴۰۵</span>
        </div>
      </div>
    </section>
  );
};
