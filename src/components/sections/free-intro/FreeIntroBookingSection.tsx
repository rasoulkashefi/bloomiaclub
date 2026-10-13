'use client';

import React, { useState } from 'react';
import { CoachProfile } from '@/lib/coaches';
import { CheckCircle2, AlertCircle, Loader2, Send, Sparkles, User, Phone, Mail, HelpCircle, MessageSquare } from 'lucide-react';

interface FreeIntroBookingSectionProps {
  coaches: CoachProfile[];
}

const COACHING_TOPICS = [
  { value: 'personal-growth', label: 'رشد و توسعه فردی، تقویت اعتماد‌به‌نفس و خودآگاهی' },
  { value: 'career-growth', label: 'توسعه مسیر شغلی، تغییر شغل یا ارتقای جایگاه سازمانی' },
  { value: 'work-life-balance', label: 'تعادل کار و زندگی شخصی، مدیریت استرس و فرسودگی' },
  { value: 'leadership', label: 'رهبری تیم، مدیریت کسب‌وکار و تصمیم‌گیری‌های حساس' },
  { value: 'relationships', label: 'ارتباطات مؤثر، هوش هیجانی و حل تعارضات' },
  { value: 'other', label: 'سایر موضوعات و نیازمندی به مشاوره اولیه' },
];

