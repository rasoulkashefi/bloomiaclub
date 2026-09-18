import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import Navigation from '../components/navigation'
import Footer from '../components/footer'
import { supabase } from '../lib/supabase'
import { useAllCoaches } from '../hooks/useCoaches'
import './free-intro-session.css'

const FreeIntroSession = (props) => {
  const { coaches, loading: coachesLoading } = useAllCoaches();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    message: '',
    subject: ''
  });
  const [formStatus, setFormStatus] = useState({ status: 'idle', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const featuredCoaches = coaches.slice(0, 6);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) {
      return;
    }
    
    setIsSubmitting(true);
    setFormStatus({ status: 'loading', message: '' });

    const payload = {
      full_name: formData.fullName.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      message: formData.message.trim() || null,
      subject: formData.subject.trim()
    };

    let responseData = null;

    try {
      console.log('Supabase URL:', process.env.REACT_APP_SUPABASE_URL);
      console.log('Calling Edge Function: rapid-endpoint');
      console.log('Payload:', payload);
      
      const { data, error: invokeError } = await supabase
        .functions
        .invoke('rapid-endpoint', {
          body: payload
        });

      console.log('Response data:', data);
      console.log('Response error:', invokeError);

      responseData = data;

      if (invokeError) {
        console.error('Invoke error details:', invokeError);
        throw invokeError;
      }

      setFormStatus({
        status: 'success',
        message: 'درخواست شما با موفقیت ثبت شد. به زودی برای تایید زمان با شما تماس می‌گیریم.'
      });
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        message: '',
        subject: ''
      });
      setPhoneError(false);
    } catch (submitError) {
      console.error('Full error object:', submitError);
      console.error('Error message:', submitError?.message);
      console.error('Error status:', submitError?.status);
      
      const status = submitError?.status;
      const fallbackMessage = responseData?.error || submitError?.message || 'خطا در ارسال درخواست. لطفاً دوباره تلاش کنید.';
      let errorMessage = fallbackMessage;

      if (status === 429) {
        errorMessage = 'لطفاً کمی صبر کنید و دوباره تلاش کنید. تعداد درخواست‌ها زیاد است.';
      } else if (status === 500) {
        errorMessage = 'مشکلی در ثبت درخواست پیش آمد. لطفاً دوباره تلاش کنید.';
      }

      setFormStatus({
        status: 'error',
        message: errorMessage
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="free-intro-session-container1">
      <Helmet>
        <title>رزرو جلسه صفر رایگان | بلومیا</title>
        <meta name="description" content="جلسه معارفه رایگان شما با کوچ‌های متخصص بلومیا. بدون پرداخت، روهۃ" />
        <meta name="keywords" content="جلسه صفر، رایگان، معارفه، کوچ، رزرو، بلومیا" />
        <link rel="canonical" href="https://bloomiaclub.com/coaching/free-intro-session" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="رزرو جلسه رایگان | بلومیا" />
        <meta property="og:description" content="جلسه معارفه رایگان با کوچ‌های حرفه‌ای بلومیا" />
        <meta property="og:url" content="https://bloomiaclub.com/coaching/free-intro-session" />
        <meta property="og:image" content="https://bloomiaclub.com/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="fa_IR" />
        <meta property="og:site_name" content="بلومیا" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="جلسه رایگان بلومیا" />
        <meta property="twitter:description" content="معارفه با کوچ مناسب برای علاقمند رشد" />
        <meta property="twitter:image" content="https://bloomiaclub.com/og-image.png" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "رزرو جلسه صفر رایگان",
            "url": "https://bloomiaclub.com/coaching/free-intro-session",
            "inLanguage": "fa-IR"
          })}
        </script>
      </Helmet>
      <Navigation />
      <main dir="rtl" className="blomia-page">
        <section className="hero-booking">
          <div className="hero-video-container">
            <picture>
              <source srcSet="/images/coaching-free-intro-session.avif" type="image/avif" />
              <source srcSet="/images/coaching-free-intro-session.webp" type="image/webp" />
              <img
                src="/images/coaching-free-intro-session.png"
                alt="جلسه معرفی رایگان"
                className="hero-video-bg"
                width="1408"
                height="768"
                decoding="async"
                fetchpriority="high"
              />
            </picture>
            <div className="hero-overlay"></div>
          </div>
          <div className="hero-content">
            <h1 className="hero-title">
              مسیر تحول شما از اینجا شروع می‌شود
            </h1>
            <p className="hero-subtitle">
              یک جلسه ۴۵ دقیقه‌ای کاملاً رایگان برای کشف پتانسیل‌های درونی و تعیین نقشه‌راه موفقیت فردی شما.
            </p>
            <div className="hero-actions">
              <a href="#booking-form">
                <div className="btn btn-primary btn-lg">
                  <span>رزرو جلسه رایگان</span>
                </div>
              </a>
            </div>
          </div>
        </section>

        <section id="booking-form" className="booking-form-section">
          <div className="container">
            <div className="form-card">
              <h2 className="section-title">اطلاعات خود را وارد کنید</h2>
              <p className="section-content">
                ما در کوتاه‌ترین زمان ممکن برای تایید زمان نهایی با شما تماس خواهیم گرفت.
              </p>
              <form onSubmit={handleSubmit} className="booking-native-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="full-name">نام و نام خانوادگی</label>
                    <input
                      type="text"
                      id="full-name"
                      name="fullName"
                      required
                      placeholder="مثال: علی رضایی"
                      value={formData.fullName}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^\u0600-\u06FFa-zA-Z\s]/g, '');
                        setFormData((prev) => ({ ...prev, fullName: value }));
                      }}
                      minLength={3}
                      title="نام باید حداقل ۳ حرف باشد"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">شماره موبایل</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      placeholder="09123456789"
                      value={formData.phone}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, '');
                        if (value.length <= 11) {
                          setFormData((prev) => ({ ...prev, phone: value }));
                          if (value.length > 0) {
                            const isValid = /^09\d{9}$/.test(value);
                            setPhoneError(!isValid);
                          } else {
                            setPhoneError(false);
                          }
                        }
                      }}
                      pattern="^09\d{9}$"
                      title="شماره موبایل باید با 09 شروع شود و 11 رقم باشد"
                      className={phoneError ? 'input-error' : ''}
                    />
                    {phoneError && (
                      <small className="form-error">شماره موبایل باید با 09 شروع شود و 11 رقم باشد</small>
                    )}
                  </div>
                  <div className="form-group full-width">
                    <label htmlFor="email-address">ایمیل</label>
                    <input
                      type="email"
                      id="email-address"
                      name="email"
                      required
                      placeholder="example@bloomia.com"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div className="form-group full-width">
                    <label htmlFor="message">
                      پیام شما (اختیاری)
                      <span style={{ fontSize: '0.75rem', color: '#6B6B6B', marginRight: '8px' }}>
                        ({formData.message.length}/500)
                      </span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      placeholder="مختصری از چالش فعلی خود یا دغدغه‌هایتان بنویسید..."
                      value={formData.message}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value.length <= 500) {
                          setFormData((prev) => ({ ...prev, message: value }));
                        }
                      }}
                      maxLength={500}
                    />
                  </div>
                </div>

                <input
                  type="text"
                  name="subject"
                  tabIndex={-1}
                  autoComplete="off"
                  style={{ display: 'none' }}
                  value={formData.subject}
                  onChange={(e) => setFormData((prev) => ({ ...prev, subject: e.target.value }))}
                />

                {formStatus.status !== 'idle' && (
                  <div className={`free-intro-form-message free-intro-form-message-${formStatus.status}`}>
                    {formStatus.message}
                  </div>
                )}

                <button
                  type="submit"
                  className="submit-btn btn btn-accent btn-xl"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'در حال ارسال...' : 'نهایی‌سازی رزرو'}
                </button>
              </form>
            </div>
          </div>
        </section>

        <section className="process-steps">
          <div className="container">
            <h2 className="text-center section-title">روند برگزاری جلسه</h2>
            <div className="steps-wrapper">
              <div className="step-item">
                <div className="step-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                      <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                      <circle cx="12" cy="12" r="1"></circle>
                    </g>
                  </svg>
                </div>
                <h3 className="section-subtitle">۱. رزرو آنلاین</h3>
                <p className="section-content">فرم را پر کنید و زمان پیشنهادی خود را انتخاب نمایید.</p>
              </div>
              <div className="step-divider"></div>
              <div className="step-item">
                <div className="step-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                      <path d="M10.268 21a2 2 0 0 0 3.464 0M11.68 2.009A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673c-.824-.85-1.678-1.731-2.21-3.348"></path>
                      <circle cx="18" cy="5" r="3"></circle>
                    </g>
                  </svg>
                </div>
                <h3 className="section-subtitle">۲. تایید نهایی</h3>
                <p className="section-content">همکاران ما برای قطعی کردن زمان جلسه با شما تماس می‌گیرند.</p>
              </div>
              <div className="step-divider"></div>
              <div className="step-item">
                <div className="step-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                      <path d="M12 17v4m10-8.693V15a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8.693M8 21h8"></path>
                      <circle cx="19" cy="6" r="3"></circle>
                    </g>
                  </svg>
                </div>
                <h3 className="section-subtitle">۳. شروع تحول</h3>
                <p className="section-content">جلسه ۴۵ دقیقه‌ای شما به صورت آنلاین برگزار خواهد شد.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="coaches-grid">
          <div className="container">
            <h2 className="text-center section-title">همراهان شما در این مسیر</h2>
            {coachesLoading ? (
              <div className="text-center" style={{ padding: '3rem' }}>
                <p>در حال بارگذاری...</p>
              </div>
            ) : (
              <div className="grid-layout">
                {featuredCoaches.map((coach) => (
                  <div key={coach.id} className="coach-card">
                    <div className="coach-card-image-wrapper">
                      <img
                        src={coach.imageUrl || 'https://images.pexels.com/photos/6942776/pexels-photo-6942776.jpeg?auto=compress&cs=tinysrgb&w=400'}
                        alt={coach.name}
                        className="coach-img"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="coach-card-content">
                      <h3 className="coach-name">{coach.name}</h3>
                      <a href={`/coaches/${coach.slug}`} className="coach-profile-link">
                        اطلاعات بیشتر
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M15 18l-6-6 6-6"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div style={{ textAlign: 'center', marginTop: 'var(--spacing-xl)' }}>
              <a href="/coaches" className="btn btn-outline">
                مشاهده همه کوچ‌ها
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}>
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </a>
            </div>
          </div>
        </section>

        <section className="value-guarantee">
          <div className="container">
            <div className="features-row">
              <div className="feature-col">
                <div className="feature-icon-box">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <circle cx="12" cy="12" r="1"></circle>
                    </g>
                  </svg>
                </div>
                <h3 className="section-subtitle">کاملاً رایگان و بی‌خطر</h3>
                <p className="section-content">
                  این جلسه هیچ تعهد مالی برای شما ایجاد نمی‌کند. هدف ما صرفاً آشنایی و ارزیابی مسیر است.
                </p>
              </div>
              <div className="feature-col">
                <div className="feature-icon-box">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                      <path d="m6 14l1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2"></path>
                      <circle cx="14" cy="15" r="1"></circle>
                    </g>
                  </svg>
                </div>
                <h3 className="section-subtitle">تمرکز بر نتایج ملموس</h3>
                <p className="section-content">
                  در پایان جلسه، شما با یک دیدگاه شفاف و حداقل دو راهکار عملی برای چالش فعلی خود خارج می‌شوید.
                </p>
              </div>
              <div className="feature-col">
                <div className="feature-icon-box">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                      <path d="M21 12a9 9 0 0 0-9-9a9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                      <path d="M3 3v5h5m-5 4a9 9 0 0 0 9 9a9.75 9.75 0 0 0 6.74-2.74L21 16"></path>
                      <path d="M16 16h5v5"></path>
                      <circle cx="12" cy="12" r="1"></circle>
                    </g>
                  </svg>
                </div>
                <h3 className="section-subtitle">حفظ کامل محرمانگی</h3>
                <p className="section-content">
                  تمامی گفتگوهای شما در محیطی امن و حرفه‌ای باقی می‌ماند. اعتماد شما اولویت اصلی بلومیا است.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="testimonials-section">
          <div className="container">
            <h2 className="text-center section-title">تجربیات همراهان قبلی</h2>
            <div className="grid-layout">
              <div className="testimonial-card">
                <p className="section-content">
                  «جلسه اول فراتر از انتظارم بود. سادگی و آرامش فضا باعث شد خیلی راحت چالش‌هایم را مطرح کنم.»
                </p>
                <span className="testimonial-author">زهرا م.</span>
              </div>
              <div className="testimonial-card">
                <p className="section-content">
                  «فکر نمی‌کردم در ۴۵ دقیقه بشود به این سطح از شفافیت رسید. بلومیا واقعاً حرفه‌ای عمل می‌کند.»
                </p>
                <span className="testimonial-author">رضا ک.</span>
              </div>
              <div className="testimonial-card">
                <p className="section-content">
                  «راهکارهای ارائه شده در همان جلسه اول به من کمک کرد تا اولویت‌های کاری‌ام را پیدا کنم.»
                </p>
                <span className="testimonial-author">سروش ا.</span>
              </div>
              <div className="testimonial-card">
                <p className="section-content">
                  «بسیار دعوت‌کننده و صمیمی. حس کردم بالاخره کسی شنونده واقعی دغدغه‌های من است.»
                </p>
                <span className="testimonial-author">مونا پ.</span>
              </div>
              <div className="testimonial-card">
                <p className="section-content">
                  «بدون هیچ فشاری برای خرید دوره‌های بعدی، فقط روی کمک به من تمرکز داشتند. عالی بود.»
                </p>
                <span className="testimonial-author">امید ش.</span>
              </div>
              <div className="testimonial-card">
                <p className="section-content">
                  «بهترین شروع برای کسانی که در تردید هستند. رایگان بودن فرصتی است که نباید از دست داد.»
                </p>
                <span className="testimonial-author">آیدا ن.</span>
              </div>
            </div>
          </div>
        </section>

        <section className="final-cta">
          <div className="cta-alert-box">
            <div className="cta-alert-content">
              <h2 className="section-title">آماده‌اید اولین گام را بردارید؟</h2>
              <p className="section-content">
                همین حالا جلسه ۴۵ دقیقه‌ای رایگان خود را رزرو کنید و مسیر جدید زندگی‌تان را بسازید.
              </p>
            </div>
            <div className="cta-alert-action">
              <a href="#booking-form">
                <div className="btn btn-primary btn-lg">
                  <span>رزرو جلسه رایگان</span>
                </div>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default FreeIntroSession
