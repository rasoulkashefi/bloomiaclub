import React from 'react'
import { Helmet } from 'react-helmet'
import Navigation from '../components/navigation'
import Footer from '../components/footer'
import './coach-bio.css'

const CoachBio = (props) => {
  const coachId = props.match.params.id
  
  return (
    <div className="coach-bio-container1">
      <Helmet>
        <title>بیوگرافی مربی | داستان و سفر | بلومیا</title>
        <meta name="description" content="تعرّف بیشتر درباره داستان و سفر مربی بلومیا" />
        <meta name="keywords" content="بیوگرافی، مربی، تجربه، منتور" />
        <link rel="canonical" href={`https://bloomiaclub.com/coaches/${coachId}/bio`} />
        <meta property="og:type" content="profile" />
        <meta property="og:title" content="بیوگرافی مربی" />
        <meta property="og:description" content="شناخت بیشتر تاریخچه مربی" />
        <meta property="og:url" content={`https://bloomiaclub.com/coaches/${coachId}/bio`} />
        <meta property="og:image" content="https://bloomiaclub.com/og-image.png" />
        <meta property="og:locale" content="fa_IR" />
        <meta property="og:site_name" content="بلومیا" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="بیوگرافی مربی" />
        <meta property="twitter:image" content="https://bloomiaclub.com/og-image.png" />
      </Helmet>
      <Navigation></Navigation>
      <div className="coach-bio-container2">
        <div className="coach-bio-hero">
          <h1>بیوگرافی و داستان</h1>
          <p>صفحه بیوگرافی و داستان مربی (ID: {coachId})</p>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default CoachBio
