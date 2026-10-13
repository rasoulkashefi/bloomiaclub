import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Compass, Calendar, ArrowLeft, ShieldCheck, HeartHandshake } from 'lucide-react';

export const AboutHeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-brand-surface py-16 md:py-24 border-b border-brand-surface-border">
      {/* Organic ambient glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-teal-100/35 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-brand-teal-50/60 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-teal-50 border border-brand-teal-200/60 text-brand-teal-900 text-xs sm:text-sm font-semibold mb-6">
          <HeartHandshake className="w-4 h-4 text-brand-teal-700" />
          <span>داستان و ارزش‌های بلومیا کلاب</span>
        </div>

        {/* Semantic H1 (Strict Single H1) */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-brand-neutral-900 leading-tight md:leading-tight tracking-tight mb-6 max-w-4xl mx-auto">
          جایی برای مکث، تفکر و رشد واقعی انسان
        </h1>

        {/* Subtitle / Lead Paragraph */}
        <p className="text-base sm:text-lg md:text-xl text-brand-neutral-600 leading-relaxed max-w-3xl mx-auto mb-10 font-normal">
          بلومیا فضایی است که در آن، هیاهوی بیرون رنگ می‌بازد تا صدای درون شنیده شود. ما اینجا هستیم تا مسیر رشد و توسعه را از شعارهای انگیزشی توخالی، به عاملیت، خودآگاهی و تغییر پایدار تبدیل کنیم.
        </p>

        {/* Featured Image Showcase */}
        <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden border border-brand-surface-border shadow-soft-md bg-white p-2 sm:p-3 mb-6">
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-brand-surface-muted">
            <picture>
              <source srcSet="/images/about_us.avif" type="image/avif" />
              <source srcSet="/images/about_us.webp" type="image/webp" />
              <Image
                src="/images/about_us.png"
                alt="بلومیا کلاب، پلتفرم تخصصی کوچینگ و رشد فردی"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 900px"
                className="object-cover object-center"
              />
            </picture>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-brand-neutral-500 mb-10">
          فضایی امن، حرفه‌ای و اخلاق‌محور برای گفتگوهای عمیق و سازنده
        </p>

        {/* Quick Value Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mb-10 text-right">
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-brand-surface-border shadow-soft-sm">
            <div className="text-xs text-brand-neutral-500 mb-1">استاندارد جهانی</div>
            <div className="text-sm sm:text-base font-bold text-brand-neutral-900">
              مدارک معتبر ICF
            </div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-brand-surface-border shadow-soft-sm">
            <div className="text-xs text-brand-neutral-500 mb-1">امنیت روانی</div>
            <div className="text-sm sm:text-base font-bold text-brand-neutral-900">
              ۱۰۰٪ محرمانگی گفتگوها
            </div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-brand-surface-border shadow-soft-sm">
            <div className="text-xs text-brand-neutral-500 mb-1">روش‌شناسی علمی</div>
            <div className="text-sm sm:text-base font-bold text-brand-neutral-900">
              مبتنی بر شواهد رفتاری
            </div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-brand-surface-border shadow-soft-sm">
            <div className="text-xs text-brand-neutral-500 mb-1">همراهی اختصاصی</div>
            <div className="text-sm sm:text-base font-bold text-brand-neutral-900">
              جلسات ۱ به ۱ آنلاین
            </div>
          </div>
        </div>

        {/* Hero Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto">
          <Link
            href="/coaching/free-intro-session"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-base font-bold text-white bg-brand-teal-900 hover:bg-brand-teal-800 active:scale-98 transition-all shadow-soft min-h-[48px]"
          >
            <Calendar className="w-4 h-4 text-brand-teal-200" />
            <span>رزرو جلسه معارفه رایگان</span>
          </Link>

          <Link
            href="/coaches"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-brand-neutral-700 bg-white hover:bg-brand-surface-muted border border-brand-surface-border active:scale-98 transition-all min-h-[48px]"
          >
            <span>آشنایی با کوچ‌ها</span>
            <ArrowLeft className="w-4 h-4 text-brand-neutral-500" />
          </Link>
        </div>
      </div>
    </section>
  );
};
