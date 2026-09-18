'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Quote, Star, ChevronRight, ChevronLeft } from 'lucide-react';

const testimonials = [
  {
    text: 'همیشه فکر می‌کردم کوچینگ فقط برای مدیران است، اما در بلومیا یاد گرفتم چطور بین نقش مادری و علایق شخصی‌ام تعادل ایجاد کنم. حالا با وضوح بیشتری برای آینده‌ام برنامه‌ریزی می‌کنم و آن احساس فرسودگی همیشگی جای خود را به انگیزه داده است.',
    avatar: '/images/comment-image/somayeh-rezaee.png',
    name: 'سمیه رضایی',
    title: 'خانه‌دار و فعال داوطلبانه',
  },
  {
    text: 'در دوران اوج فشار کاری و تردید در تصمیم‌گیری‌های کلان، جلسات کوچینگ بلومیا برای من مثل یک قطب‌نما عمل کرد. توانستم اولویت‌های استراتژیک بیزنس را شفاف کنم و از سد ترس‌هایی که مانع رشد تیمم بود عبور کنم. نگاه حرفه‌ای کوچ‌های این مجموعه بی‌نظیر است.',
    avatar: '/images/comment-image/arash-ghanbari.png',
    name: 'آرش قنبری',
    title: 'کارآفرین و مدیر استارتاپ',
  },
  {
    text: 'به عنوان زنی که کسب‌وکار خودش را دارد، همیشه با نادیده گرفتن توانمندی‌هایم کلنجار می‌رفتم. کوچینگ در بلومیا به من کمک کرد تا سندروم ایمپاستر را کنار بگذارم و با اعتمادبه‌نفس برای توسعه برندم اقدام کنم. نتیجه این جلسات، رشد ۳۰ درصدی فروش من در ۶ ماه بود.',
    avatar: '/images/comment-image/maryam-ebrahimi.png',
    name: 'مریم ابراهیمی',
    title: 'کارآفرین حوزه صنایع دستی',
  },
  {
    text: 'بزرگترین چالش من عدم تمرکز و پراکندگی اهدافم بود. در بلومیا مربی‌ای را پیدا کردم که دنیای من را می‌فهمید. با کمک او توانستم ساختار روزانه‌ام را بازسازی کنم و حالا با استرس کمتر، خروجی‌های بسیار باکیفیت‌تری در پروژه‌هایم دارم.',
    avatar: '/images/comment-image/alireza-shayan.png',
    name: 'علیرضا شایان',
    title: 'فریلنسر و متخصص تکنولوژی',
  },
];

export const TestimonialsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto rotate testimonials every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="py-16 md:py-24 bg-brand-surface border-b border-brand-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 md:mb-16">
          <span className="text-brand-teal-800 font-bold text-sm tracking-wide uppercase">
            تجربه واقعی مراجعین
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-neutral-900 tracking-tight">
            روایت‌های واقعی تغییر و شکوفایی
          </h2>
          <p className="text-sm sm:text-base text-brand-neutral-600 leading-relaxed">
            بشنوید چگونه جلسات گفتگوی آگاهانه در بلومیا، بن‌بست‌های ذهنی و شغلی را به فرصت تبدیل کرده‌اند.
          </p>
        </div>

        {/* Featured Card + Navigation */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-brand-surface-paper rounded-3xl p-6 sm:p-10 md:p-12 border border-brand-neutral-200 shadow-elevated">
            <Quote className="w-10 h-10 sm:w-14 sm:h-14 text-brand-teal-200 opacity-80 mb-6" />

            <p className="text-base sm:text-lg md:text-xl text-brand-neutral-800 leading-relaxed font-normal min-h-[100px] sm:min-h-[90px]">
              «{testimonials[activeIndex].text}»
            </p>

            <div className="pt-8 mt-6 border-t border-brand-neutral-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden bg-brand-neutral-100 border-2 border-brand-teal-200 shrink-0">
                  <Image
                    src={testimonials[activeIndex].avatar}
                    alt={testimonials[activeIndex].name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-base font-bold text-brand-neutral-900">
                    {testimonials[activeIndex].name}
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-neutral-500">
                    {testimonials[activeIndex].title}
                  </p>
                </div>
              </div>

              {/* Stars & Navigation Arrows */}
              <div className="flex items-center gap-6 self-end sm:self-center">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    aria-label="نظر قبلی"
                    className="w-10 h-10 rounded-full border border-brand-neutral-300 hover:bg-brand-neutral-100 flex items-center justify-center text-brand-neutral-700 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="نظر بعدی"
                    className="w-10 h-10 rounded-full border border-brand-neutral-300 hover:bg-brand-neutral-100 flex items-center justify-center text-brand-neutral-700 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                aria-label={`رفتن به اسلاید ${idx + 1}`}
                className={`transition-all duration-300 rounded-full h-2.5 ${
                  idx === activeIndex
                    ? 'w-8 bg-brand-teal-900'
                    : 'w-2.5 bg-brand-neutral-300 hover:bg-brand-neutral-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
