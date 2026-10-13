import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowLeft, CheckCircle } from 'lucide-react';
import { BlogPostDetail } from '@/lib/posts';

interface BlogPostAuthorSectionProps {
  post: BlogPostDetail;
}

export const BlogPostAuthorSection: React.FC<BlogPostAuthorSectionProps> = ({ post }) => {
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 my-12 pt-8 border-t border-brand-neutral-200">
      <div className="p-6 sm:p-8 rounded-3xl bg-brand-surface-paper border border-brand-neutral-200 shadow-soft">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
          {/* Avatar */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-brand-neutral-100 shrink-0 border border-brand-neutral-200 shadow-soft-sm">
            <Image
              src={post.authorImage || '/images/default-avatar.png'}
              alt={post.authorName}
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg sm:text-xl font-bold text-brand-neutral-900">
                {post.coachSlug ? (
                  <Link
                    href={`/coaches/${post.coachSlug}`}
                    className="hover:text-brand-teal-800 transition-colors"
                  >
                    {post.authorName}
                  </Link>
                ) : (
                  post.authorName
                )}
              </h3>
              {post.coachSlug && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-teal-50 text-brand-teal-900 border border-brand-teal-200/60">
                  <CheckCircle className="w-3 h-3 text-brand-teal-700" />
                  <span>کوچ تأییدشده بلومیا</span>
                </span>
              )}
            </div>

            {post.authorJobTitle && (
              <p className="text-xs sm:text-sm font-semibold text-brand-teal-800">
                {post.authorJobTitle}
              </p>
            )}

            {post.authorBio && (
              <p className="text-xs sm:text-sm text-brand-neutral-600 leading-relaxed pt-1">
                {post.authorBio}
              </p>
            )}
          </div>
        </div>

        {/* Coach Booking CTA */}
        {post.coachSlug && (
          <div className="mt-6 pt-5 border-t border-brand-neutral-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-brand-surface/60 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 p-5 sm:p-6 rounded-b-3xl">
            <div className="text-xs sm:text-sm text-brand-neutral-700 font-medium">
              مایلید گفتگوی اختصاصی کوچینگ با <strong>{post.authorName}</strong> داشته باشید؟
            </div>
            <Link
              href={`/coaches/${post.coachSlug}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-brand-teal-900 hover:bg-brand-teal-800 text-white font-bold text-xs sm:text-sm shadow-soft transition-all min-h-[44px] shrink-0"
            >
              <Calendar className="w-4 h-4 text-brand-teal-300" />
              <span>مشاهده پروفایل و رزرو جلسه</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
