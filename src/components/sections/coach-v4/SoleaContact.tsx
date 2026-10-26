'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Globe, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { getCanonicalSlug, type CoachProfile } from '@/lib/coaches';

const LinkedinIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

interface SoleaContactProps {
  coach?: CoachProfile;
  onOpenBooking?: (offeringTitle?: string) => void;
}

export const SoleaContact: React.FC<SoleaContactProps> = ({ coach, onOpenBooking }) => {
  const canonical = getCanonicalSlug(coach?.slug || '');
  const isAtynoCoach = Boolean(coach?.bookingUrl && coach.bookingUrl.includes('atyno.com'));
  const coachName = coach?.name || 'کوچ بلومیا';
  const bookingLink = coach?.bookingUrl || '#contact';
  const contactAvatar =
    coach?.aboutImage ||
    coach?.imageUrl ||
    coach?.coverImage ||
    (canonical === 'mahya_shakouri' ? '/images/solea/mahya_about.jpg' : '/images/solea/fatemeh_about.jpg');

  // Form states
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [topic, setTopic] = useState('جلسه معارفه رایگان (جلسه صفر ۳۰ دقیقه‌ای)');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');

  // Dynamic topic options based on coach profile
  const topicOptions = [
    'جلسه معارفه رایگان (جلسه صفر ۳۰ دقیقه‌ای)',
    ...(coach?.services?.filter((s) => !s.isFree).map((s) => `${s.title} (${s.duration || '۶۰ دقیقه'})`) || []),
    ...(coach?.packagesData?.map((p) => p.title) || []),
    ...(coach?.specialties?.slice(0, 3) || []),
    'سایر سوالات و درخواست‌ها',
  ].filter((val, idx, self) => self.indexOf(val) === idx);

  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  // Digits normalization
  const normalizeDigits = (val: string) => {
    return val
      .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 1776))
      .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 1632));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const digitsOnly = normalizeDigits(raw).replace(/\D/g, '');

    if (digitsOnly.length <= 11) {
      setPhone(digitsOnly);

      if (digitsOnly.length > 0) {
        if (!digitsOnly.startsWith('09') && digitsOnly.length >= 2) {
          setPhoneError('شماره موبایل باید با ۰۹ شروع شود.');
        } else if (digitsOnly.length === 11 && !/^09\d{9}$/.test(digitsOnly)) {
          setPhoneError('شماره موبایل ۱۱ رقمی معتبر نیست.');
        } else {
          setPhoneError(null);
        }
      } else {
        setPhoneError(null);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Validate name
    const cleanName = fullName.trim();
    if (cleanName.length < 3) {
      setNameError('لطفاً نام و نام خانوادگی خود را کامل وارد کنید.');
      return;
    }
    setNameError(null);

    // Validate phone
    const cleanPhone = normalizeDigits(phone).replace(/\D/g, '');
    if (!/^09\d{9}$/.test(cleanPhone)) {
      setPhoneError('لطفاً شماره موبایل ۱۱ رقمی معتبر با ۰۹ وارد کنید.');
      return;
    }
    setPhoneError(null);

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setStatusMessage('');

    try {
      const response = await fetch('/api/lead/free-intro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: cleanName,
          phone: cleanPhone,
          email: '',
          topic,
          preferredCoach: coachName,
          message: message.trim(),
          subject: honeypot,
        }),
      });

      const result = await response.json();

      if (!response.ok || result.error) {
        throw new Error(result.error || 'خطایی در ثبت درخواست رخ داد.');
      }

      setSubmitStatus('success');
      setStatusMessage(
        result.message ||
          'درخواست شما با موفقیت ثبت شد. ظرف ۲۴ ساعت برای هماهنگی زمان با شما تماس می‌گیریم.'
      );
      setFullName('');
      setPhone('');
      setMessage('');
    } catch (err: any) {
      setSubmitStatus('error');
      setStatusMessage(err.message || 'خطا در ثبت درخواست. لطفاً مجدداً تلاش فرمایید.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="w-full bg-[#0f2220] py-20 lg:py-28 text-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        
        {/* Secondary Floating Nav Pill */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 sm:mb-20 flex justify-center"
        >
          <div className="flex h-16 w-full max-w-3xl items-center justify-between rounded-2xl bg-white px-5 sm:px-7 text-[#1e1e1e] shadow-lg border border-black/[0.04]">
            {/* Coach Name / Brand */}
            <Link
              href="#home"
              className="inline-flex items-center justify-center leading-none text-[#1f3d3a] hover:opacity-90 transition-opacity"
            >
              <span className="font-serif text-base sm:text-[17px] font-bold leading-none">
                {coachName}
              </span>
            </Link>

            {/* Navigation links (perfectly aligned and vertically centered) */}
            <nav className="hidden sm:flex items-center justify-center gap-6 md:gap-7 text-xs sm:text-[13px] font-medium text-[#6b6b6b]">
              <Link
                href="#home"
                className="inline-flex items-center justify-center leading-none transition-colors hover:text-[#1f3d3a]"
              >
                خانه
              </Link>
              <Link
                href="#about"
                className="inline-flex items-center justify-center leading-none transition-colors hover:text-[#1f3d3a]"
              >
                درباره من
              </Link>
              <Link
                href="#services"
                className="inline-flex items-center justify-center leading-none transition-colors hover:text-[#1f3d3a]"
              >
                خدمات
              </Link>
              <Link
                href="#events"
                className="inline-flex items-center justify-center leading-none transition-colors hover:text-[#1f3d3a]"
              >
                رویدادها
              </Link>
              <Link
                href="#pricing"
                className="inline-flex items-center justify-center leading-none transition-colors hover:text-[#1f3d3a]"
              >
                بسته‌ها
              </Link>
            </nav>

            {/* Action CTA Button */}
            <button
              type="button"
              onClick={() => onOpenBooking ? onOpenBooking('جلسه صفر (معارفه رایگان ۳۰ دقیقه‌ای)') : (window.location.href = bookingLink)}
              className="inline-flex items-center justify-center rounded-[12px] bg-[#1f3d3a] px-5 py-2.5 text-xs sm:text-[13px] font-semibold text-white leading-none hover:bg-[#2b544e] transition-colors shadow-sm cursor-pointer"
            >
              رزرو جلسه
            </button>
          </div>
        </motion.div>

        {/* Section Heading with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="pb-12"
        >
          <h2 className="font-serif text-3xl font-normal leading-[1.38] sm:leading-[1.35] lg:leading-[1.32] text-white sm:text-4xl lg:text-5xl">
            ارتباط مستقیم و رزرو گفتگو
          </h2>
        </motion.div>

        {/* Contact Form and Side Card Grid */}
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          
          {/* Start Column: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Honeypot field */}
              <input
                type="text"
                name="subject"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="نام و نام خانوادگی *"
                    className="w-full rounded-2xl border border-white/10 bg-[#162d2b] px-5 py-4 text-sm text-white placeholder-white/40 focus:border-[#dfece9] focus:outline-none transition-colors"
                  />
                  {nameError && (
                    <p className="mt-1 text-xs text-red-300 ps-2">{nameError}</p>
                  )}
                </div>

                <div>
                  <input
                    type="tel"
                    required
                    dir="ltr"
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="09123456789 *"
                    className="w-full rounded-2xl border border-white/10 bg-[#162d2b] px-5 py-4 text-sm text-white placeholder-white/40 focus:border-[#dfece9] focus:outline-none transition-colors text-right"
                  />
                  {phoneError && (
                    <p className="mt-1 text-xs text-red-300 ps-2">{phoneError}</p>
                  )}
                </div>
              </div>

              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-[#162d2b] px-5 py-4 text-sm text-white/80 focus:border-[#dfece9] focus:outline-none transition-colors"
              >
                {topicOptions.map((opt) => (
                  <option key={opt} value={opt} className="bg-[#162d2b] text-white">
                    {opt}
                  </option>
                ))}
              </select>

              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="پیام یا دغدغه شما برای شروع گفتگو (اختیاری)..."
                className="w-full rounded-2xl border border-white/10 bg-[#162d2b] px-5 py-4 text-sm text-white placeholder-white/40 focus:border-[#dfece9] focus:outline-none transition-colors"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-[#dfece9] py-4 text-center text-xs font-semibold tracking-wider text-[#1f3d3a] shadow-lg transition-all hover:bg-white active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>در حال ارسال درخواست...</span>
                  </>
                ) : (
                  <span>ارسال درخواست گفتگو</span>
                )}
              </button>

              <AnimatePresence>
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="rounded-2xl bg-[#dfece9]/20 border border-[#dfece9]/40 p-4 text-sm text-[#dfece9] flex items-center gap-3"
                  >
                    <CheckCircle2 className="h-5 w-5 text-[#dfece9] shrink-0" />
                    <span>{statusMessage}</span>
                  </motion.div>
                )}
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="rounded-2xl bg-red-500/10 border border-red-500/30 p-4 text-sm text-red-200 flex items-center gap-3"
                  >
                    <AlertCircle className="h-5 w-5 text-red-300 shrink-0" />
                    <span>{statusMessage}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          {/* End Column: Schedule a Call Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col rounded-[2.5rem] bg-white p-8 text-[#1e1e1e] shadow-2xl sm:p-10 lg:col-span-5"
          >
            {/* Avatar */}
            <div className="relative mb-6 h-24 w-24 sm:h-28 sm:w-28 overflow-hidden rounded-full ring-4 ring-[#dfece9] shadow-md bg-[#f2f7f6]">
              <Image
                src={contactAvatar}
                alt={coachName}
                fill
                className="object-cover object-[center_20%] transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 640px) 96px, 112px"
              />
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-normal leading-[1.38] sm:leading-[1.35] text-[#1e1e1e]">
              رزرو گفتگوی آنلاین
              <br />
              با {coachName}
            </h3>

            <p className="mt-3.5 text-sm leading-[1.75] text-[#6b6b6b]">
              یک گفتگوی ۳۰ دقیقه‌ای بدون قضاوت و آرامش‌بخش برای شنیدن دغدغه‌های شما و شفاف‌سازی مسیر رشد.
            </p>

            <div className="mt-8 border-t border-black/10 pt-6">
              <button
                type="button"
                onClick={() => onOpenBooking ? onOpenBooking('جلسه صفر (معارفه رایگان ۳۰ دقیقه‌ای)') : (window.location.href = bookingLink)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1f3d3a] py-4 text-xs font-semibold tracking-wider text-white shadow-md transition-all hover:bg-[#2b544e] active:scale-98 cursor-pointer"
              >
                <Phone className="h-4 w-4" />
                <span>رزرو آنلاین جلسه معارفه</span>
              </button>
            </div>
          </motion.div>

        </div>

        {/* Global Footer Elements */}
        <div className="mt-16 sm:mt-20 border-t border-white/10 pt-12 sm:pt-16">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
            
            {/* Column 1: Coach Brand, Credentials & Bio (4 cols) */}
            <div className="space-y-4 lg:col-span-4">
              <div>
                <h3 className="font-serif text-2xl font-bold text-white sm:text-3xl">
                  {coachName}
                </h3>
                <p className="mt-1.5 text-xs font-medium text-[#dfece9] tracking-wide">
                  {coach?.title || 'کوچ بین‌المللی مادران، بانوان و نوجوانان'}
                </p>
              </div>

              <p className="text-sm leading-relaxed text-white/70 max-w-sm">
                {coach?.shortBio || coach?.description || (canonical === 'mahya_shakouri'
                  ? 'همراهی تخصصی در مسیر خودشناسی عمیق، رهایی از قضاوت منتقد درون، مهارت مرزگذاری شفاف و بدون احساس گناه در روابط و ساختن زندگی اصیل و آرام.'
                  : 'همراهی تخصصی و همدلانه برای شنیدن صدای درون، عبور از موانع فکری و احساس گناه، و ساختن تعادل پایدار در زندگی و کار.')
                }
              </p>

              {/* Social Icons Row */}
              <div className="flex items-center gap-2.5 pt-2">
                {coach?.instagramUrl && (
                  <a
                    href={coach.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-all hover:border-white hover:bg-white hover:text-[#0f2220]"
                    aria-label={`صفحه اینستاگرام ${coachName}`}
                  >
                    <InstagramIcon />
                  </a>
                )}
                {coach?.linkedinUrl && (
                  <a
                    href={coach.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-all hover:border-white hover:bg-white hover:text-[#0f2220]"
                    aria-label={`پروفایل لینکدین ${coachName}`}
                  >
                    <LinkedinIcon />
                  </a>
                )}
                <a
                  href="https://bloomiaclub.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-all hover:border-white hover:bg-white hover:text-[#0f2220]"
                  aria-label="وبسایت اصلی بلومیا کلاب"
                >
                  <Globe className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Column 2: Services & Packages (3 cols) */}
            <div className="space-y-4 lg:col-span-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#dfece9]" />
                خدمات و بسته‌های همراهی
              </h4>
              <ul className="space-y-2.5 text-sm text-white/75">
                <li>
                  <Link href="#consultation" className="hover:text-white transition-colors">
                    جلسه معارفه رایگان (جلسه صفر ۳۰ دقیقه‌ای)
                  </Link>
                </li>
                {coach?.packagesData && coach.packagesData.length > 0 ? (
                  coach.packagesData.slice(0, 3).map((pkg) => (
                    <li key={pkg.id}>
                      <Link href="#pricing" className="hover:text-white transition-colors">
                        {pkg.title}
                      </Link>
                    </li>
                  ))
                ) : (
                  <>
                    <li>
                      <Link href="#pricing" className="hover:text-white transition-colors">
                        پکیج «شروع» (۴ جلسه کوچینگ فردی)
                      </Link>
                    </li>
                    <li>
                      <Link href="#pricing" className="hover:text-white transition-colors">
                        پکیج «کشف» (۶ جلسه کوچینگ فردی)
                      </Link>
                    </li>
                    <li>
                      <Link href="#pricing" className="hover:text-white transition-colors">
                        پکیج «تحول» (۸ جلسه کوچینگ فردی)
                      </Link>
                    </li>
                  </>
                )}
                <li>
                  <Link href="#method" className="hover:text-white transition-colors">
                    متد ۴ مرحله‌ای رشد و همراهی
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Quick Navigation (2 cols) */}
            <div className="space-y-4 lg:col-span-2">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#dfece9]" />
                دسترسی سریع
              </h4>
              <ul className="space-y-2.5 text-sm text-white/75">
                <li>
                  <Link href="#home" className="hover:text-white transition-colors">صفحه اصلی</Link>
                </li>
                <li>
                  <Link href="#about" className="hover:text-white transition-colors">درباره من و سوابق</Link>
                </li>
                <li>
                  <Link href="#services" className="hover:text-white transition-colors">حوزه‌های همراهی</Link>
                </li>
                <li>
                  <Link href="#events" className="hover:text-white transition-colors">رویدادها و کارگاه‌ها</Link>
                </li>
                <li>
                  <Link href="#testimonials" className="hover:text-white transition-colors">نظرات مراجعان</Link>
                </li>
                <li>
                  <Link href="#blog" className="hover:text-white transition-colors">مقالات و یادداشت‌ها</Link>
                </li>
                <li>
                  <Link href="/coaches" className="hover:text-white transition-colors">باشگاه کوچ‌های بلومیا</Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Booking & ICF Trust Card (3 cols) */}
            <div className="space-y-4 lg:col-span-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#dfece9]" />
                رزرو وقت و محرمانگی
              </h4>

              <div className="rounded-2xl border border-white/10 bg-[#162d2b] p-4 shadow-sm">
                <span className="block text-xs text-white/65">
                  رزرو گفتگوی آنلاین معارفه
                </span>
                <span className="mt-1 block font-serif text-lg font-bold text-white">
                  ۳۰ دقیقه گفتگوی رایگان
                </span>
                <button
                  type="button"
                  onClick={() => onOpenBooking ? onOpenBooking('جلسه صفر (معارفه رایگان ۳۰ دقیقه‌ای)') : (window.location.href = bookingLink)}
                  className="mt-3 inline-flex w-full items-center justify-center rounded-xl bg-[#dfece9] py-2.5 text-xs font-semibold text-[#1f3d3a] transition-all hover:bg-white active:scale-98 cursor-pointer"
                >
                  ورود به تقویم رزرو آنلاین
                </button>
              </div>

              <p className="text-xs leading-relaxed text-white/50 pt-1">
                تمامی جلسات طبق منشور اخلاقی فدراسیون بین‌المللی کوچینگ (ICF) در فضایی کاملاً امن و محرمانه برگزار می‌شوند.
              </p>
            </div>

          </div>

          {/* Bottom Copyright & Standards Bar */}
          <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row">
            <span>© ۱۴۰۵ تمامی حقوق مادی و معنوی برای بلومیا کلاب و {coachName} محفوظ است.</span>
            <span>طراحی اختصاصی با استانداردهای بین‌المللی بلومیا کلاب</span>
          </div>
        </div>

      </div>
    </section>
  );
};
