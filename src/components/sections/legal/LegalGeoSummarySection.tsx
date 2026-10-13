import React from 'react';
import { ShieldCheck, Lock, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';

const SUMMARY_POINTS = [
  {
    title: 'محرمانگی مطلق گفتگوها (ICF Standards)',
    desc: 'کلیه مذاکرات، فایل‌ها و اسرار مطرح‌شده در جلسات، مطابق کدهای اخلاقی فدراسیون بین‌المللی کوچینگ، کاملاً محرمانه بوده و به هیچ شخص ثالثی افشا نمی‌شود.',
  },
  {
    title: 'مرزبندی حرفه‌ای و مسئولیت مراجع',
    desc: 'کوچینگ جایگزین روان‌درمانی، پزشکی یا مشاوره مالی/حقوقی نیست. تصمیمات اجرایی زندگی و حرفه ۱۰۰٪ بر عهده شخص مراجع است.',
  },
  {
    title: 'سیاست انعطاف‌پذیر لغو و تغییر نوبت',
    desc: 'تغییر زمان یا لغو هر جلسه تا ۲۴ ساعت پیش از موعد مقرر، بدون هیچ هزینه‌ای و با هماهنگی مستقیم با پشتیبانی امکان‌پذیر است.',
  },
  {
    title: 'حفاظت از حریم خصوصی و امنیت داده‌ها',
    desc: 'اطلاعات هویتی و شماره‌های تماس کاربران منحصراً جهت هماهنگی جلسات استفاده شده و هرگز در اختیار شرکت‌های تبلیغاتی قرار نمی‌گیرد.',
  },
];

export const LegalGeoSummarySection: React.FC = () => {
  return (
    <section className="py-12 bg-white border-b border-brand-surface-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-surface rounded-3xl p-6 sm:p-8 md:p-10 border border-brand-teal-200/80 shadow-soft-sm text-right">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-6 border-b border-brand-surface-border mb-6">
            <span className="text-xs font-bold text-brand-teal-900 bg-brand-teal-50 border border-brand-teal-200/60 px-3 py-1.5 rounded-lg">
              خلاصه اصول حقوقی و اخلاقی در یک نگاه
            </span>
            <span className="text-xs text-brand-neutral-500 font-medium">
              پایبندی رسمی به منشور اخلاقی ICF
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SUMMARY_POINTS.map((point, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-teal-700 shrink-0 mt-1" />
                  <h3 className="text-sm sm:text-base font-bold text-brand-neutral-900">
                    {point.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-brand-neutral-600 leading-relaxed pr-6">
                  {point.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
