import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ToolPage, ToolSection, ToolDivider, SectionIntro } from "@/components/site/ToolPage";

export const Route = createFileRoute("/tools/business-tech-glossary")({
  head: () => ({
    meta: [
      { title: "Business Tech Glossary | Vula Solutions" },
      { name: "description", content: "Plain-English definitions of common business technology terms for South African SMEs. Cloud, AI, automation, SEO and more. No jargon, no spin." },
      { property: "og:title", content: "Business Tech Glossary" },
      { property: "og:description", content: "Clear definitions of the terms your software vendor uses, written for business owners not developers." },
      { property: "og:url", content: "https://vulasolutions.co.za/tools/business-tech-glossary" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://vulasolutions.co.za/tools/business-tech-glossary" }],
  }),
  component: BusinessTechGlossaryPage,
});

const TEAL  = "#01A1B7";
const INK   = "#0F1923";
const RULE  = "#DDE3E9";
const LIFT  = "#F5F7F9";
const SLATE = "#5A6A7A";

type GlossaryTerm = {
  term: string;
  full?: string;
  definition: string;
};

type GlossaryCategory = {
  label: string;
  terms: GlossaryTerm[];
};

const CATEGORIES: GlossaryCategory[] = [
  {
    label: "Cloud and Infrastructure",
    terms: [
      {
        term: "API",
        full: "Application Programming Interface",
        definition: "A connector that lets two software systems share data automatically. When your accounting software updates your customer records without you doing anything, an API is doing the work in the background.",
      },
      {
        term: "Cloud computing",
        definition: "Running software and storing data on remote servers accessed via the internet, rather than on a computer or server in your office. Google Drive and Microsoft 365 are cloud products.",
      },
      {
        term: "SaaS",
        full: "Software as a Service",
        definition: "Software you access through a browser and pay for by monthly or annual subscription, rather than buying a licence and installing it. Xero, HubSpot and Slack are SaaS products.",
      },
      {
        term: "IaaS",
        full: "Infrastructure as a Service",
        definition: "Renting raw computing power, storage and networking from a provider such as AWS or Microsoft Azure, rather than buying your own servers.",
      },
      {
        term: "Integration",
        definition: "Linking two or more software systems so that data flows between them automatically, removing the need to re-enter the same information by hand in multiple places.",
      },
      {
        term: "Legacy system",
        definition: "Older software that still runs the business but is expensive to maintain, difficult to connect with modern tools, and risky to change without breaking something else.",
      },
      {
        term: "Hosting",
        definition: "Renting server space where your website files and data live. When someone types your web address, the hosting server sends them your site.",
      },
      {
        term: "Domain",
        definition: "Your website address, such as vulasolutions.co.za. You register a domain through a registrar separately from hosting.",
      },
      {
        term: "Uptime",
        definition: "The percentage of time a system or website is available and working. 99.9% uptime means roughly 8 hours of downtime per year.",
      },
    ],
  },
  {
    label: "Business Systems",
    terms: [
      {
        term: "CRM",
        full: "Customer Relationship Management",
        definition: "Software that records every interaction with your clients and prospects: emails, calls, meetings, proposals and deals. Helps your team follow up consistently so nothing falls through the cracks.",
      },
      {
        term: "ERP",
        full: "Enterprise Resource Planning",
        definition: "A central system that connects finance, inventory, procurement, HR and operations in one place. More common in larger businesses; SMEs often start with accounting software and a separate CRM.",
      },
      {
        term: "CMS",
        full: "Content Management System",
        definition: "Software that lets you update website content, such as blog posts, products and pages, without needing a developer. WordPress is the most common example.",
      },
      {
        term: "Workflow automation",
        definition: "Software that completes a defined sequence of tasks automatically when triggered by an event. For example: a new enquiry submits your contact form, which creates a task, sends a confirmation email and updates your CRM, all without anyone doing it manually.",
      },
      {
        term: "No-code / Low-code",
        definition: "Tools that let non-developers build software, automations or databases using visual drag-and-drop interfaces instead of writing traditional code. Examples include Zapier, Make and Airtable.",
      },
      {
        term: "Business Intelligence (BI)",
        definition: "Tools and processes that turn raw business data into clear reports, dashboards and charts for decision-making. Helps leaders see patterns instead of scrolling through spreadsheets.",
      },
    ],
  },
  {
    label: "AI and Automation",
    terms: [
      {
        term: "Artificial Intelligence (AI)",
        definition: "Software that performs tasks which normally require human reasoning: answering questions, recognising images, summarising documents or detecting patterns in data.",
      },
      {
        term: "Machine learning",
        definition: "A branch of AI where software improves its own performance by learning from data, rather than following a fixed set of rules someone programmed. The more data it processes, the better it gets.",
      },
      {
        term: "Generative AI",
        definition: "AI that produces new content, such as text, images, code or audio, based on a prompt or instruction. ChatGPT and Claude are generative AI tools.",
      },
      {
        term: "Prompt",
        definition: "An instruction or question you give to an AI system. The quality of the prompt largely determines the quality of the output.",
      },
      {
        term: "Chatbot",
        definition: "Software that has a text or voice conversation with a user, typically to answer common questions or guide them through a process. Ranges from simple rule-based bots to AI-powered assistants.",
      },
      {
        term: "RPA",
        full: "Robotic Process Automation",
        definition: "Software that mimics repetitive human actions in existing systems: copying data between screens, filling in forms and sending standard emails, without changing the underlying software.",
      },
      {
        term: "Large Language Model (LLM)",
        definition: "The underlying AI technology behind tools like ChatGPT and Claude. Trained on vast amounts of text, it can generate, summarise and reason about language. The model itself is invisible; the product built on top of it is what you use.",
      },
    ],
  },
  {
    label: "Web and Digital",
    terms: [
      {
        term: "SEO",
        full: "Search Engine Optimisation",
        definition: "The practice of improving a website so it appears higher in Google search results for relevant searches, bringing in visitors who are actively looking for what you offer.",
      },
      {
        term: "UX",
        full: "User Experience",
        definition: "How easy and satisfying a product or website is to use. Good UX means customers find what they need quickly and without frustration.",
      },
      {
        term: "UI",
        full: "User Interface",
        definition: "The visual layer of a digital product: buttons, layouts, colours, typography and icons. UI is what you see; UX is how using it feels.",
      },
      {
        term: "Responsive design",
        definition: "A website that automatically adjusts its layout to suit the screen it is being viewed on, whether a phone, tablet or desktop monitor.",
      },
      {
        term: "Conversion",
        definition: "When a website visitor takes a desired action: filling in a contact form, making a purchase or booking a call. Conversion rate is the percentage of visitors who do this.",
      },
      {
        term: "Analytics",
        definition: "Tracking and measuring user behaviour on your website or app, usually via a tool like Google Analytics, to understand how people find and use your digital presence.",
      },
      {
        term: "Structured data",
        definition: "Hidden code on a webpage that tells Google what the content means, not just what it says. Enables rich results in search, such as star ratings, FAQs and breadcrumbs, that increase click-through rates.",
      },
    ],
  },
  {
    label: "Project and Process",
    terms: [
      {
        term: "Agile",
        definition: "An approach to projects that delivers work in short cycles, adapts to feedback, and involves stakeholders throughout rather than handing over a finished product only at the end.",
      },
      {
        term: "MVP",
        full: "Minimum Viable Product",
        definition: "The simplest working version of a product that can be tested with real users. The goal is to learn quickly with minimum investment before committing to build more.",
      },
      {
        term: "SLA",
        full: "Service Level Agreement",
        definition: "A contract clause that defines the minimum standard of service a provider must deliver, such as response times, availability guarantees or support hours.",
      },
      {
        term: "ROI",
        full: "Return on Investment",
        definition: "The financial return on money spent, expressed as a percentage. If you spend R10,000 on a tool and it saves R40,000 in staff time, your ROI is 300%.",
      },
      {
        term: "KPI",
        full: "Key Performance Indicator",
        definition: "A measurable value that shows whether you are meeting a specific goal. For example: number of new enquiries per month, or invoice turnaround time in days.",
      },
      {
        term: "Digital transformation",
        definition: "Using technology to fundamentally change how a business operates and delivers value. Not just adding new software, but rethinking processes, culture and strategy at the same time.",
      },
      {
        term: "Scope creep",
        definition: "When a project gradually expands beyond its original boundaries, usually because extra requirements are added without adjusting the timeline or budget.",
      },
    ],
  },
  {
    label: "Security and Compliance",
    terms: [
      {
        term: "POPIA",
        full: "Protection of Personal Information Act",
        definition: "South Africa's data privacy law. It governs how businesses collect, store, use and share personal information, and gives individuals the right to know what data you hold about them. Non-compliance carries significant fines.",
      },
      {
        term: "Phishing",
        definition: "A scam where criminals send emails or messages that appear to be from a trusted sender, designed to trick you into clicking a malicious link, revealing a password or transferring money.",
      },
      {
        term: "Ransomware",
        definition: "Malicious software that encrypts your files and demands payment to restore access. Businesses without current backups often have no practical alternative but to pay.",
      },
      {
        term: "Two-factor authentication (2FA)",
        definition: "A login method that requires both a password and a second proof of identity, usually a code sent to your phone. Significantly reduces the risk of unauthorised access even when a password is stolen.",
      },
      {
        term: "VPN",
        full: "Virtual Private Network",
        definition: "Software that encrypts your internet connection and routes it through a secure server. Protects data on public Wi-Fi and allows secure access to office systems from outside the office.",
      },
      {
        term: "Data breach",
        definition: "An incident where unauthorised people gain access to sensitive or private information. Under POPIA, South African businesses must report breaches to the Information Regulator.",
      },
      {
        term: "Cybersecurity",
        definition: "The practice of protecting systems, networks and data from digital attacks, unauthorised access and accidental damage.",
      },
    ],
  },
];

function GlossaryEntry({ term, full, definition }: GlossaryTerm) {
  return (
    <div className="border-b py-4 last:border-b-0" style={{ borderColor: RULE }}>
      <div className="flex flex-wrap items-baseline gap-2">
        <span className="text-[15px] font-semibold" style={{ color: INK }}>{term}</span>
        {full && <span className="text-[12px]" style={{ color: SLATE }}>({full})</span>}
      </div>
      <p className="mt-1.5 text-[13px] leading-relaxed" style={{ color: SLATE }}>{definition}</p>
    </div>
  );
}

function BusinessTechGlossaryPage() {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const filtered: GlossaryCategory[] = q
    ? CATEGORIES.map(cat => ({
        ...cat,
        terms: cat.terms.filter(
          t =>
            t.term.toLowerCase().includes(q) ||
            (t.full ?? "").toLowerCase().includes(q) ||
            t.definition.toLowerCase().includes(q)
        ),
      })).filter(cat => cat.terms.length > 0)
    : CATEGORIES;

  const totalShown = filtered.reduce((sum, cat) => sum + cat.terms.length, 0);
  const totalAll = CATEGORIES.reduce((sum, cat) => sum + cat.terms.length, 0);

  return (
    <ToolPage
      title="Business Tech Glossary"
      tagline="Clear definitions of the terms your software vendor uses, written for business owners not developers."
      type="Glossary"
      about="Technology sales people often speak a dialect designed to sound impressive rather than to inform. This glossary translates the most common terms into plain language so you can evaluate proposals, ask better questions and make faster decisions, without needing a technical background."
      howTo={[
        "Search for a specific term, acronym or topic",
        "Browse by category if you are new to an area",
        "If a term in a vendor proposal is missing, ask for a plain-English explanation",
      ]}
    >
      <ToolSection label="Search">
        <div
          className="rounded border"
          style={{ borderColor: RULE, background: LIFT }}
        >
          <input
            type="text"
            placeholder={`Search ${totalAll} terms...`}
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full bg-transparent px-4 py-3 text-[14px] outline-none"
            style={{ color: INK }}
          />
        </div>
        {q && (
          <p className="mt-2 text-[12px]" style={{ color: SLATE }}>
            {totalShown === 0
              ? "No terms match that search."
              : `${totalShown} term${totalShown === 1 ? "" : "s"} found across ${filtered.length} categor${filtered.length === 1 ? "y" : "ies"}.`}
          </p>
        )}
      </ToolSection>

      <ToolDivider />

      {filtered.length === 0 ? (
        <ToolSection label="Results">
          <p className="text-[13px]" style={{ color: SLATE }}>
            No terms match your search. Try a shorter or different keyword.
          </p>
        </ToolSection>
      ) : (
        filtered.map((cat, i) => (
          <div key={cat.label}>
            <ToolSection label={cat.label}>
              <SectionIntro>
                {cat.terms.length} {cat.terms.length === 1 ? "term" : "terms"}
              </SectionIntro>
              {cat.terms.map(entry => (
                <GlossaryEntry key={entry.term} {...entry} />
              ))}
            </ToolSection>
            {i < filtered.length - 1 && <ToolDivider />}
          </div>
        ))
      )}
    </ToolPage>
  );
}
