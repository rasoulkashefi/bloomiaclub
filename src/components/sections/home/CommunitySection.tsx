import React from 'react';
import Link from 'next/link';
import { Users2, Library, Network, CheckCircle2, ArrowLeft } from 'lucide-react';

const pillars = [
  {
    icon: Users2,
    title: 'تعامل و هم‌افزایی هدفمند',
    description:
      'عضویت در جامعه‌ای از افراد هم‌مسیر و متخصص؛ جایی برای اشتراک تجربیات زیسته و دریافت حمایت در چالش‌های مسیر رشد.',
    bullets: [
      'گروه‌های تخصصی بر اساس اهداف (شغلی، فردی، بیزینس)',
      'رویدادهای شبکه‌سازی آنلاین ماهانه',
      'اتاق‌های گفتگوی صمیمی و پرسش‌وپاسخ با مربیان',
    ],
    actionText: 'عضویت در جامعه بلومیا',
    actionHref: '/community',
  },
  {
    icon: Library,
    title: 'منابع کاربردی رشد فردی',
    description:
      'دسترسی به گلچینی از کاربردی‌ترین محتواها، خلاصه کتاب‌های مرجع توسعه فردی و متدهای علمی ارتقای کیفیت زندگی.',
    bullets: [
      'وبینارها و کارگاه‌های تخصصی آنلاین',
      'چک‌لیست‌ها و ورک‌شیت‌های تمرینی مربیان',
      'پادکست‌ها و فایل‌های صوتی خودآگاهی',
    ],
    actionText: 'کاوش در منابع آموزشی',
    actionHref: '/blog',
  },
  {
    icon: Network,
    title: 'شبکه ارتباطات و همتایان',
    description:
      'ارتباط مستقیم با افراد موفق، کارآفرینان و مدیران؛ جایی که همتایان یادگیرنده به شتاب‌بخشی رشد یکدیگر کمک می‌کنند.',
    bullets: [
      'ارتباط با متخصصان حوزه‌های مختلف کاری',
      'فرصت‌های هم‌افزایی و پروژه‌های مشترک',
      'سیستم گفتگوی همتا به همتا (Peer Coaching)',
    ],
    actionText: 'پیوستن به شبکه متخصصان',
    actionHref: '/coaching/free-intro-session',
  },
];

export const CommunitySection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-brand-surface border-b border-brand-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 md:mb-16">
          <span className="text-brand-coral-600 font-bold text-sm tracking-wide uppercase">
            اکوسیستم رشد مشترک
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-neutral-900 tracking-tight">
            به شبکه بزرگ شکوفایی بلومیا بپیوندید
          </h2>
          <p className="text-sm sm:text-base text-brand-neutral-600 leading-relaxed">
            رشد پایدار زمانی اتفاق می‌افتد که در کنار آموزش و مربی‌گری، در محیطی حمایتی از افراد هم‌فرکانس قرار بگیرید.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-brand-surface-paper rounded-3xl p-6 sm:p-8 border border-brand-neutral-200/80 shadow-soft hover:shadow-elevated transition-all duration-300 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-brand-teal-50 text-brand-teal-900 flex items-center justify-center">
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-brand-neutral-900">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-brand-neutral-600 leading-relaxed">
                    {pillar.description}
                  </p>

                  <ul className="space-y-2.5 pt-2 border-t border-brand-neutral-100 text-xs sm:text-sm text-brand-neutral-700">
                    {pillar.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-brand-teal-600 shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={pillar.actionHref}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-brand-teal-200 text-brand-teal-900 hover:bg-brand-teal-50 font-semibold text-xs sm:text-sm transition-colors text-center"
                >
                  <span>{pillar.actionText}</span>
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
