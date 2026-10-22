'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { CoachProfile } from '@/lib/coaches';

interface SoleaAboutProps {
  coach?: CoachProfile;
}

export const SoleaAbout: React.FC<SoleaAboutProps> = ({ coach }) => {
  const coachName = coach?.name || 'فاطمه اسماعیلی';
  const coachTitle = coach?.title || 'کوچ بین‌المللی مادران، بانوان و نوجوانان';
  const aboutImage = coach?.aboutImage || coach?.coverImage || coach?.imageUrl || '/images/solea/fatemeh_about.jpg';

  return (
    <section id="about" className="w-full bg-[#fafaf8] py-20 lg:py-[120px] text-[#1e1e1e] overflow-hidden">
      <div className="mx-auto max-w-[1360px] px-6 sm:px-10 lg:px-[30px]">
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-0">
          
          {/* Start Column: 'About Me' subtle label */}
          <div className="w-full lg:w-[280px] shrink-0">
            <span className="font-serif text-[20px] leading-[29.6px] font-normal text-[#1e1e1e]">
              درباره من
            </span>
          </div>

          {/* Main Block: Heading on top, Portrait + Narrative below */}
          <div className="flex-1 flex flex-col w-full">
            
            {/* Big Serif Heading */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="font-serif text-[32px] sm:text-[44px] lg:text-[52px] font-normal leading-[1.38] sm:leading-[1.34] lg:leading-[1.32] text-[#1e1e1e] max-w-[720px]">
                همراهی با شما برای رشد،
                <br />
                با وضوح، اعتمادبه‌نفس
                <br />
                و آرامش ماندگار
              </h2>
            </motion.div>

            {/* Row with Portrait Card on Start, Narrative & Signature on End */}
            <div className="mt-10 lg:mt-12 flex flex-col lg:flex-row items-start gap-10 lg:gap-14 w-full">
              
              {/* Portrait Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 36 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-[500px] shrink-0"
              >
                <div className="relative aspect-[500/560] w-full overflow-hidden rounded-[20px] bg-[#f2f7f6]">
                  <Image
                    src={aboutImage}
                    alt={coachName}
                    fill
                    className="object-cover object-[center_20%] transition-transform duration-700 ease-out hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 500px"
                    priority
                  />
                </div>
              </motion.div>

              {/* Narrative Copy & Signature */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 max-w-[480px] flex flex-col justify-start pt-1 lg:pt-2"
              >
                <p className="text-[17px] sm:text-[19px] lg:text-[20px] leading-[1.85] text-[#1e1e1e] font-normal">
                  باور دارم هر زنی در درون خود صدایی دارد که اگر شنیده شود، می‌تواند مسیر زندگی‌اش را با وضوح و آرامش بیشتری انتخاب کند. رسالت من همراهی با زنانی است که میان نقش‌های متعدد مادری، کار و خانواده، می‌خواهند به خودِ واقعی‌شان بازگردند.
                </p>

                <p className="mt-6 lg:mt-7 text-[16px] sm:text-[18px] lg:text-[19px] leading-[1.85] text-[#4a4a4a] font-normal">
                  در جلسات کوچینگ، فضایی امن، کاملاً محرمانه و عاری از هرگونه قضاوت می‌سازیم؛ جایی برای مکث، عبور از احساس گناه مادری، بازیابی اعتمادبه‌نفس و ساختن تعادل پایدار در زندگی روزمره.
                </p>

                {/* Author Name and Title */}
                <div className="mt-8 lg:mt-10 flex flex-col gap-1.5">
                  <h3 className="font-serif text-[24px] sm:text-[28px] font-bold leading-snug text-[#1e1e1e]">
                    {coachName}
                  </h3>
                  <p className="text-sm text-[#6b6b6b] leading-normal">
                    {coachTitle}
                  </p>
                </div>
              </motion.div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
