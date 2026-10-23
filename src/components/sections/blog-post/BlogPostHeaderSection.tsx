import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Calendar } from 'lucide-react';
import { BlogPostDetail } from '@/lib/posts';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';

interface BlogPostHeaderSectionProps {
  post: BlogPostDetail;
}

export const BlogPostHeaderSection: React.FC<BlogPostHeaderSectionProps> = ({ post }) => {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="pt-8 sm:pt-12 pb-6 max-w-4xl mx-auto px-4 sm:px-6">
      {/* Breadcrumbs (Strictly single line) */}
      <Breadcrumbs
        className="mb-6"
        items={[
          { label: 'صفحه اصلی', href: '/' },
          { label: 'وبلاگ', href: '/blog' },
          { label: post.title },
        ]}
      />

      {/* Category Pill */}
      <div className="mb-4">
        <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold bg-brand-teal-50 text-brand-teal-900 border border-brand-teal-200/80">
          {post.category}
        </span>
      </div>

      {/* H1 Main Article Title */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-brand-neutral-900 tracking-tight leading-[1.3] sm:leading-[1.3] mb-6">
        {post.title}
      </h1>

      {/* Lead Excerpt */}
      <p className="text-base sm:text-lg md:text-xl text-brand-neutral-600 leading-relaxed font-normal mb-8 pb-6 border-b border-brand-neutral-200">
        {post.excerpt}
      </p>

      {/* Author & Publication Meta */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs sm:text-sm text-brand-neutral-500">
        {/* Author info */}
        <div className="flex items-center gap-3">
          <div className="relative w-11 h-11 rounded-full overflow-hidden bg-brand-neutral-200 shrink-0 border border-brand-neutral-200">
            <Image
              src={post.authorImage || '/images/default-avatar.png'}
              alt={post.authorName}
              fill
              sizes="44px"
              className="object-cover"
            />
          </div>
          <div>
            <div className="text-xs text-brand-neutral-500">نویسنده مقاله:</div>
            {post.coachSlug ? (
              <Link
                href={`/coaches/${post.coachSlug}`}
                className="font-bold text-sm text-brand-neutral-900 hover:text-brand-teal-800 transition-colors inline-flex items-center gap-1"
                title={`مشاهده صفحه اختصاصی کوچ ${post.authorName}`}
              >
                <span>{post.authorName}</span>
                <span className="text-xs font-normal text-brand-teal-700 bg-brand-teal-50 px-2 py-0.5 rounded-full border border-brand-teal-200/60">
                  کوچ رسمی بلومیا
                </span>
              </Link>
            ) : (
              <span className="font-bold text-sm text-brand-neutral-900">{post.authorName}</span>
            )}
          </div>
        </div>

        {/* Date & Read time */}
        <div className="flex items-center gap-4 text-xs sm:text-sm text-brand-neutral-500 pt-2 sm:pt-0">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-brand-teal-700" />
            <span>{formattedDate}</span>
          </div>
          <span className="w-1 h-1 rounded-full bg-brand-neutral-300" />
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-brand-teal-700" />
            <span>{post.estimatedReadTime} دقیقه مطالعه</span>
          </div>
        </div>
      </div>
    </header>
  );
};
