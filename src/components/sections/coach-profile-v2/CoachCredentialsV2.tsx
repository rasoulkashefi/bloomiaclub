import React from 'react';
import { Award, GraduationCap, Clock, Users2 } from 'lucide-react';
import type { Coach } from '@/lib/coaches';

export const CoachCredentialsV2 = ({ coach }: { coach: Coach }) => {
  // TODO: Conditional rendering based on coach data
  // if (!coach.credentials) return null;
  
  return (
    <section className="bg-white py-14 md:py-20" dir="rtl">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-xl md:text-2xl font-bold text-brand-neutral-900 mb-8">
          تجربه و تخصص
        </h2>
        
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3 py-3">
            <Award className="w-5 h-5 text-brand-teal-900 flex-shrink-0" />
            <span className="text-brand-neutral-600 text-sm md:text-base">ICF Certified Coach</span>
          </div>
          <div className="flex items-center gap-3 py-3">
            <GraduationCap className="w-5 h-5 text-brand-teal-900 flex-shrink-0" />
            <span className="text-brand-neutral-600 text-sm md:text-base">M.Sc. Psychology</span>
          </div>
          <div className="flex items-center gap-3 py-3">
            <Clock className="w-5 h-5 text-brand-teal-900 flex-shrink-0" />
            <span className="text-brand-neutral-600 text-sm md:text-base">8+ years coaching experience</span>
          </div>
          <div className="flex items-center gap-3 py-3">
            <Users2 className="w-5 h-5 text-brand-teal-900 flex-shrink-0" />
            <span className="text-brand-neutral-600 text-sm md:text-base">Member of International Coach Federation</span>
          </div>
        </div>
      </div>
    </section>
  );
};
