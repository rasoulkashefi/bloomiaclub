'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { getCanonicalSlug, type CoachProfile } from '@/lib/coaches';

interface SoleaConsultationBannerProps {
  coach?: CoachProfile;
  onOpenBooking?: (offeringTitle?: string) => void;
}

const getChecklist = (canonical: string): string[] => {
  switch (canonical) {
    case 'fatemeh_esmaeeli':
      return [
        'گفتگوی اختصاصی ۳۰ دقیقه‌ای برای شفاف‌سازی دغدغه‌های مادری و فردی',
        'شنیدن عمیق و بدون قضاوت چالش‌های تعادل کار، والدگری و روابط',
        'بررسی تناسب رویکرد کوچینگ مادران و بانوان با اهداف کنونی شما',
        'فضایی کاملاً امن، محرمانه طبق منشور اخلاقی ICF و بدون تعهد مالی',
      ];
    case 'mahya_shakouri':
      return [
        'گفتگوی اختصاصی ۳۰ دقیقه‌ای برای شفاف‌سازی دغدغه و اهداف رشد فردی',
        'شنیدن بدون قضاوت چالش‌های فردی، تعارضات درونی و مرزگذاری در روابط',
        'بررسی تناسب متدولوژی کوچینگ خودآگاهی با نیاز کنونی شما',
        'فضایی کاملاً امن، محرمانه طبق منشور اخلاقی ICF و بدون تعهد مالی',
      ];
    case 'arezoo_ghaffari':
      return [
        'گفتگوی اختصاصی ۳۰ دقیقه‌ای برای شفاف‌سازی موانع تفکر و تصمیم‌گیری',
        'شناسایی سوگیری‌های شناختی و پیش‌فرض‌های تکراری بازدارنده',
        'بررسی تناسب فلسفه کوچینگ عقلانی و استدلال نقادانه با اهداف شما',
        'فضایی آرامش‌بخش، محرمانه طبق منشور اخلاقی ICF و بدون تعهد مالی',
      ];
    case 'saloomeh_fathijou':
      return [
        'گفتگوی اختصاصی ۳۰ دقیقه‌ای برای شناسایی موانع ذهنیت مالی و ثروت',
        'تحلیل عمیق الگوهای ناخودآگاه ارتباط با پول و ارزش‌گذاری فردی',
        'ترسیم افق شفاف برای استقلال مالی و توسعه مهارت‌های درآمدزایی',
        'فضایی کاملاً امن، محرمانه طبق منشور اخلاقی ICF و بدون تعهد مالی',
      ];
    case 'fatemeh_derakhsh':
      return [
        'گفتگوی اختصاصی ۳۰ دقیقه‌ای برای ارزیابی تاب‌آوری و فشارهای فرسودگی شغلی',
        'ریشه‌یابی چالش‌های استرس، بحران‌های گذار و تعادل سلامت روان',
        'ترسیم نقشه راه علمی و همدلانه جهت بازگشت به وضوح و توانمندی',
        'فضایی کاملاً تخصصی، محرمانه طبق منشور اخلاقی ICF و بدون تعهد مالی',
      ];
    case 'shabnam_nematimalek':
      return [
        'گفتگوی اختصاصی ۳۰ دقیقه‌ای برای واکاوی الگوهای ارتباطی و روابط عاطفی',
        'شناسایی ریشه‌های عدم مرزگذاری سالم و تکرار تعارضات فرساینده',
        'سنجش آمادگی فردی برای بازسازی پیوندهای خانوادگی و صمیمیت',
        'فضایی کاملاً پذیرا، بدون قضاوت، محرمانه طبق منشور ICF و بدون تعهد مالی',
      ];
    case 'maryam_johari':
      return [
        'گفتگوی اختصاصی ۳۰ دقیقه‌ای برای شفاف‌سازی رسالت فردی و مسیر شغلی',
        'ارزیابی استعدادهای نهفته، مهارت‌ها و نقاط قوت در فضای کسب‌وکار',
        'تعیین گام‌های عملیاتی برای گذار شغلی یا ارتقای جایگاه حرفه‌ای',
        'فضایی حرفه‌ای، پرانرژی، هدایتگر، محرمانه و بدون تعهد مالی',
      ];
    case 'payam_esmi':
      return [
        'گفتگوی اختصاصی ۳۰ دقیقه‌ای برای عارضه‌یابی عملکرد رهبری و بهره‌وری سازمانی',
        'شناسایی موانع تصمیم‌گیری استراتژیک، تفویض اختیار و مدیریت تیم',
        'سنجش تناسب مدل‌های اجرایی کوچینگ سیستماتیک با چالش‌های تجاری شما',
        'گفتگویی تخصصی، نتیجه‌گرا، با استانداردهای ICF و محرمانه',
      ];
    default:
      return [
        'گفتگوی اختصاصی ۳۰ دقیقه‌ای برای شفاف‌سازی دغدغه و اهداف شما',
        'شنیدن بدون قضاوت چالش‌ها، تعارضات و اولویت‌های پیش رو',
        'بررسی تناسب متدولوژی کوچینگ با نیاز و افق پیشرفت شما',
        'فضایی کاملاً امن، محرمانه طبق منشور اخلاقی ICF و بدون تعهد مالی',
      ];
  }
};

