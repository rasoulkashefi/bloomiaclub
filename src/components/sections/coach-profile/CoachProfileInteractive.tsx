'use client';

import React, { useState } from 'react';
import type { Coach } from '@/lib/coaches';
import { CoachProfilePackagesSection } from './CoachProfilePackagesSection';
import { CoachProfileBookingSection } from './CoachProfileBookingSection';

interface CoachProfileInteractiveProps {
  coach: Coach;
}

export const CoachProfileInteractive: React.FC<CoachProfileInteractiveProps> = ({
  coach,
}) => {
  const [selectedPackage, setSelectedPackage] = useState('جلسه معارفه (جلسه صفر)');

  return (
    <>
      <CoachProfilePackagesSection
        coach={coach}
        onSelectPackage={setSelectedPackage}
      />
      <CoachProfileBookingSection
        coach={coach}
        selectedPackage={selectedPackage}
        setSelectedPackage={setSelectedPackage}
      />
    </>
  );
};
