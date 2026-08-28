# @punch-drunk/tokens

Design tokens, self-hosted webfonts and the global CSS every Punch Drunk app
consumes. No build step — the package ships CSS as source, the same contract as
`@punch-drunk/auth` shipping TypeScript.

## Install

```bash
npm install github:getpunchdrunk/pd-modules#tokens-v1.0.0
```

## Use

Import once, at the top of the app's CSS entry (`client/src/index.css`):

```css
@import "@punch-drunk/tokens/styles.css";
```

Then serve the fonts at the web path `/fonts/`. The `@font-face` rules use
`../fonts/`, relative to `tokens/fonts.css` — with Vite, copy or symlink
`node_modules/@punch-drunk/tokens/fonts` into `client/public/fonts`.

## What's inside

| File | Contents |
|---|---|
| `styles.css` | Entry point. `@import` lines only — never add rules here |
| `tokens/base.css` | `box-sizing: border-box` reset and form-element font inheritance |
| `tokens/fonts.css` | `@font-face` for Inter, Noto Sans Display, Geist Mono, Geist |
| `tokens/colors.css` | Brand scale, semantic aliases, shadcn channel triplets, dark theme |
| `tokens/typography.css` | Font roles, size ramp, weights, tracking, tabular-nums default |
| `tokens/spacing.css` | Spacing scale plus the measured density values |
| `tokens/radius.css` | 4 / 6 / 8 / pill |
| `tokens/shadows.css` | Hard 2px system, overlay exception, focus ring |
| `tokens/motion.css` | Durations, easing, reduced-motion collapse |
| `tokens/elevate.css` | Hover/press/toggle overlays and `.pd-stripes` texture |
| `tokens/theme-v4.css` | Tailwind v4 `@theme inline` bridge |
| `fonts/` | 10 woff2 files, 3 OFL licenses, and a README |

## Rules

**Use semantic names, never brand names, in product code.** `var(--surface-card)`,
`var(--text-muted)`, `var(--action-primary)` — not `var(--pd-pink)` and never a
literal hex. Dark mode works only because every component reads semantics.

**Pink has two values.** `--action-primary` (`#FD0C73`) for fills with white text
on them; `--text-action` (`#D40C64`) whenever pink is the letterform. Pink text
at the fill value measures 3.6:1 and fails WCAG AA.

**Fonts are versioned and immutable.** Never overwrite a shipped woff2 — publish
`-v2.woff2` and change the path. Never append a query string to a font URL; it
makes the CDN skip caching.

**Tailwind.** v4 apps get everything from `theme-v4.css`. The v3 apps
(FileTransfers, Audition, Slider) keep reading the channel triplets in
`colors.css` through their existing `tailwind.config.ts`, so this package can be
adopted before they migrate.

## Versioning

Per-package tags: `tokens-vMAJOR.MINOR.PATCH`. Patch for a value correction,
minor for new tokens, **major for renaming or removing a token** — consumers
reference these by name in every component.

## Migration notes for the shipped apps

**FileTransfers** — blurred shadows to the hard 2px set; radii 3/6/9 to 4/6/8;
`--font-mono` JetBrains Mono to Geist Mono; `--font-sans` Noto Sans to Inter; add
`--font-heading`; add a dark theme (it has none); `--sidebar-primary` navy to
pink; `--background` 98% to 100%.

**Audition** — closest to target. `--primary` 338 to 334; Menlo to Geist Mono;
`--font-sans` to Inter; chart palette to the brand ramp; radii to 4/6/8.

**Slider** — `--primary` and `--sidebar-primary` navy to pink (navy survives as
`--status-positive` and `--text-link`); Menlo to Geist Mono; `--font-sans` to
Inter; chart palette to the brand ramp.

**All three** — `.diagonal-stripes` / `.pd-stripes` consolidate to
`.pd-stripes`; the elevate utilities move here unchanged; stop referencing
literal colors in components.
