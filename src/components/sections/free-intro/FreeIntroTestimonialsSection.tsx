import React from 'react';
import { Quote, MessageSquareHeart } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote:
      '«جلسه اول فراتر از انتظارم بود. سادگی و آرامش فضا باعث شد خیلی راحت چالش‌های کاری‌ام را مطرح کنم و پس از مدت‌ها به وضوح ذهنی برسم.»',
    author: 'زهرا م.',
    role: 'مدیر بازاریابی',
    topic: 'توسعه مسیر شغلی',
  },
  {
    quote:
      '«فکر نمی‌کردم در ۴۵ دقیقه بشود به این سطح از شفافیت رسید. بدون هیچ قضاوت یا نصیحتی، کوچ کمک کرد گره اصلی تصمیم‌گیری‌ام را باز کنم.»',
    author: 'رضا ک.',
    role: 'توسعه‌دهنده نرم‌افزار',
    topic: 'تصمیم‌گیری شغلی',
  },
  {
    quote:
      '«راهکارهای عملی ارائه شده در همان جلسه اول به من کمک کرد تا اولویت‌های کاری و زندگی شخصی‌ام را بعد از ماه‌ها سردرگمی تفکیک کنم.»',
    author: 'سروش ا.',
    role: 'بنیان‌گذار استارتاپ',
    topic: 'تعادل کار و زندگی',
  },
  {
    quote:
      '«بسیار شنوا، آرامش‌بخش و اصولی. حس کردم بالاخره کسی بدون پیش‌داوری و با استانداردهای علمی جهانی شنونده واقعی دغدغه‌های من است.»',
    author: 'مونا پ.',
    role: 'پژوهشگر حوزه علوم انسانی',
    topic: 'رشد فردی',
  },
  {
    quote:
      '«بدون هیچ اصرار یا فشاری برای خرید پکیج‌های بعدی، تمام توجه کوچ روی کمک به مسئله من متمرکز بود. این حد از اخلاق حرفه‌ای فوق‌العاده است.»',
    author: 'امید ش.',
    role: 'مدیر محصول',
    topic: 'رهبری فردی',
  },
  {
    quote:
      '«بهترین نقطه شروع برای کسانی که میان مشاوره، تراپی و کوچینگ مردد هستند. رایگان بودن این جلسه فرصتی ارزشمند برای محک زدن مسیر است.»',
    author: 'آیدا ن.',
    role: 'طراح محصول دیجیتال',
    topic: 'افزایش خودآگاهی',
  },
];

export const FreeIntroTestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-brand-surface border-t border-brand-surface-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-teal-50 border border-brand-teal-200/60 text-brand-teal-900 text-xs sm:text-sm font-semibold">
            <MessageSquareHeart className="w-4 h-4 text-brand-teal-700" />
            <span>تجربیات واقعی همراهان</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-neutral-900 tracking-tight">
            همراهان قبلی درباره جلسه معارفه چه می‌گویند؟
          </h2>
          <p className="text-sm sm:text-base text-brand-neutral-600 max-w-xl mx-auto leading-relaxed">
            بازخورد شرکت‌کنندگانی که اولین قدم خود را با جلسه معارفه ۴۵ دقیقه‌ای بلومیا برداشته‌اند.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-brand-surface-border shadow-soft-sm flex flex-col justify-between hover:shadow-soft transition-all"
            >
              <div>
                <Quote className="w-8 h-8 text-brand-teal-200 mb-4" />
                <p className="text-xs sm:text-sm text-brand-neutral-700 leading-relaxed mb-6 font-normal">
                  {item.quote}
                </p>
              </div>

              <div className="pt-4 border-t border-brand-surface-border flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-brand-neutral-900">
                    {item.author}
                  </div>
                  <div className="text-xs text-brand-neutral-500">
                    {item.role}
                  </div>
                </div>

                <span className="text-[11px] font-medium px-2 py-1 rounded-md bg-brand-teal-50 text-brand-teal-900 border border-brand-teal-200/50">
                  {item.topic}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
