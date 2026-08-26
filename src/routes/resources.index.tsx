import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ChevronDown, BookOpen, Target, Users, Zap, Brain, Monitor, TrendingUp, Download } from "lucide-react";

import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";
import { CTA } from "@/components/site/CTA";
import { resourceSections, type ResourceContentBlock } from "@/lib/resources";

const SECTION_ICONS = {
  "getting-started": BookOpen,
  "strategy-and-leadership": Target,
  "change-management": Users,
  "process-improvement": Zap,
  "artificial-intelligence": Brain,
  "software-and-technology": Monitor,
  "business-growth": TrendingUp,
};

function extractPullQuote(body: ResourceContentBlock[]): string | null {
  for (let i = 1; i < body.length; i++) {
    const block = body[i];
    if (block.type === "paragraph" && block.text.length >= 50 && block.text.length <= 175) {
      return block.text;
    }
  }
  return null;
}

export const Route = createFileRoute("/resources/")({
  head: () => ({
    meta: [
      { title: "Resources — Vula Solutions" },
      {
        name: "description",
        content:
          "Guides, checklists and insights on how small and medium businesses can work smarter.",
      },
      { property: "og:title", content: "Resources — Vula Solutions" },
      { property: "og:url", content: "https://vulasolutions.co.za/resources" },
    ],
    links: [{ rel: "canonical", href: "https://vulasolutions.co.za/resources" }],
  }),
  component: ResourcesIndex,
});

const FREE_TOOLS = [
  {
    slug: "sme-pricing-guide",
    to: "/tools/sme-pricing-guide" as const,
    title: "The SA SME Pricing Guide",
    type: "Guide",
    description: "Honest Rand price ranges for websites, automation, AI and SEO in South Africa.",
  },
  {
    slug: "cost-of-doing-nothing-calculator",
    to: "/tools/cost-of-doing-nothing-calculator" as const,
    title: "Cost of Doing Nothing Calculator",
    type: "Calculator",
    description: "Turn the hours your team loses to manual admin into a Rand figure per year.",
  },
  {
    slug: "business-discovery-checklist",
    to: "/tools/business-discovery-checklist" as const,
    title: "Business Discovery Checklist",
    type: "Checklist",
    description: "Evaluate where your business is today and identify where to focus next.",
  },
  {
    slug: "software-buying-checklist",
    to: "/tools/software-buying-checklist" as const,
    title: "Software Buying Checklist",
    type: "Checklist",
    description: "Define your requirements, evaluate vendors objectively, and avoid costly mistakes.",
  },
  {
    slug: "ai-readiness-assessment",
    to: "/tools/ai-readiness-assessment" as const,
    title: "AI Readiness Assessment",
    type: "Assessment",
    description: "Understand your organisation's readiness to adopt AI responsibly.",
  },
  {
    slug: "process-improvement-scorecard",
    to: "/tools/process-improvement-scorecard" as const,
    title: "Process Improvement Scorecard",
    type: "Scorecard",
    description: "Rate your business processes across eight areas and build an improvement plan.",
  },
  {
    slug: "digital-transformation-roadmap",
    to: "/tools/digital-transformation-roadmap" as const,
    title: "Digital Transformation Roadmap",
    type: "Roadmap",
    description: "Assess your current state, define your vision, and plan the path forward.",
  },
  {
    slug: "business-systems-audit",
    to: "/tools/business-systems-audit" as const,
    title: "Business Systems Audit",
    type: "Audit",
    description: "Evaluate whether your technology supports your people, processes, and goals.",
  },
  {
    slug: "meeting-agenda-templates",
    to: "/tools/meeting-agenda-templates" as const,
    title: "Meeting Agenda Templates",
    type: "Template",
    description: "Four ready-to-use templates — team, project kick-off, requirements, and leadership.",
  },
  {
    slug: "requirements-workshop-guide",
    to: "/tools/requirements-workshop-guide" as const,
    title: "Requirements Workshop Guide",
    type: "Guide",
    description: "Plan and run a structured requirements workshop before any project starts.",
  },
  {
    slug: "vendor-evaluation-matrix",
    to: "/tools/vendor-evaluation-matrix" as const,
    title: "Vendor Evaluation Matrix",
    type: "Matrix",
    description: "Score vendors against weighted criteria and arrive at a defensible recommendation.",
  },
  {
    slug: "project-risk-checklist",
    to: "/tools/project-risk-checklist" as const,
    title: "Project Risk Checklist",
    type: "Checklist",
    description: "Identify risks early, assign ownership, and plan mitigation before issues arise.",
  },
] as const;

