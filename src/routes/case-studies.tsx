import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";
import { CTA } from "@/components/site/CTA";

export const Route = createFileRoute("/case-studies")({
  head: () => ({
    meta: [
      { title: "Case Studies — Vula Solutions" },
      { name: "description", content: "Real transformations, before-and-after stories and outcomes from Vula Solutions engagements." },
      { property: "og:title", content: "Case Studies | Vula Solutions" },
      { property: "og:url", content: "/case-studies" },
    ],
    links: [{ rel: "canonical", href: "/case-studies" }],
  }),
  component: CaseStudies,
});

function CaseStudies() {
  return (
    <>
      <PageHeader eyebrow="Case Studies" title="Real transformations, told simply." intro="A closer look at the businesses we've helped find direction, launch, automate and grow. New case studies are on the way." />
      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="card-premium overflow-hidden p-0">
              <div className="gradient-hero h-40" />
              <div className="p-7">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Coming soon</p>
                <h3 className="mt-2 text-lg font-semibold">Case study #{i}</h3>
                <p className="mt-2 text-sm text-muted-foreground">A detailed look at how Vula Solutions helped this business work smarter — from discovery to delivery.</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
      <CTA
        title="Want to be our next success story?"
        body="Start with Compass™ and let's map out what's possible for your business."
        primary={{ to: "/contact", label: "Book Compass™" }}
        secondary={{ to: "/solutions", label: "Explore solutions" }}
      />
    </>
  );
}