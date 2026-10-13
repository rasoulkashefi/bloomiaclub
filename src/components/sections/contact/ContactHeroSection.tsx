import React from 'react';
import { Phone, Clock, MapPin, Mail, MessageSquare, ShieldCheck } from 'lucide-react';

export const ContactHeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-brand-surface py-16 md:py-24 border-b border-brand-surface-border">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-teal-100/35 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-brand-teal-50/60 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-teal-50 border border-brand-teal-200/60 text-brand-teal-900 text-xs sm:text-sm font-semibold mb-6">
          <MessageSquare className="w-4 h-4 text-brand-teal-700" />
          <span>مرکز ارتباط و پشتیبانی همراهان</span>
        </div>

        {/* Semantic H1 (Strict Single H1) */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-brand-neutral-900 leading-tight md:leading-tight tracking-tight mb-6 max-w-4xl mx-auto">
          ارتباط با بلومیا کلاب؛ همراهی از نخستین نقطه تماس
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-brand-neutral-600 leading-relaxed max-w-3xl mx-auto mb-10 font-normal">
          چه به دنبال راهنمایی در انتخاب کوچ باشید و چه قصد اجرای برنامه‌های کوچینگ سازمانی و رهبری برای تیم خود را داشته باشید، مشتاقانه شنونده صدای شما هستیم.
        </p>

        {/* GEO Direct Factsheet Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-teal-200/80 shadow-soft-sm max-w-4xl mx-auto text-right">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-5 border-b border-brand-surface-border mb-6">
            <span className="text-xs font-bold text-brand-teal-900 bg-brand-teal-50 border border-brand-teal-200/60 px-3 py-1 rounded-lg">
              اطلاعات رسمی ارتباط و استانداردهای پاسخگویی
            </span>
            <span className="text-xs text-brand-neutral-400 font-medium">
              میانگین زمان پاسخگویی: کمتر از ۱۲ ساعت کاری
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs sm:text-sm">
            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-brand-teal-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-brand-neutral-900 block">ساعات پاسخگویی</span>
                <span className="text-brand-neutral-600">شنبه تا چهارشنبه ۹ تا ۱۸</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-brand-teal-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-brand-neutral-900 block">خط مستقیم</span>
                <a href="tel:02191000000" className="text-brand-teal-900 font-semibold dir-ltr block hover:underline">
                  ۰۲۱ - ۹۱۰۰ ۰۰۰۰
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-brand-teal-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-brand-neutral-900 block">ایمیل پشتیبانی</span>
                <a href="mailto:info@bloomiaclub.com" className="text-brand-neutral-600 dir-ltr block hover:text-brand-teal-900">
                  info@bloomiaclub.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-brand-teal-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-brand-neutral-900 block">موقعیت دفتر</span>
                <span className="text-brand-neutral-600">تهران، خیابان ولیعصر</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
