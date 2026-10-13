import React from 'react';
import { ClipboardCheck, PhoneCall, Video, Check } from 'lucide-react';

const STEPS = [
  {
    number: '۱',
    icon: ClipboardCheck,
    title: 'ثبت آنلاین درخواست',
    duration: 'کمتر از ۲ دقیقه',
    description:
      'فرم ساده رزرو را با مشخصات اولیه و حوزه دغدغه خود پر کنید. می‌توانید کوچ مورد نظر را انتخاب کرده یا انتخاب را به مشاوران بلومیا بسپارید.',
  },
  {
    number: '۲',
    icon: PhoneCall,
    title: 'تماس و هماهنگی زمان',
    duration: 'ظرف ۲۴ ساعت کاری',
    description:
      'تیم ارتباط با مراجعان بلومیا با شما تماس می‌گیرد تا ساعت دقیق جلسه را بر اساس تقویم شخصی شما و کوچ منتخب تنظیم و نهایی کند.',
  },
  {
    number: '۳',
    icon: Video,
    title: 'برگزاری جلسه ۴۵ دقیقه‌ای',
    duration: 'کاملاً آنلاین و اختصاصی',
    description:
      'جلسه در بستر امن ویدیوکال برگزار می‌شود؛ فضایی امن و بدون قضاوت برای عمیق شدن در موضوع و دستیابی به شفافیت و راهکارهای ملموس.',
  },
];

export const FreeIntroProcessSection: React.FC = () => {
  return (
    <section id="process" className="py-16 md:py-24 bg-white border-t border-brand-surface-border scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-teal-50 border border-brand-teal-200/60 text-brand-teal-900 text-xs sm:text-sm font-semibold">
            <span>مسیر ساده از تصمیم تا اقدام</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-neutral-900 tracking-tight">
            روند برگزاری جلسه معارفه در ۳ گام شفاف
          </h2>
          <p className="text-sm sm:text-base text-brand-neutral-600 max-w-xl mx-auto leading-relaxed">
            ما تمام فرآیندهای پیچیده را حذف کرده‌ایم تا بدون کوچک‌ترین دغدغه‌ای بتوانید تجربه زیسته خود را با یک کوچ معتبر بین‌المللی بیازمایید.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative bg-brand-surface rounded-3xl p-6 sm:p-8 border border-brand-surface-border shadow-soft-sm flex flex-col justify-between hover:border-brand-teal-300 transition-all group"
              >
                {/* Step Top Bar */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-brand-teal-900 text-white flex items-center justify-center shadow-soft">
                      <Icon className="w-6 h-6 text-brand-teal-100" />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-teal-50 text-brand-teal-900 border border-brand-teal-200/50">
                        {step.duration}
                      </span>
                      <span className="text-2xl font-black text-brand-neutral-300 group-hover:text-brand-teal-600 transition-colors">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-brand-neutral-900 mb-3">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-brand-neutral-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Step Bottom Mini Accent */}
                <div className="mt-6 pt-4 border-t border-brand-surface-border flex items-center gap-2 text-xs text-brand-teal-900 font-medium">
                  <Check className="w-3.5 h-3.5 text-brand-teal-700" />
                  <span>استاندارد کیفیت بلومیا</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
