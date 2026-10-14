import { sanityClient, urlFor } from './sanity';
import type { Article } from './coaches';
import { toFa } from './format';

const SITE_URL = 'https://bloomiaclub.com';

const dateFormatter = new Intl.DateTimeFormat('fa-IR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

/**
 * Real articles written by this coach in the Sanity blog.
 * Authors of coach articles are stored as `coach-<slug>` documents, so we match on the author slug.
 */
function withTimeout<T>(promise: Promise<T>, ms = 3000): Promise<T> {
  let timer: NodeJS.Timeout;
  const timeoutPromise = new Promise<T>((_, reject) => {
    timer = setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms);
  });
  return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timer));
}

export async function getCoachArticles(slug: string, limit = 3): Promise<Article[]> {
  if (!slug) return [];

  try {
    const posts = await withTimeout(
      sanityClient.fetch(
        `*[_type == "post" && status == "published" && author->slug.current == $slug]
          | order(publishedAt desc)[0...$limit] {
          _id,
          title,
          "slug": slug.current,
          excerpt,
          mainImage,
          estimatedReadTime,
          publishedAt
        }`,
        { slug, limit }
      ),
      3000
    );

    if (!Array.isArray(posts)) return [];

    return posts.map((post: any): Article => {
      let imageUrl: string | undefined;
      try {
        imageUrl = post.mainImage ? urlFor(post.mainImage)?.width(1400).fit('max').auto('format').url() : undefined;
      } catch {
        imageUrl = undefined;
      }

      return {
        id: post._id,
        title: post.title,
        excerpt: post.excerpt || undefined,
        imageUrl,
        date: post.publishedAt ? dateFormatter.format(new Date(post.publishedAt)) : '',
        readTime: `${toFa(post.estimatedReadTime || 5)} دقیقه`,
        href: `${SITE_URL}/blog/${post.slug}`,
      };
    });
  } catch (error) {
    console.warn(`Could not fetch articles for coach [${slug}] from Sanity:`, error);
    return [];
  }
}
