import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Vula Solutions" },
      { name: "description", content: "How Vula Solutions collects, uses and protects your information." },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: () => (
    <>
      <PageHeader eyebrow="Legal" title="Privacy Policy" intro="This page is maintained by Vula Solutions to explain how we handle personal information on this website." />
      <Section>
        <div className="prose prose-neutral max-w-3xl space-y-6 text-muted-foreground">
          <p>We collect only the information you provide to us — such as your name, email address and message details when you submit an enquiry or book a Compass™ session.</p>
          <p>We use this information solely to respond to your enquiry and to communicate with you about relevant Vula Solutions services. We do not sell your information to third parties.</p>
          <p>You can request access to or deletion of your personal information at any time by contacting <a className="text-electric hover:underline" href="mailto:hello@shinola.co.za">hello@shinola.co.za</a>.</p>
          <p>This policy will evolve as our services grow. Substantive changes will be reflected here.</p>
        </div>
      </Section>
    </>
  ),
});