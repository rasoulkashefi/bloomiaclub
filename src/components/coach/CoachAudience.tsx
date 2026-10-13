'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import { ArrowUpLeft } from 'lucide-react';

import type { CoachProfile } from '@/lib/coaches';
import { toFa } from '@/lib/format';
import { useBooking } from './CoachBooking';
import { Reveal } from './animations/Reveal';
import { EditorialHeading } from './editorial/EditorialHeading';
import { Section, type SectionTone } from './editorial/Section';

const PREVIEW_W = 148;
const PREVIEW_H = 188;

/**
 * "Who this is for" as an editorial list.
 * Desktop: the coach's portrait follows the cursor over the rows (one of the few places cursor-follow is allowed).
 * Touch: plain rows. Each row starts the booking conversation with that topic pre-filled.
 */
export function CoachAudience({ coach, tone }: { coach: CoachProfile; tone?: SectionTone }) {
  const items = coach.audience;
  const { open } = useBooking();
  const reduce = useReducedMotion();
  const listRef = React.useRef<HTMLUListElement>(null);
  const [hovered, setHovered] = React.useState<number | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 240, damping: 28, mass: 0.7 });
  const sy = useSpring(y, { stiffness: 240, damping: 28, mass: 0.7 });

  if (!items || items.length === 0) return null;

  const preview = coach.imageUrl;
  const canFollow = Boolean(preview) && !reduce;

  const onPointerMove = (event: React.PointerEvent<HTMLUListElement>) => {
    if (!canFollow || event.pointerType !== 'mouse' || !listRef.current) return;
    const rect = listRef.current.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  };

  return (
    <Section id="audience" labelledBy="audience-title" tone={tone}>
      <Reveal>
        <EditorialHeading
          id="audience-title"
          lead="اگر یکی از این جمله‌ها شبیه حال شماست، همان را انتخاب کنید تا گفتگو را از همین‌جا شروع کنیم."
        >
          اگر اینجا هستید، احتمالاً...
        </EditorialHeading>
      </Reveal>

      <div className="relative mt-12 md:mt-20">
        <ul
          ref={listRef}
          onPointerMove={onPointerMove}
          onPointerLeave={() => setHovered(null)}
          className="relative"
        >
          {items.map((item, index) => (
            <Reveal as="li" key={item.title} delay={index * 0.06} className="border-b border-brand-surface-border first:border-t">
              <button
                type="button"
                onClick={() => open({ topic: item.title })}
                onPointerEnter={(e) => e.pointerType === 'mouse' && setHovered(index)}
                onFocus={() => setHovered(null)}
                className="group flex w-full items-center gap-5 py-7 text-start transition-colors hover:border-brand-teal-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal-900 focus-visible:ring-offset-4 md:gap-10 md:py-10"
              >
                <span className="w-9 shrink-0 text-base font-medium tabular-nums text-brand-neutral-500 transition-colors group-hover:text-brand-teal-700 md:w-14 md:text-lg">
                  {toFa(String(index + 1).padStart(2, '0'))}
                </span>
                <span className="flex-1 text-pretty text-xl font-bold leading-[1.9] text-brand-neutral-900 transition-[transform,color] duration-500 ease-out group-hover:-translate-x-2 group-hover:text-brand-teal-900 motion-reduce:transform-none md:text-[2rem] md:leading-[1.7]">
                  {item.title}
                </span>
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-brand-surface-border text-brand-neutral-600 transition-all duration-300 group-hover:border-brand-teal-900 group-hover:bg-brand-teal-900 group-hover:text-white md:size-14">
                  <ArrowUpLeft className="size-5 md:size-6" aria-hidden="true" />
                </span>
              </button>
            </Reveal>
          ))}

          {canFollow && preview && (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 z-10 hidden overflow-hidden rounded-b-[20px] rounded-t-[999px] shadow-[0_24px_48px_-16px_rgba(15,34,32,0.4)] md:block"
              style={{
                x: sx,
                y: sy,
                width: PREVIEW_W,
                height: PREVIEW_H,
                marginLeft: -PREVIEW_W / 2,
                marginTop: -PREVIEW_H - 24,
              }}
              animate={{ opacity: hovered === null ? 0 : 1, scale: hovered === null ? 0.7 : 1 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image src={preview} alt="" fill sizes="148px" className="object-cover object-[50%_20%]" />
            </motion.div>
          )}
        </ul>
      </div>
    </Section>
  );
}
