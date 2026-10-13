'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, User, Phone, Mail, Building2, HelpCircle } from 'lucide-react';

export const ContactFormSection: React.FC = () => {
  const [requestType, setRequestType] = useState<'individual' | 'corporate'>('individual');
  const [formData, setFormData] = useState({
    fullName: '',
    organizationName: '',
    phone: '',
    email: '',
    subjectTitle: '',
    message: '',
    subject: '', // Honeypot
  });

  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

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
          setPhoneError('شماره موبایل باید با ۰۹ شروع شده و ۱۱ رقم باشد.');
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

    const normalizedPhone = normalizeDigits(formData.phone).replace(/\D/g, '');
    if (!/^09\d{9}$/.test(normalizedPhone)) {
      setPhoneError('شماره موبایل نامعتبر است (مثال: 09123456789)');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setStatusMessage('');

    try {
      const response = await fetch('/api/lead/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          organizationName: formData.organizationName.trim(),
          phone: normalizedPhone,
          email: formData.email.trim(),
          requestType,
          subjectTitle: formData.subjectTitle.trim() || (requestType === 'corporate' ? 'درخواست کوچینگ سازمانی' : 'پیام ارتباط با ما'),
          message: formData.message.trim(),
          subject: formData.subject,
        }),
      });

      const result = await response.json();

      if (!response.ok || result.error) {
        throw new Error(result.error || 'خطایی در ثبت پیام رخ داد.');
      }

      setSubmitStatus('success');
      setStatusMessage(
        result.message ||
          'پیام شما با موفقیت ثبت شد. به زودی با شما تماس می‌گیریم.'
      );
    } catch (err: any) {
      setSubmitStatus('error');
      setStatusMessage(err.message || 'خطا در ارتباط با سرور. لطفاً مجدداً تلاش فرمایید.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      organizationName: '',
      phone: '',
      email: '',
      subjectTitle: '',
      message: '',
      subject: '',
    });
    setPhoneError(null);
    setSubmitStatus('idle');
    setStatusMessage('');
  };

  return (
    <section id="contact-form" className="py-16 md:py-24 bg-brand-surface border-b border-brand-surface-border scroll-mt-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-neutral-900 tracking-tight">
            ارسال مستقیم پیام به تیم بلومیا
          </h2>
          <p className="text-sm sm:text-base text-brand-neutral-600 max-w-xl mx-auto leading-relaxed">
            فرم زیر را تکمیل نمایید تا درخواست شما به دپارتمان مربوطه ارجاع شده و در اسرع وقت پاسخ داده شود.
          </p>
        </div>

        {/* Card Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-brand-surface-border shadow-soft-md">
          {submitStatus === 'success' ? (
            <div className="text-center py-8 px-4 space-y-6">
              <div className="w-16 h-16 rounded-full bg-brand-teal-50 border border-brand-teal-200 text-brand-teal-900 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9 text-brand-teal-800" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-brand-neutral-900">
                  پیام شما با موفقیت ثبت شد
                </h3>
                <p className="text-sm sm:text-base text-brand-neutral-600 leading-relaxed max-w-md mx-auto">
                  {statusMessage}
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl text-sm font-semibold text-brand-teal-900 hover:bg-brand-teal-50 border border-brand-teal-300 transition-colors min-h-[44px]"
                >
                  ارسال یک پیام دیگر
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Type Switcher Tabs */}
              <div className="flex rounded-2xl bg-brand-surface p-1.5 border border-brand-surface-border">
                <button
                  type="button"
                  onClick={() => setRequestType('individual')}
                  className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all min-h-[44px] ${
                    requestType === 'individual'
                      ? 'bg-white text-brand-teal-900 shadow-soft-sm border border-brand-teal-200/50'
                      : 'text-brand-neutral-600 hover:text-brand-neutral-900'
                  }`}
                >
                  پیام فردی و سوالات عمومی
                </button>
                <button
                  type="button"
                  onClick={() => setRequestType('corporate')}
                  className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all min-h-[44px] ${
                    requestType === 'corporate'
                      ? 'bg-white text-brand-teal-900 shadow-soft-sm border border-brand-teal-200/50'
                      : 'text-brand-neutral-600 hover:text-brand-neutral-900'
                  }`}
                >
                  کوچینگ سازمانی و شرکتی
                </button>
              </div>

              {/* Error Alert */}
              {submitStatus === 'error' && (
                <div className="p-4 rounded-2xl bg-brand-neutral-100 border border-brand-neutral-300 flex items-start gap-3 text-brand-neutral-900 text-sm">
                  <AlertCircle className="w-5 h-5 text-brand-neutral-700 shrink-0 mt-0.5" />
                  <div className="leading-relaxed">{statusMessage}</div>
                </div>
              )}

              {/* Grid: Name & (Organization if corporate) */}
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
                      placeholder="مثال: سارا محمدی"
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

                {/* Organization Name (if corporate) OR Subject Title */}
                {requestType === 'corporate' ? (
                  <div className="space-y-2">
                    <label htmlFor="organizationName" className="block text-sm font-semibold text-brand-neutral-900 text-right">
                      نام شرکت یا سازمان <span className="text-brand-neutral-400">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="organizationName"
                        required
                        placeholder="مثال: شرکت نوآوران داده"
                        value={formData.organizationName}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, organizationName: e.target.value }))
                        }
                        className="w-full px-4 py-3 rounded-xl border border-brand-surface-border bg-brand-surface text-brand-neutral-900 text-sm placeholder:text-brand-neutral-400 focus:outline-none focus:border-brand-teal-700 focus:ring-2 focus:ring-brand-teal-100 transition-all min-h-[44px]"
                      />
                      <Building2 className="w-4 h-4 text-brand-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <label htmlFor="subjectTitle" className="block text-sm font-semibold text-brand-neutral-900 text-right">
                      موضوع پیام
                    </label>
                    <input
                      type="text"
                      id="subjectTitle"
                      placeholder="مثال: راهنمایی برای انتخاب کوچ مسیر شغلی"
                      value={formData.subjectTitle}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, subjectTitle: e.target.value }))
                      }
                      className="w-full px-4 py-3 rounded-xl border border-brand-surface-border bg-brand-surface text-brand-neutral-900 text-sm placeholder:text-brand-neutral-400 focus:outline-none focus:border-brand-teal-700 focus:ring-2 focus:ring-brand-teal-100 transition-all min-h-[44px]"
                    />
                  </div>
                )}
              </div>

              {/* Grid: Phone & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
              </div>

              {/* Message Content */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="message" className="text-sm font-semibold text-brand-neutral-900">
                    متن پیام یا شرح درخواست <span className="text-brand-neutral-400">*</span>
                  </label>
                  <span className="text-xs text-brand-neutral-400 dir-ltr">
                    {formData.message.length} / 500
                  </span>
                </div>
                <textarea
                  id="message"
                  required
                  rows={4}
                  maxLength={500}
                  placeholder={
                    requestType === 'corporate'
                      ? 'مختصری درباره تعداد نفرات تیم، چالش‌های سازمان، یا اهداف مورد نظر برای برنامه کوچینگ بنویسید...'
                      : 'پیام، پرسش یا پیشنهاد خود را برای ما بنویسید...'
                  }
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, message: e.target.value }))
                  }
                  className="w-full px-4 py-3 rounded-xl border border-brand-surface-border bg-brand-surface text-brand-neutral-900 text-sm placeholder:text-brand-neutral-400 focus:outline-none focus:border-brand-teal-700 focus:ring-2 focus:ring-brand-teal-100 transition-all resize-y min-h-[100px]"
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

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl text-base font-bold text-white bg-brand-teal-900 hover:bg-brand-teal-800 active:scale-98 disabled:opacity-70 disabled:pointer-events-none transition-all shadow-soft min-h-[48px]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>در حال ارسال پیام...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-brand-teal-200" />
                      <span>ارسال پیام</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-xs text-center text-brand-neutral-500 leading-relaxed pt-1">
                اطلاعات شما نزد بلومیا کلاب محفوظ بوده و مشمول خط‌مشی محرمانگی است.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
