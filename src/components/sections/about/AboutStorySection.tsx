import React from 'react';
import { BookOpen, Sparkles, Quote, Shield } from 'lucide-react';

export const AboutStorySection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white border-b border-brand-surface-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-teal-50 border border-brand-teal-200/60 text-brand-teal-900 text-xs sm:text-sm font-semibold">
            <BookOpen className="w-4 h-4 text-brand-teal-700" />
            <span>فلسفه وجودی</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-neutral-900 tracking-tight">
            داستان شکل‌گیری بلومیا کلاب
          </h2>
          <p className="text-sm sm:text-base text-brand-neutral-600 max-w-xl mx-auto leading-relaxed">
            پاسخی اصیل به نیاز به عمق، در دنیایی که در سطح‌نگری غرق شده است.
          </p>
        </div>

        {/* Narrative Flow */}
        <div className="space-y-8 text-brand-neutral-700 leading-relaxed text-sm sm:text-base">
          {/* Highlight Quote Box */}
          <div className="bg-brand-surface rounded-3xl p-6 sm:p-8 border border-brand-surface-border relative shadow-soft-sm">
            <Quote className="w-8 h-8 text-brand-teal-200 mb-3" />
            <p className="text-base sm:text-lg md:text-xl font-bold text-brand-neutral-900 leading-relaxed">
              «چرا در دنیایی پر از کتاب‌ها، پادکست‌ها و توصیه‌های موفقیت، هنوز در خلوت خود احساس تنهایی، رکود و گم‌شدگی می‌کنیم؟»
            </p>
          </div>

          <p>
            بلومیا در پاسخ به همین پرسش متولد شد. بنیان‌گذاران و همراهان اولیه بلومیا، پس از سال‌ها فعالیت در حوزه‌های رهبری سازمانی، توسعه فردی و علوم رفتاری، متوجه یک خلاء بنیادین شدند: نبود فضایی امن، معتبر و بدون پیش‌داوری که در آن فرد بتواند بدون ترس از قضاوت شدن، کلاف سردرگم افکارش را باز کند.
          </p>

          <p>
            بیشتر راه‌حل‌های موجود در بازار یا به شعارهای انگیزشی زودگذر پناه می‌بردند، یا مشاورانی بودند که از بیرون نسخه‌های یکسان برای انسان‌های متفاوت تجویز می‌کردند. ما باور داشتیم که رشد انسانی، یک خط تولید ماشینی نیست. هیچ دو انسانی نقشه راه یکسانی برای شادکامی، رضایت شغلی و تعادل زیستی ندارند.
          </p>

          <p>
            ما بلومیا کلاب را ساختیم تا پناهگاهی برای ذهن‌های جستجوگر باشد؛ بستری حرفه‌ای که در آن کوچ‌های تأییدشده فدراسیون بین‌المللی کوچینگ (ICF) در کنار شما قرار می‌گیرند تا با پرسیدن سوالات عمیق، چراغی بر نقاط تاریک مسیر بیندازند و قدرت عاملیت درونی‌تان را بیدار کنند.
          </p>
        </div>

        {/* Key Takeaway Box */}
        <div className="mt-12 p-6 rounded-2xl bg-brand-teal-50 border border-brand-teal-200/80 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-right">
          <div className="w-12 h-12 rounded-xl bg-brand-teal-900 text-white flex items-center justify-center shrink-0">
            <Shield className="w-6 h-6 text-brand-teal-200" />
          </div>
          <div>
            <h3 className="text-base font-bold text-brand-teal-950 mb-1">
              تعریف بلومیا از رشد: بلوغ درونی، نه نمایش بیرونی
            </h3>
            <p className="text-xs sm:text-sm text-brand-teal-900/80 leading-relaxed">
              ما موفقیت را در عناوین پر زرق‌وبرق یا شتاب‌زدگی نمی‌بینیم؛ موفقیت در نگاه بلومیا، زیست همسو با ارزش‌ها، شفافیت در تصمیم‌گیری و توانایی تجربه آرامش در دل تلاطم‌های زندگی است.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
