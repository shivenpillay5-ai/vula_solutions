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
    .filter(({ score }) => score >= 8)
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
    title: "Business Tech Glossary",
    slug: "business-tech-glossary",
    description: "Plain-English definitions of over 40 common business technology terms: cloud, AI, automation, SEO, cybersecurity and more. Written for business owners, not developers.",
  },
  {
    title: "POPIA Basics Checklist",
    slug: "popia-basics-checklist",
    description: "A plain-English POPIA compliance checklist for South African SMEs. Nine practical areas: appointing an information officer, mapping personal data, lawful basis for processing, privacy notice, data subject rights, security, operator agreements, breach response, and retention.",
  },
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
    title: "Cost of Doing Nothing Calculator",
    slug: "cost-of-doing-nothing-calculator",
    description: "An interactive calculator that turns the hours a team loses to manual, repetitive admin into a Rand cost per year, and shows what automation could realistically recover.",
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
    description: "Audit every tool and system in your business, from accounting to CRM, to find gaps, overlaps and cost savings.",
  },
  {
    title: "Software Buying Checklist",
    slug: "software-buying-checklist",
    description: "A structured checklist to evaluate any software purchase, covering requirements, budget, security, integration and vendor risk.",
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
  // Only blend an article snippet — tool descriptions duplicate what the card already shows
  const primary = references.find(r => r.sectionTitle !== "Free Business Resource");
  if (!primary) return content;

  const groundedSnippet = sentenceSafeSnippet(primary.snippet);
  return `${content} A useful VULA perspective here is: ${groundedSnippet}`;
}

