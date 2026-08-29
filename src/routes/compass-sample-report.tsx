import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, AlertCircle, TrendingUp, Zap, Clock } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { CTA } from "@/components/site/CTA";

const TEAL = "#01A1B7";
const INK = "#0F1923";

export const Route = createFileRoute("/compass-sample-report")({
  head: () => ({
    meta: [
      { title: "Sample Compass™ Report | Vula Solutions" },
      { name: "description", content: "See what a real Compass™ Report looks like. An anonymised example for a small South African professional services firm." },
      { property: "og:title", content: "Sample Compass™ Report" },
      { property: "og:description", content: "See what a real Compass™ Report looks like. An anonymised example for a small South African professional services firm." },
      { property: "og:url", content: "https://vulasolutions.co.za/compass/sample-report" },
    ],
    links: [{ rel: "canonical", href: "https://vulasolutions.co.za/compass/sample-report" }],
  }),
  component: SampleReport,
});

function Tag({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white"
      style={{ backgroundColor: color }}
    >
      {label}
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: TEAL }}>
      {children}
    </p>
  );
}

function SampleReport() {
  return (
    <>
      <PageHeader
        eyebrow="Sample Report"
        title="What a Compass™ Report looks like."
        intro="This is an anonymised example based on a real engagement with a small South African professional services firm. Names, figures and identifying details have been changed."
      />

      {/* Sample notice banner */}
      <div className="border-y border-amber-200 bg-amber-50 dark:border-amber-900/40 dark:bg-amber-950/30">
        <div className="container-page flex items-center gap-3 py-3 text-sm text-amber-800 dark:text-amber-300">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span><strong>Sample report, anonymised.</strong> All client details, figures and specifics have been changed to protect confidentiality.</span>
        </div>
      </div>

      <div className="container-page max-w-4xl py-14">

        {/* Cover block */}
        <div className="overflow-hidden rounded-3xl" style={{ background: INK }}>
          <div className="relative px-10 py-12 sm:px-14 sm:py-16">
            <div className="absolute inset-x-0 bottom-0 h-[3px]" style={{ background: TEAL }} />
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: TEAL }}>Compass™ Report</p>
                <h1 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">
                  Nexus Advisory Partners
                </h1>
                <p className="mt-2 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Accounting &amp; Business Advisory · Gauteng, South Africa
                </p>
              </div>
              <div className="shrink-0 rounded-xl border px-5 py-4 text-xs" style={{ borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}>
                <div className="space-y-1.5">
                  <div className="flex justify-between gap-8"><span>Employees</span><span className="font-medium text-white">8</span></div>
                  <div className="flex justify-between gap-8"><span>Founded</span><span className="font-medium text-white">2012</span></div>
                  <div className="flex justify-between gap-8"><span>Tier</span><span className="font-medium text-white">Compass™ Professional</span></div>
                  <div className="flex justify-between gap-8"><span>Session</span><span className="font-medium text-white">Half-day · Video call</span></div>
                  <div className="flex justify-between gap-8"><span>Report date</span><span className="font-medium text-white">August 2026</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 1: Business Snapshot */}
        <div className="mt-12">
          <SectionLabel>01 · Business Snapshot</SectionLabel>
          <div className="card-premium p-8">
            <p className="text-base leading-relaxed text-foreground">
              Nexus Advisory Partners is a well-established accounting and business advisory firm with a loyal client base built almost entirely through referrals. The business has operated profitably for 12 years, providing compliance services (tax returns, audits and bookkeeping) to roughly 140 active clients across Gauteng.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Revenue is stable but growth has plateaued. New client acquisition has slowed over the past three years, and the principals recognise they have been operating reactively rather than strategically. Advisory and consulting work, which commands significantly higher margins, represents less than 5% of revenue despite clear demand from the existing client base.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { label: "Revenue mix", value: "95% compliance / 5% advisory" },
                { label: "New clients (last 12 months)", value: "11, all referrals" },
                { label: "Onboarding time per client", value: "3 to 4 hours (manual)" },
              ].map(({ label, value }) => (
                <div key={label} className="rounded-xl bg-secondary/60 px-5 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{label}</p>
                  <p className="mt-1.5 text-sm font-semibold text-foreground">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 2: Key Findings */}
        <div className="mt-12">
          <SectionLabel>02 · Key Findings</SectionLabel>
          <p className="mb-6 text-sm text-muted-foreground">What we identified during the discovery session and assessment.</p>
          <div className="space-y-4">
            {[
              {
                severity: "high",
                title: "Digital presence is effectively invisible",
                detail: "The firm's website was last updated in 2018. It is not mobile-optimised, loads slowly, has no working contact form, and ranks for almost no search terms. There is no Google Business Profile, meaning the firm does not appear in local map searches, the primary way prospective clients search for accounting firms in their area.",
              },
              {
                severity: "high",
                title: "Client onboarding is entirely manual",
                detail: "Every new client relationship begins with a series of emails back and forth to collect information, set expectations, and agree on scope. This takes 3 to 4 hours of principal time per client. No templates, no intake forms, no workflow. At 11 new clients per year this is manageable, but it is a ceiling on growth.",
              },
              {
                severity: "medium",
                title: "Advisory services are undermarketed and underpriced",
                detail: "The firm has deep expertise in business advisory work that their existing clients regularly request informally. This work is currently billed reactively at ad hoc rates, not packaged or proactively offered. Advisory engagements carry 4 to 5x the margin of compliance work and are exactly what the market is willing to pay for.",
              },
              {
                severity: "medium",
                title: "Referrals are captured informally with no follow-up system",
                detail: "The principals receive regular referrals via WhatsApp and email. These are tracked in memory or a shared email inbox, with no structured follow-up process. Approximately 30% of referrals are estimated to go unconverted due to slow or inconsistent response.",
              },
              {
                severity: "low",
                title: "The team is using six disconnected tools",
                detail: "Email, Excel, WhatsApp, Word, Dropbox and the accounting platform are used with no integration between them. Information is duplicated, version control is unreliable, and institutional knowledge lives in individual inboxes rather than a shared system.",
              },
            ].map(({ severity, title, detail }) => (
              <div key={title} className="card-premium flex gap-5 p-7">
                <div className="mt-0.5 shrink-0">
                  {severity === "high" && <div className="h-2.5 w-2.5 rounded-full bg-red-500" />}
                  {severity === "medium" && <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />}
                  {severity === "low" && <div className="h-2.5 w-2.5 rounded-full bg-blue-400" />}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-sm font-semibold text-foreground">{title}</h3>
                    <Tag
                      label={severity === "high" ? "Priority" : severity === "medium" ? "Important" : "Noted"}
                      color={severity === "high" ? "#ef4444" : severity === "medium" ? "#f59e0b" : "#60a5fa"}
                    />
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Opportunity Map */}
        <div className="mt-12">
          <SectionLabel>03 · Opportunity Map</SectionLabel>
          <p className="mb-6 text-sm text-muted-foreground">Prioritised by impact and effort. Highest-value opportunities first.</p>
          <div className="space-y-3">
            {[
              { icon: Zap, effort: "Low effort", impact: "High impact", title: "Google Business Profile", desc: "Free to set up. Puts the firm on the map, literally, for local searches. Most accounting clients search 'accountant near me' or 'accounting firm Johannesburg'. Currently invisible for all of these." },
              { icon: Zap, effort: "Low effort", impact: "High impact", title: "Structured client intake process", desc: "A simple intake form and email template sequence can reduce onboarding time from around 4 hours to under 45 minutes. Immediate time saving; better first impression for new clients." },
              { icon: TrendingUp, effort: "Medium effort", impact: "Very high impact", title: "New website with clear service pages", desc: "A professional site with a working contact form, clear service descriptions and basic local SEO. The single biggest lever for new client acquisition outside referrals." },
              { icon: TrendingUp, effort: "Medium effort", impact: "High impact", title: "Repackaged advisory offering", desc: "Define two or three advisory packages with clear scope and fixed pricing. Offer proactively to the existing 140-client base. Conservative estimate: 15 to 20% uptake at 4x the margin of compliance work." },
              { icon: TrendingUp, effort: "Medium effort", impact: "Medium impact", title: "Referral follow-up workflow", desc: "A simple CRM or structured inbox process to ensure every referral gets a response within 4 hours and a follow-up within 48 hours. Estimated 30% improvement in conversion." },
              { icon: Clock, effort: "Higher effort", impact: "High impact", title: "AI-assisted proposals and compliance notes", desc: "Use AI tools to draft client proposals, summarise meetings and generate first-draft compliance summaries. Estimated 5 to 7 hours saved per week per senior staff member." },
            ].map(({ icon: Icon, effort, impact, title, desc }) => (
              <div key={title} className="card-premium flex items-start gap-5 p-6">
                <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary text-electric">
                  <Icon className="h-4 w-4" />
                </span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-semibold text-foreground">{title}</h3>
                    <span className="rounded-full border border-border px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">{effort}</span>
                    <span className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white" style={{ background: TEAL }}>{impact}</span>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Recommended Roadmap */}
        <div className="mt-12">
          <SectionLabel>04 · Recommended Roadmap</SectionLabel>
          <p className="mb-6 text-sm text-muted-foreground">A phased plan that builds on each stage without overwhelming the team.</p>
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              {
                phase: "Phase 1",
                timeline: "Months 1 to 2",
                title: "Foundation",
                color: TEAL,
                items: [
                  "Set up Google Business Profile",
                  "Build new website with service pages and contact form",
                  "Create client intake form and onboarding email sequence",
                  "Define and price two advisory packages",
                ],
              },
              {
                phase: "Phase 2",
                timeline: "Months 2 to 6",
                title: "Systems",
                color: "#6366f1",
                items: [
                  "CRM setup for referral and lead tracking",
                  "Automate the onboarding workflow end-to-end",
                  "Email campaign to existing clients for advisory offer",
                  "Google Business Profile review campaign",
                ],
              },
              {
                phase: "Phase 3",
                timeline: "Months 6 to 18",
                title: "Growth",
                color: "#0ea5e9",
                items: [
                  "AI tools for proposals, meeting notes and compliance drafts",
                  "LinkedIn content presence for the principals",
                  "SEO and content to rank for advisory-related searches",
                  "Ongoing strategic partnership and quarterly review",
                ],
              },
            ].map(({ phase, timeline, title, color, items }) => (
              <div key={phase} className="card-premium overflow-hidden p-0">
                <div className="px-6 py-5" style={{ background: color }}>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/70">{phase} · {timeline}</p>
                  <h3 className="mt-1 text-base font-semibold text-white">{title}</h3>
                </div>
                <ul className="space-y-3 p-6">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-xs leading-relaxed text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-electric" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Suggested Next Steps */}
        <div className="mt-12">
          <SectionLabel>05 · Suggested Next Steps</SectionLabel>
          <p className="mb-6 text-sm text-muted-foreground">Based on the findings above, the recommended starting point for Nexus Advisory Partners.</p>
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              {
                priority: "Priority 1",
                product: "Launch™",
                title: "New website and digital foundation",
                timeline: "4 to 6 weeks",
                desc: "A professionally built website with clear service pages, SEO basics and a working contact form. This is the single highest-leverage action for new client acquisition.",
              },
              {
                priority: "Priority 2",
                product: "Flow™",
                title: "Client onboarding automation",
                timeline: "2 to 3 weeks (after Launch™)",
                desc: "A structured intake form, automated email sequence and CRM setup to halve onboarding time and ensure no referral falls through.",
              },
            ].map(({ priority, product, title, timeline, desc }) => (
              <div key={priority} className="card-premium p-7">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-muted-foreground">{priority}</p>
                  <Tag label={product} color={TEAL} />
                </div>
                <h3 className="mt-3 text-base font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5 text-electric" />
                  Estimated: {timeline}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Closing note */}
        <div className="mt-10 rounded-2xl border border-border bg-secondary/40 px-7 py-6 text-sm leading-relaxed text-muted-foreground">
          <strong className="font-semibold text-foreground">Note to client:</strong> This report is yours to keep and act on however you choose. There is no obligation to continue working with Vula Solutions. If you do choose to move forward, we will agree on scope, timeline and pricing before any work begins.
        </div>

        {/* Back to Compass link */}
        <div className="mt-8">
          <Link to="/compass" className="inline-flex items-center gap-2 text-sm font-medium text-electric hover:underline">
            Back to Compass™
          </Link>
        </div>

      </div>

      <CTA
        title="Ready for your own Compass™?"
        body="Every report is built around your specific business. Book a session and leave with a plan that's yours to keep."
        primary={{ to: "/contact", label: "Book Compass™" }}
        secondary={{ to: "/pricing", label: "See pricing" }}
      />
    </>
  );
}
