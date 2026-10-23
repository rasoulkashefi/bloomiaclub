'use client';

import React from 'react';
import { Target, Award, MessageCircle, FileCheck } from 'lucide-react';

const pillars = [
  {
    num: '۰۱',
    icon: Target,
    title: 'یادگیری کاربردی و مهارت‌محور',
    description:
      'به دور از کلیشه‌ها و شعارهای انگیزشی زودگذر؛ آموزش‌ها بر پایه علوم اعصاب، روانشناسی مثبت‌گرا و چارچوب‌های استاندارد کوچینگ طراحی شده‌اند.',
  },
  {
    num: '۰۲',
    icon: Award,
    title: 'کوچ‌های دارای گواهی معتبر ICF',
    description:
      'تمام ارائه‌دهندگان رویدادهای بلومیا، کوچ‌های ارزیابی‌شده و دارای صلاحیت‌های رسمی فدراسیون بین‌المللی کوچینگ هستند.',
  },
  {
    num: '۰۳',
    icon: MessageCircle,
    title: 'پرسش و پاسخ اختصاصی و زنده',
    description:
      'در تمامی وبینارها و کارگاه‌ها، بخش قابل‌توجهی از زمان به تحلیل چالش‌های شرکت‌کنندگان و ارائه راه‌حل‌های اختصاصی اختصاص می‌یابد.',
  },
  {
    num: '۰۴',
    icon: FileCheck,
    title: 'دسترسی همیشگی به فایل‌ها و ضبط',
    description:
      'تمامی وبینارها با بالاترین کیفیت ضبط شده و بلافاصله به همراه اسلایدها و کاربرگ‌های تمرینی در پنل ایسمینار یا ایوند در اختیارتان قرار می‌گیرد.',
  },
];

export const EventsWhyAttendSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-brand-surface-paper border-t border-b border-brand-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow & Headline */}
        <div className="max-w-3xl space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-teal-50 text-brand-teal-900 text-xs font-bold border border-brand-teal-200">
            <span>تجربه رویداد در بلومیا</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-brand-neutral-900 tracking-tight leading-[1.3]">
            چرا شرکت در رویدادها و وبینارهای بلومیا کلاب؟
          </h2>
          <p className="text-sm sm:text-base text-brand-neutral-600 leading-relaxed">
            ما رویداد را فرصتی برای ایجاد «تغییر ملموس» در تصمیم‌گیری‌ها، روابط و عادات روزمره شما می‌دانیم؛ نه یک سخنرانی یک‌طرفه.
          </p>
        </div>

        {/* 4 Pillars Grid (ForumX style with dividers) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-brand-neutral-200">
          {pillars.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.num} className="py-6 md:py-4 px-0 md:px-6 lg:px-8 first:pt-0 md:first:pe-0 last:pb-0">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-black text-brand-teal-700 bg-brand-teal-50 px-2 py-0.5 rounded">
                    {item.num}
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-brand-teal-50 flex items-center justify-center text-brand-teal-900">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="mt-4 text-base sm:text-lg font-bold text-brand-neutral-900 leading-snug">
                  {item.title}
                </h3>

                <p className="mt-3 text-xs sm:text-sm text-brand-neutral-600 leading-[1.8]">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
