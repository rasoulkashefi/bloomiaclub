'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';
import {
  CrownDoodle,
  LoopArrowDoodle,
  GrowthSlashes,
  RatingUnderline,
} from './SoleaDoodles';

const TwitterIcon = () => (
  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

interface SoleaHeroProps {
  onOpenMenu?: () => void;
}

export const SoleaHero: React.FC<SoleaHeroProps> = ({ onOpenMenu }) => {
  return (
    <section
      id="home"
      className="relative w-full h-[100dvh] max-h-[100dvh] overflow-hidden bg-[#b47c86] text-white flex flex-col justify-between select-none"
    >
      {/* Top micro-bar: Email on left, Hamburger on right */}
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 pt-5 sm:pt-7 pb-2 flex items-center justify-between z-30">
        <div>
          <span className="block text-[11px] font-sans tracking-wide text-white/75">
            Get In Touch
          </span>
          <a
            href="mailto:hello@solea.com"
            className="font-serif text-base sm:text-lg text-white hover:text-[#fff7a2] transition-colors"
          >
            hello@solea.com
          </a>
        </div>

        {/* Two-Line Hamburger Button */}
        <button
          type="button"
          onClick={onOpenMenu}
          className="group flex flex-col items-end justify-center gap-[9px] p-2 focus:outline-none cursor-pointer"
          aria-label="Open Menu"
        >
          <span className="block h-[2px] w-10 bg-white transition-all duration-300 group-hover:w-8" />
          <span className="block h-[2px] w-10 bg-white transition-all duration-300" />
        </button>
      </div>

      {/* Main Single-Screen Viewport Content */}
      <div className="flex-1 relative w-full max-w-7xl mx-auto px-6 lg:px-12 flex items-center z-10 min-h-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center w-full h-full relative">
          
          {/* Left Column: Rating, Title, Description, CTA */}
          <div className="flex flex-col items-start justify-center lg:col-span-5 z-20 py-1">
            {/* Rating Stars with Underline */}
            <div className="relative mb-3 sm:mb-5">
              <div className="flex items-center gap-1.5 text-xs font-medium text-white/95">
                <div className="flex text-[#fff7a2]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-[#fff7a2] stroke-none" />
                  ))}
                </div>
                <span className="font-semibold text-white ml-1">4.9★</span>
                <span className="text-white/80">Google Rating</span>
              </div>
              {/* Doodle Underline */}
              <div className="mt-1">
                <RatingUnderline className="h-1.5 w-32 sm:w-36 text-[#fff7a2]" />
              </div>
            </div>

            {/* Main Headline */}
            <div className="relative">
              <h1 className="font-serif text-[42px] sm:text-[52px] md:text-[60px] lg:text-[64px] xl:text-[74px] font-normal leading-[1.04] text-white tracking-normal">
                Growth
                <span className="inline-block relative -top-3 sm:-top-5 ml-2">
                  <GrowthSlashes className="w-6 h-5 sm:w-8 sm:h-7 text-[#fff7a2]" />
                </span>
                <br />
                That feels
                <br />
                Like Peace
              </h1>
            </div>

            {/* Description Subtitle */}
            <p className="mt-3 sm:mt-4 max-w-[350px] text-xs sm:text-sm md:text-base text-white/85 leading-relaxed font-sans">
              Create progress that supports your life not overwhelms it.
            </p>

            {/* CTA Button */}
            <div className="mt-5 sm:mt-7">
              <Link
                href="#contact"
                className="inline-flex items-center justify-center rounded-[12px] bg-[#fff7a2] px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold text-[#1e1e1e] shadow-md transition-all duration-200 hover:bg-[#faee82] active:scale-95"
              >
                Book a Session
              </Link>
            </div>
          </div>

          {/* Right Column: Name & Designation */}
          <div className="hidden lg:flex flex-col items-start justify-start lg:col-span-3 lg:col-start-10 z-20 self-start pt-6 sm:pt-8 pl-2">
            <h3 className="font-serif text-3xl xl:text-[40px] font-normal leading-[1.14] text-white">
              Hello, This is
              <br />
              Solea Marry
            </h3>
            <p className="mt-3 text-base xl:text-lg text-white/85 leading-snug font-sans max-w-[210px]">
              Professional Feminine
              <br />
              Influencer
            </p>
          </div>

        </div>
      </div>

      {/* Center Image Component: Mathematically locked to Solea's exact 423/625 aspect ratio */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 flex items-end justify-center z-10">
        <div className="relative h-[min(85vh,660px)] aspect-[423/625]">
          
          {/* Golden Line Doodle Halo: Exactly 107.14% width and 100.93% height of Solea, centered */}
          <div
            className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 z-0"
            style={{
              width: '107.14%',
              height: '100.93%',
            }}
          >
            <Image
              src="/images/solea/img_1.svg"
              alt="Doodle Decoration"
              fill
              className="object-fill"
              priority
            />
          </div>

          {/* Solea Portrait Photo: Exactly fills 100% of the 423/625 aspect container */}
          <div className="relative w-full h-full z-10">
            <Image
              src="/images/solea/img_2.png"
              alt="Solea Marry"
              fill
              className="object-contain object-bottom"
              priority
            />
          </div>

          {/* Crown Doodle: Floating ABOVE the golden arch, exactly matching Framer's -9% offset */}
          <div
            className="absolute z-20"
            style={{
              top: '-9%',
              left: '57%',
              transform: 'translateX(-50%) rotate(30.6deg)',
            }}
          >
            <CrownDoodle className="w-12 h-10 sm:w-14 sm:h-12 text-[#fff7a2]" />
          </div>

          {/* Loop Arrow Doodle: Snug against arm and contour line, exactly matching Framer */}
          <div
            className="absolute z-20 pointer-events-none"
            style={{
              top: '40.5%',
              left: '101%',
              transform: 'translateX(-55%) rotate(-12deg)',
            }}
          >
            <LoopArrowDoodle className="w-14 h-12 sm:w-[70px] sm:h-[60px] text-[#fff7a2]" />
          </div>

        </div>
      </div>

      {/* Far Right Vertical Strip: Follow Me & Social Icons */}
      <div className="hidden lg:flex absolute right-6 sm:right-8 bottom-8 z-20 flex-col items-center gap-3">
        <span
          className="text-[11px] font-medium tracking-[0.25em] text-white/70 uppercase"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          Follow Me
        </span>
        <div className="h-8 w-[1px] bg-white/20 my-0.5" />
        <div className="flex flex-col gap-2.5">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white transition-all hover:bg-white hover:text-[#b47c86]"
            aria-label="Twitter"
          >
            <TwitterIcon />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white transition-all hover:bg-white hover:text-[#b47c86]"
            aria-label="LinkedIn"
          >
            <LinkedinIcon />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white transition-all hover:bg-white hover:text-[#b47c86]"
            aria-label="Instagram"
          >
            <InstagramIcon />
          </a>
        </div>
      </div>
    </section>
  );
};
