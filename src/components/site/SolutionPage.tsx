import type { ComponentType } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Check } from "lucide-react";
import { PageHeader } from "./PageHeader";
import { Section } from "./Section";
import { CTA } from "./CTA";
import { FAQ } from "./FAQ";

export interface SolutionPageProps {
  name: string;
  tagline: string;
  hero: string;
  intro: string;
  who: string[];
  problems: string[];
  included: string[];
  outcomes: string[];
  process: { n: string; t: string; b: string }[];
  faq: { q: string; a: string }[];
  icon: ComponentType<{ className?: string }>;
}

export function SolutionPage(props: SolutionPageProps) {
  const { name, tagline, hero, intro, who, problems, included, outcomes, process, faq, icon: Icon } = props;
  return (
    <>
      <PageHeader
        eyebrow={name}
        title={<>{hero}</>}
        intro={intro}
        breadcrumb={
          <Link
            to="/solutions"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All solutions
          </Link>
        }
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-foreground/80">
          <Icon className="h-4 w-4 text-electric" />
          {tagline}
        </span>
      </PageHeader>
      <Section eyebrow="How it works" title={`What to expect from ${name}.`}>
        <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="pointer-events-none absolute inset-x-0 top-1/2 hidden -translate-y-1/2 border-t border-dashed border-border lg:block" aria-hidden />
          {process.map((s) => (
            <li key={s.n} className="relative z-10 card-premium card-premium-hover p-7">
              <p className="font-display text-4xl text-electric">{s.n}</p>
              <h3 className="mt-4 text-lg font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.b}</p>
            </li>
          ))}
        </ol>
      </Section>
      <Section eyebrow="At a glance" className="bg-secondary/40">
        <div className="grid gap-8 md:grid-cols-2">
          <Card title="Who it's for" items={who} />
          <Card title="Problems it solves" items={problems} />
          <Card title="What's included" items={included} />
          <Card title="Typical outcomes" items={outcomes} />
        </div>
      </Section>
      <Section eyebrow="Common questions" title={`${name}, answered.`}>
        <FAQ items={faq} />
      </Section>
      <CTA
        title={`Start with Compass™, then build with ${name}.`}
        body="Every engagement begins with a discovery session. Book Compass™ and we'll shape the right plan together."
        primary={{ to: "/contact", label: "Book Compass™" }}
        secondary={{ to: "/solutions", label: "See all solutions" }}
      />
    </>
  );
}

function Card({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="card-premium p-7">
      <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
      <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
        {items.map((t) => (
          <li key={t} className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-growth" />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}