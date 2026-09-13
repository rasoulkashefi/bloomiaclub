import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const supabaseBaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://qxacvupalbfcoqkuydba.supabase.co';

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

const buildPublicUrls = (value, buckets) => {
  if (!value) return [];
  const cleaned = String(value).trim();
  if (!cleaned) return [];
  if (/^https?:\/\//i.test(cleaned)) return [cleaned];
  if (cleaned.startsWith('/')) return [cleaned];

  const urls = buckets.map((bucket) => resolvePublicUrl(cleaned, bucket));
  return [...new Set(urls.filter(Boolean))];
};

const normalizePost = (post) => {
  const author = post.author || {};

  return {
    id: post.id,
    slug: post.post_slug,
    title: post.title,
    excerpt: post.excerpt || post.summary || '',
    content: post.content || '',
    imageUrl: resolvePublicUrl(post.image_url, 'post_images'),
    imageCandidates: buildPublicUrls(post.image_url, ['post_images', 'posts_images', 'posts', 'blog', 'public']),
    readTimeMinutes: post.read_time_minutes,
    category: post.category,
    createdAt: post.created_at,
    authorName: author.full_name,
    authorAvatar: resolvePublicUrl(author.avatar_url, 'coaches_images'),
    authorSlug: author.slug,
  };
};

export const useLatestPosts = (limit = 3) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const cacheKey = `latest_posts_v1_${limit}`;
    const cacheTtlMs = 5 * 60 * 1000;

    const readCache = () => {
      if (typeof window === 'undefined') return null;
      try {
        const raw = window.localStorage.getItem(cacheKey);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (!parsed || !Array.isArray(parsed.items)) return null;
        if (Date.now() - parsed.savedAt > cacheTtlMs) return null;
        return parsed.items.map(normalizePost);
      } catch (err) {
        return null;
      }
    };

    const writeCache = (items) => {
      if (typeof window === 'undefined') return;
      try {
        window.localStorage.setItem(
          cacheKey,
          JSON.stringify({ savedAt: Date.now(), items })
        );
      } catch (err) {
        // Ignore cache write errors.
      }
    };

    const fetchPosts = async (attempt = 1) => {
      try {
        if (attempt === 1) {
          setLoading(true);
          setError(null);
        }

        const { data, error: fetchError } = await supabase
          .from('posts')
          .select(`
            *,
            author:author_id_v2 (
              full_name,
              avatar_url,
              slug
            )
          `)
          .order('created_at', { ascending: false })
          .limit(limit);

        if (fetchError) throw fetchError;

        const normalized = (data || []).map(normalizePost);
        if (!isMounted) return;
        setPosts(normalized);
        writeCache(data || []);
      } catch (err) {
        if (!isMounted) return;
        if (attempt < 2) {
          setTimeout(() => fetchPosts(attempt + 1), 600);
          return;
        }
        console.error('Error fetching posts:', err);
        setError(err);
      } finally {
        if (!isMounted) return;
        setLoading(false);
      }
    };

    const cached = readCache();
    if (cached && cached.length > 0) {
      setPosts(cached);
      setLoading(false);
    }

    fetchPosts();

    return () => {
      isMounted = false;
    };
  }, [limit]);

  return { posts, loading, error };
};

export const useAllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('posts')
          .select(`
            *,
            author:author_id_v2 (
              full_name,
              avatar_url,
              slug
            )
          `)
          .order('created_at', { ascending: false });

        if (fetchError) throw fetchError;

        setPosts((data || []).map(normalizePost));
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { posts, loading, error };
};

export const usePostsByCoach = (coachId, limit = 2) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!coachId) {
        setPosts([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('posts')
          .select(`
            *,
            author:author_id_v2 (
              full_name,
              avatar_url,
              slug
            )
          `)
          .eq('author_id_v2', coachId)
          .order('created_at', { ascending: false })
          .limit(limit);

        if (fetchError) throw fetchError;

        setPosts((data || []).map(normalizePost));
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [coachId, limit]);

  return { posts, loading, error };
};

export const usePostBySlug = (slug) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        setPost(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('posts')
          .select(`
            *,
            author:author_id_v2 (
              full_name,
              avatar_url,
              slug
            )
          `)
          .eq('post_slug', slug)
          .maybeSingle();

        if (fetchError) throw fetchError;

        setPost(data ? normalizePost(data) : null);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  return { post, loading, error };
};
