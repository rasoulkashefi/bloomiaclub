import { supabase } from './supabase';
import { sanityClient, coachesQuery, coachBySlugQuery } from './sanity';

export interface Coach {
  id: string | number;
  slug: string;
  name: string;
  title: string;
  description: string;
  longDescription?: string | null;
  imageUrl?: string | null;
  cutoutImageUrl?: string | null;
  coverImage?: string | null;
  specialties: string[];
  rating: number;
  totalReviews: number;
  totalSessions: number;
  coachingHours: number;
  satisfiedClients: number;
  videoUrl?: string | null;
  videoCover?: string | null;
  videoTitle?: string | null;
  videoDescription?: string | null;
  packagePrices?: Record<string, number | null>;
  packageDiscounts?: Record<string, number | null>;
  instagramUrl?: string | null;
  linkedinUrl?: string | null;
  bookingUrl?: string | null;
}

const supabaseBaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.REACT_APP_SUPABASE_URL ||
  'https://qxacvupalbfcoqkuydba.supabase.co';

const resolvePublicUrl = (value: any, bucket: string): string | null => {
  if (!value) return null;
  const cleaned = String(value).trim();
  if (!cleaned) return null;
  if (cleaned.startsWith('/')) return cleaned;
  if (/^https?:\/\//i.test(cleaned)) return cleaned;
  if (cleaned.startsWith('storage/v1/object/public/')) {
    return `${supabaseBaseUrl}/${cleaned}`;
  }
  if (cleaned.startsWith('/storage/v1/object/public/')) {
    return `${supabaseBaseUrl}${cleaned}`;
  }
  if (cleaned.startsWith('public/')) {
    return `${supabaseBaseUrl}/storage/v1/object/public/${cleaned.replace(/^public\//, '')}`;
  }
  if (cleaned.startsWith(`${bucket}/`)) {
    return `${supabaseBaseUrl}/storage/v1/object/public/${cleaned}`;
  }
  if (cleaned.includes('/')) {
    const [possibleBucket, ...rest] = cleaned.split('/');
    if (possibleBucket && rest.length > 0) {
      return `${supabaseBaseUrl}/storage/v1/object/public/${possibleBucket}/${rest.join('/')}`;
    }
  }
  return `${supabaseBaseUrl}/storage/v1/object/public/${bucket}/${cleaned}`;
};

const parseJsonField = (value: any, fallback: any) => {
  if (value == null) return fallback;
  if (typeof value === 'string') {
    try {
      return JSON.parse(value);
    } catch {
      return fallback;
    }
  }
  return value;
};

export const normalizeCoach = (coach: any): Coach => {
  const socialLinks = parseJsonField(coach.social_links, {}) || {};
  const tags = parseJsonField(coach.tags, []) || [];
  const packagePrices = parseJsonField(coach.package_prices, {}) || {};
  const packageDiscounts = parseJsonField(coach.package_discounts, {}) || {};

  return {
    id: coach.id || coach._id,
    slug: coach.slug || String(coach.id),
    name: coach.full_name || coach.name || 'کوچ بلومیا',
    title: coach.job_title || coach.title || 'کوچ حرفه‌ای ICF',
    description: coach.bio_short || coach.description || 'همراه شما در مسیر رشد و تحول فردی و حرفه‌ای.',
    longDescription: coach.bio_full || coach.longDescription || null,
    imageUrl: resolvePublicUrl(coach.avatar_url || coach.imageUrl, 'coaches_images'),
    cutoutImageUrl: resolvePublicUrl(coach.cutout_image_url || coach.cutoutImageUrl, 'coaches_images'),
    coverImage: resolvePublicUrl(coach.hero_image_url || coach.coverImage, 'coaches_images'),
    specialties: Array.isArray(tags) && tags.length > 0 ? tags : (coach.specialties || []),
    rating: coach.average_rating != null ? Number(coach.average_rating) : (coach.rating || 5),
    totalReviews: coach.review_count || coach.satisfied_clients || coach.totalReviews || 0,
    totalSessions: coach.coaching_hours || coach.totalSessions || 50,
    coachingHours: coach.coaching_hours || coach.coachingHours || 50,
    satisfiedClients: coach.satisfied_clients || coach.satisfiedClients || 20,
    videoUrl: coach.intro_video_url || coach.videoUrl || null,
    videoCover: resolvePublicUrl(coach.intro_video_cover || coach.videoCover, 'coaches_images'),
    videoTitle: coach.intro_video_title || coach.videoTitle || null,
    videoDescription: coach.intro_video_description || coach.videoDescription || null,
    packagePrices: Object.keys(packagePrices).length > 0 ? packagePrices : (coach.packagePrices || {
      start: 4500000,
      discovery: 6800000,
      transformation: 8900000,
      excellence: 13500000,
    }),
    packageDiscounts: Object.keys(packageDiscounts).length > 0 ? packageDiscounts : (coach.packageDiscounts || {
      discovery: 15,
      transformation: 20,
    }),
    instagramUrl: socialLinks.instagram || coach.instagramUrl || null,
    linkedinUrl: socialLinks.linkedin || coach.linkedinUrl || null,
    bookingUrl: socialLinks.booking || coach.bookingUrl || null,
  };
};

const cleanList = <T,>(list: unknown, keep: (item: any) => boolean): T[] | undefined => {
  if (!Array.isArray(list)) return undefined;
  const items = list.filter((item) => item && keep(item)) as T[];
  return items.length > 0 ? items : undefined;
};

const numberOrZero = (value: unknown): number =>
  typeof value === 'number' && Number.isFinite(value) ? value : 0;

const numericRecord = (value: unknown): Record<string, number | null> => {
  if (!value || typeof value !== 'object') return {};
  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>).filter(([key, v]) => !key.startsWith('_') && typeof v === 'number')
  ) as Record<string, number | null>;
};

