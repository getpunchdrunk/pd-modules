# Org membership — house convention

**Status:** binding estate-wide convention, ruled 2026-08-29. Source decision:
pd-dashboard `docs/DECISIONS.md` **D041**; canonical session text in
`pd-dashboard/docs/session-notes-2026-08-29-sidebar-ia.md`.

> **⚠️ This repo is public.** This document describes a schema *shape* only. It carries
> no credentials, no tenant data, and nothing business-specific — the same rule the
> document-model notes follow.

> **This supersedes the Clerk Organizations plan** wherever an app still assumes it.
> Apps that already shipped on Clerk Organizations (EngageStreaming) are a known
> exception to reconcile, not a counter-example to follow.

## The rule

**Clerk provides identity only.** Authentication, sessions, and MFA — nothing else.

**Organization membership, roles, and all authorization live in each app's own
Postgres**, in `orgs` and `org_memberships` tables that the app owns outright.

No app delegates an authorization question to Clerk. If the answer to "may this person
do this thing" comes from anywhere other than the app's own database, the app is off
the convention.

## Why

**Cost is the proximate reason.** Clerk Organizations is free to 100 organizations and
then steps to roughly $100/month. Any app that models **client companies as
organizations** crosses 100 quickly and permanently — the estate has more clients than
that in its history, and the count only grows. The cliff arrives exactly when the
product is working, which is the worst possible time to discover a pricing model.

**Independence is the durable reason.** Every PD app must be able to function alone —
the standalone constraint that survived the Scope/Dashboard merge review. An app whose
membership graph lives in a vendor's database cannot be spun out, cannot be tested
without network, and cannot answer an authorization question during a vendor outage.
Identity is a reasonable thing to buy (the same reasoning that buys auth at all, and
that buys payments from Stripe). The membership graph is not — it is the app's own
domain model wearing someone else's schema.

**Uniformity is the practical reason.** Scope, CrewSheet, the dashboard, and the future
client portal all need the same shape. Three apps inventing it separately guarantees
three incompatible forks, exactly as with the document model.

## Suggested schema shape

Indicative names and columns. Each app owns its own tables; what is binding is the
**shape**, not the spelling.

### `orgs`

| Column | Notes |
|---|---|
| `id` | **Client-generatable UUID**, minted in app code. Never a serial integer. |
| `name` | Display name. |
| `kind` | Text + check constraint, e.g. `staff` / `client` / `vendor`. Apps that only ever have one org still carry the column. |
| `created_at`, `updated_at` | `updated_at` is app-maintained. |
| `deleted_at` | Nullable. Soft delete — a tombstone, never a hard row removal. |

### `org_memberships`

| Column | Notes |
|---|---|
| `id` | Client-generatable UUID. |
| `org_id` | → `orgs.id`. |
| `user_id` | → the app's **local** `users` row, never a Clerk ID directly. |
| `role` | Text + check constraint. The role vocabulary is per-app; the column is not. |
| `status` | Text + check constraint, e.g. `active` / `inactive`. Revoking membership is what actually kills access. |
| `invited_by`, `invited_at`, `joined_at` | Provenance for an invite-only estate. |
| `created_at`, `updated_at`, `deleted_at` | As above. |

### `users` (the part that matters here)

The local user row is the join point between Clerk's identity and the app's
authorization.

| Column | Notes |
|---|---|
| `id` | Client-generatable UUID — the app's own identifier. |
| `clerk_user_id` | The external identity reference. Unique, nullable while an invite is outstanding. |
| `email`, display fields | Mirrored for lookup and rendering. |
| `role` | **Where an app keeps a global role, it lives here — never in Clerk metadata.** |

## Rules that follow from the shape

1. **Role never lives in Clerk metadata.** It lives in the app's `users` row (for a
   global role) or in `org_memberships.role` (for a per-org role). Clerk metadata is
   not a database and is not queryable the way authorization needs.
2. **Provisioning is invite-only.** No self-signup path exists. Admins invite by email
   through Clerk's invitation API with an initial role attached. Later crew and client
   access stays invite-shaped; bulk and token variants are a per-app detail.
3. **Offboarding revokes the membership and flips the local role to `inactive`. The
   user row is never deleted** — it anchors authorship and provenance across every
   document, record, and audit entry the person ever touched. Content they owned
   survives them.
4. **Create the first org row on day one**, even in an app that has exactly one
   organization today. Retrofitting a membership graph onto a single-tenant app after
   it ships is the expensive version of this decision.
5. **Authorization is evaluated against these tables at query time**, not filtered in
   the UI. The target shape is one where an unscoped query is structurally impossible
   (the `Omit<Insert,'orgId'>` tenancy pattern Scope already uses).

## Portable-schema conventions

These tables are synced-candidates, so they inherit the estate's five binding
portable-schema conventions (pd-dashboard D043):

1. **Client-generatable UUID primary keys**, minted in app code — never serial
   integers, never server-only defaults.
2. **`updated_at` on every table**, app-maintained.
3. **Tombstones** — soft delete (`deleted_at`), which is also the sync prerequisite.
4. **Portable column types** — jsonb / text / timestamps; no Postgres arrays, no
   exotic types; enums as text + check constraint where cheap.
5. **No business logic in triggers or stored procedures.**

## Adopters and status

| App | Status |
|---|---|
| pd-dashboard | Convention's first implementation. PD staff org row created day one, so the client-org model slots in without restructuring. |
| Scope | Already homegrown multi-tenancy (`orgs`), Clerk Organizations already ruled out on its own cost grounds. Reconcile column names against this shape at the Clerk migration. |
| CrewSheet | Multi-tenant work in progress. Adopt this shape rather than inventing a third one. |
| Client portal | Not built. Modelled on this from the start. |
| EngageStreaming | **Exception.** Ships today on Clerk Organizations with an `orgs` mirror kept fresh by webhooks. Commercial, externally-sold, and a different class of app — not evidence against the convention, but it is a real divergence to record rather than paper over. |

## Related

- `document-model-notes.md` — the other estate-wide primitive, same
  define-it-once-consume-it-everywhere posture.
- pd-dashboard `docs/DECISIONS.md` D041 (this convention), D020 (the client-org model
  it makes room for), D036 / D040 (personal spaces and the audit trail that
  break-glass depends on), D043 (the portable-schema conventions above).
