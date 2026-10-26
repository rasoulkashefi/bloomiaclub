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
  const canonical = getCanonicalSlug(doc.slug);
  const fallback = fallbackCoaches.find((c) => c.slug === doc.slug || c.slug === canonical);
  const description: string = doc.description || fallback?.description || '';
  const longDescription: string | null = doc.longDescription || fallback?.longDescription || null;

  return {
    id: doc._id || doc.id || doc.slug,
    slug: doc.slug,
    name: doc.name || fallback?.name || 'کوچ بلومیا',
    title: doc.title || fallback?.title || 'کوچ حرفه‌ای بلومیا',
    description,
    shortBio: description || undefined,
    longDescription,
    longBio: longDescription || undefined,
    imageUrl: doc.imageUrl || fallback?.imageUrl || null,
    cutoutImageUrl: doc.cutoutImageUrl || fallback?.cutoutImageUrl || null,
    coverImage: doc.coverImage || fallback?.coverImage || null,
    aboutImage: doc.aboutImage || fallback?.aboutImage || doc.coverImage || null,
    specialties: Array.isArray(doc.specialties) && doc.specialties.length > 0 ? doc.specialties.filter(Boolean) : (fallback?.specialties || []),
    rating: numberOrZero(doc.rating) || fallback?.rating || 5,
    totalReviews: numberOrZero(doc.totalReviews) || fallback?.totalReviews || 0,
    totalSessions: numberOrZero(doc.totalSessions) || numberOrZero(doc.coachingHours) || fallback?.totalSessions || 0,
    coachingHours: numberOrZero(doc.coachingHours) || fallback?.coachingHours || 0,
    satisfiedClients: numberOrZero(doc.satisfiedClients) || fallback?.satisfiedClients || 0,
    experienceYears: numberOrZero(doc.experienceYears) || fallback?.experienceYears || undefined,
    languages: cleanList<string>(doc.languages, Boolean) || fallback?.languages,
    location: doc.location || fallback?.location || undefined,
    sessionMode: doc.sessionMode || fallback?.sessionMode || undefined,
    videoUrl: doc.videoUrl || fallback?.videoUrl || null,
    videoCover: doc.videoCover || fallback?.videoCover || null,
    videoTitle: doc.videoTitle || fallback?.videoTitle || null,
    videoDescription: doc.videoDescription || fallback?.videoDescription || null,
    packagePrices: Object.keys(numericRecord(doc.packagePrices)).length > 0 ? numericRecord(doc.packagePrices) : (fallback?.packagePrices || {}),
    packageDiscounts: Object.keys(numericRecord(doc.packageDiscounts)).length > 0 ? numericRecord(doc.packageDiscounts) : (fallback?.packageDiscounts || {}),
    instagramUrl: doc.instagramUrl || fallback?.instagramUrl || null,
    linkedinUrl: doc.linkedinUrl || fallback?.linkedinUrl || null,
    bookingUrl: doc.bookingUrl || fallback?.bookingUrl || null,

    audience: cleanList<AudienceItem>(doc.audience, (i) => i.title) || fallback?.audience,
    method: cleanList<MethodStep>(doc.method, (i) => i.title) || fallback?.method,
    services: cleanList<Service>(doc.services, (i) => i.title) || fallback?.services,
    packagesData: cleanList<Package>(doc.packages, (i) => i.title && typeof i.price === 'number') || fallback?.packagesData,
    testimonials: cleanList<Testimonial>(doc.testimonials, (i) => i.quote) || fallback?.testimonials,
    events: cleanList<Event>(doc.events, (i) => i.title && i.date) || fallback?.events,
    articles: fallback?.articles,
    credentials: cleanList<Credential>(doc.credentials, (i) => i.title) || fallback?.credentials,
    faqs: cleanList<FAQ>(doc.faqs, (i) => i.question && i.answer) || fallback?.faqs,
    welcomePacket: doc.welcomePacket || fallback?.welcomePacket || null,
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
  bookingUrl?: string;
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
  discountPercent?: number;
  validityDays?: number;
  bookingUrl?: string;
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
  organization?: string;
  year?: string;
};

export type WelcomePacket = {
  title?: string;
  subtitle?: string;
  fileUrl: string;
  coverImageUrl?: string;
  features?: string[];
  buttonText?: string;
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
  welcomePacket?: WelcomePacket | null;
}

