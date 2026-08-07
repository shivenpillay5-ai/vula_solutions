import { createFileRoute } from "@tanstack/react-router";
import { Rocket } from "lucide-react";
import { SolutionPage } from "@/components/site/SolutionPage";

export const Route = createFileRoute("/solutions/launch")({
  head: () => ({
    meta: [
      { title: "Launch™ — Build With Confidence | Vula Solutions" },
      { name: "description", content: "Modern, conversion-focused websites and redesigns that give your business a stronger digital foundation." },
      { property: "og:title", content: "Launch™ — Build With Confidence" },
      { property: "og:url", content: "/solutions/launch" },
    ],
    links: [{ rel: "canonical", href: "/solutions/launch" }],
  }),
  component: () => (
    <SolutionPage
      name="Launch™"
      tagline="Build With Confidence"
      icon={Rocket}
      hero="A website that works as hard as you do."
      intro="Launch™ is our modern website and digital foundation service. We build clean, fast, conversion-focused sites — designed to earn trust and drive real enquiries."
      process={[
        { n: "01", t: "Discovery", b: "We understand your brand, audience and goals before a single pixel is designed." },
        { n: "02", t: "Design", b: "A design system and site architecture built around your business and how visitors think." },
        { n: "03", t: "Build", b: "A fast, modern site with clean code, strong SEO foundations and analytics from day one." },
        { n: "04", t: "Launch", b: "Go live with a full handover, team training and a roadmap for what comes next." },
      ]}
      who={[
        "Businesses launching a new site or brand.",
        "Teams outgrowing an outdated website.",
        "Owners who want a site that reflects a premium business.",
      ]}
      problems={[
        "A website that looks dated or generic.",
        "Low enquiries and unclear calls to action.",
        "Slow load times and poor mobile experience.",
        "No clear structure for SEO or content.",
      ]}
      included={[
        "Strategy and site architecture",
        "Modern, on-brand design system",
        "High-performance build with clean code",
        "SEO foundation and analytics setup",
        "Content structure and copy guidance",
        "Launch, handover and training",
      ]}
      outcomes={[
        "A premium site that earns trust instantly.",
        "Clear paths from visitor to enquiry.",
        "Better rankings and stronger conversion.",
        "A foundation you can grow on.",
      ]}
    />
  ),
});