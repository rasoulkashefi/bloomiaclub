'use client';

import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown, HelpCircle, Calendar, ArrowLeft } from 'lucide-react';
import type { CoachProfile } from '@/lib/coaches';

interface SoleaFaqProps {
  coach?: CoachProfile;
  onOpenBooking?: (offeringTitle?: string) => void;
}

export const SoleaFaq: React.FC<SoleaFaqProps> = ({ coach, onOpenBooking }) => {
  const coachName = coach?.name || 'کوچ بلومیا';
  const faqs = coach?.faqs || [];

  if (!faqs || faqs.length === 0) {
    return null;
  }

  const introService = coach?.services?.find(
    (s) =>
      s.isFree ||
      s.title?.includes('صفر') ||
      s.title?.includes('معارفه') ||
      s.title?.includes('آشنایی') ||
      s.id?.includes('intro')
  ) || coach?.services?.[0];

  const isFreeIntro = introService
    ? introService.isFree !== false && (!introService.price || introService.price === 0)
    : true;

  const bookingLink = coach?.bookingUrl || '#contact';

  return (
    <section id="faq" className="w-full bg-[#fafaf8] py-20 lg:py-28 text-[#1e1e1e] border-t border-[#e5e5e2]/60">
      <div className="mx-auto max-w-[1360px] px-6 sm:px-10 lg:px-[30px]">
        <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16">
          
          {/* Start Column: Section Label & Context */}
          <div className="w-full lg:w-[320px] shrink-0">
            <span className="font-serif text-[20px] leading-[29.6px] font-normal text-[#1e1e1e] block">
              پرسش‌های متداول
            </span>

            <h2 className="mt-4 font-serif text-[28px] sm:text-[34px] lg:text-[38px] font-normal leading-[1.35] text-[#1e1e1e]">
              پاسخ به سوالات شما درباره جلسات کوچینگ
            </h2>

            <p className="mt-4 text-sm sm:text-base text-[#6b6b6b] leading-[1.8] font-sans">
              شفافیت و اعتماد، اساس هر رابطه کوچینگی است. در اینجا پاسخ سوالات پرتکرار مراجعان پیش از آغاز مسیر را گرد آورده‌ایم.
            </p>

            {/* Quick CTA Card */}
            <div className="mt-8 rounded-2xl bg-white p-5 border border-[#e5e5e2] shadow-sm hidden lg:block">
              <p className="text-xs text-[#6b6b6b] leading-relaxed">
                سوالی دارید که در اینجا نیست؟ در جلسه معارفه می‌توانید تمامی ابهامات خود را مستقیماً مطرح کنید.
              </p>
              <button
                type="button"
                onClick={() => onOpenBooking ? onOpenBooking() : (window.location.href = bookingLink)}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1f3d3a] px-4 py-2.5 text-xs font-semibold text-white transition-all hover:bg-[#2b544e] cursor-pointer"
              >
                <span>{isFreeIntro ? 'رزرو جلسه معارفه رایگان' : 'رزرو آنلاین جلسه معارفه'}</span>
                <ArrowLeft className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* End Column: Accordion Items */}
          <div className="flex-1 w-full">
            <Accordion.Root type="single" collapsible defaultValue="faq-0" className="space-y-4">
              {faqs.map((faq, idx) => (
                <Accordion.Item
                  key={idx}
                  value={`faq-${idx}`}
                  className="rounded-2xl border border-[#e5e5e2] bg-white transition-all duration-200 overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.02)] data-[state=open]:border-[#1f3d3a]/30 data-[state=open]:shadow-md"
                >
                  <Accordion.Header className="m-0 p-0">
                    <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-right font-sans text-base sm:text-[17px] font-semibold text-[#1e1e1e] hover:text-[#1f3d3a] transition-colors min-h-[52px] cursor-pointer">
                      <span className="flex-1 leading-snug">{faq.question}</span>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#fafaf8] text-[#1f3d3a] transition-transform duration-200 group-data-[state=open]:rotate-180 group-data-[state=open]:bg-[#dfece9]">
                        <ChevronDown className="h-4 w-4" />
                      </span>
                    </Accordion.Trigger>
                  </Accordion.Header>

                  <Accordion.Content className="overflow-hidden text-sm sm:text-[15px] leading-[1.85] text-[#4a4a4a] data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    <div className="px-5 pb-6 sm:px-6 sm:pb-7 pt-2 border-t border-[#f2f7f6]">
                      <p>{faq.answer}</p>
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>

            {/* Mobile-only CTA banner */}
            <div className="mt-8 rounded-2xl bg-white p-5 border border-[#e5e5e2] text-center lg:hidden">
              <p className="text-xs text-[#6b6b6b] leading-relaxed">
                سوالی در ذهن دارید؟ در جلسه معارفه با {coachName} پاسخ تمامی پرسش‌هایتان را بشنوید.
              </p>
              <button
                type="button"
                onClick={() => onOpenBooking ? onOpenBooking() : (window.location.href = bookingLink)}
                className="mt-3.5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1f3d3a] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#2b544e] cursor-pointer"
              >
                <span>{isFreeIntro ? 'رزرو جلسه معارفه رایگان' : 'رزرو آنلاین جلسه معارفه'}</span>
                <ArrowLeft className="h-4 w-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
