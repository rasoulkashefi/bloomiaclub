'use client';

import React, { useState, useMemo } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { Search, ChevronDown, X, HelpCircle, Filter } from 'lucide-react';
import { generalFaqs, FAQ_CATEGORIES, FaqItem } from '@/data/generalFaqs';

export const FaqExplorerSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter questions based on category and search query
  const filteredFaqs = useMemo(() => {
    return generalFaqs.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;

      const cleanQuery = searchQuery.trim().toLowerCase();
      const matchesSearch =
        cleanQuery === '' ||
        item.question.toLowerCase().includes(cleanQuery) ||
        item.answer.toLowerCase().includes(cleanQuery);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: generalFaqs.length };
    FAQ_CATEGORIES.forEach((cat) => {
      if (cat.id !== 'all') {
        counts[cat.id] = generalFaqs.filter((f) => f.category === cat.id).length;
      }
    });
    return counts;
  }, []);

  return (
    <section className="py-16 md:py-24 bg-brand-surface border-b border-brand-surface-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="relative">
            <input
              type="text"
              placeholder="جستجو در پرسش‌ها یا کلیدواژه‌ها (مثال: محرمانگی، جلسه آنلاین، ICF)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-5 py-4 pr-12 rounded-2xl border border-brand-surface-border bg-white text-brand-neutral-900 text-sm placeholder:text-brand-neutral-400 focus:outline-none focus:border-brand-teal-700 focus:ring-2 focus:ring-brand-teal-100 shadow-soft-sm transition-all min-h-[48px]"
            />
            <Search className="w-5 h-5 text-brand-neutral-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-1 text-brand-neutral-400 hover:text-brand-neutral-700 rounded-full hover:bg-brand-neutral-100 transition-colors"
                aria-label="پاک کردن جستجو"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {FAQ_CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category.id;
            const count = categoryCounts[category.id] || 0;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setSelectedCategory(category.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all min-h-[44px] ${
                  isSelected
                    ? 'bg-brand-teal-900 text-white shadow-soft'
                    : 'bg-white text-brand-neutral-700 hover:bg-brand-neutral-100 border border-brand-surface-border'
                }`}
              >
                <span>{category.label}</span>
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                    isSelected
                      ? 'bg-brand-teal-800 text-brand-teal-100'
                      : 'bg-brand-surface-muted text-brand-neutral-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* FAQ Accordion List */}
        {filteredFaqs.length > 0 ? (
          <Accordion.Root type="single" collapsible className="space-y-4">
            {filteredFaqs.map((faq) => (
              <Accordion.Item
                key={faq.id}
                value={faq.id}
                className="bg-white rounded-2xl border border-brand-surface-border shadow-soft-sm overflow-hidden data-[state=open]:border-brand-teal-300 transition-colors"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-right font-bold text-sm sm:text-base text-brand-neutral-900 hover:text-brand-teal-900 transition-colors group min-h-[48px]">
                    <div className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-teal-600 shrink-0" />
                      <span>{faq.question}</span>
                    </div>
                    <ChevronDown className="w-5 h-5 text-brand-neutral-400 group-hover:text-brand-teal-800 transition-transform duration-200 group-data-[state=open]:rotate-180 shrink-0" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-brand-neutral-600 leading-relaxed border-t border-brand-surface-border pt-4 data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <p className="mb-3">{faq.answer}</p>
                  <div className="flex items-center gap-2 pt-2 text-[11px] text-brand-teal-800 font-medium">
                    <span className="px-2 py-0.5 rounded bg-brand-teal-50 border border-brand-teal-200/50">
                      {faq.categoryLabel}
                    </span>
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        ) : (
          /* Empty State */
          <div className="text-center py-16 px-4 bg-white rounded-3xl border border-brand-surface-border shadow-soft-sm">
            <HelpCircle className="w-12 h-12 text-brand-neutral-300 mx-auto mb-4" />
            <h3 className="text-base sm:text-lg font-bold text-brand-neutral-900 mb-2">
              پرسشی با این مشخصات یافت نشد
            </h3>
            <p className="text-xs sm:text-sm text-brand-neutral-500 mb-6 max-w-md mx-auto">
              عبارت دیگری را جستجو کنید یا دسته‌بندی را تغییر دهید. همچنین می‌توانید سوال خود را مستقیماً از تیم پشتیبانی بپرسید.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-brand-teal-900 hover:bg-brand-teal-50 border border-brand-teal-300 transition-colors min-h-[44px]"
            >
              نمایش همه پرسش‌ها
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
