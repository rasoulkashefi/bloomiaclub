import React from 'react';
import { Target, Eye, Compass, Sparkles } from 'lucide-react';

export const AboutMissionVisionSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-brand-surface border-b border-brand-surface-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-teal-50 border border-brand-teal-200/60 text-brand-teal-900 text-xs sm:text-sm font-semibold">
            <Compass className="w-4 h-4 text-brand-teal-700" />
            <span>جهت‌گیری راهبردی</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-neutral-900 tracking-tight">
            مأموریت و چشم‌انداز بلومیا کلاب
          </h2>
          <p className="text-sm sm:text-base text-brand-neutral-600 max-w-xl mx-auto leading-relaxed">
            قطب‌نمای اخلاقی و عملی ما برای اثرگذاری ماندگار در زندگی همراهان و جامعه.
          </p>
        </div>

        {/* 2-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Mission Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-brand-surface-border shadow-soft-sm flex flex-col justify-between hover:border-brand-teal-300 transition-all">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-brand-teal-50 border border-brand-teal-200 text-brand-teal-900 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-brand-teal-800" />
              </div>

              <div className="text-xs font-bold text-brand-teal-800 tracking-wider uppercase mb-2">
                Our Mission
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-brand-neutral-900 mb-4">
                مأموریت ما
              </h3>

              <p className="text-sm sm:text-base text-brand-neutral-600 leading-relaxed">
                فراهم ساختن دسترسی شفاف، آسان و امن به کوچ‌های دارای تأییدیه بین‌المللی ICF برای تمام فارسی‌زبانان سراسر جهان؛ تا افراد، مادران شاغل و رهبران سازمان‌ها بتوانند در فضایی سرشار از اعتماد و بدون قضاوت، پاسخ‌های اصیل خود را کشف کرده و تغییرات معنادار و پایدار خلق کنند.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-brand-surface-border flex items-center gap-2 text-xs sm:text-sm font-semibold text-brand-teal-900">
              <span className="w-2 h-2 rounded-full bg-brand-teal-700" />
              <span>تعهد به کرامت انسانی و استانداردهای جهانی</span>
            </div>
          </div>

          {/* Vision Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-brand-surface-border shadow-soft-sm flex flex-col justify-between hover:border-brand-teal-300 transition-all">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-brand-teal-50 border border-brand-teal-200 text-brand-teal-900 flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-brand-teal-800" />
              </div>

              <div className="text-xs font-bold text-brand-teal-800 tracking-wider uppercase mb-2">
                Our Vision
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-brand-neutral-900 mb-4">
                چشم‌انداز ما
              </h3>

              <p className="text-sm sm:text-base text-brand-neutral-600 leading-relaxed">
                ساختن معتبرترین و الهام‌بخش‌ترین پلتفرم کوچینگ تخصصی و توسعه انسانی؛ جامعه‌ای که در آن گفتگوی عمیق و اصیل، جایگزین تنهایی و سردرگمی روزمره شده و هر فرد به عاملیت، آرامش و وضوح در تصمیم‌گیری‌های حیاتی زندگی و شغل خود دست یافته باشد.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-brand-surface-border flex items-center gap-2 text-xs sm:text-sm font-semibold text-brand-teal-900">
              <span className="w-2 h-2 rounded-full bg-brand-teal-700" />
              <span>جامعه‌ای آگاه، خودرهبر و متوازن</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
