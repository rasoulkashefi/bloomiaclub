import React from 'react'
import { Helmet } from 'react-helmet'
import Navigation from '../components/navigation'
import Footer from '../components/footer'
import './coach-events.css'

const CoachEvents = (props) => {
  const coachId = props.match.params.id
  
  return (
    <div className="coach-events-container1">
      <Helmet>
        <title>رویدادها و کارگاه‌ها | کوچ | بلومیا</title>
        <meta name="description" content="رویدادها، سمینارها و كلاس‌های رایگان اين مربی در بلومیا" />
        <meta name="keywords" content="رویداد، ورکشاپ، سمینار، کلاس" />
        <link rel="canonical" href={`https://bloomiaclub.com/coaches/${coachId}/events`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="رویدادها رو ارائه مربی" />
        <meta property="og:description" content="u0631ویدادها، سمینار و کارگاه‌های رعلى مربی" />
        <meta property="og:url" content={`https://bloomiaclub.com/coaches/${coachId}/events`} />
        <meta property="og:image" content="https://bloomiaclub.com/og-image.png" />
        <meta property="og:locale" content="fa_IR" />
        <meta property="og:site_name" content="بلومیا" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="رویدادها" />
        <meta property="twitter:image" content="https://bloomiaclub.com/og-image.png" />
      </Helmet>
      <Navigation></Navigation>
      <div className="coach-events-container2">
        <div className="coach-events-hero">
          <h1>رویدادهای آینده و گذشته</h1>
          <p>صفحه رویدادهای مربی (ID: {coachId})</p>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default CoachEvents
