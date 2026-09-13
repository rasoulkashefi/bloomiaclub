import React from 'react'
import { Helmet } from 'react-helmet'
import Navigation from '../components/navigation'
import Footer from '../components/footer'
import './what-is-coaching.css'

const WhatIsCoaching = (props) => {
  return (
    <div className="what-is-coaching-container1">
      <Helmet>
        <title>کوچینگ چیست؟ - راهنمایی جامع | بلومیا</title>
        <meta name="description" content="کوچینگ چیست؟ برینچير را بیمود که اين فرآيند چطور برای رشد فردی و حرفه‌ای کار می‌آيد." />
        <meta name="keywords" content="کوچینگ چیست، یادگیری کوچینگ، رشد بشری، اهداف" />
        <link rel="canonical" href="https://bloomiaclub.com/what-is-coaching" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="کوچینگ چیست؟" />
        <meta property="og:description" content="برینشر کامل مباره ماهیت و فواید کوچینگ" />
        <meta property="og:url" content="https://bloomiaclub.com/what-is-coaching" />
        <meta property="og:image" content="https://bloomiaclub.com/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="fa_IR" />
        <meta property="og:site_name" content="بلومیا" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="کوچینگ چی است" />
        <meta property="twitter:description" content="راهنمایی کوچینگ برای رشد شخصی" />
        <meta property="twitter:image" content="https://bloomiaclub.com/og-image.png" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "کوچینگ چیست؟",
            "url": "https://bloomiaclub.com/what-is-coaching",
            "inLanguage": "fa-IR"
          })}
        </script>
      </Helmet>
      <Navigation></Navigation>
      <div className="what-is-coaching-container2">
        <div className="what-is-coaching-hero">
          <h1>کوچینگ چیست؟</h1>
          <p>صفحه توضیح کوچینگ</p>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default WhatIsCoaching
