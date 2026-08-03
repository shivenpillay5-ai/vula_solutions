import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";
import { CTA } from "@/components/site/CTA";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Vula Solutions" },
      { name: "description", content: "We build confidence through technology. Meet the team helping South African SMEs work smarter." },
      { property: "og:title", content: "About Vula Solutions" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  const values = [
    { t: "Clarity first", b: "Good strategy makes everything else easier. We start with understanding." },
    { t: "Practical results", b: "Real outcomes over polished slides. We measure what matters." },
    { t: "Calm confidence", b: "Considered work, delivered without drama or hype." },
    { t: "Long-term thinking", b: "We build partnerships and platforms designed to compound." },
  ];
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="We build confidence through technology."
        intro="Vula Solutions is a South African Business Transformation Partner. We help small and medium businesses work smarter through strategy, websites, AI, automation and growth."
      />
      <Section eyebrow="Why we exist" title="Because good businesses deserve modern tools.">
        <div className="grid gap-10 md:grid-cols-2">
          <p className="text-lg text-muted-foreground">
            Too many capable businesses are held back by outdated websites, disconnected tools and hesitation around new technology. We started Vula Solutions to change that — to make premium strategy, modern design, AI and automation accessible to the businesses that keep our economy moving.
          </p>
          <p className="text-lg text-muted-foreground">
            Our work is grounded in one belief: clarity comes first. We slow down at the start so our clients can move faster, longer.
          </p>
        </div>
      </Section>
      <Section eyebrow="Mission & vision" title="A calm, capable partner for modern SMEs." className="bg-secondary/40">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card-premium p-8">
            <h3 className="text-lg font-semibold">Mission</h3>
            <p className="mt-3 text-muted-foreground">To help small and medium businesses work smarter through practical technology, AI and design.</p>
          </div>
          <div className="card-premium p-8">
            <h3 className="text-lg font-semibold">Vision</h3>
            <p className="mt-3 text-muted-foreground">A generation of confident, modern South African businesses — built on clear strategy and strong digital foundations.</p>
          </div>
        </div>
      </Section>
      <Section eyebrow="Values" title="What guides our work.">
        <div className="grid gap-6 sm:grid-cols-2">
          {values.map((v) => (
            <div key={v.t} className="card-premium p-7">
              <h3 className="text-lg font-semibold">{v.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.b}</p>
            </div>
          ))}
        </div>
      </Section>
      <CTA />
    </>
  );
}