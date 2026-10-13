import React from 'react';
import { Quote, ShieldCheck, HeartHandshake, Check } from 'lucide-react';
import type { Coach } from '@/lib/coaches';

interface CoachProfileAboutSectionProps {
  coach: Coach;
}

export const CoachProfileAboutSection: React.FC<CoachProfileAboutSectionProps> = ({
  coach,
}) => {
  const bioParagraphs = coach.longDescription
    ? coach.longDescription.split('\n\n').filter(Boolean)
    : [
        `من ${coach.name} هستم؛ ${coach.title}. با پیشینه‌ای در هنر و معماری، از سال ۱۳۹۷ وارد مسیر توسعه فردی شدم و آموزش‌های تخصصی‌ام را در آکادمی ایمپکت آمریکا گذراندم.`,
        'در جلسات ما قرار نیست نسخه‌ای آماده دریافت کنید؛ قرار است با همراهی من، پاسخ‌های شخصی خودتان را پیدا کنید و قدم بعدی را با اطمینان بردارید.',
      ];

  return (
    <section className="py-16 md:py-24 bg-white border-b border-brand-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Top Editorial Pull-Quote ── */}
        <div className="max-w-4xl mx-auto mb-16 md:mb-20 text-center">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-teal-50/80 border border-brand-teal-100/80 text-brand-teal-800 mb-6 shadow-2xs">
            <Quote className="w-5 h-5 text-brand-teal-800" />
          </div>
          <blockquote className="text-2xl sm:text-3xl md:text-[34px] font-black text-brand-neutral-900 leading-snug md:leading-[1.4] tracking-tight">
            «تغییر از جایی آغاز می‌شود که شهامت روبه‌رو شدن با خودت را پیدا کنی؛ نقشه راه در دستان توست و من در کنارت هستم تا موانع را کنار بزنی.»
          </blockquote>

          {/* Author line with flanking divider rules */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-px w-12 sm:w-16 bg-brand-surface-border" />
            <span className="text-xs sm:text-sm text-brand-neutral-500 font-medium">
              {coach.name} — {coach.title}
            </span>
            <div className="h-px w-12 sm:w-16 bg-brand-surface-border" />
          </div>
        </div>

        {/* ── Main Two-Column Balanced Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Story & Bio Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-1.5">
              <span className="text-xs text-brand-neutral-400 font-bold tracking-wide">
                آشنایی عمیق‌تر با کوچ
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-brand-neutral-900 tracking-tight">
                درباره من و نگاهم به فرآیند کوچینگ
              </h2>
            </div>

            <div className="space-y-4 text-sm text-brand-neutral-600 leading-[2]">
              {bioParagraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>

          {/* Core Principles Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-7 rounded-3xl bg-[#f7f7f5] border border-brand-surface-border shadow-xs">
              {/* Card Header: Title on Right, Icon Badge on Left */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="text-xs text-brand-neutral-400 font-medium">
                    منشور حرفه‌ای
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-brand-neutral-900 mt-0.5">
                    اصول من در هر جلسه کوچینگ
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-brand-teal-100/70 text-brand-teal-800 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-brand-teal-800" />
                </div>
              </div>

              {/* 3 Principles with Left-aligned Icon Boxes */}
              <div className="space-y-4">
                {/* Principle 1 */}
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-brand-surface-border">
                  <div className="space-y-1 text-right">
                    <h4 className="text-sm font-bold text-brand-neutral-900">
                      تعهد به کدهای اخلاقی
                    </h4>
                    <p className="text-xs text-brand-neutral-500 leading-relaxed max-w-sm">
                      حفظ ۱۰۰٪ محرمانگی، رازداری کامل و احترام بی‌قیدوشرط به حق انتخاب و استقلال فکری مراجع.
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-xl border border-brand-surface-border bg-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <ShieldCheck className="w-4 h-4 text-brand-teal-800" />
                  </div>
                </div>

                {/* Principle 2 */}
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-brand-surface-border">
                  <div className="space-y-1 text-right">
                    <h4 className="text-sm font-bold text-brand-neutral-900">
                      فضای امن و بدون قضاوت
                    </h4>
                    <p className="text-xs text-brand-neutral-500 leading-relaxed max-w-sm">
                      جایی برای شنیده‌شدن واقعی؛ بدون ترس از سرزنش، کشف موانع ذهنی و بازگشت به شفافیت درونی.
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-xl border border-brand-surface-border bg-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <HeartHandshake className="w-4 h-4 text-brand-teal-800" />
                  </div>
                </div>

                {/* Principle 3 */}
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1 text-right">
                    <h4 className="text-sm font-bold text-brand-neutral-900">
                      تمرکز بر عاملیت و توانمندی
                    </h4>
                    <p className="text-xs text-brand-neutral-500 leading-relaxed max-w-sm">
                      باور دارم پاسخ درون خود شماست؛ من کنار شما هستم تا مسیر کشف و اقدام را ساده‌تر کنید.
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-xl border border-brand-surface-border bg-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <Check className="w-4 h-4 text-brand-teal-800" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Specialties Centered Below Both Columns ── */}
        {coach.specialties && coach.specialties.length > 0 && (
          <div className="mt-12 md:mt-16 pt-8 border-t border-brand-surface-border text-center">
            <h3 className="text-xs sm:text-sm font-bold text-brand-neutral-900 mb-3.5">
              حوزه‌های اصلی تخصص و همراهی:
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-3xl mx-auto">
              {coach.specialties.map((spec, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 rounded-full border border-brand-surface-border bg-white text-xs sm:text-sm text-brand-neutral-700 font-medium hover:border-brand-teal-900 transition-colors shadow-2xs"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
