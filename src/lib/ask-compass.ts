import {
  resourceSections,
  type ResourceArticle,
  type ResourceContentBlock,
} from "@/lib/resources";

export type AskCompassReference = {
  title: string;
  to: string;
  sectionTitle: string;
  snippet: string;
};

export type AskCompassReply = {
  content: string;
  suggestions?: string[];
  references?: AskCompassReference[];
};

const TM = "\u2122";

const DEFAULT_SUGGESTIONS = [
  `What is Compass${TM}`,
  "How VULA can help my business",
  "What free resources are available",
  "Can VULA help with automation",
  "What industries VULA works with",
  "How do I start",
] as const;

const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "by",
  "do",
  "for",
  "from",
  "how",
  "i",
  "if",
  "in",
  "is",
  "it",
  "my",
  "of",
  "on",
  "or",
  "the",
  "to",
  "we",
  "what",
  "with",
  "you",
  "your",
]);

export const ASK_COMPASS_SYSTEM_PROMPT = `You are Ask Compass${TM}, the website assistant for VULA Solutions.

Brand role:
- You are a calm, intelligent extension of VULA's consulting approach.
- You help visitors understand where to start, answer simple questions about VULA, explain Compass${TM}, and guide people toward the right next step.
- You are never pushy, gimmicky, or salesy.

Brand principles:
- Be calm, helpful, practical, and confident.
- Keep answers short, clear, and human.
- Reflect VULA's philosophy: Understand first. Recommend second. Build third. Support always.
- Refer to Compass${TM} as the first step whenever appropriate.
- Explain that VULA is a Business Transformation Partner, not a website agency or IT support company.
- Do not invent services, pricing, timelines, guarantees, or promises.
- If something is unclear or outside the website's scope, say so simply and suggest a Compass${TM} conversation.`;

export const ASK_COMPASS_QUICK_REPLIES = [...DEFAULT_SUGGESTIONS];

