import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Compass as CompassIcon, ShieldCheck, LineChart, Users, Building2, Briefcase, Stethoscope, Wrench, HardHat, Landmark, Compass as ClarityIcon, ShieldCheck as ConfidenceIcon, TrendingUp, Handshake } from "lucide-react";
import { Section } from "@/components/site/Section";
import { ProductCard } from "@/components/site/ProductCard";
import { products } from "@/components/site/products";
import { CTA } from "@/components/site/CTA";
import heroDoorway from "@/assets/hero-doorway.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vula Solutions - Helping businesses work smarter" },
      { name: "description", content: "Strategy, websites, AI, automation and SEO for South African SMEs. Start with Compass™ - our signature business discovery experience." },
      { property: "og:title", content: "Vula Solutions" },
      { property: "og:description", content: "Helping businesses work smarter." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <VulaMeaning />
      <CompassIntro />
      <SolutionsOverview />
      <WhyVula />
      <Approach />
      <Industries />
      <ResourcesTeaser />
      <CTA />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-deep">
      <div className="container-page grid gap-12 pt-16 pb-10 md:grid-cols-[1fr_1.35fr] md:items-center md:gap-14 md:pt-24 md:pb-14">
        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-white/70 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#01A1B7" }} />
            Business Transformation Partner
          </span>
          <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-[3.5rem]">
            Technology shouldn't be the hardest part of running your business.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
            Running a business is complicated enough. Choosing the right technology shouldn't be.
            We help you open the right doors - with clarity, confidence and practical technology that fits your business.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              to="/compass"
              className="inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm font-semibold text-white transition hover:opacity-90"
              style={{ backgroundColor: "#01A1B7" }}
            >
              Start with Compass™
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/solutions"
              className="inline-flex h-12 items-center rounded-full border border-white/20 px-6 text-sm font-medium text-white transition hover:bg-white/[0.06]"
            >
              Explore Our Solutions
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.6)]">
            <img
              src={heroDoorway}
              alt="Two elegant architectural doors opening onto a bright sunlit landscape - a metaphor for opening new business possibilities."
              width={1600}
              height={1200}
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-navy-deep/40 via-transparent to-transparent" />
          </div>
          <div
            className="pointer-events-none absolute -inset-8 -z-10 rounded-[2.5rem] blur-3xl"
            style={{ background: "radial-gradient(60% 60% at 50% 50%, rgba(20,184,166,0.25), transparent 70%)" }}
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  const items = [
    { icon: CompassIcon, label: "Understand first" },
    { icon: LineChart, label: "Recommend second" },
    { icon: ShieldCheck, label: "Build third" },
    { icon: Users, label: "Support always" },
  ];
  return (
    <div className="border-b border-border bg-background">
      <div className="container-page grid grid-cols-2 gap-6 py-8 sm:grid-cols-4">
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-3 text-sm text-muted-foreground">
            <Icon className="h-4 w-4 text-electric" />
            <span className="font-medium text-foreground">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function VulaMeaning() {
  const pillars = [
    { icon: ClarityIcon, title: "CLARITY", body: "We help you see the path forward - before anything is built." },
    { icon: ConfidenceIcon, title: "CONFIDENCE", body: "Trusted advice, so every technology decision feels certain." },
    { icon: TrendingUp, title: "TRANSFORMATION", body: "Practical technology that quietly changes how your business works." },
    { icon: Handshake, title: "PARTNERSHIP", body: "We stay with you - long after the launch." },
  ];
  return (
    <section className="bg-navy-deep pt-10 pb-12 sm:pt-14 sm:pb-16">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: "#01A1B7" }}>
            Vula means open
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
            We <span style={{ color: "#01A1B7" }}>open the door</span> to a smarter, stronger business.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/65">
            VULA is a Business Transformation Partner - not a website agency, an AI vendor or IT support.
            The best technology is the kind that helps your business thrive without getting in the way.
          </p>
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-7 transition hover:border-white/20 hover:bg-white/[0.05]">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10" style={{ color: "#01A1B7" }}>
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-xs font-semibold tracking-[0.2em] text-white">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CompassIntro() {
  return (
    <Section>
      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-electric">
            The starting point
          </p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
            Every successful journey starts with knowing where you are.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Compass™ is our signature business discovery and strategy experience. Before we recommend websites, AI, automation or digital transformation, we first understand your business, identify opportunities and create a clear roadmap.
          </p>
          <p className="mt-4 text-lg text-foreground">
            At the end of Compass™, you don't leave with a quote. You leave with clarity.
          </p>
          <Link
            to="/compass"
            className="mt-8 inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            Discover Compass™ <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="relative">
          <div className="card-premium p-8">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-navy text-white">
                <CompassIcon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Compass™</p>
                <p className="text-lg font-semibold">Find Your Direction</p>
              </div>
            </div>
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              {[
                "A focused business discovery session",
                "Opportunity mapping across technology, AI and operations",
                "A written Compass Report with a clear roadmap",
                "No obligation, no sales pitch - just clarity",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-electric" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-electric/10 to-growth/10 blur-2xl" aria-hidden />
        </div>
      </div>
    </Section>
  );
}

function SolutionsOverview() {
  return (
    <Section
      eyebrow="The Vula Solutions suite"
      title="A connected ecosystem for modern businesses"
      intro="Each product is designed to work on its own or as part of a broader transformation - all beginning with Compass™."
      className="bg-secondary/40"
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.name} {...p} />
        ))}
      </div>
    </Section>
  );
}

