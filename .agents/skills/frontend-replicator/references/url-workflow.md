# URL Extraction Workflow (گردش‌کار استخراج فرانت‌اند از URL زنده)

این سند فرآیند گام‌به‌گام استخراج ساختار بصری، مقادیر دقیق CSS رندرشده (Computed Styles) و المان‌های تعاملی از یک وبسایت زنده را تشریح می‌کند.

---

## دو شیوه اجرایی در دسترس

### روش ۱: استفاده از اسکریپت خودکار (`extract-component.mjs`) - پیشنهاد اصلی و سریع‌ترین روش

در این پروژه یک اسکریپت آماده با Playwright قرار دارد که کروم محلی سیستم را باز می‌کند، اسکرین‌شات دسکتاپ و موبایل می‌گیرد و تمام مقادیر CSS را در قالب یک فایل JSON و یک گزارش تمیز Markdown ذخیره می‌کند:

```bash
node .agents/skills/frontend-replicator/scripts/extract-component.mjs --url "https://target-site.com" --selector "section.hero" --output "extracted/hero"
```

#### پارامترهای اسکریپت:
- `--url`: آدرس کامل صفحه هدف (اجباری)
- `--selector`: سلکتور CSS بخش مورد نظر (اختیاری؛ پیش‌فرض: `body` یا کل سکشن)
- `--output`: پوشه ذخیره خروجی‌ها (پیش‌فرض: `./extracted-ui`)
- `--wait`: زمان انتظار بر حسب میلی‌ثانیه برای لود کامل انیمیشن‌ها و فونت‌ها (پیش‌فرض: `2000`)
- `--fullpage`: اسکرین‌شات از تمام ارتفاع صفحه (اختیاری)

#### خروجی‌های تولیدی اسکریپت:
1. `desktop.png`: نمای دسکتاپ با وضوح بالا (1280x800) در رتینا (Scale 2x).
2. `mobile.png`: نمای موبایل (390x844 - آیفون ۱۴/استاندارد روز) برای بررسی چیدمان موبایل‌فرست.
3. `element.png`: اسکرین‌شات متمرکز و کراپ‌شده روی سلکتور هدف.
4. `styles.json`: تمامی مقادیر رندرشده CSS (رنگ‌ها، تایپوگرافی، فواصل، پدینگ‌ها، شدوها، SVGها).
5. `summary.md`: جدول خلاصه مقادیر و نگاشت آماده به کلاس‌های Tailwind.

**مرحله بعد:** ایجنت بلافاصله با `view_file` تصویر `element.png` و فایل `summary.md` را بررسی کرده و کد کامپوننت را تولید می‌کند.

---

### روش ۲: استفاده مستقیم از ابزارهای Playwright MCP (در صورت فعال بودن در نشست)

اگر سرور Playwright MCP فعال باشد، ایجنت می‌تواند از ابزارهای بومی آن استفاده کند:

#### گام ۱: ناوبری
استفاده از `playwright_navigate` با آدرس سایت هدف و انتظار برای تکمیل شبکه.

#### گام ۲: عکس‌برداری بصری
استفاده از `playwright_screenshot` با سلکتور بخش مد نظر برای ثبت چیدمان بصری.

#### گام ۳: استخراج استایل‌های محاسباتی با `playwright_evaluate`
اجرای کد زیر در صفحه مرورگر برای بیرون کشیدن دقیق‌ترین توکن‌ها بدون حدس زدن:

```javascript
(() => {
  const el = document.querySelector('[SELECTOR]') || document.querySelector('header, section, main');
  if (!el) return { error: 'Element not found' };

  const getStyle = (node) => {
    if (!node) return null;
    const s = window.getComputedStyle(node);
    return {
      display: s.display,
      flexDirection: s.flexDirection,
      gap: s.gap,
      padding: s.padding,
      margin: s.margin,
      maxWidth: s.maxWidth,
      background: s.backgroundColor || s.background,
      borderRadius: s.borderRadius,
      boxShadow: s.boxShadow,
      fontFamily: s.fontFamily,
      fontSize: s.fontSize,
      fontWeight: s.fontWeight,
      lineHeight: s.lineHeight,
      color: s.color,
    };
  };

  const title = el.querySelector('h1, h2, [class*="title"], [class*="heading"]');
  const description = el.querySelector('p, [class*="description"], [class*="subtitle"]');
  const ctas = Array.from(el.querySelectorAll('button, a[class*="btn"], a[class*="button"]'));
  const badges = Array.from(el.querySelectorAll('[class*="badge"], [class*="tag"], [class*="pill"]'));

  return {
    container: getStyle(el),
    title: { text: title?.innerText?.trim(), styles: getStyle(title) },
    description: { text: description?.innerText?.trim(), styles: getStyle(description) },
    ctas: ctas.map(c => ({ text: c.innerText?.trim(), href: c.getAttribute('href'), styles: getStyle(c) })),
    badges: badges.map(b => ({ text: b.innerText?.trim(), styles: getStyle(b) })),
    svgs: Array.from(el.querySelectorAll('svg')).map(s => ({
      viewBox: s.getAttribute('viewBox'),
      outerHTML: s.outerHTML.slice(0, 300)
    })).slice(0, 5)
  };
})();
```

---

## اصول تبدیل داده‌های خام به کد تمیز React

1. **هرگز کدهای HTML یا کلاس‌های نامفهوم CSS سایت مبدا را کپی نکنید:**
   سایت‌های مبدا معمولاً از کدهای باندل‌شده، ماژول‌های CSS تصادفی (مانند `.styles_hero__x9a2b`) یا ساختار DOM تودرتو و زاید استفاده می‌کنند. شما فقط استایل‌های محاسباتی و معانی را می‌خوانید و درخت HTML را خودتان از صفر بازنویسی می‌کنید.
2. **نگاشت به آیکون‌های استاندارد:**
   آیکون‌های استخراج‌شده را با آیکون‌های متناظر در کتابخانه سبک `lucide-react` جایگزین کنید (مانند `ArrowLeft`, `CheckCircle2`, `Sparkles` ممنوع، `ShieldCheck`, `Star`).
3. **تطبیق با سیستم رنگی پروژه:**
   اگر کامپوننت برای **بلومیا کلاب** تولید می‌شود، رنگ‌ها باید با پالت رسمی `#1f3d3a` (سبز کله‌غازی عمیق)، `#fafaf8` (پس‌زمینه آرام)، `#1e1e1e` (متن اصلی) و `#6b6b6b` (متن توضیحی) تطبیق یابند.
