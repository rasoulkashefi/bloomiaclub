import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Navigation from '../components/navigation';
import Footer from '../components/footer';
import { useSanityPostBySlug } from '../hooks/useSanityPosts';
import { usePostBySlug } from '../hooks/usePosts'; // Fallback
import { PortableTextRenderer } from '../components/PortableTextRenderer';
import { urlFor } from '../lib/sanity';
import NotFound from './not-found';
import './blog-post.css';

const BlogPost = () => {
  const { slug } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const { post: sanityPost, loading: sanityLoading } = useSanityPostBySlug(slug);
  const { post: supabasePost, loading: supabaseLoading } = usePostBySlug(slug);

  const [copied, setCopied] = useState(false);

  const loading = sanityLoading && supabaseLoading;
  const post = sanityPost || supabasePost;

  if (loading) {
    return (
      <div className="blog-post-container">
        <Navigation />
        <div className="blog-post-loading">
          <div className="spinner"></div>
          <p>در حال دریافت مقاله...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return <NotFound />;
  }

  // Formatting date
  const publishedDate = post.publishedAt || post.createdAt;
  const dateLabel = publishedDate ? new Date(publishedDate).toLocaleDateString('fa-IR') : '';

  // Main cover image
  const coverImage = post.mainImage
    ? urlFor(post.mainImage).width(1200).url()
    : post.imageUrl || 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=1400';

  const authorName = post.author?.name || post.authorName || 'تیم تحریریه بلومیا';
  const authorBio = post.author?.bio || 'کارشناس توسعه فردی و کوچینگ در بلومیا کلاب';
  const isAiAuthor = post.author?.isAi;
  const coachSlug = post.author?.coachSlug || (post.author?.isCoach ? post.author?.slug : null) || post.authorSlug;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://bloomiaclub.com/blog/${slug}`;
  const canonicalUrl = post.canonicalUrl || `https://bloomiaclub.com/blog/${slug}`;
  const metaTitle = post.metaTitle || `${post.title} | بلومیا کلاب`;
  const metaDescription = post.metaDescription || post.excerpt;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="blog-post-container">
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        {post.keywords && <meta name="keywords" content={post.keywords.join(', ')} />}
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={coverImage} />
        <meta property="og:locale" content="fa_IR" />
        <meta property="article:published_time" content={publishedDate} />
        <meta property="article:author" content={authorName} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={coverImage} />

        {/* JSON-LD Technical SEO Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": post.title,
            "description": metaDescription,
            "image": [coverImage],
            "datePublished": publishedDate,
            "dateModified": publishedDate,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": canonicalUrl
            },
            "author": {
              "@type": isAiAuthor ? "Thing" : "Person",
              "name": authorName,
              "description": authorBio
            },
            "publisher": {
              "@type": "Organization",
              "name": "بلومیا کلاب",
              "url": "https://bloomiaclub.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://bloomiaclub.com/images/bloomia-club-logo.png"
              }
            },
            "inLanguage": "fa-IR"
          })}
        </script>

        {/* JSON-LD Breadcrumb Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "صفحه اصلی",
                "item": "https://bloomiaclub.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "بلاگ",
                "item": "https://bloomiaclub.com/blog"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": post.title,
                "item": canonicalUrl
              }
            ]
          })}
        </script>
      </Helmet>

      <Navigation />

      <main className="blog-post-main-content">
        <article className="blog-post-article">
          {/* Breadcrumb */}
          <nav className="blog-breadcrumb" aria-label="مسیریابی">
            <Link to="/">صفحه اصلی</Link>
            <span className="crumb-separator">/</span>
            <Link to="/blog">بلاگ</Link>
            <span className="crumb-separator">/</span>
            <span className="crumb-current">{post.title}</span>
          </nav>

          {/* Article Header */}
          <header className="blog-post-header">
            {post.category && (
              <span className="blog-post-category-badge">
                {(typeof post.category === 'object' ? post.category?.title : post.category) || 'کوچینگ'}
              </span>
            )}
            <h1 className="blog-post-main-title">{post.title}</h1>
            <p className="blog-post-lead-excerpt">{post.excerpt}</p>

            <div className="blog-post-author-meta">
              <div className="author-details">
                {coachSlug ? (
                  <Link
                    to={`/coaches/${coachSlug}`}
                    className="author-link-highlight"
                    title={`مشاهده صفحه اختصاصی کوچ ${authorName}`}
                  >
                    <span className="author-name-text">{authorName}</span>
                  </Link>
                ) : (
                  <span className="author-name-text">{authorName}</span>
                )}
                {isAiAuthor && (
                  <span className="ai-persona-badge" title="پرسونای تولید محتوای هوش مصنوعی بلومیا">
                    پرسونای هوش مصنوعی
                  </span>
                )}
              </div>
              <div className="meta-info">
                {dateLabel && <span>تاریخ: {dateLabel}</span>}
                <span className="meta-dot">•</span>
                <span>زمان مطالعه: {post.estimatedReadTime || post.readTimeMinutes || 5} دقیقه</span>
              </div>
            </div>
          </header>

          {/* Main Image */}
          <div className="blog-post-cover-container">
            <img src={coverImage} alt={post.mainImage?.alt || post.title} className="blog-post-cover-image" />
            {post.mainImage?.caption && (
              <p className="cover-caption">{post.mainImage.caption}</p>
            )}
          </div>

          {/* Quick Summary Box */}
          {post.aiQuickAnswer && (
            <section className="geo-quick-answer-box">
              <div className="geo-box-header">
                <h3>خلاصه در یک نگاه</h3>
              </div>
              <p className="geo-answer-text">{post.aiQuickAnswer}</p>
            </section>
          )}

          {/* Article Body Content */}
          <div className="blog-post-body">
            {post.body ? (
              <PortableTextRenderer value={post.body} />
            ) : (
              <div dangerouslySetInnerHTML={{ __html: post.content || '' }} />
            )}
          </div>

          {/* Share Buttons */}
          <section className="blog-post-share-section">
            <span className="share-title">اشتراک‌گذاری مقاله:</span>
            <div className="share-buttons">
              <a
                href={`https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-btn telegram"
              >
                تلگرام
              </a>
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + ' ' + currentUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-btn whatsapp"
              >
                واتساپ
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(currentUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-btn twitter"
              >
                توییتر / X
              </a>
              <button onClick={handleCopyLink} className="share-btn copy">
                {copied ? '✓ لینک کپی شد' : 'کپی لینک'}
              </button>
            </div>
          </section>

          {/* Author Box */}
          <section className="blog-post-author-box">
            <div className="author-box-content">
              <div className="author-box-header">
                {coachSlug ? (
                  <Link
                    to={`/coaches/${coachSlug}`}
                    className="author-box-name-link"
                    title={`مشاهده صفحه اختصاصی کوچ ${authorName}`}
                  >
                    <h4 className="author-box-name">{authorName}</h4>
                  </Link>
                ) : (
                  <h4 className="author-box-name">{authorName}</h4>
                )}
                {isAiAuthor && (
                  <span className="ai-chip">نویسنده هوش مصنوعی</span>
                )}
              </div>
              {post.author?.jobTitle && (
                <div className="author-job-title">{post.author.jobTitle}</div>
              )}
              <p className="author-box-bio">{authorBio}</p>
              {coachSlug && (
                <div className="author-box-cta">
                  <Link to={`/coaches/${coachSlug}`} className="coach-booking-link">
                    مشاهده پروفایل و رزرو جلسه کوچینگ با {authorName}
                  </Link>
                </div>
              )}
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
