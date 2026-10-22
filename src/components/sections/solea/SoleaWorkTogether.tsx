'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Flower2, Compass, Crown } from 'lucide-react';

interface ServiceItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  ctaText: string;
}

const services: ServiceItem[] = [
  {
    icon: <Flower2 className="h-10 w-10 text-[#bb7462]" strokeWidth={1.5} />,
    title: 'Inner Alignment',
    description: 'Gain clear direction and purposeful next steps',
    ctaText: 'Book a Call',
  },
  {
    icon: <Compass className="h-10 w-10 text-[#bb7462]" strokeWidth={1.5} />,
    title: 'Clarity shapes',
    description: 'Clear direction, purposeful growth, aligned next steps.',
    ctaText: 'Book a Call',
  },
  {
    icon: <Crown className="h-10 w-10 text-[#bb7462]" strokeWidth={1.5} />,
    title: 'Feminine Leadership',
    description: 'Create clarity and focus in your life without pressure.',
    ctaText: 'Book a Call',
  },
];

export const SoleaWorkTogether: React.FC = () => {
  return (
    <section id="services" className="w-full bg-white py-20 lg:py-[120px] text-[#3f2a24] overflow-hidden">
      <div className="mx-auto max-w-[1360px] px-6 sm:px-10 lg:px-[30px]">
        
        {/* Centered Heading with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <h2 className="font-serif text-4xl font-normal text-[#3f2a24] sm:text-5xl lg:text-6xl">
            How we work<br />
            Together
          </h2>
        </motion.div>

        {/* 3 Peach Service Cards with Staggered Entrance */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {services.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.65,
                delay: idx * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
              className="group flex flex-col items-center rounded-[2rem] bg-[#ffefd9] p-8 text-center shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)] sm:p-10"
            >
              {/* Service Icon Container */}
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/70 shadow-sm transition-transform duration-300 group-hover:scale-110">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="font-serif text-2xl font-normal text-[#3f2a24] sm:text-3xl">
                {item.title}
              </h3>

              {/* Description */}
              <p className="mt-4 flex-1 text-sm leading-relaxed text-[#606060] sm:text-base">
                {item.description}
              </p>

              {/* Action Button */}
              <div className="mt-8">
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full bg-[#bb7462] px-7 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-all duration-200 hover:bg-[#a66252] hover:shadow-md"
                >
                  {item.ctaText}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
