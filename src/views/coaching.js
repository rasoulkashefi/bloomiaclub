import React from 'react'
import { Helmet } from 'react-helmet'
import Navigation from '../components/navigation'
import Footer from '../components/footer'
import './coaching.css'

const Coaching = () => {
  return (
    <div className="coaching-page">
      <Helmet>
        <title>کوچینگ چیست؟ | کوچینگ فردی و سازمانی در بلومیا</title>
        <meta name="description" content="کوچینگ در بلومیا یک فرآیند حرفه‌ای، انسان‌محور و مبتنی بر شواهد است که به افراد و سازمان‌ها کمک می‌کند به شفافیت، رشد پایدار و عملکرد بهتر دست پیدا کنند." />
        <meta name="keywords" content="کوچینگ، کوچینگ فردی، کوچینگ سازمانی، رشد شغلی، مشاور، توسعه" />
        <link rel="canonical" href="https://bloomiaclub.com/coaching" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="کوچینگ چیست؟ | کوچینگ فردی و سازمانی در بلومیا" />
        <meta property="og:description" content="کوچینگ در بلومیا یک فرآیند حرفه‌ای برای شفاف‌سازی، تصمیم‌گیری و رشد شغلی و فردی" />
        <meta property="og:url" content="https://bloomiaclub.com/coaching" />
        <meta property="og:image" content="https://bloomiaclub.com/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="fa_IR" />
        <meta property="og:site_name" content="بلومیا" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="کوچینگ در بلومیا" />
        <meta property="twitter:description" content="فرآیند حرفه‌ای برای رشد و شفافیت ذهنی" />
        <meta property="twitter:image" content="https://bloomiaclub.com/og-image.png" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "کوچینگ چیست؟",
            "url": "https://bloomiaclub.com/coaching",
            "description": "کوچینگ در بلومیا یک فرآیند حرفه‌ای",
            "inLanguage": "fa-IR"
          })}
        </script>
      </Helmet>

      <Navigation />

      <main className="coaching-main">
        <section className="coaching-hero">
          <span className="coaching-hero-tag">کوچینگ در بلومیا</span>
          <h1>کوچینگ در بلومیا</h1>
          <p>
            کوچینگ یک فرآیند ساختارمند، هدف‌محور و مبتنی بر گفتگو است که به افراد و تیم‌ها کمک می‌کند
            آگاهی عمیق‌تری نسبت به خود، اهداف و انتخاب‌هایشان پیدا کنند و از این مسیر به رشد پایدار
            شخصی و حرفه‌ای برسند.
          </p>
          <p>
            در کوچینگ، تمرکز بر توانمندسازی است، نه آموزش مستقیم یا ارائه راه‌حل آماده. کوچ با طرح
            پرسش‌های دقیق، ایجاد فضای امن و همراهی حرفه‌ای، به فرد یا تیم کمک می‌کند بهترین پاسخ‌ها را
            از درون خودشان کشف کنند.
          </p>
        </section>

        <section className="coaching-section">
          <h2>کوچینگ برای چه کسانی مناسب است؟</h2>
          <div className="coaching-split">
            <div className="coaching-card">
              <h3>افراد</h3>
              <p>کوچینگ فردی در بلومیا برای کسانی مناسب است که:</p>
              <ul>
                <li>در یک مقطع گذار یا تصمیم‌گیری مهم قرار دارند</li>
                <li>به دنبال تعادل بین کار و زندگی هستند</li>
                <li>می‌خواهند مسیر رشد شخصی خود را آگاهانه‌تر طی کنند</li>
                <li>در نقش‌های والدگری، شغلی یا فردی با چالش مواجه‌اند</li>
              </ul>
              <p>
                کوچینگ فردی کمک می‌کند فرد با وضوح بیشتر، مسئولیت انتخاب‌هایش را بپذیرد و با اعتماد به
                نفس جلو برود.
              </p>
            </div>
            <div className="coaching-card">
              <h3>سازمان‌ها</h3>
              <p>کوچینگ سازمانی در بلومیا با تمرکز بر انسان، فرهنگ و عملکرد طراحی شده است و برای سازمان‌هایی مناسب است که:</p>
              <ul>
                <li>به توسعه رهبران و مدیران اهمیت می‌دهند</li>
                <li>با فرسودگی شغلی، کاهش انگیزه یا چالش‌های ارتباطی مواجه‌اند</li>
                <li>به دنبال افزایش اثربخشی تیم‌ها هستند</li>
                <li>می‌خواهند فرهنگ سازمانی سالم‌تری بسازند</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="coaching-section coaching-muted">
          <h2>رویکرد کوچینگ در بلومیا</h2>
          <ul className="coaching-pill-list">
            <li>انسان‌محور: تمرکز بر تجربه انسانی، نه صرفاً عملکرد</li>
            <li>مبتنی بر شواهد: الهام‌گرفته از روان‌شناسی، علوم رفتاری و کوچینگ حرفه‌ای</li>
            <li>غیرانگیزشی و عمیق: به‌جای شعار، به‌دنبال تغییر پایدار</li>
            <li>اخلاق‌محور و امن: حفظ محرمانگی و احترام کامل به مراجع</li>
            <li>توسط کوچ‌های حرفه‌ای و گزینش‌شده: نه بازار باز و بدون کنترل کیفیت</li>
          </ul>
        </section>

        <section className="coaching-section">
          <h2>کوچینگ سازمانی در بلومیا</h2>
          <p>
            بلومیا به سازمان‌ها کمک می‌کند برنامه‌های کوچینگ متناسب با نیاز واقعی‌شان طراحی و اجرا کنند.
          </p>
          <h3>مسائل کلیدی که پوشش می‌دهیم:</h3>
          <ul>
            <li>توسعه رهبری و مهارت‌های مدیریتی</li>
            <li>بهبود ارتباطات درون‌تیمی</li>
            <li>افزایش تاب‌آوری و کاهش فرسودگی شغلی</li>
            <li>همراهی در دوره‌های تغییر و رشد سازمانی</li>
          </ul>
          <h3>قالب‌های ارائه:</h3>
          <ul>
            <li>کوچینگ فردی مدیران و رهبران (Executive Coaching)</li>
            <li>کوچینگ تیمی</li>
            <li>جلسات گروهی و کارگاه‌های تعاملی</li>
            <li>برنامه‌های اختصاصی متناسب با سازمان</li>
          </ul>
          <div className="coaching-cta-inline">
            <p>اگر به دنبال یک راهکار انسانی، حرفه‌ای و قابل اتکا برای توسعه سازمان خود هستید، با ما گفتگو کنید.</p>
            <a href="/contact" className="btn btn-outline">گفتگو درباره کوچینگ سازمانی</a>
          </div>
        </section>

        <section className="coaching-section coaching-muted">
          <h2>کوچینگ فردی در بلومیا</h2>
          <p>در بلومیا می‌توانید با کوچ متناسب با نیاز و شرایط خود کار کنید:</p>
          <ul>
            <li>جلسات آنلاین و منعطف</li>
            <li>تمرکز بر اهداف واقعی زندگی و کار</li>
            <li>انتخاب آگاهانه کوچ از میان کوچ‌های تأییدشده</li>
          </ul>
          <a href="/coaches" className="btn btn-primary">مشاهده کوچ‌ها</a>
        </section>

        <section className="coaching-section">
          <h2>چرا بلومیا؟</h2>
          <ul>
            <li>انتخاب دقیق و محدود کوچ‌ها</li>
            <li>شفافیت در فرآیند و انتظارات</li>
            <li>نگاه بلندمدت به رشد</li>
            <li>ترکیب کوچینگ فردی، سازمانی و جامعه‌محور</li>
            <li>احترام عمیق به انسان و تجربه زیسته او</li>
          </ul>
        </section>

        <section className="coaching-section coaching-muted">
          <h2>پرسش‌های متداول درباره کوچینگ</h2>
          <div className="coaching-faq">
            <div>
              <h3>کوچینگ چه تفاوتی با روان‌درمانی دارد؟</h3>
              <p>
                کوچینگ بر حال و آینده تمرکز دارد و هدف آن توانمندسازی برای اقدام و رشد است، در حالی
                که روان‌درمانی به درمان مسائل روان‌شناختی می‌پردازد.
              </p>
            </div>
            <div>
              <h3>آیا کوچینگ برای سازمان‌ها مناسب است؟</h3>
              <p>
                بله. کوچینگ یکی از مؤثرترین ابزارها برای توسعه رهبری، بهبود فرهنگ سازمانی و افزایش
                اثربخشی تیم‌هاست.
              </p>
            </div>
            <div>
              <h3>کوچ‌های بلومیا چگونه انتخاب می‌شوند؟</h3>
              <p>
                تمام کوچ‌ها بر اساس معیارهای حرفه‌ای، تجربه، آموزش و هم‌راستایی با ارزش‌های بلومیا
                ارزیابی و انتخاب می‌شوند.
              </p>
            </div>
          </div>
        </section>

        <section className="coaching-cta coaching-cta-centered">
          <h2>دعوت نهایی</h2>
          <p>
            کوچینگ در بلومیا، دعوتی است به مکث، آگاهی و حرکت آگاهانه. اگر آماده‌اید مسیر رشد خود یا
            سازمان‌تان را عمیق‌تر و انسانی‌تر طی کنید، بلومیا کنار شماست.
          </p>
          <div className="coaching-cta-actions">
            <a href="/free-intro-session" className="btn btn-primary">رزرو جلسه آشنایی رایگان</a>
            <a href="/contact" className="btn btn-outline">گفتگو با بلومیا</a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Coaching
