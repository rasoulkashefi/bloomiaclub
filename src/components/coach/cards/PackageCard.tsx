import { Check } from 'lucide-react';

import type { Package } from '@/lib/coaches';
import { formatNumber, toFa } from '@/lib/format';
import { cn } from '@/lib/utils';
import { BookButton } from '../CoachBooking';

type PackageCardProps = {
  pkg: Package;
  /** Visual emphasis: the featured offer is set on the dark brand surface. */
  featured?: boolean;
  /** Wide layout used when the coach has a single offer. */
  wide?: boolean;
};

export function PackageCard({ pkg, featured = false, wide = false }: PackageCardProps) {
  const hasPrice = typeof pkg.price === 'number' && pkg.price > 0;
  const perSession = pkg.sessions > 1 && hasPrice ? `${formatNumber(Math.round(pkg.price / pkg.sessions))} تومان برای هر جلسه` : null;

  return (
    <article
      aria-label={pkg.title}
      className={cn(
        'relative flex h-full flex-col rounded-[26px] p-6 sm:p-7 md:p-8 xl:p-6 2xl:p-7',
        wide && 'md:flex-row md:items-center md:gap-14 md:p-12',
        featured
          ? 'bg-brand-teal-900 text-white shadow-[0_24px_48px_-20px_rgba(31,61,58,0.55),0_8px_16px_-8px_rgba(31,61,58,0.3)]'
          : 'border border-brand-surface-border bg-white text-brand-neutral-900 shadow-sm'
      )}
    >
      <div className={cn('flex flex-1 flex-col', wide && 'md:max-w-[52ch]')}>
        {pkg.isPopular && (
          <span className="mb-4 inline-flex w-fit items-center rounded-full bg-brand-teal-100 px-3 py-1 text-xs font-bold text-brand-teal-900">
            محبوب‌ترین انتخاب
          </span>
        )}

        <h3 className={cn('text-xl font-extrabold leading-[1.4] sm:text-2xl', featured ? 'text-white' : 'text-brand-neutral-900')}>
          {pkg.title}
        </h3>

        <p className={cn('mt-2 text-xs font-semibold sm:text-sm', featured ? 'text-brand-teal-200' : 'text-brand-neutral-600')}>
          {toFa(pkg.sessions)} جلسه · {pkg.duration}
        </p>

        <p className={cn('mt-4 text-pretty text-xs leading-[2] sm:text-sm sm:leading-[2.1]', featured ? 'text-brand-teal-100' : 'text-brand-neutral-600')}>
          {pkg.description}
        </p>

        {pkg.features && pkg.features.length > 0 && (
          <ul className="mt-5 flex flex-col gap-2.5 border-t border-brand-surface-border/25 pt-4 sm:gap-3">
            {pkg.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-xs leading-6 sm:text-sm sm:leading-7">
                <Check className={cn('mt-1 size-4 shrink-0', featured ? 'text-brand-teal-300' : 'text-brand-teal-700')} aria-hidden="true" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={cn('mt-6 flex flex-col gap-4 border-t border-brand-surface-border/25 pt-4 sm:mt-8 sm:gap-5', wide && 'md:mt-0 md:w-[280px] md:shrink-0 md:border-t-0 md:pt-0')}>
        <div className="flex flex-col gap-1">
          {hasPrice ? (
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className={cn('text-2xl font-black tracking-tight tabular-nums sm:text-3xl xl:text-[1.7rem]', featured ? 'text-white' : 'text-brand-neutral-900')}>
                {formatNumber(pkg.price)}
              </span>
              <span className={cn('text-xs font-bold', featured ? 'text-brand-teal-200' : 'text-brand-neutral-500')}>
                تومان
              </span>
            </div>
          ) : (
            <p className="text-lg font-bold">{pkg.price ?? 'پس از هماهنگی'}</p>
          )}

          {perSession && (
            <p className={cn('text-xs', featured ? 'text-brand-teal-200' : 'text-brand-neutral-500')}>{perSession}</p>
          )}
        </div>

        <BookButton
          size="lg"
          variant={featured ? 'light' : 'primary'}
          intent={{ offeringId: pkg.id }}
          className="w-full text-sm font-bold sm:text-base"
        >
          انتخاب {pkg.title}
        </BookButton>
      </div>
    </article>
  );
}