export const FreeIntroBookingSection: React.FC<FreeIntroBookingSectionProps> = ({ coaches }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    topic: COACHING_TOPICS[0].label,
    preferredCoach: 'smart-match',
    message: '',
    subject: '', // Honeypot
  });

  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  // Normalize Persian/Arabic digits
  const normalizeDigits = (val: string) => {
    return val
      .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 1776))
      .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 1632));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const digitsOnly = normalizeDigits(raw).replace(/\D/g, '');

    if (digitsOnly.length <= 11) {
      setFormData((prev) => ({ ...prev, phone: digitsOnly }));

      if (digitsOnly.length > 0) {
        if (!/^09\d{9}$/.test(digitsOnly) && digitsOnly.length === 11) {
          setPhoneError('شماره موبایل باید با ۰۹ شروع شود و ۱۱ رقم باشد.');
        } else if (digitsOnly.length > 0 && !digitsOnly.startsWith('09') && digitsOnly.length >= 2) {
          setPhoneError('شماره موبایل باید با ۰۹ شروع شود.');
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

    // Validate phone strictly
    const normalizedPhone = normalizeDigits(formData.phone).replace(/\D/g, '');
    if (!/^09\d{9}$/.test(normalizedPhone)) {
      setPhoneError('شماره موبایل معتبر نیست (مثال: 09123456789)');
      return;
    }

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
          fullName: formData.fullName.trim(),
          phone: normalizedPhone,
          email: formData.email.trim(),
          topic: formData.topic,
          preferredCoach:
            formData.preferredCoach === 'smart-match'
              ? 'پیشنهاد هوشمند توسط بلومیا کلاب'
              : formData.preferredCoach,
          message: formData.message.trim(),
          subject: formData.subject,
        }),
      });

      const result = await response.json();

      if (!response.ok || result.error) {
        throw new Error(result.error || 'خطایی در ثبت درخواست رخ داد.');
      }

      setSubmitStatus('success');
      setStatusMessage(
        result.message ||
          'درخواست شما با موفقیت ثبت شد. به زودی برای هماهنگی زمان با شما تماس می‌گیریم.'
      );
    } catch (err: any) {
      setSubmitStatus('error');
      setStatusMessage(err.message || 'خطا در ارتباط با سرور. لطفاً مجدداً امتحان فرمایید.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      topic: COACHING_TOPICS[0].label,
      preferredCoach: 'smart-match',
      message: '',
      subject: '',
    });
    setPhoneError(null);
    setSubmitStatus('idle');
    setStatusMessage('');
  };

  return (
    <section id="booking-form" className="py-16 md:py-24 bg-brand-surface scroll-mt-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-teal-50 border border-brand-teal-200/60 text-brand-teal-900 text-xs sm:text-sm font-semibold">
            <CheckCircle2 className="w-4 h-4 text-brand-teal-700" />
            <span>رزرو نوبت در ۲ دقیقه</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-neutral-900 tracking-tight">
            اطلاعات خود را برای جلسه معارفه ثبت کنید
          </h2>
          <p className="text-sm sm:text-base text-brand-neutral-600 max-w-xl mx-auto leading-relaxed">
            پس از ثبت فرم، مشاوران ارشد بلومیا در کوتاه‌ترین زمان برای بررسی نیازمندی و تایید زمان دقیق جلسه با شما تماس خواهند گرفت.
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-brand-surface-border shadow-soft-md transition-all">
          {submitStatus === 'success' ? (
            <div className="text-center py-8 px-4 space-y-6">
              <div className="w-16 h-16 rounded-full bg-brand-teal-50 border border-brand-teal-200 text-brand-teal-900 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9 text-brand-teal-800" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-brand-neutral-900">
                  درخواست شما با موفقیت ثبت شد
                </h3>
                <p className="text-sm sm:text-base text-brand-neutral-600 leading-relaxed max-w-md mx-auto">
                  {statusMessage}
                </p>
              </div>

              <div className="bg-brand-surface rounded-2xl p-4 sm:p-5 border border-brand-surface-border max-w-md mx-auto text-right space-y-2 text-xs sm:text-sm text-brand-neutral-700">
                <div className="font-semibold text-brand-teal-900 mb-2">گام‌های بعدی:</div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-brand-teal-100 text-brand-teal-900 flex items-center justify-center shrink-0 font-bold text-xs">
                    ۱
                  </span>
                  <span>بررسی چالش و نیازمندی شما توسط تیم ارزیابی بلومیا</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-brand-teal-100 text-brand-teal-900 flex items-center justify-center shrink-0 font-bold text-xs">
                    ۲
                  </span>
                  <span>تماس تلفنی یا پیامکی جهت نهایی‌سازی ساعت حضور در جلسه آنلاین</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-brand-teal-100 text-brand-teal-900 flex items-center justify-center shrink-0 font-bold text-xs">
                    ۳
                  </span>
                  <span>ارسال لینک اختصاصی اتاق گفتگوی امن در پلتفرم ویدیوکال</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl text-sm font-semibold text-brand-teal-900 hover:bg-brand-teal-50 border border-brand-teal-300 transition-colors min-h-[44px]"
                >
                  ثبت یک درخواست دیگر
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Form Error Banner */}
              {submitStatus === 'error' && (
                <div className="p-4 rounded-2xl bg-brand-neutral-100 border border-brand-neutral-300 flex items-start gap-3 text-brand-neutral-900 text-sm">
                  <AlertCircle className="w-5 h-5 text-brand-neutral-700 shrink-0 mt-0.5" />
                  <div className="leading-relaxed">{statusMessage}</div>
                </div>
              )}

              {/* Grid: Name & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Full Name */}
                <div className="space-y-2">
                  <label htmlFor="fullName" className="block text-sm font-semibold text-brand-neutral-900 text-right">
                    نام و نام خانوادگی <span className="text-brand-neutral-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="fullName"
                      required
                      placeholder="مثال: مریم سعیدی"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, fullName: e.target.value }))
                      }
                      minLength={3}
                      className="w-full px-4 py-3 rounded-xl border border-brand-surface-border bg-brand-surface text-brand-neutral-900 text-sm placeholder:text-brand-neutral-400 focus:outline-none focus:border-brand-teal-700 focus:ring-2 focus:ring-brand-teal-100 transition-all min-h-[44px]"
                    />
                    <User className="w-4 h-4 text-brand-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-semibold text-brand-neutral-900 text-right">
                    شماره موبایل <span className="text-brand-neutral-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      id="phone"
                      required
                      dir="ltr"
                      placeholder="09123456789"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        phoneError
                          ? 'border-brand-neutral-500 focus:ring-brand-neutral-200'
                          : 'border-brand-surface-border focus:border-brand-teal-700 focus:ring-brand-teal-100'
                      } bg-brand-surface text-brand-neutral-900 text-sm placeholder:text-brand-neutral-400 focus:outline-none focus:ring-2 transition-all min-h-[44px] text-right`}
                    />
                    <Phone className="w-4 h-4 text-brand-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                  {phoneError && (
                    <p className="text-xs text-brand-neutral-700 font-medium text-right mt-1">
                      {phoneError}
                    </p>
                  )}
                </div>
              </div>

              {/* Grid: Email & Topic */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-semibold text-brand-neutral-900 text-right">
                    آدرس ایمیل <span className="text-brand-neutral-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      required
                      dir="ltr"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, email: e.target.value }))
                      }
                      className="w-full px-4 py-3 rounded-xl border border-brand-surface-border bg-brand-surface text-brand-neutral-900 text-sm placeholder:text-brand-neutral-400 focus:outline-none focus:border-brand-teal-700 focus:ring-2 focus:ring-brand-teal-100 transition-all min-h-[44px] text-right"
                    />
                    <Mail className="w-4 h-4 text-brand-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Coaching Topic */}
                <div className="space-y-2">
                  <label htmlFor="topic" className="block text-sm font-semibold text-brand-neutral-900 text-right">
                    حوزه اصلی دغدغه یا هدف شما <span className="text-brand-neutral-400">*</span>
                  </label>
                  <select
                    id="topic"
                    value={formData.topic}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, topic: e.target.value }))
                    }
                    className="w-full px-4 py-3 rounded-xl border border-brand-surface-border bg-brand-surface text-brand-neutral-900 text-sm focus:outline-none focus:border-brand-teal-700 focus:ring-2 focus:ring-brand-teal-100 transition-all min-h-[44px] cursor-pointer"
                  >
                    {COACHING_TOPICS.map((t) => (
                      <option key={t.value} value={t.label}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Preferred Coach (Optional) */}
              <div className="space-y-2">
                <label htmlFor="preferredCoach" className="block text-sm font-semibold text-brand-neutral-900 text-right">
                  کوچ مورد نظر شما (اختیاری)
                </label>
                <select
                  id="preferredCoach"
                  value={formData.preferredCoach}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, preferredCoach: e.target.value }))
                  }
                  className="w-full px-4 py-3 rounded-xl border border-brand-surface-border bg-brand-surface text-brand-neutral-900 text-sm focus:outline-none focus:border-brand-teal-700 focus:ring-2 focus:ring-brand-teal-100 transition-all min-h-[44px] cursor-pointer"
                >
                  <option value="smart-match">
                    پیشنهاد هوشمند توسط بلومیا کلاب (تطبیق با تخصص و دغدغه شما)
                  </option>
                  {coaches.map((coach) => (
                    <option key={coach.id} value={`${coach.name} (${coach.title})`}>
                      {coach.name} — {coach.title}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-brand-neutral-500 text-right">
                  اگر هنوز در انتخاب کوچ مردد هستید، گزینه پیشنهاد هوشمند را انتخاب کنید تا بهترین تطبیق برای شما انجام شود.
                </p>
              </div>

              {/* Message (Optional) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="message" className="text-sm font-semibold text-brand-neutral-900">
                    شرح مختصر دغدغه یا سوال شما (اختیاری)
                  </label>
                  <span className="text-xs text-brand-neutral-400 dir-ltr">
                    {formData.message.length} / 500
                  </span>
                </div>
                <textarea
                  id="message"
                  rows={4}
                  maxLength={500}
                  placeholder="مختصری درباره موضوعی که مایلید در این جلسه ۴۵ دقیقه‌ای روی آن تمرکز کنیم بنویسید..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, message: e.target.value }))
                  }
                  className="w-full px-4 py-3 rounded-xl border border-brand-surface-border bg-brand-surface text-brand-neutral-900 text-sm placeholder:text-brand-neutral-400 focus:outline-none focus:border-brand-teal-700 focus:ring-2 focus:ring-brand-teal-100 transition-all resize-y min-h-[96px]"
                />
              </div>

              {/* Honeypot field (hidden from real users) */}
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, subject: e.target.value }))
                }
                tabIndex={-1}
                autoComplete="off"
                style={{ display: 'none' }}
                aria-hidden="true"
              />

              {/* Submit CTA Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl text-base font-bold text-white bg-brand-teal-900 hover:bg-brand-teal-800 active:scale-98 disabled:opacity-70 disabled:pointer-events-none transition-all shadow-soft min-h-[48px]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>در حال ثبت و ارسال درخواست...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-brand-teal-200" />
                      <span>نهایی‌سازی رزرو جلسه رایگان</span>
                    </>
                  )}
                </button>
              </div>

              {/* Privacy notice */}
              <p className="text-xs text-center text-brand-neutral-500 leading-relaxed pt-1">
                اطلاعات تماس شما نزد بلومیا کلاب کاملاً محرمانه بوده و صرفاً جهت هماهنگی جلسه استفاده خواهد شد.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
