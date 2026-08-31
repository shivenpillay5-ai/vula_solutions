import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Calculator, CheckCircle2, Compass as CompassIcon, Route as RouteIcon, Gauge, Gem, Handshake } from "lucide-react";
import { analytics } from "@/lib/analytics";
import { Section } from "@/components/site/Section";
import { ProductCard } from "@/components/site/ProductCard";
import { products } from "@/components/site/products";
import { CTA } from "@/components/site/CTA";
import { useReveal } from "@/components/site/Reveal";
import heroDoorway from "@/assets/hero-doorway.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vula Solutions: Helping businesses work smarter" },
      { name: "description", content: "Strategy, websites, AI, automation and SEO for South African SMEs. Start with Compass™, our signature business discovery experience." },
      { property: "og:title", content: "Vula Solutions, Business Transformation Partner" },
      { property: "og:description", content: "Strategy, websites, AI and automation for South African SMEs. Every engagement starts with Compass, our signature business discovery session." },
      { property: "og:url", content: "https://vulasolutions.co.za/" },
    ],
    links: [{ rel: "canonical", href: "https://vulasolutions.co.za/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <CompassIntro />
      <SolutionsOverview />
      <WhyVula />
      <ToolSpotlight />
      <BrandBand />
      <CTA />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-deep">
      <div className="container-page grid gap-12 pt-12 pb-10 md:grid-cols-[1fr_1.35fr] md:items-center md:gap-14 md:pt-18 md:pb-14">
        <div className="relative z-10">
          <h1 className="text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-[3.5rem]">
            Technology shouldn't be the <span className="text-electric">hardest part</span> of running your business.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
            We help you open the right doors: clarity, confidence and practical technology that fits your business.
          </p>
          {/* Hero image — visible on mobile only, sits between text and buttons */}
          <div className="relative my-8 md:hidden">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.6)]">
              <img
                src={heroDoorway}
                alt="Two elegant architectural doors opening onto a bright sunlit landscape."
                width={1600}
                height={1200}
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-navy-deep/40 via-transparent to-transparent" />
            </div>
          </div>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              to="/compass"
              onClick={() => analytics.bookCompassClick("home_hero")}
              className="inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm font-semibold text-white transition hover:opacity-90"
              style={{ backgroundColor: "#01A1B7" }}
            >
              Start with Compass™
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/solutions"
              className="inline-flex h-12 items-center rounded-full bg-white px-6 text-sm font-medium text-navy-deep transition hover:bg-white/90"
            >
              Explore Our Solutions
            </Link>
          </div>
        </div>
        <div className="relative hidden md:block">
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

