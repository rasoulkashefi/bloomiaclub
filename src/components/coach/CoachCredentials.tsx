import { BadgeCheck } from 'lucide-react';

import type { CoachProfile } from '@/lib/coaches';
import { Reveal } from './animations/Reveal';
import { EditorialHeading } from './editorial/EditorialHeading';
import { Section, type SectionTone } from './editorial/Section';

/** Credentials sit deliberately low on the page: trust that is verified, not a CV up front. */
export function CoachCredentials({ coach, tone }: { coach: CoachProfile; tone?: SectionTone }) {
  const credentials = coach.credentials;
  if (!credentials || credentials.length === 0) return null;

  return (
    <Section id="credentials" labelledBy="credentials-title" tone={tone}>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <Reveal>
            <EditorialHeading id="credentials-title" lead="آموزش و مدارکی که چارچوب حرفه‌ای و اخلاقی جلسه‌ها را می‌سازند.">
              تجربه و تخصص
            </EditorialHeading>
          </Reveal>
        </div>

        <ul className="lg:col-span-7">
          {credentials.map((credential, index) => (
            <Reveal
              as="li"
              key={credential.id}
              delay={index * 0.06}
              className="flex items-start justify-between gap-6 border-b border-brand-surface-border py-6 first:border-t md:py-8"
            >
              <div className="flex items-start gap-4">
                <BadgeCheck className="mt-2 size-5 shrink-0 text-brand-teal-700" aria-hidden="true" />
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-bold leading-[1.9] text-brand-neutral-900 md:text-xl">{credential.title}</h3>
                  <p className="text-base text-brand-neutral-600">{credential.organization}</p>
                </div>
              </div>
              {credential.year && (
                <span className="shrink-0 pt-1.5 text-base font-medium tabular-nums text-brand-neutral-600">{credential.year}</span>
              )}
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
