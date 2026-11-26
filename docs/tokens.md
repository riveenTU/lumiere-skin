# Design tokens & section map — Velvety UI kit

Source: "Velvety – Beauty and Wellness website UI kit" by DhuhaCreative, Figma Community (CC BY 4.0).
Frames: desktop 1440px, mobile 375px (confirmed). Brand: keep "Velvety" (designer's fictional brand, credited).

## Colours (exact, from Figma colour styles)

| Figma style | Hex | Tailwind token | Example class |
|---|---|---|---|
| Gray 100 | #213721 | `gray-100` | `text-gray-100` (headings, darkest) |
| Gray 80 | #3c5e39 | `gray-80` | `text-gray-80` (body text) |
| Gray 60 | #617c5f | `gray-60` | `text-gray-60` |
| Gray 40 | #899f87 | `gray-40` | `bg-gray-40` (hero left panel, banner strip, newsletter band) |
| Gray 20 | #c7d1c6 | `gray-20` | `border-gray-20`, "As seen in" logos |
| Gray 0 | #f2f6ef | `gray-0` | `bg-gray-0` (page background) |
| Primary Main | #213721 | `primary` | `bg-primary` |
| Primary Surface | #e4ece0 | `primary-surface` | `bg-primary-surface` (feature panel, product cards, active chip) |
| Primary Border | #c8d8c0 | `primary-border` | `border-primary-border` (chips, dividers) |
| Primary Hover | #496839 | `primary-hover` | `hover:bg-primary-hover` |
| Primary Pressed | #101c10 | `primary-pressed` | `active:bg-primary-pressed` |
| Success | #56cdad | `success` | form success state |
| Error | #f04e38 | `error` | form error state |
| Warning | #ffb836 | `warning` | — |
| Blue | #26a4ff | `blue` | — |

Note: in Figma, **Gray 100 is the darkest** (opposite of Tailwind's default scale). We remove Tailwind's default colours (`--color-*: initial`) so there's no confusion: `gray-100` in code = Gray 100 in Figma.

## Typography

Fonts: H1, H2, H5 = IvyMode Light; H3 = IvyMode Regular (paid font, see "Font decision"). H6 + all body = Aileron (CC0, free, on Fontsource). No letter spacing anywhere. There is no H4.

| Figma style | Mobile → Desktop | Line height | Token |
|---|---|---|---|
| H1 | 48 → 108px | 110% | `text-h1` |
| H2 | 40 → 56px | 120% | `text-h2` |
| H3 | 32 → 40px | 120% | `text-h3` |
| H5 | 24 → 30px | 120% | `text-h5` |
| H6 (Aileron) | 24 → 28px | 110% | `text-h6` |
| Body XXL | 22px | 140% | `text-body-xxl` |
| Body XL | 20px | 140% | `text-body-xl` |
| Body L | 18px | 140% | `text-body-l` |
| Body M | 16px | 140% | `text-body-m` |
| Body S | 14px | 140% | `text-body-s` |
| Body XS | 12px | 140% | `text-body-xs` |

Heading usage: `font-heading font-light text-h1` (H1/H2/H5), `font-heading font-normal text-h3` (H3), `font-sans text-h6` (H6).

Body weights: Light `font-light` (300), Regular `font-normal` (400), Semibold `font-semibold` (600), Bold `font-bold` (700), Light Italic `font-light italic`.

Headings scale smoothly between the mobile and desktop sizes with `clamp()`, calculated for 375px → 1440px.

## `src/index.css`

```css
@import "tailwindcss";

@theme {
  /* Remove Tailwind's default palette; use only the Figma colours */
  --color-*: initial;
  --color-white: #ffffff;
  --color-black: #000000;

  /* Gray (content, background, text, icon) — 100 = darkest, as in Figma */
  --color-gray-100: #213721;
  --color-gray-80: #3c5e39;
  --color-gray-60: #617c5f;
  --color-gray-40: #899f87;
  --color-gray-20: #c7d1c6;
  --color-gray-0: #f2f6ef;

  /* Primary (action) */
  --color-primary: #213721;
  --color-primary-surface: #e4ece0;
  --color-primary-border: #c8d8c0;
  --color-primary-hover: #496839;
  --color-primary-pressed: #101c10;

  /* Accent */
  --color-success: #56cdad;
  --color-error: #f04e38;
  --color-warning: #ffb836;
  --color-blue: #26a4ff;

  /* Fonts — Cormorant Garamond is the free stand-in for IvyMode */
  --font-heading: "Cormorant Garamond", ui-serif, Georgia, serif;
  --font-sans: "Aileron", ui-sans-serif, system-ui, sans-serif;

  /* Headings: fluid from 375px to 1440px */
  --text-h1: clamp(3rem, 1.680rem + 5.634vw, 6.75rem);
  --text-h1--line-height: 1.1;
  --text-h2: clamp(2.5rem, 2.148rem + 1.502vw, 3.5rem);
  --text-h2--line-height: 1.2;
  --text-h3: clamp(2rem, 1.824rem + 0.751vw, 2.5rem);
  --text-h3--line-height: 1.2;
  --text-h5: clamp(1.5rem, 1.368rem + 0.563vw, 1.875rem);
  --text-h5--line-height: 1.2;
  --text-h6: clamp(1.5rem, 1.412rem + 0.376vw, 1.75rem);
  --text-h6--line-height: 1.1;

  /* Body */
  --text-body-xxl: 1.375rem;
  --text-body-xxl--line-height: 1.4;
  --text-body-xl: 1.25rem;
  --text-body-xl--line-height: 1.4;
  --text-body-l: 1.125rem;
  --text-body-l--line-height: 1.4;
  --text-body-m: 1rem;
  --text-body-m--line-height: 1.4;
  --text-body-s: 0.875rem;
  --text-body-s--line-height: 1.4;
  --text-body-xs: 0.75rem;
  --text-body-xs--line-height: 1.4;

  /* Motion */
  --ease-calm: cubic-bezier(0.22, 1, 0.36, 1);
}

@layer base {
  body {
    @apply bg-gray-0 font-sans text-body-m text-gray-80 antialiased;
  }
}
```

Fonts (in `src/main.jsx`, after `npm install @fontsource/aileron @fontsource/cormorant-garamond`):
```js
import '@fontsource/aileron/300.css';
import '@fontsource/aileron/300-italic.css';
import '@fontsource/aileron/400.css';
import '@fontsource/aileron/600.css';
import '@fontsource/aileron/700.css';
import '@fontsource/cormorant-garamond/300.css'; // H1, H2, H5 (Light)
import '@fontsource/cormorant-garamond/400.css'; // H3 (Regular)
```

## Font decision (IvyMode)
IvyMode is a paid font. Options:
1. **Adobe Fonts** — included with any Creative Cloud plan (check whether UTS gives you CC). Exact match; loads from Adobe's servers.
2. **Free stand-in** — test Playfair Display, Bodoni Moda and Cormorant Garamond (Light) against the Figma H1 ("Let nature take care…") and pick the closest. Note the swap in `docs/decisions.md` and the README.

**Chosen:** Cormorant Garamond (free, Fontsource) as a stand-in for IvyMode. Weights: 300 for H1/H2/H5, 400 for H3.

## Section map (desktop order)

| # | Section | Component | Notes |
|---|---|---|---|
| 1 | Navbar | `layout/Navbar`, `layout/MobileMenu` | Desktop: links over hero. Replace the template's "Pages" dropdown with section links. Mobile: full-screen menu, large serif links, Login button at bottom. |
| 2 | Hero | `sections/Hero` | Split: Gray 40 left with tilted bottle overlapping, dark leaf photo right, H1 white across both. Arrows + vertical dots = slider (2–3 slides, calm fade). |
| 3 | Brand story + features | `sections/BrandStory` | Left: heading + bowl image. Right (`primary-surface` panel): 3 icon features from `data/features.js`. |
| 4 | Featured products | `sections/FeaturedProducts` | Eyebrow + heading, 3 cards; middle card has oval image background. `ui/ProductCard`, `ui/Rating`. |
| 5 | About | `sections/About` | Two-column text. "As seen in" logo strip **dropped** (real publication logos would imply press coverage of a fictional brand). |
| 6 | Process banner | `sections/ProcessBanner` | Full-width Gray 40 strip, H5-size text + arrow. Smallest section. |
| 7 | All products + filters | `sections/AllProducts` | Filter chips (`ui/Chip`) + 2×2 grid. **Make the filters work** (state + empty state "No items found" from the kit). Best React demo on the page. |
| 8 | Skin diagnosis CTA | `sections/Diagnosis` | Line-art image + eyebrow + H3 + outline button. |
| 9 | Testimonials | `sections/Testimonials` | Oval product image + stars + quote, vertical arrows/dots = slider. |
| 10 | Three CTAs | `sections/Perks` | Loyalty / Refer / Treatments: icon, eyebrow, title, outline button. Map from data. |
| 11 | Newsletter | `sections/Newsletter` | Gray 40 band, H3 + email input with arrow button. Validation + success state. |
| 12 | Footer | `layout/Footer` | Logo + hours + socials, 3 link columns, bottom bar with design credit. |

Shared UI: `Container`, `Button` (solid + outline variants, arrow icon), `Eyebrow` (small muted label above headings), `SectionHeading`, `ProductCard`, `Rating`, `Chip`, `SliderControls` (arrows + dots, used by Hero and Testimonials), `Reveal`.

## Decisions
- Brand stays **Velvety**; credit DhuhaCreative in README and footer, plus a small "Concept project, not a real brand" line.
- "As seen in" strip removed.
- Frames 1440 / 375. No H4. IvyMode Light except H3 (Regular). No letter spacing.
- Heading font: Cormorant Garamond (free, Fontsource) as a stand-in for IvyMode. Note the swap in the README.
- Still open: page side padding / content width.

## Design references for Claude Code
Exports live in `design/` (full pages + one crop per section, desktop and mobile). Point Claude at the matching crop with `@design/...` when planning each section.
