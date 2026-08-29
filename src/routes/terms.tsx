import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use | Vula Solutions" },
      { name: "description", content: "The terms that govern use of the Vula Solutions website." },
      { property: "og:title", content: "Terms of Use | Vula Solutions" },
      { property: "og:url", content: "https://vulasolutions.co.za/terms" },
    ],
    links: [{ rel: "canonical", href: "https://vulasolutions.co.za/terms" }],
  }),
  component: () => (
    <>
      <PageHeader eyebrow="Legal" title="Terms of Use" intro="By using this website you agree to the terms outlined below." />
      <Section>
        <div className="prose prose-neutral max-w-3xl space-y-6 text-muted-foreground">
          <p>The content on this website is provided for general information about Vula Solutions and our services. It does not constitute professional advice.</p>
          <p>You may not reproduce or redistribute content from this site without written permission.</p>
          <p>We aim to keep the site available and accurate, but do not warrant uninterrupted access or that all content is free of errors.</p>
          <p>These terms are governed by the laws of the Republic of South Africa.</p>
        </div>
      </Section>
    </>
  ),
});