import React from 'react';
import Link from 'next/link';
import { Calendar, Users, ArrowLeft } from 'lucide-react';

export const BlogNewsletterCtaSection: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 bg-brand-surface border-t border-brand-neutral-200/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-brand-teal-950 text-white p-8 sm:p-12 md:p-14 shadow-elevated border border-brand-teal-900">
          {/* Subtle background glow */}
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-brand-teal-800/30 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-brand-teal-700/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-brand-teal-900 text-brand-teal-200 border border-brand-teal-800">
                همراهی در مسیر رشد
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                می‌خواهید چالش‌های زندگی و کارتان را با یک کوچ حرفه‌ای بررسی کنید؟
              </h2>
              <p className="text-sm sm:text-base text-brand-teal-100/80 leading-relaxed">
                در یک گفتگوی ۳۰ دقیقه‌ای بدون تعهد مالی، هدف و چالش خود را شفاف کنید و تناسب کوچینگ با نیازتان را بسنجید.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
              <Link
                href="/coaching/free-intro-session"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-brand-surface-muted text-brand-teal-950 font-extrabold text-sm shadow-soft transition-all min-h-[44px]"
              >
                <Calendar className="w-4 h-4 text-brand-teal-800" />
                <span>رزرو جلسه معارفه رایگان</span>
              </Link>
              <Link
                href="/coaches"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-brand-teal-900 hover:bg-brand-teal-800 text-white font-bold text-sm border border-brand-teal-700 transition-all min-h-[44px]"
              >
                <Users className="w-4 h-4 text-brand-teal-300" />
                <span>مشاهده کوچ‌های تأییدشده</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
