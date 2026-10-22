'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu } from 'lucide-react';
import { SoleaMenuCard } from './SoleaMenuCard';

interface SoleaNavbarProps {
  coach?: any;
  onOpenMenu?: () => void;
}

export const SoleaNavbar: React.FC<SoleaNavbarProps> = ({ coach, onOpenMenu }) => {
  const [scrolled, setScrolled] = useState(false);
  const [pagesDropdownOpen, setPagesDropdownOpen] = useState(false);
  const [internalMenuOpen, setInternalMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const contactEl = document.getElementById('contact');
      const isContactInView = contactEl
        ? contactEl.getBoundingClientRect().top <= 120
        : false;

      // Appear when user scrolls down past hero/about, but hide when reaching contact section
      if (scrollY > 900 && !isContactInView) {
        setScrolled(true);
      } else {
        setScrolled(false);
        setPagesDropdownOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside dropdown to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setPagesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setPagesDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setPagesDropdownOpen(false);
    }, 150);
  };

  const handleOpenMobile = () => {
    if (onOpenMenu) {
      onOpenMenu();
    } else {
      setInternalMenuOpen(true);
    }
  };

  const coachName = coach?.name || 'فاطمه اسماعیلی';

  return (
    <>
      <AnimatePresence>
        {scrolled && (
          <motion.header
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed top-6 start-0 end-0 z-40 w-full px-4 sm:px-6 pointer-events-auto flex justify-center"
          >
            <div className="relative flex w-full max-w-[880px] h-[72px] items-center justify-between rounded-[16px] border border-black/[0.06] bg-white/95 backdrop-blur-md px-6 shadow-[0_4px_25px_rgba(0,0,0,0.06)]">
              {/* Brand Logo / Name */}
              <Link href="#home" className="inline-flex items-center leading-none gap-2.5">
                <span className="font-serif text-lg font-bold text-[#1f3d3a]">
                  {coachName}
                </span>
                <span className="text-xs text-[#6b6b6b] hidden sm:inline border-s border-[#e5e5e2] ps-2.5 leading-none">
                  کوچ بین‌المللی ICF
                </span>
              </Link>

              {/* Desktop Nav Links */}
              <nav className="hidden md:flex items-center gap-7 text-[15px] font-medium text-[#6b6b6b]">
                <Link
                  href="#home"
                  className="inline-flex items-center leading-none transition-colors hover:text-[#1f3d3a]"
                >
                  خانه
                </Link>

                <Link
                  href="#about"
                  className="inline-flex items-center leading-none transition-colors hover:text-[#1f3d3a]"
                >
                  درباره من
                </Link>

                <Link
                  href="#services"
                  className="inline-flex items-center leading-none transition-colors hover:text-[#1f3d3a]"
                >
                  خدمات
                </Link>

                <Link
                  href="#testimonials"
                  className="inline-flex items-center leading-none transition-colors hover:text-[#1f3d3a]"
                >
                  مراجعان
                </Link>

                {/* Pages with 2-Column Floating Dropdown */}
                <div
                  ref={dropdownRef}
                  className="relative inline-flex items-center leading-none"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    type="button"
                    onClick={() => setPagesDropdownOpen(!pagesDropdownOpen)}
                    className={`inline-flex items-center gap-1.5 leading-none transition-colors ${
                      pagesDropdownOpen ? 'text-[#1f3d3a]' : 'text-[#6b6b6b] hover:text-[#1f3d3a]'
                    }`}
                  >
                    <span>بخش‌ها</span>
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-200 ${
                        pagesDropdownOpen ? 'rotate-180 text-[#1f3d3a]' : 'text-[#6b6b6b]'
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu Card */}
                  <AnimatePresence>
                    {pagesDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        className="absolute top-[calc(100%+16px)] start-1/2 -translate-x-1/2 z-50 w-[340px] rounded-[14px] bg-[#1f3d3a] p-6 text-white shadow-[0_10px_25px_rgba(0,0,0,0.15)]"
                      >
                        <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-[14px]">
                          {/* Column 1 */}
                          <div className="flex flex-col gap-2.5">
                            <Link
                              href="#home"
                              onClick={() => setPagesDropdownOpen(false)}
                              className="text-white/85 transition-colors hover:text-white"
                            >
                              صفحه اصلی
                            </Link>
                            <Link
                              href="#about"
                              onClick={() => setPagesDropdownOpen(false)}
                              className="text-white/85 transition-colors hover:text-white"
                            >
                              درباره من
                            </Link>
                            <Link
                              href="#services"
                              onClick={() => setPagesDropdownOpen(false)}
                              className="text-white/85 transition-colors hover:text-white"
                            >
                              خدمات کوچینگ
                            </Link>
                            <Link
                              href="#projects"
                              onClick={() => setPagesDropdownOpen(false)}
                              className="text-white/85 transition-colors hover:text-white"
                            >
                              روایت تحول
                            </Link>
                          </div>

                          {/* Column 2 */}
                          <div className="flex flex-col gap-2.5">
                            <Link
                              href="#testimonials"
                              onClick={() => setPagesDropdownOpen(false)}
                              className="text-white/85 transition-colors hover:text-white"
                            >
                              دیدگاه مراجعان
                            </Link>
                            <Link
                              href="#pricing"
                              onClick={() => setPagesDropdownOpen(false)}
                              className="text-white/85 transition-colors hover:text-white"
                            >
                              پکیج‌ها و تعرفه
                            </Link>
                            <Link
                              href="#blog"
                              onClick={() => setPagesDropdownOpen(false)}
                              className="text-white/85 transition-colors hover:text-white"
                            >
                              یادداشت‌ها
                            </Link>
                            <Link
                              href="#contact"
                              onClick={() => setPagesDropdownOpen(false)}
                              className="text-white/85 transition-colors hover:text-white"
                            >
                              ارتباط و رزرو
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </nav>

              {/* Right CTA Button */}
              <div className="hidden md:block">
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-[12px] bg-[#1f3d3a] px-5 py-2.5 text-[14px] font-medium text-white transition-all hover:bg-[#2b544e] hover:shadow-sm"
                >
                  رزرو جلسه معارفه
                </Link>
              </div>

              {/* Mobile Hamburger Button */}
              <button
                type="button"
                onClick={handleOpenMobile}
                className="flex h-10 w-10 items-center justify-center rounded-lg text-[#1f3d3a] hover:bg-black/5 md:hidden"
                aria-label="باز کردن منو"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Internal Menu Card for Mobile Drawer */}
      {!onOpenMenu && (
        <SoleaMenuCard
          isOpen={internalMenuOpen}
          onClose={() => setInternalMenuOpen(false)}
        />
      )}
    </>
  );
};
