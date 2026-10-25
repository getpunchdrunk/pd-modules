# @punch-drunk/tokens

Brand foundations for every Punch Drunk app: colour, type, spacing, radius,
shadow, motion, interaction utilities, print, and the self-hosted fonts.

```bash
# Install tokens and ui together, in one command
npm install \
  https://github.com/getpunchdrunk/pd-modules/releases/download/tokens-v1.2.0/punch-drunk-tokens-1.2.0.tgz \
  https://github.com/getpunchdrunk/pd-modules/releases/download/ui-v0.3.0/punch-drunk-ui-0.3.0.tgz
```

Packages ship as tarballs attached to the GitHub Release for each tag. npm cannot
install a subfolder of a git repo, so the old `github:getpunchdrunk/pd-modules#tag`
form resolves to the unnamed workspace root and fails. Install both packages in
**one** command: `@punch-drunk/ui` lists `@punch-drunk/tokens` as a peer, and
installed alone npm would look for the tokens package on the public registry.

```css
@import "@punch-drunk/tokens/styles.css";
```

That single import pulls in all eleven token files. Apps should never import a
token file directly except to override one deliberately.

| File | What's in it |
|---|---|
| `tokens/fonts.css` | `@font-face` rules, versioned static paths |
| `tokens/base.css` | Reset and element defaults |
| `tokens/colors.css` | Brand scale, v3 channel triplets, semantic aliases, status tints, event palette, chart ramp, desk grey, ink-on-dark set, dark theme |
| `tokens/typography.css` | Font roles, size ramp, weights, tracking, tabular-nums default |
| `tokens/spacing.css` | Spacing scale and the measured density values |
| `tokens/radius.css` | 2 / 4 / 6 / 8 / pill |
| `tokens/shadows.css` | Hard 2px system, overlay exception, focus ring |
| `tokens/motion.css` | Durations, easing, reduced-motion collapse |
| `tokens/elevate.css` | Hover/press/toggle overlays, `.pd-stripes`, `.pd-skeleton` |
| `tokens/print.css` | Print ink, hairlines, subtotal band, page-break rules |
| `tokens/theme-v4.css` | Tailwind v4 `@theme inline` bridge |

## Fonts

Four families, all OFL 1.1, licenses included: Noto Sans Display (headings),
Inter (UI), Geist Mono (data), Geist Sans. Served from static versioned paths
(`/fonts/inter-variable-v1.woff2`) — **never query strings**, which bypass CDN
caching.

## Dark mode

Both themes ship. The trap that broke it once: a custom property substitutes
where it is *declared*, so every alias built on a channel triplet
(`--surface-card: hsl(var(--card))`) is re-declared inside `.dark`. Overriding
`--card` alone leaves the alias frozen at its light value.

## Migrating an existing app

FileTransfers, audition and slider are Tailwind v3 + shadcn/ui. The v3 channel
triplets in `colors.css` keep them working unchanged; `theme-v4.css` is there
for when they move to v4. Per-app migration notes are in the design system's
`readme.md`.