function tightenCopy(text: string, max = 84) {
  const trimmed = text.trim();
  if (trimmed.length <= max) return trimmed;
  return `${trimmed.slice(0, max).trimEnd().replace(/[.,;:]?$/, "")}...`;
}

function ResourcesIndex() {
  const featuredSection = resourceSections.find((section) =>
    section.articles.some((article) => article.body),
  );
  const featuredArticle = featuredSection?.articles.find((article) => article.body);
  const [openSection, setOpenSection] = useState(resourceSections[0]?.slug ?? "");

  return (
    <>
      <PageHeader
        eyebrow="Resources"
        title="Thoughtful guidance, not content for content's sake."
        intro="Start with Compass™ thinking, then explore practical articles curated to help leaders make clearer business decisions."
      />
      <Section className="pb-6 sm:pb-8">
        {featuredSection && featuredArticle && (
          <Link
            to="/resources/$section/$article"
            params={{ section: featuredSection.slug, article: featuredArticle.slug }}
            className="card-premium card-premium-hover group block overflow-hidden p-8 sm:p-10"
          >
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-electric">
                  Featured Article
                </p>
                <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
                  {featuredArticle.title}
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {tightenCopy(featuredArticle.description, 132)}
                </p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-electric transition group-hover:translate-x-0.5">
                  Read featured article
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
              <div className="rounded-2xl border border-electric/15 bg-electric/5 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-electric">
                  Compass™ First
                </p>
                <p className="mt-3 text-sm leading-relaxed text-foreground/85">
                  The strongest technology decisions begin with clarity. This featured read is a useful place to start before comparing tools, vendors or platforms.
                </p>
                <p className="mt-5 text-sm font-medium text-foreground">
                  Section: {featuredSection.title}
                </p>
              </div>
            </div>
          </Link>
        )}
      </Section>
      <Section
        eyebrow="Free Downloads"
        title="Tools you can use right now."
        intro="Practical worksheets, checklists and templates designed to help you make better business decisions — no sign-up required."
        className="pt-2"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FREE_TOOLS.map(tool => (
            <Link
              key={tool.slug}
              to={tool.to}
              className="card-premium card-premium-hover group flex flex-col p-6"
            >
              <div className="mb-3 flex items-center justify-between gap-2">
                <span className="rounded-full bg-electric/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-electric">
                  {tool.type}
                </span>
                <Download className="h-4 w-4 text-muted-foreground transition group-hover:text-electric" />
              </div>
              <h3 className="mb-2 text-base font-semibold tracking-tight leading-snug">{tool.title}</h3>
              <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{tool.description}</p>
              <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-electric transition group-hover:translate-x-0.5">
                Open tool <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </Section>
      <Section
        eyebrow="Browse By Theme"
        title="Seven doors into better business thinking."
        intro="Open one topic at a time, start with the article that matters most, and keep the library calm instead of crowded."
      >
        <div className="space-y-4">
          {resourceSections.map((section) => {
            const isOpen = openSection === section.slug;
            const liveArticles = section.articles.filter((article) => article.body);
            const sectionPreviewTags: Record<string, readonly string[]> = {
              "process-improvement": ["Small Business", "Operations", "Productivity"],
              "artificial-intelligence": ["Starting with AI", "Advanced"],
            };
            const previewTags = sectionPreviewTags[section.slug];
            const previewArticles = previewTags
              ? previewTags
                  .map((tag) => liveArticles.find((article) => article.tag === tag))
                  .filter((article): article is (typeof liveArticles)[number] => Boolean(article))
              : liveArticles.slice(0, 3);

            const SectionIcon = SECTION_ICONS[section.slug as keyof typeof SECTION_ICONS];

            return (
              <div key={section.slug} className={`card-premium overflow-hidden ${isOpen ? "border-electric/35 shadow-[0_24px_50px_-28px_rgba(1,161,183,0.28)]" : ""}`}>
                <button
                  type="button"
                  className="flex w-full items-start justify-between gap-6 p-6 text-left sm:p-8"
                  onClick={() => setOpenSection((current) => (current === section.slug ? "" : section.slug))}
                  aria-expanded={isOpen}
                  aria-controls={`resource-section-${section.slug}`}
                >
                  <div className="flex min-w-0 items-start gap-4">
                    {SectionIcon && (
                      <span className={`mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-200 ${isOpen ? "bg-electric/15 text-electric" : "bg-secondary text-muted-foreground"}`}>
                        <SectionIcon className="h-5 w-5" />
                      </span>
                    )}
                    <div className="max-w-3xl">
                      <h3 className="text-2xl font-semibold tracking-tight">{section.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                        {tightenCopy(section.description, 150)}
                      </p>
                    </div>
                  </div>
                  <span className={`mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-background text-electric transition-transform duration-300 ${isOpen ? "rotate-180 border-electric/30" : ""}`}>
                    <ChevronDown className="h-5 w-5" />
                  </span>
                </button>

                {isOpen && (
                  <div id={`resource-section-${section.slug}`} className="border-t border-border/80 px-6 pb-6 pt-6 sm:px-8 sm:pb-8">
                    {previewArticles.length > 0 ? (
                      <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
                        <Link
                          to="/resources/$section/$article"
                          params={{ section: section.slug, article: previewArticles[0].slug }}
                          className="flex flex-col rounded-2xl border border-electric/15 bg-electric/5 p-5 transition hover:border-electric/35 hover:bg-electric/7"
                        >
                          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-electric">
                            {previewArticles[0].tag}
                          </p>
                          <h4 className="mt-3 text-xl font-semibold tracking-tight text-foreground">
                            {previewArticles[0].title}
                          </h4>
                          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                            {tightenCopy(previewArticles[0].description, 118)}
                          </p>
                          <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-electric">
                            Read article
                            <ArrowRight className="h-4 w-4" />
                          </div>
                          {(() => {
                            const pq = extractPullQuote(previewArticles[0].body ?? []);
                            return pq ? (
                              <p className="mt-5 border-t border-electric/15 pt-5 text-sm italic leading-relaxed text-foreground/65">
                                &ldquo;{pq}&rdquo;
                              </p>
                            ) : null;
                          })()}
                        </Link>

                        <div className="grid gap-4">
                          {previewArticles.slice(1).map((article) => (
                            <Link
                              key={article.slug}
                              to="/resources/$section/$article"
                              params={{ section: section.slug, article: article.slug }}
                              className="rounded-2xl border border-border bg-background p-5 transition hover:border-electric/30 hover:bg-accent/40"
                            >
                              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-electric">
                                {article.tag}
                              </p>
                              <h4 className="mt-2 text-lg font-semibold tracking-tight text-foreground">
                                {article.title}
                              </h4>
                              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                {tightenCopy(article.description, 96)}
                              </p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-2xl border border-border bg-secondary/40 p-5 text-sm text-muted-foreground">
                        Articles for this section are coming soon.
                      </div>
                    )}

                    <div className="mt-5 flex justify-end">
                      <Link
                        to="/resources/$section"
                        params={{ section: section.slug }}
                        className="inline-flex items-center gap-2 text-sm font-medium text-electric"
                      >
                        View full section
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Section>
      <CTA
        title="Knowledge is the start. Action is the difference."
        body="Compass™ turns what you have read into a concrete plan for your business. Book a session and leave with clarity."
        primary={{ to: "/contact", label: "Book Compass™" }}
        secondary={{ to: "/solutions", label: "Explore solutions" }}
      />
    </>
  );
}
