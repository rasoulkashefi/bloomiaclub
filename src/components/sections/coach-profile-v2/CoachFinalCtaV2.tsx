import React from 'react';
import { CalendarCheck } from 'lucide-react';
import type { Coach } from '@/lib/coaches';

export const CoachFinalCtaV2 = ({ coach }: { coach: Coach }) => {
  const bookingLink = coach.bookingUrl || '#booking';
  
  return (
    <section className="bg-brand-teal-900 py-16 md:py-24" dir="rtl">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          شاید وقت یک قدم تازه رسیده باشد.
        </h2>
        <p className="text-white/80 text-base md:text-lg mt-4 leading-relaxed max-w-2xl mx-auto">
          با یک جلسه کوتاه شروع کن و ببین آیا این مسیر برای تو مناسب است
        </p>
        
        <a 
          href={bookingLink}
          className="bg-white text-brand-teal-900 hover:bg-brand-teal-50 rounded-full px-8 py-3.5 text-base font-semibold mt-8 inline-flex items-center gap-2 transition-colors"
        >
          <CalendarCheck className="w-5 h-5" />
          <span>رزرو جلسه صفر رایگان</span>
        </a>
      </div>
    </section>
  );
};
