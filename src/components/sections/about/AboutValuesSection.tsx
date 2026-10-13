import React from 'react';
import { HeartHandshake, UserCheck, Award, Lock, ShieldCheck } from 'lucide-react';

const VALUES = [
  {
    icon: HeartHandshake,
    title: 'شفافیت و صداقت اصیل',
    subtitle: 'Authentic Transparency',
    description:
      'ما وعده تغییر معجزه‌آسای یک‌شبه نمی‌دهیم. با شما صادقیم که مسیر رشد، نیازمند شجاعت، پذیرش واقعیت و سرمایه‌گذاری زمانی است. در بلومیا خبری از اغراق‌های تبلیغاتی نیست.',
  },
  {
    icon: UserCheck,
    title: 'حضور عمیق و اصالت انسانی',
    subtitle: 'Human Connection',
    description:
      'فناوری صرفاً ابزار ما برای تسهیل ارتباط است، نه هویت ما. ارتباط انسان با انسان، شنود بدون قضاوت و همدلی اصیل، روح حاکم بر تمام جلسات بلومیا کلاب است.',
  },
  {
    icon: Award,
    title: 'تخصص‌گرایی بر مدار استانداردهای ICF',
    subtitle: 'Professional Rigor',
    description:
      'کوچ‌های بلومیا نه بر اساس فالوورهای شبکه‌های اجتماعی، بلکه بر پایه ساعات آموزش رسمی، تجربه عملی مستند و تأییدیه‌های بین‌المللی گزینش می‌شوند.',
  },
  {
    icon: Lock,
    title: 'فضای امن و رازداری مطلق',
    subtitle: 'Psychological Safety',
    description:
      'محرمانگی اطلاعات و گفتگوها، خط قرمز بنیادین و اخلاقی ماست. در جلسات بلومیا فضایی امن فراهم است تا با آرامش کامل، خودِ واقعی و آسیب‌پذیرتان باشید.',
  },
];

export const AboutValuesSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white border-b border-brand-surface-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-teal-50 border border-brand-teal-200/60 text-brand-teal-900 text-xs sm:text-sm font-semibold">
            <ShieldCheck className="w-4 h-4 text-brand-teal-700" />
            <span>ارزش‌های تخطی‌ناپذیر</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-neutral-900 tracking-tight">
            ارزش‌هایی که با آن‌ها زندگی می‌کنیم
          </h2>
          <p className="text-sm sm:text-base text-brand-neutral-600 max-w-xl mx-auto leading-relaxed">
            این چهار اصل، تاروپود تمام ارتباطات، تصمیم‌گیری‌ها و جلسات کوچینگ در بلومیا را شکل می‌دهند.
          </p>
        </div>

        {/* 4-Card Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {VALUES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-brand-surface rounded-3xl p-6 sm:p-8 border border-brand-surface-border shadow-soft-sm flex flex-col justify-between hover:border-brand-teal-300 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-brand-surface-border text-brand-teal-900 flex items-center justify-center shadow-soft-sm group-hover:bg-brand-teal-50 transition-colors">
                      <Icon className="w-6 h-6 text-brand-teal-800" />
                    </div>
                    <span className="text-xs font-mono text-brand-neutral-400">
                      {item.subtitle}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-brand-neutral-900 mb-3 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-brand-neutral-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