const getQuote = (canonical: string): string => {
  switch (canonical) {
    case 'fatemeh_esmaeeli':
      return 'همراه شما هستم تا بدون ترس و احساس گناه، با شفافیت و آرامش، تعادلی پایدار میان مادری، کار و آرزوهای فردی‌تان بسازید.';
    case 'mahya_shakouri':
      return 'همراه شما هستم تا با صلح درونی و مرزگذاری شفاف، بدون ترس و احساس گناه مسیر اصیل‌تان را بسازید.';
    case 'arezoo_ghaffari':
      return 'همراه شما هستم تا با تفکر نقادانه و شفافیت عقلانی، تصمیم‌هایی استوار و متعهدانه در زندگی شخصی و حرفه‌ای بگیرید.';
    case 'saloomeh_fathijou':
      return 'همراه شما هستم تا باورهای محدودکننده مالی را کنار بگذارید و با ذهنیت فراوانی، آینده مالی مطمئن و عزت‌نفس‌تان را بسازید.';
    case 'fatemeh_derakhsh':
      return 'در میان فشارهای پرشتاب زندگی، همراه شما هستم تا تاب‌آوری اصیل درونی‌تان را بیدار کرده و با وضوح و اقتدار حرکت کنید.';
    case 'shabnam_nematimalek':
      return 'همراه شما هستم تا با شناخت عمیق نیازها و مرزها، روابطی سرشار از امنیت، احترام متقابل و شفقت بسازید.';
    case 'maryam_johari':
      return 'همراه شما هستم تا رسالت اصیل‌تان را بیابید و با شجاعت و تمرکز، کسب‌وکار یا مسیر حرفه‌ای اثرگذارتان را پایه‌ریزی کنید.';
    case 'payam_esmi':
      return 'همراه مدیران و کارآفرینان هستم تا با رهبری خودآگاه و سیستماتیک، تیم‌هایی چابک، الهام‌بخش و پایدار خلق کنند.';
    default:
      return 'همراه شما هستم تا بدون ترس و با شفافیت، گام‌های استوار و معنادار به سوی اهداف ارزشمندتان بردارید.';
  }
};

const getBannerImage = (coach?: CoachProfile, canonical?: string) => {
  if (coach?.cutoutImageUrl) return coach.cutoutImageUrl;
  if (canonical === 'fatemeh_esmaeeli') return '/images/solea/fatemeh_hero_v4.png';
  if (canonical === 'mahya_shakouri') return '/images/solea/mahya_hero_v4.png';
  if (canonical === 'arezoo_ghaffari') return '/images/solea/arezoo_hero.png';
  if (coach?.coverImage) return coach.coverImage;
  if (coach?.aboutImage) return coach.aboutImage;
  if (coach?.imageUrl) return coach.imageUrl;
  return '/images/solea/fatemeh_hero_v4.png';
};

