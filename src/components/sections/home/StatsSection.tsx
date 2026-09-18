import React from 'react';
import { Award, Filter, HeartHandshake, Lock, Zap, Target } from 'lucide-react';

const statsCards = [
  {
    icon: Award,
    stat: '۱۰۰٪',
    title: 'تخصص‌محور و استاندارد',
    description: 'تمام مربیان فعال در بلومیا دارای گواهینامه‌های رسمی و معتبر بین‌المللی ICF هستند.',
  },
  {
    icon: Filter,
    stat: 'انتخاب هوشمند',
    title: 'فیلتر سخت‌گیرانه صلاحیت',
    description: 'مربیان از میان ده‌ها داوطلب و پس از بررسی دقیق سوابق، رضایت مراجعین و مصاحبه تخصصی انتخاب می‌شوند.',
  },
  {
    icon: HeartHandshake,
    stat: '۹۸٪+',
    title: 'تمرکز بر رضایت مراجعین',
    description: 'هدف ما خلق تجربه‌ای ارزشمند است که در آن هر جلسه، گامی شفاف و محسوس به سوی اهداف شما باشد.',
  },
  {
    icon: Lock,
    stat: 'امن و محرمانه',
    title: 'حریم خصوصی اخلاقی',
    description: 'تمامی گفتگوها در محیطی امن و با تعهد کامل به اصول حفظ رازداری کدهای اخلاقی ICF انجام می‌گیرد.',
  },
  {
    icon: Zap,
    stat: '۲ دقیقه',
    title: 'تا ثبت اولین جلسه',
    description: 'فرآیند جستجو و انتخاب مربی در پلتفرم بهینه‌سازی شده تا بدون فوت وقت مسیر را شروع کنید.',
  },
  {
    icon: Target,
    stat: 'نتیجه‌گرا',
    title: 'تمرکز بر اقدام و تغییر',
    description: 'کوچینگ در بلومیا تئوری نیست؛ ما به شما کمک می‌کنیم موانع را شناسایی و برنامه‌ای عملی پیاده کنید.',
  },
];

export const StatsSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-brand-teal-950 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div
        className="pointer-events-none absolute -bottom-20 right-0 w-96 h-96 bg-brand-teal-800/30 rounded-full blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-0 -left-20 w-80 h-80 bg-brand-coral-900/20 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14 md:mb-18">
          <span className="text-brand-coral-400 font-semibold text-xs sm:text-sm tracking-wider uppercase">
            تعهد به استانداردهای جهانی
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            بلومیا؛ استانداردی نو در صنعت کوچینگ ایران
          </h2>
          <p className="text-sm sm:text-base text-brand-teal-100/80 leading-relaxed">
            ما در بلومیا باور داریم کوچینگ باکیفیت یک سرمایه‌گذاری برای آینده است؛ بنابراین بالاترین سطح حساسیت را در انتخاب مربیان داریم.
          </p>
        </div>

        {/* 6 Grid Cards: 1 col on mobile, 2 on tablet, 3 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {statsCards.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-brand-teal-900/60 backdrop-blur-xs border border-brand-teal-800/80 p-6 sm:p-7 rounded-3xl space-y-3.5 hover:border-brand-coral-500/50 hover:bg-brand-teal-900/90 transition-all duration-300 shadow-soft"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-brand-teal-800/80 text-brand-coral-400 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-lg sm:text-xl font-extrabold text-brand-coral-400">
                    {item.stat}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white pt-1">
                  {item.title}
                </h3>

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
