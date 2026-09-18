import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full min-h-[85vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* 1. Desktop Background Video (16:9 Landscape) */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/videos/personal-development-coaching-session-hero-video-poster.webp"
        src="/videos/personal-development-coaching-session-hero-video.mp4"
        className="hidden md:block absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* 2. Mobile Background Video (Vertical Portrait) */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/videos/personal-development-coaching-session-mobile-hero-video-poster.webp"
        src="/videos/personal-development-coaching-session-mobile-hero-video.mp4"
        className="block md:hidden absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* 3. Cinematic Scrim & Ambient Overlay for High Contrast & Text Legibility */}
      <div
        className="absolute inset-0 z-10 bg-linear-to-b from-black/60 via-black/50 to-brand-teal-950/85"
        aria-hidden="true"
      />

      {/* 4. Hero Content Over Video */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center space-y-6 md:space-y-8">
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-medium shadow-lg animate-in fade-in zoom-in-95 duration-500">
          <Sparkles className="w-4 h-4 text-brand-coral-400 shrink-0" />
          <span>پلتفرم تخصصی کوچینگ با استاندارد بین‌المللی ICF</span>
        </div>

        {/* Semantic H1 */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.3] md:leading-[1.2] drop-shadow-md">
          فاصله شما تا هدف،{' '}
          <span className="text-brand-coral-400 underline decoration-white/50 decoration-wavy decoration-2 sm:decoration-3">
            فقط یک گفتگوی
          </span>{' '}
          آگاهانه است
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-xs font-normal">
          با همراهی کوچ‌های متخصص بلومیا، مسیر تغییر را از همین امروز شفاف کنید.
        </p>

        {/* Main CTA & Secondary Action */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5">
          <Link
            href="/coaching/free-intro-session"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-brand-coral-600 hover:bg-brand-coral-500 active:scale-98 text-white font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all min-h-[52px] group"
          >
            <span>رزرو جلسه صفر (رایگان)</span>
            <ArrowLeft className="w-5 h-5 shrink-0 group-hover:-translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/coaches"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md text-white border border-white/30 font-semibold text-base transition-all min-h-[52px]"
          >
            <span>مشاهده لیست مربیان</span>
          </Link>
        </div>

        {/* Trust Badges Bar */}
        <div className="pt-6 sm:pt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-medium">
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-black/40 backdrop-blur-md border border-white/15 text-white/95">
            <CheckCircle2 className="w-4 h-4 text-brand-coral-400 shrink-0" />
            <span>اولین جلسه رایگان</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-black/40 backdrop-blur-md border border-white/15 text-white/95">
            <Clock className="w-4 h-4 text-brand-coral-400 shrink-0" />
            <span>رزرو سریع آنلاین</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-black/40 backdrop-blur-md border border-white/15 text-white/95">
            <ShieldCheck className="w-4 h-4 text-brand-coral-400 shrink-0" />
            <span>مربیان تاییدشده ICF</span>
          </div>
        </div>
      </div>
    </section>
  );
};
