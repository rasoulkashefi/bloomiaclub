'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu } from 'lucide-react';
import { SoleaMenuCard } from './SoleaMenuCard';

interface SoleaNavbarProps {
  onOpenMenu?: () => void;
}

export const SoleaNavbar: React.FC<SoleaNavbarProps> = ({ onOpenMenu }) => {
  const [scrolled, setScrolled] = useState(false);
  const [pagesDropdownOpen, setPagesDropdownOpen] = useState(false);
  const [internalMenuOpen, setInternalMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Appear when user scrolls down past hero and about section (threshold: 1650px)
      if (window.scrollY > 1650) {
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

  return (
    <>
      <AnimatePresence>
        {scrolled && (
          <motion.header
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed top-6 left-0 right-0 z-40 w-full px-4 sm:px-6 pointer-events-auto flex justify-center"
          >
            <div className="relative flex w-full max-w-[848px] h-[72px] items-center justify-between rounded-[14px] border border-black/[0.06] bg-white px-6 shadow-[0_4px_25px_rgba(0,0,0,0.06)]">
              {/* Brand Logo */}
              <Link href="/solea" className="flex items-center">
                <Image
                  src="/images/solea/img_0.svg"
                  alt="Solea Logo"
                  width={57}
                  height={25}
                  className="h-[25px] w-auto object-contain"
                  priority
                />
              </Link>

              {/* Desktop Nav Links */}
              <nav className="hidden md:flex items-center gap-8 text-[15px] font-normal text-[#606060]">
                <Link
                  href="#home"
                  className="inline-flex items-center leading-none transition-colors hover:text-[#bb7462]"
                >
                  Home
                </Link>

                <Link
                  href="#projects"
                  className="inline-flex items-center leading-none transition-colors hover:text-[#bb7462]"
                >
                  Project
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
                      pagesDropdownOpen ? 'text-[#bb7462]' : 'text-[#606060] hover:text-[#bb7462]'
                    }`}
                  >
                    <span>Pages</span>
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-200 ${
                        pagesDropdownOpen ? 'rotate-180 text-[#bb7462]' : 'text-[#606060]'
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
                        className="absolute top-[calc(100%+16px)] left-1/2 -translate-x-1/2 z-50 w-[352px] rounded-[10px] bg-[#3f2a24] p-6 text-white shadow-[0_10px_25px_rgba(0,0,0,0.15)]"
                      >
                        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-[14px]">
                          {/* Column 1 */}
                          <div className="flex flex-col gap-2.5">
                            <Link
                              href="/solea"
                              onClick={() => setPagesDropdownOpen(false)}
                              className="text-white/85 transition-colors hover:text-white"
                            >
                              Home
                            </Link>
                            <Link
                              href="#about"
                              onClick={() => setPagesDropdownOpen(false)}
                              className="text-white/85 transition-colors hover:text-white"
                            >
                              About Me
                            </Link>
                            <Link
                              href="#projects"
                              onClick={() => setPagesDropdownOpen(false)}
                              className="text-white/85 transition-colors hover:text-white"
                            >
                              Case Study
                            </Link>
                            <Link
                              href="#projects"
                              onClick={() => setPagesDropdownOpen(false)}
                              className="text-white/85 transition-colors hover:text-white"
                            >
                              Case Study Details
                            </Link>
                            <Link
                              href="#contact"
                              onClick={() => setPagesDropdownOpen(false)}
                              className="text-white/85 transition-colors hover:text-white"
                            >
                              Contact
                            </Link>
                          </div>

                          {/* Column 2 */}
                          <div className="flex flex-col gap-2.5">
                            <Link
                              href="#blog"
                              onClick={() => setPagesDropdownOpen(false)}
                              className="text-white/85 transition-colors hover:text-white"
                            >
                              Blog
                            </Link>
                            <Link
                              href="#blog"
                              onClick={() => setPagesDropdownOpen(false)}
                              className="text-white/85 transition-colors hover:text-white"
                            >
                              Blog Details
                            </Link>
                            <Link
                              href="/privacy-policy"
                              onClick={() => setPagesDropdownOpen(false)}
                              className="text-white/85 transition-colors hover:text-white"
                            >
                              Privacy Policy
                            </Link>
                            <Link
                              href="/terms"
                              onClick={() => setPagesDropdownOpen(false)}
                              className="text-white/85 transition-colors hover:text-white"
                            >
                              Terms & Conditions
                            </Link>
                            <Link
                              href="/404"
                              onClick={() => setPagesDropdownOpen(false)}
                              className="text-white/85 transition-colors hover:text-white"
                            >
                              404
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link
                  href="#contact"
                  className="inline-flex items-center leading-none transition-colors hover:text-[#bb7462]"
                >
                  Contact Us
                </Link>
              </nav>

              {/* Right CTA Button */}
              <div className="hidden md:block">
                <Link
                  href="#about"
                  className="inline-flex items-center justify-center rounded-[12px] bg-[#bb7462] px-6 py-3 text-[14px] font-medium text-white transition-all hover:bg-[#a86453] hover:shadow-sm"
                >
                  About Me
                </Link>
              </div>

              {/* Mobile Hamburger Button */}
              <button
                type="button"
                onClick={handleOpenMobile}
                className="flex h-10 w-10 items-center justify-center rounded-lg text-[#3f2a24] hover:bg-black/5 md:hidden"
                aria-label="Open Menu"
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
