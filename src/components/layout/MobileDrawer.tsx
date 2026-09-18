'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { X, Phone, Calendar, BookOpen, Users, Compass, HelpCircle, ArrowLeft } from 'lucide-react';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { href: '/', label: 'صفحه اصلی', icon: Compass },
  { href: '/coaches', label: 'مربیان و کوچ‌ها', icon: Users },
  { href: '/coaching/what-is-coaching', label: 'کوچینگ چیست؟', icon: HelpCircle },
  { href: '/coaching/free-intro-session', label: 'جلسه معارفه رایگان', icon: Calendar, highlight: true },
  { href: '/blog', label: 'وبلاگ و مقالات', icon: BookOpen },
  { href: '/about', label: 'درباره بلومیا', icon: Users },
  { href: '/contact', label: 'تماس با ما', icon: Phone },
];

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer surface - Slides from right (RTL standard) */}
      <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-brand-surface-paper shadow-2xl flex flex-col p-6 z-50 overflow-y-auto">
        {/* Header inside drawer */}
        <div className="flex items-center justify-between pb-5 border-b border-brand-neutral-200">
          <Link href="/" onClick={onClose} className="flex items-center gap-2">
            <Image
              src="/images/bloomia-club-logo.webp"
              alt="لوگوی بلومیا کلاب"
              width={120}
              height={40}
              className="h-9 w-auto object-contain"
            />
          </Link>
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-brand-neutral-600 hover:text-brand-teal-900 rounded-full hover:bg-brand-neutral-100 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="بستن منو"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 py-6 space-y-1">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-medium transition-colors ${
                  item.highlight
                    ? 'bg-brand-teal-50 text-brand-teal-900 border border-brand-teal-200 font-semibold'
                    : isActive
                    ? 'bg-brand-teal-50 text-brand-teal-900 font-bold'
                    : 'text-brand-neutral-700 hover:bg-brand-neutral-100 hover:text-brand-teal-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${item.highlight ? 'text-brand-teal-700' : 'text-brand-neutral-500'}`} />
                  <span>{item.label}</span>
                </div>
                <ArrowLeft className="w-4 h-4 opacity-40" />
              </Link>
            );
          })}
        </nav>

        {/* Bottom CTA in Drawer */}
        <div className="pt-4 border-t border-brand-neutral-200 space-y-3">
          <Link
            href="/coaching/free-intro-session"
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-brand-teal-900 text-white font-medium hover:bg-brand-teal-800 transition-colors shadow-soft text-center"
          >
            <Calendar className="w-4 h-4" />
            <span>رزرو جلسه معارفه رایگان</span>
          </Link>
          <a
            href="tel:02191000000"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-brand-surface-muted text-brand-neutral-700 font-medium hover:bg-brand-neutral-200 transition-colors text-center text-sm"
          >
            <Phone className="w-4 h-4 text-brand-teal-700" />
            <span>تماس با پشتیبانی</span>
          </a>
        </div>
      </div>
    </div>
  );
};
