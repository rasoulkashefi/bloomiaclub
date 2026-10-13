'use client';

import * as React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

import type { CoachProfile } from '@/lib/coaches';
import { BookButton, useBooking } from './CoachBooking';

/**
 * Fixed booking bar for phones. Appears once the hero CTA has scrolled away and steps aside
 * while the final CTA is on screen or the booking sheet is open.
 */
export function CoachStickyCTA({ coach }: { coach: CoachProfile }) {
  const reduce = useReducedMotion();
  const { isOpen } = useBooking();
  const [pastHero, setPastHero] = React.useState(false);
  const [finalInView, setFinalInView] = React.useState(false);

  React.useEffect(() => {
    const cta = document.getElementById('hero-cta');
    if (!cta) {
      setPastHero(true);
      return;
    }
    // Past the hero = the hero CTA has left the viewport through the top.
    const observer = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 }
    );
    observer.observe(cta);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    const target = document.getElementById('booking');
    if (!target) return;
    const observer = new IntersectionObserver(([entry]) => setFinalInView(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const visible = pastHero && !finalInView && !isOpen;
  const hasFree = Boolean(coach.services?.some((s) => s.isFree));

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-surface-border bg-white/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-12px_32px_-16px_rgba(15,34,32,0.22)] backdrop-blur md:hidden"
          initial={reduce ? false : { y: '100%' }}
          animate={{ y: 0 }}
          exit={reduce ? undefined : { y: '100%' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <BookButton size="lg" className="w-full justify-between px-6">
            <span>{hasFree ? 'رزرو جلسه صفر رایگان' : 'رزرو جلسه'}</span>
            <ArrowLeft aria-hidden="true" />
          </BookButton>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
