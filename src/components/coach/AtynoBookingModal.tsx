'use client';

import React, { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, ExternalLink, Loader2, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackBookingModalOpen } from '@/lib/analytics';

interface AtynoBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  bookingUrl: string;
  coachName?: string;
  coachSlug?: string;
  mode?: string;
}

export const AtynoBookingModal: React.FC<AtynoBookingModalProps> = ({
  isOpen,
  onClose,
  title,
  bookingUrl,
  coachName = 'کوچ',
  coachSlug,
  mode,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  // Normalize meeting mode for unambiguous display in Persian
  const modeLabel = React.useMemo(() => {
    if (!mode) return 'آنلاین';
    const lower = mode.toLowerCase();
    if (lower.includes('phone') || lower.includes('تلفن')) return 'تلفنی';
    if (lower.includes('person') || lower.includes('حضوری')) return 'حضوری';
    return 'آنلاین';
  }, [mode]);

  // Reset loading spinner whenever bookingUrl or isOpen changes
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      trackBookingModalOpen(coachName, 'atyno', coachSlug);
    }
  }, [isOpen, bookingUrl, coachName, coachSlug]);

  // Convert embed URL to a clean public URL for the fallback "open in new tab"
  const publicFallbackUrl = React.useMemo(() => {
    try {
      const url = new URL(bookingUrl);
      if (url.pathname.includes('/fa/embed/')) {
        const meeting = url.searchParams.get('meeting');
        const pkg = url.searchParams.get('package');
        const parts = url.pathname.split('/').filter(Boolean);
        const uuid = parts[parts.length - 1];

        const UUID_MAP: Record<string, string> = {
          '62eb65e6-f7bc-4b8c-8ea0-e3a7c974a9bd': 'parmiss',
          '934b33a2-9888-4209-9901-b9632e812e6c': 'fatemeh',
        };

        const username =
          UUID_MAP[uuid] ||
          (coachSlug ? coachSlug.replace(/-.*/, '').toLowerCase() : 'parmiss');

        if (meeting) return `https://atyno.com/${username}/${meeting}`;
        if (pkg) return `https://atyno.com/${username}/packages/${pkg}`;
        return `https://atyno.com/${username}`;
      }
      return bookingUrl;
    } catch {
      return bookingUrl;
    }
  }, [bookingUrl, coachSlug]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            {/* Backdrop */}
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.24, ease: 'easeOut' }}
                className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md"
              />
            </Dialog.Overlay>

            {/* Modal Dialog Shell */}
            <div className="fixed inset-0 z-[101] flex items-end sm:items-center justify-center p-0 sm:p-4 sm:p-6 pointer-events-none">
              <Dialog.Content asChild aria-describedby={undefined}>
                <motion.div
                  initial={{ opacity: 0, y: 32, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 24, scale: 0.98 }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  className="pointer-events-auto relative flex flex-col w-full sm:max-w-2xl h-[92vh] sm:h-[88vh] sm:max-h-[820px] rounded-t-[2.25rem] sm:rounded-[2.5rem] bg-white text-[#1e1e1e] shadow-2xl border border-[#e5e5e2] overflow-hidden"
                >
                  {/* Top Bar Header */}
                  <div className="flex items-center justify-between px-6 py-4 sm:px-8 sm:py-5 border-b border-[#e5e5e2] bg-[#fafaf8]">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#dfece9] text-[#1f3d3a]">
                        <Calendar className="h-5 w-5 stroke-[2.2]" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <Dialog.Title className="text-base sm:text-lg font-bold text-[#1f3d3a] truncate">
                            {title}
                          </Dialog.Title>
                          <span className="shrink-0 inline-flex items-center rounded-full bg-[#dfece9] px-2.5 py-0.5 text-[11px] font-semibold text-[#1f3d3a] border border-[#1f3d3a]/15">
                            جلسه {modeLabel}
                          </span>
                        </div>
                        <p className="text-xs text-[#6b6b6b] truncate mt-0.5">
                          انتخاب تاریخ و ساعت جلسه {modeLabel} · {coachName}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 mr-2">
                      {/* Open in new tab link */}
                      <a
                        href={publicFallbackUrl}
                        target="_blank"
                        rel="noreferrer"
                        title="باز کردن در پنجره جدید"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#6b6b6b] transition-colors hover:bg-black/5 hover:text-[#1f3d3a]"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>

                      {/* Close button */}
                      <Dialog.Close asChild>
                        <button
                          type="button"
                          onClick={onClose}
                          aria-label="بستن پنجره"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/5 text-[#1e1e1e] transition-colors hover:bg-black/10 active:scale-95"
                        >
                          <X className="h-4 w-4 stroke-[2.5]" />
                        </button>
                      </Dialog.Close>
                    </div>
                  </div>

                  {/* Body with iFrame and Loading State */}
                  <div className="relative flex-1 w-full bg-white overflow-hidden">
                    {isLoading && (
                      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-white/95">
                        <Loader2 className="h-8 w-8 animate-spin text-[#1f3d3a]" />
                        <p className="text-xs sm:text-sm text-[#6b6b6b] font-medium">
                          در حال بارگذاری تقویم کاری...
                        </p>
                      </div>
                    )}

                    <iframe
                      src={bookingUrl}
                      onLoad={() => setIsLoading(false)}
                      className="w-full h-full border-0"
                      loading="eager"
                      allow="clipboard-write"
                      title={title}
                    />
                  </div>
                </motion.div>
              </Dialog.Content>
            </div>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};
