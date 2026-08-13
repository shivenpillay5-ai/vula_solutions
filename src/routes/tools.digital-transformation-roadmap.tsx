import { createFileRoute } from "@tanstack/react-router";
import {
  ToolPage, ToolSection, ToolDivider,
  Checklist, TextQ, DataTable,
} from "@/components/site/ToolPage";

export const Route = createFileRoute("/tools/digital-transformation-roadmap")({
  head: () => ({
    meta: [
      { title: "Digital Transformation Roadmap — Vula Solutions" },
      { name: "description", content: "A practical, four-stage roadmap for transforming your business with confidence. Assess where you are, define your vision, and plan the path forward. Free from Vula Solutions." },
      { property: "og:title", content: "Digital Transformation Roadmap" },
      { property: "og:description", content: "A practical, four-stage roadmap for transforming your business with confidence — from current state to a clear implementation plan." },
      { property: "og:url", content: "https://vula.co.za/tools/digital-transformation-roadmap" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://vula.co.za/tools/digital-transformation-roadmap" }],
  }),
  component: DigitalTransformationRoadmapPage,
});

const TEAL = "#01A1B7";
const RULE = "#DDE3E9";
const INK  = "#0F1923";
const SLATE = "#5A6A7A";

function StageHeader({ number, title }: { number: number; title: string }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white"
        style={{ background: TEAL }}
      >
        {number}
      </span>
      <span className="text-[13px] font-semibold" style={{ color: INK }}>{title}</span>
    </div>
  );
}

function DigitalTransformationRoadmapPage() {
  return (
    <ToolPage
      title="Digital Transformation Roadmap"
      tagline="A practical roadmap for transforming your business with confidence."
      type="Roadmap"
      about="Digital transformation is about improving the way your business operates, not simply adopting new technology. This roadmap helps you assess where you are today, define where you want to be, and identify the practical steps to get there."
      howTo={["Complete each stage in order", "Involve key stakeholders", "Focus on business outcomes", "Review and update regularly"]}
    >
      <ToolSection label="Stage 1 — Understand Your Current State">
        <StageHeader number={1} title="Where are we today?" />
        <DataTable
          columns={[
            { label: "Area", width: "25%" },
            { label: "Current State — describe what exists today", width: "75%" },
          ]}
          rowCount={5}
        />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="Stage 2 — Define Your Vision">
        <StageHeader number={2} title="Where do we want to be?" />
        <TextQ label="Describe what success looks like in the next 12–24 months." rows={3} />
        <div className="mt-1">
          <div className="mb-2 text-[11.5px] font-semibold" style={{ color: SLATE }}>Business priorities (select all that apply):</div>
          <Checklist items={[
            "Improve customer experience",
            "Increase operational efficiency",
            "Reduce costs",
            "Improve reporting and visibility",
            "Support growth and scale",
            "Strengthen security and resilience",
          ]} />
        </div>
      </ToolSection>

      <ToolDivider />

      <ToolSection label="Stage 3 — Build Your Roadmap">
        <StageHeader number={3} title="How do we get there?" />
        <DataTable
          columns={[
            { label: "Initiative", width: "32%" },
            { label: "Business Benefit", width: "32%" },
            { label: "Owner", width: "18%" },
            { label: "Target Date", width: "18%" },
          ]}
          rowCount={5}
        />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="Stage 4 — Risks & Dependencies">
        <StageHeader number={4} title="What could slow us down?" />
        <Checklist items={[
          "Budget constraints",
          "Skills and training gaps",
          "Change management and staff adoption",
          "Technology limitations",
          "Data quality",
          "Leadership commitment",
        ]} />
        <div className="mt-4">
          <TextQ label="How will you know your transformation has been successful? Define your success measures." rows={3} />
        </div>
      </ToolSection>
    </ToolPage>
  );
}