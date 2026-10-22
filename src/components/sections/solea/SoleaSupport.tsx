'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface SupportStep {
  number: string;
  title: string;
  description: string;
  image: string;
}

const steps: SupportStep[] = [
  {
    number: '01',
    title: 'Align and Understand',
    description: 'We begin by understanding your goals, challenges, and energy creating clarity and alignment from the start.',
    image: '/images/solea/support_step_1.png',
  },
  {
    number: '02',
    title: 'Clarify and Transform',
    description: 'We start by understanding your goals, challenges, and energy, creating clarity and alignment from day one.',
    image: '/images/solea/support_step_2.png',
  },
  {
    number: '03',
    title: 'Grow and Lead',
    description: 'We begin by understanding your goals, challenges, and energy creating clarity and alignment from the start.',
    image: '/images/solea/support_step_3.png',
  },
];

export const SoleaSupport: React.FC = () => {
  return (
    <section className="w-full bg-white py-20 lg:py-28 text-[#3f2a24]">
      <div className="mx-auto max-w-[1360px] px-6 sm:px-10 lg:px-[30px]">
        
        {/* Centered Heading with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <h2 className="font-serif text-[38px] sm:text-[48px] lg:text-[56px] font-normal leading-[1.18] text-[#3f2a24]">
            How I’m here to
            <br />
            Support you
          </h2>
        </motion.div>

        {/* Sticky Stacking Cards Container */}
        <div className="relative mt-16 lg:mt-20 pb-44 lg:pb-60 flex flex-col gap-8 lg:gap-10">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="sticky top-24 sm:top-28 lg:top-[120px] w-full"
              style={{ zIndex: idx + 10 }}
            >
              <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 rounded-[28px] bg-[#f5f5f5] p-8 sm:p-10 lg:py-12 lg:px-16 shadow-[0_12px_40px_rgba(0,0,0,0.06)] border border-black/[0.03]">
                
                {/* Left Text Column */}
                <div className="flex-1 max-w-[560px]">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#bb7462] font-serif text-xl font-bold text-white shadow-sm mb-6">
                    {step.number}
                  </div>
                  <h3 className="font-serif text-[32px] sm:text-[38px] lg:text-[44px] font-normal leading-[1.2] text-[#3f2a24]">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#606060]">
                    {step.description}
                  </p>
                </div>

                {/* Right Tilted Rounded Image Card */}
                <div className="relative w-full max-w-[280px] sm:max-w-[292px] h-[340px] sm:h-[356px] shrink-0 overflow-hidden rounded-[24px] shadow-[0_12px_35px_rgba(0,0,0,0.08)] transform rotate-[1.5deg] transition-transform duration-500 hover:rotate-0 hover:scale-105">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 320px"
                    priority={idx === 0}
                  />
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Ebook Download Banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 overflow-hidden rounded-[2.5rem] bg-[#bb7462] p-8 text-white shadow-xl sm:p-12 lg:p-16"
        >
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
            
            <div className="flex flex-col items-start lg:col-span-7">
              <h3 className="font-serif text-3xl font-normal leading-tight text-white sm:text-4xl lg:text-5xl">
                Start your growth<br />
                Journey here
              </h3>

              <p className="mt-4 max-w-lg text-base leading-relaxed text-white/90 sm:text-lg">
                A beautifully simple ebook designed to help you reconnect with clarity, let go of pressure, and build a routine that feels natural.
              </p>

              {/* Feature Checklist */}
              <ul className="mt-8 space-y-3.5 text-sm sm:text-base">
                <li className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20 text-white">
                    <Check className="h-4 w-4" />
                  </span>
                  <span>Practical daily alignment rituals</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20 text-white">
                    <Check className="h-4 w-4" />
                  </span>
                  <span>Mindset shifts to reduce decision fatigue</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20 text-white">
                    <Check className="h-4 w-4" />
                  </span>
                  <span>Actionable prompts for self-reflection</span>
                </li>
              </ul>

              <div className="mt-10">
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-[12px] bg-[#101010] px-8 py-4 text-[15px] font-medium text-white transition-all hover:bg-white hover:text-[#101010] active:scale-95"
                >
                  Download Free Ebook
                </Link>
              </div>
            </div>

            {/* Ebook Graphic Mockup */}
            <div className="relative flex items-center justify-center lg:col-span-5">
              <div className="relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[460px] aspect-square flex items-center justify-center">
                {/* Background Pattern */}
                <Image
                  src="/images/solea/ebook_graphic.svg"
                  alt="Ebook Background Pattern"
                  fill
                  className="object-contain opacity-90 rounded-[20px]"
                  sizes="(max-width: 1024px) 360px, 460px"
                />

                {/* 3D Book Cover Overlay */}
                <div className="relative w-[65%] h-[82%] shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-[12px] overflow-hidden transform -rotate-2 transition-transform duration-500 hover:rotate-0 hover:scale-105">
                  <Image
                    src="/images/solea/ebook_book.png"
                    alt="Start your growth Journey here Ebook"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 260px, 340px"
                  />
                </div>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};
