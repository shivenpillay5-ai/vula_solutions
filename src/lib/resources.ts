export type ResourceArticle = {
  slug: string;
  tag: "Guide" | "Checklist" | "Playbook" | "Insight";
  title: string;
  description: string;
};

export type ResourceSection = {
  slug: string;
  title: string;
  description: string;
  articles: ResourceArticle[];
};

export const resourceSections: ResourceSection[] = [
  {
    slug: "getting-started",
    title: "Getting Started",
    description:
      "Foundational reads for business owners who want a clearer, more confident starting point.",
    articles: [
      {
        slug: "business-discovery-basics",
        tag: "Guide",
        title: "How to start with business discovery",
        description:
          "A practical first step for understanding what your business really needs before making changes.",
      },
      {
        slug: "clarify-your-priorities",
        tag: "Checklist",
        title: "Clarifying your top business priorities",
        description:
          "A simple checklist to help you focus on what matters most in the next 90 days.",
      },
      {
        slug: "first-roadmap",
        tag: "Playbook",
        title: "Building your first transformation roadmap",
        description:
          "A lightweight way to map the work, owners and timing behind your next phase of growth.",
      },
    ],
  },
  {
    slug: "strategy-and-leadership",
    title: "Strategy and Leadership",
    description:
      "Resources for sharpening direction, decision-making and leadership rhythm.",
    articles: [
      {
        slug: "strategy-without-complexity",
        tag: "Guide",
        title: "Strategy without unnecessary complexity",
        description:
          "A grounded way to set direction without disappearing into jargon or big-company frameworks.",
      },
      {
        slug: "leading-through-change",
        tag: "Insight",
        title: "Leading a team through uncertain change",
        description:
          "How to create clarity and trust when priorities, roles or systems are shifting.",
      },
      {
        slug: "decision-making-rhythm",
        tag: "Checklist",
        title: "A weekly rhythm for better leadership decisions",
        description:
          "Simple habits that help founders and leaders make better calls with less noise.",
      },
    ],
  },
  {
    slug: "change-management",
    title: "Change Management",
    description:
      "Practical guidance for helping people adopt new ways of working with less friction.",
    articles: [
      {
        slug: "introducing-change-well",
        tag: "Guide",
        title: "How to introduce change without losing momentum",
        description:
          "A practical structure for rolling out changes in a way people can actually follow.",
      },
      {
        slug: "stakeholder-readiness",
        tag: "Checklist",
        title: "Stakeholder readiness before a rollout",
        description:
          "Questions to ask before you launch a new initiative, system or process.",
      },
      {
        slug: "adoption-over-announcement",
        tag: "Insight",
        title: "Why adoption matters more than announcement",
        description:
          "The difference between communicating change and actually embedding it.",
      },
    ],
  },
  {
    slug: "process-improvement",
    title: "Process Improvement",
    description:
      "Tactics for removing friction, improving consistency and making work easier to execute.",
    articles: [
      {
        slug: "spotting-process-bottlenecks",
        tag: "Guide",
        title: "How to spot process bottlenecks early",
        description:
          "A practical method for identifying the tasks, approvals and handoffs that slow everything down.",
      },
      {
        slug: "documenting-critical-workflows",
        tag: "Checklist",
        title: "Documenting your most critical workflows",
        description:
          "A useful checklist for capturing how work really happens across your business.",
      },
      {
        slug: "small-fixes-big-impact",
        tag: "Insight",
        title: "Why small process fixes can create outsized impact",
        description:
          "Where minor operational improvements often unlock the biggest relief.",
      },
    ],
  },
  {
    slug: "artificial-intelligence",
    title: "Artificial Intelligence",
    description:
      "Clear, business-friendly guidance for applying AI in useful and realistic ways.",
    articles: [
      {
        slug: "ai-for-smes",
        tag: "Playbook",
        title: "AI for SMEs, without the hype",
        description:
          "A straightforward view of where AI helps, where it does not, and how to start responsibly.",
      },
      {
        slug: "ai-readiness-check",
        tag: "Checklist",
        title: "Are you ready to use AI in the business?",
        description:
          "A readiness check covering data, processes, ownership and expected value.",
      },
      {
        slug: "human-plus-ai-workflows",
        tag: "Guide",
        title: "Designing human-plus-AI workflows",
        description:
          "How to combine automation and human judgment without creating confusion or risk.",
      },
    ],
  },
  {
    slug: "software-and-technology",
    title: "Software and Technology",
    description:
      "Advice for choosing, improving and using technology as a real business enabler.",
    articles: [
      {
        slug: "choosing-the-right-stack",
        tag: "Guide",
        title: "Choosing technology that fits your business",
        description:
          "What to look for when evaluating software, websites, platforms and integrations.",
      },
      {
        slug: "website-as-business-tool",
        tag: "Insight",
        title: "The website as a business tool",
        description:
          "How to think beyond aesthetics and use your website to support real commercial goals.",
      },
      {
        slug: "tech-partner-checklist",
        tag: "Checklist",
        title: "Questions to ask a technology partner",
        description:
          "A better checklist for selecting support beyond price and surface-level portfolio work.",
      },
    ],
  },
  {
    slug: "business-growth",
    title: "Business Growth",
    description:
      "Ideas for creating traction, strengthening positioning and supporting sustainable growth.",
    articles: [
      {
        slug: "growth-levers",
        tag: "Guide",
        title: "Finding your most practical growth levers",
        description:
          "A focused look at where growth usually comes from for service-led businesses.",
      },
      {
        slug: "lead-generation-basics",
        tag: "Checklist",
        title: "The essentials of a healthier lead pipeline",
        description:
          "A quick checklist to help you assess whether your current marketing is creating real opportunities.",
      },
      {
        slug: "scaling-with-clarity",
        tag: "Insight",
        title: "Growing without creating operational chaos",
        description:
          "Why structure, consistency and simple systems matter as much as ambition.",
      },
    ],
  },
];

export function getResourceSectionBySlug(slug: string) {
  return resourceSections.find((section) => section.slug === slug);
}
