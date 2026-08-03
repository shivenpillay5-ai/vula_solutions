import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";
import { resourceSections } from "@/lib/resources";

export const Route = createFileRoute("/resources/")({
  head: () => ({
    meta: [
      { title: "Resources - Vula Solutions" },
      {
        name: "description",
        content:
          "Guides, checklists and insights on how small and medium businesses can work smarter.",
      },
      { property: "og:title", content: "Resources | Vula Solutions" },
      { property: "og:url", content: "/resources" },
    ],
    links: [{ rel: "canonical", href: "/resources" }],
  }),
  component: ResourcesIndex,
});

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

  return (
    <>
      <PageHeader
        eyebrow="Resources"
        title="Thoughtful guidance, not content for content's sake."
        intro="Start with Compass™ thinking, then explore practical articles curated to help leaders make clearer business decisions."
      />
      <Section className="pb-6 sm:pb-8">
        {featuredSection && featuredArticle && (
          <a
            href={`/resources/${featuredSection.slug}/${featuredArticle.slug}`}
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
          </a>
        )}
      </Section>
      <Section
        eyebrow="Browse By Theme"
        title="Seven focus areas"
        intro="The best way to scale this library is section first: choose a topic, start with one recommended article, then explore the rest only if it is relevant."
        className="pt-2"
      >
        <div className="grid gap-6 md:grid-cols-2">
          {resourceSections.map((section) => {
            const liveCount = section.articles.filter((article) => article.body).length;
            const totalCount = section.articles.length;

            return (
              <a
                key={section.slug}
                href={`/resources/${section.slug}`}
                className="card-premium card-premium-hover group block p-7 sm:p-8"
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-electric">
                    {liveCount > 0 ? `${liveCount} live article${liveCount === 1 ? "" : "s"}` : `${totalCount} in progress`}
                  </p>
                  <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    Guided reading
                  </span>
                </div>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight">{section.title}</h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground line-clamp-2">
                  {tightenCopy(section.description)}
                </p>
                <div className="mt-6 flex items-center justify-end gap-3">
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-electric transition group-hover:translate-x-0.5">
                    Explore section
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </Section>
    </>
  );
}
