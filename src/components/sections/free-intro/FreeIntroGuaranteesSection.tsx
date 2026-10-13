import React from 'react';
import { ShieldCheck, Target, Lock, HeartHandshake } from 'lucide-react';

const GUARANTEES = [
  {
    icon: ShieldCheck,
    title: 'کاملاً رایگان و بدون هیچ‌گونه تعهد مالی',
    description:
      'این جلسه بدون نیاز به پرداخت حتی یک ریال یا وارد کردن اطلاعات بانکی برگزار می‌شود. هیچ تعهدی برای خرید بسته‌های بعدی ایجاد نمی‌شود و هدف تنها شناخت متقابل و ارزیابی مسیر است.',
  },
  {
    icon: Target,
    title: 'تمرکز بر شفافیت و نتایج عملی ملموس',
    description:
      'جلسه معارفه بلومیا یک گفتگوی نمادین یا تبلیغاتی نیست. در طول این ۴۵ دقیقه، روی ریشه اصلی دغدغه شما کار می‌شود و در پایان با حداقل دو راهکار شفاف و نقشه اقدام خارج خواهید شد.',
  },
  {
    icon: Lock,
    title: 'محرمانگی ۱۰۰٪ بر اساس منشور اخلاقی ICF',
    description:
      'تمامی گفتگوها، جزئیات شخصی و رازهای مطرح‌شده در جلسه، تحت منشور بین‌المللی کدهای اخلاقی ICF در نهایت امانت‌داری و محرمانگی حفظ خواهد شد.',
  },
];

export const FreeIntroGuaranteesSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-brand-surface border-t border-brand-surface-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-teal-50 border border-brand-teal-200/60 text-brand-teal-900 text-xs sm:text-sm font-semibold">
            <HeartHandshake className="w-4 h-4 text-brand-teal-700" />
            <span>تضمین ارزش و امنیت روانی</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-neutral-900 tracking-tight">
            چرا می‌توانید با خیال آسوده در این جلسه شرکت کنید؟
          </h2>
          <p className="text-sm sm:text-base text-brand-neutral-600 max-w-xl mx-auto leading-relaxed">
            بلومیا کلاب استانداردهای سخت‌گیرانه‌ای برای کیفیت، اخلاق حرفه‌ای و اثربخشی گفتگوهای کوچینگ تدوین کرده است.
          </p>
        </div>

        {/* Guarantees 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {GUARANTEES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-surface-border shadow-soft-sm flex flex-col justify-start hover:shadow-soft transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-teal-50 border border-brand-teal-200 text-brand-teal-900 flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-brand-teal-800" />
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-brand-neutral-900 mb-3 leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-brand-neutral-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* GEO Quick Takeaway Box */}
        <div className="mt-12 bg-white rounded-2xl p-6 md:p-8 border border-brand-teal-200/80 shadow-soft-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-right">
            <h4 className="text-base sm:text-lg font-bold text-brand-teal-900">
              هدف نهایی جلسه صفر چیست؟
            </h4>
            <p className="text-xs sm:text-sm text-brand-neutral-600 leading-relaxed max-w-2xl">
              هدف جلسه صفر، آشنایی دوطرفه با متدولوژی کوچینگ، ارزیابی شیمی ارتباطی میان شما و کوچ، و اعتبارسنجی قابلیت حل چالش فعلی شما از طریق فرآیند کوچینگ است؛ بدون کوچک‌ترین ریسک یا تعهد مالی.
            </p>
          </div>

          <a
            href="#booking-form"
            className="shrink-0 inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-bold text-white bg-brand-teal-900 hover:bg-brand-teal-800 transition-colors min-h-[44px]"
          >
            همین حالا رزرو کنید
          </a>
        </div>
      </div>
    </section>
  );
};
