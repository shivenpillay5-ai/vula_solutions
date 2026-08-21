import { createFileRoute } from "@tanstack/react-router";
import {
  ToolPage, ToolSection, ToolDivider,
  FieldGrid, TextQ, Checklist,
} from "@/components/site/ToolPage";

export const Route = createFileRoute("/tools/meeting-agenda-templates")({
  head: () => ({
    meta: [
      { title: "Meeting Agenda Templates | Vula Solutions" },
      { name: "description", content: "Run productive meetings with clear objectives and outcomes. Four free meeting agenda templates: team, project kick-off, requirements workshop, and leadership." },
      { property: "og:title", content: "Meeting Agenda Templates" },
      { property: "og:description", content: "Four free meeting agenda templates designed to help you run focused meetings and capture decisions, actions, and outcomes." },
      { property: "og:url", content: "https://vulasolutions.co.za/tools/meeting-agenda-templates" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://vulasolutions.co.za/tools/meeting-agenda-templates" }],
  }),
  component: MeetingAgendaTemplatesPage,
});

function MeetingAgendaTemplatesPage() {
  return (
    <ToolPage
      title="Meeting Agenda Templates"
      tagline="Run productive meetings with clear objectives and outcomes."
      type="Template"
      about="Effective meetings begin with preparation. These templates help you run focused meetings, capture decisions, assign actions and improve accountability. Use the template that fits your meeting type."
    >
      <ToolSection label="Template 1: General Team Meeting">
        <FieldGrid fields={["Meeting Purpose", "Date & Time", "Facilitator"]} />
        <div className="mt-3.5">
          <TextQ label="Attendees" />
          <TextQ label="Agenda items" rows={3} />
          <TextQ label="Key discussion points and decisions" rows={3} />
          <TextQ label="Actions & owners (who will do what by when?)" rows={3} />
        </div>
      </ToolSection>

      <ToolDivider />

      <ToolSection label="Template 2: Project Kick-off Meeting">
        <FieldGrid fields={["Project Name", "Date & Time", "Project Manager", "Sponsor"]} />
        <div className="mt-3.5">
          <TextQ label="Project objectives" rows={2} />
          <TextQ label="Scope: what is in and out of scope?" rows={2} />
          <TextQ label="Roles & responsibilities" rows={2} />
          <TextQ label="Key milestones and dates" rows={2} />
          <TextQ label="Risks and dependencies identified" rows={2} />
          <TextQ label="Next steps and actions" rows={2} />
        </div>
      </ToolSection>

      <ToolDivider />

      <ToolSection label="Template 3: Requirements Workshop">
        <FieldGrid fields={["Workshop Name", "Date & Time", "Facilitator", "Business Area"]} />
        <div className="mt-3.5">
          <TextQ label="Attendees and their roles" />
          <TextQ label="Business problem being solved" rows={2} />
          <TextQ label="Requirements captured" rows={4} />
          <TextQ label="Assumptions made during the session" rows={2} />
          <TextQ label="Open questions to resolve" rows={2} />
          <TextQ label="Actions and owners" rows={2} />
        </div>
      </ToolSection>

      <ToolDivider />

      <ToolSection label="Template 4: Weekly Leadership Meeting">
        <FieldGrid fields={["Date & Time", "Facilitator"]} />
        <div className="mt-3.5">
          <TextQ label="Business updates from each area" rows={3} />
          <TextQ label="Key performance indicators (KPIs)" rows={2} />
          <TextQ label="Risks, issues and blockers" rows={2} />
          <TextQ label="Decisions made this week" rows={2} />
          <TextQ label="Priority actions for the coming week" rows={2} />
        </div>
      </ToolSection>

      <ToolDivider />

      <ToolSection label="Meeting Best Practices">
        <Checklist items={[
          "Distribute the agenda at least 24 hours before the meeting.",
          "Start and finish on time, every time.",
          "Assign a clear owner to every action before the meeting ends.",
          "Record decisions as they are made, not afterwards.",
          "Review outstanding actions at the start of the next meeting.",
        ]} />
      </ToolSection>
    </ToolPage>
  );
}