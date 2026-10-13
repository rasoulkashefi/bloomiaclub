'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Award,
  Star,
  Clock,
  Users,
  Calendar,
  ChevronLeft,
  ChevronDown,
  ArrowLeft,
} from 'lucide-react';
import type { Coach } from '@/lib/coaches';

interface CoachProfileHeroSectionProps {
  coach: Coach;
}

export const CoachProfileHeroSection: React.FC<CoachProfileHeroSectionProps> = ({
  coach,
}) => {
  const avatarUrl = coach.imageUrl || '/images/default-coach-avatar.webp';
  const cutoutUrl = coach.cutoutImageUrl;
  const hours = coach.coachingHours
    ? `+${Number(coach.coachingHours).toLocaleString('fa-IR')}`
    : '+۰';
  const clients = coach.satisfiedClients
    ? `+${Number(coach.satisfiedClients).toLocaleString('fa-IR')}`
    : '۰';
  const sessions = coach.totalSessions
    ? `+${Number(coach.totalSessions).toLocaleString('fa-IR')}`
    : '۰';
  const ratingText = String(coach.rating).replace('.', '/');

  const hasEditorialLayout = !!cutoutUrl;

  // Extract first part of title for editorial typography split
  const titleWords = coach.title.split(' ');
  const titleFirstLine = titleWords.slice(0, 2).join(' ');
  const titleSecondLine = titleWords.slice(2).join(' ');

  return (
    <>
      {/* =====================================================================
          MOBILE HERO — Editorial 2-Fold Layout
          Fold 1: Scaled Arch + Name + Title + Short Bio + 2 CTAs
          Fold 2: 2x2 Stats Grid + Specialties Cards + Rating
         ===================================================================== */}
      <section className="lg:hidden relative pt-4 pb-8 bg-brand-surface-muted text-brand-neutral-900 overflow-hidden border-b border-brand-surface-border">
        <div className="max-w-md mx-auto px-4">
          {/* ── FOLD 1: Above The Fold ── */}
          <div className="flex flex-col items-center">
            {/* Unified Editorial Arch Container in #dbdbd5: Breadcrumb + Name + Bio + Portrait */}
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] rounded-b-[160px] sm:rounded-b-[180px] overflow-hidden bg-[#dbdbd5] mx-auto pt-4 px-4 pb-0 shadow-xs">
              {/* Breadcrumb — inside #dbdbd5 at the very top */}
              <nav aria-label="مسیر صفحه" className="mb-3">
                <ol className="flex items-center justify-center gap-1.5 text-[11px] text-brand-neutral-600">
                  <li>
                    <Link href="/" className="hover:text-brand-neutral-900 transition-colors">
                      صفحه اصلی
                    </Link>
                  </li>
                  <ChevronLeft className="w-3 h-3 text-brand-neutral-400" />
                  <li>
                    <Link href="/coaches" className="hover:text-brand-neutral-900 transition-colors">
                      کوچ‌ها
                    </Link>
                  </li>
                  <ChevronLeft className="w-3 h-3 text-brand-neutral-400" />
                  <li className="text-brand-neutral-900 font-semibold truncate" aria-current="page">
                    {coach.name}
                  </li>
                </ol>
              </nav>

              {/* Name, Title & Bio with matching #dbdbd5 background — above the portrait */}
              <div className="text-center mb-2">
                <h1 className="text-2xl sm:text-3xl font-black text-brand-neutral-900 tracking-tight">
                  {coach.name}
                </h1>
                <p className="text-xs sm:text-sm text-brand-teal-950 font-bold mt-1 mb-2">
                  {coach.title}
                </p>
                <p className="text-xs text-brand-neutral-700 leading-relaxed line-clamp-2 max-w-xs mx-auto px-1">
                  {coach.description}
                </p>
              </div>

              {/* Cutout Portrait — starts cleanly below text with zero overlap */}
              <div className="relative w-full h-[270px] sm:h-[300px] flex justify-center items-end">
                <Image
                  src={hasEditorialLayout ? cutoutUrl! : avatarUrl}
                  alt={coach.name}
                  fill
                  priority
                  sizes="(max-width: 640px) 340px, 380px"
                  className="object-cover"
                  style={{ objectPosition: 'center top' }}
                />
              </div>
            </div>

            {/* Both CTAs with refined, much narrower width */}
            <div className="flex flex-col items-center gap-2 w-full mt-4">
              <a
                href="#booking"
                className="inline-flex items-center justify-between pr-3.5 pl-1.5 py-1.5 rounded-full bg-brand-teal-950 text-white font-bold text-xs hover:bg-brand-teal-900 transition-all shadow-soft active:scale-[0.98] min-h-[44px] w-[215px]"
              >
                <span>رزرو جلسه معارفه رایگان</span>
                <span className="w-7 h-7 rounded-full bg-white text-brand-teal-950 flex items-center justify-center shrink-0 shadow-xs">
                  <ArrowLeft className="w-3.5 h-3.5" />
                </span>
              </a>
              <a
                href="#packages"
                className="inline-flex items-center justify-center px-4 py-2 rounded-full border border-brand-surface-border bg-white text-brand-neutral-700 font-bold text-xs hover:border-brand-teal-950 hover:text-brand-teal-950 transition-colors min-h-[40px] w-[215px]"
              >
                <span>مشاهده بسته‌ها و قیمت‌ها</span>
              </a>
            </div>

            {/* Hint to Scroll */}
            <div className="pt-4 pb-1 flex flex-col items-center text-brand-neutral-400">
              <span className="text-[10px] font-medium mb-1">آمار و حیطه‌های تخصصی</span>
              <ChevronDown className="w-3.5 h-3.5 animate-bounce text-brand-neutral-400" />
            </div>
          </div>

          {/* ── FOLD 2: Below The Fold (Stats & Specialties) ── */}
          <div className="mt-4 pt-5 border-t border-brand-surface-border">
            {/* 2x2 Stats Grid — Framer Day 68 Mobile inspired */}
            <div className="grid grid-cols-2 gap-2.5 mb-5">
              <div className="p-3.5 rounded-2xl bg-white border border-brand-surface-border text-right shadow-2xs">
                <div className="text-2xl font-black text-brand-neutral-900 tabular-nums leading-none">
                  {hours}
                </div>
                <div className="text-[11px] text-brand-neutral-500 mt-1.5 font-normal">
                  ساعت تجربه کوچینگ
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-brand-surface-border text-right shadow-2xs">
                <div className="text-2xl font-black text-brand-neutral-900 tabular-nums leading-none">
                  {sessions}
                </div>
                <div className="text-[11px] text-brand-neutral-500 mt-1.5 font-normal">
                  جلسه برگزار شده
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-brand-surface-border text-right shadow-2xs">
                <div className="text-2xl font-black text-brand-neutral-900 leading-none">
                  *۱۰۰٪
                </div>
                <div className="text-[11px] text-brand-neutral-500 mt-1.5 font-normal">
                  نرخ رضایت مراجعین
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-brand-surface-border text-right shadow-2xs">
                <div className="text-2xl font-black text-brand-neutral-900 tabular-nums leading-none">
                  {clients}
                </div>
                <div className="text-[11px] text-brand-neutral-500 mt-1.5 font-normal">
                  مراجع راضی و همراه
                </div>
              </div>
            </div>

            {/* Coaching Specialties */}
            {coach.specialties && coach.specialties.length > 0 && (
              <div className="space-y-2 mb-5">
                <h3 className="text-xs font-black text-brand-neutral-900 uppercase tracking-wide px-1">
                  حیطه‌های تخصصی کوچینگ
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {coach.specialties.slice(0, 4).map((tag, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white border border-brand-surface-border text-right shadow-2xs"
                    >
                      <div className="text-xs font-bold text-brand-neutral-900 mb-1">
                        {tag}
                      </div>
                      <div className="text-[10px] text-brand-neutral-500 leading-relaxed">
                        {idx === 0 && 'شناخت عمیق استعدادها و ارزش‌های درونی'}
                        {idx === 1 && 'شفافیت ذهنی و تصمیم‌گیری هدفمند'}
                        {idx === 2 && 'فرایند تحول بر پایه اصول علمی ICF'}
                        {idx === 3 && 'کشف رسالت فردی و زندگی هماهنگ'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Rating & Reviews */}
            <div className="p-3 rounded-xl bg-white border border-brand-surface-border flex items-center justify-between shadow-2xs">
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-0.5 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                  ))}
                </div>
                <span className="text-xs font-bold text-brand-neutral-900">{coach.rating}</span>
              </div>
              <span className="text-[11px] text-brand-neutral-500">
                ({Number(coach.totalReviews).toLocaleString('fa-IR')} نظر ثبت‌شده مراجعین)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          DESKTOP HERO — Editorial 3-column layout inspired by Solt portfolio
          RTL: Content RIGHT | Portrait CENTER | Stats LEFT
         ===================================================================== */}
      <section className="hidden lg:block relative overflow-hidden bg-brand-surface-muted border-b border-brand-surface-border">
        <div className="max-w-[1400px] mx-auto px-8 xl:px-12 relative">
          {/* Breadcrumb — absolute overlay at top so it doesn't push the hero down */}
          <nav aria-label="مسیر صفحه" className="absolute top-5 right-8 xl:right-12 z-30">
            <ol className="flex items-center gap-2 text-xs xl:text-sm text-brand-neutral-400">
              <li>
                <Link href="/" className="hover:text-brand-neutral-900 transition-colors">
                  صفحه اصلی
                </Link>
              </li>
              <ChevronLeft className="w-3.5 h-3.5" />
              <li>
                <Link href="/coaches" className="hover:text-brand-neutral-900 transition-colors">
                  کوچ‌ها
                </Link>
              </li>
              <ChevronLeft className="w-3.5 h-3.5" />
              <li className="text-brand-neutral-900 font-semibold" aria-current="page">
                {coach.name}
              </li>
            </ol>
          </nav>

          {/* Main editorial hero area — wide, balanced, with comfortable vertical rhythm */}
          <div className="relative min-h-[640px] xl:min-h-[700px] mb-12 xl:mb-16">

            {/* ── CENTER ARCH & PORTRAIT (Wider 560px-630px, Height 640px-700px) ── */}
            <div className="mx-auto w-[560px] xl:w-[630px] h-[640px] xl:h-[700px] rounded-b-[600px] overflow-hidden bg-[#dbdbd5] relative z-10 flex justify-center">
              <Image
                src={hasEditorialLayout ? cutoutUrl! : avatarUrl}
                alt={coach.name}
                fill
                priority
                sizes="(max-width: 1280px) 560px, 630px"
                className="object-cover"
                style={{ objectPosition: 'center 8%' }}
              />
            </div>

            {/* ── RIGHT COLUMN (RTL): Typography & CTA — relaxed line spacing ── */}
            <div className="absolute right-0 top-[24%] xl:top-[26%] z-20 max-w-[400px] xl:max-w-[450px] text-right">
              {/* Kicker */}
              <p className="text-xs xl:text-sm text-brand-neutral-500 font-medium mb-3.5 italic">
                کوچ حرفه‌ای بلومیا کلاب
              </p>

              {/* Name — massive editorial typography with relaxed leading */}
              <h1 className="mb-3.5">
                <span className="block text-[3.2rem] xl:text-[4rem] font-black text-brand-neutral-900 leading-[1.12] tracking-tight">
                  {coach.name}
                </span>
              </h1>

              {/* Title split — mixed weight with open leading */}
              <div className="mb-6">
                <span className="block text-xl xl:text-[26px] font-black text-brand-teal-950 leading-normal">
                  {titleFirstLine}
                </span>
                {titleSecondLine && (
                  <span className="block text-base xl:text-lg text-brand-neutral-500 font-medium mt-1.5 leading-normal">
                    {titleSecondLine}
                  </span>
                )}
              </div>

              {/* Description — comfortable line height and relaxed width */}
              <p className="text-xs xl:text-sm text-brand-neutral-600 leading-[1.8] mb-10 xl:mb-12 max-w-sm xl:max-w-md mr-0 ml-auto">
                {coach.description}
              </p>

              {/* CTA Buttons — Solt reference style: pill button with circular white arrow icon */}
              <div className="flex items-center justify-end gap-3 pt-1 xl:pt-2">
                <a
                  href="#booking"
                  className="inline-flex items-center gap-2.5 pr-5 pl-1.5 py-1.5 rounded-full bg-brand-teal-950 text-white font-bold text-xs xl:text-sm hover:bg-brand-teal-900 transition-all shadow-soft hover:shadow-elevated active:scale-[0.98] min-h-[46px]"
                >
                  <span>رزرو جلسه معارفه رایگان</span>
                  <span className="w-8 h-8 rounded-full bg-white text-brand-teal-950 flex items-center justify-center shrink-0 shadow-xs">
                    <ArrowLeft className="w-4 h-4" />
                  </span>
                </a>
                <a
                  href="#packages"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-brand-surface-border bg-white/70 backdrop-blur-xs text-brand-neutral-700 font-bold text-xs xl:text-sm hover:border-brand-teal-950 hover:text-brand-teal-950 transition-colors min-h-[46px]"
                >
                  <span>مشاهده بسته‌ها</span>
                </a>
              </div>
            </div>

            {/* ── LEFT COLUMN (RTL): Stats Stack — generous vertical spacing ── */}
            <div className="absolute left-0 top-[26%] xl:top-[28%] z-20 w-[210px] flex flex-col gap-8 xl:gap-10 text-left">
              {/* Stat 1: Coaching Hours */}
              <div className="text-left">
                <div className="text-[34px] xl:text-[40px] font-black text-brand-neutral-900 tabular-nums leading-none tracking-tight">
                  {hours}
                </div>
                <div className="text-xs xl:text-sm text-brand-neutral-500 mt-1.5 font-normal leading-normal">
                  ساعت تجربه کوچینگ
                </div>
              </div>

              {/* Stat 2: Sessions */}
              <div className="text-left">
                <div className="text-[34px] xl:text-[40px] font-black text-brand-neutral-900 tabular-nums leading-none tracking-tight">
                  {sessions}
                </div>
                <div className="text-xs xl:text-sm text-brand-neutral-500 mt-1.5 font-normal leading-normal">
                  جلسه کوچینگ برگزار شده
                </div>
              </div>

              {/* Stat 3: Satisfaction Rate */}
              <div className="text-left">
                <div className="text-[34px] xl:text-[40px] font-black text-brand-neutral-900 leading-none tracking-tight">
                  *۱۰۰٪
                </div>
                <div className="text-xs xl:text-sm text-brand-neutral-500 mt-1.5 font-normal leading-normal">
                  نرخ رضایت مراجعین
                </div>
              </div>

              {/* Stat 4: Clients */}
              <div className="text-left">
                <div className="text-[34px] xl:text-[40px] font-black text-brand-neutral-900 tabular-nums leading-none tracking-tight">
                  {clients}
                </div>
                <div className="text-xs xl:text-sm text-brand-neutral-500 mt-1.5 font-normal leading-normal">
                  مراجع راضی و همراه
                </div>
              </div>
            </div>
          </div>

          {/* ── BOTTOM BAR: Specialties ── */}
          {coach.specialties && coach.specialties.length > 0 && (
            <div className="border-t border-brand-surface-border py-6 xl:py-7 pb-10 xl:pb-12">
              <div className="grid grid-cols-4 gap-0 divide-x divide-brand-surface-border" style={{ direction: 'ltr' }}>
                {coach.specialties.slice(0, 4).map((tag, idx) => (
                  <div key={idx} className="px-6 text-right" style={{ direction: 'rtl' }}>
                    <h3 className="text-xs xl:text-sm font-black text-brand-neutral-900 uppercase tracking-wide mb-1">
                      {tag}
                    </h3>
                    <p className="text-[11px] xl:text-xs text-brand-neutral-500 leading-relaxed">
                      {idx === 0 && 'همراهی تخصصی و عمیق برای شناخت استعدادها و ارزش‌های درونی شما.'}
                      {idx === 1 && 'ایجاد شفافیت ذهنی برای تصمیم‌گیری مقتدرانه و هدفمند.'}
                      {idx === 2 && 'فرایند گام‌به‌گام تحول بر پایه اصول علمی کوچینگ بین‌المللی.'}
                      {idx === 3 && 'کشف رسالت فردی و زندگی هماهنگ با باورهای اصیل شما.'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};
