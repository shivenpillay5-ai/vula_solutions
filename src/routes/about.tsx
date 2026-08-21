import { createFileRoute } from "@tanstack/react-router";
import { Lightbulb, Target, ShieldCheck, TrendingUp, CheckCircle, XCircle, Briefcase, Brain, Layers, Users } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";
import { CTA } from "@/components/site/CTA";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Vula Solutions" },
      { name: "description", content: "We build confidence through technology. Meet the team helping South African SMEs work smarter." },
      { property: "og:title", content: "About Vula Solutions" },
      { property: "og:url", content: "https://vulasolutions.co.za/about" },
    ],
    links: [{ rel: "canonical", href: "https://vulasolutions.co.za/about" }],
  }),
  component: About,
});

const values = [
  {
    icon: Lightbulb,
    t: "Clarity first",
    b: "Good strategy makes everything else easier. We start with understanding before we ever recommend a solution.",
  },
  {
    icon: Target,
    t: "Practical results",
    b: "Real outcomes over polished slides. Every engagement is measured by what it actually changes in your business.",
  },
  {
    icon: ShieldCheck,
    t: "Calm confidence",
    b: "Considered work, delivered without drama or hype. We move deliberately so you can move fast.",
  },
  {
    icon: TrendingUp,
    t: "Long-term thinking",
    b: "We build partnerships and platforms designed to compound over time. Not quick wins that fade in six months.",
  },
];

const isVula = [
  "A Business Transformation Partner",
  "Strategy before everything",
  "A long-term partner in your corner",
  "Sector knowledge, not sector limits",
];

const isNotVula = [
  "A website agency",
  "An AI vendor selling tools",
  "IT support or a help desk",
  "A freelancer with a template",
];

const credentials = [
  {
    icon: Briefcase,
    label: "Cross-sector experience",
    body: "Professional services, financial services, engineering, construction, healthcare and beyond. We understand the pressures specific to each.",
  },
  {
    icon: Brain,
    label: "Strategy, AI & automation",
    body: "Deep expertise across digital strategy, AI adoption and workflow automation, grounded in practical application rather than vendor hype.",
  },
  {
    icon: Layers,
    label: "Complete delivery",
    body: "From Compass™ strategy through to websites, automations and ongoing partnership. Everything coordinated, under one roof.",
  },
  {
    icon: Users,
    label: "Built for SMEs",
    body: "Everything we do is shaped around the realities of small and medium businesses: their scale, their budgets and their ambitions.",
  },
];

function About() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="We build confidence through technology."
        intro="Vula Solutions is a South African Business Transformation Partner. We help small and medium businesses work smarter through strategy, websites, AI, automation and growth."
      />

      <Section eyebrow="Why we exist" title="Because good businesses deserve modern tools.">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr] md:items-start">
          <div>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Too many capable businesses are held back by outdated websites, disconnected tools and hesitation around new technology. We started Vula Solutions to change that. To make premium strategy, modern design, AI and automation accessible to the businesses that keep our economy moving.
            </p>
            <p className="mt-5 text-lg text-foreground">
              Our work is grounded in one belief: clarity comes first. We slow down at the start so our clients can move faster, longer.
            </p>
          </div>
          <div className="space-y-4">
            <div className="card-premium p-7">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-electric">Mission</p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                To help small and medium businesses work smarter through practical technology, AI and design. Clarity first, not a quote.
              </p>
            </div>
            <div className="card-premium p-7">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-electric">Vision</p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                A generation of confident, modern South African businesses, built on clear strategy and strong digital foundations.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="The team"
        title="Small by design. Senior by standard."
        className="bg-secondary/40"
        intro="Vula Solutions is built around a small team of senior practitioners. Deliberately lean, so every engagement gets experienced hands rather than juniors learning on the job."
      >
        <div className="grid gap-6 sm:grid-cols-2">
          {credentials.map(({ icon: Icon, label, body }) => (
            <div key={label} className="card-premium flex gap-5 p-7">
              <span className="mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-deep text-white">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-semibold">{label}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-8 border-t border-border pt-6 text-sm text-muted-foreground">
          When an engagement demands specialist depth in design, development or data, we bring in trusted partners who work to our standard, ensuring the right expertise shows up for every problem.
        </p>
      </Section>

      <Section
        eyebrow="Our positioning"
        title="Built differently. On purpose."
        intro="The consulting and agency world is full of generalists with expensive overheads. We chose a different model."
        className="bg-navy-deep"
        tone="dark"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.14em] text-electric">What we are</p>
            <ul className="space-y-4">
              {isVula.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 shrink-0 text-electric" />
                  <span className="text-sm font-medium text-white">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.14em] text-white/40">What we're not</p>
            <ul className="space-y-4">
              {isNotVula.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <XCircle className="h-4 w-4 shrink-0 text-white/25" />
                  <span className="text-sm text-white/55">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section eyebrow="Values" title="What guides our work.">
        <div className="grid gap-6 sm:grid-cols-2">
          {values.map(({ icon: Icon, t, b }) => (
            <div key={t} className="card-premium p-7">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-electric">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg font-semibold">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b}</p>
            </div>
          ))}
        </div>
      </Section>

      <CTA />
    </>
  );
}