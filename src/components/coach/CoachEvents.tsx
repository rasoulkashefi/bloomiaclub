import { ArrowLeft, MapPin } from 'lucide-react';

import type { CoachProfile } from '@/lib/coaches';
import { Button } from '@/components/ui/button';
import { Reveal } from './animations/Reveal';
import { EditorialHeading } from './editorial/EditorialHeading';
import { Section, type SectionTone } from './editorial/Section';

/** "۲۸ مهر ۱۴۰۵" -> { day: "۲۸", rest: "مهر ۱۴۰۵" } */
function splitDate(date: string) {
  const [day, ...rest] = date.trim().split(/\s+/);
  return { day, rest: rest.join(' ') };
}

/** Upcoming events as an editorial list (date, title, place), not a card grid. */
export function CoachEvents({ coach, tone }: { coach: CoachProfile; tone?: SectionTone }) {
  const events = coach.events;
  if (!events || events.length === 0) return null;

  return (
    <Section id="events" labelledBy="events-title" tone={tone}>
      <Reveal>
        <EditorialHeading id="events-title">رویدادهای پیش رو</EditorialHeading>
      </Reveal>

      <ul className="mt-12 md:mt-16">
        {events.map((event, index) => {
          const { day, rest } = splitDate(event.date);
          return (
            <Reveal
              as="li"
              key={event.id}
              delay={index * 0.07}
              className="grid grid-cols-[auto_1fr] items-start gap-x-6 gap-y-5 border-b border-brand-surface-border py-8 first:border-t md:grid-cols-[180px_1fr_auto] md:items-center md:gap-x-12 md:py-11"
            >
              <div className="flex flex-col leading-none">
                <span className="text-[3rem] font-extrabold text-brand-teal-900 md:text-[4rem]">{day}</span>
                <span className="mt-2 text-sm font-medium text-brand-neutral-600">{rest}</span>
              </div>

              <div className="flex flex-col gap-3">
                <span className="w-fit rounded-full bg-brand-teal-100 px-3 py-1 text-sm font-bold text-brand-teal-900">
                  {event.type}
                </span>
                <h3 className="text-balance text-xl font-bold leading-[1.9] text-brand-neutral-900 md:text-2xl md:leading-[1.8]">
                  {event.title}
                </h3>
                <p className="flex items-center gap-1.5 text-sm text-brand-neutral-600">
                  <MapPin className="size-4" aria-hidden="true" />
                  {event.location}
                </p>
              </div>

              {event.href && (
                <Button asChild variant="secondary" className="col-span-2 w-full md:col-span-1 md:w-auto">
                  <a href={event.href}>
                    مشاهده رویداد
                    <ArrowLeft aria-hidden="true" className="transition-transform group-hover/btn:-translate-x-1 motion-reduce:transform-none" />
                  </a>
                </Button>
              )}
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
