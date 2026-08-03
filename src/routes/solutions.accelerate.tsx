import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { SolutionPage } from "@/components/site/SolutionPage";

export const Route = createFileRoute("/solutions/accelerate")({
  head: () => ({
    meta: [
      { title: "Accelerate™ — Unlock Your Potential | Vula Solutions" },
      { name: "description", content: "Practical AI adoption and team enablement. Real use cases, adopted well, measured properly." },
      { property: "og:title", content: "Accelerate™ — Unlock Your Potential" },
      { property: "og:url", content: "/solutions/accelerate" },
    ],
    links: [{ rel: "canonical", href: "/solutions/accelerate" }],
  }),
  component: () => (
    <SolutionPage
      name="Accelerate™"
      tagline="Unlock Your Potential"
      icon={Sparkles}
      hero="AI that actually helps your business."
      intro="Accelerate™ is our AI adoption and enablement programme. We help you identify real use cases, choose the right tools and embed AI into how your team works — safely and practically."
      who={[
        "Owners curious about AI but unsure where to start.",
        "Teams experimenting with AI tools without a strategy.",
        "Businesses ready to embed AI into daily operations.",
      ]}
      problems={[
        "AI hype without clear ROI.",
        "Scattered, unmanaged tool usage.",
        "Concerns about data, privacy and quality.",
        "Slow adoption across the team.",
      ]}
      included={[
        "AI opportunity assessment",
        "Use case design and prioritisation",
        "Tool selection and setup",
        "Team training and enablement",
        "Guidelines, guardrails and governance",
      ]}
      outcomes={[
        "Practical AI use cases with measurable value.",
        "A confident, capable team.",
        "Safer, more consistent AI use.",
        "A clear path to further adoption.",
      ]}
    />
  ),
});