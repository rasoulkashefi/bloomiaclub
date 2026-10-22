'use client';

import React, { useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { SoleaConsultationBanner } from './SoleaConsultationBanner';

interface Project {
  title: string;
  subtitle: string;
  stat1: { value: string; label: string };
  stat2: { value: string; label: string };
  stat3: { value: string; label: string };
  image: string;
}

const projects: Project[] = [
  {
    title: 'Feminine brand Elevation',
    subtitle: 'Transforming influence into a memorable digital presence',
    stat1: { value: '42%', label: 'Coaching inquiries' },
    stat2: { value: '1.5K', label: 'Visitors per month' },
    stat3: { value: '3X', label: 'Social engagement' },
    image: '/images/solea/img_5.png',
  },
  {
    title: 'Personal brand Glow-Up',
    subtitle: 'Designing a platform that reflects her personality and purpose',
    stat1: { value: '2X', label: 'Program sign-ups' },
    stat2: { value: '1.2K', label: 'Visitors per month' },
    stat3: { value: '80%', label: 'Returning users' },
    image: '/images/solea/img_6.png',
  },
  {
    title: 'Growth without Burnout',
    subtitle: 'A calm, results-driven space for sustainable personal and business growth.',
    stat1: { value: '2X', label: 'Program sign-ups' },
    stat2: { value: '1.5K', label: 'Visitors per month' },
    stat3: { value: '90%', label: 'Returning users' },
    image: '/images/solea/img_7.png',
  },
];

export const SoleaRecentProjects: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      skipSnaps: false,
    },
    [
      Autoplay({
        delay: 3500,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section id="projects" className="w-full bg-[#9c77b9] py-20 lg:py-[120px] text-white overflow-hidden">
      <div className="mx-auto max-w-[1360px] px-6 sm:px-10 lg:px-[30px]">
        
        {/* Section Header with Carousel Navigation & Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-end justify-between pb-12"
        >
          <h2 className="font-serif text-4xl font-normal text-white sm:text-5xl lg:text-6xl">
            My recent<br />
            Project
          </h2>

          {/* Carousel Next/Prev Controls */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={scrollPrev}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-white transition-all hover:bg-white hover:text-[#9c77b9] active:scale-95"
              aria-label="Previous Project"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-white transition-all hover:bg-white hover:text-[#9c77b9] active:scale-95"
              aria-label="Next Project"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </motion.div>

        {/* Embla Carousel Viewport */}
        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex -ml-6">
            {projects.map((proj, idx) => (
              <div
                key={idx}
                className="min-w-0 flex-[0_0_100%] pl-6 md:flex-[0_0_50%]"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex flex-col justify-between overflow-hidden rounded-[2.5rem] bg-white p-8 text-[#3f2a24] shadow-xl sm:p-10 h-full"
                >
                  <div>
                    <h3 className="font-serif text-2xl font-normal text-[#3f2a24] sm:text-3xl">
                      {proj.title}
                    </h3>
                    <p className="mt-2 text-sm text-[#606060]">
                      {proj.subtitle}
                    </p>

                    {/* Stats Row */}
                    <div className="my-8 grid grid-cols-3 gap-4 border-y border-black/10 py-6 text-center">
                      <div>
                        <span className="block font-serif text-2xl font-bold text-[#3f2a24] sm:text-3xl">
                          {proj.stat1.value}
                        </span>
                        <span className="mt-1 block text-xs text-[#606060]">
                          {proj.stat1.label}
                        </span>
                      </div>
                      <div>
                        <span className="block font-serif text-2xl font-bold text-[#3f2a24] sm:text-3xl">
                          {proj.stat2.value}
                        </span>
                        <span className="mt-1 block text-xs text-[#606060]">
                          {proj.stat2.label}
                        </span>
                      </div>
                      <div>
                        <span className="block font-serif text-2xl font-bold text-[#3f2a24] sm:text-3xl">
                          {proj.stat3.value}
                        </span>
                        <span className="mt-1 block text-xs text-[#606060]">
                          {proj.stat3.label}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Photo with subtle hover zoom */}
                  <div className="relative h-56 sm:h-64 w-full overflow-hidden rounded-2xl">
                    <Image
                      src={proj.image}
                      alt={proj.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Book your free Clarity consultation Banner Card */}
        <SoleaConsultationBanner />

      </div>
    </section>
  );
};
