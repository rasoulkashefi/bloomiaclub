import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CoachProfile } from '@/lib/coaches';
import { Users, ArrowLeft, CheckCircle, Star } from 'lucide-react';

interface AboutCoachesSpotlightSectionProps {
  coaches: CoachProfile[];
}

export const AboutCoachesSpotlightSection: React.FC<AboutCoachesSpotlightSectionProps> = ({ coaches }) => {
  // Show up to 3 featured coaches
  const displayedCoaches = coaches.slice(0, 3);

  return (
    <section className="py-16 md:py-24 bg-white border-b border-brand-surface-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-teal-50 border border-brand-teal-200/60 text-brand-teal-900 text-xs sm:text-sm font-semibold">
            <Users className="w-4 h-4 text-brand-teal-700" />
            <span>تیم کوچ‌های بلومیا</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-neutral-900 tracking-tight">
            همراهان شما؛ فراتر از شبکه‌های اجتماعی
          </h2>
          <p className="text-sm sm:text-base text-brand-neutral-600 max-w-xl mx-auto leading-relaxed">
            کوچ‌های بلومیا پس از ارزیابی‌های دقیق صلاحیت حرفه‌ای، مصاحبه‌های عمیق و سنجش تعهد به منشور اخلاقی انتخاب شده‌اند.
          </p>
        </div>

        {/* Coaches Grid: 1 col on mobile, 3 col on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {displayedCoaches.map((coach) => {
            const hasAvatar = !!coach.imageUrl;
            const displayRating = coach.rating && coach.rating > 0 ? coach.rating : null;

            return (
              <div
                key={coach.id}
                className="bg-brand-surface rounded-3xl p-5 sm:p-6 border border-brand-surface-border shadow-soft-sm flex flex-col justify-between hover:shadow-soft hover:border-brand-teal-300 transition-all group"
              >
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-brand-surface-muted border border-brand-surface-border shrink-0">
                      {hasAvatar ? (
                        <Image
                          src={coach.imageUrl!}
                          alt={coach.name}
                          fill
                          sizes="64px"
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-brand-neutral-400 font-bold text-lg">
                          {coach.name.charAt(0)}
                        </div>
                      )}
                    </div>

                    <div className="space-y-1 overflow-hidden">
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-base font-bold text-brand-neutral-900 truncate">
                          {coach.name}
                        </h3>
                        <CheckCircle className="w-4 h-4 text-brand-teal-700 shrink-0" />
                      </div>
                      <p className="text-xs text-brand-neutral-500 line-clamp-1">
                        {coach.title}
                      </p>

                      {displayRating && (
                        <div className="flex items-center gap-1 pt-0.5">
                          <Star className="w-3.5 h-3.5 text-[#f59e0b] fill-[#f59e0b]" />
                          <span className="text-xs font-bold text-brand-neutral-800">
                            {displayRating.toFixed(1)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-brand-neutral-600 line-clamp-3 leading-relaxed mb-4">
                    {coach.description || coach.shortBio || 'همراه شما برای وضوح، رشد و شکوفایی ظرفیت‌های درونی.'}
                  </p>

                  {coach.specialties && coach.specialties.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {coach.specialties.slice(0, 3).map((spec, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-medium px-2 py-0.5 rounded-lg bg-white border border-brand-surface-border text-brand-neutral-700"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-brand-surface-border">
                  <Link
                    href={`/coaches/${coach.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-teal-900 hover:text-brand-teal-700 transition-colors"
                  >
                    <span>مشاهده رزومه و مشخصات کامل</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Coaches CTA */}
        <div className="text-center">
          <Link
            href="/coaches"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-brand-teal-900 hover:bg-brand-teal-50 border border-brand-teal-300 transition-colors min-h-[44px]"
          >
            <span>مشاهده همه کوچ‌های بلومیا کلاب</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
