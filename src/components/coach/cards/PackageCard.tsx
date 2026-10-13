import { Check } from 'lucide-react';

import type { Package } from '@/lib/coaches';
import { formatNumber, formatToman, toFa } from '@/lib/format';
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
  const price = formatToman(pkg.price);
  const perSession = pkg.sessions > 1 && pkg.price > 0 ? `${formatNumber(pkg.price / pkg.sessions)} تومان برای هر جلسه` : null;

  return (
    <article
      aria-label={pkg.title}
      className={cn(
        'relative flex h-full flex-col rounded-[28px] p-7 md:p-10',
        wide && 'md:flex-row md:items-center md:gap-14 md:p-14',
        featured
          ? 'bg-brand-teal-900 text-white shadow-[0_30px_60px_-30px_rgba(31,61,58,0.65),0_8px_20px_-12px_rgba(31,61,58,0.4)]'
          : 'border border-brand-surface-border bg-white text-brand-neutral-900'
      )}
    >
      <div className={cn('flex flex-1 flex-col', wide && 'md:max-w-[52ch]')}>
        {pkg.isPopular && (
          <span className="mb-6 inline-flex w-fit items-center rounded-full bg-white px-3.5 py-1.5 text-sm font-bold text-brand-teal-900">
            محبوب‌ترین انتخاب
          </span>
        )}

        <h3 className={cn('text-[1.75rem] font-extrabold leading-[1.5] md:text-3xl', featured ? 'text-white' : 'text-brand-neutral-900')}>
          {pkg.title}
        </h3>

        <p className={cn('mt-3 text-[0.95rem] font-medium', featured ? 'text-brand-teal-200' : 'text-brand-neutral-600')}>
          {toFa(pkg.sessions)} جلسه · {pkg.duration}
        </p>

        <p className={cn('mt-6 text-pretty text-base leading-[2.1]', featured ? 'text-brand-teal-100' : 'text-brand-neutral-600')}>
          {pkg.description}
        </p>

        {pkg.features && pkg.features.length > 0 && (
          <ul className="mt-6 flex flex-col gap-3">
            {pkg.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-base leading-8">
                <Check className={cn('mt-1.5 size-[18px] shrink-0', featured ? 'text-brand-teal-200' : 'text-brand-teal-700')} aria-hidden="true" />
                {feature}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={cn('mt-10 flex flex-col gap-6', wide ? 'md:mt-0 md:w-[320px] md:shrink-0' : 'md:mt-12')}>
        <div className="flex flex-col gap-1.5">
          <p className="text-[2rem] font-extrabold leading-tight tabular-nums md:text-[2.5rem]">{price ?? 'پس از هماهنگی'}</p>
          {perSession && (
            <p className={cn('text-sm', featured ? 'text-brand-teal-200' : 'text-brand-neutral-600')}>{perSession}</p>
          )}
        </div>
        <BookButton
          size="lg"
          variant={featured ? 'light' : 'primary'}
          intent={{ offeringId: pkg.id }}
          className="w-full"
        >
          انتخاب {pkg.title}
        </BookButton>
      </div>
    </article>
  );
}
