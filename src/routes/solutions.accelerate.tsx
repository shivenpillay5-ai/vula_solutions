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
      intro="Accelerate™ is our AI adoption and enablement programme. We help you identify real use cases, choose the right tools and embed AI into how your team works, safely and practically."
      process={[
        { n: "01", t: "Assessment", b: "We identify where AI can add real, measurable value in your business, and where it can't yet." },
        { n: "02", t: "Use case design", b: "Prioritise the right applications for your team, with clear success criteria for each." },
        { n: "03", t: "Enablement", b: "Set up tools, train your team and put the right guidelines and guardrails in place." },
        { n: "04", t: "Measure", b: "Track adoption and value, iterate on what's working and plan the next stage." },
      ]}
      faq={[
        { q: "We're concerned about data privacy. How do you handle that?", a: "Every use case is assessed for data risk before implementation. We build guidelines and governance into the programme and won't recommend tools that put your client data at risk." },
        { q: "Do we need existing AI tools?", a: "No. We assess what's right for your business and recommend the right tools as part of the programme. You don't need to have started anything yet." },
        { q: "How long does Accelerate™ take?", a: "The initial programme typically runs over four to eight weeks. Ongoing enablement and iteration can continue through Partner™." },
        { q: "What if our team is resistant to AI?", a: "That's common, and exactly why enablement is central to the programme. We work with your team, not just your tools, building confidence through relevant, practical use cases." },
      ]}
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