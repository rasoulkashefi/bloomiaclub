# Semantic & Perceptual Color Remapping Guide
# راهنمای موتور نگاشت معنایی و ادراکی رنگ‌ها و هویت بصری

این راهنما چارچوب مهندسی برای درک، تفکیک نقش‌ها و بازنگاشت هوشمندانه (Remapping) پالت رنگی وبسایت مبدا به پالت رنگی برند مقصد است.

---

## ۱. اصل بنیادین نگاشت رنگی (The Remapping Principle)

> [!IMPORTANT]
> **قانون طلایی نگاشت:**
> کدهای رنگ سایت مبدا را نباید کورکورانه و بدون بررسی نقش معنایی در کامپوننت نهایی قرار داد.
> هر رنگ در رابط کاربری یک **وظیفه معنایی (Semantic Role)** دارد (پس‌زمینه، کارت، دکمه اکشن، متن اصلی، متن فرعی، حاشیه یا هایلایت).
> وظیفه ایجنت، کشف این نقش و جایگزینی دقیق آن با رنگ متناظر در **پالت برند مقصد** است.

---

## ۲. جدول پیکربندی هویت بصری مقصد (Target Brand Palette)

پالت برند مقصد می‌تواند بر اساس پروژه جاری (`AGENTS.md` در بلومیا، یا جدول توکن‌های کاربر در هر پروژه دیگر) تنظیم شود:

| نقش معنایی رنگ (Semantic Role) | متغیر پیشنهادی Tailwind | مثال تم تیره (Dark Tech) | مثال تم بلومیا کلاب (Light Editorial) | کاربرد در کامپوننت مقصد |
| :--- | :--- | :--- | :--- | :--- |
| **Brand Primary** | `brand-primary` | `#6366F1` (Indigo) | `#1f3d3a` (Deep Teal) | دکمه‌های اصلی (CTA)، المان‌های کانونی، هایلایت‌های فعال |
| **Brand Secondary** | `brand-secondary` | `#A855F7` (Purple) | `#bb7462` (Terracotta) | رنگ مکمل در گرادینت‌ها، بج‌ها، هایلایت‌های ثانویه |
| **Background Base** | `brand-bg` | `#090A0F` (Pitch Dark) | `#ffffff` / `#fafaf8` (Warm White) | پس‌زمینه اصلی سکشن (سطح پایه) |
| **Surface / Card** | `brand-surface` | `#12151E` (Dark Card) | `#fafaf8` / `#f5f5f5` (Soft Gray) | پس‌زمینه کارت‌ها، باکس‌های داخلی و پنجره‌های شناور |
| **Text Primary** | `brand-text` | `#F8FAFC` (Pure Light) | `#1e1e1e` / `#3f2a24` (Charcoal/Espresso) | تیترهای اصلی (`h1`, `h2`) و متون با کنتراست بالا |
| **Text Muted** | `brand-muted` | `#94A3B8` (Muted Slate) | `#606060` / `#6b6b6b` (Muted Gray) | زیرعنوان‌ها، پاراگراف‌ها، توضیحات و فوترها |
| **Border / Divider** | `brand-border` | `#1E293B` (Subtle Slate) | `#e5e5e2` / `rgba(0,0,0,0.05)` | خطوط جداکننده، کادر کارت‌ها و اینپوت‌ها |

---

## ۳. قواعد چهارگانه تبدیل هوشمند رنگ‌ها

### ۱. نگاشت نقش‌به‌نقش (Role-to-Role Mapping):
- رنگ پس‌زمینه سکشن مبدا $\rightarrow$ `brand-bg`
- رنگ سطوح کارت‌ها، پنل‌ها و مدال‌ها $\rightarrow$ `brand-surface`
- رنگ دکمه‌های CTA و بج‌های اصلی $\rightarrow$ `brand-primary`
- رنگ‌های مکمل و گرادینت دوم $\rightarrow$ `brand-secondary`
- رنگ تیترها و فونت‌های درشت $\rightarrow$ `brand-text`
- رنگ پاراگراف‌ها و متون کم‌اهمیت $\rightarrow$ `brand-muted`
- خطوط دور و بردرها $\rightarrow$ `brand-border`

