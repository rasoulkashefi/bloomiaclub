import React, { useState } from 'react';
import { FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { FiClock, FiUsers } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Navigation from '../components/navigation';
import Footer from '../components/footer';
import { useCoachBySlug } from '../hooks/useCoaches';
import { usePostsByCoach } from '../hooks/usePosts';
import { supabase } from '../lib/supabase';
import NotFound from './not-found';
import './coach-profile.css';

const handleImageFallback = (event, fallbacks) => {
  if (!fallbacks || fallbacks.length === 0) return;
  const target = event.currentTarget;
  const currentIndex = Number(target.dataset.fallbackIndex || 0);
  const nextIndex = currentIndex + 1;
  if (fallbacks[nextIndex]) {
    target.dataset.fallbackIndex = String(nextIndex);
    target.src = fallbacks[nextIndex];
  }
};

const CoachProfile = () => {
  const { id } = useParams();
  const { coach, loading, error } = useCoachBySlug(id);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const { posts: coachPosts, loading: postsLoading } = usePostsByCoach(coach?.id, 2);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    selectedPackage: 'جلسه صفر (رایگان)',
    message: '',
    company: ''
  });
  const [formStatus, setFormStatus] = useState({ status: 'idle', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const handlePackageSelect = (packageName) => {
    setFormData((prev) => ({ ...prev, selectedPackage: packageName }));
  };

  /**
   * رند کردن حرفه‌ای قیمت‌ها
   * قیمت‌های زیر 100هزار: رند به 5 هزار تومان
   * قیمت‌های 100هزار تا 1میلیون: رند به 10 هزار تومان
   * قیمت‌های بالای 1میلیون: رند به 50 هزار تومان
   */
  const roundPrice = (price) => {
    const numPrice = Number(price);
    if (numPrice < 100000) {
      return Math.round(numPrice / 5000) * 5000;
    } else if (numPrice < 1000000) {
      return Math.round(numPrice / 10000) * 10000;
    } else {
      return Math.round(numPrice / 50000) * 50000;
    }
  };

  /**
   * محاسبه قیمت با تخفیف
   */
  const calculateDiscountedPrice = (originalPrice, discountPercent) => {
    if (!originalPrice || !discountPercent || discountPercent <= 0) return null;
    const discounted = originalPrice * (1 - discountPercent / 100);
    return roundPrice(discounted);
  };

  /**
   * فرمت قیمت برای نمایش
   */
  const formatPrice = (value, showDiscount = false, packageType = null) => {
    if (value == null || Number.isNaN(Number(value))) return 'تماس بگیرید';
    
    // استفاده از تخفیف مخصوص پکیج اگر موجود باشد
    const packageDiscounts = coach?.packageDiscounts || {};
    const discount = packageType && packageDiscounts[packageType] != null 
      ? Number(packageDiscounts[packageType]) 
      : 0;
    
    const hasDiscount = showDiscount && discount > 0;
    
    if (!hasDiscount) {
      return `${Number(value).toLocaleString('fa-IR')} تومان`;
    }
    
    const originalPrice = Number(value);
    const discountedPrice = calculateDiscountedPrice(originalPrice, discount);
    
    return (
      <div className="coach-profile-price-wrapper">
        <span className="coach-profile-price-original">{originalPrice.toLocaleString('fa-IR')} تومان</span>
        <span className="coach-profile-price-discounted">{discountedPrice.toLocaleString('fa-IR')} تومان</span>
        <span className="coach-profile-price-badge">{discount.toLocaleString('fa-IR')}٪ تخفیف</span>
      </div>
    );
  };

  const hasText = (value) => typeof value === 'string' && value.trim().length > 0;
  const hasNumber = (value) => value != null && Number(value) > 0;
  const formatNumber = (value) => Number(value).toLocaleString('fa-IR');

  if (loading) {
    return (
      <div className="coach-profile-container1">
        <Navigation />
        <div className="coach-profile-loading">
          <div className="loading-spinner"></div>
          <p>در حال بارگذاری...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !coach) {
    return <NotFound />;
  }

  const packagePrices = coach?.packagePrices || {};
  const hasAnyPackagePrice = ['start', 'discovery', 'transformation', 'excellence']
    .some((key) => packagePrices?.[key] != null);
  const hasAboutContent = hasText(coach.longDescription) || hasText(coach.description);
  const hasStats = hasNumber(coach.coachingHours) || hasNumber(coach.satisfiedClients);

  const heroImageUrl = coach.coverImage
    ? coach.coverImage.startsWith('http')
      ? coach.coverImage
      : `https://qxacvupalbfcoqkuydba.supabase.co/storage/v1/object/public/coaches_images/${coach.coverImage}`
    : null;

  const videoCoverUrl = coach.videoCover
    ? coach.videoCover.startsWith('http')
      ? coach.videoCover
      : `https://qxacvupalbfcoqkuydba.supabase.co/storage/v1/object/public/coaches_images/${coach.videoCover}`
    : '/images/blomia-self-reflection-journey.png';

  const specialties = Array.isArray(coach.specialties) ? coach.specialties : [];
  const specialtyTags = specialties
    .map((specialty) => (typeof specialty === 'string' ? specialty : (specialty.title || specialty.name || '')))
    .filter((tag) => Boolean(tag && String(tag).trim()));
  const heroSocialLinks = [
    coach.instagramUrl
      ? { key: 'instagram', label: 'اینستاگرام', url: coach.instagramUrl }
      : null,
    coach.linkedinUrl
      ? { key: 'linkedin', label: 'لینکدین', url: coach.linkedinUrl }
      : null,
  ].filter(Boolean);

  return (
    <div className="coach-profile-container1">
      <Helmet>
        <title>{coach.name} | کوچ متخصص | بلومیا</title>
        <meta name="description" content={coach.description || coach.title} />
        <meta name="keywords" content={`${coach.name}، کوچ، ${coach.title}، بلومیا`} />
        <link rel="canonical" href={`https://bloomiaclub.com/coaches/${id}`} />
        <meta property="og:type" content="profile" />
        <meta property="og:title" content={`${coach.name} | کوچ متخصص | بلومیا`} />
        <meta property="og:description" content={coach.description || coach.title} />
        <meta property="og:url" content={`https://bloomiaclub.com/coaches/${id}`} />
        <meta property="og:image" content={coach.imageUrl || "https://bloomiaclub.com/og-image.png"} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="fa_IR" />
        <meta property="og:site_name" content="بلومیا" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={`${coach.name} | کوچ متخصص`} />
        <meta property="twitter:description" content={coach.description || coach.title} />
        <meta property="twitter:image" content={coach.imageUrl || "https://bloomiaclub.com/og-image.png"} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": coach.name,
            "jobTitle": coach.title,
            "url": `https://bloomiaclub.com/coaches/${id}`,
            "image": coach.imageUrl,
            "description": coach.description,
            "inLanguage": "fa-IR"
          })}
        </script>
      </Helmet>
      <Navigation />
      <main className="coach-profile-main">
        {/* Hero Section */}
        <header className="coach-profile-hero-section">
          <div className="coach-profile-hero-container">
            <div className="coach-profile-hero-content-wrapper">
              {/* Text Content */}
              <div className="coach-profile-hero-text">
                {/* Key Features Tags */}
                {specialtyTags.length > 0 && (
                  <div className="coach-profile-hero-tags">
                    {specialtyTags.map((tag, index) => (
                      <div key={`${tag}-${index}`} className="coach-profile-hero-tag">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                        </svg>
                        {tag}
                      </div>
                    ))}
                  </div>
                )}

                <h1 className="coach-profile-hero-title">
                  مسیر <span className="coach-profile-hero-title-accent">شکوفایی</span> خود را <br/>پیدا کنید.
                </h1>
                {hasText(coach.description) && (
                  <p className="coach-profile-hero-description">
                    {coach.description}
                  </p>
                )}
                {heroSocialLinks.length > 0 && (
                  <div className="coach-profile-hero-socials">
                    {heroSocialLinks.map((link) => (
                      <a
                        key={link.key}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="coach-profile-hero-social-link"
                        aria-label={link.label}
                      >
                        <span className="coach-profile-hero-social-icon">
                          {link.key === 'instagram' ? (
                            <FaInstagram aria-hidden="true" />
                          ) : (
                            <FaLinkedinIn aria-hidden="true" />
                          )}
                        </span>
                      </a>
                    ))}
                  </div>
                )}
                <div className="coach-profile-hero-cta-group">
                  {hasAnyPackagePrice && (
                    <a href="#packages" className="coach-profile-btn coach-profile-btn-primary">
                      شروع سفر تغییر
                    </a>
                  )}
                  {hasAboutContent && (
                    <a href="#about" className="coach-profile-btn coach-profile-btn-outline">
                      بیشتر بدانید
                    </a>
                  )}
                </div>
              </div>
              
              {/* Hero Image */}
              {heroImageUrl && (
                <div className="coach-profile-hero-visual">
                  <div className="coach-profile-hero-decorative"></div>
                  <div className="coach-profile-hero-image-container">
                    <img 
                      src={heroImageUrl} 
                      alt={coach.name}
                      className="coach-profile-hero-image"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* About Section */}
        {hasAboutContent && (
          <section id="about" className="coach-profile-about-section">
            <div className="coach-profile-about-container">
              <div className="coach-profile-about-grid">
                <div className="coach-profile-about-text-block">
                  <h2 className="coach-profile-section-title">درباره من و نگاهم به کوچینگ</h2>
                  <div className="coach-profile-title-divider"></div>
                  {hasText(coach.longDescription) ? (
                    <div className="coach-profile-about-text-content">
                      {coach.longDescription.split('\n').map((para, idx) => (
                        <p key={idx} className="coach-profile-about-text">{para}</p>
                      ))}
                    </div>
                  ) : (
                    <p className="coach-profile-about-text">{coach.description}</p>
                  )}
                  
                  {hasStats && (
                    <div className="coach-profile-about-stats">
                      {hasNumber(coach.coachingHours) && (
                        <div className="coach-profile-about-stat">
                          <span className="coach-profile-about-stat-icon" aria-hidden="true">
                            <FiClock />
                          </span>
                          <span className="coach-profile-about-stat-value">{`${formatNumber(coach.coachingHours)}+`}</span>
                          <span className="coach-profile-about-stat-label">ساعت کوچینگ</span>
                        </div>
                      )}
                      {hasNumber(coach.satisfiedClients) && (
                        <div className="coach-profile-about-stat">
                          <span className="coach-profile-about-stat-icon" aria-hidden="true">
                            <FiUsers />
                          </span>
                          <span className="coach-profile-about-stat-value">{formatNumber(coach.satisfiedClients)}</span>
                          <span className="coach-profile-about-stat-label">مراجع</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="coach-profile-about-image-block">
                  <div className="coach-profile-about-image-wrapper">
                    <picture>
                      <source srcSet="/images/blomia-self-reflection-journey.avif" type="image/avif" />
                      <source srcSet="/images/blomia-self-reflection-journey.webp" type="image/webp" />
                      <img
                        src="/images/blomia-self-reflection-journey.png"
                        alt="Coaching Session"
                        className="coach-profile-about-image"
                        width="1024"
                        height="768"
                        loading="lazy"
                        decoding="async"
                      />
                    </picture>
                    <div className="coach-profile-about-quote">
                      <p>"تغییر از جایی آغاز می‌شود که شهامت روبرو شدن با خودت را پیدا کنی."</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Video Introduction Section */}
        {coach.videoUrl && (
          <section id="video-intro" className="coach-profile-video-section">
            <div className="coach-profile-video-container">
              <div className="coach-profile-video-header">
                <span className="coach-profile-video-label">{coach.videoTitle || 'داستان من'}</span>
                <h2 className="coach-profile-section-title">چرا کوچینگ؟</h2>
                <p className="coach-profile-video-description">
                  {coach.videoDescription || 'در این ویدیو کوتاه، داستان ورود من به دنیای کوچینگ و آنچه در جلسات تجربه خواهید کرد را بشنوید.'}
                </p>
              </div>
              
              <div 
                className="coach-profile-video-wrapper"
                onClick={() => setIsVideoModalOpen(true)}
              >
                <img 
                  src={videoCoverUrl} 
                  alt="Video Cover" 
                  className="coach-profile-video-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="coach-profile-video-play-button">
                  <div className="coach-profile-video-play-pulse">
                    <div className="coach-profile-video-play-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Packages Section */}
        {hasAnyPackagePrice && (
          <section id="packages" className="coach-profile-packages-section">
            <div className="coach-profile-packages-container">
              <div className="coach-profile-packages-header">
                <h2 className="coach-profile-section-title">مسیر همراهی</h2>
                <p className="coach-profile-section-subtitle">بسته‌های کوچینگ متناسب با نیاز و سرعت رشد شما طراحی شده‌اند.</p>
              </div>

              <div className="coach-profile-packages-list">
              {/* Session 0 - Free Intro */}
              <div className="coach-profile-package coach-profile-package-intro">
                <div className="coach-profile-package-content">
                  <div className="coach-profile-package-badge">جلسه معارفه</div>
                  <h3 className="coach-profile-package-title">جلسه صفر (آشنایی)</h3>
                  <p className="coach-profile-package-description">
                    یک گفتگوی ۳۰ دقیقه‌ای رایگان برای آشنایی با کوچ، بررسی چالش شما و اطمینان از اینکه کوچینگ بهترین مسیر برای شماست. بدون هیچ تعهدی.
                  </p>
                </div>
                <div className="coach-profile-package-action">
                  <span className="coach-profile-package-price">رایگان</span>
                  <a
                    href="#contact"
                    className="coach-profile-package-btn"
                    onClick={() => handlePackageSelect('جلسه صفر (رایگان)')}
                  >
                    رزرو جلسه صفر
                  </a>
                </div>
              </div>

              {/* Package 1 - Start */}
              {packagePrices?.start != null && (
                <div className="coach-profile-package">
                  <div className="coach-profile-package-content">
                    <div className="coach-profile-package-category">شروع مسیر</div>
                    <h3 className="coach-profile-package-title">پکیج ۴ جلسه‌ای «شروع»</h3>
                    <p className="coach-profile-package-description">
                      آغازی قدرتمند برای شفاف‌سازی مسیر. در این پکیج، اهداف خود را واضح می‌کنید، اولین گام‌های عملی را برمی‌دارید و طعم نتایج سریع را می‌چشید.
                    </p>
                  </div>
                  <div className="coach-profile-package-action">
                    <div className="coach-profile-package-price">{formatPrice(packagePrices?.start, true, 'start')}</div>
                    <a href="#contact" className="coach-profile-package-btn coach-profile-package-btn-outline">
                      درخواست پکیج
                    </a>
                  </div>
                </div>
              )}

              {/* Package 2 - Discovery (Highlighted) */}
              {packagePrices?.discovery != null && (
                <div className="coach-profile-package coach-profile-package-featured">
                  <div className="coach-profile-package-badge-featured">پیشنهاد کوچ</div>
                  <div className="coach-profile-package-content">
                    <div className="coach-profile-package-category coach-profile-package-category-light">اکتشاف عمیق</div>
                    <h3 className="coach-profile-package-title coach-profile-package-title-light">پکیج ۶ جلسه‌ای «کشف»</h3>
                    <p className="coach-profile-package-description coach-profile-package-description-light">
                      کاوشی عمیق‌تر در الگوهای ذهنی و موانع پنهان. در «کشف»، ریشه‌های چالش‌ها را شناسایی می‌کنید و با آگاهی بیشتر، انتخاب‌های هوشمندانه‌تری می‌گیرید.
                    </p>
                  </div>
                  <div className="coach-profile-package-action">
                    <div className="coach-profile-package-price">{formatPrice(packagePrices?.discovery, true, 'discovery')}</div>
                    <a href="#contact" className="coach-profile-package-btn coach-profile-package-btn-light">
                      شروع سفر کشف
                    </a>
                  </div>
                </div>
              )}

              {/* Package 3 - Transformation */}
              {packagePrices?.transformation != null && (
                <div className="coach-profile-package">
                  <div className="coach-profile-package-content">
                    <div className="coach-profile-package-category">تغییر پایدار</div>
                    <h3 className="coach-profile-package-title">پکیج ۸ جلسه‌ای «تحول»</h3>
                    <p className="coach-profile-package-description">
                      ایجاد تغییرات واقعی و پایدار در باورها و رفتارها. این پکیج برای ساختن عادت‌های جدید، بازآفرینی هویت و حرکت به سوی یک زندگی اصیل طراحی شده است.
                    </p>
                  </div>
                  <div className="coach-profile-package-action">
                    <div className="coach-profile-package-price">{formatPrice(packagePrices?.transformation, true, 'transformation')}</div>
                    <a href="#contact" className="coach-profile-package-btn coach-profile-package-btn-outline">
                      درخواست پکیج
                    </a>
                  </div>
                </div>
              )}

              {/* Package 4 - Excellence */}
              {packagePrices?.excellence != null && (
                <div className="coach-profile-package coach-profile-package-premium">
                  <div className="coach-profile-package-content">
                    <div className="coach-profile-package-category">سطح استادی</div>
                    <h3 className="coach-profile-package-title">پکیج ۱۲ جلسه‌ای «تعالی»</h3>
                    <p className="coach-profile-package-description">
                      برنامه‌ای جامع برای تثبیت دستاوردها و رسیدن به سطح استادی در مدیریت خود. در «تعالی»، شما به کوچ درونی خود تبدیل می‌شوید.
                    </p>
                  </div>
                  <div className="coach-profile-package-action">
                    <div className="coach-profile-package-price">{formatPrice(packagePrices?.excellence, true, 'excellence')}</div>
                    <a href="#contact" className="coach-profile-package-btn coach-profile-package-btn-dark">
                      درخواست پکیج
                    </a>
                  </div>
                </div>
              )}
              </div>
            </div>
          </section>
        )}

        {/* Articles Section */}
        {!postsLoading && coachPosts.length > 0 && (
          <section id="articles" className="coach-profile-articles-section">
            <div className="coach-profile-articles-container">
              <h2 className="coach-profile-section-title">آخرین مقالات</h2>
              <div className="coach-profile-articles-grid">
                {coachPosts.map((post) => {
                  const postImage = post.imageCandidates?.[0] || post.imageUrl || 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800&auto=format&fit=crop';

                  return (
                    <a key={post.id} href={post.slug ? `/blog/${post.slug}` : '/blog'} className="coach-profile-article-card">
                      <div className="coach-profile-article-image-wrapper">
                        <img 
                          src={postImage}
                          alt={post.title}
                          className="coach-profile-article-image"
                          onError={(event) => handleImageFallback(event, post.imageCandidates)}
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <div className="coach-profile-article-content">
                        {post.category && (
                          <span className="coach-profile-article-category">{post.category}</span>
                        )}
                        <h3 className="coach-profile-article-title">
                          {post.title}
                          {post.readTimeMinutes && (
                            <span className="coach-profile-article-read-time"> · {post.readTimeMinutes} دقیقه</span>
                          )}
                        </h3>
                        {post.excerpt && (
                          <p className="coach-profile-article-description">{post.excerpt}</p>
                        )}
                      </div>
                    </a>
                  );
                })}
              </div>
              <div className="coach-profile-articles-footer">
                <a href="/blog" className="coach-profile-articles-link">
                  مشاهده همه مطالب
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                </a>
              </div>
            </div>
          </section>
        )}

        {/* Testimonials Section */}
        <section className="coach-profile-testimonials-section">
          <div className="coach-profile-testimonials-container">
            <div className="coach-profile-testimonials-quote-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor" opacity="0.2">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>
            </div>
            <div className="coach-profile-testimonials-grid">
              <div className="coach-profile-testimonial-card">
                <p className="coach-profile-testimonial-text">
                  "جلسات با {coach.name} نقطه عطفی در زندگی کاری من بود. من توانستم با ترس‌هایم روبرو شوم و کسب‌وکار خودم را استارت بزنم. بدون حمایت او این مسیر ممکن نبود."
                </p>
                <div className="coach-profile-testimonial-author">
                  <div className="coach-profile-testimonial-avatar">م</div>
                  <div>
                    <span className="coach-profile-testimonial-name">مینا احمدی</span>
                    <span className="coach-profile-testimonial-role">مدیر محصول</span>
                  </div>
                </div>
              </div>
              <div className="coach-profile-testimonial-card">
                <p className="coach-profile-testimonial-text">
                  "پکیج «کشف» به من کمک کرد الگوهای تکراری شکست در روابطم را پیدا کنم. حالا با آگاهی تصمیم می‌گیرم و احساس آزادی بیشتری دارم."
                </p>
                <div className="coach-profile-testimonial-author">
                  <div className="coach-profile-testimonial-avatar">ع</div>
                  <div>
                    <span className="coach-profile-testimonial-name">علی رضایی</span>
                    <span className="coach-profile-testimonial-role">معمار</span>
                  </div>
                </div>
              </div>
              <div className="coach-profile-testimonial-card">
                <p className="coach-profile-testimonial-text">
                  "آرامش و حضور {coach.name} در جلسات مثال‌زدنی است. او هیچوقت قضاوت نمی‌کند و فضایی امن می‌سازد که می‌توانم خودم باشم."
                </p>
                <div className="coach-profile-testimonial-author">
                  <div className="coach-profile-testimonial-avatar">س</div>
                  <div>
                    <span className="coach-profile-testimonial-name">سارا کبیری</span>
                    <span className="coach-profile-testimonial-role">فریلنسر</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact / Booking Section */}
        <section id="contact" className="coach-profile-contact-section">
          <div className="coach-profile-contact-container">
            <div className="coach-profile-contact-header">
              <h2 className="coach-profile-section-title">آماده تغییر هستید؟</h2>
              <p className="coach-profile-contact-description">
                فرم زیر را پر کنید تا برای هماهنگی جلسه صفر یا شروع پکیج‌ها با شما تماس بگیریم.
              </p>
            </div>

            <form className="coach-profile-contact-form" onSubmit={async (event) => {
              event.preventDefault();
              if (formData.company && formData.company.trim() !== '') {
                return;
              }
              if (isSubmitting) {
                return;
              }
              setIsSubmitting(true);
              setFormStatus({ status: 'loading', message: '' });

              const payload = {
                coach_id: coach.id,
                coach_name: coach.name,
                full_name: formData.fullName.trim(),
                phone: formData.phone.trim(),
                selected_package: formData.selectedPackage,
                message: formData.message.trim() || null,
                company: formData.company.trim()
              };

              let responseData = null;

              try {
                const { data, error: invokeError } = await supabase
                  .functions
                  .invoke('submit_coaching_form', {
                    body: payload
                  });

                responseData = data;

                if (invokeError) {
                  throw invokeError;
                }

                setFormStatus({
                  status: 'success',
                  message: 'درخواست شما با موفقیت ثبت شد. به زودی با شما تماس می‌گیریم.'
                });
                setFormData({
                  fullName: '',
                  phone: '',
                  selectedPackage: 'جلسه صفر (رایگان)',
                  message: '',
                  company: ''
                });
              } catch (submitError) {
                const status = submitError?.status;
                const fallbackMessage = responseData?.error || 'خطا در ارسال درخواست. لطفاً دوباره تلاش کنید.';
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
            }}>
              <div className="coach-profile-contact-form-grid">
                <div>
                  <label className="coach-profile-form-label">نام و نام خانوادگی</label>
                  <input 
                    type="text" 
                    className="coach-profile-form-input" 
                    placeholder="مثال: رضا محمدی"
                    value={formData.fullName}
                    onChange={(event) => {
                      const value = event.target.value.replace(/[^\u0600-\u06FFa-zA-Z\s]/g, '');
                      setFormData((prev) => ({ ...prev, fullName: value }));
                    }}
                    minLength={3}
                    title="نام باید حداقل ۳ حرف باشد"
                    required
                  />
                </div>
                <div>
                  <label className="coach-profile-form-label">شماره تماس</label>
                  <input 
                    type="tel" 
                    className={`coach-profile-form-input ${phoneError ? 'coach-profile-form-input-error' : ''}`}
                    placeholder="09123456789"
                    value={formData.phone}
                    onChange={(event) => {
                      const value = event.target.value.replace(/[^0-9]/g, '');
                      if (value.length <= 11) {
                        setFormData((prev) => ({ ...prev, phone: value }));
                        // Check format only if user has typed something
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
                    required
                  />
                  {phoneError && (
                    <span className="coach-profile-form-error-text">
                      شماره موبایل باید با 09 شروع شود و 11 رقم باشد
                    </span>
                  )}
                </div>
              </div>
              
              <div>
                <label className="coach-profile-form-label">انتخاب پکیج</label>
                <select
                  className="coach-profile-form-input"
                  value={formData.selectedPackage}
                  onChange={(event) => setFormData((prev) => ({ ...prev, selectedPackage: event.target.value }))}
                >
                  <option>جلسه صفر (رایگان)</option>
                  {packagePrices?.start != null && <option>پکیج ۴ جلسه‌ای «شروع»</option>}
                  {packagePrices?.discovery != null && <option>پکیج ۶ جلسه‌ای «کشف»</option>}
                  {packagePrices?.transformation != null && <option>پکیج ۸ جلسه‌ای «تحول»</option>}
                  {packagePrices?.excellence != null && <option>پکیج ۱۲ جلسه‌ای «تعالی»</option>}
                  <option>سایر / سوال عمومی</option>
                </select>
              </div>

              <div>
                <label className="coach-profile-form-label">
                  پیام شما (اختیاری)
                  <span style={{ fontSize: '0.75rem', color: '#6B6B6B', marginRight: '8px' }}>
                    ({formData.message.length}/500)
                  </span>
                </label>
                <textarea 
                  rows="4" 
                  className="coach-profile-form-input coach-profile-form-textarea" 
                  placeholder="مختصری از چالش فعلی خود بنویسید..."
                  value={formData.message}
                  onChange={(event) => {
                    const value = event.target.value;
                    if (value.length <= 500) {
                      setFormData((prev) => ({ ...prev, message: value }));
                    }
                  }}
                  maxLength={500}
                />
              </div>

              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                style={{ display: 'none' }}
                value={formData.company}
                onChange={(event) => setFormData((prev) => ({ ...prev, company: event.target.value }))}
              />

              {formStatus.status !== 'idle' && (
                <div className={`coach-profile-form-message coach-profile-form-message-${formStatus.status}`}>
                  {formStatus.message}
                </div>
              )}

              <button type="submit" className="coach-profile-form-submit" disabled={isSubmitting}>
                {isSubmitting ? 'در حال ارسال...' : 'ارسال درخواست'}
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />

      {/* Video Modal */}
      {isVideoModalOpen && coach.videoUrl && (
        <div 
          className="coach-profile-modal-overlay"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div 
            className="coach-profile-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="coach-profile-modal-close"
              onClick={() => setIsVideoModalOpen(false)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div className="coach-profile-modal-video">
              <iframe
                src={coach.videoUrl}
                title="Video Introduction"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoachProfile;
