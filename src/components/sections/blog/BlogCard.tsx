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
    <article className="group flex flex-col bg-brand-surface rounded-3xl overflow-hidden border border-brand-neutral-200/80 shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1">
      {/* Cover Image & Category Pill */}
      <Link href={`/blog/${post.slug}`} className="relative aspect-16/10 w-full overflow-hidden bg-brand-neutral-100 block">
        <Image
          src={post.imageUrl}
          alt={post.imageAlt || post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-104 transition-transform duration-500 ease-out"
        />
        <div className="absolute top-4 right-4 z-10">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-brand-surface-paper/95 backdrop-blur-md text-brand-teal-900 shadow-soft-sm border border-brand-neutral-200/40">
            {post.category}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 sm:p-6 justify-between gap-5">
        <div className="space-y-3">
          {/* Metadata */}
          <div className="flex items-center gap-3 text-xs text-brand-neutral-500">
            <span>{formattedDate}</span>
            <span className="w-1 h-1 rounded-full bg-brand-neutral-300" />
            <div className="flex items-center gap-1 text-brand-neutral-600 font-medium">
              <Clock className="w-3.5 h-3.5 text-brand-teal-700" />
              <span>{post.estimatedReadTime} دقیقه</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-base sm:text-lg font-bold text-brand-neutral-900 group-hover:text-brand-teal-800 transition-colors line-clamp-2 leading-snug">
            <Link href={`/blog/${post.slug}`}>
              {post.title}
            </Link>
          </h3>

          {/* Excerpt */}
          <p className="text-xs sm:text-sm text-brand-neutral-600 line-clamp-2 leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        {/* Footer: Author & Read Link */}
        <div className="pt-4 border-t border-brand-neutral-200/60 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-brand-neutral-200 shrink-0 border border-brand-neutral-200">
              <Image
                src={post.authorImage || '/images/default-avatar.png'}
                alt={post.authorName}
                fill
                sizes="32px"
                className="object-cover"
              />
            </div>
            {post.coachSlug ? (
              <Link
                href={`/coaches/${post.coachSlug}`}
                className="text-xs font-semibold text-brand-neutral-800 hover:text-brand-teal-800 transition-colors truncate"
                title={`مشاهده پروفایل کوچ ${post.authorName}`}
              >
                {post.authorName}
              </Link>
            ) : (
              <span className="text-xs font-semibold text-brand-neutral-700 truncate">
                {post.authorName}
              </span>
            )}
          </div>

          <Link
            href={`/blog/${post.slug}`}
            className="w-8 h-8 rounded-full bg-brand-teal-50 group-hover:bg-brand-teal-900 group-hover:text-white text-brand-teal-900 flex items-center justify-center transition-all shrink-0"
            aria-label={`مطالعه مقاله ${post.title}`}
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
};
