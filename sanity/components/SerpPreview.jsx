import React from 'react';

export function SerpPreview(props) {
  const { document } = props;
  const published = document?.displayed || {};

  const title = published.metaTitle || published.title || 'عنوان مقاله در نتایج گوگل قرار می‌گیرد';
  const description = published.metaDescription || published.excerpt || 'توضیحات متای مقاله یا چکیده آن در این قسمت برای کاربران گوگل به نمایش در می‌آید...';
  const slug = published.slug?.current || 'sample-post-slug';
  const canonicalUrl = published.canonicalUrl || `https://bloomiaclub.com/blog/${slug}`;

  const titleLength = title.length;
  const descLength = description.length;

  return (
    <div style={{
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      padding: '20px',
      backgroundColor: '#ffffff',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      direction: 'rtl',
      marginTop: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
        <span style={{ fontWeight: '700', fontSize: '14px', color: '#1e293b' }}>🔍 شبیه‌ساز زنده نتایج گوگل (Google SERP Simulator)</span>
        <span style={{ fontSize: '12px', color: '#64748b' }}>دامنه: bloomiaclub.com</span>
      </div>

      <div style={{ padding: '12px', backgroundColor: '#fafafa', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
        {/* URL Breadcrumb */}
        <div style={{ fontSize: '14px', color: '#202124', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', direction: 'ltr', justifyContent: 'flex-end' }}>
          <span style={{ color: '#5f6368', fontSize: '12px' }}>{canonicalUrl}</span>
          <span style={{ fontWeight: '500', color: '#202124' }}>بلومیا کلاب</span>
        </div>

        {/* Title */}
        <div style={{ color: '#1a0dab', fontSize: '20px', fontWeight: '500', lineHeight: '1.3', marginBottom: '6px', cursor: 'pointer', direction: 'rtl' }}>
          {title}
        </div>

        {/* Description */}
        <div style={{ color: '#4d5156', fontSize: '14px', lineHeight: '1.5', direction: 'rtl' }}>
          {description}
        </div>
      </div>

      {/* Counters & Recommendations */}
      <div style={{ display: 'flex', gap: '16px', marginTop: '14px', fontSize: '12px' }}>
        <div>
          <strong style={{ color: titleLength > 60 ? '#ef4444' : '#10b981' }}>
            طول عنوان: {titleLength} کاراکتر
          </strong>
          <span style={{ color: '#64748b', marginRight: '4px' }}> (استاندارد: ۵۰ تا ۶۰ کاراکتر)</span>
        </div>
        <div>
          <strong style={{ color: descLength > 160 ? '#ef4444' : descLength < 120 ? '#f59e0b' : '#10b981' }}>
            طول توضیحات: {descLength} کاراکتر
          </strong>
          <span style={{ color: '#64748b', marginRight: '4px' }}> (استاندارد: ۱۲۰ تا ۱۶۰ کاراکتر)</span>
        </div>
      </div>
    </div>
  );
}
