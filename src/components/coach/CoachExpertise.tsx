import type { CoachProfile } from '@/lib/coaches';
import { toFa } from '@/lib/format';
import { Reveal } from './animations/Reveal';
import { EditorialHeading } from './editorial/EditorialHeading';
import { Section, type SectionTone } from './editorial/Section';

/**
 * Areas of expertise as a numbered, large-type editorial list (not a card grid).
 * Hovering one row quietly dims the others.
 */
export function CoachExpertise({ coach, tone }: { coach: CoachProfile; tone?: SectionTone }) {
  const areas = coach.specialties;
  if (!areas || areas.length === 0) return null;

  return (
    <Section id="expertise" labelledBy="expertise-title" tone={tone}>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <EditorialHeading
                id="expertise-title"
                lead={`${coach.name} در این مسیرها همراه شماست؛ هر کدام با گفتگوهایی روشن، صادقانه و بدون عجله.`}
              >
                حوزه‌هایی که در آن همراهتان هستم
              </EditorialHeading>
            </Reveal>
          </div>
        </div>

        <ol className="group/list lg:col-span-7">
          {areas.map((area, index) => (
            <Reveal
              as="li"
              key={area}
              delay={index * 0.06}
              className="flex items-baseline gap-5 border-b border-brand-surface-border py-6 transition-opacity duration-300 first:border-t group-hover/list:opacity-40 hover:!opacity-100 md:gap-8 md:py-9"
            >
              <span className="w-9 shrink-0 text-base font-medium tabular-nums text-brand-teal-700 md:w-12 md:text-lg">
                {toFa(String(index + 1).padStart(2, '0'))}
              </span>
              <h3 className="text-balance text-[1.6rem] font-extrabold leading-[1.6] text-brand-neutral-900 md:text-4xl md:leading-[1.5] lg:text-[2.75rem]">
                {area}
              </h3>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