function ToolSpotlight() {
  const reveal = useReveal();
  return (
    <section className="py-4 sm:py-6">
      <div ref={reveal.ref} className={`container-page ${reveal.className}`}>
        <div className="relative overflow-hidden rounded-3xl bg-navy-deep px-8 py-10 sm:px-12">
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(1,161,183,0.35), transparent 70%)" }}
            aria-hidden
          />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-electric/15 text-electric">
                <Calculator className="h-6 w-6" />
              </span>
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-electric">Free tool</p>
                <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                  Manual admin has no invoice. It still has a price.
                </h2>
                <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-white/60">
                  Work out what repetitive work costs your business each year, in about 60 seconds.
                </p>
              </div>
            </div>
            <Link
              to="/tools/cost-of-doing-nothing-calculator"
              className="inline-flex h-11 shrink-0 items-center gap-2 self-start rounded-full px-6 text-sm font-semibold text-white transition hover:opacity-90 md:self-center"
              style={{ backgroundColor: "#01A1B7" }}
            >
              Calculate yours <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function BrandBand() {
  const reveal = useReveal();
  return (
    <section className="bg-secondary/40 py-16 sm:py-20">
      <div ref={reveal.ref} className={`container-page mx-auto max-w-3xl text-center ${reveal.className}`}>
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-electric">
          Vula means open
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
          We help you <span className="text-electric">open the door</span> to a smarter, stronger business.
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          VULA is a Business Transformation Partner, not a website agency, an AI vendor or IT support.
          The best technology is the kind that helps your business thrive without getting in the way.
        </p>
      </div>
    </section>
  );
}

function CompassIntro() {
  return (
    <Section className="bg-secondary/40">
      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-electric">
            The starting point
          </p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
            Every successful journey starts with knowing where you are.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Compass™ is our signature business discovery and strategy experience. Before we recommend anything, we understand your business, map the opportunities and build a clear roadmap.
          </p>
          <p className="mt-4 text-lg text-foreground">
            At the end of Compass™, you don't leave with a quote. You leave with clarity.
          </p>
          <Link
            to="/compass"
            onClick={() => analytics.bookCompassClick("home_compass_section")}
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
                "No obligation, no sales pitch. Just clarity",
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
  const [compass, ...solutions] = products;
  return (
    <Section
      eyebrow="The Vula Solutions suite"
      title="A connected ecosystem for modern businesses."
      intro="Each product works on its own or as part of a broader transformation."
      className="bg-navy-deep"
      tone="dark"
    >
      {/* Compass spotlight — the flagship, where every engagement starts */}
      <Link
        to={compass.to}
        className="card-premium group relative block overflow-hidden border-electric/30 p-8 transition-transform duration-250 hover:-translate-y-[3px] hover:shadow-[0_32px_70px_-34px_rgba(1,161,183,0.35)] sm:p-10"
        style={{ borderTopWidth: 0 }}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] rounded-t-[inherit] bg-electric" aria-hidden />
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-electric/20 to-electric/0 blur-3xl" aria-hidden />
        <div className="relative grid gap-8 md:grid-cols-[1.3fr_1fr] md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-electric">Where every engagement starts</p>
            <div className="mt-4 flex items-center gap-4">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/8 bg-navy-deep text-white transition-all duration-250 group-hover:border-electric/30 group-hover:ring-1 group-hover:ring-electric/45">
                <CompassIcon className="h-6 w-6" />
              </span>
              <div>
                <h3 className="text-2xl font-semibold tracking-tight transition-colors duration-250 group-hover:text-electric">{compass.name}</h3>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{compass.tagline}</p>
              </div>
            </div>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">{compass.description}</p>
            <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-electric">
              Discover Compass™
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
          <ul className="space-y-3.5">
            {[
              "In-person or video, 90 minutes to multiple days",
              "A written Compass Report within one week",
              "No obligation: the report is yours to keep",
            ].map((line) => (
              <li key={line} className="flex items-start gap-3 text-sm text-muted-foreground">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-electric" />
                {line}
              </li>
            ))}
          </ul>
        </div>
      </Link>

      {/* Connector — the roadmap flows into the solutions */}
      <div className="flex flex-col items-center py-2" aria-hidden>
        <div className="h-8 w-px bg-gradient-to-b from-electric/70 to-electric/25" />
        <span className="rounded-full border border-electric/25 bg-electric/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-electric">
          Your roadmap leads to
        </span>
        <div className="h-8 w-px bg-gradient-to-b from-electric/25 to-electric/70" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {solutions.map((p) => (
          <ProductCard key={p.name} {...p} />
        ))}
        {/* Closes the loop back to Compass */}
        <Link
          to="/contact"
          className="group flex h-full flex-col items-start justify-center rounded-2xl border border-dashed border-electric/30 p-7 transition hover:border-electric/60 hover:bg-electric/5"
        >
          <p className="text-sm font-semibold text-white">Not sure which door to open?</p>
          <p className="mt-2 text-sm leading-relaxed text-white/60">
            That is exactly what Compass™ answers. One session, and you will know where to start.
          </p>
          <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-electric">
            Book Compass™
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </Link>
      </div>
    </Section>
  );
}

function WhyVula() {
  const points = [
    { icon: RouteIcon, title: "Strategy before technology", body: "We start with your business, not with tools. Clarity first, execution second." },
    { icon: Gauge, title: "Practical, not theoretical", body: "Outcomes you can measure: faster processes, better websites, real AI adoption." },
    { icon: Gem, title: "Premium, without the overhead", body: "The quality of a senior team, structured for small and medium businesses." },
    { icon: Handshake, title: "One partner, end to end", body: "Discovery, design, build, automation and ongoing support under one roof." },
  ];
  return (
    <Section eyebrow="Why Vula Solutions" title="A partner, not a vendor." intro="We build confidence through technology, with a calm, considered approach.">
      <div className="grid gap-x-12 gap-y-9 sm:grid-cols-2">
        {points.map(({ icon: Icon, title, body }) => (
          <div key={title} className="flex items-start gap-4">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-electric/10 text-electric">
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-base font-semibold tracking-tight">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
