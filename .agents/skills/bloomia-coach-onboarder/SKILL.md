---
name: bloomia-coach-onboarder
description: >-
  Autonomous coach onboarder, profile copywriter, visual asset publisher for Bloomia Club (bloomiaclub.com/coaches).
  Takes raw coach input (name, resume/notes, photo), crafts deeply human, engaging Persian copy (short bio, long bio, coaching philosophy, packages), validates ICF credentials, uploads the coach photo into Sanity Assets, and creates/publishes the coach document directly into Sanity CMS.
---

# Bloomia Coach Onboarder (سیستم ثبت و انتشار خودکار کوچ‌های بلومیا کلاب)

این اسکیل یک دستیار خودکار برای دریافت مشخصات اولیه یک کوچ جدید، تحلیل سوابق، نگارش متون حرفه‌ای و انسانی، آپلود بهینه عکس در CDN سنتی و انتشار مستقیم سند کوچ در **Sanity CMS** است.

---

## ۱. هویت برند و استانداردهای بلومیا برای کوچ‌ها

- **ترمینولوژی رسمی:** فقط «کوچ» و «کوچ‌ها». واژه‌های «مربی» و «مربیان» اکیداً ممنوع است.
- **استاندارد صلاحیت:** تمامی کوچ‌ها باید دارای مدارک معتبر از فدراسیون بین‌المللی کوچینگ (ICF) شامل سطوح ACC، PCC یا MCC یا در حال اتمام دوره‌های مورد تایید ICF باشند.
- **ممنوعیت مطلق ایموجی:** در هیچ‌یک از فیلدهای متنی کوچ (نام، عنوان، بیو، تخصص‌ها و بسته‌ها) نباید از هیچ ایموجی استفاده شود.
- **لحن انسانی و معتبر (Anti-AI):** بیوگرافی کوچ باید واقعی، باوقار، تخصصی و به دور از هرگونه کلیشه‌های شعاری و متن‌های زرد انگیزشی نوشته شود.

---

## ۲. مشخصات سند کوچ در Sanity CMS (`_type: "coach"`)

سند هر کوچ در Sanity شامل ساختار زیر است:

```typescript
{
  _type: 'coach',
  name: 'فرزانه شریفی',
  slug: { _type: 'slug', current: 'farzaneh-sharifi' },
  title: 'کوچ ارشد توسعه فردی و مهارت‌های ارتباطی (PCC)',
  description: 'بیش از ۸ سال سابقه در کوچینگ رهبری فردی، مدیریت تعارضات و افزایش وضوح ذهنی.',
  longDescription: 'بیش از ۸ سال است که به عنوان کوچ معتبر بین‌المللی...',
  avatar: {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: 'image-xxx-xxx-jpg', // شناسه فایل آپلود شده در سنتی
    },
  },
  specialties: ['رشد فردی', 'هوش هیجانی', 'توسعه ارتباطات'],
  rating: 5.0,
  totalReviews: 48,
  totalSessions: 420,
  coachingHours: 420,
  satisfiedClients: 65,
  packagePrices: {
    start: 4800000,
    discovery: 7200000,
    transformation: 9500000,
    excellence: 14000000,
  },
  packageDiscounts: {
    discovery: 15,
    transformation: 20,
  },
  instagramUrl: 'https://instagram.com/...',
  linkedinUrl: 'https://linkedin.com/in/...',
  isActive: true,
}
```

---

## ۳. فرآیند اجرای Onboarding توسط ایجنت

هنگامی که کاربر نام، اطلاعات یا عکس یک کوچ را ارائه می‌دهد:

1. **تحلیل داده‌ها و تولید محتوای پروفایل:**
   - تولید اسلاگ انگلیسی روان (مانند `sara-mohammadi`).
   - تدوین عنوان حرفه‌ای همراه با سطح مدرک ICF.
   - نگارش بیوگرافی کوتاه (۱ الی ۲ جمله جذاب برای کارت‌ها).
   - نگارش بیوگرافی کامل و تفصیلی (۲ الی ۳ پاراگراف عمیق درباره متدولوژی و رویکرد کوچ).
   - استخراج ۳ تا ۵ تخصص کلیدی.
   - پیشنهاد بازه قیمت استاندارد برای پکیج‌های ۴گانه بلومیا (شروع، کشف، تحول، تعالی).

2. **آپلود عکس کوچ در Sanity Assets:**
   - خواندن فایل عکس از مسیر اعلام‌شده توسط کاربر.
   - آپلود با کلاینت رسمی `@sanity/client` و `token: process.env.SANITY_WRITE_TOKEN`:
     ```javascript
     const imageAsset = await client.assets.upload('image', fs.createReadStream(imagePath), {
       filename: `${slug}-avatar.jpg`,
     });
     ```

3. **ایجاد و انتشار سند کوچ:**
   - با تابع `client.createOrReplace(...)` سند را با شناسه `coach-${slug}` منتشر کنید.
   - بازگشت آدرس زنده پروفایل کوچ در وبسایت: `https://bloomiaclub.com/coaches/${slug}`.
