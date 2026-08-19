import { createFileRoute } from "@tanstack/react-router";
import {
  ToolPage, ToolSection, ToolDivider,
  Checklist, TextQ, DataTable,
} from "@/components/site/ToolPage";

export const Route = createFileRoute("/tools/software-buying-checklist")({
  head: () => ({
    meta: [
      { title: "Software Buying Checklist â€” Vula Solutions" },
      { name: "description", content: "Choose business software with confidence. Define requirements, evaluate vendors objectively and avoid costly mistakes. Free from Vula Solutions." },
      { property: "og:title", content: "Software Buying Checklist" },
      { property: "og:description", content: "Choose business software with confidence. Define requirements, evaluate vendors objectively and avoid costly mistakes." },
      { property: "og:url", content: "https://vulasolutions.co.za/tools/software-buying-checklist" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://vulasolutions.co.za/tools/software-buying-checklist" }],
  }),
  component: SoftwareBuyingChecklistPage,
});

function SoftwareBuyingChecklistPage() {
  return (
    <ToolPage
      title="Software Buying Checklist"
      tagline="Choose software with confidence, not guesswork."
      type="Checklist"
      about="Selecting business software is a significant investment. This checklist helps you define your needs, evaluate vendors objectively, and avoid costly mistakes."
    >
      <ToolSection label="Before You Buy">
        <Checklist items={[
          "Define the business problem you are solving.",
          "Consult key stakeholders before shortlisting vendors.",
          "Document your requirements clearly.",
          "Set a realistic budget, including implementation.",
          "Agree on how you will measure success.",
        ]} />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="Business Requirements">
        <DataTable
          columns={[
            { label: "Requirement", width: "40%" },
            { label: "Priority (High / Med / Low)", width: "32%" },
            { label: "Desired Outcome", width: "28%" },
          ]}
        />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="Questions to Ask Vendors">
        <Checklist items={[
          "Can the software integrate with our existing systems?",
          "What implementation support is included?",
          "What training is provided for our team?",
          "What security standards do you follow?",
          "Can we export our data at any time?",
          "What are the ongoing support arrangements?",
          "Are there any hidden costs or add-ons?",
          "Can you provide customer references in our sector?",
        ]} />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="Total Cost of Ownership">
        <Checklist items={[
          "Licence or subscription fees",
          "Implementation and configuration",
          "Data migration",
          "Training",
          "Ongoing support and maintenance",
          "Customisation",
          "Integrations with other systems",
          "Future upgrades",
          "Internal staff time",
        ]} />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="Vendor Comparison">
        <DataTable
          columns={[
            { label: "Criteria", width: "28%" },
            { label: "Vendor A", width: "24%" },
            { label: "Vendor B", width: "24%" },
            { label: "Vendor C", width: "24%" },
          ]}
          rowCount={6}
        />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="Warning Signs">
        <div className="space-y-2.5 rounded border border-[#DDE3E9] p-4" style={{ background: "#FFF8F6" }}>
          {[
            "High-pressure sales tactics or artificial urgency",
            "No clear implementation plan or timeline",
            "Hidden pricing discovered after initial quote",
            "Long lock-in contracts with steep exit penalties",
            "Unwillingness to provide customer references",
          ].map(item => (
            <div key={item} className="flex items-start gap-2.5 text-[13px]">
              <span className="mt-0.5 shrink-0 text-[#C45C3A] font-bold">âš </span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </ToolSection>

      <ToolSection label="Final Decision">
        <TextQ label="Which solution best aligns with your business goals, budget, and long-term strategy?" rows={3} />
      </ToolSection>
    </ToolPage>
  );
}