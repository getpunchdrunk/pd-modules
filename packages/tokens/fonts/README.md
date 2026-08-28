# Fonts

Self-hosted webfonts for the Punch Drunk internal design system. In pd-modules
this folder is `packages/tokens/fonts/`, served by each app at `/fonts/`.
The `@font-face` rules live in `tokens/fonts.css` — nothing else should declare
a font face.

## Files

| File | Family | Role | Axis |
|---|---|---|---|
| `inter-variable-v1.woff2` | Inter | UI text | 100–900 |
| `inter-variable-italic-v1.woff2` | Inter | UI text, italic | 100–900 |
| `noto-sans-display-400-v1.woff2` | Noto Sans Display | Headings | 400 |
| `noto-sans-display-500-v1.woff2` | Noto Sans Display | Headings | 500 |
| `noto-sans-display-600-v1.woff2` | Noto Sans Display | Headings | 600 |
| `noto-sans-display-700-v1.woff2` | Noto Sans Display | Headings (default) | 700 |
| `geist-mono-variable-v1.woff2` | Geist Mono | Data, numerals | 100–900 |
| `geist-mono-italic-variable-v1.woff2` | Geist Mono | Data, italic | 100–900 |
| `geist-sans-variable-v1.woff2` | Geist | Unused — held in reserve | 100–900 |
| `geist-sans-italic-variable-v1.woff2` | Geist | Unused — held in reserve | 100–900 |

Geist Sans is present but not referenced by any token. It's kept in case the
system ever collapses to two families (Geist + Geist Mono are a designed pair);
until then, UI text is Inter.

## Licenses

All three families are SIL Open Font License 1.1 — free for commercial use,
free to self-host, free to bundle inside our apps. Selling the font files
themselves is the only prohibition, and a modified font may not keep its
original name.

- `LICENSE-inter.txt` — Inter
- `LICENSE-geist.txt` — Geist and Geist Mono
- `LICENSE-noto.txt` — Noto Sans Display

## Rules

- **Never overwrite a file that has shipped.** Publish `-v2.woff2` and update the
  path in `tokens/fonts.css`. That is the entire purpose of the version suffix.
- **Never append a query string** to a font URL — it makes the CDN skip caching.
- **Latin subset only.** If a client name ever needs glyphs outside Latin-1,
  add a separate subset file with a `unicode-range`, don't swap the base file.
- Variable files cover every weight in one request, so new weights need no new
  files — just use the weight.
