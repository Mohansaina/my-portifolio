# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev     # Turbopack dev server on http://localhost:3000
npm run build   # Production build
npm start       # Serve the production build
npm run lint    # ESLint (flat config, eslint-config-next core-web-vitals + typescript)
npx tsc --noEmit  # Type check (no build script does this on its own)
```

There is no test setup in this repo — no test runner, no test files.

## Architecture

Single-page portfolio site for Mohan Ruttala. Next.js 16 App Router + React 19 + Tailwind CSS v4, TypeScript strict mode. No backend, no API routes, no database, no data fetching — **all content is hardcoded as arrays/objects inside the components that render it.**

### Everything is a client component

[app/layout.tsx](app/layout.tsx) is the only server component. [app/page.tsx](app/page.tsx) is `"use client"` and composes every section in fixed order (`Hero → Terminal → Marquee → About → Timeline → Skills → Services → Projects → CodePlayground → Testimonials → Contact`). All components live flat in [app/components/](app/components/) and export a named `const` (not a default export).

### Cross-cutting state flows through page.tsx

- **Toasts**: `page.tsx` owns the `toasts` array and passes `addToast` down as `onShowToast` props. Any component that needs a toast takes that prop — there is no toast context.
- **Magnetic button helpers**: `handleMagnetButton` / `handleMagnetButtonReset` are defined in `page.tsx` and passed to `Hero` and `Contact` as `onMagnetButton`/`onMagnetButtonReset`. They mutate `style.transform` directly on the event target.
- **Audio**: [AudioContext.tsx](app/components/AudioContext.tsx) is the one real React context. `useAudio()` gives `playBeep(freq, type, duration)` which synthesizes tones via Web Audio (no audio files); muted by default and gated on `isMuted`. `Navbar` toggles it.

### Theming: two independent layers

1. **Material-style design tokens** — defined in the Tailwind v4 `@theme` block in [app/globals.css](app/globals.css) (`--color-surface-container`, `--color-on-surface`, `--spacing-section-gap`, `--font-display-lg`, etc.). These generate Tailwind utilities like `text-on-surface`, `px-margin-desktop`, `py-section-gap`, `max-w-container-max`, `font-label-caps`. Prefer these over raw values for spacing/typography.
2. **Runtime accent color** — five palettes (`cyan`, `emerald`, `violet`, `amber`, `crimson`) selected by a `data-theme` attribute on `<html>`, each redefining `--accent-color`, `--accent-gradient`, `--accent-glow`, `--accent-border`. [ThemeSwitcher.tsx](app/components/ThemeSwitcher.tsx) sets the attribute and persists to `localStorage` under `mohan_theme`. Consume via the `.accent-text` / `.accent-bg` / `.accent-border` / `.accent-gradient-text` / `.ignition-gradient` helper classes, **not** hardcoded hex.

Caveat: a lot of existing markup hardcodes `cyan-400`/`#00f2fe` (cursor, scroll bar, project buttons) and so ignores the theme switcher. Use accent classes for new work.

### Animation is CSS-class + IntersectionObserver, not a library

There is no Framer Motion / GSAP. [ScrollAnimations.tsx](app/components/ScrollAnimations.tsx) mounts one global `IntersectionObserver` that adds `is-visible` to any element with `.reveal-up`, `.reveal-scale`, `.reveal-left`, `.reveal-right`, or `.reveal-stagger`. The transitions themselves live in [globals.css](app/globals.css). To animate something new, add one of those classes — the observer picks it up on mount only, so elements rendered later (e.g. inside a modal) will not be observed.

Other effects: `.glass-card` / `.glass-nav` (glassmorphism), `.tilt-card-container` + inline `rotateX/rotateY` math for 3D card tilt, `.marquee-track` keyframes, `.developer-grid` background. Shared easing across the site is `cubic-bezier(0.16, 1, 0.3, 1)`.

### Canvas / cursor layers

[GlobalBackground.tsx](app/components/GlobalBackground.tsx) is a fixed full-viewport `z-0` layer (particle network canvas + blurred orbs + grid mask) mounted once in `page.tsx`; [ParticleCanvas.tsx](app/components/ParticleCanvas.tsx) is a separate, Hero-local canvas. [CustomCursor.tsx](app/components/CustomCursor.tsx) replaces the pointer on `md+` with a dot plus a lerped trailing ring. All three run `requestAnimationFrame` loops with cleanup in `useEffect`.

Sections stack above the background with explicit z-indexes (`z-20`/`z-30`/`z-40`); Navbar, cursor, toasts and modals sit at `z-50`. Keep new fixed overlays inside that scale.

### Navigation

Nav links in [Navbar.tsx](app/components/Navbar.tsx) are plain hash anchors. Adding a nav entry means also giving the target section a matching `id`. Current ids: `about`, `skills`, `timeline`, `services`, `projects`, `playground`, `contact`. `html { scroll-padding-top: 90px }` compensates for the fixed navbar.

## Content locations

Editing site content means editing the data literal at the top of the relevant component, not a CMS or JSON file:

- Projects (with `problem`/`solution`/`features`/`techStack`/screenshots): `projects` array in [Projects.tsx](app/components/Projects.tsx); the `ProjectData` type lives in [ProjectModal.tsx](app/components/ProjectModal.tsx). Screenshots are PNGs in [public/](public/) referenced by absolute path via plain `<img>` (`next/image` is not used).
- Fake-terminal commands (`help`, `whoami`, `skills`, `projects`, `contact`, `matrix`, `clear`): the if/else chain in [Terminal.tsx](app/components/Terminal.tsx).
- Code snippets shown in the playground: `snippets` array in [CodePlayground.tsx](app/components/CodePlayground.tsx).
- Bio/contact/social URLs are duplicated across [Contact.tsx](app/components/Contact.tsx), `Terminal.tsx`'s `contact` command, and the `metadata` in [layout.tsx](app/layout.tsx) — update all of them together.

The contact form in `Contact.tsx` does **not** submit anywhere; it fakes success with a `setTimeout` and a toast.

## Conventions worth matching

- Material Symbols Outlined icons via `<span className="material-symbols-outlined">icon_name</span>` — loaded from a Google Fonts `<link>` in `layout.tsx`, not an icon package.
- Fonts are `next/font/google` (Kanit for display/body, JetBrains Mono for code) exposed as `--font-kanit` / `--font-jetbrains`.
- Dark theme only; base background `#07080c` is repeated on `html`, `body`, and most sections.
- `@/*` maps to the repo root in [tsconfig.json](tsconfig.json), but components currently use relative imports (`./components/...`).