/**
 * Sanity `coach` document (shape of COACH_PROJECTION in coach-sync.mjs) -> CoachProfile.
 * Unlike normalizeCoach this invents nothing: a missing stat stays 0 and the page hides it,
 * a missing section stays undefined and the page does not render it.
 */
export const normalizeSanityCoach = (doc: any): CoachProfile => {
  const description: string = doc.description || '';
  const longDescription: string | null = doc.longDescription || null;

  return {
    id: doc._id || doc.id || doc.slug,
    slug: doc.slug,
    name: doc.name,
    title: doc.title || 'کوچ حرفه‌ای بلومیا',
    description,
    shortBio: description || undefined,
    longDescription,
    longBio: longDescription || undefined,
    imageUrl: doc.imageUrl || null,
    cutoutImageUrl: doc.cutoutImageUrl || null,
    coverImage: doc.coverImage || null,
    aboutImage: doc.aboutImage || null,
    specialties: Array.isArray(doc.specialties) ? doc.specialties.filter(Boolean) : [],
    rating: numberOrZero(doc.rating),
    totalReviews: numberOrZero(doc.totalReviews),
    totalSessions: numberOrZero(doc.totalSessions) || numberOrZero(doc.coachingHours),
    coachingHours: numberOrZero(doc.coachingHours),
    satisfiedClients: numberOrZero(doc.satisfiedClients),
    experienceYears: numberOrZero(doc.experienceYears) || undefined,
    languages: cleanList<string>(doc.languages, Boolean),
    location: doc.location || undefined,
    sessionMode: doc.sessionMode || undefined,
    videoUrl: doc.videoUrl || null,
    videoCover: doc.videoCover || null,
    videoTitle: doc.videoTitle || null,
    videoDescription: doc.videoDescription || null,
    packagePrices: numericRecord(doc.packagePrices),
    packageDiscounts: numericRecord(doc.packageDiscounts),
    instagramUrl: doc.instagramUrl || null,
    linkedinUrl: doc.linkedinUrl || null,
    bookingUrl: doc.bookingUrl || null,

    audience: cleanList<AudienceItem>(doc.audience, (i) => i.title),
    method: cleanList<MethodStep>(doc.method, (i) => i.title),
    services: cleanList<Service>(doc.services, (i) => i.title),
    packagesData: cleanList<Package>(doc.packages, (i) => i.title && typeof i.price === 'number'),
    testimonials: cleanList<Testimonial>(doc.testimonials, (i) => i.quote),
    events: cleanList<Event>(doc.events, (i) => i.title && i.date),
    credentials: cleanList<Credential>(doc.credentials, (i) => i.title),
    faqs: cleanList<FAQ>(doc.faqs, (i) => i.question && i.answer),
  };
};

