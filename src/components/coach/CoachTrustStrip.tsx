import type { CoachProfile } from '@/lib/coaches';
import { CountUp } from './animations/CountUp';
import { Reveal } from './animations/Reveal';

type Metric = { label: string; value: number; suffix?: string; decimals?: number };

/**
 * Editorial metrics strip: hairlines only, no cards.
 * Only real, non-zero values are shown.
 */
export function CoachTrustStrip({ coach }: { coach: CoachProfile }) {
  const metrics: Metric[] = [
    { label: 'جلسه کوچینگ', value: coach.totalSessions, suffix: '+' },
    { label: 'سال تجربه', value: coach.experienceYears ?? 0, suffix: '+' },
    { label: 'امتیاز مراجعان', value: coach.rating, decimals: 1 },
    { label: 'مراجع همراه‌شده', value: coach.satisfiedClients, suffix: '+' },
  ].filter((m) => m.value > 0);

  if (metrics.length < 2) return null;

  return (
    <section aria-label="آمار و سوابق" className="bg-brand-surface pb-10 md:pb-14 lg:pb-16">
      <Reveal className="mx-auto w-full max-w-[1280px] px-5 md:px-8">
        <dl
          className={`grid gap-px overflow-hidden border-y border-brand-surface-border bg-brand-surface-border ${
            metrics.length >= 4 ? 'grid-cols-2 lg:grid-cols-4' : metrics.length === 3 ? 'grid-cols-3' : 'grid-cols-2'
          }`}
        >
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="flex flex-col-reverse items-start gap-2 bg-brand-surface px-1 py-6 md:px-6 md:py-8 lg:px-8"
            >
              <dt className="text-sm font-medium text-brand-neutral-600 md:text-base">{metric.label}</dt>
              <dd className="flex items-baseline gap-0.5 text-[2.5rem] font-extrabold leading-none text-brand-teal-900 md:text-6xl">
                <CountUp value={metric.value} decimals={metric.decimals} className="tabular-nums" />
                {metric.suffix && <span className="text-[0.55em] font-bold text-brand-teal-700">{metric.suffix}</span>}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
