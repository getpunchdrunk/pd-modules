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

## Installation

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



### `@punch-drunk/tokens`

Design tokens, self-hosted webfonts and global CSS for every PD app. Ships CSS
as source — no build step.

**Contents:** color, typography, spacing, radius, shadow and motion tokens;
light and dark themes; the shared hover/press `elevate` utilities; the
`.pd-stripes` brand texture; a Tailwind v4 `@theme` bridge plus v3-compatible
channel triplets; and the Inter / Noto Sans Display / Geist Mono webfonts with
their OFL licenses.

```bash
npm install github:getpunchdrunk/pd-modules#tokens-v1.0.0
```

```css
@import "@punch-drunk/tokens/styles.css";
```

### `@punch-drunk/ui`

React UI primitives styled entirely from the tokens. Ships source, no build
step. Requires `@punch-drunk/tokens`.

**Contents:** Button, IconButton, Badge, Card, Table, Input, Select, Combobox,
Dialog, Toast — each with a `.d.ts` props contract and a `.prompt.md` usage
doc. Layout primitives and the larger families (charts, calendar, kanban, file
drop, comment threads, print views) are specified but not yet built.

```bash
npm install github:getpunchdrunk/pd-modules#ui-v0.1.0
```

```jsx
import { Button, Card, Table } from "@punch-drunk/ui";
```
