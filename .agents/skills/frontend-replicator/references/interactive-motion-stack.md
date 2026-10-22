# Interactive & Motion Stack Guide (راهنمای کتابخانه‌های تعاملی و حرکتی پیشرفته)

این راهنما چارچوب استاندارد و کدهای آماده برای ۳ ابزار حرکتی و تعاملی سطح بالا را در فرآیند بازآفرینی فرانت‌اند ارائه می‌دهد:
۱. **Lenis Smooth Scroll:** اسکرول نرم و مومنتوم لوکس در سطح ریشه.
۲. **GSAP & ScrollTrigger:** انیمیشن‌های چندمرحله‌ای، پین شدن سکشن‌ها، پارالکس و اسکرابینگ زمانی وابسته به اسکرول.
۳. **React Bits Patterns:** افکت‌های متنی پیشرفته، پس‌زمینه‌های زنده و المان‌های تعاملی با عملکرد بالا.

---

## ۱. اسکرول نرم و لوکس با Lenis (`lenis/react`)

### چه زمانی استفاده شود؟
- وقتی وبسایت هدف دارای اسکرول بسیار نرم، روان و بدون پرش (Momentum Smooth Scroll) است.
- وقتی می‌خواهید انیمیشن‌های پارالکس و اسکرول‌محور با رفرش‌ریت مانیتور کاربر (۶۰Hz تا ۱۲۰Hz) سینک شوند.

### نصب پکیج:
```bash
npm install lenis
```

### کامپوننت پرووایدر در Next.js 15 App Router:
یک فایل کلاینتی در مسیر `components/providers/SmoothScrollProvider.tsx` بسازید:

```tsx
'use client';

import React, { useEffect, useRef } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export const SmoothScrollProvider: React.FC<SmoothScrollProviderProps> = ({ children }) => {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    // سینک کردن تیکر Lenis با GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        lerp: 0.1, // ضریب نرمی حرکت (بین 0.05 تا 0.15)
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      }}
    >
      {children}
    </ReactLenis>
  );
};
```

در `app/layout.tsx` بدنه اصلی را درون این کامپوننت احاطه کنید:

```tsx
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
```

---

## ۲. انیمیشن‌های پیچیده و وابسته به اسکرول با GSAP & ScrollTrigger

### چه زمانی استفاده شود؟
- **پین شدن سکشن‌ها (Pinning):** یک کادر ثابت می‌ماند در حالی که اسلایدر یا بخش‌های دیگر حرکت می‌کنند.
- **اسکرابینگ زمانی (Scrubbing):** پیشرفت انیمیشن دقیقاً به میلی‌متر اسکرول کاربر گره خورده است (`scrub: 1`).
- **پارالکس چندلایه:** لایه‌های پس‌زمینه، متن و تصویر با سرعت‌های متفاوت جابجا می‌شوند.
- **اسکرول افقی سکشن‌ها (Horizontal Scroll).**

### نصب پکیج‌ها:
```bash
npm install gsap @gsap/react
```

### الگوی استاندارد در کامپوننت React (بدون Memory Leak با `useGSAP`):

```tsx
'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const AdvancedParallaxHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // تایم‌لاین گره‌خورده به اسکرول
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=100%',
          pin: true,       // پین شدن سکشن تا پایان انیمیشن
          scrub: 1,        // حرکت نرم یک‌ثانیه‌ای همگام با اسکرول
        },
      });

      // لایه تیتر به آرامی مقیاس می‌گیرد و فید می‌شود
      tl.to(titleRef.current, {
        scale: 1.15,
        opacity: 0,
        y: -60,
        ease: 'none',
      }, 0);

      // تصویر به سمت بالا حرکت کرده و لایه زیرین را آشکار می‌کند
      tl.to(imageRef.current, {
        yPercent: -30,
        scale: 1.05,
        borderRadius: '32px',
        ease: 'none',
      }, 0);
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-[#fafaf8]">
      <div className="flex h-full flex-col items-center justify-center px-4 text-center">
        <h1 ref={titleRef} className="text-5xl font-bold text-[#1e1e1e] md:text-7xl">
          انیمیشن هیرو با کنترل دقیق اسکرول
        </h1>
        <div ref={imageRef} className="mt-8 aspect-video w-full max-w-4xl overflow-hidden rounded-2xl shadow-2xl">
          <img src="/sample.jpg" alt="Hero" className="h-full w-full object-cover" />
        </div>
      </div>
    </section>
  );
};
```

### ترتیب استاندارد ۵ مرحله‌ای ورود المان‌های هیرو (5-Step Staggered Reveal):
وقتی هیرو یا سکشن اصلی لود می‌شود، از این تایم‌لاین استاندارد GSAP استفاده کن:

