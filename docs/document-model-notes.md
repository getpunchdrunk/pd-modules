# Document model — design notes (pre-spec)

Notes from a 2026-08-21 discussion. **Not a plan and not yet built.** This describes a
proposed second package for this repo — a shared document primitive — so the idea is
parked and findable when we spec it properly.

> **⚠️ This repo predates most of the current app work.** These notes were written long
> after the repo last saw real activity. Treat anything below as a starting proposal to
> be reconciled against how the consuming apps (CrewSheet, Scope, the future Projects app)
> actually look today, not as settled fact. Verify current reality before acting on it.

> **⚠️ This repo is public.** Nothing here references client names, internal business
> logic, or anything Punch Drunk-specific by design — the whole point of the primitive is
> that it knows nothing about any one app.

## The problem

Several PD apps need the same thing: rich, editable documents that a human writes and an
agent can read. Meeting notes, project overviews, generated summaries. Today each app
would invent its own document handling, and the same documents will need to be *visible*
across apps (Scope, CrewSheet, Projects, plus an aggregating dashboard). Inventing the
model three times guarantees three incompatible forks.

So: define the document primitive **once**, here, and have every app consume it. The app
supplies context; the module supplies the document.

## Core architecture

**Source of truth is a structured content tree (TipTap / ProseMirror JSON), not
markdown, not HTML.** The editor already stores content as a JSON document tree; that
tree is the canonical document.

**Markdown is a derived projection of that tree** — the portable, agent-readable,
cross-app view. It is regenerated from the JSON on every save, never hand-edited, never
the source of truth. Rich structure (bold, lists, tables) survives markdown faithfully;
complex visual layout (multi-column image grids) flattens to a faithful *reading order*
with layout lost. That tradeoff is acceptable: agents want content, not art direction.

**Images (and other embeds) are references, not inline data.** An embed in the JSON tree
points at a stored blob by ID. In the markdown projection it renders as a plain image
link with alt/caption text — so a reader (human or agent) sees "image: stage plan, FOH
position", never a wall of base64.

### Storage shape (proposed)

Conceptually a rich document with five images is "seven files" (one JSON tree, one
markdown, five images). In practice that is **not** loose files on disk. It is:

- **One document row** in the host app's Postgres: the JSON tree + a derived markdown
  column regenerated on every save (so markdown is always in sync — no stale sidecar
  anyone can forget to rebuild).
- **The images as blobs** in object storage.
- **A join/link table** connecting document → its embedded assets.

The module defines the *schema and the projector*; each host app owns the actual tables
and blob storage (see packaging, below).

## Rich-document features (all survive the model)

The editor supports what the Scratchpad editor already does — this is not new ground,
the node types exist:

- Text formatting: bold, italic, lists, headings, etc.
- **Image grids**: images laid out in up to ~3–4 columns × multiple rows, each with a
  caption. This is the richest feature and is just a custom TipTap node in the JSON tree.

In the markdown projection, a grid flattens to a sequential list of images with captions
as text. Reading order preserved, columns lost.

## Metadata: intrinsic vs. host-owned

The split that keeps the module reusable:

**Intrinsic (lives in the module's schema — universal, painful to retrofit):**
- created / modified timestamps
- author, with a **human-vs-agent** distinction
- **provenance** — for generated docs, and (see sharing) the origin app
- a version counter

**Host-owned (the module does *not* define these):**
- tags and any domain-flavoured taxonomy ("vendor", "phase", doc "kind")
- anything app-specific

**Escape hatch:** a free-form metadata field on the document row that the host app owns.
Lets an app add what it needs later without a module change.

## Authored vs. generated documents

One presentation layer, two lifecycle behaviours:

- **Authored** — human-written; permanent once declared.
- **Generated** — system-produced; carries its **regeneration inputs**, and is safe to
  rebuild or discard.

Both read identically and are both agent-readable. The provenance flag is what
distinguishes them in the UI. (The honesty rule — a generated doc should surface what it
was derived from — is a *host-app* policy, but the module must carry the provenance +
derivation-input fields that make it possible.)

## Cross-app sharing: reference, don't copy

The hard part is a boundary question. Resolution from the discussion:

- Each app **owns** its own documents.
- Apps **reference**, never **import**. A reference is a pointer (origin app + document
  ID), fetched and rendered **read-only**, with the origin app shown in the UI and a
  one-click jump back to the owning app to edit.
- Import means two copies that drift; a reference means exactly one version of the
  document, however many apps display it.
- An aggregating dashboard is just another consumer of read-only references.

This needs two things the module should define:
1. **provenance carries origin app** (slots in next to human-vs-agent naturally).
2. **a thin read contract** — an app exposes its docs to others as
   `{ id, kind, title, markdown, metadata }` over a read-only API. No shared database,
   no write conflicts.

It also needs one thing the module *cannot* provide: **a shared project identity all
apps agree on.** Today an app's project is known only to that app. That contract has to
exist (it's being worked out separately for Scope↔CrewSheet) before references resolve.

## Packaging proposal (`@punch-drunk/documents`)

**Marked as a proposal for approval, not a decision.**

The existing `@punch-drunk/auth` is server-only Express middleware. A document model is a
different animal — it spans **browser-side** code (the editor components, the TipTap node
definitions) and **server-side** code (the schema, the markdown projector, the read
contract). A server that only needs to project markdown must not be forced to drag React
in.

So the proposal is subpath exports within a single package, cleanly split by environment:

```
@punch-drunk/documents
  /schema     — the document JSON schema, node type definitions, TypeScript types
                (isomorphic, no React, no DB)
  /markdown   — JSON-tree → markdown projector (server-safe, no React)
  /editor     — the TipTap editor + custom nodes (image grid, captions) — browser/React
  /server     — read-contract helpers, storage adapter interfaces
                (host supplies the actual Postgres/blob implementation)
```

A markdown-only server imports `/schema` + `/markdown` and never touches React. The app
running the editor imports `/editor`.

**This must follow the repo's existing contracts** (see root `CLAUDE.md`):
- Ships TypeScript source, **no build step** (`main`/`types` → `src`), compiled by the
  consuming app — *unless* the editor's browser bundling forces a build, which is an open
  question to resolve before committing to the no-build contract for this package.
- Installed from GitHub **by git tag**, semver.
- **No secrets, ever** — trivially satisfied, there are none here.
- Once two apps depend on it, a schema change is a **coordinated upgrade across all
  consumers**, not a casual commit (same blast-radius discipline as the auth package).

## Open questions

- Does the editor bundle force a build step, breaking the repo's no-build contract for
  this package? (Determines whether the subpath-export layout above is viable as-is.)
- How much of the Scratchpad editor can be lifted directly vs. needs reworking to be
  app-agnostic?
- Storage-adapter interface: how thin can the module keep the DB/blob contract while
  still guaranteeing the markdown-always-in-sync invariant?
- Versioning: is the intrinsic version counter enough, or do we need real document
  history/snapshots at the module level?
- Should CrewSheet adopt this on rebuild even though it has no obvious document surface
  today, purely for consistency? (Raised, unresolved.)

## Related

- Scope `docs/internal-documents-notes.md` — the first concrete consumer's view.
- Scratchpad editor — existing TipTap implementation with image-grid/caption nodes; the
  proof the rich features work.
- Scope↔CrewSheet coexistence track — where shared project identity is being worked out.
