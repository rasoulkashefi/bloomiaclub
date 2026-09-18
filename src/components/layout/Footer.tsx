import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Send, Heart } from 'lucide-react';

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-teal-950 text-white pt-14 pb-8 border-t border-brand-teal-900" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid: 1 col on mobile, 4 cols on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-brand-teal-900/60">
          {/* Column 1: Brand & Bio */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/images/bloomia-club-logo.webp"
                alt="بلومیا کلاب"
                width={150}
                height={48}
                className="h-10 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-brand-teal-100/80 text-sm leading-relaxed">
              بلومیا کلاب، پلتفرم تخصصی کوچینگ حرفه‌ای و رشد فردی. ما شما را با برترین کوچ‌های تأییدشده ICF برای دستیابی به شکوفایی شغلی، فردی و تحصیلی همراهی می‌کنیم.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com/bloomiaclub"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="اینستاگرام بلومیا کلاب"
                className="w-10 h-10 rounded-full bg-brand-teal-900/80 hover:bg-brand-coral-600 flex items-center justify-center text-white transition-colors"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/company/bloomiaclub"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="لینکدین بلومیا کلاب"
                className="w-10 h-10 rounded-full bg-brand-teal-900/80 hover:bg-brand-coral-600 flex items-center justify-center text-white transition-colors"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
              <a
                href="https://t.me/bloomiaclub"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="کانال تلگرام بلومیا کلاب"
                className="w-10 h-10 rounded-full bg-brand-teal-900/80 hover:bg-brand-coral-600 flex items-center justify-center text-white transition-colors"
              >
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: خدمات کوچینگ */}
          <div>
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-coral-500"></span>
              خدمات کوچینگ
            </h3>
            <ul className="space-y-2.5 text-sm text-brand-teal-100/75">
              <li>
                <Link href="/coaching/free-intro-session" className="hover:text-brand-coral-300 transition-colors">
                  جلسه معارفه رایگان ۳۰ دقیقه‌ای
                </Link>
              </li>
              <li>
                <Link href="/coaching/what-is-coaching" className="hover:text-brand-coral-300 transition-colors">
                  کوچینگ چیست و چگونه کمک می‌کند؟
                </Link>
              </li>
              <li>
                <Link href="/coaches" className="hover:text-brand-coral-300 transition-colors">
                  جستجو و انتخاب مربیان
                </Link>
              </li>
              <li>
                <Link href="/coaches?specialty=career" className="hover:text-brand-coral-300 transition-colors">
                  کوچینگ مسیر شغلی و حرفه‌ای
                </Link>
              </li>
              <li>
                <Link href="/coaches?specialty=personal" className="hover:text-brand-coral-300 transition-colors">
                  کوچینگ توسعه و رشد فردی
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: دسترسی سریع */}
          <div>
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-coral-500"></span>
              دسترسی سریع
            </h3>
            <ul className="space-y-2.5 text-sm text-brand-teal-100/75">
              <li>
                <Link href="/blog" className="hover:text-brand-coral-300 transition-colors">
                  وبلاگ و مقالات آموزشی
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-brand-coral-300 transition-colors">
                  رویدادها و کارگاه‌های آنلاین
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-coral-300 transition-colors">
                  درباره بلومیا کلاب
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-brand-coral-300 transition-colors">
                  پرسش‌های متداول (FAQ)
                </Link>
              </li>
              <li>
                <Link href="/legal" className="hover:text-brand-coral-300 transition-colors">
                  قوانین و حریم خصوصی
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: ارتباط با ما */}
          <div>
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-coral-500"></span>
              ارتباط با ما
            </h3>
            <ul className="space-y-3 text-sm text-brand-teal-100/75">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-coral-400 shrink-0" />
                <a href="tel:02191000000" className="hover:text-white transition-colors dir-ltr">
                  ۰۲۱ - ۹۱۰۰ ۰۰۰۰
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-coral-400 shrink-0" />
                <a href="mailto:info@bloomiaclub.com" className="hover:text-white transition-colors">
                  info@bloomiaclub.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-coral-400 shrink-0 mt-1" />
                <span>تهران، خیابان ولیعصر، مرکز نوآوری و توسعه کسب‌وکار</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Credit */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-teal-300/70">
          <p>© {new Date().getFullYear()} بلومیا کلاب (Bloomia Club). تمامی حقوق محفوظ است.</p>
          <p className="flex items-center gap-1.5">
            طراحی شده با <Heart className="w-3.5 h-3.5 text-brand-coral-500 fill-brand-coral-500 inline" /> برای رشد و شکوفایی شما
          </p>
        </div>
      </div>
    </footer>
  );
};
