'use client';

import * as React from 'react';
import { Quote } from 'lucide-react';

import type { CoachProfile } from '@/lib/coaches';
import { toFa } from '@/lib/format';
import { cn } from '@/lib/utils';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, useCarousel } from '@/components/ui/carousel';
import { Reveal } from './animations/Reveal';
import { EditorialHeading } from './editorial/EditorialHeading';
import { Section, type SectionTone } from './editorial/Section';

/**
 * Editorial testimonial carousel: one large voice at a time, with the next slide peeking in.
 * shadcn/ui Carousel (Embla) in RTL.
 */
export function CoachTestimonials({ coach, tone }: { coach: CoachProfile; tone?: SectionTone }) {
  const testimonials = coach.testimonials;
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <Section id="testimonials" labelledBy="testimonials-title" tone={tone} containerClassName="overflow-hidden">
      <Carousel opts={{ direction: 'rtl', align: 'start', containScroll: 'trimSnaps', loop: false }}>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <EditorialHeading id="testimonials-title">تجربه همراهان</EditorialHeading>
          </Reveal>
          <Controls total={testimonials.length} className="hidden md:flex" />
        </div>

        <Reveal delay={0.1} className="mt-12 md:mt-16">
          <CarouselContent viewportClassName="overflow-visible" className="">
            {testimonials.map((t, index) => (
              <CarouselItem key={t.id} className="basis-[90%] md:basis-[72%] lg:basis-[58%]">
                <Slide index={index}>
                  <figure className="flex h-full flex-col justify-between gap-10">
                    <blockquote className="flex flex-col gap-6">
                      <Quote className="size-9 text-brand-teal-300 md:size-11" aria-hidden="true" />
                      <p className="text-pretty text-[1.35rem] font-semibold leading-[2.1] text-brand-neutral-900 md:text-[1.9rem] md:leading-[2.15]">
                        {t.quote}
                      </p>
                    </blockquote>
                    <figcaption className="flex items-center gap-4">
                      <span
                        aria-hidden="true"
                        className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand-teal-100 text-lg font-extrabold text-brand-teal-900"
                      >
                        {t.author.charAt(0)}
                      </span>
                      <span className="flex flex-col">
                        <cite className="text-base font-bold not-italic text-brand-neutral-900">{t.author}</cite>
                        <span className="text-sm text-brand-neutral-600">{t.context}</span>
                      </span>
                    </figcaption>
                  </figure>
                </Slide>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Reveal>

        <Controls total={testimonials.length} className="mt-8 md:hidden" />
      </Carousel>
    </Section>
  );
}

function Slide({ index, children }: { index: number; children: React.ReactNode }) {
  const { selectedIndex } = useCarousel();
  const isActive = index === selectedIndex;
  return (
    <div
      className={cn(
        'h-full rounded-[28px] bg-white p-7 transition-[opacity,transform] duration-700 ease-out md:p-12',
        isActive ? 'opacity-100' : 'opacity-60'
      )}
    >
      {children}
    </div>
  );
}

function Controls({ total, className }: { total: number; className?: string }) {
  const { selectedIndex } = useCarousel();
  if (total < 2) return null;

  return (
    <div className={cn('items-center gap-5', className ?? 'flex')}>
      <p className="text-sm font-medium tabular-nums text-brand-neutral-600" aria-live="polite">
        {toFa(String(selectedIndex + 1).padStart(2, '0'))} / {toFa(String(total).padStart(2, '0'))}
      </p>
      <div className="flex items-center gap-2.5">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </div>
  );
}
