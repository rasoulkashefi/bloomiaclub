import React from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full min-h-[calc(100svh-4rem)] md:h-[calc(100dvh-4.25rem)] md:min-h-[500px] flex items-center justify-center overflow-hidden">
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

      {/* 3. Deep Cinematic Overlay for Maximum Contrast and Text Legibility */}
      <div
        className="absolute inset-0 z-10 bg-black/70 md:bg-black/65 backdrop-blur-[1px]"
        aria-hidden="true"
      />

      {/* 4. Hero Content Over Video */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-6 lg:py-8 text-center flex flex-col items-center justify-center h-full space-y-3.5 sm:space-y-4 md:space-y-4 lg:space-y-5">
        {/* Eyebrow Pill - Pure and clean without sparkle icons */}
        <div className="inline-flex items-center px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-medium shadow-md">
          <span>پلتفرم تخصصی کوچینگ با استاندارد بین‌المللی ICF</span>
        </div>

        {/* Semantic H1 - Clean without any underline and all white */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.3] md:leading-[1.25] drop-shadow-lg max-w-4xl">
          فاصله شما تا هدف، فقط یک گفتگوی آگاهانه است
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-md font-normal">
          با همراهی کوچ‌های متخصص بلومیا، مسیر تغییر را از همین امروز شفاف کنید.
        </p>

        {/* Main CTA & Secondary Action */}
        <div className="pt-1 sm:pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
          <Link
            href="/coaching/free-intro-session"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-brand-teal-900 hover:bg-brand-teal-800 border border-brand-teal-600 active:scale-98 text-white font-bold text-sm sm:text-base shadow-xl hover:shadow-brand-teal-900/50 hover:scale-102 transition-all min-h-[48px] sm:min-h-[50px] group"
          >
            <span>رزرو جلسه صفر (رایگان)</span>
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 group-hover:-translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/coaches"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white border border-white/30 font-semibold text-sm sm:text-base transition-all min-h-[48px] sm:min-h-[50px]"
          >
            <span>مشاهده لیست کوچ‌ها</span>
          </Link>
        </div>

        {/* Trust Badges Bar */}
        <div className="pt-3 sm:pt-4 md:pt-4 lg:pt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 md:gap-5 text-xs sm:text-sm font-medium">
          <div className="flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl bg-black/50 backdrop-blur-md border border-white/15 text-white shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-brand-teal-300 shrink-0" />
            <span>اولین جلسه رایگان</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl bg-black/50 backdrop-blur-md border border-white/15 text-white shadow-sm">
            <Clock className="w-4 h-4 text-brand-teal-300 shrink-0" />
            <span>رزرو سریع آنلاین</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl bg-black/50 backdrop-blur-md border border-white/15 text-white shadow-sm">
            <ShieldCheck className="w-4 h-4 text-brand-teal-300 shrink-0" />
            <span>کوچ‌های تاییدشده ICF</span>
          </div>
        </div>
      </div>
    </section>
  );
};