export type Specialty = string;

export type AudienceItem = {
  title: string;
};

export type MethodStep = {
  id: string;
  title: string;
  description: string;
};

export type Service = {
  id: string;
  title: string;
  duration: string;
  description: string;
  price?: number;
  isFree?: boolean;
};

export type Package = {
  id: string;
  title: string;
  sessions: number;
  duration: string;
  description: string;
  price: number;
  isPopular?: boolean;
  /** Optional bullet list of what the package includes. */
  features?: string[];
};

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  context: string;
};

export type Article = {
  id: string;
  title: string;
  date: string;
  readTime: string;
  imageUrl?: string;
  excerpt?: string;
  /** Public URL of the article (blog post). */
  href?: string;
};

export type Event = {
  id: string;
  title: string;
  date: string;
  type: string;
  location: string;
  href?: string;
};

export type Credential = {
  id: string;
  title: string;
  organization: string;
  year?: string;
};

export type FAQ = {
  question: string;
  answer: string;
};

export interface CoachProfile extends Coach {
  eyebrow?: string;
  shortBio?: string;
  longBio?: string;
  sessionMode?: "online" | "in-person" | "both";
  /** Optional second editorial photo used in the About section. */
  aboutImage?: string | null;
  experienceYears?: number;
  languages?: string[];
  location?: string;

  audience?: AudienceItem[];
  method?: MethodStep[];
  services?: Service[];
  packagesData?: Package[];
  testimonials?: Testimonial[];
  articles?: Article[];
  events?: Event[];
  credentials?: Credential[];
  faqs?: FAQ[];
}

