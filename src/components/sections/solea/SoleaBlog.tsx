'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

interface ArticleItem {
  date: string;
  title: string;
}

const articles: ArticleItem[] = [
  { date: 'Jan 1, 2026', title: 'Finding clarity without Overwhelm' },
  { date: 'Feb 1, 2026', title: 'Choosing clarity over Overwhelm' },
  { date: 'Mar 2, 2026', title: 'Finding focus without The stress' },
  { date: 'Apr 3, 2026', title: 'Focus that honors your Energy' },
  { date: 'May 5, 2026', title: 'Grounded focus, soft Power' },
  { date: 'Jun 6, 2026', title: 'Clarity that feels like Peace' },
];

export const SoleaBlog: React.FC = () => {
  return (
    <section id="blog" className="w-full bg-[#9c77b9] py-20 lg:py-28 text-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        
        {/* Section Heading with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="pb-14"
        >
          <h2 className="font-serif text-4xl font-normal text-white sm:text-5xl lg:text-6xl">
            Industry news<br />
            Inside
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
              className="flex flex-col justify-between rounded-[2rem] bg-white p-8 text-[#3f2a24] shadow-xl transition-shadow hover:shadow-2xl"
            >
              <div>
                {/* Date */}
                <div className="flex items-center gap-2 text-xs font-medium text-[#606060]">
                  <Calendar className="h-3.5 w-3.5 text-[#bb7462]" />
                  <span>{item.date}</span>
                </div>

                {/* Title */}
                <h3 className="mt-4 font-serif text-2xl font-normal leading-snug text-[#3f2a24]">
                  {item.title}
                </h3>
              </div>

              {/* Read More Button */}
              <div className="mt-8 border-t border-black/10 pt-6">
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full border border-black/15 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#3f2a24] transition-all hover:border-[#bb7462] hover:bg-[#ffefd9] hover:text-[#bb7462] active:scale-98"
                >
                  Read More
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
