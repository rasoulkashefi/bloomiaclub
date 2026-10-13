import React from 'react';
import { ArrowLeftRight, HelpCircle, Check, X, ShieldAlert } from 'lucide-react';

const COMPARISONS = [
  {
    discipline: 'کوچینگ (Coaching)',
    focus: 'حال به آینده و شکوفایی پتانسیل',
    role: 'تسهیل‌کننده و شریک تفکر (همراه بدون قضاوت)',
    approach: 'پرسشگری عمیق و کشف راهکار توسط مراجع',
    output: 'خودآگاهی، شفافیت، و اقدام مسئولانه',
    isHero: true,
  },
  {
    discipline: 'روان‌درمانی (Therapy)',
    focus: 'گذشته به حال و التیام تروماها',
    role: 'درمانگر بالینی و متخصص سلامت روان',
    approach: 'تشخیص، تحلیل ریشه‌ها و درمان اختلالات',
    output: 'بهبود روانی و بازیابی کارکرد طبیعی زندگی',
    isHero: false,
  },
  {
    discipline: 'مشاوره (Consulting)',
    focus: 'مسئله تخصصی یا عارضه‌یابی فنی',
    role: 'کارشناس صاحب‌نظر و تحلیل‌گر',
    approach: 'ارزیابی مسئله و تجویز راهکار آماده و نسخه قطعی',
    output: 'دریافت پاسخ تخصصی آماده اجرا',
    isHero: false,
  },
  {
    discipline: 'منتورینگ (Mentoring)',
    focus: 'انتقال تجربه در یک مسیر شغلی یا صنعتی',
    role: 'فرد باتجربه در همان حوزه شغلی (Senior)',
    approach: 'انتقال تجربیات زیسته، راهنمایی و میان‌برهای شخصی',
    output: 'یادگیری از اشتباهات و تجارب پیشکسوت',
    isHero: false,
  },
  {
    discipline: 'آموزش و تدریس (Training)',
    focus: 'کسب دانش یا مهارت جدید بر اساس سرفصل',
    role: 'مدرس، معلم یا استاد دوره',
    approach: 'انتقال یک‌طرفه محتوای آموزشی ساختارمند',
    output: 'افزایش مهارت، دانش فنی یا دریافت مدرک',
    isHero: false,
  },
];

export const WhatIsCoachingComparisonSection: React.FC = () => {
  return (
    <section id="comparison" className="py-16 md:py-24 bg-brand-surface border-b border-brand-surface-border scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-teal-50 border border-brand-teal-200/60 text-brand-teal-900 text-xs sm:text-sm font-semibold">
            <ArrowLeftRight className="w-4 h-4 text-brand-teal-700" />
            <span>مرزبندی‌های شفاف حرفه‌ای</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-neutral-900 tracking-tight">
            مقایسه کوچینگ با روان‌درمانی، مشاوره و منتورینگ
          </h2>
          <p className="text-sm sm:text-base text-brand-neutral-600 max-w-2xl mx-auto leading-relaxed">
            یکی از بزرگترین سوءتفاهم‌ها، یکی دانستن کوچینگ با سایر حوزه‌هاست. جدول زیر تفاوت‌های بنیادین را آشکار می‌سازد.
          </p>
        </div>

        {/* Desktop Comparison Table (Hidden on small screens) */}
        <div className="hidden lg:block bg-white rounded-3xl border border-brand-surface-border shadow-soft-sm overflow-hidden mb-8">
          <table className="w-full text-right text-sm">
            <thead>
              <tr className="bg-brand-surface-muted border-b border-brand-surface-border text-brand-neutral-800 font-bold">
                <th className="py-4 px-6">حوزه</th>
                <th className="py-4 px-6">تمرکز زمانی</th>
                <th className="py-4 px-6">نقش متخصص</th>
                <th className="py-4 px-6">شیوه کارکرد</th>
                <th className="py-4 px-6">خروجی و دستاورد</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-surface-border">
              {COMPARISONS.map((row, idx) => (
                <tr
                  key={idx}
                  className={`transition-colors ${
                    row.isHero
                      ? 'bg-brand-teal-50/70 font-semibold text-brand-neutral-900'
                      : 'hover:bg-brand-surface text-brand-neutral-700'
                  }`}
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      {row.isHero && (
                        <span className="w-2 h-2 rounded-full bg-brand-teal-700" />
                      )}
                      <span className={row.isHero ? 'text-brand-teal-900 font-extrabold' : ''}>
                        {row.discipline}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-xs sm:text-sm">{row.focus}</td>
                  <td className="py-4 px-6 text-xs sm:text-sm">{row.role}</td>
                  <td className="py-4 px-6 text-xs sm:text-sm">{row.approach}</td>
                  <td className="py-4 px-6 text-xs sm:text-sm">{row.output}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile / Tablet Cards Grid (Strict Mobile-First) */}
        <div className="lg:hidden space-y-4 mb-8">
          {COMPARISONS.map((row, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-5 border ${
                row.isHero
                  ? 'bg-brand-teal-50 border-brand-teal-300 shadow-soft-sm'
                  : 'bg-white border-brand-surface-border'
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-brand-surface-border mb-3">
                <h3 className={`text-base font-bold ${row.isHero ? 'text-brand-teal-950 font-extrabold' : 'text-brand-neutral-900'}`}>
                  {row.discipline}
                </h3>
                {row.isHero && (
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-brand-teal-800 text-white">
                    خدمت بلومیا
                  </span>
                )}
              </div>

              <div className="space-y-2 text-xs sm:text-sm">
                <div>
                  <span className="text-brand-neutral-500 font-medium ml-1">تمرکز زمانی:</span>
                  <span className="text-brand-neutral-800">{row.focus}</span>
                </div>
                <div>
                  <span className="text-brand-neutral-500 font-medium ml-1">نقش متخصص:</span>
                  <span className="text-brand-neutral-800">{row.role}</span>
                </div>
                <div>
                  <span className="text-brand-neutral-500 font-medium ml-1">شیوه کارکرد:</span>
                  <span className="text-brand-neutral-800">{row.approach}</span>
                </div>
                <div>
                  <span className="text-brand-neutral-500 font-medium ml-1">خروجی نهایی:</span>
                  <span className="text-brand-neutral-800 font-semibold">{row.output}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Diagnostic Aid Note */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-brand-surface-border text-xs sm:text-sm text-brand-neutral-600 leading-relaxed">
          <span className="font-bold text-brand-neutral-900 ml-1">قاعده سرانگشتی برای انتخاب:</span>
          اگر احساس رنج روانی، اختلال در کارکردهای روزمره یا تروماهای حل‌نشده گذشته دارید، مراجعه به روان‌درمانگر اولویت است. اما اگر در سلامت روان به سر می‌برید و می‌خواهید تصمیمات مهم بگیرید، مسیر شغلی‌تان را متحول کنید، به تعادل برسید یا عملکردتان را ارتقا دهید، کوچینگ دقیق‌ترین انتخاب شماست.
        </div>
      </div>
    </section>
  );
};
