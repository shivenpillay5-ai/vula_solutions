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

export const Route = createFileRoute("/documents/scope-of-work")({
  head: () => ({ meta: [{ title: "Scope of Work Template — Vula Internal" }] }),
  component: ScopeOfWork,
});

function ScopeOfWork() {
  return (
    <ToolPage
      title="Scope of Work Template"
      tagline="Attach to the Client Agreement for every delivery engagement — use SOW-YYYY-NNN reference numbering"
      type="Legal"
      about="Complete a fresh SOW for every delivery engagement and attach it to the signed Client Agreement. Use SOW-YYYY-NNN reference numbering. Roles, Responsibilities, Change Request Process, and Payment Schedule are pre-written — only the project-specific fields need filling in."
      badge="Internal Template"
      footerVariant="internal"
      backTo="/documents"
      backLabel="Documents"
    >
      <ToolSection label="1. Project Information">
        <FieldGrid
          fields={[
            "Client Company",
            "Project Name",
            "SOW Reference (SOW-YYYY-NNN)",
            "Engagement Type (e.g. Compass Professional / Launch™ / Flow™)",
            "Client Contact (Name, Title, Email)",
            { label: "Project Manager (Vula)", value: "Shiven Pillay" },
            "Start Date",
            "Target Completion",
          ]}
        />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="2. Background & Objectives">
        <TextQ
          label="Background — summarise the client's business, current situation, and why they are engaging Vula"
          rows={4}
        />
        <TextQ
          label="Objectives — list each specific, measurable outcome this engagement will achieve"
          rows={3}
        />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="3. Deliverables">
        <DataTable
          columns={[
            { label: "#", width: "5%" },
            { label: "Deliverable", width: "25%" },
            { label: "Description", width: "38%" },
            { label: "Format", width: "15%" },
            { label: "Due Date", width: "17%" },
          ]}
          rowCount={5}
        />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="4. Timeline & Milestones">
        <DataTable
          columns={[
            { label: "Milestone", width: "20%" },
            { label: "Description", width: "38%" },
            { label: "Target Date", width: "20%" },
            { label: "Payment Trigger", width: "22%" },
          ]}
          rowCount={0}
          rows={[
            ["Kick-off", "Project briefing, access provisioning, sign-off on plan", "", "No"],
            ["Milestone 1", "", "", ""],
            ["Milestone 2", "", "", ""],
            ["Final Delivery", "All deliverables signed off by client", "", ""],
          ]}
        />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="5. Roles & Responsibilities">
        <SectionIntro>
          Vula Solutions will: deliver all services as described in this SOW; manage the project
          timeline and communicate proactively on any delays; provide a single point of contact
          (Shiven Pillay) throughout the engagement; and obtain client approval before moving to
          each new phase.
        </SectionIntro>
        <SectionIntro>
          The Client will: provide timely access to information, systems, and key personnel
          required; nominate a single point of contact for approvals and communications; review and
          approve (or request revisions to) deliverables within 5 business days; and pay invoices
          per the schedule in Section 7.
        </SectionIntro>
      </ToolSection>

      <ToolDivider />

      <ToolSection label="6. Out of Scope">
        <TextQ
          label="Items expressly excluded from this SOW — list each exclusion on a new line. Any work not explicitly described in Section 3 is also excluded unless agreed via a signed Change Request."
          rows={4}
        />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="7. Payment Schedule">
        <DataTable
          columns={[
            { label: "Invoice", width: "18%" },
            { label: "Amount", width: "22%" },
            { label: "Trigger", width: "37%" },
            { label: "Due", width: "23%" },
          ]}
          rowCount={0}
          rows={[
            ["Deposit", "50% of total fee", "On signing of this SOW", "On signing"],
            ["Milestone 1", "", "", "14 days from invoice"],
            ["Final Invoice", "Balance", "Client sign-off on final deliverable", "14 days from invoice"],
          ]}
        />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="8. Assumptions & Dependencies">
        <TextQ
          label="List each assumption or dependency on a new line (e.g. client will provide brand assets within 5 days of kick-off; client holds admin access to their website; third-party software costs are excluded and borne by the client)"
          rows={4}
        />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="9. Change Request Process">
        <SectionIntro>
          Any change to the scope, timeline, or budget of this engagement must be submitted as a
          written Change Request. Vula will assess the impact and respond within 3 business days.
          No change will be implemented until both parties sign the Change Request document.
        </SectionIntro>
      </ToolSection>

      <ToolDivider />

      <ToolSection label="10. Acceptance">
        <FieldGrid
          fields={[
            { label: "Vula Signatory", value: "Shiven Pillay" },
            "Vula Signature Date",
            "Client Signatory Name",
            "Client Signatory Title",
            "Client Signature Date",
          ]}
        />
      </ToolSection>
    </ToolPage>
  );
}