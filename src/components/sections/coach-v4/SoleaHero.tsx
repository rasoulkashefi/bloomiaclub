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
  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.75-1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

interface SoleaHeroProps {
  coach?: CoachProfile;
  onOpenMenu?: () => void;
}

export const SoleaHero: React.FC<SoleaHeroProps> = ({ coach, onOpenMenu }) => {
  const coachName = coach?.name || 'فاطمه اسماعیلی';
  const coachTitle = coach?.title || 'کوچ بین‌المللی مادران، بانوان و نوجوانان';
  const coachBio =
    coach?.shortBio ||
    'همراهی تخصصی با مادران و بانوان برای رهایی از فرسودگی، شنیدن صدای درون و ساختن زندگی متعادل و اصیل.';
  const bookingLink = coach?.bookingUrl || 'https://atyno.com/fatemeh/zero';

  // Use the tightly cropped, grounded portrait
  const heroImage =
    coach?.slug === 'fatemeh_esmaeeli' || !coach?.cutoutImageUrl
      ? '/images/solea/fatemeh_hero_v4.png'
      : coach.cutoutImageUrl;

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
      <div className="hidden lg:flex w-full max-w-[1720px] mx-auto px-8 lg:px-14 xl:px-20 2xl:px-24 pt-6 sm:pt-8 pb-3 items-center justify-between z-30">
        <div>
          <span className="block text-[11px] font-sans tracking-wider text-white/70">
            ارتباط مستقیم
          </span>
          <a
            href={bookingLink}
            target={coach?.bookingUrl ? '_blank' : undefined}
            rel="noreferrer"
            className="font-sans font-medium text-sm sm:text-base text-white hover:text-[#dfece9] transition-colors"
          >
            رزرو آنلاین جلسه معارفه
          </a>
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
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center w-full relative">
          
          {/* Start Column (Right in RTL): Rating, Title, Description, CTA */}
          <div className="flex flex-col items-start justify-center lg:col-span-5 xl:col-span-5 z-20 pt-6 pb-2 lg:py-0">
            {/* Rating Stars with Underline Doodle */}
            <div className="relative mb-5 sm:mb-6">
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
              <div className="mt-1.5">
                <RatingUnderline className="h-1.5 w-36 sm:w-40 text-[#fff7a2]" />
              </div>
            </div>

            {/* Main Headline */}
            <div className="relative">
              <h1 className="font-serif text-[40px] sm:text-[48px] md:text-[54px] lg:text-[58px] xl:text-[68px] 2xl:text-[76px] font-normal leading-[1.3] sm:leading-[1.26] lg:leading-[1.24] text-white tracking-normal">
                رشد و تحول
                <span className="inline-block relative -top-2 sm:-top-3 me-2">
                  <GrowthSlashes className="w-7 h-6 sm:w-8 sm:h-7 lg:w-9 lg:h-8 text-[#fff7a2]" />
                </span>
                <br />
                که طعم آرامش
                <br />
                می‌دهد
              </h1>
            </div>

            {/* Description Subtitle */}
            <p className="mt-5 sm:mt-6 max-w-[400px] xl:max-w-[440px] text-[15px] sm:text-base xl:text-[17px] text-white/85 leading-[1.8] font-sans">
              {coachBio}
            </p>

            {/* CTA Button */}
            <div className="mt-6 sm:mt-8">
              <a
                href={bookingLink}
                target={coach?.bookingUrl ? '_blank' : undefined}
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-[14px] bg-[#dfece9] px-8 py-4 text-sm sm:text-base font-semibold text-[#1f3d3a] shadow-lg shadow-black/10 transition-all duration-200 hover:bg-white hover:scale-[1.02] active:scale-[0.98]"
              >
                رزرو جلسه معارفه رایگان
              </a>
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
