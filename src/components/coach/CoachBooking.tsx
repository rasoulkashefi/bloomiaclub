'use client';

import * as React from 'react';
import { CalendarCheck, CheckCircle2, Clock, Lock } from 'lucide-react';

import type { CoachProfile } from '@/lib/coaches';
import { supabase } from '@/lib/supabase';
import { firstName, formatToman, toFa, toLatinDigits } from '@/lib/format';
import { cn } from '@/lib/utils';
import { Button, type ButtonProps } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';

/* -------------------------------------------------------------------------- */
/*  Offerings the visitor can book                                            */
/* -------------------------------------------------------------------------- */

export type BookingOffering = {
  id: string;
  title: string;
  meta: string;
  priceLabel: string;
};

export function getBookingOfferings(coach: CoachProfile): BookingOffering[] {
  const offerings: BookingOffering[] = [];

  const free = coach.services?.find((s) => s.isFree);
  if (free) {
    offerings.push({ id: free.id, title: free.title, meta: free.duration, priceLabel: 'رایگان' });
  }

  for (const pkg of coach.packagesData ?? []) {
    offerings.push({
      id: pkg.id,
      title: pkg.title,
      meta: `${toFa(pkg.sessions)} جلسه · ${pkg.duration}`,
      priceLabel: formatToman(pkg.price) ?? 'پس از هماهنگی',
    });
  }

  return offerings;
}

/* -------------------------------------------------------------------------- */
/*  Context                                                                   */
/* -------------------------------------------------------------------------- */

export type BookingIntent = {
  offeringId?: string;
  topic?: string;
};

type BookingContextValue = {
  open: (intent?: BookingIntent) => void;
  isOpen: boolean;
  externalUrl?: string | null;
  hasFreeSession: boolean;
};

const BookingContext = React.createContext<BookingContextValue | null>(null);

export function useBooking() {
  const ctx = React.useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used inside <CoachBookingProvider />');
  return ctx;
}

