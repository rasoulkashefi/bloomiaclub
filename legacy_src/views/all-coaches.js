import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Navigation from '../components/navigation';
import Footer from '../components/footer';
import { useAllCoaches } from '../hooks/useCoaches';
import './all-coaches.css';

const AllCoaches = () => {
  const { coaches, loading, error } = useAllCoaches();
  const [isSeoExpanded, setIsSeoExpanded] = useState(false);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [displayedCount, setDisplayedCount] = useState(0);
  const [displayedCoaches, setDisplayedCoaches] = useState([]);
  const scrollAnchorRef = useRef(null);
  const perPage = 6;

  // Filter coaches based on current filter
  const filteredCoaches = React.useMemo(() => {
    if (currentFilter === 'all') return coaches;
    
    // Map filter values to specialty keywords
    const filterMap = {
      'individual': ['رشد فردی', 'توسعه فردی', 'عزت نفس', 'اعتماد به نفس', 'ذهن‌آگاهی'],
      'business': ['کسب‌وکار', 'بیزینس', 'مدیریت', 'رهبری', 'فروش'],
      'career': ['مسیر شغلی', 'شغل', 'رزومه', 'استارتاپ'],
      'parenting': ['والدگری', 'فرزندپروری', 'خانواده', 'روابط']
    };

    const keywords = filterMap[currentFilter] || [];
    return coaches.filter(coach => {
      const specialties = Array.isArray(coach.specialties) ? coach.specialties : [];
      const specialtyText = specialties.map(s => 
        typeof s === 'string' ? s : (s.title || s.name || '')
      ).join(' ').toLowerCase();
      
      const title = (coach.title || '').toLowerCase();
      const description = (coach.description || '').toLowerCase();
      
      return keywords.some(keyword => 
        specialtyText.includes(keyword.toLowerCase()) ||
        title.includes(keyword.toLowerCase()) ||
        description.includes(keyword.toLowerCase())
      );
    });
  }, [coaches, currentFilter]);

  // Load more coaches
  useEffect(() => {
    if (loading || filteredCoaches.length === 0) return;

    const nextBatch = filteredCoaches.slice(displayedCount, displayedCount + perPage);
    if (nextBatch.length > 0) {
      setDisplayedCoaches(prev => [...prev, ...nextBatch]);
      setDisplayedCount(prev => prev + nextBatch.length);
    }
  }, [loading, filteredCoaches, displayedCount]);

  // Reset when filter changes
  useEffect(() => {
    setDisplayedCount(0);
    setDisplayedCoaches([]);
  }, [currentFilter]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (!scrollAnchorRef.current || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && displayedCount < filteredCoaches.length) {
          const nextBatch = filteredCoaches.slice(displayedCount, displayedCount + perPage);
          if (nextBatch.length > 0) {
            setDisplayedCoaches(prev => [...prev, ...nextBatch]);
            setDisplayedCount(prev => prev + nextBatch.length);
          }
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(scrollAnchorRef.current);
    return () => observer.disconnect();
  }, [displayedCount, filteredCoaches.length, loading]);

  const getRatingHtml = (rating, reviews) => {
    if (!rating) {
      return <div className="rating-container no-rating">.</div>;
    }
    return (
      <div className="rating-container">
        <i className="fa-solid fa-star"></i>
        <span style={{ color: 'var(--color-text-main)', fontWeight: 'bold' }}>{rating}</span>
        {reviews && (
          <span style={{ color: '#bbb', fontSize: '0.75rem' }}>({reviews} نظر)</span>
        )}
      </div>
    );
  };

  const filterButtons = [
    { id: 'all', label: 'همه تخصص‌ها' },
    { id: 'individual', label: 'رشد فردی' },
    { id: 'business', label: 'کسب‌وکار' },
    { id: 'career', label: 'مسیر شغلی' },
    { id: 'parenting', label: 'والدگری' }
  ];

  return (
    <div className="all-coaches-container1">
      <Helmet>
        <title>تیم کوچ‌های بلومیا | متخصصان رشد فردی و حرفه‌ای</title>
        <meta name="description" content="شناخت بهترین مربیان متخصص بلومیا؛ کوچ‌های تایید‌شده در زمینه‌های مختلف کوچینگ، رشد شغلی و تحقق اهداف." />
        <meta name="keywords" content="کوچ‌های بلومیا، مربیان حرفه‌ای، کوچینگ شخصی، مشاور رشد فردی" />
        <link rel="canonical" href="https://bloomiaclub.com/coaching/all-coaches" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="تیم کوچ‌های بلومیا" />
        <meta property="og:description" content="بهترین کوچ‌های متخصص در رشد شخصی و حرفه‌ای" />
        <meta property="og:url" content="https://bloomiaclub.com/coaching/all-coaches" />
        <meta property="og:image" content="https://bloomiaclub.com/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="fa_IR" />
        <meta property="og:site_name" content="بلومیا" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="کوچ‌های بلومیا" />
        <meta property="twitter:description" content="متخصصان رشد فردی و حرفه‌ای" />
        <meta property="twitter:image" content="https://bloomiaclub.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "تیم کوچ‌های بلومیا",
            "url": "https://bloomiaclub.com/coaching/all-coaches",
            "description": "لیست کامل کوچ‌های متخصص بلومیا",
            "inLanguage": "fa-IR"
          })}
        </script>
      </Helmet>
      <Navigation />
      <main className="all-coaches-main">
        {/* Hero Section */}
        <section className="coaches-hero">
          <div className="coaches-hero-container">
            <h1 className="coaches-hero-title">مسیر رشد خود را پیدا کنید</h1>
            <p className="coaches-hero-subtitle">برترین مربیان متخصص، تایید شده توسط استانداردهای بلومیا</p>
          </div>
        </section>

        {/* Filters Section */}
        <section className="coaches-filter-section">
          {filterButtons.map(btn => (
            <button
              key={btn.id}
              className={`coaches-filter-btn ${currentFilter === btn.id ? 'active' : ''}`}
              onClick={() => setCurrentFilter(btn.id)}
            >
              {btn.label}
            </button>
          ))}
        </section>

        {/* Coaches Grid */}
        {loading ? (
          <div className="coaches-loading">
            <div className="loading-spinner"></div>
            <p>در حال بارگذاری...</p>
          </div>
        ) : error ? (
          <div className="coaches-error">
            <p>خطا در بارگذاری مربیان. لطفاً دوباره تلاش کنید.</p>
          </div>
        ) : displayedCoaches.length === 0 ? (
          <div className="coaches-empty">
            <p>هیچ مربی‌ای یافت نشد.</p>
          </div>
        ) : (
          <>
            <section className="coaches-grid" id="coaches-list">
              {displayedCoaches.map((coach, index) => {
                const supabaseImageUrl = coach.imageUrl
                  ? coach.imageUrl.startsWith('http')
                    ? coach.imageUrl
                    : `https://qxacvupalbfcoqkuydba.supabase.co/storage/v1/object/public/coaches_images/${coach.imageUrl}`
                  : 'https://i.pravatar.cc/150?img=32';

                const specialties = Array.isArray(coach.specialties) ? coach.specialties : [];
                const tags = specialties
                  .map((s) => (typeof s === 'string' ? s : (s.title || s.name || '')))
                  .filter((tag) => Boolean(tag && String(tag).trim()));

                const hours = coach.coachingHours ? `+${Number(coach.coachingHours).toLocaleString('fa-IR')}` : '+۰';
                const clients = coach.satisfiedClients ? Number(coach.satisfiedClients).toLocaleString('fa-IR') : '۰';

                return (
                  <div 
                    key={coach.id} 
                    className="coach-card visible"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="card-top">
                      <img 
                        src={supabaseImageUrl} 
                        className="coach-img" 
                        alt={coach.name}
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="coach-head-info">
                        <h3>{coach.name}</h3>
                        <div className="coach-title">{coach.title}</div>
                        {tags.length > 0 && (
                          <div className="tags-container">
                            {tags.map((tag, tagIndex) => (
                              <span key={tagIndex} className="specialty-tag">{tag}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    {getRatingHtml(coach.rating, coach.totalReviews)}
                    <p className="coach-bio">{coach.description}</p>
                    <div className="stats-row">
                      <div className="stat-item">
                        <span className="stat-val">{hours}</span>
                        <span className="stat-label">ساعت تجربه</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-val">{clients}</span>
                        <span className="stat-label">تعداد مراجع</span>
                      </div>
                    </div>
                    <Link to={`/coaches/${coach.slug}`} className="btn-view">
                      مشاهده پروفایل
                    </Link>
                  </div>
                );
              })}
            </section>

            {/* Scroll Anchor for Infinite Scroll */}
            {displayedCount < filteredCoaches.length && (
              <div ref={scrollAnchorRef} className="coaches-scroll-anchor">
                <i className="fa-solid fa-circle-notch fa-spin"></i>
              </div>
            )}
          </>
        )}

        {/* SEO Section */}
        <section className="coaches-seo-section">
          <div className="coaches-seo-content">
            <h2 className="coaches-seo-title">چگونه مربی (کوچ) ایده‌آل خود را در بلومیا انتخاب کنید؟</h2>
            <div className="coaches-seo-text">
              <p>انتخاب مربی مناسب، حیاتی‌ترین تصمیم در مسیر تحول شماست. یک کوچ تراز اول، تنها یک شنونده نیست؛ بلکه شریکی استراتژیک است که به شما در کشف پتانسیل‌های پنهان و دستیابی به نتایج ملموس کمک می‌کند.</p>
              <div className={`coaches-seo-hidden ${isSeoExpanded ? 'show' : ''}`}>
                <p>در بلومیا، اولویت ما صلاحیت حرفه‌ای و استاندارد جهانی است. تمامی مربیان ما دارای مدارک معتبر کوچینگ از فدراسیون‌های بین‌المللی (مانند ICF) بوده و پس از گذراندن فرآیندهای ارزیابی سخت‌گیرانه به این لیست راه یافته‌اند.</p>
                <p>شما می‌توانید از جلسات معارفه رایگان برای اطمینان از هم‌سویی با مربی استفاده کنید.</p>
              </div>
              <button 
                className="coaches-btn-read-more"
                onClick={() => setIsSeoExpanded(!isSeoExpanded)}
              >
                {isSeoExpanded ? 'بستن متن' : 'مشاهده کامل متن'}
                <i className={`fa-solid fa-chevron-${isSeoExpanded ? 'up' : 'down'}`}></i>
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AllCoaches;
