import { sanityClient, urlFor } from './sanity';
import type { Article } from './coaches';
import { toFa } from './format';

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

export async function getCoachArticles(slug: string, limit = 6): Promise<Article[]> {
  if (!slug) return [];

  const slugs = Array.from(
    new Set(
      [
        slug,
        slug.toLowerCase(),
        slug.replace(/_/g, '-'),
        slug.replace(/-/g, '_'),
        slug.includes('mahya') ? 'mahya_shakoori' : null,
        slug.includes('mahya') ? 'mahya_shakouri' : null,
        slug.includes('arezoo') || slug.includes('Arezoo') ? 'Arezoo_Ghaffari' : null,
        slug.includes('arezoo') || slug.includes('Arezoo') ? 'arezoo-ghaffari' : null,
        slug.includes('derakhsh') ? 'fatemeh-derakhsh' : null,
        slug.includes('derakhsh') ? 'fatemeh_derakhsh' : null,
        slug.includes('payam') ? 'payam-esmi' : null,
        slug.includes('payam') ? 'payam_esmi' : null,
      ].filter(Boolean) as string[]
    )
  );

  const refIds = [
    ...slugs.map((s) => `coach-${s}`),
    ...slugs.map((s) => `coach-profile-${s}`),
  ];

  try {
    const posts = await withTimeout(
      sanityClient.fetch(
        `*[_type == "post" && status == "published" && (author->slug.current in $slugs || author->coachSlug in $slugs || author._ref in $refIds)]
          | order(publishedAt desc)[0...$limit] {
          _id,
          title,
          "slug": slug.current,
          excerpt,
          mainImage,
          estimatedReadTime,
          publishedAt
        }`,
        { slugs, refIds, limit }
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
        href: `/blog/${post.slug}`,
      };
    });
  } catch (error) {
    console.warn(`Could not fetch articles for coach [${slug}] from Sanity:`, error);
    return [];
  }
}
