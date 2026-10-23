import React from 'react';
import { BookOpen } from 'lucide-react';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';

export const BlogHeroSection: React.FC = () => {
  return (
    <section className="relative pt-10 pb-12 sm:pt-14 sm:pb-16 bg-gradient-to-b from-brand-teal-50/50 via-brand-surface to-brand-surface border-b border-brand-neutral-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb (Strictly single line) */}
        <Breadcrumbs
          className="mb-6"
          items={[
            { label: 'صفحه اصلی', href: '/' },
            { label: 'وبلاگ و مقالات' },
          ]}
        />

        {/* Header content */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-surface-paper text-brand-teal-900 text-xs font-bold border border-brand-teal-200/80 shadow-soft-sm">
            <BookOpen className="w-3.5 h-3.5 text-brand-teal-700" />
            <span>مرجع بینش‌های کوچینگ و توسعه فردی</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-neutral-900 tracking-tight leading-[1.25]">
            بینش‌های عمیق، متدهای روز و راهکارهای اصیل رشد
          </h1>

          <p className="text-base sm:text-lg text-brand-neutral-600 leading-relaxed pt-1">
            مجموعه‌ای از مقالات تخصصی و مستند به قلم کوچ‌های تأییدشده بلومیا کلاب؛ به دور از کلیشه‌های انگیزشی، برای ساختن وضوح ذهنی، تعادل در زندگی و تصمیم‌گیری مقتدرانه.
          </p>
        </div>
      </div>
    </section>
  );
};
