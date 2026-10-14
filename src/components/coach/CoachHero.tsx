'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, BadgeCheck, CalendarCheck, Check, Star } from 'lucide-react';

import type { CoachProfile } from '@/lib/coaches';
import { formatRating, toFa } from '@/lib/format';
import { Button } from '@/components/ui/button';
import { BookButton } from './CoachBooking';
import { getSectionFlags } from './coach-sections';

const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

/**
 * Editorial personal-brand hero.
 * Mobile: portrait, name, description, proof, CTA. Desktop: 45/55 split.
 */
export function CoachHero({ coach }: { coach: CoachProfile }) {
  const reduce = useReducedMotion();
  const flags = getSectionFlags(coach);

  const freeSession = coach.services?.find((s) => s.isFree);
  const icf = coach.credentials?.find((c) => /ICF/i.test(`${c.organization} ${c.title}`));
  const description = coach.shortBio || coach.description;
  const hasRating = coach.rating > 0;
  const hasSessions = coach.totalSessions > 0;

  const item = (delay: number) =>
    reduce
      ? {}
      : {
          // Transform only: the text is visible in the server HTML (LCP) and simply settles into place.
          initial: { y: 16 },
          animate: { y: 0 },
          transition: { duration: 0.8, delay, ease: EXPO_OUT },
        };

  return (
    <section
      id="top"
      aria-labelledby="coach-name"
      className="relative overflow-hidden bg-brand-surface pb-8 pt-20 sm:pt-24 md:pb-14 md:pt-28 lg:pb-16 lg:pt-32"
    >
      <div className="mx-auto grid w-full max-w-[1280px] items-center gap-12 px-5 md:grid-cols-[45fr_55fr] md:gap-10 md:px-8 lg:gap-16">
        {/* ---------------------------- Text ---------------------------- */}
        <div className="order-2 flex flex-col items-start md:order-1">
          <motion.h1
            {...item(0.08)}
            id="coach-name"
            className="text-balance text-[2.75rem] font-extrabold leading-[1.3] text-brand-neutral-900 sm:text-6xl md:text-[3.5rem] lg:text-[4.75rem] lg:leading-[1.25]"
          >
            {coach.name}
          </motion.h1>

          <motion.p
            {...item(0.16)}
            className="mt-3 max-w-[22ch] text-balance text-xl font-semibold leading-9 text-brand-teal-900 md:mt-4 md:text-2xl md:leading-[2.6rem]"
          >
            {coach.title}
          </motion.p>

          {description && (
            <motion.p
              {...item(0.24)}
              className="mt-6 max-w-[34ch] text-pretty text-lg leading-[2.1] text-brand-neutral-600 md:mt-7 md:text-xl md:leading-[2.2]"
            >
              {description}
            </motion.p>
          )}

          {(hasRating || hasSessions) && (
            <motion.ul
              {...item(0.32)}
              className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.95rem] text-brand-neutral-600"
              aria-label="سوابق و امتیاز"
            >
              {hasRating && (
                <li className="flex items-center gap-1.5">
                  <Star className="size-[18px] fill-amber-500 text-amber-500" aria-hidden="true" />
                  <span className="font-bold text-brand-neutral-900">{formatRating(coach.rating)}</span>
                  <span>امتیاز</span>
                </li>
              )}
              {hasRating && hasSessions && <li aria-hidden="true" className="size-1 rounded-full bg-brand-neutral-400" />}
              {hasSessions && (
                <li className="flex items-center gap-1.5">
                  <span className="font-bold text-brand-neutral-900">{toFa(coach.totalSessions)}+</span>
                  <span>جلسه کوچینگ</span>
                </li>
              )}
            </motion.ul>
          )}

          <motion.div {...item(0.4)} id="hero-cta" className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4 md:mt-10">
            <BookButton size="lg" className="w-full sm:w-auto">
              <CalendarCheck aria-hidden="true" />
              {freeSession ? 'رزرو جلسه صفر رایگان' : 'رزرو جلسه'}
            </BookButton>
            {(flags.packages || flags.about) && (
              <Button asChild variant="ghost" size="lg" className="w-full sm:w-auto">
                <a href={flags.packages ? '#packages' : '#about'}>
                  {flags.packages ? 'مشاهده پکیج‌ها' : 'بیشتر درباره من'}
                  <ArrowLeft aria-hidden="true" className="transition-transform group-hover/btn:-translate-x-1 motion-reduce:transform-none" />
                </a>
              </Button>
            )}
          </motion.div>

          {freeSession && (
            <motion.p {...item(0.46)} className="mt-4 flex items-center gap-2 text-sm text-brand-neutral-600">
              <Check className="size-4 text-brand-teal-700" aria-hidden="true" />
              جلسه صفر {freeSession.duration}، رایگان و بدون تعهد
            </motion.p>
          )}
        </div>

        {/* --------------------------- Portrait -------------------------- */}
        <motion.div
          className="order-1 mx-auto w-full max-w-[340px] sm:max-w-[400px] md:order-2 md:max-w-none"
          initial={reduce ? false : { scale: 0.97, y: 16 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ duration: 1, ease: EXPO_OUT }}
        >
          <Portrait coach={coach} icfLabel={icf ? 'دارای مدرک ICF' : undefined} />
        </motion.div>
      </div>
    </section>
  );
}

function Portrait({ coach, icfLabel }: { coach: CoachProfile; icfLabel?: string }) {
  const src = coach.coverImage || coach.imageUrl;

  return (
    <div className="relative mx-auto w-full md:max-w-[460px] lg:max-w-[500px]">
      {/* Organic backdrop and a hairline echo of the arch */}
      <div
        aria-hidden="true"
        className="absolute -inset-x-6 -inset-y-5 -rotate-[5deg] bg-brand-teal-100 [border-radius:58%_42%_46%_54%/46%_52%_48%_54%] md:-inset-x-10 md:-inset-y-8"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 translate-x-3 translate-y-3 rounded-b-[36px] rounded-t-[999px] border border-brand-teal-400/60 md:translate-x-4 md:translate-y-4"
      />

      <div className="relative aspect-[4/5] overflow-hidden rounded-b-[36px] rounded-t-[999px] bg-brand-teal-50 md:aspect-[5/6]">
        {src ? (
          <Image
            src={src}
            alt={`پرتره ${coach.name}`}
            fill
            priority
            sizes="(min-width: 1024px) 500px, (min-width: 768px) 46vw, 400px"
            className="object-cover object-[50%_20%]"
          />
        ) : (
          <div className="flex size-full items-center justify-center text-6xl font-extrabold text-brand-teal-900/30">
            {coach.name.charAt(0)}
          </div>
        )}
      </div>

      {icfLabel && (
        <div className="absolute -bottom-4 start-5 flex items-center gap-2 rounded-full bg-white py-2.5 pe-5 ps-3.5 text-sm font-bold text-brand-teal-900 shadow-[0_18px_36px_-14px_rgba(15,34,32,0.35),0_2px_6px_rgba(15,34,32,0.08)]">
          <BadgeCheck className="size-5 text-brand-teal-700" aria-hidden="true" />
          {icfLabel}
        </div>
      )}
    </div>
  );
}
