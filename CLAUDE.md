# pd-modules — Claude Code Context

## Working Style

- Always present a written plan before making any code changes. List the files, the approach, and any open questions. Wait for my approval before editing.
- Treat me as a non-developer who understands my product deeply but needs technical concepts explained clearly.
- Before writing any code, discuss the plan with me. Ask clarifying questions. Confirm the approach before making changes.
- When I describe a feature, help me think through edge cases and design decisions before jumping to implementation.
- Show me what you're thinking — explain tradeoffs, suggest alternatives, and let me choose.
- After making changes, explain what you did in plain terms and tell me how to test it.
- If something I'm asking for seems risky or could break things, tell me honestly and suggest a safer path.
- Never assume — if my request is ambiguous, ask rather than guess.

## Safety Rules

- Before making any edit, explain: what file you're changing, why, and what the change does.
- Never replace existing working code with a simpler version without explaining what the original code did and why your replacement is safe.
- This package handles **auth, sessions, and cookies for every PD app that installs it**. Any change here can break login across the whole suite at once. Treat every edit as production-critical and explain the full blast radius before touching it.
- If you're unsure whether a change is safe, say so and ask.
- Show the specific lines you plan to change before changing them.
- Do not remove code that looks unused without confirming it's actually unused.
- Security-relevant changes (anything touching the OAuth flow, the session cookie, the auth code exchange, rate limiting, or the security headers) must be called out explicitly and recorded in `CHANGELOG.md` and, where relevant, `SECURITY_REVIEW.md`.

## What This Is

`pd-modules` is the shared-module monorepo for Punch Drunk Productions apps. It is
**not** a deployed application — it is library code that other PD apps install and
import. The repo is **public** (unlike the other PD repos), so nothing secret may
ever be committed here. See `SECURITY_REVIEW.md` for the standing security review.

### Packages

- **`@punch-drunk/auth`** — Express middleware for Punch Drunk Auth
  (`auth.punch-drunk.com`) integration. One `registerPunchDrunkAuth(app, options)`
  call wires up session middleware, security headers, and all auth routes, plus
  `requireAuth` / `requireAdmin` / `getCurrentUser` helpers. This is currently the
  only package.

### Apps that consume it

- File Transfers / Uploader (`files.punch-drunk.com`)
- CrewSheet (`crewsheet.punch-drunk.com`)

When changing a package, remember every consumer above inherits the change on their
next install. There is no gradual rollout — a bad release breaks all of them.

## Tech Stack

- **Language:** TypeScript (100%)
- **Runtime target:** Node.js + Express (peer dependency, `>=4`)
- **Monorepo:** npm workspaces (`packages/*`)
- **Auth package deps:** `connect-pg-simple`, `cookie-signature`, `express-rate-limit`
- **Auth package peers:** `express`, `express-session`, `pg`

## Repo Structure

```
pd-modules/
  package.json            — workspace root (private, not published)
  README.md               — top-level overview + quick start
  CHANGELOG.md            — per-package change history
  SECURITY_REVIEW.md      — standing security review + findings
  packages/
    auth/
      package.json        — @punch-drunk/auth manifest
      README.md           — full auth integration guide + options table
      src/
        index.ts          — entire auth module (single file)
```

## How This Package Is Published & Consumed

- **No build step.** `@punch-drunk/auth` ships TypeScript source directly
  (`"main": "src/index.ts"`, `"types": "src/index.ts"`). Consuming apps compile it
  through their own build. Do not add a `dist/` build or change `main` without
  discussing it — it changes how every consumer imports the package.
- **Installed from GitHub by tag**, not from npm:
  ```bash
  npm install github:getpunchdrunk/pd-modules#v1.1.0
  ```
- **Releases are git tags** (`vMAJOR.MINOR.PATCH`) that match the package `version`
  in `packages/auth/package.json`. To cut a release: bump the version, update
  `CHANGELOG.md`, commit, tag (`git tag v1.1.0`), and push the tag. Consumers then
  bump their install ref.
