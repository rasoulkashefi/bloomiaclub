import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, ArrowLeft } from 'lucide-react';
import { BlogPostSummary } from '@/lib/posts';

interface BlogCardProps {
  post: BlogPostSummary;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="group flex flex-col h-full bg-brand-surface-paper rounded-3xl overflow-hidden border border-brand-neutral-200/90 shadow-soft hover:shadow-elevated hover:border-brand-teal-300/60 transition-all duration-300 hover:-translate-y-1.5">
      {/* Cover Image & Category Pill */}
      <Link
        href={`/blog/${post.slug}`}
        className="relative aspect-[16/10] w-full overflow-hidden bg-brand-neutral-100 block shrink-0"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={post.imageUrl}
          alt={post.imageAlt || post.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/5 opacity-40 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none" />
        <div className="absolute top-3.5 right-3.5 z-10">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-brand-surface-paper/95 backdrop-blur-md text-brand-teal-900 shadow-soft-sm border border-brand-neutral-200/50">
            {post.category}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 sm:p-6 justify-between gap-5">
        <div className="space-y-3">
          {/* Metadata */}
          <div className="flex items-center gap-2.5 text-xs text-brand-neutral-500 font-medium">
            <span>{formattedDate}</span>
            <span className="w-1 h-1 rounded-full bg-brand-neutral-300" />
            <div className="flex items-center gap-1.5 text-brand-neutral-600">
              <Clock className="w-3.5 h-3.5 text-brand-teal-700 shrink-0" />
              <span>{post.estimatedReadTime} دقیقه مطالعه</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-base sm:text-lg font-bold text-brand-neutral-900 group-hover:text-brand-teal-800 transition-colors line-clamp-2 leading-snug">
            <Link href={`/blog/${post.slug}`} className="touch-auto">
              {post.title}
            </Link>
          </h3>

          {/* Excerpt */}
          <p className="text-xs sm:text-sm text-brand-neutral-600 line-clamp-2 leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        {/* Footer: Author & Read Link */}
        <div className="pt-4 border-t border-brand-neutral-200/70 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative w-9 h-9 rounded-full overflow-hidden bg-brand-neutral-100 shrink-0 border border-brand-neutral-200 shadow-soft-sm">
              <Image
                src={post.authorImage || '/images/default-avatar.png'}
                alt={post.authorName}
                fill
                sizes="36px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex flex-col justify-center">
              {post.coachSlug ? (
                <Link
                  href={`/coaches/${post.coachSlug}`}
                  className="text-xs font-bold text-brand-neutral-900 hover:text-brand-teal-800 transition-colors truncate block touch-auto"
                  title={`مشاهده پروفایل کوچ ${post.authorName}`}
                >
                  {post.authorName}
                </Link>
              ) : (
                <span className="text-xs font-bold text-brand-neutral-900 truncate block">
                  {post.authorName}
                </span>
              )}
              <span className="text-[11px] text-brand-teal-700 font-medium truncate block">
                {post.isCoach ? 'کوچ تخصصی بلومیا' : 'تحریریه بلومیا'}
              </span>
            </div>
          </div>

          <Link
            href={`/blog/${post.slug}`}
            className="w-9 h-9 rounded-full bg-brand-teal-50 group-hover:bg-brand-teal-900 group-hover:text-white text-brand-teal-900 flex items-center justify-center transition-all duration-300 shrink-0 shadow-soft-sm group-hover:shadow-soft"
            aria-label={`مطالعه مقاله ${post.title}`}
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
};
