'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

export type InteractiveHoverButtonProps = {
  text?: string;
  href?: string;
  isExternal?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  icon?: 'arrow' | 'external';
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'>;

export const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(
  (
    {
      text = 'مشاهده',
      href,
      isExternal = false,
      variant = 'primary',
      className,
      icon = 'arrow',
      ...props
    },
    ref
  ) => {
    const isPrimary = variant === 'primary';
    const isSecondary = variant === 'secondary';

    const baseClasses = cn(
      'group relative inline-flex items-center justify-center cursor-pointer overflow-hidden text-center font-bold transition-all duration-300 min-h-[44px] px-6 py-3 rounded-full text-sm leading-none',
      isPrimary &&
        'border-2 border-brand-teal-900 bg-brand-teal-900 text-white shadow-soft hover:bg-brand-teal-800 hover:border-brand-teal-800 hover:shadow-elevated active:scale-[0.98]',
      isSecondary &&
        'border-2 border-brand-teal-100 bg-brand-teal-50 text-brand-teal-950 hover:bg-brand-teal-100 hover:border-brand-teal-200 active:scale-[0.98]',
      variant === 'outline' &&
        'border-2 border-brand-neutral-300 bg-transparent text-brand-neutral-800 hover:bg-brand-neutral-100 hover:border-brand-neutral-400 active:scale-[0.98]',
      className
    );

    const IconComponent = icon === 'external' ? ExternalLink : ArrowLeft;

    const content = (
      <>
        {/* Shimmer sweep on hover */}
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full pointer-events-none" />

        {/* Content: text and RTL arrow */}
        <span className="relative z-10 flex items-center gap-2">
          <span className="transition-transform duration-300 group-hover:-translate-x-0.5">{text}</span>
          <IconComponent className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:-translate-x-1" />
        </span>
      </>
    );

    if (href) {
      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={baseClasses}
          >
            {content}
          </a>
        );
      }
      return (
        <Link href={href} className={baseClasses}>
          {content}
        </Link>
      );
    }

    return (
      <button ref={ref} className={baseClasses} {...props}>
        {content}
      </button>
    );
  }
);

InteractiveHoverButton.displayName = 'InteractiveHoverButton';
