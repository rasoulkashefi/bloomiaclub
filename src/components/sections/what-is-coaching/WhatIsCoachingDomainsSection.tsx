import React from 'react';
import Link from 'next/link';
import { Briefcase, User, HeartHandshake, Building2, ArrowLeft, Check } from 'lucide-react';

const DOMAINS = [
  {
    icon: Briefcase,
    title: 'کوچینگ مسیر شغلی و حرفه‌ای',
    subtitle: 'Career Coaching',
    description:
      'همراهی برای عبور از بن‌بست‌های شغلی، تصمیم‌گیری برای تغییر مسیر حرفه‌ای، آمادگی برای موقعیت‌های ارشد و مذاکره برای ارتقای جایگاه.',
    bullets: [
      'گذار موفق و بدون ریسک میان صنایع یا حوزه‌های شغلی',
      'مدیریت سندروم ایمپاستر و ترس از دیده شدن در محیط کار',
      'شفاف‌سازی چشم‌انداز ۵ ساله شغلی متناسب با مهارت‌ها',
      'تقویت مهارت‌های ارتباطی و مذاکره با مدیران و ذی‌نفعان',
    ],
    ctaText: 'کوچ‌های مسیر شغلی',
    ctaLink: '/coaches?specialty=career',
  },
  {
    icon: User,
    title: 'کوچینگ توسعه و رشد فردی',
    subtitle: 'Life & Personal Growth',
    description:
      'فضایی برای خودشناسی عمیق، بازیابی احساس عاملیت و عزت‌نفس، و ساختن عادت‌های پایداری که کیفیت روزمره زندگی شما را ارتقا می‌دهند.',
    bullets: [
      'کشف ارزش‌های بنیادین و همسو کردن تصمیمات روزمره با آن‌ها',
      'غلبه بر اهمال‌کاری و مدیریت بحران‌های تصمیم‌گیری',
      'تقویت هوش هیجانی و حل تعارضات در روابط بین‌فردی',
      'ترسیم اهداف شخصی معنادار و پایبندی به برنامه اقدام',
    ],
    ctaText: 'کوچ‌های رشد فردی',
    ctaLink: '/coaches?specialty=personal',
  },
  {
    icon: HeartHandshake,
    title: 'کوچینگ تعادل کار، زندگی و زنان',
    subtitle: 'Work-Life Balance & Motherhood',
    description:
      'پشتیبانی اختصاصی از زنان و مادران شاغل برای ساختن مرزهای شفاف، عبور از فرسودگی مزمن و بازتعریف هویت فردی در کنار نقش‌های مراقبتی.',
    bullets: [
      'مدیریت احساس گناه مادری و تعارض میان کار و خانواده',
      'مرزگذاری سالم با اطرافیان، همکاران و محیط کار',
      'بازگشت توانمند و بااعتمادبه‌نفس به بازار کار پس از والدگری',
      'بازیابی انرژی، زمان فردی و مراقبت اصیل از خویشتن',
    ],
    ctaText: 'کوچ‌های تعادل زندگی',
    ctaLink: '/coaches',
  },
  {
    icon: Building2,
    title: 'کوچینگ سازمانی و رهبری',
    subtitle: 'Executive & Team Coaching',
    description:
      'توانمندسازی بنیان‌گذاران، مدیران ارشد و تیم‌ها برای خلق فرهنگ سازمانی مبتنی بر اعتماد، هدایت موثر بحران‌ها و افزایش بهره‌وری جمعی.',
    bullets: [
      'توسعه مهارت‌های رهبری خدمتگزار و تفویض اختیار اثربخش',
      'کاهش اصطکاک و تعارضات ارتباطی در تیم‌های کاری',
      'پیشگیری از فرسودگی شغلی در تیم‌های با سرعت رشد بالا',
      'برگزاری جلسات کوچینگ گروهی و کارگاه‌های توسعه فرهنگ',
    ],
    ctaText: 'درخواست کوچینگ سازمانی',
    ctaLink: '/contact',
  },
];

export const WhatIsCoachingDomainsSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white border-b border-brand-surface-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-teal-50 border border-brand-teal-200/60 text-brand-teal-900 text-xs sm:text-sm font-semibold">
            <span>قلمروهای تخصصی بلومیا</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-neutral-900 tracking-tight">
            کوچینگ در چه حوزه‌هایی به شما کمک می‌کند؟
          </h2>
          <p className="text-sm sm:text-base text-brand-neutral-600 max-w-xl mx-auto leading-relaxed">
            بلومیا کلاب خدمات کوچینگ را در چهار حوزه تخصصی بر اساس نیاز واقعی جامعه مخاطبان ارائه می‌دهد.
          </p>
        </div>

        {/* 4 Domains Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {DOMAINS.map((domain, idx) => {
            const Icon = domain.icon;
            return (
              <div
                key={idx}
                className="bg-brand-surface rounded-3xl p-6 sm:p-8 border border-brand-surface-border shadow-soft-sm flex flex-col justify-between hover:shadow-soft hover:border-brand-teal-300 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-brand-surface-border text-brand-teal-900 flex items-center justify-center shadow-soft-sm group-hover:bg-brand-teal-50 transition-colors">
                      <Icon className="w-6 h-6 text-brand-teal-800" />
                    </div>
                    <span className="text-xs font-semibold text-brand-neutral-500 font-mono">
                      {domain.subtitle}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-brand-neutral-900 mb-3">
                    {domain.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-brand-neutral-600 leading-relaxed mb-6">
                    {domain.description}
                  </p>

                  <div className="space-y-2.5 mb-8">
                    {domain.bullets.map((b, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-brand-neutral-700">
                        <Check className="w-4 h-4 text-brand-teal-700 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-brand-surface-border">
                  <Link
                    href={domain.ctaLink}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-brand-teal-900 hover:text-brand-teal-700 transition-colors"
                  >
                    <span>{domain.ctaText}</span>
                    <ArrowLeft className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
