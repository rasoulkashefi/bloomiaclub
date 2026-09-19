import React from 'react';
import { BookOpen, CheckCircle2, Compass, Award, Shield } from 'lucide-react';

export const CoachSeoGuideSection: React.FC = () => {
  return (
    <section className="py-16 bg-brand-surface border-t border-brand-surface-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-teal-50 border border-brand-teal-200/60 text-brand-teal-900 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5 text-brand-teal-700" />
            <span>راهنمای جامع مراجعین</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-neutral-900 tracking-tight">
            چگونه با همراهی یک کوچ حرفه‌ای به اهداف خود برسیم؟
          </h2>
          <p className="text-sm sm:text-base text-brand-neutral-600 leading-relaxed max-w-2xl mx-auto">
            کوچینگ یک شراکت خلاقانه و توانمندساز است که به شما کمک می‌کند فاصله‌ی بین «جایگاه کنونی» و «مقصد ایده‌آل» را با آگاهی و اطمینان طی کنید.
          </p>
        </div>

        {/* Structured Grid: Coaching vs other fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-brand-surface-paper p-6 rounded-2xl border border-brand-neutral-200/80 space-y-3 shadow-soft-sm">
            <div className="w-10 h-10 rounded-xl bg-brand-teal-50 text-brand-teal-800 flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-brand-neutral-900">
              کوچینگ (Coaching)
            </h3>
            <p className="text-xs sm:text-sm text-brand-neutral-600 leading-relaxed">
              تمرکز بر زمان حال و آینده، شفاف‌سازی ارزش‌ها، ایجاد مسئولیت‌پذیری فردی و اقدام عملی برای رسیدن به اهداف مشخص.
            </p>
          </div>

          <div className="bg-brand-surface-paper p-6 rounded-2xl border border-brand-neutral-200/80 space-y-3 shadow-soft-sm">
            <div className="w-10 h-10 rounded-xl bg-brand-teal-50 text-brand-teal-800 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-brand-neutral-900">
              منتورینگ (Mentoring)
            </h3>
            <p className="text-xs sm:text-sm text-brand-neutral-600 leading-relaxed">
              انتقال مستقیم تجربیات و راهکارهای شخصی از سوی یک متخصص ارشد در همان رشته خاص جهت راهنمایی قدم‌به‌قدم.
            </p>
          </div>

          <div className="bg-brand-surface-paper p-6 rounded-2xl border border-brand-neutral-200/80 space-y-3 shadow-soft-sm">
            <div className="w-10 h-10 rounded-xl bg-brand-teal-50 text-brand-teal-800 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-brand-neutral-900">
              روان‌درمانی (Therapy)
            </h3>
            <p className="text-xs sm:text-sm text-brand-neutral-600 leading-relaxed">
              تمرکز بر ریشه‌یابی آسیب‌های گذشته، درمان اختلالات روانی و بهبود آسیب‌های التیام‌نیافته توسط درمانگر بالینی.
            </p>
          </div>
        </div>

        {/* 4 Pillars of Coach Selection at Bloomia */}
        <div className="bg-brand-surface-paper p-6 sm:p-8 rounded-3xl border border-brand-neutral-200/90 space-y-4">
          <h3 className="text-lg font-bold text-brand-neutral-900">
            استانداردهای ۴ گانه بلومیا در سنجش صلاحیت کوچ‌ها:
          </h3>
          <ul className="space-y-3 text-xs sm:text-sm text-brand-neutral-700 leading-relaxed">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-brand-teal-700 shrink-0 mt-0.5" />
              <span>
                <strong>گواهینامه معتبر فدراسیون بین‌المللی کوچینگ (ICF):</strong> برخورداری از مدارک معتبر نظیر ACC، PCC یا MCC.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-brand-teal-700 shrink-0 mt-0.5" />
              <span>
                <strong>ارزیابی سوابق تجربی و ساعات کوچینگ عملی:</strong> ثبت رسمی حداقل ۲۵۰ تا ۱۰۰۰ ساعت جلسه موفق.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-brand-teal-700 shrink-0 mt-0.5" />
              <span>
                <strong>سنجش کدهای اخلاقی و حفظ محرمانگی:</strong> تعهد کتبی و پایبندی بدون قید و شرط به رازداری جلسات.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-brand-teal-700 shrink-0 mt-0.5" />
              <span>
                <strong>پایش مستمر رضایت مراجعین:</strong> بررسی ادواری بازخورد مراجعین پس از هر جلسه و حفظ بالاترین استاندارد کیفی.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
