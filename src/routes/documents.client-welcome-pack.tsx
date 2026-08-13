import { createFileRoute } from "@tanstack/react-router";
import {
  ToolPage,
  ToolSection,
  ToolDivider,
  FieldGrid,
  DataTable,
  Checklist,
  SectionIntro,
} from "@/components/site/ToolPage";

export const Route = createFileRoute("/documents/client-welcome-pack")({
  head: () => ({
    meta: [{ title: "Client Welcome Pack — Vula Internal" }],
  }),
  component: ClientWelcomePack,
});

function ClientWelcomePack() {
  return (
    <ToolPage
      title="Client Welcome Pack"
      tagline="Send to clients 2–3 days before their Compass™ session — personalise all [bracket] fields"
      type="Client"
      about="Send this pack to the client 2–3 days before their Compass™ session. Fill in the Personalisation section at the top, then send as a PDF. The static sections (welcome letter, DARES™ overview, session agenda) are pre-written and do not need editing."
      badge="Internal Template"
      footerVariant="internal"
      backTo="/documents"
      backLabel="Documents"
      howTo={[
        "Personalise the client name and company in the fields below",
        "Add the session date and tier (Essential / Professional / Strategic)",
        "Add the session location or paste the video call link",
        "Send to the client 2–3 days before the session",
      ]}
    >
      <ToolSection label="Personalisation">
        <FieldGrid
          fields={[
            { label: "Client Name (First & Last)" },
            { label: "Client Company" },
            { label: "Session Type (Essential / Professional / Strategic)" },
            { label: "Session Date & Time" },
            { label: "Session Location / Video Call Link" },
          ]}
        />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="A Personal Welcome">
        <SectionIntro>
          "Thank you for choosing Vula Solutions. The fact that you are
          investing time and resources in a structured digital transformation
          conversation says a great deal about how seriously you take your
          business. My commitment to you is simple: every minute of our session
          will be focused on your business — your challenges, your
          opportunities, and what will actually make a difference for you. No
          generic advice. No unnecessary jargon. Just clarity, practical
          recommendations, and a clear path forward. I am looking forward to
          working with you." — Shiven Pillay, Founder, Vula Solutions
        </SectionIntro>
      </ToolSection>

      <ToolDivider />

      <ToolSection label="About Vula Solutions">
        <SectionIntro>
          Vula Solutions is a South African digital transformation consultancy
          built specifically for SMEs. We believe that every ambitious South
          African business deserves access to the same quality of strategic
          digital thinking that large corporations take for granted. Everything
          we do is structured around the DARES™ Framework — our proprietary
          methodology that ensures every engagement delivers measurable,
          practical, and lasting value.
        </SectionIntro>
      </ToolSection>

      <ToolDivider />

      <ToolSection label="The DARES™ Framework">
        <SectionIntro>
          Every Compass session follows the DARES™ methodology — a structured
          approach that moves from deep understanding of your business through
          to a clear, prioritised plan for what comes next.
        </SectionIntro>
        <DataTable
          columns={[
            { label: "Phase", width: "25%" },
            { label: "What This Means for You", width: "75%" },
          ]}
          rows={[
            [
              "D — Discover",
              "We start by truly understanding your business — not just the surface, but the systems, processes, people, and ambitions that drive it",
            ],
            [
              "A — Assess",
              "We benchmark your digital maturity, identify gaps, and quantify the opportunities hiding in your current operation",
            ],
            [
              "R — Recommend",
              "You receive a prioritised, practical roadmap — not a wishlist, but a plan you can actually execute given your budget and capacity",
            ],
            [
              "E — Execute",
              "If you choose to proceed, Vula can implement the recommendations through our delivery products",
            ],
            [
              "S — Support",
              "For ongoing clients, we provide fractional strategic support to keep you on track and growing",
            ],
          ]}
        />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="Preparing for Your Session">
        <SectionIntro>
          To get the most from your Compass session, please take 15–20 minutes
          to think through the following before we meet.
        </SectionIntro>
        <Checklist
          items={[
            "What are the top 3 digital problems costing you time or money right now?",
            "If possible, note your current monthly spend on: website, advertising, software tools, admin staff",
            "Have access to your website admin panel (if applicable) — we may look at it together",
            "Think about: Who are your top 3 competitors? What do they do digitally that you don't?",
            "Write down your revenue goal for the next 12 months",
          ]}
        />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="If You Are Bringing a Team">
        <SectionIntro>
          For Professional and Strategic tier sessions where team members will
          be present, please brief them before the session.
        </SectionIntro>
        <Checklist
          items={[
            "Brief your team in advance — let them know this is an open, honest conversation",
            "Encourage them to flag the digital pain points they experience day-to-day",
            "If there are tensions around digital topics in the team, name them — we address them constructively",
          ]}
        />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="What to Expect on the Day">
        <DataTable
          columns={[
            { label: "Time", width: "30%" },
            { label: "What Happens", width: "70%" },
          ]}
          rows={[
            [
              "Opening (15 min)",
              "Introductions, agenda walk-through, and context-setting",
            ],
            [
              "Discovery (Varies)",
              "Deep-dive into your business — context, history, current state, team, and systems",
            ],
            [
              "Assessment (Varies)",
              "Digital audit — we review your online presence, tools, and processes together",
            ],
            [
              "Recommendations (Varies)",
              "We work through prioritised recommendations in real time",
            ],
            [
              "Roadmap & Next Steps (15 min)",
              "Agree on the top priorities and confirm next steps after the session",
            ],
          ]}
        />
        <SectionIntro>
          You will receive your written Compass Report within 2–3 business days
          of the session.
        </SectionIntro>
      </ToolSection>

      <ToolDivider />

      <ToolSection label="After Your Session">
        <Checklist
          items={[
            "Send the branded Compass Report with full findings and recommendations within 2–3 business days",
            "Remind the client the report is theirs — they can share it with their team, board, or accountant",
            "Follow up within 5 business days to discuss next steps",
            "Confirm there is no obligation to proceed — the Compass report stands alone as a valuable document",
          ]}
        />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="Contact & Logistics">
        <FieldGrid
          fields={[
            { label: "Consultant", value: "Shiven Pillay" },
            { label: "Email" },
            { label: "Phone / WhatsApp" },
            { label: "Session Location / Video Call Link" },
            { label: "Session Date & Time" },
          ]}
        />
      </ToolSection>
    </ToolPage>
  );
}