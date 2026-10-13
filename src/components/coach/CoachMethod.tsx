'use client';

import * as React from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'motion/react';

import type { CoachProfile } from '@/lib/coaches';
import { toFa } from '@/lib/format';
import { Reveal } from './animations/Reveal';
import { EditorialHeading } from './editorial/EditorialHeading';
import { Section } from './editorial/Section';

/**
 * Sticky scroll storytelling (desktop) / vertical timeline (mobile).
 * The heading and a large step numeral stay pinned while the steps scroll past;
 * the step crossing the middle of the viewport becomes active.
 */
export function CoachMethod({ coach }: { coach: CoachProfile }) {
  // The scroll target ref only exists when the list renders, so the hooks live in the inner component:
  // calling useScroll with a never-attached ref throws "Target ref is defined but not hydrated".
  if (!coach.method || coach.method.length === 0) return null;
  return <CoachMethodTimeline steps={coach.method} />;
}

function CoachMethodTimeline({ steps }: { steps: NonNullable<CoachProfile['method']> }) {
  const reduce = useReducedMotion();
  const listRef = React.useRef<HTMLOListElement>(null);
  const stepRefs = React.useRef<Array<HTMLLIElement | null>>([]);
  const [active, setActive] = React.useState(0);

  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 65%', 'end 55%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  const count = steps.length;

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = stepRefs.current.indexOf(entry.target as HTMLLIElement);
            if (index >= 0) setActive(index);
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    stepRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [count]);

  return (
    <Section id="method" labelledBy="method-title" tone="dark">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        {/* Pinned column */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <EditorialHeading
                id="method-title"
                tone="dark"
                lead={`${toFa(steps.length)} گام ساده که هر جلسه را از گفتگو به نتیجه نزدیک می‌کند.`}
              >
                روش من
              </EditorialHeading>
            </Reveal>

            <div className="mt-14 hidden items-end gap-6 lg:flex" aria-hidden="true">
              <div className="relative h-[9.5rem] w-[15rem]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={active}
                    className="absolute inset-0 flex items-end text-[9.5rem] font-extrabold leading-[0.9] text-white/[0.14]"
                    initial={reduce ? false : { opacity: 0, y: 28, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={reduce ? undefined : { opacity: 0, y: -28, filter: 'blur(6px)' }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {toFa(String(active + 1).padStart(2, '0'))}
                  </motion.span>
                </AnimatePresence>
              </div>
              <span className="pb-3 text-base font-medium tabular-nums text-brand-teal-200">
                {toFa(active + 1)} / {toFa(steps.length)}
              </span>
            </div>
          </div>
        </div>

        {/* Scrolling column */}
        <div className="lg:col-span-7">
          <ol ref={listRef} className="relative ps-12 md:ps-16">
            <span aria-hidden="true" className="absolute inset-y-3 start-[11px] w-px bg-white/15 md:start-[15px]" />
            <motion.span
              aria-hidden="true"
              className="absolute inset-y-3 start-[11px] w-px origin-top bg-white md:start-[15px]"
              style={{ scaleY: reduce ? 1 : progress }}
            />

            {steps.map((step, index) => {
              const isActive = index === active;
              return (
                <li
                  key={step.id}
                  ref={(el) => {
                    stepRefs.current[index] = el;
                  }}
                  data-active={isActive}
                  className="relative flex flex-col justify-center pb-16 transition-[opacity,transform] duration-700 ease-out last:pb-0 lg:min-h-[56vh] lg:pb-0 lg:data-[active=false]:translate-y-2 lg:data-[active=false]:opacity-30"
                >
                  <span
                    aria-hidden="true"
                    className={`absolute -start-12 top-[0.55rem] flex size-6 items-center justify-center rounded-full border transition-colors duration-500 md:-start-16 md:size-8 lg:top-1/2 lg:-translate-y-[2.6rem] ${
                      isActive || index < active ? 'border-white bg-white' : 'border-white/30 bg-brand-teal-900'
                    }`}
                  >
                    <span className={`size-2 rounded-full ${isActive || index < active ? 'bg-brand-teal-900' : 'bg-white/30'}`} />
                  </span>

                  <h3 className="flex items-baseline gap-4 text-2xl font-extrabold leading-[1.5] text-white sm:text-3xl md:text-5xl">
                    <span className="text-lg font-medium tabular-nums text-brand-teal-300 lg:hidden">
                      {toFa(String(index + 1).padStart(2, '0'))}
                    </span>
                    {step.title}
                  </h3>
                  <p className="mt-4 max-w-[44ch] text-pretty text-lg leading-[2.1] text-brand-teal-100 md:text-xl md:leading-[2.2]">
                    {step.description}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </Section>
  );
}