// Fallback coaches for offline / zero latency SSR
export const fallbackCoaches: CoachProfile[] = [
  {
    id: 'salomeh-fathijoo',
    slug: 'saloomeh_fathijou',
    name: 'سالومه فتحی‌جو',
    title: 'کوچ توسعه فردی و تحول شغلی',
    eyebrow: 'کوچ حرفه‌ای بلومیا',
    shortBio: 'همراهت هستم تا با شناخت بهتر خودت، تصمیم‌های روشن‌تری بگیری و مسیر مناسب خودت را بسازی.',
    description: 'همراهت هستم تا با شناخت بهتر خودت، تصمیم‌های روشن‌تری بگیری و مسیر مناسب خودت را بسازی.',
    longBio: 'بیش از ۱۰ سال است که در زمینه تسهیل‌گری تحول فردی، خودشناسی و بازیابی انگیزه درونی فعالیت می‌کنم.\n\nرویکرد من مبتنی بر گفتگوهای عمیق، شفافیت ذهنی و کدهای اخلاقی فدراسیون بین‌المللی کوچینگ (ICF) است. در جلسات کوچینگ، فضایی امن و سرشار از همدلی می‌سازیم تا شما بتوانید با ارزش‌های اصیل خود همسو شده و تصمیماتی مقتدرانه برای زندگی و کارتان اتخاذ کنید.',
    longDescription: 'بیش از ۱۰ سال است که در زمینه تسهیل‌گری تحول فردی، خودشناسی و بازیابی انگیزه درونی فعالیت می‌کنم.\n\nرویکرد من مبتنی بر گفتگوهای عمیق، شفافیت ذهنی و کدهای اخلاقی فدراسیون بین‌المللی کوچینگ (ICF) است. در جلسات کوچینگ، فضایی امن و سرشار از همدلی می‌سازیم تا شما بتوانید با ارزش‌های اصیل خود همسو شده و تصمیماتی مقتدرانه برای زندگی و کارتان اتخاذ کنید.',
    imageUrl: '/images/the-modern-professional-coach.webp',
    cutoutImageUrl: '/images/coach-cutout-test.png',
    sessionMode: 'online',
    specialties: ['خودشناسی عمیق', 'وضوح درونی', 'تحول آگاهانه', 'ارزش‌های فردی و رسالت'],
    rating: 4.9,
    totalReviews: 310,
    totalSessions: 950,
    coachingHours: 950,
    satisfiedClients: 310,
    
    // --- Phase 1 Mock Data (Editorial Spec) ---
    audience: [
      { title: 'می‌خواهید مسیر شغلی‌تان را روشن‌تر کنید' },
      { title: 'در یک تصمیم مهم مانده‌اید' },
      { title: 'می‌خواهید خودتان را بهتر بشناسید' },
      { title: 'می‌خواهید تغییر را از آگاهی شروع کنید' }
    ],
    experienceYears: 10,
    languages: ['فارسی'],
    method: [
      { id: '01', title: 'شناخت', description: 'ابتدا با هم مرور می‌کنیم که الان کجا ایستاده‌اید، چه چیزی برایتان مهم است و دقیقاً با چه چالشی روبه‌رو هستید.' },
      { id: '02', title: 'وضوح', description: 'با پرسش‌های درست، گره‌های ذهنی را باز می‌کنیم تا گزینه‌ها و ارزش‌هایتان روشن‌تر دیده شوند.' },
      { id: '03', title: 'اقدام', description: 'وضوح را به یک برنامه عملی تبدیل می‌کنیم؛ قدم‌هایی کوچک، مشخص و متناسب با زندگی واقعی شما.' },
      { id: '04', title: 'همراهی', description: 'در مسیر اجرا کنار شما می‌مانم تا موانع را بشناسیم، مسیر را اصلاح کنیم و پیشرفت‌تان پایدار شود.' }
    ],
    services: [
      { id: 's1', title: 'جلسه صفر', duration: '۳۰ دقیقه', description: 'یک گفتگوی کوتاه برای آشنایی، شنیدن چالش شما و بررسی اینکه کوچینگ و سبک کار من برایتان مناسب است یا نه.', isFree: true },
      { id: 's2', title: 'جلسه کوچینگ', duration: '۶۰ دقیقه', description: 'یک جلسه فردی و متمرکز برای کار روی یک موضوع مشخص؛ از تصمیمی که معطل مانده تا مسیری که می‌خواهید روشن‌تر شود.' }
    ],
    packagesData: [
      { id: 'p1', title: 'مسیر شروع', sessions: 1, duration: '۶۰ دقیقه', description: 'برای آشنایی با فرایند کوچینگ و گره‌گشایی از یک موضوع مشخص.', price: 4500000 },
      { id: 'p2', title: 'مسیر تحول', sessions: 4, duration: '۶۰ دقیقه', description: 'برای ایجاد تغییرات پایدار و عمیق؛ با فرصت کافی برای تمرین، بازنگری و اصلاح مسیر بین جلسات.', price: 16000000, isPopular: true }
    ],
    testimonials: [
      { id: 't1', quote: 'جلسات با سالومه باعث شد بعد از مدت‌ها سردرگمی، بالاخره بفهمم از شغلم چه می‌خواهم.', author: 'مریم', context: 'تغییر مسیر شغلی' },
      { id: 't2', quote: 'فضای امن و بدون قضاوتی که در جلسات تجربه کردم، به من شجاعت گرفتن تصمیم‌های بزرگ را داد.', author: 'علی', context: 'توسعه فردی' }
    ],
    events: [
      { id: 'e1', title: 'وبینار: چطور مسیر شغلی مناسب خود را پیدا کنیم؟', date: '۲۸ مهر ۱۴۰۵', type: 'وبینار', location: 'آنلاین' }
    ],
    credentials: [
      { id: 'c1', title: 'مدرک بین‌المللی کوچینگ (PCC)', organization: 'ICF', year: '۲۰۲۲' },
      { id: 'c2', title: 'کارشناسی ارشد روانشناسی', organization: 'دانشگاه تهران' }
    ],
    faqs: [
      { question: 'جلسه صفر رایگان چیست؟', answer: 'یک گفتگوی ۳۰ دقیقه‌ای برای آشنایی با روش کار من و بررسی اینکه آیا کوچینگ برای چالش شما مناسب است یا خیر. هیچ تعهدی برای ادامه همکاری ندارد.' },
      { question: 'آیا جلسات فقط آنلاین برگزار می‌شوند؟', answer: 'بله، در حال حاضر تمام جلسات به صورت آنلاین (تصویری) برگزار می‌شوند و لینک جلسه پس از هماهنگی زمان برای شما ارسال می‌شود.' },
      { question: 'هر جلسه کوچینگ چقدر طول می‌کشد؟', answer: 'جلسه‌های کوچینگ ۶۰ دقیقه‌ای هستند و جلسه صفر حدود ۳۰ دقیقه طول می‌کشد.' },
      { question: 'چطور پکیج مناسب خودم را انتخاب کنم؟', answer: 'اگر برای اولین بار است که کوچینگ را تجربه می‌کنید، با جلسه صفر شروع کنید. در همان گفتگو با هم بررسی می‌کنیم که یک جلسه کافی است یا مسیر چندجلسه‌ای برای هدف شما مناسب‌تر است.' }
    ],
    // ------------------------------------------
    
    packagePrices: {
      start: 4500000,
      discovery: 6800000,
      transformation: 8900000,
      excellence: 13500000,
    },
    packageDiscounts: {
      discovery: 15,
      transformation: 20,
    },
    instagramUrl: 'https://instagram.com/bloomiaclub',
    linkedinUrl: 'https://linkedin.com/company/bloomiaclub',
  },
  {
    id: '1',
    slug: 'farzaneh-sharifi',
    name: 'فرزانه شریفی',
    title: 'کوچ ارشد توسعه فردی و مهارت‌های ارتباطی (PCC)',
    description: 'بیش از ۸ سال سابقه در کوچینگ رهبری فردی، مدیریت تعارضات و افزایش وضوح ذهنی.',
    longDescription: 'بیش از ۸ سال است که به عنوان کوچ معتبر بین‌المللی، به افراد، مدیران و تیم‌ها کمک می‌کنم تا به شفافیت ذهنی برسند و از موانع پنهان درون خود عبور کنند.\n\nرویکرد من مبتنی بر گفتگوهای تحول‌آفرین و کدهای اخلاقی فدراسیون بین‌المللی کوچینگ (ICF) است. ما در جلسات فضایی امن و بدون قضاوت می‌سازیم تا پتانسیل‌های واقعی شما شکوفا شود.',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop',
    specialties: ['رشد فردی', 'هوش هیجانی', 'توسعه ارتباطات'],
    rating: 5,
    totalReviews: 48,
    totalSessions: 420,
    coachingHours: 420,
    satisfiedClients: 65,
    packagePrices: {
      start: 4800000,
      discovery: 7200000,
      transformation: 9500000,
      excellence: 14000000,
    },
    packageDiscounts: {
      discovery: 15,
      transformation: 20,
    },
    instagramUrl: 'https://instagram.com/bloomiaclub',
    linkedinUrl: 'https://linkedin.com/company/bloomiaclub',
  },
  {
    id: '2',
    slug: 'reza-ahmadi',
    name: 'رضا احمدی',
    title: 'کوچ توسعه مسیر شغلی و ارتقای سازمانی (ACC)',
    description: 'متخصص در تحول شغلی، آمادگی برای موقعیت‌های مدیریتی و حل چالش‌های سازمانی.',
    longDescription: 'مسیر شغلی پر از دوراهی‌های حساس است. همراهی با بیش از ۱۰۰ متخصص و مدیر اجرایی به من آموخته که بزرگترین عامل پیشرفت شغلی، خودآگاهی و توانایی اتخاذ تصمیمات شجاعانه است.\n\nدر جلسات کوچینگ شغلی، نقشه راه شفافی برای رسیدن به اهداف حرفه‌ای‌تان ترسیم می‌کنیم.',
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop',
    specialties: ['مسیر شغلی', 'توسعه شغلی', 'رهبری کسب‌وکار'],
    rating: 4.9,
    totalReviews: 36,
    totalSessions: 310,
    coachingHours: 310,
    satisfiedClients: 42,
    packagePrices: {
      start: 4500000,
      discovery: 6800000,
      transformation: 8900000,
      excellence: 13500000,
    },
    packageDiscounts: {
      discovery: 10,
      transformation: 15,
    },
    instagramUrl: 'https://instagram.com/bloomiaclub',
    linkedinUrl: 'https://linkedin.com/company/bloomiaclub',
  },
  {
    id: '3',
    slug: 'arezoo-moradi',
    name: 'آرزو مرادی',
    title: 'کوچ تخصصی زنان و تعادل کار و زندگی',
    description: 'همراهی با زنان و مادران شاغل برای غلبه بر فرسودگی، تقویت اعتماد به نفس و کشف علایق واقعی.',
    longDescription: 'تعادل کار و زندگی برای زنان و مادران شاغل یکی از بزرگترین چالش‌های دنیای معاصر است. در بلومیا، فضایی فراهم کرده‌ام تا بدون احساس گناه، مرزهای سالم در زندگی خود بسازید و به احساس آرامش و عاملیت دست یابید.',
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop',
    specialties: ['تعادل کار و زندگی', 'کوچینگ زنان', 'مدیریت استرس'],
    rating: 5,
    totalReviews: 52,
    totalSessions: 380,
    coachingHours: 380,
    satisfiedClients: 58,
    packagePrices: {
      start: 4200000,
      discovery: 6300000,
      transformation: 8400000,
      excellence: 12500000,
    },
    packageDiscounts: {
      discovery: 15,
      transformation: 20,
    },
    instagramUrl: 'https://instagram.com/bloomiaclub',
    linkedinUrl: 'https://linkedin.com/company/bloomiaclub',
  },
];

