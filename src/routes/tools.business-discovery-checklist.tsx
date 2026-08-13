import { createFileRoute } from "@tanstack/react-router";
import {
  ToolPage, ToolSection, ToolDivider,
  FieldGrid, TextQ, Checklist, RatingTable, DataTable, CommitmentBox,
} from "@/components/site/ToolPage";

export const Route = createFileRoute("/tools/business-discovery-checklist")({
  head: () => ({
    meta: [
      { title: "Business Discovery Checklist — Vula Solutions" },
      { name: "description", content: "Evaluate where your business is today and identify where to focus next. A free structured worksheet from Vula Solutions." },
      { property: "og:title", content: "Business Discovery Checklist" },
      { property: "og:description", content: "Evaluate where your business is today and identify where to focus next. Free from Vula Solutions." },
      { property: "og:url", content: "https://vula.co.za/tools/business-discovery-checklist" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://vula.co.za/tools/business-discovery-checklist" }],
  }),
  component: BusinessDiscoveryChecklistPage,
});

function BusinessDiscoveryChecklistPage() {
  return (
    <ToolPage
      title="Business Discovery Checklist"
      tagline="Discover where your business is today — and identify where to focus next."
      type="Checklist"
      about="Every successful business makes decisions based on understanding, not assumptions. This checklist helps you evaluate the current state of your business, identify strengths, and prioritise improvement opportunities. Complete each section honestly for the most valuable outcome."
      howTo={["Complete every section", "Answer honestly", "Capture notes throughout", "Identify improvement opportunities", "Prioritise your next steps"]}
    >
      <ToolSection label="Business Overview">
        <FieldGrid fields={["Business Name", "Industry", "No. of Employees", "Years in Business", "Completed By", "Date"]} />
      </ToolSection>

      <ToolSection label="Business Goals">
        <TextQ label="What does your business do?" />
        <TextQ label="Who are your ideal customers?" />
        <TextQ label="What are your top three business goals?" rows={3} />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="Business Health Check">
        <RatingTable
          intro="Rate each statement from 1 (Strongly Disagree) to 5 (Strongly Agree). Click or tap to record your rating."
          rows={[
            { label: "We have clear business goals.", id: "hc1" },
            { label: "We understand our customers.", id: "hc2" },
            { label: "Our processes are documented.", id: "hc3" },
            { label: "Technology supports our goals.", id: "hc4" },
          ]}
        />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="Technology & Systems">
        <Checklist items={[
          "Our systems integrate well.",
          "Information is easy to find.",
          "We avoid duplicate work.",
          "Reporting is accurate.",
          "Technology supports our business goals.",
          "Security is taken seriously.",
        ]} />
        <div className="mt-3.5">
          <TextQ label="Which systems cause the most frustration?" />
        </div>
      </ToolSection>

      <ToolDivider />

      <ToolSection label="Opportunities for Improvement">
        <TextQ label="What's working well?" rows={3} />
        <TextQ label="What needs improvement?" rows={3} />
        <TextQ label="What should be your highest priority?" />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="Action Plan">
        <DataTable
          columns={[
            { label: "Priority", width: "38%" },
            { label: "Why is this important?", width: "44%" },
            { label: "Target Date", width: "18%" },
          ]}
        />
      </ToolSection>

      <CommitmentBox prompt="The one thing I will improve first is:" />
    </ToolPage>
  );
}