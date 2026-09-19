import React from 'react';
import { Quote, CheckCircle2, ShieldCheck, HeartHandshake } from 'lucide-react';
import type { Coach } from '@/lib/coaches';

interface CoachProfileAboutSectionProps {
  coach: Coach;
}

export const CoachProfileAboutSection: React.FC<CoachProfileAboutSectionProps> = ({
  coach,
}) => {
  const bioParagraphs = coach.longDescription
    ? coach.longDescription.split('\n\n').filter(Boolean)
    : [coach.description];

  return (
    <section className="py-16 md:py-24 bg-brand-surface border-b border-brand-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Main Bio Text (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-brand-teal-800 font-bold text-xs sm:text-sm tracking-wide uppercase">
                آشنایی عمیق‌تر با کوچ
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-neutral-900 tracking-tight">
                درباره من و نگاهم به فرآیند کوچینگ
              </h2>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-brand-neutral-700 leading-relaxed">
              {bioParagraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            {/* ICF Ethics & Commitment Guarantee */}
            <div className="pt-6 border-t border-brand-neutral-200/80 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-brand-surface-paper border border-brand-neutral-200/80 shadow-xs">
                <ShieldCheck className="w-5 h-5 text-brand-teal-800 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="text-xs sm:text-sm font-bold text-brand-neutral-900">
                    تعهد به کدهای اخلاقی ICF
                  </h3>
                  <p className="text-[11px] sm:text-xs text-brand-neutral-600 leading-relaxed">
                    حفظ ۱۰۰٪ محرمانگی گفتگوها، رازداری و احترام بی‌قید و شرط به حقوق مراجع.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-brand-surface-paper border border-brand-neutral-200/80 shadow-xs">
                <HeartHandshake className="w-5 h-5 text-brand-teal-800 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="text-xs sm:text-sm font-bold text-brand-neutral-900">
                    فضای امن و بدون قضاوت
                  </h3>
                  <p className="text-[11px] sm:text-xs text-brand-neutral-600 leading-relaxed">
                    فرصتی برای واکاوی بدون ترس از سرزنش، کشف ریشه‌ها و بازیابی انرژی درونی.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Side Quote Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative bg-gradient-to-br from-brand-teal-950 to-brand-teal-900 text-white p-7 sm:p-9 rounded-3xl shadow-elevated overflow-hidden space-y-6">
              <Quote className="w-12 h-12 text-brand-teal-400 opacity-60" />

              <blockquote className="text-base sm:text-lg text-brand-teal-50 font-medium leading-relaxed italic">
                «تغییر از جایی آغاز می‌شود که شهامت روبرو شدن با خودت را پیدا کنی؛ نقشه راه در دستان توست و من در کنارت هستم تا موانع را کنار بزنی.»
              </blockquote>

              <div className="pt-4 border-t border-brand-teal-800/80 flex items-center justify-between text-xs text-brand-teal-200">
                <span className="font-bold text-white">{coach.name}</span>
                <span>{coach.title}</span>
              </div>
            </div>

            {/* Specialties Checklist */}
            <div className="bg-brand-surface-paper p-6 rounded-3xl border border-brand-neutral-200/90 shadow-soft space-y-3">
              <h3 className="text-sm font-bold text-brand-neutral-900">
                حوزه‌های اصلی تخصص و همراهی:
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-brand-neutral-700">
                {coach.specialties.map((spec, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-teal-700 shrink-0" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
