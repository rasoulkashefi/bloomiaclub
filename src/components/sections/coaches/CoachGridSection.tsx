'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Clock, Users, ArrowLeft, Calendar, SearchX } from 'lucide-react';
import type { Coach } from '@/lib/coaches';

interface CoachGridSectionProps {
  coaches: Coach[];
  onResetFilters: () => void;
}

export const CoachGridSection: React.FC<CoachGridSectionProps> = ({
  coaches,
  onResetFilters,
}) => {
  if (coaches.length === 0) {
    return (
      <section className="py-16 bg-brand-surface">
        <div className="max-w-md mx-auto px-4 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-brand-teal-50 text-brand-teal-800 mx-auto flex items-center justify-center shadow-xs">
            <SearchX className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-brand-neutral-900">
            کوچی با این مشخصات یافت نشد
          </h3>
          <p className="text-sm text-brand-neutral-600 leading-relaxed">
            لطفاً عبارت جستجو را تغییر دهید یا فیلترهای انتخابی را بازنشانی کنید تا همه کوچ‌ها نمایش داده شوند.
          </p>
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-brand-teal-900 text-white text-sm font-semibold hover:bg-brand-teal-800 transition-colors shadow-soft min-h-[44px]"
          >
            <span>نمایش همه کوچ‌ها</span>
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 md:py-16 bg-brand-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid: 1 col on mobile, 2 col on tablet, 3 col on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {coaches.map((coach) => {
            const avatarUrl = coach.imageUrl || '/images/default-coach-avatar.webp';
            const hours = coach.coachingHours
              ? `+${Number(coach.coachingHours).toLocaleString('fa-IR')}`
              : '+۰';
            const clients = coach.satisfiedClients
              ? Number(coach.satisfiedClients).toLocaleString('fa-IR')
              : '۰';

            return (
              <article
                key={coach.id}
                className="bg-brand-surface-paper rounded-3xl border border-brand-neutral-200/90 p-5 sm:p-6 shadow-soft hover:shadow-elevated hover:border-brand-teal-200/80 transition-all duration-300 flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-4">
                  {/* Coach Top Row: Avatar + Info */}
                  <div className="flex items-start gap-4">
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-brand-neutral-100 border-2 border-brand-teal-100 shrink-0 shadow-xs group-hover:border-brand-teal-300 transition-colors">
                      <Image
                        src={avatarUrl}
                        alt={coach.name}
                        fill
                        sizes="(max-width: 640px) 64px, 80px"
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-base sm:text-lg font-bold text-brand-neutral-900 truncate">
                          {coach.name}
                        </h3>
                        {/* Rating */}
                        <div className="flex items-center gap-1 text-xs font-semibold text-brand-neutral-700 shrink-0 bg-brand-neutral-100/70 px-2 py-0.5 rounded-full">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{coach.rating}</span>
                          {coach.totalReviews > 0 && (
                            <span className="text-brand-neutral-500 text-[11px]">
                              ({coach.totalReviews})
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-xs text-brand-teal-800 font-semibold line-clamp-1">
                        {coach.title}
                      </p>

                      {/* Specialties tags */}
                      {coach.specialties && coach.specialties.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {coach.specialties.slice(0, 3).map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-brand-teal-50 text-brand-teal-900 border border-brand-teal-100/60"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bio snippet */}
                  <p className="text-xs sm:text-sm text-brand-neutral-600 leading-relaxed line-clamp-2">
                    {coach.description}
                  </p>

                  {/* Stats Row */}
                  <div className="pt-3 border-t border-brand-neutral-100 flex items-center justify-between text-xs text-brand-neutral-600">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-brand-teal-700" />
                      <span>{hours} ساعت تجربه</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-brand-teal-700" />
                      <span>{clients} مراجع راضی</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 flex items-center gap-2">
                  <Link
                    href={`/coaching/free-intro-session?coach=${coach.slug}`}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-full bg-brand-teal-900 hover:bg-brand-teal-800 text-white font-bold text-xs sm:text-sm transition-colors shadow-soft min-h-[44px]"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>رزرو جلسه معارفه</span>
                  </Link>

                  <Link
                    href={`/coaches/${coach.slug}`}
                    className="inline-flex items-center justify-center gap-1 px-3 py-2.5 rounded-full bg-brand-surface border border-brand-neutral-300 hover:bg-brand-teal-50 hover:text-brand-teal-900 text-brand-neutral-700 font-semibold text-xs sm:text-sm transition-colors min-h-[44px]"
                    aria-label={`مشاهده پروفایل ${coach.name}`}
                  >
                    <span>پروفایل</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
