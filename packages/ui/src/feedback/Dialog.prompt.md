Use `Dialog` for the writes that must not happen by accident: approving money, expiring a client's download link, nudging a client, publishing an announcement.

```jsx
<Dialog
  title="Approve $14,180 to Cine Rentals NW"
  description="Exceeds PO 2619 by 12.5%. Approving updates the PO and closes the invoice in Scope."
  confirmLabel="Approve" onConfirm={approve} onCancel={close} busy={saving} />
```

**When a dialog is required vs. an undo toast:** reversible, low-stakes actions (close a task, adjust dates, reassign) fire optimistically and offer `Toast` with undo. Money, client-facing, and irreversible actions confirm first. That split is the rule — don't confirm everything, or people stop reading confirmations.

- **The title states the consequence with the number in it.** "Approve $14,180 to Cine Rentals NW", not "Are you sure?".
- The description carries the facts that change the decision — variance, counterparty, what updates in which app.
- `busy` matters for cross-app writes: the request can fail after the click, so keep the dialog open and disabled until the write confirms, then report failure in place rather than in a toast that may already be gone.
- `tone="danger"` is a light pink surface with dark pink text, never solid red — solid pink means "the main action", so destructive must not outrank it.
