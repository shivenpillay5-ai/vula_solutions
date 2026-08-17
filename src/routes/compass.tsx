import { useState, useEffect, useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Compass as CompassIcon, MapPin, Target, FileText, Sparkles, Search, ClipboardCheck, Lightbulb, Hammer, LifeBuoy, X, CheckCircle, BarChart2, Map, GitBranch, CheckSquare } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";
import { CTA } from "@/components/site/CTA";
import { FAQ } from "@/components/site/FAQ";
import { compassOutcomes } from "@/lib/outcomes";

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
  const triggerRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    closeBtnRef.current?.focus();
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); return; }
      if (e.key === "Tab" && panelRef.current) {
        const focusable = Array.from(
          panelRef.current.querySelectorAll<HTMLElement>(
            'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => !el.hasAttribute("disabled"));
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      triggerRef.current?.focus();
    };
  }, [open]);

  return (
    <>
      <div
        ref={triggerRef}
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setOpen(true); }}
        className="group card-premium card-premium-hover flex cursor-pointer flex-col p-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric"
      >
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
        <div className="mt-4 flex w-full items-center justify-between rounded-lg border border-border px-4 py-3 text-xs font-semibold text-muted-foreground transition group-hover:border-electric/40 group-hover:text-foreground">
          <span>How we did it</span>
          <span aria-hidden className="text-base leading-none">→</span>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        >
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${metric} — ${label}`}
            className="relative w-full max-w-lg rounded-2xl border border-border bg-background p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeBtnRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:border-electric/40 hover:text-electric focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric"
            >
              <X className="h-4 w-4" />
            </button>
            <p className="font-display text-2xl font-bold leading-none" style={{ color: "#01A1B7" }}>{metric}</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
            <div className="mt-6 space-y-5">
              <div>
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">What we found</p>
                <p className="text-sm leading-relaxed text-foreground">{found}</p>
              </div>
              <div>
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: "#01A1B7" }}>How we fixed it</p>
                <p className="text-sm leading-relaxed text-foreground">{fixed}</p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
              <p className="text-xs text-muted-foreground">{source}</p>
              <span
                className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white"
                style={{ backgroundColor: "#01A1B7" }}
              >
                {product}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function CompassOutcomes() {
  const results: OutcomeResult[] = compassOutcomes.map((o) => ({
    metric: o.metric,
    label: o.metricLabel,
    outcome: o.summary,
    source: `${o.sector} · ${o.location}`,
    product: o.product,
    found: o.found,
    fixed: o.fixed,
  }));

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
      { name: "description", content: "Compass™ is Vula Solutions' signature business discovery and strategy experience. Leave with clarity, not a quote." },
      { property: "og:title", content: "Compass™ — Find Your Direction" },
      { property: "og:description", content: "Every successful journey starts with knowing where you are." },
      { property: "og:url", content: "https://vulasolutions.co.za/compass" },
    ],
    links: [{ rel: "canonical", href: "https://vulasolutions.co.za/compass" }],
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
              A focused, high-value session with a senior Vula Solutions strategist. We explore your business: what's working, what isn't, and where the real opportunities lie. It's the foundation for every engagement we take on.
            </p>
            <p className="mt-4 text-lg text-foreground">What you leave with isn't a proposal. It's a written Compass Report, a plan that's yours to keep and act on, whether you continue with us or not.</p>
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
            { icon: Sparkles, t: "Unsure about AI & automation", b: "Find the real use cases, not the hype, with meaningful ROI." },
            { icon: CompassIcon, t: "Digital presence gaps", b: "Assess your website, tools and workflows against your actual goals." },
            { icon: FileText, t: "No written roadmap", b: "Leave with a clear plan you can act on immediately, with or without us." },
            { icon: CheckCircle, t: "Not sure what to do next", b: "End the session knowing exactly what to prioritise, and why." },
          ].map(({ icon: Icon, t, b }) => (
            <div key={t} className="card-premium p-7">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-secondary text-electric">
                  <Icon className="h-4 w-4" />
                </span>
                <h3 className="text-base font-semibold">{t}</h3>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{b}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section eyebrow="The experience" title="What happens during Compass™.">
        <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { n: "01", t: "Pre-session brief", b: "A short intake so we arrive prepared and focused on your business." },
            { n: "02", t: "Discovery session", b: "A structured conversation with a senior strategist. Duration varies by tier — from around 90 minutes to a full day." },
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
        intro="Compass™ is delivered through DARES™, our five-step methodology for turning uncertainty into clarity, and clarity into action."
        className="bg-navy-deep"
        tone="dark"
      >
        <ol className="grid gap-6 md:grid-cols-6">
          {[
            { icon: Search, l: "D", t: "Discover", b: "Understand the business, goals, people, challenges and opportunities." },
            { icon: ClipboardCheck, l: "A", t: "Assess", b: "Evaluate digital presence, operations, AI readiness, efficiency and risk." },
            { icon: Lightbulb, l: "R", t: "Recommend", b: "Prioritise practical actions based on impact, feasibility and business value." },
            { icon: Hammer, l: "E", t: "Execute", b: "Implement the agreed work through the right Vula solution." },
            { icon: LifeBuoy, l: "S", t: "Support", b: "Ongoing improvement, guidance and partnership after delivery." },
          ].map(({ icon: Icon, l, t, b }, i) => (
            <li key={t} className={`card-premium p-7 md:col-span-2${i === 3 ? " md:col-start-2" : ""}`}>
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
        <p className="mt-8 text-sm text-white/60">
          Compass™ covers <span className="font-medium text-white">Discover</span>, <span className="font-medium text-white">Assess</span> and <span className="font-medium text-white">Recommend</span>. <span className="font-medium text-white">Execute</span> and <span className="font-medium text-white">Support</span> continue through Launch™, Flow™, Accelerate™, Growth™ or Partner™.
        </p>
      </Section>
      <Section eyebrow="The deliverable" title="Inside the Compass Report.">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { icon: BarChart2, t: "Business snapshot", b: "A clear summary of where your business is today." },
            { icon: Map, t: "Opportunity map", b: "Prioritised opportunities across strategy, technology and operations." },
            { icon: GitBranch, t: "Recommended roadmap", b: "A staged plan covering quick wins, mid-term projects, long-term direction." },
            { icon: CheckSquare, t: "Suggested next steps", b: "Optional pathways using Launch™, Flow™, Accelerate™, Growth™ or Partner™." },
          ].map(({ icon: Icon, t, b }) => (
            <div key={t} className="card-premium p-7">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-secondary text-electric">
                  <Icon className="h-4 w-4" />
                </span>
                <h3 className="text-base font-semibold">{t}</h3>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{b}</p>
            </div>
          ))}
        </div>
      </Section>
      <CompassOutcomes />
      <Section eyebrow="Common questions" title="Compass™, answered.">
        <FAQ items={[
          { q: "Is Compass™ a sales call?", a: "No. It's a structured strategy session. You'll leave with a written report, whether or not you choose to work with us afterwards." },
          { q: "How much does Compass™ cost?", a: "Compass™ is a fixed investment, confirmed before you commit. Pricing depends on the scope of your business. Reach out and we'll send you the details before you decide." },
          { q: "Can I do Compass™ remotely?", a: "Yes. Compass™ works equally well in person or online. Most sessions are conducted via video call, with clients across South Africa." },
          { q: "Who runs the session?", a: "A senior Vula Solutions strategist who has worked across websites, AI adoption, automation and SME growth." },
          { q: "How long does it take?", a: "It depends on the tier. Essential sessions are typically around 90 minutes, Professional sessions run roughly half a day, and Strategic engagements span a full day or more depending on scope. The Compass Report is delivered within a week." },
          { q: "What if I'm not ready to move forward after?", a: "That's completely fine. The Compass Report is yours to keep and act on however you choose. There's no obligation to continue working with us." },
          { q: "What do I need to prepare?", a: "Very little. We'll send a short brief beforehand. The rest is a conversation." },
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