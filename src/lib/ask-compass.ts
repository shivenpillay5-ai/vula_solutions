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
  "Do I need a website",
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

function blendReferenceIntoContent(content: string, references: AskCompassReference[]) {
  const primary = references[0];
  if (!primary) return content;

  const groundedSnippet = sentenceSafeSnippet(primary.snippet);
  return `${content} A useful VULA perspective here is: ${groundedSnippet}`;
}

function withReferences(reply: AskCompassReply, question: string) {
  const references = findRelevantResources(question);
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

  if (includesAny(text, ["compass", "where do i start", "start", "first step", "not sure", "discovery"])) {
    return withReferences(
      {
        content:
          `Compass${TM} is VULA's signature business discovery and strategy experience. It helps clarify where your business is now, where the opportunities are, and what should happen next. If you are not sure where to begin, Compass${TM} is the right first step.`,
        suggestions: ["How do I start", "How VULA can help my business", "Do I need a website"],
      },
      question,
    );
  }

  if (includesAny(text, ["vula", "what do you do", "how can vula help", "help my business", "business transformation", "partner"])) {
    return withReferences(
      {
        content:
          "VULA is a Business Transformation Partner. We help businesses with strategy, websites, AI, automation, and growth, but we usually begin by understanding the business first rather than jumping straight to a tool or build.",
        suggestions: [`What is Compass${TM}`, "Can VULA help with automation", "What industries VULA works with"],
      },
      question,
    );
  }

  if (includesAny(text, ["website", "site", "redesign", "web", "online presence"])) {
    return withReferences(
      {
        content:
          `Possibly, but that depends on what your business needs the website to do. Sometimes the right answer is a stronger website. Sometimes it is clearer messaging, better process, or a different digital priority. A good place to start is Compass${TM}.`,
        suggestions: [`What is Compass${TM}`, "How do I start", "How VULA can help my business"],
      },
      question,
    );
  }

  if (includesAny(text, ["automation", "workflow", "process", "manual", "repetitive", "flow"])) {
    return withReferences(
      {
        content:
          `Yes. VULA helps identify repetitive work and turn it into reliable workflows through Flow${TM}. We would usually begin by understanding the process first, then recommend the right level of automation.`,
        suggestions: [`What is Compass${TM}`, "How VULA can help my business", "How do I start"],
      },
      question,
    );
  }

  if (includesAny(text, ["ai", "artificial intelligence", "accelerate"])) {
    return withReferences(
      {
        content:
          `Yes. VULA helps businesses adopt AI in a practical way through Accelerate${TM}. The focus is on real use cases, team enablement, and choosing tools that fit the way your business actually works.`,
        suggestions: [`What is Compass${TM}`, "Can VULA help with automation", "How do I start"],
      },
      question,
    );
  }

  if (includesAny(text, ["industry", "industries", "sector", "work with"])) {
    return withReferences(
      {
        content:
          "VULA works across professional services, financial services, engineering, construction, healthcare, and trades and specialist businesses. The common thread is helping growing organisations work smarter with clarity and confidence.",
        suggestions: ["How VULA can help my business", `What is Compass${TM}`, "How do I start"],
      },
      question,
    );
  }

  if (includesAny(text, ["price", "pricing", "cost", "quote", "how much", "fees"])) {
    return {
      content:
        `I cannot give pricing from the website alone, because the right recommendation depends on your business, goals, and current setup. VULA would usually start with Compass${TM} so the next step is clear before any scope or quote is discussed.`,
      suggestions: [`What is Compass${TM}`, "How do I start", "How VULA can help my business"],
    };
  }

  if (includesAny(text, ["it support", "support company", "managed services", "fix my laptop", "tech support"])) {
    return {
      content:
        "VULA is not positioned as an IT support company. The focus is business transformation through strategy, websites, AI, automation, and growth, with support built around improvement rather than generic tech support.",
      suggestions: ["How VULA can help my business", `What is Compass${TM}`, "How do I start"],
    };
  }

  if (includesAny(text, ["contact", "book", "talk", "speak", "meeting", "start working", "start with compass", "how do i start"])) {
    return withReferences(
      {
        content:
          `The clearest next step is to start with Compass${TM}. That gives VULA a chance to understand your business properly before recommending what to do next.`,
        suggestions: [`What is Compass${TM}`, "How VULA can help my business", "Do I need a website"],
      },
      question,
    );
  }

  if (includesAny(text, ["case study", "examples", "proof", "experience"])) {
    return withReferences(
      {
        content:
          `VULA's approach is built around practical transformation work across strategy, process, technology, and growth. If you want to explore what that could look like in your context, Compass${TM} is the best place to begin.`,
        suggestions: ["How VULA can help my business", "What industries VULA works with", "How do I start"],
      },
      question,
    );
  }

  return withReferences(
    {
      content:
        `I am not fully sure from the website alone, and I would rather not guess. If you are weighing a business, website, AI, or automation decision, Compass${TM} is usually the right place to start because it brings clarity before recommendations.`,
      suggestions: [...DEFAULT_SUGGESTIONS.slice(0, 3)],
    },
    question,
  );
}
