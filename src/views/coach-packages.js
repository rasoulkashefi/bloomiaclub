import React from 'react'
import { Helmet } from 'react-helmet'
import Navigation from '../components/navigation'
import Footer from '../components/footer'
import './coach-packages.css'

const CoachPackages = (props) => {
  const coachId = props.match.params.id
  
  return (
    <div className="coach-packages-container1">
      <Helmet>
        <title>بسته‌ها و قیمت‌ها | بسته‌های کوچینگ | بلومیا</title>
        <meta name="description" content="بسته‌های کوچینگ با قیمت‌های متنوع برای رشد شغلی و فردی" />
        <meta name="keywords" content="بسته، قیمت، تعرفه، جلسه" />
        <link rel="canonical" href={`https://bloomiaclub.com/coaches/${coachId}/packages`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="بسته‌ها و قیمت‌ها" />
        <meta property="og:description" content="تمام بسته‌های كوچینگ و قیمت‌گذاری" />
        <meta property="og:url" content={`https://bloomiaclub.com/coaches/${coachId}/packages`} />
        <meta property="og:image" content="https://bloomiaclub.com/og-image.png" />
        <meta property="og:locale" content="fa_IR" />
        <meta property="og:site_name" content="بلومیا" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="بسته‌ها و قیمت‌ها" />
        <meta property="twitter:image" content="https://bloomiaclub.com/og-image.png" />
      </Helmet>
      <Navigation></Navigation>
      <div className="coach-packages-container2">
        <div className="coach-packages-hero">
          <h1>بسته‌های کوچینگ</h1>
          <p>صفحه بسته‌ها و قیمت‌های مربی (ID: {coachId})</p>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default CoachPackages
