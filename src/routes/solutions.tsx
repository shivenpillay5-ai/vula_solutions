import { createFileRoute, Link, Outlet, useMatches } from "@tanstack/react-router";
import { ArrowRight, Compass } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";
import { ProductCard } from "@/components/site/ProductCard";
import { products } from "@/components/site/products";
import { CTA } from "@/components/site/CTA";

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: "Solutions — Vula Solutions" },
      { name: "description", content: "Compass™, Launch™, Flow™, Accelerate™, Growth™ and Partner™, a connected ecosystem to help your business work smarter." },
      { property: "og:title", content: "Solutions | Vula Solutions" },
      { property: "og:description", content: "A connected ecosystem for modern businesses." },
      { property: "og:url", content: "https://vulasolutions.co.za/solutions" },
    ],
    links: [{ rel: "canonical", href: "https://vulasolutions.co.za/solutions" }],
  }),
  component: SolutionsLayout,
});

function SolutionsLayout() {
  const matches = useMatches();
  const isChild = matches.some((m) => m.routeId !== "/solutions" && m.routeId.startsWith("/solutions/"));
  if (isChild) return <Outlet />;

  const deliveryProducts = products.filter((p) => p.name !== "Compass™");

  return (
    <>
      <PageHeader
        eyebrow="Solutions"
        title="A connected ecosystem for modern businesses."
        intro="Each product can stand alone or work as part of a broader transformation. Every engagement begins with Compass™."
      />
      <Section eyebrow="Start here" title="Every engagement begins with Compass™.">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr] md:items-center">
          <div>
            <p className="text-lg text-muted-foreground">
              Before we recommend websites, automation or AI, we first understand your business. Compass™ is our premium discovery and strategy session, the foundation every client engagement begins with.
            </p>
            <p className="mt-4 text-lg text-foreground">
              You leave with a written Compass Report: a clear plan that's yours to keep and act on, whether or not you continue with us.
            </p>
            <Link
              to="/compass"
              className="mt-8 inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Discover Compass™ <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="card-premium p-8">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-navy-deep text-white">
                <Compass className="h-5 w-5" />
              </span>
              <div>
                <p className="text-base font-semibold">Compass™</p>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Find Your Direction</p>
              </div>
            </div>
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              {[
                "A focused business discovery session.",
                "Opportunity mapping across technology, AI and operations.",
                "A written Compass Report with a clear roadmap.",
                "No obligation. Just clarity.",
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
      <Section
        eyebrow="Build from here"
        title="Choose your path forward."
        intro="Once Compass™ has mapped the opportunity, choose the right product, or let us recommend the right combination for your business."
        className="bg-secondary/40"
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
          {deliveryProducts.map((p, i) => {
            const last = deliveryProducts.length - 1;
            const className =
              i === last - 1 ? "lg:col-start-2 lg:col-span-2" :
              i === last     ? "sm:col-span-2 lg:col-start-4 lg:col-span-2" :
                               "lg:col-span-2";
            return <ProductCard key={p.name} {...p} className={className} />;
          })}
        </div>
      </Section>
      <CTA />
    </>
  );
}