/**
 * الگوریتم Fisher-Yates برای shuffle کردن آرایه به صورت رندوم، سریع و بدون بایاس
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export async function getRandomCoaches(count = 6): Promise<CoachProfile[]> {
  const all = await getAllCoaches();
  return shuffleArray(all).slice(0, count);
}

/**
 * Coaches live in Sanity (document type `coach`). Supabase `v2_coaches` is a read-only backup that is
 * kept in sync by the Sanity webhook (see src/lib/coach-sync.mjs). Read order:
 *   1. Sanity  2. Supabase backup  3. local fallback data (offline / emergency only).
 */

async function fetchSanityCoaches(): Promise<CoachProfile[] | null> {
  try {
    const docs = await sanityClient.fetch(coachesQuery);
    if (Array.isArray(docs) && docs.length > 0) return docs.map(normalizeSanityCoach);
  } catch (error) {
    console.warn('Could not fetch coaches from Sanity, falling back to Supabase:', error);
  }
  return null;
}

/** Supabase row -> profile. Rows written by the sync carry the full Sanity snapshot; older rows only the basics. */
function coachFromBackupRow(row: any): CoachProfile {
  const snapshot = parseJsonField(row?.sanity_snapshot, null);
  if (snapshot && typeof snapshot === 'object' && snapshot.slug) return normalizeSanityCoach(snapshot);
  return normalizeCoach(row) as CoachProfile;
}

