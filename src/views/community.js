import React from 'react'
import { Helmet } from 'react-helmet'
import Navigation from '../components/navigation'
import Footer from '../components/footer'
import './community.css'

const Community = (props) => {
  return (
    <div className="community-container1">
      <Helmet>
        <title>جامعه بلومیا | رویدادها و شبکه‌سازی | رشد جمعی</title>
        <meta name="description" content="به جامعه بلومیا خوش آمدید! به رویدادها بپیوندید، درتعامل باشید و با دیگران رشد کنید." />
        <meta name="keywords" content="جامعه، رویدادها، شبکه‌سازی، بلومیا، رشد فردی" />
        <link rel="canonical" href="https://bloomiaclub.com/community" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="جامعه بلومیا" />
        <meta property="og:description" content="فضایی برای رویدادها، شبکه‌سازی و رشد جمعی" />
        <meta property="og:url" content="https://bloomiaclub.com/community" />
        <meta property="og:image" content="https://bloomiaclub.com/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="fa_IR" />
        <meta property="og:site_name" content="بلومیا" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="جامعه بلومیا" />
        <meta property="twitter:description" content="رویدادها و رشد جمعی" />
        <meta property="twitter:image" content="https://bloomiaclub.com/og-image.png" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "جامعه بلومیا",
            "url": "https://bloomiaclub.com/community",
            "inLanguage": "fa-IR"
          })}
        </script>
      </Helmet>
      <Navigation></Navigation>
      <div className="community-container2">
        <div className="community-hero">
          <h1>جامعه</h1>
          <p>صفحه جامعه</p>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Community
