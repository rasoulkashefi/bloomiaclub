import { sanityClient, urlFor } from './sanity';

export interface BlogPostSummary {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  publishedAt: string;
  estimatedReadTime?: number;
  category?: string;
  authorName?: string;
  authorImage?: string;
}

export const fallbackPosts: BlogPostSummary[] = [
  {
    id: 'p1',
    slug: 'what-is-coaching-guide',
    title: 'کوچینگ چیست و چرا برای هر فرد شاغل ضروری است؟',
    excerpt: 'بررسی تفاوت‌های کلیدی کوچینگ، مشاوره و روان‌درمانی و نحوه استفاده از آن برای پیشرفت شغلی.',
    imageUrl: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=1200&auto=format&fit=crop',
    publishedAt: '2025-01-15',
    estimatedReadTime: 6,
    category: 'مفاهیم کوچینگ',
    authorName: 'تیم تحریریه بلومیا',
    authorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 'p2',
    slug: 'overcome-imposter-syndrome',
    title: 'چگونه سندروم ایمپاستر را مهار کنیم و ارزش خود را باور کنیم؟',
    excerpt: 'راهکارهای عملی برای کارآفرینان و متخصصانی که توانمندی‌های واقعی خود را دست‌کم می‌گیرند.',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop',
    publishedAt: '2025-02-01',
    estimatedReadTime: 8,
    category: 'رشد فردی',
    authorName: 'آرزو مرادی',
    authorImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 'p3',
    slug: 'career-growth-plateau',
    title: 'وقتی در مسیر شغلی متوقف می‌شوید، چه گامی باید بردارید؟',
    excerpt: 'شناسایی نشانه‌های فلات شغلی و تکنیک‌های تغییر جهت هوشمندانه به سمت موقعیت‌های رهبری.',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop',
    publishedAt: '2025-02-20',
    estimatedReadTime: 5,
    category: 'مسیر شغلی',
    authorName: 'رضا احمدی',
    authorImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop',
  },
];

export async function getLatestPosts(count = 3): Promise<BlogPostSummary[]> {
  try {
    const query = `*[_type == "post" && status == "published"] | order(publishedAt desc)[0...${count}] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      mainImage,
      estimatedReadTime,
      publishedAt,
      author->{
        name,
        image
      },
      category->{
        title
      }
    }`;

    const data = await sanityClient.fetch(query);

    if (!data || data.length === 0) {
      return fallbackPosts.slice(0, count);
    }

    return data.map((item: any) => {
      let imgUrl = 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=1200&auto=format&fit=crop';
      if (item.mainImage) {
        try {
          imgUrl = urlFor(item.mainImage).width(1200).url();
        } catch {
          // fallback
        }
      }

      let authorImg = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop';
      if (item.author?.image) {
        try {
          authorImg = urlFor(item.author.image).width(200).url();
        } catch {
          // fallback
        }
      }

      return {
        id: item._id,
        slug: item.slug || item._id,
        title: item.title,
        excerpt: item.excerpt || '',
        imageUrl: imgUrl,
        publishedAt: item.publishedAt || new Date().toISOString(),
        estimatedReadTime: item.estimatedReadTime || 5,
        category: item.category?.title || 'کوچینگ و رشد',
        authorName: item.author?.name || 'تحریریه بلومیا',
        authorImage: authorImg,
      };
    });
  } catch (err) {
    console.error('Error fetching Sanity posts:', err);
    return fallbackPosts.slice(0, count);
  }
}
