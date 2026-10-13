'use client';

import React, { useState } from 'react';
import { Coach } from '@/lib/coaches';

export function CoachAboutV2({ coach }: { coach: Coach }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const text = coach.longDescription || coach.description || '';
  
  const maxLength = 300;
  const isLong = text.length > maxLength;
  const displayText = !isExpanded && isLong ? `${text.slice(0, maxLength)}...` : text;

  return (
    <section className="bg-white py-16 md:py-24 border-b border-brand-surface-border">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-brand-neutral-900 mb-6">
          من اینجا هستم تا...
        </h2>
        <div className="text-brand-neutral-600 text-base md:text-lg leading-[2] md:leading-[2.2] whitespace-pre-wrap">
          {displayText}
        </div>
        
        {isLong && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-6 text-brand-teal-900 font-bold hover:text-brand-teal-700 transition-colors flex items-center gap-2"
          >
            {isExpanded ? 'بستن' : 'بیشتر درباره من'}
            <span className="rtl:rotate-180">
              {isExpanded ? '↑' : '←'}
            </span>
          </button>
        )}
      </div>
    </section>
  );
}
