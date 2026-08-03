import { createFileRoute } from "@tanstack/react-router";
import { Briefcase, Landmark, HardHat, Building2, Stethoscope, Wrench, Layers } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";
import { CTA } from "@/components/site/CTA";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries — Vula Solutions" },
      { name: "description", content: "How Vula Solutions helps professional services, finance, engineering, construction, healthcare, trades and other SMEs work smarter." },
      { property: "og:title", content: "Industries | Vula Solutions" },
      { property: "og:url", content: "/industries" },
    ],
    links: [{ rel: "canonical", href: "/industries" }],
  }),
  component: Industries,
});

const items = [
  { icon: Briefcase, t: "Professional services", b: "Websites that convert leads and workflows that free up billable time." },
  { icon: Landmark, t: "Financial services", b: "Secure, credible digital presence and processes that scale with regulation." },
  { icon: HardHat, t: "Engineering", b: "Project-ready sites, automation for admin, AI for reporting and proposals." },
  { icon: Building2, t: "Construction", b: "Site content that wins tenders and workflows that streamline site management." },
  { icon: Stethoscope, t: "Healthcare", b: "Trustworthy patient-facing sites and back-office automation with care." },
  { icon: Wrench, t: "Trades & specialists", b: "Local SEO, fast quoting and simple, effective websites that book work." },
  { icon: Layers, t: "Other SMEs", b: "If you run a business that could work smarter, we can help." },
];

function Industries() {
  return (
    <>
      <PageHeader eyebrow="Industries" title="Built for the businesses that keep South Africa moving." intro="Every industry has its own pressures. We adapt the Vula Solutions playbook to the reality of yours." />
      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, t, b }) => (
            <div key={t} className="card-premium p-7">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-electric">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg font-semibold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{b}</p>
            </div>
          ))}
        </div>
      </Section>
      <CTA />
    </>
  );
}