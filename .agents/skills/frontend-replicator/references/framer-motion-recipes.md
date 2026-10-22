# Framer Motion Recipes for Modern Frontend Replication (الگوهای انیمیشن و میکرواینترکشن با Framer Motion)

برای اینکه کامپوننت‌های بازآفرینی‌شده احساس خشک و استاتیک نداشته باشند و حس فوق‌العاده نرم و لوکس وبسایت‌های روز دنیا (مانند Linear، Raycast، Vercel) را به کاربر منتقل کنند، از این پترن‌های استاندارد با فیزیک فنری (Spring Physics) استفاده کنید.

---

## ۱. الگوی ورود نرم به صحنه (Smooth Fade In Up)

```tsx
import { motion } from 'framer-motion';

export const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1], // استایل فیزیک کوبیک فوق‌العاده نرم
    },
  },
};
```

---

## ۲. افکت ترتیبی آیتم‌ها (Staggered Children Container)

مناسب برای سکشن‌هایی که دارای بج، تیتر، توضیحات، دکمه‌ها یا گرید کارت‌ها هستند:

```tsx
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};
```

---

## ۳. میکرواینترکشن لمسی دکمه‌ها و کارت‌ها (Spring Hover & Tap Feedback)

```tsx
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
  className="px-6 py-3.5 bg-[#1f3d3a] hover:bg-[#2b544e] text-white font-medium rounded-full shadow-[0_4px_14px_0_rgba(31,61,58,0.25)] transition-colors duration-200"
>
  رزرو جلسه معارفه
</motion.button>
```

---

## ۴. کارت‌های شناور با تغییر مرز و سایه نرم

```tsx
<motion.div
  whileHover={{ y: -4 }}
  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
  className="p-6 bg-white rounded-2xl border border-[#e5e5e2] shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgb(0,0,0,0.08)] hover:border-[#1f3d3a]/30 transition-all duration-300"
>
  {/* محتوای کارت */}
</motion.div>
```

---

## ۵. تب‌های متحرک با کپسول متحرک (Layout Animation)

```tsx
<div className="flex gap-2 p-1.5 bg-[#fafaf8] rounded-full border border-[#e5e5e2]">
  {tabs.map((tab) => (
    <button
      key={tab.id}
      onClick={() => setSelectedTab(tab.id)}
      className="relative px-5 py-2 text-sm font-medium transition-colors"
    >
      {selectedTab === tab.id && (
        <motion.div
          layoutId="active-pill"
          className="absolute inset-0 bg-white rounded-full shadow-sm"
          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
        />
      )}
      <span className={`relative z-10 ${selectedTab === tab.id ? 'text-[#1f3d3a]' : 'text-[#6b6b6b]'}`}>
        {tab.label}
      </span>
    </button>
  ))}
</div>
```
