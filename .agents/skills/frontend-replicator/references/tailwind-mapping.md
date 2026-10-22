# Tailwind CSS Precision Mapping Cheat-Sheet (راهنمای نگاشت دقیق استایل‌های محاسباتی به تیل‌ویند)

این جدول مرجع، مقادیر عددی استخراج‌شده از مرورگر (پیکسل، وزن فونت، شدو و فواصل) را مستقیماً به بهترین کلاس‌های استاندارد یا مقادیر صریح Tailwind CSS متصل می‌کند.

---

## ۱. تایپوگرافی (Font Size & Leading)

| اندازه در Computed Style | کلاس معادل Tailwind | کلاس Line-Height مکمل |
| :--- | :--- | :--- |
| `11px` - `12px` | `text-xs` | `leading-4` (16px) |
| `13px` - `14px` | `text-sm` | `leading-5` (20px) |
| `15px` - `16px` | `text-base` | `leading-6` یا `leading-relaxed` |
| `18px` | `text-lg` | `leading-7` (28px) |
| `20px` | `text-xl` | `leading-7` |
| `24px` | `text-2xl` | `leading-8` (32px) |
| `28px` - `30px` | `text-3xl` | `leading-9` (36px) |
| `36px` | `text-4xl` | `leading-10` (40px) |
| `48px` | `text-5xl` | `leading-none` یا `leading-[1.15]` |
| `60px`+ | `text-6xl` | `leading-tight` |

---

## ۲. وزن فونت (Font Weight)

| وزن عددی CSS | کلاس Tailwind |
| :--- | :--- |
| `300` | `font-light` |
| `400` | `font-normal` |
| `500` | `font-medium` |
| `600` | `font-semibold` |
| `700` | `font-bold` |
| `800` | `font-extrabold` |
| `900` | `font-black` |

---

## ۳. فواصل، پدینگ و گپ (Spacing, Padding & Gap)

| پیکسل رندرشده | کلاس معادل Tailwind |
| :--- | :--- |
| `4px` | `p-1`, `gap-1`, `space-y-1` |
| `8px` | `p-2`, `gap-2`, `space-y-2` |
| `12px` | `p-3`, `gap-3` |
| `16px` | `p-4`, `gap-4` |
| `20px` | `p-5`, `gap-5` |
| `24px` | `p-6`, `gap-6` |
| `32px` | `p-8`, `gap-8` |
| `40px` | `p-10`, `gap-10` |
| `48px` | `p-12`, `gap-12` |
| `64px` | `p-16`, `gap-16` |

---

## ۴. گردی گوشه‌ها (Border Radius)

| اندازه در CSS | کلاس Tailwind |
| :--- | :--- |
| `2px` - `4px` | `rounded` یا `rounded-sm` |
| `6px` - `8px` | `rounded-md` یا `rounded-lg` |
| `12px` | `rounded-xl` |
| `16px` | `rounded-2xl` |
| `24px` | `rounded-3xl` |
| `9999px` | `rounded-full` (برای بج‌ها و دکمه‌های کپسولی) |

---

## ۵. سایه‌های ارگانیک و لایه‌بندی (Organic Ambient Shadows)

به جای سایه‌های تیره یا پیش‌فرض، از این فرمول‌های مدرن استفاده کنید:

```css
/* سایه فوق‌العاده نرم کارتی */
shadow-[0_4px_20px_rgb(0,0,0,0.03)]

/* سایه هاور شناور */
hover:shadow-[0_12px_32px_rgb(0,0,0,0.06)]

/* سایه دکمه اصلی برند */
shadow-[0_4px_14px_0_rgba(31,61,58,0.25)] hover:shadow-[0_6px_20px_rgba(31,61,58,0.35)]

/* سایه گلس‌مورفیسم ملایم با بلور */
backdrop-blur-md bg-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-white/20
```

---

## ۶. نگاشت رنگ‌های بلومیا کلاب (Brand Color Tokens)

| نقش رنگی | کد رنگ HEX | کلاس Tailwind پیشنهادی |
| :--- | :--- | :--- |
| **رنگ اصلی (Primary)** | `#1f3d3a` | `bg-[#1f3d3a]` / `text-[#1f3d3a]` |
| **هاور رنگ اصلی** | `#2b544e` | `hover:bg-[#2b544e]` |
| **سطح روشن رنگ اصلی (Subtle Accent)** | `#dfece9` | `bg-[#dfece9]` / `text-[#1f3d3a]` |
| **سطح بسیار کم‌رنگ پس‌زمینه** | `#f2f7f6` | `bg-[#f2f7f6]` |
| **پس‌زمینه تمیز و گرم (Surface)** | `#fafaf8` | `bg-[#fafaf8]` |
| **سفید خالص کانتینرها** | `#ffffff` | `bg-white` |
| **مرزها و خطوط جداکننده** | `#e5e5e2` | `border-[#e5e5e2]` |
| **متن تیترها و عناوین اصلی** | `#1e1e1e` | `text-[#1e1e1e]` |
| **متن توضیحی و پاراگراف‌ها** | `#6b6b6b` | `text-[#6b6b6b]` |
| **ستاره‌ها و امتیازها** | `#f59e0b` | `text-amber-500` |