function WhyVula() {
  const points = [
    { title: "Strategy before technology", body: "We start with your business, not with tools. Clarity first, execution second." },
    { title: "Practical, not theoretical", body: "Outcomes you can measure - faster processes, better websites, real AI adoption." },
    { title: "Premium, without the overhead", body: "The quality of a senior team, structured for small and medium businesses." },
    { title: "One partner, end to end", body: "Discovery, design, build, automation and ongoing support under one roof." },
  ];
  return (
    <Section eyebrow="Why Vula Solutions" title="A partner, not a vendor." intro="We build confidence through technology - with a calm, considered approach.">
      <div className="grid gap-6 sm:grid-cols-2">
        {points.map((p) => (
          <div key={p.title} className="card-premium p-7">
            <h3 className="text-lg font-semibold tracking-tight">{p.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Approach() {
  const steps = [
    { n: "01", t: "Discover", b: "A structured Compass™ session to understand your business and priorities." },
    { n: "02", t: "Map", b: "We identify opportunities across technology, AI, automation and growth." },
    { n: "03", t: "Deliver", b: "We build, launch and refine - websites, automations and AI enablement." },
    { n: "04", t: "Partner", b: "Ongoing support to improve, adapt and grow - without limits." },
  ];
  return (
    <Section eyebrow="The approach" title="A simple path to real change." className="bg-secondary/40">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s) => (
          <div key={s.n} className="card-premium p-7">
            <p className="font-display text-4xl text-electric">{s.n}</p>
            <h3 className="mt-4 text-lg font-semibold">{s.t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.b}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Industries() {
  const items = [
    { icon: Briefcase, label: "Professional services" },
    { icon: Landmark, label: "Financial services" },
    { icon: HardHat, label: "Engineering" },
    { icon: Building2, label: "Construction" },
    { icon: Stethoscope, label: "Healthcare" },
    { icon: Wrench, label: "Trades & specialists" },
  ];
  return (
    <Section eyebrow="Industries" title="Built for the businesses that keep South Africa moving.">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="card-premium flex items-center gap-3 p-5">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-electric">
              <Icon className="h-5 w-5" />
            </span>
            <span className="text-sm font-medium">{label}</span>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <Link to="/industries" className="inline-flex items-center gap-1 text-sm font-medium text-electric hover:underline">
          See how we help each industry <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Section>
  );
}

function ResourcesTeaser() {
  return (
    <Section eyebrow="Insights" title="Thinking worth returning to." intro="A curated stream of practical articles, shaped around Compass™ thinking and real business decisions." className="bg-secondary/40">
      <div className="grid gap-6 md:grid-cols-3">
        {[
          { t: "How to run a proper business discovery", d: "Questions that unlock the right strategy." },
          { t: "AI for SMEs, without the hype", d: "Practical use cases that create real value." },
          { t: "The website as a business tool", d: "Design decisions that support real enquiries." },
        ].map((r) => (
          <Link key={r.t} to="/resources" className="card-premium card-premium-hover block p-7 sm:p-8">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Guide</p>
            <h3 className="mt-2 text-lg font-semibold">{r.t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{r.d}</p>
          </Link>
        ))}
      </div>
    </Section>
  );
}
