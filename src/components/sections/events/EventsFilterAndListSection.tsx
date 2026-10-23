'use client';

import React, { useState, useMemo } from 'react';
import { Search, Filter, CalendarX, Sparkles, User } from 'lucide-react';
import type { EventItem, EventType } from '@/lib/events';
import { EventCard } from './EventCard';

interface EventsFilterAndListSectionProps {
  events: EventItem[];
  initialCoachSlug?: string;
}

export const EventsFilterAndListSection: React.FC<EventsFilterAndListSectionProps> = ({
  events,
  initialCoachSlug = '',
}) => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCoach, setSelectedCoach] = useState<string>(initialCoachSlug);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Extract unique coaches from events
  const coachesList = useMemo(() => {
    const map = new Map<string, string>();
    events.forEach((ev) => {
      if (ev.coach?.slug && ev.coach?.name) {
        map.set(ev.coach.slug, ev.coach.name);
      }
    });
    return Array.from(map.entries()).map(([slug, name]) => ({ slug, name }));
  }, [events]);

  // Filter events
  const filteredEvents = useMemo(() => {
    return events.filter((ev) => {
      // Type filter
      if (selectedType !== 'all' && ev.eventType !== selectedType) {
        return false;
      }
      // Coach filter
      if (selectedCoach && ev.coach?.slug !== selectedCoach) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.trim().toLowerCase();
        const matchesTitle = ev.title.toLowerCase().includes(query);
        const matchesExcerpt = ev.excerpt.toLowerCase().includes(query);
        const matchesCoach = ev.coach?.name.toLowerCase().includes(query);
        const matchesSyllabus = ev.syllabus?.some((s) => s.toLowerCase().includes(query));
        if (!matchesTitle && !matchesExcerpt && !matchesCoach && !matchesSyllabus) {
          return false;
        }
      }
      return true;
    });
  }, [events, selectedType, selectedCoach, searchQuery]);

  return (
    <section id="upcoming-events" className="py-12 sm:py-16 lg:py-20 bg-brand-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-brand-neutral-200">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-neutral-900 tracking-tight leading-snug">
              رویدادهای پیش‌رو و وبینارها
            </h2>
            <p className="text-sm sm:text-base text-brand-neutral-600 mt-2 max-w-xl">
              برای ثبت‌نام در هر رویداد، روی دکمه مربوطه کلیک کنید تا به صفحه اختصاصی در ایسمینار یا ایوند منتقل شوید.
            </p>
          </div>

          {/* Quick counter badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-brand-surface-paper border border-brand-neutral-200 text-xs font-bold text-brand-neutral-700 shadow-soft-sm self-start md:self-auto">
            <span>تعداد رویدادها:</span>
            <span className="text-brand-teal-800 text-sm font-extrabold font-mono">
              {filteredEvents.length.toLocaleString('fa-IR')}
            </span>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="mt-8 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Type Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
              <button
                type="button"
                onClick={() => setSelectedType('all')}
                className={`min-h-[44px] px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  selectedType === 'all'
                    ? 'bg-brand-teal-900 text-white shadow-soft'
                    : 'bg-brand-surface-paper text-brand-neutral-700 border border-brand-neutral-200 hover:border-brand-teal-300'
                }`}
              >
                همه رویدادها
              </button>
              <button
                type="button"
                onClick={() => setSelectedType('webinar')}
                className={`min-h-[44px] px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  selectedType === 'webinar'
                    ? 'bg-brand-teal-900 text-white shadow-soft'
                    : 'bg-brand-surface-paper text-brand-neutral-700 border border-brand-neutral-200 hover:border-brand-teal-300'
                }`}
              >
                وبینارهای آنلاین
              </button>
              <button
                type="button"
                onClick={() => setSelectedType('workshop')}
                className={`min-h-[44px] px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  selectedType === 'workshop'
                    ? 'bg-brand-teal-900 text-white shadow-soft'
                    : 'bg-brand-surface-paper text-brand-neutral-700 border border-brand-neutral-200 hover:border-brand-teal-300'
                }`}
              >
                کارگاه‌های تعاملی
              </button>
              <button
                type="button"
                onClick={() => setSelectedType('masterclass')}
                className={`min-h-[44px] px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  selectedType === 'masterclass'
                    ? 'bg-brand-teal-900 text-white shadow-soft'
                    : 'bg-brand-surface-paper text-brand-neutral-700 border border-brand-neutral-200 hover:border-brand-teal-300'
                }`}
              >
                مسترکلاس‌ها
              </button>
            </div>

            {/* Coach Filter & Search */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              {/* Coach Select */}
              {coachesList.length > 0 && (
                <div className="relative w-full sm:w-56">
                  <select
                    value={selectedCoach}
                    onChange={(e) => setSelectedCoach(e.target.value)}
                    className="w-full min-h-[44px] appearance-none bg-brand-surface-paper border border-brand-neutral-200 rounded-full px-4 py-2 text-xs font-bold text-brand-neutral-800 shadow-soft-sm focus:outline-none focus:border-brand-teal-700 focus:ring-1 focus:ring-brand-teal-700 cursor-pointer"
                    aria-label="فیلتر بر اساس کوچ"
                  >
                    <option value="">همه کوچ‌ها</option>
                    {coachesList.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        کوچ: {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Search input */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute start-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-neutral-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="جستجو در رویدادها..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full min-h-[44px] bg-brand-surface-paper border border-brand-neutral-200 rounded-full ps-10 pe-4 py-2 text-xs sm:text-sm text-brand-neutral-900 placeholder:text-brand-neutral-400 shadow-soft-sm focus:outline-none focus:border-brand-teal-700 focus:ring-1 focus:ring-brand-teal-700"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="mt-10">
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center bg-brand-surface-paper rounded-3xl border border-dashed border-brand-neutral-300 p-8 max-w-lg mx-auto">
              <CalendarX className="w-12 h-12 text-brand-neutral-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-brand-neutral-900">
                هیچ رویدادی با این مشخصات یافت نشد
              </h3>
              <p className="text-sm text-brand-neutral-500 mt-2">
                می‌توانید فیلترها را ریست کنید یا عبارت جستجوی دیگری را امتحان نمایید.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedType('all');
                  setSelectedCoach('');
                  setSearchQuery('');
                }}
                className="mt-5 min-h-[44px] px-6 py-2.5 rounded-full bg-brand-teal-900 text-white text-xs font-bold hover:bg-brand-teal-800 transition-colors shadow-soft"
              >
                نمایش تمام رویدادها
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
