import React, { useState, useEffect } from 'react'

import Script from 'dangerous-html/react'
import { Helmet } from 'react-helmet'

import Navigation from '../components/navigation'
import Footer from '../components/footer'
import { useRandomCoaches } from '../hooks/useCoaches'
import { useLatestPosts } from '../hooks/usePosts'
import './home.css'

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

const getOptimizedSources = (pngPath) => {
  if (!pngPath || !pngPath.endsWith('.png')) return null;
  const basePath = pngPath.slice(0, -4);
  return {
    avif: `${basePath}.avif`,
    webp: `${basePath}.webp`
  };
};

const Home = (props) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [seoExpanded, setSeoExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const totalSlides = 2; // 4 نظر، هر بار 3 تا نمایش، 2 اسلاید
  const totalSlidesMobile = 4; // در موبایل هر نظر یک اسلاید
  const statsBackground = `image-set(url(${process.env.PUBLIC_URL}/images/bloomia-stats-background-vision.avif) type("image/avif"), url(${process.env.PUBLIC_URL}/images/bloomia-stats-background-vision.webp) type("image/webp"), url(${process.env.PUBLIC_URL}/images/bloomia-stats-background-vision.png) type("image/png"))`;
  
  // دریافت مربیان از دیتابیس
  const { coaches, loading: coachesLoading, error: coachesError } = useRandomCoaches(6);
  const { posts, loading: postsLoading, error: postsError } = useLatestPosts(4);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 767);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const maxSlides = isMobile ? totalSlidesMobile : totalSlides;
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % maxSlides);
    }, 5000);
    return () => clearInterval(interval);
  }, [isMobile]);

  const testimonials = [
    {
      text: "همیشه فکر می‌کردم کوچینگ فقط برای مدیران است، اما در بلومیا یاد گرفتم چطور بین نقش مادری و علایق شخصی‌ام تعادل ایجاد کنم. حالا با وضوح بیشتری برای آینده‌ام برنامه‌ریزی می‌کنم و آن احساس فرسودگی همیشگی جای خود را به انگیزه داده است.",
      avatar: "/images/comment-image/somayeh-rezaee.png",
      name: "سمیه رضایی",
      title: "خانه‌دار و فعال داوطلبانه"
    },
    {
      text: "در دوران اوج فشار کاری و تردید در تصمیم‌گیری‌های کلان، جلسات کوچینگ بلومیا برای من مثل یک قطب‌نما عمل کرد. توانستم اولویت‌های استراتژیک بیزنس را شفاف کنم و از سد ترس‌هایی که مانع رشد تیمم بود عبور کنم. نگاه حرفه‌ای کوچ‌های این مجموعه بی‌نظیر است.",
      avatar: "/images/comment-image/arash-ghanbari.png",
      name: "آرش قنبری",
      title: "کارآفرین و مدیر استارتاپ"
    },
    {
      text: "به عنوان زنی که کسب‌وکار خودش را دارد، همیشه با نادیده گرفتن توانمندی‌هایم کلنجار می‌رفتم. کوچینگ در بلومیا به من کمک کرد تا سندروم ایمپاستر را کنار بگذارم و با اعتمادبه‌نفس برای توسعه برندم اقدام کنم. نتیجه این جلسات، رشد ۳۰ درصدی فروش من در ۶ ماه بود.",
      avatar: "/images/comment-image/maryam-ebrahimi.png",
      name: "مریم ابراهیمی",
      title: "کارآفرین حوزه صنایع دستی"
    },
    {
      text: "بزرگترین چالش من عدم تمرکز و پراکندگی اهدافم بود. در بلومیا مربی‌ای را پیدا کردم که دنیای من را می‌فهمید. با کمک او توانستم ساختار روزانه‌ام را بازسازی کنم و حالا با استرس کمتر، خروجی‌های بسیار باکیفیت‌تری در پروژه‌هایم دارم.",
      avatar: "/images/comment-image/alireza-shayan.png",
      name: "علیرضا شایان",
      title: "فریلنسر و متخصص تکنولوژی"
    }
  ];

  return (
    <div className="home-container1">
      <Helmet>
        <title>بلومیا | پلتفرم خدمات کوچینگ و رشد فردی</title>
        <meta name="description" content="بلومیا پلتفرم خدمات کوچینگ است؛ کوچ‌های متخصص را با مراجعین متصل می‌کند تا مسیر رشد فردی و حرفه‌ای را ساده‌تر کنید. اولین جلسه رایگان!" />
        <meta name="keywords" content="کوچینگ، رشد فردی، کوچینگ مدیریتی، رشد حرفه‌ای، جلسه کوچینگ" />
        <link rel="canonical" href="https://bloomiaclub.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="بلومیا | پلتفرم خدمات کوچینگ و رشد فردی" />
        <meta property="og:description" content="با کوچ‌های متخصص بلومیا، مسیر تغییر خود را از همین امروز شفاف کنید. اولین جلسه رایگان!" />
        <meta property="og:url" content="https://bloomiaclub.com/" />
        <meta property="og:image" content="https://bloomiaclub.com/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="fa_IR" />
        <meta property="og:site_name" content="بلومیا" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="بلومیا | پلتفرم خدمات کوچینگ" />
        <meta property="twitter:description" content="با کوچ‌های متخصص بلومیا، مسیر تغییر خود را از همین امروز شفاف کنید." />
        <meta property="twitter:image" content="https://bloomiaclub.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="بلومیا | پلتفرم خدمات کوچینگ" />
        <meta name="twitter:description" content="با کوچ‌های متخصص بلومیا، مسیر تغییر خود را از همین امروز شفاف کنید." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "بلومیا | پلتفرم خدمات کوچینگ",
            "url": "https://bloomiaclub.com/",
            "description": "بلومیا پلتفرم خدمات کوچینگ است؛ کوچ‌های متخصص را با مراجعین متصل می‌کند",
            "inLanguage": "fa-IR",
            "mainEntity": {
              "@type": "Organization",
              "name": "بلومیا",
              "url": "https://bloomiaclub.com",
              "logo": "https://bloomiaclub.com/logo.png"
            }
          })}
        </script>
      </Helmet>
      <Navigation></Navigation>
      <div className="home-container2">
        <div className="home-container3">
          <Script
            html={`<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
@media (prefers-reduced-motion: reduce) {
* {
  animation-duration: 0.01ms !important;
  animation-iteration-count: 1 !important;
  transition-duration: 0.01ms !important;
}
}
</style>`}
          ></Script>
        </div>
      </div>
      <section className="hero-section">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/videos/personal-development-coaching-session-hero-video-poster.webp"
          src="/videos/personal-development-coaching-session-hero-video.mp4"
          className="hero-video hero-video-desktop"
        ></video>
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/videos/personal-development-coaching-session-mobile-hero-video-poster.webp"
          src="/videos/personal-development-coaching-session-mobile-hero-video.mp4"
          className="hero-video hero-video-mobile"
        ></video>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-text-container">
            <h1 className="home-hero-title hero-title">
              فاصله شما تا هدف، فقط یک گفتگوی آگاهانه است
            </h1>
            <p className="home-hero-subtitle hero-subtitle">
              با همراهی کوچ‌های متخصص بلومیا، مسیر تغییر را از همین امروز شفاف کنید.
            </p>
            <a href="/coaching/free-intro-session" className="btn btn-primary btn-lg hero-cta-pulse">رزرو جلسه صفر (رایگان)</a>
            <div className="hero-trust-badges">
              <div className="hero-badge">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="hero-badge-icon"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <path d="M3 8h18v13H3zM20 8v-.8c0-2.8-3.5-5.2-8-5.2S4 4.4 4 7.2V8"></path>
                    <path d="M12 8v13M12 3v5"></path>
                  </g>
                </svg>
                <span>اولین جلسه رایگان</span>
              </div>
              <div className="hero-badge">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="hero-badge-icon"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <path d="M12 6v6l4 2"></path>
                    <circle cx="12" cy="12" r="10"></circle>
                  </g>
                </svg>
                <span>رزرو سریع آنلاین</span>
              </div>
              <div className="hero-badge">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="hero-badge-icon"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M16 3.128a4 4 0 0 1 0 7.744M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                  </g>
                </svg>
                <span>مربیان تاییدشده</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="features-section">
        <div className="features-container">
          <div className="features-content">
            <div className="features-text-block">
              <h2 className="section-title">رزرو هوشمند؛ کوتاه‌ترین مسیر به جلسه معارفه</h2>
              <p className="section-content booking-description">
                با دستیار هوشمند بلومیا، در کمتر از ۳ دقیقه کوچ متخصص خود را پیدا کنید.
                زمان‌های آزاد را ببینید و بدون نیاز به پرداخت، اولین جلسه خود را رزرو کنید.
                ما مسیر را برای شروع تغییر شما هموار کرده‌ایم.
              </p>
              <div className="features-list">
                <div className="features-list-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="features-icon"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    >
                      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                      <path d="m9 12l2 2l4-4"></path>
                    </g>
                  </svg>
                  <div className="features-list-text">
                    <h3 className="features-list-title">انتخاب بر اساس هدف</h3>
                    <p className="features-list-description booking-description">
                      چه به دنبال رشد شغلی باشید و چه تعادل در زندگی، ما شما را به متخصص همان حوزه متصل می‌کنیم.
                    </p>
                  </div>
                </div>
                <div className="features-list-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="features-icon"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    >
                      <path d="M8 2v4m8-4v4"></path>
                      <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                      <path d="M3 10h18"></path>
                    </g>
                  </svg>
                  <div className="features-list-text">
                    <h3 className="features-list-title">
                      هماهنگی آنی با تقویم شما
                    </h3>
                    <p className="features-list-description booking-description">
                      زمان‌های خالی کوچ‌ها را به صورت زنده ببینید و بدون رفت‌وبرگشت پیام، ساعت دلخواهتان را رزرو کنید.
                    </p>
                  </div>
                </div>
                <div className="features-list-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="features-icon"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20 6L9 17l-5-5"
                    ></path>
                  </svg>
                  <div className="features-list-text">
                    <h3 className="features-list-title">رزرو قطعی در چند لحظه</h3>
                    <p className="features-list-description booking-description">
                      بلافاصله پس از انتخاب، لینک جلسه برای شما ارسال می‌شود. همه چیز برای یک شروع حرفه‌ای آماده است.
                    </p>
                  </div>
                </div>
              </div>
              <a href="/coaching/free-intro-session" className="btn btn-primary" style={{ alignSelf: 'center' }}>همین حالا اولین جلسه را رایگان رزرو کنید</a>
            </div>
            <div className="features-image-block">
              <div className="features-image-wrapper">
                <picture>
                  <source srcSet="/images/the-modern-professional-coach.avif" type="image/avif" />
                  <source srcSet="/images/the-modern-professional-coach.webp" type="image/webp" />
                  <img
                    src="/images/the-modern-professional-coach.png"
                    alt="کوچ حرفه‌ای مدرن"
                    className="features-image"
                    width="768"
                    height="1152"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
                <div className="features-floating-card">
                  <div className="features-floating-header">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      className="features-floating-icon"
                    >
                      <g
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      >
                        <path d="M8 2v4m8-4v4"></path>
                        <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                        <path d="M3 10h18"></path>
                      </g>
                    </svg>
                    <span className="features-floating-title">رزرو سریع</span>
                  </div>
                  <p className="features-floating-text">
                    زمان جلسه: امروز ۱۶:۰۰
                  </p>
                  <div className="features-floating-progress">
                    <div className="features-floating-progress-bar"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="team-section">
        <div className="team-header">
          <h2 className="section-title">با مربیان بلومیا، هوشمندانه‌تر رشد کنید</h2>
          <p className="section-subtitle">
            دسترسی به تیمی از خبره‌ترین کوچ‌های ایران برای تحول در زندگی شخصی و حرفه‌ای.
          </p>
        </div>
        <div className="team-grid">
          {coachesLoading ? (
            <div className="team-loading">در حال بارگذاری...</div>
          ) : coachesError ? (
            <div className="team-error">خطا در بارگذاری مربیان</div>
          ) : (
            coaches.map((coach) => {
              const supabaseImageUrl = coach.imageUrl
                ? coach.imageUrl.startsWith('http')
                  ? coach.imageUrl
                  : `https://qxacvupalbfcoqkuydba.supabase.co/storage/v1/object/public/coaches_images/${coach.imageUrl}`
                : 'https://images.pexels.com/photos/4427610/pexels-photo-4427610.jpeg?auto=compress&cs=tinysrgb&w=1500';

              return (
                <div className="team-card" key={coach.id}>
                  <div className="team-image-wrapper">
                    <img
                      src={supabaseImageUrl}
                      alt={coach.name}
                      className="team-image"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="team-content">
                    <h3 className="team-name">{coach.name}</h3>
                    <p className="team-specialty">{coach.title}</p>
                    <p className="team-bio">{coach.description}</p>
                    <div className="team-stats">
                      {coach.rating != null && (
                        <div className="team-stat">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            className="team-stat-icon"
                          >
                            <path
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z"
                            ></path>
                          </svg>
                          <span>{`${Number(coach.rating).toLocaleString('fa-IR')}/۵`}</span>
                        </div>
                      )}
                      {coach.totalSessions && (
                        <div className="team-stat">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            className="team-stat-icon"
                          ></svg>
                          <span>{coach.totalSessions}+ جلسه</span>
                        </div>
                      )}
                    </div>
                    <a href={`/coaches/${coach.slug}`} className="btn btn-outline">مشاهده پروفایل</a>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <div style={{ textAlign: 'center', marginTop: 'var(--spacing-2xl)' }}>
          <a href="/coaches" className="btn btn-outline btn-lg">
            مشاهده همه کوچ‌ها
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}>
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </a>
        </div>
      </section>
      <section className="process-section">
        <div className="process-container">
          <div className="process-header">
            <h2 className="section-title">چگونه در بلومیا شروع کنیم؟</h2>
            <p className="section-subtitle">
              فرآیند ساده و سریع رزرو جلسه کوچینگ در ۴ مرحله
            </p>
          </div>
          <div className="process-steps">
            <div className="process-step">
              <div className="process-step-number">
                <span>۱</span>
              </div>
              <div className="process-step-icon-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  className="process-step-icon"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <path d="m21 21l-4.34-4.34"></path>
                    <circle cx="11" cy="11" r="8"></circle>
                  </g>
                </svg>
              </div>
              <h3 className="process-step-title">جستجوی مربی</h3>
              <p className="process-step-description">
                با فیلترهای هوشمند مربی متناسب با نیاز و هدف خود را پیدا کنید
              </p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              className="process-arrow"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h14m-7-7l7 7l-7 7"
              ></path>
            </svg>
            <div className="process-step">
              <div className="process-step-number">
                <span>۲</span>
              </div>
              <div className="process-step-icon-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  className="process-step-icon"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M16 3.128a4 4 0 0 1 0 7.744M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                  </g>
                </svg>
              </div>
              <h3 className="process-step-title">انتخاب زمان</h3>
              <p className="process-step-description">
                تقویم مربی را مشاهده و بهترین زمان برای خود را انتخاب کنید
              </p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              className="process-arrow"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h14m-7-7l7 7l-7 7"
              ></path>
            </svg>
            <div className="process-step">
              <div className="process-step-number">
                <span>۳</span>
              </div>
              <div className="process-step-icon-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  className="process-step-icon"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 6L9 17l-5-5"
                  ></path>
                </svg>
              </div>
              <h3 className="process-step-title">پرداخت امن</h3>
              <p className="process-step-description">
                پرداخت آنلاین با درگاه امن و دریافت تایید فوری
              </p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              className="process-arrow"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h14m-7-7l7 7l-7 7"
              ></path>
            </svg>
            <div className="process-step">
              <div className="process-step-number">
                <span>۴</span>
              </div>
              <div className="process-step-icon-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  className="process-step-icon"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <path d="M12 6v6l4 2"></path>
                    <circle cx="12" cy="12" r="10"></circle>
                  </g>
                </svg>
              </div>
              <h3 className="process-step-title">شرکت در جلسه</h3>
              <p className="process-step-description">
                در زمان مشخص شده به جلسه آنلاین بپیوندید و رشد کنید
              </p>
            </div>
          </div>
          <div className="process-cta">
            <button className="btn btn-primary btn-lg">
              همین الان شروع کنید
            </button>
          </div>
        </div>
      </section>
      <section className="testimonials-section">
        <div className="testimonials-header">
          <h2 className="section-title">روایت‌های تغییر</h2>
          <p className="section-subtitle">
            ببینید مراجعین ما چطور پتانسیل‌های خود را به واقعیت تبدیل کرده‌اند.
          </p>
        </div>
        <div className="testimonials-container">
          <div 
            className="testimonials-rail"
            style={{ 
              transform: isMobile 
                ? `translateX(${currentTestimonial * 100}%)` 
                : `translateX(calc(${currentTestimonial * 33.333}% + ${currentTestimonial} * var(--spacing-2xl)))` 
            }}
          >
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="testimonials-card"
              >
                <div className="testimonials-quote-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2a1 1 0 0 1 1 1v1a2 2 0 0 1-2 2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1a6 6 0 0 0 6-6V5a2 2 0 0 0-2-2zM5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2a1 1 0 0 1 1 1v1a2 2 0 0 1-2 2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1a6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"
                    ></path>
                  </svg>
                </div>
                <p className="testimonials-text">
                  {testimonial.text}
                </p>
                <div className="testimonials-author">
                  {(() => {
                    const sources = getOptimizedSources(testimonial.avatar);
                    if (!sources) {
                      return (
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="testimonials-avatar"
                          width="200"
                          height="200"
                          loading="lazy"
                          decoding="async"
                        />
                      );
                    }

                    return (
                      <picture>
                        <source srcSet={sources.avif} type="image/avif" />
                        <source srcSet={sources.webp} type="image/webp" />
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="testimonials-avatar"
                          width="200"
                          height="200"
                          loading="lazy"
                          decoding="async"
                        />
                      </picture>
                    );
                  })()}
                  <div className="testimonials-author-info">
                    <div className="testimonials-author-name">
                      <span>{testimonial.name}</span>
                    </div>
                    <div className="testimonials-author-title">
                      <span>{testimonial.title}</span>
                    </div>
                  </div>
                </div>
                <div className="testimonials-rating">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z"></path>
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="testimonials-dots">
            {(isMobile ? [0, 1, 2, 3] : [0, 1]).map((index) => (
              <button
                key={index}
                className={`testimonials-dot ${index === currentTestimonial ? 'active' : ''}`}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="stats-section" style={{ backgroundImage: statsBackground }}>
        <div className="stats-overlay"></div>
        <div className="stats-content">
          <div className="stats-header">
            <h2 className="section-title">بلومیا؛ استانداردی نو در کوچینگ</h2>
            <p className="section-subtitle">
              تعهد ما، ارائه خدماتی باکیفیت و تخصصی برای شکوفایی پتانسیل‌های شماست.
            </p>
          </div>
          <div className="stats-grid">
            <div className="stats-card">
              <div className="stats-icon-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  className="stats-icon"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <path d="m9 11l3 3L22 4"></path>
                  </g>
                </svg>
              </div>
              <div className="stats-number">
                <span>۱۰۰٪</span>
              </div>
              <div className="stats-label">
                <span>تخصص محور</span>
              </div>
              <p className="stats-description">
                تمامی مربیان بلومیا دارای گواهینامه‌های معتبر بین‌المللی و صلاحیت‌های حرفه‌ای هستند.
              </p>
            </div>
            <div className="stats-card">
              <div className="stats-icon-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  className="stats-icon"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <path d="M3 6h18"></path>
                    <path d="M7 12h10"></path>
                    <path d="M10 18h4"></path>
                  </g>
                </svg>
              </div>
              <div className="stats-number">
                <span>انتخاب هوشمندانه</span>
              </div>
              <div className="stats-label">
                <span>فیلتر سخت‌گیرانه مربی</span>
              </div>
              <p className="stats-description">
                مربیان ما از میان ده‌ها متخصص و پس از گذراندن استانداردهای کیفی بلومیا انتخاب شده‌اند.
              </p>
            </div>
            <div className="stats-card">
              <div className="stats-icon-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  className="stats-icon"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                    <line x1="9" y1="9" x2="9.01" y2="9"></line>
                    <line x1="15" y1="9" x2="15.01" y2="9"></line>
                  </g>
                </svg>
              </div>
              <div className="stats-number">
                <span>تضمین کیفیت</span>
              </div>
              <div className="stats-label">
                <span>تمرکز بر رضایت</span>
              </div>
              <p className="stats-description">
                هدف ما خلق تجربه‌ای است که در آن هر جلسه، گامی ملموس به سمت هدف شما باشد.
              </p>
            </div>
            <div className="stats-card">
              <div className="stats-icon-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  className="stats-icon"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                    <path d="M12 8v4"></path>
                    <path d="M12 16h.01"></path>
                  </g>
                </svg>
              </div>
              <div className="stats-number">
                <span>امنیت کامل</span>
              </div>
              <div className="stats-label">
                <span>حریم خصوصی و محرمانگی</span>
              </div>
              <p className="stats-description">
                تمامی جلسات در محیطی کاملاً امن و با رعایت بالاترین استانداردهای اخلاقی برگزار می‌شوند.
              </p>
            </div>
            <div className="stats-card">
              <div className="stats-icon-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  className="stats-icon"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <path d="M12 6v6l4 2"></path>
                    <circle cx="12" cy="12" r="10"></circle>
                  </g>
                </svg>
              </div>
              <div className="stats-number">
                <span>۲ دقیقه</span>
              </div>
              <div className="stats-label">
                <span>تا شروع</span>
              </div>
              <p className="stats-description">
                فرآیند جستجو و رزرو جلسه معارفه در بلومیا ساده، سریع و کاملاً بهینه‌سازی شده است.
              </p>
            </div>
            <div className="stats-card">
              <div className="stats-icon-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  className="stats-icon"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </g>
                </svg>
              </div>
              <div className="stats-number">
                <span>نتیجه‌گرا</span>
              </div>
              <div className="stats-label">
                <span>کوچینگِ هدفمند</span>
              </div>
              <p className="stats-description">
                تمرکز ما روی خروجی‌های واقعی است؛ ما شما را تا رسیدن به وضوح در تصمیم‌گیری همراهی می‌کنیم.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="blog-section">
        <div className="blog-container">
          <div className="blog-header">
            <div className="blog-header-content">
              <h2 className="section-title">آخرین مطالب</h2>
              <p className="section-subtitle">
                مقالات، راهنماها و نکات کاربردی در مسیر رشد فردی و حرفه‌ای
              </p>
            </div>
            <a href="/blog" className="btn btn-secondary blog-view-all blog-view-all-top">
              مشاهده همه مطالب
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </a>
          </div>
          <div className="blog-grid">
            {postsLoading ? (
              <div className="blog-loading">در حال بارگذاری...</div>
            ) : postsError ? (
              <div className="blog-loading">خطا در دریافت مقالات.</div>
            ) : posts.length === 0 ? (
              <div className="blog-loading">مقاله‌ای یافت نشد.</div>
            ) : (
              posts.slice(0, isMobile ? 3 : 4).map((post, index) => {
                const postImage = post.imageCandidates?.[0] || post.imageUrl || 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=1200&auto=format&fit=crop';
                const authorAvatar = post.authorAvatar || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop';

                const dateLabel = post.createdAt
                  ? new Date(post.createdAt).toLocaleDateString('fa-IR')
                  : null;

                return (
                  <article key={post.id} className="blog-card">
                    <div className="blog-card-image">
                      <img
                        src={postImage}
                        alt={post.title}
                        onError={(event) => handleImageFallback(event, post.imageCandidates)}
                        loading="lazy"
                        decoding="async"
                      />
                      {post.category && <div className="blog-card-category">{post.category}</div>}
                    </div>
                    <div className="blog-card-content">
                      <div className="blog-card-meta">
                        {dateLabel && <span className="blog-date">{dateLabel}</span>}
                      </div>
                      <h3 className="blog-card-title">
                        {post.title}
                        {post.readTimeMinutes && (
                          <span className="blog-read-time-inline"> · {post.readTimeMinutes} دقیقه</span>
                        )}
                      </h3>
                      {post.excerpt && (
                        <p className="blog-card-excerpt">{post.excerpt}</p>
                      )}
                      <div className="blog-card-footer">
                        {post.authorName && (
                          <div className="blog-author">
                            <img
                              src={authorAvatar}
                              alt={post.authorName}
                              className="blog-author-avatar"
                              loading="lazy"
                              decoding="async"
                            />
                            <span>{post.authorName}</span>
                          </div>
                        )}
                        <a href={post.slug ? `/blog/${post.slug}` : '/blog'} className="blog-read-more">
                          ادامه مطلب
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7"/>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </div>
          <div className="blog-footer">
            <a href="/blog" className="btn btn-secondary blog-view-all">
              مشاهده همه مطالب
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-header">
            <h2 className="section-title">
              به شبکه بزرگ شکوفایی بلومیا بپیوندید
            </h2>
            <p className="section-subtitle">
              فضایی پویا برای یادگیری، هم‌افزایی و اشتراک تجربیات در مسیر موفقیت
            </p>
          </div>
          <div className="cta-columns">
            <div className="cta-column">
              <div className="cta-icon-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  className="cta-icon"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="5" r="3"></circle>
                    <circle cx="5" cy="19" r="3"></circle>
                    <circle cx="19" cy="19" r="3"></circle>
                    <path d="M12 8v4m-4 4l2.5-4m5.5 4l-2.5-4"></path>
                  </g>
                </svg>
              </div>
              <h3 className="cta-column-title">تعامل و هم‌افزایی</h3>
              <p className="cta-column-description">
                عضویت در جامعه‌ای از افراد هم‌فکر و متخصص؛ جایی برای اشتراک دانش و دریافت حمایت در چالش‌های مسیر رشد.
              </p>
              <ul className="cta-list">
                <li className="cta-list-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    className="cta-list-icon"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20 6L9 17l-5-5"
                    ></path>
                  </svg>
                  <span>گروه‌های تخصصی بر اساس اهداف (شغلی، فردی،...)</span>
                </li>
                <li className="cta-list-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    className="cta-list-icon"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20 6L9 17l-5-5"
                    ></path>
                  </svg>
                  <span>رویدادهای شبکه‌سازی آنلاین ماهانه</span>
                </li>
                <li className="cta-list-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    className="cta-list-icon"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20 6L9 17l-5-5"
                    ></path>
                  </svg>
                  <span>اتاق‌های گفتگو و پرسش‌وپاسخ</span>
                </li>
              </ul>
              <button className="btn btn-primary">عضویت در انجمن</button>
            </div>
            <div className="cta-column">
              <div className="cta-icon-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  className="cta-icon"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                    <path d="M8 7h6m-6 4h8"></path>
                  </g>
                </svg>
              </div>
              <h3 className="cta-column-title">منابع رشد حرفه‌ای</h3>
              <p className="cta-column-description">
                دسترسی نامحدود به کتابخانه محتوایی بلومیا، شامل جدیدترین متدهای توسعه فردی و مدیریت زندگی.
              </p>
              <ul className="cta-list">
                <li className="cta-list-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    className="cta-list-icon"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20 6L9 17l-5-5"
                    ></path>
                  </svg>
                  <span>وبینارها و کارگاه‌های تخصصی</span>
                </li>
                <li className="cta-list-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    className="cta-list-icon"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20 6L9 17l-5-5"
                    ></path>
                  </svg>
                  <span>خلاصه کتاب‌ها و منابع دیجیتال کاربردی</span>
                </li>
                <li className="cta-list-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    className="cta-list-icon"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20 6L9 17l-5-5"
                    ></path>
                  </svg>
                  <span>پادکست‌های اختصاصی بلومیا</span>
                </li>
              </ul>
              <button className="btn btn-secondary">کاوش در محتوا</button>
            </div>
            <div className="cta-column">
              <div className="cta-icon-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  className="cta-icon"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <rect x="2" y="4" width="6" height="6" rx="1"></rect>
                    <rect x="16" y="4" width="6" height="6" rx="1"></rect>
                    <rect x="9" y="14" width="6" height="6" rx="1"></rect>
                    <path d="M5 10v4m0 0a2 2 0 0 0 2 2h2m10-6v4m0 0a2 2 0 0 1-2 2h-2"></path>
                  </g>
                </svg>
              </div>
              <h3 className="cta-column-title">شبکه ارتباطات ارزشمند</h3>
              <p className="cta-column-description">
                ارتباط مستقیم با افراد موفق و الهام‌بخش؛ اینجا مسیری است که در آن «همتایان» به رشد یکدیگر کمک می‌کنند.
              </p>
              <ul className="cta-list">
                <li className="cta-list-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    className="cta-list-icon"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20 6L9 17l-5-5"
                    ></path>
                  </svg>
                  <span>ارتباط با متخصصان حوزه‌های مختلف</span>
                </li>
                <li className="cta-list-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    className="cta-list-icon"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20 6L9 17l-5-5"
                    ></path>
                  </svg>
                  <span>فرصت‌های همکاری در پروژه‌های مشترک</span>
                </li>
                <li className="cta-list-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    className="cta-list-icon"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20 6L9 17l-5-5"
                    ></path>
                  </svg>
                  <span>سیستم مربی‌گری همتا به همتا (Peer Coaching)</span>
                </li>
              </ul>
              <button className="btn btn-accent">پیوستن به شبکه</button>
            </div>
          </div>
        </div>
      </section>
      <div className="home-container4">
        <div className="home-container5">
          <Script
            html={`<style>
        @keyframes floatCard {0%,100% {transform: translateY(0);}
50% {transform: translateY(-10px);}}@keyframes progressGrow {from {width: 0;}
to {width: 75%;}}
        </style> `}
          ></Script>
        </div>
      </div>
      <div className="home-container6">
        <div className="home-container7">
          <Script
            html={`<script defer data-name="scroll-animations">
(function(){
          const selectors = [
            ".team-card",
            ".process-step",
            ".testimonials-card",
            ".stats-card",
            ".event-card",
            ".blog-card",
            ".cta-column"
          ]

          const revealAll = () => {
            selectors.forEach((selector) => {
              document.querySelectorAll(selector).forEach((el) => {
                el.style.opacity = "1"
                el.style.transform = "translateY(0)"
              })
            })
          }

          if (!("IntersectionObserver" in window)) {
            revealAll()
            return
          }

          const observerOptions = {
            threshold: 0.05,
            rootMargin: "0px 0px 50px 0px",
          }

          const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.style.opacity = "1"
                entry.target.style.transform = "translateY(0)"
                observer.unobserve(entry.target)
              }
            })
          }, observerOptions)

  // Group elements by section for better stagger effect
          selectors.forEach(selector => {
    const elements = document.querySelectorAll(selector)
    elements.forEach((el, index) => {
      el.style.opacity = "0"
      el.style.transform = "translateY(20px)"
      el.style.transition = \`opacity 0.4s ease \${index * 0.08}s, transform 0.4s ease \${index * 0.08}s\`
      observer.observe(el)
    })
  })

          setTimeout(revealAll, 2000)
})()
</script>`}
          ></Script>
        </div>
      </div>

      {/* SEO Content Section */}
      <section className="seo-section">
        <div className="seo-container">
          <h2 className="seo-title">کوچینگ؛ مسیر حرفه‌ای برای رشد، وضوح و خودآگاهی</h2>
          <div className={`seo-content ${seoExpanded ? 'seo-content-expanded' : ''}`}>
            <p>
              کوچینگ (Coaching) فراتر از یک مشاوره ساده، یک شراکت خلاقانه و قدرتمند میان شما و کوچ است. این فرآیند با تمرکز کامل بر ظرفیت‌های انسانی، به توسعه فردی و حرفه‌ای تمام کسانی کمک می‌کند که به دنبال شکوفایی پتانسیل‌های درونی خود هستند. در دنیای پرشتاب امروز، چه یک مدیر با دغدغه‌های استراتژیک باشید و چه فردی در جستجوی معنا، کوچینگ زندگی یا کوچینگ کسب و کار دقیقاً همان ابزاری است که برای عبور از موانع ذهنی و عدم شفافیت به آن نیاز دارید.
            </p>
            <p>
              یک کوچ حرفه‌ای با پرسیدن سوالات عمیق، به شما کمک می‌کند تا به شناخت از خود برسید. این خودآگاهی، سنگ بنای رشد واقعی در تمام ابعاد زندگی است. شما یاد می‌گیرید که ارزش‌ها، باورهای محدودکننده و نقاط قوت خود را شناسایی کرده و از وضعیت موجود به سمت وضعیت مطلوب حرکت کنید.
            </p>
            <h3>تعادل در نقش‌ها و مدیریت چالش‌های مدرن</h3>
            <p>
              بسیاری از افراد، به‌ویژه بانوان و مدیران پرمشغله، با چالش‌های چندگانه‌ای روبرو هستند؛ تلاش برای حفظ تعادل میان مسئولیت‌های خانوادگی و موفقیت در شغل، اغلب منجر به فرسودگی می‌شود. کوچینگ فضایی امن برای بازتعریف اولویت‌ها، یادگیری مدیریت زمان موثر و «نه گفتن» آگاهانه فراهم می‌کند. ما در کنار شما هستیم تا انرژی خود را بر اساس ارزش‌های واقعی‌تان مدیریت کنید، نه فقط بر اساس انتظارات دیگران.
            </p>
            <h3>از اعتماد به نفس تا موفقیت حرفه‌ای</h3>
            <p>
              چه در پی موفقیت در مسیر شغلی خود باشید، چه به دنبال بهبود روابط، افزایش اعتماد به نفس یا رسیدن به تعادل کار و زندگی، کوچینگ ابزارهای لازم برای حل مسئله و تصمیم‌گیری آگاهانه را در اختیار شما قرار می‌دهد. کوچ به شما کمک می‌کند بر موانعی مانند سندروم ایمپاستر غلبه کنید، مهارت‌های رهبری خود را تقویت نمایید و با اطمینان در مسیر حرفه‌ای خود قدم بگذارید.
            </p>
            <p>
              در «بلومیا»، ما با تکیه بر تجربه موفق خود در توانمندسازی بانوان و توسعه مهارت‌های فردی، اکنون بستری جامع برای رشد تمام افرادی فراهم کرده‌ایم که شایسته دست‌یابی به بهترین نسخه از خود هستند. فرآیند کوچینگ در بلومیا به شما کمک می‌کند تا شفافیت پیدا کنید، آگاهانه اقدام کنید و به نتایجی پایدار دست یابید که تمام ابعاد زندگی شما را متحول خواهد کرد.
            </p>
          </div>
          <button 
            className="seo-toggle-btn" 
            onClick={() => setSeoExpanded(!seoExpanded)}
          >
            {seoExpanded ? 'بستن' : 'بیشتر بخوانید'}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              className={seoExpanded ? 'seo-icon-rotated' : ''}
            >
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>
        </div>
      </section>

      <Footer></Footer>
    </div>
  )
}

export default Home
