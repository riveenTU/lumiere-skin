# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A portfolio skincare-brand homepage built from the Figma Community file **Velvety – Beauty & Wellness UI kit** (CC BY 4.0: the README must credit the creator and say what was changed). `docs/build-plan.md` holds the full plan: design notes, the build order (~12 sessions, one component at a time), motion rules and the target folder structure. Read it before starting a new component or section.

## Working with me

- I'm learning. Explain before changing. Prefer hints/review over writing whole files unless I ask.
- Use theme tokens, no arbitrary values (no hard-coded hex/px or `[...]` Tailwind values).
- One component at a time.
- Never commit for me.
- Don't run `npm run dev` (it never exits); I run it myself in the VS Code terminal.
- The project plan is in docs/build-plan.md. Its @theme example is an old placeholder: the real Figma tokens are in docs/tokens.md and src/index.css.

## Commands

```bash
npm run dev      # Vite dev server with HMR
npm run build    # production build to dist/
npm run preview  # serve the dist/ build
npm run lint     # ESLint (flat config, eslint.config.js)
```

There is no test runner. Verify changes with `npm run lint` and `npm run build`.

## Stack

- React 19 + Vite 8, plain JavaScript/JSX (no TypeScript).
- **Tailwind CSS v4** via `@tailwindcss/vite` (registered in `vite.config.js`). There is no `tailwind.config.js` and no PostCSS config. All configuration lives in `src/index.css`: `@import "tailwindcss";` plus a `@theme { ... }` block. Every `--color-*`, `--font-*`, `--text-*`, `--radius-*` and `--ease-*` variable in `@theme` becomes a utility class. Default spacing is a 4px multiplier (`p-18` = 72px), so only add tokens for values that repeat. Figma values are recorded in `docs/tokens.md`.
- **Motion** (the current name for Framer Motion): import from `motion/react`, not `framer-motion`.
- Fonts are self-hosted with Fontsource. Images are WebP exports. Deployed on Vercel.

## Architecture (target, per the section map in docs/tokens.md)

```
src/components/layout/    Navbar, MobileMenu, Footer
src/components/sections/  Hero, BrandStory, FeaturedProducts, About, ProcessBanner, AllProducts,
                          Diagnosis, Testimonials, Perks, Newsletter
src/components/ui/        Container, Button, Eyebrow, SectionHeading, ProductCard, Rating, Chip,
                          SliderControls, Reveal
src/data/                 content arrays (nav, features, products, testimonials, perks)
src/hooks/                useScrolled, useLockBodyScroll
src/lib/motion.js         shared easing, durations, variants
```

Rule: **sections read their content from `src/data/`, render with `ui/` components, and style with theme tokens.** `App.jsx` composes sections inside `<main>`.

## Motion rules (calm)

0.6–0.9s durations, the `--ease-calm` easing, 16–24px fade-up, `whileInView` with `once: true`, 0.08s stagger, hover scale ≤ 1.03, and the app wrapped in `<MotionConfig reducedMotion="user">`. No bounce or spring overshoot. Shared values go in `src/lib/motion.js`.

## Quality targets

Mobile-first layouts checked at 375 / 768 / 1440px. Lazy-load images and give them width/height; the hero image gets `fetchpriority="high"`. Every image needs alt text. Also check visible focus states, colour contrast and meta/OG tags. Target Lighthouse 90+. Layout choices not given in Figma (e.g. mobile) go in `docs/decisions.md`.

## Design references
- Tokens and section map: docs/tokens.md
- Build plan and folder structure: docs/build-plan.md
- Figma exports: design/ (full pages + one crop per section, desktop and mobile)
- Match the design exactly. Use only theme tokens from src/index.css; no arbitrary values like text-[17px] or bg-[#fff].
- Breakpoints: design is 375px (mobile) and 1440px (desktop). Build mobile-first.
- Record design decisions and deviations in docs/decisions.md.