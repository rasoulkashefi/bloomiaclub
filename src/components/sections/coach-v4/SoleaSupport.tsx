'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Check, Download, FileText, ArrowLeft } from 'lucide-react';
import type { CoachProfile } from '@/lib/coaches';

interface SupportStep {
  number: string;
  title: string;
  description: string;
  image: string;
}

const defaultSteps: SupportStep[] = [
  {
    number: '۰۱',
    title: 'شنیدن صدای درون و وضوح ذهنی',
    description: 'ایجاد فضایی امن و کاملاً بدون قضاوت تا دغدغه‌ها، موانع و بارهای ناگفته ذهنی و فردی را بی‌پرده شفاف کنیم.',
    image: '/images/solea/support_step_1.png',
  },
  {
    number: '۰۲',
    title: 'واکاوی باورها و ریشه‌یابی چالش‌ها',
    description: 'شناسایی الگوهای تکراری، باورهای بازدارنده و پیش‌فرض‌هایی که مانع دیدن ارزش‌ها و توانمندی‌های واقعی شما می‌شوند.',
    image: '/images/solea/support_step_2.png',
  },
  {
    number: '۰۳',
    title: 'طراحی برنامه اقدام و تحول پایدار',
    description: 'تبدیل بینش‌ها و دستاوردهای جلسات به تصمیمات ملموس، اولویت‌بندی آگاهانه و اقدام شجاعانه در متن زندگی روزمره.',
    image: '/images/solea/support_step_3.png',
  },
];

interface SoleaSupportProps {
  coach?: CoachProfile;
}

