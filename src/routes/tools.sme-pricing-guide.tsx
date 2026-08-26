import { createFileRoute } from "@tanstack/react-router";
import {
  ToolPage, ToolSection, ToolDivider,
  Checklist, SectionIntro,
} from "@/components/site/ToolPage";

export const Route = createFileRoute("/tools/sme-pricing-guide")({
  head: () => ({
    meta: [
      { title: "SME Pricing Guide | Vula Solutions" },
      { name: "description", content: "What should a website, automation, AI or SEO actually cost a South African SME? Honest Rand price ranges for 2026, what drives quotes up or down, and the red flags to avoid." },
      { property: "og:title", content: "The SA SME Pricing Guide" },
      { property: "og:description", content: "Honest Rand price ranges for websites, automation, AI and SEO in South Africa. Know what things should cost before you ask for quotes." },
      { property: "og:url", content: "https://vulasolutions.co.za/tools/sme-pricing-guide" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://vulasolutions.co.za/tools/sme-pricing-guide" }],
  }),
  component: SmePricingGuidePage,
});

const TEAL = "#01A1B7";
const RULE = "#DDE3E9";
const LIFT = "#F5F7F9";
const INK  = "#0F1923";
const SLATE = "#5A6A7A";

function PriceTable({ rows }: { rows: { item: string; range: string; notes: string }[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse" style={{ minWidth: 480 }}>
        <thead>
          <tr>
            {[
              { label: "What you are buying", width: "32%" },
              { label: "Typical range (2026)", width: "26%" },
              { label: "What it covers", width: "42%" },
            ].map(col => (
              <th
                key={col.label}
                className="border-b-2 px-3 py-2.5 text-left text-[10px] font-bold uppercase tracking-[0.10em]"
                style={{ background: LIFT, borderColor: RULE, color: SLATE, width: col.width }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.item} style={i % 2 === 1 ? { background: LIFT } : undefined}>
              <td className="px-3 py-2.5 text-[13px] font-medium" style={{ borderBottom: i < rows.length - 1 ? `1px solid ${RULE}` : "none", color: INK }}>
                {row.item}
              </td>
              <td className="px-3 py-2.5 text-[13px] font-semibold whitespace-nowrap" style={{ borderBottom: i < rows.length - 1 ? `1px solid ${RULE}` : "none", color: TEAL }}>
                {row.range}
              </td>
              <td className="px-3 py-2.5 text-[12.5px] leading-relaxed" style={{ borderBottom: i < rows.length - 1 ? `1px solid ${RULE}` : "none", color: SLATE }}>
                {row.notes}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SmePricingGuidePage() {
  return (
    <ToolPage
      title="The SA SME Pricing Guide"
      tagline="What websites, automation, AI and SEO actually cost in South Africa."
      type="Guide"
      about="Most business owners only discover what digital work costs after asking for quotes, and by then it is hard to tell a fair price from an inflated one. This guide shares honest 2026 market ranges for South Africa so you can budget realistically, compare quotes with confidence, and spot the offers that are too good to be true."
      howTo={["Use the ranges as orientation, not as quotes", "Compare like with like: agree the scope first, then compare prices", "Budget for ongoing costs, not just the once-off build", "Ask every provider the same questions and compare the answers"]}
    >
      <ToolSection label="Websites">
        <SectionIntro>
          The biggest price differences come from who does the work and how much thinking is included. A template filled with your logo and a site built around your customers and search visibility are different products, even when they look similar in a portfolio.
        </SectionIntro>
        <PriceTable rows={[
          { item: "DIY website builder", range: "R150 - R700 per month", notes: "Wix and Canva-style subscriptions. You do the work yourself. Fine for testing an idea, but limited SEO ceiling and it is easy to underestimate the hours involved." },
          { item: "Starter site by a freelancer", range: "R8,000 - R25,000", notes: "Typically 3 to 6 pages on a template. Quality varies enormously, so judge the freelancer's own site and past work, not the price." },
          { item: "Professional business website", range: "R25,000 - R80,000", notes: "Custom design, help with copy, SEO foundations, analytics and training. This is where most established SMEs should be looking." },
          { item: "E-commerce store", range: "R35,000 - R150,000+", notes: "Driven by catalogue size, payment and shipping integrations, and how much product content already exists." },
          { item: "Hosting and care plan", range: "R500 - R2,500 per month", notes: "Hosting, backups, security updates and small content changes. A site with no care plan ages badly within a year." },
        ]} />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="Automation">
        <SectionIntro>
          Automation is usually priced per workflow, not per project. The question that matters is which manual process costs you the most hours each month, because that is where the payback is fastest.
        </SectionIntro>
        <PriceTable rows={[
          { item: "Automation platform subscription", range: "R400 - R1,500 per month", notes: "Zapier, Make and similar tools, priced by volume. The subscription is the small part; designing the workflow well is what you are really paying for." },
          { item: "A single workflow, built properly", range: "R5,000 - R25,000", notes: "For example: enquiry form to CRM to quote to follow-up reminder. Includes mapping the process, building, testing and handover." },
          { item: "Multi-system integration project", range: "R25,000 - R100,000+", notes: "Connecting accounting, sales and operations systems so data flows without rekeying. Priced by the number of systems and the state of your data." },
        ]} />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="Artificial Intelligence">
        <SectionIntro>
          Be cautious of AI projects priced before anyone has asked what problem you are solving. The tools are inexpensive; the value sits in choosing the right use case and getting your team to actually adopt it.
        </SectionIntro>
        <PriceTable rows={[
          { item: "AI assistant licences", range: "R350 - R900 per user per month", notes: "ChatGPT, Copilot and Claude-class tools. Budget for the people who will genuinely use them, not the whole staff list on day one." },
          { item: "Team training workshop", range: "R5,000 - R20,000 per day", notes: "Practical prompting skills plus a sensible usage policy. Often the highest-return AI spend an SME can make." },
          { item: "Custom chatbot or assistant", range: "R15,000 - R60,000", notes: "A website or WhatsApp assistant trained on your own content and processes, with testing and refinement included." },
          { item: "AI pilot project", range: "R10,000 - R50,000", notes: "One process, one measurable outcome, a clear verdict. Pilot first, then scale what works." },
        ]} />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="SEO">
        <SectionIntro>
          SEO is the category with the widest gap between what is charged and what is delivered. Real SEO is months of technical work, content and authority building. Anyone guaranteeing a page-one position is selling something else.
        </SectionIntro>
        <PriceTable rows={[
          { item: "Once-off SEO audit", range: "R5,000 - R15,000", notes: "A technical and content review with a prioritised fix list. A good audit pays for itself even if you do the fixes internally." },
          { item: "Local SEO retainer", range: "R3,000 - R8,000 per month", notes: "Google Business Profile, local citations, reviews and location content. Right-sized for businesses serving a city or province." },
          { item: "Comprehensive SEO campaign", range: "R8,000 - R25,000 per month", notes: "Technical work, ongoing content and link building for competitive markets. Expect meaningful movement in months, not weeks." },
          { item: "Content writing", range: "R1,500 - R5,000 per article", notes: "Researched, properly structured articles. Thin AI-generated filler is cheaper and worth exactly what it costs." },
        ]} />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="Strategy & Discovery">
        <SectionIntro>
          Paying for thinking feels optional until you total what the wrong website, the wrong system or the wrong campaign costs. Discovery work exists to make every other line on this page cheaper.
        </SectionIntro>
        <PriceTable rows={[
          { item: "Independent consultant", range: "R800 - R2,500 per hour", notes: "Rates track seniority and specialisation. A senior person for ten hours usually beats a junior person for forty." },
          { item: "Structured discovery session", range: "R5,000 - R50,000", notes: "A focused session through to a full leadership strategy day, ending in a written roadmap. This is the space our Compass™ sessions occupy." },
          { item: "Ongoing advisory retainer", range: "R10,000 - R40,000 per month", notes: "A fractional strategic partner for businesses in active growth or transformation." },
        ]} />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="What Moves a Quote Up or Down">
        <Checklist items={[
          "Scope clarity: vague briefs get padded quotes because the provider is pricing in the unknown.",
          "Who does the work: a senior specialist and an outsourced junior can sit behind identical proposals.",
          "Custom versus template: templates are fine when chosen deliberately, expensive when disguised as custom.",
          "Integrations: every system that must talk to another adds real work.",
          "Content readiness: arriving with your text, photos and product data can cut a web quote substantially.",
          "What happens after launch: support, training and warranty either appear in the quote or in next year's invoice.",
        ]} />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="Red Flags">
        <div className="space-y-2.5 rounded border border-[#DDE3E9] p-4" style={{ background: "#FFF8F6" }}>
          {[
            "Guaranteed page-one Google rankings, especially for a few hundred rand a month",
            "A precise price quoted before anyone has asked about your business",
            "No written scope: if it is not written down, it is not included",
            "A free website offer attached to expensive, locked-in hosting",
            "Long contracts with steep exit penalties before any value is proven",
            "A provider who talks only about deliverables and never asks why",
          ].map(item => (
            <div key={item} className="flex items-start gap-2.5 text-[13px]">
              <span className="mt-0.5 shrink-0 text-[#C45C3A] font-bold">⚠</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </ToolSection>

      <ToolSection label="Questions to Ask Every Provider">
        <Checklist items={[
          "Exactly what is included, and what is explicitly excluded?",
          "Who will actually do the work, and can I see examples of theirs?",
          "What do you need from me, and by when?",
          "What happens after launch: support, changes, and at what cost?",
          "How will we measure whether this worked?",
          "What will this cost me in year two?",
        ]} />
        <p className="mt-5 text-[12px] leading-relaxed" style={{ color: SLATE }}>
          These ranges reflect the South African market as at 2026, drawn from published rates and the quotes we see in practice. They are guidance, not quotations: a credible provider prices your specific scope after understanding your business, and VAT treatment varies between providers. If a number here surprises you in either direction, that is exactly the conversation a discovery session exists to settle.
        </p>
      </ToolSection>
    </ToolPage>
  );
}
