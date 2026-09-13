import React from 'react'
import { Helmet } from 'react-helmet'
import Navigation from '../components/navigation'
import Footer from '../components/footer'
import './book-session.css'

const BookSession = (props) => {
  const coachId = props.match.params.id
  
  return (
    <div className="book-session-container1">
      <Helmet>
        <title>رزرو جلسه کوچینگ | کار با مربی | بلومیا</title>
        <meta name="description" content="رزرو جلسه کوچینگ با مربی متخصص برای رشد فردی و حرفه‌ای" />
        <meta name="keywords" content="رزرو، جلسه، وقت، برنامه" />
        <link rel="canonical" href={`https://bloomiaclub.com/coaches/${coachId}/book`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="رزرو جلسه | بلومیا" />
        <meta property="og:description" content="u0631زرو جلسه کوچینگ با مربی مناسب" />
        <meta property="og:url" content={`https://bloomiaclub.com/coaches/${coachId}/book`} />
        <meta property="og:image" content="https://bloomiaclub.com/og-image.png" />
        <meta property="og:locale" content="fa_IR" />
        <meta property="og:site_name" content="بلومیا" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="رزرو جلسه" />
        <meta property="twitter:image" content="https://bloomiaclub.com/og-image.png" />
      </Helmet>
      <Navigation></Navigation>
      <div className="book-session-container2">
        <div className="book-session-hero">
          <h1>رزرو جلسه</h1>
          <p>صفحه رزرو جلسه با مربی (ID: {coachId})</p>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default BookSession
