'use client';

import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Star } from 'lucide-react';
import type { Coach } from '@/lib/coaches';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'مریم',
    quote: 'بعد از چند جلسه بالاخره توانستم بفهمم دقیقاً از مسیر شغلی‌ام چه می‌خواهم. این مسیر برای من خیلی ارزشمند بود.',
    rating: 5,
  },
  {
    id: 2,
    name: 'سارا',
    quote: 'کوچ من بدون قضاوت گوش داد و کمک کرد خودم جواب‌هایم را پیدا کنم. تجربه‌ای متفاوت از هر مشاوره‌ای که قبلاً داشتم.',
    rating: 5,
  },
  {
    id: 3,
    name: 'نیلوفر',
    quote: 'اعتماد به نفسم در تصمیم‌گیری حرفه‌ای خیلی بیشتر شد. الان با اطمینان بیشتری قدم برمی‌دارم.',
    rating: 5,
  }
];

const toPersianDigits = (n: number) => String(n).replace(/[0-9]/g, d => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d, 10)]);

export const CoachTestimonialsV2 = ({ coach }: { coach: Coach }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const currentTestimonial = TESTIMONIALS[currentIndex];

  return (
    <section className="bg-brand-surface py-16 md:py-24" dir="rtl">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-brand-neutral-900 text-center mb-10 md:mb-14">
          کسانی که این مسیر را تجربه‌کرده‌اند
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Image Placeholder (Right side on RTL) */}
          <div className="order-1 md:order-2 bg-brand-surface-muted rounded-2xl aspect-[4/3] flex items-center justify-center relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-tr from-brand-teal-50 to-brand-surface-muted opacity-50" />
             <div className="text-center z-10">
               <h3 className="text-2xl md:text-3xl font-bold text-brand-teal-900 leading-snug whitespace-pre-line">
                 {'تغییر\nاز اینجا\nشروع می‌شود'}
               </h3>
             </div>
          </div>

          {/* Content (Left side on RTL) */}
          <div className="order-2 md:order-1 flex flex-col justify-between min-h-[250px]">
            <div className="transition-all duration-300 ease-in-out">
              <div className="flex gap-1 mb-6 text-amber-500">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <blockquote className="text-base md:text-lg text-brand-neutral-600 leading-relaxed relative">
                <span className="absolute -right-4 -top-2 text-4xl text-brand-surface-border">"</span>
                {currentTestimonial.quote}
              </blockquote>
              <div className="text-sm font-semibold text-brand-neutral-900 mt-6">
                {currentTestimonial.name}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-4 mt-10">
              <button 
                onClick={nextSlide}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-brand-surface-border text-brand-neutral-600 hover:bg-white hover:text-brand-teal-900 transition-colors"
                aria-label="بعدی"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="text-sm font-medium text-brand-neutral-600">
                {toPersianDigits(currentIndex + 1)} / {toPersianDigits(TESTIMONIALS.length)}
              </div>
              <button 
                onClick={prevSlide}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-brand-surface-border text-brand-neutral-600 hover:bg-white hover:text-brand-teal-900 transition-colors"
                aria-label="قبلی"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
