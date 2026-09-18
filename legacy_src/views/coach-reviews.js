import React from 'react'
import { Helmet } from 'react-helmet'
import Navigation from '../components/navigation'
import Footer from '../components/footer'
import './coach-reviews.css'

const CoachReviews = (props) => {
  const coachId = props.match.params.id
  
  return (
    <div className="coach-reviews-container1">
      <Helmet>
        <title>نظرات و بررسی‌ها | نظر مراجعین | بلومیا</title>
        <meta name="description" content="نظرات در خصوص رابطه با این مربی" />
        <meta name="keywords" content="نظرات، بررسی، ریښ، ارزیابی" />
        <link rel="canonical" href={`https://bloomiaclub.com/coaches/${coachId}/reviews`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="نظرات بر این مربی" />
        <meta property="og:description" content="u0627مڈازات و نظرات دهندگان این مربی" />
        <meta property="og:url" content={`https://bloomiaclub.com/coaches/${coachId}/reviews`} />
        <meta property="og:image" content="https://bloomiaclub.com/og-image.png" />
        <meta property="og:locale" content="fa_IR" />
        <meta property="og:site_name" content="بلومیا" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="نظرات مراجعین" />
        <meta property="twitter:image" content="https://bloomiaclub.com/og-image.png" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "نظرات",
            "inLanguage": "fa-IR"
          })}
        </script>
      </Helmet>
      <Navigation></Navigation>
      <div className="coach-reviews-container2">
        <div className="coach-reviews-hero">
          <h1>نظرات و بررسی‌های کاربران</h1>
          <p>صفحه نظرات برای مربی (ID: {coachId})</p>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default CoachReviews
