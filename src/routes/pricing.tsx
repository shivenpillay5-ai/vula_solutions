import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Info, Rocket, Workflow, Sparkles, TrendingUp, HeartHandshake } from "lucide-react";
import type { ComponentType } from "react";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";
import { CTA } from "@/components/site/CTA";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Vula Solutions" },
      { name: "description", content: "Transparent, scope-based pricing for Compass™ discovery sessions and all Vula Solutions products." },
      { property: "og:title", content: "Pricing — Vula Solutions" },
      { property: "og:url", content: "https://vulasolutions.co.za/pricing" },
    ],
    links: [{ rel: "canonical", href: "https://vulasolutions.co.za/pricing" }],
  }),
  component: Pricing,
});

const compassTiers = [
  {
    label: "Essential",
    ideal: "Owner-managed businesses ready to take stock and grow.",
    price: "R5,000",
    from: false,
    featured: false,
    included: [
      "Discovery session (approx. 90 minutes)",
      "1–2 stakeholder participants",
      "Digital presence and operations review",
      "Written Compass Report with prioritised roadmap",
    ],
  },
  {
    label: "Professional",
    ideal: "Growing businesses with a leadership team and multiple functions.",
    price: "R15,000",
    from: false,
    featured: true,
    included: [
      "Discovery session (approximately half a day)",
      "Up to 5 stakeholders across functions",
      "Digital, operations and AI readiness audit",
      "Competitive landscape review",
      "Written Compass Report + 2-week action plan",
    ],
  },
  {
    label: "Strategic",
    ideal: "Organisations with multiple divisions or complex stakeholder environments.",
    price: "R50,000",
    from: true,
    featured: false,
    included: [
      "Full-day or multi-day deep-dive engagement",
      "Cross-functional team involvement",
      "Full business transformation roadmap",
      "90-day implementation blueprint",
      "Quarterly review session",
    ],
  },
] as const;

type DeliveryProduct = {
  name: string;
  to: string;
  icon: ComponentType<{ className?: string }>;
  description: string;
  price: string;
  monthly: boolean;
};

const deliveryProducts: DeliveryProduct[] = [
  {
    name: "Launch™",
    to: "/solutions/launch",
    icon: Rocket,
    description: "A website that earns trust and converts the right clients.",
    price: "From R20,000",
    monthly: false,
  },
  {
    name: "Flow™",
    to: "/solutions/flow",
    icon: Workflow,
    description: "Fewer manual steps, fewer errors, more time for the work that actually matters.",
    price: "From R15,000",
    monthly: false,
  },
  {
    name: "Accelerate™",
    to: "/solutions/accelerate",
    icon: Sparkles,
    description: "Practical AI, embedded in your workflows and delivering measurable results.",
    price: "From R10,000",
    monthly: false,
  },
  {
    name: "Growth™",
    to: "/solutions/growth",
    icon: TrendingUp,
    description: "Organic visibility that compounds over time and brings the right clients to you.",
    price: "From R4,500",
    monthly: true,
  },
  {
    name: "Partner™",
    to: "/solutions/partner",
    icon: HeartHandshake,
    description: "A standing technology partner, in your corner as your business grows.",
    price: "From R7,500",
    monthly: true,
  },
];

function Pricing() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="Scope determines price. Compass™ determines scope."
        intro="We don't charge you more because of your headcount. We charge based on what the work involves. Every engagement starts with a Compass™ session, which gives us — and you — the context to price accurately."
      />

      <Section
        eyebrow="Start here"
        title="Choose your Compass™ scope."
        intro="Pick the level of discovery that matches the complexity of your situation. All three deliver a written Compass Report you own, regardless of what comes next."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {compassTiers.map((tier) => (
            <CompassCard key={tier.label} {...tier} />
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Build from here"
        title="What comes after Compass™."
        intro="These are the broad price ranges for each product. Final proposals are issued after Compass™ has scoped the work."
        className="bg-secondary/40"
      >
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-6">
          {deliveryProducts.map((product, i) => (
            <div
              key={product.name}
              className={`h-full md:col-span-2 ${i === 3 ? "md:col-start-2" : ""} ${i === 4 ? "sm:col-span-2 md:col-span-2 md:col-start-auto" : ""}`}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-border bg-background p-5">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-electric" />
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">These are starting prices, not fixed quotes.</span>{" "}
            Scope, complexity and delivery timelines all shape the final proposal. No project is quoted until Compass™ has mapped the full picture.
          </p>
        </div>
      </Section>

      <CTA
        title="Start with Compass™."
        body="Book a discovery session and leave with a written plan for your business. The Compass™ fee is the only fixed cost until a project is scoped and agreed."
        primary={{ to: "/contact", label: "Book Compass™" }}
        secondary={{ to: "/solutions", label: "See all solutions" }}
      />
    </>
  );
}

function ProductCard({ name, to, icon: Icon, description, price, monthly }: DeliveryProduct) {
  return (
    <Link to={to} className="group card-premium card-premium-hover relative flex h-full flex-col overflow-hidden p-7">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] rounded-t-[inherit] bg-electric opacity-50 transition-opacity duration-200 group-hover:opacity-100" aria-hidden />
      <div className="flex items-center gap-3">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-navy-deep text-white transition-colors duration-200 group-hover:border-electric/40 group-hover:bg-electric">
          <Icon className="h-5 w-5" />
        </span>
        <div className="flex items-center gap-2">
          <p className="font-semibold transition-colors duration-200 group-hover:text-electric">{name}</p>
          {monthly && (
            <span className="rounded-full border border-border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Retainer
            </span>
          )}
        </div>
      </div>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
      <div className="mt-5 flex items-center justify-between border-t border-border pt-5">
        <p className="text-sm font-medium tabular-nums text-foreground">
          {price}
          {monthly && <span className="text-xs text-muted-foreground"> /mo</span>}
        </p>
        <span className="text-muted-foreground transition-colors duration-200 group-hover:text-electric">
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}

function CompassCard({
  label,
  ideal,
  price,
  from,
  featured,
  included,
}: typeof compassTiers[number]) {
  return (
    <Link
      to="/contact"
      search={{ service: `compass-${label.toLowerCase()}` }}
      className={`group card-premium card-premium-hover relative flex flex-col overflow-hidden${featured ? " border-electric/40" : ""}`}
    >
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-[3px] rounded-t-[inherit] bg-electric transition-opacity duration-200 ${featured ? "opacity-80 group-hover:opacity-100" : "opacity-0 group-hover:opacity-70"}`}
        aria-hidden
      />

      <div className="px-7 pt-7">
        <p className={`mb-2.5 text-[10px] font-bold uppercase tracking-[0.16em] ${featured ? "text-electric" : "invisible"}`}>
          Recommended
        </p>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Compass™
        </p>
        <h3 className="mt-1 text-2xl font-bold">{label}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{ideal}</p>
        <p className="font-display mt-5 text-3xl font-bold text-foreground">
          {from && (
            <span className="text-base font-semibold text-muted-foreground">from </span>
          )}
          {price}
        </p>
      </div>

      <ul className="flex-1 space-y-3 px-7 py-6">
        {included.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-electric" />
            <span className="text-sm text-muted-foreground">{item}</span>
          </li>
        ))}
      </ul>

      <div className="border-t border-border px-7 pb-7 pt-6">
        <span
          className={`inline-flex h-11 w-full items-center justify-center gap-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
            featured
              ? "bg-primary text-primary-foreground"
              : "border border-border bg-background text-foreground group-hover:border-electric/50 group-hover:text-electric"
          }`}
        >
          Book {label}
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}