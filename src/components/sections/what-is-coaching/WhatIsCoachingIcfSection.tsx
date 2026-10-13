import React from 'react';
import { Award, ShieldCheck, CheckCircle2, Globe } from 'lucide-react';

const CREDENTIALS = [
  {
    level: 'ACC',
    title: 'Associate Certified Coach',
    reqs: 'حداقل ۶۰ ساعت آموزش معتبر + ۱۰ ساعت منتورکوچینگ + ۱۰۰ ساعت تجربه کوچینگ مستند',
    description: 'اثبات تسلط بر صلاحیت‌های پایه و پایبندی کامل به منشور اخلاقی ICF.',
  },
  {
    level: 'PCC',
    title: 'Professional Certified Coach',
    reqs: 'حداقل ۱۲۵ ساعت آموزش پیشرفته + ۵۰۰ ساعت تجربه کوچینگ عملی + آزمون جامع بین‌المللی',
    description: 'نشان‌دهنده مهارت عمیق در هدایت گفتگوهای تحول‌آفرین و تسلط حرفه‌ای.',
  },
  {
    level: 'MCC',
    title: 'Master Certified Coach',
    reqs: 'حداقل ۲۰۰ ساعت آموزش عالی + ۲۵۰۰ ساعت تجربه کوچینگ بالینی + بررسی دقیق جلسات',
    description: 'بالاترین سطح اعتباری در دنیای کوچینگ؛ نشان‌دهنده هنر اصیل و تجربه فوق‌العاده.',
  },
];

export const WhatIsCoachingIcfSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white border-b border-brand-surface-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-teal-50 border border-brand-teal-200/60 text-brand-teal-900 text-xs sm:text-sm font-semibold">
            <Award className="w-4 h-4 text-brand-teal-700" />
            <span>استاندارد طلایی کیفیت جهانی</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-neutral-900 tracking-tight">
            چرا بلومیا بر استانداردهای فدراسیون بین‌المللی کوچینگ (ICF) پافشاری می‌کند؟
          </h2>
          <p className="text-sm sm:text-base text-brand-neutral-600 max-w-2xl mx-auto leading-relaxed">
            در روزگاری که هر فردی بدون آموزش می‌تواند خود را «کوچ» بنامد، اعتبارنامه‌های رسمی ICF ضامن امنیت روانی، صلاحیت فنی و اخلاق حرفه‌ای همراه شما هستند.
          </p>
        </div>

        {/* Credentials 3-Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {CREDENTIALS.map((cred) => (
            <div
              key={cred.level}
              className="bg-brand-surface rounded-3xl p-6 sm:p-8 border border-brand-surface-border shadow-soft-sm flex flex-col justify-between hover:border-brand-teal-300 transition-all"
            >
              <div>
                <div className="inline-block text-xs font-black tracking-wider px-3 py-1 rounded-lg bg-brand-teal-900 text-white mb-4">
                  {cred.level}
                </div>

                <h3 className="text-lg font-bold text-brand-neutral-900 mb-2">
                  {cred.title}
                </h3>

                <p className="text-xs text-brand-neutral-500 font-medium mb-4 leading-relaxed">
                  {cred.reqs}
                </p>

                <p className="text-xs sm:text-sm text-brand-neutral-700 leading-relaxed">
                  {cred.description}
                </p>
              </div>

              <div className="pt-4 border-t border-brand-surface-border mt-6 flex items-center gap-2 text-xs text-brand-teal-900 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-brand-teal-700" />
                <span>معتبر در بیش از ۱۴۰ کشور</span>
              </div>
            </div>
          ))}
        </div>

        {/* ICF Values Box */}
        <div className="bg-brand-teal-900 text-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-soft-md">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3 text-center md:text-right">
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                منشور اخلاقی و خطوط قرمز کوچ‌های بلومیا کلاب
              </h3>
              <p className="text-xs sm:text-sm text-brand-teal-100/90 leading-relaxed max-w-3xl">
                تمامی کوچ‌های همکار با بلومیا متعهد به عدم سوءاستفاده از جایگاه، رازداری کامل، اعلام شفاف صلاحیت‌ها، و در صورت نیاز، ارجاع مراجع به متخصصان روان‌درمانی یا پزشکی هستند.
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-brand-teal-800 border border-brand-teal-700 flex items-center justify-center">
                <ShieldCheck className="w-8 h-8 text-brand-teal-200" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
