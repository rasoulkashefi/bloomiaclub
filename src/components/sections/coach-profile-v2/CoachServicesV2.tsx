'use client';

import React from 'react';
import { Gift, User, Layers } from 'lucide-react';
import type { Coach } from '@/lib/coaches';

const toPersianDigits = (n: number | string) => 
  String(n).replace(/[0-9]/g, d => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d, 10)]);

const formatPrice = (price: number | string | null | undefined, fallback: string) => {
  if (!price) return fallback;
  if (typeof price === 'number') {
    return toPersianDigits(price.toLocaleString('en-US')) + ' تومان';
  }
  return toPersianDigits(price);
};

export const CoachServicesV2 = ({ coach }: { coach: Coach }) => {
  return (
    <section className="bg-white py-16 md:py-24" dir="rtl">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-brand-neutral-900 text-center mb-10 md:mb-14">
          چطور می‌توانی با من شروع کنی؟
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="border border-brand-surface-border rounded-2xl p-6 md:p-8 bg-white hover:shadow-soft transition-shadow flex flex-col">
            <Gift className="w-8 h-8 text-brand-teal-900 mb-4" />
            <h3 className="text-lg font-bold text-brand-neutral-900">جلسه صفر رایگان</h3>
            <p className="text-sm text-brand-neutral-600 mt-2 leading-relaxed flex-grow">
              یک جلسه کوتاه برای آشنایی و بررسی اینکه آیا این مسیر برای تو مناسب است
            </p>
            <div className="text-xs text-brand-neutral-600 mt-3">۱ جلسه · ۶۰ دقیقه</div>
            <div className="text-lg font-bold text-brand-teal-900 mt-4">رایگان</div>
            <button className="w-full bg-brand-teal-900 hover:bg-brand-teal-700 text-white rounded-full py-3 text-sm font-semibold mt-4 transition-colors">
              رزرو جلسه
            </button>
          </div>

          <div className="border border-brand-surface-border rounded-2xl p-6 md:p-8 bg-white hover:shadow-soft transition-shadow flex flex-col">
            <User className="w-8 h-8 text-brand-teal-900 mb-4" />
            <h3 className="text-lg font-bold text-brand-neutral-900">کوچینگ فردی</h3>
            <p className="text-sm text-brand-neutral-600 mt-2 leading-relaxed flex-grow">
              یک جلسه مستقل برای کار روی یک مسئله مشخص
            </p>
            <div className="text-xs text-brand-neutral-600 mt-3">۱ جلسه · ۶۰ دقیقه</div>
            <div className="text-lg font-bold text-brand-teal-900 mt-4">
              {formatPrice(coach.packagePrices?.start, '۴,۵۰۰,۰۰۰ تومان')}
            </div>
            <button className="w-full border border-brand-teal-900 text-brand-teal-900 hover:bg-brand-teal-50 rounded-full py-3 text-sm font-semibold mt-4 transition-colors">
              مشاهده جزئیات
            </button>
          </div>

          <div className="border border-brand-surface-border rounded-2xl p-6 md:p-8 bg-white hover:shadow-soft transition-shadow flex flex-col">
            <Layers className="w-8 h-8 text-brand-teal-900 mb-4" />
            <h3 className="text-lg font-bold text-brand-neutral-900">پکیج ۸ جلسه‌ای</h3>
            <p className="text-sm text-brand-neutral-600 mt-2 leading-relaxed flex-grow">
              برای کسانی که می‌خواهند تغییر عمیق و پایدار داشته باشند
            </p>
            <div className="text-xs text-brand-neutral-600 mt-3">۸ جلسه · هر جلسه ۶۰ دقیقه</div>
            <div className="text-lg font-bold text-brand-teal-900 mt-4">
              {formatPrice(coach.packagePrices?.transformation, '۲,۸۰۰,۰۰۰ تومان')} <span className="text-sm font-normal text-brand-neutral-600">/ جلسه</span>
            </div>
            <button className="w-full border border-brand-teal-900 text-brand-teal-900 hover:bg-brand-teal-50 rounded-full py-3 text-sm font-semibold mt-4 transition-colors">
              مشاهده جزئیات
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
