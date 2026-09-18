'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, Calendar, Phone } from 'lucide-react';
import { MobileDrawer } from './MobileDrawer';

const mainNav = [
  { href: '/', label: 'صفحه اصلی' },
  { href: '/coaches', label: 'مربیان' },
  { href: '/coaching/what-is-coaching', label: 'کوچینگ چیست؟' },
  { href: '/blog', label: 'وبلاگ' },
  { href: '/about', label: 'درباره ما' },
  { href: '/contact', label: 'تماس' },
];

export const Navbar: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-brand-surface-paper/90 backdrop-blur-md shadow-soft-sm py-2'
          : 'bg-brand-surface-paper py-3 border-b border-brand-surface-border'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Right side: Mobile Hamburger + Logo */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className="lg:hidden p-2.5 -mr-2 text-brand-neutral-700 hover:text-brand-teal-900 rounded-xl hover:bg-brand-surface-muted min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors"
            aria-label="باز کردن منوی ناوبری"
          >
            <Menu className="w-6 h-6" />
          </button>

          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/images/bloomia-club-logo.webp"
              alt="بلومیا کلاب"
              width={140}
              height={44}
              priority
              className="h-9 md:h-11 w-auto object-contain transition-transform duration-200 group-hover:scale-102"
            />
          </Link>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {mainNav.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'text-brand-teal-900 font-bold bg-brand-teal-50'
                    : 'text-brand-neutral-700 hover:text-brand-teal-900 hover:bg-brand-surface-muted'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Left side: Action CTAs */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/coaching/free-intro-session"
            className="inline-flex items-center justify-center gap-2 px-3.5 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-brand-teal-900 hover:bg-brand-teal-800 active:scale-98 transition-all shadow-soft min-h-[44px]"
          >
            <Calendar className="w-4 h-4 text-brand-teal-200" />
            <span className="hidden sm:inline">جلسه معارفه رایگان</span>
            <span className="sm:hidden">معارفه رایگان</span>
          </Link>
        </div>
      </div>

      {/* Mobile Drawer */}
      <MobileDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </header>
  );
};
