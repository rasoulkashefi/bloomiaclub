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

// Fallback coaches for offline / zero latency SSR
export const fallbackCoaches: Coach[] = [
  {
    id: 'salomeh-fathijoo',
    slug: 'salomeh-fathijoo',
    name: 'سالومه فتحی‌جو',
    title: 'کوچ حرفه‌ای و تسهیل‌گر تحول فردی',
    description: 'همراه افراد در مسیر کشف توانایی‌ها، رشد درونی و ساختن زندگی آگاهانه و اصیل بر پایه ارزش‌های فردی.',
    longDescription: 'بیش از ۱۰ سال است که در زمینه تسهیل‌گری تحول فردی، خودشناسی و بازیابی انگیزه درونی فعالیت می‌کنم.\n\nرویکرد من مبتنی بر گفتگوهای عمیق، شفافیت ذهنی و کدهای اخلاقی فدراسیون بین‌المللی کوچینگ (ICF) است. در جلسات کوچینگ، فضایی امن و سرشار از همدلی می‌سازیم تا شما بتوانید با ارزش‌های اصیل خود همسو شده و تصمیماتی مقتدرانه برای زندگی و کارتان اتخاذ کنید.',
    imageUrl: '/images/the-modern-professional-coach.webp',
    cutoutImageUrl: '/images/coach-cutout-test.png',
    specialties: ['خودشناسی عمیق', 'وضوح درونی', 'تحول آگاهانه', 'ارزش‌های فردی و رسالت'],
    rating: 5,
    totalReviews: 3,
    totalSessions: 950,
    coachingHours: 950,
    satisfiedClients: 210,
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

export async function getRandomCoaches(count = 6): Promise<Coach[]> {
  const all = await getAllCoaches();
  return shuffleArray(all).slice(0, count);
}

export async function getAllCoaches(): Promise<Coach[]> {
  // ۱. اولویت اول: بررسی و دریافت کوچ‌ها از Sanity CMS
  try {
    const sanityCoaches = await sanityClient.fetch(coachesQuery);
    if (Array.isArray(sanityCoaches) && sanityCoaches.length > 0) {
      const normalized = sanityCoaches.map(normalizeCoach);
      return shuffleArray(normalized);
    }
  } catch (sanityErr) {
    console.warn('Could not fetch coaches from Sanity, falling back to Supabase:', sanityErr);
  }

  // ۲. اولویت دوم: دریافت از دیتابیس Supabase
  try {
    const { data, error } = await supabase
      .from('v2_coaches')
      .select('*')
      .eq('is_active', true);

    if (!error && data && data.length > 0) {
      const shuffled = shuffleArray(data);
      return shuffled.map(normalizeCoach);
    }
  } catch (supabaseErr) {
    console.warn('Could not fetch coaches from Supabase:', supabaseErr);
  }

  // ۳. فال‌بک آفلاین تضمین‌شده
  return shuffleArray(fallbackCoaches);
}

export async function getCoachBySlug(slug: string): Promise<Coach | null> {
  if (!slug) return null;

  // ۱. اولویت اول: جستجو در Sanity CMS
  try {
    const sanityCoach = await sanityClient.fetch(coachBySlugQuery, { slug });
    if (sanityCoach) {
      return normalizeCoach(sanityCoach);
    }
  } catch (sanityErr) {
    console.warn(`Could not fetch coach [${slug}] from Sanity:`, sanityErr);
  }

  // ۲. اولویت دوم: جستجو در Supabase
  try {
    const { data, error } = await supabase
      .from('v2_coaches')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .maybeSingle();

    if (!error && data) {
      return normalizeCoach(data);
    }
  } catch (supabaseErr) {
    console.warn(`Could not fetch coach [${slug}] from Supabase:`, supabaseErr);
  }

  // ۳. فال‌بک لوکال
  const fallback = fallbackCoaches.find((c) => c.slug === slug);
  return fallback || null;
}
