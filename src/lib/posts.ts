import { sanityClient, urlFor } from './sanity';

export interface BlogAuthor {
  name: string;
  slug?: string;
  coachSlug?: string | null;
  isCoach?: boolean;
  jobTitle?: string | null;
  bio?: string | null;
  imageUrl?: string | null;
}

export interface BlogCategory {
  title: string;
  slug: string;
  color?: string;
  count?: number;
}

export interface BlogPostSummary {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  imageAlt?: string;
  publishedAt: string;
  estimatedReadTime: number;
  category: string;
  categorySlug?: string;
  authorName: string;
  authorSlug?: string;
  authorImage?: string;
  coachSlug?: string | null;
  isCoach?: boolean;
  isFeatured?: boolean;
}

export interface BlogPostDetail extends BlogPostSummary {
  body: any[];
  aiQuickAnswer?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  canonicalUrl?: string | null;
  keywords?: string[] | null;
  authorBio?: string | null;
  authorJobTitle?: string | null;
  imageCaption?: string | null;
  focusEntity?: string | null;
}

const resolveImageUrl = (source: any, width = 1200, height = 750): string => {
  if (!source) return 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=1200&auto=format&fit=crop';
  if (typeof source === 'string') return source;
  try {
    const builder = urlFor(source);
    if (builder) {
      return builder.width(width).height(height).fit('crop').auto('format').url();
    }
  } catch {
    // fallback
  }
  return 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=1200&auto=format&fit=crop';
};

const resolveAuthorImageUrl = (source: any): string => {
  if (!source) return 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop';
  if (typeof source === 'string') return source;
  try {
    const builder = urlFor(source);
    if (builder) {
      return builder.width(200).height(200).fit('crop').auto('format').url();
    }
  } catch {
    // fallback
  }
  return 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop';
};

export const fallbackPosts: BlogPostSummary[] = [];

const POST_SUMMARY_PROJECTION = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  mainImage,
  estimatedReadTime,
  publishedAt,
  isFeatured,
  author->{
    name,
    "slug": slug.current,
    coachSlug,
    isCoach,
    image
  },
  category->{
    title,
    "slug": slug.current,
    color
  }
