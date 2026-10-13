import React from 'react';
import { Layers, Headphones, HelpCircle, MessageSquareQuote, CheckSquare, Sparkles } from 'lucide-react';

const PILLARS = [
  {
    icon: Headphones,
    title: 'شنود عمیق و چندبعدی (سطح ۳)',
    description:
      'کوچ نه فقط کلمات، بلکه مکث‌ها، لحن صدا، زبان بدن و باورهای پنهان در لایه‌های زیرین کلام شما را می‌شنود تا تصویر کاملی از دغدغه‌تان بسازد.',
  },
  {
    icon: HelpCircle,
    title: 'پرسشگری تحول‌آفرین سقراطی',
    description:
      'پرسش‌هایی که کلیشه‌ها و پیش‌فرض‌های کهنه ذهنی شما را به چالش می‌کشند و راه‌های تازه‌ای را پیش روی چشمانتان نمایان می‌سازند.',
  },
  {
    icon: MessageSquareQuote,
    title: 'آینگی و بازخورد بدون قضاوت',
    description:
      'کوچ مانند آینه‌ای شفاف عمل می‌کند؛ تناقض‌ها، نقاط قوت ناشناخته و موانع پنهان را بازتاب می‌دهد تا خودآگاهی به بالاترین سطح برسد.',
  },
  {
    icon: CheckSquare,
    title: 'طراحی اقدام و عاملیت پایدار',
    description:
      'هر جلسه با تعیین گام‌های شفاف، قابل اجرا و سفارشی‌سازی‌شده برای دنیای واقعی شما به پایان می‌رسد تا تغییر در عمل متجلی شود.',
  },
];

const METHOD_TAGS = [
  'شنود فعال سطح ۳',
  'پرسشگری سقراطی',
  'استانداردهای بین‌المللی ICF',
  'علوم رفتاری و روان‌شناسی مثبت‌گرا',
  'تفکر سیستمی',
  'توسعه عاملیت فردی',
];

export const AboutApproachSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-brand-surface border-b border-brand-surface-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-teal-50 border border-brand-teal-200/60 text-brand-teal-900 text-xs sm:text-sm font-semibold">
            <Layers className="w-4 h-4 text-brand-teal-700" />
            <span>روش‌شناسی اختصاصی</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-neutral-900 tracking-tight">
            رویکرد کوچینگ در بلومیا کلاب
          </h2>
          <p className="text-sm sm:text-base text-brand-neutral-600 max-w-xl mx-auto leading-relaxed">
            جلسات در بلومیا شبیه کلاس درس یا نصیحت‌های معمول نیستند؛ بلکه سفری اکتشافی و شراکتی هستند.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12">
          {PILLARS.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-surface-border shadow-soft-sm flex flex-col justify-start hover:border-brand-teal-300 transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-teal-50 border border-brand-teal-200 text-brand-teal-900 flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-brand-teal-800" />
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-brand-neutral-900 mb-3">
                  {p.title}
                </h3>

                <p className="text-xs sm:text-sm text-brand-neutral-600 leading-relaxed">
                  {p.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Method Tags */}
        <div className="bg-white rounded-2xl p-6 border border-brand-surface-border text-center">
          <div className="text-xs font-bold text-brand-neutral-500 mb-4">
            اصول و چارچوب‌های علمی مورد استفاده در فرآیند کوچینگ بلومیا:
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {METHOD_TAGS.map((tag, i) => (
              <span
                key={i}
                className="text-xs sm:text-sm font-medium px-3.5 py-1.5 rounded-full bg-brand-surface border border-brand-surface-border text-brand-neutral-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
