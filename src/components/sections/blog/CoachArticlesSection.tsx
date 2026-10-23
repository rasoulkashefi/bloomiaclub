'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, BookOpen } from 'lucide-react';
import type { BlogPostSummary } from '@/lib/posts';
import type { CoachProfile } from '@/lib/coaches';
import { toFa } from '@/lib/format';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { AtynoBookingModal } from '@/components/coach/AtynoBookingModal';

interface CoachArticlesSectionProps {
  coach: CoachProfile | null;
  coachSlug: string;
  posts: BlogPostSummary[];
}

const formatPersianDate = (dateStr: string): string => {
  try {
    const d = new Date(dateStr);
    return new Intl.DateTimeFormat('fa-IR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(d);
  } catch {
    return dateStr;
  }
};

export const CoachArticlesSection: React.FC<CoachArticlesSectionProps> = ({
  coach,
  coachSlug,
  posts,
}) => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const coachName = coach?.name || 'فاطمه اسماعیلی';
  const coachProfileUrl = `/coaches/${coachSlug}/v4`;

  // Official embedded booking URL for zero/intro session
  const bookingEmbedUrl =
    coachSlug === 'fatemeh_esmaeeli' || coach?.slug === 'fatemeh_esmaeeli'
      ? 'https://atyno.com/fa/embed/934b33a2-9888-4209-9901-b9632e812e6c?meeting=zero'
      : (coach?.bookingUrl || 'https://atyno.com/fatemeh/zero');

  const latestPost = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <div className="w-full bg-[#fafaf8] py-6 sm:py-10 lg:py-14 text-[#1e1e1e]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* 1. Breadcrumb (Strictly single line) */}
        <Breadcrumbs
          items={[
            { label: 'صفحه اصلی', href: '/' },
            { label: 'کوچ‌ها', href: '/coaches' },
            { label: `پروفایل ${coachName}`, href: coachProfileUrl },
            { label: 'مقالات و یادداشت‌ها' },
          ]}
        />

        {/* Accessible SEO H1 (Visually Hidden) */}
        <h1 className="sr-only">
          مقالات و یادداشت‌های تخصصی {coachName}
        </h1>

        {/* 2. Featured Latest Article (بزرگ و برجسته در بالا) */}
        {latestPost && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="space-y-3.5"
          >
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1f3d3a]">
                <BookOpen className="w-4 h-4 text-[#1f3d3a]" />
                <span>تازه‌ترین یادداشت منتشرشده</span>
              </div>
            </div>

            <article className="group relative overflow-hidden rounded-[2.25rem] bg-white border border-[#e5e5e2] shadow-[0_8px_32px_rgba(31,61,58,0.06)] transition-all duration-300 hover:shadow-[0_16px_48px_rgba(31,61,58,0.12)]">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                {/* Large Featured Image */}
                <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:col-span-7 overflow-hidden bg-[#f2f7f6]">
                  <Image
                    src={latestPost.imageUrl}
                    alt={latestPost.imageAlt || latestPost.title}
                    fill
                    priority
                    unoptimized={latestPost.imageUrl.includes('sanity.io')}
                    sizes="(min-width: 1024px) 700px, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:hidden" />
                  
                  {/* Category Pill on Image */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="inline-flex items-center rounded-full bg-white/95 backdrop-blur-md px-3.5 py-1 text-xs font-bold text-[#1f3d3a] shadow-soft">
                      {latestPost.category}
                    </span>
                  </div>
                </div>

                {/* Rich Details Column */}
                <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    {/* Meta info: Date & Read Time */}
                    <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-[#6b6b6b]">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-[#1f3d3a]" />
                        <span>{formatPersianDate(latestPost.publishedAt)}</span>
                      </div>
                      <span className="text-[#e5e5e2]">•</span>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-[#1f3d3a]" />
                        <span>{toFa(latestPost.estimatedReadTime)} دقیقه مطالعه</span>
                      </div>
                    </div>

                    {/* Headline */}
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#1e1e1e] leading-[1.45] tracking-tight group-hover:text-[#1f3d3a] transition-colors">
                      <Link href={`/blog/${latestPost.slug}`}>
                        {latestPost.title}
                      </Link>
                    </h2>

                    {/* Rich Excerpt */}
                    <p className="text-sm sm:text-base text-[#6b6b6b] leading-[1.85] line-clamp-4">
                      {latestPost.excerpt}
                    </p>
                  </div>

                  {/* Read Article CTA */}
                  <div className="pt-4 border-t border-[#e5e5e2]/80 flex items-center justify-between">
                    <Link
                      href={`/blog/${latestPost.slug}`}
                      className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#1f3d3a] px-6 py-3 text-xs sm:text-sm font-semibold text-white shadow-soft hover:bg-[#2b544e] hover:shadow-lg transition-all active:scale-98 min-h-[44px]"
                    >
                      <span>مطالعه کامل مقاله</span>
                      <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    </Link>

                    <span className="text-xs font-medium text-[#6b6b6b] hidden sm:inline">
                      به قلم {coachName}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          </motion.div>
        )}

        {/* 4. Remaining Articles Grid (و باقی مقالات هم زیرش) */}
        {remainingPosts.length > 0 && (
          <div className="space-y-6 pt-2">
            <div className="flex items-center justify-between border-b border-[#e5e5e2] pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#1e1e1e]">
                  سایر مقالات و یادداشت‌های {coachName}
                </h2>
                <p className="text-xs sm:text-sm text-[#6b6b6b] mt-1">
                  راهنماهای کاربردی پیرامون والدگری، تعادل فردی و بازیابی انرژی
                </p>
              </div>
              <span className="text-xs font-semibold text-[#1f3d3a] bg-[#dfece9] px-3 py-1 rounded-full shrink-0">
                {toFa(remainingPosts.length)} مقاله دیگر
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {remainingPosts.map((post, idx) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.06, ease: 'easeOut' }}
                  className="group flex flex-col justify-between overflow-hidden rounded-[1.75rem] bg-white border border-[#e5e5e2] shadow-[0_4px_20px_rgba(31,61,58,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(31,61,58,0.1)]"
                >
                  <div>
                    {/* Card Image */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#f2f7f6]">
                      <Image
                        src={post.imageUrl}
                        alt={post.imageAlt || post.title}
                        fill
                        unoptimized={post.imageUrl.includes('sanity.io')}
                        sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3.5 right-3.5">
                        <span className="inline-block rounded-full bg-white/95 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-[#1f3d3a] shadow-soft-sm">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 sm:p-7 space-y-3">
                      {/* Date & Time */}
                      <div className="flex items-center gap-3 text-xs text-[#6b6b6b]">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#1f3d3a]" />
                          <span>{formatPersianDate(post.publishedAt)}</span>
                        </div>
                        <span className="text-[#e5e5e2]">•</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#1f3d3a]" />
                          <span>{toFa(post.estimatedReadTime)} دقیقه</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-[#1e1e1e] leading-[1.5] group-hover:text-[#1f3d3a] transition-colors">
                        <Link href={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h3>

                      {/* Excerpt */}
                      <p className="text-xs sm:text-sm text-[#6b6b6b] leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="p-6 sm:p-7 pt-0 border-t border-transparent">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex w-full items-center justify-between rounded-full border border-[#e5e5e2] bg-[#fafaf8] px-4 py-2.5 text-xs font-semibold text-[#1f3d3a] transition-all duration-200 group-hover:border-[#1f3d3a] group-hover:bg-[#1f3d3a] group-hover:text-white min-h-[44px]"
                    >
                      <span>مطالعه مقاله</span>
                      <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        )}

        {/* 5. Minimal Coach Connection Footer Card (بهینه‌سازی فاصله‌گذاری و پاپ‌آپ رزرو) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="rounded-[2.25rem] bg-[#1f3d3a] p-8 sm:p-12 lg:p-16 text-white shadow-xl"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-14">
            {/* Right: Text with Generous Line-Height & Spacing */}
            <div className="space-y-4 sm:space-y-5 max-w-2xl">
              <span className="inline-block text-xs sm:text-sm font-semibold tracking-wider text-[#dfece9] bg-white/10 px-3.5 py-1.5 rounded-full">
                همراهی در مسیر رشد و تعادل
              </span>
              
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white !leading-[1.7] sm:!leading-[1.65] lg:!leading-[1.65]">
                می‌خواهید چالش‌های مادری یا تعادل کار و زندگی‌تان را با {coachName} در میان بگذارید؟
              </h3>
              
              <p className="text-sm sm:text-base text-[#dfece9]/90 !leading-[1.9] sm:!leading-[1.9] font-normal pt-1">
                در یک جلسه معارفه رایگان (جلسه صفر)، بدون قضاوت و در فضایی کاملاً محرمانه با متدولوژی کوچینگ و مسیر تغییر آشنا شوید.
              </p>
            </div>

            {/* Left: Buttons with Direct Modal Popup */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0 w-full lg:w-auto">
              <button
                type="button"
                onClick={() => setIsBookingModalOpen(true)}
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-white px-7 py-4 text-xs sm:text-sm font-bold text-[#1f3d3a] shadow-lg hover:bg-[#f2f7f6] hover:shadow-xl hover:scale-[1.02] transition-all active:scale-98 min-h-[48px]"
              >
                <span>رزرو جلسه معارفه رایگان</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

              <Link
                href={coachProfileUrl}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-4 text-xs sm:text-sm font-medium text-white backdrop-blur-sm hover:bg-white hover:text-[#1f3d3a] transition-all min-h-[48px]"
              >
                <span>مشاهده پروفایل کامل کوچ</span>
              </Link>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Embedded Atyno Booking Modal (Popup) */}
      <AtynoBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        title="جلسه صفر (معارفه رایگان)"
        bookingUrl={bookingEmbedUrl}
        coachName={coachName}
      />
    </div>
  );
};