- **Versioning:** bump **patch** for fixes, **minor** for additive/backward-compatible
  changes (e.g. a new option with a default), **major** for anything that changes a
  public signature, the route paths, the session cookie behavior, or the consumer
  import contract.

## The Auth Code Exchange Pattern (read before touching auth)

`@punch-drunk/auth` deliberately does **not** set the session on the OAuth redirect.
express-session does not reliably emit `Set-Cookie` on redirect responses (especially
with `saveUninitialized:false` + `resave:false`), so the flow is:

1. `GET /login` (or `/api/auth/login`) → redirect to `auth.punch-drunk.com/authorize`
   with `client_id` + `redirect_uri`. The callback URL is derived from the configured
   `appUrl`, not the inbound Host header.
2. `GET /auth/callback?token=...` → validates the token against the PD Auth server's
   `POST /api/apps/validate-token`, runs the app's `lookupUser`, then generates a
   one-time auth code (60s TTL, in-memory) and redirects to `${postLoginRedirect}?auth_code=...`.
3. Client detects `auth_code`, strips it from the URL, and `POST /api/auth/exchange`s it.
4. The exchange handler **regenerates the session** (fixation protection), stores
   `req.session.pdAuth`, saves, and sets the cookie manually via `cookie-signature`
   to guarantee delivery on the 200 response.

The cookie is signed manually because express-session's own emission isn't reliable
in this flow — do not "simplify" `setSessionCookie` away.

### redirect_uri is validated server-side
The PD Auth server's `/authorize` requires the requested `redirect_uri` to exactly
match the app's registered `redirectUrl`. This is what makes the callback safe. If
you change the callback path or how `redirect_uri` is built, the app's registration
on the auth server must be updated to match, or login breaks with a redirect_uri
mismatch.

## Critical Technical Rules

- **Session cookie name** defaults to `pd.sid` and is configurable per app. Each PD
  app must use its own cookie name to avoid collisions on the `.punch-drunk.com`
  parent domain (the same class of bug that causes login loops in the apps). Never
  default a consumer to `connect.sid`.
- **`trustProxy`** must match the real number of proxies in front of the consuming
  app. A too-high value lets clients spoof `X-Forwarded-For`, which the exchange rate
  limiter keys on. Default is `1` (single proxy, e.g. Railway/Cloudflare).
- **Pending auth codes are in-memory** (`pendingAuthTokens` Map). This only works for
  single-instance deployments. If any consumer horizontally scales, this must move to
  a shared store (Postgres rows or similar) — see `SECURITY_REVIEW.md` F8.
- **Never log secrets, emails, tokens, or session IDs.** Logs reference numeric user
  IDs only.
- **No secrets in the repo, ever.** It is public. Anything sensitive comes from the
  consuming app's environment and is passed in as options (`sessionSecret`,
  `pdAuthApiKey`).

## Known Open Security Items

Tracked in `SECURITY_REVIEW.md`. Do not close these without a plan:

- **F2** — No OAuth `state` / CSRF protection on the callback. Needs a coordinated
  change with the `pd-auth` server (server must echo a client-supplied `state`).
- **F4** — One-time `auth_code` is delivered in a URL query string. Move to a URL
  fragment before any third party consumes the package (changes the client contract).
- **F8** — In-memory pending-token map (see above).

## Testing Changes

There is no app to run here. To verify an auth change end to end, test it against a
**consuming app** (CrewSheet is the most exercised) pointed at this package via a
local file install or a pushed tag, and walk the full login flow:
login → auth.punch-drunk.com → callback → exchange → authenticated `GET /api/auth/me`.
Confirm the session cookie is set, survives a refresh, and that `/logout` clears it.

## What NOT to Change Without Discussion

- The auth code exchange flow or the manual cookie signing in `setSessionCookie`.
- The route paths (`/login`, `/auth/callback`, `/api/auth/exchange`, `/api/auth/me`,
  `/logout`) — consumers and the auth server's app registrations depend on them.
- `"main"` / `"types"` pointing at `src` (the no-build, ship-source contract).
- The public exports or option names in `PunchDrunkAuthOptions` (a major version bump).
- Anything that would put a secret, `.env`, or credential into this public repo.
