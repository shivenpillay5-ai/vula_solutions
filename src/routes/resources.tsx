import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";
import { resourceSections } from "@/lib/resources";

export const Route = createFileRoute("/resources")({
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
  component: Resources,
});

function Resources() {
  return (
    <>
      <PageHeader
        eyebrow="Resources"
        title="Ideas worth reading."
        intro="Browse the library by topic, then open a section to explore its articles."
      />
      <Section>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {resourceSections.map((section, index) => (
            <Link
              key={section.slug}
              to="/resources/$section"
              params={{ section: section.slug }}
              className="card-premium card-premium-hover group block p-7"
            >
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Section {index + 1}
              </p>
              <h3 className="mt-2 text-xl font-semibold">{section.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {section.description}
              </p>
              <div className="mt-6 flex items-center justify-between gap-3">
                <p className="text-xs text-muted-foreground">
                  {section.articles.length} placeholder articles ready
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-electric transition group-hover:translate-x-0.5">
                  Explore section
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
