import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";

const SECTION_TOOL: Record<string, { title: string; slug: string; description: string }> = {
  "getting-started":        { title: "Business Discovery Checklist",       slug: "business-discovery-checklist",       description: "Evaluate where your business is today and identify where to focus next." },
  "strategy-and-leadership":{ title: "Digital Transformation Roadmap",     slug: "digital-transformation-roadmap",     description: "Assess your current state, define your vision, and plan the path forward." },
  "change-management":      { title: "Business Discovery Checklist",       slug: "business-discovery-checklist",       description: "Evaluate where your business is today and identify where to focus next." },
  "process-improvement":    { title: "Process Improvement Scorecard",      slug: "process-improvement-scorecard",      description: "Rate your business processes across eight areas and build an improvement plan." },
  "artificial-intelligence":{ title: "AI Readiness Assessment",            slug: "ai-readiness-assessment",            description: "Understand your organisation's readiness to adopt AI responsibly." },
  "software-and-technology":{ title: "Software Buying Checklist",          slug: "software-buying-checklist",          description: "Define your requirements, evaluate vendors and avoid costly mistakes." },
  "business-growth":        { title: "Cost of Doing Nothing Calculator",   slug: "cost-of-doing-nothing-calculator",   description: "Work out what repetitive work costs your business each year, in about 60 seconds." },
};

function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";
import { getResourceArticle, type ResourceContentBlock } from "@/lib/resources";

export const Route = createFileRoute("/resources/$section/$article")({
  beforeLoad: ({ params }) => {
    const result = getResourceArticle(params.section, params.article);
    if (!result?.article.body) throw notFound();
  },
  head: ({ params }) => {
    const result = getResourceArticle(params.section, params.article);
    if (!result) return { meta: [] };
    const { section, article } = result;
    const url = `https://vulasolutions.co.za/resources/${params.section}/${params.article}`;
    return {
      meta: [
        { title: `${article.title} — Vula Solutions` },
        { name: "description", content: article.description },
        { property: "og:title", content: article.title },
        { property: "og:description", content: article.description },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
        { name: "article:section", content: section.title },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: ResourceArticlePage,
});

function readTime(body: ResourceContentBlock[]): number {
  const words = body.reduce((acc, block) => {
    if (block.type === "paragraph" || block.type === "heading") return acc + block.text.split(/\s+/).length;
    if (block.type === "list") return acc + block.items.join(" ").split(/\s+/).length;
    return acc;
  }, 0);
  return Math.max(1, Math.ceil(words / 200));
}

function ResourceArticlePage() {
  const { section: sectionSlug, article: articleSlug } = Route.useParams();
  const result = getResourceArticle(sectionSlug, articleSlug);

  if (!result?.article.body) {
    return null;
  }

  const { section, article } = result;
  const body = article.body!;
  const minutes = readTime(body);

  const relatedArticles = section.articles
    .filter((a) => a.body && a.slug !== articleSlug)
    .slice(0, 2);

  const relatedTool = SECTION_TOOL[sectionSlug] ?? null;
  const pageUrl = `https://vulasolutions.co.za/resources/${sectionSlug}/${articleSlug}`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": pageUrl,
        headline: article.title,
        description: article.description,
        url: pageUrl,
        inLanguage: "en-ZA",
        datePublished: "2026-08-01",
        publisher: {
          "@type": "Organization",
          "@id": "https://vulasolutions.co.za/#organization",
          name: "Vula Solutions",
        },
        author: {
          "@type": "Organization",
          "@id": "https://vulasolutions.co.za/#organization",
          name: "Vula Solutions",
        },
        articleSection: section.title,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://vulasolutions.co.za/" },
          { "@type": "ListItem", position: 2, name: "Resources", item: "https://vulasolutions.co.za/resources" },
          { "@type": "ListItem", position: 3, name: section.title, item: `https://vulasolutions.co.za/resources/${sectionSlug}` },
          { "@type": "ListItem", position: 4, name: article.title, item: pageUrl },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={schema} />
      <PageHeader
        eyebrow={section.title}
        title={article.title}
        intro={article.description}
        breadcrumb={
          <Link
            to="/resources/$section"
            params={{ section: section.slug }}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to {section.title}
          </Link>
        }
      >
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {minutes} min read
          </span>
          <span className="h-1 w-1 rounded-full bg-border" />
          <span>{article.tag}</span>
        </div>
      </PageHeader>

      <Section className="py-0">
        <article className="mx-auto max-w-3xl py-12 sm:py-16">
          <div className="card-premium p-8 sm:p-10">
            <div className="mb-8 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.14em] text-electric">
              <span>{article.tag}</span>
              <span className="h-1 w-1 rounded-full bg-electric/60" />
              <span>{section.title}</span>
            </div>
            <div className="space-y-6">
              {body.map((block, index) => {
                if (block.type === "heading") {
                  return (
                    <h2 key={index} className="pt-3 text-2xl font-semibold tracking-tight text-foreground">
                      {block.text}
                    </h2>
                  );
                }

                if (block.type === "list") {
                  return (
                    <ul
                      key={index}
                      className="space-y-3 pl-5 text-base leading-8 text-foreground marker:text-electric"
                    >
                      {block.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  );
                }

                if (index === 1 && block.text.length >= 60 && block.text.length <= 200) {
                  return (
                    <p key={index} className="rounded-r-xl border-l-[3px] border-electric bg-electric/[0.04] px-5 py-4 text-base font-medium leading-8 text-foreground sm:text-lg">
                      {block.text}
                    </p>
                  );
                }

                return (
                  <p key={index} className="text-base leading-8 text-foreground/90 sm:text-lg">
                    {block.text}
                  </p>
                );
              })}
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-electric/20 bg-electric/5 p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-electric">Apply this thinking</p>
            <h3 className="mt-3 text-xl font-semibold tracking-tight">Ready to put this into practice?</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Compass™ is the right starting point. A focused session with a senior strategist that turns clarity into a concrete plan for your business.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
              >
                Book Compass™ <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/resources/$section"
                params={{ section: section.slug }}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-border px-6 text-sm font-medium text-foreground transition hover:border-electric/40"
              >
                More in {section.title}
              </Link>
            </div>
          </div>

          {relatedArticles.length > 0 && (
            <div className="mt-8">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Keep reading</p>
              <div className="grid gap-4 sm:grid-cols-2">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.slug}
                    to="/resources/$section/$article"
                    params={{ section: section.slug, article: related.slug }}
                    className="group flex flex-col rounded-2xl border border-border bg-background p-5 transition hover:border-electric/40 hover:bg-accent/40"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-electric">{related.tag}</p>
                    <h4 className="mt-2 text-sm font-semibold leading-snug text-foreground">{related.title}</h4>
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{related.description}</p>
                    <div className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-electric transition-transform group-hover:translate-x-0.5">
                      Read article <ArrowRight className="h-3 w-3" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {relatedTool && (
            <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-border p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Free tool</p>
                <p className="mt-1 text-sm font-semibold text-foreground">{relatedTool.title}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{relatedTool.description}</p>
              </div>
              <Link
                to={`/tools/${relatedTool.slug}` as never}
                className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-primary px-5 text-xs font-semibold text-primary-foreground transition hover:opacity-90"
              >
                Open free tool <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          )}
        </article>
      </Section>
    </>
  );
}