import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, CheckCircle2, Sparkles, Compass, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="w-full flex flex-col items-center">
      {/* Hero Section Preview / Foundation Verification */}
      <section className="w-full bg-linear-to-b from-brand-teal-50/60 via-brand-surface to-brand-surface py-12 md:py-20 px-4 sm:px-6 lg:px-8 border-b border-brand-neutral-200">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-teal-100/70 border border-brand-teal-200 text-brand-teal-900 text-xs sm:text-sm font-medium shadow-xs">
            <Sparkles className="w-4 h-4 text-brand-coral-600" />
            <span>نسل جدید وبسایت بلومیا کلاب (Next.js 15 + Mobile First)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-brand-neutral-900 tracking-tight leading-tight md:leading-tight">
            شکوفایی پتانسیل واقعی شما با{' '}
            <span className="text-brand-teal-900 underline decoration-brand-coral-500 decoration-wavy decoration-2">
              کوچینگ حرفه‌ای
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-brand-neutral-600 max-w-2xl mx-auto leading-relaxed">
            بلومیا کلاب، پل ارتباطی شما با برترین مربیان و کوچ‌های معتبر دارای مدارک بین‌المللی ICF در زمینه‌های توسعه فردی، مسیر شغلی و کسب‌وکار.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
            <Link
              href="/coaching/free-intro-session"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-brand-coral-600 hover:bg-brand-coral-700 text-white font-bold text-base shadow-soft hover:shadow-soft-lg active:scale-98 transition-all min-h-[48px]"
            >
              <span>رزرو جلسه معارفه رایگان</span>
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <Link
              href="/coaches"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-brand-surface-paper hover:bg-brand-neutral-100 text-brand-teal-900 border border-brand-teal-200 font-semibold text-base shadow-xs transition-all min-h-[48px]"
            >
              <Compass className="w-5 h-5 text-brand-teal-700" />
              <span>مشاهده لیست مربیان</span>
            </Link>
          </div>

          {/* Quick Trust Badges */}
          <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm text-brand-neutral-700 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-brand-surface-paper border border-brand-neutral-200">
              <CheckCircle2 className="w-4 h-4 text-brand-teal-600 shrink-0" />
              <span>مربیان دارای گواهی ICF</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-brand-surface-paper border border-brand-neutral-200">
              <ShieldCheck className="w-4 h-4 text-brand-teal-600 shrink-0" />
              <span>جلسه معارفه ۱۰۰٪ رایگان</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-brand-surface-paper border border-brand-neutral-200">
              <HeartHandshake className="w-4 h-4 text-brand-teal-600 shrink-0" />
              <span>پشتیبانی و ضمانت کیفیت</span>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Section Architecture Note */}
      <section className="w-full max-w-5xl mx-auto py-12 px-4 sm:px-6">
        <div className="bg-brand-surface-paper p-6 sm:p-8 rounded-2xl border border-brand-neutral-200 shadow-soft space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-brand-teal-900 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-brand-coral-500"></span>
            پیکربندی پایه فاز اول با موفقیت فعال شد
          </h2>
          <p className="text-brand-neutral-600 leading-relaxed text-sm sm:text-base">
            تمامی زیرساخت‌های فریم‌ورک <strong>Next.js 15</strong>، تایپوگرافی بدون پرش <strong>وزیرمتن</strong>، تم برند بلومیا کلاب، استایل‌های موبایل‌فرست Tailwind و هدر و فوتر ماژولار آماده به کار شدند. در گام‌های بعدی، سکشن‌های اختصاصی هر صفحه یک‌به‌یک و با استانداردهای Impeccable و SEO/GEO پیاده‌سازی خواهند شد.
          </p>
        </div>
      </section>
    </div>
  );
}
