import { createFileRoute } from "@tanstack/react-router";
import {
  ToolPage, ToolSection, ToolDivider,
  Checklist, FieldGrid, TextQ, DataTable,
} from "@/components/site/ToolPage";

export const Route = createFileRoute("/tools/project-risk-checklist")({
  head: () => ({
    meta: [
      { title: "Project Risk Checklist â€” Vula Solutions" },
      { name: "description", content: "Identify, assess and manage project risks before they become issues. A free risk register template from Vula Solutions." },
      { property: "og:title", content: "Project Risk Checklist" },
      { property: "og:description", content: "Identify project risks early, assign ownership, and define mitigation actions before issues derail your delivery." },
      { property: "og:url", content: "https://vulasolutions.co.za/tools/project-risk-checklist" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://vulasolutions.co.za/tools/project-risk-checklist" }],
  }),
  component: ProjectRiskChecklistPage,
});

function ProjectRiskChecklistPage() {
  return (
    <ToolPage
      title="Project Risk Checklist"
      tagline="Identify, assess and manage project risks before they become issues."
      type="Checklist"
      about="Every project carries risk. The difference between successful and unsuccessful projects is often how early those risks are identified and managed. This checklist helps project teams evaluate common risks, assign ownership and plan appropriate mitigation actions."
      howTo={["Identify potential risks at the start of the project", "Assess likelihood and impact for each risk", "Assign a clear risk owner", "Define specific mitigation actions", "Review risks regularly throughout the project lifecycle"]}
    >
      <ToolSection label="Project Information">
        <FieldGrid fields={["Project Name", "Project Manager", "Sponsor", "Start Date", "Target Completion", "Version"]} />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="Risk Register">
        <DataTable
          columns={[
            { label: "Risk Description", width: "28%" },
            { label: "Likelihood (H/M/L)", width: "16%" },
            { label: "Impact (H/M/L)", width: "14%" },
            { label: "Priority", width: "12%" },
            { label: "Owner", width: "15%" },
            { label: "Mitigation Action", width: "15%" },
          ]}
          rowCount={8}
        />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="Common Project Risks">
        <Checklist items={[
          "Scope changes after the project starts",
          "Budget overruns due to underestimation",
          "Resource constraints â€” key people unavailable",
          "Technology issues or vendor delays",
          "Poor stakeholder engagement or sponsorship",
          "Inadequate communication between teams",
          "Supplier or third-party delays",
          "Data quality issues affecting delivery",
          "Security and compliance concerns",
          "Training and adoption challenges at go-live",
        ]} />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="Risk Review">
        <TextQ label="Highest priority risks requiring immediate attention" rows={3} />
      </ToolSection>

      <ToolSection label="Actions Required">
        <DataTable
          columns={[
            { label: "Action", width: "40%" },
            { label: "Owner", width: "25%" },
            { label: "Due Date", width: "20%" },
            { label: "Status", width: "15%" },
          ]}
        />
      </ToolSection>
    </ToolPage>
  );
}