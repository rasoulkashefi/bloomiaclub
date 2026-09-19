import React from 'react';
import { Award, Filter, HeartHandshake, Lock, Zap, Target } from 'lucide-react';

const leadCards = [
  {
    icon: Award,
    title: 'تخصص‌محور و استاندارد ICF',
    description: 'تمام کوچ‌های فعال در بلومیا دارای گواهینامه‌های رسمی و معتبر بین‌المللی ICF هستند.',
  },
  {
    icon: Filter,
    title: 'فیلتر سخت‌گیرانه صلاحیت',
    description: 'کوچ‌ها از میان ده‌ها داوطلب و پس از بررسی دقیق سوابق، رضایت مراجعین و مصاحبه تخصصی انتخاب می‌شوند.',
  },
];

const supportingCards = [
  {
    icon: HeartHandshake,
    title: 'تمرکز بر رضایت مراجعین',
    description: 'خلق تجربه‌ای ارزشمند که در آن هر جلسه، گامی به سوی اهداف شما باشد.',
  },
  {
    icon: Lock,
    title: 'حریم خصوصی و محرمانگی',
    description: 'تمامی گفتگوها با تعهد کامل به اصول حفظ رازداری کدهای اخلاقی ICF انجام می‌گیرد.',
  },
  {
    icon: Zap,
    title: 'شروع سریع در کمتر از ۲ دقیقه',
    description: 'فرآیند جستجو و انتخاب کوچ بهینه‌سازی شده تا بدون فوت وقت شروع کنید.',
  },
  {
    icon: Target,
    title: 'تمرکز بر اقدام و تغییر',
    description: 'کوچینگ در بلومیا تئوری نیست؛ کمک می‌کنیم برنامه‌ای عملی پیاده کنید.',
  },
];

const statsCards = [...leadCards, ...supportingCards];

export const StatsSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-brand-teal-950 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div
        className="pointer-events-none absolute -bottom-20 right-0 w-96 h-96 bg-brand-teal-800/30 rounded-full blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-0 -left-20 w-80 h-80 bg-brand-teal-900/30 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10 sm:mb-14 md:mb-18">
          <span className="text-brand-teal-300 font-semibold text-xs sm:text-sm tracking-wider uppercase">
            تعهد به استانداردهای جهانی
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            بلومیا؛ استانداردی نو در صنعت کوچینگ ایران
          </h2>
          <p className="text-sm sm:text-base text-brand-teal-100/80 leading-relaxed">
            ما در بلومیا باور داریم کوچینگ باکیفیت یک سرمایه‌گذاری برای آینده است؛ بنابراین بالاترین سطح حساسیت را در انتخاب کوچ‌ها داریم.
          </p>
        </div>

        {/* Mobile: Bento Hierarchy (2 Lead Cards + 2x2 Supporting Grid) */}
        <div className="sm:hidden space-y-3">
          {/* 2 Lead Cards */}
          <div className="space-y-3">
            {leadCards.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="relative overflow-hidden bg-gradient-to-b from-brand-teal-900/90 to-brand-teal-900/60 border border-brand-teal-700/60 p-4.5 rounded-2xl shadow-soft space-y-2.5"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-teal-800 text-brand-teal-300 flex items-center justify-center shrink-0 shadow-xs ring-1 ring-brand-teal-700/50">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold text-white leading-tight">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs text-brand-teal-100/80 leading-relaxed pr-0.5">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* 2x2 Supporting Grid */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            {supportingCards.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-brand-teal-900/40 border border-brand-teal-800/70 p-3.5 rounded-2xl flex flex-col justify-between space-y-2.5 shadow-xs"
                >
                  <div className="w-8 h-8 rounded-lg bg-brand-teal-800/80 text-brand-teal-300 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xs font-bold text-white leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-brand-teal-100/70 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tablet & Desktop: 6 Grid Cards */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {statsCards.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-brand-teal-900/60 backdrop-blur-xs border border-brand-teal-800/80 p-6 sm:p-7 rounded-3xl space-y-3.5 hover:border-brand-teal-600 hover:bg-brand-teal-900/90 transition-all duration-300 shadow-soft"
              >
                {/* Clean Header: Icon + Title on a single line */}
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-brand-teal-800/80 text-brand-teal-300 flex items-center justify-center shrink-0 shadow-xs">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                    {item.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-brand-teal-100/75 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
