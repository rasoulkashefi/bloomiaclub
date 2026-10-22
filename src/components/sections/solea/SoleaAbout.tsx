'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export const SoleaAbout: React.FC = () => {
  return (
    <section id="about" className="w-full bg-[#fafaf8] py-20 lg:py-[120px] text-[#3f2a24] overflow-hidden">
      <div className="mx-auto max-w-[1360px] px-6 sm:px-10 lg:px-[30px]">
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-0">
          
          {/* Far Left Column: 'About Me' subtle serif label, top-aligned with heading */}
          <div className="w-full lg:w-[310px] shrink-0">
            <span className="font-serif text-[20px] leading-[29.6px] font-normal text-[#3f2a24]">
              About Me
            </span>
          </div>

          {/* Right Block: Heading on top, Portrait + Narrative below */}
          <div className="flex-1 flex flex-col w-full">
            
            {/* Big Serif Heading: Exact 3-line layout and styling */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="font-serif text-[36px] sm:text-[46px] lg:text-[56px] font-normal leading-[1.28] tracking-[-2px] text-[#3f2a24] max-w-[640px]">
                Helping women grow
                <br />
                With clarity, confidence,
                <br />
                And calm
              </h2>
            </motion.div>

            {/* Row with Portrait Card on Left, Narrative & Signature on Right */}
            <div className="mt-10 lg:mt-12 flex flex-col lg:flex-row items-start gap-10 lg:gap-14 w-full">
              
              {/* Left: Peach Portrait Card with 20px rounded corners, perfectly aligned under 'H' of heading */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 36 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-[500px] shrink-0"
              >
                <div className="relative aspect-[500/520] w-full overflow-hidden rounded-[20px] bg-[#ffe0d9]">
                  <Image
                    src="/images/solea/img_3.png"
                    alt="Solea Marry portrait"
                    fill
                    className="object-cover object-top transition-transform duration-700 ease-out hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 500px"
                    priority
                  />
                </div>
              </motion.div>

              {/* Right: Narrative Copy & Signature */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 max-w-[420px] flex flex-col justify-start pt-1 lg:pt-2"
              >
                <p className="text-[20px] lg:text-[24px] leading-[1.48] text-[#3f2a24] font-normal">
                  I help women who feel tired of always pushing, proving, and pleasing. My work is about returning to your natural power
                </p>

                <p className="mt-7 lg:mt-8 text-[20px] lg:text-[24px] leading-[1.48] text-[#3f2a24] font-normal">
                  We help you build an aligned mindset rooted in self trust, clarity, and calm.
                </p>

                {/* Author Name and Signature */}
                <div className="mt-10 lg:mt-12 flex flex-col gap-3">
                  <h3 className="font-serif text-[28px] font-bold text-[#3f2a24]">
                    Solea Marry
                  </h3>
                  <div className="relative h-[40px] w-[134px]">
                    <Image
                      src="/images/solea/img_4.png"
                      alt="Solea Marry signature"
                      fill
                      className="object-contain object-left"
                    />
                  </div>
                </div>
              </motion.div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
