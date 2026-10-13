import React from 'react';
import Link from 'next/link';
import { Compass, Home, Users, BookOpen, Calendar, HelpCircle, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main dir="rtl" className="min-h-[80vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-brand-surface">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Top 404 Visual Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-teal-50 border border-brand-teal-200/60 text-brand-teal-900 text-sm font-black font-mono">
          <span>خطای ۴۰۴ | Page Not Found</span>
        </div>

        {/* Big Subtle 404 Number */}
        <div className="relative">
          <div className="text-7xl sm:text-8xl md:text-9xl font-black text-brand-neutral-200 select-none tracking-widest font-mono">
            ۴۰۴
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-white border border-brand-surface-border shadow-soft-md flex items-center justify-center text-brand-teal-900">
              <Compass className="w-8 h-8 sm:w-10 sm:h-10 text-brand-teal-800 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-3">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-neutral-900 tracking-tight">
            صفحه‌ای که به دنبال آن بودید یافت نشد
          </h1>
          <p className="text-sm sm:text-base text-brand-neutral-600 max-w-lg mx-auto leading-relaxed">
            شاید آدرس صفحه تغییر کرده باشد، حذف شده باشد یا به اشتباه تایپ شده باشد. نگران نباشید؛ می‌توانید از بخش‌های زیر مسیرتان را ادامه دهید:
          </p>
        </div>

        {/* Quick Hub Navigation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-right">
          <Link
            href="/"
            className="flex items-center justify-between p-4 rounded-2xl bg-white border border-brand-surface-border hover:border-brand-teal-300 hover:shadow-soft-sm transition-all group min-h-[48px]"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-teal-50 text-brand-teal-900 flex items-center justify-center shrink-0">
                <Home className="w-5 h-5 text-brand-teal-800" />
              </div>
              <div>
                <span className="text-sm font-bold text-brand-neutral-900 group-hover:text-brand-teal-900 block transition-colors">
                  صفحه اصلی
                </span>
                <span className="text-xs text-brand-neutral-500">
                  بازگشت به نخستین گام
                </span>
              </div>
            </div>
            <ArrowLeft className="w-4 h-4 text-brand-neutral-400 group-hover:text-brand-teal-900 transition-colors" />
          </Link>

          <Link
            href="/coaches"
            className="flex items-center justify-between p-4 rounded-2xl bg-white border border-brand-surface-border hover:border-brand-teal-300 hover:shadow-soft-sm transition-all group min-h-[48px]"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-teal-50 text-brand-teal-900 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 text-brand-teal-800" />
              </div>
              <div>
                <span className="text-sm font-bold text-brand-neutral-900 group-hover:text-brand-teal-900 block transition-colors">
                  کوچ‌های بلومیا
                </span>
                <span className="text-xs text-brand-neutral-500">
                  جستجو و انتخاب کوچ تخصصی
                </span>
              </div>
            </div>
            <ArrowLeft className="w-4 h-4 text-brand-neutral-400 group-hover:text-brand-teal-900 transition-colors" />
          </Link>

          <Link
            href="/coaching/free-intro-session"
            className="flex items-center justify-between p-4 rounded-2xl bg-white border border-brand-surface-border hover:border-brand-teal-300 hover:shadow-soft-sm transition-all group min-h-[48px]"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-teal-50 text-brand-teal-900 flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5 text-brand-teal-800" />
              </div>
              <div>
                <span className="text-sm font-bold text-brand-neutral-900 group-hover:text-brand-teal-900 block transition-colors">
                  جلسه معارفه رایگان
                </span>
                <span className="text-xs text-brand-neutral-500">
                  گفتگوی ۴۵ دقیقه‌ای بدون تعهد
                </span>
              </div>
            </div>
            <ArrowLeft className="w-4 h-4 text-brand-neutral-400 group-hover:text-brand-teal-900 transition-colors" />
          </Link>

          <Link
            href="/blog"
            className="flex items-center justify-between p-4 rounded-2xl bg-white border border-brand-surface-border hover:border-brand-teal-300 hover:shadow-soft-sm transition-all group min-h-[48px]"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-teal-50 text-brand-teal-900 flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5 text-brand-teal-800" />
              </div>
              <div>
                <span className="text-sm font-bold text-brand-neutral-900 group-hover:text-brand-teal-900 block transition-colors">
                  وبلاگ و مقالات
                </span>
                <span className="text-xs text-brand-neutral-500">
                  آموزه‌ها و راهنماهای رشد
                </span>
              </div>
            </div>
            <ArrowLeft className="w-4 h-4 text-brand-neutral-400 group-hover:text-brand-teal-900 transition-colors" />
          </Link>
        </div>

        {/* Final CTA Button */}
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-white bg-brand-teal-900 hover:bg-brand-teal-800 transition-colors shadow-soft min-h-[48px]"
          >
            <Home className="w-4 h-4" />
            <span>انتقال به صفحه اصلی بلومیا کلاب</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
