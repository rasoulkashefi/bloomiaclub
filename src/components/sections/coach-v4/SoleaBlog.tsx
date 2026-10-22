'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import type { CoachProfile } from '@/lib/coaches';

interface ArticleItem {
  date: string;
  title: string;
  href?: string;
}

const defaultArticles: ArticleItem[] = [
  {
    date: '۲۱ مهر ۱۴۰۵',
    title: 'بازگشت به کار پس از زایمان: راهنمای مدیریت تغییر هویت و احساس گناه مادران شاغل',
    href: '/blog',
  },
  {
    date: '۱ آبان ۱۴۰۵',
    title: 'چگونه بدون فریاد و تنش با فرزند نوجوان‌مان گفتگوی موثر داشته باشیم؟',
    href: '/blog',
  },
  {
    date: '۱۲ آبان ۱۴۰۵',
    title: 'رهایی از تله کمال‌گرایی: آیا من مادری به اندازه کافی خوب هستم؟',
    href: '/blog',
  },
  {
    date: '۲۵ آبان ۱۴۰۵',
    title: 'ساختن مرزهای سالم شخصی در روابط خانوادگی، عاطفی و کاری',
    href: '/blog',
  },
  {
    date: '۱۰ آذر ۱۴۰۵',
    title: 'تخلیه بار ذهنی مادران: گام نخست برای بازیابی انرژی و آرامش درون',
    href: '/blog',
  },
  {
    date: '۲۲ آذر ۱۴۰۵',
    title: 'کوچینگ فردی چیست و چه تفاوتی با روان‌درمانی و مشاوره دارد؟',
    href: '/blog',
  },
];

interface SoleaBlogProps {
  coach?: CoachProfile;
}

export const SoleaBlog: React.FC<SoleaBlogProps> = ({ coach }) => {
  const articles: ArticleItem[] = (coach?.articles && coach.articles.length > 0)
    ? [
        ...coach.articles.map((a) => ({
          date: a.date,
          title: a.title,
          href: a.href || '/blog',
        })),
        ...defaultArticles.slice(coach.articles.length),
      ].slice(0, 6)
    : defaultArticles;

  return (
    <section id="blog" className="w-full bg-[#2b544e] py-20 lg:py-28 text-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        
        {/* Section Heading with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="pb-14"
        >
          <h2 className="font-serif text-3xl font-normal leading-[1.38] sm:leading-[1.35] lg:leading-[1.32] text-white sm:text-4xl lg:text-5xl">
            تازه‌ترین یادداشت‌ها
            <br />
            و مقالات تخصصی
          </h2>
        </motion.div>

        {/* 6 Cards Grid (3 columns on desktop) with Staggered Entrance */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.6,
                delay: (idx % 3) * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
              className="flex flex-col justify-between rounded-[2rem] bg-white p-8 text-[#1e1e1e] shadow-xl transition-shadow hover:shadow-2xl"
            >
              <div>
                {/* Date */}
                <div className="flex items-center gap-2 text-xs font-medium text-[#6b6b6b]">
                  <Calendar className="h-3.5 w-3.5 text-[#1f3d3a]" />
                  <span>{item.date}</span>
                </div>

                {/* Title */}
                <h3 className="mt-4 font-serif text-xl sm:text-[22px] font-normal leading-[1.48] text-[#1e1e1e]">
                  {item.title}
                </h3>
              </div>

              {/* Read More Button */}
              <div className="mt-8 border-t border-black/10 pt-6">
                <Link
                  href={item.href || '/blog'}
                  className="inline-flex items-center justify-center rounded-full border border-black/15 px-6 py-2.5 text-xs font-semibold tracking-wider text-[#1f3d3a] transition-all hover:border-[#1f3d3a] hover:bg-[#f2f7f6] hover:text-[#1f3d3a] active:scale-98"
                >
                  مطالعه مقاله
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
