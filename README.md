# Punch Drunk Modules

Internal shared modules for Punch Drunk Productions applications.

> **⚠️ Proprietary software.** This repository is internal tooling for Punch Drunk Productions. It is not licensed for external use. No permission is granted to copy, modify, or distribute this code outside of Punch Drunk projects.

## Packages

### `@punch-drunk/auth`

Express middleware for Punch Drunk Auth integration. Handles the complete OAuth flow including the token exchange pattern, session configuration, and route protection middleware.

**Features:**
- Complete PD Auth OAuth flow (login, callback, token exchange, logout)
- PostgreSQL-backed session management via `connect-pg-simple`
- `requireAuth` and `requireAdmin` middleware
- Rate-limited auth code exchange
- Automatic expired token cleanup
- Manual `Set-Cookie` signing to ensure cookie delivery
- Security headers middleware

### `@punch-drunk/tokens`

Brand foundations for every internal Punch Drunk app: colour, type, spacing,
radius, shadow, motion, interaction utilities, print, and the self-hosted fonts.
One import gives an app the whole visual system.

```css
@import "@punch-drunk/tokens/styles.css";
```

Ships both themes. Tailwind v3 apps keep working via the channel triplets;
`tokens/theme-v4.css` is the v4 bridge.

### `@punch-drunk/ui`

47 React components in nine families (core, forms, data, feedback, layout,
charts, calendar, kanban, print), published as source with no build step, the
same convention as `@punch-drunk/auth`. Each one ships a `.d.ts` props contract
and a `.prompt.md` stating the rules that matter.

Requires `@punch-drunk/tokens`. `recharts` is a peer dependency used by
`LineChart`, `BarChart`, `StackedBarChart` and `DonutChart`; npm installs it
automatically.

The design system is for **internal PD apps** (Dashboard, Audition, Slider,
FileTransfers, Scratchpad and the rest). CrewSheet and Endlist are separate
products with their own brands and do not consume it.

#### Installing tokens and ui

Install both in **one** command, from the tarballs attached to each GitHub Release:

```bash
npm install \
  https://github.com/getpunchdrunk/pd-modules/releases/download/tokens-v1.2.0/punch-drunk-tokens-1.2.0.tgz \
  https://github.com/getpunchdrunk/pd-modules/releases/download/ui-v0.4.0/punch-drunk-ui-0.4.0.tgz
```

npm cannot install a subfolder of a git repo, so the `github:…#tag` form resolves
to the unnamed workspace root and fails for these packages. Installing `ui` alone
makes npm look for `@punch-drunk/tokens` on the public registry, where it does not
exist.

## Installation (`@punch-drunk/auth`)

```bash
# Install from GitHub
npm install github:getpunchdrunk/pd-modules#v1.1.0
```

## Quick Start

```typescript
import { registerPunchDrunkAuth } from "@punch-drunk/auth";
import { Pool } from "pg";

const dbPool = new Pool({ connectionString: process.env.DATABASE_URL });

await registerPunchDrunkAuth(app, {
  dbPool,
  sessionSecret: process.env.SESSION_SECRET!,
  pdAuthApiKey: process.env.PUNCH_DRUNK_API_KEY!,
  appUrl: "https://myapp.punch-drunk.com",
  postLoginRedirect: "/",
  lookupUser: async (pdUser) => {
    // Your app-specific user lookup logic
    const user = await db.getUserByEmail(pdUser.email);
    if (!user) return null;
    return {
      userId: user.id,
      role: user.role,
      email: user.email,
      displayName: pdUser.displayName || user.displayName,
      avatarUrl: pdUser.avatar || null,
      // ...any extra session fields your app needs
    };
  },
  onLoginUpdate: async (localUser, pdUser) => {
    // Optional: update local user record on each login
    await db.updateUser(localUser.userId, {
      displayName: pdUser.displayName,
      lastLoginAt: new Date(),
    });
  },
});
```

## Apps Using These Modules

| App | URL | Docs |
|-----|-----|------|
| File Transfers (Uploader) | https://files.punch-drunk.com | [/api/app-docs](https://files.punch-drunk.com/api/app-docs) |
| CrewSheet | https://crewsheet.punch-drunk.com | [/api/app-docs](https://crewsheet.punch-drunk.com/api/app-docs) |
| PD Auth (integration guide) | https://auth.punch-drunk.com | [/api/integration-guide](https://auth.punch-drunk.com/api/integration-guide) |
