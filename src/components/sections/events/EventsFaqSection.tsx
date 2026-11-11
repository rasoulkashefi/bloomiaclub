import React from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

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

        <div className="space-y-4">
          {defaultFaqs.map((faq, index) => (
            <details
              key={index}
              className="bl-faq-details group border border-brand-neutral-200 rounded-2xl bg-brand-surface open:border-brand-teal-300 open:shadow-soft transition-all overflow-hidden"
            >
              <summary className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 text-start text-sm sm:text-base font-bold text-brand-neutral-900 hover:text-brand-teal-800 leading-snug min-h-[44px] cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal-800/40 rounded-2xl">
                <span>{faq.question}</span>
                <ChevronDown
                  aria-hidden="true"
                  className="w-4 h-4 text-brand-neutral-500 transition-transform duration-200 group-open:rotate-180 shrink-0"
                />
              </summary>
              <div className="px-5 sm:px-6 text-xs sm:text-sm text-brand-neutral-600 leading-[1.8] pt-3 pb-4 border-t border-brand-neutral-200/60">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};
