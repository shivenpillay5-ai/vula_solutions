import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Info } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";
import { CTA } from "@/components/site/CTA";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Vula Solutions" },
      { name: "description", content: "Transparent, scope-based pricing for Compass™ discovery sessions and all Vula Solutions products." },
      { property: "og:title", content: "Pricing — Vula Solutions" },
      { property: "og:url", content: "/pricing" },
    ],
    links: [{ rel: "canonical", href: "/pricing" }],
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
      "90-minute discovery session",
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
      "Half-day discovery session",
      "Up to 5 stakeholders across functions",
      "Digital, operations and AI readiness audit",
      "Competitive landscape review",
      "Written Compass Report + 2-week action plan",
    ],
  },
  {
    label: "Strategic",
    ideal: "Organisations with multiple divisions or complex stakeholder environments.",
    price: "R30,000",
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

const deliveryProducts = [
  {
    name: "Launch™",
    to: "/solutions/launch",
    description: "Website design, build and digital presence",
    price: "R20,000 – R500,000+",
    monthly: false,
  },
  {
    name: "Flow™",
    to: "/solutions/flow",
    description: "Business process automation and systems integration",
    price: "R15,000 – R750,000+",
    monthly: false,
  },
  {
    name: "Accelerate™",
    to: "/solutions/accelerate",
    description: "AI adoption and intelligent workflow implementation",
    price: "R10,000 – R500,000+",
    monthly: false,
  },
  {
    name: "Growth™",
    to: "/solutions/growth",
    description: "SEO, content strategy and organic digital growth",
    price: "R4,500 – R100,000+",
    monthly: true,
  },
  {
    name: "Partner™",
    to: "/solutions/partner",
    description: "Ongoing technology partnership and support",
    price: "R7,500 – R150,000+",
    monthly: true,
  },
] as const;

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
        <div className="card-premium overflow-hidden">
          {deliveryProducts.map((product, i) => (
            <div
              key={product.name}
              className={`flex items-center justify-between gap-6 px-7 py-5 ${i > 0 ? "border-t border-border" : ""}`}
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold">{product.name}</p>
                  {product.monthly && (
                    <span className="rounded-full border border-border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Retainer
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-sm text-muted-foreground">{product.description}</p>
              </div>
              <div className="flex shrink-0 items-center gap-4">
                <p className="text-right text-sm font-medium tabular-nums text-foreground">
                  {product.price}
                  {product.monthly && <span className="text-xs text-muted-foreground"> /mo</span>}
                </p>
                <Link
                  to={product.to}
                  className="text-muted-foreground transition-colors hover:text-electric"
                  aria-label={`Learn more about ${product.name}`}
                >
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-border bg-background p-5">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-electric" />
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">These are price bands, not quotes.</span>{" "}
            Scope, complexity, stakeholder count and delivery timeline all shape the final proposal. No project is priced until Compass™ has given us the full picture.
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

function CompassCard({
  label,
  ideal,
  price,
  from,
  featured,
  included,
}: typeof compassTiers[number]) {
  return (
    <div className={`card-premium relative flex flex-col overflow-hidden${featured ? " border-electric/40" : ""}`}>
      {featured && (
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[3px] rounded-t-[inherit] bg-electric"
          aria-hidden
        />
      )}

      <div className="px-7 pt-7">
        {featured && (
          <p className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.16em] text-electric">
            Recommended
          </p>
        )}
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
        <Link
          to="/contact"
          className={`inline-flex h-11 w-full items-center justify-center gap-2 rounded-full text-sm font-semibold transition hover:opacity-90 ${
            featured
              ? "bg-primary text-primary-foreground"
              : "border border-border bg-background text-foreground hover:border-electric/50 hover:text-electric"
          }`}
        >
          Book {label}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}