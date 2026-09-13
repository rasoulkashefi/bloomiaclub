# 🌸 بلومیا کلاب (Bloomia Club)

پلتفرم تخصصی کوچینگ آنلاین و آکادمی توسعه فردی و شغلی.

🔗 وبسایت رسمی: [bloomiaclub.com](https://bloomiaclub.com)

---

## 🚀 ویژگی‌های کلیدی

- **پلتفرم جامع کوچینگ:** رزرو آنلاین جلسات با مربیان تاییدشده بین‌المللی در حوزه‌های مادری، توسعه فردی، مدیریت زمان و کسب‌وکار.
- **وبلاگ هوشمند با Sanity CMS:**
  - مدیریت محتوای متمرکز، سریع و واکنش‌گرا
  - تب‌های اختصاصی سئوی پیشرفته (SEO Suite)
  - بهینه‌سازی برای موتورهای هوش مصنوعی مولد (**GEO AI Engine**) برای SearchGPT، Perplexity و Google AI Overviews
  - اتصال مستقیم مقالات به پروفایل کوچ‌های بلومیا
- **معماری فوق‌سریع و بهینه‌شده:** Single Page Application (SPA) توسعه‌داده‌شده با React.

---

## 🛠️ استک فنی (Tech Stack)

- **فرانت‌اند:** React 17, React Router 5, Vanilla CSS Architecture
- **سیستم مدیریت محتوا (CMS):** Sanity CMS (Studio v3 & GROQ Engine)
- **پایگاه داده و بک‌اند:** Supabase
- **سئو و متادیتا:** React Helmet, Schema.org (JSON-LD Structured Data)
- **میزبانی و زیرساخت:** Vercel

---

## 💻 راه‌اندازی محلی (Local Development)

۱. کلون کردن مخزن:
```bash
git clone https://github.com/rasoulkashefi/bloomiaclub.git
cd bloomiaclub
```

۲. نصب وابستگی‌ها:
```bash
npm install --legacy-peer-deps
```

۳. تنظیم متغیرهای محیطی:
فایل `.env.example` را به `.env.local` کپی کرده و مقادیر لازم را وارد کنید.

۴. اجرای سرور توسعه فرانت‌اند:
```bash
npm start
```

۵. اجرای استودیوی مدیریت محتوای سنتی:
```bash
npx sanity dev
```

---

## 📄 اتوماسیون انتشار مقاله در سنتی

جهت انتشار خودکار مقالات با استفاده از فایل‌های ساختاریافته JSON:
```bash
node scripts/sanity/publish-article.mjs scripts/sanity/sample-article.json
```
