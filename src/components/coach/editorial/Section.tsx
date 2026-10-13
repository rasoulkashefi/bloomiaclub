import * as React from 'react';

import { cn } from '@/lib/utils';

export type SectionTone = 'surface' | 'paper' | 'tint' | 'dark';

const toneClasses: Record<SectionTone, string> = {
  surface: 'bg-brand-surface text-brand-neutral-900',
  paper: 'bg-white text-brand-neutral-900',
  tint: 'bg-brand-teal-50 text-brand-neutral-900',
  dark: 'bg-brand-teal-900 text-white selection:bg-white selection:text-brand-teal-900',
};

type SectionProps = {
  id: string;
  /** id of the heading element inside the section, used for aria-labelledby. */
  labelledBy?: string;
  tone?: SectionTone;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
};

/**
 * Shared section shell: vertical rhythm, container width and background tone.
 * Mobile 72px, tablet 112px, desktop 160px of vertical padding.
 */
export function Section({
  id,
  labelledBy,
  tone = 'surface',
  className,
  containerClassName,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn('relative py-[72px] md:py-28 lg:py-40', toneClasses[tone], className)}
    >
      <div className={cn('mx-auto w-full max-w-[1280px] px-5 md:px-8', containerClassName)}>{children}</div>
    </section>
  );
}
