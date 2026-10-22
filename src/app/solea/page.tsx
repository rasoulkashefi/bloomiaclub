import React from 'react';
import type { Metadata } from 'next';
import { Lora, Plus_Jakarta_Sans } from 'next/font/google';
import { SoleaPageClient } from './SoleaPageClient';

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-lora',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Solea - Feminine Influencer & Coach Website (Replicated)',
  description: 'Growth That feels Like Peace. Create progress that supports your life not overwhelms it.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function SoleaPage() {
  return (
    <div
      dir="ltr"
      className={`${lora.variable} ${plusJakarta.variable} font-sans min-h-screen w-full bg-[#f5f5f5] text-[#3f2a24] antialiased selection:bg-[#bb7462] selection:text-white`}
      style={{
        fontFamily: 'var(--font-plus-jakarta), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <style>{`
        .font-serif {
          font-family: var(--font-lora), Georgia, Cambria, "Times New Roman", Times, serif !important;
        }
      `}</style>

      <SoleaPageClient />
    </div>
  );
}
