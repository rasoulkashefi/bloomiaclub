import React from 'react';
import { Coach } from '@/lib/coaches';

export function CoachSpecialtiesV2({ coach }: { coach: Coach }) {
  if (!coach.specialties || coach.specialties.length === 0) return null;

  return (
    <section className="bg-brand-surface py-14 md:py-20">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-brand-neutral-900 text-center">
          در چه مسیرهایی همراهت هستم؟
        </h2>
        
        <div className="flex flex-wrap justify-center gap-3 mt-8 md:mt-10">
          {coach.specialties.map((specialty, idx) => (
            <span 
              key={idx}
              className="bg-brand-teal-50 text-brand-teal-900 rounded-full px-5 py-2.5 text-sm md:text-base font-medium transition-colors hover:bg-brand-teal-100"
            >
              {specialty}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
