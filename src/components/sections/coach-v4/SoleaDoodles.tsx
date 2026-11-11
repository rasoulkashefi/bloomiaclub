'use client';

import React from 'react';

export const CrownDoodle: React.FC<{ className?: string }> = ({ className = 'w-12 h-10 text-[#dfece9]' }) => (
  <svg
    viewBox="0 0 20 14"
    className={className}
    fill="none"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.5 11.5L1.2 5.2L6.2 8.2L10 2.2L13.8 8.2L18.8 5.2L17.5 11.5H2.5Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="10" cy="1.4" r="0.8" fill="currentColor" />
    <circle cx="1.2" cy="4.4" r="0.8" fill="currentColor" />
    <circle cx="18.8" cy="4.4" r="0.8" fill="currentColor" />
  </svg>
);

export const LoopArrowDoodle: React.FC<{ className?: string }> = ({ className = 'w-16 h-14 text-[#dfece9]' }) => (
  <svg
    viewBox="0 0 70 60"
    className={className}
    fill="none"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 58C10 40 24 25 46 22C62 20 68 29 63 36C57 42 42 40 34 32C26 24 29 12 43 7C53 4 62 4 68 5"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <path
      d="M61 1.5L68.5 5L62.5 10.5"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const GrowthSlashes: React.FC<{ className?: string }> = ({ className = 'w-6 h-5 text-[#dfece9]' }) => (
  <svg
    viewBox="0 0 20 16"
    className={className}
    fill="none"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.5 10.5L6.5 1.8M5 13L13 3.2M7.5 15L15 11.2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const RatingUnderline: React.FC<{ className?: string }> = ({ className = 'w-36 h-2 text-[#dfece9]' }) => (
  <svg
    viewBox="0 0 175 6"
    className={className}
    fill="none"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 4.2C48 1.5 118 1.2 173 3.2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
