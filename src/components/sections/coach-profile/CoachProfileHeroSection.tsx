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
          MOBILE HERO — 100% UNTOUCHED
         ===================================================================== */}
      <section className="lg:hidden relative pt-8 pb-12 bg-brand-teal-950 text-white overflow-hidden border-b border-brand-teal-900">
        <div
          className="pointer-events-none absolute -bottom-24 right-1/4 w-96 h-96 bg-brand-teal-800/25 rounded-full blur-3xl -z-10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute top-0 -left-20 w-80 h-80 bg-brand-teal-900/35 rounded-full blur-3xl -z-10"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav aria-label="مسیر صفحه" className="mb-6 sm:mb-8">
            <ol className="flex items-center gap-2 text-xs sm:text-sm text-brand-teal-200/80">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  صفحه اصلی
                </Link>
              </li>
              <ChevronLeft className="w-3.5 h-3.5 opacity-60" />
              <li>
                <Link href="/coaches" className="hover:text-white transition-colors">
                  کوچ‌ها
                </Link>
              </li>
              <ChevronLeft className="w-3.5 h-3.5 opacity-60" />
              <li className="text-white font-semibold truncate" aria-current="page">
                {coach.name}
              </li>
            </ol>
          </nav>

          <div className="flex flex-col items-center">
            <div className="relative shrink-0 text-center">
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-3xl overflow-hidden border-4 border-brand-teal-800/80 shadow-elevated ring-2 ring-brand-teal-700/50 bg-brand-teal-900">
                <Image
                  src={avatarUrl}
                  alt={coach.name}
                  fill
                  priority
                  sizes="(max-width: 640px) 144px, 176px"
                  className="object-cover"
                />
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-teal-900/90 border border-brand-teal-700/80 text-brand-teal-200 text-xs font-semibold mt-3 shadow-xs">
                <Award className="w-3.5 h-3.5 text-brand-teal-300" />
                <span>کوچ تایید شده ICF</span>
              </div>
            </div>

            <div className="text-center space-y-4 mt-6">
              <div className="space-y-1.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {coach.name}
                </h1>
                <p className="text-sm sm:text-base text-brand-teal-200 font-medium">
                  {coach.title}
                </p>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs sm:text-sm">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="font-bold text-white">{coach.rating}</span>
                <span className="text-brand-teal-200/70">
                  ({Number(coach.totalReviews).toLocaleString('fa-IR')} نظر مراجعین)
                </span>
              </div>

              {coach.specialties && coach.specialties.length > 0 && (
                <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                  {coach.specialties.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-brand-teal-900/80 border border-brand-teal-700/60 text-brand-teal-100 text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <p className="text-xs sm:text-sm text-brand-teal-100/85 leading-relaxed max-w-2xl">
                {coach.description}
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-brand-teal-100/90">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-teal-300" />
                  <span>
                    <strong>{hours}</strong> ساعت تجربه کوچینگ
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-brand-teal-300" />
                  <span>
                    <strong>{clients}</strong> مراجع راضی
                  </span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="#booking"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-brand-teal-950 hover:bg-brand-teal-50 font-bold text-xs sm:text-sm transition-all shadow-elevated min-h-[44px] active:scale-98"
                >
                  <Calendar className="w-4 h-4 text-brand-teal-800" />
                  <span>رزرو جلسه معارفه رایگان (جلسه صفر)</span>
                </a>
                <a
                  href="#packages"
                  className="inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-full bg-brand-teal-900/80 border border-brand-teal-700 hover:bg-brand-teal-800 text-white font-semibold text-xs sm:text-sm transition-colors min-h-[44px]"
                >
                  <span>مشاهده بسته‌ها و قیمت‌ها</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          DESKTOP HERO — Editorial 3-column layout inspired by Solt portfolio
          RTL: Content RIGHT | Portrait CENTER | Stats LEFT
         ===================================================================== */}
      <section className="hidden lg:block relative overflow-hidden bg-brand-surface-muted border-b border-brand-surface-border">
        <div className="max-w-[1400px] mx-auto px-8 xl:px-12">
          {/* Breadcrumb */}
          <nav aria-label="مسیر صفحه" className="pt-8 pb-6">
            <ol className="flex items-center gap-2 text-sm text-brand-neutral-400">
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

          {/* Main editorial hero area:
              - Arch & Coach portrait: absolutely centered at dead center of container (50%)
              - Right side (RTL): Typography and CTA buttons (with slight overlap on the arch)
              - Left side (RTL): Vertical stats stack
          */}
          <div className="relative min-h-[580px] xl:min-h-[640px] flex items-end justify-between pb-14">

            {/* ── CENTER ARCH & PORTRAIT (Mathematically 50% Centered) ── */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-10 z-10 flex justify-center pointer-events-none">
              {/* Arch container: wider (460px - 520px), rounded-b-full clips the image at the bottom curve */}
              <div className="relative w-[460px] xl:w-[520px] h-full rounded-b-full overflow-hidden bg-brand-teal-100/45">
                <Image
                  src={hasEditorialLayout ? cutoutUrl! : avatarUrl}
                  alt={coach.name}
                  fill
                  priority
                  sizes="(max-width: 1280px) 460px, 520px"
                  className="object-cover"
                  style={{ objectPosition: 'center 8%' }}
                />
              </div>
            </div>

            {/* ── RIGHT COLUMN (RTL first): Typography & CTA ── */}
            <div className="relative z-20 max-w-[460px] xl:max-w-[530px] text-right pb-4">
              {/* Kicker */}
              <p className="text-sm text-brand-neutral-500 font-medium mb-3 italic">
                کوچ حرفه‌ای بلومیا کلاب
              </p>

              {/* Name — massive editorial typography */}
              <h1 className="mb-3">
                <span className="block text-[3.2rem] xl:text-[4rem] font-black text-brand-neutral-900 leading-[1.05] tracking-tight">
                  {coach.name}
                </span>
              </h1>

              {/* Title split — mixed weight for editorial feel */}
              <div className="mb-6">
                <span className="block text-2xl xl:text-3xl font-black text-brand-teal-950 leading-tight">
                  {titleFirstLine}
                </span>
                {titleSecondLine && (
                  <span className="block text-xl xl:text-2xl text-brand-neutral-500 font-medium mt-1">
                    {titleSecondLine}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-base text-brand-neutral-600 leading-relaxed mb-8 max-w-md mr-0 ml-auto">
                {coach.description}
              </p>

              {/* CTA Buttons — Solt reference style: pill button with circular white arrow icon */}
              <div className="flex items-center justify-end gap-3.5">
                <a
                  href="#booking"
                  className="inline-flex items-center gap-3 pr-6 pl-2 py-2 rounded-full bg-brand-teal-950 text-white font-bold text-sm hover:bg-brand-teal-900 transition-all shadow-soft hover:shadow-elevated active:scale-[0.98] min-h-[52px]"
                >
                  <span>رزرو جلسه معارفه رایگان</span>
                  <span className="w-9 h-9 rounded-full bg-white text-brand-teal-950 flex items-center justify-center shrink-0 shadow-xs">
                    <ArrowLeft className="w-4 h-4" />
                  </span>
                </a>
                <a
                  href="#packages"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-brand-surface-border bg-white/70 backdrop-blur-xs text-brand-neutral-700 font-bold text-sm hover:border-brand-teal-950 hover:text-brand-teal-950 transition-colors min-h-[52px]"
                >
                  <span>مشاهده بسته‌ها</span>
                </a>
              </div>
            </div>

            {/* ── LEFT COLUMN (RTL last): Stats Stack ── */}
            <div className="relative z-20 flex flex-col items-start gap-10 xl:gap-12 pb-6 text-left">
              {/* Stat 1: Coaching Hours */}
              <div className="text-left">
                <div className="text-4xl xl:text-5xl font-black text-brand-neutral-900 tabular-nums leading-none">
                  {hours}
                </div>
                <div className="text-sm text-brand-neutral-500 mt-1.5 font-medium">
                  ساعت تجربه کوچینگ
                </div>
              </div>

              {/* Stat 2: Sessions */}
              <div className="text-left">
                <div className="text-4xl xl:text-5xl font-black text-brand-neutral-900 tabular-nums leading-none">
                  {sessions}
                </div>
                <div className="text-sm text-brand-neutral-500 mt-1.5 font-medium">
                  جلسه کوچینگ برگزار شده
                </div>
              </div>

              {/* Stat 3: Satisfaction Rate */}
              <div className="text-left">
                <div className="text-4xl xl:text-5xl font-black text-brand-neutral-900 leading-none">
                  *۱۰۰٪
                </div>
                <div className="text-sm text-brand-neutral-500 mt-1.5 font-medium">
                  نرخ رضایت مراجعین
                </div>
              </div>

              {/* Stat 4: Clients */}
              <div className="text-left">
                <div className="text-4xl xl:text-5xl font-black text-brand-neutral-900 tabular-nums leading-none">
                  {clients}
                </div>
                <div className="text-sm text-brand-neutral-500 mt-1.5 font-medium">
                  مراجع راضی و همراه
                </div>
              </div>
            </div>
          </div>

          {/* ── BOTTOM BAR: Specialties ── */}
          {coach.specialties && coach.specialties.length > 0 && (
            <div className="border-t border-brand-surface-border py-8">
              <div className="grid grid-cols-4 gap-0 divide-x divide-brand-surface-border" style={{ direction: 'ltr' }}>
                {coach.specialties.slice(0, 4).map((tag, idx) => (
                  <div key={idx} className="px-6 text-right" style={{ direction: 'rtl' }}>
                    <h3 className="text-sm font-black text-brand-neutral-900 uppercase tracking-wide mb-1.5">
                      {tag}
                    </h3>
                    <p className="text-xs text-brand-neutral-500 leading-relaxed">
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
