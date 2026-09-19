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
  MessageSquare,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import type { Coach } from '@/lib/coaches';

interface CoachProfileHeroSectionProps {
  coach: Coach;
}

export const CoachProfileHeroSection: React.FC<CoachProfileHeroSectionProps> = ({
  coach,
}) => {
  const avatarUrl = coach.imageUrl || '/images/default-coach-avatar.webp';
  const hours = coach.coachingHours
    ? `+${Number(coach.coachingHours).toLocaleString('fa-IR')}`
    : '+۰';
  const clients = coach.satisfiedClients
    ? Number(coach.satisfiedClients).toLocaleString('fa-IR')
    : '۰';

  return (
    <section className="relative pt-8 pb-12 lg:pt-14 lg:pb-20 bg-brand-teal-950 lg:bg-gradient-to-l lg:from-white lg:via-[#fafaf8] lg:to-[#eef6f4] text-white lg:text-brand-neutral-900 overflow-hidden border-b border-brand-teal-900 lg:border-brand-neutral-200">
      {/* Background ambient glows for mobile */}
      <div
        className="lg:hidden pointer-events-none absolute -bottom-24 right-1/4 w-96 h-96 bg-brand-teal-800/25 rounded-full blur-3xl -z-10"
        aria-hidden="true"
      />
      <div
        className="lg:hidden pointer-events-none absolute top-0 -left-20 w-80 h-80 bg-brand-teal-900/35 rounded-full blur-3xl -z-10"
        aria-hidden="true"
      />

      {/* Background ambient glows for desktop */}
      <div
        className="hidden lg:block pointer-events-none absolute -top-24 left-1/4 w-[500px] h-[500px] bg-emerald-100/40 rounded-full blur-3xl -z-10"
        aria-hidden="true"
      />
      <div
        className="hidden lg:block pointer-events-none absolute bottom-0 left-0 w-96 h-96 bg-brand-teal-100/30 rounded-full blur-3xl -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="مسیر صفحه" className="mb-6 sm:mb-8">
          <ol className="flex items-center gap-2 text-xs sm:text-sm text-brand-teal-200/80 lg:text-brand-neutral-500">
            <li>
              <Link
                href="/"
                className="hover:text-white lg:hover:text-brand-teal-950 transition-colors"
              >
                صفحه اصلی
              </Link>
            </li>
            <ChevronLeft className="w-3.5 h-3.5 opacity-60" />
            <li>
              <Link
                href="/coaches"
                className="hover:text-white lg:hover:text-brand-teal-950 transition-colors"
              >
                کوچ‌ها
              </Link>
            </li>
            <ChevronLeft className="w-3.5 h-3.5 opacity-60" />
            <li
              className="text-white lg:text-brand-teal-950 font-semibold truncate"
              aria-current="page"
            >
              {coach.name}
            </li>
          </ol>
        </nav>

        {/* Hero Container: flex-col on mobile, 12-col grid on desktop */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-12 xl:gap-16 items-center">
          {/* =========================================================================
              Column A: Coach Details & Actions
              On mobile: order-2 (rendered below avatar, centered, dark theme)
              On desktop: order-1 (rendered on RIGHT in RTL, right-aligned, light theme)
             ========================================================================= */}
          <div className="order-2 lg:order-1 flex-1 text-center lg:text-right space-y-4 lg:space-y-5 lg:col-span-7 xl:col-span-7 mt-6 lg:mt-0">
            {/* Desktop Kicker Badge (Stitch style) */}
            <div className="hidden lg:inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>کوچ رسمی توسعه فردی و تسهیل‌گر تحول درونی</span>
            </div>

            {/* Title & Name */}
            <div className="space-y-1.5">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-white lg:text-brand-neutral-900 tracking-tight leading-tight">
                {coach.name}
              </h1>
              <p className="text-sm sm:text-base lg:text-xl text-brand-teal-200 lg:text-brand-teal-800 font-bold">
                {coach.title}
              </p>
            </div>

            {/* Rating & Reviews - Mobile Version (100% untouched) */}
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm lg:hidden">
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

            {/* Rating & Reviews - Desktop Version (Stitch style) */}
            <div className="hidden lg:flex items-center gap-3 text-xs font-medium text-brand-neutral-600 pt-1">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-800 font-bold">
                <div className="flex items-center gap-0.5 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <span>{coach.rating}</span>
              </div>
              <span className="text-brand-neutral-300">•</span>
              <div className="flex items-center gap-1.5 text-brand-neutral-600">
                <MessageSquare className="w-3.5 h-3.5 text-brand-neutral-400" />
                <span>
                  ({Number(coach.totalReviews).toLocaleString('fa-IR')} نظر مراجعین تایید شده)
                </span>
              </div>
              <span className="text-brand-neutral-300">•</span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs font-bold">
                نرخ رضایت ۱۰۰٪
              </span>
            </div>

            {/* Specialties - Mobile Version (100% untouched) */}
            {coach.specialties && coach.specialties.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-2 pt-1 lg:hidden">
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

            {/* Specialties - Desktop Version (Stitch style: clean white rounded-full pills) */}
            {coach.specialties && coach.specialties.length > 0 && (
              <div className="hidden lg:flex flex-wrap items-center gap-2.5 pt-1">
                {coach.specialties.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-1.5 rounded-full bg-white border border-brand-neutral-200 text-brand-neutral-700 text-xs font-medium shadow-xs hover:border-brand-teal-400 hover:text-brand-teal-800 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Short Bio */}
            <p className="text-xs sm:text-sm lg:text-base text-brand-teal-100/85 lg:text-brand-neutral-600 leading-relaxed max-w-2xl lg:max-w-xl">
              {coach.description}
            </p>

            {/* Stats Row - Mobile Version (100% untouched) */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-brand-teal-100/90 lg:hidden">
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

            {/* Stats Cards - Desktop Version (Stitch style: 2 side-by-side floating white cards) */}
            <div className="hidden lg:grid grid-cols-2 gap-4 pt-2 max-w-xl">
              <div className="bg-white rounded-2xl p-4 border border-brand-neutral-200/80 shadow-soft flex items-center justify-between gap-4">
                <div>
                  <div className="text-2xl font-black text-brand-teal-950">
                    {hours}
                  </div>
                  <div className="text-xs text-brand-neutral-500 mt-0.5">
                    ساعت تجربه کوچینگ فردی
                  </div>
                </div>
                <div className="w-11 h-11 rounded-full bg-brand-teal-50 border border-brand-teal-100/80 flex items-center justify-center shrink-0 text-brand-teal-700">
                  <Clock className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-brand-neutral-200/80 shadow-soft flex items-center justify-between gap-4">
                <div>
                  <div className="text-2xl font-black text-brand-teal-950">
                    +{clients}
                  </div>
                  <div className="text-xs text-brand-neutral-500 mt-0.5">
                    مراجع راضی و همراه
                  </div>
                </div>
                <div className="w-11 h-11 rounded-full bg-brand-teal-50 border border-brand-teal-100/80 flex items-center justify-center shrink-0 text-brand-teal-700">
                  <Users className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Action Buttons - Mobile Version (100% untouched) */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-3 lg:hidden">
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

            {/* Action Buttons - Desktop Version (Stitch style) */}
            <div className="hidden lg:flex items-center gap-4 pt-4">
              <a
                href="#booking"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-brand-teal-950 hover:bg-brand-teal-900 text-white font-bold text-sm shadow-elevated hover:shadow-xl transition-all active:scale-98 min-h-[48px]"
              >
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span>رزرو جلسه معارفه رایگان (جلسه صفر)</span>
              </a>

              <a
                href="#packages"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white border-2 border-brand-teal-950 hover:bg-brand-teal-50 text-brand-teal-950 font-bold text-sm transition-colors min-h-[48px]"
              >
                <Layers className="w-4 h-4 text-brand-teal-800" />
                <span>مشاهده بسته‌ها و قیمت‌ها</span>
              </a>
            </div>
          </div>

          {/* =========================================================================
              Column B: Coach Portrait / Photo
              On mobile: order-1 (rendered at TOP, centered, dark theme frame)
              On desktop: order-2 (rendered on LEFT in RTL, commanding portrait)
             ========================================================================= */}
          <div className="order-1 lg:order-2 relative shrink-0 text-center lg:col-span-5 xl:col-span-5 lg:w-full flex flex-col items-center">
            {/* Ambient glow behind portrait on desktop */}
            <div
              className="hidden lg:block absolute -inset-6 bg-gradient-to-tr from-brand-teal-200/40 via-emerald-100/30 to-transparent rounded-[3rem] blur-2xl -z-10"
              aria-hidden="true"
            />

            {/* Portrait Frame */}
            <div className="relative mx-auto w-36 h-36 sm:w-44 sm:h-44 lg:w-full lg:max-w-[420px] lg:h-[540px] xl:h-[580px] rounded-3xl lg:rounded-[2rem] overflow-hidden border-4 lg:border border-brand-teal-800/80 lg:border-brand-neutral-200/80 shadow-elevated lg:shadow-2xl ring-2 lg:ring-0 ring-brand-teal-700/50 bg-brand-teal-900 lg:bg-white">
              <Image
                src={avatarUrl}
                alt={coach.name}
                fill
                priority
                sizes="(max-width: 640px) 144px, (max-width: 1024px) 176px, 500px"
                className="object-cover object-top"
              />
            </div>

            {/* ICF Badge below avatar on mobile (100% untouched) */}
            <div className="inline-flex lg:hidden items-center gap-1.5 px-3 py-1 rounded-full bg-brand-teal-900/90 border border-brand-teal-700/80 text-brand-teal-200 text-xs font-semibold mt-3 shadow-xs">
              <Award className="w-3.5 h-3.5 text-brand-teal-300" />
              <span>کوچ تایید شده ICF</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
