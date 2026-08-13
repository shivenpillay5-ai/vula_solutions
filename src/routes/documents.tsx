import { createFileRoute } from "@tanstack/react-router";
import { FileText, Download, Lock, Briefcase, FileSignature, ClipboardList, Receipt, BookOpen, BarChart3 } from "lucide-react";

export const Route = createFileRoute("/documents")({
  head: () => ({ meta: [{ title: "Business Documents — Vula Solutions Internal" }] }),
  component: DocumentsPage,
});

const docs = [
  {
    filename: "Vula-Business-Plan-2026.docx",
    title: "Business Plan 2026",
    description: "Full business plan — executive summary, DARES™ overview, products, target market, financial projections (Years 1–3), go-to-market, and Pty Ltd registration guidance.",
    category: "Strategy",
    icon: BarChart3,
    pages: "~20 pages",
    note: "Fill in: contact details, city, CIPC reg no once registered.",
  },
  {
    filename: "Vula-Client-Contract-NDA.docx",
    title: "Client Contract & NDA",
    description: "Services agreement and mutual non-disclosure agreement. Covers scope, fees, payment, confidentiality, IP ownership, liability, and termination.",
    category: "Legal",
    icon: FileSignature,
    pages: "~10 pages",
    note: "Have a South African attorney review before first use.",
  },
  {
    filename: "Vula-Proposal-Template.docx",
    title: "Proposal Template",
    description: "Post-Compass proposal template. Structured sections for client context, proposed engagement, investment table, timeline, and acceptance block.",
    category: "Sales",
    icon: Briefcase,
    pages: "~8 pages",
    note: "Use a fresh copy per client — fill in all [bracket] fields.",
  },
  {
    filename: "Vula-Scope-of-Work-Template.docx",
    title: "Scope of Work Template",
    description: "Defines deliverables, milestones, responsibilities, out-of-scope items, payment schedule, and change request process for each delivery project.",
    category: "Legal",
    icon: ClipboardList,
    pages: "~7 pages",
    note: "Attach to the Client Contract for every delivery engagement.",
  },
  {
    filename: "Vula-Invoice-Template.docx",
    title: "Invoice Template",
    description: "Branded tax invoice with line items, VAT field, total summary, and banking details section. Follows SA invoicing requirements.",
    category: "Finance",
    icon: Receipt,
    pages: "~2 pages",
    note: "Fill in: bank name, account number, branch code, VAT number (if registered).",
  },
  {
    filename: "Vula-Client-Welcome-Pack.docx",
    title: "Client Welcome Pack",
    description: "Send this to clients before a Compass session. Covers DARES™ overview, session preparation checklist, what to expect, and post-session process.",
    category: "Client",
    icon: BookOpen,
    pages: "~5 pages",
    note: "Personalise: client name, session date, tier, and your Vula contact details.",
  },
  {
    filename: "Vula-Compass-Report-Template.docx",
    title: "Compass Report Template",
    description: "Blank Compass report structure following the DARES™ framework — discovery, assessment, recommendations, roadmap, and agreed next steps.",
    category: "Delivery",
    icon: FileText,
    pages: "~8 pages",
    note: "Your session forms auto-generate a filled version — this is the blank reference template.",
  },
];

const categoryColour: Record<string, string> = {
  Strategy: "text-electric bg-electric/10",
  Legal: "text-amber-600 bg-amber-50 dark:bg-amber-950/30 dark:text-amber-400",
  Sales: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 dark:text-emerald-400",
  Finance: "text-purple-600 bg-purple-50 dark:bg-purple-950/30 dark:text-purple-400",
  Client: "text-sky-600 bg-sky-50 dark:bg-sky-950/30 dark:text-sky-400",
  Delivery: "text-electric bg-electric/10",
};

function DocumentsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      {/* Header */}
      <div className="mb-10">
        <div className="mb-3 flex items-center gap-2">
          <Lock className="h-3.5 w-3.5 text-electric" />
          <span className="text-xs font-semibold uppercase tracking-widest text-electric">
            Internal use only
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Business Documents</h1>
        <p className="mt-3 text-muted-foreground">
          All Vula business documents in one place. Download, fill in the highlighted fields, and save your
          own copy. These are your working templates — not client-facing links.
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
        {docs.map((d) => {
          const Icon = d.icon;
          return (
            <div key={d.filename} className="card-premium flex flex-col gap-0 overflow-hidden">
              {/* Card body */}
              <div className="flex flex-1 flex-col gap-3 p-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-electric/10">
                    <Icon className="h-5 w-5 text-electric" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-base font-semibold leading-snug">{d.title}</h2>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${categoryColour[d.category] ?? "text-muted-foreground bg-muted"}`}
                      >
                        {d.category}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">{d.pages}</p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">{d.description}</p>

                {/* Note */}
                <div className="rounded-md border border-dashed border-electric/30 bg-electric/5 px-3 py-2">
                  <p className="text-xs text-electric/80">
                    <span className="font-semibold">To do: </span>
                    {d.note}
                  </p>
                </div>
              </div>

              {/* Download button */}
              <a
                href={`/documents/${d.filename}`}
                download={d.filename}
                className="flex items-center justify-center gap-2 border-t border-border bg-muted/40 px-6 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-electric hover:text-white"
              >
                <Download className="h-4 w-4" />
                Download .docx
              </a>
            </div>
          );
        })}
      </div>

      {/* Footer note */}
      <div className="mt-10 rounded-xl border border-border bg-muted/30 px-6 py-5">
        <p className="text-sm font-medium">About these documents</p>
        <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
          <li>• The <strong>Business Plan</strong> and <strong>Client Contract</strong> contain placeholder fields — search for <code className="rounded bg-muted px-1 text-xs">[Insert]</code> and <code className="rounded bg-muted px-1 text-xs">[bracket fields]</code> to find them all.</li>
          <li>• Legal documents (Contract, NDA, SOW) should be reviewed by a South African attorney before use with clients.</li>
          <li>• Register <strong>Vula Solutions (Pty) Ltd</strong> at <strong>bizportal.gov.za</strong> (R175) before your first paid engagement.</li>
          <li>• These files are stored in <code className="rounded bg-muted px-1 text-xs">public/documents/</code> — regenerate with <code className="rounded bg-muted px-1 text-xs">node scripts/generate-docs.mjs</code> if you need updates.</li>
        </ul>
      </div>
    </div>
  );
}
