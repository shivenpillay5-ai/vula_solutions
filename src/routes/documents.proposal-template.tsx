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

export const Route = createFileRoute("/documents/proposal-template")({
  head: () => ({
    meta: [{ title: "Proposal Template — Vula Internal" }],
  }),
  component: ProposalTemplate,
});

function ProposalTemplate() {
  return (
    <ToolPage
      title="Proposal Template"
      tagline="Use a fresh copy per client — personalise all [bracket] fields"
      type="Sales"
      about="Complete this template after the Compass session or discovery call. Fill every [bracket] field before sending. Attach the Client Agreement for co-signature."
      badge="Internal Template"
      footerVariant="internal"
      backTo="/documents"
      backLabel="Documents"
    >
      <ToolSection label="1. Proposal Header">
        <FieldGrid
          fields={[
            "Client Company Name",
            "Prepared For (Name & Title)",
            "Date",
            "Reference (PROP-YYYY-NNN)",
            "Valid Until",
          ]}
        />
      </ToolSection>

      <ToolSection label="Executive Summary">
        <SectionIntro>Write this last — 2–3 sentences covering what this proposal addresses, the client's key challenges, and what Vula will deliver.</SectionIntro>
        <TextQ label="Executive summary" rows={4} />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="2. About Vula Solutions">
        <SectionIntro>Vula Solutions is a South African digital transformation consultancy that guides SMEs from digital uncertainty to strategic clarity and practical execution. Our proprietary DARES™ Framework — Discover, Assess, Recommend, Execute, Support — provides a structured, accountable path through every stage of digital transformation. We work exclusively with owner-led and founder-led businesses that are serious about growth, and we deliver world-class strategic rigour at SME-accessible price points.</SectionIntro>
      </ToolSection>

      <ToolDivider />

      <ToolSection label="3. Understanding Your Business">
        <SectionIntro>Demonstrate that you understand the client's business, their industry, their specific challenges, and what success looks like for them. Reference the Compass session or discovery call.</SectionIntro>
        <TextQ label="Business overview — context, industry, and what you know about this client" rows={5} />
        <FieldGrid
          fields={[
            "Key Challenge 1",
            "Key Challenge 2",
            "Key Challenge 3",
          ]}
        />
        <TextQ label="What success looks like — list the outcomes the client wants to achieve" rows={3} />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="4.1 Proposed Engagement">
        <DataTable
          columns={[
            { label: "Phase", width: "12%" },
            { label: "Service / Product", width: "25%" },
            { label: "Description", width: "43%" },
            { label: "Timeline", width: "20%" },
          ]}
          rowCount={3}
          rows={[
            ["Phase 1", "", "", ""],
            ["Phase 2", "", "", ""],
            ["Phase 3", "", "", ""],
          ]}
        />
      </ToolSection>

      <ToolSection label="4.2 Deliverables">
        <FieldGrid
          fields={[
            "Deliverable 1",
            "Deliverable 2",
            "Deliverable 3",
            "Deliverable 4",
          ]}
        />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="5. Investment">
        <DataTable
          columns={[
            { label: "Item", width: "45%" },
            { label: "Investment (excl. VAT)", width: "30%" },
            { label: "Notes", width: "25%" },
          ]}
          rowCount={4}
          rows={[
            ["", "R", "50% deposit on signing"],
            ["", "R", ""],
            ["Ongoing retainer", "R/month", "Cancel with 30 days notice"],
            ["Total Engagement Value", "R", ""],
          ]}
        />
        <SectionIntro>All prices exclude VAT where applicable. Payment terms: 50% deposit on signing; balance per schedule above.</SectionIntro>
      </ToolSection>

      <ToolDivider />

      <ToolSection label="6. Timeline">
        <DataTable
          columns={[
            { label: "Week / Month", width: "20%" },
            { label: "Milestone", width: "55%" },
            { label: "Owner", width: "25%" },
          ]}
          rowCount={5}
          rows={[
            ["Week 1", "Kick-off call + briefing documents", "Vula + Client"],
            ["Week 2", "Discovery session", "Vula"],
            ["Week 3–4", "Report / deliverable delivery", "Vula"],
            ["Week 5+", "Implementation begins", "Vula"],
            ["Ongoing", "Monthly check-in + reporting", "Vula + Client"],
          ]}
        />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="7. Why Vula Solutions">
        <Checklist
          items={[
            "Proprietary DARES™ Framework — proven, structured, and repeatable",
            "Fixed, transparent pricing — no hidden fees",
            "Senior-led delivery — you work directly with Shiven Pillay, not junior staff",
            "South African context — built for the realities of doing business in SA",
            "Full spectrum — from strategy through implementation to ongoing support",
          ]}
        />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="8. Next Steps">
        <SectionIntro>To accept this proposal: (1) sign and return this proposal or the accompanying Client Agreement; (2) pay the deposit invoice to confirm the engagement; (3) Vula will schedule kick-off within the agreed number of business days.</SectionIntro>
        <FieldGrid
          fields={[
            "Days to schedule kick-off after deposit received",
            "Contact email",
            "Contact phone",
          ]}
        />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="9. Acceptance">
        <FieldGrid
          fields={[
            { label: "Vula Solutions Signatory", value: "Shiven Pillay" },
            "Vula Signature Date",
            "Client Signatory Name",
            "Client Signature Date",
          ]}
        />
      </ToolSection>
    </ToolPage>
  );
}