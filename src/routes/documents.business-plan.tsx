import { createFileRoute } from "@tanstack/react-router";
import {
  ToolPage,
  ToolSection,
  ToolDivider,
  FieldGrid,
  TextQ,
  DataTable,
  Checklist,
  SectionIntro,
} from "@/components/site/ToolPage";

export const Route = createFileRoute("/documents/business-plan")({
  head: () => ({ meta: [{ title: "Business Plan 2026 â€” Vula Internal" }] }),
  component: BusinessPlan,
});

function BusinessPlan() {
  return (
    <ToolPage
      title="Business Plan 2026"
      tagline="Shiven Pillay, Founder â€” August 2026 â€” Version 1.0 â€” Confidential"
      type="Strategy"
      about="Vula Solutions is a South African digital transformation consultancy purpose-built to make world-class strategic and digital expertise accessible to small and medium enterprises (SMEs). Leveraging the proprietary DARESâ„¢ Framework â€” Discover, Assess, Recommend, Execute, Support â€” Vula guides business owners through a structured journey from digital audit to full implementation and ongoing support. Our flagship service, the Compassâ„¢ assessment, delivers a clear, actionable digital roadmap in a single session. Priced from R5,000 for a focused 90-minute engagement to R50,000+ for a full leadership strategy day, Compass removes the guesswork from digital transformation and replaces it with clarity, prioritised initiatives, and a concrete execution plan. The business is bootstrapped, with no external funding required in Year 1. Targeting six to eight Compass sessions per month by Month 10, combined with downstream delivery projects, the business projects revenue of approximately R1,000,000 in Year 1, growing to R2,200,000 in Year 2 and R4,500,000 in Year 3."
      badge="Internal Template"
      footerVariant="internal"
      backTo="/documents"
      backLabel="Documents"
    >
      <ToolSection label="Company Overview">
        <SectionIntro>Core registration and contact details. Update placeholder fields as registrations are completed.</SectionIntro>
        <FieldGrid
          fields={[
            { label: "Company Name", value: "Vula Solutions (Pty) Ltd [Proposed â€” see Section 12]" },
            { label: "Founder", value: "Shiven Pillay" },
            { label: "Founded", value: "2026" },
            { label: "Location", value: "South Africa [Insert city/province]" },
            { label: "Contact Email", value: "[Insert email]" },
            { label: "Contact Phone", value: "[Insert phone]" },
            { label: "Website", value: "vulasolutions.co.za" },
            { label: "Legal Structure", value: "Private Company â€” (Pty) Ltd [Recommended]" },
            { label: "CIPC Registration No", value: "[To be obtained]" },
            { label: "SARS Tax Number", value: "[To be confirmed]" },
            { label: "VAT Status", value: "Not applicable until turnover exceeds R1,000,000 per year" },
            { label: "Company Status", value: "Pre-Launch" },
          ]}
        />
      </ToolSection>

      <ToolSection label="Mission, Vision & Values">
        <TextQ
          label="Mission"
          rows={2}
          value="To democratise access to world-class digital transformation expertise for South African SMEs â€” making strategic clarity, implementation support, and measurable growth outcomes available to every ambitious business, regardless of size."
        />
        <TextQ
          label="Vision"
          rows={2}
          value="To be the leading digital transformation partner for South African SMEs by 2030, recognised for practical impact, transparent pricing, and the DARESâ„¢ methodology."
        />
        <TextQ
          label="Core Values"
          rows={6}
          value={`Clarity over jargon â€” we translate complexity into action
Transparency â€” fixed prices, clear deliverables, no surprises
Impact first â€” every engagement must deliver measurable value
Local expertise â€” built for the South African business environment
Continuous growth â€” we apply to ourselves what we recommend to clients`}
        />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="The Problem">
        <SectionIntro>South African SMEs collectively account for a significant share of GDP and employment, yet the majority remain digitally underserved. The key market failures this business addresses are set out below.</SectionIntro>
        <TextQ
          label="Market problem statement"
          rows={7}
          value={`Digital agencies sell execution without strategy â€” websites and ads built without understanding the business.
Management consultancies are priced out of reach â€” engagements starting at R200,000+ exclude 99% of SMEs.
Freelancers offer ad hoc tactical help with no framework, accountability, or continuity.
Business owners make costly digital decisions (websites, software, advertising) without a structured assessment.
Wasted spend on digital tools and campaigns is rampant â€” often R50,000â€“R500,000+ per business.`}
        />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="DARESâ„¢ Framework">
        <SectionIntro>The proprietary five-phase methodology that underpins every Vula engagement â€” from initial discovery through to sustained strategic support.</SectionIntro>
        <DataTable
          columns={[
            { label: "Phase", width: "20%" },
            { label: "What Happens", width: "42%" },
            { label: "Client Outcome", width: "38%" },
          ]}
          rows={[
            [
              "D â€” Discover",
              "Deep-dive into the business, its markets, processes, and current digital footprint",
              "Complete picture of where the business stands today",
            ],
            [
              "A â€” Assess",
              "Digital maturity scoring, gap analysis, and competitive benchmarking",
              "Clear understanding of gaps, opportunities, and risks",
            ],
            [
              "R â€” Recommend",
              "Prioritised, practical roadmap tailored to budget, capacity, and goals",
              "Actionable plan with clear ROI logic",
            ],
            [
              "E â€” Execute",
              "Implementation of the recommended roadmap through Launchâ„¢, Flowâ„¢, Accelerateâ„¢, Growthâ„¢",
              "Tangible improvements delivered",
            ],
            [
              "S â€” Support",
              "Ongoing fractional strategic support through Partnerâ„¢",
              "Sustained growth and accountability",
            ],
          ]}
        />
      </ToolSection>

      <ToolSection label="Products & Services">
        <SectionIntro>The full product suite, spanning the Compassâ„¢ assessment tiers and downstream DARESâ„¢ delivery services.</SectionIntro>
        <DataTable
          columns={[
            { label: "Product / Service", width: "35%" },
            { label: "Format", width: "35%" },
            { label: "Price", width: "30%" },
          ]}
          rows={[
            ["Compassâ„¢ Essential", "90-minute session", "R5,000"],
            ["Compassâ„¢ Professional", "Half-day session", "R15,000"],
            ["Compassâ„¢ Strategic", "Full-day / multi-day", "R50,000+"],
            ["Launchâ„¢", "Website design and build", "By quote"],
            ["Flowâ„¢", "Process automation and workflow", "By quote"],
            ["Accelerateâ„¢", "AI and digital enablement", "By quote"],
            ["Growthâ„¢", "SEO and content growth", "By quote"],
            ["Partnerâ„¢", "Ongoing fractional support retainer", "By quote"],
          ]}
        />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="Year 1 Revenue Forecast">
        <SectionIntro>Target: six to eight Compass sessions per month by Month 10. Annual revenue target approximately R1,000,000 by Year 1 end.</SectionIntro>
        <DataTable
          columns={[
            { label: "Quarter", width: "18%" },
            { label: "Compass Revenue", width: "20%" },
            { label: "Delivery Revenue", width: "20%" },
            { label: "Retainers", width: "18%" },
            { label: "Total", width: "24%" },
          ]}
          rows={[
            ["Q1", "R20,000", "R0", "R0", "R20,000"],
            ["Q2", "R60,000", "R30,000", "R0", "R90,000"],
            ["Q3", "R120,000", "R80,000", "R15,000", "R215,000"],
            ["Q4", "R180,000", "R120,000", "R30,000", "R330,000"],
            ["Annual Total", "R380,000", "R230,000", "R45,000", "~R655,000 (target R1,000,000)"],
          ]}
        />
      </ToolSection>

      <ToolSection label="Year 2â€“3 Projections">
        <SectionIntro>Growth assumptions reflect increased Compass volume, a maturing delivery pipeline, and growing retainer base through Partnerâ„¢.</SectionIntro>
        <DataTable
          columns={[
            { label: "Period", width: "18%" },
            { label: "Compass", width: "20%" },
            { label: "Delivery", width: "22%" },
            { label: "Retainers", width: "20%" },
            { label: "Total", width: "20%" },
          ]}
          rows={[
            ["Year 2", "R480,000", "R900,000", "R240,000", "R1,620,000 (target R2,200,000)"],
            ["Year 3", "R720,000", "R1,800,000", "R600,000", "R3,120,000 (target R4,500,000)"],
          ]}
        />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="Go-to-Market Strategy">
        <SectionIntro>Three-phase GTM plan spanning the first 12 months. Update each phase as milestones are reached.</SectionIntro>
        <TextQ
          label="Phase 1 â€” Months 1â€“3: Network Activation"
          rows={3}
          value="Direct outreach to existing contacts, referral partnerships, LinkedIn presence. Goal: first three to five paying Compass clients."
        />
        <TextQ
          label="Phase 2 â€” Months 4â€“6: Content & SEO"
          rows={3}
          value="Resource library live on website, thought leadership published on LinkedIn and X. Goal: inbound leads beginning to supplement outbound."
        />
        <TextQ
          label="Phase 3 â€” Months 7â€“12: Growth Infrastructure"
          rows={3}
          value="Case studies published, Google Business profile active, review profiles established, Growthâ„¢ methodology self-applied. Goal: six to eight Compass sessions per month sustained."
        />
        <TextQ
          label="Current quarter priority actions"
          rows={3}
        />
      </ToolSection>

      <ToolSection label="Key Risks">
        <SectionIntro>Live risk register. Update the status column as mitigations are actioned.</SectionIntro>
        <DataTable
          columns={[
            { label: "Risk", width: "40%" },
            { label: "Mitigation", width: "35%" },
            { label: "Current Status", width: "25%" },
          ]}
          rows={[
            [
              "No CIPC registration â€” business cannot legally operate",
              "Register immediately via bizportal.gov.za (R175)",
              "",
            ],
            [
              "No professional indemnity insurance",
              "Obtain PI insurance before first paid engagement",
              "",
            ],
            [
              "Over-reliance on Compass as sole revenue source",
              "Build delivery pipeline alongside Compass from Month 3",
              "",
            ],
            [
              "Founder bandwidth constraints",
              "Delegate admin; use templates and automation for all repetitive work",
              "",
            ],
            [
              "Pipeline volatility and lumpy cash flow",
              "Maintain 3-month cash reserve; diversify client base across sectors",
              "",
            ],
          ]}
        />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="Registration Checklist">
        <SectionIntro>All items must be completed before the first paid client engagement. Tick each item as it is confirmed.</SectionIntro>
        <Checklist
          items={[
            "CIPC registration complete (bizportal.gov.za â€” R175)",
            "Business bank account opened (FNB, Nedbank, or Capitec Business recommended)",
            "SARS income tax registration confirmed",
            "Professional indemnity insurance obtained (minimum R1,000,000 cover)",
            "Domain names secured (vula.co.za + vulasolutions.co.za)",
            "Google Workspace set up (shiven@vula.co.za)",
            "VAT registration (when turnover exceeds R1,000,000 per year)",
            "Trademark application for DARESâ„¢ submitted",
            "Terms & Conditions and Privacy Policy published on website",
            "Bookkeeping software set up (Xero or Wave recommended)",
          ]}
        />
      </ToolSection>
    </ToolPage>
  );
}