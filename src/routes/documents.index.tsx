import { createFileRoute, Link } from "@tanstack/react-router";
import { Lock, ArrowRight, ArrowLeft } from "lucide-react";
import { Logo } from "@/components/site/Logo";

const TEAL  = "#01A1B7";
const INK   = "#0F1923";
const RULE  = "#DDE3E9";
const LIFT  = "#F5F7F9";
const SLATE = "#5A6A7A";

export const Route = createFileRoute("/documents/")({
  head: () => ({ meta: [{ title: "Business Documents — Vula Internal" }] }),
  component: DocumentsPage,
});

const docs = [
  {
    to: "/documents/business-plan" as const,
    title: "Business Plan 2026",
    description: "Full business plan — executive summary, DARES™ overview, products, target market, financial projections (Years 1–3), go-to-market, and Pty Ltd registration guidance.",
    category: "Strategy",
    pages: "~20 pages",
    note: "Fill in: contact details, city, CIPC reg no once registered.",
  },
  {
    to: "/documents/client-contract" as const,
    title: "Client Agreement & NDA",
    description: "Services agreement and mutual non-disclosure agreement. Covers scope, fees, payment, confidentiality, IP ownership, liability, and termination.",
    category: "Legal",
    pages: "~10 pages",
    note: "Have a South African attorney review before first use.",
  },
  {
    to: "/documents/proposal-template" as const,
    title: "Proposal Template",
    description: "Post-Compass proposal template. Structured sections for client context, proposed engagement, investment table, timeline, and acceptance block.",
    category: "Sales",
    pages: "~8 pages",
    note: "Use a fresh copy per client — fill in all [bracket] fields.",
  },
  {
    to: "/documents/scope-of-work" as const,
    title: "Scope of Work Template",
    description: "Defines deliverables, milestones, responsibilities, out-of-scope items, payment schedule, and change request process for each delivery project.",
    category: "Legal",
    pages: "~7 pages",
    note: "Attach to the Client Agreement for every delivery engagement.",
  },
  {
    to: "/documents/invoice-template" as const,
    title: "Invoice Template",
    description: "Branded tax invoice with line items, VAT field, total summary, and banking details section. Follows SA invoicing requirements.",
    category: "Finance",
    pages: "~2 pages",
    note: "Fill in: bank name, account number, branch code, VAT number (if registered).",
  },
  {
    to: "/documents/client-welcome-pack" as const,
    title: "Client Welcome Pack",
    description: "Send this to clients before a Compass session. Covers DARES™ overview, session preparation checklist, what to expect, and post-session process.",
    category: "Client",
    pages: "~5 pages",
    note: "Personalise: client name, session date, tier, and your Vula contact details.",
  },
  {
    to: "/documents/compass-report" as const,
    title: "Compass Report",
    description: "Structured post-session report following the DARES™ framework — discovery, assessment, recommendations, roadmap, and agreed next steps.",
    category: "Delivery",
    pages: "~8 pages",
    note: "Complete and send to the client within 2–3 business days of the session.",
  },
];

const CATEGORY_STYLE: Record<string, { bg: string; color: string }> = {
  Strategy: { bg: "rgba(1,161,183,0.13)", color: TEAL },
  Legal:    { bg: "#FEF3C7", color: "#92400E" },
  Sales:    { bg: "#D1FAE5", color: "#065F46" },
  Finance:  { bg: "#EDE9FE", color: "#5B21B6" },
  Client:   { bg: "#E0F2FE", color: "#075985" },
  Delivery: { bg: "rgba(1,161,183,0.13)", color: TEAL },
};

