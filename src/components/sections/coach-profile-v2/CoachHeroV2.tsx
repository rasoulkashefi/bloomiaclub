'use client';

import React from 'react';
import { Coach } from '@/lib/coaches';
import { Calendar, ArrowLeft, Star } from 'lucide-react';

interface CoachHeroV2Props {
  coach: Coach;
}

const toPersianDigits = (n: number | string) => 
  String(n).replace(/[0-9]/g, d => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d, 10)]);

export function CoachHeroV2({ coach }: CoachHeroV2Props) {
  // Fallbacks for display if data is missing
  const sessionsCount = coach.totalSessions > 0 ? toPersianDigits(coach.totalSessions) : '۹۵۰';
  const reviewsCount = coach.totalReviews > 0 ? toPersianDigits(coach.totalReviews) : '۳۱۰';
  const ratingValue = coach.rating > 0 ? toPersianDigits(coach.rating) : '۴.۹';

  return (
    <section className="w-full bg-brand-surface relative pb-16 md:pb-24 pt-12 md:pt-20 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center relative z-10">
          
          {/* 1. TEXT COLUMN (Right in RTL) */}
          <div className="md:col-span-6 lg:col-span-5 lg:col-start-2 flex flex-col items-start space-y-6 md:space-y-8">
            
            {/* Top Badge */}
            <div className="flex items-center gap-2 bg-brand-surface-muted border border-brand-surface-border/60 rounded-full px-3 py-1.5">
              <span className="w-1.5 h-1.5 bg-brand-teal-900 rounded-full opacity-60" />
              <span className="text-xs font-medium text-brand-neutral-600">کوچ حرفه‌ای بلومیا</span>
            </div>
            
            {/* Headings */}
            <div className="space-y-3 md:space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-[72px] font-extrabold text-brand-neutral-900 leading-tight">
                {coach.name}
              </h1>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-brand-teal-900/90">
                {coach.title}
              </h2>
            </div>
            
            {/* Bio */}
            <p className="text-brand-neutral-600 text-base md:text-lg leading-[2] md:leading-[2.2] max-w-lg">
              {coach.description}
            </p>
            
            {/* Stats Pill */}
            <div className="flex items-center gap-3 md:gap-5 bg-white/60 backdrop-blur-sm border border-brand-surface-border/50 rounded-full px-5 py-2.5 text-xs md:text-sm text-brand-neutral-600 shadow-sm w-full md:w-auto overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="w-2 h-2 bg-emerald-600 rounded-full" />
                <span>آنلاین</span>
              </div>
              
              <span className="text-brand-surface-border/80 shrink-0">|</span>
              
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="font-bold text-brand-neutral-900">+{sessionsCount}</span>
                <span>جلسه</span>
              </div>
              
              <span className="text-brand-surface-border/80 shrink-0">|</span>
              
              <div className="flex items-center gap-1.5 shrink-0">
                <span>({reviewsCount} نظر)</span>
                <span className="font-bold text-brand-neutral-900 ml-1">{ratingValue}</span>
                <Star className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 w-full sm:w-auto">
              <a 
                href={coach.bookingUrl || '#booking'} 
                className="w-full sm:w-auto bg-brand-teal-900 hover:bg-brand-teal-700 text-white rounded-full px-7 py-3.5 text-sm md:text-base font-semibold transition-all flex items-center justify-center gap-2 shadow-soft hover:shadow-md"
              >
                <Calendar className="w-5 h-5" />
                <span>رزرو جلسه صفر رایگان</span>
              </a>
              <a 
                href="#services" 
                className="w-full sm:w-auto bg-transparent border border-brand-surface-border hover:bg-white text-brand-neutral-900 rounded-full px-7 py-3.5 text-sm md:text-base font-medium transition-all flex items-center justify-center gap-2"
              >
                <span>مشاهده پکیج‌ها</span>
                <ArrowLeft className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* 2. IMAGE COLUMN (Left in RTL) */}
          <div className="md:col-span-6 lg:col-span-5 relative flex justify-center md:justify-end mt-12 md:mt-0">
            
            {/* SVG Definitions for Custom Masks */}
            <svg style={{ width: 0, height: 0, position: 'absolute' }} aria-hidden="true">
              <defs>
                <clipPath id="coach-blob-mask" clipPathUnits="objectBoundingBox">
                  <path d="M 0.15 0.05 
                           C 0.5 0.0, 0.8 0.05, 0.9 0.15 
                           C 0.98 0.4, 0.95 0.7, 0.85 0.95 
                           C 0.6 1.0, 0.3 1.0, 0.1 0.9 
                           C 0.0 0.8, 0.15 0.6, 0.18 0.5 
                           C 0.2 0.35, -0.05 0.15, 0.15 0.05 Z" />
                </clipPath>
              </defs>
            </svg>

            <div className="relative w-full max-w-[440px] aspect-[4/5] z-10">
              
              {/* Layer 1: Background Organic Blob (Warm Greige) */}
              <div 
                className="absolute -inset-4 md:-inset-8 -z-10 transition-transform duration-700"
                style={{ 
                  backgroundColor: '#EBE9E1', // Warm greige background color
                  borderRadius: '63% 37% 33% 67% / 46% 31% 69% 54%',
                  transform: 'rotate(-4deg) scale(1.02)'
                }}
              />

              {/* Decorative Subtle Leaf on Background Blob */}
              <div className="absolute -left-8 top-1/3 -z-10 text-[#d8d6cc] transform -rotate-12">
                <svg width="60" height="120" viewBox="0 0 60 120" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M30 120 C 30 80, 40 40, 20 0" />
                  <path d="M30 90 C 15 85, 5 70, 10 60 C 15 50, 30 70, 35 75" />
                  <path d="M35 60 C 50 55, 60 40, 55 30 C 50 20, 35 40, 30 45" />
                </svg>
              </div>

              {/* Layer 2: Foreground Image with Custom SVG Clip Path */}
              <div 
                className="w-full h-full relative z-10 shadow-soft"
                style={{ clipPath: 'url(#coach-blob-mask)' }}
              >
                {coach.imageUrl ? (
                  <img
                    src={coach.imageUrl}
                    alt={coach.name}
                    className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-[1.03]"
                  />
                ) : (
                  <div className="w-full h-full bg-brand-surface-muted flex items-center justify-center text-brand-neutral-600">
                    بدون تصویر
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* 3. DECORATIVE QUOTE (Far Left in RTL) */}
          <div className="hidden lg:flex lg:col-span-1 items-center justify-center opacity-70">
            <div className="transform -rotate-12 w-36 -translate-x-12">
              <p className="text-xl leading-[2.2] text-brand-neutral-600/90 whitespace-pre-line text-center italic" style={{ fontFamily: 'var(--font-vazirmatn), serif' }}>
                گاهی{'\n'}
                برای تغییر{'\n'}
                فقط به یک همراه{'\n'}
                نیاز داریم...
              </p>
              {/* Decorative scribble line */}
              <svg className="w-full mt-4 opacity-40 text-brand-neutral-500" viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 15 C 30 5, 70 5, 95 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>
          
        </div>
      </div>
      
      {/* Background Decorative Faint Elements */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[50%] bg-brand-teal-50/40 blur-[100px] rounded-full" />
      </div>

      <div id="coach-hero-sentinel" className="absolute bottom-0 w-full h-1 pointer-events-none opacity-0" />
    </section>
  );
}
