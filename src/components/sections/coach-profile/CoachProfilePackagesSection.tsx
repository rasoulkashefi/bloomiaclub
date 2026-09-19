'use client';

import React from 'react';
import { Sparkles, Check, ArrowDown, Calendar } from 'lucide-react';
import type { Coach } from '@/lib/coaches';

interface CoachProfilePackagesSectionProps {
  coach: Coach;
  onSelectPackage: (packageName: string) => void;
}

export const CoachProfilePackagesSection: React.FC<CoachProfilePackagesSectionProps> = ({
  coach,
  onSelectPackage,
}) => {
  const prices = coach.packagePrices || {};
  const discounts = coach.packageDiscounts || {};

  const packages = [
    {
      id: 'session-zero',
      name: 'جلسه معارفه (جلسه صفر)',
      sessions: '۱ جلسه (۳۰ دقیقه)',
      category: 'آشنایی بدون تعهد',
      description: 'یک گفتگوی آنلاین رایگان برای آشنایی با کوچ، بررسی چالش‌ها و اطمینان از تناسب مسیر کوچینگ برای شما.',
      price: 0,
      isFree: true,
      featured: false,
      features: [
        'بررسی رایگان چالش اصلی شما',
        'آشنایی با متدولوژی و سبک کوچ',
        'سنجش همسویی شخصیتی و ارتباطی',
        'بدون نیاز به پرداخت یا ثبت کارت',
      ],
    },
    {
      id: 'start',
      name: 'پکیج «شروع»',
      sessions: '۴ جلسه اختصاصی',
      category: 'شفاف‌سازی و گام اول',
      description: 'مناسب برای شفاف کردن یک هدف مشخص، غلبه بر ابهام‌های ذهنی و برداشتن اولین گام‌های عملی با همراهی کوچ.',
      price: prices.start || 4500000,
      discount: discounts.start || 0,
      isFree: false,
      featured: false,
      features: [
        '۴ جلسه کوچینگ آنلاین ۶۰ دقیقه‌ای',
        'ترسیم نقشه راه و اهداف مشخص',
        'پیگیری پیشرفت میان جلسات',
        'تمرین‌های اختصاصی و فایل‌های کاربردی',
      ],
    },
    {
      id: 'discovery',
      name: 'پکیج «کشف»',
      sessions: '۶ جلسه اختصاصی',
      category: 'پیشنهاد ویژه کوچ',
      description: 'کاوش عمیق‌تر در الگوهای فکری، شناسایی ریشه‌های باورهای محدودکننده و بازطراحی تصمیم‌گیری‌های کلیدی.',
      price: prices.discovery || 6800000,
      discount: discounts.discovery || 15,
      isFree: false,
      featured: true,
      features: [
        '۶ جلسه کوچینگ آنلاین ۶۰ دقیقه‌ای',
        'واکاوی عمیق الگوهای رفتاری و باورها',
        'پشتیبانی پیامکی در طول دوره',
        'طراحی برنامه اقدام فردی شخصی‌سازی‌شده',
        'بازبینی پیشرفت در نیمه مسیر',
      ],
    },
    {
      id: 'transformation',
      name: 'پکیج «تحول»',
      sessions: '۸ جلسه اختصاصی',
      category: 'تغییر پایدار و عمیق',
      description: 'ایجاد دگرگونی پایدار در سبک زندگی یا کار، ساخت عادت‌های جدید، تثبیت تاب‌آوری و دستیابی به نتایج ملموس.',
      price: prices.transformation || 8900000,
      discount: discounts.transformation || 20,
      isFree: false,
      featured: false,
      features: [
        '۸ جلسه کوچینگ آنلاین ۶۰ دقیقه‌ای',
        'تثبیت عادات نو و بازآفرینی هویت حرفه‌ای',
        'پشتیبانی مستمر و ارزیابی هفتگی',
        'مدیریت تعارضات و چالش‌های غیرمنتظره',
      ],
    },
  ];

  const handleSelect = (packageName: string) => {
    onSelectPackage(packageName);
    const bookingElement = document.getElementById('booking');
    if (bookingElement) {
      bookingElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="packages" className="py-16 md:py-24 bg-brand-surface-paper border-b border-brand-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 md:mb-16">
          <span className="text-brand-teal-800 font-bold text-xs sm:text-sm tracking-wide uppercase">
            مسیر همراهی و تعرفه‌ها
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-neutral-900 tracking-tight">
            بسته‌های کوچینگ متناسب با سرعت رشد شما
          </h2>
          <p className="text-sm sm:text-base text-brand-neutral-600 leading-relaxed">
            از جلسه صفر رایگان تا دوره‌های تحول عمیق؛ بسته‌ای را انتخاب کنید که بیشترین تطابق را با اهداف شما دارد.
          </p>
        </div>

        {/* Packages Grid: 1 col on mobile, 2 on tablet, 4 on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {packages.map((pkg) => {
            const finalPrice = pkg.discount && pkg.discount > 0
              ? pkg.price * (1 - pkg.discount / 100)
              : pkg.price;

            return (
              <div
                key={pkg.id}
                className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                  pkg.featured
                    ? 'bg-brand-teal-950 text-white shadow-elevated border-2 border-brand-teal-600 hover:-translate-y-1'
                    : 'bg-brand-surface rounded-3xl border border-brand-neutral-200/90 shadow-soft hover:shadow-elevated hover:border-brand-teal-300/80 hover:-translate-y-1'
                }`}
              >
                {/* Featured Badge */}
                {pkg.featured && (
                  <div className="absolute -top-3.5 right-1/2 translate-x-1/2 px-4 py-1 rounded-full bg-brand-teal-700 text-white text-xs font-bold shadow-soft">
                    {pkg.category}
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    {!pkg.featured && (
                      <span className="text-[11px] font-bold text-brand-teal-800 uppercase tracking-wide">
                        {pkg.category}
                      </span>
                    )}
                    <h3
                      className={`text-lg font-bold mt-1 ${
                        pkg.featured ? 'text-white' : 'text-brand-neutral-900'
                      }`}
                    >
                      {pkg.name}
                    </h3>
                    <p
                      className={`text-xs mt-0.5 ${
                        pkg.featured ? 'text-brand-teal-200' : 'text-brand-neutral-500'
                      }`}
                    >
                      {pkg.sessions}
                    </p>
                  </div>

                  <p
                    className={`text-xs leading-relaxed ${
                      pkg.featured ? 'text-brand-teal-100/80' : 'text-brand-neutral-600'
                    }`}
                  >
                    {pkg.description}
                  </p>

                  {/* Price Block */}
                  <div className="pt-2">
                    {pkg.isFree ? (
                      <div className="text-2xl font-black text-emerald-600">
                        رایگان
                      </div>
                    ) : (
                      <div className="space-y-1">
                        {Boolean(pkg.discount && pkg.discount > 0) && (
                          <div className="flex items-center gap-2">
                            <span className="text-xs line-through text-brand-neutral-400">
                              {Number(pkg.price).toLocaleString('fa-IR')} تومان
                            </span>
                            <span className="px-1.5 py-0.5 rounded-md bg-amber-500/20 text-amber-500 text-[11px] font-bold">
                              {pkg.discount}٪ تخفیف
                            </span>
                          </div>
                        )}
                        <div
                          className={`text-xl sm:text-2xl font-black ${
                            pkg.featured ? 'text-white' : 'text-brand-neutral-900'
                          }`}
                        >
                          {Number(finalPrice).toLocaleString('fa-IR')}{' '}
                          <span className="text-xs font-normal opacity-80">
                            تومان
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Features List */}
                  <ul className="pt-4 border-t border-brand-neutral-200/40 space-y-2.5 text-xs">
                    {pkg.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            pkg.featured ? 'text-brand-teal-300' : 'text-brand-teal-700'
                          }`}
                        />
                        <span
                          className={
                            pkg.featured ? 'text-brand-teal-100/90' : 'text-brand-neutral-700'
                          }
                        >
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Button Action */}
                <div className="pt-6">
                  <button
                    type="button"
                    onClick={() => handleSelect(pkg.name)}
                    className={`w-full py-3 rounded-full font-bold text-xs sm:text-sm transition-all min-h-[44px] flex items-center justify-center gap-1.5 shadow-soft active:scale-98 ${
                      pkg.featured
                        ? 'bg-white text-brand-teal-950 hover:bg-brand-teal-50'
                        : pkg.isFree
                        ? 'bg-brand-teal-900 text-white hover:bg-brand-teal-800'
                        : 'bg-brand-surface-paper border border-brand-neutral-300 text-brand-neutral-800 hover:bg-brand-teal-50 hover:text-brand-teal-900'
                    }`}
                  >
                    <span>{pkg.isFree ? 'رزرو جلسه صفر' : 'انتخاب این بسته'}</span>
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
