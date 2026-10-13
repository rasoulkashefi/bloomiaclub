'use client';

import * as React from 'react';
import { animate, useInView, useReducedMotion } from 'motion/react';

import { formatNumber, toFa } from '@/lib/format';

type CountUpProps = {
  value: number;
  /** Decimal digits to display (e.g. rating 4.9 -> 1). */
  decimals?: number;
  className?: string;
};

const useIsoLayoutEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

const format = (n: number, decimals: number) =>
  decimals > 0 ? toFa(n.toFixed(decimals)).replace('.', '٫') : formatNumber(n);

/**
 * Counts up the first time the number scrolls into view.
 * The server (and no-JS / reduced-motion users) always get the real final value.
 */
export function CountUp({ value, decimals = 0, className }: CountUpProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: '0px 0px -12% 0px' });
  const armed = React.useRef(false);

  // If the number starts below the fold, reset it to 0 before first paint so it can count up.
  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    const rect = el.getBoundingClientRect();
    if (rect.top > window.innerHeight * 0.88) {
      el.textContent = format(0, decimals);
      armed.current = true;
    }
  }, [decimals, reduce]);

  React.useEffect(() => {
    const el = ref.current;
    if (!inView || !el || reduce || !armed.current) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        el.textContent = format(latest, decimals);
      },
    });
    return () => controls.stop();
  }, [inView, value, decimals, reduce]);

  return (
    <span ref={ref} className={className} suppressHydrationWarning>
      {format(value, decimals)}
    </span>
  );
}
