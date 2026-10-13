import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlug, getRelatedPosts, getAllPostSlugs } from '@/lib/posts';
import { PortableTextRenderer } from '@/components/blog/PortableTextRenderer';
import { BlogPostHeaderSection } from '@/components/sections/blog-post/BlogPostHeaderSection';
import { BlogPostCoverSection } from '@/components/sections/blog-post/BlogPostCoverSection';
import { BlogPostQuickAnswerSection } from '@/components/sections/blog-post/BlogPostQuickAnswerSection';
import { BlogPostAuthorSection } from '@/components/sections/blog-post/BlogPostAuthorSection';
import { BlogPostShareSection } from '@/components/sections/blog-post/BlogPostShareSection';
import { BlogPostRelatedSection } from '@/components/sections/blog-post/BlogPostRelatedSection';

export const revalidate = 3600; // ISR 1 hour

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'مقاله یافت نشد | بلومیا کلاب',
    };
  }

  const title = post.metaTitle || `${post.title} | بلومیا کلاب`;
  const description = post.metaDescription || post.excerpt;
  const canonicalUrl = post.canonicalUrl || `https://bloomiaclub.com/blog/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'بلومیا کلاب',
      locale: 'fa_IR',
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.authorName],
      images: [
        {
          url: post.imageUrl,
          width: 1200,
          height: 675,
          alt: post.imageAlt || post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [post.imageUrl],
    },
    keywords: post.keywords && post.keywords.length > 0 ? post.keywords : undefined,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.categorySlug, post.slug, 3);
  const currentUrl = `https://bloomiaclub.com/blog/${post.slug}`;

  // Article JSON-LD Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    image: [post.imageUrl],
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': currentUrl,
    },
    author: {
      '@type': 'Person',
      name: post.authorName,
      description: post.authorBio || undefined,
      url: post.coachSlug ? `https://bloomiaclub.com/coaches/${post.coachSlug}` : undefined,
    },
    publisher: {
      '@type': 'Organization',
      name: 'بلومیا کلاب',
      url: 'https://bloomiaclub.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://bloomiaclub.com/images/bloomia-club-logo.webp',
      },
    },
    inLanguage: 'fa-IR',
  };

  // Breadcrumb JSON-LD Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
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
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: currentUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="min-h-screen bg-brand-surface pb-16" dir="rtl">
        <article>
          {/* Header */}
          <BlogPostHeaderSection post={post} />

          {/* Cover Image */}
          <BlogPostCoverSection post={post} />

          {/* GEO Quick Answer Box */}
          <BlogPostQuickAnswerSection answer={post.aiQuickAnswer} />

          {/* Article Rich Text Body */}
          <div className="max-w-3xl mx-auto px-4 sm:px-6 my-8">
            <PortableTextRenderer value={post.body} />
          </div>

          {/* Share */}
          <BlogPostShareSection title={post.title} url={currentUrl} />

          {/* Author Box with Coach booking link */}
          <BlogPostAuthorSection post={post} />
        </article>

        {/* Related Articles */}
        <BlogPostRelatedSection relatedPosts={relatedPosts} />
      </main>
    </>
  );
}