### ۲. حفظ شفافیت و افکت شیشه‌ای (Alpha & Glassmorphism Preservation):
- اگر سایت مبدا از رنگ با شفافیت (Alpha Channel) استفاده کرده (مثلاً `rgba(59, 130, 246, 0.15)` برای بج یا هاله نوری)، **دقیقاً همان درصد آلفا** را روی رنگ برند مقصد اعمال کنید:
  - در Tailwind مدرن: `bg-[var(--brand-primary)]/15` یا `bg-[#1f3d3a]/15` و `border-[#1f3d3a]/30`.
- اگر افکت بلور پس‌زمینه (`backdrop-filter: blur(12px)`) وجود دارد، آن را با کلاس‌های `backdrop-blur-md` همراه با آلفای سطح مقصد ترکیب کنید:
  `bg-white/70 backdrop-blur-md` یا `bg-[#12151E]/60 backdrop-blur-md`.

### ۳. بازسازی گرادینت‌ها و سایه‌های نوری (Gradients & Glowing Shadows):
- **گرادینت‌ها:** زاویه گرادینت (مثلاً `135deg` یا `to right`) و نقاط توقف درصدی را حفظ کنید، اما رنگ‌های مبدا را به ترتیب با `brand-primary` و `brand-secondary` جایگزین کنید:
  `bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary`
- **سایه‌های نوری (Glows):** اگر دکمه یا کارت دارای سایه همرنگ است (`box-shadow: 0 10px 25px -5px rgba(...)`)، از رنگ `brand-primary` با همان ابعاد سایه استفاده کنید:
  `shadow-[0_10px_30px_-5px_rgba(31,61,58,0.3)]` (برای بلومیا) یا `shadow-[0_10px_30px_-5px_rgba(99,102,241,0.4)]` (برای تم دارک).

### ۴. دو حالت کاری مجزا (Clone Mode vs Remap Mode):
- **حالت ۱: شبیه‌سازی ۱ به ۱ (Exact 1:1 Clone Mode):**
  وقتی کاربر می‌گوید «عیناً مثل سایت اصلی بزن» یا هدف کپی دقیق پالت مبدا است، کدهای دقیق رنگ‌های استخراج‌شده از مبدا با همان تناژها و هارمونی پیاده‌سازی می‌شوند.
- **حالت ۲: برندینگ اختصاصی (Brand Remap Mode):**
  وقتی کاربر می‌گوید «با پالت رنگی ما ست کن» یا پروژه دارای یک دیزاین‌سیستم فعال است (مانند بلومیا کلاب)، جدول نگاشت نقش‌ها فعال شده و ظاهر ساختاری سایت مبدا با رنگ‌های اختصاصی پروژه هدف پیاده‌سازی می‌شود.

---

## ۴. نمونه جدول خروجی نگاشت رنگ (Color Mapping Report Format)

پیش از ارائه کد نهایی یا در ابتدای مستندسازی کامپوننت، ایجنت جدول نگاشت را این‌گونه گزارش می‌دهد:

```markdown
### 🎨 جدول نگاشت پالت رنگی (Color Remapping Table):
| المان | رنگ سایت مبدا | نقش معنایی | رنگ تبدیل‌شده برند مقصد | کلاس Tailwind |
| :--- | :--- | :--- | :--- | :--- |
| **پس‌زمینه سکشن** | `#0f172a` (Dark Slate) | Background Base | `#fafaf8` / `#ffffff` | `bg-brand-surface` |
| **کارت‌ها** | `#1e293b` (Card Slate) | Surface / Card | `#f5f5f5` | `bg-[#f5f5f5]` |
| **دکمه اصلی CTA** | `#3b82f6` (Blue) | Brand Primary | `#1f3d3a` (Deep Teal) | `bg-[#1f3d3a]` |
| **بج‌ها و اکسنت** | `#ec4899` (Pink) | Brand Secondary | `#bb7462` (Terracotta) | `bg-[#bb7462]` |
| **تیترهای اصلی** | `#f8fafc` (White) | Text Primary | `#1e1e1e` (Charcoal) | `text-[#1e1e1e]` |
| **متن توضیحات** | `#94a3b8` (Gray) | Text Muted | `#606060` (Muted) | `text-[#606060]` |
```
