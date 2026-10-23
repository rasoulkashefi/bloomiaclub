'use client';

import React from 'react';
import { HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const defaultFaqs = [
  {
    question: 'فرایند ثبت‌نام در رویدادها چگونه انجام می‌شود؟',
    answer:
      'در بلومیا کلاب، فرایند ثبت‌نام به صورت مستقیم از طریق پلتفرم‌های معتبر آموزشی مانند ایسمینار (eSeminar) و ایوند (Evand) انجام می‌شود. با کلیک بر روی دکمه «ثبت‌نام»، مستقیماً به صفحه رسمی رویداد در آن سایت هدایت می‌شوید و ثبت‌نام و پرداخت را با درگاه‌های امن انجام می‌دهید.',
  },
  {
    question: 'اگر نتوانم در ساعت مقرر رویداد حاضر شوم، آیا ویدیو ضبط‌شده را دریافت می‌کنم؟',
    answer:
      'بله، تمامی رویدادها و وبینارهای آنلاین بلومیا با کیفیت بالا ضبط می‌شوند و فایل کامل آن‌ها حداکثر ۲۴ ساعت پس از برگزاری، در پنل کاربری شما در ایسمینار یا ایوند قرار می‌گیرد و دسترسی مادام‌العمر به آن خواهید داشت.',
  },
  {
    question: 'لینک ورود به وبینار چگونه برای من ارسال می‌شود؟',
    answer:
      'بلافاصله پس از تکمیل ثبت‌نام در ایسمینار یا ایوند، لینک ورود در پنل کاربری شما فعال می‌شود. همچنین چند ساعت و ۳۰ دقیقه قبل از آغاز جلسه، پیامک یادآوری حاوی لینک مستقیم ورود برای شماره تماس ثبت‌شده شما ارسال می‌گردد.',
  },
  {
    question: 'آیا برای شرکت در وبینارها به پیش‌نیاز یا مدرک تحصیلی خاصی نیاز است؟',
    answer:
      'خیر، رویدادهای بلومیا کلاب با زبانی شفاف، کاربردی و به‌دور از اصطلاحات پیچیده طراحی شده‌اند تا برای هر فردی که به دنبال بهبود وضوح ذهنی، تنظیم روابط یا پیشرفت شغلی است قابل استفاده باشد.',
  },
  {
    question: 'آیا در طول وبینار امکان پرسش و پاسخ مستقیم با کوچ وجود دارد؟',
    answer:
      'بله، ویژگی متمایز رویدادهای کوچینگ بلومیا ماهیت تعاملی آن‌هاست. در انتهای هر جلسه حداقل ۳۰ دقیقه زمان برای پاسخگویی صوتی و متنی به چالش‌ها و سوالات شرکت‌کنندگان در نظر گرفته شده است.',
  },
];

export const EventsFaqSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-brand-surface-paper border-b border-brand-neutral-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-teal-50 text-brand-teal-900 text-xs font-bold border border-brand-teal-200">
            <HelpCircle className="w-3.5 h-3.5 text-brand-teal-700" />
            <span>پاسخ به ابهامات متداول</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-neutral-900 tracking-tight">
            سوالات متداول شرکت در رویدادها
          </h2>
          <p className="text-sm sm:text-base text-brand-neutral-600">
            تمام نکاتی که قبل از ثبت‌نام و ورود به جلسات باید بدانید
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {defaultFaqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="border border-brand-neutral-200 rounded-2xl px-5 sm:px-6 bg-brand-surface data-[state=open]:border-brand-teal-300 data-[state=open]:shadow-soft transition-all"
            >
              <AccordionTrigger className="text-start text-sm sm:text-base font-bold text-brand-neutral-900 hover:text-brand-teal-800 py-4 leading-snug">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-xs sm:text-sm text-brand-neutral-600 leading-[1.8] pt-1 pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
