import React from 'react';
import type { Metadata } from 'next';
import { getAllPosts, getFeaturedPost, getAllCategories } from '@/lib/posts';
import { getCoachBySlug } from '@/lib/coaches';
import { BlogHeroSection } from '@/components/sections/blog/BlogHeroSection';
import { BlogFeaturedSection } from '@/components/sections/blog/BlogFeaturedSection';
import { BlogExplorerSection } from '@/components/sections/blog/BlogExplorerSection';
import { BlogNewsletterCtaSection } from '@/components/sections/blog/BlogNewsletterCtaSection';
import { CoachArticlesSection } from '@/components/sections/blog/CoachArticlesSection';

export const revalidate = 3600; // ISR 1 hour

interface BlogPageProps {
  searchParams?: Promise<{ coach?: string; author?: string; search?: string; q?: string }>;
}

export async function generateMetadata({ searchParams }: BlogPageProps): Promise<Metadata> {
  const resolvedParams = searchParams ? await searchParams : {};
  const coachParam = resolvedParams.coach || resolvedParams.author;

  if (coachParam) {
    const coachDisplayName = coachParam === 'fatemeh_esmaeeli' ? 'فاطمه اسماعیلی' : coachParam;
    return {
      title: `مقالات تخصصی کوچ ${coachDisplayName} | وبلاگ بلومیا کلاب`,
      description: `مجموعه یادداشت‌ها و مقالات تخصصی رشد فردی و کوچینگ به قلم کوچ ${coachDisplayName} در بلومیا کلاب.`,
      alternates: {
        canonical: `https://bloomiaclub.com/blog?coach=${coachParam}`,
      },
    };
  }

  return {
    title: 'وبلاگ و مقالات تخصصی رشد فردی و کوچینگ',
    description:
      'مجموعه مقالات تخصصی، متدهای علمی و راهنماهای کاربردی پیرامون کوچینگ، خودشناسی، مسیر شغلی، مدیریت زمان و والدگری آگاهانه توسط کوچ‌های معتبر بلومیا کلاب.',
    alternates: {
      canonical: 'https://bloomiaclub.com/blog',
    },
    openGraph: {
      title: 'وبلاگ تخصصی کوچینگ و توسعه فردی | بلومیا کلاب',
      description:
        'مقالات تحلیلی و راهکارهای کاربردی برای وضوح ذهنی، تعادل زندگی و موفقیت در کسب‌وکار با همراهی کوچ‌های حرفه‌ای.',
      url: 'https://bloomiaclub.com/blog',
      siteName: 'بلومیا کلاب',
      locale: 'fa_IR',
      type: 'website',
      images: [
        {
          url: '/images/og-blog.jpg',
          width: 1200,
          height: 630,
          type: 'image/jpeg',
          alt: 'وبلاگ و مقالات تخصصی رشد فردی و کوچینگ بلومیا کلاب',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'وبلاگ تخصصی کوچینگ | بلومیا کلاب',
      description: 'مقالات تحلیلی و راهکارهای کاربردی برای رشد فردی و شکوفایی شغلی.',
      images: ['/images/og-blog.jpg'],
    },
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const resolvedParams = searchParams ? await searchParams : {};
  const coachParam = resolvedParams.coach || resolvedParams.author || '';

  const [allPosts, featuredPost, categories, coach] = await Promise.all([
    getAllPosts(),
    getFeaturedPost(),
    getAllCategories(),
    coachParam ? getCoachBySlug(coachParam) : Promise.resolve(null),
  ]);

  // When a coach filter is active, present the dedicated, minimal coach articles view
  if (coachParam) {
    const coachPosts = allPosts.filter(
      (p) =>
        p.coachSlug === coachParam ||
        p.authorSlug === coachParam ||
        (coachParam === 'fatemeh_esmaeeli' &&
          (p.authorName.includes('اسماعیلی') || p.slug.includes('fatemeh')))
    );

    const coachName = coach?.name || (coachParam === 'fatemeh_esmaeeli' ? 'فاطمه اسماعیلی' : coachParam);

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: `مقالات تخصصی کوچ ${coachName} - بلومیا کلاب`,
      description: `مجموعه یادداشت‌ها و مقالات آموزشی تخصصی به قلم کوچ ${coachName}`,
      url: `https://bloomiaclub.com/blog?coach=${coachParam}`,
      inLanguage: 'fa-IR',
      publisher: {
        '@type': 'Organization',
        name: 'بلومیا کلاب',
        url: 'https://bloomiaclub.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://bloomiaclub.com/images/bloomia-club-logo.webp',
        },
      },
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <main className="min-h-screen bg-[#fafaf8]" dir="rtl">
          <CoachArticlesSection
            coach={coach}
            coachSlug={coachParam}
            posts={coachPosts}
          />
        </main>
      </>
    );
  }

  // Normal general blog page (with category tabs, search, and general featured article)
  const regularPosts = featuredPost
    ? allPosts.filter((p) => p.slug !== featuredPost.slug)
    : allPosts;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'وبلاگ بلومیا کلاب',
    description: 'مقالات و آموزش‌های تخصصی کوچینگ، خودشناسی و رشد حرفه‌ای',
    url: 'https://bloomiaclub.com/blog',
    inLanguage: 'fa-IR',
    publisher: {
      '@type': 'Organization',
      name: 'بلومیا کلاب',
      url: 'https://bloomiaclub.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://bloomiaclub.com/images/bloomia-club-logo.webp',
      },
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'صفحه اصلی',
          item: 'https://bloomiaclub.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'وبلاگ',
          item: 'https://bloomiaclub.com/blog',
        },
      ],
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: allPosts.length,
      itemListElement: allPosts.slice(0, 25).map((post, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        item: {
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.excerpt,
          url: `https://bloomiaclub.com/blog/${post.slug}`,
          image: post.imageUrl || undefined,
          datePublished: post.publishedAt,
          author: {
            '@type': 'Person',
            name: post.authorName,
          },
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-brand-surface" dir="rtl">
        <BlogHeroSection />
        {featuredPost && <BlogFeaturedSection post={featuredPost} />}
        <BlogExplorerSection posts={regularPosts} categories={categories} />
        <BlogNewsletterCtaSection />
      </main>
    </>
  );
}
