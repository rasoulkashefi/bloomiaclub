import React from 'react';
import type { Coach } from '@/lib/coaches';

const ARTICLES = [
  {
    id: 1,
    title: 'حقیقت مفهوم وقت تلف شده',
    date: '۲۸ خرداد ۱۴۰۴'
  },
  {
    id: 2,
    title: 'چرا تصمیم‌گیری برای ما سخت می‌شود؟',
    date: '۱۵ اردیبهشت ۱۴۰۴'
  },
  {
    id: 3,
    title: '۵ نشانه اینکه وقت تغییر رسیده',
    date: '۳ فروردین ۱۴۰۴'
  },
  {
    id: 4,
    title: 'آیا کمال‌گرایی باعث پیشرفت می‌شود؟',
    date: '۲۰ بهمن ۱۴۰۳'
  }
];

export const CoachArticlesV2 = ({ coach }: { coach: Coach }) => {
  // TODO: Conditional rendering based on coach articles
  
  return (
    <section className="bg-brand-surface py-16 md:py-24" dir="rtl">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl md:text-2xl font-bold text-brand-neutral-900">
            از نوشته‌های {coach.name}
          </h2>
          <a href="#" className="text-sm text-brand-teal-900 hover:text-brand-teal-700 font-medium transition-colors">
            مشاهده همه ←
          </a>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-8">
          {ARTICLES.map((article) => (
            <article key={article.id} className="flex flex-col group cursor-pointer">
              <div className="bg-brand-surface-muted rounded-xl aspect-[3/2] mb-3 overflow-hidden">
                <div className="w-full h-full bg-brand-surface-border/50 group-hover:scale-105 transition-transform duration-300"></div>
              </div>
              <div className="text-xs text-brand-neutral-600">
                {article.date}
              </div>
              <h3 className="text-sm font-semibold text-brand-neutral-900 mt-1 line-clamp-2 leading-relaxed group-hover:text-brand-teal-900 transition-colors">
                {article.title}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
