import { createFileRoute } from "@tanstack/react-router";
import {
  ToolPage, ToolSection, ToolDivider,
  Checklist, FieldGrid, TextQ, DataTable,
} from "@/components/site/ToolPage";

export const Route = createFileRoute("/tools/requirements-workshop-guide")({
  head: () => ({
    meta: [
      { title: "Requirements Workshop Guide â€” Vula Solutions" },
      { name: "description", content: "Capture clear business requirements before starting any project. A free workshop facilitation guide to plan, run and document a structured requirements session." },
      { property: "og:title", content: "Requirements Workshop Guide" },
      { property: "og:description", content: "Plan and facilitate a structured requirements workshop that produces clear, actionable outcomes before any project begins." },
      { property: "og:url", content: "https://vulasolutions.co.za/tools/requirements-workshop-guide" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://vulasolutions.co.za/tools/requirements-workshop-guide" }],
  }),
  component: RequirementsWorkshopGuidePage,
});

function RequirementsWorkshopGuidePage() {
  return (
    <ToolPage
      title="Requirements Workshop Guide"
      tagline="Capture clear business requirements before starting any project."
      type="Guide"
      about="Successful projects begin with a shared understanding of the business problem. This guide helps you plan and facilitate a structured requirements workshop that produces clear, actionable outcomes and reduces project risk."
    >
      <ToolSection label="Workshop Preparation">
        <Checklist items={[
          "Define the business problem the project will solve.",
          "Identify all stakeholders who should attend.",
          "Prepare any supporting documents or background materials.",
          "Confirm the workshop objectives with the project sponsor.",
          "Book the venue or online meeting platform.",
        ]} />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="Workshop Information">
        <FieldGrid fields={["Workshop Name", "Facilitator", "Date & Time", "Business Area", "Project Sponsor", "Objective"]} />
        <div className="mt-3.5">
          <TextQ label="Attendees and their roles" />
        </div>
      </ToolSection>

      <ToolDivider />

      <ToolSection label="Workshop Agenda">
        <Checklist items={[
          "Welcome & introductions â€” set the scene and confirm objectives",
          "Business context â€” what problem are we solving and why?",
          "Current process review â€” walk through how things work today",
          "Challenges & pain points â€” what is frustrating or broken?",
          "Future state discussion â€” what does good look like?",
          "Requirements prioritisation â€” agree on must-haves vs nice-to-haves",
          "Next steps â€” confirm actions, owners and timeline",
        ]} />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="Requirements Capture">
        <DataTable
          columns={[
            { label: "Requirement", width: "36%" },
            { label: "Priority (Must / Should / Could)", width: "28%" },
            { label: "Owner", width: "18%" },
            { label: "Notes", width: "18%" },
          ]}
          rowCount={6}
        />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="Risks, Assumptions & Open Questions">
        <TextQ label="Risks â€” what could go wrong or block delivery?" rows={2} />
        <TextQ label="Assumptions â€” what are we assuming to be true?" rows={2} />
        <TextQ label="Open questions â€” what do we still need to resolve?" rows={2} />
        <TextQ label="Decisions made during the workshop" rows={2} />
      </ToolSection>

      <ToolSection label="Workshop Outcomes">
        <TextQ label="Key decisions and agreements reached" rows={3} />
        <TextQ label="Next actions â€” what happens after this workshop?" rows={3} />
      </ToolSection>
    </ToolPage>
  );
}