export const SoleaSupport: React.FC<SoleaSupportProps> = ({ coach }) => {
  const isMahya = coach?.slug?.includes('mahya');
  const isFatemeh = coach?.slug === 'fatemeh_esmaeeli';
  const bookingLink = coach?.bookingUrl || (isFatemeh ? 'https://atyno.com/fatemeh/zero' : '#contact');
  const coachName = coach?.name || (isFatemeh ? 'فاطمه اسماعیلی' : (isMahya ? 'محیا شکوری' : 'کوچ بلومیا'));

  const persianNumbers = ['۰۱', '۰۲', '۰۳', '۰۴'];

  const steps: SupportStep[] = (coach?.method && coach.method.length >= 3)
    ? coach.method.slice(0, 3).map((m, idx) => ({
        number: persianNumbers[idx] || `۰${idx + 1}`.replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]),
        title: m.title,
        description: m.description,
        image: defaultSteps[idx]?.image || '/images/solea/support_step_1.png',
      }))
    : defaultSteps;

  // Welcome Packet Configuration (Dynamic with elegant fallback to official ICF document)
  const hasDedicatedPacket = Boolean(coach?.welcomePacket?.fileUrl || isFatemeh || isMahya);
  const defaultIcfPdfUrl = 'https://coachingfederation.org/wp-content/uploads/2025/09/icf-cs-core-competencies-2025.pdf';

  const packetFile =
    coach?.welcomePacket?.fileUrl ||
    (isMahya
      ? '/documents/welcome-packets/mahya_shakouri_welcome_packet.pdf'
      : isFatemeh
        ? '/documents/welcome-packets/fatemeh_esmaeeli_welcome_packet.pdf'
        : defaultIcfPdfUrl);

  const packetCover =
    coach?.welcomePacket?.coverImageUrl ||
    (isMahya
      ? '/images/solea/mahya_welcome_packet_cover.png'
      : isFatemeh
        ? '/images/solea/fatemeh_welcome_packet_cover.png'
        : '/images/solea/icf_competencies_cover.png');

  const packetTitle =
    coach?.welcomePacket?.title ||
    (hasDedicatedPacket ? `بسته راهنمای خدمات کوچینگ با ${coachName}` : 'منشور شایستگی‌های بنیادین کوچینگ (ICF)');

  const packetSubtitle =
    coach?.welcomePacket?.subtitle ||
    (hasDedicatedPacket
      ? `راهنمای جامع آشنایی با فرآیند کوچینگ، منشور محرمانگی، شرایط جلسات و نحوه آمادگی کامل برای جلسه معارفه رایگان با ${coachName}.`
      : 'سند رسمی فدراسیون بین‌المللی کوچینگ؛ معرفی ۸ شایستگی محوری، منشور اخلاقی، تعهد رازداری و استانداردهای حرفه‌ای جلسات کوچینگ.');

  const packetFeatures = coach?.welcomePacket?.features || (hasDedicatedPacket
    ? [
        'آشنایی با متدولوژی و اصول ۴گانه جلسات کوچینگ',
        'شفافیت در شرایط، ضوابط همکاری و منشور محرمانگی',
        'راهنمای گام‌به‌گام آمادگی برای جلسه معارفه رایگان (جلسه صفر)',
      ]
    : [
        'معرفی ۸ شایستگی بنیادین و جهانی فدراسیون بین‌المللی کوچینگ',
        'منشور اخلاقی، تعهد محرمانگی و چارچوب حقوق مراجع در جلسات',
        'معیارهای شفاف تمایز کوچینگ حرفه‌ای با مشاوره و روان‌درمانی',
      ]);

  const buttonText = coach?.welcomePacket?.buttonText || (hasDedicatedPacket ? 'دریافت بسته راهنما (PDF)' : 'دانلود سند رسمی ICF (PDF)');
  const isDownload = true;

  return (
    <section id="method" className="w-full bg-white py-20 lg:py-28 text-[#1e1e1e]">
      <div className="mx-auto max-w-[1360px] px-6 sm:px-10 lg:px-[30px]">
        
        {/* Centered Heading with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <h2 className="font-serif text-[34px] sm:text-[44px] lg:text-[52px] font-normal leading-[1.38] sm:leading-[1.34] lg:leading-[1.32] text-[#1e1e1e]">
            مراحل و گام‌های
            <br />
            همراهی با شما
          </h2>
        </motion.div>

        {/* Sticky Stacking Cards Container */}
        <div className="relative mt-16 lg:mt-20 pb-44 lg:pb-60 flex flex-col gap-8 lg:gap-10">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="sticky top-24 sm:top-28 lg:top-[120px] w-full"
              style={{ zIndex: idx + 10 }}
            >
              <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 rounded-[28px] bg-[#fafaf8] p-8 sm:p-10 lg:py-12 lg:px-16 shadow-[0_12px_40px_rgba(0,0,0,0.06)] border border-black/[0.03]">
                
                {/* Text Column */}
                <div className="flex-1 max-w-[560px]">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1f3d3a] font-sans text-xl font-bold text-white shadow-sm mb-6">
                    {step.number}
                  </div>
                  <h3 className="font-serif text-[28px] sm:text-[34px] lg:text-[38px] font-normal leading-[1.36] sm:leading-[1.32] text-[#1e1e1e]">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-base sm:text-lg leading-[1.8] text-[#6b6b6b]">
                    {step.description}
                  </p>
                </div>

                {/* Tilted Rounded Image Card */}
                <div className="relative w-full max-w-[280px] sm:max-w-[292px] h-[340px] sm:h-[356px] shrink-0 overflow-hidden rounded-[24px] shadow-[0_12px_35px_rgba(0,0,0,0.08)] transform -rotate-[1.5deg] transition-transform duration-500 hover:rotate-0 hover:scale-105">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 320px"
                    priority={idx === 0}
                  />
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Welcome Packet Banner (Substituted for generic Ebook) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 overflow-hidden rounded-[2.5rem] bg-[#1f3d3a] p-8 text-white shadow-xl sm:p-12 lg:p-16"
        >
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
            
            <div className="flex flex-col items-start lg:col-span-7">
              {/* Optional Eyebrow Tag */}
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm mb-5 sm:mb-6">
                <FileText className="h-3.5 w-3.5" />
                <span>{hasDedicatedPacket ? 'بسته اختصاصی مراجعان' : 'سند رسمی شایستگی‌های ICF'}</span>
              </span>

              <h3 className="font-serif text-3xl font-normal leading-[1.4] sm:leading-[1.38] lg:leading-[1.35] text-white sm:text-4xl lg:text-[44px]">
                {hasDedicatedPacket ? (
                  <>
                    بسته راهنمای خدمات
                    <br />
                    کوچینگ با {coachName}
                  </>
                ) : (
                  <>
                    منشور شایستگی‌های
                    <br />
                    بنیادین کوچینگ (ICF)
                  </>
                )}
              </h3>

              <p className="mt-5 sm:mt-6 max-w-xl text-base sm:text-lg leading-[1.8] text-white/90 font-normal">
                {packetSubtitle}
              </p>

              {/* Feature Checklist */}
              <ul className="mt-8 sm:mt-9 space-y-4 text-sm sm:text-base leading-relaxed">
                {packetFeatures.map((feat, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20 text-white">
                      <Check className="h-4 w-4" />
                    </span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              {/* Action Buttons */}
              <div className="mt-10 sm:mt-12 flex flex-wrap items-center gap-4 sm:gap-6">
                {isDownload ? (
                  <>
                    <a
                      href={packetFile!}
                      download={`بسته_راهنمای_کوچینگ_${coachName.replace(/\s+/g, '_')}.pdf`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2.5 rounded-[14px] bg-white px-8 py-4 text-[15px] font-semibold text-[#1f3d3a] transition-all hover:bg-[#dfece9] active:scale-95 shadow-md group"
                    >
                      <Download className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                      <span>{buttonText}</span>
                    </a>

                    <a
                      href={bookingLink}
                      target={coach?.bookingUrl ? '_blank' : undefined}
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm sm:text-base font-medium text-white/85 hover:text-white transition-colors underline underline-offset-8"
                    >
                      <span>رزرو جلسه معارفه رایگان</span>
                      <ArrowLeft className="h-4 w-4" />
                    </a>
                  </>
                ) : (
                  <a
                    href={bookingLink}
                    target={coach?.bookingUrl ? '_blank' : undefined}
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-[14px] bg-white px-8 py-4 text-[15px] font-semibold text-[#1f3d3a] transition-all hover:bg-[#dfece9] active:scale-95 shadow-md"
                  >
                    رزرو جلسه معارفه رایگان
                  </a>
                )}
              </div>
            </div>

            {/* Welcome Packet 3D Graphic Mockup */}
            <div className="relative flex items-center justify-center lg:col-span-5">
              <div className="relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[460px] aspect-square flex items-center justify-center">
                {/* Background Pattern */}
                <Image
                  src="/images/solea/ebook_graphic.svg"
                  alt="تزیین گرافیکی"
                  fill
                  className="object-contain opacity-90 rounded-[20px]"
                  sizes="(max-width: 1024px) 360px, 460px"
                />

                {/* 3D Book Cover Overlay (Links directly to the PDF file) */}
                <a
                  href={packetFile}
                  target="_blank"
                  rel="noreferrer"
                  title={hasDedicatedPacket ? 'کلیک برای مشاهده و دانلود بسته راهنما (PDF)' : 'کلیک برای مشاهده و دانلود سند رسمی ICF (PDF)'}
                  className="group relative w-[65%] h-[84%] shadow-[0_24px_50px_rgba(0,0,0,0.38)] rounded-[12px] overflow-hidden transform rotate-2 transition-all duration-500 hover:rotate-0 hover:scale-[1.04] cursor-pointer block border border-white/10"
                >
                  <Image
                    src={packetCover}
                    alt={packetTitle}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 260px, 340px"
                  />

                  {/* Realistic Book Spine Highlight on Right Edge (in RTL) */}
                  <div className="pointer-events-none absolute inset-y-0 end-0 w-3 bg-gradient-to-l from-black/20 via-white/10 to-transparent" />

                  {/* Subtle Shimmer Overlay on Hover */}
                  <div className="pointer-events-none absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors" />

                  {/* PDF Badge */}
                  <div className="absolute bottom-3 start-3 z-10 flex items-center gap-1.5 rounded-full bg-[#1f3d3a]/85 backdrop-blur-md px-3 py-1 text-[11px] font-sans font-medium text-white border border-white/20 shadow-sm">
                    <FileText className="h-3 w-3" />
                    <span>{hasDedicatedPacket ? 'فایل PDF • اختصاصی' : 'سند رسمی ICF • PDF'}</span>
                  </div>
                </a>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};
