import Image from 'next/image';

import type { CoachProfile } from '@/lib/coaches';
import { toFa } from '@/lib/format';
import { Reveal } from './animations/Reveal';
import { EditorialHeading } from './editorial/EditorialHeading';
import { Section, type SectionTone } from './editorial/Section';

const SESSION_MODE: Record<NonNullable<CoachProfile['sessionMode']>, string> = {
  online: 'آنلاین (تصویری)',
  'in-person': 'حضوری',
  both: 'آنلاین و حضوری',
};

/**
 * Split editorial story: philosophy first, CV later.
 * The first paragraph is set large as the personal statement.
 */
export function CoachAbout({ coach, tone }: { coach: CoachProfile; tone?: SectionTone }) {
  const story = coach.longBio || coach.longDescription;
  if (!story) return null;

  const [lead, ...rest] = story.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

  const facts: Array<{ label: string; value: string }> = [
    coach.sessionMode ? { label: 'شیوه جلسات', value: SESSION_MODE[coach.sessionMode] } : null,
    coach.languages?.length ? { label: 'زبان جلسات', value: coach.languages.join('، ') } : null,
    coach.experienceYears ? { label: 'تجربه', value: `بیش از ${toFa(coach.experienceYears)} سال` } : null,
    coach.location ? { label: 'شهر', value: coach.location } : null,
  ].filter((f): f is { label: string; value: string } => Boolean(f));

  return (
    <Section id="about" labelledBy="about-title" tone={tone}>
      <div className="grid gap-12 md:gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <EditorialHeading id="about-title">درباره من</EditorialHeading>
            </Reveal>

            {coach.aboutImage && (
              <Reveal delay={0.1} className="mt-10 hidden lg:block">
                <div className="relative aspect-[4/5] w-full max-w-[320px] overflow-hidden rounded-[32px] bg-brand-teal-50">
                  <Image
                    src={coach.aboutImage}
                    alt={`${coach.name} در جلسه کوچینگ`}
                    fill
                    sizes="320px"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            )}
          </div>
        </div>

        <div className="lg:col-span-8">
          <Reveal delay={0.05}>
            <p className="text-pretty text-[1.4rem] font-semibold leading-[2.2] text-brand-neutral-900 md:text-[1.75rem] md:leading-[2.3] lg:text-[2rem]">
              {lead}
            </p>
          </Reveal>

          {rest.length > 0 && (
            <div className="mt-8 flex max-w-[62ch] flex-col gap-6 md:mt-10">
              {rest.map((paragraph, i) => (
                <Reveal key={i} delay={0.1 + i * 0.05}>
                  <p className="text-pretty text-base leading-[2.2] text-brand-neutral-600 md:text-lg md:leading-[2.3]">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>
          )}

          {coach.aboutImage && (
            <Reveal className="mt-10 lg:hidden">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[28px] bg-brand-teal-50">
                <Image
                  src={coach.aboutImage}
                  alt={`${coach.name} در جلسه کوچینگ`}
                  fill
                  sizes="(min-width: 768px) 70vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          )}

          {facts.length > 0 && (
            <Reveal delay={0.1}>
              <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-0 border-t border-brand-surface-border md:mt-16 md:grid-cols-4">
                {facts.map((fact) => (
                  <div key={fact.label} className="flex flex-col gap-1.5 border-b border-brand-surface-border py-5 md:border-b-0 md:py-6">
                    <dt className="text-sm text-brand-neutral-600">{fact.label}</dt>
                    <dd className="text-base font-bold text-brand-neutral-900 md:text-lg">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          )}
        </div>
      </div>
    </Section>
  );
}
