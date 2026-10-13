import React from 'react';
import { Building2, Users2, ShieldAlert, Award, ArrowDown, Phone } from 'lucide-react';

const CORPORATE_SERVICES = [
  {
    icon: Award,
    title: 'کوچینگ مدیران ارشد و رهبران (Executive Coaching)',
    description:
      'همراهی اختصاصی ۱ به ۱ با بنیان‌گذاران، مدیران عامل و مدیران C-Level برای اتخاذ تصمیمات استراتژیک شجاعانه، تفویض اختیار اثربخش و مدیریت استرس ناشی از مسئولیت.',
  },
  {
    icon: Users2,
    title: 'کوچینگ و تسهیل‌گری تیمی (Team Coaching)',
    description:
      'هم‌راستاسازی اعضای تیم پیرامون اهداف مشترک، حل تعارضات سازمانی پنهان، و ساختن فرهنگ امنیت روانی که در آن ایده‌های نوآورانه بدون ترس مطرح شوند.',
  },
  {
    icon: Building2,
    title: 'کارگاه‌های توسعه تاب‌آوری و فرهنگ سازمانی',
    description:
      'طراحی برنامه‌های هدفمند برای پیشگیری از فرسودگی شغلی، مدیریت تغییرات سریع سازمانی، و ایجاد تعادل سالم میان فشارهای کاری و زندگی نیروهای کلیدی.',
  },
];

export const ContactCorporateSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white border-b border-brand-surface-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-teal-50 border border-brand-teal-200/60 text-brand-teal-900 text-xs sm:text-sm font-semibold">
            <Building2 className="w-4 h-4 text-brand-teal-700" />
            <span>خدمات ویژه کسب‌وکارها</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-neutral-900 tracking-tight">
            کوچینگ برای سازمان‌ها و شرکت‌های پیشرو
          </h2>
          <p className="text-sm sm:text-base text-brand-neutral-600 max-w-xl mx-auto leading-relaxed">
            بلومیا کلاب شریک قابل‌اتکای سازمان‌هایی است که رشد کسب‌وکار خود را در گرو رشد و سلامت سرمایه انسانی می‌دانند.
          </p>
        </div>

        {/* 3 Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {CORPORATE_SERVICES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-brand-surface rounded-3xl p-6 sm:p-8 border border-brand-surface-border shadow-soft-sm flex flex-col justify-start hover:border-brand-teal-300 transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-white border border-brand-surface-border text-brand-teal-900 flex items-center justify-center mb-6 shadow-soft-sm">
                  <Icon className="w-6 h-6 text-brand-teal-800" />
                </div>

                <h3 className="text-lg font-bold text-brand-neutral-900 mb-3 leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-brand-neutral-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Corporate Consultation Callout */}
        <div className="bg-brand-teal-900 text-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-soft-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-right">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              جلسه ۳۰ دقیقه‌ای نیازسنجی سازمانی (رایگان)
            </h3>
            <p className="text-xs sm:text-sm text-brand-teal-100/90 leading-relaxed max-w-2xl">
              پیش از هرگونه تصمیم‌گیری، مشاوران سازمانی بلومیا با مدیران منابع انسانی یا مدیران ارشد شما گفتگو می‌کنند تا بسته پیشنهادی دقیقاً متناسب با چالش و ساختار شما طراحی شود.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3">
            <a
              href="#contact-form"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold text-brand-teal-950 bg-white hover:bg-brand-teal-50 transition-colors min-h-[44px]"
            >
              <span>درخواست نیازسنجی سازمانی</span>
              <ArrowDown className="w-4 h-4 text-brand-teal-900" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
