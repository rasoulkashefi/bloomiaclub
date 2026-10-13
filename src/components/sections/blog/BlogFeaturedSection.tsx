import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, ArrowLeft, Bookmark } from 'lucide-react';
import { BlogPostSummary } from '@/lib/posts';

interface BlogFeaturedSectionProps {
  post: BlogPostSummary | null;
}

export const BlogFeaturedSection: React.FC<BlogFeaturedSectionProps> = ({ post }) => {
  if (!post) return null;

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <section className="py-10 sm:py-14 bg-brand-surface border-b border-brand-neutral-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-brand-surface-paper border border-brand-neutral-200 shadow-soft hover:shadow-elevated transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Image Col (7 cols on lg, top on mobile) */}
            <div className="relative aspect-16/10 lg:aspect-auto lg:col-span-7 min-h-[260px] sm:min-h-[360px] lg:min-h-[440px] overflow-hidden bg-brand-neutral-100">
              <Image
                src={post.imageUrl}
                alt={post.imageAlt || post.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-transform duration-700 hover:scale-103"
              />
              <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-brand-teal-900 text-white shadow-soft">
                  <Bookmark className="w-3.5 h-3.5 text-brand-teal-300" />
                  <span>مقاله ویژه تحریریه</span>
                </span>
              </div>
            </div>

            {/* Content Col (5 cols on lg) */}
            <div className="p-6 sm:p-8 lg:p-10 lg:col-span-5 flex flex-col justify-between gap-6">
              <div className="space-y-4">
                {/* Meta */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-brand-neutral-500">
                  <span className="px-2.5 py-1 rounded-full bg-brand-teal-50 text-brand-teal-900 font-bold border border-brand-teal-200/60">
                    {post.category}
                  </span>
                  <span>{formattedDate}</span>
                  <span className="w-1 h-1 rounded-full bg-brand-neutral-300" />
                  <div className="flex items-center gap-1 font-medium text-brand-neutral-600">
                    <Clock className="w-3.5 h-3.5 text-brand-teal-700" />
                    <span>{post.estimatedReadTime} دقیقه مطالعه</span>
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-brand-neutral-900 hover:text-brand-teal-800 transition-colors leading-snug">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>

                {/* Excerpt */}
                <p className="text-sm sm:text-base text-brand-neutral-600 leading-relaxed line-clamp-3 lg:line-clamp-4">
                  {post.excerpt}
                </p>
              </div>

              {/* Author & Action */}
              <div className="pt-5 border-t border-brand-neutral-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-brand-neutral-200 shrink-0 border border-brand-neutral-200">
                    <Image
                      src={post.authorImage || '/images/default-avatar.png'}
                      alt={post.authorName}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div className="text-xs">
                    <div className="text-brand-neutral-500">نویسنده:</div>
                    {post.coachSlug ? (
                      <Link
                        href={`/coaches/${post.coachSlug}`}
                        className="font-bold text-brand-neutral-800 hover:text-brand-teal-800 transition-colors"
                      >
                        {post.authorName}
                      </Link>
                    ) : (
                      <span className="font-bold text-brand-neutral-800">{post.authorName}</span>
                    )}
                  </div>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-brand-teal-900 hover:bg-brand-teal-800 text-white font-bold text-sm shadow-soft transition-all min-h-[44px]"
                >
                  <span>مطالعه مقاله</span>
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
