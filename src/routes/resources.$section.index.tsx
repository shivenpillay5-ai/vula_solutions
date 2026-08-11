import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";
import { CTA } from "@/components/site/CTA";
import { getResourceSectionBySlug } from "@/lib/resources";

export const Route = createFileRoute("/resources/$section/")({
  component: ResourceSectionPage,
});

function tightenCopy(text: string, max = 78) {
  const trimmed = text.trim();
  if (trimmed.length <= max) return trimmed;
  return `${trimmed.slice(0, max).trimEnd().replace(/[.,;:]?$/, "")}...`;
}

function ResourceSectionPage() {
  const { section: sectionSlug } = Route.useParams();
  const section = getResourceSectionBySlug(sectionSlug);

  if (!section) return null;

  const featuredArticle = section.articles.find((article) => article.body);
  const remainingArticles = featuredArticle
    ? section.articles.filter((article) => article.slug !== featuredArticle.slug)
    : section.articles;

  const groupedOverviewConfig: Record<
    string,
    { tags: readonly string[]; title: string; intro: string; columns: string }
  > = {
    "process-improvement": {
      tags: ["Small Business", "Operations", "Productivity"],
      title: "Explore the rest of Process Improvement",
      intro: "Browse the remaining articles across small business, operations and productivity.",
      columns: "lg:grid-cols-3",
    },
    "artificial-intelligence": {
      tags: ["Starting with AI", "Advanced"],
      title: "Explore the rest of Artificial Intelligence",
      intro: "Browse the remaining articles across practical AI adoption and more advanced guidance.",
      columns: "lg:grid-cols-2",
    },
  };
  const overviewConfig = groupedOverviewConfig[section.slug];
  const overviewArticles = overviewConfig
    ? overviewConfig.tags
        .map((tag) => section.articles.find((article) => article.tag === tag && article.body))
        .filter((article): article is NonNullable<typeof article> => Boolean(article))
    : [];
  const libraryArticles = overviewConfig
    ? section.articles.filter(
        (article) => !overviewArticles.some((entry) => entry.slug === article.slug),
      )
    : [];

  return (
    <>
      <PageHeader
        eyebrow="Resources"
        title={section.title}
        intro={section.description}
        breadcrumb={
          <Link
            to="/resources"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all sections
          </Link>
        }
      />

      <Section className="pt-8">
        {overviewConfig ? (
          <>
            <div className={`mb-8 grid gap-6 sm:mb-10 ${overviewConfig.columns}`}>
              {overviewArticles.map((article) => (
                <Link
                  key={article.slug}
                  to="/resources/$section/$article"
                  params={{ section: section.slug, article: article.slug }}
                  className="card-premium card-premium-hover group relative flex h-full flex-col overflow-hidden p-7 sm:p-8"
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] rounded-t-[inherit] bg-electric opacity-80 transition-opacity duration-200 group-hover:opacity-100" aria-hidden />
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-electric">
                    {article.tag}
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-tight">{article.title}</h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                    {tightenCopy(article.description, 110)}
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-electric transition group-hover:translate-x-0.5">
                    Read article
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              ))}
            </div>

            <div id="full-section" className="card-premium mb-8 p-7 sm:mb-10 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-electric">
                    Full Section
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                    {overviewConfig.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {overviewConfig.intro}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {libraryArticles.map((article) =>
                article.body ? (
                  <Link
                    key={article.slug}
                    to="/resources/$section/$article"
                    params={{ section: section.slug, article: article.slug }}
                    className="card-premium card-premium-hover group relative flex h-full flex-col overflow-hidden p-7 sm:p-8"
                  >
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] rounded-t-[inherit] bg-electric opacity-80 transition-opacity duration-200 group-hover:opacity-100" aria-hidden />
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-electric">
                      {article.tag}
                    </p>
                    <h3 className="mt-3 text-xl font-semibold tracking-tight">{article.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                      {tightenCopy(article.description)}
                    </p>
                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-electric transition group-hover:translate-x-0.5">
                      Read article
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </Link>
                ) : (
                  <div key={article.slug} className="card-premium flex h-full flex-col p-7 sm:p-8">
                    <span className="inline-block w-fit rounded-full border border-border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/60">
                      Coming soon
                    </span>
                    <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground/40">{article.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground/40 line-clamp-2">
                      {tightenCopy(article.description)}
                    </p>
                  </div>
                ),
              )}
            </div>
          </>
        ) : (
          <>
            {featuredArticle && (
              <Link
                to="/resources/$section/$article"
                params={{ section: section.slug, article: featuredArticle.slug }}
                className="card-premium card-premium-hover group relative mb-8 block overflow-hidden p-8 sm:mb-10 sm:p-10"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] rounded-t-[inherit] bg-electric opacity-80 transition-opacity duration-200 group-hover:opacity-100" aria-hidden />
                <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-electric">
                      Recommended Starting Point
                    </p>
                    <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
                      {featuredArticle.title}
                    </h2>
                    <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                      {tightenCopy(featuredArticle.description, 130)}
                    </p>
                  </div>
                  <div className="flex items-end justify-start lg:justify-end">
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-electric transition group-hover:translate-x-0.5">
                      Read article
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            )}

            <div className="grid gap-6 md:grid-cols-2">
              {remainingArticles.map((article) =>
                article.body ? (
                  <Link
                    key={article.slug}
                    to="/resources/$section/$article"
                    params={{ section: section.slug, article: article.slug }}
                    className="card-premium card-premium-hover group relative flex h-full flex-col overflow-hidden p-7 sm:p-8"
                  >
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] rounded-t-[inherit] bg-electric opacity-80 transition-opacity duration-200 group-hover:opacity-100" aria-hidden />
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-electric">
                      {article.tag}
                    </p>
                    <h3 className="mt-3 text-xl font-semibold tracking-tight">{article.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                      {tightenCopy(article.description)}
                    </p>
                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-electric transition group-hover:translate-x-0.5">
                      Read article
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </Link>
                ) : (
                  <div key={article.slug} className="card-premium flex h-full flex-col p-7 sm:p-8">
                    <span className="inline-block w-fit rounded-full border border-border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/60">
                      Coming soon
                    </span>
                    <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground/40">{article.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground/40 line-clamp-2">
                      {tightenCopy(article.description)}
                    </p>
                  </div>
                ),
              )}
            </div>
          </>
        )}
      </Section>

      <CTA
        title="Ready to turn this into a plan?"
        body="Compass™ is where reading becomes a plan. Book a session and leave with a clear picture of what your business should do next."
        primary={{ to: "/contact", label: "Book Compass™" }}
        secondary={{ to: "/resources", label: "Back to resources" }}
      />
    </>
  );
}