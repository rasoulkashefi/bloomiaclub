---
name: frontend-replicator
description: >-
  Autonomous UI & frontend replicator, inspector, brand remapper, and component synthesizer with self-improving replication memory.
  Activated whenever the user provides a website URL, a section link, or a UI screenshot/image
  and asks to clone, replicate, copy, or recreate it as a clean, modular, production-ready
  Next.js / React component with Tailwind CSS, TypeScript, and modern motion libraries
  (Framer Motion, Lenis, GSAP ScrollTrigger, and React Bits patterns).
  Features automated deep color role extraction, 1:1 semantic brand remapping, Playwright quality auditing,
  advanced RTL & Persian typography calibration (Variable fonts, Logical properties, motion vector inversion),
  hardened edge-case guards (sticky stacking, floating navbars, video loops, autoplay carousels, and multi-layer mockups),
  and a continuous self-learning knowledge base.
---

# Automated UI Cloner, Brand Remapper & Motion Architect
# اسکیل تخصصی بازآفرینی رابط کاربری، نگاشت هویت بصری و معماری حرکتی

این اسکیل مرجع عملیاتی، قطعی و **خودبهینه‌ساز (Self-Improving)** برای بازآفرینی، مهندسی معکوس، نگاشت پالت رنگی برند، بومی‌سازی و راست‌چین‌سازی عمیق (RTL) و شبیه‌سازی تمیز هر رابط کاربری (سایت کامل، سکشن، هیرو، کارت، فوتر، فرم یا جدول قیمت) از روی **آدرس اینترنتی (URL زنده)** یا **تصویر/اسکرین‌شات** به یک کامپوننت ماژولار، استاندارد، مدرن و تایپ‌شده در **Next.js 15+ (App Router)** به همراه **Tailwind CSS**، **TypeScript** و استک حرکتی مدرن (**Framer Motion**, **Lenis**, **GSAP ScrollTrigger**, **React Bits**) است.

---

## ۱. نقش و هدف (Role & Objective)

تو یک **معمار ارشد فرانت‌اند (Senior Frontend Architect) و مهندس خلاق رابط کاربری (Creative Technologist)** هستی. وظیفه تو این است که با ابزارهای بومی Playwright به آدرس وب‌سایت هدف بروی، سکشن یا کامپوننت مشخص‌شده را کالبدشکافی کنی، استایل‌ها و رسانه‌ها را استخراج کنی، پالت رنگی را بر اساس درخواست (شبیه‌سازی ۱ به ۱ یا نگاشت به پالت برند مقصد) بازسازی کنی، در صورت نیاز ساختار LTR انگلیسی را به یک شاهکار مدرن RTL فارسی ارتقا دهی و در نهایت کدی فوق‌العاده تمیز، خطاناپذیر و تعاملی تولید نمایی.

### دو حالت کاری مهارت (Operating Modes):
1. **حالت ۱: شبیه‌سازی دقیق ۱ به ۱ (Exact 1:1 Clone Mode):**
   وقتی کاربر می‌خواهد سایت یا سکشن هدف عیناً با همان رنگ‌ها، فونت‌ها و هارمونی مبدا بازآفرینی شود.
2. **حالت ۲: برندینگ و نگاشت هویت سازمانی (Brand Remap Mode):**
   وقتی کاربر می‌گوید «با پالت رنگی برند ما ست کن» یا پروژه دارای یک دیزاین‌سیستم فعال است (مانند بلومیا کلاب در `AGENTS.md`)؛ در این حالت نقش‌های رنگی مبدا به صورت معنایی به پالت برند مقصد نگاشت می‌شوند.

---

## ۲. تنظیمات هویت بصری برند مقصد (Target Brand Palette)

*(کدهای مرجع برای نگاشت معنایی رنگ‌ها بر اساس پروژه جاری یا جدول زیر تنظیم می‌شوند):*

