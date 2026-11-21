# Skincare Homepage — Design Shortlist & Build Plan (Nov 2026)

Companion to `claude/upwork-relaunch-plan.md` → "Next project".

## Decision (15 Nov 2026)
**Chosen design: Velvety – Beauty & Wellness UI kit [FREE]** — https://www.figma.com/community/file/1355444693516055303
First check when opening the file:
- Is there an assembled homepage/landing frame, or only components? If only components, lay out the page yourself from them (say so in the case study: "assembled from the Velvety UI kit").
- Is there a mobile frame? If not, the 375/768px layouts are your own design decisions. Write them down in docs/decisions.md as client talking points.
- Read the description for licence terms beyond CC BY 4.0. Note the creator's name for the credit.
- Which homepage sections exist vs the target list (navbar, hero, brand story, benefits, products, testimonials, newsletter/footer)? Mark any gaps.
Fallback if it has no usable homepage: Beautya (https://www.figma.com/community/file/1231630796369241790).

## Design shortlist (Figma Community) — for reference
Free Community files are CC BY 4.0: portfolio/commercial use is OK, **credit the creator and say what you changed**.
1. Sseraskin — https://www.figma.com/community/file/1606172898699987538
2. Beautya — https://www.figma.com/community/file/1231630796369241790
3. **Velvety (chosen)** — https://www.figma.com/community/file/1355444693516055303
4. Skincare & Beauty Multi-Section — https://www.figma.com/community/file/1504372860504118651
5. Next-Gen Natural Skincare — https://www.figma.com/community/file/1511494194223562602

## Stack
React + Vite, Tailwind CSS v4 (`@tailwindcss/vite`, tokens in CSS `@theme`), Motion (Framer Motion's current name: package `motion`, import from `motion/react`), Vercel.

## Folder structure
```
src/
  assets/images/        # WebP exports
  components/
    layout/             # Navbar, MobileMenu, Footer
    sections/           # Hero, BrandStory, Benefits, FeaturedProducts, Testimonials, Newsletter
    ui/                 # Container, Button, SectionHeading, ProductCard, TestimonialCard, Reveal
  data/                 # nav.js, benefits.js, products.js, testimonials.js
  hooks/                # useScrolled.js, useLockBodyScroll.js
  lib/motion.js         # shared easing, durations, variants
  index.css             # @import "tailwindcss" + @theme tokens
  App.jsx  main.jsx
CLAUDE.md  README.md  docs/tokens.md  docs/decisions.md  .claude/settings.json
```
Rule: sections read from `data/`, render with `ui/` components, use theme tokens (no hard-coded hex/px).

## Tailwind theme (from Figma)
Duplicate the file to drafts, then record in `docs/tokens.md`: colour styles, text styles (family/size/line-height/letter-spacing for desktop AND mobile), auto-layout gaps/padding, container width + grid, radii, shadows. A UI kit usually has a styles/foundations page: start there.
```css
@import "tailwindcss";
@theme {
  --color-cream: #F7F3EE;  /* placeholders until Velvety values are extracted */
  --color-sand:  #E8DED3;
  --color-clay:  #B08968;
  --color-ink:   #2B2621;
  --font-display: "Cormorant Garamond", serif;
  --font-sans: "Inter", sans-serif;
  --text-display: clamp(2.5rem, 1.6rem + 3.8vw, 4.5rem); /* 40px@375 → 72px@1440 */
  --text-display--line-height: 1.05;
  --radius-card: 1.25rem;
  --ease-calm: cubic-bezier(0.22, 1, 0.36, 1);
}
```
Tailwind v4 spacing is a 4px multiplier, so `p-18` = 72px without config. Only add tokens for repeated values. Self-host fonts with Fontsource.

## Motion rules (calm)
0.6–0.9s, `--ease-calm`, 16–24px fade-up, `whileInView` with `once: true`, 0.08s stagger, hover scale ≤1.03, `<MotionConfig reducedMotion="user">`. No bounce/spring overshoot.

## Build order (≈12 sessions of ~2h)
0. Install VS Code + the Claude Code extension (only that — no desktop app or separate CLI needed); apply the settings below; do the warm-up exercise.
1. Audit Velvety (checklist above), fill tokens.md, export images → WebP.
2. Scaffold Vite + Tailwind + Motion, GitHub repo, deploy to Vercel on day one, CLAUDE.md, .claude/settings.json.
3. Theme + fonts + ui primitives (Container, Button, SectionHeading).
4. Navbar (desktop, static).
5–6. Hero (mobile-first, then md/lg); overlay check vs Figma.
7. BrandStory + Benefits.
8. FeaturedProducts (data-driven ProductCard + hover).
9. Testimonials (static) + Newsletter + Footer.
10. Interactivity: sticky nav, MobileMenu (AnimatePresence, Esc, focus, scroll lock), testimonial slider, newsletter validation + success state.
11. Motion pass + quality pass (lazy images with width/height, hero `fetchpriority="high"`, alt, focus, contrast, meta/OG, Lighthouse 90+ at 375/768/1440).
12. README (screenshots, live link, CC BY credit + changes), Figma-vs-build image, Upwork entry.

## Claude Code setup & habits
- Using the **VS Code extension only** (Riveen prefers not to install extra apps). Needs a paid Claude plan (Pro or above).
- First run in the repo: open the Claude panel → sign in → `/init` → edit CLAUDE.md.
- Plan mode before anything touching more than one file. `/clear` between components. `@src/components/...` to point at files. `/usage` to check plan limits.
- CLAUDE.md: "I'm learning. Explain before changing. Prefer hints/review over writing whole files unless I ask. Use theme tokens, no arbitrary values. One component at a time. Never commit for me."
- Loop per component: plan → write it (or the TODO(human) parts) → review → ask "why" → commit yourself.
- Keep docs/decisions.md as client-call talking points.

### Settings
**VS Code user settings (JSON)** — start every conversation in plan mode instead of Auto:
```json
"claudeCode.initialPermissionMode": "plan"
```
**Project `.claude/settings.json`** (commit it):
```json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "outputStyle": "Learning",
  "permissions": {
    "allow": [
      "Bash(npm run build)",
      "Bash(npm run lint)",
      "Bash(npm run preview)",
      "Bash(git status)",
      "Bash(git diff *)",
      "Bash(git log *)"
    ],
    "ask": ["Bash(npm install *)", "Bash(npx *)"],
    "deny": [
      "Bash(git commit *)",
      "Bash(git push *)",
      "Bash(vercel *)",
      "Read(./.env)",
      "Read(./.env.*)"
    ]
  }
}
```
- Run `npm run dev` yourself in VS Code's terminal (it never exits, so don't hand it to Claude).
- After plan approval, work in Manual (asks before edits) while learning; Edit automatically only once comfortable. Avoid Auto for this project.
