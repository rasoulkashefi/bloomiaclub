import Link from 'next/link';

import type { CoachProfile } from '@/lib/coaches';
import { getCoachNav, getSectionFlags } from './coach-sections';
import { InstagramIcon, LinkedinIcon } from './icons';

const linkClass =
  'rounded-md text-base text-brand-teal-100 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-brand-teal-950';

const socialClass =
  'flex size-11 items-center justify-center rounded-full border border-white/20 text-brand-teal-100 transition-colors hover:border-white/60 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-teal-950';

/** Minimal footer. Extra bottom padding on mobile clears the sticky booking bar. */
export function CoachFooter({ coach }: { coach: CoachProfile }) {
  const nav = getCoachNav(coach);
  const flags = getSectionFlags(coach);
  const links = [...nav, ...(flags.events ? [{ id: 'events', label: 'رویدادها' }] : [])];
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-teal-950 pb-[calc(7rem+env(safe-area-inset-bottom))] pt-16 text-white md:pb-12 md:pt-24">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-8">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="flex max-w-[34ch] flex-col gap-3">
            <p className="text-3xl font-extrabold leading-[1.5] md:text-4xl">{coach.name}</p>
            <p className="text-base leading-[2] text-brand-teal-200">{coach.title}</p>
          </div>

          <div className="flex flex-col gap-8 md:items-end">
            {links.length > 0 && (
              <nav aria-label="پیوندهای پایین صفحه">
                <ul className="flex flex-wrap gap-x-8 gap-y-1 md:justify-end">
                  {links.map((link) => (
                    <li key={link.id}>
                      <a href={`#${link.id}`} className={`${linkClass} flex min-h-11 items-center`}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            {(coach.instagramUrl || coach.linkedinUrl) && (
              <div className="flex items-center gap-2.5">
                {coach.instagramUrl && (
                  <a href={coach.instagramUrl} target="_blank" rel="noopener noreferrer" className={socialClass} aria-label="اینستاگرام">
                    <InstagramIcon className="size-5" />
                  </a>
                )}
                {coach.linkedinUrl && (
                  <a href={coach.linkedinUrl} target="_blank" rel="noopener noreferrer" className={socialClass} aria-label="لینکدین">
                    <LinkedinIcon className="size-5" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-brand-teal-300 md:mt-20 md:flex-row md:items-center md:justify-between">
          <p>
            این صفحه با{' '}
            <Link href="/" className="touch-auto rounded font-semibold text-brand-teal-100 underline-offset-4 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
              بلومیا
            </Link>{' '}
            ساخته شده است.
          </p>
          <p>© {new Intl.NumberFormat('fa-IR', { useGrouping: false }).format(year)} بلومیا کلاب</p>
        </div>
      </div>
    </footer>
  );
}
