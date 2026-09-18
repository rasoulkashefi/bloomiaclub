import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const supabaseBaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://qxacvupalbfcoqkuydba.supabase.co';

/**
 * الگوریتم Fisher-Yates برای shuffle کردن آرایه به صورت کارآمد
 * پیچیدگی: O(n) - سریع و سبک
 * @param {Array} array - آرایه برای shuffle
 * @returns {Array} - آرایه shuffle شده
 */
const shuffleArray = (array) => {
  const shuffled = [...array]; // کپی آرایه برای جلوگیری از mutation
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const resolvePublicUrl = (value, bucket) => {
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

const parseJsonField = (value, fallback) => {
  if (value == null) return fallback;
  if (typeof value === 'string') {
    try {
      return JSON.parse(value);
    } catch (err) {
      return fallback;
    }
  }
  return value;
};

const normalizeCoach = (coach) => {
  const socialLinks = parseJsonField(coach.social_links, {}) || {};
  const tags = parseJsonField(coach.tags, []) || [];
  const packagePrices = parseJsonField(coach.package_prices, {}) || {};
  const packageDiscounts = parseJsonField(coach.package_discounts, {}) || {};

  return {
    id: coach.id,
    slug: coach.slug,
    name: coach.full_name,
    title: coach.job_title,
    description: coach.bio_short,
    longDescription: coach.bio_full,
    imageUrl: resolvePublicUrl(coach.avatar_url, 'coaches_images'),
    coverImage: resolvePublicUrl(coach.hero_image_url, 'coaches_images'),
    videoUrl: coach.intro_video_url,
    videoCover: coach.intro_video_cover,
    videoTitle: coach.intro_video_title,
    videoDescription: coach.intro_video_description,
    specialties: Array.isArray(tags) ? tags : [],
    services: Array.isArray(tags) ? tags : [],
    rating: coach.average_rating != null ? Number(coach.average_rating) : 0,
    totalReviews: coach.review_count || coach.satisfied_clients || 0,
    totalSessions: coach.coaching_hours || 0,
    coachingHours: coach.coaching_hours || 0,
    satisfiedClients: coach.satisfied_clients || 0,
    instagramUrl: socialLinks.instagram,
    linkedinUrl: socialLinks.linkedin,
    bookingUrl: socialLinks.booking || socialLinks.website,
    packagePrices,
    packageDiscounts,
    discount: coach.discount != null ? Number(coach.discount) : 0,
  };
};

/**
 * Hook برای گرفتن کوچ‌های رندوم از دیتابیس
 * @param {number} count - تعداد کوچ‌های درخواستی
 * @returns {{ coaches: Array, loading: boolean, error: Error|null, refetch: Function }}
 */
export const useRandomCoaches = (count = 6) => {
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCoaches = async () => {
    try {
      setLoading(true);
      setError(null);

      // گرفتن کوچ‌های فعال و انتخاب رندوم
      const { data, error: fetchError } = await supabase
        .from('v2_coaches')
        .select('*')
        .eq('is_active', true)
        .limit(count * 2); // گرفتن بیشتر برای انتخاب رندوم

      if (fetchError) {
        throw fetchError;
      }

      // انتخاب رندوم از نتایج با الگوریتم Fisher-Yates
      const shuffled = shuffleArray(data || []);
      const selected = shuffled.slice(0, count);

      // تبدیل داده‌ها به فرمت مناسب برای کامپوننت
      const formattedCoaches = selected.map(normalizeCoach);

      setCoaches(formattedCoaches);
    } catch (err) {
      console.error('Error fetching coaches:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoaches();
  }, [count]);

  return { coaches, loading, error, refetch: fetchCoaches };
};

/**
 * Hook برای گرفتن همه کوچ‌های فعال به صورت تصادفی
 * @returns {{ coaches: Array, loading: boolean, error: Error|null }}
 */
export const useAllCoaches = () => {
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        setLoading(true);
        
        const { data, error: fetchError } = await supabase
          .from('v2_coaches')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: true });

        if (fetchError) throw fetchError;

        const formattedCoaches = (data || []).map(normalizeCoach);
        
        // Shuffle کردن کوچ‌ها برای نمایش تصادفی در هر رفرش
        const shuffledCoaches = shuffleArray(formattedCoaches);

        setCoaches(shuffledCoaches);
      } catch (err) {
        console.error('Error fetching coaches:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoaches();
  }, []);

  return { coaches, loading, error };
};

/**
 * Hook برای گرفتن یک کوچ با slug
 * @param {string} slug 
 * @returns {{ coach: Object|null, loading: boolean, error: Error|null }}
 */
export const useCoachBySlug = (slug) => {
  const [coach, setCoach] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    const fetchCoach = async () => {
      try {
        setLoading(true);
        
        const { data, error: fetchError } = await supabase
          .from('v2_coaches')
          .select('*')
          .eq('slug', slug)
          .eq('is_active', true)
          .single();

        if (fetchError) throw fetchError;

        if (data) {
          setCoach(normalizeCoach(data));
        }
      } catch (err) {
        console.error('Error fetching coach:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoach();
  }, [slug]);

  return { coach, loading, error };
};
