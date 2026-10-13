import { ArrowLeft, Clock } from 'lucide-react';

import type { CoachProfile } from '@/lib/coaches';
import { toFa } from '@/lib/format';
import { Button } from '@/components/ui/button';
import { Reveal } from './animations/Reveal';
import { BookButton } from './CoachBooking';
import { EditorialHeading } from './editorial/EditorialHeading';
import { Section, type SectionTone } from './editorial/Section';

type Row = {
  id: string;
  title: string;
  meta: string;
  description: string;
  isFree?: boolean;
  cta: 'book' | 'packages';
  offeringId?: string;
};

/**
 * "How can we work together?" as a ladder of ways in: free first session, a single session, a multi-session path.
 * Prices live only in the Packages section so nothing is stated twice.
 */
export function CoachServices({ coach, tone }: { coach: CoachProfile; tone?: SectionTone }) {
  const services = coach.services ?? [];
  const packages = coach.packagesData ?? [];
  if (services.length === 0) return null;

  const singleSessionPackage = packages.find((p) => p.sessions === 1);
  const multiPackages = packages.filter((p) => p.sessions > 1);

  const rows: Row[] = services.map((service) => ({
    id: service.id,
    title: service.title,
    meta: service.duration,
    description: service.description,
    isFree: service.isFree,
    cta: 'book',
    offeringId: service.isFree ? service.id : singleSessionPackage?.id,
  }));

  if (multiPackages.length > 0) {
    const minSessions = Math.min(...multiPackages.map((p) => p.sessions));
    rows.push({
      id: 'packages-row',
      title: 'پکیج کوچینگ',
      meta: `از ${toFa(minSessions)} جلسه`,
      description: 'برای تغییرهای پایدارتر، چند جلسه پشت‌سرهم با فرصت تمرین و بازنگری بین جلسه‌ها.',
      cta: 'packages',
    });
  }

  return (
    <Section id="services" labelledBy="services-title" tone={tone}>
      <Reveal>
        <EditorialHeading id="services-title" lead="از یک گفتگوی کوتاه و آشنایی شروع کنید؛ هر وقت آماده بودید، مسیر را عمیق‌تر کنید.">
          چطور می‌توانیم با هم کار کنیم؟
        </EditorialHeading>
      </Reveal>

      <ul className="mt-12 md:mt-20">
        {rows.map((row, index) => (
          <Reveal
            as="li"
            key={row.id}
            delay={index * 0.07}
            className="grid gap-5 border-b border-brand-surface-border py-9 first:border-t md:grid-cols-12 md:items-center md:gap-8 md:py-12"
          >
            <div className="flex flex-col items-start gap-3 md:col-span-4">
              <h3 className="text-[1.75rem] font-extrabold leading-[1.5] text-brand-neutral-900 md:text-3xl">{row.title}</h3>
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-surface-muted px-3 py-1.5 text-sm font-medium text-brand-neutral-700">
                  <Clock className="size-3.5" aria-hidden="true" />
                  {row.meta}
                </span>
                {row.isFree && (
                  <span className="rounded-full bg-brand-teal-900 px-3 py-1.5 text-sm font-bold text-white">رایگان</span>
                )}
              </div>
            </div>

            <p className="text-pretty text-base leading-[2.1] text-brand-neutral-600 md:col-span-5 md:text-lg">
              {row.description}
            </p>

            <div className="md:col-span-3 md:justify-self-end">
              {row.cta === 'packages' ? (
                <Button asChild variant="secondary" className="w-full md:w-auto">
                  <a href="#packages">
                    مشاهده پکیج‌ها
                    <ArrowLeft aria-hidden="true" className="transition-transform group-hover/btn:-translate-x-1 motion-reduce:transform-none" />
                  </a>
                </Button>
              ) : (
                <BookButton
                  variant={row.isFree ? 'primary' : 'secondary'}
                  intent={{ offeringId: row.offeringId }}
                  className="w-full md:w-auto"
                >
                  {row.isFree ? 'رزرو جلسه صفر' : 'رزرو این جلسه'}
                </BookButton>
              )}
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
