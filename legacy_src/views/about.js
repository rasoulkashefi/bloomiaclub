import React from 'react'
import { Helmet } from 'react-helmet'
import Navigation from '../components/navigation'
import Footer from '../components/footer'
import './about.css'

const About = () => {
  return (
    <div className="about-page">
      <Helmet>
        <title>درباره بلومیا | پلتفرم تخصصی کوچینگ و رشد فردی</title>
        <meta name="description" content="بلومیا پلتفرم تخصصی کوچینگ و رشد فردی است که با همراهی کوچ‌های حرفه‌ای، به افراد کمک می‌کند به شفافیت ذهنی، تعادل و تغییر پایدار دست پیدا کنند." />
        <meta name="keywords" content="درباره بلومیا، تاریخچه کوچینگ، تیم بلومیا، رشد فردی" />
        <link rel="canonical" href="https://bloomiaclub.com/about" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="درباره بلومیا | پلتفرم تخصصی کوچینگ" />
        <meta property="og:description" content="بلومیا پلتفرم تخصصی کوچینگ و رشد فردی است که با همراهی کوچ‌های حرفه‌ای عمل می‌کند." />
        <meta property="og:url" content="https://bloomiaclub.com/about" />
        <meta property="og:image" content="https://bloomiaclub.com/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="fa_IR" />
        <meta property="og:site_name" content="بلومیا" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="درباره بلومیا" />
        <meta property="twitter:description" content="بلومیا پلتفرم تخصصی کوچینگ و رشد فردی" />
        <meta property="twitter:image" content="https://bloomiaclub.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "درباره بلومیا",
            "url": "https://bloomiaclub.com/about",
            "description": "بلومیا پلتفرم تخصصی کوچینگ و رشد فردی",
            "inLanguage": "fa-IR",
            "mainEntity": {
              "@type": "Organization",
              "name": "بلومیا",
              "url": "https://bloomiaclub.com"
            }
          })}
        </script>
      </Helmet>

      <Navigation />

      <main className="about-main">
        <section className="about-hero">
          <h1>
            جایی برای مکث،<br />تفکر و رشد واقعی
          </h1>
          <p className="about-hero-lead">
            بلومیا فضایی است که در آن، هیاهوی بیرون رنگ می بازد تا صدای درون شنیده شود. ما اینجا
            هستیم تا مسیر رشد را از شعار به شعور تبدیل کنیم.
          </p>
        </section>

        <section className="about-hero-image-section">
          <div className="about-hero-image-wrap">
            <picture>
              <source srcSet="/images/about_us.avif" type="image/avif" />
              <source srcSet="/images/about_us.webp" type="image/webp" />
              <img
                src="/images/about_us.png"
                alt="بلومیا"
                width="1408"
                height="768"
                loading="lazy"
                decoding="async"
              />
            </picture>
          </div>
          <p className="about-hero-caption">فضایی امن برای گفتگوهای عمیق و سازنده</p>
        </section>

        <section className="about-sections">
          <div className="about-section">
            <h2>بلومیا چیست؟</h2>
            <div className="about-divider"></div>
            <p>
              بلومیا یک پلتفرم تخصصی کوچینگ و توسعه فردی است، اما نه به معنای رایج آن. ما معتقدیم
              رشد انسان، فرآیندی خطی یا ماشینی نیست که با فرمول های آماده حاصل شود. بلومیا پلی است
              میان دانش تخصصی و تجربه زیسته انسانی؛ جایی که شما نه یک مشتری، بلکه انسانی با دغدغه های
              ارزشمند دیده می شوید. ما از راهکارهای فوری و انگیزشی های توخالی فاصله می گیریم تا به
              ریشه ها بپردازیم.
            </p>
          </div>

          <div className="about-story">
            <div className="about-story-content">
              <h2>داستان شکل گیری</h2>
              <p className="about-story-lead">
                همه چیز از یک سوال ساده شروع شد: «چرا در دنیایی پر از توصیه های موفقیت، هنوز احساس
                گم شدگی می کنیم؟»
              </p>
              <p>
                بلومیا در پاسخ به نیاز به عمق متولد شد. موسسین ما، پس از سال ها فعالیت در حوزه های
                مدیریت و روانشناسی، متوجه خلاء بزرگی شدند: نبود فضایی امن و حرفه ای که در آن فرد بدون
                قضاوت شنیده شود و به جای دریافت نسخه های آماده، به کشف پاسخ های درونی خود بپردازد.
                ما بلومیا را ساختیم تا پناهگاهی برای ذهن های جستجوگر باشد.
              </p>
            </div>
          </div>

          <div className="about-divider-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="about-values">
            <h2>ارزش هایی که با آن ها زندگی می کنیم</h2>
            <div className="about-values-grid">
              <div className="about-value-card">
                <h3>شفافیت و صداقت</h3>
                <p>ما وعده تغییر یک شبه نمی دهیم. با شما صادق هستیم که مسیر رشد، گاهی دشوار و نیازمند زمان است.</p>
              </div>
              <div className="about-value-card">
                <h3>حضور انسانی</h3>
                <p>تکنولوژی ابزار ماست، نه هویت ما. در بلومیا، ارتباط انسان با انسان در اولویت مطلق قرار دارد.</p>
              </div>
              <div className="about-value-card">
                <h3>تخصص گرایی</h3>
                <p>کوچ های ما نه بر اساس فالوور، بلکه بر اساس دانش آکادمیک، تجربه و صلاحیت حرفه ای انتخاب می شوند.</p>
              </div>
              <div className="about-value-card">
                <h3>فضای امن</h3>
                <p>رازداری و عدم قضاوت، خط قرمزهای ما هستند. اینجا می توانید خود واقعی تان باشید.</p>
              </div>
            </div>
          </div>

          <div className="about-approach">
            <h2>رویکرد کوچینگ ما</h2>
            <p>
              ما از متدولوژی های معتبر جهانی (ICF) استفاده می کنیم، اما آن ها را با فرهنگ و نیاز بومی
              منطبق کرده ایم. جلسات در بلومیا شبیه کلاس درس نیستند؛ بلکه سفری اکتشافی اند. کوچ شما،
              هم سفر شماست که با پرسیدن سوالات درست، چراغی بر زوایای تاریک مسیر می اندازد تا خودتان
              راه را پیدا کنید.
            </p>
            <div className="about-tags">
              <span>شنود فعال</span>
              <span>پرسشگری سقراطی</span>
              <span>بازخورد سازنده</span>
            </div>
          </div>
        </section>

        <section className="about-cta">
          <h3>آماده اید کمی عمیق تر نگاه کنید؟</h3>
          <p>
            بدون عجله، هر زمان که احساس کردید زمانش فرا رسیده است، ما اینجا هستیم تا گفتگو را آغاز
            کنیم.
          </p>
          <a href="/coaching/free-intro-session" className="btn btn-primary">
            رزرو جلسه مشاوره اولیه
          </a>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default About
