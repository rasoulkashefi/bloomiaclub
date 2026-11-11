'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { coachFaqs } from '@/data/coachFaqs';

export const CoachFaqSection: React.FC = () => {
  const [openIndices, setOpenIndices] = useState<Set<number>>(() => new Set([0]));

  const handleToggle = (idx: number, isOpen: boolean) => {
    setOpenIndices((prev) => {
      if (prev.has(idx) === isOpen) return prev;
      const next = new Set(prev);
      if (isOpen) {
        next.add(idx);
      } else {
        next.delete(idx);
      }
      return next;
    });
  };

  return (
    <section className="py-16 md:py-24 bg-brand-surface-paper border-t border-brand-surface-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-teal-50 border border-brand-teal-200/60 text-brand-teal-900 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5 text-brand-teal-700" aria-hidden="true" />
            <span>راهنمای همراهی با کوچ</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-neutral-900 tracking-tight">
            پرسش‌های متداول درباره انتخاب کوچ
          </h2>
          <p className="text-sm sm:text-base text-brand-neutral-600 leading-relaxed">
            پاسخ به سوالات پرتکرار شما درباره فرآیند انتخاب، جلسه معارفه و تضمین کیفیت بلومیا.
          </p>
        </div>

        <div className="space-y-4">
          {coachFaqs.map((faq, idx) => (
            <details
              key={idx}
              open={openIndices.has(idx)}
              onToggle={(e) => handleToggle(idx, e.currentTarget.open)}
              className="bl-faq-details group bg-brand-surface rounded-2xl border border-brand-neutral-200/80 shadow-soft-sm overflow-hidden open:border-brand-teal-300 transition-colors"
            >
              <summary className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-right font-bold text-sm sm:text-base text-brand-neutral-900 hover:text-brand-teal-900 transition-colors min-h-[44px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal-900/30 rounded-2xl">
                <span>{faq.question}</span>
                <ChevronDown
                  className="w-5 h-5 text-brand-neutral-400 group-hover:text-brand-teal-800 transition-transform duration-200 group-open:rotate-180 shrink-0"
                  aria-hidden="true"
                />
              </summary>
              <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-brand-neutral-600 leading-relaxed border-t border-brand-neutral-100/80 pt-4">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};