function DocumentsPage() {
  return (
    <div style={{ background: "#E8ECF0", WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" } as React.CSSProperties} className="min-h-screen pb-12">

      {/* Top bar */}
      <div className="sticky top-16 z-30 flex items-center gap-4 border-b border-[#DDE3E9] bg-[#F5F7F9] px-6 py-2.5">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-[11.5px] font-semibold transition hover:opacity-70"
          style={{ color: TEAL }}
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Home
        </Link>
        <span style={{ color: RULE }}>/</span>
        <span className="text-[11px] tracking-[0.04em]" style={{ color: SLATE }}>
          Business Documents
        </span>
        <span className="ml-auto inline-flex items-center gap-1 text-[10.5px] font-bold uppercase tracking-[0.12em]" style={{ color: SLATE }}>
          <Lock className="h-3 w-3" />
          Internal use only
        </span>
      </div>

      {/* Document card */}
      <div
        className="mx-auto mt-7 max-w-[800px] bg-white"
        style={{ boxShadow: "0 2px 8px rgba(15,25,35,.08),0 8px 28px rgba(15,25,35,.06)" }}
      >

        {/* Header */}
        <header style={{ background: INK, WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" } as React.CSSProperties} className="relative px-11 pb-8 pt-9">
          <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: TEAL }} />

          <div className="mb-5 flex items-start justify-between gap-4">
            <Logo variant="light" size="hero" showTagline={false} />
            <div className="shrink-0 text-right text-[10.5px] leading-relaxed" style={{ color: "rgba(255,255,255,.3)" }}>
              Internal Use Only<br />Not for distribution
            </div>
          </div>

          <div
            className="mb-3.5 inline-flex items-center gap-1.5 rounded-sm border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em]"
            style={{ borderColor: "rgba(255,255,255,.2)", color: "rgba(255,255,255,.5)" }}
          >
            <Lock className="h-2.5 w-2.5" />
            Internal Use Only
          </div>

          <h1
            className="mb-2 text-[27px] font-semibold leading-[1.15] text-white"
            style={{ letterSpacing: "-0.022em" }}
          >
            Business Documents
          </h1>
          <p className="max-w-[480px] text-[13.5px]" style={{ color: "rgba(255,255,255,.54)" }}>
            All Vula working templates in one place. Open, fill in the highlighted fields, and save your own copy.
          </p>
        </header>

        {/* Body */}
        <div className="px-11 pb-11 pt-9">

          {/* About strip */}
          <div
            className="mb-7 border-l-[3px] p-4 text-[13px] leading-[1.72]"
            style={{ background: "#E6F6FA", borderColor: TEAL, color: INK }}
          >
            These are your working templates — not client-facing links. Each document contains placeholder fields marked with [brackets] or [Insert]. Use a fresh copy for each client engagement and never share the master copies directly.
          </div>

          {/* Document list */}
          <div style={{ borderTop: `1px solid ${RULE}` }}>
            {docs.map((d) => {
              const cat = CATEGORY_STYLE[d.category] ?? { bg: LIFT, color: SLATE };
              return (
                <div
                  key={d.to}
                  className="flex items-start gap-5 py-5"
                  style={{ borderBottom: `1px solid ${RULE}` }}
                >
                  {/* Text block */}
                  <div className="min-w-0 flex-1">
                    <div className="mb-1.5 flex flex-wrap items-center gap-2">
                      <span className="text-[14px] font-semibold" style={{ color: INK }}>{d.title}</span>
                      <span
                        className="rounded-full px-2.5 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.12em]"
                        style={{ background: cat.bg, color: cat.color }}
                      >
                        {d.category}
                      </span>
                      <span className="text-[11px]" style={{ color: SLATE }}>{d.pages}</span>
                    </div>
                    <p className="mb-2 text-[13px] leading-relaxed" style={{ color: SLATE }}>{d.description}</p>
                    <div
                      className="inline-block rounded border border-dashed px-2.5 py-1 text-[11.5px]"
                      style={{ borderColor: "rgba(1,161,183,0.3)", background: "rgba(1,161,183,0.05)" }}
                    >
                      <span className="font-semibold" style={{ color: TEAL }}>To do: </span>
                      <span style={{ color: INK }}>{d.note}</span>
                    </div>
                  </div>

                  {/* Open */}
                  <Link
                    to={d.to}
                    className="mt-0.5 inline-flex shrink-0 items-center gap-1.5 rounded px-4 py-2 text-[12px] font-semibold text-white transition hover:opacity-85"
                    style={{ background: TEAL }}
                  >
                    Open
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Notes */}
          <div
            className="mt-7 rounded border p-5 text-[12px] leading-relaxed"
            style={{ borderColor: RULE, background: LIFT, color: SLATE }}
          >
            <div className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.14em]" style={{ color: TEAL }}>
              About these documents
            </div>
            <ul className="space-y-1.5">
              <li>• The <strong style={{ color: INK }}>Business Plan</strong> and <strong style={{ color: INK }}>Client Contract</strong> contain placeholder fields — search for <code style={{ background: RULE, color: INK, padding: "0 3px", borderRadius: 2 }}>[Insert]</code> and <code style={{ background: RULE, color: INK, padding: "0 3px", borderRadius: 2 }}>[bracket fields]</code> to find them all.</li>
              <li>• Legal documents (Contract, NDA, SOW) should be reviewed by a South African attorney before use with clients.</li>
              <li>• Register <strong style={{ color: INK }}>Vula Solutions (Pty) Ltd</strong> at <strong style={{ color: INK }}>bizportal.gov.za</strong> (R175) before your first paid engagement.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <footer
          style={{ background: INK, WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" } as React.CSSProperties}
          className="flex items-center justify-between gap-4 px-11 py-5"
        >
          <span className="text-[11px]" style={{ color: "rgba(255,255,255,.35)" }}>
            Vula Solutions (Pty) Ltd — Confidential — Internal use only
          </span>
          <span className="text-[11px]" style={{ color: TEAL }}>
            vula.co.za
          </span>
        </footer>

      </div>
    </div>
  );
}