export const SoleaConsultationBanner: React.FC<SoleaConsultationBannerProps> = ({ coach, onOpenBooking }) => {
  const canonical = getCanonicalSlug(coach?.slug || '');
  const isAtynoCoach = Boolean(coach?.bookingUrl && coach.bookingUrl.includes('atyno.com'));
  const coachName = coach?.name || 'کوچ بلومیا';
  const coachTitle = coach?.title || 'کوچ حرفه‌ای و بین‌المللی ICF';
  const bookingLink = coach?.bookingUrl || '#contact';

  const isCutout = Boolean(
    coach?.cutoutImageUrl ||
    canonical === 'fatemeh_esmaeeli' ||
    canonical === 'mahya_shakouri' ||
    canonical === 'arezoo_ghaffari'
  );

  const bannerImage = getBannerImage(coach, canonical);
  const checklistItems = getChecklist(canonical);
  const quoteText = getQuote(canonical);

  return (
    <motion.div
      id="consultation"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="mt-16 lg:mt-24 w-full"
    >
      <div className="relative w-full overflow-hidden rounded-[20px] bg-white px-6 py-10 sm:px-10 lg:px-[40px] lg:py-[32px] text-[#1e1e1e] shadow-none">
        
        {/* Desktop Layout: Flex row space-between with Center Absolute Image */}
        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between min-h-[440px] gap-10 lg:gap-0">
          
          {/* Start Column: Heading, Checklist, CTA (w-[380px]) */}
          <div className="flex flex-col items-start justify-center w-full lg:w-[380px] shrink-0 z-10">
            <h3 className="font-serif text-[28px] sm:text-[34px] lg:text-[38px] font-normal leading-[1.38] sm:leading-[1.35] text-[#1e1e1e]">
              رزرو جلسه معارفه رایگان
              <br />
              (جلسه صفر ۳۰ دقیقه‌ای)
            </h3>

            <h4 className="mt-6 mb-4 font-serif text-[17px] lg:text-[19px] font-bold leading-normal text-[#1e1e1e]">
              آنچه در این جلسه دریافت می‌کنید:
            </h4>

            <ul className="flex flex-col gap-3.5">
              {checklistItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <svg
                    viewBox="0 0 20 20"
                    className="h-[18px] w-[18px] shrink-0 text-[#1f3d3a] mt-0.5"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      d="M 3.125 6.509 L 0 3.383 L 0.883 2.5 L 3.125 4.741 L 7.866 0 L 8.75 0.884 Z"
                      transform="translate(5.625 6.875)"
                    />
                    <path
                      d="M 8.75 0 C 7.019 0 5.328 0.513 3.889 1.475 C 2.45 2.436 1.328 3.803 0.666 5.402 C 0.004 7 -0.169 8.76 0.168 10.457 C 0.506 12.154 1.339 13.714 2.563 14.937 C 3.787 16.161 5.346 16.994 7.043 17.332 C 8.74 17.669 10.5 17.496 12.098 16.834 C 13.697 16.172 15.064 15.05 16.025 13.611 C 16.987 12.172 17.5 10.481 17.5 8.75 C 17.5 6.429 16.578 4.204 14.937 2.563 C 13.296 0.922 11.071 0 8.75 0 Z M 8.75 16.25 C 7.267 16.25 5.817 15.81 4.583 14.986 C 3.35 14.162 2.389 12.991 1.821 11.62 C 1.253 10.25 1.105 8.742 1.394 7.287 C 1.683 5.832 2.398 4.496 3.447 3.447 C 4.496 2.398 5.832 1.684 7.287 1.394 C 8.742 1.105 10.25 1.253 11.62 1.821 C 12.991 2.389 14.162 3.35 14.986 4.583 C 15.81 5.817 16.25 7.267 16.25 8.75 C 16.25 10.739 15.46 12.647 14.053 14.053 C 12.647 15.46 10.739 16.25 8.75 16.25 Z"
                      transform="translate(1.25 1.25)"
                    />
                  </svg>
                  <span className="text-[14px] lg:text-[15px] text-[#1e1e1e] font-normal leading-[1.75]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 sm:mt-10">
              {isAtynoCoach ? (
                <a
                  href={bookingLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-[12px] bg-[#1f3d3a] px-7 py-3.5 text-[15px] font-medium text-white transition-colors duration-200 hover:bg-[#2b544e]"
                >
                  رزرو وقت در آتینو
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => onOpenBooking?.('جلسه صفر (معارفه رایگان ۳۰ دقیقه‌ای)')}
                  className="inline-flex items-center justify-center rounded-[12px] bg-[#1f3d3a] px-7 py-3.5 text-[15px] font-medium text-white transition-colors duration-200 hover:bg-[#2b544e] cursor-pointer"
                >
                  درخواست جلسه معارفه رایگان
                </button>
              )}
            </div>
          </div>

          {/* Center Column: Portrait Cutout grounded at bottom + Yellow Shape */}
          <div className="relative lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:bottom-[-32px] w-full lg:w-[320px] h-[320px] sm:h-[360px] lg:h-[390px] flex items-end justify-center pointer-events-none z-10">
            {/* Organic Yellow Shape */}
            <div className="absolute bottom-4 sm:bottom-6 lg:bottom-6 left-1/2 -translate-x-1/2 w-[240px] sm:w-[270px] lg:w-[280px] aspect-square z-0">
              <Image
                src="/images/solea/consultation_yellow_shape.svg"
                alt="تزیین پس‌زمینه"
                fill
                className="object-contain"
              />
            </div>

            {/* Cutout or Framed Portrait Photo */}
            {isCutout ? (
              <div className="relative z-10 w-[240px] sm:w-[270px] lg:w-[285px] h-[310px] sm:h-[350px] lg:h-[380px]">
                <Image
                  src={bannerImage}
                  alt={coachName}
                  fill
                  className="object-contain object-bottom"
                  sizes="(max-width: 768px) 270px, 285px"
                  priority
                />
              </div>
            ) : (
              <div className="relative z-10 w-[210px] sm:w-[240px] lg:w-[255px] h-[260px] sm:h-[300px] lg:h-[320px] overflow-hidden rounded-[24px] ring-4 ring-[#dfece9] shadow-xl bg-[#f2f7f6] mb-4">
                <Image
                  src={bannerImage}
                  alt={coachName}
                  fill
                  className="object-cover object-[center_20%]"
                  sizes="(max-width: 768px) 240px, 255px"
                  priority
                />
              </div>
            )}
          </div>

          {/* End Column: Quote, Signature, ICF accreditation (w-[365px]) */}
          <div className="flex flex-col items-start justify-center w-full lg:w-[365px] shrink-0 z-10">
            <div>
              {/* Quote Icon */}
              <svg
                viewBox="0 0 20 20"
                className="h-8 w-8 text-[#1f3d3a]"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M 4.444 20 C 3.266 20 2.135 19.532 1.302 18.698 C 0.468 17.865 0 16.734 0 15.556 C 0 13.919 1.481 8.733 4.444 0 L 6.667 0 L 4.444 11.111 C 5.623 11.111 6.754 11.579 7.587 12.413 C 8.421 13.246 8.889 14.377 8.889 15.556 C 8.889 16.734 8.421 17.865 7.587 18.698 C 6.754 19.532 5.623 20 4.444 20 Z M 15.556 20 C 14.377 20 13.246 19.532 12.413 18.698 C 11.579 17.865 11.111 16.734 11.111 15.556 C 11.111 13.919 12.593 8.733 15.556 0 L 17.778 0 L 15.556 11.111 C 16.734 11.111 17.865 11.579 18.698 12.413 C 19.532 13.246 20 14.377 20 15.556 C 20 16.734 19.532 17.865 18.698 18.698 C 17.865 19.532 16.734 20 15.556 20 Z" />
              </svg>

              {/* Quote Text */}
              <p className="mt-3 font-serif text-[18px] sm:text-[20px] lg:text-[22px] font-bold leading-[1.4] text-[#1e1e1e] pb-6 border-b border-[#e5e5e2] max-w-[340px]">
                {quoteText}
              </p>

              {/* Signature and Designation */}
              <div className="mt-4">
                <span className="font-serif text-xl font-bold text-[#1e1e1e] block">
                  {coachName}
                </span>
                <p className="mt-1 text-[14px] lg:text-[15px] text-[#6b6b6b] font-normal">
                  {coachTitle}
                </p>
              </div>
            </div>

            {/* Professional ICF Ethics & Confidentiality Box */}
            <div className="mt-6 w-full max-w-[340px] rounded-2xl bg-[#f2f7f6] border border-[#dfece9] p-4 sm:p-4.5">
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1f3d3a] text-[#dfece9] shrink-0">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <h5 className="font-serif text-[14px] sm:text-[15px] font-bold text-[#1f3d3a]">
                  تعهد به محرمانگی و اخلاق حرفه‌ای
                </h5>
              </div>
              <p className="text-[12px] sm:text-[13px] leading-relaxed text-[#4a4a4a]">
                تمامی جلسات مطابق با اصول اخلاقی و استانداردهای بین‌المللی فدراسیون بین‌المللی کوچینگ (ICF) در فضایی کاملاً امن، بدون قضاوت و محرمانه برگزار می‌شوند.
              </p>
            </div>

          </div>

        </div>
      </div>
    </motion.div>
  );
};
