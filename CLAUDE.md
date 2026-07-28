# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Turbopack dev server on http://localhost:3000
npm run build     # Production build
npm start         # Serve the production build
npm run lint      # ESLint (flat config, eslint-config-next core-web-vitals + typescript)
npx tsc --noEmit  # Type check — no script does this on its own
```

No test setup exists — no runner, no test files.

`npm ci` currently fails (the lockfile is missing `source-map-js`); use `npm install`.

## The brief comes first

[VISUAL.md](VISUAL.md) is the design specification and it overrides taste. Read it before any visual change. The parts most often violated:

- **Motion** 120/180/240/320/500ms only, easing `cubic-bezier(0.16, 1, 0.3, 1)`, **max hover scale 1.02**, no bounce/elastic/overshoot.
- **Colour** mostly neutral, no saturated gradients, no rainbow, no neon. The page must still read with all colour removed.
- **Animate only** `transform` / `opacity` / `filter`. Never animate layout.
- Every animation respects `prefers-reduced-motion`; focus indicators are always visible.

## Architecture

Single-page portfolio for Mohan Ruttala. Next.js 16 App Router + React 19 + Tailwind CSS v4, TypeScript strict. No backend, no API routes, no data fetching — content is hardcoded in the component that renders it.

### Server by default

[app/page.tsx](app/page.tsx) and [app/layout.tsx](app/layout.tsx) are **server components**. Only sections needing browser APIs carry `"use client"`. Components live flat in [app/components/](app/components/), reusable primitives in [app/components/ui/](app/components/ui/), and every one exports a named `const` (no default exports).

### Identity lives in one file

[app/lib/site.ts](app/lib/site.ts) holds name, role, email, location, socials and the section list. Metadata, JSON-LD, sitemap, robots, nav, contact section and command palette all read from it. **Never hardcode the email or a social URL** — that duplication is exactly what this file replaced.

### Two theming layers

1. **Tokens** — the Tailwind v4 `@theme` block in [app/globals.css](app/globals.css) generates `bg-ink-0`…`bg-ink-3`, `text-text-hi/mid/lo`, `border-edge`, `bg-lume`, `text-jade`, plus the radius scale (`rounded-xs` 4 → `rounded-xl` 24) and `max-w-narrow` / `max-w-wide`.
2. **Non-utility tokens** in `:root` — `--shadow-1/2/3`, `--lit-top`, `--dur-1`…`--dur-5`, `--ease`, `--section-y`.

Spacing stays on Tailwind's 4px scale; the 8px grid is held by only using **even** steps. `--default-transition-timing-function` is overridden in `:root` so Tailwind's easing does not leak into `transition-*` utilities.

Text colours are contrast-checked: `--color-text-lo` is `#7a8088` specifically to clear 4.5:1 on `--color-ink-0`. Do not darken it.

### The lighting model is the signature

One light source governs everything. `.lit` draws a 1px gradient border-mask that brightens where the pointer is; `usePointerLight()` in [app/lib/motion.ts](app/lib/motion.ts) publishes `--lx`/`--ly` on the element, coalesced into one rAF. `--lit-top` puts a highlight on the upper edge of every raised surface so the whole page shares one light direction.

**Nothing else glows.** No neon shadows, no per-component accent colours.

### Motion

All hooks live in [app/lib/motion.ts](app/lib/motion.ts):

- `useReveal(deps?)` — registers `.reveal` / `.reveal-rows` elements with **one module-level IntersectionObserver** shared page-wide. Reveals once, never unobserves on unmount. Pass `deps` for content that mounts later (tab panels).
- `usePointerLight()`, `useCountUp()`, `usePrefersReducedMotion()`, `useIsMac()` — the last two use `useSyncExternalStore`, not state-in-an-effect (the lint rule `react-hooks/set-state-in-effect` will reject that).
- `useModal(open, onClose)` — Esc, focus trap, focus restore, scroll lock. Every dialog uses it.

CSS classes: `.reveal` (opacity + translateY + blur), `.reveal-rows` (row stagger from one parent), `.reveal-split` + `<SplitText>` (words rise out of clipping boxes), `.draw-rule`, `.stack-item` (sticky deck), `.rail-progress` (scroll-driven via `animation-timeline: view()`).

Anything new must resolve to a **visible static state** inside the `prefers-reduced-motion` block, or the content becomes invisible for those users.

### No icon font, no animation library

Icons are inline SVG in [app/components/ui/Icon.tsx](app/components/ui/Icon.tsx) — add a path to `PATHS` and the name to `IconName`. There is no Material Symbols stylesheet and no Framer Motion / GSAP.

### Layering

`GlobalBackground` is a fixed `z-0` CSS-only stack. Content is `z-10`, navbar `z-50`, cursor `z-[70]`, modals `z-[75]`, palette `z-[80]`. **Never add a `requestAnimationFrame` canvas** — two of them were removed for costing ~5,500 `Math.hypot` calls per frame.

Never combine `filter: blur()` with a per-frame `transform` — the element re-rasterises every frame. A radial gradient is already soft and needs no blur.

## Content locations

- **Projects**: `PROJECTS` in [Projects.tsx](app/components/Projects.tsx); `ProjectData` type in [ProjectModal.tsx](app/components/ProjectModal.tsx). Screenshots are PNGs in [public/](public/) rendered through `next/image`.
- **Services / Skills / Timeline / Testimonials**: the array at the top of each component.
- **Code samples**: `SNIPPETS` in [CodePlayground.tsx](app/components/CodePlayground.tsx).
- **Everything identity-related**: [app/lib/site.ts](app/lib/site.ts).

Section ids (`work`, `services`, `about`, `experience`, `skills`, `code`, `contact`) are declared in `site.sections` and consumed by the nav, scroll-spy, palette and sitemap. Adding a section means adding it there **and** giving the element a matching `id`.

## Deployment

`NEXT_PUBLIC_SITE_URL` **must** be set in production. Canonical URL, OG image URL, sitemap and robots all resolve against it; the fallback in `site.ts` is a guess.

## Known open items

- Testimonials in [Testimonials.tsx](app/components/Testimonials.tsx) are three named people. If they are not real quotes, they work against the page's credibility.
- The About stats claim "15+ projects" and "10+ clients" while four projects are shown.
- `hero_premium_visual.png` is 731 KB.