// Fallback coaches for offline / zero latency SSR
export const fallbackCoaches: CoachProfile[] = [
  {
    id: 'coach-profile-fatemeh_esmaeeli',
    slug: 'fatemeh_esmaeeli',
    name: 'فاطمه اسماعیلی',
    title: 'کوچ بین‌المللی مادران، بانوان و نوجوانان',
    eyebrow: 'کوچ حرفه‌ای بلومیا',
    shortBio: 'همراهی تخصصی با مادران و بانوان برای رهایی از فرسودگی، شنیدن صدای درون، مدیریت تعارض با فرزندان و ساختن زندگی متعادل و اصیل.',
    description: 'همراهی تخصصی با مادران و بانوان برای رهایی از فرسودگی، شنیدن صدای درون، مدیریت تعارض با فرزندان و ساختن زندگی متعادل و اصیل.',
    longBio: `باور دارم هر زنی در درون خود صدایی دارد که اگر شنیده شود، می‌تواند مسیر زندگی‌اش را با وضوح و آرامش بیشتری انتخاب کند. رسالت من همراهی با زنانی است که میان نقش‌های متعدد مادری، کار و خانواده، می‌خواهند به خودِ واقعی‌شان بازگردند و با اعتمادبه‌نفس تصمیم بگیرند.\n\nمسیر حرفه‌ای من از تحصیل در رشته حسابداری و فعالیت در دنیای مالی آغاز شد. اما خیلی زود دریافتم که اشتیاق واقعی من جایی فراتر از اعداد است؛ جایی که بتوانم در کنار زنان و مادران بایستم تا قدرت درونی‌شان را بازیابند. برای ساخت این مسیر، آموزش حرفه‌ای‌ام را در آکادمی بین‌المللی فراکوچ آغاز کردم و سپس در آکادمی Impact Coaching آمریکا با موفقیت دوره‌های تخصصی کوچینگ را به پایان رساندم.\n\nدر جلسات کوچینگ، فضایی امن، کاملاً محرمانه و عاری از هرگونه قضاوت می‌سازیم؛ جایی برای مکث، عبور از احساس گناه مادری و کشف دوباره ارزش‌های فردی. در کنار جلسات فردی، افتخار همراهی داوطلبانه با مادران در یک سازمان مردم‌نهاد بین‌المللی را داشته‌ام؛ تجربه‌ای که ایمانم را به قدرت تحول‌آفرین و آرامش‌بخش گفتگوهای عمیق کوچینگ دوچندان کرد.`,
    longDescription: `باور دارم هر زنی در درون خود صدایی دارد که اگر شنیده شود، می‌تواند مسیر زندگی‌اش را با وضوح و آرامش بیشتری انتخاب کند. رسالت من همراهی با زنانی است که میان نقش‌های متعدد مادری، کار و خانواده، می‌خواهند به خودِ واقعی‌شان بازگردند و با اعتمادبه‌نفس تصمیم بگیرند.\n\nمسیر حرفه‌ای من از تحصیل در رشته حسابداری و فعالیت در دنیای مالی آغاز شد. اما خیلی زود دریافتم که اشتیاق واقعی من جایی فراتر از اعداد است؛ جایی که بتوانم در کنار زنان و مادران بایستم تا قدرت درونی‌شان را بازیابند. برای ساخت این مسیر، آموزش حرفه‌ای‌ام را در آکادمی بین‌المللی فراکوچ آغاز کردم و سپس در آکادمی Impact Coaching آمریکا با موفقیت دوره‌های تخصصی کوچینگ را به پایان رساندم.\n\nدر جلسات کوچینگ، فضایی امن، کاملاً محرمانه و عاری از هرگونه قضاوت می‌سازیم؛ جایی برای مکث، عبور از احساس گناه مادری و کشف دوباره ارزش‌های فردی. در کنار جلسات فردی، افتخار همراهی داوطلبانه با مادران در یک سازمان مردم‌نهاد بین‌المللی را داشته‌ام؛ تجربه‌ای که ایمانم را به قدرت تحول‌آفرین و آرامش‌بخش گفتگوهای عمیق کوچینگ دوچندان کرد.`,
    imageUrl: 'https://cdn.sanity.io/images/7yjhdw88/production/27fd1b5e3721da11a6a011e1265772d8bf8b74e7-864x1184.jpg',
    coverImage: 'https://cdn.sanity.io/images/7yjhdw88/production/27fd1b5e3721da11a6a011e1265772d8bf8b74e7-864x1184.jpg',
    aboutImage: 'https://cdn.sanity.io/images/7yjhdw88/production/27fd1b5e3721da11a6a011e1265772d8bf8b74e7-864x1184.jpg',
    cutoutImageUrl: 'https://qxacvupalbfcoqkuydba.supabase.co/storage/v1/object/public/coaches_images/fatemeh_esmaeeli.png',
    sessionMode: 'online',
    languages: ['فارسی'],
    location: 'تهران',
    specialties: [
      'کوچینگ مادران و والدگری آگاهانه',
      'رهایی از احساس گناه مادری و فرسودگی',
      'خودشناسی و اعتماد‌به‌نفس بانوان',
      'کوچینگ نوجوانان و مهارت‌های ارتباطی',
      'تعادل کار و زندگی و مدیریت اولویت‌ها',
    ],
    rating: 5.0,
    totalReviews: 28,
    totalSessions: 120,
    coachingHours: 120,
    satisfiedClients: 30,
    experienceYears: 4,
    videoUrl: 'https://qxacvupalbfcoqkuydba.supabase.co/storage/v1/object/public/coaches_video/fatemeh_esmaeeli_video.mp4',
    videoCover: 'https://cdn.sanity.io/images/7yjhdw88/production/5af5f5471aed0c484db43ec84d7a33e86c14cff4-1376x768.png',
    videoTitle: 'کوچینگ برای مادران؛ جایی برای شنیدنِ خود',
    videoDescription: 'کوچینگ به مادران کمک می‌کند در میان نقش‌ها و مسئولیت‌ها، ارتباط عمیق‌تری با خودشان برقرار کنند.',
    bookingUrl: 'https://atyno.com/fatemeh/zero',
    instagramUrl: 'https://www.instagram.com/fatemeh.esmaeili.sohi',

    audience: [
      { title: 'میان وظایف مادری، کار و انتظارات دیگران خودتان را گم کرده‌اید و به دنبال آرامش درونی هستید.' },
      { title: 'با احساس گناه مداوم («آیا مادر به اندازه کافی خوبی هستم؟») و فرسودگی دست‌وپنجه نرم می‌کنید.' },
      { title: 'در برقراری ارتباط موثر و بدون تنش با فرزند نوجوان‌تان با چالش روبه‌رو شده‌اید.' },
      { title: 'می‌خواهید مرزهای سالمی در روابط و کار بسازید و بدون ترس، برای خواسته‌های خودتان وقت بگذارید.' },
    ],
    method: [
      { id: '01', title: 'شنیدن صدای درون و تخلیه بار ذهنی', description: 'ایجاد فضایی امن و کاملاً بدون قضاوت تا دغدغه‌ها، خستگی‌ها و بارهای ناگفته مادری و فردی را بی‌پرده روی میز بگذارید.' },
      { id: '02', title: 'واکاوی باورها و ریشه‌یابی تعارضات', description: 'شناسایی تله‌های کمال‌گرایی، احساس گناه کاذب و انتظارات سنگینی که مانع دیدن ارزش‌ها و نیازهای واقعی شما می‌شوند.' },
      { id: '03', title: 'بازطراحی مرزها و تدوین اولویت‌ها', description: 'تبدیل بینش‌ها به تصمیمات مشخص و قابل اجرا؛ ایجاد زمان اختصاصی برای خود و طراحی سبک والدگری مبتنی بر پذیرش.' },
      { id: '04', title: 'همراهی در مسیر ثبات و تعادل پایدار', description: 'پایش مستمر در جریان چالش‌های روزمره زندگی، بازبینی موانع و استقرار عاداتی که آرامش و توانمندی را در شما ماندگار می‌کنند.' },
    ],
    services: [
      {
        id: 'zero',
        title: 'جلسه صفر (معارفه رایگان)',
        duration: '۴۵ دقیقه',
        description: 'یک گفتگوی آنلاین ۴۵ دقیقه‌ای رایگان برای آشنایی صمیمانه، شنیدن دغدغه‌های شما و بررسی اینکه آیا کوچینگ و سبک همراهی من برای شرایط فعلی شما مناسب است یا خیر.',
        price: 0,
        isFree: true,
        bookingUrl: 'https://atyno.com/fa/embed/934b33a2-9888-4209-9901-b9632e812e6c?meeting=zero',
      },
      {
        id: 'coaching',
        title: 'کوچینگ بانوان و مادران: وضوح و تعادل',
        duration: '۶۰ دقیقه',
        description: 'میان مسئولیت‌های مادری، کار، مدیریت خانه و مراقبت از اطرافیان، این تک‌جلسه یک فضای مکث امن، محرمانه و بدون قضاوت است؛ فرصتی برای اینکه چالش فعلی‌تان را روی میز بگذارید، از زاویه‌ای شفاف به آن نگاه کنید و به سمت تعادل و آرامش حرکت کنید.',
        price: 750000,
        isFree: false,
        bookingUrl: 'https://atyno.com/fa/embed/934b33a2-9888-4209-9901-b9632e812e6c?meeting=coaching',
      },
    ],
    packagesData: [
      {
        id: 'growth',
        title: 'پکیج ۴ جلسه‌ای «شروع»',
        sessions: 4,
        duration: '۶۰ دقیقه',
        description: 'وضوح، تعادل و گام اول تغییر. فضایی امن و متمرکز تا بایستید، نفس بکشید و پایه‌های اولیه تعادل را در زندگی‌تان دوباره بسازید.',
        price: 2500000,
        discountPercent: 17,
        validityDays: 90,
        isPopular: false,
        bookingUrl: 'https://atyno.com/fa/embed/934b33a2-9888-4209-9901-b9632e812e6c?package=growth',
        features: [
          '۴ جلسه کوچینگ آنلاین ۶۰ دقیقه‌ای',
          'شفاف‌سازی مسئله اصلی و تفکیک تنش‌های روزمره',
          'اولویت‌بندی بر اساس ارزش‌های فردی بدون تحمیل نسخه آماده',
          'طراحی برنامه اقدام شدنی (Action Plan) متناسب با توان مادر',
          'پشتیبانی و پاسخ به پرسش‌ها میان جلسات از طریق پیامک',
          'ضمانت بازگشت وجه تا پایان جلسه دوم',
        ],
      },
      {
        id: 'self-discovery',
        title: 'پکیج ۶ جلسه‌ای «کشف»',
        sessions: 6,
        duration: '۶۰ دقیقه',
        description: 'شناخت الگوهای درونی و رهایی از موانع ذهنی. کشف تله‌ها و باورهای محدودکننده، غلبه بر احساس گناه مادری و بازیابی هویت مستقل.',
        price: 3600000,
        discountPercent: 20,
        validityDays: 90,
        isPopular: true,
        bookingUrl: 'https://atyno.com/fa/embed/934b33a2-9888-4209-9901-b9632e812e6c?package=self-discovery',
        features: [
          '۶ جلسه کوچینگ آنلاین ۶۰ دقیقه‌ای',
          'شناسایی و خنثی‌سازی صدای سرزنشگر درونی و کمال‌گرایی',
          'مواجهه امن با احساساتی چون خستگی نقش‌ها، ترس و خشم',
          'بازیابی قدرت درونی و شکل‌دهی به هویتی مستقل در کنار مادری',
          'طراحی رفتارهای کارآمد در موقعیت‌های پرتنش زندگی',
          'پشتیبانی پیامکی پیوسته میان جلسات برای پیگیری تمرین‌ها',
          'ضمانت بازگشت وجه تا پایان جلسه دوم',
        ],
      },
      {
        id: 'transformation',
        title: 'پکیج ۸ جلسه‌ای «تحول»',
        sessions: 8,
        duration: '۶۰ دقیقه',
        description: 'بازآفرینی هویت، عبور از فرسودگی و تغییر پایدار. یک مسیر عمیق ۲ تا ۳ ماهه برای عبور از فداکاری افراطی و ساختن ساختاری پایدار برای سلامت روان.',
        price: 4700000,
        discountPercent: 22,
        validityDays: 90,
        isPopular: false,
        bookingUrl: 'https://atyno.com/fa/embed/934b33a2-9888-4209-9901-b9632e812e6c?package=transformation',
        features: [
          '۸ جلسه کوچینگ آنلاین ۶۰ دقیقه‌ای',
          'بازسازی ساختارهای ذهنی فرسایش‌دهنده و سبک زندگی',
          'ایجاد مرزهای روانی شفاف و سالم و مهار انتظارات اطرافیان',
          'نهادینه‌سازی مهارت «نه گفتن» بدون احساس گناه در روابط',
          'طراحی جعبه‌ابزار شخصی تاب‌آوری برای روزهای پرتنش',
          'پشتیبانی کامل پیامکی میان جلسات جهت رفع ابهامات',
          'ضمانت بازگشت وجه تا پایان جلسه دوم',
        ],
      },
      {
        id: 'self-leadership-coaching',
        title: 'پکیج ۱۲ جلسه‌ای «تعالی»',
        sessions: 12,
        duration: '۶۰ دقیقه',
        description: 'کوچینگ جامع خودراهبری، شکوفایی و تعادل. جامع‌ترین برنامه همراهی ۳ تا ۴ ماهه برای بانوانی که خواهان شکوفایی همه‌جانبه و استقرار نسخه‌ای پایدار از خود هستند.',
        price: 6000000,
        discountPercent: 33,
        validityDays: 90,
        isPopular: false,
        bookingUrl: 'https://atyno.com/fa/embed/934b33a2-9888-4209-9901-b9632e812e6c?package=self-leadership-coaching',
        features: [
          '۱۲ جلسه اختصاصی آنلاین ۶۰ دقیقه‌ای',
          'طراحی سند چشم‌انداز فردی (Life Vision) و قطب‌نمای ارزش‌ها',
          'نهادینه‌سازی سیستم‌های خودانگیزشی و روتین‌های روزمره پایدار',
          'هماهنگ‌سازی نقش مادری و شغلی با آرزوهای شخصی بدون اصطکاک',
          'ارزیابی و پایش همه‌جانبه پیشرفت و شاخص‌های رضایت از زندگی',
          'پشتیبانی نامحدود پیامکی در تمام طول دوره ۳ تا ۴ ماهه',
          'ضمانت بازگشت وجه تا پایان جلسه دوم',
        ],
      },
    ],
    packagePrices: {
      growth: 2500000,
      discovery: 3600000,
      transformation: 4700000,
      excellence: 6000000,
    },
    packageDiscounts: {
      growth: 17,
      discovery: 20,
      transformation: 22,
      excellence: 33,
    },
    credentials: [
      { id: 'c1', title: 'مدرک بین‌المللی کوچینگ حرفه‌ای', organization: 'آکادمی بین‌المللی Impact Coaching آمریکا', year: '۱۴۰۲' },
      { id: 'c2', title: 'دوره جامع تربیت کوچ حرفه‌ای', organization: 'آکادمی بین‌المللی فراکوچ', year: '۱۴۰۱' },
      { id: 'c3', title: 'تسهیل‌گر و کوچ داوطلب مادران', organization: 'سازمان مردم‌نهاد بین‌المللی (NGO)', year: '۱۴۰۱ تا کنون' },
      { id: 'c4', title: 'کارشناسی حسابداری و مدیریت مالی', organization: 'دانشگاه آزاد اسلامی', year: '۱۳۹۶' },
    ],
    testimonials: [
      {
        id: 't1',
        quote: 'وقتی کسی را کوچ می‌کنی، در واقع یک گوشه امن برای آرام شدن به او می‌دهی. در جلسات با شما به این گوشه امن رسیدم؛ گویا با چراغی پرنور مرا به عمق درونم بردید تا با مهارت و صبوری‌تان به آرامش و شفافیت برسم.',
        author: 'نسترن م.',
        context: 'مراجع دوره خودشناسی و وضوح ذهنی',
      },
      {
        id: 't2',
        quote: 'شما با صبوری و مهارت بالا خیلی خوب به حرف‌هایم گوش دادید و مسائلی که برایم غیرقابل‌حل و مبهم بودند، کاملاً روشن و شفاف شدند. نوع حضورتان در جلسات حس امنیت فوق‌العاده‌ای می‌دهد تا به‌راحتی به آگاهی برسم.',
        author: 'مهسا ر.',
        context: 'مراجع جلسات کوچینگ فردی',
      },
      {
        id: 't3',
        quote: 'در تمام طول جلسه حس امنیت و آرامش داشتم. آرامش شما کمک کرد خیلی راحت‌تر و عمیق‌تر فکر کنم؛ مسائلی که تا دیروز برایم سخت و ترسناک بودند آسان شدند و توانستم از زوایای تازه‌ای به آن‌ها نگاه کنم.',
        author: 'سارا ک.',
        context: 'مراجع دوره عبور از تعارض و ترس‌ها',
      },
      {
        id: 't4',
        quote: 'از همدلی و درکتان در جلسات کوچینگ خیلی لذت بردم. آن‌قدر قشنگ ارتباط مؤثر را زندگی می‌کنید که از همان لحظه اول احساس کردم می‌توانم کاملاً راحت باشم و یک فرد امن برای شنیدنم حضور دارد.',
        author: 'الهام ش.',
        context: 'مراجع جلسات کوچینگ فردی',
      },
      {
        id: 't5',
        quote: 'در تمام این مدت واقعاً درکم کردید و با من همدل بودید. از صمیم قلب ممنونم که روی جرأت و جسارتم کار کردید و این باور ارزشمند را در من زنده کردید که توانایی رسیدن به اهدافم را دارم.',
        author: 'پریسا ع.',
        context: 'مراجع دوره تقویت اعتمادبه‌نفس و اهداف',
      },
      {
        id: 't6',
        quote: 'یک دوره ۶ جلسه‌ای عالی را با شما تجربه کردم که تک‌تک لحظاتش برایم پربار بود. ممنونم که این‌قدر عمیق می‌شنوید و با پرسش‌های به‌جا کمک می‌کنید از زاویه‌ای جدید به ابعاد مختلف دغدغه‌هایم نگاه کنم.',
        author: 'زهرا ت.',
        context: 'مراجع پکیج ۶ جلسه‌ای کشف',
      },
    ],
    faqs: [
      { question: 'آیا جلسات فقط برای مادران است یا سایر بانوان و نوجوانان هم می‌توانند شرکت کنند؟', answer: 'تمرکز اصلی من بر کوچینگ مادران و مسائل والدگری است، اما جلسات توانمندسازی، خودشناسی و مهارت‌های ارتباطی برای تمامی بانوان و همچنین جلسات اختصاصی برای نوجوانان نیز به صورت فردی برگزار می‌شود.' },
      { question: 'در جلسه صفر رایگان دقیقاً چه اتفاقی می‌افتد؟', answer: 'جلسه صفر یک گفتگوی آنلاین ۳۰ دقیقه‌ای بدون هیچ‌گونه هزینه یا تعهد مالی است. در این جلسه، چالش‌های اصلی شما شنیده می‌شود، متدولوژی کاری من توضیح داده می‌شود و با هم بررسی می‌کنیم که آیا این مسیر در این مقطع برای شما مناسب و کارآمد است یا خیر.' },
      { question: 'تفاوت کوچینگ مادران با مشاوره فرزندپروری چیست؟', answer: 'در مشاوره معمولاً راه‌حل‌های تجویزی و رفتاری برای اصلاح رفتار کودک داده می‌شود. اما در کوچینگ، تمرکز بر خودِ مادر، احساسات، باورها، سطح انرژی و کیفیت ارتباط اوست تا با بازیابی آرامش درون، بتواند بهترین تصمیمات را متناسب با خانواده خود بگیرد.' },
      { question: 'جلسات آنلاین چگونه برگزار می‌شوند و آیا محرمانه هستند؟', answer: 'جلسات از طریق بستر گوگل‌میت یا زوم در زمان هماهنگ‌شده برگزار می‌شوند. رازداری و حفظ محرمانگی ۱۰۰٪ کدهای اخلاقی فدراسیون بین‌المللی کوچینگ (ICF) اساس جلسات است و تمام صحبت‌های شما کاملاً امن باقی می‌ماند.' },
      { question: 'فاصله میان جلسات معمولاً چقدر است؟', answer: 'استانداردترین فاصله، هر ۷ تا ۱۰ روز یک جلسه است تا زمان کافی برای تجربه، انجام اقدامات در بطن زندگی روزمره و مشاهده تغییرات عملی میان جلسات فراهم باشد.' },
    ],
    events: [
      {
        id: 'e1',
        title: 'کارگاه آنلاین: هنر گفتگوی موثر و مهار تعارض با فرزند نوجوان',
        date: '۲۸ آبان ۱۴۰۵',
        type: 'کارگاه آنلاین',
        location: 'آنلاین (گوگل‌میت)',
        href: '#booking',
      },
      {
        id: 'e2',
        title: 'وبینار تخصصی: رهایی از احساس گناه مادری و بازیابی انرژی درونی',
        date: '۱۲ آذر ۱۴۰۵',
        type: 'وبینار رایگان',
        location: 'آنلاین (اسکای‌روم)',
        href: '#booking',
      },
    ],
    articles: [
      {
        id: 'a1',
        title: 'بازگشت به کار پس از زایمان: راهنمای کوچینگ برای مدیریت تغییر هویت و احساس گناه مادران شاغل',
        date: '۲۱ مهر ۱۴۰۵',
        readTime: '۸ دقیقه',
        imageUrl: 'https://cdn.sanity.io/images/7yjhdw88/production/331520f803db65a182da1455e02aed87aa58c6b8-1376x768.jpg',
        excerpt: 'پایان مرخصی زایمان و بازگشت به محیط کار، یکی از پرتنش‌ترین مقاطع زندگی هر مادر شاغل است. چطور با مرزگذاری سالم و خودآگاهی از این گذار عبور کنیم؟',
        href: '/blog/returning-to-work-after-baby-mothers-coaching',
      },
      {
        id: 'a2',
        title: 'چگونه با فرزند نوجوان خود صحبت کنیم که بشنود؟ راهنمای کوچینگ برای مهار تعارض‌های سن بلوغ',
        date: '۲۴ شهریور ۱۴۰۵',
        readTime: '۸ دقیقه',
        imageUrl: 'https://cdn.sanity.io/images/7yjhdw88/production/13d8b20f650aa03900e5d83b590f8f0d61c7ced7-1376x768.jpg',
        excerpt: 'حل تعارضات بلوغ، گذر از نصیحت به پرسشگری کوچینگی و به رسمیت شناختن استقلال فکری نوجوان بدون تخریب پیوند عاطفی.',
        href: '/blog/how-to-talk-to-teens-coaching-guide',
      },
      {
        id: 'a3',
        title: 'چگونه در شرایط بحرانی، مادر آرام‌تری باشیم؟ راهنمای مدیریت اضطراب و حمایت از کودک',
        date: '۲۴ فروردین ۱۴۰۵',
        readTime: '۷ دقیقه',
        imageUrl: 'https://cdn.sanity.io/images/7yjhdw88/production/6c979da72487e77edf14721eca15a596d447b1f2-2816x1536.png',
        excerpt: 'راهکارهای کوچینگی برای مدیریت بار هیجانی در بحران‌ها و برقراری امنیت روانی در کانون خانواده.',
        href: '/blog/parenting-in-crisis-managing-anxiety-mothers',
      },
      {
        id: 'a4',
        title: 'فرسودگی مادرانه (Mom Burnout): علائم، دلایل و نقش کوچینگ در بازیابی انرژی',
        date: '۹ آذر ۱۴۰۴',
        readTime: '۹ دقیقه',
        imageUrl: 'https://cdn.sanity.io/images/7yjhdw88/production/6c979da72487e77edf14721eca15a596d447b1f2-2816x1536.png',
        excerpt: 'تشخیص علائم خستگی مزمن، احساس تنهایی و بی‌حسی عاطفی مادران؛ و چگونگی بازسازی سیستم حمایتی درونی با کوچینگ.',
        href: '/blog/mom-burnout-symptoms-causes-coaching',
      },
      {
        id: 'a5',
        title: 'احساس گناه مادرانه (Mom Guilt): چرا همیشه فکر می‌کنیم «کافی نیستیم»؟ و چگونه می‌توانیم از آن رها شویم؟',
        date: '۲۳ آبان ۱۴۰۴',
        readTime: '۸ دقیقه',
        imageUrl: 'https://cdn.sanity.io/images/7yjhdw88/production/331520f803db65a182da1455e02aed87aa58c6b8-1376x768.jpg',
        excerpt: 'ریشه‌یابی تله ذهنی ناکافی بودن و متدهای کوچینگی برای رسیدن به شفقت با خود در نقش والدگری.',
        href: '/blog/mom-guilt-and-how-to-overcome-it',
      },
      {
        id: 'a6',
        title: 'کوچینگ و مدیریت اولویت‌ها برای مادران: چطور بین کار، خانواده و خودت تعادل برقرار کنی؟',
        date: '۷ آبان ۱۴۰۴',
        readTime: '۷ دقیقه',
        imageUrl: 'https://cdn.sanity.io/images/7yjhdw88/production/13d8b20f650aa03900e5d83b590f8f0d61c7ced7-1376x768.jpg',
        excerpt: 'یاد بگیر چطور بین کار، خانواده و خودت تعادل بسازی — با کوچینگ مخصوص مادران در بلومیا.',
        href: '/blog/coaching-for-moms-prioritizing-what-really-matters',
      },
    ],
    welcomePacket: {
      title: 'بسته راهنمای خدمات کوچینگ',
      subtitle: 'راهنمای جامع آشنایی با اصول کوچینگ، منشور محرمانگی، شرایط جلسات و آمادگی کامل برای شروع مسیر رشد و تحول.',
      fileUrl: '/documents/welcome-packets/fatemeh_esmaeeli_welcome_packet.pdf',
      coverImageUrl: '/images/solea/fatemeh_welcome_packet_cover.png',
      features: [
        'آشنایی با متدولوژی و اصول ۴گانه جلسات کوچینگ',
        'شفافیت در شرایط، ضوابط همکاری و منشور محرمانگی',
        'راهنمای گام‌به‌گام آمادگی برای جلسه معارفه رایگان (جلسه صفر)',
      ],
      buttonText: 'دریافت بسته راهنما (PDF)',
    },
  },
  {
    id: 'coach-profile-mahya_shakoori',
    slug: 'mahya_shakoori',
    name: 'محیا شکوری',
    title: 'کوچ رشد فردی و خودآگاهی',
    eyebrow: 'کوچ حرفه‌ای بلومیا',
    shortBio: 'همراهی تخصصی در مسیر خودشناسی عمیق، رهایی از قضاوت منتقد درون، مهارت مرزگذاری شفاف و بدون احساس گناه در روابط و ساختن زندگی اصیل و آرام.',
    description: 'همراهی تخصصی در مسیر خودشناسی عمیق، رهایی از قضاوت منتقد درون، مهارت مرزگذاری شفاف و بدون احساس گناه در روابط و ساختن زندگی اصیل و آرام.',
    longBio: `باور دارم هر انسانی در درون خود صدایی اصیل دارد که اگر شنیده شود، می‌تواند مسیر زندگی‌اش را با وضوح و آرامش بیشتری انتخاب کند. رسالت من همراهی با انسان‌هایی است که می‌خواهند از تله راضی نگه‌داشتن همگان، کمال‌گرایی فرساینده و احساس گناه عبور کنند و با آرامش و اقتدار، مرزهای سالمی برای زندگی و روابط‌شان بسازند.\n\nمن محیا شکوری هستم؛ روان‌شناس، کوچ رشد فردی و خودآگاهی و تسهیل‌گر تغییر در بلومیا کلاب. سال‌ها فعالیت و پژوهش در زمینه روان‌شناسی و رفتار فردی به من آموخت که ریشه بسیاری از خستگی‌های روانی، در گفتگوی درونی ما با خودمان پنهان است؛ همان زمزمه‌های سرزنشگر «قاضی درون» که مانع دیدن ارزشمندی واقعی‌مان می‌شود. رویکرد من پیوند دادن این آگاهی‌های عمیق با ساختار پویا و اقدام‌محور فدراسیون بین‌المللی کوچینگ (ICF) است.\n\nدر جلسات کوچینگ رشد فردی، فضایی امن، کاملاً محرمانه و عاری از هرگونه قضاوت فراهم می‌آوریم؛ جایی برای مکث، کشف باورهای محدودکننده، صلح پایدار با منتقد درون، و نهادینه‌سازی مهارت مرزگذاری قاطعانه بدون احساس گناه در تاروپود زندگی روزمره.`,
    longDescription: `باور دارم هر انسانی در درون خود صدایی اصیل دارد که اگر شنیده شود، می‌تواند مسیر زندگی‌اش را با وضوح و آرامش بیشتری انتخاب کند. رسالت من همراهی با انسان‌هایی است که می‌خواهند از تله راضی نگه‌داشتن همگان، کمال‌گرایی فرساینده و احساس گناه عبور کنند و با آرامش و اقتدار، مرزهای سالمی برای زندگی و روابط‌شان بسازند.\n\nمن محیا شکوری هستم؛ روان‌شناس، کوچ رشد فردی و خودآگاهی و تسهیل‌گر تغییر در بلومیا کلاب. سال‌ها فعالیت و پژوهش در زمینه روان‌شناسی و رفتار فردی به من آموخت که ریشه بسیاری از خستگی‌های روانی، در گفتگوی درونی ما با خودمان پنهان است؛ همان زمزمه‌های سرزنشگر «قاضی درون» که مانع دیدن ارزشمندی واقعی‌مان می‌شود. رویکرد من پیوند دادن این آگاهی‌های عمیق با ساختار پویا و اقدام‌محور فدراسیون بین‌المللی کوچینگ (ICF) است.\n\nدر جلسات کوچینگ رشد فردی، فضایی امن، کاملاً محرمانه و عاری از هرگونه قضاوت فراهم می‌آوریم؛ جایی برای مکث، کشف باورهای محدودکننده، صلح پایدار با منتقد درون، و نهادینه‌سازی مهارت مرزگذاری قاطعانه بدون احساس گناه در تاروپود زندگی روزمره.`,
    imageUrl: '/images/solea/mahya_about.jpg',
    coverImage: '/images/solea/mahya_hero_v4.png',
    aboutImage: '/images/solea/mahya_about.jpg',
    cutoutImageUrl: '/images/solea/mahya_hero_v4.png',
    sessionMode: 'online',
    languages: ['فارسی'],
    location: 'تهران',
    specialties: [
      'خودشناسی عمیق و بازیابی وضوح ذهنی',
      'صلح با منتقد درون و رهایی از خودسرزنشی',
      'هنر مرزگذاری سالم در روابط و مهارت نه گفتن بدون گناه',
      'شناسایی و شکستن باورهای محدودکننده',
      'عزت‌نفس اصیل و بازسازی هویت فردی',
      'تعادل ذهن، تاب‌آوری و آرامش درونی',
    ],
    rating: 5.0,
    totalReviews: 34,
    totalSessions: 150,
    coachingHours: 150,
    satisfiedClients: 40,
    experienceYears: 4,
    bookingUrl: '#contact',
    instagramUrl: 'https://www.instagram.com/mahya.shakouri_psy',

    audience: [
      { title: 'میان خواسته‌های دیگران و راضی نگه‌داشتن همگان، خواسته‌ها، مرزها و آرامش خودتان را گم کرده‌اید.' },
      { title: 'صدای منتقد درون و قضاوت‌های مداوم («من به اندازه کافی خوب نیستم») مانع اقدام و باور به خودتان می‌شود.' },
      { title: 'در «نه گفتن» و مرزگذاری با دیگران دچار عذاب وجدان و ترس از قضاوت یا طرد شدن می‌شوید.' },
      { title: 'می‌خواهید باورهای محدودکننده را بشکنید و با اعتمادبه‌نفس، مسیر رشد شخصی‌تان را از نو بسازید.' },
    ],
    method: [
      { id: '01', title: 'شناسایی موانع ناخودآگاه و گفتگوی درونی', description: 'ایجاد فضایی امن و کاملاً بدون قضاوت برای دیدن دیوارهای نامرئی ذهن، ریشه‌یابی ترس‌ها و تخلیه بارهای فکری و انتظارات دیگران.' },
      { id: '02', title: 'صلح با منتقد درون و بازتعریف ارزش‌ها', description: 'تبدیل قاضی سرزنشگر به حامی مشفق، خنثی‌سازی کمال‌گرایی فرساینده و شفاف‌سازی قطب‌نمای ارزش‌های اصیل فردی.' },
      { id: '03', title: 'طراحی مرزهای شفاف و قاطعیت بدون گناه', description: 'یادگیری تکنیک‌های عملی مرزگذاری در روابط شخصی و کاری؛ گفتن «نه» محترمانه و قاطع بدون ترس و عذاب وجدان.' },
      { id: '04', title: 'تثبیت خودراهبری و استقرار تعادل ماندگار', description: 'نهادینه‌سازی عادات روزمره رشد، پایش مداوم پیشرفت در زندگی واقعی و ساختن ساختاری پایدار برای عزت‌نفس و آرامش همیشگی.' },
    ],
    services: [
      {
        id: 'zero',
        title: 'جلسه صفر (معارفه رایگان ۳۰ دقیقه‌ای)',
        duration: '۳۰ دقیقه',
        description: 'یک گفتگوی آنلاین ۳۰ دقیقه‌ای رایگان برای آشنایی صمیمانه، شنیدن دغدغه‌های شما و بررسی اینکه آیا کوچینگ رشد فردی و سبک همراهی من برای اهداف شما مناسب است یا خیر.',
        price: 0,
        isFree: true,
        bookingUrl: '#contact',
      },
      {
        id: 'coaching',
        title: 'کوچینگ رشد فردی و خودآگاهی: وضوح و صلح درون',
        duration: '۶۰ دقیقه',
        description: 'یک جلسه متمرکز، امن و بدون قضاوت برای اینکه چالش فعلی، تعارض درونی، مسئله مرزگذاری یا تصمیم مهم‌تان را روی میز بگذارید، از زاویه‌ای شفاف به آن نگاه کنید و به سمت تعادل و آرامش قدم بردارید.',
        price: 850000,
        isFree: false,
        bookingUrl: '#contact',
      },
    ],
    packagesData: [
      {
        id: 'growth',
        title: 'پکیج ۴ جلسه‌ای «شروع»',
        sessions: 4,
        duration: '۶۰ دقیقه',
        description: 'وضوح ذهنی، کشف منتقد درون و اولین قدم‌های مرزگذاری. فضایی متمرکز برای شناسایی گره‌های ذهنی و پایه‌ریزی آرامش.',
        price: 2500000,
        discountPercent: 17,
        validityDays: 90,
        isPopular: false,
        bookingUrl: '#contact',
        features: [
          '۴ جلسه کوچینگ آنلاین ۶۰ دقیقه‌ای',
          'شفاف‌سازی مسئله اصلی و شناسایی صدای منتقد درون',
          'کشف ریشه‌های باج‌دهی عاطفی و راضی نگه‌داشتن دیگران',
          'طراحی اولین گام‌های مرزگذاری سالم در روابط روزمره',
          'پشتیبانی و پیگیری تمرین‌ها میان جلسات از طریق پیامک',
          'ضمانت بازگشت وجه تا پایان جلسه دوم',
        ],
      },
      {
        id: 'self-discovery',
        title: 'پکیج ۶ جلسه‌ای «کشف»',
        sessions: 6,
        duration: '۶۰ دقیقه',
        description: 'صلح با قاضی درون، شکستن باورهای محدودکننده و بازسازی عزت‌نفس. کشف تله‌های ذهنی و بازیابی هویت اصیل.',
        price: 3600000,
        discountPercent: 20,
        validityDays: 90,
        isPopular: true,
        bookingUrl: '#contact',
        features: [
          '۶ جلسه کوچینگ آنلاین ۶۰ دقیقه‌ای',
          'گفتگو و صلح عمیق با منتقد درون و خاموش کردن قضاوت‌ها',
          'شناسایی و بازنویسی باورهای محدودکننده ناخودآگاه',
          'تمرین عملی شفقت به خود (Self-Compassion) در موقعیت‌های پرتنش',
          'طراحی رفتارهای قاطعانه در مواجهه با انتظارات غیرمنطقی اطرافیان',
          'پشتیبانی پیامکی پیوسته میان جلسات برای تثبیت تغییرات',
          'ضمانت بازگشت وجه تا پایان جلسه دوم',
        ],
      },
      {
        id: 'transformation',
        title: 'پکیج ۸ جلسه‌ای «تحول»',
        sessions: 8,
        duration: '۶۰ دقیقه',
        description: 'نهادینه‌سازی مرزهای روانی سالم، قاطعیت در روابط و تحول پایدار. مسیر ۲ تا ۳ ماهه برای رهایی از باج‌دهی عاطفی و ساختن اقتدار درونی.',
        price: 4700000,
        discountPercent: 22,
        validityDays: 90,
        isPopular: false,
        bookingUrl: '#contact',
        features: [
          '۸ جلسه کوچینگ آنلاین ۶۰ دقیقه‌ای',
          'ساختن مرزهای روانی شفاف و نفوذناپذیر در خانواده و محیط کار',
          'نهادینه‌سازی مهارت «نه گفتن» قاطع بدون ترس و عذاب وجدان',
          'رهایی از تله کمال‌گرایی و بازسازی ارتباط اصیل با خود',
          'طراحی جعبه‌ابزار شخصی تاب‌آوری هیجانی و آرامش روانی',
          'پشتیبانی کامل پیامکی میان جلسات جهت پاسخ به پرسش‌ها',
          'ضمانت بازگشت وجه تا پایان جلسه دوم',
        ],
      },
      {
        id: 'self-leadership-coaching',
        title: 'پکیج ۱۲ جلسه‌ای «تعالی»',
        sessions: 12,
        duration: '۶۰ دقیقه',
        description: 'خودراهبری عمیق، شکوفایی اصیل و آرامش جامع در زندگی. جامع‌ترین برنامه همراهی ۳ تا ۴ ماهه برای دستیابی به اقتدار و استقرار پایدار در هویت اصیل.',
        price: 6000000,
        discountPercent: 33,
        validityDays: 90,
        isPopular: false,
        bookingUrl: '#contact',
        features: [
          '۱۲ جلسه اختصاصی آنلاین ۶۰ دقیقه‌ای',
          'تدوین سند چشم‌انداز فردی (Life Vision) و قطب‌نمای ارزش‌ها',
          'نهادینه‌سازی سیستم‌های خودانگیزشی و روتین‌های روزمره پایدار',
          'هماهنگ‌سازی روابط، شغل و اهداف فردی با هویت واقعی',
          'ارزیابی و پایش همه‌جانبه پیشرفت و شاخص‌های رضایت از زندگی',
          'پشتیبانی نامحدود پیامکی در تمام طول دوره ۳ تا ۴ ماهه',
          'ضمانت بازگشت وجه تا پایان جلسه دوم',
        ],
      },
    ],
    packagePrices: {
      growth: 2500000,
      discovery: 3600000,
      transformation: 4700000,
      excellence: 6000000,
    },
    packageDiscounts: {
      growth: 17,
      discovery: 20,
      transformation: 22,
      excellence: 33,
    },
    credentials: [
      { id: 'c1', title: 'کارشناسی ارشد روان‌شناسی عمومی', organization: 'دانشگاه سراسری', year: '۱۳۹۸' },
      { id: 'c2', title: 'مدرک بین‌المللی کوچینگ حرفه‌ای منطبق با استانداردهای ICF', organization: 'آکادمی بین‌المللی کوچینگ', year: '۱۴۰۱' },
      { id: 'c3', title: 'تسهیل‌گر و پژوهشگر دوره‌های خودشناسی و طرحواره‌درمانی', organization: 'کلینیک‌های تخصصی رشد فردی', year: '۱۴۰۱ تا کنون' },
      { id: 'c4', title: 'مدرس کارگاه‌های مهارت‌های ارتباطی و مرزگذاری در روابط', organization: 'مراکز توسعه فردی بلومیا', year: '۱۴۰۲ تا کنون' },
    ],
    testimonials: [
      {
        id: 't1',
        quote: 'همیشه فکر می‌کردم اگر به خودم سخت نگیرم و سرزنش نکنم پیشرفت نمی‌کنم. در جلسات با محیا شکوری یاد گرفتم چطور قاضی بی‌رحم درونم را به یک حامی آگاه تبدیل کنم. آرامشی که بعد از مدت‌ها در ذهنم جاری شده وصف‌ناپذیر است.',
        author: 'مریم س.',
        context: 'مراجع دوره صلح با منتقد درون و شفقت با خود',
      },
      {
        id: 't2',
        quote: 'مهارت نه گفتن بدون احساس گناه بزرگ‌ترین دستاورد من از این جلسات بود. سال‌ها برای خوشایند دیگران خودم را نادیده می‌گرفتم. محیا با پرسش‌های عمیق و امنیتی که به جلسه می‌داد کمکم کرد مرزهای سالمی بسازم.',
        author: 'فرنوش ا.',
        context: 'مراجع دوره مرزگذاری سالم در روابط',
      },
      {
        id: 't3',
        quote: 'دیوارهای نامرئی ذهنم که فکر می‌کردم حقیقت دارند، در جلسات کوچینگ فروریختند. نگاه عمیق و بدون قضاوت خانم شکوری باعث شد جسارت اقدام و شروع پروژه‌های شخصی‌ام را بازیابم.',
        author: 'هدی ک.',
        context: 'مراجع دوره خودشناسی و تحول فردی',
      },
      {
        id: 't4',
        quote: 'در میان آشفتگی تصمیم‌گیری و سردرگمی ذهنی، هر جلسه با شما مثل یک هوای تازه بود. با مهارت و آرامشتان مرا به سمت شفافیت و دیدن اولویت‌های اصیلم بردید.',
        author: 'نیلوفر م.',
        context: 'مراجع پکیج ۶ جلسه‌ای کشف',
      },
      {
        id: 't5',
        quote: 'فضای گفتگوی ما آن‌قدر امن و صمیمانه بود که توانستم عمیق‌ترین ترس‌ها و احساس ناکافی بودنم را روی میز بگذارم. صبوری و درک روان‌شناختی شما نجات‌بخش بود.',
        author: 'بهار ر.',
        context: 'مراجع دوره خودآگاهی و عزت‌نفس',
      },
      {
        id: 't6',
        quote: 'یک تجربه تحول‌آفرین که در آن یاد گرفتم به جای منفعل بودن در برابر شرایط، خودراهبری زندگی‌ام را به دست بگیرم. ممنونم که این‌قدر شنونده امن و حرفه‌ای هستید.',
        author: 'ساناز ط.',
        context: 'مراجع پکیج ۸ جلسه‌ای تحول',
      },
    ],
    faqs: [
      { question: 'کوچینگ رشد فردی و خودآگاهی دقیقاً چه تفاوتی با روان‌درمانی دارد؟', answer: 'در روان‌درمانی تمرکز عموماً بر آسیب‌شناسی گذشته و ترمیم تروماهاست. اما در کوچینگ رشد فردی، ما از نقطه اکنون آغاز می‌کنیم؛ با کشف پتانسیل‌های درون، شناسایی الگوهای فکری و صلح با منتقد درون، نقشه راهی شفاف و اقدام‌محور برای آینده و ساختن زندگی دلخواه‌تان طراحی می‌کنیم.' },
      { question: 'در جلسه صفر رایگان دقیقاً چه اتفاقی می‌افتد؟', answer: 'جلسه صفر یک گفتگوی آنلاین ۳۰ دقیقه‌ای بدون هیچ‌گونه هزینه یا تعهد مالی است. در این جلسه، چالش‌های اصلی شما شنیده می‌شود، متدولوژی کوچینگ خودآگاهی توضیح داده می‌شود و با هم بررسی می‌کنیم که آیا این مسیر در این مقطع برای اهداف شما مناسب و اثربخش است یا خیر.' },
      { question: 'آیا جلسات آنلاین برگزار می‌شوند و محرمانه هستند؟', answer: 'بله، تمامی جلسات به صورت آنلاین (گوگل‌میت یا پلتفرم اختصاصی) برگزار می‌شوند. همچنین رازداری و حفظ محرمانگی ۱۰۰٪ کدهای اخلاقی فدراسیون بین‌المللی کوچینگ (ICF) اساس جلسات است.' },
      { question: 'چگونه پکیج مناسب شرایط خودم را انتخاب کنم؟', answer: 'پیشنهاد ما شروع با جلسه صفر است. در این جلسه پس از شنیدن دغدغه شما، متناسب با عمق چالش، آمادگی برای تمرین‌ها و سرعتی که برای تحول در نظر دارید، بهترین پکیج به شما پیشنهاد می‌شود.' },
      { question: 'فاصله زمانی بین جلسات معمولاً چقدر است؟', answer: 'بهترین روند اثربخشی، برگزاری هر جلسه با فاصله یک هفته تا ده روز است تا فرصت کافی برای تجربه تمرین‌ها و مشاهده تغییرات در بطن زندگی روزمره وجود داشته باشد.' },
    ],
    events: [],
    articles: [
      {
        id: 'a1',
        title: 'صدای منتقد درون: چرا همیشه خودمان را سرزنش می‌کنیم و چگونه با قاضی درون صلح کنیم؟',
        date: '۲۰ مهر ۱۴۰۵',
        readTime: '۷ دقیقه',
        imageUrl: 'https://cdn.sanity.io/images/7yjhdw88/production/39f33901f5c8d5ba6e02dbea5d5ddf0e7f17b41e-1376x768.jpg',
        excerpt: 'قضاوت‌های بی‌رحمانه، وسواس بر سر اشتباهات گذشته و احساس مداومِ «کافی نبودن»، همگی زمزمه‌های آشنای منتقد درون هستند. این راهنما مسیر صلح با قاضی درون و تبدیل آن به یک حامی آگاه را روشن می‌کند.',
        href: '/blog/taming-the-inner-critic-self-coaching',
      },
      {
        id: 'a2',
        title: 'هنر مرزگذاری سالم در روابط: چگونه بدون احساس گناه نه بگوییم؟',
        date: '۳۰ شهریور ۱۴۰۵',
        readTime: '۸ دقیقه',
        imageUrl: 'https://cdn.sanity.io/images/7yjhdw88/production/d868e8f56fce763a4601c4e6993b69d689528401-1376x768.jpg',
        excerpt: 'هر بار که برای خوشایند دیگران یا از سر ترس از طرد شدن «بله» می‌گویید، در واقع در حال گفتن یک «نه» بزرگ به آرامش، انرژی و سلامت روان خود هستید. با راهنمای کوچینگ بیاموزید که چرا مرزگذاری نشانه خودخواهی نیست.',
        href: '/blog/healthy-boundaries-how-to-say-no-without-guilt',
      },
      {
        id: 'a3',
        title: 'شکستن دیوارهای نامرئی: چگونه باورهای محدودکننده مانع رشد ما می‌شوند',
        date: '۷ آبان ۱۴۰۴',
        readTime: '۸ دقیقه',
        imageUrl: 'https://cdn.sanity.io/images/7yjhdw88/production/4937861f54581afa8f87096a857b77f9fca43b16-1024x1024.png',
        excerpt: 'باورهای محدودکننده همان دیوارهای نامرئی‌اند که مانع رشد ما می‌شوند. یاد بگیر چطور آن‌ها را شناسایی و با باورهای قدرتمند جایگزین کنی.',
        href: '/blog/breaking-limiting-beliefs-for-personal-growth',
      },
    ],
    welcomePacket: {
      title: 'بسته راهنمای خدمات کوچینگ با محیا شکوری',
      subtitle: 'راهنمای جامع ورود به دنیای کوچینگ رشد فردی و خودآگاهی؛ استانداردهای بین‌المللی ICF، نقشه راه جلسات و نحوه آمادگی کامل برای جلسه معارفه رایگان.',
      fileUrl: '/documents/welcome-packets/mahya_shakouri_welcome_packet.pdf',
      coverImageUrl: '/images/solea/mahya_welcome_packet_cover.png',
      features: [
        'آشنایی با متدولوژی و اصول ۴گانه کوچینگ رشد فردی و خودآگاهی',
        'شفافیت در شرایط، ضوابط همکاری و منشور محرمانگی ICF',
        'راهنمای گام‌به‌گام آمادگی برای جلسه معارفه رایگان (جلسه صفر)',
      ],
      buttonText: 'دریافت بسته راهنما (PDF)',
    },
  },
  {
    id: 'coach-profile-mahya_shakouri',
    slug: 'mahya_shakouri',
    name: 'محیا شکوری',
    title: 'کوچ رشد فردی و خودآگاهی',
    eyebrow: 'کوچ حرفه‌ای بلومیا',
    shortBio: 'همراهی تخصصی در مسیر خودشناسی عمیق، رهایی از قضاوت منتقد درون، مهارت مرزگذاری شفاف و بدون احساس گناه در روابط و ساختن زندگی اصیل و آرام.',
    description: 'همراهی تخصصی در مسیر خودشناسی عمیق، رهایی از قضاوت منتقد درون، مهارت مرزگذاری شفاف و بدون احساس گناه در روابط و ساختن زندگی اصیل و آرام.',
    longBio: `باور دارم هر انسانی در درون خود صدایی اصیل دارد که اگر شنیده شود، می‌تواند مسیر زندگی‌اش را با وضوح و آرامش بیشتری انتخاب کند. رسالت من همراهی با انسان‌هایی است که می‌خواهند از تله راضی نگه‌داشتن همگان، کمال‌گرایی فرساینده و احساس گناه عبور کنند و با آرامش و اقتدار، مرزهای سالمی برای زندگی و روابط‌شان بسازند.\n\nمن محیا شکوری هستم؛ روان‌شناس، کوچ رشد فردی و خودآگاهی و تسهیل‌گر تغییر در بلومیا کلاب. سال‌ها فعالیت و پژوهش در زمینه روان‌شناسی و رفتار فردی به من آموخت که ریشه بسیاری از خستگی‌های روانی، در گفتگوی درونی ما با خودمان پنهان است؛ همان زمزمه‌های سرزنشگر «قاضی درون» که مانع دیدن ارزشمندی واقعی‌مان می‌شود. رویکرد من پیوند دادن این آگاهی‌های عمیق با ساختار پویا و اقدام‌محور فدراسیون بین‌المللی کوچینگ (ICF) است.\n\nدر جلسات کوچینگ رشد فردی، فضایی امن، کاملاً محرمانه و عاری از هرگونه قضاوت فراهم می‌آوریم؛ جایی برای مکث، کشف باورهای محدودکننده، صلح پایدار با منتقد درون، و نهادینه‌سازی مهارت مرزگذاری قاطعانه بدون احساس گناه در تاروپود زندگی روزمره.`,
    longDescription: `باور دارم هر انسانی در درون خود صدایی اصیل دارد که اگر شنیده شود، می‌تواند مسیر زندگی‌اش را با وضوح و آرامش بیشتری انتخاب کند. رسالت من همراهی با انسان‌هایی است که می‌خواهند از تله راضی نگه‌داشتن همگان، کمال‌گرایی فرساینده و احساس گناه عبور کنند و با آرامش و اقتدار، مرزهای سالمی برای زندگی و روابط‌شان بسازند.\n\nمن محیا شکوری هستم؛ روان‌شناس، کوچ رشد فردی و خودآگاهی و تسهیل‌گر تغییر در بلومیا کلاب. سال‌ها فعالیت و پژوهش در زمینه روان‌شناسی و رفتار فردی به من آموخت که ریشه بسیاری از خستگی‌های روانی، در گفتگوی درونی ما با خودمان پنهان است؛ همان زمزمه‌های سرزنشگر «قاضی درون» که مانع دیدن ارزشمندی واقعی‌مان می‌شود. رویکرد من پیوند دادن این آگاهی‌های عمیق با ساختار پویا و اقدام‌محور فدراسیون بین‌المللی کوچینگ (ICF) است.\n\nدر جلسات کوچینگ رشد فردی، فضایی امن، کاملاً محرمانه و عاری از هرگونه قضاوت فراهم می‌آوریم؛ جایی برای مکث، کشف باورهای محدودکننده، صلح پایدار با منتقد درون، و نهادینه‌سازی مهارت مرزگذاری قاطعانه بدون احساس گناه در تاروپود زندگی روزمره.`,
    imageUrl: '/images/solea/mahya_about.jpg',
    coverImage: '/images/solea/mahya_hero_v4.png',
    aboutImage: '/images/solea/mahya_about.jpg',
    cutoutImageUrl: '/images/solea/mahya_hero_v4.png',
    sessionMode: 'online',
    languages: ['فارسی'],
    location: 'تهران',
    specialties: [
      'خودشناسی عمیق و بازیابی وضوح ذهنی',
      'صلح با منتقد درون و رهایی از خودسرزنشی',
      'هنر مرزگذاری سالم در روابط و مهارت نه گفتن بدون گناه',
      'شناسایی و شکستن باورهای محدودکننده',
      'عزت‌نفس اصیل و بازسازی هویت فردی',
      'تعادل ذهن، تاب‌آوری و آرامش درونی',
    ],
    rating: 5.0,
    totalReviews: 34,
    totalSessions: 150,
    coachingHours: 150,
    satisfiedClients: 40,
    experienceYears: 4,
    bookingUrl: '#contact',
    instagramUrl: 'https://www.instagram.com/mahya.shakouri_psy',

    audience: [
      { title: 'میان خواسته‌های دیگران و راضی نگه‌داشتن همگان، خواسته‌ها، مرزها و آرامش خودتان را گم کرده‌اید.' },
      { title: 'صدای منتقد درون و قضاوت‌های مداوم («من به اندازه کافی خوب نیستم») مانع اقدام و باور به خودتان می‌شود.' },
      { title: 'در «نه گفتن» و مرزگذاری با دیگران دچار عذاب وجدان و ترس از قضاوت یا طرد شدن می‌شوید.' },
      { title: 'می‌خواهید باورهای محدودکننده را بشکنید و با اعتمادبه‌نفس، مسیر رشد شخصی‌تان را از نو بسازید.' },
    ],
    method: [
      { id: '01', title: 'شناسایی موانع ناخودآگاه و گفتگوی درونی', description: 'ایجاد فضایی امن و کاملاً بدون قضاوت برای دیدن دیوارهای نامرئی ذهن، ریشه‌یابی ترس‌ها و تخلیه بارهای فکری و انتظارات دیگران.' },
      { id: '02', title: 'صلح با منتقد درون و بازتعریف ارزش‌ها', description: 'تبدیل قاضی سرزنشگر به حامی مشفق، خنثی‌سازی کمال‌گرایی فرساینده و شفاف‌سازی قطب‌نمای ارزش‌های اصیل فردی.' },
      { id: '03', title: 'طراحی مرزهای شفاف و قاطعیت بدون گناه', description: 'یادگیری تکنیک‌های عملی مرزگذاری در روابط شخصی و کاری؛ گفتن «نه» محترمانه و قاطع بدون ترس و عذاب وجدان.' },
      { id: '04', title: 'تثبیت خودراهبری و استقرار تعادل ماندگار', description: 'نهادینه‌سازی عادات روزمره رشد، پایش مداوم پیشرفت در زندگی واقعی و ساختن ساختاری پایدار برای عزت‌نفس و آرامش همیشگی.' },
    ],
    services: [
      {
        id: 'zero',
        title: 'جلسه صفر (معارفه رایگان ۳۰ دقیقه‌ای)',
        duration: '۳۰ دقیقه',
        description: 'یک گفتگوی آنلاین ۳۰ دقیقه‌ای رایگان برای آشنایی صمیمانه، شنیدن دغدغه‌های شما و بررسی اینکه آیا کوچینگ رشد فردی و سبک همراهی من برای اهداف شما مناسب است یا خیر.',
        price: 0,
        isFree: true,
        bookingUrl: '#contact',
      },
      {
        id: 'coaching',
        title: 'کوچینگ رشد فردی و خودآگاهی: وضوح و صلح درون',
        duration: '۶۰ دقیقه',
        description: 'یک جلسه متمرکز، امن و بدون قضاوت برای اینکه چالش فعلی، تعارض درونی، مسئله مرزگذاری یا تصمیم مهم‌تان را روی میز بگذارید، از زاویه‌ای شفاف به آن نگاه کنید و به سمت تعادل و آرامش قدم بردارید.',
        price: 850000,
        isFree: false,
        bookingUrl: '#contact',
      },
    ],
    packagesData: [
      {
        id: 'growth',
        title: 'پکیج ۴ جلسه‌ای «شروع»',
        sessions: 4,
        duration: '۶۰ دقیقه',
        description: 'وضوح ذهنی، کشف منتقد درون و اولین قدم‌های مرزگذاری. فضایی متمرکز برای شناسایی گره‌های ذهنی و پایه‌ریزی آرامش.',
        price: 2500000,
        discountPercent: 17,
        validityDays: 90,
        isPopular: false,
        bookingUrl: '#contact',
        features: [
          '۴ جلسه کوچینگ آنلاین ۶۰ دقیقه‌ای',
          'شفاف‌سازی مسئله اصلی و شناسایی صدای منتقد درون',
          'کشف ریشه‌های باج‌دهی عاطفی و راضی نگه‌داشتن دیگران',
          'طراحی اولین گام‌های مرزگذاری سالم در روابط روزمره',
          'پشتیبانی و پیگیری تمرین‌ها میان جلسات از طریق پیامک',
          'ضمانت بازگشت وجه تا پایان جلسه دوم',
        ],
      },
      {
        id: 'self-discovery',
        title: 'پکیج ۶ جلسه‌ای «کشف»',
        sessions: 6,
        duration: '۶۰ دقیقه',
        description: 'صلح با قاضی درون، شکستن باورهای محدودکننده و بازسازی عزت‌نفس. کشف تله‌های ذهنی و بازیابی هویت اصیل.',
        price: 3600000,
        discountPercent: 20,
        validityDays: 90,
        isPopular: true,
        bookingUrl: '#contact',
        features: [
          '۶ جلسه کوچینگ آنلاین ۶۰ دقیقه‌ای',
          'گفتگو و صلح عمیق با منتقد درون و خاموش کردن قضاوت‌ها',
          'شناسایی و بازنویسی باورهای محدودکننده ناخودآگاه',
          'تمرین عملی شفقت به خود (Self-Compassion) در موقعیت‌های پرتنش',
          'طراحی رفتارهای قاطعانه در مواجهه با انتظارات غیرمنطقی اطرافیان',
          'پشتیبانی پیامکی پیوسته میان جلسات برای تثبیت تغییرات',
          'ضمانت بازگشت وجه تا پایان جلسه دوم',
        ],
      },
      {
        id: 'transformation',
        title: 'پکیج ۸ جلسه‌ای «تحول»',
        sessions: 8,
        duration: '۶۰ دقیقه',
        description: 'نهادینه‌سازی مرزهای روانی سالم، قاطعیت در روابط و تحول پایدار. مسیر ۲ تا ۳ ماهه برای رهایی از باج‌دهی عاطفی و ساختن اقتدار درونی.',
        price: 4700000,
        discountPercent: 22,
        validityDays: 90,
        isPopular: false,
        bookingUrl: '#contact',
        features: [
          '۸ جلسه کوچینگ آنلاین ۶۰ دقیقه‌ای',
          'ساختن مرزهای روانی شفاف و نفوذناپذیر در خانواده و محیط کار',
          'نهادینه‌سازی مهارت «نه گفتن» قاطع بدون ترس و عذاب وجدان',
          'رهایی از تله کمال‌گرایی و بازسازی ارتباط اصیل با خود',
          'طراحی جعبه‌ابزار شخصی تاب‌آوری هیجانی و آرامش روانی',
          'پشتیبانی کامل پیامکی میان جلسات جهت پاسخ به پرسش‌ها',
          'ضمانت بازگشت وجه تا پایان جلسه دوم',
        ],
      },
      {
        id: 'self-leadership-coaching',
        title: 'پکیج ۱۲ جلسه‌ای «تعالی»',
        sessions: 12,
        duration: '۶۰ دقیقه',
        description: 'خودراهبری عمیق، شکوفایی اصیل و آرامش جامع در زندگی. جامع‌ترین برنامه همراهی ۳ تا ۴ ماهه برای دستیابی به اقتدار و استقرار پایدار در هویت اصیل.',
        price: 6000000,
        discountPercent: 33,
        validityDays: 90,
        isPopular: false,
        bookingUrl: '#contact',
        features: [
          '۱۲ جلسه اختصاصی آنلاین ۶۰ دقیقه‌ای',
          'تدوین سند چشم‌انداز فردی (Life Vision) و قطب‌نمای ارزش‌ها',
          'نهادینه‌سازی سیستم‌های خودانگیزشی و روتین‌های روزمره پایدار',
          'هماهنگ‌سازی روابط، شغل و اهداف فردی با هویت واقعی',
          'ارزیابی و پایش همه‌جانبه پیشرفت و شاخص‌های رضایت از زندگی',
          'پشتیبانی نامحدود پیامکی در تمام طول دوره ۳ تا ۴ ماهه',
          'ضمانت بازگشت وجه تا پایان جلسه دوم',
        ],
      },
    ],
    packagePrices: {
      growth: 2500000,
      discovery: 3600000,
      transformation: 4700000,
      excellence: 6000000,
    },
    packageDiscounts: {
      growth: 17,
      discovery: 20,
      transformation: 22,
      excellence: 33,
    },
    credentials: [
      { id: 'c1', title: 'کارشناسی ارشد روان‌شناسی عمومی', organization: 'دانشگاه سراسری', year: '۱۳۹۸' },
      { id: 'c2', title: 'مدرک بین‌المللی کوچینگ حرفه‌ای منطبق با استانداردهای ICF', organization: 'آکادمی بین‌المللی کوچینگ', year: '۱۴۰۱' },
      { id: 'c3', title: 'تسهیل‌گر و پژوهشگر دوره‌های خودشناسی و طرحواره‌درمانی', organization: 'کلینیک‌های تخصصی رشد فردی', year: '۱۴۰۱ تا کنون' },
      { id: 'c4', title: 'مدرس کارگاه‌های مهارت‌های ارتباطی و مرزگذاری در روابط', organization: 'مراکز توسعه فردی بلومیا', year: '۱۴۰۲ تا کنون' },
    ],
    testimonials: [
      {
        id: 't1',
        quote: 'همیشه فکر می‌کردم اگر به خودم سخت نگیرم و سرزنش نکنم پیشرفت نمی‌کنم. در جلسات با محیا شکوری یاد گرفتم چطور قاضی بی‌رحم درونم را به یک حامی آگاه تبدیل کنم. آرامشی که بعد از مدت‌ها در ذهنم جاری شده وصف‌ناپذیر است.',
        author: 'مریم س.',
        context: 'مراجع دوره صلح با منتقد درون و شفقت با خود',
      },
      {
        id: 't2',
        quote: 'مهارت نه گفتن بدون احساس گناه بزرگ‌ترین دستاورد من از این جلسات بود. سال‌ها برای خوشایند دیگران خودم را نادیده می‌گرفتم. محیا با پرسش‌های عمیق و امنیتی که به جلسه می‌داد کمکم کرد مرزهای سالمی بسازم.',
        author: 'فرنوش ا.',
        context: 'مراجع دوره مرزگذاری سالم در روابط',
      },
      {
        id: 't3',
        quote: 'دیوارهای نامرئی ذهنم که فکر می‌کردم حقیقت دارند، در جلسات کوچینگ فروریختند. نگاه عمیق و بدون قضاوت خانم شکوری باعث شد جسارت اقدام و شروع پروژه‌های شخصی‌ام را بازیابم.',
        author: 'هدی ک.',
        context: 'مراجع دوره خودشناسی و تحول فردی',
      },
      {
        id: 't4',
        quote: 'در میان آشفتگی تصمیم‌گیری و سردرگمی ذهنی، هر جلسه با شما مثل یک هوای تازه بود. با مهارت و آرامشتان مرا به سمت شفافیت و دیدن اولویت‌های اصیلم بردید.',
        author: 'نیلوفر م.',
        context: 'مراجع پکیج ۶ جلسه‌ای کشف',
      },
      {
        id: 't5',
        quote: 'فضای گفتگوی ما آن‌قدر امن و صمیمانه بود که توانستم عمیق‌ترین ترس‌ها و احساس ناکافی بودنم را روی میز بگذارم. صبوری و درک روان‌شناختی شما نجات‌بخش بود.',
        author: 'بهار ر.',
        context: 'مراجع دوره خودآگاهی و عزت‌نفس',
      },
      {
        id: 't6',
        quote: 'یک تجربه تحول‌آفرین که در آن یاد گرفتم به جای منفعل بودن در برابر شرایط، خودراهبری زندگی‌ام را به دست بگیرم. ممنونم که این‌قدر شنونده امن و حرفه‌ای هستید.',
        author: 'ساناز ط.',
        context: 'مراجع پکیج ۸ جلسه‌ای تحول',
      },
    ],
    faqs: [
      { question: 'کوچینگ رشد فردی و خودآگاهی دقیقاً چه تفاوتی با روان‌درمانی دارد؟', answer: 'در روان‌درمانی تمرکز عموماً بر آسیب‌شناسی گذشته و ترمیم تروماهاست. اما در کوچینگ رشد فردی، ما از نقطه اکنون آغاز می‌کنیم؛ با کشف پتانسیل‌های درون، شناسایی الگوهای فکری و صلح با منتقد درون، نقشه راهی شفاف و اقدام‌محور برای آینده و ساختن زندگی دلخواه‌تان طراحی می‌کنیم.' },
      { question: 'در جلسه صفر رایگان دقیقاً چه اتفاقی می‌افتد؟', answer: 'جلسه صفر یک گفتگوی آنلاین ۳۰ دقیقه‌ای بدون هیچ‌گونه هزینه یا تعهد مالی است. در این جلسه، چالش‌های اصلی شما شنیده می‌شود، متدولوژی کوچینگ خودآگاهی توضیح داده می‌شود و با هم بررسی می‌کنیم که آیا این مسیر در این مقطع برای اهداف شما مناسب و اثربخش است یا خیر.' },
      { question: 'آیا جلسات آنلاین برگزار می‌شوند و محرمانه هستند؟', answer: 'بله، تمامی جلسات به صورت آنلاین (گوگل‌میت یا پلتفرم اختصاصی) برگزار می‌شوند. همچنین رازداری و حفظ محرمانگی ۱۰۰٪ کدهای اخلاقی فدراسیون بین‌المللی کوچینگ (ICF) اساس جلسات است.' },
      { question: 'چگونه پکیج مناسب شرایط خودم را انتخاب کنم؟', answer: 'پیشنهاد ما شروع با جلسه صفر است. در این جلسه پس از شنیدن دغدغه شما، متناسب با عمق چالش، آمادگی برای تمرین‌ها و سرعتی که برای تحول در نظر دارید، بهترین پکیج به شما پیشنهاد می‌شود.' },
      { question: 'فاصله زمانی بین جلسات معمولاً چقدر است؟', answer: 'بهترین روند اثربخشی، برگزاری هر جلسه با فاصله یک هفته تا ده روز است تا فرصت کافی برای تجربه تمرین‌ها و مشاهده تغییرات در بطن زندگی روزمره وجود داشته باشد.' },
    ],
    events: [],
    articles: [
      {
        id: 'a1',
        title: 'صدای منتقد درون: چرا همیشه خودمان را سرزنش می‌کنیم و چگونه با قاضی درون صلح کنیم؟',
        date: '۲۰ مهر ۱۴۰۵',
        readTime: '۷ دقیقه',
        imageUrl: 'https://cdn.sanity.io/images/7yjhdw88/production/39f33901f5c8d5ba6e02dbea5d5ddf0e7f17b41e-1376x768.jpg',
        excerpt: 'قضاوت‌های بی‌رحمانه، وسواس بر سر اشتباهات گذشته و احساس مداومِ «کافی نبودن»، همگی زمزمه‌های آشنای منتقد درون هستند. این راهنما مسیر صلح با قاضی درون و تبدیل آن به یک حامی آگاه را روشن می‌کند.',
        href: '/blog/taming-the-inner-critic-self-coaching',
      },
      {
        id: 'a2',
        title: 'هنر مرزگذاری سالم در روابط: چگونه بدون احساس گناه نه بگوییم؟',
        date: '۳۰ شهریور ۱۴۰۵',
        readTime: '۸ دقیقه',
        imageUrl: 'https://cdn.sanity.io/images/7yjhdw88/production/d868e8f56fce763a4601c4e6993b69d689528401-1376x768.jpg',
        excerpt: 'هر بار که برای خوشایند دیگران یا از سر ترس از طرد شدن «بله» می‌گویید، در واقع در حال گفتن یک «نه» بزرگ به آرامش، انرژی و سلامت روان خود هستید. با راهنمای کوچینگ بیاموزید که چرا مرزگذاری نشانه خودخواهی نیست.',
        href: '/blog/healthy-boundaries-how-to-say-no-without-guilt',
      },
      {
        id: 'a3',
        title: 'شکستن دیوارهای نامرئی: چگونه باورهای محدودکننده مانع رشد ما می‌شوند',
        date: '۷ آبان ۱۴۰۴',
        readTime: '۸ دقیقه',
        imageUrl: 'https://cdn.sanity.io/images/7yjhdw88/production/4937861f54581afa8f87096a857b77f9fca43b16-1024x1024.png',
        excerpt: 'باورهای محدودکننده همان دیوارهای نامرئی‌اند که مانع رشد ما می‌شوند. یاد بگیر چطور آن‌ها را شناسایی و با باورهای قدرتمند جایگزین کنی.',
        href: '/blog/breaking-limiting-beliefs-for-personal-growth',
      },
    ],
    welcomePacket: {
      title: 'بسته راهنمای خدمات کوچینگ با محیا شکوری',
      subtitle: 'راهنمای جامع ورود به دنیای کوچینگ رشد فردی و خودآگاهی؛ استانداردهای بین‌المللی ICF، نقشه راه جلسات و نحوه آمادگی کامل برای جلسه معارفه رایگان.',
      fileUrl: '/documents/welcome-packets/mahya_shakouri_welcome_packet.pdf',
      coverImageUrl: '/images/solea/mahya_welcome_packet_cover.png',
      features: [
        'آشنایی با متدولوژی و اصول ۴گانه کوچینگ رشد فردی و خودآگاهی',
        'شفافیت در شرایط، ضوابط همکاری و منشور محرمانگی ICF',
        'راهنمای گام‌به‌گام آمادگی برای جلسه معارفه رایگان (جلسه صفر)',
      ],
      buttonText: 'دریافت بسته راهنما (PDF)',
    },
  },
  // ==========================================
  // SALOOMEH FATHIJOU (سالومه فتحی‌جو)
  // ==========================================
  {
    id: 'coach-profile-saloomeh_fathijou',
    slug: 'saloomeh_fathijou',
    name: 'سالومه فتحی‌جو',
    title: 'کوچ حرفه‌ای و تسهیل‌گر تحول فردی و توسعه شغلی (PCC)',
    eyebrow: 'کوچ حرفه‌ای بلومیا',
    shortBio: 'همراهت هستم تا با شناخت عمیق ارزش‌ها و رسالت فردی، تصمیم‌های روشن‌تری در دوراهی‌های مهم بگیری و مسیر مناسب خودت را بسازی.',
    description: 'همراهت هستم تا با شناخت عمیق ارزش‌ها و رسالت فردی، تصمیم‌های روشن‌تری در دوراهی‌های مهم بگیری و مسیر مناسب خودت را بسازی.',
    longBio: `بیش از ۱۰ سال است که در زمینه تسهیل‌گری تحول فردی، خودشناسی و تصمیم‌گیری‌های حساس شغلی فعالیت می‌کنم.\n\nرویکرد من مبتنی بر گفتگوهای عمیق، شفافیت ذهنی و کدهای اخلاقی فدراسیون بین‌المللی کوچینگ (ICF) است. در جلسات کوچینگ، فضایی امن و سرشار از همدلی می‌سازیم تا شما بتوانید با ارزش‌های اصیل خود همسو شده و تصمیماتی مقتدرانه برای زندگی و کارتان اتخاذ کنید.\n\nهمراهی با مراجعان در مسیر ارتقای مسیر شغلی، تغییر جهت حرفه‌ای و خروج از سردرگمی میانسالی به من نشان داده است که بزرگترین عامل پیشرفت پایدار، خودآگاهی شجاعانه و اقدام هماهنگ با ارزش‌های بنیادین است.`,
    longDescription: `بیش از ۱۰ سال است که در زمینه تسهیل‌گری تحول فردی، خودشناسی و تصمیم‌گیری‌های حساس شغلی فعالیت می‌کنم.\n\nرویکرد من مبتنی بر گفتگوهای عمیق، شفافیت ذهنی و کدهای اخلاقی فدراسیون بین‌المللی کوچینگ (ICF) است. در جلسات کوچینگ، فضایی امن و سرشار از همدلی می‌سازیم تا شما بتوانید با ارزش‌های اصیل خود همسو شده و تصمیماتی مقتدرانه برای زندگی و کارتان اتخاذ کنید.\n\nهمراهی با مراجعان در مسیر ارتقای مسیر شغلی، تغییر جهت حرفه‌ای و خروج از سردرگمی میانسالی به من نشان داده است که بزرگترین عامل پیشرفت پایدار، خودآگاهی شجاعانه و اقدام هماهنگ با ارزش‌های بنیادین است.`,
    imageUrl: 'https://cdn.sanity.io/images/7yjhdw88/production/8f01f1da6f4c32287935980474bbf5c00ec57c48-1024x1024.png',
    cutoutImageUrl: '/images/solea/saloomeh_hero_v4.png',
    coverImage: 'https://cdn.sanity.io/images/7yjhdw88/production/8f01f1da6f4c32287935980474bbf5c00ec57c48-1024x1024.png',
    aboutImage: 'https://cdn.sanity.io/images/7yjhdw88/production/8f01f1da6f4c32287935980474bbf5c00ec57c48-1024x1024.png',
    sessionMode: 'online',
    languages: ['فارسی'],
    location: 'تهران',
    specialties: [
      'خودشناسی عمیق و کشف رسالت فردی',
      'وضوح شغلی و عبور از دوراهی‌های حرفه‌ای',
      'تسهیل‌گری تحول آگاهانه و پایدار',
      'همسوسازی تصمیم‌ها با ارزش‌های فردی',
      'کوچینگ سطح حرفه‌ای PCC فدراسیون بین‌المللی',
    ],
    rating: 4.9,
    totalReviews: 68,
    totalSessions: 380,
    coachingHours: 380,
    satisfiedClients: 70,
    experienceYears: 10,
    audience: [
      { title: 'در یک دوراهی مهم شغلی یا تغییر جهت حرفه‌ای گیر کرده‌اید.' },
      { title: 'می‌خواهید استعدادها و رسالت اصیل خود را شفاف کنید.' },
      { title: 'به دنبال ایجاد تغییرات ریشه‌ای بر مبنای ارزش‌های فردی هستید.' },
      { title: 'می‌خواهید از وضوح ذهنی به یک برنامه عملیاتی و مقتدرانه برسید.' },
    ],
    method: [
      { id: '01', title: 'شناخت و کاوش عمیق', description: 'بررسی دقیق نقطه اکنون، شناسایی ارزش‌های بنیادین و گره‌گشایی از چالش‌های پنهان ذهن.' },
      { id: '02', title: 'وضوح و جهت‌یابی', description: 'پرسش‌های عمیق تحول‌آفرین برای دیدن گزینه‌ها، برطرف کردن سردرگمی و کشف بهترین راهکار.' },
      { id: '03', title: 'طراحی استراتژی اقدام', description: 'تبدیل چشم‌انداز به گام‌های کوچک، مشخص و متناسب با شرایط واقعی زندگی شما.' },
      { id: '04', title: 'همراهی و تثبیت دستاوردها', description: 'پایش مستمر پیشرفت، مهار موانع بازدارنده و پایدارسازی تغییرات مثبت در کار و زندگی.' },
    ],
    services: [
      {
        id: 'zero',
        title: 'جلسه صفر (معارفه رایگان ۳۰ دقیقه‌ای)',
        duration: '۳۰ دقیقه',
        description: 'یک گفتگوی آنلاین ۳۰ دقیقه‌ای رایگان برای آشنایی صمیمانه، شنیدن چالش شما و بررسی اینکه آیا کوچینگ تحول شغلی و سبک همراهی من برای اهداف شما مناسب است یا خیر.',
        price: 0,
        isFree: true,
      },
      {
        id: 'coaching',
        title: 'تک‌جلسه کوچینگ تحول فردی و شغلی',
        duration: '۶۰ دقیقه',
        description: 'فضایی متمرکز و بدون قضاوت برای کار روی یک تصمیم مهم حرفه‌ای، گره‌گشایی از سردرگمی شغلی یا ترسیم نقشه راه اقدام.',
        price: 1100000,
        isFree: false,
      },
    ],
    packagesData: [
      {
        id: 'growth',
        title: 'پکیج ۴ جلسه‌ای «شروع و وضوح شغلی»',
        sessions: 4,
        duration: '۶۰ دقیقه',
        description: 'گره‌گشایی از تصمیم‌های معطل‌مانده و پایه‌ریزی مسیر جدید حرفه‌ای.',
        price: 3200000,
        discountPercent: 15,
        validityDays: 90,
        isPopular: false,
        features: [
          '۴ جلسه کوچینگ آنلاین ۶۰ دقیقه‌ای',
          'شفاف‌سازی چالش‌های مسیر شغلی و تعارضات تصمیم‌گیری',
          'شناسایی الگوهای بازدارنده و ترس‌های تغییر موقعیت',
          'طراحی برنامه اقدام متناسب با اولویت‌های زندگی',
          'پشتیبانی پیامکی میان جلسات برای پیگیری اقدامات',
          'ضمانت بازگشت کامل وجه تا پایان جلسه دوم',
        ],
      },
      {
        id: 'self-discovery',
        title: 'پکیج ۶ جلسه‌ای «مسیر تحول حرفه‌ای»',
        sessions: 6,
        duration: '۶۰ دقیقه',
        description: 'کشف عمیق رسالت فردی، بازنویسی باورهای کاری و گذار موفق شغلی.',
        price: 4500000,
        discountPercent: 20,
        validityDays: 90,
        isPopular: true,
        features: [
          '۶ جلسه تخصصی آنلاین ۶۰ دقیقه‌ای',
          'تحلیل عمیق رسالت شخصی و ارزش‌های کارراهه',
          'طراحی استراتژی خروج از فرسودگی و ارتقای جایگاه',
          'تمرین مهارت‌های قاطعیت و مذاکره در محیط کار',
          'پشتیبانی پیامکی پیوسته میان جلسات',
          'ضمانت بازگشت کامل وجه تا پایان جلسه دوم',
        ],
      },
      {
        id: 'transformation',
        title: 'پکیج ۸ جلسه‌ای «توسعه اقتدار و کارراهه»',
        sessions: 8,
        duration: '۶۰ دقیقه',
        description: 'دوره جامع ۲ تا ۳ ماهه برای تحول کامل مسیر حرفه‌ای و تثبیت دستاوردها.',
        price: 5800000,
        discountPercent: 25,
        validityDays: 90,
        isPopular: false,
        features: [
          '۸ جلسه عمیق آنلاین ۶۰ دقیقه‌ای',
          'همسوسازی کامل زندگی فردی با اهداف بلندمدت شغلی',
          'مهندسی تصمیم‌گیری‌های کلان و ریسک‌پذیری هوشمندانه',
          'پایش گام‌به‌گام استراتژی شغلی در محیط واقعی',
          'پشتیبانی پیامکی نامحدود در طول دوره',
          'ضمانت بازگشت کامل وجه تا پایان جلسه دوم',
        ],
      },
      {
        id: 'excellence',
        title: 'پکیج ۱۲ جلسه‌ای «جامع تحول فردی و سازمانی»',
        sessions: 12,
        duration: '۶۰ دقیقه',
        description: 'همراهی بلندمدت برای ساختن رهبری فردی اصیل، تعالی شغلی و تعادل همه‌جانبه.',
        price: 7500000,
        discountPercent: 30,
        validityDays: 90,
        isPopular: false,
        features: [
          '۱۲ جلسه جامع اختصاصی ۶۰ دقیقه‌ای',
          'طراحی سند جامع چشم‌انداز فردی و شغلی (Career Vision)',
          'تحکیم جایگاه حرفه‌ای و مهارت‌های رهبری اصیل',
          'ارزیابی و پایش شاخص‌های رضایت درونی و دستاوردهای عینی',
          'پشتیبانی کامل پیامکی در تمام طول دوره ۴ ماهه',
          'ضمانت بازگشت کامل وجه تا پایان جلسه دوم',
        ],
      },
    ],
    testimonials: [
      {
        id: 't1',
        quote: 'جلسات با خانم فتحی‌جو باعث شد بعد از ماه‌ها بلاتکلیفی، بالاخره مسیر شغلی متناسب با ارزش‌هایم را پیدا کنم و با اعتمادبه‌نفس تصمیم بگیرم.',
        author: 'مریم ک.',
        context: 'تغییر مسیر شغلی و استارتاپ شخصی',
      },
      {
        id: 't2',
        quote: 'فضای امن و بدون قضاوتی که در جلسات تجربه کردم، به من شجاعت داد تا از یک موقعیت شغلی فرسایش‌دهنده خارج شوم و مسیر دلخواهم را بسازم.',
        author: 'علیرضا س.',
        context: 'مدیر محصول و مراجع تحول شغلی',
      },
    ],
    credentials: [
      { id: 'c1', title: 'مدرک بین‌المللی کوچینگ حرفه‌ای (PCC)', organization: 'ICF', year: '۲۰۲۲' },
      { id: 'c2', title: 'کارشناسی ارشد روان‌شناسی', organization: 'دانشگاه تهران' },
      { id: 'c3', title: 'تسهیل‌گر تحول فردی و توسعه کارراهه با ۱۰ سال سابقه' },
    ],
    faqs: [
      { question: 'جلسه صفر رایگان چیست؟', answer: 'یک گفتگوی ۳۰ دقیقه‌ای برای آشنایی با روش کار من و بررسی اینکه آیا کوچینگ برای چالش شما مناسب است یا خیر. این جلسه هیچ تعهد مالی برای شما ندارد.' },
      { question: 'آیا این جلسات برای افرادی که می‌خواهند شغلشان را تغییر دهند مفید است؟', answer: 'بله، یکی از تخصصی‌ترین بخش‌های همراهی من، کمک به شفاف‌سازی ابهامات و تصمیم‌گیری مطمئن در دوران گذار شغلی است.' },
      { question: 'جلسات به چه صورتی برگزار می‌شوند؟', answer: 'تمامی جلسات به صورت آنلاین و تصویری برگزار می‌شوند و لینک جلسه پس از رزرو خدمت شما ارسال خواهد شد.' },
    ],
  },

  // ==========================================
  // AREZOO GHAFFARI (آرزو غفاری)
  // ==========================================
  {
    id: 'coach-profile-Arezoo_Ghaffari',
    slug: 'Arezoo_Ghaffari',
    name: 'آرزو غفاری',
    title: 'روان‌شناس بالینی و کوچ رشد فردی | متخصص ACT',
    eyebrow: 'کوچ حرفه‌ای بلومیا',
    shortBio: 'همراهت می‌شوم تا از درگیری ذهنی و نشخوار فکری بیرون بیایی، با شفقت به ارزش‌هایت برگردی و زندگی آگاهانه‌تری بسازی.',
    description: 'همراهت می‌شوم تا از درگیری ذهنی و نشخوار فکری بیرون بیایی، با شفقت به ارزش‌هایت برگردی و زندگی آگاهانه‌تری بسازی.',
    longBio: `به عنوان روان‌شناس بالینی و کوچ رشد فردی با تخصص در رویکرد درمان مبتنی بر پذیرش و تعهد (ACT)، بر این باورم که تلاش مداوم برای جنگیدن با افکار یا فرار از احساسات ناخوشایند، ما را از زندگی واقعی دور می‌کند.\n\nرسالت من در بلومیا کلاب، همراهی با شماست تا یاد بگیرید چگونه به جای گیر افتادن در تله نشخوار ذهنی و اضطراب، فاصله‌ای امن و سالم با افکارتان بسازید، ارزش‌های اصیل زندگی‌تان را شفاف کنید و با شجاعت به سوی آنچه واقعاً برایتان مهم است حرکت کنید.\n\nدر جلسات کوچینگ، فضایی علمی، محرمانه و عمیقاً همدلانه مهیاست؛ جایی برای یادگیری مهارت انعطاف‌پذیری روان‌شناختی، خودشفقت‌ورزی در مواجهه با شکست‌ها و اقدام متعهدانه در تاروپود زندگی روزمره.`,
    longDescription: `به عنوان روان‌شناس بالینی و کوچ رشد فردی با تخصص در رویکرد درمان مبتنی بر پذیرش و تعهد (ACT)، بر این باورم که تلاش مداوم برای جنگیدن با افکار یا فرار از احساسات ناخوشایند، ما را از زندگی واقعی دور می‌کند.\n\nرسالت من در بلومیا کلاب، همراهی با شماست تا یاد بگیرید چگونه به جای گیر افتادن در تله نشخوار ذهنی و اضطراب، فاصله‌ای امن و سالم با افکارتان بسازید، ارزش‌های اصیل زندگی‌تان را شفاف کنید و با شجاعت به سوی آنچه واقعاً برایتان مهم است حرکت کنید.\n\nدر جلسات کوچینگ، فضایی علمی، محرمانه و عمیقاً همدلانه مهیاست؛ جایی برای یادگیری مهارت انعطاف‌پذیری روان‌شناختی، خودشفقت‌ورزی در مواجهه با شکست‌ها و اقدام متعهدانه در تاروپود زندگی روزمره.`,
    imageUrl: 'https://cdn.sanity.io/images/7yjhdw88/production/e4cc60370befd73b0e9c920276df8215bf75c9d3-640x640.png',
    cutoutImageUrl: '/images/solea/arezoo_hero.png',
    coverImage: 'https://cdn.sanity.io/images/7yjhdw88/production/e4cc60370befd73b0e9c920276df8215bf75c9d3-640x640.png',
    aboutImage: 'https://cdn.sanity.io/images/7yjhdw88/production/e4cc60370befd73b0e9c920276df8215bf75c9d3-640x640.png',
    sessionMode: 'online',
    languages: ['فارسی'],
    location: 'تهران',
    specialties: [
      'رهایی از نشخوار فکری و تله‌های ذهن',
      'مدیریت علمی اضطراب و استرس',
      'روابط سالم و مهارت‌های ارتباطی',
      'رویکرد پذیرش و تعهد (ACT)',
      'انعطاف‌پذیری روان‌شناختی و اقدام متعهدانه',
    ],
    rating: 5.0,
    totalReviews: 42,
    totalSessions: 180,
    coachingHours: 180,
    satisfiedClients: 45,
    experienceYears: 6,
    audience: [
      { title: 'درگیر نشخوار فکری، اضطراب مداوم یا تحلیل‌های فرساینده ذهن هستید.' },
      { title: 'احساس می‌کنید میان جنگیدن با ترس‌هایتان، از زندگی واقعی و اهداف مهم بازمانده‌اید.' },
      { title: 'می‌خواهید بر اساس قطب‌نمای ارزش‌های شخصی خود، تصمیم‌های جسورانه بگیرید.' },
      { title: 'به دنبال مهارت‌های علمی و پایدار برای تاب‌آوری و شفقت به خود هستید.' },
    ],
    method: [
      { id: '01', title: 'آگاهی از ذهن و گسلش شناختی', description: 'شناسایی الگوهای فکری گیرانداز و یادگیری هنر دیدن افکار به عنوان کلمات گذرای ذهن، نه حقایق مطلق.' },
      { id: '02', title: 'پذیرش و گشودگی درونی', description: 'پایان دادن به جنگ فرساینده با اضطراب و ساختن فضایی امن در روان برای تجربه احساسات بدون ترس.' },
      { id: '03', title: 'شفاف‌سازی قطب‌نمای ارزش‌ها', description: 'کشف عمیق اینکه چه چیزی در روابط، کار و رشد شخصی به زندگی شما معنا و اصالت می‌بخشد.' },
      { id: '04', title: 'اقدام متعهدانه و پایدار', description: 'طراحی قدم‌های کوچک و شجاعانه روزمره که با ارزش‌هایتان همسو هستند و پیگیری متعهدانه آنها.' },
    ],
    services: [
      {
        id: 'zero',
        title: 'جلسه صفر (معارفه رایگان ۳۰ دقیقه‌ای)',
        duration: '۳۰ دقیقه',
        description: 'یک گفتگوی آنلاین ۳۰ دقیقه‌ای برای آشنایی صمیمانه، شنیدن دغدغه‌های ذهنی شما و بررسی اینکه آیا رویکرد ACT و کوچینگ شناختی برای چالش شما مناسب است یا خیر.',
        price: 0,
        isFree: true,
      },
      {
        id: 'coaching',
        title: 'تک‌جلسه کوچینگ ACT و مدیریت اضطراب',
        duration: '۶۰ دقیقه',
        description: 'فضایی متمرکز و تخصصی برای باز کردن یک گره ذهنی، تصمیم‌گیری در شرایط استرس‌زا یا یادگیری تکنیک مشخص برای خروج از دام نشخوار فکری.',
        price: 900000,
        isFree: false,
      },
    ],
    packagesData: [
      {
        id: 'growth',
        title: 'پکیج ۴ جلسه‌ای «وضوح و آرامش»',
        sessions: 4,
        duration: '۶۰ دقیقه',
        description: 'فاصله‌گیری از افکار آزاردهنده و اولین قدم‌های مدیریت اضطراب بر مبنای ACT.',
        price: 2800000,
        discountPercent: 15,
        validityDays: 90,
        isPopular: false,
        features: [
          '۴ جلسه کوچینگ آنلاین ۶۰ دقیقه‌ای',
          'نقشه‌برداری از تله‌های فکری و محرک‌های اصلی اضطراب',
          'آموزش تکنیک‌های گسلش شناختی برای توقف نشخوار ذهنی',
          'تمرین‌های ذهن‌آگاهی و بازگشت به لحظه اکنون',
          'پشتیبانی پیامکی میان جلسات برای تثبیت تمرین‌ها',
          'ضمانت بازگشت کامل وجه تا پایان جلسه دوم',
        ],
      },
      {
        id: 'self-discovery',
        title: 'پکیج ۶ جلسه‌ای «انعطاف‌پذیری و پذیرش»',
        sessions: 6,
        duration: '۶۰ دقیقه',
        description: 'ساختن تاب‌آوری عمیق روانی، پذیرش هیجانات دشوار و کشف ارزش‌های اصیل.',
        price: 3900000,
        discountPercent: 20,
        validityDays: 90,
        isPopular: true,
        features: [
          '۶ جلسه تخصصی آنلاین ۶۰ دقیقه‌ای',
          'نهادینه‌سازی مهارت پذیرش بدون احساس انفعال',
          'طراحی قطب‌نمای ارزش‌های فردی در روابط و شغل',
          'تمرین‌های عملی شفقت به خود در مواجهه با اشتباهات',
          'پشتیبانی پیامکی پیوسته میان جلسات',
          'ضمانت بازگشت کامل وجه تا پایان جلسه دوم',
        ],
      },
      {
        id: 'transformation',
        title: 'پکیج ۸ جلسه‌ای «تحول ارزش‌محور»',
        sessions: 8,
        duration: '۶۰ دقیقه',
        description: 'مسیر جامع ۲ تا ۳ ماهه برای اقدام متعهدانه، غلبه بر ترس‌ها و بازسازی روابط.',
        price: 5100000,
        discountPercent: 25,
        validityDays: 90,
        isPopular: false,
        features: [
          '۸ جلسه عمیق آنلاین ۶۰ دقیقه‌ای',
          'مهندسی رفتارهای شجاعانه و اقدام در حضور ترس‌ها',
          'بازنویسی الگوهای ارتباطی فرساینده در روابط فردی',
          'طراحی سیستم‌های بازخورد برای حفظ پیشرفت پایدار',
          'پشتیبانی پیامکی نامحدود در طول دوره',
          'ضمانت بازگشت کامل وجه تا پایان جلسه دوم',
        ],
      },
      {
        id: 'excellence',
        title: 'پکیج ۱۲ جلسه‌ای «اقدام متعهدانه و زیست اصیل»',
        sessions: 12,
        duration: '۶۰ دقیقه',
        description: 'کوچینگ جامع تحول سبک زندگی، آرامش پایدار و زیستن متعهدانه با رویکرد ACT.',
        price: 6800000,
        discountPercent: 30,
        validityDays: 90,
        isPopular: false,
        features: [
          '۱۲ جلسه جامع اختصاصی ۶۰ دقیقه‌ای',
          'طراحی سند راهبردی زندگی متعهدانه (Valued Life Plan)',
          'تحکیم کامل انعطاف‌پذیری روان‌شناختی در تمامی حوزه‌ها',
          'بررسی و پایش شاخص‌های رضایت از زندگی و صلح درونی',
          'پشتیبانی کامل پیامکی میان جلسات در طول دوره ۴ ماهه',
          'ضمانت بازگشت کامل وجه تا پایان جلسه دوم',
        ],
      },
    ],
    testimonials: [
      {
        id: 't1',
        quote: 'سال‌ها با نشخوار فکری و استرس تصمیم‌گیری درگیر بودم. جلسات با خانم غفاری به من یاد داد چگونه بدون جنگیدن با ذهنم، قدم‌های بزرگ بردارم.',
        author: 'مهسا ن.',
        context: 'مراجع پکیج انعطاف‌پذیری و پذیرش',
      },
      {
        id: 't2',
        quote: 'نگرش ACT واقعاً نگاهم به اضطراب را عوض کرد. امنیت و دانش عمیق خانم غفاری کمک کرد برای اولین بار در زندگی با آرامش تصمیم بگیرم.',
        author: 'پویا م.',
        context: 'مراجع دوره رشد فردی',
      },
    ],
    credentials: [
      { id: 'c1', title: 'کارشناسی ارشد روان‌شناسی بالینی', organization: 'دانشگاه شهید بهشتی', year: '۲۰۱۸' },
      { id: 'c2', title: 'مدرک تخصصی درمان مبتنی بر پذیرش و تعهد (ACT)', organization: 'انجمن علوم رفتاری بافتی (ACBS)' },
      { id: 'c3', title: 'کوچ معتبر فدراسیون بین‌المللی کوچینگ (ICF)' },
    ],
    faqs: [
      { question: 'تفاوت رویکرد ACT در کوچینگ با روان‌درمانی سنتی چیست؟', answer: 'در ACT به جای تلاش برای حذف یا تغییر افکار ناخوشایند، یاد می‌گیرید چگونه اثر مخرب آنها را خنثی کنید و در حضور این افکار، زندگی متعهدانه و ارزش‌محور بسازید.' },
      { question: 'آیا برای شرکت در جلسات حتماً باید اضطراب شدید داشته باشم؟', answer: 'خیر. این جلسات برای هر فردی که می‌خواهد تصمیم‌های بهتری بگیرد، از گیر افتادن در تحلیل‌های فرساینده ذهن رها شود و با آرامش زندگی کند بسیار موثر است.' },
      { question: 'جلسات چگونه برگزار می‌شوند؟', answer: 'تمامی جلسات به صورت آنلاین و تصویری در بستر اختصاصی و امن برگزار شده و هماهنگی زمان مستقیماً پس از ثبت درخواست انجام می‌شود.' },
    ],
  },

  // ==========================================
  // FATEMEH DERAKHSH (دکتر فاطمه درخوش)
  // ==========================================
  {
    id: 'coach-profile-fatemeh-derakhsh',
    slug: 'fatemeh-derakhsh',
    name: 'دکتر فاطمه درخوش',
    title: 'کوچ رشد فردی و مسیر شغلی | دکترای داروسازی',
    eyebrow: 'کوچ حرفه‌ای بلومیا',
    shortBio: 'دکترای داروسازی، کوچ تایید شده ICF با تمرکز بر خودشناسی شغلی و تصمیم‌گیری آگاهانه برای خروج از سردرگمی.',
    description: 'دکترای داروسازی، کوچ تایید شده ICF با تمرکز بر خودشناسی شغلی و تصمیم‌گیری آگاهانه برای خروج از سردرگمی.',
    longBio: `به عنوان دانش‌آموخته دکترای داروسازی و کوچ معتبر فدراسیون بین‌المللی کوچینگ (ICF)، تلاقی تفکر تحلیلی علمی و هنر تسهیل‌گری انسانی را در همراهی با مراجعان به کار می‌گیرم.\n\nبسیاری از متخصصان، مدیران و فارغ‌التحصیلان پس از سال‌ها تلاش با احساس فرسودگی، سردرگمی در انتخاب کارراهه یا ناهماهنگی شغل با ارزش‌های درونی روبه‌رو می‌شوند. رسالت من کمک به شماست تا با دیدی شفاف، استعدادهای منحصربه‌فردتان را کشف کنید، از تله تصمیم‌گیری‌های شتاب‌زده عبور کنید و جایگاه شغلی اصیل‌تان را بسازید.\n\nدر جلسات کوچینگ، رویکردی ساختاریافته، علمی و عمیقاً شخصی‌سازی‌شده پیش روی شماست تا چشم‌انداز حرفه‌ای‌تان را با اطمینان و صلابت به واقعیت تبدیل کنید.`,
    longDescription: `به عنوان دانش‌آموخته دکترای داروسازی و کوچ معتبر فدراسیون بین‌المللی کوچینگ (ICF)، تلاقی تفکر تحلیلی علمی و هنر تسهیل‌گری انسانی را در همراهی با مراجعان به کار می‌گیرم.\n\nبسیاری از متخصصان، مدیران و فارغ‌التحصیلان پس از سال‌ها تلاش با احساس فرسودگی، سردرگمی در انتخاب کارراهه یا ناهماهنگی شغل با ارزش‌های درونی روبه‌رو می‌شوند. رسالت من کمک به شماست تا با دیدی شفاف، استعدادهای منحصربه‌فردتان را کشف کنید، از تله تصمیم‌گیری‌های شتاب‌زده عبور کنید و جایگاه شغلی اصیل‌تان را بسازید.\n\nدر جلسات کوچینگ، رویکردی ساختاریافته، علمی و عمیقاً شخصی‌سازی‌شده پیش روی شماست تا چشم‌انداز حرفه‌ای‌تان را با اطمینان و صلابت به واقعیت تبدیل کنید.`,
    imageUrl: 'https://cdn.sanity.io/images/7yjhdw88/production/41f62ec8f93c6d2603daa60dbfb483937df3af6e-1024x1024.png',
    cutoutImageUrl: '/images/solea/fatemeh_derakhsh_hero_v4.png',
    coverImage: 'https://cdn.sanity.io/images/7yjhdw88/production/41f62ec8f93c6d2603daa60dbfb483937df3af6e-1024x1024.png',
    aboutImage: 'https://cdn.sanity.io/images/7yjhdw88/production/41f62ec8f93c6d2603daa60dbfb483937df3af6e-1024x1024.png',
    sessionMode: 'online',
    languages: ['فارسی', 'انگلیسی'],
    location: 'تهران',
    specialties: [
      'خودشناسی شغلی و طراحی کارراهه حرفه‌ای',
      'تصمیم‌گیری استراتژیک در دوراهی‌های شغلی',
      'عبور از فرسودگی شغلی و تحصیلی متخصصان',
      'مهارت‌های رهبری و ارتباطات سازمانی',
      'کوچینگ مبتنی بر استانداردهای بین‌المللی ICF',
    ],
    rating: 5.0,
    totalReviews: 38,
    totalSessions: 160,
    coachingHours: 160,
    satisfiedClients: 40,
    experienceYears: 5,
    audience: [
      { title: 'در دوراهی ارتقای شغلی، مهاجرت کاری یا تغییر زمینه فعالیت قرار دارید.' },
      { title: 'متخصص یا فارغ‌التحصیلی هستید که در جستجوی انگیزه و معنا در کار خود است.' },
      { title: 'احساس می‌کنید انرژی شغلی‌تان فرسایش یافته و نیازمند بازآفرینی مسیر هستید.' },
      { title: 'می‌خواهید با برنامه‌ریزی واقع‌بینانه به اهداف بلندمدت حرفه‌ای‌تان دست یابید.' },
    ],
    method: [
      { id: '01', title: 'ممیزی کارراهه و ارزیابی موقعیت', description: 'ترسیم وضعیت فعلی، تحلیل ریشه‌ای دلایل نارضایتی و شفاف‌سازی توانمندی‌های رقابتی.' },
      { id: '02', title: 'کشف ارزش‌های اصیل حرفه‌ای', description: 'شناسایی محرک‌های درونی رضایت شغلی فراتر از منافع کوتاه‌مدت یا فشارهای اطرافیان.' },
      { id: '03', title: 'مهندسی نقشه راه و سناریوسازی', description: 'طراحی سناریوهای اقدام شغلی و سنجش ریسک‌ها با رویکرد تحلیلی و مقتدرانه.' },
      { id: '04', title: 'اجرا، مذاکره و پایش دستاوردها', description: 'تثبیت اقدامات در محیط واقعی کار، تقویت مهارت‌های مذاکره و ساختن شبکه ارتباطی مؤثر.' },
    ],
    services: [
      {
        id: 'zero',
        title: 'جلسه صفر (معارفه رایگان ۳۰ دقیقه‌ای)',
        duration: '۳۰ دقیقه',
        description: 'یک گفتگوی آنلاین ۳۰ دقیقه‌ای برای بررسی وضعیت حرفه‌ای شما، ارزیابی همسویی اهداف و پاسخ به سوالات شما درباره متدولوژی کوچینگ مسیر شغلی.',
        price: 0,
        isFree: true,
      },
      {
        id: 'coaching',
        title: 'تک‌جلسه استراتژی مسیر شغلی',
        duration: '۶۰ دقیقه',
        description: 'یک جلسه عمیق و متمرکز برای تصمیم‌گیری در یک موقعیت حساس کاری، تحلیل پیشنهاد شغلی جدید یا رفع تعارض در محیط کار.',
        price: 950000,
        isFree: false,
      },
    ],
    packagesData: [
      {
        id: 'growth',
        title: 'پکیج ۴ جلسه‌ای «نقشه راه شغلی»',
        sessions: 4,
        duration: '۶۰ دقیقه',
        description: 'وضوح در اهداف حرفه‌ای، شناسایی نقاط قوت و گام‌های اولیه بازطراحی کارراهه.',
        price: 2900000,
        discountPercent: 15,
        validityDays: 90,
        isPopular: false,
        features: [
          '۴ جلسه کوچینگ آنلاین ۶۰ دقیقه‌ای',
          'ممیزی کامل مهارت‌ها، ارزش‌ها و اهداف کاری',
          'تدوین شفاف نقشه راه پیشرفت در موقعیت فعلی یا جدید',
          'رفع موانع ذهنی و خودتردیدی در مواجهه با چالش‌های شغلی',
          'پشتیبانی پیامکی میان جلسات',
          'ضمانت بازگشت کامل وجه تا پایان جلسه دوم',
        ],
      },
      {
        id: 'self-discovery',
        title: 'پکیج ۶ جلسه‌ای «توسعه مسیر حرفه‌ای»',
        sessions: 6,
        duration: '۶۰ دقیقه',
        description: 'گذار هوشمندانه شغلی، تقویت برند شخصی و آمادگی برای ارتقای جایگاه.',
        price: 4200000,
        discountPercent: 20,
        validityDays: 90,
        isPopular: true,
        features: [
          '۶ جلسه تخصصی آنلاین ۶۰ دقیقه‌ای',
          'طراحی استراتژی توسعه جایگاه و شبکه ارتباطی',
          'آماده‌سازی ذهنی برای مصاحبه‌ها و مذاکرات حساس درآمدی',
          'ایجاد تعادل سالم میان فشارهای کاری و زندگی فردی',
          'پشتیبانی پیامکی پیوسته میان جلسات',
          'ضمانت بازگشت کامل وجه تا پایان جلسه دوم',
        ],
      },
      {
        id: 'transformation',
        title: 'پکیج ۸ جلسه‌ای «گذار و ارتقای سازمانی»',
        sessions: 8,
        duration: '۶۰ دقیقه',
        description: 'کوچینگ جامع ۲ تا ۳ ماهه برای هدایت پروژه‌های بزرگ شغلی و رهبری مؤثر.',
        price: 5400000,
        discountPercent: 25,
        validityDays: 90,
        isPopular: false,
        features: [
          '۸ جلسه عمیق آنلاین ۶۰ دقیقه‌ای',
          'طراحی سیستم تصمیم‌گیری استراتژیک در موقعیت‌های مبهم',
          'ارتقای هوش هیجانی و مدیریت اصطکاک با همکاران و مدیران',
          'پایش گام‌به‌گام پیاده‌سازی اهداف کلیدی کارراهه',
          'پشتیبانی پیامکی نامحدود در طول دوره',
          'ضمانت بازگشت کامل وجه تا پایان جلسه دوم',
        ],
      },
      {
        id: 'excellence',
        title: 'پکیج ۱۲ جلسه‌ای «راهبری حرفه‌ای جامع»',
        sessions: 12,
        duration: '۶۰ دقیقه',
        description: 'همراهی ۴ ماهه سطح پیشرفته برای دستیابی به تعالی پایدار حرفه‌ای و شخصی.',
        price: 7000000,
        discountPercent: 30,
        validityDays: 90,
        isPopular: false,
        features: [
          '۱۲ جلسه جامع اختصاصی ۶۰ دقیقه‌ای',
          'طراحی اکوسیستم کامل پیشرفت حرفه‌ای (Career Ecosystem)',
          'نهادینه‌سازی تاب‌آوری در مواجهه با بحران‌های کاری',
          'ارزیابی و بهینه‌سازی مداوم شاخص‌های رضایت شغلی',
          'پشتیبانی کامل پیامکی در تمام طول دوره ۴ ماهه',
          'ضمانت بازگشت کامل وجه تا پایان جلسه دوم',
        ],
      },
    ],
    testimonials: [
      {
        id: 't1',
        quote: 'دیدگاه تحلیلی خانم دکتر درخوش در کنار مهارت کوچینگ ایشان، کمکم کرد در پیچیده‌ترین دوراهی شغلی زندگی‌ام بهترین تصمیم را با خیال راحت بگیرم.',
        author: 'سامان ع.',
        context: 'مدیر توسعه کسب‌وکار',
      },
      {
        id: 't2',
        quote: 'بعد از سال‌ها کار در صنعت احساس بی‌انگیزگی می‌کردم. این دوره به من کمک کرد انگیزه واقعی‌ام را دوباره پیدا کنم و جایگاهم را ارتقا دهم.',
        author: 'فرشته ر.',
        context: 'متخصص صنایع دارویی',
      },
    ],
    credentials: [
      { id: 'c1', title: 'دکترای داروسازی (Pharm.D)', organization: 'دانشگاه علوم پزشکی', year: '۲۰۱۷' },
      { id: 'c2', title: 'کوچ حرفه‌ای بین‌المللی', organization: 'فدراسیون بین‌المللی کوچینگ (ICF)' },
      { id: 'c3', title: 'متخصص خودشناسی شغلی و تصمیم‌گیری استراتژیک کارراهه' },
    ],
    faqs: [
      { question: 'آیا این جلسات صرفاً برای افراد حوزه داروسازی و سلامت است؟', answer: 'خیر. متدولوژی کوچینگ مسیر شغلی یک چارچوب استاندارد جهانی است که برای تمامی متخصصان، مدیران و کارآفرینان در صنایع مختلف کاربرد دارد.' },
      { question: 'جلسه معارفه رایگان چه تفاوتی با جلسه اصلی دارد؟', answer: 'جلسه صفر ۳۰ دقیقه‌ای فرصتی است برای آشنایی دوجانبه، شنیدن چالش شما و بررسی اینکه آیا سبک همراهی من برای اهداف شما مناسب است یا خیر.' },
      { question: 'پشتیبانی میان جلسات به چه صورت است؟', answer: 'از طریق پیام‌رسان اختصاصی می‌توانید تمرین‌ها، پرسش‌ها یا بازخوردهای خود را در طول دوره با من در میان بگذارید.' },
    ],
  },

  // ==========================================
  // SHABNAM NEMATIMALEK (شبنم نعمتی‌ملک)
  // ==========================================
  {
    id: 'coach-profile-shabnam_nematimalek',
    slug: 'shabnam_nematimalek',
    name: 'شبنم نعمتی‌ملک',
    title: 'کوچ رشد فردی و خودآگاهی',
    eyebrow: 'کوچ حرفه‌ای بلومیا',
    shortBio: 'همراه افرادی که می‌خواهند با وضوح ذهنی، اعتمادبه‌نفس و برنامه‌ریزی هدفمند، نسخه‌ای اصیل‌تر و توانمندتر از زندگی خود بسازند.',
    description: 'همراه افرادی که می‌خواهند با وضوح ذهنی، اعتمادبه‌نفس و برنامه‌ریزی هدفمند، نسخه‌ای اصیل‌تر و توانمندتر از زندگی خود بسازند.',
    longBio: `باور دارم هر فردی پتانسیل‌های شگفت‌انگیزی دارد که در زیر غبار تردیدها، خودانتقادی و عادات فرسایش‌دهنده روزمره پنهان شده است.\n\nرسالت من به عنوان کوچ رشد فردی، ایجاد فضایی صمیمانه، شفاف و سرشار از امنیت است تا شما بتوانید به شناخت دقیقی از ارزش‌ها، نقاط قوت و خواسته‌های قلبی‌تان برسید. ما در کنار هم عادات موثر را جایگزین تعلل می‌کنیم و اعتمادبه‌نفس اصیل را در تاروپود تصمیم‌گیری‌هایتان می‌نشانیم.\n\nتغییر واقعی با قدم‌های کوچک اما پیوسته اتفاق می‌افتد؛ جایی که شما قهرمان داستان زندگی خود می‌شوید و با آرامش و اقتدار مسیرتان را می‌سازید.`,
    longDescription: `باور دارم هر فردی پتانسیل‌های شگفت‌انگیزی دارد که در زیر غبار تردیدها، خودانتقادی و عادات فرسایش‌دهنده روزمره پنهان شده است.\n\nرسالت من به عنوان کوچ رشد فردی، ایجاد فضایی صمیمانه، شفاف و سرشار از امنیت است تا شما بتوانید به شناخت دقیقی از ارزش‌ها، نقاط قوت و خواسته‌های قلبی‌تان برسید. ما در کنار هم عادات موثر را جایگزین تعلل می‌کنیم و اعتمادبه‌نفس اصیل را در تاروپود تصمیم‌گیری‌هایتان می‌نشانیم.\n\nتغییر واقعی با قدم‌های کوچک اما پیوسته اتفاق می‌افتد؛ جایی که شما قهرمان داستان زندگی خود می‌شوید و با آرامش و اقتدار مسیرتان را می‌سازید.`,
    imageUrl: 'https://cdn.sanity.io/images/7yjhdw88/production/87be0ca9091fb5a28213a3a19f4888d45a180361-960x1280.png',
    cutoutImageUrl: 'https://cdn.sanity.io/images/7yjhdw88/production/87be0ca9091fb5a28213a3a19f4888d45a180361-960x1280.png',
    coverImage: 'https://cdn.sanity.io/images/7yjhdw88/production/87be0ca9091fb5a28213a3a19f4888d45a180361-960x1280.png',
    aboutImage: 'https://cdn.sanity.io/images/7yjhdw88/production/87be0ca9091fb5a28213a3a19f4888d45a180361-960x1280.png',
    sessionMode: 'online',
    languages: ['فارسی'],
    location: 'تهران',
    specialties: [
      'خودشناسی و کشف پتانسیل‌های پنهان',
      'وضوح ذهنی و رهایی از سردرگمی',
      'تقویت اعتمادبه‌نفس و حس شایستگی',
      'ساختن عادات مثبت و مهار اهمال‌کاری',
      'کوچینگ تحول فردی بر مبنای ICF',
    ],
    rating: 5.0,
    totalReviews: 32,
    totalSessions: 140,
    coachingHours: 140,
    satisfiedClients: 35,
    experienceYears: 4,
    audience: [
      { title: 'می‌خواهید احساس شایستگی و اعتمادبه‌نفس واقعی را در خود زنده کنید.' },
      { title: 'درگیر تعلل و اهمال‌کاری هستید و می‌خواهید عادات پایداری بسازید.' },
      { title: 'به دنبال وضوح در اهداف شخصی و اولویت‌بندی کارهای روزمره‌تان هستید.' },
      { title: 'می‌خواهید بدون مقایسه با دیگران، نسخه اصیل و آرام خودتان باشید.' },
    ],
    method: [
      { id: '01', title: 'کشف هویت و بازشناسی ارزش‌ها', description: 'دیدن تصویر واقعی خود بدون قضاوت و شفاف‌سازی خواسته‌های اصیل قلبی.' },
      { id: '02', title: 'مهار موانع درونی و بازسازی باورها', description: 'شناسایی گفتگوی ذهنی بازدارنده و جایگزین کردن الگوهای فکری توانمندساز.' },
      { id: '03', title: 'طراحی سیستم عادات و سبک زندگی', description: 'خرد کردن اهداف بزرگ به روتین‌های دلپذیر و قابل اجرا در زندگی روزمره.' },
      { id: '04', title: 'تثبیت خودباوری و پایش پیشرفت', description: 'جشن گرفتن موفقیت‌های کوچک، بازنگری در مسیر و پایدارسازی دستاوردها.' },
    ],
    services: [
      {
        id: 'zero',
        title: 'جلسه صفر (معارفه رایگان ۳۰ دقیقه‌ای)',
        duration: '۳۰ دقیقه',
        description: 'یک گفتگوی آنلاین ۳۰ دقیقه‌ای برای آشنایی صمیمانه، شنیدن دغدغه‌های شما و بررسی اینکه آیا کوچینگ خودآگاهی برای شرایط کنونی شما مناسب است یا خیر.',
        price: 0,
        isFree: true,
      },
      {
        id: 'coaching',
        title: 'تک‌جلسه کوچینگ رشد فردی و وضوح ذهنی',
        duration: '۶۰ دقیقه',
        description: 'فضایی آرام و بدون قضاوت برای تمرکز روی یک چالش فردی، رفع بلاتکلیفی و خروج از سردرگمی روزمره.',
        price: 850000,
        isFree: false,
      },
    ],
    packagesData: [
      {
        id: 'growth',
        title: 'پکیج ۴ جلسه‌ای «شروع و تغییر عادات»',
        sessions: 4,
        duration: '۶۰ دقیقه',
        description: 'شفافیت ذهنی، کشف پتانسیل‌ها و اولین گام‌های تغییر عادات.',
        price: 2500000,
        discountPercent: 17,
        validityDays: 90,
        isPopular: false,
        features: [
          '۴ جلسه کوچینگ آنلاین ۶۰ دقیقه‌ای',
          'شناسایی موانع درونی و الگوهای تکراری تعلل',
          'طراحی روتین‌های روزمره واقع‌بینانه و شدنی',
          'تمرین مهارت‌های خودآگاهی در موقعیت‌های چالش‌برانگیز',
          'پشتیبانی پیامکی میان جلسات',
          'ضمانت بازگشت کامل وجه تا پایان جلسه دوم',
        ],
      },
      {
        id: 'self-discovery',
        title: 'پکیج ۶ جلسه‌ای «تثبیت خودباوری»',
        sessions: 6,
        duration: '۶۰ دقیقه',
        description: 'تقویت احساس شایستگی، کشف صداقت با خود و غلبه بر ترس از قضاوت.',
        price: 3600000,
        discountPercent: 20,
        validityDays: 90,
        isPopular: true,
        features: [
          '۶ جلسه تخصصی آنلاین ۶۰ دقیقه‌ای',
          'بازسازی عمیق عزت‌نفس و اعتمادبه‌نفس اصیل',
          'نهادینه‌سازی عادات مؤثر در کار و زندگی شخصی',
          'تمرین قاطعیت و گفتگوی صادقانه با اطرافیان',
          'پشتیبانی پیامکی پیوسته میان جلسات',
          'ضمانت بازگشت کامل وجه تا پایان جلسه دوم',
        ],
      },
      {
        id: 'transformation',
        title: 'پکیج ۸ جلسه‌ای «هدفمندی و انضباط فردی»',
        sessions: 8,
        duration: '۶۰ دقیقه',
        description: 'مسیر ۲ تا ۳ ماهه برای تحول پایدار سبک زندگی و دستیابی به اهداف.',
        price: 4700000,
        discountPercent: 22,
        validityDays: 90,
        isPopular: false,
        features: [
          '۸ جلسه عمیق آنلاین ۶۰ دقیقه‌ای',
          'طراحی سیستم پایدار هدف‌گذاری شخصی',
          'مدیریت انرژی و تمرکز در برابر عوامل حواس‌پرتی',
          'پایش مستمر اقدامات و رفع موانع اجرایی',
          'پشتیبانی پیامکی نامحدود در طول دوره',
          'ضمانت بازگشت کامل وجه تا پایان جلسه دوم',
        ],
      },
      {
        id: 'excellence',
        title: 'پکیج ۱۲ جلسه‌ای «تحول کامل سبک زندگی»',
        sessions: 12,
        duration: '۶۰ دقیقه',
        description: 'همراهی ۴ ماهه جامع برای رسیدن به بالاترین سطح وضوح، تعادل و خودشکوفایی.',
        price: 6000000,
        discountPercent: 33,
        validityDays: 90,
        isPopular: false,
        features: [
          '۱۲ جلسه جامع اختصاصی ۶۰ دقیقه‌ای',
          'طراحی سند راهبردی رشد فردی (Life Blueprint)',
          'تثبیت کامل مهارت‌های خودراهبری و استقلال ذهنی',
          'ارزیابی و پایش همه‌جانبه شاخص‌های رضایت از زندگی',
          'پشتیبانی کامل پیامکی در تمام طول دوره ۴ ماهه',
          'ضمانت بازگشت کامل وجه تا پایان جلسه دوم',
        ],
      },
    ],
    testimonials: [
      {
        id: 't1',
        quote: 'همراهی با خانم نعمتی‌ملک به من یاد داد چگونه بدون سرزنش خودم، عادات کوچکی بسازم که زندگی‌ام را کاملاً متحول کرد.',
        author: 'الهه ش.',
        context: 'مراجع دوره رشد فردی',
      },
      {
        id: 't2',
        quote: 'بزرگترین دستاورد من در این جلسات، پیدا کردن شجاعت برای شروع پروژه‌ای بود که سال‌ها به خاطر ترس از شکست به تعویق می‌انداختم.',
        author: 'کامران د.',
        context: 'مراجع پکیج هدفمندی',
      },
    ],
    credentials: [
      { id: 'c1', title: 'کوچ حرفه‌ای مورد تایید فدراسیون بین‌المللی کوچینگ (ICF)' },
      { id: 'c2', title: 'کارشناسی ارشد مدیریت و علوم رفتاری' },
      { id: 'c3', title: 'متخصص متدولوژی عادات اتمی و خودآگاهی فردی' },
    ],
    faqs: [
      { question: 'آیا برای شروع باید هدف مشخصی داشته باشم؟', answer: 'خیر. در جلسات اولیه با هم شفاف می‌کنیم که اولویت اصلی شما در حال حاضر چیست و از کجا باید شروع کنید.' },
      { question: 'جلسات به صورت فردی است یا گروهی؟', answer: 'تمامی جلسات این پکیج‌ها به صورت فردی، کاملاً اختصاصی و آنلاین برگزار می‌شود.' },
      { question: 'اگر در طول دوره نیاز به راهنمایی داشته باشم چه می‌شود؟', answer: 'میان جلسات از طریق پیامک پشتیبانی کامل خواهید داشت تا هیچ تمرین یا سوالی بی‌پاسخ نماند.' },
    ],
  },

  // ==========================================
  // MARYAM JOHARI (مریم جوهری)
  // ==========================================
  {
    id: 'coach-profile-maryam_johari',
    slug: 'maryam_johari',
    name: 'مریم جوهری',
    title: 'کوچ رشد فردی، خودشناسی و شفقت به خود',
    eyebrow: 'کوچ حرفه‌ای بلومیا',
    shortBio: 'همراه افراد در مسیر شناخت خود، هم‌سو شدن با احساسات و ساختن زندگی با مهر، آگاهی و اصالت.',
    description: 'همراه افراد در مسیر شناخت خود، هم‌سو شدن با احساسات و ساختن زندگی با مهر، آگاهی و اصالت.',
    longBio: `باور دارم بزرگترین رنج انسان‌ها زمانی آغاز می‌شود که با احساسات درونی‌شان بیگانه می‌شوند یا با خودسرزنشگری مداوم، از مهربانی با خود فاصله می‌گیرند.\n\nرسالت من در بلومیا، خلق فضایی گرم، شنونده و سرشار از شفقت است تا بیاموزید چگونه به جای فرار از احساسات دشوار، با آنها کنار بیایید، صدای اصیل نیازهایتان را بشنوید و زندگی‌تان را با پذیرش و صلح درونی بنا کنید.\n\nدر جلسات کوچینگ خودشناسی، ما به لایه‌های عمیق روان سر می‌زنیم تا مرهمی بر زخم‌های خودتردیدی بگذاریم و عزت‌نفسی اصیل و تزلزل‌ناپذیر در وجودتان جوانه بزند.`,
    longDescription: `باور دارم بزرگترین رنج انسان‌ها زمانی آغاز می‌شود که با احساسات درونی‌شان بیگانه می‌شوند یا با خودسرزنشگری مداوم، از مهربانی با خود فاصله می‌گیرند.\n\nرسالت من در بلومیا، خلق فضایی گرم، شنونده و سرشار از شفقت است تا بیاموزید چگونه به جای فرار از احساسات دشوار، با آنها کنار بیایید، صدای اصیل نیازهایتان را بشنوید و زندگی‌تان را با پذیرش و صلح درونی بنا کنید.\n\nدر جلسات کوچینگ خودشناسی، ما به لایه‌های عمیق روان سر می‌زنیم تا مرهمی بر زخم‌های خودتردیدی بگذاریم و عزت‌نفسی اصیل و تزلزل‌ناپذیر در وجودتان جوانه بزند.`,
    imageUrl: 'https://cdn.sanity.io/images/7yjhdw88/production/795c7cb8d4da50a4ee5bef5b0799894d322db363-335x335.png',
    cutoutImageUrl: 'https://cdn.sanity.io/images/7yjhdw88/production/795c7cb8d4da50a4ee5bef5b0799894d322db363-335x335.png',
    coverImage: 'https://cdn.sanity.io/images/7yjhdw88/production/795c7cb8d4da50a4ee5bef5b0799894d322db363-335x335.png',
    aboutImage: 'https://cdn.sanity.io/images/7yjhdw88/production/795c7cb8d4da50a4ee5bef5b0799894d322db363-335x335.png',
    sessionMode: 'online',
    languages: ['فارسی'],
    location: 'تهران',
    specialties: [
      'خودشناسی عمیق و اصالت درونی',
      'شفقت به خود و رهایی از سرزنش',
      'تعادل احساسی و مدیریت هیجانات دشوار',
      'ترمیم عزت‌نفس و خودپذیری نامشروط',
      'کوچینگ تحول فردی بر مبنای استانداردهای ICF',
    ],
    rating: 5.0,
    totalReviews: 29,
    totalSessions: 130,
    coachingHours: 130,
    satisfiedClients: 32,
    experienceYears: 4,
    audience: [
      { title: 'مدام خودتان را قضاوت و سرزنش می‌کنید و از شکست‌ها به سختی عبور می‌کنید.' },
      { title: 'احساس می‌کنید نیازها و احساسات واقعی‌تان در اولویت زندگی‌تان قرار ندارد.' },
      { title: 'به دنبال آرامش درونی، پذیرش خود و ساختن صلح پایدار با روان‌تان هستید.' },
      { title: 'می‌خواهید روابطی اصیل و بر مبنای احترام متقابل بدون باج‌دهی عاطفی بسازید.' },
    ],
    method: [
      { id: '01', title: 'شنیدن بدون قضاوت احساسات', description: 'ایجاد فضای امن برای نام‌گذاری و به رسمیت شناختن احساسات سرکوب‌شده درون.' },
      { id: '02', title: 'تمرین عملی شفقت به خود', description: 'یادگیری مهارت صحبت با خود همانند یک دوست مشفق و مهربان در روزهای سخت.' },
      { id: '03', title: 'شناسایی ریشه‌های خودانتقادی', description: 'تفکیک صدای سرزنشگر ناخودآگاه از هویت اصیل و بازسازی عزت‌نفس آسیب‌دیده.' },
      { id: '04', title: 'زیستن با آگاهی و مهر', description: 'نهادینه‌سازی تصمیمات صمیمانه، مرزگذاری محترمانه و تجربه زیست اصیل در روابط.' },
    ],
    services: [
      {
        id: 'zero',
        title: 'جلسه صفر (معارفه رایگان ۳۰ دقیقه‌ای)',
        duration: '۳۰ دقیقه',
        description: 'یک گفتگوی آنلاین ۳۰ دقیقه‌ای رایگان برای آشنایی صمیمانه، شنیدن دغدغه‌های احساسی شما و بررسی تناسب متدولوژی خودشناسی و شفقت با نیاز کنونی‌تان.',
        price: 0,
        isFree: true,
      },
      {
        id: 'coaching',
        title: 'تک‌جلسه کوچینگ خودشناسی و شفقت به خود',
        duration: '۶۰ دقیقه',
        description: 'یک فضای امن و بدون قضاوت برای التیام یک تعارض درونی، کنار آمدن با یک احساس دشوار یا بازگشت به تعادل روانی.',
        price: 850000,
        isFree: false,
      },
    ],
    packagesData: [
      {
        id: 'growth',
        title: 'پکیج ۴ جلسه‌ای «شفقت و آشتی با خود»',
        sessions: 4,
        duration: '۶۰ دقیقه',
        description: 'رهایی از خودسرزنشگری، یادگیری مهرورزی به خود و بازگشت به آرامش درون.',
        price: 2500000,
        discountPercent: 17,
        validityDays: 90,
        isPopular: false,
        features: [
          '۴ جلسه کوچینگ آنلاین ۶۰ دقیقه‌ای',
          'نقشه‌برداری از الگوهای خودسرزنشگری و تله‌های کمال‌گرایی',
          'آموزش گام‌به‌گام تکنیک‌های شفقت به خود در بحران‌ها',
          'تمرین پذیرش احساسات ناخوشایند بدون فرار و انزوا',
          'پشتیبانی پیامکی میان جلسات',
          'ضمانت بازگشت کامل وجه تا پایان جلسه دوم',
        ],
      },
      {
        id: 'self-discovery',
        title: 'پکیج ۶ جلسه‌ای «تعادل احساسی و پذیرش»',
        sessions: 6,
        duration: '۶۰ دقیقه',
        description: 'کشف عمیق لایه‌های روان، هماهنگی با جهان احساسات و ساختن صلح ماندگار.',
        price: 3600000,
        discountPercent: 20,
        validityDays: 90,
        isPopular: true,
        features: [
          '۶ جلسه تخصصی آنلاین ۶۰ دقیقه‌ای',
          'بازسازی پیوند عاطفی با خود و التیام احساس گناه کاذب',
          'شناسایی نیازهای واقعی و بیان محترمانه آنها در روابط',
          'تمرین‌های عملی حضور در لحظه و ذهن‌آگاهی مهربانانه',
          'پشتیبانی پیامکی پیوسته میان جلسات',
          'ضمانت بازگشت کامل وجه تا پایان جلسه دوم',
        ],
      },
      {
        id: 'transformation',
        title: 'پکیج ۸ جلسه‌ای «عزت‌نفس و اصالت»',
        sessions: 8,
        duration: '۶۰ دقیقه',
        description: 'مسیر ۲ تا ۳ ماهه برای ساختن عزت‌نفسی تزلزل‌ناپذیر و زیستن بدون نقاب.',
        price: 4700000,
        discountPercent: 22,
        validityDays: 90,
        isPopular: false,
        features: [
          '۸ جلسه عمیق آنلاین ۶۰ دقیقه‌ای',
          'بازنویسی دیالوگ‌های درونی و تبدیل منتقد درون به حامی آگاه',
          'مرزگذاری سالم در روابط فردی و خانوادگی بدون ترس',
          'پایش مستمر شاخص‌های رضایت درونی و خودپذیری',
          'پشتیبانی پیامکی نامحدود در طول دوره',
          'ضمانت بازگشت کامل وجه تا پایان جلسه دوم',
        ],
      },
      {
        id: 'excellence',
        title: 'پکیج ۱۲ جلسه‌ای «تحول عمیق زیست با مهر»',
        sessions: 12,
        duration: '۶۰ دقیقه',
        description: 'همراهی ۴ ماهه جامع برای تثبیت کامل شفقت به خود و شکوفایی آرامش درونی.',
        price: 6000000,
        discountPercent: 33,
        validityDays: 90,
        isPopular: false,
        features: [
          '۱۲ جلسه جامع اختصاصی ۶۰ دقیقه‌ای',
          'طراحی منشور شخصی شفقت و اصالت در زندگی',
          'تحکیم کامل تعادل هیجانی در مواجهه با چالش‌های زندگی',
          'ارزیابی و پایش همه‌جانبه آرامش روانی و رضایت درونی',
          'پشتیبانی کامل پیامکی در تمام طول دوره ۴ ماهه',
          'ضمانت بازگشت کامل وجه تا پایان جلسه دوم',
        ],
      },
    ],
    testimonials: [
      {
        id: 't1',
        quote: 'همیشه احساس می‌کردم به اندازه کافی خوب نیستم. در جلسات با مریم جوهری برای اولین بار یاد گرفتم چگونه با خودم مهربان باشم و خودم را در آغوش بگیرم.',
        author: 'سیمین ب.',
        context: 'مراجع دوره شفقت به خود',
      },
      {
        id: 't2',
        quote: 'آرامش، حضور بی‌قضاوت و درک عمیق مریم کمک کرد از گرداب نشخوار و خودانتقادی بیرون بیایم و به آرامش برسم.',
        author: 'نگین ح.',
        context: 'مراجع پکیج عزت‌نفس',
      },
    ],
    credentials: [
      { id: 'c1', title: 'کوچ رشد فردی و خودشناسی تایید شده فدراسیون بین‌المللی (ICF)' },
      { id: 'c2', title: 'تسهیل‌گر دوره‌های شفقت به خود و تعادل هیجانی' },
      { id: 'c3', title: 'کارشناسی ارشد مطالعات روان‌شناختی و رشد فردی' },
    ],
    faqs: [
      { question: 'شفقت به خود چیست و چه فرقی با خودخواهی دارد؟', answer: 'شفقت به خود یعنی رفتار مهربانانه، حمایتگرانه و بدون قضاوت با خود در لحظات دشوار؛ بر خلاف خودخواهی، شفقت به خود باعث افزایش همدلی با دیگران نیز می‌شود.' },
      { question: 'آیا این جلسات به بهبود روابط من با دیگران هم کمک می‌کند؟', answer: 'قطعاً. وقتی رابطه شما با خودتان شفاف، مهربان و آرام باشد، مرزهای سالم‌تری می‌سازید و ارتباطاتتان به دور از باج‌دهی عاطفی شکوفا می‌شود.' },
      { question: 'چگونه می‌توانم هماهنگی جلسه را انجام دهم؟', answer: 'با پر کردن فرم رزرو، در کمتر از ۲۴ ساعت برای هماهنگی ساعت مناسب جلسه آنلاین با شما تماس گرفته می‌شود.' },
    ],
  },

  // ==========================================
  // PAYAM ESMI (پیام اسمی)
  // ==========================================
  {
    id: 'coach-profile-payam-esmi',
    slug: 'payam-esmi',
    name: 'پیام اسمی',
    title: 'کوچ هدفمندی، مدیریت زمان و انضباط فردی | MBA',
    eyebrow: 'کوچ حرفه‌ای بلومیا',
    shortBio: 'پیام اسمی هستم. فارغ‌التحصیل MBA و نویسنده کتاب‌های حوزه انضباط فردی؛ همراه شما برای تبدیل "پرمشغله بودن" به "موثر بودن" و تسلط بر مدیریت زمان.',
    description: 'پیام اسمی هستم. فارغ‌التحصیل MBA و نویسنده کتاب‌های حوزه انضباط فردی؛ همراه شما برای تبدیل "پرمشغله بودن" به "موثر بودن" و تسلط بر مدیریت زمان.',
    longBio: `به عنوان دانش‌آموخته MBA و نویسنده در حوزه انضباط شخصی، معتقدم اکثر افراد مشکل کمبود وقت ندارند، بلکه درگیر توهم پرمشغله بودن و فقدان سیستم‌های شفاف اولویت‌بندی هستند.\n\nرسالت من در بلومیا، تلفیق ابزارهای استراتژیک مدیریت کسب‌وکار با علم عمیق کوچینگ فردی است؛ تا به جای غرق شدن در کارهای بی‌پایان و اهمال‌کاری فرساینده، سیستمی بسازید که در آن کارهای واقعاً مهم به نتیجه برسند و همزمان آرامش و اوقات فراغت واقعی را تجربه کنید.\n\nدر جلسات کوچینگ، ما برنامه‌های فانتزی روی کاغذ را کنار می‌گذاریم و سیستمی واقع‌بینانه، شخصی‌سازی‌شده و شکست‌ناپذیر برای مدیریت انرژی، زمان و اهداف شما طراحی می‌کنیم.`,
    longDescription: `به عنوان دانش‌آموخته MBA و نویسنده در حوزه انضباط شخصی، معتقدم اکثر افراد مشکل کمبود وقت ندارند، بلکه درگیر توهم پرمشغله بودن و فقدان سیستم‌های شفاف اولویت‌بندی هستند.\n\nرسالت من در بلومیا، تلفیق ابزارهای استراتژیک مدیریت کسب‌وکار با علم عمیق کوچینگ فردی است؛ تا به جای غرق شدن در کارهای بی‌پایان و اهمال‌کاری فرساینده، سیستمی بسازید که در آن کارهای واقعاً مهم به نتیجه برسند و همزمان آرامش و اوقات فراغت واقعی را تجربه کنید.\n\nدر جلسات کوچینگ، ما برنامه‌های فانتزی روی کاغذ را کنار می‌گذاریم و سیستمی واقع‌بینانه، شخصی‌سازی‌شده و شکست‌ناپذیر برای مدیریت انرژی، زمان و اهداف شما طراحی می‌کنیم.`,
    imageUrl: 'https://cdn.sanity.io/images/7yjhdw88/production/1a4eb3c4ddcec6f743bc75b65a299e237d2cb90b-928x1152.png',
    cutoutImageUrl: '/images/solea/payam_hero_v4.png',
    coverImage: 'https://cdn.sanity.io/images/7yjhdw88/production/1a4eb3c4ddcec6f743bc75b65a299e237d2cb90b-928x1152.png',
    aboutImage: 'https://cdn.sanity.io/images/7yjhdw88/production/1a4eb3c4ddcec6f743bc75b65a299e237d2cb90b-928x1152.png',
    sessionMode: 'online',
    languages: ['فارسی'],
    location: 'تهران',
    specialties: [
      'مدیریت زمان، انرژی و تمرکز عمیق',
      'مهار قطعی اهمال‌کاری و تعلل ذهنی',
      'سیستم‌سازی انضباط فردی و عادات روزمره',
      'هدف‌گذاری راهبردی بر مبنای متدهای MBA',
      'تبدیل پرمشغله بودن به موثر بودن پایدار',
    ],
    rating: 5.0,
    totalReviews: 35,
    totalSessions: 150,
    coachingHours: 150,
    satisfiedClients: 38,
    experienceYears: 5,
    audience: [
      { title: 'تمام روز در حال دویدن و کار هستید اما در پایان روز کارهای مهم دست‌نخورده باقی می‌ماند.' },
      { title: 'درگیر اهمال‌کاری، کمال‌گرایی منفی و سختی در شروع کارهای بزرگ هستید.' },
      { title: 'می‌خواهید اهداف فصلی و سالانه خود را از رویاپردازی به خروجی‌های واقعی تبدیل کنید.' },
      { title: 'به دنبال تعادل میان کار پرفشار، سلامت جسمی و زمان اختصاصی برای استراحت هستید.' },
    ],
    method: [
      { id: '01', title: 'ممیزی زمان و اتلاف‌های پنهان', description: 'ردیابی و تحلیل دقیق نحوه صرف ۲۴ ساعت روزانه و کشف نشتی‌های انرژی و زمان.' },
      { id: '02', title: 'بازطراحی معماری روز و اولویت‌بندی', description: 'تفکیک کارهای حیاتی از فوری با متد آیزنهاور و ایجاد بلوک‌های تمرکز عمیق (Deep Work).' },
      { id: '03', title: 'ساختن سیستم انضباط بدون فرسودگی', description: 'طراحی چارچوب‌های اقدام خرد، مهار وسوسه‌های حواس‌پرتی و سیستم‌های تعهد درونی.' },
      { id: '04', title: 'پایش، بازخورد و بهبود مستمر (Kaizen)', description: 'ارزیابی هفتگی دستاوردها، بهینه‌سازی سیستم‌ها و پایدارسازی بهره‌وری آرامش‌بخش.' },
    ],
    services: [
      {
        id: 'zero',
        title: 'جلسه صفر (معارفه رایگان ۳۰ دقیقه‌ای)',
        duration: '۳۰ دقیقه',
        description: 'یک گفتگوی آنلاین ۳۰ دقیقه‌ای برای بررسی وضعیت مدیریت زمان شما، تحلیل دلایل اهمال‌کاری و سنجش تناسب متدولوژی کوچینگ انضباط با اهداف شما.',
        price: 0,
        isFree: true,
      },
      {
        id: 'coaching',
        title: 'تک‌جلسه معماری زمان و مهار اهمال‌کاری',
        duration: '۶۰ دقیقه',
        description: 'یک جلسه کاربردی برای حل یک بحران زمانی مشخص، طراحی برنامه هفته پیش‌رو یا شکستن سد شروع یک پروژه مهم.',
        price: 850000,
        isFree: false,
      },
    ],
    packagesData: [
      {
        id: 'growth',
        title: 'پکیج ۴ جلسه‌ای «مدیریت زمان و تمرکز»',
        sessions: 4,
        duration: '۶۰ دقیقه',
        description: 'کشف نشتی‌های زمان، توقف کارهای بیهوده و ایجاد ۲ تا ۳ ساعت وقت آزاد روزانه.',
        price: 2500000,
        discountPercent: 17,
        validityDays: 90,
        isPopular: false,
        features: [
          '۴ جلسه کوچینگ آنلاین ۶۰ دقیقه‌ای',
          'ممیزی کامل اتلاف‌های انرژی و حواس‌پرتی‌های دیجیتال',
          'آموزش تکنیک‌های بلوک‌بندی زمانی (Time Boxing)',
          'طراحی روتین صبحگاهی و شامگاهی اختصاصی',
          'پشتیبانی پیامکی میان جلسات',
          'ضمانت بازگشت کامل وجه تا پایان جلسه دوم',
        ],
      },
      {
        id: 'self-discovery',
        title: 'پکیج ۶ جلسه‌ای «مهار اهمال‌کاری و سیستم‌سازی»',
        sessions: 6,
        duration: '۶۰ دقیقه',
        description: 'ریشه‌یابی اهمال‌کاری، غلبه بر کمال‌گرایی بازدارنده و ساختن انضباط شخصی.',
        price: 3600000,
        discountPercent: 20,
        validityDays: 90,
        isPopular: true,
        features: [
          '۶ جلسه تخصصی آنلاین ۶۰ دقیقه‌ای',
          'شناسایی و شکستن الگوهای روانی تعلل در اقدام',
          'سیستم‌سازی وظایف کاری و پروژه‌های شخصی',
          'مهارت نه گفتن به کارهای کم‌ارزش و ایجاد مرزهای زمانی',
          'پشتیبانی پیامکی پیوسته میان جلسات',
          'ضمانت بازگشت کامل وجه تا پایان جلسه دوم',
        ],
      },
      {
        id: 'transformation',
        title: 'پکیج ۸ جلسه‌ای «تسلط بر انضباط فردی»',
        sessions: 8,
        duration: '۶۰ دقیقه',
        description: 'مسیر ۲ تا ۳ ماهه برای تثبیت انضباط فولادین، تمرکز بالا و بهره‌وری آرام.',
        price: 4700000,
        discountPercent: 22,
        validityDays: 90,
        isPopular: false,
        features: [
          '۸ جلسه عمیق آنلاین ۶۰ دقیقه‌ای',
          'طراحی سیستم هدف‌گذاری فصلی مبتنی بر OKR',
          'مهندسی محیط کار و زندگی برای تمرکز حداکثری',
          'پایش هفتگی شاخص‌های بهره‌وری و پایبندی به برنامه',
          'پشتیبانی پیامکی نامحدود در طول دوره',
          'ضمانت بازگشت کامل وجه تا پایان جلسه دوم',
        ],
      },
      {
        id: 'excellence',
        title: 'پکیج ۱۲ جلسه‌ای «رهبری شخصی و بهره‌وری عالی»',
        sessions: 12,
        duration: '۶۰ دقیقه',
        description: 'همراهی ۴ ماهه جامع برای تبدیل شدن به یک فرد باانضباط، موثر و متعادل.',
        price: 6000000,
        discountPercent: 33,
        validityDays: 90,
        isPopular: false,
        features: [
          '۱۲ جلسه جامع اختصاصی ۶۰ دقیقه‌ای',
          'طراحی معماری کامل زندگی موثر (Productive Life Architecture)',
          'تثبیت پایدار تعادل کار، سلامت و آرامش شخصی',
          'ارزیابی و بهینه‌سازی مداوم سیستم‌های انضباط فردی',
          'پشتیبانی کامل پیامکی در تمام طول دوره ۴ ماهه',
          'ضمانت بازگشت کامل وجه تا پایان جلسه دوم',
        ],
      },
    ],
    testimonials: [
      {
        id: 't1',
        quote: 'همیشه احساس می‌کردم ۲۴ ساعت برای کارهایم کم است. با راهنمایی‌های پیام اسمی نه تنها پروژه‌هایم سر موقع انجام می‌شوند، بلکه بالاخره وقت برای خانواده و ورزش پیدا کردم.',
        author: 'احسان ط.',
        context: 'کارآفرین و مراجع مدیریت زمان',
      },
      {
        id: 't2',
        quote: 'بزرگترین کمکی که آقای اسمی به من کرد، شکستن سد اهمال‌کاری در پروژه‌های پیچیده بود. یاد گرفتم چطور بدون کمال‌گرایی فلج‌کننده کارها را پیش ببرم.',
        author: 'حامد م.',
        context: 'توسعه‌دهنده ارشد نرم‌افزار',
      },
    ],
    credentials: [
      { id: 'c1', title: 'فارغ‌التحصیل MBA با گرایش استراتژی و مدیریت' },
      { id: 'c2', title: 'نویسنده و پژوهشگر حوزه انضباط فردی و مدیریت زمان' },
      { id: 'c3', title: 'کوچ حرفه‌ای بهره‌وری و دستیابی به اهداف (ICF)' },
    ],
    faqs: [
      { question: 'آیا برای این دوره نیاز به نرم‌افزارهای پیچیده دارم؟', answer: 'خیر. سیستم‌های ما بر اصول بنیادی و روان‌شناختی تمرکز دارند و با ساده‌ترین ابزارها (حتی دفترچه یادداشت یا اپلیکیشن‌های رایگان معمولی) قابل پیاده‌سازی هستند.' },
      { question: 'اگر برنامه‌ای که طراحی کردیم اجرا نشد چه؟', answer: 'یکی از اهداف اصلی جلسات، تنظیم واقع‌بینانه سیستم با ظرفیت روانی و فیزیکی واقعی شماست. در هر جلسه دلایل عدم اجرا بررسی و سیستم متناسب با شما اصلاح می‌شود.' },
      { question: 'جلسات آنلاین چطور برگزار می‌شوند؟', answer: 'به صورت ویدیویی و متمرکز در بستر آنلاین و با هماهنگی دقیق ساعت مناسب برای شما.' },
    ],
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

function withTimeout<T>(promise: Promise<T> | PromiseLike<T>, ms = 2500): Promise<T> {
  let timer: NodeJS.Timeout;
  const timeoutPromise = new Promise<T>((_, reject) => {
    timer = setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms);
  });
  return Promise.race([Promise.resolve(promise), timeoutPromise]).finally(() => clearTimeout(timer));
}

async function fetchSanityCoaches(): Promise<CoachProfile[] | null> {
  try {
    const docs = await withTimeout(sanityClient.fetch(coachesQuery), 3000);
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
    const { data, error } = await withTimeout<any>(
      supabase.from('v2_coaches').select('*').eq('is_active', true),
      2500
    );
    if (!error && data && data.length > 0) return shuffleArray(data.map(coachFromBackupRow));
  } catch (error) {
    console.warn('Could not fetch coaches from Supabase:', error);
  }

  return shuffleArray(fallbackCoaches);
}

export function getCanonicalSlug(rawSlug: string): string {
  if (!rawSlug) return rawSlug;
  const s = rawSlug.trim().toLowerCase().replace(/-/g, '_');
  if (s.includes('parmiss')) return 'parmiss-yari';
  if (s.includes('mahya')) return 'mahya_shakoori';
  if (s.includes('arezoo') && s.includes('ghaffari')) return 'Arezoo_Ghaffari';
  if (s.includes('derakhsh')) return 'fatemeh-derakhsh';
  if (s.includes('esmi')) return 'payam-esmi';
  if (s.includes('johari')) return 'maryam_johari';
  if (s.includes('nematimalek') || s.includes('nemati')) return 'shabnam_nematimalek';
  if (s.includes('saloomeh') || s.includes('salomeh')) return 'saloomeh_fathijou';
  if (s.includes('fatemeh') && s.includes('esmaeeli')) return 'fatemeh_esmaeeli';
  return rawSlug;
}

export async function getCoachBySlug(slug: string): Promise<CoachProfile | null> {
  if (!slug) return null;
  const canonicalSlug = getCanonicalSlug(slug);

  try {
    const doc = await withTimeout(sanityClient.fetch(coachBySlugQuery, { slug: canonicalSlug }), 3000);
    if (doc) return normalizeSanityCoach(doc);
  } catch (error) {
    console.warn(`Could not fetch coach [${canonicalSlug}] from Sanity:`, error);
  }

  try {
    const { data, error } = await withTimeout<any>(
      supabase
        .from('v2_coaches')
        .select('*')
        .eq('slug', canonicalSlug)
        .eq('is_active', true)
        .maybeSingle(),
      2500
    );
    if (!error && data) return coachFromBackupRow(data);
  } catch (error) {
    console.warn(`Could not fetch coach [${canonicalSlug}] from Supabase:`, error);
  }

  return fallbackCoaches.find((c) => c.slug === canonicalSlug || c.slug === slug) ?? null;
}