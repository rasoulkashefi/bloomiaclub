import { sanityClient, urlFor } from './sanity';
import { toFa, formatNumber } from './format';

export type EventType = 'webinar' | 'workshop' | 'masterclass' | 'in_person' | 'panel';
export type EventStatus = 'open' | 'soon' | 'sold_out' | 'completed';

export interface EventCoach {
  id: string;
  name: string;
  slug: string;
  title: string;
  imageUrl?: string;
  rating?: number;
}

export interface EventFaq {
  question: string;
  answer: string;
}

export interface EventItem {
  id: string;
  slug: string;
  title: string;
  eventType: EventType;
  eventTypeName: string;
  status: EventStatus;
  statusName: string;
  featured: boolean;
  coach: EventCoach;
  coaches?: Array<{ name: string; slug: string; imageUrl?: string }>;
  date: string;
  endDate?: string;
  formattedDate: string;
  formattedTime: string;
  duration: string;
  location: string;
  platform: string;
  platformName: string;
  registrationUrl: string;
  price: number;
  originalPrice?: number;
  formattedPrice: string;
  coverImage: string;
  coverImageAlt: string;
  excerpt: string;
  body?: any[];
  syllabus?: string[];
  targetAudience?: string[];
  features?: string[];
  faqs?: EventFaq[];
  metaTitle?: string;
  metaDescription?: string;
}

export const EVENT_TYPE_MAP: Record<EventType, string> = {
  webinar: 'وبینار آنلاین',
  workshop: 'کارگاه تعاملی',
  masterclass: 'مسترکلاس تخصصی',
  in_person: 'همایش حضوری',
  panel: 'پنل پرسش و پاسخ',
};

export const EVENT_STATUS_MAP: Record<EventStatus, string> = {
  open: 'در حال ثبت‌نام',
  soon: 'به زودی',
  sold_out: 'تکمیل ظرفیت',
  completed: 'پایان‌یافته',
};

export const PLATFORM_MAP: Record<string, string> = {
  eseminar: 'ایسمینار',
  evand: 'ایوند',
  skyroom: 'اسکای‌روم',
  google_meet: 'گوگل میت',
  in_person: 'حضوری',
  other: 'آنلاین',
};

export function formatEventDate(dateString: string): { date: string; time: string } {
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) {
      return { date: 'به زودی', time: '' };
    }
    const dateFormatted = new Intl.DateTimeFormat('fa-IR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(d);

    const timeFormatted = new Intl.DateTimeFormat('fa-IR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(d);

    return {
      date: dateFormatted,
      time: `ساعت ${toFa(timeFormatted)}`,
    };
  } catch {
    return { date: 'به زودی', time: '' };
  }
}

export function formatPrice(price: number, originalPrice?: number): string {
  if (price === 0) return 'رایگان';
  return `${formatNumber(price)} تومان`;
}

