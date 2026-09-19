'use client';

import React, { useState, useMemo } from 'react';
import type { Coach } from '@/lib/coaches';
import { CoachHeroSection } from './CoachHeroSection';
import { CoachFiltersSection, coachCategories } from './CoachFiltersSection';
import { CoachGridSection } from './CoachGridSection';

interface CoachExplorerProps {
  initialCoaches: Coach[];
}

export const CoachExplorer: React.FC<CoachExplorerProps> = ({ initialCoaches }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentFilter, setCurrentFilter] = useState('all');

  const filteredCoaches = useMemo(() => {
    return initialCoaches.filter((coach) => {
      // Category filter matching
      if (currentFilter !== 'all') {
        const category = coachCategories.find((c) => c.id === currentFilter);
        if (category && category.keywords.length > 0) {
          const coachText = [
            coach.title,
            coach.description,
            ...(coach.specialties || []),
          ]
            .join(' ')
            .toLowerCase();

          const matchesCategory = category.keywords.some((keyword) =>
            coachText.includes(keyword.toLowerCase())
          );
          if (!matchesCategory) return false;
        }
      }

      // Search query matching
      if (searchQuery.trim()) {
        const query = searchQuery.trim().toLowerCase();
        const searchable = [
          coach.name,
          coach.title,
          coach.description,
          ...(coach.specialties || []),
        ]
          .join(' ')
          .toLowerCase();

        return searchable.includes(query);
      }

      return true;
    });
  }, [initialCoaches, currentFilter, searchQuery]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setCurrentFilter('all');
  };

  return (
    <>
      <CoachHeroSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        totalCount={initialCoaches.length}
      />
      <CoachFiltersSection
        currentFilter={currentFilter}
        setCurrentFilter={setCurrentFilter}
        filteredCount={filteredCoaches.length}
      />
      <CoachGridSection
        coaches={filteredCoaches}
        onResetFilters={handleResetFilters}
      />
    </>
  );
};
