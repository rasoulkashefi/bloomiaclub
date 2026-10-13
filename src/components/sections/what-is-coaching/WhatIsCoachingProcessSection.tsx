import React from 'react';
import { Layers, Compass, CheckCircle2, Shield, Sparkles } from 'lucide-react';

const PHASES = [
  {
    step: '۱',
    title: 'کشف و انعقاد توافق شفاف',
    subtitle: 'Discovery & Contracting',
    description:
      'در جلسات نخست، زمینه گفتگو، چالش‌های اصلی و شیمی ارتباطی بررسی می‌شوند و چارچوب اهداف و محرمانگی بر اساس استانداردهای ICF رسمیت می‌یابد.',
  },
  {
    step: '۲',
    title: 'برانگیختن خودآگاهی عمیق',
    subtitle: 'Evoking Awareness',
    description:
      'کوچ با سوالات باز و عمیق، لایه‌های زیرین افکار، سوگیری‌های ناخودآگاه و باورهای محدودکننده را به سطح آگاهی مراجع می‌آورد.',
  },
  {
    step: '۳',
    title: 'طراحی اهداف معنادار و نقشه راه',
    subtitle: 'Goal Alignment',
    description:
      'دغدغه‌ها و اشتیاق‌ها به اهداف شفاف، قابل سنجش و هم‌راستا با ارزش‌های درونی فرد ترجمه می‌شوند تا مقصد روشن شود.',
  },
  {
    step: '۴',
    title: 'اقدام، بازخورد و تعهد هفتگی',
    subtitle: 'Action & Accountability',
    description:
      'تحول در فاصله میان جلسات شکل می‌گیرد. مراجع متعهد به گام‌های عملی هفتگی می‌شود و در هر جلسه، یادگیری‌های حاصل از اقدام بازنگری می‌گردند.',
  },
  {
    step: '۵',
    title: 'تثبیت دستاوردها و استقلال فردی',
    subtitle: 'Integration & Autonomy',
    description:
      'هدف نهایی کوچینگ، ایجاد وابستگی به کوچ نیست؛ بلکه ساختن عاملیت، خودرهبری و توانایی حل مستقل چالش‌های بعدی زندگی است.',
  },
];

export const WhatIsCoachingProcessSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-brand-surface border-b border-brand-surface-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-teal-50 border border-brand-teal-200/60 text-brand-teal-900 text-xs sm:text-sm font-semibold">
            <Layers className="w-4 h-4 text-brand-teal-700" />
            <span>کالبدشکافی یک دوره همراهی</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-neutral-900 tracking-tight">
            سفر تحول در فرآیند کوچینگ چگونه رخ می‌دهد؟
          </h2>
          <p className="text-sm sm:text-base text-brand-neutral-600 max-w-xl mx-auto leading-relaxed">
            کوچینگ یک معجزه یک‌شبه یا یک فرمول جادویی نیست؛ بلکه یک فرآیند روان‌شناختی، گام‌به‌گام و تکرارشونده برای دستیابی به تغییر پایدار است.
          </p>
        </div>

        {/* Vertical Connected Timeline (Strict Mobile-First) */}
        <div className="space-y-4 sm:space-y-6">
          {PHASES.map((phase, idx) => (
            <div
              key={phase.step}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-brand-surface-border shadow-soft-sm flex flex-col sm:flex-row items-start gap-5 hover:border-brand-teal-300 transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-brand-teal-900 text-white flex items-center justify-center font-black text-lg shrink-0 shadow-soft">
                {phase.step}
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="text-lg font-bold text-brand-neutral-900">
                    {phase.title}
                  </h3>
                  <span className="text-xs font-mono text-brand-neutral-400">
                    {phase.subtitle}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-brand-neutral-600 leading-relaxed">
                  {phase.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
