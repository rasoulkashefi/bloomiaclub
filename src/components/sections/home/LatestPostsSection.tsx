import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, ArrowLeft, BookOpen } from 'lucide-react';
import { BlogPostSummary } from '@/lib/posts';

interface LatestPostsSectionProps {
  posts: BlogPostSummary[];
}

export const LatestPostsSection: React.FC<LatestPostsSectionProps> = ({ posts }) => {
  return (
    <section className="py-16 md:py-24 bg-brand-surface-paper border-b border-brand-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with View All link on desktop */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-teal-50 text-brand-teal-900 text-xs font-semibold border border-brand-teal-200">
              <BookOpen className="w-3.5 h-3.5 text-brand-teal-700" />
              <span>وبلاگ و آموزش‌های تحلیلی بلومیا</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-neutral-900 tracking-tight">
              آخرین مقالات و بینش‌های رشد
            </h2>
            <p className="text-sm sm:text-base text-brand-neutral-600 leading-relaxed">
              راهنماهای کاربردی و متدهای روز دنیا برای دستیابی به وضوح ذهنی، تعادل زندگی و موفقیت در کسب‌وکار.
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden md:inline-flex items-center gap-2 text-brand-teal-900 hover:text-brand-teal-700 font-bold text-sm transition-colors shrink-0"
          >
            <span>مشاهده همه مقالات</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        {/* 3 Post Cards Grid: 1 col on mobile, 3 on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {posts.map((post) => {
            const formattedDate = new Date(post.publishedAt).toLocaleDateString('fa-IR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });

            return (
              <article
                key={post.id}
                className="group flex flex-col bg-brand-surface rounded-3xl overflow-hidden border border-brand-neutral-200/80 shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image & Category */}
                <div className="relative aspect-16/10 w-full overflow-hidden bg-brand-neutral-100">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {post.category && (
                    <span className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-brand-teal-950/80 backdrop-blur-xs text-white text-xs font-semibold">
                      {post.category}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    {/* Meta info */}
                    <div className="flex items-center gap-3 text-xs text-brand-neutral-500 font-medium">
                      <span>{formattedDate}</span>
                      {post.estimatedReadTime && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {post.estimatedReadTime} دقیقه مطالعه
                          </span>
                        </>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-bold text-brand-neutral-900 group-hover:text-brand-teal-900 transition-colors line-clamp-2 leading-snug">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>

                    {/* Excerpt */}
                    <p className="text-xs sm:text-sm text-brand-neutral-600 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Footer: Author & Read more */}
                  <div className="pt-4 border-t border-brand-neutral-200/60 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {post.authorImage && (
                        <div className="relative w-7 h-7 rounded-full overflow-hidden bg-brand-neutral-100">
                          <Image
                            src={post.authorImage}
                            alt={post.authorName || 'نویسنده'}
                            fill
                            sizes="28px"
                            className="object-cover"
                          />
                        </div>
                      )}
                      <span className="text-xs text-brand-neutral-700 font-medium truncate max-w-[120px]">
                        {post.authorName}
                      </span>
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-brand-teal-900 hover:text-brand-teal-700 transition-colors"
                    >
                      <span>ادامه مطلب</span>
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Mobile View All Link */}
        <div className="text-center mt-10 md:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-brand-teal-900 text-brand-teal-900 font-bold text-sm"
          >
            <span>مشاهده همه مقالات وبلاگ</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