function withReferences(reply: AskCompassReply, question: string) {
  const articleRefs = findRelevantResources(question, 2);
  const toolRefs = findRelevantTools(question, 2);

  const seen = new Set<string>();
  // Lead with the top tool if one exists, then articles, then second tool
  const ordered = [toolRefs[0], ...articleRefs, toolRefs[1]].filter((r): r is AskCompassReference => Boolean(r));
  const references = ordered.filter((ref) => {
    if (seen.has(ref.to)) return false;
    seen.add(ref.to);
    return true;
  }).slice(0, 3);

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
      `Welcome to Ask VULA. I can help you understand where VULA fits your business, explain your options, and point you toward the right next step.`,
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
      content: `There is quite a bit to choose from here. VULA has 14 free business tools, no account needed. They cover POPIA compliance, AI readiness, process improvement, digital transformation, software evaluation, vendor selection, project risk, meeting agendas and more. You can open any of them from the Resources page.`,
      suggestions: [`What is Compass${TM}`, "Can VULA help with automation", "How do I start"],
      references: toolRefs.length > 0 ? toolRefs : fallbackRefs,
    };
  }

  // Meeting agendas and notes
  if (includesAny(text, ["meeting", "agenda", "meeting notes", "meeting template", "kick-off", "kick off", "retrospective"])) {
    return withReferences(
      {
        content: `Running structured meetings really does make a difference. VULA has a free Meeting Agenda Templates tool covering strategy reviews, project kick-offs, client check-ins and retrospectives. You can open and fill it in directly, no download needed.`,
        suggestions: ["What free resources are available", `What is Compass${TM}`, "How do I start"],
      },
      question,
    );
  }

  // Vendor / supplier evaluation
  if (includesAny(text, ["vendor", "supplier", "evaluate vendor", "choose vendor", "compare vendors", "vendor risk"])) {
    return withReferences(
      {
        content: `That is a smart thing to get right. Choosing the wrong vendor is costly to undo. VULA's free Vendor Evaluation Matrix lets you score up to four suppliers on cost, capability, support, integration and risk, side by side. Worth running through before you commit.`,
        suggestions: ["What free resources are available", `What is Compass${TM}`, "How do I start"],
      },
      question,
    );
  }

  // Software buying
  if (includesAny(text, ["buying software", "buy software", "which software", "software decision", "software purchase", "evaluate software", "choose software"])) {
    return withReferences(
      {
        content: `Glad you are thinking it through before signing anything. VULA has a free Software Buying Checklist that walks you through requirements, budget, security, integration and vendor risk. Worth going through before any significant purchase.`,
        suggestions: ["What free resources are available", `What is Compass${TM}`, "How do I start"],
      },
      question,
    );
  }

  // Project risk
  if (includesAny(text, ["project risk", "risk register", "risk management", "risks", "risk assessment"])) {
    return withReferences(
      {
        content: `Smart to think about this before a project kicks off. VULA's free Project Risk Checklist helps you identify, rate and plan responses to risks before a project starts. It covers scope, budget, resource, technical and stakeholder risk. Simple to work through.`,
        suggestions: ["What free resources are available", `What is Compass${TM}`, "How do I start"],
      },
      question,
    );
  }

  // Requirements gathering / workshops
  if (includesAny(text, ["requirements", "requirements gathering", "requirements workshop", "specification", "scope document"])) {
    return withReferences(
      {
        content: `Getting requirements right at the start saves a lot of pain later. VULA has a free Requirements Workshop Guide: a structured facilitation template for gathering what is needed from your team or clients before any build or change project.`,
        suggestions: ["What free resources are available", `What is Compass${TM}`, "How do I start"],
      },
      question,
    );
  }

  // Business systems / audit
  if (includesAny(text, ["systems audit", "business systems", "audit my tools", "tool audit", "software audit", "crm audit"])) {
    return withReferences(
      {
        content: `You might be surprised what comes up. VULA's free Business Systems Audit maps every tool and system across your business, covering accounting, CRM, comms and project management, to surface gaps, overlaps and cost savings. It often surprises people what they find.`,
        suggestions: ["What free resources are available", `What is Compass${TM}`, "How do I start"],
      },
      question,
    );
  }

  // Platform / what do you build on (before generic website block)
  if (includesAny(text, ["platform", "wordpress", "webflow", "shopify", "cms", "what do you build", "which platform", "technology stack"])) {
    return withReferences(
      {
        content: `It depends on your goals, and that is intentional. VULA recommends and builds on modern, performance-first platforms suited to each business. The right choice is worked out during the Launch${TM} discovery phase, based on what your site needs to do and how your team will manage it.`,
        suggestions: [`What is Compass${TM}`, "How do I start", "How VULA can help my business"],
      },
      question,
    );
  }

  // Handover / training / what happens after the build
  if (includesAny(text, ["handover", "after launch", "after the build", "goes live", "after the site", "maintain the site", "what happens after"])) {
    return withReferences(
      {
        content: `You will not be left to figure it out alone. After a Launch${TM} project, you get a full handover and training session so your team can make basic updates without depending on VULA. Ongoing support and continuous improvement is available through Partner${TM} if you want to keep growing.`,
        suggestions: [`What is Compass${TM}`, "How do I start", "How VULA can help my business"],
      },
      question,
    );
  }

  // What to prepare before starting
  if (includesAny(text, ["what do i need to prepare", "what should i prepare", "what to prepare", "what to bring", "what to have ready", "brand assets"])) {
    return withReferences(
      {
        content: `Very little at the start, which is intentional. VULA guides you through exactly what is needed. For a Launch${TM} project, that is typically brand assets, existing content and access to relevant tools or hosting. For a Compass${TM} session, just your time and an honest picture of where the business is right now.`,
        suggestions: [`What is Compass${TM}`, "How do I start", "How VULA can help my business"],
      },
      question,
    );
  }

  // Cancellation / minimum commitment (before pricing block)
  if (includesAny(text, ["cancel", "minimum commitment", "minimum term", "lock in", "how long do i have to commit", "exit partner", "notice period", "can i leave"])) {
    return {
      content: `No long commitment required beyond the agreed term. Partner${TM} runs on quarterly planning cycles with a minimum three-month engagement. At the end of each quarter you can choose not to continue. VULA does not lock clients in.`,
      suggestions: [`What is Compass${TM}`, "How do I start", "How VULA can help my business"],
    };
  }

  // Partner / ongoing retainer / what a typical month looks like
  if (includesAny(text, ["partner", "ongoing", "retainer", "typical month", "what happens monthly", "long term support", "monthly support", "continuous improvement"])) {
    return withReferences(
      {
        content: `Partner${TM} is VULA's ongoing support and strategic partnership. It runs on quarterly planning cycles: each month covers delivery against your roadmap, priority support for any issues and regular check-ins to adjust if priorities shift. There is no lock-in beyond the quarterly commitment.`,
        suggestions: [`What is Compass${TM}`, "How do I start", "How VULA can help my business"],
      },
      question,
    );
  }

  // Compass / where to start
  if (includesAny(text, ["compass", "where do i start", "start", "first step", "not sure", "discovery"])) {
    return withReferences(
      {
        content: `If you are not sure where to begin, Compass${TM} is almost always the right answer. It is VULA's signature business discovery and strategy experience: it helps clarify where your business is right now, where the real opportunities are, and what should happen next. Most people leave with more clarity than they expected.`,
        suggestions: ["How do I start", "How VULA can help my business", "Do I need a website"],
      },
      question,
    );
  }

  // VULA / business transformation
  if (includesAny(text, ["vula", "what do you do", "how can vula help", "help my business", "business transformation"])) {
    return withReferences(
      {
        content: "Happy to explain what VULA actually does. VULA is a Business Transformation Partner. We help businesses with strategy, websites, AI, automation and growth, but we usually begin by understanding the business first rather than jumping straight to a tool or a build. The right solution depends on what is actually going on.",
        suggestions: [`What is Compass${TM}`, "Can VULA help with automation", "What industries VULA works with"],
      },
      question,
    );
  }

  // Website / online presence
  if (includesAny(text, ["website", "site", "redesign", "web", "online presence"])) {
    return withReferences(
      {
        content: `Maybe, but it depends on what you need the site to do. Sometimes a stronger website is the right answer. Sometimes it is clearer messaging, a better process, or a different digital priority altogether. A Compass${TM} session is the best way to work that out.`,
        suggestions: [`What is Compass${TM}`, "How do I start", "How VULA can help my business"],
      },
      question,
    );
  }

  // SEO / search rankings / Google visibility
  if (includesAny(text, ["seo", "search engine", "rank", "rankings", "google ranking", "organic", "found on google", "local listing", "google business"])) {
    return withReferences(
      {
        content: `Worth investing in if you want visibility that compounds over time. Growth${TM} is VULA's SEO and digital growth service. It covers keyword strategy, on-page improvements, Google Business Profile optimisation and content production. Most clients start to see meaningful movement in rankings within three to six months.`,
        suggestions: [`What is Compass${TM}`, "How is this different from ads", "How do I start"],
      },
      question,
    );
  }

  // Ads vs organic / paid vs SEO
  if (includesAny(text, ["ads", "google ads", "paid ads", "advertising", "ppc", "adwords", "paid search"])) {
    return withReferences(
      {
        content: `Worth understanding the difference. Ads stop the moment you stop paying. Growth${TM} builds organic visibility that compounds over time: rankings, content and local presence that keep working without ongoing ad spend. VULA focuses on growth that does not depend on a monthly budget.`,
        suggestions: [`What is Compass${TM}`, "How do I start", "How VULA can help my business"],
      },
      question,
    );
  }

  // Content writing / who writes the content
  if (includesAny(text, ["write content", "content writing", "who writes", "copywriting", "blog", "articles", "content production"])) {
    return withReferences(
      {
        content: `Yes, and VULA handles that end to end. Content production is part of the Growth${TM} programme: researched, written and optimised around real search opportunities in your market. VULA does not hand you a brief and leave the writing to you.`,
        suggestions: [`What is Compass${TM}`, "How do I start", "How VULA can help my business"],
      },
      question,
    );
  }

  // Technical requirements / do we need to be technical
  if (includesAny(text, ["technical", "non-technical", "coding", "developer", "need to know code", "need to be technical", "tech skills"])) {
    return withReferences(
      {
        content: `Not at all. VULA handles the build and documents everything clearly. Your team just needs to use the tools, not maintain them. Whether it is a website, automation or AI, the goal is to make things simpler for the people in the business.`,
        suggestions: [`What is Compass${TM}`, "Can VULA help with automation", "How do I start"],
      },
      question,
    );
  }

  // What tools do you work with
  if (includesAny(text, ["what tools", "which tools", "microsoft", "google workspace", "crm", "xero", "accounting software", "which software", "existing tools", "work with our tools"])) {
    return withReferences(
      {
        content: `More than likely, yes. VULA works across widely used business tools: Microsoft 365, Google Workspace, CRMs, accounting platforms and industry-specific software. The right tools for your setup are assessed as part of Flow${TM} during the audit phase.`,
        suggestions: [`What is Compass${TM}`, "Can VULA help with automation", "How do I start"],
      },
      question,
    );
  }

  // Automation / workflow / Flow
  if (includesAny(text, ["automation", "workflow", "process", "manual", "repetitive", "flow"])) {
    return withReferences(
      {
        content: `Yes, and this is one of the most impactful things a business can do. VULA helps identify repetitive work and turn it into reliable workflows through Flow${TM}. We would usually start by understanding the process first, then recommend the right level of automation.`,
        suggestions: [`What is Compass${TM}`, "How VULA can help my business", "How do I start"],
      },
      question,
    );
  }

  // POPIA / personal information compliance
  if (includesAny(text, ["popia", "protection of personal information", "information officer", "data breach", "data subject", "privacy compliance", "privacy act", "personal information act", "inforegulator", "responsible party", "operator agreement", "privacy notice"])) {
    return withReferences(
      {
        content: `Really important to have sorted. South Africa's Protection of Personal Information Act (POPIA) applies to every business that collects or processes personal information. VULA has a free POPIA Basics Checklist covering nine practical areas: appointing an information officer, mapping what data you hold, establishing lawful grounds, publishing a privacy notice, data subject rights, securing data, managing operators, responding to breaches and setting retention periods.`,
        suggestions: ["What free resources are available", `What is Compass${TM}`, "How do I start"],
      },
      question,
    );
  }

  // Data privacy / client data security (before AI block)
  if (includesAny(text, ["data privacy", "privacy", "data protection", "client data", "data security", "gdpr", "sensitive data", "confidential"])) {
    return withReferences(
      {
        content: `VULA takes this seriously. Every AI or automation use case is assessed for data risk before implementation. Guidelines and governance are built into programmes like Accelerate${TM}, and VULA will not recommend tools that put client data at risk.`,
        suggestions: [`What is Compass${TM}`, "How do I start", "How VULA can help my business"],
      },
      question,
    );
  }

  // Team resistance / change management / AI adoption
  if (includesAny(text, ["resistant", "resistance", "afraid of ai", "worried about ai", "skeptical", "sceptical", "not ready for ai", "team won't use", "adoption", "change management"])) {
    return withReferences(
      {
        content: `That is one of the most common things we hear, and it is completely understandable. It is exactly why enablement is central to the Accelerate${TM} programme. VULA works with your team, not just your tools, building confidence through practical, relevant use cases rather than abstract training.`,
        suggestions: [`What is Compass${TM}`, "How VULA can help my business", "How do I start"],
      },
      question,
    );
  }

  // AI / Accelerate
  if (includesAny(text, ["ai", "artificial intelligence", "accelerate"])) {
    return withReferences(
      {
        content: `Yes, and VULA takes a practical approach to it. Through Accelerate${TM}, we help businesses adopt AI around real use cases, with proper team enablement and tools that fit the way your business actually works. No hype, just what is useful.`,
        suggestions: [`What is Compass${TM}`, "Can VULA help with automation", "How do I start"],
      },
      question,
    );
  }

  // Industries / sectors
  if (includesAny(text, ["industry", "industries", "sector", "work with"])) {
    return withReferences(
      {
        content: "VULA works across professional services, financial services, engineering, construction, healthcare, and trades and specialist businesses. The common thread is helping growing organisations work smarter with clarity and confidence. Does any of those feel close to where you are?",
        suggestions: ["How VULA can help my business", `What is Compass${TM}`, "How do I start"],
      },
      question,
    );
  }

  // Pricing
  if (includesAny(text, ["price", "pricing", "cost", "quote", "how much", "fees"])) {
    return {
      content: `I cannot give pricing from the website alone, because the right recommendation depends on your business, goals and current setup. VULA would usually start with Compass${TM} so the next step is clear before any scope or quote is discussed. That way there are no surprises.`,
      suggestions: [`What is Compass${TM}`, "How do I start", "How VULA can help my business"],
    };
  }

  // IT support
  if (includesAny(text, ["it support", "support company", "managed services", "fix my laptop", "tech support"])) {
    return {
      content: "VULA is not an IT support company, so this one is worth being clear on. The focus is business transformation through strategy, websites, AI, automation and growth, with support built around improvement rather than reactive break-fix.",
      suggestions: ["How VULA can help my business", `What is Compass${TM}`, "How do I start"],
    };
  }

  // Contact / book
  if (includesAny(text, ["contact", "book", "talk", "speak", "meeting", "start working", "start with compass", "how do i start"])) {
    return withReferences(
      {
        content: `The clearest next step is to start with Compass${TM}. It gives VULA a chance to understand your business properly before recommending anything. No pressure and no pitch, just a conversation to figure out the right direction.`,
        suggestions: [`What is Compass${TM}`, "How VULA can help my business", "Do I need a website"],
      },
      question,
    );
  }

  // Case studies / proof / examples
  if (includesAny(text, ["case study", "examples", "proof", "experience"])) {
    return withReferences(
      {
        content: `VULA's approach is built around practical transformation work across strategy, process, technology and growth. If you want to explore what that could look like in your context, a Compass${TM} conversation is the best place to start.`,
        suggestions: ["How VULA can help my business", "What industries VULA works with", "How do I start"],
      },
      question,
    );
  }

  return withReferences(
    {
      content: `Honest answer: I am not fully sure from the website alone, and I would rather tell you that than guess. If you are weighing a business, website, AI or automation decision, Compass${TM} is usually the right starting point because it brings clarity before recommendations. Want to try rephrasing your question?`,
      suggestions: [...DEFAULT_SUGGESTIONS.slice(0, 3)],
    },
    question,
  );
}
