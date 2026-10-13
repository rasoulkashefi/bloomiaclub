import { CalendarCheck } from 'lucide-react';

import type { CoachProfile } from '@/lib/coaches';
import { Reveal } from './animations/Reveal';
import { BookButton } from './CoachBooking';
import { Section } from './editorial/Section';

/** Large editorial close: one idea, one action. */
export function CoachFinalCTA({ coach }: { coach: CoachProfile }) {
  const freeSession = coach.services?.find((s) => s.isFree);

  return (
    <Section id="booking" labelledBy="final-cta-title" tone="dark" className="overflow-hidden py-24 md:py-36 lg:py-48">
      {/* Organic shapes, purely atmospheric */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -start-32 size-[26rem] bg-brand-teal-800 [border-radius:58%_42%_46%_54%/46%_52%_48%_54%] md:size-[40rem]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -end-24 -top-24 size-64 rotate-45 bg-brand-teal-700/40 [border-radius:42%_58%_54%_46%/54%_46%_58%_42%] md:size-96"
      />

      <div className="relative mx-auto flex max-w-[860px] flex-col items-center text-center">
        <Reveal>
          <h2
            id="final-cta-title"
            className="text-balance text-[2.25rem] font-extrabold leading-[1.55] text-white md:text-6xl md:leading-[1.5] lg:text-[4.25rem]"
          >
            شاید همین امروز، زمان شروع یک تغییر کوچک باشد.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-6 max-w-[40ch] text-pretty text-lg leading-[2.1] text-brand-teal-100 md:mt-8 md:text-xl md:leading-[2.2]">
            با یک گفتگوی کوتاه شروع کنید و ببینید این مسیر برای شما مناسب است یا نه.
          </p>
        </Reveal>

        <Reveal delay={0.2} className="mt-10 flex w-full flex-col items-center gap-4 md:mt-12">
          <BookButton variant="light" size="lg" className="w-full sm:w-auto sm:min-w-[300px]">
            <CalendarCheck aria-hidden="true" />
            {freeSession ? 'رزرو جلسه صفر رایگان' : 'رزرو جلسه'}
          </BookButton>
          {freeSession && (
            <p className="text-sm text-brand-teal-200">
              جلسه صفر {freeSession.duration} است و هیچ تعهدی ندارد.
            </p>
          )}
        </Reveal>
      </div>
    </Section>
  );
}
