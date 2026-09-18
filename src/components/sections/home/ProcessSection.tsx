import React from 'react';
import Link from 'next/link';
import { Search, Calendar, ShieldCheck, Video, ArrowLeft } from 'lucide-react';

const steps = [
  {
    number: '۱',
    icon: Search,
    title: 'جستجو و انتخاب کوچ',
    description: 'بر اساس زمینه نیازتان (شغلی، فردی یا روابط)، مشخصات و مدارک کوچ‌ها را مقایسه کنید.',
  },
  {
    number: '۲',
    icon: Calendar,
    title: 'انتخاب زمان مناسب',
    description: 'تقویم کاری کوچ را به صورت زنده بررسی کنید و ساعتی که برایتان راحت‌تر است را انتخاب نمایید.',
  },
  {
    number: '۳',
    icon: ShieldCheck,
    title: 'رزرو قطعی جلسه',
    description: 'برای جلسه اول بدون پرداخت هزینه ثبت‌نام کنید و برای جلسات بعدی با درگاه امن پرداخت کنید.',
  },
  {
    number: '۴',
    icon: Video,
    title: 'حضور در جلسه آنلاین',
    description: 'در ساعت مقرر از طریق اتاق گفتگوی آنلاین با کوچ خود ملاقات کنید و مسیر تغییر را بسازید.',
  },
];

export const ProcessSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-brand-surface-paper border-b border-brand-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 md:mb-16">
          <span className="text-brand-teal-800 font-bold text-sm tracking-wide uppercase">
            مسیر ساده ۴ مرحله‌ای
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-neutral-900 tracking-tight">
            چگونه در بلومیا شروع کنیم؟
          </h2>
          <p className="text-sm sm:text-base text-brand-neutral-600 leading-relaxed">
            از اولین کلیک تا نشستن روبروی کوچ متخصص، همه چیز سریع، شفاف و مهیاست.
          </p>
        </div>

        {/* Mobile: Vertical Connected Timeline Roadmap */}
        <div className="relative sm:hidden space-y-4 max-w-md mx-auto">
          {/* Continuous vertical connector line */}
          <div className="absolute top-5 bottom-8 right-[19px] w-0.5 bg-brand-teal-200/80" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="relative flex items-start gap-3.5">
                {/* Step circle node on the timeline */}
                <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-brand-teal-900 text-white font-bold text-sm flex items-center justify-center shadow-soft ring-4 ring-brand-surface-paper">
                  <span>{step.number}</span>
                </div>

                {/* Step card content */}
                <div className="flex-1 bg-brand-surface p-4 rounded-2xl border border-brand-neutral-200/80 shadow-soft space-y-1.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-brand-teal-50 text-brand-teal-900 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-brand-neutral-900">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-xs text-brand-neutral-600 leading-relaxed pr-0.5">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tablet & Desktop: 4 Steps Grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative bg-brand-surface p-6 sm:p-7 rounded-3xl border border-brand-neutral-200/80 shadow-soft flex flex-col items-center text-center space-y-4 hover:-translate-y-1 transition-all duration-200"
              >
                {/* Step badge */}
                <span className="absolute top-4 right-4 w-7 h-7 rounded-full bg-brand-teal-900 text-white text-xs font-bold flex items-center justify-center shadow-xs">
                  {step.number}
                </span>

                <div className="w-14 h-14 rounded-2xl bg-brand-teal-50 text-brand-teal-900 flex items-center justify-center mt-2 shadow-xs">
                  <Icon className="w-7 h-7" />
                </div>

                <h3 className="text-base sm:text-lg font-bold text-brand-neutral-900">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-brand-neutral-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Call to action */}
        <div className="text-center mt-10 md:mt-12">
          <Link
            href="/coaching/free-intro-session"
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 rounded-full bg-brand-teal-900 hover:bg-brand-teal-800 text-white font-bold text-sm sm:text-base transition-colors shadow-soft w-full sm:w-auto max-w-[320px] sm:max-w-none min-h-[48px]"
          >
            <span>همین حالا جلسه معارفه رایگان را رزرو کنید</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
