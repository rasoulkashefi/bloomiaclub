'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  CheckCircle2,
  Users,
  Video,
  Clock,
  ExternalLink,
  ShieldCheck,
  Calendar,
  Sparkles,
  HelpCircle,
  ArrowLeft,
  FileText,
} from 'lucide-react';
import type { EventItem } from '@/lib/events';
import { PortableTextRenderer } from '@/components/blog/PortableTextRenderer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface EventDetailContentSectionProps {
  event: EventItem;
}

export const EventDetailContentSection: React.FC<EventDetailContentSectionProps> = ({ event }) => {
  const isFree = event.price === 0;

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-brand-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Main Column (8 cols) */}
          <div className="lg:col-span-8 space-y-12">
            {/* Cover Image banner */}
            <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden bg-brand-neutral-100 border border-brand-neutral-200 shadow-soft">
              <Image
                src={event.coverImage}
                alt={event.coverImageAlt || event.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 800px"
                className="object-cover"
              />
            </div>

            {/* Event Description (Body or default) */}
            <div className="bg-brand-surface-paper rounded-3xl p-6 sm:p-8 border border-brand-neutral-200/90 shadow-soft space-y-6">
              <div className="flex items-center gap-2 text-brand-teal-900 font-extrabold text-lg sm:text-xl border-b border-brand-neutral-200 pb-4">
                <FileText className="w-5 h-5 text-brand-teal-700" />
                <h2>درباره این رویداد</h2>
              </div>

              {event.body && Array.isArray(event.body) && event.body.length > 0 ? (
                <div className="prose prose-brand max-w-none">
                  <PortableTextRenderer value={event.body} />
                </div>
              ) : (
                <div className="space-y-4 text-sm sm:text-base text-brand-neutral-700 leading-[1.85]">
                  <p>{event.excerpt}</p>
                  <p>
                    این رویداد با تمرکز بر پیاده‌سازی کاربردی مهارت‌های کوچینگ طراحی شده است تا
                    شرکت‌کنندگان بتوانند مستقیماً از تکنیک‌های مطرح‌شده در روابط، خانواده و فضای شغلی خود
                    بهره‌مند شوند.
                  </p>
                </div>
              )}
            </div>

            {/* Syllabus Section (سرفصل‌های کارگاه) */}
            {event.syllabus && event.syllabus.length > 0 && (
              <div className="bg-brand-surface-paper rounded-3xl p-6 sm:p-8 border border-brand-neutral-200/90 shadow-soft space-y-6">
                <div className="flex items-center gap-2 text-brand-teal-900 font-extrabold text-lg sm:text-xl border-b border-brand-neutral-200 pb-4">
                  <CheckCircle2 className="w-5 h-5 text-brand-teal-700" />
                  <h2>سرفصل‌ها و مباحث آموزشی</h2>
                </div>

                <div className="grid grid-cols-1 gap-3.5">
                  {event.syllabus.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 rounded-2xl bg-brand-surface border border-brand-neutral-200/80"
                    >
                      <span className="font-mono text-xs font-bold text-brand-teal-800 bg-brand-teal-100/70 w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                        {(index + 1).toLocaleString('fa-IR')}
                      </span>
                      <p className="text-sm sm:text-base text-brand-neutral-800 leading-relaxed font-medium">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Target Audience (این رویداد برای چه کسانی است؟) */}
            {event.targetAudience && event.targetAudience.length > 0 && (
              <div className="bg-brand-surface-paper rounded-3xl p-6 sm:p-8 border border-brand-neutral-200/90 shadow-soft space-y-6">
                <div className="flex items-center gap-2 text-brand-teal-900 font-extrabold text-lg sm:text-xl border-b border-brand-neutral-200 pb-4">
                  <Users className="w-5 h-5 text-brand-teal-700" />
                  <h2>این رویداد برای چه کسانی مناسب است؟</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {event.targetAudience.map((audience, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-4 rounded-2xl bg-brand-teal-50/40 border border-brand-teal-100"
                    >
                      <span className="w-2 h-2 rounded-full bg-brand-teal-700 mt-2 shrink-0" />
                      <span className="text-xs sm:text-sm text-brand-neutral-800 leading-relaxed">
                        {audience}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Features (امکانات و مزایای شرکت) */}
            {event.features && event.features.length > 0 && (
              <div className="bg-brand-surface-paper rounded-3xl p-6 sm:p-8 border border-brand-neutral-200/90 shadow-soft space-y-6">
                <div className="flex items-center gap-2 text-brand-teal-900 font-extrabold text-lg sm:text-xl border-b border-brand-neutral-200 pb-4">
                  <ShieldCheck className="w-5 h-5 text-brand-teal-700" />
                  <h2>آنچه با ثبت‌نام در این رویداد دریافت می‌کنید</h2>
                </div>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {event.features.map((feat, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 p-3.5 rounded-2xl bg-brand-surface border border-brand-neutral-200"
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span className="text-xs sm:text-sm text-brand-neutral-800 font-medium">
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Event Specific FAQs */}
            {event.faqs && event.faqs.length > 0 && (
              <div className="bg-brand-surface-paper rounded-3xl p-6 sm:p-8 border border-brand-neutral-200/90 shadow-soft space-y-6">
                <div className="flex items-center gap-2 text-brand-teal-900 font-extrabold text-lg sm:text-xl border-b border-brand-neutral-200 pb-4">
                  <HelpCircle className="w-5 h-5 text-brand-teal-700" />
                  <h2>پرسش‌های متداول این رویداد</h2>
                </div>

                <Accordion type="single" collapsible className="space-y-3">
                  {event.faqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`event-faq-${index}`}
                      className="border border-brand-neutral-200 rounded-2xl px-5 bg-brand-surface data-[state=open]:border-brand-teal-300"
                    >
                      <AccordionTrigger className="text-start text-xs sm:text-sm font-bold text-brand-neutral-900 py-3.5 leading-snug">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-xs sm:text-sm text-brand-neutral-600 leading-relaxed pb-3.5">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}
          </div>

          {/* Sticky Sidebar (4 cols) — Tickets / External Registration Card */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <div className="bg-brand-surface-paper rounded-3xl p-6 sm:p-8 border-2 border-brand-teal-900/20 shadow-elevated space-y-6">
              {/* Price display */}
              <div className="space-y-1">
                <span className="text-xs text-brand-neutral-500 font-medium">هزینه شرکت در رویداد</span>
                <div className="flex items-baseline justify-between pt-1">
                  <div className="flex items-baseline gap-2">
                    <span
                      className={`text-2xl sm:text-3xl font-extrabold ${
                        isFree ? 'text-brand-teal-700' : 'text-brand-neutral-900'
                      }`}
                    >
                      {event.formattedPrice}
                    </span>
                    {event.originalPrice && event.originalPrice > event.price && (
                      <span className="text-sm text-brand-neutral-400 line-through">
                        {event.originalPrice.toLocaleString('fa-IR')} تومان
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Big External Registration CTA */}
              <div className="space-y-2 pt-2">
                <a
                  href={event.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[50px] px-6 py-3.5 rounded-full bg-brand-teal-900 hover:bg-brand-teal-800 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all shadow-soft hover:shadow-elevated active:scale-[0.98]"
                >
                  <span>ورود به {event.platformName} و ثبت‌نام</span>
                  <ExternalLink className="w-4 h-4 shrink-0" />
                </a>
                <p className="text-[11px] text-center text-brand-neutral-500">
                  ثبت‌نام امن و پرداخت مستقیماً در درگاه رسمی برگزارکننده انجام می‌گیرد
                </p>
              </div>

              {/* Quick specs list */}
              <div className="pt-4 border-t border-brand-neutral-200/80 space-y-3 text-xs sm:text-sm text-brand-neutral-700">
                <div className="flex items-center justify-between">
                  <span className="text-brand-neutral-500 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-brand-teal-800" />
                    تاریخ برگزاری
                  </span>
                  <span className="font-bold text-brand-neutral-900">{event.formattedDate}</span>
                </div>

                {event.formattedTime && (
                  <div className="flex items-center justify-between">
                    <span className="text-brand-neutral-500 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-brand-teal-800" />
                      ساعت جلسه
                    </span>
                    <span className="font-bold text-brand-neutral-900">{event.formattedTime}</span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-brand-neutral-500 flex items-center gap-1.5">
                    <Video className="w-3.5 h-3.5 text-brand-teal-800" />
                    بستر برگزاری
                  </span>
                  <span className="font-bold text-brand-neutral-900">{event.platformName}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-brand-neutral-500">مدت زمان</span>
                  <span className="font-bold text-brand-neutral-900">{event.duration}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-brand-neutral-500">دسترسی به ویدیو</span>
                  <span className="font-bold text-emerald-700">مادام‌العمر (کامل)</span>
                </div>
              </div>

              {/* Coach Mini-Card in sidebar */}
              {event.coach && (
                <div className="pt-4 border-t border-brand-neutral-200/80 space-y-3">
                  <span className="text-xs text-brand-neutral-500 font-medium">کوچ مدرس رویداد</span>
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-brand-teal-100 shrink-0 border border-brand-teal-200">
                      <Image
                        src={event.coach.imageUrl || '/images/coaches/default.webp'}
                        alt={event.coach.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-sm text-brand-neutral-900 line-clamp-1">
                        {event.coach.name}
                      </p>
                      <p className="text-xs text-brand-neutral-500 line-clamp-1">{event.coach.title}</p>
                    </div>
                  </div>
                  <Link
                    href={`/coaches/${event.coach.slug}`}
                    className="w-full min-h-[40px] px-4 py-2 rounded-full border border-brand-neutral-300 hover:bg-brand-neutral-100 text-brand-neutral-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>مشاهده پروفایل و رزرو جلسه معارفه</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
