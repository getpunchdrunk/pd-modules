# Security Review — @punch-drunk/auth

**Repo:** `getpunchdrunk/pd-modules` (public)
**Package reviewed:** `@punch-drunk/auth`
**Reviewed:** 2026-05-31
**Reviewed at version:** 1.0.0 — patches applied land in 1.1.0 (unreleased)
**Reviewer:** Claude (requested by Jacob)

---

## Why this review happened

`pd-modules` is public, unlike the rest of the Punch Drunk repos. The first
concern was whether anything sensitive leaked by publishing it. It did not. The
second pass was a full read of the auth code for actual vulnerabilities. The
package is not yet consumed by any app, so the patched items below were safe to
change in place without a migration.

## Secret exposure: clean

No hardcoded secrets, API keys, tokens, connection strings, or credential files
anywhere in the working tree. No `.env`, `.npmrc`, `.pem`, or `.key` files. No
high-entropy literals. History is a single commit, so nothing is buried in an
earlier revision. Every reference to `sessionSecret` and `pdAuthApiKey` is a
parameter name or a `process.env` lookup, and the README correctly instructs
integrators to source both from the environment. Nothing was exposed by making
the repo public.

## The open question from the first pass: answered

The module builds its OAuth `redirect_uri` from the inbound `Host` header, which
is client-controllable. The risk depended on whether the auth server validates
it. It does. The `pd-auth` server's `GET /authorize` looks the app up by
`client_id`, then requires the requested `redirect_uri` to exactly match the
app's registered `redirectUrl` (trailing slashes normalized) and rejects any
mismatch. A forged Host header cannot redirect a token off-domain. This drops
the finding to low / defense-in-depth — and it was still patched (see F3) since
deriving the URL from `appUrl` is strictly more reliable.

---

## Findings

Severity is relative to a small internal tool behind PD Auth, not a public
multi-tenant service.

| ID | Finding | Severity | Status |
|----|---------|----------|--------|
| F1 | No session regeneration on login (session fixation) | Medium | **Patched in 1.1.0** |
| F2 | No OAuth `state` / CSRF protection on the callback | Medium | Open — needs server coordination |
| F3 | `redirect_uri` derived from Host header | Low (server validates) | **Patched in 1.1.0** |
| F4 | One-time `auth_code` delivered in URL query string | Low–Medium | Open — needs client coordination |
| F5 | `trust proxy` hardcoded to `1` | Low | **Patched in 1.1.0** (now configurable) |
| F6 | Session ID and user emails written to logs | Low | **Patched in 1.1.0** |
| F7 | Deprecated `X-XSS-Protection: 1; mode=block` | Trivial | **Patched in 1.1.0** (set to `0`) |
| F8 | In-memory pending-token map; uncleared interval | Low (availability) | Open — by design, documented |

### F1 — Session fixation (patched)

The exchange endpoint set `req.session.pdAuth` on the *existing* session and
saved it, without regenerating the session ID at the point of authentication. An
attacker able to seed a victim's pre-auth session cookie with a known ID could
then have that same ID elevated to an authenticated session once the victim
logged in.

**Fix:** `req.session.regenerate()` is now called before authenticated data is
written, so the session ID is replaced at login and any seeded identifier is
discarded.

### F2 — No CSRF `state` on the callback (open)

The login redirect to `/authorize` sends only `client_id` and `redirect_uri`,
and `/auth/callback` validates the returned token but never binds the callback
to the browser session that initiated the flow. That leaves the door open to
login CSRF (logging a victim into an attacker-controlled identity).

This one is **not** patched because a correct fix needs both sides to cooperate
and the server currently ignores any client-supplied `state` — it generates its
own `state` internally and round-trips it, but the module never checks it. A
half-fix in the module alone would either break the flow or give false comfort.

**Recommended fix (cross-repo):**
1. `pd-auth` `/authorize` should accept a client-supplied `state` and echo it
   back unchanged (instead of, or in addition to, its own).
2. The module should generate a `state` nonce, store it in a short-lived signed
   cookie before redirecting, and require `req.query.state` to match on
   callback.

Tracked as a coordinated change between `pd-modules` and `pd-auth`.

### F3 — redirect_uri from Host header (patched)

Now derived from the configured `appUrl` (`new URL("/auth/callback", appUrl)`)
rather than `x-forwarded-proto` + `Host`. Server-side validation already made
this low-risk, but the app should never have trusted a client header it didn't
need to. Non-breaking as long as `appUrl` matches the registered callback, which
it must already.

### F4 — auth_code in the query string (open)

The one-time code is one-time and expires in 60 seconds, and the README tells
the client to strip it with `replaceState`, which limits exposure. But query
strings still land in server/proxy access logs and the `Referer` header. Moving
it to a URL fragment (`#auth_code=`) keeps it off the wire to servers and out of
`Referer`. Left open because it changes the documented client contract; worth
doing before any third party consumes the package. Low–medium.

### F5 — trust proxy hardcoded (patched)

`app.set("trust proxy", 1)` was hardcoded. If a consuming app isn't behind
exactly one proxy, clients can spoof `X-Forwarded-For`, which `express-rate-limit`
keys on, making the exchange rate limit bypassable. Real impact is low because
the codes are 256-bit and not brute-forceable, but it's a footgun. Now a
`trustProxy` option (default `1`).

### F6 — logging PII / session IDs (patched)

User emails and the full `req.sessionID` were written to `console.log`. Session
IDs in logs are a no-go in principle. Logs now reference the numeric user ID and
no longer print the session ID.

### F7 — deprecated XSS header (patched)

`X-XSS-Protection: 1; mode=block` is deprecated and can introduce issues in
legacy browsers. Set to `0` per current guidance.

### F8 — in-memory token map (open, by design)

`pendingAuthTokens` is an in-process `Map`, so the package won't work correctly
if a consuming app runs more than one replica (the callback and the exchange POST
can hit different instances). The cleanup `setInterval` is also never cleared and
won't fire reliably in serverless. Acceptable for single-instance Railway
deployments; documented here so it's a conscious choice. If any consumer
horizontally scales, move pending codes into Postgres (they're short-lived rows)
or a shared store.

---

## What was changed in 1.1.0

- F1: session regeneration before storing auth data in `POST /api/auth/exchange`
- F3: callback URL derived from `appUrl`, not the Host header
- F5: new `trustProxy` option (default `1`)
- F6: removed email and session ID from logs
- F7: `X-XSS-Protection` set to `0`
- Fixed the install command in both READMEs (`punch-drunk` -> `getpunchdrunk`)
- Bumped `@punch-drunk/auth` to 1.1.0

No public API signatures changed. `trustProxy` is additive with a default that
matches prior behavior. All changes are backward compatible for a
single-instance deployment.

## Still open / follow-ups

- **F2** (CSRF `state`) — coordinated `pd-modules` + `pd-auth` change.
- **F4** (auth_code in query) — move to fragment before external use.
- **F8** — revisit if any consumer scales beyond one instance.

## Note on the pd-auth server (out of scope here)

While confirming F3, a couple of things in the `pd-auth` server looked worth a
dedicated review (not part of this module and not changed):

- `POST /api/register` is open to anyone (rate-limited only), and registration
  logs the user straight in.
- Email verification does not appear to gate login or OAuth token issuance, so
  the email claim isn't proven before a JWT is minted for a connected app.

Impact depends entirely on whether consuming apps' `lookupUser` gates on a
pre-existing local record. Flagged for a separate `pd-auth` audit.
