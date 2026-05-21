@AGENTS.md

# Portfolio Website — Context for Claude

## Project Overview
Personal portfolio site for **Tanapon Yurawan** (Software Developer & Security Enthusiast). Single-page app with smooth scroll navigation. Built with Next.js 16, React 19, TypeScript, Tailwind CSS v4, and shadcn/ui.

## Tech Stack
- **Framework**: Next.js 16.2.2 (App Router) — see AGENTS.md for breaking-change notice
- **UI**: shadcn/ui components + Radix UI primitives + Tailwind CSS v4 (`@import "tailwindcss"` syntax)
- **Animation**: GSAP 3 (`@gsap/react`), Motion (Framer Motion v12), custom CSS animations
- **3D / Background**: Three.js + postprocessing, custom `PixelBlast` component
- **Fonts**: Geist (sans), Manrope, JetBrains Mono (mono)
- **Icons**: lucide-react

## File Structure
```
src/
  app/
    layout.tsx          — RootLayout, metadata, font setup, always dark mode
    page.tsx            — Home page, assembles all sections
    globals.css         — CSS custom properties (design tokens), Tailwind base
  components/
    layout/
      site-header.tsx   — Fixed nav with scroll-blur effect
      site-footer.tsx   — Footer
    sections/
      hero-section.tsx    — Landing hero, resume PDF modal
      about-section.tsx   — About me + skills
      slider-section.tsx  — Infinite skills marquee
      projects-section.tsx — Filterable project cards (fullstack/automation/security)
      contact-section.tsx  — Contact form / links
    ui/                 — Reusable UI primitives (shadcn + custom)
      background-boxes.tsx  — PixelBlast animated background (Three.js canvas)
      blur-text.tsx         — Word-by-word blur-in animation
      fade-content.tsx      — Fade + translate-in wrapper
      count-up-number.tsx   — Animated counter
      infinite-moving-cards.tsx — Marquee strip
      sticky-scroll-reveal.tsx  — Scroll-driven reveal
      wobble-card.tsx           — Hover wobble effect card
  data/
    portfolio.ts        — Single source of truth: profile, skills[], projects[]
  lib/
    utils.ts            — cn() helper (clsx + tailwind-merge)
```

## Design System
- **Color palette**: dark navy/slate base (`--background: #020711`), cyan primary (`--primary: #7dd3fc`), emerald accent (`--accent: #6ee7b7`)
- **Only dark mode** — `className="dark"` is hardcoded on `<html>`
- **Section spacing**: use `.section-reveal` class or `var(--space-section-*)` CSS vars
- **Max content width**: `max-w-6xl` with `px-5 sm:px-8` padding
- **Border radius**: `--radius: 0.95rem`

## Data Layer
All portfolio content lives in **`src/data/portfolio.ts`** — edit `profile`, `skills`, or `projects` there, never hardcode content in components.

- `ProjectCategory` = `"fullstack" | "automation" | "security"`
- Resume PDF expected at `public/Tanapon-Resume-SoftwareDev.pdf`

## Key Conventions
- **`"use client"`** required on any component using hooks, event handlers, or browser APIs
- **Dynamic imports** used in `page.tsx` for below-fold sections to split JS bundle
- **Tailwind v4** — uses `@import "tailwindcss"` and `@theme inline { ... }` blocks, NOT `tailwind.config.js`. Class-based config is unsupported.
- Animation components accept `threshold`, `delay`, `duration` props — respect these for scroll-triggered entry
- `cn()` from `@/lib/utils` for conditional class merging

## Dev Workflow
```bash
npm run dev    # start dev server (localhost:3000)
npm run build  # production build
npm run lint   # ESLint
```

## Sections & IDs (for anchor nav)
| Section | `id` | Component |
|---|---|---|
| Home / Hero | `#home` | `HeroSection` |
| About | `#about` | `AboutSection` |
| Projects | `#projects` | `ProjectsSection` |
| Contact | `#contact` | `ContactSection` |

## Pre-Edit Checklist (ทำก่อนแก้ code ทุกครั้ง)

1. **อ่าน CLAUDE.md + AGENTS.md** — เข้าใจ conventions และ breaking changes ของ Next.js 16
2. **อ่านไฟล์จริงที่จะแก้** — ไม่เดาจาก structure, อ่าน source ก่อนเสมอ
3. **ระบุ scope ให้แคบ** — แก้เฉพาะที่ถูกขอ ไม่ refactor สิ่งที่ไม่เกี่ยวข้อง

## `.agents` Skills

Skills อยู่ที่ `.agents/skills/` — ใช้ตามตารางนี้:

| Skill | ใช้เมื่อ |
|---|---|
| `next-best-practices` | ก่อนเขียน/แก้ component ใดๆ — ตรวจ RSC boundary, async patterns, directive (`"use client"`), hydration errors, image/font optimization |
| `vercel-composition-patterns` | เมื่อ refactor หรือออกแบบ component — หลีกเลี่ยง boolean props, ใช้ compound components, React 19 no `forwardRef` |
| `deploy-to-vercel` | เมื่อ deploy — ตรวจ git remote + Vercel link ก่อน แล้วเลือก method ที่เหมาะสม |

### ลำดับการทำงาน

1. อ่าน CLAUDE.md → เข้าใจ conventions
2. อ่านไฟล์จริง → เข้าใจ current state
3. ใช้ `next-best-practices` → ตรวจสอบ patterns ที่ถูกต้องสำหรับ Next.js 16
4. ใช้ `vercel-composition-patterns` → ตรวจสอบ component design
5. แก้ code → เฉพาะ scope ที่ถูกขอ
6. ใช้ `deploy-to-vercel` → เมื่อ deploy
