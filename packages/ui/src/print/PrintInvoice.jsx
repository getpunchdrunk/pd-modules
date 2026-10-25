import { PrintDocHeader } from "./PrintDocHeader.jsx";
import { PrintPartyBlock } from "./PrintPartyBlock.jsx";
import { PrintLineTable } from "./PrintLineTable.jsx";
import { PrintTotals } from "./PrintTotals.jsx";
import { PrintNote } from "./PrintNote.jsx";
import { PrintFooter } from "./PrintFooter.jsx";

/**
 * A whole invoice: letterhead, bill-to, hero amount, line items, totals,
 * notes and terms. Composes the six print parts so an app never re-lays out
 * an invoice by hand — it hands over data and gets a document that paginates.
 *
 * Multi-page is the normal case. The table head repeats, rows never split,
 * and the totals band is kept whole; nothing here tries to squeeze onto one
 * sheet. Screen presentation (fluid paper, stacked line items, a pay button)
 * lives in the page that mounts this, not in the component.
 */
export function PrintInvoice({
  invoiceNumber,
  org = "Punch Drunk Productions, LLC",
  orgLines = [],
  client,
  meta = [],
  amountDue,
  items = [],
  adjustments = [],
  total,
  payments = [],
  notes,
  terms,
  remittance,
  page
}) {
  const money = (v) => v;

  return (
    <div data-print-doc style={{ fontFamily: "var(--font-sans)", color: "var(--print-ink)" }}>
      <PrintDocHeader
        org={org}
        orgLines={orgLines}
        docType="Invoice"
        docNumber={invoiceNumber}
        meta={meta}
      />

      <div data-print-keep style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 32, alignItems: "center", margin: "18px 0" }}>
        <PrintPartyBlock label="Billed to" name={client?.name} attn={client?.attn} lines={client?.lines} />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2 }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 9, fontWeight: 600, letterSpacing: "var(--tracking-eyebrow)", textTransform: "uppercase", color: "var(--print-ink-faint)" }}>
            Amount due (USD)
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontVariantNumeric: "tabular-nums", fontSize: 30, fontWeight: 600, letterSpacing: "var(--tracking-heading-sm)", lineHeight: 1.05, color: "var(--print-ink)" }}>
            {money(amountDue)}
          </span>
        </div>
      </div>

      <PrintLineTable
        columns={[
          { label: "Description", width: "65%" },
          { label: "Rate", align: "right", width: "14%", mono: true },
          { label: "Qty", align: "right", width: "7%", mono: true },
          { label: "Line total", align: "right", width: "14%", mono: true }
        ]}
        rows={items.map((i) => ({
          cells: [
            <span key="d" style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <span style={{ fontWeight: 600 }}>{i.name}</span>
              {i.subtitle && (
                <span style={{ fontSize: 8.5, fontWeight: 600, letterSpacing: "var(--tracking-eyebrow)", textTransform: "uppercase", color: "var(--print-ink-soft)" }}>
                  {i.subtitle}
                </span>
              )}
              {i.scope && (
                <span style={{ fontSize: 10, fontWeight: 400, lineHeight: "var(--leading-snug)", color: "var(--print-ink-faint)", textWrap: "pretty" }}>
                  {i.scope}
                </span>
              )}
            </span>,
            i.rate,
            i.qty,
            i.amount
          ]
        }))}
      />

      <div style={{ marginTop: 16 }}>
        <PrintTotals
          rows={[...adjustments, ...(total ? [{ label: total.label || "Total", value: total.value }] : []), ...payments]}
          total={{ label: "Amount due (USD)", value: amountDue }}
          note={notes}
        />
      </div>

      {terms && <div style={{ marginTop: 14 }}><PrintNote title="Terms">{terms}</PrintNote></div>}
      {remittance && <div style={{ marginTop: 10 }}><PrintNote title="Remittance">{remittance}</PrintNote></div>}

      <PrintFooter left={`${org} \u00B7 Invoice ${invoiceNumber}`} right={page} />
    </div>
  );
}
