import { createFileRoute } from "@tanstack/react-router";
import {
  ToolPage,
  ToolSection,
  ToolDivider,
  FieldGrid,
  TextQ,
  DataTable,
  SectionIntro,
} from "@/components/site/ToolPage";

export const Route = createFileRoute("/documents/compass-report")({
  head: () => ({
    meta: [{ title: "Compass Report — Vula Internal" }],
  }),
  component: CompassReport,
});

function CompassReport() {
  return (
    <ToolPage
      title="Compass Report"
      tagline="Complete and send to the client within 2–3 business days of the session — COMP-YYYY-NNN reference"
      type="Delivery"
      about="Complete this report within 2–3 business days of the Compass session. Review, refine, and send the final version to the client as a branded PDF."
      badge="Internal Template"
      footerVariant="internal"
      backTo="/documents"
      backLabel="Documents"
    >
      <ToolSection label="Report Header">
        <SectionIntro>
          CONFIDENTIAL — This report has been prepared exclusively for the named
          client. Not for distribution.
        </SectionIntro>
        <FieldGrid
          fields={[
            "Client Company",
            "Primary Contact (Name, Title)",
            "Session Tier (Essential / Professional / Strategic)",
            "Session Date",
            "Report Date",
            "Report Reference (COMP-YYYY-NNN)",
            { label: "Prepared by", value: "Shiven Pillay, Vula Solutions" },
          ]}
        />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="Executive Summary">
        <TextQ
          label="3–4 sentence summary of key findings and top recommendations"
          value="Write 3-4 sentences summarising the key findings and top recommendations. This paragraph is the one the client reads first."
          rows={5}
        />
      </ToolSection>

      <ToolSection label="Digital Maturity Assessment">
        <DataTable
          columns={[
            { label: "Dimension", width: "35%" },
            { label: "Score (/10)", width: "18%" },
            { label: "Industry Benchmark", width: "22%" },
            { label: "Priority", width: "25%" },
          ]}
          rows={[
            ["Digital Presence (web, social, SEO)", "", "7/10", ""],
            ["Process Automation", "", "6/10", ""],
            ["Data & Analytics", "", "5/10", ""],
            ["Customer Experience (digital)", "", "6/10", ""],
            ["Marketing & Lead Generation", "", "6/10", ""],
            ["Technology Stack", "", "6/10", ""],
            ["Overall Digital Maturity", "", "6/10", ""],
          ]}
        />
      </ToolSection>

      <ToolSection label="Top 3 Priority Recommendations">
        <DataTable
          columns={[
            { label: "#", width: "8%" },
            { label: "Recommendation", width: "92%" },
          ]}
          rows={[
            ["1", ""],
            ["2", ""],
            ["3", ""],
          ]}
        />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="1. Discovery — Business Overview">
        <FieldGrid
          fields={[
            "Company",
            "Industry / Sector",
            "Years in Operation",
            "Annual Revenue (approx.)",
            "Number of Employees",
            "Primary Products / Services",
            "Geographic Footprint (Local / National / Regional)",
          ]}
        />
      </ToolSection>

      <ToolSection label="1. Discovery — Digital Footprint">
        <FieldGrid
          fields={[
            "Website (URL or 'None')",
            "Social Media Presence (platforms active on)",
            "Google Business Profile (Yes / No / Claimed but inactive)",
            "E-commerce (Yes / No — platform if yes)",
            "CRM / Sales Tool (name or 'None')",
            "Key Software Tools in Use",
          ]}
        />
      </ToolSection>

      <ToolSection label="Strategic Context">
        <TextQ
          label="What is the client trying to achieve in the next 12–24 months? What is their biggest fear? What keeps them up at night?"
          rows={4}
        />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="2. Assessment — Strengths">
        <TextQ label="What is working well — strengths to build on" rows={3} />
      </ToolSection>

      <ToolSection label="2. Assessment — Gaps & Opportunities">
        <TextQ
          label="What is not working — gaps, opportunities, and the cost of leaving them unaddressed"
          rows={3}
        />
      </ToolSection>

      <ToolSection label="2. Assessment — Key Risks Identified">
        <TextQ label="Key risks identified during the session" rows={3} />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="3. Recommendations">
        <SectionIntro>
          The following recommendations are prioritised by impact and effort.
          They are specific to the client&apos;s business context, resource
          constraints, and goals.
        </SectionIntro>
        <DataTable
          columns={[
            { label: "#", width: "6%" },
            { label: "Recommendation", width: "36%" },
            { label: "Expected Outcome", width: "30%" },
            { label: "Effort", width: "14%" },
            { label: "Priority", width: "14%" },
          ]}
          rows={[
            ["1", "", "", "", "Immediate"],
            ["2", "", "", "", "Short-term"],
            ["3", "", "", "", "Short-term"],
            ["4", "", "", "", "Medium-term"],
            ["5", "", "", "", "Medium-term"],
            ["6", "", "", "", "Long-term"],
          ]}
        />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="4. Digital Transformation Roadmap">
        <TextQ label="Now (0–90 days) — Quick Wins" rows={3} />
        <TextQ label="Next (90 days–6 months) — Foundation Building" rows={3} />
        <TextQ label="Later (6–12 months) — Growth & Scale" rows={3} />
        <TextQ label="Future (12+ months) — Strategic Horizon" rows={3} />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="5. Agreed Next Steps">
        <DataTable
          columns={[
            { label: "Action", width: "40%" },
            { label: "Owner", width: "22%" },
            { label: "Due Date", width: "18%" },
            { label: "Notes", width: "20%" },
          ]}
          rows={[
            ["", "", "", ""],
            ["", "", "", ""],
            ["", "", "", ""],
            ["", "", "", ""],
            ["Vula to follow up on next steps", "Shiven Pillay", "", ""],
          ]}
        />
      </ToolSection>

      <ToolSection label="6. Proposed Vula Engagement">
        <TextQ
          label="Which Vula product(s) are proposed as the next step based on this report's findings?"
          rows={4}
        />
      </ToolSection>
    </ToolPage>
  );
}