`;

function mapPostSummary(item: any): BlogPostSummary {
  return {
    id: item._id,
    slug: item.slug || item._id,
    title: item.title || '',
    excerpt: item.excerpt || '',
    imageUrl: resolveImageUrl(item.mainImage),
    imageAlt: item.mainImage?.alt || item.title || 'مقاله بلومیا کلاب',
    publishedAt: item.publishedAt || new Date().toISOString(),
    estimatedReadTime: item.estimatedReadTime || 5,
    category: item.category?.title || 'رشد فردی و کوچینگ',
    categorySlug: item.category?.slug || undefined,
    authorName: item.author?.name || 'تحریریه بلومیا',
    authorSlug: item.author?.slug || undefined,
    authorImage: resolveAuthorImageUrl(item.author?.image),
    coachSlug: item.author?.coachSlug || (item.author?.isCoach ? item.author?.slug : null) || null,
    isCoach: Boolean(item.author?.isCoach || item.author?.coachSlug),
    isFeatured: Boolean(item.isFeatured),
  };
}

/**
 * Fetch latest published posts for homepage or archive widgets
 */
export async function getLatestPosts(count = 3): Promise<BlogPostSummary[]> {
  try {
    const query = `*[_type == "post" && status == "published"] | order(publishedAt desc)[0...${count}] {
      ${POST_SUMMARY_PROJECTION}
    }`;
    const data = await sanityClient.fetch(query);
    if (!data || data.length === 0) return fallbackPosts.slice(0, count);
    return data.map(mapPostSummary);
  } catch (err) {
    console.error('Error fetching latest Sanity posts:', err);
    return fallbackPosts.slice(0, count);
  }
}

/**
 * Fetch all published posts ordered by published date descending
 */
export async function getAllPosts(): Promise<BlogPostSummary[]> {
  try {
    const query = `*[_type == "post" && status == "published"] | order(publishedAt desc) {
      ${POST_SUMMARY_PROJECTION}
    }`;
    const data = await sanityClient.fetch(query);
    if (!data || data.length === 0) return fallbackPosts;
    return data.map(mapPostSummary);
  } catch (err) {
    console.error('Error fetching all Sanity posts:', err);
    return fallbackPosts;
  }
}

/**
 * Fetch featured post (or latest if none explicitly marked featured)
 */
export async function getFeaturedPost(): Promise<BlogPostSummary | null> {
  try {
    // First try explicitly marked featured
    const queryFeatured = `*[_type == "post" && status == "published" && isFeatured == true] | order(publishedAt desc)[0] {
      ${POST_SUMMARY_PROJECTION}
    }`;
    let data = await sanityClient.fetch(queryFeatured);

    // Fallback to most recent
    if (!data) {
      const queryLatest = `*[_type == "post" && status == "published"] | order(publishedAt desc)[0] {
        ${POST_SUMMARY_PROJECTION}
      }`;
      data = await sanityClient.fetch(queryLatest);
    }

    return data ? mapPostSummary(data) : fallbackPosts[0] || null;
  } catch (err) {
    console.error('Error fetching featured Sanity post:', err);
    return fallbackPosts[0] || null;
  }
}

/**
 * Fetch distinct categories with count of published articles
 */
export async function getAllCategories(): Promise<BlogCategory[]> {
  try {
    const query = `*[_type == "category"] {
      title,
      "slug": slug.current,
      color,
      "count": count(*[_type == "post" && references(^._id) && status == "published"])
    } | order(count desc)`;

    const data = await sanityClient.fetch(query);
    return (data || []).filter((c: any) => c.count > 0);
  } catch (err) {
    console.error('Error fetching categories:', err);
    return [];
  }
}

/**
 * Fetch single article detail by slug with full PortableText body and metadata
 */
export async function getPostBySlug(slug: string): Promise<BlogPostDetail | null> {
  if (!slug) return null;

  try {
    const query = `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      mainImage,
      estimatedReadTime,
      publishedAt,
      isFeatured,
      body,
      metaTitle,
      metaDescription,
      canonicalUrl,
      keywords,
      aiQuickAnswer,
      focusEntity,
      author->{
        name,
        "slug": slug.current,
        coachSlug,
        isCoach,
        jobTitle,
        bio,
        image
      },
      category->{
        title,
        "slug": slug.current,
        color
      }
    }`;

    const data = await sanityClient.fetch(query, { slug });
    if (!data) return null;

    const summary = mapPostSummary(data);

    return {
      ...summary,
      body: Array.isArray(data.body) ? data.body : [],
      aiQuickAnswer: data.aiQuickAnswer || null,
      metaTitle: data.metaTitle || data.title,
      metaDescription: data.metaDescription || data.excerpt,
      canonicalUrl: data.canonicalUrl || `https://bloomiaclub.com/blog/${slug}`,
      keywords: Array.isArray(data.keywords) ? data.keywords : [],
      authorBio: data.author?.bio || null,
      authorJobTitle: data.author?.jobTitle || null,
      imageCaption: data.mainImage?.caption || null,
      focusEntity: data.focusEntity || null,
    };
  } catch (err) {
    console.error(`Error fetching post by slug [${slug}]:`, err);
    return null;
  }
}

/**
 * Fetch 3 related posts in the same category or by the same author
 */
export async function getRelatedPosts(categorySlug?: string, currentSlug?: string, count = 3): Promise<BlogPostSummary[]> {
  try {
    let query = '';
    if (categorySlug) {
      query = `*[_type == "post" && status == "published" && slug.current != $currentSlug && category->slug.current == $categorySlug] | order(publishedAt desc)[0...${count}] {
        ${POST_SUMMARY_PROJECTION}
      }`;
      const data = await sanityClient.fetch(query, { currentSlug: currentSlug || '', categorySlug });
      if (data && data.length > 0) return data.map(mapPostSummary);
    }

    // Fallback: any other published posts
    query = `*[_type == "post" && status == "published" && slug.current != $currentSlug] | order(publishedAt desc)[0...${count}] {
      ${POST_SUMMARY_PROJECTION}
    }`;
    const fallbackData = await sanityClient.fetch(query, { currentSlug: currentSlug || '' });
    return (fallbackData || []).map(mapPostSummary);
  } catch (err) {
    console.error('Error fetching related posts:', err);
    return [];
  }
}

/**
 * Get all slugs for generateStaticParams
 */
export async function getAllPostSlugs(): Promise<{ slug: string }[]> {
  try {
    const query = `*[_type == "post" && status == "published"] { "slug": slug.current }`;
    const data = await sanityClient.fetch(query);
    return (data || []).filter((d: any) => Boolean(d.slug));
  } catch (err) {
    console.error('Error fetching post slugs:', err);
    return [];
  }
}
