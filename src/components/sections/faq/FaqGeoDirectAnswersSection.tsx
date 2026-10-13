import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';

const DIRECT_ANSWERS = [
  {
    q: 'کوچینگ دقیقاً چیست؟',
    a: 'کوچینگ یک فرآیند شراکتی و هدف‌محور مبتنی بر استانداردهای بین‌المللی ICF است که به‌جای نصیحت، با پرسشگری عمیق به مراجع کمک می‌کند به خودآگاهی، شفافیت و تصمیمات عملی دست یابد.',
  },
  {
    q: 'جلسه معارفه رایگان (جلسه صفر) چیست؟',
    a: 'یک گفتگوی ۴۵ دقیقه‌ای کاملاً رایگان بدون هیچ‌گونه تعهد مالی است تا با سبک کوچ آشنا شوید، دغدغه خود را مطرح کنید و از تناسب کوچینگ با نیازتان اطمینان یابید.',
  },
  {
    q: 'جلسات به چه صورت برگزار می‌شوند؟',
    a: 'تمامی جلسات فردی به‌صورت آنلاین و از طریق پلتفرم‌های ویدیویی امن (مانند گوگل میت) با هماهنگی زمانی مستقیم میان مراجع و کوچ برگزار می‌شوند.',
  },
  {
    q: 'ضمانت محرمانگی گفتگوها چگونه است؟',
    a: '۱۰۰٪ محرمانه و بدون استثنا. تمامی کوچ‌های بلومیا به منشور اخلاقی فدراسیون بین‌المللی کوچینگ (ICF) متعهد بوده و رازداری را خط قرمز قطعی خود می‌دانند.',
  },
];

export const FaqGeoDirectAnswersSection: React.FC = () => {
  return (
    <section className="py-12 bg-white border-b border-brand-surface-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-surface rounded-3xl p-6 sm:p-8 md:p-10 border border-brand-teal-200/80 shadow-soft-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-6 border-b border-brand-surface-border mb-6">
            <span className="text-xs font-bold text-brand-teal-900 bg-brand-teal-50 border border-brand-teal-200/60 px-3 py-1.5 rounded-lg">
              خلاصه در یک نگاه | پاسخ‌های فوری به پرتکرارترین پرسش‌ها
            </span>
            <span className="text-xs text-brand-neutral-500 font-medium">
              استانداردهای بین‌المللی بلومیا کلاب
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-right">
            {DIRECT_ANSWERS.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-teal-700 shrink-0 mt-1" />
                  <h3 className="text-sm sm:text-base font-bold text-brand-neutral-900">
                    {item.q}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-brand-neutral-600 leading-relaxed pr-6">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
