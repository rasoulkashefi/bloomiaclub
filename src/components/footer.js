import React, { useState } from 'react'
import { supabase } from '../lib/supabase'

import Script from 'dangerous-html/react'

import './footer.css'

const Footer = (props) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const isValidEmail = (value) => {
    if (!value) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  };

  const canSubmit = () => {
    const lastSubmit = Number(localStorage.getItem('newsletter_last_submit') || 0);
    const now = Date.now();
    return now - lastSubmit > 60 * 1000;
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const normalizedEmail = email.trim().toLowerCase();
    if (!isValidEmail(normalizedEmail)) {
      setErrorMessage('ایمیل معتبر وارد کنید.');
      return;
    }

    if (!canSubmit()) {
      setErrorMessage('لطفا کمی بعد دوباره تلاش کنید.');
      return;
    }

    if (honeypot) {
      setSubscribed(true);
      setEmail('');
      return;
    }

    setIsSubmitting(true);
    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert([{ email: normalizedEmail }]);

    setIsSubmitting(false);

    if (error) {
      console.error('Newsletter subscribe error:', error);
      if (error.code === '23505') {
        setSubscribed(true);
        setEmail('');
        return;
      }
      if (error.code === '42501') {
        setErrorMessage('اجازه ثبت ندارید. لطفا تنظیمات دسترسی را بررسی کنید.');
        return;
      }
      setErrorMessage('عضویت انجام نشد. دوباره تلاش کنید.');
      return;
    }

    localStorage.setItem('newsletter_last_submit', String(Date.now()));
    setSubscribed(true);
    setEmail('');
  };

  return (
    <div className="footer-container1">
      <div className="footer-container2">
        <div className="footer-container3">
          <Script
            html={`<style>
@media (prefers-reduced-motion: reduce) {
.footer-social-link, .footer-link {
  transition: none;
}
.footer-social-link:hover {
  transform: none;
}
}
</style>`}
          ></Script>
        </div>
      </div>
      <footer className="footer-section">
        {/* Newsletter Section */}
        <div className="footer-newsletter">
          <div className="footer-newsletter-container">
            <div className="footer-newsletter-content">
              <h3 className="footer-newsletter-title">عضویت در خبرنامه بلومیا</h3>
              <p className="footer-newsletter-text">
                هفته‌ای یک نکته کاربردی برای رشد فردی و حرفه‌ای دریافت کنید.
              </p>
            </div>
            <form className="footer-newsletter-form" onSubmit={handleSubscribe}>
              {subscribed ? (
                <div className="footer-newsletter-success">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                  <span>با موفقیت عضو شدید!</span>
                </div>
              ) : (
                <>
                  <input
                    type="text"
                    tabIndex="-1"
                    autoComplete="off"
                    aria-hidden="true"
                    className="footer-newsletter-honeypot"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                  <input
                    type="email"
                    placeholder="ایمیل خود را وارد کنید"
                    className="footer-newsletter-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="footer-newsletter-btn" disabled={isSubmitting}>
                    عضویت
                  </button>
                  {errorMessage && (
                    <div className="footer-newsletter-error">{errorMessage}</div>
                  )}
                </>
              )}
            </form>
          </div>
        </div>

        <div className="footer-main">
          <div className="footer-container">
            <div className="footer-content">
              {/* Brand Section */}
              <div className="footer-brand">
                <picture>
                  <source srcSet="/images/bloomia-club-logo.avif" type="image/avif" />
                  <source srcSet="/images/bloomia-club-logo.webp" type="image/webp" />
                  <img
                    src="/images/bloomia-club-logo.png"
                    alt="بلومیا"
                    className="footer-logo"
                    width="2576"
                    height="1288"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
                <h4 className="footer-brand-title">بلومیا؛ آکادمی شکوفایی و رشد</h4>
                <p className="footer-brand-description">
                  پلتفرم تخصصی کوچینگ آنلاین برای تمام کسانی که به دنبال تحول آگاهانه هستند. همراه شما در مسیر توسعه فردی، ارتقای مهارت‌های رهبری و دستیابی به تعادل در زندگی و کسب‌وکار.
                </p>
              </div>

              {/* Links Sections */}
              <div className="footer-links-group">
                <div className="footer-column">
                  <h4 className="footer-column-title">خدمات و رشد</h4>
                  <ul className="footer-list">
                    <li><a href="/what-is-coaching" className="footer-link">کوچینگ چیست؟</a></li>
                    <li><a href="/coaches" className="footer-link">مربیان بلومیا</a></li>
                    <li><a href="/free-intro-session" className="footer-link">رزرو جلسه معارفه</a></li>
                    <li><a href="/coaching" className="footer-link">کوچینگ کسب‌وکار</a></li>
                    <li><a href="/all-events" className="footer-link">رویدادهای آینده</a></li>
                  </ul>
                </div>
                <div className="footer-column">
                  <h4 className="footer-column-title">راهنما و پشتیبانی</h4>
                  <ul className="footer-list">
                    <li><a href="/faq" className="footer-link">سوالات متداول</a></li>
                    <li><a href="/blog" className="footer-link">مجله آموزشی (بلاگ)</a></li>
                    <li><a href="/contact" className="footer-link">تماس با ما</a></li>
                    <li><a href="/legal" className="footer-link">شرایط و قوانین</a></li>
                    <li><a href="/contact" className="footer-link">همکاری با ما</a></li>
                  </ul>
                </div>
                <div className="footer-column">
                  <h4 className="footer-column-title">جامعه بلومیا</h4>
                  <ul className="footer-list">
                    <li><a href="/community" className="footer-link">انجمن آنلاین</a></li>
                    <li><a href="/blog" className="footer-link">پادکست‌های بلومیا</a></li>
                    <li><a href="/all-events" className="footer-link">وبینارها</a></li>
                    <li><a href="/community" className="footer-link">شبکه‌سازی</a></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="footer-divider"></div>

            {/* Bottom Section */}
            <div className="footer-bottom">
              <p className="footer-copyright">
                © ۱۴۰۴ بلومیا کلاب. تمام حقوق محفوظ است.
              </p>
              <div className="footer-social">
                <a href="#" aria-label="اینستاگرام" className="footer-social-link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8A4 4 0 0 1 16 11.37m1.5-4.87h.01"></path>
                    </g>
                  </svg>
                </a>
                <a href="#" aria-label="لینکدین" className="footer-social-link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2a2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6M2 9h4v12H2z"></path>
                      <circle cx="4" cy="4" r="2"></circle>
                    </g>
                  </svg>
                </a>
                <a href="#" aria-label="تلگرام" className="footer-social-link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 10l-4 4l6 6l4-16l-18 7l4 2l2 6l3-4"></path>
                  </svg>
                </a>
                <a href="#" aria-label="یوتیوب" className="footer-social-link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                      <path d="M2.5 17a24.12 24.12 0 0 1 0-10a2 2 0 0 1 1.4-1.4a49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10a2 2 0 0 1-1.4 1.4a49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
                      <path d="m10 15l5-3l-5-3z"></path>
                    </g>
                  </svg>
                </a>
              </div>
              <p className="footer-tagline">
                طراحی شده با هدف شکوفایی پتانسیل‌های انسانی
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
