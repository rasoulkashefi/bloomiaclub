'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const checklistItems = [
  'One-on-one strategic clarity session',
  'Personalized guidance based on your goals',
  'Honest feedback on your current direction',
  'A supportive, pressure-free conversation',
];

export const SoleaConsultationBanner: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="mt-16 lg:mt-24 w-full"
    >
      <div className="relative w-full overflow-hidden rounded-[20px] bg-white px-6 py-10 sm:px-10 lg:px-[40px] lg:py-[32px] text-[#3f2a24] shadow-none">
        
        {/* Desktop Layout: Flex row space-between with Center Absolute Image */}
        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between min-h-[440px] gap-10 lg:gap-0">
          
          {/* Left Column: Heading, Checklist, CTA (w-[358px]) */}
          <div className="flex flex-col items-start justify-center w-full lg:w-[358px] shrink-0 z-10">
            <h3 className="font-serif text-[32px] sm:text-[36px] lg:text-[40px] font-normal leading-[1.16] tracking-[-1px] text-[#3f2a24]">
              Book your free
              <br />
              Clarity consultation
            </h3>

            <h4 className="mt-6 mb-4 font-serif text-[18px] lg:text-[20px] font-bold text-[#3f2a24]">
              What you’ll get
            </h4>

            <ul className="flex flex-col gap-3">
              {checklistItems.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <svg
                    viewBox="0 0 20 20"
                    className="h-[18px] w-[18px] shrink-0 text-[#bb7462]"
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
                  <span className="text-[15px] lg:text-[16px] text-[#3f2a24] font-normal leading-snug">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Link
                href="#contact"
                className="inline-flex items-center justify-center rounded-[12px] bg-[#bb7462] px-7 py-3.5 text-[15px] font-medium text-white transition-colors duration-200 hover:bg-[#101010]"
              >
                Book a Session
              </Link>
            </div>
          </div>

          {/* Center Column: Solea Cutout grounded at bottom + Yellow Shape (Absolute in desktop, relative on mobile) */}
          <div className="relative lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:bottom-[-32px] w-full lg:w-[435px] h-[380px] sm:h-[420px] lg:h-[464px] flex items-end justify-center pointer-events-none z-10">
            {/* Organic Yellow Shape */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[280px] sm:w-[320px] lg:w-[320px] aspect-square z-0">
              <Image
                src="/images/solea/consultation_yellow_shape.svg"
                alt="Decorative yellow shape"
                fill
                className="object-contain"
              />
            </div>

            {/* Solea Cutout Photo grounded at bottom of card */}
            <div className="relative z-10 w-[280px] sm:w-[320px] lg:w-[339px] h-[380px] sm:h-[420px] lg:h-[447px]">
              <Image
                src="/images/solea/consultation_solea.png"
                alt="Solea Marry - Clarity Consultation"
                fill
                className="object-contain object-bottom"
                sizes="(max-width: 768px) 300px, 340px"
                priority
              />
            </div>
          </div>

          {/* Right Column: Quote, Signature, Trusted Brands (w-[365px]) */}
          <div className="flex flex-col items-start justify-center w-full lg:w-[365px] shrink-0 z-10">
            <div>
              {/* Quote Icon */}
              <svg
                viewBox="0 0 20 20"
                className="h-8 w-8 text-[#bb7462]"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M 4.444 20 C 3.266 20 2.135 19.532 1.302 18.698 C 0.468 17.865 0 16.734 0 15.556 C 0 13.919 1.481 8.733 4.444 0 L 6.667 0 L 4.444 11.111 C 5.623 11.111 6.754 11.579 7.587 12.413 C 8.421 13.246 8.889 14.377 8.889 15.556 C 8.889 16.734 8.421 17.865 7.587 18.698 C 6.754 19.532 5.623 20 4.444 20 Z M 15.556 20 C 14.377 20 13.246 19.532 12.413 18.698 C 11.579 17.865 11.111 16.734 11.111 15.556 C 11.111 13.919 12.593 8.733 15.556 0 L 17.778 0 L 15.556 11.111 C 16.734 11.111 17.865 11.579 18.698 12.413 C 19.532 13.246 20 14.377 20 15.556 C 20 16.734 19.532 17.865 18.698 18.698 C 17.865 19.532 16.734 20 15.556 20 Z" />
              </svg>

              {/* Quote Text (Bold Lora Serif) */}
              <p className="mt-3 font-serif text-[20px] sm:text-[22px] lg:text-[24px] font-bold leading-[1.3] text-[#3f2a24] pb-6 border-b border-[#808080]/30 max-w-[340px]">
                I support women in building confidence, clarity, and a life they love.
              </p>

              {/* Signature and Designation */}
              <div className="mt-4">
                <div className="relative h-8 w-28">
                  <Image
                    src="/images/solea/consultation_signature.svg"
                    alt="Solea Marry Signature"
                    fill
                    className="object-contain object-left"
                  />
                </div>
                <p className="mt-1 text-[15px] lg:text-[16px] text-[#606060] font-normal">
                  Feminine Influencer
                </p>
              </div>
            </div>

            {/* Trusted by top brands & Logos */}
            <div className="mt-6 lg:mt-8">
              <h5 className="font-serif text-[18px] lg:text-[20px] font-bold text-[#3f2a24] mb-3">
                Trusted by top brands
              </h5>
              <div className="flex items-center gap-4 sm:gap-6 flex-nowrap">
                <div className="relative h-6 w-20 shrink-0 opacity-80 transition-opacity hover:opacity-100">
                  <Image
                    src="/images/solea/brand_acme.png"
                    alt="Acme"
                    fill
                    className="object-contain object-left"
                  />
                </div>
                <div className="relative h-6 w-24 shrink-0 opacity-80 transition-opacity hover:opacity-100">
                  <Image
                    src="/images/solea/brand_goldline.png"
                    alt="Goldline"
                    fill
                    className="object-contain object-left"
                  />
                </div>
                <div className="relative h-6 w-20 shrink-0 opacity-80 transition-opacity hover:opacity-100">
                  <Image
                    src="/images/solea/brand_kanba.png"
                    alt="Kanba"
                    fill
                    className="object-contain object-left"
                  />
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </motion.div>
  );
};
