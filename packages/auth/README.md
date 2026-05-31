# @punch-drunk/auth

Express middleware for [Punch Drunk Auth](https://auth.punch-drunk.com) integration.

## What This Does

Registers all auth routes and session middleware on your Express app in one function call:

- `GET /login` (or `/api/auth/login`) — redirects to PD Auth
- `GET /auth/callback` — handles the OAuth callback
- `POST /api/auth/exchange` — exchanges one-time auth code for a session (rate-limited)
- `GET /api/auth/me` — returns current authenticated user (or `{ authenticated: false }`)
- `POST /api/auth/logout` — destroys session, returns PD Auth logout URL
- `GET /logout` — destroys session, redirects to PD Auth logout

Also provides `requireAuth` and `requireAdmin` middleware for protecting your routes.

## Auth Flow

This module uses the **auth code exchange pattern** instead of the simpler session-on-redirect approach described in the [PD Auth integration guide](https://auth.punch-drunk.com/api/integration-guide). The standard pattern fails because express-session does not reliably emit `Set-Cookie` headers on redirect responses.

The exchange pattern works as follows:

1. `/auth/callback` validates the PD Auth token but does **not** set any session data
2. It generates a one-time auth code (60-second expiry) and redirects to your app with `?auth_code=...`
3. Your client-side code detects the auth code and sends `POST /api/auth/exchange`
4. The exchange endpoint sets session data and the cookie is delivered on a normal `200` response

This works reliably across all browsers, including mobile.

## Installation

```bash
npm install github:getpunchdrunk/pd-modules#v1.1.0
```

## Usage

```typescript
import express from "express";
import { registerPunchDrunkAuth, requireAuth, requireAdmin, getCurrentUser } from "@punch-drunk/auth";
import { Pool } from "pg";

const app = express();
const dbPool = new Pool({ connectionString: process.env.DATABASE_URL });

app.use(express.json());

// Register auth (must be called before your app routes)
await registerPunchDrunkAuth(app, {
  dbPool,
  sessionSecret: process.env.SESSION_SECRET!,
  pdAuthApiKey: process.env.PUNCH_DRUNK_API_KEY!,
  appUrl: "https://myapp.punch-drunk.com",
  lookupUser: async (pdUser) => {
    const user = await myDb.getUserByEmail(pdUser.email);
    if (!user) return null; // no access
    return {
      userId: user.id,
      role: user.role,
      email: user.email,
      displayName: pdUser.displayName || user.displayName,
      avatarUrl: pdUser.avatar || null,
    };
  },
});

// Protected routes
app.get("/api/projects", requireAuth, (req, res) => {
  const user = getCurrentUser(req);
  // user.userId, user.role, user.email, etc.
});

app.get("/api/admin/settings", requireAdmin, (req, res) => {
  // admin only
});
```

## Client-Side Integration

Your React app needs to detect the `auth_code` URL parameter after the OAuth redirect and exchange it for a session. Here's a minimal example:

```tsx
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const authCode = params.get("auth_code");

    if (authCode) {
      // Clean URL immediately
      window.history.replaceState({}, "", window.location.pathname);

      // Exchange auth code for session
      fetch("/api/auth/exchange", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ code: authCode }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            console.error("Auth exchange failed:", data.error);
          } else {
            setUser(data);
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      // No auth code — check existing session
      fetch("/api/auth/me", { credentials: "include" })
        .then((res) => res.json())
        .then((data) => {
          if (data.authenticated) setUser(data.user);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!user) return <a href="/login">Sign in</a>;
  return <div>Hello {user.displayName}!</div>;
}
```

**Important:** The auth code exchange must be a blocking gate — do not render authenticated UI or fire data-fetching requests until the exchange completes.

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `dbPool` | `Pool` | required | PostgreSQL connection pool |
| `sessionSecret` | `string` | required | Session cookie signing secret |
| `pdAuthApiKey` | `string` | required | PD Auth API key (`client_id`) |
| `appUrl` | `string` | required | Your app's canonical URL |
| `lookupUser` | `function` | required | Maps PD Auth user to local session data (return null = no access) |
| `onLoginUpdate` | `function` | `undefined` | Called after login to update local user record |
| `postLoginRedirect` | `string` | `"/"` | Where to redirect after callback (auth code appended) |
| `cookieName` | `string` | `"pd.sid"` | Session cookie name |
| `cookieMaxAge` | `number` | 30 days | Cookie max age in milliseconds |
| `authBaseUrl` | `string` | `"https://auth.punch-drunk.com"` | PD Auth server URL |
| `exchangeRateLimit` | `number` | `10` | Max exchange attempts per rate window |
| `exchangeRateWindow` | `number` | 15 min | Rate limit window in milliseconds |
| `sessionTableName` | `string` | `"session"` | PostgreSQL table name for sessions |
| `routeStyle` | `"simple" \| "api"` | `"api"` | Login route: `/login` or `/api/auth/login` |
| `trustProxy` | `number \| boolean \| string` | `1` | Value for Express `trust proxy`. Must match the real number of proxies in front of the app, or clients can spoof `X-Forwarded-For` (used by the rate limiter) |

## Session Data

After authentication, session data is stored under `req.session.pdAuth`:

```typescript
req.session.pdAuth = {
  userId: "...",       // your app's local user ID
  role: "admin",       // "staff", "admin", etc.
  email: "...",
  displayName: "...",
  avatarUrl: "...",
  // ...any extra fields your lookupUser returned
};
```

## Exports

| Export | Type | Description |
|--------|------|-------------|
| `registerPunchDrunkAuth` | `function` | Main setup function — call once at startup |
| `requireAuth` | middleware | Checks `req.session.pdAuth.userId`, returns 401 if missing |
| `requireAdmin` | middleware | Checks auth + `role === "admin"`, returns 403 if not |
| `getCurrentUser` | `function` | Returns `req.session.pdAuth` or `null` |
| `PdAuthUser` | type | User object from PD Auth token validation |
| `LocalUserSession` | type | What `lookupUser` should return |
| `PunchDrunkAuthOptions` | type | Options for `registerPunchDrunkAuth` |
