import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
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

const studies = [
  {
    metric: "11 hrs",
    metricLabel: "saved every week",
    sector: "Professional Services",
    location: "Gauteng",
    product: "Flow™",
    summary:
      "A four-person accounting practice eliminated eleven hours of weekly admin after automating client onboarding, deadline reminders and monthly reporting.",
    found:
      "Client onboarding required six or more email exchanges to collect information and set up files. Monthly reporting was compiled by hand from three separate systems. No automated reminders existed, leading to missed deadlines and reactive chasing.",
    fixed:
      "Automated the onboarding process with a branded intake form that triggered folder creation, task assignments and welcome communication. Monthly reports were connected directly to source data, cutting compilation time from three hours to under twenty minutes.",
  },
  {
    metric: "3 weeks",
    metricLabel: "to first inbound lead",
    sector: "Engineering",
    location: "Johannesburg",
    product: "Launch™",
    summary:
      "A specialist engineering consultancy received their first unsolicited inbound enquiry three weeks after launch. They had relied entirely on referrals for seven years.",
    found:
      "The existing website was eight years old, had no mobile layout and was not being indexed on Google. There was no Google Business Profile and no clear contact pathway beyond a generic email address, making it nearly impossible for new clients to find or evaluate them.",
    fixed:
      "Built a new website with clear service positioning, a project portfolio and a direct enquiry form. Set up and fully optimised their Google Business Profile. The first inbound enquiry came through the contact form eighteen days after launch.",
  },
  {
    metric: "4 days → same day",
    metricLabel: "quote turnaround",
    sector: "Construction & Supply",
    location: "Pretoria",
    product: "Compass™",
    summary:
      "A growing construction supplier used Compass™ to surface three hidden process bottlenecks and cut their quote turnaround from four days to same-day.",
    found:
      "Quotes were built manually in Excel with no template, required sign-off from the owner who was frequently on-site, and pricing required manual lookups from a printed supplier catalogue. Three separate bottlenecks, each adding hours to every quote.",
    fixed:
      "Introduced a quoting template with pre-loaded pricing tiers, established a delegated approval threshold and digitised the supplier catalogue into a shared live pricing sheet. No new software was purchased.",
  },
  {
    metric: "62%",
    metricLabel: "more inbound enquiries",
    sector: "Trades & Specialists",
    location: "Cape Town",
    product: "Growth™",
    summary:
      "A Cape Town electrical contractor with twelve years in business was losing jobs to newer competitors who appeared first on Google. Growth™ put them back in front of the customers already searching for them.",
    found:
      "Despite strong word-of-mouth, the business had no Google Business Profile, an outdated website with no location-specific content and zero reviews online. Newer competitors were ranking above them for every relevant local search term, including their own suburb.",
    fixed:
      "Built out and optimised their Google Business Profile, created structured service pages targeting high-value local search terms and introduced a simple review-generation process. Within ninety days the business appeared in the top three local results for fourteen search terms and inbound enquiries had increased by sixty-two percent.",
  },
  {
    metric: "9 hrs",
    metricLabel: "of admin writing saved weekly",
    sector: "Healthcare",
    location: "KwaZulu-Natal",
    product: "Accelerate™",
    summary:
      "A private healthcare practice was spending more than nine hours a week writing patient follow-up letters, referral summaries and appointment communications. Accelerate™ embedded AI safely into their daily workflows.",
    found:
      "Clinical and admin staff were drafting every patient communication from scratch. Referral letters, follow-up summaries and appointment confirmations were written individually, consuming time that should have been spent on patient care. There were no templates and no consistent standard of communication.",
    fixed:
      "Identified four AI-suitable use cases that did not touch clinical decision-making. Built structured prompt templates for each, trained staff in under two hours per person and established clear review guidelines before sending. The practice recovered more than nine hours of admin time per week without compromising patient care or data governance.",
  },
  {
    metric: "14",
    metricLabel: "improvements shipped in quarter one",
    sector: "Legal & Compliance",
    location: "Johannesburg",
    product: "Partner™",
    summary:
      "A boutique legal and compliance firm had a website that had not been updated in two years and legacy automations quietly failing in the background. Partner™ stabilised their digital operations and then began improving them systematically.",
    found:
      "The website had outdated practice area pages, broken contact routing and no mobile optimisation on key pages. Three automations built by a previous agency had stopped working months earlier and no one had noticed. There was no plan for ongoing improvement.",
    fixed:
      "Audited and repaired all existing automations in week one, updated and restructured the website content and resolved mobile issues by week three. From month two the engagement shifted to active improvement: new automations, refreshed content and monthly reporting. Fourteen discrete improvements were delivered across the first quarter.",
  },
];

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
