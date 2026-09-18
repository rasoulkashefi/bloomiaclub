import React from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full min-h-[85vh] md:min-h-[92vh] flex items-center justify-center overflow-hidden">
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
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center space-y-6 md:space-y-8">
        {/* Eyebrow Pill - Pure and clean without sparkle icons */}
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-medium shadow-md">
          <span>پلتفرم تخصصی کوچینگ با استاندارد بین‌المللی ICF</span>
        </div>

        {/* Semantic H1 - Clean without any underline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.3] md:leading-[1.2] drop-shadow-lg">
          فاصله شما تا هدف،{' '}
          <span className="text-brand-teal-200">
            فقط یک گفتگوی
          </span>{' '}
          آگاهانه است
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-white/95 max-w-2xl mx-auto leading-relaxed drop-shadow-md font-normal">
          با همراهی کوچ‌های متخصص بلومیا، مسیر تغییر را از همین امروز شفاف کنید.
        </p>

        {/* Main CTA & Secondary Action */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5">
          <Link
            href="/coaching/free-intro-session"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-brand-teal-900 hover:bg-brand-teal-800 border border-brand-teal-600 active:scale-98 text-white font-bold text-base sm:text-lg shadow-2xl hover:shadow-brand-teal-900/50 hover:scale-102 transition-all min-h-[52px] group"
          >
            <span>رزرو جلسه صفر (رایگان)</span>
            <ArrowLeft className="w-5 h-5 shrink-0 group-hover:-translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/coaches"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white border border-white/30 font-semibold text-base transition-all min-h-[52px]"
          >
            <span>مشاهده لیست مربیان</span>
          </Link>
        </div>

        {/* Trust Badges Bar */}
        <div className="pt-6 sm:pt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-medium">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-black/50 backdrop-blur-md border border-white/15 text-white shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-brand-teal-300 shrink-0" />
            <span>اولین جلسه رایگان</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-black/50 backdrop-blur-md border border-white/15 text-white shadow-sm">
            <Clock className="w-4 h-4 text-brand-teal-300 shrink-0" />
            <span>رزرو سریع آنلاین</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-black/50 backdrop-blur-md border border-white/15 text-white shadow-sm">
            <ShieldCheck className="w-4 h-4 text-brand-teal-300 shrink-0" />
            <span>مربیان تاییدشده ICF</span>
          </div>
        </div>
      </div>
    </section>
  );
};
