import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Compass as CompassIcon, MapPin, Target, FileText, Sparkles, Search, ClipboardCheck, Lightbulb, Hammer, LifeBuoy, ChevronDown, CheckCircle, BarChart2, Map, GitBranch, CheckSquare } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";
import { CTA } from "@/components/site/CTA";
import { FAQ } from "@/components/site/FAQ";

type OutcomeResult = {
  metric: string;
  label: string;
  outcome: string;
  source: string;
  product: string;
  found: string;
  fixed: string;
};

function OutcomeCard({ metric, label, outcome, source, product, found, fixed }: OutcomeResult) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="card-premium flex flex-col overflow-hidden transition-shadow duration-200"
      style={open ? { boxShadow: "0 0 0 1.5px #01A1B7" } : undefined}
    >
      <div className="flex flex-1 flex-col p-7">
        <p className="font-display text-3xl font-bold leading-none tracking-tight" style={{ color: "#01A1B7" }}>
          {metric}
        </p>
        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
        <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{outcome}</p>
        <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
          <p className="text-xs text-muted-foreground">{source}</p>
          <span
            className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white"
            style={{ backgroundColor: "#01A1B7" }}
          >
            {product}
          </span>
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="mt-4 flex w-full items-center justify-between rounded-lg border border-border px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground transition hover:border-electric/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric"
        >
          <span>{open ? "Hide details" : "How we did it"}</span>
          <ChevronDown
            className="h-4 w-4 flex-shrink-0 transition-transform duration-300"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        </button>
      </div>
      <div className="grid transition-all duration-300 ease-in-out" style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
        <div className="overflow-hidden">
          <div className="space-y-5 border-t border-border bg-secondary/50 px-7 py-6">
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">What we found</p>
              <p className="text-sm leading-relaxed text-foreground">{found}</p>
            </div>
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: "#01A1B7" }}>How we fixed it</p>
              <p className="text-sm leading-relaxed text-foreground">{fixed}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CompassOutcomes() {
  const results: OutcomeResult[] = [
    {
      metric: "11 hrs",
      label: "saved every week",
      outcome: "A 4-person accounting practice eliminated eleven hours of weekly admin after automating client onboarding, deadline reminders and monthly reporting.",
      source: "Professional Services · Gauteng",
      product: "Flow™",
      found: "Client onboarding required six or more email exchanges to collect information and set up files. Monthly reporting was compiled by hand from three separate systems. No automated reminders existed, leading to missed deadlines and reactive chasing.",
      fixed: "Automated the onboarding process with a branded intake form that triggered folder creation, task assignments and welcome communication. Monthly reports were connected directly to source data, cutting compilation time from three hours to under twenty minutes.",
    },
    {
      metric: "3 weeks",
      label: "to first inbound lead",
      outcome: "A specialist engineering consultancy received their first unsolicited inbound enquiry three weeks after launch — after seven years of relying entirely on referrals.",
      source: "Engineering · Johannesburg",
      product: "Launch™",
      found: "The existing website was eight years old, had no mobile layout, and wasn't being indexed on Google. There was no Google Business Profile and no clear contact pathway beyond a generic email address — making it nearly impossible for new clients to find or evaluate them.",
      fixed: "Built a new website with clear service positioning, a project portfolio and a direct enquiry form. Set up and fully optimised their Google Business Profile. The first inbound enquiry came through the contact form eighteen days after launch.",
    },
    {
      metric: "4 days → same day",
      label: "quote turnaround",
      outcome: "A growing construction supplier used Compass™ to surface three hidden process bottlenecks and cut their quote turnaround from four days to same-day.",
      source: "Construction & Supply · Pretoria",
      product: "Compass™",
      found: "Quotes were built manually in Excel with no template, required sign-off from the owner who was frequently on-site, and pricing required manual lookups from a printed supplier catalogue — three separate bottlenecks each adding hours to every quote.",
      fixed: "Introduced a quoting template with pre-loaded pricing tiers, established a delegated approval threshold so quotes under a set value could be approved by the operations manager, and digitised the supplier catalogue into a shared live pricing sheet. No new software was purchased.",
    },
  ];

  return (
    <Section
      eyebrow="Real results"
      title="What this looks like in practice."
      intro="Anonymised to protect our clients. Specific because vague claims don't help anyone."
      className="bg-secondary/40"
    >
      <div className="grid gap-6 md:grid-cols-3">
        {results.map((r) => (
          <OutcomeCard key={r.source} {...r} />
        ))}
      </div>
    </Section>
  );
}

