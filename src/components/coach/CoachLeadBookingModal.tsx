'use client';

import React, { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Calendar, User, Phone, Mail, MessageSquare, CheckCircle2, AlertCircle, Loader2, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { trackBookingModalOpen, trackBookingCompleted } from '@/lib/analytics';

export interface BookingOfferingItem {
  id: string;
  title: string;
  priceLabel?: string;
}

interface CoachLeadBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  coachName?: string;
  coachTitle?: string;
  coachAvatar?: string;
  initialOfferingTitle?: string;
  offerings?: BookingOfferingItem[];
}

export const CoachLeadBookingModal: React.FC<CoachLeadBookingModalProps> = ({
  isOpen,
  onClose,
  coachName = 'کوچ بلومیا',
  coachTitle = 'کوچ رشد فردی و خودآگاهی',
  coachAvatar = '/images/solea/mahya_about.jpg',
  initialOfferingTitle = 'جلسه صفر (معارفه رایگان)',
  offerings = [],
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedOffering, setSelectedOffering] = useState(initialOfferingTitle);
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  // Synchronize initial offering title when modal opens
  useEffect(() => {
    if (isOpen) {
      trackBookingModalOpen(coachName, 'lead');
      if (initialOfferingTitle) {
        setSelectedOffering(initialOfferingTitle);
      }
      setSubmitStatus('idle');
      setStatusMessage('');
      setPhoneError(null);
      setNameError(null);
    }
  }, [isOpen, initialOfferingTitle]);

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
      setNameError('لطفاً نام و نام خانوادگی خود را کامل وارد کنید (حداقل ۳ حرف).');
      return;
    }
    setNameError(null);

    // Validate phone
    const cleanPhone = normalizeDigits(phone).replace(/\D/g, '');
    if (!/^09\d{9}$/.test(cleanPhone)) {
      setPhoneError('لطفاً شماره موبایل ۱۱ رقمی معتبر با ۰۹ وارد کنید (مثال: 09123456789)');
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
          email: email.trim(),
          topic: selectedOffering,
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
      trackBookingCompleted(
        coachName,
        selectedOffering.includes('معارفه') || selectedOffering.includes('صفر') ? 'free_intro' : 'paid_session'
      );
      setStatusMessage(
        result.message ||
          'درخواست جلسه شما با موفقیت ثبت شد. جهت هماهنگی نهایی ساعت جلسه به زودی با شما تماس گرفته خواهد شد.'
      );
    } catch (err: any) {
      setSubmitStatus('error');
      setStatusMessage(err.message || 'خطا در ثبت درخواست. لطفاً مجدداً تلاش فرمایید.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const defaultOfferings: BookingOfferingItem[] = [
    { id: 'zero', title: 'جلسه صفر (معارفه رایگان)', priceLabel: 'رایگان' },
    { id: 'coaching', title: 'تک‌جلسه کوچینگ رشد فردی و خودآگاهی (۶۰ دقیقه)', priceLabel: '۸۵۰٬۰۰۰ تومان' },
    { id: 'growth', title: 'پکیج ۴ جلسه‌ای «شروع»', priceLabel: '۲٬۵۰۰٬۰۰۰ تومان' },
    { id: 'self-discovery', title: 'پکیج ۶ جلسه‌ای «کشف»', priceLabel: '۳٬۶۰۰٬۰۰۰ تومان' },
    { id: 'transformation', title: 'پکیج ۸ جلسه‌ای «تحول»', priceLabel: '۴٬۷۰۰٬۰۰۰ تومان' },
    { id: 'excellence', title: 'پکیج ۱۲ جلسه‌ای «تعالی»', priceLabel: '۶٬۰۰۰٬۰۰۰ تومان' },
  ];

  const offeringList = offerings.length > 0 ? offerings : defaultOfferings;

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
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
              />
            </Dialog.Overlay>

            {/* Modal Dialog Shell */}
            <div className="fixed inset-0 z-[101] flex items-end sm:items-center justify-center p-0 sm:p-4 pointer-events-none">
              <Dialog.Content asChild aria-describedby="lead-modal-description">
                <motion.div
                  initial={{ opacity: 0, y: 36, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 24, scale: 0.98 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="pointer-events-auto relative flex flex-col w-full sm:max-w-xl max-h-[92vh] sm:max-h-[85vh] rounded-t-[2rem] sm:rounded-[2rem] bg-white text-[#1e1e1e] shadow-2xl border border-[#e5e5e2] overflow-hidden"
                >
                  {/* Top Bar Header */}
                  <div className="flex items-center justify-between px-6 py-4 sm:px-7 sm:py-5 border-b border-[#e5e5e2] bg-[#fafaf8]">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-[#dfece9] shadow-sm bg-[#f2f7f6]">
                        <Image
                          src={coachAvatar}
                          alt={coachName}
                          fill
                          className="object-cover object-[center_20%]"
                          sizes="44px"
                        />
                      </div>
                      <div className="min-w-0">
                        <Dialog.Title className="text-base sm:text-lg font-bold text-[#1f3d3a] truncate">
                          درخواست جلسه · {coachName}
                        </Dialog.Title>
                        <p id="lead-modal-description" className="text-xs text-[#6b6b6b] truncate mt-0.5">
                          {coachTitle}
                        </p>
                      </div>
                    </div>

                    <Dialog.Close asChild>
                      <button
                        type="button"
                        onClick={onClose}
                        aria-label="بستن پنجره"
                        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black/5 text-[#1e1e1e] transition-colors hover:bg-black/10 active:scale-95"
                      >
                        <X className="h-4 w-4 stroke-[2.5]" />
                      </button>
                    </Dialog.Close>
                  </div>

                  {/* Body Container */}
                  <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8 sm:py-7">
                    {submitStatus === 'success' ? (
                      /* Success View */
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center text-center py-8 sm:py-10"
                      >
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#dfece9] text-[#1f3d3a] mb-5 shadow-sm">
                          <CheckCircle2 className="h-9 w-9 stroke-[2.2]" />
                        </div>
                        <h3 className="font-serif text-2xl font-bold text-[#1f3d3a] mb-2.5">
                          درخواست شما ثبت شد
                        </h3>
                        <p className="text-sm leading-relaxed text-[#4a4a4a] max-w-md mb-8">
                          {statusMessage}
                        </p>

                        <div className="w-full max-w-xs">
                          <button
                            type="button"
                            onClick={onClose}
                            className="w-full rounded-xl bg-[#1f3d3a] py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#2b544e] active:scale-98"
                          >
                            متوجه شدم، بستن پنجره
                          </button>
                        </div>
                      </motion.div>
                    ) : (
                      /* Form View */
                      <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Honeypot field (hidden from real users) */}
                        <div className="hidden" aria-hidden="true">
                          <input
                            type="text"
                            name="subject"
                            tabIndex={-1}
                            autoComplete="off"
                            value={honeypot}
                            onChange={(e) => setHoneypot(e.target.value)}
                          />
                        </div>

                        {submitStatus === 'error' && (
                          <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 p-3.5 text-xs text-red-700">
                            <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
                            <span>{statusMessage}</span>
                          </div>
                        )}

                        {/* Package / Offering Selector */}
                        <div>
                          <label className="block text-xs font-semibold text-[#1e1e1e] mb-1.5">
                            جلسه یا پکیج انتخابی
                          </label>
                          <div className="relative">
                            <select
                              value={selectedOffering}
                              onChange={(e) => setSelectedOffering(e.target.value)}
                              className="w-full appearance-none rounded-xl border border-[#e5e5e2] bg-[#fafaf8] px-4 py-3 text-sm text-[#1e1e1e] focus:border-[#1f3d3a] focus:bg-white focus:outline-none transition-colors"
                            >
                              {offeringList.map((item) => (
                                <option key={item.id} value={item.title}>
                                  {item.title} {item.priceLabel ? `(${item.priceLabel})` : ''}
                                </option>
                              ))}
                            </select>
                            <Calendar className="pointer-events-none absolute start-auto end-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6b6b6b]" />
                          </div>
                        </div>

                        {/* Full Name */}
                        <div>
                          <label className="block text-xs font-semibold text-[#1e1e1e] mb-1.5">
                            نام و نام خانوادگی <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              required
                              value={fullName}
                              onChange={(e) => {
                                setFullName(e.target.value);
                                if (nameError) setNameError(null);
                              }}
                              placeholder="مثال: سارا محمدی"
                              className="w-full rounded-xl border border-[#e5e5e2] bg-white px-4 py-3 pe-10 text-sm text-[#1e1e1e] placeholder-[#9ca3af] focus:border-[#1f3d3a] focus:outline-none transition-colors"
                            />
                            <User className="pointer-events-none absolute start-auto end-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6b6b6b]" />
                          </div>
                          {nameError && (
                            <p className="mt-1 text-xs text-red-600">{nameError}</p>
                          )}
                        </div>

                        {/* Phone Number */}
                        <div>
                          <label className="block text-xs font-semibold text-[#1e1e1e] mb-1.5">
                            شماره موبایل (جهت هماهنگی ساعت جلسه) <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="tel"
                              dir="ltr"
                              required
                              value={phone}
                              onChange={handlePhoneChange}
                              placeholder="09123456789"
                              className="w-full rounded-xl border border-[#e5e5e2] bg-white px-4 py-3 pe-10 text-sm text-[#1e1e1e] placeholder-[#9ca3af] text-right focus:border-[#1f3d3a] focus:outline-none transition-colors"
                            />
                            <Phone className="pointer-events-none absolute start-auto end-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6b6b6b]" />
                          </div>
                          {phoneError && (
                            <p className="mt-1 text-xs text-red-600">{phoneError}</p>
                          )}
                        </div>

                        {/* Email (Optional) */}
                        <div>
                          <label className="block text-xs font-semibold text-[#1e1e1e] mb-1.5">
                            آدرس ایمیل <span className="text-xs font-normal text-[#6b6b6b]">(اختیاری)</span>
                          </label>
                          <div className="relative">
                            <input
                              type="email"
                              dir="ltr"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="you@example.com"
                              className="w-full rounded-xl border border-[#e5e5e2] bg-white px-4 py-3 pe-10 text-sm text-[#1e1e1e] placeholder-[#9ca3af] text-right focus:border-[#1f3d3a] focus:outline-none transition-colors"
                            />
                            <Mail className="pointer-events-none absolute start-auto end-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6b6b6b]" />
                          </div>
                        </div>

                        {/* Note / Message */}
                        <div>
                          <label className="block text-xs font-semibold text-[#1e1e1e] mb-1.5">
                            توضیح اولیه یا موضوع اصلی دغدغه شما <span className="text-xs font-normal text-[#6b6b6b]">(اختیاری)</span>
                          </label>
                          <div className="relative">
                            <textarea
                              rows={3}
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              placeholder="مختصری درباره موضوع یا هدفی که مایلید روی آن کار کنیم بنویسید..."
                              className="w-full rounded-xl border border-[#e5e5e2] bg-white p-3 text-sm text-[#1e1e1e] placeholder-[#9ca3af] focus:border-[#1f3d3a] focus:outline-none transition-colors resize-none"
                            />
                          </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-2">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1f3d3a] py-4 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#2b544e] active:scale-98 disabled:opacity-60 cursor-pointer"
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin text-white" />
                                <span>در حال ارسال درخواست...</span>
                              </>
                            ) : (
                              <span>ثبت درخواست و ارسال به کوچ</span>
                            )}
                          </button>
                        </div>

                        {/* Trust & ICF ethics note */}
                        <div className="flex items-center gap-2 pt-1 text-[11px] text-[#6b6b6b] justify-center">
                          <ShieldCheck className="h-3.5 w-3.5 text-[#1f3d3a] shrink-0" />
                          <span>اطلاعات شما ۱۰۰٪ محرمانه و مطابق کدهای اخلاقی ICF حفظ می‌گردد.</span>
                        </div>
                      </form>
                    )}
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
