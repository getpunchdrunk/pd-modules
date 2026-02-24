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
npm install github:punch-drunk/pd-modules#v1.0.0
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
