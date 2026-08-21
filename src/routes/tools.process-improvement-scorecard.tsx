import { createFileRoute } from "@tanstack/react-router";
import {
  ToolPage, ToolSection, ToolDivider,
  RatingTable, TextQ, DataTable,
} from "@/components/site/ToolPage";

export const Route = createFileRoute("/tools/process-improvement-scorecard")({
  head: () => ({
    meta: [
      { title: "Process Improvement Scorecard | Vula Solutions" },
      { name: "description", content: "Measure the effectiveness of your business processes and identify opportunities for improvement. A free scorecard from Vula Solutions." },
      { property: "og:title", content: "Process Improvement Scorecard" },
      { property: "og:description", content: "Rate your business processes across eight key areas and build a prioritised improvement plan." },
      { property: "og:url", content: "https://vulasolutions.co.za/tools/process-improvement-scorecard" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://vulasolutions.co.za/tools/process-improvement-scorecard" }],
  }),
  component: ProcessImprovementScorecardPage,
});

function ProcessImprovementScorecardPage() {
  return (
    <ToolPage
      title="Process Improvement Scorecard"
      tagline="Measure the effectiveness of your current business processes."
      type="Scorecard"
      about="Efficient processes improve productivity, consistency and customer satisfaction. Use this scorecard to evaluate your current processes and identify opportunities for improvement."
      howTo={["Complete every section", "Rate honestly: lower scores are more useful", "Capture specific notes for each area", "Prioritise improvements that deliver the greatest value"]}
    >
      <ToolSection label="Scorecard">
        <RatingTable
          intro="Rate each area from 1 (Needs Significant Improvement) to 5 (Excellent)."
          lowLabel="Needs Significant Improvement"
          highLabel="Excellent"
          rows={[
            { label: "Process Documentation: are your processes written down and up to date?", id: "pi1" },
            { label: "Roles & Responsibilities: does everyone know what they own?", id: "pi2" },
            { label: "Manual Work: how much unnecessary manual effort exists?", id: "pi3" },
            { label: "Automation: are repetitive tasks automated where possible?", id: "pi4" },
            { label: "Quality: are outputs consistently meeting the required standard?", id: "pi5" },
            { label: "Customer Experience: do your processes serve your customers well?", id: "pi6" },
            { label: "Reporting: do you have timely, accurate visibility of performance?", id: "pi7" },
            { label: "Continuous Improvement: do you actively review and improve processes?", id: "pi8" },
          ]}
        />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="Strengths">
        <TextQ label="Which processes work well and should be protected or replicated?" rows={3} />
      </ToolSection>

      <ToolSection label="Improvement Opportunities">
        <TextQ label="Which processes create the most delays, waste or frustration?" rows={3} />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="Priority Action Plan">
        <DataTable
          columns={[
            { label: "Improvement", width: "40%" },
            { label: "Owner", width: "30%" },
            { label: "Target Date", width: "30%" },
          ]}
        />
      </ToolSection>
    </ToolPage>
  );
}