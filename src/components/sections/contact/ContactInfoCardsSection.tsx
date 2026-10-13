import React from 'react';
import { Phone, Mail, Send, MapPin, ExternalLink, ArrowLeft } from 'lucide-react';

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const ContactInfoCardsSection: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-white border-b border-brand-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Phone */}
          <div className="bg-brand-surface rounded-3xl p-6 border border-brand-surface-border shadow-soft-sm flex flex-col justify-between hover:border-brand-teal-300 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white border border-brand-surface-border text-brand-teal-900 flex items-center justify-center mb-5 shadow-soft-sm">
                <Phone className="w-6 h-6 text-brand-teal-800" />
              </div>

              <h3 className="text-base font-bold text-brand-neutral-900 mb-2">
                تماس تلفنی مستقیم
              </h3>
              <p className="text-xs text-brand-neutral-600 leading-relaxed mb-4">
                پاسخگویی به سوالات عمومی و پیگیری رزروها در روزهای کاری.
              </p>

              <div className="text-sm font-bold text-brand-teal-900 dir-ltr text-right mb-6">
                ۰۲۱ - ۹۱۰۰ ۰۰۰۰
              </div>
            </div>

            <a
              href="tel:02191000000"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-bold text-brand-teal-900 hover:bg-brand-teal-50 border border-brand-teal-300 transition-colors min-h-[44px]"
            >
              <span>تماس با مشاوران</span>
              <Phone className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 2: Email */}
          <div className="bg-brand-surface rounded-3xl p-6 border border-brand-surface-border shadow-soft-sm flex flex-col justify-between hover:border-brand-teal-300 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white border border-brand-surface-border text-brand-teal-900 flex items-center justify-center mb-5 shadow-soft-sm">
                <Mail className="w-6 h-6 text-brand-teal-800" />
              </div>

              <h3 className="text-base font-bold text-brand-neutral-900 mb-2">
                ارسال ایمیل
              </h3>
              <p className="text-xs text-brand-neutral-600 leading-relaxed mb-4">
                برای ارسال درخواست‌های رسمی، همکاری و پیشنهادات کاری.
              </p>

              <div className="text-xs sm:text-sm font-semibold text-brand-neutral-800 dir-ltr text-right mb-6 truncate">
                info@bloomiaclub.com
              </div>
            </div>

            <a
              href="mailto:info@bloomiaclub.com"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-bold text-brand-teal-900 hover:bg-brand-teal-50 border border-brand-teal-300 transition-colors min-h-[44px]"
            >
              <span>ارسال ایمیل</span>
              <Mail className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 3: Social Networks */}
          <div className="bg-brand-surface rounded-3xl p-6 border border-brand-surface-border shadow-soft-sm flex flex-col justify-between hover:border-brand-teal-300 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white border border-brand-surface-border text-brand-teal-900 flex items-center justify-center mb-5 shadow-soft-sm">
                <Send className="w-6 h-6 text-brand-teal-800" />
              </div>

              <h3 className="text-base font-bold text-brand-neutral-900 mb-2">
                شبکه‌های ارتباطی
              </h3>
              <p className="text-xs text-brand-neutral-600 leading-relaxed mb-4">
                دنبال کردن آموزه‌ها و ارتباط در بسترهای اجتماعی.
              </p>

              <div className="flex items-center gap-2 mb-6">
                <a
                  href="https://t.me/bloomiaclub"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="کانال تلگرام"
                  className="w-9 h-9 rounded-xl bg-white border border-brand-surface-border flex items-center justify-center text-brand-teal-900 hover:bg-brand-teal-50 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com/bloomiaclub"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="اینستاگرام"
                  className="w-9 h-9 rounded-xl bg-white border border-brand-surface-border flex items-center justify-center text-brand-teal-900 hover:bg-brand-teal-50 transition-colors"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com/company/bloomiaclub"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="لینکدین"
                  className="w-9 h-9 rounded-xl bg-white border border-brand-surface-border flex items-center justify-center text-brand-teal-900 hover:bg-brand-teal-50 transition-colors"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

            <a
              href="https://t.me/bloomiaclub"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-bold text-brand-teal-900 hover:bg-brand-teal-50 border border-brand-teal-300 transition-colors min-h-[44px]"
            >
              <span>پیام در تلگرام</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 4: Office */}
          <div className="bg-brand-surface rounded-3xl p-6 border border-brand-surface-border shadow-soft-sm flex flex-col justify-between hover:border-brand-teal-300 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white border border-brand-surface-border text-brand-teal-900 flex items-center justify-center mb-5 shadow-soft-sm">
                <MapPin className="w-6 h-6 text-brand-teal-800" />
              </div>

              <h3 className="text-base font-bold text-brand-neutral-900 mb-2">
                دفتر مرکزی بلومیا
              </h3>
              <p className="text-xs text-brand-neutral-600 leading-relaxed mb-4">
                جلسات حضوری سازمانی صرفاً با تعیین وقت قبلی هماهنگ می‌شود.
              </p>

              <div className="text-xs text-brand-neutral-700 leading-relaxed mb-6">
                تهران، خیابان ولیعصر، مرکز نوآوری و توسعه کسب‌وکار
              </div>
            </div>

            <a
              href="#contact-form"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-bold text-brand-teal-900 hover:bg-brand-teal-50 border border-brand-teal-300 transition-colors min-h-[44px]"
            >
              <span>هماهنگی جلسه حضوری</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
