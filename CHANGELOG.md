# Changelog

All notable changes to `pd-modules` packages are recorded here.

## [@punch-drunk/auth 1.1.0] — 2026-05-31

Security hardening pass. See `SECURITY_REVIEW.md` for the full review. No public
API signatures changed; all changes are backward compatible for single-instance
deployments.

### Security
- Regenerate the session ID in `POST /api/auth/exchange` before storing
  authenticated data, preventing session fixation (F1).
- Derive the OAuth callback URL from the configured `appUrl` instead of the
  client-controlled `Host` header (F3).
- Removed user emails and the session ID from log output (F6).
- Set `X-XSS-Protection` to `0` (the `1; mode=block` value is deprecated and can
  introduce issues in legacy browsers) (F7).

### Added
- `trustProxy` option (default `1`) so the Express `trust proxy` setting can be
  matched to the real deployment topology. A too-high value lets clients spoof
  `X-Forwarded-For`, which the exchange rate limiter keys on (F5).

### Fixed
- Corrected the install command in both READMEs: the org is `getpunchdrunk`, not
  `punch-drunk`.

### Known issues / deferred
- No OAuth `state` / CSRF protection on the callback (F2) — needs a coordinated
  change with the `pd-auth` server so client-supplied `state` is echoed back.
- The one-time `auth_code` is delivered in a URL query string (F4) — consider a
  fragment before any external consumer.
- `pendingAuthTokens` is in-process and won't work across multiple replicas
  (F8) — move to a shared store if a consumer scales horizontally.

## [@punch-drunk/auth 1.0.0] — 2026-02-24

- Initial release: Express middleware for PD Auth integration (auth code
  exchange pattern, Postgres-backed sessions, `requireAuth` / `requireAdmin`,
  rate-limited exchange, security headers).
