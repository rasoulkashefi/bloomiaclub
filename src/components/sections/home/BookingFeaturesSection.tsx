import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Target, CalendarCheck, Zap, ArrowLeft } from 'lucide-react';

const features = [
  {
    icon: Target,
    title: 'انتخاب دقیق بر اساس هدف شما',
    description:
      'چه به دنبال تغییر مسیر شغلی باشید، چه بهبود روابط فردی یا غلبه بر فرسودگی، ما شما را به کوچ متخصص همان حوزه متصل می‌کنیم.',
  },
  {
    icon: CalendarCheck,
    title: 'هماهنگی آنی با تقویم روزانه',
    description:
      'زمان‌های خالی کوچ‌ها را به صورت لحظه‌ای ببینید و بدون نیاز به پیام‌های رفت‌وبرگشت، ساعت مناسب خودتان را انتخاب کنید.',
  },
  {
    icon: Zap,
    title: 'تأیید فوری و شروع جلسه آنلاین',
    description:
      'بلافاصله پس از ثبت رزرو، پیامک و لینک ورود به جلسه آنلاین برای شما ارسال می‌شود؛ بدون دردسر و بدون پرداخت هزینه.',
  },
];

export const BookingFeaturesSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-brand-surface-paper border-b border-brand-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Column */}
          <div className="lg:col-span-6 order-2 lg:order-1 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-elevated border border-brand-surface-border bg-brand-neutral-100 max-w-md lg:max-w-lg mx-auto">
              <Image
                src="/images/the-modern-professional-coach.webp"
                alt="کوچ حرفه‌ای مدرن بلومیا"
                width={768}
                height={1152}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 550px"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

              {/* Floating Card: Fast Booking Widget from live site */}
              <div className="absolute bottom-6 left-6 right-6 sm:right-auto sm:min-w-[240px] bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-elevated border border-brand-neutral-200">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-brand-teal-50 text-brand-teal-900 flex items-center justify-center shrink-0">
                    <CalendarCheck className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold text-brand-neutral-900">رزرو سریع</span>
                </div>
                <p className="text-xs sm:text-sm text-brand-neutral-600 mb-2.5">
                  زمان جلسه: امروز ۱۶:۰۰
                </p>
                <div className="w-full h-1.5 bg-brand-neutral-200 rounded-full overflow-hidden">
                  <div className="w-[70%] h-full bg-brand-teal-800 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Text & Features Column */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <div className="space-y-3">
              <span className="text-brand-teal-800 font-bold text-sm tracking-wide uppercase">
                تجربه کاربری ساده و مطمئن
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-neutral-900 leading-tight">
                رزرو هوشمند؛ کوتاه‌ترین مسیر به جلسه معارفه
              </h2>
              <p className="text-sm sm:text-base text-brand-neutral-600 leading-relaxed">
                با سامانه نوبت‌دهی هوشمند بلومیا، در کمتر از ۳ دقیقه کوچ متخصص خود را متناسب با چالش فعلی‌تان پیدا کنید و اولین گام تغییر را بدون هزینه بردارید.
              </p>
            </div>

            {/* Feature Items List */}
            <div className="space-y-5 pt-2">
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-brand-surface transition-colors border border-transparent hover:border-brand-neutral-200">
                    <div className="w-11 h-11 rounded-xl bg-brand-teal-50 text-brand-teal-900 flex items-center justify-center shrink-0 mt-1 shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-brand-neutral-900">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-brand-neutral-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Link */}
            <div className="pt-2">
              <Link
                href="/coaching/free-intro-session"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-brand-teal-900 hover:bg-brand-teal-800 text-white font-semibold text-sm sm:text-base transition-colors shadow-soft min-h-[48px]"
              >
                <span>رزرو رایگان جلسه معارفه</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
