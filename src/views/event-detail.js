import React from 'react'
import { Helmet } from 'react-helmet'
import Navigation from '../components/navigation'
import Footer from '../components/footer'
import './event-detail.css'

const EventDetail = (props) => {
  const eventId = props.match.params.id
  
  return (
    <div className="event-detail-container1">
      <Helmet>
        <title>جزئیات رویداد | بلومیا</title>
        <meta name="description" content="جزئیات رویداد بلومیا منجمله زمان، شرکت‌کنندگان و اطلاعات مرتبط" />
        <meta name="keywords" content="رویداد، وبینار، شبکه‌سازی، بلومیا" />
        <link rel="canonical" href="https://bloomiaclub.com/event/all-events" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="جزئیات رویداد | بلومیا" />
        <meta property="og:description" content="اطلاعات کامل درباره رویدادهای بلومیا" />
        <meta property="og:url" content="https://bloomiaclub.com/event/all-events" />
        <meta property="og:image" content="https://bloomiaclub.com/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="fa_IR" />
        <meta property="og:site_name" content="بلومیا" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="رویدادهای بلومیا" />
        <meta property="twitter:description" content="وبینارها و کارگاه‌های آموزشی" />
        <meta property="twitter:image" content="https://bloomiaclub.com/og-image.png" />
      </Helmet>
      <Navigation></Navigation>
      <div className="event-detail-container2">
        <div className="event-detail-hero">
          <h1>جزئیات رویداد</h1>
          <p>صفحه جزئیات رویداد (ID: {eventId})</p>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default EventDetail
