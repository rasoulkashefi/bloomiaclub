import type { CoachProfile } from '@/lib/coaches';

export type CoachNavItem = { id: string; label: string };

const has = (list?: unknown[] | null) => Array.isArray(list) && list.length > 0;

/** Which optional sections have real data. "No empty sections" is enforced here and inside each section. */
export function getSectionFlags(coach: CoachProfile) {
  return {
    about: Boolean(coach.longBio || coach.longDescription),
    audience: has(coach.audience),
    expertise: has(coach.specialties),
    method: has(coach.method),
    services: has(coach.services),
    packages: has(coach.packagesData),
    testimonials: has(coach.testimonials),
    articles: has(coach.articles),
    events: has(coach.events),
    credentials: has(coach.credentials),
    faqs: has(coach.faqs),
  };
}

/** Anchors shown in the header and footer; only for sections that will actually render. */
export function getCoachNav(coach: CoachProfile): CoachNavItem[] {
  const f = getSectionFlags(coach);
  const items: Array<CoachNavItem & { show: boolean }> = [
    { id: 'about', label: 'درباره من', show: f.about },
    { id: 'expertise', label: 'تخصص‌ها', show: f.expertise },
    { id: 'method', label: 'روش من', show: f.method },
    { id: f.services ? 'services' : 'packages', label: 'خدمات', show: f.services || f.packages },
    { id: 'articles', label: 'مقالات', show: f.articles },
  ];
  return items.filter((i) => i.show).map(({ id, label }) => ({ id, label }));
}
