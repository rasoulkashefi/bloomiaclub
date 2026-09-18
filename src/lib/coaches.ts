import { supabase } from './supabase';

export interface Coach {
  id: string | number;
  slug: string;
  name: string;
  title: string;
  description: string;
  longDescription?: string;
  imageUrl?: string | null;
  coverImage?: string | null;
  specialties: string[];
  rating: number;
  totalReviews: number;
  totalSessions: number;
  coachingHours: number;
  satisfiedClients: number;
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
  const tags = parseJsonField(coach.tags, []) || [];
  return {
    id: coach.id,
    slug: coach.slug || String(coach.id),
    name: coach.full_name || coach.name || 'کوچ بلومیا',
    title: coach.job_title || coach.title || 'کوچ حرفه‌ای ICF',
    description: coach.bio_short || coach.description || 'همراه شما در مسیر رشد و تحول فردی و حرفه‌ای.',
    longDescription: coach.bio_full,
    imageUrl: resolvePublicUrl(coach.avatar_url || coach.imageUrl, 'coaches_images'),
    coverImage: resolvePublicUrl(coach.hero_image_url || coach.coverImage, 'coaches_images'),
    specialties: Array.isArray(tags) ? tags : [],
    rating: coach.average_rating != null ? Number(coach.average_rating) : 5,
    totalReviews: coach.review_count || coach.satisfied_clients || 0,
    totalSessions: coach.coaching_hours || 50,
    coachingHours: coach.coaching_hours || 50,
    satisfiedClients: coach.satisfied_clients || 20,
  };
};

// Fallback coaches for offline / zero latency SSR
export const fallbackCoaches: Coach[] = [
  {
    id: '1',
    slug: 'farzaneh-sharifi',
    name: 'فرزانه شریفی',
    title: 'کوچ ارشد توسعه فردی و مهارت‌های ارتباطی (PCC)',
    description: 'بیش از ۸ سال سابقه در کوچینگ رهبری فردی، مدیریت تعارضات و افزایش وضوح ذهنی.',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop',
    specialties: ['رشد فردی', 'هوش هیجانی', 'توسعه ارتباطات'],
    rating: 5,
    totalReviews: 48,
    totalSessions: 420,
    coachingHours: 420,
    satisfiedClients: 65,
  },
  {
    id: '2',
    slug: 'reza-ahmadi',
    name: 'رضا احمدی',
    title: 'کوچ توسعه مسیر شغلی و ارتقای سازمانی (ACC)',
    description: 'متخصص در تحول شغلی، آمادگی برای موقعیت‌های مدیریتی و حل چالش‌های سازمانی.',
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop',
    specialties: ['مسیر شغلی', 'توسعه شغلی', 'رهبری کسب‌وکار'],
    rating: 4.9,
    totalReviews: 36,
    totalSessions: 310,
    coachingHours: 310,
    satisfiedClients: 42,
  },
  {
    id: '3',
    slug: 'arezoo-moradi',
    name: 'آرزو مرادی',
    title: 'کوچ تخصصی زنان و تعادل کار و زندگی',
    description: 'همراهی با زنان و مادران شاغل برای غلبه بر فرسودگی، تقویت اعتماد به نفس و کشف علایق واقعی.',
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop',
    specialties: ['تعادل کار و زندگی', 'کوچینگ زنان', 'مدیریت استرس'],
    rating: 5,
    totalReviews: 52,
    totalSessions: 380,
    coachingHours: 380,
    satisfiedClients: 58,
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
  try {
    const { data, error } = await supabase
      .from('v2_coaches')
      .select('*')
      .eq('is_active', true);

    if (error || !data || data.length === 0) {
      return shuffleArray(fallbackCoaches).slice(0, count);
    }

    // بُر زدن کامل لیست با الگوریتم فیشر-یتس برای تضمین رندوم بودن با هر بار لود
    const shuffled = shuffleArray(data);
    return shuffled.slice(0, count).map(normalizeCoach);
  } catch (err) {
    console.error('Error in getRandomCoaches:', err);
    return shuffleArray(fallbackCoaches).slice(0, count);
  }
}
