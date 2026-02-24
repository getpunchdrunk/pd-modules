/**
 * @punch-drunk/auth
 *
 * Express middleware for Punch Drunk Auth (auth.punch-drunk.com) integration.
 *
 * Uses the "auth code exchange" pattern: the OAuth callback generates a one-time
 * code and redirects to the app. The client exchanges the code via a POST request,
 * and the session cookie is set on the 200 JSON response. This avoids the well-known
 * issue where express-session fails to emit Set-Cookie on redirect responses.
 *
 * See: https://auth.punch-drunk.com/api/integration-guide
 */

import type { Express, Request, Response, NextFunction } from "express";
import type { Pool } from "pg";
import session from "express-session";
import pgSession from "connect-pg-simple";
import cookieSignature from "cookie-signature";
import rateLimit from "express-rate-limit";
import { randomBytes } from "crypto";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** User data returned by PD Auth after token validation */
export interface PdAuthUser {
  userId: number;
  id: number;
  email: string;
  username: string;
  name: string;
  displayName: string;
  picture: string | null;
  avatar: string | null;
}

/** What your app's lookupUser function should return (or null if user has no access) */
export interface LocalUserSession {
  userId: string;
  role: string;
  email: string;
  displayName: string;
  avatarUrl?: string | null;
  /** Any additional fields your app wants stored in the session */
  [key: string]: any;
}

export interface PunchDrunkAuthOptions {
  /** PostgreSQL connection pool */
  dbPool: Pool;

  /** Secret used to sign session cookies */
  sessionSecret: string;

  /** PD Auth API key (client_id for OAuth) */
  pdAuthApiKey: string;

  /** The canonical URL of your app (e.g., "https://myapp.punch-drunk.com") */
  appUrl: string;

  /**
   * Where to redirect after successful login (default: "/").
   * The auth code will be appended as ?auth_code=...
   */
  postLoginRedirect?: string;

  /**
   * Look up a local user by their PD Auth profile.
   * Return the session data to store, or null if the user has no access.
   */
  lookupUser: (pdUser: PdAuthUser) => Promise<LocalUserSession | null>;

  /**
   * Optional: called after successful login to update the local user record
   * with the latest PD Auth profile data.
   */
  onLoginUpdate?: (localUser: LocalUserSession, pdUser: PdAuthUser) => Promise<void>;

  /** Session cookie name (default: "pd.sid") */
  cookieName?: string;

  /** Session max age in ms (default: 30 days) */
  cookieMaxAge?: number;

  /** PD Auth base URL (default: "https://auth.punch-drunk.com") */
  authBaseUrl?: string;

  /** Rate limit: max exchange attempts per window (default: 10) */
  exchangeRateLimit?: number;

  /** Rate limit: window in ms (default: 15 minutes) */
  exchangeRateWindow?: number;

  /**
   * Session table name in PostgreSQL (default: "session").
   * The table will be created automatically if it doesn't exist.
   */
  sessionTableName?: string;

  /**
   * Route prefix for auth API routes (default: "").
   * Login route will be at `${prefix}/login` or `${prefix}/api/auth/login`.
   * Set to "" to use the default route paths.
   */
  routeStyle?: "simple" | "api";
}

// ---------------------------------------------------------------------------
// Augment express-session types
// ---------------------------------------------------------------------------

declare module "express-session" {
  interface SessionData {
    pdAuth?: LocalUserSession;
  }
}

// ---------------------------------------------------------------------------
// Main registration function
// ---------------------------------------------------------------------------

/**
 * Register Punch Drunk Auth routes and session middleware on an Express app.
 *
 * This sets up:
 * - trust proxy
 * - Security headers
 * - PostgreSQL-backed sessions
 * - GET  /login (or /api/auth/login)         — redirect to PD Auth
 * - GET  /auth/callback                       — OAuth callback
 * - POST /api/auth/exchange                   — exchange auth code for session
 * - GET  /api/auth/me                         — get current user
 * - POST /api/auth/logout                     — destroy session
 * - GET  /logout                              — destroy session + redirect to PD Auth logout
 */
