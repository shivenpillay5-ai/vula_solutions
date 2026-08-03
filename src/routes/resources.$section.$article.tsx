import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";
import { getResourceArticle } from "@/lib/resources";

export const Route = createFileRoute("/resources/$section/$article")({
  beforeLoad: ({ params }) => {
    const result = getResourceArticle(params.section, params.article);

    if (!result?.article.body) {
      throw notFound();
    }
  },
  component: ResourceArticlePage,
});

function ResourceArticlePage() {
  const { section: sectionSlug, article: articleSlug } = Route.useParams();
  const result = getResourceArticle(sectionSlug, articleSlug);

  if (!result?.article.body) {
    return null;
  }

  const { section, article } = result;

  return (
    <>
      <PageHeader
        eyebrow={section.title}
        title={article.title}
        intro={article.description}
      >
        <Link
          to="/resources/$section"
          params={{ section: section.slug }}
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to {section.title}
        </Link>
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
              {article.body.map((block, index) => {
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

                return (
                  <p key={index} className="text-base leading-8 text-foreground/90 sm:text-lg">
                    {block.text}
                  </p>
                );
              })}
            </div>
          </div>
        </article>
      </Section>
    </>
  );
}