| نقش معنایی رنگ (Semantic Role) | متغیر پیشنهادی Tailwind | مثال تم بلومیا کلاب (Light Editorial) | مثال تم تکنولوژی تیره (Dark Tech) | کاربرد در کامپوننت مقصد |
| :--- | :--- | :--- | :--- | :--- |
| **Brand Primary** | `brand-primary` | `#1f3d3a` (Deep Teal) | `#6366F1` (Indigo) | دکمه‌های اصلی (CTA)، المان‌های کانونی، هایلایت‌های فعال |
| **Brand Secondary** | `brand-secondary` | `#bb7462` (Terracotta) | `#A855F7` (Purple) | رنگ مکمل در گرادینت‌ها، بج‌ها، نورهای پس‌زمینه (Glows) |
| **Background Base** | `brand-bg` | `#ffffff` / `#fafaf8` (Warm White) | `#090A0F` (Pitch Dark) | پس‌زمینه اصلی سکشن (سطح پایه) |
| **Surface / Card** | `brand-surface` | `#fafaf8` / `#f5f5f5` (Soft Gray) | `#12151E` (Dark Card) | پس‌زمینه کارت‌ها، باکس‌های شیشه‌ای و لایه‌های رویی |
| **Text Primary** | `brand-text` | `#1e1e1e` / `#3f2a24` (Charcoal/Espresso) | `#F8FAFC` (Pure Light) | تیترهای اصلی (`h1`, `h2`) و متن‌های با کنتراست بالا |
| **Text Muted** | `brand-muted` | `#606060` / `#6b6b6b` (Muted Gray) | `#94A3B8` (Muted Slate) | زیرعنوان‌ها، توضیحات (Paragraphs) و برچسب‌های فرعی |
| **Border / Divider** | `brand-border` | `#e5e5e2` / `rgba(0,0,0,0.05)` | `#1E293B` (Subtle Slate) | خطوط جداکننده، حاشیه کارت‌ها و کادر دکمه‌های فرعی |

*(راهنمای تفصیلی قوانین نگاشت، حفظ آلفا و گرادینت در [references/brand-color-remapping.md](references/brand-color-remapping.md) آمده است).*

---

## ۳. گردش کار گام‌به‌گام اجرایی (Execution Pipeline)

وقتی کاربر آدرس سایت (`[URL]`) یا تصویر هدف را ارائه می‌دهد، مراحل زیر به ترتیب بدون ابهام اجرا می‌شوند:

### گام اول: ناوبری، سیاهه سکشن‌ها و ثبت بصری (Visual Reconnaissance)
۱. **اسکن کامل ساختار صفحه (Full-Page DOM Inventory):**
   پیش از نوشتن کد، کل فرزندان تگ `<body>` یا `<main>` و بنرهای میانی را پیمایش کن تا مطمئن شوی هیچ سکشن یا بنر بینابینی جا نمی‌افتد (پروتکل سیاهه کامل).
۲. **تهیه اسکرین‌شات دسکتاپ و موبایل:**
   اجرای اسکریپت استخراج خودکار یا ابزارهای بومی:
   ```bash
   node .agents/skills/frontend-replicator/scripts/extract-component.mjs --url "[TARGET_URL]" --selector "[OPTIONAL_SELECTOR]" --output "extracted-ui"
   ```
   اسکرین‌شات‌ها بلافاصله با `view_file` توسط ایجنت بازرسی می‌شوند تا چیدمان، توازن فضای خالی و وزن بصری تحلیل گردند.

---

### گام دوم: استخراج عمیق توکن‌ها، رنگ‌ها و سرنخ‌های حرکتی (Deep Extraction)
با اجرای اسکریپت استخراج در مرورگر، استایل‌های محاسبه‌شده (Computed Styles)، دسته‌بندی رنگ‌ها، تایپوگرافی و SVGها استخراج می‌شوند:

```javascript
(() => {
  const selector = '[SELECTOR]';
  const root = document.querySelector(selector) || document.querySelector('section, header') || document.body;
  const elements = [root, ...root.querySelectorAll('*')];

  const colorRoles = {
    backgrounds: new Set(),
    surfaces: new Set(),
    texts: new Set(),
    mutedTexts: new Set(),
    borders: new Set(),
    accents: new Set(),
    gradients: new Set(),
    shadows: new Set()
  };

  const extractMetrics = (el) => {
    if (!el) return null;
    const s = window.getComputedStyle(el);
    return {
      tag: el.tagName.toLowerCase(),
      text: el.innerText ? el.innerText.slice(0, 120).trim() : '',
      fontFamily: s.fontFamily,
      fontSize: s.fontSize,
      fontWeight: s.fontWeight,
      lineHeight: s.lineHeight,
      letterSpacing: s.letterSpacing,
      padding: s.padding,
      margin: s.margin,
      gap: s.gap,
      borderRadius: s.borderRadius,
      display: s.display,
      flexDirection: s.flexDirection,
      gridTemplateColumns: s.gridTemplateColumns,
      transition: s.transition,
      transform: s.transform,
      backdropFilter: s.backdropFilter
    };
  };

  elements.forEach((el) => {
    const s = window.getComputedStyle(el);
    const tag = el.tagName.toLowerCase();
    const cls = (el.className && typeof el.className === 'string') ? el.className : '';
    const isInteractive = ['button', 'a'].includes(tag) || /btn|cta|badge|pill|accent/i.test(cls);
    const isCard = /card|box|panel|surface|glass/i.test(cls);

    if (s.backgroundColor && s.backgroundColor !== 'rgba(0, 0, 0, 0)' && s.backgroundColor !== 'transparent') {
      if (el === root) colorRoles.backgrounds.add(s.backgroundColor);
      else if (isInteractive) colorRoles.accents.add(s.backgroundColor);
      else if (isCard) colorRoles.surfaces.add(s.backgroundColor);
      else colorRoles.backgrounds.add(s.backgroundColor);
    }

    if (s.backgroundImage && s.backgroundImage.includes('gradient')) {
      colorRoles.gradients.add(s.backgroundImage);
    }

    if (s.color) {
      if (['h1', 'h2', 'h3', 'strong'].includes(tag)) colorRoles.texts.add(s.color);
      else if (['p', 'span', 'small'].includes(tag)) colorRoles.mutedTexts.add(s.color);
    }

    if (s.borderColor && s.borderWidth !== '0px') colorRoles.borders.add(s.borderColor);
    if (s.boxShadow && s.boxShadow !== 'none') colorRoles.shadows.add(s.boxShadow);
  });

  const h1 = root.querySelector('h1, h2, [class*="title"], [class*="heading"]');
  const subtitle = root.querySelector('p, [class*="subtitle"], [class*="desc"]');
  const primaryBtn = root.querySelector('button, a[class*="btn"], a[class*="cta"]');

  return {
    layout: extractMetrics(root),
    typography: {
      heading: extractMetrics(h1),
      subtitle: extractMetrics(subtitle),
      primaryCta: extractMetrics(primaryBtn)
    },
    extractedPalette: {
      backgrounds: [...colorRoles.backgrounds],
      surfaces: [...colorRoles.surfaces],
      texts: [...colorRoles.texts],
      mutedTexts: [...colorRoles.mutedTexts],
      borders: [...colorRoles.borders],
      accents: [...colorRoles.accents],
      gradients: [...colorRoles.gradients],
      shadows: [...colorRoles.shadows]
    },
    svgs: Array.from(root.querySelectorAll('svg')).slice(0, 8).map(svg => ({
      viewBox: svg.getAttribute('viewBox'),
      html: svg.outerHTML.slice(0, 600)
    }))
  };
})();
```

---

### گام سوم: موتور نگاشت معنایی پالت رنگی (Semantic & Perceptual Color Remapping)

در حالت **Brand Remap Mode** (یا مطابق دستور کاربر)، نگاشت هوشمندانه طبق اصول زیر صورت می‌گیرد:

۱. **نگاشت نقش‌به‌نقش (Role-to-Role):**
   - پس‌زمینه اصلی مبدا $\rightarrow$ `brand-bg`
   - سطوح کارت‌ها و پنل‌ها $\rightarrow$ `brand-surface`
   - دکمه‌های اصلی و کانونی $\rightarrow$ `brand-primary`
   - المان‌های مکمل و بج‌ها $\rightarrow$ `brand-secondary`
   - تیترهای اصلی $\rightarrow$ `brand-text` و توضیحات $\rightarrow$ `brand-muted`
   - حاشیه‌ها $\rightarrow$ `brand-border`
۲. **حفظ آلفا و شیشه‌ای بودن (Alpha & Glassmorphism):**
   - حفظ درصد شفافیت کانال آلفا روی رنگ برند مقصد: مثلاً `rgba(..., 0.15)` مبدا تبدیل می‌شود به `bg-[brand-primary]/15` و `border-[brand-primary]/30`.
   - افکت `backdrop-filter: blur(...)` همراه با `backdrop-blur-md` بازسازی شود.
۳. **بازسازی گرادینت‌ها و سایه‌های نوری (Gradients & Glows):**
   - حفظ زاویه و استاپ‌های گرادینت، با جایگزینی رنگ‌ها به `from-brand-primary to-brand-secondary`.
   - سایه‌های نوری دکمه‌ها با رنگ `brand-primary` بازسازی شوند (مثلاً `shadow-[0_10px_30px_-5px_rgba(...)]`).
۴. **ارائه جدول نگاشت رنگ:** پیش از تحویل کد، جدول خلاصه تبدیل رنگ‌ها نمایش داده شود.

---

### گام چهارم: معماری حرکتی و تعاملی (Lenis + GSAP + React Bits)

#### الف) اسکرول نرم و مومنتوم با Lenis
هماهنگ‌سازی تیکر رندر Lenis با GSAP ScrollTrigger در کامپوننت پرووایدر لایوت:
```tsx
useEffect(() => {
  const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => { lenis.raf(time * 1000); });
  gsap.ticker.lagSmoothing(0);
  return () => { lenis.destroy(); };
}, []);
```

#### ب) انیمیشن‌های ورود و اسکرول با GSAP (`@gsap/react`)
استفاده از هوک `useGSAP` با ترتیب ۵ مرحله‌ای استاندارد:
۱. ظاهر شدن نرم پس‌زمینه و نورها (`opacity: 0` $\rightarrow$ `1`, `scale: 0.95` $\rightarrow$ `1`)
۲. ورود Badge بالایی (`y: 20` $\rightarrow$ `0`)
۳. ورود تیتر کلمه‌به‌کلمه با `stagger: 0.08` و `power3.out`
۴. ورود زیرعنوان و دکمه‌های CTA
۵. ورود موکاپ محصول همراه با افکت پارالکس در اسکرول (`ScrollTrigger` با `scrub: true`).

#### ج) جلوه‌های ویژه با الگوهای مدرن React Bits
پیاده‌سازی حداقل ۱ یا ۲ مورد متناسب با سکشن:
- **SplitText / BlurText:** ورود کلمات تیتر با محو شدن تاری (`filter: blur(10px)` $\rightarrow$ `blur(0px)`).
- **Magnetic Button:** دکمه اصلی CTA با کشش مغناطیسی به سمت نشانگر ماوس.
- **Spotlight Card / Border Beam:** کارت‌ها با هاله نوری دنبال‌کننده ماوس روی حاشیه یا زمینه.
- **Aurora / Mesh Background:** پس‌زمینه‌های متحرک نوری ارگانیک.

*(کدهای آماده و کامل در [references/interactive-motion-stack.md](references/interactive-motion-stack.md) موجود است).*

---

### گام پنجم: درس‌های طلایی تجربی و گیت کیفیت ضدخطا (Hardened Quality Gate)

