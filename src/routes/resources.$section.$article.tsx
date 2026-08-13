import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";

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

  return (
    <>
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
        </article>
      </Section>
    </>
  );
}