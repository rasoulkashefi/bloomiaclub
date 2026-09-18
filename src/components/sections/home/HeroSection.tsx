import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Sparkles, CheckCircle2, ShieldCheck, Clock, Star, Users } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-linear-to-b from-brand-teal-50/50 via-brand-surface to-brand-surface pt-10 pb-16 md:pt-20 md:pb-24 border-b border-brand-surface-border">
      {/* Subtle organic ambient blur glow in background */}
      <div
        className="pointer-events-none absolute -top-24 right-1/2 translate-x-1/2 w-[550px] h-[350px] bg-brand-coral-200/25 rounded-full blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-40 -left-20 w-[400px] h-[400px] bg-brand-teal-200/20 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Text Content Column: Mobile First order */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-right">
            {/* Pill Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-teal-100/80 border border-brand-teal-200/80 text-brand-teal-900 text-xs sm:text-sm font-medium shadow-xs">
              <Sparkles className="w-4 h-4 text-brand-coral-600 shrink-0" />
              <span>پلتفرم تخصصی کوچینگ معتبر با استاندارد بین‌المللی ICF</span>
            </div>

            {/* Main H1 - Single H1 on the page */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-brand-neutral-900 tracking-tight leading-[1.2] md:leading-[1.18]">
              فاصله شما تا هدف،{' '}
              <span className="text-brand-teal-900 underline decoration-brand-coral-500 decoration-wavy decoration-2 sm:decoration-4">
                فقط یک گفتگوی
              </span>{' '}
              آگاهانه است
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-brand-neutral-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              با همراهی کوچ‌های متخصص بلومیا، موانع ذهنی را کنار بگذارید و مسیر پیشرفت شغلی، فردی و روابط خود را با وضوح و اعتمادبه‌نفس بسازید.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 sm:gap-4">
              <Link
                href="/coaching/free-intro-session"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-brand-coral-600 hover:bg-brand-coral-700 active:scale-98 text-white font-bold text-base shadow-soft hover:shadow-soft-lg transition-all min-h-[48px]"
              >
                <span>رزرو جلسه معارفه رایگان</span>
                <ArrowLeft className="w-5 h-5 shrink-0" />
              </Link>
              <Link
                href="/coaches"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-brand-surface-paper hover:bg-brand-neutral-100 text-brand-teal-900 border border-brand-teal-200/80 font-semibold text-base shadow-xs transition-all min-h-[48px]"
              >
                <Users className="w-5 h-5 text-brand-teal-700" />
                <span>مشاهده و انتخاب مربیان</span>
              </Link>
            </div>

            {/* Trust Points (Mobile friendly) */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs sm:text-sm text-brand-neutral-600 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand-coral-600 shrink-0" />
                <span>اولین جلسه کاملاً رایگان</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-teal-700 shrink-0" />
                <span>کوچ‌های تاییدشده ICF</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-brand-teal-700 shrink-0" />
                <span>رزرو آنلاین زیر ۲ دقیقه</span>
              </div>
            </div>
          </div>

          {/* Visual Column */}
          <div className="lg:col-span-5 relative flex justify-center mt-4 lg:mt-0">
            <div className="relative w-full max-w-md">
              {/* Main Image Frame with Impeccable Multi-layered Depth */}
              <div className="relative rounded-3xl overflow-hidden shadow-elevated border-4 border-white aspect-4/5 bg-brand-neutral-200">
                <Image
                  src="/images/the-modern-professional-coach.webp"
                  alt="جلسه گفتگوی کوچینگ با مربی حرفه‌ای در بلومیا کلاب"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 500px"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-linear-to-t from-brand-teal-950/40 via-transparent to-transparent" />
              </div>

              {/* Floating Card: Fast Booking Badge (Bottom Right) */}
              <div className="absolute -bottom-5 right-4 sm:-right-4 bg-brand-surface-paper/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl shadow-soft-lg border border-brand-surface-border flex items-center gap-3.5 max-w-[260px] sm:max-w-xs animate-in fade-in zoom-in-95 duration-500">
                <div className="w-11 h-11 rounded-xl bg-brand-teal-50 flex items-center justify-center shrink-0 text-brand-teal-800">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-brand-neutral-500 font-medium">جلسه ۳۰ دقیقه‌ای</div>
                  <div className="text-sm font-bold text-brand-neutral-900">هماهنگی آنی تقویم</div>
                  <div className="text-xs text-brand-coral-600 font-medium mt-0.5">بدون نیاز به پرداخت</div>
                </div>
              </div>

              {/* Floating Card: Rating & Trust (Top Left) */}
              <div className="absolute -top-4 left-4 sm:-left-4 bg-brand-surface-paper/95 backdrop-blur-md py-2.5 px-4 rounded-2xl shadow-soft-lg border border-brand-surface-border flex items-center gap-2.5 animate-in fade-in zoom-in-95 duration-700">
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span className="text-sm font-bold text-brand-neutral-900">۴.۹</span>
                </div>
                <span className="text-xs text-brand-neutral-500 border-r border-brand-neutral-200 pr-2.5">
                  رضایت بالای ۹۸٪ مراجعین
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
