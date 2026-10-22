'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, ChevronUp } from 'lucide-react';

const TwitterIcon = () => (
  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

interface SoleaMenuCardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SoleaMenuCard: React.FC<SoleaMenuCardProps> = ({ isOpen, onClose }) => {
  const [pagesExpanded, setPagesExpanded] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px]"
          />

          {/* Menu Card positioned at top right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20, x: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20, x: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-4 top-4 z-50 w-[calc(100vw-32px)] max-w-[400px] overflow-hidden rounded-[16px] bg-[#3f2a24] p-7 text-white shadow-2xl sm:right-8 sm:top-8 sm:p-9"
          >
            {/* Header: Close Button */}
            <div className="flex items-center justify-end">
              <button
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Close menu"
              >
                <X className="h-5 w-5 stroke-[2]" />
              </button>
            </div>

            {/* Navigation links */}
            <nav className="mt-2 flex flex-col gap-4 font-serif">
              <Link
                href="#about"
                onClick={onClose}
                className="text-3xl font-normal text-white transition-colors hover:text-[#fff7a2] sm:text-[34px]"
              >
                About
              </Link>
              <Link
                href="#projects"
                onClick={onClose}
                className="text-3xl font-normal text-white transition-colors hover:text-[#fff7a2] sm:text-[34px]"
              >
                Project
              </Link>

              {/* Pages Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setPagesExpanded(!pagesExpanded)}
                  className={`flex w-full items-center justify-between text-left text-3xl font-normal transition-colors sm:text-[34px] ${
                    pagesExpanded ? 'text-[#fff7a2]' : 'text-white hover:text-[#fff7a2]'
                  }`}
                >
                  <span>Pages</span>
                  {pagesExpanded ? (
                    <ChevronUp className="h-6 w-6 stroke-[2]" />
                  ) : (
                    <ChevronDown className="h-6 w-6 stroke-[2]" />
                  )}
                </button>

                <AnimatePresence>
                  {pagesExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-2.5 pt-3 font-sans text-sm text-white/80">
                        <Link
                          href="#blog"
                          onClick={onClose}
                          className="transition-colors hover:text-[#fff7a2]"
                        >
                          Blog
                        </Link>
                        <Link
                          href="#blog"
                          onClick={onClose}
                          className="transition-colors hover:text-[#fff7a2]"
                        >
                          Blog Details
                        </Link>
                        <Link
                          href="#contact"
                          onClick={onClose}
                          className="transition-colors hover:text-[#fff7a2]"
                        >
                          Contact Us
                        </Link>
                        <Link
                          href="#privacy"
                          onClick={onClose}
                          className="transition-colors hover:text-[#fff7a2]"
                        >
                          Privacy Policy
                        </Link>
                        <Link
                          href="#404"
                          onClick={onClose}
                          className="transition-colors hover:text-[#fff7a2]"
                        >
                          404 Error
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="#blog"
                onClick={onClose}
                className="text-3xl font-normal text-white transition-colors hover:text-[#fff7a2] sm:text-[34px]"
              >
                Blog
              </Link>
              <Link
                href="#contact"
                onClick={onClose}
                className="text-3xl font-normal text-white transition-colors hover:text-[#fff7a2] sm:text-[34px]"
              >
                Contact Us
              </Link>
            </nav>

            {/* Divider */}
            <div className="my-6 border-t border-white/15" />

            {/* Email Contact */}
            <div>
              <a
                href="mailto:hello@solea.com"
                className="font-sans text-base text-white/90 transition-colors hover:text-[#fff7a2]"
              >
                hello@solea.com
              </a>
            </div>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/90 transition-all hover:border-white hover:bg-white hover:text-[#3f2a24]"
                aria-label="Twitter"
              >
                <TwitterIcon />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/90 transition-all hover:border-white hover:bg-white hover:text-[#3f2a24]"
                aria-label="LinkedIn"
              >
                <LinkedinIcon />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/90 transition-all hover:border-white hover:bg-white hover:text-[#3f2a24]"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/90 transition-all hover:border-white hover:bg-white hover:text-[#3f2a24]"
                aria-label="YouTube"
              >
                <YoutubeIcon />
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
