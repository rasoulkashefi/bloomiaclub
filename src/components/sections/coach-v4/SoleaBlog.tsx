'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, BookOpen } from 'lucide-react';
import type { CoachProfile } from '@/lib/coaches';

interface SoleaBlogProps {
  coach?: CoachProfile;
}

const cleanHref = (href?: string): string => {
  if (!href) return '/blog';
  if (href.startsWith('https://bloomiaclub.com')) {
    return href.replace('https://bloomiaclub.com', '');
  }
  return href;
};

export const SoleaBlog: React.FC<SoleaBlogProps> = ({ coach }) => {
  const articles = coach?.articles && coach.articles.length > 0 ? coach.articles : [];

  if (articles.length === 0) {
    return null;
  }

  const coachName = coach?.name || 'کوچ';
  const coachSlug = coach?.slug || '';
  const viewAllUrl = coachSlug ? `/blog?coach=${coachSlug}` : '/blog';
  const coachAvatar =
    coach?.aboutImage ||
    coach?.imageUrl ||
    coach?.coverImage ||
    '/images/default-avatar.png';

  return (
    <section id="blog" className="relative w-full bg-[#18312e] py-16 sm:py-24 lg:py-32 text-white overflow-hidden">
      {/* Ambient background glow for organic depth */}
      <div
        className="absolute top-0 right-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-[#2b544e]/25 rounded-full blur-[130px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-1/4 translate-y-1/2 w-[500px] h-[500px] bg-[#1f3d3a]/35 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        {/* Section Heading & View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="pb-10 sm:pb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold text-[#dfece9] backdrop-blur-md mb-4 shadow-xs">
              <BookOpen className="h-3.5 w-3.5 text-[#dfece9]" />
              <span>دیدگاه‌ها و مقالات تخصصی کوچ {coachName}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.3] text-white">
              وبلاگ و یادداشت‌های
              <br />
              منتخب من
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#dfece9]/80 leading-relaxed">
              مجموعه‌ای از مقالات تحلیلی، راهکارهای کوچینگ بین‌المللی ICF و تجربه‌های زیسته برای دستیابی به وضوح ذهنی، خودآگاهی و آرامش درونی.
            </p>
          </div>

          <Link
            href={viewAllUrl}
            className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-white hover:bg-white hover:text-[#1f3d3a] hover:shadow-xl active:scale-98 self-start md:self-auto min-h-[44px]"
          >
            <span>مشاهده همه مقالات</span>
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          </Link>
        </motion.div>

        {/* Responsive Magazine Grid: 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {articles.map((item, idx) => {
            const articleHref = cleanHref(item.href);
            const categoryLabel = item.category || 'کوچینگ و رشد فردی';

            return (
              <motion.div
                key={item.id || item.href || idx}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: (idx % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="h-full"
              >
                <article className="group relative flex flex-col h-full overflow-hidden rounded-[2rem] bg-white text-[#1e1e1e] shadow-[0_16px_40px_rgba(0,0,0,0.12)] border border-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_50px_rgba(0,0,0,0.22)]">
                  {/* Article Cover Image with Category Pill & Zoom */}
                  <Link
                    href={articleHref}
                    className="relative aspect-[16/10] w-full overflow-hidden bg-[#2b544e]/10 block shrink-0"
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#1f3d3a] to-[#2b544e] flex items-center justify-center p-6 text-center">
                        <BookOpen className="w-12 h-12 text-[#dfece9]/40" />
                      </div>
                    )}

                    {/* Gradient Overlay for visual polish */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 opacity-60 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none" />

                    {/* Category Pill (Top-Right in RTL) */}
                    <div className="absolute top-3.5 right-3.5 z-10">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-white/95 backdrop-blur-md text-[#1f3d3a] shadow-sm border border-black/5">
                        {categoryLabel}
                      </span>
                    </div>

                    {/* Estimated Reading Time (Bottom-Right in RTL) */}
                    {item.readTime && (
                      <div className="absolute bottom-3 right-3 z-10">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-black/60 backdrop-blur-md text-white/95 border border-white/15">
                          <Clock className="w-3 h-3 text-[#dfece9]" />
                          <span>{item.readTime}</span>
                        </span>
                      </div>
                    )}
                  </Link>

                  {/* Card Content Body */}
                  <div className="flex flex-col flex-1 p-6 sm:p-7 justify-between gap-5">
                    <div>
                      {/* Published Date */}
                      {item.date && (
                        <div className="flex items-center gap-2 text-xs font-medium text-[#6b6b6b] mb-3">
                          <Calendar className="w-3.5 h-3.5 text-[#2b544e] shrink-0" />
                          <span>{item.date}</span>
                        </div>
                      )}

                      {/* Article Title */}
                      <h3 className="font-serif text-lg sm:text-[19px] font-bold leading-[1.45] text-[#1e1e1e] group-hover:text-[#1f3d3a] transition-colors line-clamp-2">
                        <Link href={articleHref} className="touch-auto">
                          {item.title}
                        </Link>
                      </h3>

                      {/* Article Excerpt */}
                      {item.excerpt && (
                        <p className="mt-3 text-xs sm:text-sm text-[#6b6b6b] leading-[1.75] line-clamp-2 sm:line-clamp-3">
                          {item.excerpt}
                        </p>
                      )}
                    </div>

                    {/* Card Footer: Coach Profile & Read Link */}
                    <div className="pt-4 border-t border-[#e5e5e2] flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        {coachAvatar && (
                          <div className="relative w-8 h-8 rounded-full overflow-hidden bg-[#fafaf8] shrink-0 border border-[#e5e5e2]">
                            <Image
                              src={coachAvatar}
                              alt={coachName}
                              fill
                              sizes="32px"
                              className="object-cover"
                            />
                          </div>
                        )}
                        <span className="text-xs font-bold text-[#1e1e1e] truncate">
                          {coachName}
                        </span>
                      </div>

                      <Link
                        href={articleHref}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1f3d3a] group-hover:text-[#2b544e] shrink-0 touch-auto min-h-[44px]"
                      >
                        <span>مطالعه مقاله</span>
                        <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </article>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
