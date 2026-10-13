'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Check, Link2, Menu, MessageCircle, Send, Share2 } from 'lucide-react';

import type { CoachProfile } from '@/lib/coaches';
import { cn } from '@/lib/utils';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { BookButton, useBooking } from './CoachBooking';
import { getCoachNav } from './coach-sections';
import { InstagramIcon, LinkedinIcon } from './icons';

const iconLinkClass =
  'flex size-11 items-center justify-center rounded-full border border-brand-surface-border bg-white/80 text-brand-neutral-700 transition-colors hover:border-brand-teal-900/40 hover:bg-brand-teal-50 hover:text-brand-teal-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal-900 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-surface';

export function CoachHeader({ coach }: { coach: CoachProfile }) {
  const nav = React.useMemo(() => getCoachNav(coach), [coach]);
  const { open: openBooking, externalUrl, hasFreeSession } = useBooking();

  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => setScrolled(latest > 24));

  /* Highlight the nav link of the section currently in view. */
  React.useEffect(() => {
    const targets = nav
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] }
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [nav]);

  const ctaLabel = hasFreeSession ? 'رزرو جلسه صفر رایگان' : 'رزرو جلسه';

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      initial={false}
      animate={{
        backgroundColor: scrolled ? 'rgba(250, 250, 248, 0.94)' : 'rgba(250, 250, 248, 0)',
        borderBottomColor: scrolled ? 'rgba(229, 229, 226, 1)' : 'rgba(229, 229, 226, 0)',
        backdropFilter: scrolled ? 'blur(14px)' : 'blur(0px)',
      }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      style={{ borderBottomWidth: 1, borderBottomStyle: 'solid' }}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1280px] items-center justify-between gap-4 px-5 md:h-20 md:px-8">
        {/* Logo */}
        <Link
          href="/"
          aria-label="بلومیا کلاب؛ صفحه اصلی"
          className="flex min-h-11 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal-900 focus-visible:ring-offset-4 focus-visible:ring-offset-brand-surface"
        >
          <Image
            src="/images/bloomia-club-logo.webp"
            alt="بلومیا کلاب"
            width={140}
            height={44}
            priority
            className="h-8 w-auto object-contain md:h-9"
          />
        </Link>

        {/* Desktop navigation */}
        {nav.length > 0 && (
          <nav aria-label="بخش‌های صفحه" className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={activeId === item.id ? 'true' : undefined}
                className={cn(
                  'relative rounded-full px-4 py-2.5 text-sm font-medium transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal-900',
                  activeId === item.id
                    ? 'bg-brand-teal-100 text-brand-teal-900'
                    : 'text-brand-neutral-600 hover:bg-brand-teal-50 hover:text-brand-teal-900'
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          <ShareMenu coach={coach} />

          <BookButton size="sm" className="hidden md:inline-flex">
            {ctaLabel}
          </BookButton>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className={cn(iconLinkClass, 'lg:hidden')}
            aria-label="باز کردن منو"
          >
            <Menu className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Mobile / tablet menu */}
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="right" aria-describedby="coach-menu-description">
          <SheetHeader className="px-6 pb-4 pt-8">
            <SheetTitle>{coach.name}</SheetTitle>
            <SheetDescription id="coach-menu-description">{coach.title}</SheetDescription>
          </SheetHeader>

          <nav aria-label="بخش‌های صفحه" className="flex flex-1 flex-col overflow-y-auto px-6">
            <ul className="flex flex-col">
              {nav.map((item) => (
                <li key={item.id} className="border-b border-brand-surface-border first:border-t">
                  <SheetClose asChild>
                    <a
                      href={`#${item.id}`}
                      className="flex min-h-[60px] items-center justify-between text-lg font-semibold text-brand-neutral-900 transition-colors hover:text-brand-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal-900"
                    >
                      {item.label}
                    </a>
                  </SheetClose>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-5 px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-6">
            <SheetClose asChild>
              <BookButton size="lg" className="w-full">
                {ctaLabel}
              </BookButton>
            </SheetClose>
            {(coach.instagramUrl || coach.linkedinUrl) && (
              <div className="flex items-center gap-2.5">
                {coach.instagramUrl && (
                  <a href={coach.instagramUrl} target="_blank" rel="noopener noreferrer" className={iconLinkClass} aria-label="اینستاگرام">
                    <InstagramIcon className="size-5" />
                  </a>
                )}
                {coach.linkedinUrl && (
                  <a href={coach.linkedinUrl} target="_blank" rel="noopener noreferrer" className={iconLinkClass} aria-label="لینکدین">
                    <LinkedinIcon className="size-5" />
                  </a>
                )}
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </motion.header>
  );
}

/* -------------------------------------------------------------------------- */
/*  Share                                                                     */
/* -------------------------------------------------------------------------- */

function ShareMenu({ coach }: { coach: CoachProfile }) {
  const [open, setOpen] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [nativeShare, setNativeShare] = React.useState(false);

  React.useEffect(() => {
    setNativeShare(
      typeof navigator !== 'undefined' &&
        typeof navigator.share === 'function' &&
        window.matchMedia('(pointer: coarse)').matches
    );
  }, []);

  const shareTitle = `${coach.name} | ${coach.title}`;
  const getUrl = () => window.location.href;

  const onOpenChange = (next: boolean) => {
    if (next && nativeShare) {
      navigator.share({ title: shareTitle, url: getUrl() }).catch(() => undefined);
      return;
    }
    setOpen(next);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(getUrl());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard unavailable: the share targets above still work */
    }
  };

  const itemClass =
    'flex min-h-11 cursor-pointer select-none items-center gap-3 rounded-xl px-3 text-sm font-medium text-brand-neutral-900 outline-none transition-colors data-[highlighted]:bg-brand-teal-50 data-[highlighted]:text-brand-teal-900';

  const openShare = (builder: (url: string, text: string) => string) => () => {
    window.open(builder(encodeURIComponent(getUrl()), encodeURIComponent(shareTitle)), '_blank', 'noopener,noreferrer');
  };

  return (
    <DropdownMenu.Root open={open} onOpenChange={onOpenChange}>
      <DropdownMenu.Trigger asChild>
        <button type="button" className={iconLinkClass} aria-label="اشتراک‌گذاری صفحه">
          <Share2 className="size-[18px]" aria-hidden="true" />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="start"
          sideOffset={10}
          className="z-[80] min-w-[220px] rounded-2xl border border-brand-surface-border bg-white p-1.5 shadow-[0_24px_48px_-16px_rgba(15,34,32,0.22),0_4px_12px_-4px_rgba(15,34,32,0.08)]"
        >
          <DropdownMenu.Item className={itemClass} onSelect={openShare((u, t) => `https://wa.me/?text=${t}%20${u}`)}>
            <MessageCircle className="size-[18px]" aria-hidden="true" />
            واتس‌اپ
          </DropdownMenu.Item>
          <DropdownMenu.Item className={itemClass} onSelect={openShare((u, t) => `https://t.me/share/url?url=${u}&text=${t}`)}>
            <Send className="size-[18px]" aria-hidden="true" />
            تلگرام
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className={itemClass}
            onSelect={openShare((u) => `https://www.linkedin.com/sharing/share-offsite/?url=${u}`)}
          >
            <LinkedinIcon className="size-[18px]" />
            لینکدین
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="my-1.5 h-px bg-brand-surface-border" />
          <DropdownMenu.Item
            className={itemClass}
            onSelect={(event) => {
              event.preventDefault();
              void copy();
            }}
          >
            {copied ? (
              <Check className="size-[18px] text-brand-teal-700" aria-hidden="true" />
            ) : (
              <Link2 className="size-[18px]" aria-hidden="true" />
            )}
            <span aria-live="polite">{copied ? 'لینک کپی شد' : 'کپی لینک'}</span>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
