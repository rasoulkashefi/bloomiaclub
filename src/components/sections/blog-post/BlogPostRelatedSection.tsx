import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { BlogPostSummary } from '@/lib/posts';
import { BlogCard } from '../blog/BlogCard';

interface BlogPostRelatedSectionProps {
  relatedPosts: BlogPostSummary[];
}

export const BlogPostRelatedSection: React.FC<BlogPostRelatedSectionProps> = ({ relatedPosts }) => {
  if (!relatedPosts || relatedPosts.length === 0) return null;

  return (
    <section className="py-14 sm:py-20 bg-brand-surface-paper border-t border-brand-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-teal-50 text-brand-teal-900 text-xs font-bold border border-brand-teal-200/60">
              <BookOpen className="w-3.5 h-3.5 text-brand-teal-700" />
              <span>پیشنهاد مطالعه بیشتر</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-neutral-900 tracking-tight">
              مقالات مرتبط و بینش‌های تکمیلی
            </h2>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-teal-900 hover:text-brand-teal-700 transition-colors"
          >
            <span>مشاهده همه مقالات وبلاگ</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {relatedPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};