// ---------------------------------------------------------------------------
// FALLBACK SEED EVENTS (Ensures zero downtime & works out of the box)
// ---------------------------------------------------------------------------
export const FALLBACK_EVENTS: EventItem[] = [
  {
    id: 'event-mbti-parenting-coaching-workshop',
    slug: 'mbti-parenting-coaching-workshop',
    title: 'کارگاه کوچینگ گروهی: نقش MBTI در بهبود والدگری',
    eventType: 'workshop',
    eventTypeName: 'کارگاه تعاملی',
    status: 'open',
    statusName: 'در حال ثبت‌نام',
    featured: true,
    coach: {
      id: 'coach-profile-fatemeh_esmaeeli',
      name: 'فاطمه اسماعیلی',
      slug: 'fatemeh_esmaeeli',
      title: 'کوچ مادران، بانوان و نوجوانان (Level 2 ICF)',
      imageUrl: '/images/coaches/fatemeh-esmaeeli.webp',
      rating: 4.9,
    },
    date: '2026-11-06T18:00:00+03:30',
    formattedDate: 'جمعه ۱۵ آبان',
    formattedTime: 'ساعت ۱۸:۰۰ تا ۱۹:۳۰',
    duration: '۴ جلسه ۹۰ دقیقه‌ای',
    location: 'آنلاین در بستر تعاملی / هماهنگی در بله و تلگرام',
    platform: 'other',
    platformName: 'بله و تلگرام',
    registrationUrl: 'https://t.me/bloomiaclub',
    price: 250000,
    originalPrice: 1000000,
    formattedPrice: '۲۵۰٬۰۰۰ تومان',
    coverImage: 'https://cdn.sanity.io/images/7yjhdw88/production/4ac45908e1a2f3fed02a64153ab978c9877494dc-682x1024.jpg',
    coverImageAlt: 'پوستر کارگاه کوچینگ گروهی نقش MBTI در بهبود والدگری با فاطمه اسماعیلی',
    excerpt: 'در این کارگاه با کمک مدل MBTI، به تفاوت‌های شخصیتی خودمان و فرزندمان نگاه می‌کنیم و بررسی می‌کنیم که این تفاوت‌ها چگونه می‌توانند بر ارتباط، درک متقابل و شیوه والدگری ما اثر بگذارند. (جلسه اول رایگان)',
    syllabus: [
      "جلسه اول: دنیای من، دنیای تو — برون‌گرایی ↔ درون‌گرایی (جلسه اول رایگان)",
      "جلسه دوم: دیدن واقعیت، کشف امکان‌ها — حسی ↔ شهودی",
      "جلسه سوم: منطق و احساس؛ دو زبان متفاوت — منطقی ↔ احساسی",
      "جلسه چهارم: نظم یا آزادی؟ سبک من، انتخاب من — ساختارگرا ↔ منعطف"
],
    targetAudience: [
      "مادران و والدینی که در پی درک ریشه‌ای تفاوت‌های رفتاری فرزندشان هستند",
      "والدینی که با چالش‌هایی مانند لجاجت، گوشه‌گیری یا سوءتفاهم‌های مکرر در خانه مواجه‌اند",
      "کسانی که می‌خواهند بدون برچسب‌زدن، فضای امن و پر از صمیمیت برای گفتگو با کودک و نوجوان بسازند"
],
    features: [
      "امکان شرکت در جلسه اول به صورت کاملاً رایگان",
      "امکان ثبت‌نام در جلسات به صورت جداگانه (هر جلسه ۲۵۰ هزار تومان)",
      "ارائه فایل صوتی و چکیده کاربردی پس از پایان هر جلسه",
      "تمرین‌های عملی کوچینگی و تحلیل سناریوهای واقعی شرکت‌کنندگان"
],
    faqs: [
      {
            "question": "چگونه می‌توانم در جلسه اول رایگان ثبت‌نام کنم؟",
            "answer": "کافی است روی دکمه ثبت‌نام کلیک کرده و در پیام‌رسان بله یا تلگرام به پشتیبانی بلومیا کلاب پیام دهید تا لینک مستقیم ورود به جلسه اول برای شما ارسال شود."
      },
      {
            "question": "آیا باید از قبل با آزمون MBTI آشنایی داشته باشیم؟",
            "answer": "خیر، در این کارگاه تمام مفاهیم با زبانی کاملاً ساده، کاربردی و ملموس در ارتباط والد و فرزند بررسی می‌شود و نیازی به دانش قبلی روانشناسی نیست."
      },
      {
            "question": "آیا می‌توانم فقط در جلساتی که موضوع آن چالش من است شرکت کنم؟",
            "answer": "بله، طراحی کارگاه ماژولار است و امکان ثبت‌نام مجزا برای هر جلسه با هزینه ۲۵۰ هزار تومان فراهم شده است."
      },
      {
            "question": "اگر در ساعت برگزاری آنلاین نباشم، دسترسی به محتوا خواهم داشت؟",
            "answer": "بله، ضبط صوتی جلسه و خلاصه نکات در کانال اختصاصی شرکت‌کنندگان کارگاه قرار می‌گیرد."
      }
],
  },
];

