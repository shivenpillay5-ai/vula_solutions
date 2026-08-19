import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ToolPage, ToolSection, ToolDivider,
  Checklist, RatingTable, DataTable, SectionIntro,
} from "@/components/site/ToolPage";

export const Route = createFileRoute("/tools/ai-readiness-assessment")({
  head: () => ({
    meta: [
      { title: "AI Readiness Assessment â€” Vula Solutions" },
      { name: "description", content: "Evaluate your organisation's readiness to adopt artificial intelligence responsibly. A free structured assessment from Vula Solutions." },
      { property: "og:title", content: "AI Readiness Assessment" },
      { property: "og:description", content: "Evaluate your organisation's readiness to adopt AI responsibly, identify strengths and gaps, and define your next steps." },
      { property: "og:url", content: "https://vulasolutions.co.za/tools/ai-readiness-assessment" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://vulasolutions.co.za/tools/ai-readiness-assessment" }],
  }),
  component: AIReadinessAssessmentPage,
});

const TEAL = "#01A1B7";
const RULE = "#DDE3E9";
const LIFT = "#F5F7F9";
const INK  = "#0F1923";
const SLATE = "#5A6A7A";

const AI_USAGE_OPTIONS = [
  "We do not currently use AI.",
  "Individuals occasionally use AI tools.",
  "Some teams use AI regularly.",
  "AI is embedded in our daily operations.",
];

function AIReadinessAssessmentPage() {
  const [usage, setUsage] = useState<string | null>(null);

  return (
    <ToolPage
      title="AI Readiness Assessment"
      tagline="Evaluate your organisation's readiness to adopt AI responsibly."
      type="Assessment"
      about="Artificial Intelligence can create significant business value, but successful adoption starts with strong foundations. This assessment helps you understand your current level of readiness and identify practical next steps."
      howTo={["Complete every section honestly", "Involve business and technical stakeholders", "Identify strengths and gaps", "Prioritise your next actions"]}
    >
      <ToolSection label="Current AI Usage">
        <SectionIntro>Select the statement that best describes your organisation today.</SectionIntro>
        <div className="space-y-2">
          {AI_USAGE_OPTIONS.map(option => (
            <button
              key={option}
              type="button"
              onClick={() => setUsage(option)}
              className="flex w-full items-center gap-3 rounded border px-4 py-3 text-left text-[13px] transition"
              style={{
                borderColor: usage === option ? TEAL : RULE,
                background: usage === option ? "#E6F6FA" : LIFT,
                color: INK,
              }}
            >
              <span
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2"
                style={{
                  borderColor: usage === option ? TEAL : RULE,
                  background: usage === option ? TEAL : "transparent",
                }}
              >
                {usage === option && <span className="h-2 w-2 rounded-full bg-white" />}
              </span>
              {option}
            </button>
          ))}
        </div>
      </ToolSection>

      <ToolDivider />

      <ToolSection label="Leadership Readiness">
        <RatingTable
          intro="Rate each statement from 1 (Strongly Disagree) to 5 (Strongly Agree)."
          rows={[
            { label: "Leadership understands AI opportunities.", id: "lr1" },
            { label: "Leadership understands AI risks.", id: "lr2" },
            { label: "We have clearly defined AI goals.", id: "lr3" },
            { label: "There is executive sponsorship for AI initiatives.", id: "lr4" },
          ]}
        />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="Data & Technology">
        <Checklist items={[
          "Our data is accurate and trusted by the business.",
          "We know where our data is stored and who owns it.",
          "Our systems integrate effectively.",
          "We have appropriate security controls in place.",
          "Our systems support automation and API connectivity.",
        ]} />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="People & Processes">
        <Checklist items={[
          "Our staff are open to change and new ways of working.",
          "Employees have access to AI training or guidance.",
          "We have a formal AI usage policy.",
          "We understand our privacy and compliance obligations around AI.",
        ]} />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="AI Opportunities">
        <SectionIntro>Which business areas could benefit most from AI? Describe the opportunity.</SectionIntro>
        <DataTable
          columns={[
            { label: "Business Area", width: "30%" },
            { label: "Opportunity", width: "70%" },
          ]}
          rowCount={6}
        />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="Risks & Concerns">
        <Checklist items={[
          "Data privacy",
          "Security vulnerabilities",
          "Accuracy and reliability of AI outputs",
          "Regulatory compliance",
          "Staff adoption and change resistance",
          "Cost and ROI uncertainty",
          "Skills and capability gaps",
        ]} />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="Readiness Summary">
        <div className="mb-5 overflow-x-auto">
          <table className="w-full border-collapse text-[12.5px]" style={{ minWidth: 360 }}>
            <tbody>
              {[
                { range: "0â€“20", label: "Early Stage", desc: "Foundational work needed before AI adoption." },
                { range: "21â€“40", label: "Building Foundations", desc: "Starting to create the conditions for AI." },
                { range: "41â€“60", label: "Ready to Explore", desc: "Pilot projects and targeted use cases are viable." },
                { range: "61â€“80", label: "AI Enabled", desc: "AI is part of how you work; expand strategically." },
                { range: "81â€“100", label: "AI Accelerator", desc: "Lead and scale AI across the organisation." },
              ].map((row, i) => (
                <tr key={row.range} style={{ background: i % 2 === 1 ? LIFT : "#fff" }}>
                  <td className="px-3 py-2 font-semibold" style={{ borderBottom: `1px solid ${RULE}`, color: TEAL, width: "15%" }}>{row.range}</td>
                  <td className="px-3 py-2 font-semibold" style={{ borderBottom: `1px solid ${RULE}`, width: "30%" }}>{row.label}</td>
                  <td className="px-3 py-2" style={{ borderBottom: `1px solid ${RULE}`, color: SLATE }}>{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center gap-3 rounded border p-4" style={{ borderColor: RULE, background: LIFT }}>
          <span className="text-[11.5px] font-semibold shrink-0" style={{ color: SLATE }}>Your overall readiness score:</span>
          <input
            type="text"
            aria-label="Overall readiness score"
            className="flex-1 border-b border-transparent bg-transparent text-[14px] font-bold outline-none"
            style={{ color: INK }}
            onFocus={e => (e.target.style.borderColor = TEAL)}
            onBlur={e => (e.target.style.borderColor = "transparent")}
          />
        </div>
        <div className="mt-4">
          <div className="mb-2 text-[11.5px] font-semibold" style={{ color: SLATE }}>Recommended next actions:</div>
          {[1,2,3].map(n => (
            <div key={n} className="mb-2 flex items-center gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ background: TEAL }}>{n}</span>
              <input
                type="text"
                aria-label={`Recommended action ${n}`}
                className="flex-1 border-b border-transparent bg-transparent py-1 text-[13px] outline-none"
                style={{ color: INK }}
                onFocus={e => (e.target.style.borderColor = TEAL)}
                onBlur={e => (e.target.style.borderColor = "transparent")}
              />
            </div>
          ))}
        </div>
      </ToolSection>
    </ToolPage>
  );
}