'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Globe } from 'lucide-react';
import type { CoachProfile } from '@/lib/coaches';
import {
  GrowthSlashes,
  RatingUnderline,
} from './SoleaDoodles';

const LinkedinIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

interface SoleaHeroProps {
  coach?: CoachProfile;
  onOpenMenu?: () => void;
  onOpenBooking?: (offeringTitle?: string) => void;
}

export const SoleaHero: React.FC<SoleaHeroProps> = ({ coach, onOpenMenu, onOpenBooking }) => {
  const slug = (coach?.slug || '').toLowerCase();
  const isAtynoCoach = Boolean(coach?.bookingUrl && coach.bookingUrl.includes('atyno.com'));
  const coachName = coach?.name || 'کوچ بلومیا';
  const rawTitle = coach?.title || 'کوچ حرفه‌ای بین‌المللی';
  const coachTitle = rawTitle.replace(/\s*\((?:ICF|Level)[^)]*\)/gi, '').trim();
  const bookingLink = coach?.bookingUrl || '#contact';

  // Smart concise bio strictly under 70-80 chars (2 lines max) to prevent hero vertical overflow
  const getHeroBio = () => {
    if (slug.includes('parmiss')) {
      return 'همراهی برای مکث، زیر سوال بردن باورهای کهنه و کشف پاسخ‌های درونی.';
    }
    if (slug.includes('mahya')) {
      return 'همراهی در مسیر خودشناسی عمیق، مرزگذاری شفاف و ساختن زندگی اصیل.';
    }
    if (slug.includes('arezoo') && slug.includes('ghaffari')) {
      return 'کوچینگ مبتنی بر ACT برای مهار نشخوار ذهنی، پذیرش و اقدام متعهدانه.';
    }
    if (slug.includes('saloomeh') || slug.includes('salomeh')) {
      return 'همراهی در گذار شغلی، توسعه فردی و تصمیم‌گیری شجاعانه در دوراهی‌ها.';
    }
    if (slug.includes('derakhsh')) {
      return 'تلفیق تفکر تحلیلی و کوچینگ برای استراتژی کارراهه و تاب‌آوری حرفه‌ای.';
    }
    if (slug.includes('nemati')) {
      return 'پایه‌ریزی عادات روزمره پایدار، مهار اهمال‌کاری و تقویت اعتمادبه‌نفس.';
    }
    if (slug.includes('johari')) {
      return 'همراهی برای مواجهه مهربانانه با احساسات، ترمیم عزت‌نفس و آرامش درون.';
    }
    if (slug.includes('esmi')) {
      return 'مهندسی زمان، مهار قطعی تعلل ذهنی و طراحی سیستم‌های پایدار بهره‌وری.';
    }
    if (slug.includes('fatemeh') && slug.includes('esmaeeli')) {
      return 'همراهی با مادران برای عبور از احساس گناه و ساختن تعادل پایدار زندگی.';
    }
    return coach?.shortBio || coach?.description || 'همراهی تخصصی در مسیر رشد، وضوح و ساختن تعادل پایدار زندگی.';
  };

  const coachBio = getHeroBio();

  // Determine coach specific hero portrait
  const getHeroImage = () => {
    if (slug.includes('parmiss')) return coach?.cutoutImageUrl || '/images/solea/parmiss_hero_v4.png';
    if (slug.includes('mahya')) return '/images/solea/mahya_hero_v4.png';
    if (slug.includes('fatemeh') && slug.includes('esmaeeli')) return '/images/solea/fatemeh_hero_v4.png';
    if (slug.includes('arezoo') && slug.includes('ghaffari')) return '/images/solea/arezoo_hero.png';
    if (slug.includes('esmi') || slug.includes('payam')) return '/images/solea/payam_hero_v4.png';
    if (slug.includes('derakhsh')) return '/images/solea/fatemeh_derakhsh_hero_v4.png';
    if (slug.includes('saloomeh') || slug.includes('salomeh')) return '/images/solea/saloomeh_hero_v4.png';
    return (
      coach?.cutoutImageUrl ||
      coach?.coverImage ||
      coach?.imageUrl ||
      '/images/solea/fatemeh_hero_v4.png'
    );
  };

  const heroImage = getHeroImage();

  // Dynamic tailor-made headline per coach (Strict 3 lines, max 10-12 chars per line, max 30 chars total)
  const getHeroHeadline = () => {
    if (slug.includes('parmiss')) {
      return {
        line1: 'قدرت پرسش',
        line2: 'برای وضوح و',
        line3: 'زیست اصیل',
      };
    }
    if (slug.includes('mahya')) {
      return {
        line1: 'صلح با خود',
        line2: 'و رهایی از',
        line3: 'قضاوت درون',
      };
    }
    if (slug.includes('arezoo') && slug.includes('ghaffari')) {
      return {
        line1: 'رهایی از فکر',
        line2: 'و بازگشت به',
        line3: 'زیست اصیل',
      };
    }
    if (slug.includes('saloomeh') || slug.includes('salomeh')) {
      return {
        line1: 'کشف رسالت',
        line2: 'و تصمیم‌های',
        line3: 'مقتدرانه',
      };
    }
    if (slug.includes('derakhsh')) {
      return {
        line1: 'تفکر تحلیلی',
        line2: 'برای رشد و',
        line3: 'رضایت شغلی',
      };
    }
    if (slug.includes('nemati')) {
      return {
        line1: 'وضوح ذهنی',
        line2: 'و خودباوری',
        line3: 'برای تغییر',
      };
    }
    if (slug.includes('johari')) {
      return {
        line1: 'آشتی با خود',
        line2: 'و زیستن با',
        line3: 'شفقت و معنا',
      };
    }
    if (slug.includes('esmi')) {
      return {
        line1: 'از مشغله زیاد',
        line2: 'تا تمرکز و',
        line3: 'اثرگذاری بالا',
      };
    }
    return {
      line1: 'رشد و تحول',
      line2: 'که طعم آرامش',
      line3: 'می‌دهد',
    };
  };

  const headline = getHeroHeadline();

  return (
    <section
      id="home"
      className="relative w-full min-h-screen lg:h-[100dvh] lg:max-h-[100dvh] overflow-x-hidden lg:overflow-hidden bg-[#1f3d3a] text-white flex flex-col justify-between select-none"
    >
      {/* Mobile Top Floating Navbar Pill (< lg, matching solea.framer.ai) */}
      <div className="w-full px-4 pt-4 pb-2 lg:hidden z-30">
        <div className="flex items-center justify-between bg-white rounded-2xl px-5 h-14 sm:h-16 shadow-md border border-[#e5e5e2]/20">
          <Link
            href="#home"
            className="flex items-center font-serif text-base sm:text-lg font-bold text-[#1f3d3a] leading-none select-none"
          >
            {coachName}
          </Link>
          <button
            type="button"
            onClick={onOpenMenu}
            className="flex flex-col items-center justify-center gap-1.5 h-10 w-10 text-[#1f3d3a] focus:outline-none cursor-pointer rounded-xl hover:bg-black/5 transition-colors"
            aria-label="باز کردن منو"
          >
            <span className="block h-[2px] w-6 bg-[#1f3d3a] rounded-full" />
            <span className="block h-[2px] w-6 bg-[#1f3d3a] rounded-full" />
            <span className="block h-[2px] w-4 ms-auto bg-[#1f3d3a] rounded-full" />
          </button>
        </div>
      </div>

      {/* Desktop Top Micro-bar (>= lg) */}
      <div className="hidden lg:flex w-full max-w-[1720px] mx-auto px-8 lg:px-14 xl:px-20 2xl:px-24 pt-4 lg:pt-5 pb-2 items-center justify-between z-30">
        <div>
          <span className="block text-[11px] font-sans tracking-wider text-white/70">
            ارتباط مستقیم
          </span>
          <button
            type="button"
            onClick={() => onOpenBooking ? onOpenBooking('رزرو آنلاین جلسه معارفه') : (window.location.href = bookingLink)}
            className="font-sans font-medium text-sm sm:text-base text-white hover:text-[#dfece9] transition-colors cursor-pointer text-start"
          >
            رزرو آنلاین جلسه معارفه
          </button>
        </div>

        {/* Two-Line Hamburger Button */}
        <button
          type="button"
          onClick={onOpenMenu}
          className="group flex flex-col items-end justify-center gap-[9px] p-2 focus:outline-none cursor-pointer"
          aria-label="باز کردن منو"
        >
          <span className="block h-[2px] w-11 bg-white transition-all duration-300 group-hover:w-8" />
          <span className="block h-[2px] w-11 bg-white transition-all duration-300" />
        </button>
      </div>

      {/* Main Viewport Content — Three-Column Symmetrical Layout (Solea Frame) */}
      <div className="relative w-full max-w-[1720px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-24 flex-1 flex flex-col justify-center z-20 pb-4 lg:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch w-full relative min-h-[440px] lg:min-h-[460px] xl:min-h-[500px]">
          
          {/* Start Column (Right in RTL): Rating, Title, Description, CTA */}
          <div className="flex flex-col justify-between items-start lg:col-span-5 xl:col-span-5 z-20 self-stretch pt-6 pb-2 lg:py-2">
            {/* Top Content: Rating + H1 + Bio */}
            <div className="flex flex-col items-start w-full">
              {/* Rating Stars with Underline Doodle */}
              <div className="relative mb-3 sm:mb-4 lg:mb-4">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-white/95">
                  <div className="flex text-[#f59e0b] gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-[#f59e0b] stroke-none"
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-white ms-1">
                    {coach?.rating
                      ? `${coach.rating.toFixed(1).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)])}★`
                      : '۵.۰★'}
                  </span>
                  <span className="text-white/80">رضایت مراجعان در بلومیا</span>
                </div>
                {/* Doodle Underline */}
                <div className="mt-1">
                  <RatingUnderline className="h-1.5 w-36 sm:w-40 text-[#fff7a2]" />
                </div>
              </div>

              {/* Main Headline (Strictly 3 lines, whitespace-nowrap, calibrated viewport font size) */}
              <div className="relative">
                <h1 className="font-serif text-[34px] sm:text-[42px] md:text-[48px] lg:text-[44px] xl:text-[54px] 2xl:text-[62px] font-normal leading-[1.22] sm:leading-[1.2] lg:leading-[1.18] text-white tracking-normal">
                  <span className="inline-flex items-center gap-2 whitespace-nowrap">
                    {headline.line1}
                    <GrowthSlashes className="w-6 h-5 sm:w-7 sm:h-6 lg:w-8 lg:h-7 text-[#fff7a2] shrink-0" />
                  </span>
                  <br />
                  <span className="whitespace-nowrap">{headline.line2}</span>
                  <br />
                  <span className="whitespace-nowrap">{headline.line3}</span>
                </h1>
              </div>

              {/* Description Subtitle (Strictly 2 lines maximum) */}
              <p className="mt-3.5 sm:mt-4 lg:mt-4 max-w-[380px] xl:max-w-[420px] text-[14px] sm:text-[15px] xl:text-base text-white/85 leading-[1.7] font-sans line-clamp-2">
                {coachBio}
              </p>
            </div>

            {/* Desktop CTA Button Container (Anchored to bottom line, matching social strip baseline) */}
            <div className="mt-auto pt-6 lg:pt-8 w-full flex items-end">
              <button
                type="button"
                onClick={() => onOpenBooking ? onOpenBooking('جلسه صفر (معارفه رایگان ۳۰ دقیقه‌ای)') : (window.location.href = bookingLink)}
                className="inline-flex items-center justify-center rounded-[14px] bg-[#dfece9] px-7 py-3 sm:py-3.5 text-sm sm:text-[15px] font-semibold text-[#1f3d3a] shadow-lg shadow-black/10 transition-all duration-200 hover:bg-white hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                رزرو جلسه معارفه رایگان
              </button>
            </div>

            {/* Mobile-Only Coach Intro & Social Links */}
            <div className="flex flex-col items-start mt-9 sm:mt-11 lg:hidden">
              <h3 className="font-serif text-[26px] sm:text-[30px] font-normal leading-[1.35] text-white">
                سلام، من {coachName} هستم
              </h3>
              <p className="mt-2 text-sm sm:text-base text-white/80 leading-[1.75] font-sans">
                {coachTitle}
              </p>

              {/* Mobile Social Links Row */}
              <div className="mt-6 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-white/80">
                    شبکه‌های ارتباطی
                  </span>
                  <div className="h-[1px] w-20 bg-white/20" />
                </div>
                <div className="flex items-center gap-2.5">
                  {coach?.instagramUrl && (
                    <a
                      href={coach.instagramUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition-all hover:bg-white hover:text-[#1f3d3a]"
                      aria-label={`اینستاگرام ${coachName}`}
                    >
                      <InstagramIcon />
                    </a>
                  )}
                  {coach?.linkedinUrl && (
                    <a
                      href={coach.linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition-all hover:bg-white hover:text-[#1f3d3a]"
                      aria-label={`لینکدین ${coachName}`}
                    >
                      <LinkedinIcon />
                    </a>
                  )}
                  <a
                    href="https://bloomiaclub.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition-all hover:bg-white hover:text-[#1f3d3a]"
                    aria-label="وبسایت بلومیا کلاب"
                  >
                    <Globe className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Spacer Column in Grid (Center area occupied by coach portrait) */}
          <div className="hidden lg:block lg:col-span-4 xl:col-span-4 pointer-events-none" />

          {/* End Column (Left in RTL): Name & Socials aligned to left boundary */}
          <div className="hidden lg:flex flex-col justify-between items-end lg:col-span-3 xl:col-span-3 z-20 self-stretch py-2 min-h-[480px] xl:min-h-[520px]">
            {/* Top: Name & Designation */}
            <div className="flex flex-col items-start w-full max-w-[300px] pt-2 xl:pt-4 text-right">
              <h3 className="font-serif text-[26px] lg:text-[28px] xl:text-[34px] 2xl:text-[38px] font-normal leading-[1.34] sm:leading-[1.3] text-white">
                سلام، من
                <br />
                {coachName} هستم
              </h3>
              <p className="mt-3.5 text-sm lg:text-[15px] xl:text-base text-white/80 leading-[1.75] font-sans max-w-[260px] xl:max-w-[300px]">
                {coachTitle}
              </p>
            </div>

            {/* Bottom: Follow Me & Social Icons (Aligned cleanly to outer edge) */}
            <div className="flex items-center gap-3.5 mt-auto pt-8">
              {/* Vertical Text Label */}
              <div className="flex items-center gap-2">
                <span
                  className="text-[11px] font-medium tracking-[0.2em] text-white/70 select-none"
                  style={{
                    writingMode: 'vertical-rl',
                    transform: 'rotate(180deg)',
                  }}
                >
                  شبکه‌های ارتباطی
                </span>
                <div className="h-9 w-[1px] bg-white/20" />
              </div>

              {/* Circular Social Buttons */}
              <div className="flex flex-col gap-2">
                {coach?.instagramUrl && (
                  <a
                    href={coach.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white transition-all duration-200 hover:bg-white hover:text-[#1f3d3a] hover:scale-105 shadow-sm"
                    aria-label={`اینستاگرام ${coachName}`}
                  >
                    <InstagramIcon />
                  </a>
                )}
                {coach?.linkedinUrl && (
                  <a
                    href={coach.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white transition-all duration-200 hover:bg-white hover:text-[#1f3d3a] hover:scale-105 shadow-sm"
                    aria-label={`لینکدین ${coachName}`}
                  >
                    <LinkedinIcon />
                  </a>
                )}
                <a
                  href="https://bloomiaclub.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white transition-all duration-200 hover:bg-white hover:text-[#1f3d3a] hover:scale-105 shadow-sm"
                  aria-label="وبسایت بلومیا کلاب"
                >
                  <Globe className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Center Image Component: Grounded at bottom, head reaching ~85vh */}
      <div className="pointer-events-none relative w-full flex items-end justify-center mt-6 sm:mt-8 lg:mt-0 lg:absolute lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2 z-10">
        <div className="relative h-[440px] sm:h-[500px] lg:h-[min(82vh,840px)] xl:h-[min(85vh,880px)] 2xl:h-[min(88vh,920px)] aspect-[750/835] w-auto max-w-none">
          {/* Portrait Photo */}
          <div className="relative w-full h-full z-10">
            <Image
              src={heroImage}
              alt={coachName}
              fill
              className="object-contain object-bottom transition-all duration-300"
              priority
              sizes="(max-width: 640px) 440px, (max-width: 1024px) 500px, (max-width: 1536px) 840px, 920px"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
