import * as React from 'react';

import { cn } from '@/lib/utils';

type EditorialHeadingProps = {
  id: string;
  children: React.ReactNode;
  /** Optional short supporting sentence under the heading. */
  lead?: React.ReactNode;
  tone?: 'light' | 'dark';
  align?: 'start' | 'center';
  className?: string;
};

/**
 * Section title (h2). The heading carries the weight on its own: no kicker above it.
 * More air above than below, with a tight lead underneath.
 */
export function EditorialHeading({
  id,
  children,
  lead,
  tone = 'light',
  align = 'start',
  className,
}: EditorialHeadingProps) {
  return (
    <header className={cn('max-w-[640px]', align === 'center' && 'mx-auto text-center', className)}>
      <h2
        id={id}
        className={cn(
          'text-balance text-[1.875rem] font-extrabold leading-[1.5] md:text-5xl md:leading-[1.4] lg:text-[3.25rem]',
          tone === 'dark' ? 'text-white' : 'text-brand-neutral-900'
        )}
      >
        {children}
      </h2>
      {lead ? (
        <p
          className={cn(
            'mt-4 text-pretty text-base leading-[2] md:mt-5 md:text-lg',
            tone === 'dark' ? 'text-brand-teal-100' : 'text-brand-neutral-600'
          )}
        >
          {lead}
        </p>
      ) : null}
    </header>
  );
}
