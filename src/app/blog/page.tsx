import React from 'react';
import type { Metadata } from 'next';
import { getAllPosts, getFeaturedPost, getAllCategories } from '@/lib/posts';
import { BlogHeroSection } from '@/components/sections/blog/BlogHeroSection';
import { BlogFeaturedSection } from '@/components/sections/blog/BlogFeaturedSection';
import { BlogExplorerSection } from '@/components/sections/blog/BlogExplorerSection';
import { BlogNewsletterCtaSection } from '@/components/sections/blog/BlogNewsletterCtaSection';

export const revalidate = 3600; // ISR 1 hour

export const metadata: Metadata = {
  title: 'وبلاگ و مقالات تخصصی رشد فردی و کوچینگ | بلومیا کلاب',
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
        url: 'https://bloomiaclub.com/images/bloomia-club-logo.webp',
        width: 1200,
        height: 630,
        alt: 'وبلاگ بلومیا کلاب',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'وبلاگ تخصصی کوچینگ | بلومیا کلاب',
    description: 'مقالات تحلیلی و راهکارهای کاربردی برای رشد فردی و شکوفایی شغلی.',
  },
};

export default async function BlogPage() {
  const [allPosts, featuredPost, categories] = await Promise.all([
    getAllPosts(),
    getFeaturedPost(),
    getAllCategories(),
  ]);

  // Remove the featured post from the main explorer list if present, to avoid duplication
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
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-brand-surface" dir="rtl">
        <BlogHeroSection />
        <BlogFeaturedSection post={featuredPost} />
        <BlogExplorerSection posts={regularPosts} categories={categories} />
        <BlogNewsletterCtaSection />
      </main>
    </>
  );
}