function normalize(input: string) {
  return input.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

function tokenize(input: string) {
  return normalize(input)
    .split(" ")
    .filter((token) => token.length > 2 && !STOP_WORDS.has(token));
}

function includesAny(text: string, keywords: string[]) {
  return keywords.some((keyword) => text.includes(keyword));
}

function blockToText(block: ResourceContentBlock) {
  if (block.type === "list") return block.items.join(" ");
  return block.text;
}

function buildSnippet(article: ResourceArticle, tokens: string[]) {
  const blocks = article.body ?? [];
  const matchingBlock = blocks.find((block) => {
    const text = normalize(blockToText(block));
    return tokens.some((token) => text.includes(token));
  });

  const base = matchingBlock ? blockToText(matchingBlock) : article.description;
  return base.length > 180 ? `${base.slice(0, 177).trimEnd()}...` : base;
}

function sentenceSafeSnippet(snippet: string) {
  if (!snippet.endsWith("...")) return snippet;

  const withoutEllipsis = snippet.slice(0, -3).trimEnd();
  const lastSentenceEnd = withoutEllipsis.lastIndexOf(".");

  if (lastSentenceEnd >= 0) {
    return withoutEllipsis.slice(0, lastSentenceEnd + 1).trim();
  }

  return withoutEllipsis;
}

type IndexedArticle = {
  article: ResourceArticle;
  sectionSlug: string;
  sectionTitle: string;
  haystack: string;
};

const resourceIndex: IndexedArticle[] = resourceSections.flatMap((section) =>
  section.articles.map((article) => {
    const bodyText = (article.body ?? []).map(blockToText).join(" ");
    return {
      article,
      sectionSlug: section.slug,
      sectionTitle: section.title,
      haystack: normalize(
        `${section.title} ${section.description} ${article.title} ${article.description} ${bodyText}`,
      ),
    } satisfies IndexedArticle;
  }),
);

function findRelevantResources(question: string, limit = 3): AskCompassReference[] {
  const normalizedQuestion = normalize(question);
  const tokens = tokenize(question);

  if (tokens.length === 0) return [];

  const scored = resourceIndex
    .map((entry) => {
      const title = normalize(entry.article.title);
      const description = normalize(entry.article.description);
      const sectionTitle = normalize(entry.sectionTitle);
      const score = tokens.reduce((total, token) => {
        let points = total;
        if (title.includes(token)) points += 5;
        if (description.includes(token)) points += 3;
        if (sectionTitle.includes(token)) points += 2;
        if (entry.haystack.includes(token)) points += 1;
        return points;
      }, 0);

      const phraseBonus =
        normalizedQuestion.length > 10 && entry.haystack.includes(normalizedQuestion) ? 8 : 0;

      return {
        entry,
        score: score + phraseBonus,
      };
    })
    .filter(({ score }) => score >= 4)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored.map(({ entry }) => ({
    title: entry.article.title,
    to: `/resources/${entry.sectionSlug}/${entry.article.slug}`,
    sectionTitle: entry.sectionTitle,
    snippet: buildSnippet(entry.article, tokens),
  }));
}

type IndexedTool = {
  title: string;
  slug: string;
  description: string;
  haystack: string;
};

const FREE_TOOLS: IndexedTool[] = [
  {
    title: "Business Discovery Checklist",
    slug: "business-discovery-checklist",
    description: "Work through a structured discovery of your business across strategy, people, process, technology and growth. Ideal starting point before a Compass™ session.",
  },
  {
    title: "The SA SME Pricing Guide",
    slug: "sme-pricing-guide",
    description: "Honest 2026 Rand price ranges for websites, automation, AI and SEO in South Africa, plus the red flags to avoid and the questions to ask any provider before signing.",
  },
  {
    title: "AI Readiness Assessment",
    slug: "ai-readiness-assessment",
    description: "Score your business across data quality, team readiness, process maturity and infrastructure to understand where AI can realistically help you.",
  },
  {
    title: "Process Improvement Scorecard",
    slug: "process-improvement-scorecard",
    description: "Map and rate your current business processes to identify bottlenecks, manual work and improvement opportunities.",
  },
  {
    title: "Digital Transformation Roadmap",
    slug: "digital-transformation-roadmap",
    description: "Plan your digital journey across five stages: foundation, presence, automation, intelligence and optimisation.",
  },
  {
    title: "Business Systems Audit",
    slug: "business-systems-audit",
    description: "Audit every tool and system in your business — from accounting to CRM — to find gaps, overlaps and cost savings.",
  },
  {
    title: "Software Buying Checklist",
    slug: "software-buying-checklist",
    description: "A structured checklist to evaluate any software purchase — covering requirements, budget, security, integration and vendor risk.",
  },
  {
    title: "Vendor Evaluation Matrix",
    slug: "vendor-evaluation-matrix",
    description: "Compare up to four vendors on cost, capability, support, integration and risk using a weighted scoring system.",
  },
  {
    title: "Project Risk Checklist",
    slug: "project-risk-checklist",
    description: "Identify, rate and plan responses to project risks before work begins. Covers scope, budget, resource, technical and stakeholder risk.",
  },
  {
    title: "Meeting Agenda Templates",
    slug: "meeting-agenda-templates",
    description: "Ready-to-use agenda templates for strategy reviews, project kick-offs, retrospectives and client check-ins.",
  },
  {
    title: "Requirements Workshop Guide",
    slug: "requirements-workshop-guide",
    description: "Structured facilitation guide and templates for running a requirements gathering workshop with your team or clients.",
  },
].map((t) => ({
  ...t,
  haystack: normalize(`${t.title} ${t.description}`),
}));

function findRelevantTools(question: string, limit = 2): AskCompassReference[] {
  const tokens = tokenize(question);
  const normalizedQuestion = normalize(question);

  if (tokens.length === 0) return [];

  const scored = FREE_TOOLS.map((tool) => {
    const title = normalize(tool.title);
    const description = normalize(tool.description);
    const score = tokens.reduce((total, token) => {
      let points = total;
      if (title.includes(token)) points += 5;
      if (description.includes(token)) points += 3;
      if (tool.haystack.includes(token)) points += 1;
      return points;
    }, 0);
    const phraseBonus =
      normalizedQuestion.length > 8 && tool.haystack.includes(normalizedQuestion) ? 8 : 0;
    return { tool, score: score + phraseBonus };
  })
    .filter(({ score }) => score >= 3)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored.map(({ tool }) => ({
    title: tool.title,
    to: `/tools/${tool.slug}`,
    sectionTitle: "Free Business Resource",
    snippet: tool.description,
  }));
}

function blendReferenceIntoContent(content: string, references: AskCompassReference[]) {
  const primary = references[0];
  if (!primary) return content;

  const groundedSnippet = sentenceSafeSnippet(primary.snippet);
  return `${content} A useful VULA perspective here is: ${groundedSnippet}`;
}

function withReferences(reply: AskCompassReply, question: string) {
  const articleRefs = findRelevantResources(question);
  const toolRefs = findRelevantTools(question);

  const seen = new Set<string>();
  const references = [...articleRefs, ...toolRefs].filter((ref) => {
    if (seen.has(ref.to)) return false;
    seen.add(ref.to);
    return true;
  }).slice(0, 4);

  if (!references.length) return reply;

  return {
    ...reply,
    content: blendReferenceIntoContent(reply.content, references),
    references,
  } satisfies AskCompassReply;
}

export function getAskCompassWelcome(): AskCompassReply {
  return {
    content:
      `Welcome to Ask Compass${TM}. I can help you understand where to start, explain Compass${TM}, and point you toward the right next step.`,
    suggestions: [...DEFAULT_SUGGESTIONS],
  };
}

export function getAskCompassReply(question: string): AskCompassReply {
  const text = normalize(question);

  if (!text) {
    return {
      content: "Ask me a question, or choose one of the suggested starting points below.",
      suggestions: [...DEFAULT_SUGGESTIONS],
    };
  }

  // Free resources / tools
  if (includesAny(text, ["free", "resource", "resources", "free tool", "free resource", "template", "checklist", "worksheet", "scorecard", "assessment", "what tools do you offer", "what resources"])) {
    const toolRefs = findRelevantTools(question, 3);
    const fallbackRefs: AskCompassReference[] = FREE_TOOLS.slice(0, 3).map((t) => ({
      title: t.title,
      to: `/tools/${t.slug}`,
      sectionTitle: "Free Business Resource",
      snippet: t.description,
    }));
    return {
      content: `VULA offers 10 free business tools — no sign-up needed. They cover AI readiness, process improvement, digital transformation, software evaluation, vendor selection, project risk, meeting agendas and more. Open any from the Resources page.`,
      suggestions: [`What is Compass${TM}`, "Can VULA help with automation", "How do I start"],
      references: toolRefs.length > 0 ? toolRefs : fallbackRefs,
    };
  }

  // Meeting agendas and notes
  if (includesAny(text, ["meeting", "agenda", "meeting notes", "meeting template", "kick-off", "kick off", "retrospective"])) {
    return withReferences(
      {
        content: `Running structured meetings makes a real difference. VULA has a free Meeting Agenda Templates tool covering strategy reviews, project kick-offs, client check-ins and retrospectives. You can open and fill it in directly — no download needed.`,
        suggestions: ["What free resources are available", `What is Compass${TM}`, "How do I start"],
      },
      question,
    );
  }

  // Vendor / supplier evaluation
  if (includesAny(text, ["vendor", "supplier", "evaluate vendor", "choose vendor", "compare vendors", "vendor risk"])) {
    return withReferences(
      {
        content: `Choosing the right vendor is a structured decision, not a gut call. VULA's free Vendor Evaluation Matrix lets you score up to four suppliers on cost, capability, support, integration and risk side-by-side.`,
        suggestions: ["What free resources are available", `What is Compass${TM}`, "How do I start"],
      },
      question,
    );
  }

  // Software buying
  if (includesAny(text, ["buying software", "buy software", "which software", "software decision", "software purchase", "evaluate software", "choose software"])) {
    return withReferences(
      {
        content: `VULA has a free Software Buying Checklist that walks you through requirements, budget, security, integration and vendor risk before you commit. Worth running through before any significant software purchase.`,
        suggestions: ["What free resources are available", `What is Compass${TM}`, "How do I start"],
      },
      question,
    );
  }

  // Project risk
  if (includesAny(text, ["project risk", "risk register", "risk management", "risks", "risk assessment"])) {
    return withReferences(
      {
        content: `VULA's free Project Risk Checklist helps you identify, rate and plan responses to risks before a project starts — covering scope, budget, resource, technical and stakeholder risk.`,
        suggestions: ["What free resources are available", `What is Compass${TM}`, "How do I start"],
      },
      question,
    );
  }

  // Requirements gathering / workshops
  if (includesAny(text, ["requirements", "requirements gathering", "requirements workshop", "specification", "scope document"])) {
    return withReferences(
      {
        content: `VULA has a free Requirements Workshop Guide — a structured facilitation template for gathering requirements from your team or clients before any build or change project.`,
        suggestions: ["What free resources are available", `What is Compass${TM}`, "How do I start"],
      },
      question,
    );
  }

  // Business systems / audit
  if (includesAny(text, ["systems audit", "business systems", "audit my tools", "tool audit", "software audit", "crm audit"])) {
    return withReferences(
      {
        content: `VULA's free Business Systems Audit maps every tool and system across your business — accounting, CRM, comms, project management — to surface gaps, overlaps and cost savings.`,
        suggestions: ["What free resources are available", `What is Compass${TM}`, "How do I start"],
      },
      question,
    );
  }

  // Platform / what do you build on (before generic website block)
  if (includesAny(text, ["platform", "wordpress", "webflow", "shopify", "cms", "what do you build", "which platform", "technology stack"])) {
    return withReferences(
      {
        content: `VULA recommends and builds on modern, performance-first platforms suited to each business. The right choice is decided during the Launch${TM} discovery phase, based on your goals, content needs and how your team will manage the site going forward.`,
        suggestions: [`What is Compass${TM}`, "How do I start", "How VULA can help my business"],
      },
      question,
    );
  }

  // Handover / training / what happens after the build
  if (includesAny(text, ["handover", "after launch", "after the build", "goes live", "after the site", "maintain the site", "what happens after"])) {
    return withReferences(
      {
        content: `After a Launch${TM} project, you receive a full handover and training session so your team can make basic updates without depending on VULA. Ongoing support and continuous improvement is available through Partner${TM}.`,
        suggestions: [`What is Compass${TM}`, "How do I start", "How VULA can help my business"],
      },
      question,
    );
  }

  // What to prepare before starting
  if (includesAny(text, ["what do i need to prepare", "what should i prepare", "what to prepare", "what to bring", "what to have ready", "brand assets"])) {
    return withReferences(
      {
        content: `Very little at the start. VULA guides you through exactly what is needed. For a Launch${TM} project that is typically brand assets, existing content and access to relevant tools or hosting. For a Compass${TM} session, just your time and an honest picture of where the business is right now.`,
        suggestions: [`What is Compass${TM}`, "How do I start", "How VULA can help my business"],
      },
      question,
    );
  }

  // Cancellation / minimum commitment (before pricing block)
  if (includesAny(text, ["cancel", "minimum commitment", "minimum term", "lock in", "how long do i have to commit", "exit partner", "notice period", "can i leave"])) {
    return {
      content: `Partner${TM} is structured around quarterly planning cycles with a minimum three-month engagement. At the end of each quarter you can choose not to continue. VULA does not lock clients in beyond the agreed term.`,
      suggestions: [`What is Compass${TM}`, "How do I start", "How VULA can help my business"],
    };
  }

  // Partner / ongoing retainer / what a typical month looks like
  if (includesAny(text, ["partner", "ongoing", "retainer", "typical month", "what happens monthly", "long term support", "monthly support", "continuous improvement"])) {
    return withReferences(
      {
        content: `Partner${TM} is VULA's ongoing support and strategic partnership. Work is structured around quarterly planning cycles: each month covers delivery against your roadmap, priority support for any issues and regular check-ins to adjust if priorities shift. There is no long-term lock-in beyond the quarterly commitment.`,
        suggestions: [`What is Compass${TM}`, "How do I start", "How VULA can help my business"],
      },
      question,
    );
  }

  // Compass / where to start
  if (includesAny(text, ["compass", "where do i start", "start", "first step", "not sure", "discovery"])) {
    return withReferences(
      {
        content: `Compass${TM} is VULA's signature business discovery and strategy experience. It helps clarify where your business is now, where the opportunities are, and what should happen next. If you are not sure where to begin, Compass${TM} is the right first step.`,
        suggestions: ["How do I start", "How VULA can help my business", "Do I need a website"],
      },
      question,
    );
  }

  // VULA / business transformation
  if (includesAny(text, ["vula", "what do you do", "how can vula help", "help my business", "business transformation"])) {
    return withReferences(
      {
        content: "VULA is a Business Transformation Partner. We help businesses with strategy, websites, AI, automation, and growth, but we usually begin by understanding the business first rather than jumping straight to a tool or build.",
        suggestions: [`What is Compass${TM}`, "Can VULA help with automation", "What industries VULA works with"],
      },
      question,
    );
  }

  // Website / online presence
  if (includesAny(text, ["website", "site", "redesign", "web", "online presence"])) {
    return withReferences(
      {
        content: `Possibly, but that depends on what your business needs the website to do. Sometimes the right answer is a stronger website. Sometimes it is clearer messaging, better process, or a different digital priority. A good place to start is Compass${TM}.`,
        suggestions: [`What is Compass${TM}`, "How do I start", "How VULA can help my business"],
      },
      question,
    );
  }

  // SEO / search rankings / Google visibility
  if (includesAny(text, ["seo", "search engine", "rank", "rankings", "google ranking", "organic", "found on google", "local listing", "google business"])) {
    return withReferences(
      {
        content: `Growth${TM} is VULA's SEO and digital growth service. It covers keyword strategy, on-page improvements, Google Business Profile optimisation and content production. Most clients begin to see meaningful movement in rankings within three to six months.`,
        suggestions: [`What is Compass${TM}`, "How is this different from ads", "How do I start"],
      },
      question,
    );
  }

  // Ads vs organic / paid vs SEO
  if (includesAny(text, ["ads", "google ads", "paid ads", "advertising", "ppc", "adwords", "paid search"])) {
    return withReferences(
      {
        content: `Ads stop the moment you stop paying. Growth${TM} builds organic visibility that compounds over time: rankings, content and local presence that keep working without ongoing spend. VULA focuses on growth that does not depend on a monthly ad budget.`,
        suggestions: [`What is Compass${TM}`, "How do I start", "How VULA can help my business"],
      },
      question,
    );
  }

  // Content writing / who writes the content
  if (includesAny(text, ["write content", "content writing", "who writes", "copywriting", "blog", "articles", "content production"])) {
    return withReferences(
      {
        content: `Yes. Content production is part of the Growth${TM} programme: researched, written and optimised around real search opportunities in your market. VULA does not hand over a brief and leave the writing to you.`,
        suggestions: [`What is Compass${TM}`, "How do I start", "How VULA can help my business"],
      },
      question,
    );
  }

  // Technical requirements / do we need to be technical
  if (includesAny(text, ["technical", "non-technical", "coding", "developer", "need to know code", "need to be technical", "tech skills"])) {
    return withReferences(
      {
        content: `No. VULA handles the build and documents everything clearly. Your team just needs to use the tools, not maintain them. Whether it is a website, automation or AI enablement, the goal is to make things simpler for the people in the business.`,
        suggestions: [`What is Compass${TM}`, "Can VULA help with automation", "How do I start"],
      },
      question,
    );
  }

  // What tools do you work with
  if (includesAny(text, ["what tools", "which tools", "microsoft", "google workspace", "crm", "xero", "accounting software", "which software", "existing tools", "work with our tools"])) {
    return withReferences(
      {
        content: `VULA works across widely used business tools: Microsoft 365, Google Workspace, CRMs, accounting platforms and industry-specific software. The right tools for your setup are assessed as part of Flow${TM} during the audit phase.`,
        suggestions: [`What is Compass${TM}`, "Can VULA help with automation", "How do I start"],
      },
      question,
    );
  }

  // Automation / workflow / Flow
  if (includesAny(text, ["automation", "workflow", "process", "manual", "repetitive", "flow"])) {
    return withReferences(
      {
        content: `Yes. VULA helps identify repetitive work and turn it into reliable workflows through Flow${TM}. We would usually begin by understanding the process first, then recommend the right level of automation.`,
        suggestions: [`What is Compass${TM}`, "How VULA can help my business", "How do I start"],
      },
      question,
    );
  }

  // Data privacy / client data security (before AI block)
  if (includesAny(text, ["data privacy", "privacy", "data protection", "client data", "data security", "gdpr", "sensitive data", "confidential"])) {
    return withReferences(
      {
        content: `VULA takes data privacy seriously. Every AI or automation use case is assessed for data risk before implementation. Guidelines and governance are built into programmes like Accelerate${TM}, and VULA will not recommend tools that put client data at risk.`,
        suggestions: [`What is Compass${TM}`, "How do I start", "How VULA can help my business"],
      },
      question,
    );
  }

  // Team resistance / change management / AI adoption
  if (includesAny(text, ["resistant", "resistance", "afraid of ai", "worried about ai", "skeptical", "sceptical", "not ready for ai", "team won't use", "adoption", "change management"])) {
    return withReferences(
      {
        content: `That is common, and exactly why enablement is central to the Accelerate${TM} programme. VULA works with your team, not just your tools, building confidence through practical, relevant use cases rather than abstract training.`,
        suggestions: [`What is Compass${TM}`, "How VULA can help my business", "How do I start"],
      },
      question,
    );
  }

  // AI / Accelerate
  if (includesAny(text, ["ai", "artificial intelligence", "accelerate"])) {
    return withReferences(
      {
        content: `Yes. VULA helps businesses adopt AI in a practical way through Accelerate${TM}. The focus is on real use cases, team enablement, and choosing tools that fit the way your business actually works.`,
        suggestions: [`What is Compass${TM}`, "Can VULA help with automation", "How do I start"],
      },
      question,
    );
  }

  // Industries / sectors
  if (includesAny(text, ["industry", "industries", "sector", "work with"])) {
    return withReferences(
      {
        content: "VULA works across professional services, financial services, engineering, construction, healthcare, and trades and specialist businesses. The common thread is helping growing organisations work smarter with clarity and confidence.",
        suggestions: ["How VULA can help my business", `What is Compass${TM}`, "How do I start"],
      },
      question,
    );
  }

  // Pricing
  if (includesAny(text, ["price", "pricing", "cost", "quote", "how much", "fees"])) {
    return {
      content: `I cannot give pricing from the website alone, because the right recommendation depends on your business, goals, and current setup. VULA would usually start with Compass${TM} so the next step is clear before any scope or quote is discussed.`,
      suggestions: [`What is Compass${TM}`, "How do I start", "How VULA can help my business"],
    };
  }

  // IT support
  if (includesAny(text, ["it support", "support company", "managed services", "fix my laptop", "tech support"])) {
    return {
      content: "VULA is not positioned as an IT support company. The focus is business transformation through strategy, websites, AI, automation, and growth, with support built around improvement rather than generic tech support.",
      suggestions: ["How VULA can help my business", `What is Compass${TM}`, "How do I start"],
    };
  }

  // Contact / book
  if (includesAny(text, ["contact", "book", "talk", "speak", "meeting", "start working", "start with compass", "how do i start"])) {
    return withReferences(
      {
        content: `The clearest next step is to start with Compass${TM}. That gives VULA a chance to understand your business properly before recommending what to do next.`,
        suggestions: [`What is Compass${TM}`, "How VULA can help my business", "Do I need a website"],
      },
      question,
    );
  }

  // Case studies / proof / examples
  if (includesAny(text, ["case study", "examples", "proof", "experience"])) {
    return withReferences(
      {
        content: `VULA's approach is built around practical transformation work across strategy, process, technology, and growth. If you want to explore what that could look like in your context, Compass${TM} is the best place to begin.`,
        suggestions: ["How VULA can help my business", "What industries VULA works with", "How do I start"],
      },
      question,
    );
  }

  return withReferences(
    {
      content: `I am not fully sure from the website alone, and I would rather not guess. If you are weighing a business, website, AI, or automation decision, Compass${TM} is usually the right place to start because it brings clarity before recommendations.`,
      suggestions: [...DEFAULT_SUGGESTIONS.slice(0, 3)],
    },
    question,
  );
}