برگرفته از تجربیات و باگ‌های کشف‌شده واقعی (مستند کامل در [references/hardened-replication-lessons.md](references/hardened-replication-lessons.md)):

1. **قوانین استکینگ کارت‌ها (Sticky Stacking Cards - روی هم آمدن):**
   - **ممنوعیت مطلق `overflow-hidden`:** هیچ کانتینر والدی نباید `overflow-hidden` داشته باشد زیرا چسبندگی CSS را کاملاً خنثی می‌کند.
   - **ترتیب لایه‌ای صعودی (`z-10`, `z-20`, `z-30`):** کارت بعدی همیشه با اسکرول **روی** کارت قبلی قرار می‌گیرد و آن را می‌پوشاند («روی هم میان و نه زیر هم»).
   - **سطح ۱۰۰٪ کدر (`bg-[#f5f5f5]` یا `bg-surface`):** جلوگیری از دیده شدن متن کارت زیرین.
   - **سایه ارگانیک و بافر پایانی:** سایه چندلایه `shadow-[0_12px_40px_rgba(0,0,0,0.06)]` و پدینگ انتهایی `pb-48` تا `pb-60`.
2. **منوی شناور و زمان‌بندی دقیق اسکرول:**
   - سنجش آستانه دقیق اسکرول با Playwright در سایت مرجع (مثلاً `1650px`) تا منو زودتر روی هیرو و ابوت ظاهر نشود.
3. **سیاهه کامل سکشن‌ها بدون جاافتادگی:**
   - استخراج تمام بنرهای میانی و فرم‌ها پیش از کدنویسی (Zero-Omission).
4. **ویدیوهای پس‌زمینه و بودجه ارتفاع تک‌اسکرین:**
   - جستجوی تگ‌های `<video>` و دانلود ویدیوهای لوپ با `autoPlay loop muted playsInline`.
   - محدود کردن ارتفاع کارت‌ها به `480px-520px` برای سکشن‌های تک‌صفحه‌ای تا کاربر نیاز به زوم‌اوت نداشته باشد.
5. **کاروسل‌های افقی خودکار:**
   - استفاده از `embla-carousel-autoplay` با تاخیر ۳.۵ ثانیه و توقف روی هاور.
6. **گرافیک‌های چندلایه و موک‌آپ‌های سه‌بعدی:**
   - تفکیک پترن وکتوری پس‌زمینه و موک‌آپ ۳بعدی محصول با سایه عمیق و زاویه ملایم.

---

## ۴. موتور بومی‌سازی، راست‌چین‌سازی (RTL) و تایپوگرافی فارسی

هنگام کلون کردن یک سایت انگلیسی (LTR) برای خروجی فارسی (RTL)، اعمال صرفاً `dir="rtl"` کافی نیست. ایجنت موظف است ۶ قانون زیر را به صورت سخت‌گیرانه در کد نهایی اعمال کند:

### ۱. معماری Logical Properties در Tailwind CSS
هرگز از کلاس‌های جهت‌دار فیزیکی استفاده نکن. تمام فاصله‌ها، موقعیت‌ها و ترازها را به معادل منطقی تبدیل کن:
- به جای `ml-*` و `mr-*` $\leftarrow$ از `ms-*` (Margin Start) و `me-*` (Margin End) استفاده کن.
- به جای `pl-*` و `pr-*` $\leftarrow$ از `ps-*` (Padding Start) و `pe-*` (Padding End) استفاده کن.
- به جای `left-*` و `right-*` $\leftarrow$ از `start-*` و `end-*` استفاده کن.
- به جای `text-left` و `text-right` $\leftarrow$ از `text-start` و `text-end` استفاده کن.
- به جای `border-l-*` و `border-r-*` $\leftarrow$ از `border-s-*` و `border-e-*` استفاده کن.
- به جای `rounded-l-*` و `rounded-r-*` $\leftarrow$ از `rounded-s-*` و `rounded-e-*` استفاده کن.

