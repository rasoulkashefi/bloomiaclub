import React from 'react';
import { Coach } from '@/lib/coaches';

export function CoachApproachV2({ coach }: { coach: Coach }) {
  const steps = [
    {
      num: '01',
      title: 'شناخت',
      desc: 'با هم مسئله اصلی‌ات را روشن‌تر میکنیم'
    },
    {
      num: '02',
      title: 'کشف',
      desc: 'موانع و گره‌های پیش رو را کشف میکنیم'
    },
    {
      num: '03',
      title: 'حرکت',
      desc: 'به تصمیم‌ها و قدم‌های مشخص میرسیم و قابل پیگیری میشوند'
    }
  ];

  return (
    <section className="bg-brand-surface py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <h2 className="text-2xl md:text-3xl font-bold text-brand-neutral-900 text-center mb-12 md:mb-16">
          در جلسات من چه می‌گذرد؟
        </h2>
        
        <div className="flex flex-col md:grid md:grid-cols-3 gap-8 md:gap-10 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-6 md:top-7 right-14 left-14 border-t-2 border-dashed border-brand-teal-100 z-0" />
          
          {steps.map((step, index) => (
            <div key={index} className="flex md:flex-col items-start gap-4 md:gap-0 relative z-10">
              <div className="w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-full bg-brand-teal-900 text-white flex items-center justify-center text-lg md:text-xl font-bold md:mx-auto">
                {step.num}
              </div>
              <div className="flex-1 md:text-center md:mt-6">
                <h3 className="text-lg md:text-xl font-bold text-brand-neutral-900">
                  {step.title}
                </h3>
                <p className="text-brand-neutral-600 text-sm md:text-base leading-relaxed mt-2">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