export const Route = createFileRoute("/compass")({
  head: () => ({
    meta: [
      { title: "Compass™ — Find Your Direction | Vula Solutions" },
      { name: "description", content: "Compass™ is Vula Solutions' signature business discovery and strategy experience. Leave with clarity — not a quote." },
      { property: "og:title", content: "Compass™ — Find Your Direction" },
      { property: "og:description", content: "Every successful journey starts with knowing where you are." },
      { property: "og:url", content: "/compass" },
    ],
    links: [{ rel: "canonical", href: "/compass" }],
  }),
  component: CompassPage,
});

function CompassPage() {
  return (
    <>
      <PageHeader
        eyebrow="Compass™"
        title={<><span>Find Your</span> <span className="text-electric">Direction.</span></>}
        intro="Every successful journey starts with knowing where you are. Compass™ is our premium business discovery and strategy experience."
      />
      <Section>
        <div className="grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-start">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">What Compass™ is</h2>
            <p className="mt-5 text-lg text-muted-foreground">
              A focused, high-value session with a senior Vula Solutions strategist. We explore your business — what's working, what isn't, and where the real opportunities lie. It's the foundation for every engagement we take on.
            </p>
            <p className="mt-4 text-lg text-foreground">What you leave with isn't a proposal. It's a written Compass Report — a plan that's yours to keep and act on, whether you continue with us or not.</p>
          </div>
          <div className="card-premium p-8">
            <h3 className="text-lg font-semibold">Who Compass™ is for</h3>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              {[
                "Owners of small and medium businesses ready to work smarter.",
                "Teams stuck between tools, spreadsheets and manual work.",
                "Companies considering a website redesign, AI or automation.",
                "Leaders who want a plan before they commit to a project.",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-electric" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
      <Section eyebrow="What we cover" title="Problems Compass™ helps you solve." className="bg-secondary/40">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: MapPin, t: "No clear direction", b: "Cut through competing priorities and lock in what to do first." },
            { icon: Target, t: "Missing growth opportunities", b: "Surface practical ways to increase enquiries, sales and retention." },
            { icon: Sparkles, t: "Unsure about AI & automation", b: "Find the real use cases — not the hype — with meaningful ROI." },
            { icon: CompassIcon, t: "Digital presence gaps", b: "Assess your website, tools and workflows against your actual goals." },
            { icon: FileText, t: "No written roadmap", b: "Leave with a clear plan you can act on immediately — with or without us." },
            { icon: CheckCircle, t: "Not sure what to do next", b: "End the session knowing exactly what to prioritise, and why." },
          ].map(({ icon: Icon, t, b }) => (
            <div key={t} className="card-premium p-7">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-electric">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg font-semibold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{b}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section eyebrow="The experience" title="What happens during Compass™.">
        <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { n: "01", t: "Pre-session brief", b: "A short intake so we arrive prepared and focused on your business." },
            { n: "02", t: "Discovery session", b: "A structured conversation with a senior strategist — typically 90 minutes." },
            { n: "03", t: "Analysis", b: "We synthesise findings and map opportunities across your business." },
            { n: "04", t: "Compass Report", b: "A written roadmap with priorities, options and clear next steps." },
          ].map((s) => (
            <li key={s.n} className="card-premium p-7">
              <p className="font-display text-4xl text-electric">{s.n}</p>
              <h3 className="mt-4 text-lg font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.b}</p>
            </li>
          ))}
        </ol>
      </Section>
      <Section
        eyebrow="The methodology"
        title="Every Compass™ engagement follows the VULA DARES™ Framework."
        intro="Compass™ is delivered through DARES™ — our five-step methodology for turning uncertainty into clarity, and clarity into action."
        className="bg-secondary/40"
      >
        <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {[
            { icon: Search, l: "D", t: "Discover", b: "Understand the business, goals, people, challenges and opportunities." },
            { icon: ClipboardCheck, l: "A", t: "Assess", b: "Evaluate digital presence, operations, AI readiness, efficiency and risk." },
            { icon: Lightbulb, l: "R", t: "Recommend", b: "Prioritise practical actions based on impact, feasibility and business value." },
            { icon: Hammer, l: "E", t: "Execute", b: "Implement the agreed work through the right Vula solution." },
            { icon: LifeBuoy, l: "S", t: "Support", b: "Ongoing improvement, guidance and partnership after delivery." },
          ].map(({ icon: Icon, l, t, b }) => (
            <li key={t} className="card-premium p-7">
              <div className="flex items-center gap-3">
                <span className="font-display text-4xl text-electric">{l}</span>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-electric">
                  <Icon className="h-4 w-4" />
                </span>
              </div>
              <h3 className="mt-4 text-lg font-semibold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{b}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-sm text-muted-foreground">
          Compass™ covers <span className="font-medium text-foreground">Discover</span>, <span className="font-medium text-foreground">Assess</span> and <span className="font-medium text-foreground">Recommend</span>. <span className="font-medium text-foreground">Execute</span> and <span className="font-medium text-foreground">Support</span> continue through Launch™, Flow™, Accelerate™, Growth™ or Partner™.
        </p>
      </Section>
      <Section eyebrow="The deliverable" title="Inside the Compass Report.">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { icon: BarChart2, t: "Business snapshot", b: "A clear summary of where your business is today." },
            { icon: Map, t: "Opportunity map", b: "Prioritised opportunities across strategy, technology and operations." },
            { icon: GitBranch, t: "Recommended roadmap", b: "A staged plan — quick wins, mid-term projects, long-term direction." },
            { icon: CheckSquare, t: "Suggested next steps", b: "Optional pathways using Launch™, Flow™, Accelerate™, Growth™ or Partner™." },
          ].map(({ icon: Icon, t, b }) => (
            <div key={t} className="card-premium p-7">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-electric">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg font-semibold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{b}</p>
            </div>
          ))}
        </div>
      </Section>
      <CompassOutcomes />
      <Section eyebrow="Common questions" title="Compass™, answered.">
        <FAQ items={[
          { q: "Is Compass™ a sales call?", a: "No. It's a structured strategy session. You'll leave with a written report, whether or not you choose to work with us afterwards." },
          { q: "How much does Compass™ cost?", a: "Compass™ is a fixed investment, confirmed before you commit. Pricing depends on the scope of your business — reach out and we'll send you the details before you decide." },
          { q: "Can I do Compass™ remotely?", a: "Yes. Compass™ works equally well in person or online. Most sessions are conducted via video call, with clients across South Africa." },
          { q: "Who runs the session?", a: "A senior Vula Solutions strategist who has worked across websites, AI adoption, automation and SME growth." },
          { q: "How long does it take?", a: "The session itself is typically 90 minutes. The Compass Report is delivered within a week." },
          { q: "What if I'm not ready to move forward after?", a: "That's completely fine. The Compass Report is yours to keep and act on however you choose — there's no obligation to continue working with us." },
          { q: "What do I need to prepare?", a: "Very little. We'll send a short brief beforehand — the rest is a conversation." },
        ]} />
      </Section>
      <CTA
        title="Ready to start with Compass™?"
        body="Book a session and take the first step towards a clearer, smarter business."
        primary={{ to: "/contact", label: "Book Compass™" }}
        secondary={{ to: "/solutions", label: "See all solutions" }}
      />
    </>
  );
}