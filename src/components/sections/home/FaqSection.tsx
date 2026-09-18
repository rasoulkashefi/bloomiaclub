'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, HelpCircle, PhoneCall } from 'lucide-react';

export const faqs = [
  {
    question: 'جلسه معارفه رایگان (جلسه صفر) چیست و در آن چه اتفاقی می‌افتد؟',
    answer:
      'جلسه معارفه یک گفتگوی اختصاصی ۳۰ دقیقه‌ای و کاملاً رایگان با کوچ منتخب شماست. در این جلسه، شما چالش و هدف اصلی‌تان را مطرح می‌کنید، با شیوه تعامل و سبک کاری مربی آشنا می‌شوید و در نهایت ارزیابی می‌کنید که آیا احساس راحتی و شیمی مناسب برای همکاری بلندمدت وجود دارد یا خیر.',
  },
  {
    question: 'تفاوت کوچینگ با روان‌درمانی و مشاوره چیست؟',
    answer:
      'روان‌درمانی معمولاً بر ترمیم آسیب‌های گذشته و درمان اختلالات تمرکز دارد؛ مشاوره به شما راهکارها و نسخه‌های از پیش تعیین‌شده کارشناسی ارائه می‌دهد؛ اما کوچینگ با تمرکز بر «اکنون و آینده»، از طریق پرسش‌های عمیق به شما کمک می‌کند پتانسیل‌های نهفته خود را کشف کرده و شخصاً بهترین راهکار عملی را برای پیشرفت تدوین کنید.',
  },
  {
    question: 'مربیان بلومیا چه مدارک و تاییدیه‌هایی دارند؟',
    answer:
      'تمامی کوچ‌های فعال در بلومیا دوره‌های استاندارد بین‌المللی فدراسیون بین‌المللی کوچینگ (ICF) را سپری کرده و دارای سطوح اعتباری ACC، PCC یا MCC هستند. علاوه بر این، تیم کنترل کیفیت بلومیا سوابق تجربی، بازخورد مراجعین و التزام آن‌ها به کدهای اخلاقی را بررسی می‌کند.',
  },
  {
    question: 'جلسات چگونه برگزار می‌شوند و آیا به صورت آنلاین است؟',
    answer:
      'تمامی جلسات به صورت آنلاین و تصویری در بستر اختصاصی و امن برگزار می‌شوند. شما از هر شهر یا کشوری می‌توانید تنها با یک گوشی هوشمند یا لپ‌تاپ و اینترنت پایدار در جلسات شرکت کنید. لینک ورود پس از رزرو برای شما ارسال می‌شود.',
  },
  {
    question: 'اگر پس از جلسه اول متوجه شدم مربی برای من مناسب نیست چه کنم؟',
    answer:
      'هدف جلسه معارفه رایگان دقیقاً همین است که بدون هیچ ریسک مالی، میزان انطباق خود با مربی را بسنجید. اگر احساس کردید سبک آن مربی با شما هماهنگ نیست، می‌توانید به راحتی با یکی دیگر از کوچ‌های تخصصی بلومیا جلسه معارفه داشته باشید.',
  },
  {
    question: 'معمولاً چند جلسه کوچینگ برای رسیدن به نتیجه لازم است؟',
    answer:
      'مدت زمان فرآیند کوچینگ بسته به عمق هدف متفاوت است. چالش‌های مقطعی و تصمیم‌گیری‌های فوری معمولاً در ۴ تا ۶ جلسه و اهداف عمیق‌تر مانند تغییر سبک زندگی، جهش شغلی یا توسعه مهارت‌های رهبری در دوره‌های ۳ تا ۶ ماهه (۸ تا ۱۲ جلسه) دنبال می‌شوند.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  return (
    <section className="py-16 md:py-24 bg-brand-surface-paper border-b border-brand-surface-border">
      {/* FAQ Schema for Search Engines & GEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12 md:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-teal-50 text-brand-teal-900 text-xs font-semibold border border-brand-teal-200">
            <HelpCircle className="w-3.5 h-3.5 text-brand-coral-600" />
            <span>پاسخ به سوالات پرتکرار</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-neutral-900 tracking-tight">
            پرسش‌های متداول درباره کوچینگ بلومیا
          </h2>
          <p className="text-sm sm:text-base text-brand-neutral-600 leading-relaxed max-w-2xl mx-auto">
            پاسخ به رایج‌ترین دغدغه‌ها و سوالات مراجعین پیش از شروع سفر کوچینگ.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-brand-surface rounded-2xl border border-brand-neutral-200/80 overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-5 text-right font-bold text-sm sm:text-base text-brand-neutral-900 hover:text-brand-teal-900 transition-colors cursor-pointer gap-4 min-h-[48px]"
                  aria-expanded={isOpen}
                >
                  <span className="flex-1 leading-snug">{faq.question}</span>
                  <div
                    className={`w-7 h-7 rounded-full bg-brand-neutral-200/60 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-brand-teal-100 text-brand-teal-900' : 'text-brand-neutral-600'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-brand-neutral-600 leading-relaxed border-t border-brand-neutral-200/40 animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Callout */}
        <div className="mt-12 p-6 rounded-2xl bg-brand-teal-50 border border-brand-teal-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-teal-900 text-white flex items-center justify-center shrink-0">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-brand-teal-950">هنوز سوالی در ذهن دارید؟</p>
              <p className="text-xs text-brand-teal-800/80">همکاران ما در پشتیبانی مشتاقانه راهنمای شما هستند.</p>
            </div>
          </div>
          <Link
            href="/contact"
            className="px-5 py-2.5 rounded-xl bg-brand-teal-900 hover:bg-brand-teal-800 text-white text-xs sm:text-sm font-bold transition-colors whitespace-nowrap"
          >
            ارتباط با پشتیبانی
          </Link>
        </div>
      </div>
    </section>
  );
};
