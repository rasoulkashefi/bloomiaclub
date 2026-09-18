import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, CheckCircle, ArrowLeft, Calendar, UserCheck } from 'lucide-react';
import { Coach } from '@/lib/coaches';

interface CoachesSectionProps {
  coaches: Coach[];
}

export const CoachesSection: React.FC<CoachesSectionProps> = ({ coaches }) => {
  return (
    <section className="py-16 md:py-24 bg-brand-surface border-b border-brand-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 md:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-teal-50 text-brand-teal-900 text-xs font-semibold border border-brand-teal-200">
            <UserCheck className="w-3.5 h-3.5 text-brand-teal-700" />
            <span>کوچ‌های دارای مدرک بین‌المللی ICF</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-neutral-900 tracking-tight">
            با کوچ‌های بلومیا، هوشمندانه‌تر رشد کنید
          </h2>
          <p className="text-sm sm:text-base text-brand-neutral-600 leading-relaxed">
            دسترسی مستقیم به شبکه‌ای از برجسته‌ترین کوچ‌های معتبر کشور برای همراهی گام‌به‌گام تا رسیدن به اهداف.
          </p>
        </div>

        {/* Coaches Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {coaches.map((coach) => {
            const avatarUrl =
              coach.imageUrl ||
              'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop';

            return (
              <article
                key={coach.id}
                className="group flex flex-col bg-brand-surface-paper rounded-3xl p-5 sm:p-6 border border-brand-neutral-200/80 shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
              >
                {/* Top Row: Avatar & Badges */}
                <div className="flex items-start gap-4">
                  <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-brand-neutral-100 shrink-0 border border-brand-neutral-200">
                    <Image
                      src={avatarUrl}
                      alt={`تصویر ${coach.name}`}
                      fill
                      sizes="80px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 space-y-1 min-w-0">
                    <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{Number(coach.rating).toLocaleString('fa-IR')}/۵</span>
                      <span className="text-brand-neutral-400 font-normal">
                        ({coach.totalReviews} نظر)
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-brand-neutral-900 truncate">
                      <Link href={`/coaches/${coach.slug}`} className="hover:text-brand-teal-900 transition-colors">
                        {coach.name}
                      </Link>
                    </h3>
                    <p className="text-xs text-brand-teal-700 font-medium line-clamp-1">
                      {coach.title}
                    </p>
                  </div>
                </div>

                {/* Bio Excerpt */}
                <p className="text-xs sm:text-sm text-brand-neutral-600 line-clamp-3 mt-4 leading-relaxed flex-1">
                  {coach.description}
                </p>

                {/* Specialties tags */}
                {coach.specialties && coach.specialties.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-brand-neutral-100">
                    {coach.specialties.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-brand-neutral-100 text-brand-neutral-700 text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Card Action Buttons */}
                <div className="pt-5 mt-4 border-t border-brand-neutral-100 grid grid-cols-2 gap-2.5">
                  <Link
                    href={`/coaches/${coach.slug}`}
                    className="inline-flex items-center justify-center py-2.5 px-3 rounded-xl border border-brand-neutral-200 text-brand-neutral-700 hover:bg-brand-neutral-100 hover:text-brand-teal-900 text-xs sm:text-sm font-semibold transition-colors text-center"
                  >
                    مشاهده پروفایل
                  </Link>
                  <Link
                    href={`/coaches/${coach.slug}/book-session`}
                    className="inline-flex items-center justify-center gap-1 py-2.5 px-3 rounded-xl bg-brand-teal-900 hover:bg-brand-teal-800 text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs text-center"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>رزرو جلسه</span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/coaches"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border-2 border-brand-teal-900 text-brand-teal-900 hover:bg-brand-teal-900 hover:text-white font-bold text-sm sm:text-base transition-all shadow-xs"
          >
            <span>مشاهده همه کوچ‌های بلومیا</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
