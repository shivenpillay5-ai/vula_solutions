import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ChevronDown } from "lucide-react";

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
  const [openSection, setOpenSection] = useState(resourceSections[0]?.slug ?? "");

  return (
    <>
      <PageHeader
        eyebrow="Resources"
        title="Thoughtful guidance, not content for content's sake."
        intro="Start with Compass? thinking, then explore practical articles curated to help leaders make clearer business decisions."
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
                  Compass? First
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
        eyebrow="Browse By Theme"
        title="Seven doors into better business thinking."
        intro="Open one topic at a time, start with the article that matters most, and keep the library calm instead of crowded."
        className="pt-2"
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

            return (
              <div key={section.slug} className={`card-premium overflow-hidden ${isOpen ? "border-electric/35 shadow-[0_24px_50px_-28px_rgba(1,161,183,0.28)]" : ""}`}>
                <button
                  type="button"
                  className="flex w-full items-start justify-between gap-6 p-6 text-left sm:p-8"
                  onClick={() => setOpenSection((current) => (current === section.slug ? "" : section.slug))}
                  aria-expanded={isOpen}
                  aria-controls={`resource-section-${section.slug}`}
                >
                  <div className="max-w-3xl">
                    <h3 className="text-2xl font-semibold tracking-tight">{section.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {tightenCopy(section.description, 150)}
                    </p>
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
                          className="rounded-2xl border border-electric/15 bg-electric/5 p-5 transition hover:border-electric/35 hover:bg-electric/7"
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
    </>
  );
}
