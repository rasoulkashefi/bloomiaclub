'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Flower2, Compass, Crown } from 'lucide-react';
import type { CoachProfile } from '@/lib/coaches';

interface ServiceItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  ctaText: string;
}

interface SoleaWorkTogetherProps {
  coach?: CoachProfile;
}

export const SoleaWorkTogether: React.FC<SoleaWorkTogetherProps> = ({ coach }) => {
  const bookingLink = coach?.bookingUrl || 'https://atyno.com/fatemeh/zero';

  const services: ServiceItem[] = [
    {
      icon: <Flower2 className="h-10 w-10 text-[#1f3d3a]" strokeWidth={1.5} />,
      title: 'والدگری آگاهانه و آرامش مادری',
      description: 'رهایی از کمال‌گرایی و احساس گناه، شناخت نیازهای واقعی خود و ساختن ارتباطی امن و بالنده با فرزندان.',
      ctaText: 'رزرو جلسه معارفه',
    },
    {
      icon: <Compass className="h-10 w-10 text-[#1f3d3a]" strokeWidth={1.5} />,
      title: 'خودشناسی و آرامش درونی',
      description: 'شنیدن صدای واقعی درون، تعیین مرزهای سالم در روابط و کار، و بازیابی اعتمادبه‌نفس و سرزندگی.',
      ctaText: 'رزرو جلسه معارفه',
    },
    {
      icon: <Crown className="h-10 w-10 text-[#1f3d3a]" strokeWidth={1.5} />,
      title: 'کوچینگ نوجوان و مهارت ارتباطی',
      description: 'مهار تعارض‌های والد و فرزندی، درک زبان و احساسات نوجوان، و برقراری گفتگوی بدون قضاوت و تنش.',
      ctaText: 'رزرو جلسه معارفه',
    },
  ];

  return (
    <section id="services" className="w-full bg-white py-20 lg:py-[120px] text-[#1e1e1e] overflow-hidden">
      <div className="mx-auto max-w-[1360px] px-6 sm:px-10 lg:px-[30px]">
        
        {/* Centered Heading with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <h2 className="font-serif text-3xl font-normal leading-[1.38] sm:leading-[1.35] lg:leading-[1.32] text-[#1e1e1e] sm:text-4xl lg:text-5xl">
            چگونه در کنار هم
            <br />
            مسیر را می‌سازیم
          </h2>
        </motion.div>

        {/* 3 Service Cards with Staggered Entrance */}
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
              className="group flex flex-col items-center rounded-[2rem] bg-[#f2f7f6] p-8 text-center shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)] sm:p-10"
            >
              {/* Service Icon Container */}
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/80 shadow-sm transition-transform duration-300 group-hover:scale-110">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="font-serif text-2xl font-normal leading-[1.38] text-[#1e1e1e] sm:text-[26px]">
                {item.title}
              </h3>

              {/* Description */}
              <p className="mt-4 flex-1 text-sm leading-[1.8] text-[#6b6b6b] sm:text-base">
                {item.description}
              </p>

              {/* Action Button */}
              <div className="mt-8 sm:mt-10">
                <a
                  href={bookingLink}
                  target={coach?.bookingUrl ? '_blank' : undefined}
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-[#1f3d3a] px-7 py-3 text-xs font-semibold tracking-wider text-white shadow-sm transition-all duration-200 hover:bg-[#2b544e] hover:shadow-md"
                >
                  {item.ctaText}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
