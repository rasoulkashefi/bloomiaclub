import React from 'react'
import { Helmet } from 'react-helmet'
import Navigation from '../components/navigation'
import Footer from '../components/footer'
import './all-events.css'

const AllEvents = (props) => {
  return (
    <div className="all-events-container1">
      <Helmet>
        <title>تمام رویدادها | وبینارها و سمینارهای بلومیا</title>
        <meta name="description" content="برنامه رویدادها، وبینارها و سمینارهای بلومیا برای رشد و توسعه فردی و حرفه‌ای" />
        <meta name="keywords" content="رویداد، وبینار، سمینار، دوره، بلومیا، کوچینگ" />
        <link rel="canonical" href="https://bloomiaclub.com/event/all-events" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="تمام رویدادها | بلومیا" />
        <meta property="og:description" content="وبینارها، سمینارها و کارگاه‌های آموزشی برای رشد فردی" />
        <meta property="og:url" content="https://bloomiaclub.com/event/all-events" />
        <meta property="og:image" content="https://bloomiaclub.com/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="fa_IR" />
        <meta property="og:site_name" content="بلومیا" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="رویدادهای بلومیا" />
        <meta property="twitter:description" content="برنامه‌های آموزشی و علاقه‌مندی" />
        <meta property="twitter:image" content="https://bloomiaclub.com/og-image.png" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "رویدادها",
            "url": "https://bloomiaclub.com/events",
            "inLanguage": "fa-IR"
          })}
        </script>
      </Helmet>
      <Navigation></Navigation>
      <div className="all-events-container2">
        <div className="all-events-hero">
          <h1>رویدادها</h1>
          <p>صفحه تمام رویدادها</p>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default AllEvents
