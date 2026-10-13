'use client';

import * as React from 'react';
import { motion, useReducedMotion } from 'motion/react';

import { cn } from '@/lib/utils';

const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Seconds to wait before the reveal starts (use for light staggering). */
  delay?: number;
  /** Vertical travel in px. */
  y?: number;
  as?: 'div' | 'li' | 'article' | 'p' | 'header' | 'ul' | 'ol' | 'dl';
};

/**
 * Calm, one-shot fade-up when the block enters the viewport.
 * Respects prefers-reduced-motion (renders statically).
 */
export function Reveal({ children, className, delay = 0, y = 28, as = 'div' }: RevealProps) {
  const reduce = useReducedMotion();
  const Component = motion[as] as typeof motion.div;

  if (reduce) {
    const Static = as as React.ElementType;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Component
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.7, delay, ease: EXPO_OUT }}
    >
      {children}
    </Component>
  );
}
