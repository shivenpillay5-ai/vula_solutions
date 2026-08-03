import { createFileRoute, Outlet, useMatches } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";
import { ProductCard } from "@/components/site/ProductCard";
import { products } from "@/components/site/products";
import { CTA } from "@/components/site/CTA";

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: "Solutions — The Vula Solutions product suite" },
      { name: "description", content: "Compass™, Launch™, Flow™, Accelerate™, Growth™ and Partner™ — a connected ecosystem to help your business work smarter." },
      { property: "og:title", content: "Solutions | Vula Solutions" },
      { property: "og:description", content: "A connected ecosystem for modern businesses." },
      { property: "og:url", content: "/solutions" },
    ],
    links: [{ rel: "canonical", href: "/solutions" }],
  }),
  component: SolutionsLayout,
});

function SolutionsLayout() {
  const matches = useMatches();
  const isChild = matches.some((m) => m.routeId !== "/solutions" && m.routeId.startsWith("/solutions/"));
  if (isChild) return <Outlet />;
  return (
    <>
      <PageHeader
        eyebrow="Solutions"
        title="A connected ecosystem for modern businesses."
        intro="Each product can stand alone or work as part of a broader transformation — and every engagement begins with Compass™."
      />
      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => <ProductCard key={p.name} {...p} />)}
        </div>
      </Section>
      <CTA />
    </>
  );
}