import { createFileRoute, Link } from "@tanstack/react-router";
import { analytics } from "@/lib/analytics";
import { Briefcase, Landmark, HardHat, Building2, Stethoscope, Wrench, ArrowRight, Search, ClipboardCheck, Lightbulb, Hammer, LifeBuoy } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";
import { CTA } from "@/components/site/CTA";
import { FAQ } from "@/components/site/FAQ";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries | Vula Solutions" },
      { name: "description", content: "Vula Solutions adapts its playbook to the pressures, regulations and expectations of your industry, starting with Compass™." },
      { property: "og:title", content: "Industries | Vula Solutions" },
      { property: "og:description", content: "Vula Solutions adapts its playbook to the pressures, regulations and expectations of your industry, starting with Compass™." },
      { property: "og:url", content: "https://vulasolutions.co.za/industries" },
    ],
    links: [{ rel: "canonical", href: "https://vulasolutions.co.za/industries" }],
  }),
  component: Industries,
});

const dares = [
  { icon: Search,        l: "D", t: "Discover",   b: "Understand your business, your sector's pressures and what success looks like for you." },
  { icon: ClipboardCheck, l: "A", t: "Assess",     b: "Evaluate your digital presence, operations, AI readiness and efficiency gaps." },
  { icon: Lightbulb,     l: "R", t: "Recommend",  b: "Prioritise the highest-impact actions specific to your industry context." },
  { icon: Hammer,        l: "E", t: "Execute",     b: "Deliver the agreed work through the right combination of VULA solutions." },
  { icon: LifeBuoy,      l: "S", t: "Support",     b: "Stay alongside you, improving, iterating and growing with your business." },
];

const industries = [
  {
    icon: Briefcase,
    t: "Professional services",
    b: "Your expertise is often invisible online and admin eats into billable time. We build websites that convert and workflows that give your team time back.",
  },
  {
    icon: Landmark,
    t: "Financial services",
    b: "Trust is everything, and most financial services websites don't earn it fast enough. We build credible digital presences and processes that scale with regulation.",
  },
  {
    icon: HardHat,
    t: "Engineering",
    b: "Complex services are hard to communicate and project admin eats into delivery time. We simplify both: project-ready sites, automation and AI for reporting.",
  },
  {
    icon: Building2,
    t: "Construction",
    b: "Winning work depends on credibility. Keeping it depends on operational clarity. We help with both: tender-winning content and workflows that streamline site management.",
  },
  {
    icon: Stethoscope,
    t: "Healthcare",
    b: "Patient trust is non-negotiable and compliance adds complexity to every digital decision. We build trustworthy patient-facing sites and automation built with care.",
  },
  {
    icon: Wrench,
    t: "Trades & specialists",
    b: "Most competitors look the same online, and you're losing jobs you should be winning. Local SEO, fast quoting and effective websites that book work.",
  },
];

const faqs = [
  {
    q: "Do you specialise in specific industries?",
    a: "We work across several sectors and understand their specific pressures well. But VULA is not a sector-specific agency. We are a Business Transformation Partner. What makes the work effective is starting with Compass™, which gives us the context to adapt our approach to your reality.",
  },
  {
    q: "How does your process adapt by sector?",
    a: "The methodology is consistent: Compass™ first, then the right product combination. But the application varies. A professional services firm needs different things from an engineering company or a healthcare practice. We have worked across all of these and know where the leverage points are.",
  },
  {
    q: "We're a niche or specialist business. Can you still help?",
    a: "Almost certainly. If your business relies on a strong digital presence, clear processes and confident use of technology, we can add value. Compass™ is the quickest way to find out, and it gives you a clear picture regardless of whether you continue with us.",
  },
  {
    q: "We operate in a regulated environment. Is that a problem?",
    a: "Not at all. It shapes the approach. We understand that financial services, healthcare and other regulated businesses have constraints that many agencies ignore. We factor compliance and data governance in from the start.",
  },
];

function Industries() {
  return (
    <>
      <PageHeader
        eyebrow="Industries"
        title="Built for the businesses that keep South Africa moving."
        intro="Every industry has its own pressures. We adapt the Vula Solutions playbook to the reality of yours."
      />

      <Section
        eyebrow="Our approach"
        title="Every engagement follows the DARES™ framework."
        intro="Whatever your industry, we follow the same proven methodology, adapted to your specific pressures, regulations and goals."
        className="bg-secondary/40"
      >
        <ol className="relative grid gap-8 sm:grid-cols-5">
          <div className="pointer-events-none absolute inset-x-0 top-7 hidden -translate-y-px border-t-2 border-dashed border-electric/30 sm:block" aria-hidden />
          {dares.map(({ icon: Icon, l, t, b }) => (
            <li key={t} className="relative z-10 flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-electric shadow-lg">
                <span className="font-display text-2xl font-bold text-white">{l}</span>
              </div>
              <div className="mt-3 flex items-center gap-1.5">
                <Icon className="h-3.5 w-3.5 shrink-0 text-electric" />
                <h3 className="text-sm font-semibold">{t}</h3>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{b}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 border-t border-border pt-6 text-sm text-muted-foreground">
          Compass™ maps{" "}
          <span className="font-medium text-foreground">Discover</span>,{" "}
          <span className="font-medium text-foreground">Assess</span> and{" "}
          <span className="font-medium text-foreground">Recommend</span>.{" "}
          <span className="font-medium text-foreground">Execute</span> and{" "}
          <span className="font-medium text-foreground">Support</span> continue through your chosen VULA solutions.
        </p>
      </Section>

      <Section eyebrow="Where we work" title="The sectors we know well.">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map(({ icon: Icon, t, b }) => (
            <div key={t} className="card-premium relative flex flex-col overflow-hidden p-7">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] rounded-t-[inherit] bg-electric opacity-80" aria-hidden />
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/8 bg-navy-deep text-white">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg font-semibold">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-dashed border-border bg-secondary/40 p-8 sm:flex-row sm:items-center">
          <div className="flex-1">
            <p className="font-semibold">Not seeing your industry?</p>
            <p className="mt-1 text-sm text-muted-foreground">
              We work with any growing South African SME. If your business could work smarter, Compass™ is the right first step.
            </p>
          </div>
          <Link
            to="/contact"
            onClick={() => analytics.bookCompassClick("industries")}
            className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            Book a Compass session <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      <Section eyebrow="Common questions" title="Industries, answered." className="bg-secondary/40">
        <FAQ items={faqs} />
      </Section>

      <CTA />
    </>
  );
}