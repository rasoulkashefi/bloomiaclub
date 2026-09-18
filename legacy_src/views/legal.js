import React from 'react'
import { Helmet } from 'react-helmet'
import Navigation from '../components/navigation'
import Footer from '../components/footer'
import './legal.css'

const Legal = (props) => {
  return (
    <div className="legal-container1">
      <Helmet>
        <title>قوانین و مقررات بلومیا | شرایط استفاده و حریم خصوصی</title>
        <meta name="description" content="اطلاعات حقوقی، شرایط استفاده و سیاست حفاظت از اطلاعات شخصی بلومیا" />
        <meta name="keywords" content="قوانین، شرایط استفاده، حریم خصوصی، بلومیا" />
        <link rel="canonical" href="https://bloomiaclub.com/legal" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="قوانین و مقررات بلومیا" />
        <meta property="og:description" content="قوانین و شرایط استفاده از خدمات بلومیا" />
        <meta property="og:url" content="https://bloomiaclub.com/legal" />
        <meta property="og:image" content="https://bloomiaclub.com/og-image.png" />
        <meta property="og:locale" content="fa_IR" />
        <meta property="og:site_name" content="بلومیا" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="قوانین بلومیا" />
        <meta property="twitter:description" content="شرایط استفاده و حریم خصوصی" />
        <meta property="twitter:image" content="https://bloomiaclub.com/og-image.png" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "حقوقی بلومیا",
            "url": "https://bloomiaclub.com/legal",
            "inLanguage": "fa-IR"
          })}
        </script>
      </Helmet>
      <Navigation></Navigation>
      <div className="legal-container2">
        <div className="legal-hero">
          <h1>حقوقی</h1>
          <p>صفحه اطلاعات حقوقی</p>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Legal