### ۲. کالیبراسیون فیزیک تایپوگرافی و ریتم فضایی (Persian Font Physics & Spatial Rhythm)
حروف فارسی دارای سرکش، کلاهک، اعراب و نقطه‌های زیر و رو هستند و به هم می‌چسبند؛ بنابراین قوانین تایپوگرافی انگلیسی را بر اساس متدهای پیشرفته Impeccable به شکل زیر اصلاح کن:
- **ممنوعیت مطلق Letter-Spacing منفی:** اگر سایت مبدا دارای `tracking-tight` یا `tracking-tighter` یا `letter-spacing` منفی است، در نسخه فارسی آن را کاملاً حذف کن و روی `tracking-normal` (`0em`) قرار بده.
- **اصلاح ارتفاع خط (Line-Height Floor):**
  - در تایتل‌های درشت (H1, H2, H3)، استفاده از `leading-none` (1)، `leading-tight` (1.25) یا کلاس‌های درشت مانند `text-5xl` بدون leading صریح اکیداً ممنوع است (زیرا نقطه‌ها با سطر بالا برخورد می‌کنند). همیشه از `leading-[1.38] sm:leading-[1.35] lg:leading-[1.32]` استفاده کن.
  - برای متن‌های بدنه (Body) و توضیحات کارت‌ها، همیشه از `leading-[1.75]` تا `leading-[1.85]` استفاده کن.
- **ریتم فاصله‌گذاری بج و تیتر (Eyebrow & Heading Rhythm):**
  - هرگز بج یا نشان بالای تیتر را به تیتر نچسبانید (`mb-2` یا `mb-3` ممنوع است). همیشه فاصله `mb-5` تا `mb-6` با پدینگ داخلی `py-1.5 px-4` اعمال شود.
  - فاصله تیتر تا توضیحات زیرین حداقل `mt-5` تا `mt-6` باشد.
- **توازن خطوط تیتر:** روی تیترها ویژگی `text-wrap: balance` اعمال شود تا کلمات پایانی به صورت تک‌کلمه‌ای در خط بعد نیفتند.
- **فعال‌سازی اعداد فارسی در سطح CSS:** روی کانتینر اصلی، ویژگی `[font-feature-settings:'ss01']` را اعمال کن تا تمام اعداد به صورت خودکار با گلیف فارسی رندر شوند.

### ۳. پیکربندی فونت Variable فارسی (در Next.js)
بر اساس شخصیت فونت سایت انگلیسی، معادل متغیر فارسی آن را طبق جدول زیر انتخاب کن:
- **جایگزین فونت‌های مدرن، خنثی و تکنولوژیک (Inter, Geist, SF Pro):**
  - رایگان/متن‌باز: **Vazirmatn (وزیرمتن متغیر)** با پشتیبانی وزن‌های ۱۰۰ تا ۹۰۰.
  - تجاری/سازمانی: **IRANSansX (ایران‌سنس ایکس)** یا **Dana (دانا متغیر)**.
- **جایگزین فونت‌های هندسی، جسورانه و مخصوص هیرو (Plus Jakarta Sans, Clash Display, Satoshi):**
  - پیشنهاد ویژه هیروهای لوکس: **Peyda (پیدا متغیر)** یا **Yekan Bakh (یکان‌باخ متغیر)**.

```tsx
// ساختار استاندارد لود فونت متغیر در Next.js
import localFont from 'next/font/local';

const persianFont = localFont({
  src: './fonts/PeydaWebVF.woff2', // یا Vazirmatn[wght].woff2
  variable: '--font-persian',
  weight: '100 900',
  display: 'swap',
});
```

