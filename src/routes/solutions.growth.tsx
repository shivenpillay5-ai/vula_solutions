import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp } from "lucide-react";
import { SolutionPage } from "@/components/site/SolutionPage";

export const Route = createFileRoute("/solutions/growth")({
  head: () => ({
    meta: [
      { title: "Growth™ — Be Found. Be Chosen. | Vula Solutions" },
      { name: "description", content: "SEO, Google Business Profile, content and conversion improvements that turn visibility into pipeline." },
      { property: "og:title", content: "Growth™ — Be Found. Be Chosen." },
      { property: "og:url", content: "/solutions/growth" },
    ],
    links: [{ rel: "canonical", href: "/solutions/growth" }],
  }),
  component: () => (
    <SolutionPage
      name="Growth™"
      tagline="Be Found. Be Chosen."
      icon={TrendingUp}
      hero="Turn visibility into enquiries."
      intro="Growth™ is our SEO and digital growth service. We make sure the right people find you — and then choose you."
      process={[
        { n: "01", t: "Audit", b: "A full assessment of your current rankings, content, and digital visibility." },
        { n: "02", t: "Strategy", b: "A keyword and content strategy built around real opportunities in your market." },
        { n: "03", t: "Optimise", b: "On-page, technical and local search improvements that move the needle." },
        { n: "04", t: "Grow", b: "Ongoing content, reporting and iteration — compounding results over time." },
      ]}
      who={[
        "Businesses invisible to their ideal customers.",
        "Owners tired of paying for ads with no results.",
        "Teams wanting sustainable, compounding growth.",
      ]}
      problems={[
        "Weak search rankings.",
        "A neglected Google Business Profile.",
        "Content that doesn't answer real questions.",
        "A site that gets traffic but few enquiries.",
      ]}
      included={[
        "SEO audit and keyword strategy",
        "On-page and technical improvements",
        "Google Business Profile optimisation",
        "Content plan and production support",
        "Conversion improvements",
        "Monthly reporting and iteration",
      ]}
      outcomes={[
        "Higher rankings for the terms that matter.",
        "More qualified enquiries from search.",
        "Stronger local presence.",
        "A compounding growth engine.",
      ]}
    />
  ),
});