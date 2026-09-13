import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import Navigation from '../components/navigation'
import Footer from '../components/footer'
import './faq.css'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0)

  const items = [
    {
      question: 'کوچینگ دقیقاً چیست و چه کمکی می‌کند؟',
      answer:
        'کوچینگ یک فرآیند حرفه‌ای و ساختاریافته برای شفاف‌سازی، تصمیم‌گیری آگاهانه و حرکت به‌سوی تغییر است. در کوچینگ، به‌جای ارائه راه‌حل آماده، کوچ با طرح سؤال‌های هدفمند به شما کمک می‌کند پاسخ‌ها و مسیر مناسب خودتان را کشف کنید و به اقدام عملی برسید.',
    },
    {
      question: 'کوچینگ چه تفاوتی با مشاوره یا روان‌درمانی دارد؟',
      answer:
        'کوچینگ بر حال و آینده تمرکز دارد، نه درمان گذشته. در حالی که روان‌درمانی به درمان اختلالات روانی می‌پردازد و مشاوره معمولاً توصیه‌محور است، کوچینگ فرآیندی مشارکتی برای افزایش آگاهی، مسئولیت‌پذیری و اقدام آگاهانه است.',
    },
    {
      question: 'آیا کوچینگ برای همه مناسب است؟',
      answer:
        'کوچینگ برای افرادی مناسب است که می‌خواهند تغییری واقعی ایجاد کنند، آماده فکر کردن، تصمیم گرفتن و اقدام هستند و به دنبال رشد فردی یا شفافیت ذهنی‌اند. اگر به دنبال راه‌حل فوری یا نسخه آماده هستید، کوچینگ ممکن است انتخاب مناسبی نباشد.',
    },
    {
      question: 'جلسه آشنایی (جلسه صفر) چیست؟',
      answer:
        'جلسه آشنایی یک گفت‌وگوی کوتاه برای آشنایی با کوچ، بررسی چالش یا هدف شما و اطمینان از تناسب کوچینگ با نیازتان است. این جلسه به شما کمک می‌کند آگاهانه تصمیم بگیرید که آیا ادامه مسیر برایتان مناسب است یا خیر.',
    },
    {
      question: 'چگونه کوچ مناسب خودم را انتخاب کنم؟',
      answer:
        'در بلومیا می‌توانید تخصص‌ها و رویکرد هر کوچ را بررسی کنید، توضیحات و فلسفه کاری او را بخوانید و با جلسه آشنایی، تناسب را بسنجید. انتخاب کوچ یک انتخاب شخصی است و ما به این آگاهی احترام می‌گذاریم.',
    },
    {
      question: 'جلسات کوچینگ به چه صورت برگزار می‌شود؟',
      answer:
        'جلسات کوچینگ در بلومیا به‌صورت آنلاین برگزار می‌شوند و در بازه‌های زمانی مشخص (معمولاً ۶۰ دقیقه‌ای) انجام می‌گیرند. زمان‌بندی جلسات با هماهنگی مستقیم بین شما و کوچ انجام می‌شود.',
    },
    {
      question: 'آیا اطلاعات و صحبت‌های من محرمانه باقی می‌ماند؟',
      answer:
        'بله، کاملاً. محرمانگی یکی از اصول بنیادین کوچینگ در بلومیاست. تمامی گفتگوها در فضای امن و محرمانه انجام می‌شود و کوچ‌ها به اصول اخلاق حرفه‌ای پایبند هستند.',
    },
    {
      question: 'اگر بعد از شروع احساس کنم کوچینگ برایم مناسب نیست، چه می‌شود؟',
      answer:
        'کوچینگ یک مسیر آگاهانه است. اگر در هر مرحله احساس کردید این مسیر برای شما مناسب نیست، می‌توانید تصمیم خود را بازبینی کنید. هدف بلومیا، همراهی آگاهانه است نه اجبار به ادامه مسیر.',
    },
  ]

  return (
    <div className="faq-page">
      <Helmet>
        <title>سؤالات متداول کوچینگ | پاسخ به پرسش‌های رایج در بلومیا</title>
        <meta name="description" content="پاسخ به سؤالات متداول درباره کوچینگ در بلومیا؛ از نحوه شروع جلسات و انتخاب کوچ تا محرمانگی" />
        <meta name="keywords" content="سؤال مکرر، FAQ، کوچینگ، راهنما، پاسخ" />
        <link rel="canonical" href="https://bloomiaclub.com/faq" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="سؤالات متداول کوچینگ" />
        <meta property="og:description" content="پاسخ تفصیلی به تمام سؤالات درباره کوچینگ و خدمات بلومیا" />
        <meta property="og:url" content="https://bloomiaclub.com/faq" />
        <meta property="og:image" content="https://bloomiaclub.com/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="fa_IR" />
        <meta property="og:site_name" content="بلومیا" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="سؤالات متداول" />
        <meta property="twitter:description" content="پاسخ سؤالات درباره کوچینگ" />
        <meta property="twitter:image" content="https://bloomiaclub.com/og-image.png" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "name": "سؤالات متداول",
            "url": "https://bloomiaclub.com/faq",
            "inLanguage": "fa-IR"
          })}
        </script>
      </Helmet>
      <Navigation />

      <main className="faq-main">
        <section className="faq-hero">
          <h1>سؤالات متداول</h1>
          <p>پاسخ شفاف به پرسش‌هایی که قبل از شروع کوچینگ برایتان پیش می‌آید</p>
        </section>

        <section className="faq-list">
          {items.map((item, index) => (
            <div key={item.question} className={`faq-item ${openIndex === index ? 'is-open' : ''}`}>
              <button
                type="button"
                className="faq-question"
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              >
                <span>{item.question}</span>
                <span className="faq-toggle">{openIndex === index ? '−' : '+'}</span>
              </button>
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="faq-cta">
          <p>
            اگر پاسخ پرسش‌تان را پیدا نکردید، می‌توانید با مشاهده کوچ‌ها یا شروع یک جلسه آشنایی، مسیر را بررسی کنید.
          </p>
          <a href="/coaches" className="btn btn-primary">مشاهده کوچ‌ها</a>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default FAQ
