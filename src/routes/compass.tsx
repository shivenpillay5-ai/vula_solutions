import { createFileRoute } from "@tanstack/react-router";
import { Compass as CompassIcon, MapPin, Target, FileText, Sparkles, Search, ClipboardCheck, Lightbulb, Hammer, LifeBuoy } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";
import { CTA } from "@/components/site/CTA";
import { FAQ } from "@/components/site/FAQ";

export const Route = createFileRoute("/compass")({
  head: () => ({
    meta: [
      { title: "Compass™ — Find Your Direction | Vula Solutions" },
      { name: "description", content: "Compass™ is Vula Solutions's signature business discovery and strategy experience. Leave with clarity — not a quote." },
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
            <p className="mt-4 text-lg text-foreground">At the end of Compass™, you don't leave with a quote. You leave with clarity.</p>
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
            { icon: MapPin, t: "Direction & priorities", b: "Cut through competing ideas and agree on what to do first." },
            { icon: Target, t: "Growth opportunities", b: "Identify practical ways to increase enquiries, sales and retention." },
            { icon: Sparkles, t: "AI & automation", b: "Find real use cases — not hype — with meaningful ROI." },
            { icon: CompassIcon, t: "Digital foundation", b: "Assess your website, tools and workflows against your goals." },
            { icon: FileText, t: "A written plan", b: "A clear roadmap you can act on, with or without us." },
            { icon: Target, t: "Confidence to move", b: "Leave knowing what to do next — and why." },
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
      <Section eyebrow="The experience" title="What happens during Compass™">
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
      <Section eyebrow="The deliverable" title="Inside the Compass Report" className="bg-secondary/40">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { t: "Business snapshot", b: "A clear summary of where your business is today." },
            { t: "Opportunity map", b: "Prioritised opportunities across strategy, technology and operations." },
            { t: "Recommended roadmap", b: "A staged plan — quick wins, mid-term projects, long-term direction." },
            { t: "Suggested next steps", b: "Optional pathways using Launch™, Flow™, Accelerate™, Growth™ or Partner™." },
          ].map((r) => (
            <div key={r.t} className="card-premium p-7">
              <h3 className="text-lg font-semibold">{r.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{r.b}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section eyebrow="Common questions" title="Compass™, answered.">
        <FAQ items={[
          { q: "Is Compass™ a sales call?", a: "No. It's a structured strategy session. You'll leave with a written report, whether or not you choose to work with us afterwards." },
          { q: "Who runs the session?", a: "A senior Vula Solutions strategist who has worked across websites, AI adoption, automation and SME growth." },
          { q: "How long does it take?", a: "The session itself is typically 90 minutes. The Compass Report is delivered within a week." },
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