### ۴. قانون طلایی انیمیشن‌های متنی (GSAP SplitText & React Bits در فارسی)
- **ممنوعیت مطلق Character Split:** در زبان فارسی، تکه کردن متن به کاراکترها (`splitType: "chars"` یا `.split('')`) باعث جدا شدن حروف چسبیده (مانند «ه و ش م ن د») و تخریب کامل کلمات می‌شود.
- **راهکار اجباری:** در تمام انیمیشن‌های متنی (چه در GSAP و چه در کامپوننت‌های BlurText / SplitText از React Bits)، متن را **فقط و فقط بر اساس کلمات (`words`) یا خطوط (`lines`)** تکه و انیمیت کن (`text.split(' ')`).

### ۵. معکوس‌سازی بردارهای حرکتی، گرادینت‌ها و آیکون‌ها
- **محور X در GSAP:** هر انیمیشنی که در نسخه انگلیسی روی محور افقی حرکت می‌کند (مثلاً ورود از سمت چپ با `from({ x: -100 })`)، در نسخه فارسی باید علامت آن قرینه شود (`from({ x: 100 })`) تا جهت حرکت با جهت مطالعه چشم کاربر فارسی‌زبان (راست به چپ) هماهنگ بماند.
- **آیکون‌های جهت‌دار:** در دکمه‌های CTA و لینک‌ها، آیکون‌هایی مثل `ArrowRight` یا `ChevronRight` را با `ArrowLeft` و `ChevronLeft` جایگزین کن (یا کلاس `rtl:-scale-x-100` به آن‌ها بده). انیمیشن Hover آیکون دکمه‌ها که در انگلیسی `group-hover:translate-x-1` است را به `group-hover:-translate-x-1` تغییر بده.
- **زوایای گرادینت و چیدمان نامتقارن:** اگر تصویر هیرو در سمت راست و متن در سمت چپ است، در نسخه فارسی متن در سمت راست (Start) و تصویر در سمت چپ (End) قرار می‌گیرد. گرادینت‌های افقی (`bg-gradient-to-r`) را به `bg-gradient-to-l` تبدیل کن.

### ۶. کپی‌رایتینگ و متناسب‌سازی ابعاد فونت (UX Transcreation & Typographic Scaling)
- متن‌های انگلیسی سایت مبدا را هرگز کلمه به کلمه و ماشینی ترجمه نکن. مفهوم هر بخش را درک کن و معادل روان، کوتاه، اثرگذار و مطابق با ادبیات مدرن مارکتینگ استارتاپی بنویس.
- **متناسب‌سازی سایز فونت (۵ تا ۱۰ درصد کاهش):** از آنجا که کلمات فارسی عریض‌تر و بلندتر هستند، فونت‌های تایتل بزرگ را حدود ۵ تا ۱۰ درصد متناسب‌سازی کن (مثلاً از `text-7xl` به `text-6xl`) تا تایتل در همان تعداد سطرهای طراحی اصلی قرار گیرد.

*(راهنمای تفصیلی در [references/rtl-persian-typography-engine.md](references/rtl-persian-typography-engine.md) آمده است).*

---

## ۵. چک‌لیست راستی‌آزمایی پیش از تحویل به کاربر

پیش از اعلام اتمام بازآفرینی، ایجنت **موظف** است مراحل زیر را اجرا کند:

1. **اجرای اسکریپت ممیزی خودکار:**
   ```bash
   node .agents/skills/frontend-replicator/scripts/audit-replica.mjs --url "http://localhost:3000/[ROUTE]"
   ```
   - [ ] هیچ عنصر چسبنده‌ای والدی با `overflow: hidden` ندارد.
   - [ ] هیچ ریسورس رسانه‌ای (عکس یا ویدیو) خطای ۴۰۴ ندارد.
   - [ ] اسکرول افقی ناخواسته در صفحه وجود ندارد (`scrollWidth <= innerWidth`).
