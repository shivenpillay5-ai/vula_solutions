import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";
import { CTA } from "@/components/site/CTA";
import { allOutcomes } from "@/lib/outcomes";

export const Route = createFileRoute("/case-studies")({
  head: () => ({
    meta: [
      { title: "Case Studies — Vula Solutions" },
      { name: "description", content: "Real transformations, before-and-after stories and outcomes from Vula Solutions engagements." },
      { property: "og:title", content: "Case Studies | Vula Solutions" },
      { property: "og:description", content: "Real transformations, before-and-after stories and outcomes from Vula Solutions engagements." },
      { property: "og:url", content: "https://vulasolutions.co.za/case-studies" },
    ],
    links: [{ rel: "canonical", href: "https://vulasolutions.co.za/case-studies" }],
  }),
  component: CaseStudies,
});

const studies = allOutcomes;

function CaseStudyCard({ metric, metricLabel, sector, location, product, summary, found, fixed }: typeof studies[number]) {
  return (
    <div className="card-premium relative flex flex-col overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] rounded-t-[inherit] bg-electric" aria-hidden />
      <div className="border-b border-border bg-secondary/40 px-7 py-6">
        <p className="font-display text-4xl font-bold leading-none text-electric">{metric}</p>
        <p className="mt-1 text-sm text-muted-foreground">{metricLabel}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-navy-deep px-3 py-1 text-xs font-semibold text-white">{product}</span>
          <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
            {sector} · {location}
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-6 p-7">
        <p className="text-sm leading-relaxed text-muted-foreground">{summary}</p>
        <div className="space-y-4 border-t border-border pt-5">
          <div>
            <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">What we found</p>
            <p className="text-sm leading-relaxed text-foreground">{found}</p>
          </div>
          <div>
            <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-electric">What we changed</p>
            <p className="text-sm leading-relaxed text-foreground">{fixed}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CaseStudies() {
  return (
    <>
      <PageHeader
        eyebrow="Case Studies"
        title="Real transformations, told simply."
        intro="A closer look at the businesses we have helped find direction, launch, automate and grow. All clients are anonymised to protect their privacy. The figures are real."
      />

      <Section eyebrow="Results" title="What this looks like in practice.">
        <div className="mb-8 flex items-start gap-3 rounded-2xl border border-border bg-secondary/40 p-5">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-electric" />
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Client confidentiality is non-negotiable.</span>{" "}
            We do not name clients or share identifying details without explicit permission. Every case study below is anonymised by sector, location and product. The outcomes are specific because vague claims help no one.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {studies.map((s) => (
            <CaseStudyCard key={s.metric} {...s} />
          ))}
        </div>
      </Section>

      <CTA
        title="Want to be our next success story?"
        body="Start with Compass™ and let us map out what is possible for your business."
        primary={{ to: "/contact", label: "Book Compass™" }}
        secondary={{ to: "/solutions", label: "Explore solutions" }}
      />
    </>
  );
}
