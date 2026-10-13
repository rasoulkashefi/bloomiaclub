'use client';

import React, { useState } from 'react';
import { Share2, Check, Copy, Send } from 'lucide-react';

interface BlogPostShareSectionProps {
  title: string;
  url: string;
}

export const BlogPostShareSection: React.FC<BlogPostShareSectionProps> = ({ title, url }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (typeof window !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // fallback
    }
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 my-10">
      <div className="p-5 sm:p-6 rounded-2xl bg-brand-surface-paper border border-brand-neutral-200/80 shadow-soft-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-brand-neutral-800">
          <Share2 className="w-4 h-4 text-brand-teal-800" />
          <span>اشتراک‌گذاری این مقاله با دیگران:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Telegram */}
          <a
            href={`https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-brand-surface-muted hover:bg-sky-50 text-brand-neutral-700 hover:text-sky-700 text-xs font-semibold border border-brand-neutral-200 transition-colors min-h-[40px] flex items-center gap-1.5"
            aria-label="اشتراک در تلگرام"
          >
            <Send className="w-3.5 h-3.5" />
            <span>تلگرام</span>
          </a>

          {/* WhatsApp */}
          <a
            href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-brand-surface-muted hover:bg-emerald-50 text-brand-neutral-700 hover:text-emerald-700 text-xs font-semibold border border-brand-neutral-200 transition-colors min-h-[40px] flex items-center gap-1.5"
            aria-label="اشتراک در واتساپ"
          >
            <span>واتساپ</span>
          </a>

          {/* Twitter / X */}
          <a
            href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-brand-surface-muted hover:bg-brand-neutral-200 text-brand-neutral-700 text-xs font-semibold border border-brand-neutral-200 transition-colors min-h-[40px] flex items-center gap-1.5"
            aria-label="اشتراک در توییتر / X"
          >
            <span>X / توییتر</span>
          </a>

          {/* Copy link */}
          <button
            type="button"
            onClick={handleCopy}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all min-h-[40px] flex items-center gap-1.5 ${
              copied
                ? 'bg-brand-teal-900 text-white border-brand-teal-900'
                : 'bg-brand-surface-paper text-brand-neutral-800 hover:bg-brand-surface-muted border-brand-neutral-300'
            }`}
            aria-label="کپی لینک مقاله"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>لینک کپی شد</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-brand-neutral-500" />
                <span>کپی لینک</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
