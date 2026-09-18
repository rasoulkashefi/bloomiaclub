import React from 'react'
import { Helmet } from 'react-helmet'
import Navigation from '../components/navigation'
import Footer from '../components/footer'
import './contact.css'

const Contact = (props) => {
  return (
    <div className="contact-container1">
      <Helmet>
        <title>تماس با بلومیا | پاسخگویی به سوال‌های شما</title>
        <meta name="description" content="با تیم بلومیا در تماس باشید. سوال‌های خود را مطرح کنید و پاسخ دریافت کنید." />
        <meta name="keywords" content="تماس بلومیا، پشتیبانی، سوال و جواب" />
        <link rel="canonical" href="https://bloomiaclub.com/contact" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="تماس با بلومیا" />
        <meta property="og:description" content="با تیم بلومیا در تماس باشید. ما اینجا هستیم تا به شما کمک کنیم." />
        <meta property="og:url" content="https://bloomiaclub.com/contact" />
        <meta property="og:image" content="https://bloomiaclub.com/og-image.png" />
        <meta property="og:locale" content="fa_IR" />
        <meta property="og:site_name" content="بلومیا" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="تماس با بلومیا" />
        <meta property="twitter:description" content="پاسخگویی به سوال‌های شما" />
        <meta property="twitter:image" content="https://bloomiaclub.com/og-image.png" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "تماس با بلومیا",
            "url": "https://bloomiaclub.com/contact",
            "inLanguage": "fa-IR"
          })}
        </script>
      </Helmet>
      <Navigation></Navigation>
      <div className="contact-container2">
        <div className="contact-hero">
          <h1>تماس با ما</h1>
          <p>صفحه تماس با ما</p>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Contact
