'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, ShieldCheck, Users } from 'lucide-react';

interface HeroCta {
  text: string;
  href: string;
}

interface HeroStat {
  label: string;
  value: string;
}

export interface HeroSectionProps {
  badge?: string;
  title?: React.ReactNode;
  description?: string;
  primaryCta?: HeroCta;
  secondaryCta?: HeroCta;
  features?: string[];
  stats?: HeroStat[];
  imageSrc?: string;
  imageAlt?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const HeroSection: React.FC<HeroSectionProps> = ({
  badge = 'مرجع تخصصی کوچینگ توسعه فردی و شغلی',
  title = (
    <>
      مسیر تحول فردی و رشد پایدار با{' '}
      <span className="text-[#1f3d3a] underline decoration-[#dfece9] decoration-wavy decoration-2 underline-offset-8">
        کوچ‌های حرفه‌ای بلومیا
      </span>
    </>
  ),
  description = 'بلومیا کلاب بستری امن، علمی و معتبر برای مادران، مدیران و جویندگان رشد است تا با همراهی کوچ‌های تأییدشده ICF، به وضوح ذهنی و تعادل اصیل در کار و زندگی دست یابند.',
  primaryCta = { text: 'رزرو جلسه معارفه رایگان', href: '/booking' },
  secondaryCta = { text: 'مشاهده لیست کوچ‌ها', href: '/coaches' },
  features = [
    'کوچ‌های دارای مدارک معتبر ICF',
    'جلسات کاملاً اختصاصی و محرمانه',
    'تضمین تطابق با نیاز و هدف شما',
  ],
  stats = [
    { value: '+۲۵', label: 'کوچ معتبر' },
    { value: '+۱,۲۰۰', label: 'جلسه موفق' },
    { value: '۹۸٪', label: 'رضایت مراجعان' },
  ],
  imageSrc = '/images/hero-coaching.webp',
  imageAlt = 'جلسه همراهی و کوچینگ بلومیا کلاب',
}) => {
  return (
    <section className="relative w-full overflow-hidden bg-[#fafaf8] py-12 md:py-20 lg:py-24">
      {/* المان ملایم پس‌زمینه برای عمق ارگانیک */}
      <div
        className="pointer-events-none absolute -top-40 right-1/2 h-96 w-96 translate-x-1/2 rounded-full bg-[#dfece9]/40 blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8"
        >
          {/* ستون متن و اکشن‌ها (Mobile-first: اول در موبایل) */}
          <div className="flex flex-col items-start lg:col-span-7">
            {/* برچسب بالا (Eyebrow Badge) */}
            {badge && (
              <motion.div
                variants={itemVariants}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#1f3d3a]/15 bg-[#dfece9]/50 px-3.5 py-1.5 text-xs font-semibold text-[#1f3d3a]"
              >
                <ShieldCheck className="h-4 w-4 text-[#1f3d3a]" />
                <span>{badge}</span>
              </motion.div>
            )}

            {/* تیتر اصلی (H1 برای سئو) */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl font-extrabold leading-[1.25] tracking-tight text-[#1e1e1e] sm:text-4xl lg:text-5xl"
            >
              {title}
            </motion.h1>

            {/* متن توضیحی */}
            <motion.p
              variants={itemVariants}
              className="mt-6 text-base leading-relaxed text-[#6b6b6b] sm:text-lg max-w-2xl"
            >
              {description}
            </motion.p>

            {/* دکمه‌های اکشن */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex w-full flex-col gap-3.5 sm:w-auto sm:flex-row sm:items-center"
            >
              {primaryCta && (
                <Link
                  href={primaryCta.href}
                  className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#1f3d3a] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_4px_14px_0_rgba(31,61,58,0.28)] transition-all duration-200 hover:bg-[#2b544e] hover:shadow-[0_6px_20px_rgba(31,61,58,0.38)] active:scale-[0.98]"
                >
                  <span>{primaryCta.text}</span>
                  <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
                </Link>
              )}

              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-[#e5e5e2] bg-white px-7 py-3.5 text-sm font-semibold text-[#1e1e1e] transition-all duration-200 hover:border-[#1f3d3a]/30 hover:bg-[#fafaf8] active:scale-[0.98]"
                >
                  {secondaryCta.text}
                </Link>
              )}
            </motion.div>

            {/* چک‌لیست ویژگی‌های کلیدی */}
            {features && features.length > 0 && (
              <motion.ul
                variants={itemVariants}
                className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-6 border-t border-[#e5e5e2] pt-6"
              >
                {features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs font-medium text-[#1e1e1e]">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#1f3d3a]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </motion.ul>
            )}
          </div>

          {/* ستون کارت بصری و آمار (در موبایل زیر متن، در دسکتاپ سمت چپ در چیدمان فارسی) */}
          <motion.div
            variants={itemVariants}
            className="relative flex justify-center lg:col-span-5"
          >
            <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-black/[0.06] bg-white p-3 shadow-[0_12px_40px_rgb(0,0,0,0.06)]">
              {/* کانتینر تصویر با اسکلت تمیز */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#dfece9]/30">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 450px"
                  priority
                />
              </div>

              {/* باکس آمار شناور پایین تصویر */}
              {stats && stats.length > 0 && (
                <div className="mt-4 grid grid-cols-3 divide-x divide-x-reverse divide-[#e5e5e2] rounded-2xl bg-[#fafaf8] p-4 text-center">
                  {stats.map((stat, idx) => (
                    <div key={idx} className="flex flex-col px-2">
                      <span className="text-lg font-bold text-[#1f3d3a] sm:text-xl">
                        {stat.value}
                      </span>
                      <span className="mt-0.5 text-xs text-[#6b6b6b]">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
