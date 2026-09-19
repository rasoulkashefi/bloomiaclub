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
  TrendingUp,
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
    ? Number(coach.satisfiedClients).toLocaleString('fa-IR')
    : '۰';
  const sessions = coach.totalSessions
    ? Number(coach.totalSessions).toLocaleString('fa-IR')
    : '۰';

  // Desktop uses editoral cutout layout if cutoutImageUrl exists, otherwise falls back to framed portrait
  const hasEditorialLayout = !!cutoutUrl;

  return (
    <>
      {/* =====================================================================
          MOBILE HERO — 100% UNTOUCHED, exactly as before
         ===================================================================== */}
      <section className="lg:hidden relative pt-8 pb-12 bg-brand-teal-950 text-white overflow-hidden border-b border-brand-teal-900">
        {/* Background ambient glows */}
        <div
          className="pointer-events-none absolute -bottom-24 right-1/4 w-96 h-96 bg-brand-teal-800/25 rounded-full blur-3xl -z-10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute top-0 -left-20 w-80 h-80 bg-brand-teal-900/35 rounded-full blur-3xl -z-10"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
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

          {/* Mobile Layout */}
          <div className="flex flex-col items-center">
            {/* Avatar */}
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

            {/* Details */}
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
          DESKTOP HERO — Editorial Kinetik-style with cutout + floating cards
         ===================================================================== */}
      <section
        className="hidden lg:block relative overflow-hidden border-b border-brand-teal-900"
        style={{
          background: hasEditorialLayout
            ? 'linear-gradient(135deg, #0f2825 0%, #1f3d3a 35%, #1a3330 65%, #142a27 100%)'
            : undefined,
        }}
      >
        {/* ---- Background layers ---- */}
        {hasEditorialLayout && (
          <>
            {/* Subtle grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '60px 60px',
              }}
              aria-hidden="true"
            />
            {/* Top-right warm glow */}
            <div
              className="pointer-events-none absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full blur-3xl"
              style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.12) 0%, transparent 70%)' }}
              aria-hidden="true"
            />
            {/* Bottom-left cool glow */}
            <div
              className="pointer-events-none absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full blur-3xl"
              style={{ background: 'radial-gradient(circle, rgba(6,78,59,0.25) 0%, transparent 70%)' }}
              aria-hidden="true"
            />
            {/* Center spotlight behind coach */}
            <div
              className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-3xl"
              style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.06) 0%, transparent 60%)' }}
              aria-hidden="true"
            />
          </>
        )}

        {!hasEditorialLayout && (
          <div className="absolute inset-0 bg-gradient-to-l from-white via-[#fafaf8] to-[#eef6f4]" />
        )}

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-14 pb-0">
          {/* Breadcrumb */}
          <nav aria-label="مسیر صفحه" className="mb-10">
            <ol className={`flex items-center gap-2 text-sm ${hasEditorialLayout ? 'text-brand-teal-300/70' : 'text-brand-neutral-500'}`}>
              <li>
                <Link
                  href="/"
                  className={`transition-colors ${hasEditorialLayout ? 'hover:text-white' : 'hover:text-brand-teal-950'}`}
                >
                  صفحه اصلی
                </Link>
              </li>
              <ChevronLeft className="w-3.5 h-3.5 opacity-60" />
              <li>
                <Link
                  href="/coaches"
                  className={`transition-colors ${hasEditorialLayout ? 'hover:text-white' : 'hover:text-brand-teal-950'}`}
                >
                  کوچ‌ها
                </Link>
              </li>
              <ChevronLeft className="w-3.5 h-3.5 opacity-60" />
              <li className={`font-semibold truncate ${hasEditorialLayout ? 'text-white' : 'text-brand-teal-950'}`} aria-current="page">
                {coach.name}
              </li>
            </ol>
          </nav>

          {/* Main editorial grid */}
          <div className="relative grid grid-cols-12 gap-8 xl:gap-12 items-end min-h-[600px]">

            {/* ── Column A: Typography & Actions (RTL = right side) ── */}
            <div className="col-span-6 xl:col-span-5 text-right pb-20 relative z-20">
              {/* Title group */}
              <div className="space-y-3 mb-6">
                <h1 className={`text-4xl xl:text-[3.5rem] font-black leading-[1.15] tracking-tight ${hasEditorialLayout ? 'text-white' : 'text-brand-neutral-900'}`}>
                  {coach.name}
                </h1>
                <p className={`text-lg xl:text-xl font-bold ${hasEditorialLayout ? 'text-emerald-300' : 'text-brand-teal-800'}`}>
                  {coach.title}
                </p>
              </div>

              {/* Description */}
              <p className={`text-base leading-relaxed mb-8 max-w-lg mr-0 ml-auto ${hasEditorialLayout ? 'text-brand-teal-100/80' : 'text-brand-neutral-600'}`}>
                {coach.description}
              </p>

              {/* Action buttons */}
              <div className="flex items-center justify-end gap-4">
                <a
                  href="#booking"
                  className={`inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl font-bold text-sm shadow-elevated hover:shadow-xl transition-all active:scale-[0.98] min-h-[52px] ${
                    hasEditorialLayout
                      ? 'bg-white text-brand-teal-950 hover:bg-emerald-50'
                      : 'bg-brand-teal-950 text-white hover:bg-brand-teal-900'
                  }`}
                >
                  <Calendar className="w-5 h-5" />
                  <span>رزرو جلسه معارفه رایگان (جلسه صفر)</span>
                </a>
                <a
                  href="#packages"
                  className={`inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-sm transition-colors min-h-[52px] ${
                    hasEditorialLayout
                      ? 'bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20'
                      : 'bg-white border-2 border-brand-teal-950 text-brand-teal-950 hover:bg-brand-teal-50'
                  }`}
                >
                  <span>مشاهده بسته‌ها و قیمت‌ها</span>
                </a>
              </div>
            </div>

            {/* ── Column B: Coach cutout + Floating cards ── */}
            <div className="col-span-6 xl:col-span-7 relative flex justify-center items-end">
              {hasEditorialLayout ? (
                <>
                  {/* The cutout coach image — no frame, no border, floating freely */}
                  <div className="relative w-full max-w-[480px] xl:max-w-[520px] h-[580px] xl:h-[640px] z-10">
                    <Image
                      src={cutoutUrl!}
                      alt={coach.name}
                      fill
                      priority
                      sizes="520px"
                      className="object-contain object-bottom drop-shadow-2xl"
                    />
                  </div>

                  {/* ═══════════ Floating Glass Cards ═══════════ */}

                  {/* Card 1: Coaching Hours — top-right */}
                  <div className="absolute top-16 right-4 xl:right-8 z-30 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-5 py-4 shadow-2xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-black text-white tabular-nums">{hours}</div>
                        <div className="text-[11px] text-brand-teal-300/80 font-medium">ساعت تجربه کوچینگ</div>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Satisfied Clients — middle-left */}
                  <div className="absolute top-40 left-0 xl:-left-4 z-30 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-5 py-4 shadow-2xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                        <Users className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-black text-white tabular-nums">+{clients}</div>
                        <div className="text-[11px] text-brand-teal-300/80 font-medium">مراجع راضی و همراه</div>
                      </div>
                    </div>
                  </div>

                  {/* Card 3: Rating — bottom-right */}
                  <div className="absolute bottom-32 right-0 xl:right-4 z-30 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-5 py-4 shadow-2xl">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-black text-white">{coach.rating}</div>
                        <div className="text-[11px] text-brand-teal-300/80 font-medium">
                          نرخ رضایت مراجعین
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 4: ICF Badge — bottom-left */}
                  <div className="absolute bottom-44 left-4 xl:left-0 z-30 bg-emerald-500/15 backdrop-blur-xl border border-emerald-400/30 rounded-2xl px-5 py-3.5 shadow-2xl">
                    <div className="flex items-center gap-2.5">
                      <ShieldCheck className="w-5 h-5 text-emerald-400" />
                      <div className="text-right">
                        <div className="text-sm font-bold text-white">تایید رسمی ICF</div>
                        <div className="text-[11px] text-emerald-300/80 font-medium">فدراسیون بین‌المللی کوچینگ</div>
                      </div>
                    </div>
                  </div>

                  {/* Card 5: Sessions count — top-left area */}
                  <div className="absolute top-8 left-8 xl:left-16 z-30 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-5 py-4 shadow-2xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-black text-white tabular-nums">{sessions}</div>
                        <div className="text-[11px] text-brand-teal-300/80 font-medium">جلسه کوچینگ</div>
                      </div>
                    </div>
                  </div>

                  {/* Specialty pills scattered near top of coach */}
                  {coach.specialties && coach.specialties.length > 0 && (
                    <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30 flex flex-wrap justify-center gap-2 max-w-[500px]">
                      {coach.specialties.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-white/90 text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                /* Fallback: framed portrait for coaches without cutout */
                <div className="relative w-full max-w-[420px] h-[540px] xl:h-[580px] rounded-[2rem] overflow-hidden border border-brand-neutral-200/80 shadow-2xl bg-white mb-0">
                  <Image
                    src={avatarUrl}
                    alt={coach.name}
                    fill
                    priority
                    sizes="500px"
                    className="object-cover object-top"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