export async function getAllCoaches(): Promise<CoachProfile[]> {
  const fromSanity = await fetchSanityCoaches();
  if (fromSanity) return shuffleArray(fromSanity);

  try {
    const { data, error } = await supabase.from('v2_coaches').select('*').eq('is_active', true);
    if (!error && data && data.length > 0) return shuffleArray(data.map(coachFromBackupRow));
  } catch (error) {
    console.warn('Could not fetch coaches from Supabase:', error);
  }

  return shuffleArray(fallbackCoaches);
}

export async function getCoachBySlug(slug: string): Promise<CoachProfile | null> {
  if (!slug) return null;

  // The local fallback is for outages only. If a source answered "no such coach" (or "hidden"), trust it.
  let reachable = false;

  try {
    const doc = await sanityClient.fetch(coachBySlugQuery, { slug });
    reachable = true;
    if (doc) return normalizeSanityCoach(doc);
  } catch (error) {
    console.warn(`Could not fetch coach [${slug}] from Sanity:`, error);
  }

  try {
    const { data, error } = await supabase
      .from('v2_coaches')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .maybeSingle();
    if (!error) {
      reachable = true;
      if (data) return coachFromBackupRow(data);
    }
  } catch (error) {
    console.warn(`Could not fetch coach [${slug}] from Supabase:`, error);
  }

  return reachable ? null : (fallbackCoaches.find((c) => c.slug === slug) ?? null);
}