// Helper to map a raw Sanity doc to clean EventItem
function mapSanityEvent(doc: any): EventItem {
  const { date, time } = formatEventDate(doc.date);
  const eventType = (doc.eventType as EventType) || 'webinar';
  const status = (doc.status as EventStatus) || 'open';
  const price = typeof doc.price === 'number' ? doc.price : 0;
  const originalPrice = typeof doc.originalPrice === 'number' ? doc.originalPrice : undefined;

  let coverImageUrl = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80';
  if (doc.coverImage) {
    try {
      const built = urlFor(doc.coverImage)?.width(1200).height(675).fit('crop').auto('format').url();
      if (built) coverImageUrl = built;
    } catch {
      // fallback
    }
  }

  let coachImageUrl = '/images/coaches/default.webp';
  if (doc.coach?.avatar) {
    try {
      const built = urlFor(doc.coach.avatar)?.width(300).height(300).fit('crop').auto('format').url();
      if (built) coachImageUrl = built;
    } catch {
      // fallback
    }
  } else if (doc.coach?.imageUrl) {
    coachImageUrl = doc.coach.imageUrl;
  }

  return {
    id: doc._id || doc.id,
    slug: doc.slug?.current || doc.slug,
    title: doc.title,
    eventType,
    eventTypeName: EVENT_TYPE_MAP[eventType] || 'وبینار',
    status,
    statusName: EVENT_STATUS_MAP[status] || 'در حال ثبت‌نام',
    featured: Boolean(doc.featured),
    coach: {
      id: doc.coach?._id || doc.coach?.id || '',
      name: doc.coach?.name || 'کوچ بلومیا',
      slug: doc.coach?.slug?.current || doc.coach?.slug || '',
      title: doc.coach?.title || 'کوچ حرفه‌ای بلومیا',
      imageUrl: coachImageUrl,
      rating: doc.coach?.rating || 4.9,
    },
    date: doc.date,
    endDate: doc.endDate,
    formattedDate: date,
    formattedTime: time,
    duration: doc.duration || '۹۰ دقیقه',
    location: doc.location || 'آنلاین',
    platform: doc.platform || 'eseminar',
    platformName: PLATFORM_MAP[doc.platform] || doc.platform || 'ایسمینار',
    registrationUrl: doc.registrationUrl || 'https://eseminar.tv',
    price,
    originalPrice,
    formattedPrice: formatPrice(price, originalPrice),
    coverImage: coverImageUrl,
    coverImageAlt: doc.coverImage?.alt || doc.title,
    excerpt: doc.excerpt || '',
    body: doc.body || [],
    syllabus: doc.syllabus || [],
    targetAudience: doc.targetAudience || [],
    features: doc.features || [],
    faqs: doc.faqs || [],
    metaTitle: doc.metaTitle,
    metaDescription: doc.metaDescription,
  };
}

const ALL_EVENTS_GROQ = `*[_type == "event"] | order(featured desc, date asc) {
  _id,
  "slug": slug.current,
  title,
  eventType,
  status,
  featured,
  date,
  endDate,
  duration,
  location,
  platform,
  registrationUrl,
  price,
  originalPrice,
  coverImage,
  excerpt,
  body,
  syllabus,
  targetAudience,
  features,
  faqs,
  metaTitle,
  metaDescription,
  coach->{
    _id,
    name,
    "slug": slug.current,
    title,
    avatar,
    rating
  }
}`;

/**
 * Fetch all events from Sanity with instant graceful fallback
 */
export async function getAllEvents(): Promise<EventItem[]> {
  try {
    const raw = await Promise.race([
      sanityClient.fetch(ALL_EVENTS_GROQ),
      new Promise<null>((_, reject) => setTimeout(() => reject(new Error('Sanity events timeout')), 3500)),
    ]);

    if (Array.isArray(raw) && raw.length > 0) {
      return raw.map(mapSanityEvent);
    }
  } catch (err) {
    console.warn('Could not fetch events from Sanity, using fallback events:', err);
  }

  return FALLBACK_EVENTS;
}

/**
 * Fetch a single event by slug
 */
