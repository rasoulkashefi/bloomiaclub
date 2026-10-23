'use client';

import React, { useState, useMemo } from 'react';
import { Search, X, BookOpen, User } from 'lucide-react';
import { BlogPostSummary, BlogCategory } from '@/lib/posts';
import { BlogCard } from './BlogCard';

interface BlogExplorerSectionProps {
  posts: BlogPostSummary[];
  categories: BlogCategory[];
  initialCoachSlug?: string;
  initialCoachName?: string;
}

export const BlogExplorerSection: React.FC<BlogExplorerSectionProps> = ({
  posts,
  categories,
  initialCoachSlug,
  initialCoachName,
}) => {
  const [selectedCoach, setSelectedCoach] = useState<string>(initialCoachSlug || '');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const coachDisplayName = initialCoachName || (selectedCoach === 'fatemeh_esmaeeli' ? 'فاطمه اسماعیلی' : selectedCoach);

  const handleClearCoachFilter = () => {
    setSelectedCoach('');
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('coach');
      url.searchParams.delete('author');
      window.history.replaceState(null, '', url.pathname + (url.search ? url.search : '') + url.hash);
    }
  };

  const handleResetAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedCoach('');
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', window.location.pathname);
    }
  };

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Coach filter
      if (selectedCoach) {
        const matchesCoach =
          post.coachSlug === selectedCoach ||
          post.authorSlug === selectedCoach ||
          (selectedCoach === 'fatemeh_esmaeeli' &&
            (post.authorName.includes('اسماعیلی') || post.slug.includes('fatemeh')));

        if (!matchesCoach) return false;
      }

      // Category filter
      const matchesCategory =
        selectedCategory === 'all' ||
        post.categorySlug === selectedCategory ||
        post.category === selectedCategory;

      if (!matchesCategory) return false;

      // Search filter
      if (!searchQuery.trim()) return true;

      const query = searchQuery.trim().toLowerCase();
      const titleMatch = post.title.toLowerCase().includes(query);
      const excerptMatch = post.excerpt.toLowerCase().includes(query);
      const authorMatch = post.authorName.toLowerCase().includes(query);

      return titleMatch || excerptMatch || authorMatch;
    });
  }, [posts, selectedCategory, searchQuery, selectedCoach]);

  const hasActiveFilters = Boolean(searchQuery || selectedCategory !== 'all' || selectedCoach);

  return (
    <section id="explorer" className="py-12 sm:py-16 bg-brand-surface scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* Active Coach Banner */}
        {selectedCoach && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-brand-surface-paper border border-brand-teal-800/15 shadow-soft">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#1f3d3a] text-white flex items-center justify-center font-bold text-sm shadow-soft shrink-0">
                {coachDisplayName ? coachDisplayName.slice(0, 1) : <User className="w-5 h-5" />}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-brand-teal-800 bg-[#dfece9] px-2.5 py-0.5 rounded-full">
                    کوچ بین‌المللی بلومیا
                  </span>
                  <h2 className="text-base sm:text-lg font-bold text-brand-neutral-900">
                    مقالات تخصصی {coachDisplayName}
                  </h2>
                </div>
                <p className="text-xs text-brand-neutral-500 mt-1">
                  نمایش تمام یادداشت‌ها و راهنماهای منتشرشده ({filteredPosts.length} مقاله)
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClearCoachFilter}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#fafaf8] text-xs sm:text-sm font-semibold text-[#1f3d3a] border border-[#e5e5e2] hover:border-[#1f3d3a] hover:bg-[#f2f7f6] transition-all min-h-[44px] self-stretch sm:self-auto justify-center"
            >
              <X className="w-4 h-4" />
              <span>مشاهده مقالات همه کوچ‌ها</span>
            </button>
          </div>
        )}

        {/* Controls: Search & Category Filter */}
        <div className="space-y-5">
          {/* Search bar */}
          <div className="relative max-w-xl mx-auto md:mx-0">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-brand-neutral-400">
              <Search className="w-5 h-5 text-brand-neutral-500" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجو در عنوان، موضوع یا نام کوچ..."
              className="w-full pr-11 pl-11 py-3 text-sm sm:text-base rounded-2xl bg-brand-surface-paper border border-brand-neutral-300 focus:border-brand-teal-800 focus:outline-none focus:ring-2 focus:ring-brand-teal-900/10 shadow-soft-sm text-brand-neutral-900 placeholder:text-brand-neutral-400 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 left-0 flex items-center pl-3 text-brand-neutral-400 hover:text-brand-neutral-700 min-w-[44px] min-h-[44px] justify-center"
                aria-label="پاک کردن جستجو"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Tabs (Horizontal scroll on mobile) */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold shrink-0 transition-all min-h-[44px] flex items-center gap-2 ${
                selectedCategory === 'all'
                  ? 'bg-brand-teal-900 text-white shadow-soft'
                  : 'bg-brand-surface-paper text-brand-neutral-700 hover:bg-brand-surface-muted hover:border-brand-neutral-300 border border-brand-neutral-200/90'
              }`}
            >
              <span>همه موضوعات</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${selectedCategory === 'all' ? 'bg-brand-teal-800 text-white' : 'bg-brand-neutral-200 text-brand-neutral-600'}`}>
                {selectedCoach ? filteredPosts.length : posts.length}
              </span>
            </button>

            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.slug || selectedCategory === cat.title;
              return (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold shrink-0 transition-all min-h-[44px] flex items-center gap-2 ${
                    isSelected
                      ? 'bg-brand-teal-900 text-white shadow-soft'
                      : 'bg-brand-surface-paper text-brand-neutral-700 hover:bg-brand-surface-muted hover:border-brand-neutral-300 border border-brand-neutral-200/90'
                  }`}
                >
                  <span>{cat.title}</span>
                  {typeof cat.count === 'number' && !selectedCoach && (
                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${isSelected ? 'bg-brand-teal-800 text-white' : 'bg-brand-neutral-200 text-brand-neutral-600'}`}>
                      {cat.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Status Counter */}
        <div className="flex items-center justify-between text-xs sm:text-sm text-brand-neutral-500 pt-1 border-t border-brand-neutral-200/60">
          <div>
            نمایش <strong className="text-brand-neutral-900 font-bold">{filteredPosts.length}</strong> مقاله
            {selectedCoach ? ` به قلم کوچ ${coachDisplayName}` : ` از مجموع ${posts.length} مقاله`}
          </div>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleResetAllFilters}
              className="text-brand-teal-900 hover:text-brand-teal-700 hover:underline font-bold min-h-[44px] flex items-center"
            >
              بازنشانی فیلترها
            </button>
          )}
        </div>

        {/* Posts Grid or Empty State */}
        {filteredPosts.length === 0 ? (
          <div className="py-16 text-center bg-brand-surface-paper rounded-3xl border border-brand-neutral-200 p-8 space-y-4 shadow-soft">
            <div className="w-14 h-14 mx-auto rounded-full bg-brand-surface-muted flex items-center justify-center text-brand-neutral-400">
              <BookOpen className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-brand-neutral-900">
              مقاله‌ای مطابق با فیلترهای انتخابی یافت نشد
            </h3>
            <p className="text-sm text-brand-neutral-500 max-w-md mx-auto">
              عبارت جستجو را تغییر دهید یا فیلتر دسته‌بندی و کوچ را بازنشانی کنید.
            </p>
            <button
              type="button"
              onClick={handleResetAllFilters}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-brand-teal-900 text-white text-sm font-bold shadow-soft hover:bg-brand-teal-800 transition-colors min-h-[44px]"
            >
              نمایش همه مقالات
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
