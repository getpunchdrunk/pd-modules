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

> **⚠️ PARTIALLY SUPERSEDED (2026-08-29).** The 2026-08-29 sidebar/IA session ruled on
> four things these notes left open or unstated: the **export/import bundle contract**
> (pd-dashboard **D034**), **PDF rendering via headless-Chromium print** (**D038**),
> **no CRDT / collaborative state in v1** (**D028**), and the **schema ↔
> markdown-serializer parity test** (**D028**). Those four are settled and are marked
> below as decisions, not proposals. Everything else in this file remains the original
> pre-spec proposal. Canonical text:
> `pd-dashboard/docs/session-notes-2026-08-29-sidebar-ia.md`.

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

**The parity test is a hard requirement (DECIDED — D028).** The projector must be
covered by a **schema ↔ markdown-serializer parity test**: every node type the schema
admits has to have a serializer branch, and the test fails when one does not. This is
Scratchpad's existing schema-parity test pattern, repurposed. The reason it is not
optional: the derived-markdown column is what agents and cross-app readers actually
consume, so a node type that the schema accepts and the serializer silently ignores
produces a document that *looks* complete on screen and is quietly lossy everywhere
else. A silent drop is worse than a build failure, so the test converts it into one.

Scratchpad's `doc-markdown.ts` (527 lines, plus 446 lines of tests) is the identified
lift target for the projector itself.

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

## Collaborative state: none in v1 (DECIDED — D028)

**The module carries no CRDT / collaborative state in v1.** Documents are
**single-author-at-a-time**, and the intrinsic **version counter** is the whole
concurrency story.

This closes the question the estate inventory raised as CF-10(b) — Scratchpad's
`ydoc_state` bytea, where authority moves to the CRDT the moment a doc goes
collaborative, versus a read contract that models none of that. The resolution is that
the two do not have to agree, because they are becoming different products:
**Scratchpad persists as its own product** (later Blinkshare), and **real-time
co-editing is a feature of that product**, not of this primitive. No Scratchpad data
migrates into a consumer of this module.

If a consumer app ever needs live co-editing, that is a **later contract extension**
decided on its own merits — not a shape v1 should carry speculatively.

Explicitly **not** lifted from Scratchpad, for the same reason: `ydoc_state`, the
collab service, the items tree, and Scratchpad's visibility/password system.

## Export and import (DECIDED — D034)

Both directions belong to the module, so every consumer app inherits them rather than
reinventing them.

**Export is a bundle**, not a file: **canonical JSON + derived markdown + the referenced
attachments.** The division of labour between the two text formats is fixed:

- **Markdown is the portability format** — what another system, or an agent, reads.
- **PDF is the presentation format** — what a human is handed.

Both ship from the module's export surface. **PDF export is first-class for tabular
data too**, not only prose, in any host that has a second tabular primitive (in the
dashboard's case, a Grid exports CSV *and* PDF).

**Import is the exact inverse of export:** HTML / Markdown / docx in → canonical JSON +
extracted attachments out. TipTap's `generateJSON` handles the tree; `mammoth` handles
docx; **attachment extraction mirrors the blob-reference rule** — an imported image
becomes a stored blob and a reference, never inline data smuggled into the tree.

**Imported content always lands as a DRAFT for human review. Nothing auto-publishes.**
That is a module-level guarantee, not a host-app courtesy: an importer that publishes is
an importer that launders unreviewed content into a system of record.

Format connectors (Notion / Google / Basecamp APIs) are **host-app territory and
deferred**. The module's job stops at the file-and-tree boundary.

## PDF rendering: headless-Chromium print (DECIDED — D038)

High-fidelity PDF renders by **printing the same React components and design tokens the
app already uses**, in headless Chromium. This is not aspirational — it is proven in
production by another app in the estate (Playwright plus a font-sync step).

The split of responsibility matters, because it is what keeps the apps independent:

- **The module owns the print-view components and the print CSS.** That is the shared
  piece, and it lives here alongside the schema and the projector.
- **Each consuming app runs its own Playwright route.** There is deliberately **no
  shared render service** — a single render service is a single point of failure across
  every app, and app independence outranks deduplication here. Consolidating later is a
  cost optimization, available if it is ever worth it, and not a design goal.

The structural payoff is the reason to do it this way rather than with a PDF-drawing
library: **any node type added to the doc schema renders in PDF the day it renders on
screen, by construction.** There is no second renderer to keep in sync, so there is no
second renderer to fall behind. (Contrast a `pdfkit` + `html2canvas`-style path, which
is a separate implementation of the same document and drifts by default. An app already
on that path may adopt this standard when its PDFs need the fidelity; it is not a
mandate to rewrite working output.)

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
  *(Sharpened by D028: the concrete question is whether Scratchpad's `shared/doc-schema`
  plus its editor composition survives the ship-source contract.)*
- How much of the Scratchpad editor can be lifted directly vs. needs reworking to be
  app-agnostic?
- Storage-adapter interface: how thin can the module keep the DB/blob contract while
  still guaranteeing the markdown-always-in-sync invariant?
- Versioning: is the intrinsic version counter enough, or do we need real document
  history/snapshots at the module level? *(Narrowed, not closed. The counter is enough
  for concurrency now that v1 is single-author-at-a-time — D028. Separately, the first
  consumer is specifying host-side snapshot rows plus soft delete with a Trash and a
  timed purge (pd-dashboard D039); the open part is whether that lifecycle is
  host-owned forever or eventually belongs in the module once a second consumer wants
  the same behaviour.)*
- Should CrewSheet adopt this on rebuild even though it has no obvious document surface
  today, purely for consistency? (Raised, unresolved.)

## Related

- Scope `docs/internal-documents-notes.md` — the first concrete consumer's view.
- Scratchpad editor — existing TipTap implementation with image-grid/caption nodes; the
  proof the rich features work.
- Scope↔CrewSheet coexistence track — where shared project identity is being worked out.
