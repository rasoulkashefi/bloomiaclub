import React, { useState, useEffect } from 'react'

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      width: '100%',
      zIndex: 1000,
      background: 'rgba(250, 250, 248, 0.98)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid #e5e5e2',
      boxShadow: '0 2px 8px rgba(31, 61, 58, 0.05)',
      direction: 'ltr'
    }}>
      <div className="navigation-container1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row-reverse', width: '100%' }}>
        {/* Logo at the start (right in RTL) */}
        <a href="/" className="navigation-logo-desktop" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          marginRight: '1.2rem', 
          marginLeft: '0.5rem'
        }}>
          <picture>
            <source srcSet="/images/bloomia-club-logo.avif" type="image/avif" />
            <source srcSet="/images/bloomia-club-logo.webp" type="image/webp" />
            <img
              src="/images/bloomia-club-logo.png"
              alt="بلومیا"
              width="2576"
              height="1288"
              style={{ height: '56px', width: 'auto' }}
            />
          </picture>
        </a>
        <ul className="navigation-menu-desktop" style={{ display: 'flex', alignItems: 'center', flexDirection: 'row-reverse', margin: 0, padding: 0, listStyle: 'none' }}>
          <li className="navigation-menu-item">
            <a href="/coaches">
              <div className="navigation-link"><span>کوچ‌ها</span></div>
            </a>
          </li>
          <li className="navigation-menu-item">
            <a href="/coaching">
              <div className="navigation-link"><span>کوچینگ</span></div>
            </a>
          </li>
          <li className="navigation-menu-item">
            <a href="/events">
              <div className="navigation-link"><span>رویدادها</span></div>
            </a>
          </li>
          <li className="navigation-menu-item">
            <a href="/blog">
              <div className="navigation-link"><span>بلاگ</span></div>
            </a>
          </li>
          <li className="navigation-menu-item">
            <a href="/about">
              <div className="navigation-link"><span>درباره ما</span></div>
            </a>
          </li>
        </ul>

        <div className="navigation-actions-desktop" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginRight: '1.2rem' }}>
          <a href="#login" style={{ marginLeft: '0.5rem' }}>
            <div className="navigation-btn-login btn btn-outline" style={{ minWidth: '72px', padding: '0.4rem 1.1rem', fontSize: '1rem', borderRadius: '8px' }}>
              <span>ورود</span>
            </div>
          </a>
          <a href="/coaching/free-intro-session">
            <div className="navigation-btn-booking btn btn-primary" style={{ minWidth: '100px', padding: '0.45rem 1.3rem', fontSize: '1rem', borderRadius: '8px' }}>
              <span>رزرو جلسه</span>
            </div>
          </a>
        </div>

        {/* Hamburger Button */}
        <button 
          className="navigation-mobile-toggle" 
          onClick={() => setIsMenuOpen(true)}
          aria-label="باز کردن منو"
        >
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`navigation-mobile-overlay ${isMenuOpen ? 'navigation-mobile-open' : ''}`}>
        {/* Header */}
        <div className="navigation-mobile-header">
          <a href="/" onClick={closeMenu}>
            <picture>
              <source srcSet="/images/bloomia-club-logo.avif" type="image/avif" />
              <source srcSet="/images/bloomia-club-logo.webp" type="image/webp" />
              <img
                src="/images/bloomia-club-logo.png"
                alt="بلومیا"
                width="2576"
                height="1288"
                style={{ height: '48px' }}
              />
            </picture>
          </a>
          <button 
            className="navigation-mobile-close" 
            onClick={closeMenu}
            aria-label="بستن منو"
          >
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M18 6L6 18M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        {/* Menu Items */}
        <ul className="navigation-menu-mobile">
          <li><a href="/coaches" className="navigation-link-mobile" onClick={closeMenu}>کوچ‌ها</a></li>
          <li><a href="/coaching" className="navigation-link-mobile" onClick={closeMenu}>کوچینگ</a></li>
          <li><a href="/events" className="navigation-link-mobile" onClick={closeMenu}>رویدادها</a></li>
          <li><a href="/blog" className="navigation-link-mobile" onClick={closeMenu}>بلاگ</a></li>
          <li><a href="/about" className="navigation-link-mobile" onClick={closeMenu}>درباره ما</a></li>
          <li><a href="/faq" className="navigation-link-mobile" onClick={closeMenu}>سوالات متداول</a></li>
        </ul>

        {/* Actions */}
        <div className="navigation-actions-mobile">
          <a href="/coaching/free-intro-session" className="btn btn-primary navigation-btn-mobile" onClick={closeMenu}>
            رزرو جلسه رایگان
          </a>
          <a href="#login" className="btn btn-outline navigation-btn-mobile" onClick={closeMenu}>
            ورود به حساب
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;