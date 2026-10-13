import React from 'react';
import Link from 'next/link';
import { Calendar, MessageSquare, Phone } from 'lucide-react';

export const FaqContactCtaSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-brand-teal-950 text-white relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-teal-800/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-brand-teal-700/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-teal-900/80 border border-brand-teal-800 text-brand-teal-200 text-xs sm:text-sm font-semibold">
          <MessageSquare className="w-4 h-4 text-brand-teal-300" />
          <span>هنوز سوالی در ذهن دارید؟</span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-snug">
          پاسخ پرسش خود را پیدا نکردید؟
        </h2>

        <p className="text-sm sm:text-base md:text-lg text-brand-teal-100/90 leading-relaxed max-w-2xl mx-auto">
          مشاوران بلومیا کلاب در کنار شما هستند. می‌توانید سوال خود را از طریق تماس یا فرم ارتباط مطرح کنید، یا در یک جلسه ۴۵ دقیقه‌ای رایگان مستقیماً با کوچ به گفتگو بنشینید.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/coaching/free-intro-session"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-base font-bold text-brand-teal-950 bg-white hover:bg-brand-teal-50 active:scale-98 transition-all shadow-soft min-h-[48px]"
          >
            <Calendar className="w-4 h-4 text-brand-teal-900" />
            <span>رزرو جلسه معارفه رایگان</span>
          </Link>

          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-white/90 bg-brand-teal-900/60 hover:bg-brand-teal-800/80 border border-brand-teal-700/80 active:scale-98 transition-all min-h-[48px]"
          >
            <Phone className="w-4 h-4 text-brand-teal-200" />
            <span>تماس و ارسال پیام به پشتیبانی</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