const PHONE_PATTERN = /^09\d{9}$/;

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function CoachBookingProvider({ coach, children }: { coach: CoachProfile; children: React.ReactNode }) {
  const offerings = React.useMemo(() => getBookingOfferings(coach), [coach]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [offeringId, setOfferingId] = React.useState(offerings[0]?.id ?? '');
  const [fullName, setFullName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [topic, setTopic] = React.useState('');
  const [status, setStatus] = React.useState<Status>('idle');
  const [fieldError, setFieldError] = React.useState<{ name?: string; phone?: string } | null>(null);

  const hasFreeSession = Boolean(coach.services?.some((s) => s.isFree));

  const open = React.useCallback(
    (intent?: BookingIntent) => {
      if (intent?.offeringId && offerings.some((o) => o.id === intent.offeringId)) {
        setOfferingId(intent.offeringId);
      } else if (offerings[0]) {
        setOfferingId((current) => current || offerings[0].id);
      }
      if (intent?.topic) setTopic(intent.topic);
      setStatus((s) => (s === 'success' ? 'idle' : s));
      setIsOpen(true);
    },
    [offerings]
  );

  const reset = () => {
    setStatus('idle');
    setFullName('');
    setPhone('');
    setTopic('');
    setFieldError(null);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = fullName.trim();
    const cleanPhone = toLatinDigits(phone).replace(/[\s-]/g, '');

    const errors: { name?: string; phone?: string } = {};
    if (name.length < 2) errors.name = 'لطفاً نام خود را وارد کنید.';
    if (!PHONE_PATTERN.test(cleanPhone)) errors.phone = 'شماره موبایل باید ۱۱ رقم و با ۰۹ شروع شود.';
    setFieldError(Object.keys(errors).length ? errors : null);
    if (Object.keys(errors).length) return;

    setStatus('submitting');
    const offering = offerings.find((o) => o.id === offeringId);

    try {
      const { error } = await supabase.from('leads').insert([
        {
          full_name: name,
          phone: cleanPhone,
          package_name: offering?.title ?? 'جلسه معارفه (جلسه صفر)',
          coach_id: coach.id,
          coach_name: coach.name,
          message: topic.trim(),
          created_at: new Date().toISOString(),
        },
      ]);
      if (error) throw error;
      setStatus('success');
    } catch (error) {
      console.error('Booking lead failed:', error);
      setStatus('error');
    }
  };

  const value = React.useMemo<BookingContextValue>(
    () => ({ open, isOpen, externalUrl: coach.bookingUrl, hasFreeSession }),
    [open, isOpen, coach.bookingUrl, hasFreeSession]
  );

  const coachFirstName = firstName(coach.name);

  return (
    <BookingContext.Provider value={value}>
      {children}

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="bottom" aria-describedby="booking-description" className="overflow-y-auto">
          {status === 'success' ? (
            <div className="flex flex-col items-center gap-5 px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-14 text-center md:px-10 md:pb-10">
              <span className="flex size-16 items-center justify-center rounded-full bg-brand-teal-100 text-brand-teal-900">
                <CheckCircle2 className="size-8" aria-hidden="true" />
              </span>
              <SheetHeader className="items-center text-center">
                <SheetTitle>درخواست شما ثبت شد</SheetTitle>
                <SheetDescription id="booking-description" className="max-w-[34ch]">
                  همکاران بلومیا به‌زودی برای هماهنگی زمان جلسه با {coachFirstName} با شما تماس می‌گیرند.
                </SheetDescription>
              </SheetHeader>
              <Button
                variant="primary"
                className="mt-2 w-full"
                onClick={() => {
                  setIsOpen(false);
                  reset();
                }}
              >
                بازگشت به صفحه
              </Button>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              noValidate
              className="flex flex-col gap-6 overflow-y-auto px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-8 md:px-10 md:pb-10 md:pt-10"
            >
              <SheetHeader className="pe-10">
                <SheetTitle>رزرو جلسه با {coachFirstName}</SheetTitle>
                <SheetDescription id="booking-description">
                  شماره‌تان را بگذارید تا همکاران بلومیا زمان مناسب را با شما هماهنگ کنند.
                </SheetDescription>
              </SheetHeader>

              {offerings.length > 1 && (
                <fieldset className="flex flex-col gap-2.5">
                  <legend className="mb-1 text-sm font-semibold text-brand-neutral-900">کدام مسیر را می‌خواهید؟</legend>
                  {offerings.map((offering) => (
                    <label key={offering.id} className="block cursor-pointer">
                      <input
                        type="radio"
                        name="offering"
                        value={offering.id}
                        checked={offeringId === offering.id}
                        onChange={() => setOfferingId(offering.id)}
                        className="peer sr-only"
                      />
                      <span className="flex min-h-[56px] items-center justify-between gap-4 rounded-2xl border border-brand-surface-border bg-white px-4 py-3 transition-colors peer-checked:border-brand-teal-900 peer-checked:bg-brand-teal-50 peer-focus-visible:ring-2 peer-focus-visible:ring-brand-teal-900 peer-focus-visible:ring-offset-2 hover:border-brand-teal-900/40">
                        <span className="flex flex-col">
                          <span className="text-[0.95rem] font-semibold text-brand-neutral-900">{offering.title}</span>
                          <span className="text-xs text-brand-neutral-600">{offering.meta}</span>
                        </span>
                        <span className="shrink-0 text-sm font-bold text-brand-teal-900">{offering.priceLabel}</span>
                      </span>
                    </label>
                  ))}
                </fieldset>
              )}

              <div className="flex flex-col gap-5">
                <Field label="نام و نام خانوادگی" error={fieldError?.name} htmlFor="booking-name">
                  <input
                    id="booking-name"
                    type="text"
                    name="name"
                    autoComplete="name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    aria-invalid={Boolean(fieldError?.name)}
                    aria-describedby={fieldError?.name ? 'booking-name-error' : undefined}
                    className={inputClass(Boolean(fieldError?.name))}
                  />
                </Field>

                <Field label="شماره موبایل" error={fieldError?.phone} htmlFor="booking-phone">
                  <input
                    id="booking-phone"
                    type="tel"
                    name="phone"
                    inputMode="tel"
                    autoComplete="tel"
                    dir="ltr"
                    placeholder="09123456789"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    aria-invalid={Boolean(fieldError?.phone)}
                    aria-describedby={fieldError?.phone ? 'booking-phone-error' : undefined}
                    className={cn(inputClass(Boolean(fieldError?.phone)), 'text-end placeholder:text-brand-neutral-400')}
                  />
                </Field>

                <Field label="موضوعی که می‌خواهید درباره‌اش حرف بزنیم (اختیاری)" htmlFor="booking-topic">
                  <textarea
                    id="booking-topic"
                    name="topic"
                    rows={3}
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className={cn(inputClass(false), 'min-h-[104px] resize-none py-3.5 leading-8')}
                  />
                </Field>
              </div>

              {status === 'error' && (
                <p
                  role="alert"
                  className="rounded-2xl bg-brand-surface-muted px-4 py-3 text-sm leading-7 text-brand-neutral-900"
                >
                  ثبت درخواست انجام نشد. اتصال اینترنت را بررسی کنید و دوباره تلاش کنید.
                </p>
              )}

              <div className="flex flex-col gap-4">
                <Button type="submit" size="lg" loading={status === 'submitting'} className="w-full">
                  <CalendarCheck aria-hidden="true" />
                  {status === 'submitting' ? 'در حال ثبت...' : 'ثبت درخواست رزرو'}
                </Button>
                <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-brand-neutral-600">
                  <li className="flex items-center gap-1.5">
                    <Lock className="size-3.5 text-brand-teal-700" aria-hidden="true" />
                    اطلاعات شما محرمانه می‌ماند
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Clock className="size-3.5 text-brand-teal-700" aria-hidden="true" />
                    پاسخ در ساعات کاری
                  </li>
                </ul>
              </div>
            </form>
          )}
        </SheetContent>
      </Sheet>
    </BookingContext.Provider>
  );
}

const inputClass = (invalid: boolean) =>
  cn(
    'min-h-[52px] w-full rounded-2xl border bg-white px-4 text-base text-brand-neutral-900 outline-none transition-[border-color,box-shadow]',
    'focus:border-brand-teal-900 focus:ring-2 focus:ring-brand-teal-900/25',
    invalid ? 'border-brand-neutral-900' : 'border-brand-surface-border hover:border-brand-neutral-400'
  );

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-sm font-semibold text-brand-neutral-900">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} role="alert" className="text-sm font-medium text-brand-neutral-900 underline decoration-brand-teal-900 decoration-2 underline-offset-4">
          {error}
        </p>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Trigger                                                                   */
/* -------------------------------------------------------------------------- */

type BookButtonProps = Omit<ButtonProps, 'asChild'> & {
  intent?: BookingIntent;
};

/**
 * Any "رزرو" call-to-action on the page. Opens the booking sheet,
 * or follows the coach's own booking link when one is configured.
 */
export const BookButton = React.forwardRef<HTMLButtonElement, BookButtonProps>(
  ({ intent, children, onClick, ...props }, ref) => {
    const { open, externalUrl } = useBooking();

    if (externalUrl) {
      return (
        <Button asChild {...props}>
          <a
            href={externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
          >
            {children}
          </a>
        </Button>
      );
    }

    return (
      <Button
        ref={ref}
        type="button"
        {...props}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) open(intent);
        }}
      >
        {children}
      </Button>
    );
  }
);
BookButton.displayName = 'BookButton';
