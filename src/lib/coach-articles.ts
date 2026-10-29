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
function withTimeout<T>(promise: Promise<T>, ms = 5000): Promise<T> {
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
        slug.includes('saloomeh') || slug.includes('salomeh') ? 'saloomeh_fathijou' : null,
        slug.includes('saloomeh') || slug.includes('salomeh') ? 'saloomeh-fathijou' : null,
        slug.includes('maryam') ? 'maryam_johari' : null,
        slug.includes('maryam') ? 'maryam-johari' : null,
        slug.includes('shabnam') ? 'shabnam_nematimalek' : null,
        slug.includes('shabnam') ? 'shabnam-nematimalek' : null,
        slug.includes('parmiss') ? 'parmiss-yari' : null,
        slug.includes('parmiss') ? 'parmiss_yari' : null,
      ].filter(Boolean) as string[]
    )
  );

  const refIds = [
    ...slugs.map((s) => `coach-${s}`),
    ...slugs.map((s) => `coach-profile-${s}`),
    ...slugs.map((s) => `author-${s}`),
  ];

  try {
    const posts = await withTimeout(
      sanityClient.fetch(
        `*[_type == "post" && (status == "published" || !defined(status)) && (author->slug.current in $slugs || author->coachSlug in $slugs || author._ref in $refIds || author._id in $refIds)]
          | order(publishedAt desc)[0...$limit] {
          _id,
          title,
          "slug": slug.current,
          "category": category->title,
          excerpt,
          mainImage,
          "directImageUrl": mainImage.asset->url,
          estimatedReadTime,
          publishedAt
        }`,
        { slugs, refIds, limit }
      ),
      5000
    );

    if (!Array.isArray(posts)) return [];

    return posts.map((post: any): Article => {
      let imageUrl: string | undefined = post.directImageUrl;
      if (!imageUrl && post.mainImage) {
        try {
          imageUrl = urlFor(post.mainImage)?.width(1400).fit('max').auto('format').url();
        } catch {
          imageUrl = undefined;
        }
      }

      return {
        id: post._id,
        title: post.title,
        excerpt: post.excerpt || undefined,
        imageUrl,
        category: post.category || undefined,
        date: post.publishedAt ? dateFormatter.format(new Date(post.publishedAt)) : '',
        readTime: `${toFa(post.estimatedReadTime || 6)} دقیقه`,
        href: `/blog/${post.slug}`,
      };
    });
  } catch (error) {
    console.warn(`Could not fetch articles for coach [${slug}] from Sanity:`, error);
    return [];
  }
}
