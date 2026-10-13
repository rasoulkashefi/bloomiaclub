'use client';

import React from 'react';
import { Coach } from '@/lib/coaches';
import { CheckCircle2 } from 'lucide-react';

export function CoachFitV2({ coach }: { coach: Coach }) {
  const checkItems = [
    'احساس میکنی در یک دوراهی مهم گیر کردی',
    'میخواهی مسیر شغلی‌ات را عوض کنی ولی نمیدونی از کجا شروع کنی',
    'در تصمیم‌گیری کلان اعتماد کافی نداری',
    'دنبال یک برنامه عملی هستی تا یک قدم جلو بری',
    'میخوای اعتمادبه‌نفست رو دوباره بسازی'
  ];

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Card / Image Area */}
          <div className="bg-brand-surface-muted rounded-3xl p-8 md:p-10 aspect-[4/5] flex items-end relative overflow-hidden order-1 md:order-2">
            {/* Subtle botanical decorative SVG */}
            <svg 
              className="absolute top-0 right-0 w-32 h-32 opacity-10 rtl:scale-x-[-1] text-brand-teal-900" 
              viewBox="0 0 100 100" 
              fill="currentColor"
            >
              <path d="M50 0C50 27.6142 27.6142 50 0 50C27.6142 50 50 72.3858 50 100C50 72.3858 72.3858 50 100 50C72.3858 50 50 27.6142 50 0Z" />
            </svg>
            
            <div className="relative z-10">
              <p className="text-3xl md:text-4xl font-bold text-brand-neutral-900 leading-relaxed italic">
                انتخاب‌های بهتر<br />رویاهای بزرگ‌تر
              </p>
            </div>
          </div>

          {/* Checklist Area */}
          <div className="order-2 md:order-1">
            <h2 className="text-xl md:text-2xl font-bold text-brand-neutral-900 mb-6">
              شاید این کوچ برای تو مناسب باشد اگر..
            </h2>
            
            <ul className="space-y-2">
              {checkItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3 py-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-teal-900 mt-0.5 shrink-0" />
                  <span className="text-brand-neutral-600 text-base leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
