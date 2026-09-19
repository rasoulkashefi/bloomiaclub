'use client';

import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const profileFaqs = [
  {
    question: 'جلسه معارفه چگونه برگزار می‌شود و چقدر زمان می‌برد؟',
    answer:
      'جلسه معارفه به صورت آنلاین از طریق بستر گوگل‌میت یا زوم به مدت ۳۰ دقیقه برگزار می‌شود. در این جلسه، نیازی به آمادگی قبلی ندارید؛ صرفاً به گفتگو پیرامون چالش‌ها، اهداف و آشنایی با متدولوژی کوچ می‌پردازیم.',
  },
  {
    question: 'فاصله زمانی میان جلسات کوچینگ چقدر است؟',
    answer:
      'بهترین بازه زمانی برای برگزاری جلسات، هر ۷ الی ۱۰ روز یک‌بار است تا مراجع فرصت کافی برای انجام اقدامات عملی، آزمودن بینش‌های جدید و مشاهده نتایج را در زندگی واقعی داشته باشد.',
  },
  {
    question: 'اگر نیاز به تغییر زمان جلسه داشته باشم، شرایط به چه صورت است؟',
    answer:
      'شما می‌توانید تا ۲۴ ساعت قبل از زمان مقرر، هماهنگی لازم را جهت تغییر زمان جلسه با پشتیبانی بلومیا یا مستقیماً با کوچ انجام دهید بدون اینکه جلسه‌ای از پکیج شما کسر شود.',
  },
  {
    question: 'آیا گفتگوهای مطرح‌شده در جلسه محرمانه می‌ماند؟',
    answer:
      'بله، ۱۰۰٪. رازداری و حفظ محرمانگی یکی از اصول تخطی‌ناپذیر و بنیادین کدهای اخلاقی فدراسیون بین‌المللی کوچینگ (ICF) است. هیچ بخشی از سخنان و اطلاعات شما تحت هیچ شرایطی با شخص ثالث به اشتراک گذاشته نمی‌شود.',
  },
];

export const CoachProfileFaqSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-brand-surface-paper border-t border-brand-surface-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-teal-50 border border-brand-teal-200/60 text-brand-teal-900 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5 text-brand-teal-700" />
            <span>پاسخ به ابهامات متداول</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-neutral-900 tracking-tight">
            پرسش‌های متداول درباره جلسات کوچینگ
          </h2>
          <p className="text-sm sm:text-base text-brand-neutral-600 leading-relaxed">
            اطلاعات ضروری درباره فرآیند برگزاری، تعهدات و زمان‌بندی جلسات.
          </p>
        </div>

        <Accordion.Root type="single" collapsible className="space-y-4">
          {profileFaqs.map((faq, idx) => (
            <Accordion.Item
              key={idx}
              value={`item-${idx}`}
              className="bg-brand-surface rounded-2xl border border-brand-neutral-200/80 shadow-soft-sm overflow-hidden data-[state=open]:border-brand-teal-300 transition-colors"
            >
              <Accordion.Header>
                <Accordion.Trigger className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-right font-bold text-sm sm:text-base text-brand-neutral-900 hover:text-brand-teal-900 transition-colors group min-h-[44px]">
                  <span>{faq.question}</span>
                  <ChevronDown className="w-5 h-5 text-brand-neutral-400 group-hover:text-brand-teal-800 transition-transform duration-200 group-data-[state=open]:rotate-180 shrink-0" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-brand-neutral-600 leading-relaxed border-t border-brand-neutral-100/80 pt-4 data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                {faq.answer}
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
};
