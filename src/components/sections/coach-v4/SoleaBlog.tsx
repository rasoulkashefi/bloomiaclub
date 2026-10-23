'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, ArrowLeft } from 'lucide-react';
import type { CoachProfile } from '@/lib/coaches';

interface ArticleItem {
  date: string;
  title: string;
  href?: string;
}

const cleanHref = (href?: string): string => {
  if (!href) return '/blog';
  if (href.startsWith('https://bloomiaclub.com')) {
    return href.replace('https://bloomiaclub.com', '');
  }
  return href;
};

interface SoleaBlogProps {
  coach?: CoachProfile;
}

export const SoleaBlog: React.FC<SoleaBlogProps> = ({ coach }) => {
  const articles: ArticleItem[] = (coach?.articles && coach.articles.length > 0)
    ? coach.articles.map((a) => ({
        date: a.date,
        title: a.title,
        href: cleanHref(a.href),
      }))
    : [];

  if (articles.length === 0) {
    return null;
  }

  const viewAllUrl = coach?.slug
    ? `/blog?coach=${coach.slug}`
    : '/blog';

  const coachName = coach?.name || 'کوچ';

  return (
    <section id="blog" className="w-full bg-[#2b544e] py-16 sm:py-20 lg:py-28 text-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        
        {/* Section Heading & View All Header Action */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="pb-10 sm:pb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <span className="inline-block text-xs uppercase tracking-widest text-[#dfece9]/90 font-medium mb-3">
              یادداشت‌های اختصاصی کوچ {coachName}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.3] text-white">
              وبلاگ و دیدگاه‌های
              <br />
              منتخب من
            </h2>
          </div>

          <Link
            href={viewAllUrl}
            className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white hover:text-[#1f3d3a] hover:shadow-xl active:scale-98 self-start md:self-auto min-h-[44px]"
          >
            <span>مشاهده همه مقالات</span>
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          </Link>
        </motion.div>

        {/* 2-Column Responsive Grid (List View on mobile, 2-col on lg) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-4 sm:gap-y-6">
          {articles.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: (idx % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={item.href || '#'}
                className="group relative flex items-center justify-between gap-4 py-5 sm:py-6 border-b border-white/15 transition-all duration-300 hover:border-white/40"
              >
                {/* Left Area (in RTL): Article Date & Title */}
                <div className="flex-1 min-w-0 pr-1">
                  {/* Formatted Date */}
                  <div className="flex items-center gap-2 text-xs font-medium text-[#dfece9]/80 mb-2">
                    <Calendar className="h-3.5 w-3.5 text-[#dfece9]/60 shrink-0" />
                    <span>{item.date}</span>
                  </div>

                  {/* Article Title with line clamp */}
                  <h3 className="font-serif text-[17px] sm:text-[19px] lg:text-[21px] font-normal leading-[1.65] text-white transition-colors duration-300 group-hover:text-[#dfece9] line-clamp-2">
                    {item.title}
                  </h3>
                </div>

                {/* Right Area (in RTL): Circular Arrow Icon */}
                <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-[#1f3d3a] group-hover:shadow-md">
                  <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:-translate-x-0.5" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