```tsx
useGSAP(() => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // ۱. ظاهر شدن نرم پس‌زمینه و نورها
  tl.fromTo('.hero-bg', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1.2 })
  // ۲. ورود Badge بالایی
    .fromTo('.hero-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.8')
  // ۳. ورود تیتر اصلی به صورت کلمه‌به‌کلمه یا خط‌به‌خط
    .fromTo('.hero-title-word', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.08 }, '-=0.4')
  // ۴. ورود زیرعنوان و دکمه‌های CTA
    .fromTo('.hero-desc, .hero-cta', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 }, '-=0.4')
  // ۵. ورود تصویر یا موکاپ محصول همراه با افکت پارالکس در اسکرول
    .fromTo('.hero-mockup', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, '-=0.3');

  // پارالکس اسکرول موکاپ
  gsap.to('.hero-mockup', {
    yPercent: -20,
    ease: 'none',
    scrollTrigger: {
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });
}, { scope: containerRef });
```

---

## ۳. الگوهای مدرن بصری الهام‌گرفته از React Bits (`reactbits.dev`)

### چه زمانی استفاده شود؟
- وقتی هیرو یا سکشن هدف دارای تایتل‌های خاص است (بلور به وضوح، متون شیمر براق، تایپ داینامیک).
- وقتی کارت‌ها یا دکمه‌ها دارای تعامل مغناطیسی، نورافکن دنبال‌کننده ماوس (Spotlight) یا زاویه سه‌بعدی (3D Tilt) هستند.
- وقتی پس‌زمینه دارای شبکه‌های نقطه‌ای، امواج نوری زنده یا افکت نویز ظریف است.

### الگوهای آماده و کاربردی:

#### ۱. افکت متن بلور به وضوح (BlurText / Split Word Reveal)
```tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
}

export const BlurText: React.FC<BlurTextProps> = ({ text, delay = 0.05, className = '' }) => {
  const words = text.split(' ');

  return (
    <span className={`inline-flex flex-wrap gap-x-2 ${className}`}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ filter: 'blur(10px)', opacity: 0, y: 12 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: index * delay,
            ease: [0.2, 0.65, 0.3, 0.9],
          }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};
```

#### ۲. متن با افکت درخشش متالیک (ShinyText)
```tsx
'use client';

import React from 'react';

interface ShinyTextProps {
  text: string;
  speed?: number;
  className?: string;
}

export const ShinyText: React.FC<ShinyTextProps> = ({ text, speed = 4, className = '' }) => {
  return (
    <span
      className={`inline-block bg-gradient-to-r from-neutral-400 via-white to-neutral-400 bg-[length:200%_100%] bg-clip-text text-transparent animate-shine ${className}`}
      style={{ animationDuration: `${speed}s` }}
    >
      {text}
    </span>
  );
};
```
*(نیازمند اضافه کردن کی‌فریم `@keyframes shine { '0%': { backgroundPosition: '200% 0' }, '100%': { backgroundPosition: '-200% 0' } }` در `tailwind.config.ts`)*

#### ۳. کارت دارای نورافکن تعاملی ماوس (Spotlight Card)
```tsx
'use client';

import React, { useRef, useState } from 'react';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  spotlightColor = 'rgba(255, 255, 255, 0.1)',
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/80 p-8 ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
```

#### ۴. دکمه با جاذبه مغناطیسی ماوس (Magnet Button)
```tsx
'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export const MagnetButton: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.25, y: middleY * 0.25 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 180, damping: 15, mass: 0.1 }}
      className={`inline-block cursor-pointer ${className}`}
    >
      {children}
    </motion.div>
  );
};
```

---

## ۴. ماتریس انتخاب ابزار حرکتی در یک نگاه

| نوع نیاز بصری | ابزار پیشنهادی | نحوه فعال‌سازی |
| :--- | :--- | :--- |
| **اسکرول روان صفحه کل سایت** | `lenis` / `lenis/react` | اضافه کردن `<SmoothScrollProvider>` در لایه ریشه |
| **پین شدن المان‌ها هنگام اسکرول** | `gsap` + `ScrollTrigger` | استفاده از `pin: true` و `scrub` در `useGSAP` |
| **پارالکس چندلایه عمودی/افقی** | `gsap` + `ScrollTrigger` | انیمیت `yPercent` یا `xPercent` المان‌ها بر اساس اسکرول |
| **ترنزیشن‌های ورود المان‌ها و هاور دکمه‌ها** | `framer-motion` | کامپوننت‌های `motion.div` و پترن `fadeInUp` |
| **افکت‌های متنی پیشرفته (بلور، شیمر)** | کامپوننت‌های سبک React Bits | الگوهای `BlurText` و `ShinyText` |
| **کارت‌های تعاملی با زاویه سه‌بعدی و نورافکن** | الگوهای مدرن React Bits | `SpotlightCard` و `TiltedCard` |
