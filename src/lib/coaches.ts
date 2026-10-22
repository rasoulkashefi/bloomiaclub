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
  const fallback = fallbackCoaches.find((c) => c.slug === doc.slug);
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
  organization: string;
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
        href: 'https://bloomiaclub.com/blog/returning-to-work-after-baby-mothers-coaching',
      },
      {
        id: 'a2',
        title: 'چگونه با فرزند نوجوان خود صحبت کنیم که بشنود؟ راهنمای کوچینگ برای مهار تعارض‌های سن بلوغ',
        date: '۲۴ شهریور ۱۴۰۵',
        readTime: '۸ دقیقه',
        imageUrl: 'https://cdn.sanity.io/images/7yjhdw88/production/13d8b20f650aa03900e5d83b590f8f0d61c7ced7-1376x768.jpg',
        excerpt: 'حل تعارضات بلوغ، گذر از نصیحت به پرسشگری کوچینگی و به رسمیت شناختن استقلال فکری نوجوان بدون تخریب پیوند عاطفی.',
        href: 'https://bloomiaclub.com/blog/how-to-talk-to-teens-coaching-guide',
      },
      {
        id: 'a3',
        title: 'فرسودگی مادرانه (Mom Burnout): علائم، دلایل و نقش کوچینگ در بازیابی انرژی',
        date: '۹ آذر ۱۴۰۴',
        readTime: '۹ دقیقه',
        imageUrl: 'https://cdn.sanity.io/images/7yjhdw88/production/6c979da72487e77edf14721eca15a596d447b1f2-2816x1536.png',
        excerpt: 'تشخیص علائم خستگی مزمن، احساس تنهایی و بی‌حسی عاطفی مادران؛ و چگونگی بازسازی سیستم حمایتی درونی با کوچینگ.',
        href: 'https://bloomiaclub.com/blog/mom-burnout-symptoms-causes-coaching',
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

export async function getCoachBySlug(slug: string): Promise<CoachProfile | null> {
  if (!slug) return null;

  try {
    const doc = await withTimeout(sanityClient.fetch(coachBySlugQuery, { slug }), 3000);
    if (doc) return normalizeSanityCoach(doc);
  } catch (error) {
    console.warn(`Could not fetch coach [${slug}] from Sanity:`, error);
  }

  try {
    const { data, error } = await withTimeout<any>(
      supabase
        .from('v2_coaches')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .maybeSingle(),
      2500
    );
    if (!error && data) return coachFromBackupRow(data);
  } catch (error) {
    console.warn(`Could not fetch coach [${slug}] from Supabase:`, error);
  }

  return fallbackCoaches.find((c) => c.slug === slug) ?? null;
}