'use client';

import React, { useState, useEffect } from 'react';
import { Coach } from '@/lib/coaches';
import { Star } from 'lucide-react';

interface StickyBookingBarV2Props {
  coach: Coach;
}

export function StickyBookingBarV2({ coach }: StickyBookingBarV2Props) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const sentinel = document.getElementById('coach-hero-sentinel');
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show bar when sentinel is NOT intersecting (scrolled past hero)
        setIsVisible(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(sentinel);

    return () => {
      observer.unobserve(sentinel);
      observer.disconnect();
    };
  }, []);

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      {/* Desktop Version */}
      <div className="hidden md:block w-full bg-white/95 backdrop-blur-md border-t border-brand-surface-border shadow-soft">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-semibold text-brand-neutral-900">{coach.name}</span>
            <span className="text-brand-neutral-600 text-sm">·</span>
            <span className="text-sm text-brand-neutral-600">تهران · آنلاین</span>
            <span className="text-brand-neutral-600 text-sm">·</span>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span className="text-sm text-brand-neutral-600">{coach.rating}</span>
            </div>
          </div>
          
          <a 
            href={coach.bookingUrl || '#booking'}
            className="bg-brand-teal-900 hover:bg-brand-teal-700 text-white rounded-full px-6 py-2.5 text-sm font-semibold transition-colors shadow-sm"
          >
            رزرو جلسه صفر رایگان
          </a>
        </div>
      </div>

      {/* Mobile Version */}
      <div className="md:hidden w-full bg-white border-t border-brand-surface-border px-4 py-3 pb-safe">
        <div className="text-xs text-brand-neutral-600 mb-2 text-center">
          <span className="font-semibold text-brand-neutral-900">{coach.name}</span>
          <span className="mx-1">·</span>
          <span>تهران · آنلاین</span>
        </div>
        <a 
          href={coach.bookingUrl || '#booking'}
          className="block w-full bg-brand-teal-900 text-white rounded-full py-3 text-sm font-semibold text-center transition-colors shadow-sm"
        >
          رزرو جلسه صفر رایگان
        </a>
      </div>
    </div>
  );
}
