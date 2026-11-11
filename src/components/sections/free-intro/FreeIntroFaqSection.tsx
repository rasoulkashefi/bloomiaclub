import React from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { freeIntroFaqs } from '@/data/freeIntroFaqs';

export const FreeIntroFaqSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white border-t border-brand-surface-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-teal-50 border border-brand-teal-200/60 text-brand-teal-900 text-xs sm:text-sm font-semibold">
            <HelpCircle className="w-4 h-4 text-brand-teal-700" />
            <span>پاسخ به سوالات متداول</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-neutral-900 tracking-tight">
            پرسش‌های متداول درباره جلسه معارفه رایگان
          </h2>
          <p className="text-sm sm:text-base text-brand-neutral-600 max-w-xl mx-auto leading-relaxed">
            اگر سوال دیگری دارید، در جلسه معارفه می‌توانید تمام ابهامات خود را مستقیماً با کوچ در میان بگذارید.
          </p>
        </div>

        {/* Native <details> Accordion (SSR HTML indexable for Google & GEO) */}
        <div className="space-y-4">
          {freeIntroFaqs.map((faq, idx) => (
            <details
              key={idx}
              className="bl-faq-details group bg-brand-surface rounded-2xl border border-brand-surface-border shadow-soft-sm overflow-hidden open:border-brand-teal-300 transition-colors"
            >
              <summary className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-right font-bold text-sm sm:text-base text-brand-neutral-900 hover:text-brand-teal-900 transition-colors min-h-[44px] cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal-800/40 rounded-2xl">
                <span>{faq.question}</span>
                <ChevronDown
                  aria-hidden="true"
                  className="w-5 h-5 text-brand-neutral-400 group-hover:text-brand-teal-800 transition-transform duration-200 group-open:rotate-180 shrink-0"
                />
              </summary>
              <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-brand-neutral-600 leading-relaxed border-t border-brand-surface-border pt-4">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};