export async function registerPunchDrunkAuth(
  app: Express,
  options: PunchDrunkAuthOptions
): Promise<void> {
  const {
    dbPool,
    sessionSecret,
    pdAuthApiKey,
    appUrl,
    postLoginRedirect = "/",
    lookupUser,
    onLoginUpdate,
    cookieName = "pd.sid",
    cookieMaxAge = 30 * 24 * 60 * 60 * 1000, // 30 days
    authBaseUrl = "https://auth.punch-drunk.com",
    exchangeRateLimit = 10,
    exchangeRateWindow = 15 * 60 * 1000,
    sessionTableName = "session",
    routeStyle = "api",
  } = options;

  const isProduction =
    process.env.NODE_ENV === "production" || !!process.env.REPL_ID;

  // --- Trust proxy (required for secure cookies behind Replit/Cloudflare) ---
  app.set("trust proxy", 1);

  // --- Security headers ---
  app.use((_req: Request, res: Response, next: NextFunction) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    next();
  });

  // --- Session table ---
  await dbPool.query(`
    CREATE TABLE IF NOT EXISTS "${sessionTableName}" (
      "sid" varchar NOT NULL COLLATE "default",
      "sess" json NOT NULL,
      "expire" timestamp(6) NOT NULL,
      CONSTRAINT "${sessionTableName}_pkey" PRIMARY KEY ("sid")
    ) WITH (OIDS=FALSE);
    CREATE INDEX IF NOT EXISTS "IDX_${sessionTableName}_expire"
      ON "${sessionTableName}" ("expire");
  `);

  // --- Session middleware ---
  const PgStore = pgSession(session);

  const cookieConfig: session.CookieOptions = {
    maxAge: cookieMaxAge,
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax" as const,
    path: "/",
  };

  app.use(
    session({
      store: new PgStore({
        pool: dbPool,
        tableName: sessionTableName,
      }),
      secret: sessionSecret,
      resave: false,
      saveUninitialized: false,
      name: cookieName,
      proxy: true,
      cookie: cookieConfig,
    })
  );

  // --- Rate limiter for exchange endpoint ---
  const authLimiter = rateLimit({
    windowMs: exchangeRateWindow,
    max: exchangeRateLimit,
    message: { error: "Too many auth attempts, try again later" },
    standardHeaders: true,
    legacyHeaders: false,
  });

  // --- Pending auth tokens (in-memory, 60-second TTL) ---
  const pendingAuthTokens = new Map<
    string,
    { session: LocalUserSession; expiresAt: number }
  >();

  setInterval(() => {
    const now = Date.now();
    for (const [key, val] of pendingAuthTokens) {
      if (val.expiresAt < now) pendingAuthTokens.delete(key);
    }
  }, 60_000);

  // --- Helper: set session cookie manually ---
  // express-session sometimes fails to emit Set-Cookie (especially with
  // saveUninitialized:false + resave:false). This ensures it's always sent.
  function setSessionCookie(req: Request, res: Response) {
    const signed = cookieSignature.sign(req.sessionID, sessionSecret);
    res.cookie(cookieName, "s:" + signed, {
      httpOnly: cookieConfig.httpOnly,
      secure: cookieConfig.secure,
      sameSite: cookieConfig.sameSite,
      maxAge: cookieConfig.maxAge,
      path: cookieConfig.path,
    });
  }

  // --- Route paths ---
  const loginPath = routeStyle === "simple" ? "/login" : "/api/auth/login";
  const logoutPath = "/logout";

  // --- GET /login (or /api/auth/login) ---
  app.get(loginPath, (req: Request, res: Response) => {
    // If already authenticated, skip the auth flow
    if (req.session.pdAuth?.userId) {
      return res.redirect(postLoginRedirect);
    }

    const proto = req.headers["x-forwarded-proto"] || req.protocol;
    const redirectUri = `${proto}://${req.get("host")}/auth/callback`;

    console.log(`[pd-auth] login redirect_uri: ${redirectUri}`);

    const params = new URLSearchParams({
      client_id: pdAuthApiKey,
      redirect_uri: redirectUri,
    });
    res.redirect(`${authBaseUrl}/authorize?${params}`);
  });

  // --- GET /auth/callback ---
  app.get("/auth/callback", async (req: Request, res: Response) => {
    const { token } = req.query;
    if (!token) {
      return res.redirect("/?auth_error=missing_token");
    }

    try {
      const response = await fetch(
        `${authBaseUrl}/api/apps/validate-token`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, apiKey: pdAuthApiKey }),
        }
      );

      if (!response.ok) {
        console.error("[pd-auth] token validation HTTP error:", response.status);
        return res.redirect("/?auth_error=invalid_token");
      }

      const data = await response.json();
      if (!data.valid) {
        console.error("[pd-auth] token invalid");
        return res.redirect("/?auth_error=invalid_token");
      }

      const pdUser: PdAuthUser = data.user;
      console.log(`[pd-auth] validated user: ${pdUser.email}`);

      // App-specific user lookup
      const localUser = await lookupUser(pdUser);
      if (!localUser) {
        console.log(`[pd-auth] no local user for ${pdUser.email}`);
        return res.redirect("/?auth_error=access_denied");
      }

      // Optional: update local user record
      if (onLoginUpdate) {
        try {
          await onLoginUpdate(localUser, pdUser);
        } catch (err) {
          console.error("[pd-auth] onLoginUpdate error:", err);
          // Non-fatal — continue with login
        }
      }

      // Generate one-time auth code
      const authCode = randomBytes(32).toString("hex");
      pendingAuthTokens.set(authCode, {
        session: localUser,
        expiresAt: Date.now() + 60_000,
      });

      console.log(`[pd-auth] auth code generated for ${pdUser.email}, redirecting`);
      return res.redirect(`${postLoginRedirect}?auth_code=${authCode}`);
    } catch (error) {
      console.error("[pd-auth] callback error:", error);
      return res.redirect("/?auth_error=server_error");
    }
  });

  // --- POST /api/auth/exchange ---
  app.post("/api/auth/exchange", authLimiter, (req: Request, res: Response) => {
    const { code } = req.body;
    if (!code || typeof code !== "string") {
      return res.status(400).json({ error: "Missing auth code" });
    }

    const pending = pendingAuthTokens.get(code);
    if (!pending || pending.expiresAt < Date.now()) {
      pendingAuthTokens.delete(code);
      return res.status(401).json({ error: "Invalid or expired auth code" });
    }

    pendingAuthTokens.delete(code);

    // Set session data
    req.session.pdAuth = pending.session;

    req.session.save((err) => {
      if (err) {
        console.error("[pd-auth] session save error:", err);
        return res.status(500).json({ error: "Session error" });
      }

      // Manually set cookie to guarantee delivery
      setSessionCookie(req, res);

      console.log(
        `[pd-auth] session established: userId=${pending.session.userId}, sid=${req.sessionID}`
      );

      return res.json(pending.session);
    });
  });

  // --- GET /api/auth/me ---
  app.get("/api/auth/me", (req: Request, res: Response) => {
    res.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.set("Pragma", "no-cache");
    res.set("Expires", "0");

    if (!req.session.pdAuth?.userId) {
      return res.json({ authenticated: false });
    }

    return res.json({
      authenticated: true,
      user: req.session.pdAuth,
    });
  });

  // --- POST /api/auth/logout ---
  app.post("/api/auth/logout", (req: Request, res: Response) => {
    req.session.destroy(() => {});
    res.clearCookie(cookieName, { path: "/" });
    const redirect = encodeURIComponent(appUrl);
    return res.json({
      success: true,
      redirectUrl: `${authBaseUrl}/logout?redirect_to=${redirect}`,
    });
  });

  // --- GET /logout ---
  app.get(logoutPath, (req: Request, res: Response) => {
    req.session.destroy(() => {});
    res.clearCookie(cookieName, { path: "/" });
    const redirect = encodeURIComponent(appUrl);
    return res.redirect(`${authBaseUrl}/logout?redirect_to=${redirect}`);
  });

  console.log("[pd-auth] auth routes registered");
  console.log(`[pd-auth] login: ${loginPath}`);
  console.log(`[pd-auth] callback: /auth/callback`);
  console.log(`[pd-auth] exchange: POST /api/auth/exchange`);
  console.log(`[pd-auth] me: GET /api/auth/me`);
  console.log(`[pd-auth] logout: POST /api/auth/logout, GET ${logoutPath}`);
}

// ---------------------------------------------------------------------------
// Middleware helpers
// ---------------------------------------------------------------------------

/** Middleware: require an authenticated session. Returns 401 JSON if not. */
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.session.pdAuth?.userId) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  next();
}

/** Middleware: require an admin session. Returns 401 or 403 JSON if not. */
export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.session.pdAuth?.userId) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  if (req.session.pdAuth.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
}

/**
 * Helper to get the current user's session data.
 * Returns null if not authenticated.
 */
export function getCurrentUser(req: Request): LocalUserSession | null {
  return req.session.pdAuth ?? null;
}