2. **چک‌لیست فارسی‌سازی، ریتم فضایی و RTL:**
   - [ ] در ویوپورت‌های هیرو تک‌صفحه‌ای (100vh)، دکمه CTA هرگز به بیرون صفحه یا زیر خط تا رانده نشده است (طول سطر اول و دوم تیتر هیرو حداکثر ۱۰–۱۲ کاراکتر، سطر سوم ۸–۱۰ کاراکتر با `whitespace-nowrap`، توضیح حداکثر ۷۰–۸۵ کاراکتر با `line-clamp-2` و حداقل ۱۲۰ تا ۱۷۰ پیکسل حاشیه تنفس تا پایین صفحه در مانیتور لپ‌تاپ ۱۳۶۶x۷۶۸).
   - [ ] در انیمیشن‌های متنی، حروف پیوسته به کاراکترها شکسته نشده‌اند (صرفاً Word/Line Split).
   - [ ] تمام فاصله‌ها و موقعیت‌ها با Logical Properties پیاده‌سازی شده‌اند (`ms`, `me`, `ps`, `pe`, `start`, `end`).
   - [ ] ارتفاع خط تیترها (Leading) متناسب با حروف فارسی افزایش یافته (`leading-[1.32]` تا `leading-[1.38]`)، هیچ تیتری با `leading-tight` یا `text-5xl` رها نشده و سرکش‌ها تصادم ندارند.
   - [ ] نشان‌ها و بج‌های بالای تیتر (Eyebrow) فاصله سخاوتمندانه `mb-5` تا `mb-6` با تیتر دارند و به آن نچسبیده‌اند.
   - [ ] پاراگراف‌های بدنه دارای ارتفاع خط تنفس‌دار `leading-[1.75]` تا `leading-[1.85]` هستند.
   - [ ] بردارهای افقی انیمیشن و آیکون‌های جهت‌دار برای RTL معکوس شده‌اند.
   - [ ] اعداد فارسی با `[font-feature-settings:'ss01']` فعال شده‌اند.
3. **بررسی صحت بیلد پروژه:**
   ```bash
   npm run build
   ```
   - بیلد Next.js باید با کد خروج ۰ و بدون خطای تایپ‌اسکریپت پایان یابد.

---

## ۶. سیستم یادگیری مداوم و ارتقای خودکار اسکیل (Self-Learning Engine)

> [!IMPORTANT]
> **قانون ارتقای دائمی با هر بازآفرینی:**
> هر زمان که در فرآیند شبیه‌سازی یا ساخت یک سایت جدید، باگ جدیدی کشف شد یا کاربر نکته اصلاحی مطرح کرد:
> ۱. ایجنت بلافاصله ریشه فنی باگ را تحلیل می‌کند.
> ۲. فرمول پیشگیری را به [references/hardened-replication-lessons.md](references/hardened-replication-lessons.md) اضافه می‌کند.
> ۳. چک‌لیست این سند (`SKILL.md`) را تکمیل می‌نماید.
> با این مکانیزم، این اسکیل با هر بار بازآفرینی باهوش‌تر، خطاناپذیرتر و حرفه‌ای‌تر می‌شود.

---

## ۷. منابع تکمیلی مهارت (References & Examples)

- [راهنمای جامع راست‌چین‌سازی و موتور تایپوگرافی فارسی](references/rtl-persian-typography-engine.md)
- [راهنمای جامع نگاشت معنایی پالت رنگی](references/brand-color-remapping.md)
- [جعبه سیاه درس‌های تجربی و ضدخطا در بازآفرینی](references/hardened-replication-lessons.md)
- [راهنمای جامع استک حرکتی و تعاملی (Lenis, GSAP, React Bits)](references/interactive-motion-stack.md)
- [پترن‌ها و ترنزیشن‌های آماده Framer Motion](references/framer-motion-recipes.md)
- [راهنمای کامل استخراج از URL](references/url-workflow.md)
- [راهنمای مهندسی معکوس تصویر](references/image-workflow.md)
- [جدول نگاشت استایل‌ها به Tailwind CSS](references/tailwind-mapping.md)
- [نمونه کامل یک کامپوننت بازآفرینی‌شده هیرو](examples/HeroSection.example.tsx)
