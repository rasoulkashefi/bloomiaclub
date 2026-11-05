---
name: bloomia-atyno-widget-sync
description: >-
  Autonomous synchronizer between Atyno booking engine and Bloomia Club. Configures coach Atyno widgets to match Bloomia Club brand design system (#1f3d3a, #fafaf8, Vazirmatn font), hides watermarks (Pro plan & removeWatermark), extracts the clean /fa/embed/<uuid> URL, embeds it seamlessly inside Bloomia Club modal (zero redirects, zero external branding), and syncs with Sanity CMS and Supabase.
---

# Bloomia & Atyno Widget Synchronizer (سیستم هماهنگ‌سازی و امبد ویجت آتینو در بلومیا)

این اسکیل مرجع قطعی، دقیق، خودکار و تکرارپذیر برای اتصال بی‌نقص موتور رزرواسیون **آتینو (Atyno)** به وبسایت **بلومیا کلاب (Bloomia Club)** است. با استفاده از این اسکیل، فرآیند رزرو جلسات معارفه و پکیج‌های کوچینگ بدون خروج کاربر از بلومیا و بدون نمایش هیچ‌گونه نام یا نشان ناسازگار، به‌صورت یکپارچه و ۱۰۰٪ هماهنگ با دیزاین‌سیستم بلومیا اجرا می‌شود.

---

## ۰. اصل اساسی: امبدینگ نیتیو بدون خروج از بلومیا (Native Modal Embedding)

> [!IMPORTANT]
> **قانون قطعی تجربه کاربری (Zero-Redirect & Zero-Slop):**
> - در هیچ‌کجای صفحات کوچ‌های بلومیا، دکمه‌های «رزرو جلسه معارفه رایگان» نباید کاربر را به تب جدید یا سایت خارجی ریدایرکت کنند.
> - نام آتینو نباید در متن دکمه‌ها، عنوان‌ها یا توضیحات دیده شود (مانند عبارت نامناسب «رزرو وقت در آتینو» که اکیداً ممنوع است).
> - تمام تعاملات رزرو باید از طریق کامپوننت داخلی `AtynoBookingModal` در قالب یک مودال سریع، ریسپانسیو و چشم‌نواز با رنگ سازمانی بلومیا (`#1f3d3a`) باز شوند.
> - تمامی واترمارک‌ها و نشان‌های تجاری پلتفرم رزرو در صفحه امبد باید از طریق پلن حرفه‌ای (`is_premium: true` و `removeWatermark: true`) کاملاً حذف شوند.

---

## ۱. ساختار آدرس امبد و نحوه عملکرد (Embed URL Anatomy)

موتور رزرواسیون آتینو مسیر ایزوله و بهینه‌ای برای آی‌فریم‌ها در مسیر `/fa/embed/[id]` فراهم می‌کند:

```text
https://atyno.com/fa/embed/<USER_UUID>?meeting=<SESSION_SLUG>
https://atyno.com/fa/embed/<USER_UUID>?package=<PACKAGE_SLUG>
```

- **`USER_UUID`**: شناسه یکتای کوچ در جدول `profiles` و `auth.users` آتینو (مثال‌ها: پارمیس یاری: `62eb65e6-f7bc-4b8c-8ea0-e3a7c974a9bd`، آرزو غفاری: `f2f11bdb-3377-4df4-bc88-bc575de4a379`).
- **`meeting`**: اسلاگ جلسه موردنظر در جدول `booking_session_types` (مثال: `intro-call` یا `zero`).
- **`package`**: اسلاگ پکیج موردنظر در جدول `session_packages` (مثال: `breakthrough-coaching`).
- **حالت بدون هدر و بدون فوتر:** در صورت فعال بودن پلن حرفه‌ای، این صفحه فاقد هرگونه ناوبار، فوتر و واترمارک بوده و صرفاً تقویم انتخاب تاریخ و ساعت را با تایپوگرافی و رنگ‌های بلومیا نمایش می‌دهد.

---

## ۲. پالت رنگ و توکن‌های اجباری بلومیا در دیتابیس آتینو

هنگام تنظیم ویجت هر کوچ در جدول `booking_pages` دیتابیس آتینو، مقادیر فیلدها باید دقیقاً مطابق جدول زیر تنظیم شوند:

| نام فیلد در دیتابیس آتینو | مقدار تنظیمی بلومیا | توضیح |
| :--- | :--- | :--- |
| `brand_color` | `#1f3d3a` | رنگ سبز کله‌غازی عمیق و اصیل بلومیا |
| `widget_primary_color` | `#1f3d3a` | رنگ دکمه‌ها و روزهای انتخابی تقویم |
| `widget_bg_color` | `#ffffff` | پس‌زمینه کارت تقویم |
| `widget_text_color` | `#1e1e1e` | رنگ متن و روزهای هفته |
| `widget_border_color` | `#e5e5e2` | رنگ خطوط و کادرهای جدول تقویم |
| `widget_card_bg` | `#fafaf8` | رنگ پس‌زمینه کارت‌های ساعات و روزها |
| `widget_font_family` | `vazirmatn` | فونت رسمی سامانه (وزیرمتن) |
| `widget_show_avatar` | `false` | عدم نمایش آواتار بالای تقویم (مودال بلومیا خود هدر دارد) |
| `widget_show_name` | `false` | عدم نمایش مجدد نام کوچ درون آی‌فریم |
| `widget_show_description` | `false` | عدم نمایش متون تکراری بیوگرافی |
| `widget_embed_type` | `all` | دسترسی کامل به انواع جلسات تعریف‌شده |
| `widget_view` | `default` | نمای استاندارد انتخاب روز و ساعت |

---

## ۳. دستور اجرای خودکار یک‌کلیکه (One-Click Automated Script)

اسکریپت خودکار زیر در مسیر `scripts/sync-atyno-coach-widget.mjs` تمامی مراحل همگام‌سازی را با یک فرمان اجرا می‌کند:

```bash
# سینتکس:
node scripts/sync-atyno-coach-widget.mjs <coach-email> <coach-slug>

# مثال اجرایی برای آرزو غفاری:
node scripts/sync-atyno-coach-widget.mjs arezou.ghafari7533@gmail.com Arezoo_Ghaffari

# مثال اجرایی برای پارمیس یاری:
node scripts/sync-atyno-coach-widget.mjs yariparmiss120@gmail.com parmiss-yari
```

### عملیات انجام‌شده توسط این اسکریپت:
1. اتصال مستقیم به دیتابیس آتینو با استفاده از کلیدهای سرویس رول در `d:/atyno/.env.local`.
2. جستجوی کاربر با ایمیل در `auth.users` و استخراج `UUID`.
3. به‌روزرسانی جدول `profiles` به `is_premium = true`.
4. ارتقای فضای کاری در جدول `workspaces` به پلن `pro` با ویژگی `custom_features: { removeWatermark: true, directPaymentIntegration: true }`.
5. تزریق پالت رنگی و استایل‌های سازمانی بلومیا در جدول `booking_pages`.
6. استخراج جلسه معارفه فعال (اسلاگ شامل `zero` یا `intro` یا عنوان شامل `معارفه`/`آشنایی`) و محاسبه دقیق و داینامیک مدت‌زمان (مثلاً ۴۵ دقیقه یا ۶۰ دقیقه).
7. استخراج پکیج‌های فعال از جدول `session_packages`، محاسبه درصد تخفیف واقعی بر اساس `compare_at_price` و تنظیم مدت زمان هر جلسه متناسب با تایپ جلسه مرتبط.
8. پچ مستقیم سند کوچ در **Sanity CMS** (`coach.bookingUrl`, `coach.services`, `coach.packages`).
9. همگام‌سازی لحظه‌ای بک‌آپ در جدول `v2_coaches` دیتابیس Supabase بلومیا.

---

## ۴. چک‌لیست تغییرات تکمیلی کد فرانت‌اند بلومیا

پس از اجرای اسکریپت همگام‌سازی، موارد زیر در سورس‌کد پروژه بررسی/اعمال شوند:

1. **ثبت شناسه در مودال (`src/components/coach/AtynoBookingModal.tsx`):**
   - افزودن `UUID: username` به آبجکت `UUID_MAP` جهت لینک باز کردن در پنجره جدید (`publicFallbackUrl`).
   ```ts
   const UUID_MAP: Record<string, string> = {
     '62eb65e6-f7bc-4b8c-8ea0-e3a7c974a9bd': 'parmiss',
     '934b33a2-9888-4209-9901-b9632e812e6c': 'fatemeh',
     'a7efb113-6e61-4623-838c-2f223cf476e8': 'payamesmi',
     'f2f11bdb-3377-4df4-bc88-bc575de4a379': 'arezou_ghafari',
   };
   ```

2. **همگام‌سازی داده‌های فال‌بک استاتیک (`src/lib/coaches.ts`):**
   - درج `bookingUrl` رسمی در آبجکت کوچ در `fallbackCoaches`.
   - به‌روزرسانی آرایه‌های `services` و `packagesData` با دقایق، قیمت‌ها و لینک‌های واقعی جهت تضمین کارکرد در حالت آفلاین یا تاخیر سرور Sanity.

3. **حفاظت مسیر داینامیک (`src/app/coaches/[slug]/page.tsx`):**
   - بررسی وجود گارد `coach.bookingUrl` برای اسلاگ کوچ تا در هر شرایطی تقویم امبد لود شود.

---

## ۵. تست و اعتبارسنجی نهایی (Verification Protocol)

1. **بررسی عدم وجود واترمارک و هدر CSP:**
   ```bash
   node -e "
   fetch('https://atyno.com/fa/embed/<USER_UUID>?meeting=<SLUG>')
     .then(r => r.text())
     .then(html => {
       const domOnly = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
       console.log('Watermark in DOM:', domOnly.includes('Powered by Atyno')); // باید false باشد
     });
   "
   ```
2. **بررسی بیلد پروداکشن Next.js:**
   ```bash
   npm run build
   ```
   تمام صفحات داینامیک و استاتیک باید با خروجی `Exit code 0` کامپایل شوند.
