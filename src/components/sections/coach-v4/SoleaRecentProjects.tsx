'use client';

import React, { useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { SoleaConsultationBanner } from './SoleaConsultationBanner';
import type { CoachProfile } from '@/lib/coaches';

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
    title: 'رهایی از فرسودگی و بازیابی آرامش',
    subtitle: 'تبدیل روزمرگی پرتنش مادری به زندگی سرشار از نظم، حضور قلب و رضایت',
    stat1: { value: '۸۵٪', label: 'کاهش اضطراب روزمره' },
    stat2: { value: '۱۲۰+', label: 'ساعت تجربه همراهی' },
    stat3: { value: '۳ برابر', label: 'رضایت از تعادل نقش‌ها' },
    image: '/images/solea/img_5.png',
  },
  {
    title: 'پیوند دوباره با فرزند نوجوان',
    subtitle: 'مهار تعارض‌های خانوادگی و ساختن گفتگوی امن، شنونده و بدون قضاوت',
    stat1: { value: '۹۰٪', label: 'بهبود ارتباط عاطفی' },
    stat2: { value: '۶ هفته', label: 'طول دوره تا تحول' },
    stat3: { value: '۱۰۰٪', label: 'گفتگوی بدون فریاد' },
    image: '/images/solea/img_6.png',
  },
  {
    title: 'بازگشت به کار بدون عذاب وجدان',
    subtitle: 'طراحی اولویت‌های شفاف برای مادر شاغل و تعیین مرزهای سالم شخصی',
    stat1: { value: '۲ برابر', label: 'تمرکز و بازدهی' },
    stat2: { value: '۴ هفته', label: 'تثبیت مرزهای کاری' },
    stat3: { value: '۹۵٪', label: 'آرامش درونی مادر' },
    image: '/images/solea/img_7.png',
  },
];

interface SoleaRecentProjectsProps {
  coach?: CoachProfile;
}

export const SoleaRecentProjects: React.FC<SoleaRecentProjectsProps> = ({ coach }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      skipSnaps: false,
      direction: 'rtl',
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
    <section id="projects" className="w-full bg-[#2b544e] py-20 lg:py-[120px] text-white overflow-hidden">
      <div className="mx-auto max-w-[1360px] px-6 sm:px-10 lg:px-[30px]">
        
        {/* Section Header with Carousel Navigation & Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-end justify-between pb-12"
        >
          <h2 className="font-serif text-3xl font-normal leading-[1.38] sm:leading-[1.35] lg:leading-[1.32] text-white sm:text-4xl lg:text-5xl">
            مسیرهای موفقیت
            <br />
            مراجعان من
          </h2>

          {/* Carousel Next/Prev Controls */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={scrollPrev}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-white transition-all hover:bg-white hover:text-[#1f3d3a] active:scale-95"
              aria-label="داستان قبلی"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-white transition-all hover:bg-white hover:text-[#1f3d3a] active:scale-95"
              aria-label="داستان بعدی"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          </div>
        </motion.div>

        {/* Embla Carousel Viewport */}
        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex -ms-6">
            {projects.map((proj, idx) => (
              <div
                key={idx}
                className="min-w-0 flex-[0_0_100%] ps-6 md:flex-[0_0_50%]"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex flex-col justify-between overflow-hidden rounded-[2.5rem] bg-white p-8 text-[#1e1e1e] shadow-xl sm:p-10 h-full"
                >
                  <div>
                    <h3 className="font-serif text-2xl font-normal leading-[1.38] text-[#1e1e1e] sm:text-[26px]">
                      {proj.title}
                    </h3>
                    <p className="mt-3 text-sm leading-[1.75] text-[#6b6b6b]">
                      {proj.subtitle}
                    </p>

                    {/* Stats Row */}
                    <div className="my-8 grid grid-cols-3 gap-4 border-y border-black/10 py-6 text-center">
                      <div>
                        <span className="block font-serif text-2xl font-bold text-[#1e1e1e] sm:text-3xl">
                          {proj.stat1.value}
                        </span>
                        <span className="mt-1 block text-xs text-[#6b6b6b]">
                          {proj.stat1.label}
                        </span>
                      </div>
                      <div>
                        <span className="block font-serif text-2xl font-bold text-[#1e1e1e] sm:text-3xl">
                          {proj.stat2.value}
                        </span>
                        <span className="mt-1 block text-xs text-[#6b6b6b]">
                          {proj.stat2.label}
                        </span>
                      </div>
                      <div>
                        <span className="block font-serif text-2xl font-bold text-[#1e1e1e] sm:text-3xl">
                          {proj.stat3.value}
                        </span>
                        <span className="mt-1 block text-xs text-[#6b6b6b]">
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
        <SoleaConsultationBanner coach={coach} />

      </div>
    </section>
  );
};
