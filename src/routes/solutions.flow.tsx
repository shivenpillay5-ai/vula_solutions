import { createFileRoute } from "@tanstack/react-router";
import { Workflow } from "lucide-react";
import { SolutionPage } from "@/components/site/SolutionPage";

export const Route = createFileRoute("/solutions/flow")({
  head: () => ({
    meta: [
      { title: "Flow™ — Work Smarter | Vula Solutions" },
      { name: "description", content: "Automation that removes repetitive work so your team can focus on the work that matters." },
      { property: "og:title", content: "Flow™ — Work Smarter" },
      { property: "og:url", content: "/solutions/flow" },
    ],
    links: [{ rel: "canonical", href: "/solutions/flow" }],
  }),
  component: () => (
    <SolutionPage
      name="Flow™"
      tagline="Work Smarter"
      icon={Workflow}
      hero="Remove the busywork. Keep the business."
      intro="Flow™ is our automation service. We identify the repetitive work slowing your team down and replace it with reliable, well-designed workflows."
      process={[
        { n: "01", t: "Audit", b: "We map your current workflows and identify the highest-value automation opportunities." },
        { n: "02", t: "Design", b: "Each automation is designed around your tools and the way your team actually works." },
        { n: "03", t: "Build", b: "We implement, test and refine until every workflow runs without you thinking about it." },
        { n: "04", t: "Handover", b: "Your team is trained, everything is documented and you stay in full control." },
      ]}
      faq={[
        { q: "What tools do you work with?", a: "We work across the most widely used business tools: Microsoft 365, Google Workspace, CRMs, accounting platforms and industry-specific software. We'll assess your stack during the audit phase." },
        { q: "How long does a Flow™ project take?", a: "Most automation projects are scoped and delivered within two to six weeks. More complex implementations take longer. We'll be clear upfront." },
        { q: "Do we need to be technical?", a: "No. We handle the build and document everything clearly. Your team just needs to use the tools, not maintain them." },
        { q: "What if our processes change after implementation?", a: "Automations can be updated as your business evolves. We document everything so changes are straightforward, whether we make them or your team does." },
      ]}
      who={[
        "Teams drowning in manual admin.",
        "Businesses juggling disconnected tools.",
        "Operations leaders looking for real efficiency gains.",
      ]}
      problems={[
        "Repetitive data entry and copy-paste work.",
        "Slow, inconsistent internal processes.",
        "Tools that don't talk to each other.",
        "Errors caused by manual handovers.",
      ]}
      included={[
        "Workflow discovery and mapping",
        "Tool selection and integration",
        "Automation design and implementation",
        "Documentation and team training",
        "Monitoring and iteration",
      ]}
      outcomes={[
        "Hours returned to your team every week.",
        "Fewer errors and cleaner data.",
        "Faster response times to clients.",
        "A calmer, more scalable operation.",
      ]}
    />
  ),
});