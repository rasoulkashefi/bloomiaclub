'use client';

import React from 'react';

export interface CategoryFilter {
  id: string;
  label: string;
  keywords: string[];
}

export const coachCategories: CategoryFilter[] = [
  {
    id: 'all',
    label: 'همه کوچ‌ها',
    keywords: [],
  },
  {
    id: 'individual',
    label: 'رشد و توسعه فردی',
    keywords: ['رشد فردی', 'توسعه فردی', 'عزت نفس', 'اعتماد به نفس', 'ذهن‌آگاهی', 'هوش هیجانی', 'انگیزه'],
  },
  {
    id: 'career',
    label: 'مسیر و ارتقای شغلی',
    keywords: ['مسیر شغلی', 'توسعه شغلی', 'تحول شغلی', 'شغل', 'رزومه', 'استارتاپ', 'موقعیت مدیریتی'],
  },
  {
    id: 'business',
    label: 'کسب‌وکار و رهبری',
    keywords: ['کسب‌وکار', 'بیزینس', 'مدیریت', 'رهبری', 'رهبری کسب‌وکار', 'فروش', 'سازمانی'],
  },
  {
    id: 'relationships',
    label: 'روابط و تعاملات',
    keywords: ['روابط', 'توسعه ارتباطات', 'مهارت‌های ارتباطی', 'ارتباط موثر', 'مدیریت تعارضات'],
  },
  {
    id: 'balance',
    label: 'تعادل کار و زندگی',
    keywords: ['تعادل کار و زندگی', 'کوچینگ زنان', 'مدیریت استرس', 'والدگری', 'فرزندپروری', 'خانواده'],
  },
];

interface CoachFiltersSectionProps {
  currentFilter: string;
  setCurrentFilter: (filterId: string) => void;
  filteredCount: number;
}

export const CoachFiltersSection: React.FC<CoachFiltersSectionProps> = ({
  currentFilter,
  setCurrentFilter,
  filteredCount,
}) => {
  return (
    <section className="py-6 bg-brand-surface border-b border-brand-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Horizontal scrollable pills on mobile, centered flex on desktop */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0 sm:flex-wrap sm:justify-center">
          {coachCategories.map((category) => {
            const isActive = currentFilter === category.id;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setCurrentFilter(category.id)}
                className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap min-h-[44px] flex items-center gap-2 active:scale-98 ${
                  isActive
                    ? 'bg-brand-teal-900 text-white shadow-soft ring-2 ring-brand-teal-900/20'
                    : 'bg-brand-surface-paper text-brand-neutral-700 hover:text-brand-teal-900 hover:bg-brand-teal-50/70 border border-brand-neutral-200/80'
                }`}
              >
                <span>{category.label}</span>
                {isActive && (
                  <span className="w-5 h-5 rounded-full bg-white/20 text-white text-[11px] font-bold flex items-center justify-center">
                    {filteredCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
