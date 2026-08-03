import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";
import { getResourceSectionBySlug } from "@/lib/resources";

export const Route = createFileRoute("/resources/$section")({
  beforeLoad: ({ params }) => {
    if (!getResourceSectionBySlug(params.section)) {
      throw notFound();
    }
  },
  component: ResourceSectionPage,
});

function ResourceSectionPage() {
  const { section: sectionSlug } = Route.useParams();
  const section = getResourceSectionBySlug(sectionSlug);

  if (!section) {
    return null;
  }

  return (
    <>
      <PageHeader
        eyebrow="Resources"
        title={section.title}
        intro={section.description}
      />
      <Section className="pt-0">
        <div className="mb-8">
          <Link
            to="/resources"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all sections
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {section.articles.map((article) => (
            <div key={article.slug} className="card-premium flex h-full flex-col p-7">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {article.tag}
              </p>
              <h3 className="mt-2 text-lg font-semibold">{article.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {article.description}
              </p>
              <div className="mt-6 flex items-center justify-between gap-3 pt-2">
                <p className="text-xs text-muted-foreground">Article content coming next</p>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-electric">
                  Read article
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