export async function getEventBySlug(slug: string): Promise<EventItem | null> {
  if (!slug) return null;

  try {
    const raw = await Promise.race([
      sanityClient.fetch(
        `*[_type == "event" && slug.current == $slug][0] {
          _id,
          "slug": slug.current,
          title,
          eventType,
          status,
          featured,
          date,
          endDate,
          duration,
          location,
          platform,
          registrationUrl,
          price,
          originalPrice,
          coverImage,
          excerpt,
          body,
          syllabus,
          targetAudience,
          features,
          faqs,
          metaTitle,
          metaDescription,
          coach->{
            _id,
            name,
            "slug": slug.current,
            title,
            avatar,
            rating
          }
        }`,
        { slug }
      ),
      new Promise<null>((_, reject) => setTimeout(() => reject(new Error('Sanity single event timeout')), 3500)),
    ]);

    if (raw) {
      return mapSanityEvent(raw);
    }
  } catch (err) {
    console.warn(`Could not fetch event [${slug}] from Sanity:`, err);
  }

  // Check fallback
  const found = FALLBACK_EVENTS.find((e) => e.slug === slug);
  return found || null;
}

/**
 * Fetch all events hosted by a specific coach slug
 */
export async function getEventsByCoachSlug(coachSlug: string): Promise<EventItem[]> {
  if (!coachSlug) return [];

  const slugs = Array.from(
    new Set(
      [
        coachSlug,
        coachSlug.toLowerCase(),
        coachSlug.replace(/_/g, '-'),
        coachSlug.replace(/-/g, '_'),
        coachSlug.includes('mahya') ? 'mahya_shakoori' : null,
        coachSlug.includes('mahya') ? 'mahya_shakouri' : null,
        coachSlug.includes('arezoo') || coachSlug.includes('Arezoo') ? 'Arezoo_Ghaffari' : null,
        coachSlug.includes('arezoo') || coachSlug.includes('Arezoo') ? 'arezoo-ghaffari' : null,
        coachSlug.includes('derakhsh') ? 'fatemeh-derakhsh' : null,
        coachSlug.includes('derakhsh') ? 'fatemeh_derakhsh' : null,
        coachSlug.includes('payam') ? 'payam-esmi' : null,
        coachSlug.includes('payam') ? 'payam_esmi' : null,
      ].filter(Boolean) as string[]
    )
  );

  const refIds = [
    ...slugs.map((s) => `coach-${s}`),
    ...slugs.map((s) => `coach-profile-${s}`),
  ];

  try {
    const raw = await Promise.race([
      sanityClient.fetch(
        `*[_type == "event" && (coach->slug.current in $slugs || coach._ref in $refIds)] | order(date desc) {
          _id,
          "slug": slug.current,
          title,
          eventType,
          status,
          featured,
          date,
          endDate,
          duration,
          location,
          platform,
          registrationUrl,
          price,
          originalPrice,
          coverImage,
          excerpt,
          syllabus,
          features,
          faqs,
          coach->{
            _id,
            name,
            "slug": slug.current,
            title,
            avatar,
            rating
          }
        }`,
        { slugs, refIds, coachSlug }
      ),
      new Promise<null>((_, reject) => setTimeout(() => reject(new Error('Sanity coach events timeout')), 3500)),
    ]);

    if (Array.isArray(raw) && raw.length > 0) {
      return raw.map(mapSanityEvent);
    }
  } catch (err) {
    console.warn(`Could not fetch coach [${coachSlug}] events from Sanity:`, err);
  }

  // Check fallback
  return FALLBACK_EVENTS.filter((e) => e.coach.slug === coachSlug);
}

/**
 * Returns all event slugs for SSG static generation
 */
export async function getAllEventSlugs(): Promise<string[]> {
  try {
    const raw = await sanityClient.fetch(`*[_type == "event"].slug.current`);
    if (Array.isArray(raw) && raw.length > 0) {
      return raw.filter(Boolean);
    }
  } catch {
    // fallback
  }
  return FALLBACK_EVENTS.map((e) => e.slug);
}
