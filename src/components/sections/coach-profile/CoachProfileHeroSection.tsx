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
  ShieldCheck,
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
    <section className="relative pt-8 pb-12 lg:pt-12 lg:pb-16 bg-brand-teal-950 text-white overflow-hidden border-b border-brand-teal-900">
      {/* Background ambient glows */}
      <div
        className="pointer-events-none absolute -bottom-24 right-1/4 w-96 h-96 bg-brand-teal-800/25 rounded-full blur-3xl -z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-0 -left-20 w-80 h-80 bg-brand-teal-900/35 rounded-full blur-3xl -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
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

        {/* Hero Container: flex-col on mobile (unchanged), 12-col grid on desktop (luxurious) */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-12 xl:gap-16 items-center">
          {/* Avatar / Portrait Column: unchanged on mobile, commanding executive portrait on desktop */}
          <div className="relative shrink-0 text-center lg:col-span-5 xl:col-span-4 lg:w-full">
            {/* Ambient glow behind portrait on desktop */}
            <div
              className="hidden lg:block absolute -inset-4 bg-brand-teal-700/20 rounded-[2.5rem] blur-2xl -z-10"
              aria-hidden="true"
            />

            {/* Portrait Frame */}
            <div className="relative mx-auto w-36 h-36 sm:w-44 sm:h-44 lg:w-full lg:max-w-[360px] lg:aspect-[4/5] xl:aspect-[3/4] rounded-3xl lg:rounded-[2rem] overflow-hidden border-4 lg:border-2 border-brand-teal-800/80 lg:border-brand-teal-700/60 shadow-elevated lg:shadow-2xl ring-2 lg:ring-1 ring-brand-teal-700/50 lg:ring-white/10 bg-brand-teal-900">
              <Image
                src={avatarUrl}
                alt={coach.name}
                fill
                priority
                sizes="(max-width: 640px) 144px, (max-width: 1024px) 176px, 400px"
                className="object-cover object-top"
              />

              {/* ICF Badge floating on image for desktop */}
              <div className="hidden lg:flex absolute top-4 right-4 z-10 items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-teal-950/80 backdrop-blur-md border border-brand-teal-600/50 text-brand-teal-100 text-xs font-semibold shadow-soft">
                <Award className="w-3.5 h-3.5 text-brand-teal-300" />
                <span>کوچ تایید شده ICF</span>
              </div>

              {/* Subtle gradient vignette at bottom for desktop */}
              <div className="hidden lg:block absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-brand-teal-950/90 via-brand-teal-950/30 to-transparent pointer-events-none" />
            </div>

            {/* ICF Badge below avatar on mobile (kept 100% identical) */}
            <div className="inline-flex lg:hidden items-center gap-1.5 px-3 py-1 rounded-full bg-brand-teal-900/90 border border-brand-teal-700/80 text-brand-teal-200 text-xs font-semibold mt-3 shadow-xs">
              <Award className="w-3.5 h-3.5 text-brand-teal-300" />
              <span>کوچ تایید شده ICF</span>
            </div>

            {/* Desktop Trust Bar under portrait */}
            <div className="hidden lg:flex items-center justify-center gap-2 mt-4 text-xs text-brand-teal-300/80">
              <ShieldCheck className="w-4 h-4 text-brand-teal-400" />
              <span>پایبند به اصول اخلاقی و محرمانگی ICF</span>
            </div>
          </div>

          {/* Coach Details Column */}
          <div className="flex-1 text-center lg:text-right space-y-4 lg:space-y-5 lg:col-span-7 xl:col-span-8 mt-6 lg:mt-0">
            {/* Desktop Credential Kicker */}
            <div className="hidden lg:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-teal-900/90 border border-brand-teal-700/80 text-brand-teal-200 text-xs font-semibold shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-teal-300" />
              <span>کوچ حرفه‌ای بین‌المللی بلومیا کلاب</span>
            </div>

            {/* Title & Name */}
            <div className="space-y-1.5">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-white tracking-tight leading-tight">
                {coach.name}
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-brand-teal-200 font-medium">
                {coach.title}
              </p>
            </div>

            {/* Rating & Reviews */}
            <div className="flex items-center justify-center lg:justify-start gap-2 text-xs sm:text-sm">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="font-bold text-white">{coach.rating}</span>
              <span className="text-brand-teal-200/70">
                ({Number(coach.totalReviews).toLocaleString('fa-IR')} نظر مراجعین تایید شده)
              </span>
            </div>

            {/* Specialties */}
            {coach.specialties && coach.specialties.length > 0 && (
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
                {coach.specialties.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 lg:px-3.5 lg:py-1.5 rounded-xl bg-brand-teal-900/80 border border-brand-teal-700/60 text-brand-teal-100 text-xs font-medium transition-colors hover:border-brand-teal-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Short Bio */}
            <p className="text-xs sm:text-sm lg:text-base text-brand-teal-100/90 leading-relaxed max-w-2xl">
              {coach.description}
            </p>

            {/* Stats Row on Mobile (100% unchanged) */}
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

            {/* Executive Metric Cards on Desktop */}
            <div className="hidden lg:grid grid-cols-3 gap-3.5 pt-2 max-w-2xl">
              <div className="bg-brand-teal-900/60 border border-brand-teal-800/80 rounded-2xl p-4 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-brand-teal-800/80 border border-brand-teal-700/60 flex items-center justify-center shrink-0 text-brand-teal-200">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-base xl:text-lg font-black text-white">{hours} ساعت</div>
                  <div className="text-xs text-brand-teal-300/80">تجربه کوچینگ فعال</div>
                </div>
              </div>

              <div className="bg-brand-teal-900/60 border border-brand-teal-800/80 rounded-2xl p-4 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-brand-teal-800/80 border border-brand-teal-700/60 flex items-center justify-center shrink-0 text-brand-teal-200">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-base xl:text-lg font-black text-white">{clients} مراجع</div>
                  <div className="text-xs text-brand-teal-300/80">مراجعین راضی و موفق</div>
                </div>
              </div>

              <div className="bg-brand-teal-900/60 border border-brand-teal-800/80 rounded-2xl p-4 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-brand-teal-800/80 border border-brand-teal-700/60 flex items-center justify-center shrink-0 text-brand-teal-200">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-base xl:text-lg font-black text-white">۱۰۰٪ تایید</div>
                  <div className="text-xs text-brand-teal-300/80">استاندارد اخلاقی ICF</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 lg:pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-3.5">
              <a
                href="#booking"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 lg:px-7 lg:py-3.5 rounded-full bg-white text-brand-teal-950 hover:bg-brand-teal-50 font-bold text-xs sm:text-sm lg:text-base transition-all shadow-elevated hover:shadow-xl active:scale-98 min-h-[44px] lg:min-h-[48px]"
              >
                <Calendar className="w-4 h-4 lg:w-5 lg:h-5 text-brand-teal-800" />
                <span>رزرو جلسه معارفه رایگان (جلسه صفر)</span>
              </a>

              <a
                href="#packages"
                className="inline-flex items-center justify-center gap-1.5 px-5 py-3 lg:px-6 lg:py-3.5 rounded-full bg-brand-teal-900/80 border border-brand-teal-700 hover:bg-brand-teal-800 text-white font-semibold text-xs sm:text-sm lg:text-base transition-colors min-h-[44px] lg:min-h-[48px]"
              >
                <span>مشاهده بسته‌ها و قیمت‌ها</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
