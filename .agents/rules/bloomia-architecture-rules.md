# Bloomia Club — Architecture & Code Rules (Direct Reference)

See root file `AGENTS.md` for full specification.

## Core Rules Summary:
1. **Strict Mobile-First**: Build smallest screen UI first (default classes), enhance with `md:` and `lg:`. Ergonomic touch targets (min 44x44px).
2. **Modular Sectioning**: Every page component is split into distinct, single-responsibility section components in `components/sections/<page-name>/<SectionName>.tsx`.
3. **Impeccable Craft & Taste (Anti-Slop)**:
   - High visual quality inspired by Impeccable.style & TasteSkill.dev.
   - Distinct layouts, rhythmic spacing, organic ambient shadows, rich component states (hover, active, focus, disabled, loading).
   - Strict ban on lazy boilerplate cards, decorative glassmorphism, or emoji as icons.
4. **Modern Bleeding-Edge Stack**:
   - Next.js 15+ App Router, React 19, Tailwind CSS.
   - Radix UI accessible primitives, Framer Motion transitions.
   - Lucide React unified stroke icons.
   - Native Sanity & Supabase server-side integrations.
5. **Deep SEO & GEO**:
   - Native SSR/SSG with clean semantic HTML5 (`<main>`, `<article>`, `<section>`, single `<h1>`).
   - Dynamic metadata & OpenGraph (`generateMetadata`).
   - Full JSON-LD schemas (`Organization`, `WebSite`, `Person`, `Article`, `FAQPage`, `BreadcrumbList`).
   - Generative Engine Optimization for SearchGPT, Perplexity, Gemini.
6. **Brand & Typography**:
   - Primary: `#1f3d3a` (Deep Emerald/Teal).
   - Accent: Warm terracotta/coral (`#BF4408`, `#E65103`).
   - Surface: `#fafaf8` & `#ffffff`.
   - Font: `Vazirmatn` via `next/font` (Zero Layout Shift).
7. **Safe Branch Workflow**:
   - Developed in `feature/nextjs-migration` branch.
