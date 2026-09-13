import React from 'react'
import { Helmet } from 'react-helmet'
import Navigation from '../components/navigation'
import Footer from '../components/footer'
import './coach-expertise.css'

const CoachExpertise = (props) => {
  const coachId = props.match.params.id
  
  return (
    <div className="coach-expertise-container1">
      <Helmet>
        <title>تخصص و روش کاری | زمینه‌های تمرکز | بلومیا</title>
        <meta name="description" content="u062aخصص‌ها و نقاط تمرکز مربی برای راهنمایی بهتر اهداف شما" />
        <meta name="keywords" content="تخصص، روش، رویکرد، راه" />
        <link rel="canonical" href={`https://bloomiaclub.com/coaches/${coachId}/expertise`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="تخصص کوتاح" />
        <meta property="og:description" content="u06a9ارايل و روش‌های كاری مربی" />
        <meta property="og:url" content={`https://bloomiaclub.com/coaches/${coachId}/expertise`} />
        <meta property="og:image" content="https://bloomiaclub.com/og-image.png" />
        <meta property="og:locale" content="fa_IR" />
        <meta property="og:site_name" content="بلومیا" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="تخصص مربی" />
        <meta property="twitter:image" content="https://bloomiaclub.com/og-image.png" />
      </Helmet>
      <Navigation></Navigation>
      <div className="coach-expertise-container2">
        <div className="coach-expertise-hero">
          <h1>تخصص و روش کاری</h1>
          <p>صفحه تخصص و روش کاری مربی (ID: {coachId})</p>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default CoachExpertise
