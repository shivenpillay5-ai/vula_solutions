import { createFileRoute } from "@tanstack/react-router";
import { HeartHandshake } from "lucide-react";
import { SolutionPage } from "@/components/site/SolutionPage";

export const Route = createFileRoute("/solutions/partner")({
  head: () => ({
    meta: [
      { title: "Partner™ — Grow Without Limits | Vula Solutions" },
      { name: "description", content: "Ongoing support and strategic partnership. Continuous improvement, priority support and long-term growth." },
      { property: "og:title", content: "Partner™ — Grow Without Limits" },
      { property: "og:url", content: "https://vulasolutions.co.za/solutions/partner" },
    ],
    links: [{ rel: "canonical", href: "https://vulasolutions.co.za/solutions/partner" }],
  }),
  component: () => (
    <SolutionPage
      name="Partner™"
      tagline="Grow Without Limits"
      icon={HeartHandshake}
      hero="A team on your side, every month."
      intro="Partner™ is our ongoing support and strategic partnership. Continuous improvement, priority response and a plan that grows with you."
      process={[
        { n: "01", t: "Onboarding", b: "We get to know your business, tools, priorities and team in depth." },
        { n: "02", t: "Planning", b: "A quarterly roadmap of improvements, projects and strategic priorities." },
        { n: "03", t: "Execution", b: "We deliver against the plan with priority support and fast response throughout." },
        { n: "04", t: "Review", b: "Quarterly strategy sessions to assess progress, adapt and plan the next quarter." },
      ]}
      faq={[
        { q: "What does a typical month look like?", a: "It depends on your roadmap. Each month typically includes delivery against your quarterly plan, priority support for any issues and regular check-ins to adapt if priorities shift." },
        { q: "Is there a minimum commitment?", a: "Yes. Partner™ is structured around quarterly planning cycles. Reach out and we'll confirm the terms and pricing that suit your situation." },
        { q: "Can we cancel?", a: "We ask for notice at the end of each quarter. Partner™ works best as a continuous relationship: results compound over time, and we don't lock you in beyond the agreed term." },
        { q: "Is this just maintenance, or do you actively improve things?", a: "The emphasis is improvement. We don't just keep the lights on. We actively work to make your website, automations and systems better every month." },
      ]}
      who={[
        "Businesses that want a long-term technology partner.",
        "Owners without an in-house digital or IT team.",
        "Teams ready to keep improving, not just maintain.",
      ]}
      problems={[
        "One-off projects that go stale.",
        "No one accountable for improvement.",
        "Slow support when it matters most.",
        "Missed opportunities to optimise.",
      ]}
      included={[
        "Priority support and response",
        "Ongoing website and automation improvements",
        "Quarterly strategy reviews",
        "Performance and SEO monitoring",
        "Access to the Vula Solutions product suite",
      ]}
      outcomes={[
        "A partner who understands your business.",
        "Continuous, measurable improvement.",
        "Faster reaction to opportunities.",
        "Confidence that things keep moving forward.",
      ]}
    />
  ),
});