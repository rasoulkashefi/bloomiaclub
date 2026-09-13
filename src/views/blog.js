import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Navigation from '../components/navigation';
import Footer from '../components/footer';
import { useSanityAllPosts, useSanityFeaturedPost } from '../hooks/useSanityPosts';
import { useAllPosts } from '../hooks/usePosts'; // Fallback
import { urlFor } from '../lib/sanity';
import './blog.css';

const Blog = () => {
  const { posts: sanityPosts, loading: sanityLoading, error: sanityError } = useSanityAllPosts();
  const { featuredPost: sanityFeatured } = useSanityFeaturedPost();
  const { posts: supabasePosts, loading: supabaseLoading } = useAllPosts();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Combine Sanity posts or fallback to Supabase if Sanity has no published posts yet
  const posts = useMemo(() => {
    if (sanityPosts && sanityPosts.length > 0) {
      return sanityPosts;
    }
    return supabasePosts || [];
  }, [sanityPosts, supabasePosts]);

  const loading = sanityLoading && supabaseLoading;

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set();
    posts.forEach((p) => {
      const catName = p.category?.title || p.category;
      if (catName) set.add(catName);
    });
    return Array.from(set);
  }, [posts]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const title = post.title?.toLowerCase() || '';
      const excerpt = (post.excerpt || '')?.toLowerCase();
      const catName = post.category?.title || post.category || '';

      const matchesSearch = title.includes(searchQuery.toLowerCase()) || excerpt.includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || catName === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [posts, searchQuery, selectedCategory]);

  const featuredPost = sanityFeatured || posts.find((p) => p.isFeatured) || posts[0];

  return (
    <div className="blog-container1">
      <Helmet>
        <title>مجله تخصصی کوچینگ و رشد فردی | بلومیا کلاب</title>
        <meta name="description" content="مرجع مقالات تخصصی کوچینگ، توسعه فردی، مدیریت زمان، مهارت‌های رهبری و رشد هوشمندانه کسب‌وکار در بلومیا." />
        <meta name="keywords" content="کوچینگ، رشد فردی، توسعه شغلی، مدیریت زمان، هوش مصنوعی، بلومیا" />
        <link rel="canonical" href="https://bloomiaclub.com/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="مجله تخصصی کوچینگ و رشد فردی | بلومیا" />
        <meta property="og:description" content="مقالات کاروندی، راهنماهای گام‌به‌گام و راهکارهای عملی در مسیر تحول فردی و کسب‌وکار." />
        <meta property="og:url" content="https://bloomiaclub.com/blog" />
        <meta property="og:image" content="https://bloomiaclub.com/og-image.png" />
        <meta property="og:locale" content="fa_IR" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "بلاگ بلومیا کلاب",
            "url": "https://bloomiaclub.com/blog",
            "description": "مجموعه مقالات آموزشی و تخصصی کوچینگ و رشد فردی",
            "inLanguage": "fa-IR"
          })}
        </script>
      </Helmet>
      
      <Navigation />

      <main className="blog-main-content">
        {/* Header Hero Section */}
        <section className="blog-hero-section">
          <div className="blog-hero-container">
            <span className="blog-badge-tag">🌱 آکادمی و مجله بلومیا</span>
            <h1 className="blog-hero-title">دانش و راهکارهای تحول فردی و حرفه‌ای</h1>
            <p className="blog-hero-subtitle">
              مقالات تخصصی کوچینگ، مدیریت زمان، رهبری اصیل و تعادل در زندگی با بالاترین استانداردهای علمی.
            </p>

            {/* Search and Category Filters */}
            <div className="blog-filter-bar">
              <div className="blog-search-box">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input
                  type="text"
                  placeholder="جستجو در مقالات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="blog-category-tags">
                <button
                  className={`category-tag-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                  onClick={() => setSelectedCategory('all')}
                >
                  همه مقالات
                </button>
                {categories.map((cat, idx) => (
                  <button
                    key={idx}
                    className={`category-tag-btn ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Post Banner */}
        {featuredPost && !searchQuery && selectedCategory === 'all' && (
          <section className="blog-featured-section">
            <div className="blog-container">
              <div className="featured-card">
                <div className="featured-card-image">
                  <img
                    src={
                      featuredPost.mainImage
                        ? urlFor(featuredPost.mainImage).width(1200).url()
                        : featuredPost.imageUrl || 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=1200'
                    }
                    alt={featuredPost.title}
                    loading="lazy"
                  />
                  <span className="featured-badge">🔥 مقاله ویژه</span>
                </div>
                <div className="featured-card-content">
                  <div className="featured-meta">
                    <span className="featured-category">{featuredPost.category?.title || featuredPost.category || 'کوچینگ'}</span>
                    <span>•</span>
                    <span>{featuredPost.estimatedReadTime || 5} دقیقه مطالعه</span>
                  </div>
                  <h2 className="featured-title">
                    <Link to={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
                  </h2>
                  <p className="featured-excerpt">{featuredPost.excerpt}</p>
                  <div className="featured-footer">
                    <div className="author-info">
                      <span className="author-name">
                        {featuredPost.author?.name || featuredPost.authorName || 'تیم بلومیا'}
                        {featuredPost.author?.isAi && <span className="ai-badge" title="پرسونای هوش مصنوعی">🤖 AI</span>}
                      </span>
                    </div>
                    <Link to={`/blog/${featuredPost.slug}`} className="read-more-btn">
                      مطالعه مقاله ↗
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Main Blog Grid */}
        <section className="blog-section">
          <div className="blog-container">
            {loading ? (
              <div className="blog-loading-state">
                <div className="spinner"></div>
                <p>در حال بارگذاری مقالات...</p>
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="blog-empty-state">
                <h3>مقاله‌ای با این مشخصات پیدا نشد.</h3>
                <p>لطفاً عبارت دیگری را جستجو کنید یا فیلتر دسته‌بندی را تغییر دهید.</p>
              </div>
            ) : (
              <div className="blog-grid">
                {filteredPosts.map((post) => {
                  const postSlug = post.slug?.current || post.slug;
                  const catTitle = post.category?.title || post.category || 'عام';
                  const imageUrl = post.mainImage
                    ? urlFor(post.mainImage).width(800).height(500).url()
                    : post.imageUrl || 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=800';

                  const dateLabel = post.publishedAt || post.createdAt
                    ? new Date(post.publishedAt || post.createdAt).toLocaleDateString('fa-IR')
                    : '';

                  const authorName = post.author?.name || post.authorName || 'بلومیا کلاب';
                  const isAiAuthor = post.author?.isAi;

                  return (
                    <article key={post._id || post.id} className="blog-card">
                      <div className="blog-card-image">
                        <Link to={`/blog/${postSlug}`}>
                          <img src={imageUrl} alt={post.title} loading="lazy" decoding="async" />
                        </Link>
                        <div className="blog-card-category">{catTitle}</div>
                      </div>

                      <div className="blog-card-content">
                        <div className="blog-card-meta">
                          {dateLabel && <span className="blog-date">{dateLabel}</span>}
                          <span className="meta-dot">•</span>
                          <span>{post.estimatedReadTime || post.readTimeMinutes || 5} دقیقه</span>
                        </div>

                        <h3 className="blog-card-title">
                          <Link to={`/blog/${postSlug}`}>{post.title}</Link>
                        </h3>

                        <p className="blog-card-excerpt">{post.excerpt}</p>

                        <div className="blog-card-footer">
                          <div className="blog-card-author">
                            <span className="author-name">{authorName}</span>
                            {isAiAuthor && (
                              <span className="ai-persona-chip" title="پرسونای هوش مصنوعی">
                                🤖 هوش مصنوعی
                              </span>
                            )}
                          </div>
                          <Link to={`/blog/${postSlug}`} className="card-link-arrow" aria-label="مطالعه">
                            ←
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
