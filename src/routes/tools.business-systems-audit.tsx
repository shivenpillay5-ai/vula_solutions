import { createFileRoute } from "@tanstack/react-router";
import {
  ToolPage, ToolSection, ToolDivider,
  Checklist, RatingTable, TextQ, DataTable,
} from "@/components/site/ToolPage";

export const Route = createFileRoute("/tools/business-systems-audit")({
  head: () => ({
    meta: [
      { title: "Business Systems Audit — Vula Solutions" },
      { name: "description", content: "Assess whether your current technology supports your business goals. A free audit template to evaluate systems, identify gaps, and plan improvements." },
      { property: "og:title", content: "Business Systems Audit" },
      { property: "og:description", content: "Assess whether your current technology supports your business goals. Identify gaps, risks, and improvement opportunities." },
      { property: "og:url", content: "https://vula.co.za/tools/business-systems-audit" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://vula.co.za/tools/business-systems-audit" }],
  }),
  component: BusinessSystemsAuditPage,
});

function BusinessSystemsAuditPage() {
  return (
    <ToolPage
      title="Business Systems Audit"
      tagline="Assess whether your business systems support your goals."
      type="Audit"
      about="Most businesses rely on multiple systems to manage operations. This audit helps you evaluate whether your current technology supports your people, processes, and long-term business objectives."
      howTo={["List your current business systems", "Assess each system objectively", "Identify gaps and risks", "Prioritise improvements"]}
    >
      <ToolSection label="Current Business Systems">
        <DataTable
          columns={[
            { label: "System Name", width: "25%" },
            { label: "Purpose", width: "30%" },
            { label: "Owner", width: "20%" },
            { label: "Notes / Issues", width: "25%" },
          ]}
          rowCount={6}
        />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="System Assessment">
        <RatingTable
          intro="Rate each area from 1 (Poor) to 5 (Excellent) based on your overall system landscape."
          lowLabel="Poor"
          highLabel="Excellent"
          rows={[
            { label: "Ease of Use — are systems easy for staff to use day-to-day?", id: "sa1" },
            { label: "Reliability — do systems perform consistently without failures?", id: "sa2" },
            { label: "Performance — are systems fast enough for your needs?", id: "sa3" },
            { label: "Integration — do systems share data and communicate effectively?", id: "sa4" },
            { label: "Reporting — can you get the business insights you need?", id: "sa5" },
            { label: "Security — are your systems and data appropriately protected?", id: "sa6" },
            { label: "Scalability — will your systems support future growth?", id: "sa7" },
          ]}
        />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="Risk Assessment">
        <Checklist items={[
          "Duplicate data across multiple systems",
          "Manual workarounds to compensate for system gaps",
          "Limited or inaccurate reporting",
          "Poor integration between systems",
          "Security concerns or outdated access controls",
          "Single points of failure with no backup",
          "High support costs relative to value delivered",
        ]} />
        <div className="mt-4">
          <TextQ label="What are the biggest technology challenges facing your business right now?" rows={3} />
        </div>
      </ToolSection>

      <ToolDivider />

      <ToolSection label="Improvement Roadmap">
        <DataTable
          columns={[
            { label: "Improvement", width: "32%" },
            { label: "Business Benefit", width: "28%" },
            { label: "Priority", width: "20%" },
            { label: "Target Date", width: "20%" },
          ]}
        />
      </ToolSection>
    </ToolPage>
  );
}