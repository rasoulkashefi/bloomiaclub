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
  Share2,
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
    <section className="relative pt-8 pb-12 md:pt-12 md:pb-16 bg-brand-teal-950 text-white overflow-hidden border-b border-brand-teal-900">
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

        {/* Hero Grid */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
          {/* Avatar Container */}
          <div className="relative shrink-0 text-center">
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-3xl overflow-hidden border-4 border-brand-teal-800/80 shadow-elevated ring-2 ring-brand-teal-700/50 bg-brand-teal-900">
              <Image
                src={avatarUrl}
                alt={coach.name}
                fill
                priority
                sizes="(max-width: 640px) 144px, (max-width: 768px) 176px, 208px"
                className="object-cover"
              />
            </div>

            {/* ICF Badge below avatar */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-teal-900/90 border border-brand-teal-700/80 text-brand-teal-200 text-xs font-semibold mt-3 shadow-xs">
              <Award className="w-3.5 h-3.5 text-brand-teal-300" />
              <span>کوچ تایید شده ICF</span>
            </div>
          </div>

          {/* Coach Details */}
          <div className="flex-1 text-center md:text-right space-y-4">
            {/* Title & Name */}
            <div className="space-y-1.5">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                {coach.name}
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-brand-teal-200 font-medium">
                {coach.title}
              </p>
            </div>

            {/* Rating & Reviews */}
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs sm:text-sm">
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

            {/* Specialties */}
            {coach.specialties && coach.specialties.length > 0 && (
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1">
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

            {/* Short Bio */}
            <p className="text-xs sm:text-sm text-brand-teal-100/85 leading-relaxed max-w-2xl">
              {coach.description}
            </p>

            {/* Stats Row */}
            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-6 text-xs sm:text-sm text-brand-teal-100/90">
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

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-center md:justify-start gap-3">
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
  );
};
