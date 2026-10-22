'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ShieldCheck, Clock, Calendar } from 'lucide-react';
import type { CoachProfile, Package, Service } from '@/lib/coaches';
import { AtynoBookingModal } from '@/components/coach/AtynoBookingModal';
import { toFa } from '@/lib/format';

interface SoleaPricingProps {
  coach?: CoachProfile;
}

export const SoleaPricing: React.FC<SoleaPricingProps> = ({ coach }) => {
  const [activeTab, setActiveTab] = useState<'packages' | 'single'>('packages');
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    title: string;
    bookingUrl: string;
  }>({
    isOpen: false,
    title: '',
    bookingUrl: '',
  });

  const coachName = coach?.name || 'فاطمه اسماعیلی';

  // Zero / Discovery session
  const zeroService = coach?.services?.find((s) => s.isFree) || {
    id: 'zero',
    title: 'جلسه صفر (معارفه رایگان)',
    duration: '۴۵ دقیقه',
    description:
      'یک گفتگوی آنلاین ۴۵ دقیقه‌ای رایگان برای آشنایی صمیمانه، شنیدن دغدغه‌های شما و بررسی اینکه آیا کوچینگ در این مقطع برای شرایط شما مناسب است یا خیر.',
    isFree: true,
    bookingUrl:
      'https://atyno.com/fa/embed/934b33a2-9888-4209-9901-b9632e812e6c?meeting=zero',
  };

  // Single Coaching Session
  const singleService = coach?.services?.find((s) => !s.isFree) || {
    id: 'coaching',
    title: 'کوچینگ بانوان و مادران: وضوح و تعادل',
    duration: '۶۰ دقیقه',
    description:
      'میان مسئولیت‌های مادری، کار، مدیریت خانه و مراقبت از اطرافیان، این تک‌جلسه یک فضای مکث امن، محرمانه و بدون قضاوت است؛ فرصتی برای اینکه چالش فعلی‌تان را روی میز بگذارید، از زاویه‌ای شفاف به آن نگاه کنید و به سمت تعادل و آرامش حرکت کنید.',
    price: 750000,
    isFree: false,
    bookingUrl:
      'https://atyno.com/fa/embed/934b33a2-9888-4209-9901-b9632e812e6c?meeting=coaching',
  };

  // Packages
  const packages: Package[] =
    coach?.packagesData && coach.packagesData.length > 0
      ? coach.packagesData
      : [
          {
            id: 'growth',
            title: 'پکیج ۴ جلسه‌ای «شروع»',
            sessions: 4,
            duration: '۶۰ دقیقه',
            description: 'وضوح، تعادل و گام اول تغییر',
            price: 2500000,
            discountPercent: 17,
            validityDays: 90,
            isPopular: false,
            bookingUrl:
              'https://atyno.com/fa/embed/934b33a2-9888-4209-9901-b9632e812e6c?package=growth',
            features: [
              '۴ جلسه کوچینگ آنلاین ۶۰ دقیقه‌ای',
              'شفاف‌سازی مسئله اصلی و تفکیک تنش‌های روزمره',
              'اولویت‌بندی بر اساس ارزش‌های فردی بدون نسخه آماده',
              'طراحی برنامه اقدام شدنی (Action Plan) متناسب با توان مادر',
              'پشتیبانی و پاسخ به پرسش‌ها میان جلسات با پیامک',
              'ضمانت بازگشت کامل وجه تا پایان جلسه دوم',
            ],
          },
          {
            id: 'self-discovery',
            title: 'پکیج ۶ جلسه‌ای «کشف»',
            sessions: 6,
            duration: '۶۰ دقیقه',
            description: 'شناخت الگوهای درونی و رهایی از موانع ذهنی',
            price: 3600000,
            discountPercent: 20,
            validityDays: 90,
            isPopular: true,
            bookingUrl:
              'https://atyno.com/fa/embed/934b33a2-9888-4209-9901-b9632e812e6c?package=self-discovery',
            features: [
              '۶ جلسه کوچینگ آنلاین ۶۰ دقیقه‌ای',
              'شناسایی و خنثی‌سازی صدای سرزنشگر درونی و کمال‌گرایی',
              'مواجهه امن با احساساتی چون خستگی نقش‌ها، ترس و خشم',
              'بازیابی قدرت درونی و شکل‌دهی به هویتی مستقل در کنار مادری',
              'طراحی رفتارهای کارآمد در موقعیت‌های پرتنش زندگی',
              'پشتیبانی پیامکی پیوسته میان جلسات برای پیگیری تمرین‌ها',
              'ضمانت بازگشت کامل وجه تا پایان جلسه دوم',
            ],
          },
          {
            id: 'transformation',
            title: 'پکیج ۸ جلسه‌ای «تحول»',
            sessions: 8,
            duration: '۶۰ دقیقه',
            description: 'بازآفرینی هویت، عبور از فرسودگی و تغییر پایدار',
            price: 4700000,
            discountPercent: 22,
            validityDays: 90,
            isPopular: false,
            bookingUrl:
              'https://atyno.com/fa/embed/934b33a2-9888-4209-9901-b9632e812e6c?package=transformation',
            features: [
              '۸ جلسه کوچینگ آنلاین ۶۰ دقیقه‌ای',
              'بازسازی ساختارهای ذهنی فرسایش‌دهنده و سبک زندگی',
              'ایجاد مرزهای روانی شفاف و سالم و مهار انتظارات اطرافیان',
              'نهادینه‌سازی مهارت «نه گفتن» بدون احساس گناه در روابط',
              'طراحی جعبه‌ابزار شخصی تاب‌آوری برای روزهای پرتنش',
              'پشتیبانی کامل پیامکی میان جلسات جهت رفع ابهامات',
              'ضمانت بازگشت کامل وجه تا پایان جلسه دوم',
            ],
          },
          {
            id: 'self-leadership-coaching',
            title: 'پکیج ۱۲ جلسه‌ای «تعالی»',
            sessions: 12,
            duration: '۶۰ دقیقه',
            description: 'کوچینگ جامع خودراهبری، شکوفایی و تعادل',
            price: 6000000,
            discountPercent: 33,
            validityDays: 90,
            isPopular: false,
            bookingUrl:
              'https://atyno.com/fa/embed/934b33a2-9888-4209-9901-b9632e812e6c?package=self-leadership-coaching',
            features: [
              '۱۲ جلسه اختصاصی آنلاین ۶۰ دقیقه‌ای',
              'طراحی سند چشم‌انداز فردی (Life Vision) و قطب‌نمای ارزش‌ها',
              'نهادینه‌سازی سیستم‌های خودانگیزشی و روتین‌های روزمره پایدار',
              'هماهنگ‌سازی نقش مادری و شغلی با آرزوهای شخصی بدون اصطکاک',
              'ارزیابی و پایش همه‌جانبه پیشرفت و شاخص‌های رضایت از زندگی',
              'پشتیبانی نامحدود پیامکی در تمام طول دوره ۳ تا ۴ ماهه',
              'ضمانت بازگشت کامل وجه تا پایان جلسه دوم',
            ],
          },
        ];

  const openBooking = (title: string, bookingUrl?: string) => {
    const url =
      bookingUrl ||
      coach?.bookingUrl ||
      'https://atyno.com/fa/embed/934b33a2-9888-4209-9901-b9632e812e6c?meeting=zero';
    setModalConfig({
      isOpen: true,
      title,
      bookingUrl: url,
    });
  };

  // Determine grid columns based on package count
  const packageGridCols =
    packages.length === 4
      ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4'
      : packages.length === 3
        ? 'grid-cols-1 md:grid-cols-3'
        : packages.length === 2
          ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto'
          : 'grid-cols-1 max-w-lg mx-auto';

  return (
    <section
      id="pricing"
      className="relative w-full bg-[#1f3d3a] py-20 lg:py-28 text-white overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading with Staggered Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="font-serif text-3xl font-normal leading-[1.35] text-white sm:text-4xl lg:text-5xl">
            انتخاب مسیر همراهی
            <br />
            بسته‌های کوچینگ و جلسات
          </h2>
          <p className="mt-4 text-sm sm:text-base text-white/80 leading-relaxed font-sans">
            سرمایه‌گذاری شفاف، بدون هزینه پنهان و متناسب با مرحله‌ای از زندگی که
            اکنون در آن ایستاده‌اید.
          </p>
        </motion.div>

        {/* 1. VIP Discovery Call Banner (جلسه معارفه رایگان) */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-12 mb-12 overflow-hidden rounded-[2rem] border border-white/20 bg-gradient-to-l from-white/[0.14] via-white/[0.08] to-white/[0.05] p-6 sm:p-8 backdrop-blur-md shadow-xl"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#dfece9]/25 px-3 py-1 text-xs font-semibold text-[#dfece9] border border-[#dfece9]/30 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#dfece9] animate-pulse" />
                <span>جلسه صفر</span>
                <span className="opacity-40">|</span>
                <span>{zeroService.duration} آنلاین · کاملاً رایگان</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-medium text-white leading-snug">
                هنوز در انتخاب بسته همراهی مطمئن نیستید؟
              </h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-white/85">
                {zeroService.description}
              </p>
            </div>

            <div className="shrink-0 flex items-center">
              <button
                type="button"
                onClick={() =>
                  openBooking(
                    'رزرو جلسه معارفه رایگان (جلسه صفر)',
                    zeroService.bookingUrl
                  )
                }
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-xs sm:text-sm font-bold text-[#1f3d3a] shadow-lg transition-all hover:bg-[#dfece9] hover:shadow-xl active:scale-98"
              >
                <Calendar className="h-4 w-4 text-[#1f3d3a]" />
                <span>رزرو جلسه صفر رایگان</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* 2. Interactive Segmented Switcher (Tabs) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex justify-center mb-10"
        >
          <div className="inline-flex items-center p-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15">
            <button
              type="button"
              onClick={() => setActiveTab('packages')}
              className={`relative px-5 sm:px-7 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 ${
                activeTab === 'packages'
                  ? 'text-[#1f3d3a]'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              {activeTab === 'packages' && (
                <motion.div
                  layoutId="pricingTabPill"
                  className="absolute inset-0 rounded-full bg-white shadow-md"
                  transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
                />
              )}
              <span className="relative z-10">
                بسته‌های همراهی ({toFa(packages.length)} پکیج)
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('single')}
              className={`relative px-5 sm:px-7 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 ${
                activeTab === 'single'
                  ? 'text-[#1f3d3a]'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              {activeTab === 'single' && (
                <motion.div
                  layoutId="pricingTabPill"
                  className="absolute inset-0 rounded-full bg-white shadow-md"
                  transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
                />
              )}
              <span className="relative z-10">تک‌جلسه کوچینگ</span>
            </button>
          </div>
        </motion.div>

        {/* Tab 1: Packages Grid */}
        <AnimatePresence mode="wait">
          {activeTab === 'packages' && (
            <motion.div
              key="packages-tab"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <div className={`grid gap-6 lg:gap-7 ${packageGridCols}`}>
                {packages.map((pkg, idx) => {
                  const isPopular = Boolean(pkg.isPopular);

                  return (
                    <motion.div
                      key={pkg.id || idx}
                      initial={{ opacity: 0, y: 35 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{
                        duration: 0.55,
                        delay: idx * 0.1,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      whileHover={{
                        y: -6,
                        transition: { duration: 0.22, ease: 'easeOut' },
                      }}
                      className={`group relative flex flex-col justify-between rounded-[2.25rem] sm:rounded-[2.5rem] bg-white p-6 sm:p-8 text-[#1e1e1e] shadow-xl hover:shadow-2xl transition-all ${
                        isPopular ? 'ring-2 ring-[#dfece9]' : ''
                      }`}
                    >
                      {/* Popular Badge */}
                      {isPopular && (
                        <div className="absolute -top-3.5 inset-x-0 mx-auto w-fit">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1f3d3a] px-3.5 py-1 text-[11px] font-bold text-white shadow-md border border-[#dfece9]">
                            پیشنهاد ویژه مراجعان
                          </span>
                        </div>
                      )}

                      <div>
                        {/* Title & Tag */}
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-sm font-bold text-[#1f3d3a]">
                            {pkg.title}
                          </span>
                        </div>

                        {/* Price */}
                        <div className="mt-4 flex flex-col items-start gap-1">
                          <div className="flex items-baseline gap-1.5">
                            <span className="font-serif text-2xl sm:text-3xl xl:text-3xl font-bold leading-tight text-[#1e1e1e]">
                              {pkg.price.toLocaleString('fa-IR')}
                            </span>
                          </div>
                          <span className="text-xs text-[#6b6b6b]">
                            تومان / {toFa(pkg.sessions)} جلسه ۶۰ دقیقه‌ای
                          </span>
                        </div>

                        {/* Discount and validity strip */}
                        <div className="mt-3.5 flex flex-wrap items-center gap-2">
                          {pkg.discountPercent ? (
                            <span className="inline-flex items-center rounded-md bg-[#dfece9] px-2.5 py-0.5 text-[11px] font-semibold text-[#1f3d3a]">
                              {toFa(pkg.discountPercent)}٪ تخفیف نسبت به تک‌جلسه
                            </span>
                          ) : null}
                          <span className="inline-flex items-center gap-1 text-[11px] text-[#6b6b6b]">
                            <Clock className="h-3 w-3" />
                            <span>۹۰ روز اعتبار</span>
                          </span>
                        </div>

                        {/* Features List */}
                        <ul className="mt-6 space-y-3 border-t border-black/10 pt-5 text-xs sm:text-sm text-[#4a4a4a]">
                          {(
                            pkg.features || [
                              `${toFa(pkg.sessions)} جلسه کوچینگ آنلاین ${pkg.duration}`,
                              'برنامه اختصاصی متناسب با دغدغه شما',
                              'پشتیبانی و پیگیری مستمر میان جلسات',
                            ]
                          ).map((feat, fIdx) => (
                            <li key={fIdx} className="flex items-start gap-2.5">
                              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#dfece9] text-[#1f3d3a]">
                                <Check className="h-2.5 w-2.5 stroke-[3]" />
                              </span>
                              <span className="leading-[1.7]">{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Action Button */}
                      <div className="mt-8 pt-4">
                        <button
                          type="button"
                          onClick={() =>
                            openBooking(`رزرو ${pkg.title}`, pkg.bookingUrl)
                          }
                          className="inline-flex w-full items-center justify-center rounded-full border border-black/15 bg-transparent py-3 text-xs sm:text-sm font-semibold tracking-wide text-[#1f3d3a] transition-all hover:border-[#1f3d3a] hover:bg-[#1f3d3a] hover:text-white active:scale-98"
                        >
                          رزرو و شروع مسیر
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Tab 2: Single Session Spotlight Card */}
          {activeTab === 'single' && (
            <motion.div
              key="single-tab"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="max-w-2xl mx-auto"
            >
              <div className="rounded-[2.5rem] bg-white p-7 sm:p-10 lg:p-12 text-[#1e1e1e] shadow-2xl border border-white/10">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-black/10">
                  <span className="inline-flex items-center rounded-full bg-[#dfece9] px-3.5 py-1 text-xs font-bold text-[#1f3d3a]">
                    تک‌جلسه فردی آنلاین
                  </span>
                  <span className="text-xs text-[#6b6b6b]">
                    {singleService.duration} · گفتگوی متمرکز و عمیق
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1e1e1e] mt-6">
                  {singleService.title}
                </h3>

                <div className="mt-4 flex items-baseline gap-1.5">
                  <span className="font-serif text-3xl sm:text-4xl font-bold text-[#1e1e1e]">
                    {(singleService.price || 750000).toLocaleString('fa-IR')}
                  </span>
                  <span className="text-xs text-[#6b6b6b]">
                    تومان / یک جلسه ۶۰ دقیقه‌ای
                  </span>
                </div>

                <p className="mt-5 text-xs sm:text-sm leading-[1.8] text-[#4a4a4a]">
                  {singleService.description}
                </p>

                <ul className="mt-7 space-y-3.5 border-t border-black/10 pt-6 text-xs sm:text-sm text-[#4a4a4a]">
                  <li className="flex items-start gap-2.5">
                    <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#dfece9] text-[#1f3d3a]">
                      <Check className="h-2.5 w-2.5 stroke-[3]" />
                    </span>
                    <span>
                      بررسی عمیق و متمرکز یک چالش مشخص بدون تعهد به دوره‌های
                      چندماهه
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#dfece9] text-[#1f3d3a]">
                      <Check className="h-2.5 w-2.5 stroke-[3]" />
                    </span>
                    <span>
                      طراحی نخستین گام‌های عملی و فوری برای بازیابی انرژی و تعادل
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#dfece9] text-[#1f3d3a]">
                      <Check className="h-2.5 w-2.5 stroke-[3]" />
                    </span>
                    <span>
                      امکان تبدیل هزینه این تک‌جلسه به عنوان بخشی از پکیج در صورت
                      تمایل به ادامه مسیر
                    </span>
                  </li>
                </ul>

                <div className="mt-8 pt-2">
                  <button
                    type="button"
                    onClick={() =>
                      openBooking(
                        'رزرو تک‌جلسه کوچینگ فردی',
                        singleService.bookingUrl
                      )
                    }
                    className="inline-flex w-full items-center justify-center rounded-full bg-[#1f3d3a] py-4 text-xs sm:text-sm font-semibold tracking-wider text-white transition-all hover:bg-[#2b544e] active:scale-98 shadow-lg"
                  >
                    رزرو تک‌جلسه کوچینگ
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3. Satisfaction & Refund Guarantee Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 rounded-2xl bg-white/[0.06] border border-white/10 px-6 py-3.5 text-xs sm:text-sm text-white/85 backdrop-blur-sm">
            <div className="flex items-center gap-1.5 text-[#dfece9] font-bold">
              <ShieldCheck className="h-4 w-4 stroke-[2.5]" />
              <span>ضمانت بازگشت کامل وجه:</span>
            </div>
            <span>
              در تمامی پکیج‌های همراهی تا پایان جلسه دوم در صورت عدم تمایل، کل وجه
              پرداختی بدون قید و شرط بازگردانده می‌شود.
            </span>
          </div>
        </motion.div>
      </div>

      {/* Embedded Atyno Booking Modal */}
      <AtynoBookingModal
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig((prev) => ({ ...prev, isOpen: false }))}
        title={modalConfig.title}
        bookingUrl={modalConfig.bookingUrl}
        coachName={coachName}
      />
    </section>
  );
};
