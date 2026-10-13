import type { CoachProfile } from '@/lib/coaches';
import { firstName } from '@/lib/format';
import { cn } from '@/lib/utils';
import { Reveal } from './animations/Reveal';
import { PackageCard } from './cards/PackageCard';
import { EditorialHeading } from './editorial/EditorialHeading';
import { Section, type SectionTone } from './editorial/Section';

/**
 * Premium pricing, written for a person rather than a SaaS plan table.
 * A single offer becomes one featured offer instead of a one-card grid.
 */
export function CoachPackages({ coach, tone }: { coach: CoachProfile; tone?: SectionTone }) {
  const packages = coach.packagesData;
  if (!packages || packages.length === 0) return null;

  const single = packages.length === 1;
  const hasFreeSession = Boolean(coach.services?.some((s) => s.isFree));

  const columns =
    packages.length === 2 ? 'md:grid-cols-2' : packages.length === 3 ? 'lg:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-4';

  return (
    <Section id="packages" labelledBy="packages-title" tone={tone}>
      <Reveal>
        <EditorialHeading
          id="packages-title"
          align="center"
          lead="سرمایه‌گذاری شفاف، بدون هزینه پنهان. اگر مطمئن نیستید کدام مسیر مناسب‌تر است، با جلسه صفر شروع کنید."
        >
          پکیج‌های کوچینگ
        </EditorialHeading>
      </Reveal>

      <div className={cn('mx-auto mt-14 grid gap-5 md:mt-20 md:gap-6', single ? 'max-w-[1040px]' : cn('max-w-[1040px]', columns))}>
        {packages.map((pkg, index) => (
          <Reveal key={pkg.id} delay={index * 0.08} className="h-full">
            <PackageCard pkg={pkg} featured={single || pkg.isPopular} wide={single} />
          </Reveal>
        ))}
      </div>

      {hasFreeSession && (
        <Reveal className="mt-10 text-center">
          <p className="text-base text-brand-neutral-600">
            پیش از هر پرداخت، می‌توانید در یک جلسه صفر رایگان با {firstName(coach.name)} آشنا شوید.
          </p>
        </Reveal>
      )}
    </Section>
  );
}
