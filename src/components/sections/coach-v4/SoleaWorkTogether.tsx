'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Flower2, Compass, Crown, HeartHandshake, ShieldCheck, Clock } from 'lucide-react';
import type { CoachProfile } from '@/lib/coaches';

interface ServiceItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  ctaText: string;
}

interface SoleaWorkTogetherProps {
  coach?: CoachProfile;
  onOpenBooking?: (offeringTitle?: string) => void;
}

export const SoleaWorkTogether: React.FC<SoleaWorkTogetherProps> = ({ coach, onOpenBooking }) => {
  const slug = (coach?.slug || '').toLowerCase();
  const isAtynoCoach = Boolean(coach?.bookingUrl && coach.bookingUrl.includes('atyno.com'));
  const bookingLink = coach?.bookingUrl || '#contact';

  const getServices = (): ServiceItem[] => {
    if (slug.includes('mahya')) {
      return [
        {
          icon: <HeartHandshake className="h-10 w-10 text-[#1f3d3a]" strokeWidth={1.5} />,
          title: 'صلح با منتقد درون و رهایی از سرزنش',
          description: 'شناسایی صداهای سرزنشگر ناخودآگاه، عبور از کمال‌گرایی فرساینده و تبدیل قاضی درون به یک حامی آگاه و مشفق.',
          ctaText: 'رزرو جلسه معارفه',
        },
        {
          icon: <ShieldCheck className="h-10 w-10 text-[#1f3d3a]" strokeWidth={1.5} />,
          title: 'هنر مرزگذاری سالم و مهارت قاطعیت',
          description: 'یادگیری تکنیک‌های شفاف نه گفتن بدون احساس گناه، رهایی از باج‌دهی عاطفی و ساختن روابط محترمانه و اصیل.',
          ctaText: 'رزرو جلسه معارفه',
        },
        {
          icon: <Compass className="h-10 w-10 text-[#1f3d3a]" strokeWidth={1.5} />,
          title: 'شکستن باورهای محدودکننده و رشد فردی',
          description: 'شناسایی دیوارهای نامرئی ذهن، بازنویسی باورهای بازدارنده و بازیابی عزت‌نفس برای تصمیم‌گیری‌های مقتدرانه.',
          ctaText: 'رزرو جلسه معارفه',
        },
      ];
    }

    if (slug.includes('arezoo') && slug.includes('ghaffari')) {
      return [
        {
          icon: <Compass className="h-10 w-10 text-[#1f3d3a]" strokeWidth={1.5} />,
          title: 'مهار نشخوار ذهنی و فاصله‌گیری از افکار',
          description: 'یادگیری تکنیک‌های علمی گسلش شناختی (Defusion) در رویکرد ACT برای رهایی از گیر افتادن در تله گفتگوهای فرساینده ذهن.',
          ctaText: 'رزرو جلسه معارفه',
        },
        {
          icon: <ShieldCheck className="h-10 w-10 text-[#1f3d3a]" strokeWidth={1.5} />,
          title: 'مدیریت علمی اضطراب و پذیرش درونی',
          description: 'پایان دادن به جنگ درونی با اضطراب و احساسات ناخوشایند، و ساختن تاب‌آوری روانی برای عبور از موقعیت‌های پرتنش.',
          ctaText: 'رزرو جلسه معارفه',
        },
        {
          icon: <HeartHandshake className="h-10 w-10 text-[#1f3d3a]" strokeWidth={1.5} />,
          title: 'اقدام متعهدانه همسو با ارزش‌های اصیل',
          description: 'شفاف‌سازی قطب‌نمای ارزش‌ها در روابط و کار، و تبدیل اهداف قلبی به رفتارهای شجاعانه روزمره در حضور ترس‌ها.',
          ctaText: 'رزرو جلسه معارفه',
        },
      ];
    }

    if (slug.includes('saloomeh') || slug.includes('salomeh')) {
      return [
        {
          icon: <Compass className="h-10 w-10 text-[#1f3d3a]" strokeWidth={1.5} />,
          title: 'وضوح شغلی و عبور از دوراهی‌های حرفه‌ای',
          description: 'شفاف‌سازی استعدادها و انتخاب شجاعانه جهت حرکت در محیط کار، ارتقای موقعیت یا راه‌اندازی کسب‌وکار فردی.',
          ctaText: 'رزرو جلسه معارفه',
        },
        {
          icon: <Crown className="h-10 w-10 text-[#1f3d3a]" strokeWidth={1.5} />,
          title: 'خودشناسی عمیق و بازیابی اقتدار شخصی',
          description: 'خروج از سردرگمی میانسالی یا احساس فرسودگی، و بازآفرینی هویت اصیل بر مبنای ارزش‌های راستین فردی.',
          ctaText: 'رزرو جلسه معارفه',
        },
        {
          icon: <ShieldCheck className="h-10 w-10 text-[#1f3d3a]" strokeWidth={1.5} />,
          title: 'توسعه مهارت تصمیم‌گیری و استراتژی اقدام',
          description: 'تبدیل چشم‌انداز مبهم ذهنی به نقشه راه گام‌به‌گام و شدنی در کار و زندگی متناسب با واقعیت روزمره.',
          ctaText: 'رزرو جلسه معارفه',
        },
      ];
    }

    if (slug.includes('derakhsh')) {
      return [
        {
          icon: <Compass className="h-10 w-10 text-[#1f3d3a]" strokeWidth={1.5} />,
          title: 'استراتژی کارراهه شغلی برای متخصصان',
          description: 'تلفیق تفکر تحلیلی علمی و کوچینگ برای یافتن بهترین جایگاه شغلی متناسب با تحصیلات و پتانسیل‌های واقعی.',
          ctaText: 'رزرو جلسه معارفه',
        },
        {
          icon: <HeartHandshake className="h-10 w-10 text-[#1f3d3a]" strokeWidth={1.5} />,
          title: 'گذار شغلی و عبور از فرسودگی حرفه‌ای',
          description: 'هدایت هوشمندانه متخصصان در تغییر مسیر شغلی، ارتقای جایگاه سازمانی و مدیریت استرس در محیط کار.',
          ctaText: 'رزرو جلسه معارفه',
        },
        {
          icon: <ShieldCheck className="h-10 w-10 text-[#1f3d3a]" strokeWidth={1.5} />,
          title: 'توسعه فردی و مهارت‌های ارتباط سازمانی',
          description: 'ارتقای هوش هیجانی، تقویت مذاکره، افزایش خودباوری در مصاحبه‌ها و مدیریت روابط در سطوح مدیریتی.',
          ctaText: 'رزرو جلسه معارفه',
        },
      ];
    }

    if (slug.includes('nemati')) {
      return [
        {
          icon: <Clock className="h-10 w-10 text-[#1f3d3a]" strokeWidth={1.5} />,
          title: 'پایه‌ریزی عادات مثبت و مهار اهمال‌کاری',
          description: 'ساختن روتین‌های روزمره عملی، عبور از تنبلی ناشی از کمال‌گرایی منفی و ایجاد انگیزه و نظم پایدار.',
          ctaText: 'رزرو جلسه معارفه',
        },
        {
          icon: <Crown className="h-10 w-10 text-[#1f3d3a]" strokeWidth={1.5} />,
          title: 'تقویت اعتمادبه‌نفس و خودباوری اصیل',
          description: 'شناسایی و شکستن موانع درونی، افزایش حس شایستگی فردی و حضور مقتدرانه در موقعیت‌های اجتماعی.',
          ctaText: 'رزرو جلسه معارفه',
        },
        {
          icon: <Compass className="h-10 w-10 text-[#1f3d3a]" strokeWidth={1.5} />,
          title: 'طراحی سند اهداف شخصی و اولویت‌بندی',
          description: 'تفکیک کارهای ضروری از حواس‌پرتی‌ها، رهایی از مقایسه خود با دیگران و دستیابی به خروجی‌های ملموس.',
          ctaText: 'رزرو جلسه معارفه',
        },
      ];
    }

    if (slug.includes('johari')) {
      return [
        {
          icon: <HeartHandshake className="h-10 w-10 text-[#1f3d3a]" strokeWidth={1.5} />,
          title: 'پرورش شفقت به خود در روزهای دشوار',
          description: 'رهایی از قضاوت‌های بیرحمانه ذهن، مراقبت مهربانانه از احساسات و رفتار با خود مانند یک دوست مشفق.',
          ctaText: 'رزرو جلسه معارفه',
        },
        {
          icon: <Flower2 className="h-10 w-10 text-[#1f3d3a]" strokeWidth={1.5} />,
          title: 'تعادل احساسی و مدیریت بارهای عاطفی',
          description: 'یادگیری مواجهه سالم با غم، خشم، ترس و ناامیدی بدون سرکوب و ایجاد تاب‌آوری در برابر تنش‌ها.',
          ctaText: 'رزرو جلسه معارفه',
        },
        {
          icon: <ShieldCheck className="h-10 w-10 text-[#1f3d3a]" strokeWidth={1.5} />,
          title: 'خودشناسی اصیل و ترمیم عزت‌نفس',
          description: 'کشف ارزش‌های اصیل فردی، افزایش پذیرش خود و ساختن ارتباطی عمیق، امن و محترمانه با دیگران.',
          ctaText: 'رزرو جلسه معارفه',
        },
      ];
    }

    if (slug.includes('esmi')) {
      return [
        {
          icon: <Clock className="h-10 w-10 text-[#1f3d3a]" strokeWidth={1.5} />,
          title: 'مهندسی زمان و مدیریت انرژی روزانه',
          description: 'طراحی سیستم‌های مدیریت وظایف، اولویت‌بندی با متدهای MBA و ایجاد وقت آزاد واقعی برای زندگی شخصی.',
          ctaText: 'رزرو جلسه معارفه',
        },
        {
          icon: <ShieldCheck className="h-10 w-10 text-[#1f3d3a]" strokeWidth={1.5} />,
          title: 'مهار قطعی اهمال‌کاری و تعلل ذهنی',
          description: 'ریشه‌یابی ترس از شروع یا کمال‌گرایی منفی و ساختن چارچوب‌های اقدام خرد و پیوسته در پروژه‌ها.',
          ctaText: 'رزرو جلسه معارفه',
        },
        {
          icon: <Compass className="h-10 w-10 text-[#1f3d3a]" strokeWidth={1.5} />,
          title: 'تنظیم اهداف SMART و سیستم بازخورد',
          description: 'تعریف اهداف شفاف فصلی، طراحی شاخص‌های پایش پیشرفت و ایجاد تعادل کار و استراحت بدون فرسودگی.',
          ctaText: 'رزرو جلسه معارفه',
        },
      ];
    }

    // Default: Fatemeh Esmaeeli
    return [
      {
        icon: <Flower2 className="h-10 w-10 text-[#1f3d3a]" strokeWidth={1.5} />,
        title: 'والدگری آگاهانه و آرامش مادری',
        description: 'رهایی از کمال‌گرایی و احساس گناه، شناخت نیازهای واقعی خود و ساختن ارتباطی امن و بالنده با فرزندان.',
        ctaText: 'رزرو جلسه معارفه',
      },
      {
        icon: <Compass className="h-10 w-10 text-[#1f3d3a]" strokeWidth={1.5} />,
        title: 'خودشناسی و آرامش درونی',
        description: 'شنیدن صدای واقعی درون، تعیین مرزهای سالم در روابط و کار، و بازیابی اعتمادبه‌نفس و سرزندگی.',
        ctaText: 'رزرو جلسه معارفه',
      },
      {
        icon: <Crown className="h-10 w-10 text-[#1f3d3a]" strokeWidth={1.5} />,
        title: 'کوچینگ نوجوان و مهارت ارتباطی',
        description: 'مهار تعارض‌های والد و فرزندی، درک زبان و احساسات نوجوان، و برقراری گفتگوی بدون قضاوت و تنش.',
        ctaText: 'رزرو جلسه معارفه',
      },
    ];
  };

  const services = getServices();

  return (
    <section id="services" className="w-full bg-white py-20 lg:py-[120px] text-[#1e1e1e] overflow-hidden">
      <div className="mx-auto max-w-[1360px] px-6 sm:px-10 lg:px-[30px]">
        
        {/* Centered Heading with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <h2 className="font-serif text-3xl font-normal leading-[1.38] sm:leading-[1.35] lg:leading-[1.32] text-[#1e1e1e] sm:text-4xl lg:text-5xl">
            چگونه در کنار هم
            <br />
            مسیر را می‌سازیم
          </h2>
        </motion.div>

        {/* 3 Service Cards with Staggered Entrance */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {services.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.65,
                delay: idx * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
              className="group flex flex-col items-center rounded-[2rem] bg-[#f2f7f6] p-8 text-center shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)] sm:p-10"
            >
              {/* Service Icon Container */}
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/80 shadow-sm transition-transform duration-300 group-hover:scale-110">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="font-serif text-2xl font-normal leading-[1.38] text-[#1e1e1e] sm:text-[26px]">
                {item.title}
              </h3>

              {/* Description */}
              <p className="mt-4 flex-1 text-sm leading-[1.8] text-[#6b6b6b] sm:text-base">
                {item.description}
              </p>

              {/* Action Button */}
              <div className="mt-8 sm:mt-10">
                {isAtynoCoach ? (
                  <a
                    href={bookingLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-[#1f3d3a] px-7 py-3 text-xs font-semibold tracking-wider text-white shadow-sm transition-all duration-200 hover:bg-[#2b544e] hover:shadow-md"
                  >
                    {item.ctaText}
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => onOpenBooking?.(item.title)}
                    className="inline-flex items-center justify-center rounded-full bg-[#1f3d3a] px-7 py-3 text-xs font-semibold tracking-wider text-white shadow-sm transition-all duration-200 hover:bg-[#2b544e] hover:shadow-md cursor-pointer"
                  >
                    {item.ctaText}
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
