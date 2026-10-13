import React from 'react';
import { Sparkles, Brain, Lightbulb, Compass, Eye, Check } from 'lucide-react';

const PILLARS = [
  {
    icon: Eye,
    title: 'مراجع، متخصص اصلی زندگی خویش است',
    description:
      'در کوچینگ، کوچ جایگاه دانای کل ندارد و به شما دیکته نمی‌کند که چه کاری درست است. باور اساسی ما این است که هر فرد ظرفیت، خلاقیت و منابع درونی لازم برای یافتن بهترین پاسخ‌ها را داراست.',
  },
  {
    icon: Brain,
    title: 'پرسشگری عمیق به‌جای نسخه‌پیچی کلیشه‌ای',
    description:
      'به‌جای ارائه راه‌حل‌های کپی‌شده، کوچ با پرسش‌های هدفمند و فعال‌سازی تفکر واگرا به شما کمک می‌کند نقاط کور فکری، سوگیری‌ها و باورهای محدودکننده خود را شناسایی و بازتعریف کنید.',
  },
  {
    icon: Compass,
    title: 'تمرکز بر نقطه اکنون و امکان‌های آینده',
    description:
      'کوچینگ وقت شما را در واکاوی سرزنش‌گرانه گذشته هدر نمی‌دهد. ما بررسی می‌کنیم که اکنون در چه وضعیتی هستید، به کجا می‌خواهید برسید و چه موانعی میان شما و اهدافتان قرار دارند.',
  },
  {
    icon: Lightbulb,
    title: 'تعهد به اقدام عملی و پاسخگویی پایدار',
    description:
      'آگاهی بدون عمل تغییر ماندگاری نمی‌سازد. در پایان هر جلسه، بینش‌های به دست آمده به اقدامات روشن هفتگی تبدیل می‌شوند و کوچ نقش یک همراه متعهد برای پیگیری و تثبیت این رفتارها را ایفا می‌کند.',
  },
];

export const WhatIsCoachingDefinitionSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white border-b border-brand-surface-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* GEO Direct Answer Highlight Box */}
        <div className="mb-16 bg-brand-surface rounded-3xl p-6 sm:p-8 md:p-10 border border-brand-teal-200/80 shadow-soft-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-brand-surface-border">
            <div className="space-y-2">
              <span className="text-xs font-bold text-brand-teal-800 tracking-wide uppercase px-2.5 py-1 rounded-md bg-brand-teal-50 border border-brand-teal-200/60 inline-block">
                تعریف رسمی استاندارد ICF
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-brand-neutral-900 tracking-tight">
                کوچینگ در یک نگاه دقیق
              </h2>
            </div>
            <div className="text-xs font-semibold text-brand-neutral-500 bg-white px-3.5 py-1.5 rounded-full border border-brand-surface-border shrink-0">
              International Coaching Federation
            </div>
          </div>

          <p className="mt-6 text-sm sm:text-base md:text-lg text-brand-neutral-700 leading-relaxed font-normal">
            «فدراسیون بین‌المللی کوچینگ (ICF) کوچینگ را شراکت مستمر و حرفه‌ای میان کوچ و مراجع تعریف می‌کند که مراجع را برمی‌انگیزد تا از طریق تفکر عمیق و خلاقیت فردی، پتانسیل‌های شخصی و حرفه‌ای خود را به بیشترین حد ممکن شکوفا سازد.»
          </p>

          <div className="mt-6 pt-6 border-t border-brand-surface-border grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm text-brand-neutral-600">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-teal-700 shrink-0" />
              <span>توانمندسازی بدون وابستگی به کوچ</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-teal-700 shrink-0" />
              <span>شفافیت در اهداف و ارزش‌های محوری</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-teal-700 shrink-0" />
              <span>مسئولیت‌پذیری ۱۰۰٪ مراجع در اقدام</span>
            </div>
          </div>
        </div>

        {/* 4 Pillars Section Header */}
        <div className="text-center space-y-3 mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-neutral-900 tracking-tight">
            چهار اصل بنیادین کوچینگ در بلومیا کلاب
          </h2>
          <p className="text-sm sm:text-base text-brand-neutral-600 max-w-xl mx-auto leading-relaxed">
            ما در بلومیا، کوچینگ را از شعارهای زرد و رویکردهای انگیزشی زودگذر جدا کرده و بر بستر علوم رفتاری پیاده‌سازی می‌کنیم.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-brand-surface rounded-3xl p-6 sm:p-8 border border-brand-surface-border shadow-soft-sm flex flex-col justify-between hover:border-brand-teal-300 transition-all group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white border border-brand-surface-border text-brand-teal-900 flex items-center justify-center mb-6 shadow-soft-sm group-hover:bg-brand-teal-50 transition-colors">
                    <Icon className="w-6 h-6 text-brand-teal-800" />
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-brand-neutral-900 mb-3 leading-snug">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-brand-neutral-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
