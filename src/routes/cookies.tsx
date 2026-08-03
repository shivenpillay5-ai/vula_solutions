import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookie Notice — Vula Solutions" },
      { name: "description", content: "How Vula Solutions uses cookies and similar technologies on this website." },
      { property: "og:url", content: "/cookies" },
    ],
    links: [{ rel: "canonical", href: "/cookies" }],
  }),
  component: () => (
    <>
      <PageHeader eyebrow="Legal" title="Cookie Notice" intro="A short summary of how we use cookies on the Vula Solutions website." />
      <Section>
        <div className="prose prose-neutral max-w-3xl space-y-6 text-muted-foreground">
          <p>We use a small number of cookies to keep this site running smoothly and to understand how it's used. These help us improve performance and content over time.</p>
          <p>You can control cookies through your browser settings at any time. Blocking some cookies may affect how the site works.</p>
          <p>We do not use cookies to build advertising profiles about you.</p>
        </div>
      </Section>
    </>
  ),
});