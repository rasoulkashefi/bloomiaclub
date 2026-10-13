import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CoachProfile } from '@/lib/coaches';
import { Users, ArrowLeft, Star, Award, CheckCircle } from 'lucide-react';

interface FreeIntroCoachesSectionProps {
  coaches: CoachProfile[];
}

export const FreeIntroCoachesSection: React.FC<FreeIntroCoachesSectionProps> = ({ coaches }) => {
  // Show up to 6 featured coaches
  const displayedCoaches = coaches.slice(0, 6);

  return (
    <section className="py-16 md:py-24 bg-white border-t border-brand-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-teal-50 border border-brand-teal-200/60 text-brand-teal-900 text-xs sm:text-sm font-semibold">
            <Users className="w-4 h-4 text-brand-teal-700" />
            <span>کوچ‌های همراه بلومیا</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-neutral-900 tracking-tight">
            همراهان شما در مسیر تحول فردی و شغلی
          </h2>
          <p className="text-sm sm:text-base text-brand-neutral-600 max-w-xl mx-auto leading-relaxed">
            تمامی کوچ‌های حاضر در بلومیا دارای تأییدیه‌های معتبر فدراسیون بین‌المللی کوچینگ (ICF) و صدها ساعت تجربه موفق هستند.
          </p>
        </div>

        {/* Coaches Grid: 1 col mobile, 2 col md, 3 col lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayedCoaches.map((coach) => {
            const hasAvatar = !!coach.imageUrl;
            const displayRating = coach.rating && coach.rating > 0 ? coach.rating : null;

            return (
              <div
                key={coach.id}
                className="bg-brand-surface rounded-3xl p-5 sm:p-6 border border-brand-surface-border shadow-soft-sm flex flex-col justify-between hover:shadow-soft hover:border-brand-teal-300 transition-all group"
              >
                <div>
                  {/* Coach Photo & Meta */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden bg-brand-surface-muted border border-brand-surface-border shrink-0">
                      {hasAvatar ? (
                        <Image
                          src={coach.imageUrl!}
                          alt={coach.name}
                          fill
                          sizes="72px"
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
                        <h3 className="text-base sm:text-lg font-bold text-brand-neutral-900 truncate">
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
                          {coach.totalReviews && coach.totalReviews > 0 && (
                            <span className="text-xs text-brand-neutral-400">
                              ({coach.totalReviews} نظر)
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Short Bio */}
                  <p className="text-xs sm:text-sm text-brand-neutral-600 line-clamp-2 leading-relaxed mb-4">
                    {coach.description || coach.shortBio || 'همراه شما برای وضوح، رشد و شکوفایی ظرفیت‌های درونی.'}
                  </p>

                  {/* Specialties Pills */}
                  {coach.specialties && coach.specialties.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {coach.specialties.slice(0, 3).map((spec, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-white border border-brand-surface-border text-brand-neutral-700"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-brand-surface-border flex items-center justify-between gap-3">
                  <Link
                    href={`/coaches/${coach.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-brand-teal-900 hover:text-brand-teal-700 transition-colors"
                  >
                    <span>مشاهده رزومه و مشخصات</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </Link>

                  <a
                    href="#booking-form"
                    className="inline-flex items-center justify-center px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-brand-teal-900 hover:bg-brand-teal-800 transition-colors min-h-[36px]"
                  >
                    رزرو معارفه
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Coaches Link */}
        <div className="text-center mt-12">
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
