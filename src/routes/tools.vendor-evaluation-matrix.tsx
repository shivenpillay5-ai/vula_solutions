import { createFileRoute } from "@tanstack/react-router";
import {
  ToolPage, ToolSection, ToolDivider,
  TextQ, DataTable,
} from "@/components/site/ToolPage";

export const Route = createFileRoute("/tools/vendor-evaluation-matrix")({
  head: () => ({
    meta: [
      { title: "Vendor Evaluation Matrix — Vula Solutions" },
      { name: "description", content: "Compare potential vendors objectively and confidently. A free weighted scoring matrix to evaluate technology partners against the criteria that matter most." },
      { property: "og:title", content: "Vendor Evaluation Matrix" },
      { property: "og:description", content: "A free weighted scoring matrix to compare vendors objectively — covering fit, functionality, support, security, cost and more." },
      { property: "og:url", content: "https://vula.co.za/tools/vendor-evaluation-matrix" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://vula.co.za/tools/vendor-evaluation-matrix" }],
  }),
  component: VendorEvaluationMatrixPage,
});

const CRITERIA = [
  "Business Fit",
  "Ease of Use",
  "Functionality",
  "Integration",
  "Implementation Support",
  "Ongoing Support",
  "Security",
  "Scalability",
  "Vendor Reputation",
  "Total Cost of Ownership",
];

const TEAL = "#01A1B7";
const RULE = "#DDE3E9";
const LIFT = "#F5F7F9";
const INK  = "#0F1923";
const SLATE = "#5A6A7A";

function VendorEvaluationMatrixPage() {
  return (
    <ToolPage
      title="Vendor Evaluation Matrix"
      tagline="Compare potential vendors objectively and confidently."
      type="Matrix"
      about="Choosing the right technology partner requires more than comparing features and pricing. This evaluation matrix helps you assess vendors consistently against the criteria that matter most to your business, and arrive at a defensible recommendation."
      howTo={["Identify your evaluation criteria", "Assign a weighting to each criterion", "Score each vendor consistently (1–5)", "Multiply score × weight for a weighted total", "Compare the overall weighted results"]}
    >
      <ToolSection label="Step 1 — Define Evaluation Criteria & Weights">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse" style={{ minWidth: 380 }}>
            <thead>
              <tr>
                <th className="border-b-2 px-3 py-2.5 text-left text-[10px] font-bold uppercase tracking-[0.10em]" style={{ background: LIFT, borderColor: RULE, color: SLATE, width: "60%" }}>
                  Criterion
                </th>
                <th className="border-b-2 px-3 py-2.5 text-left text-[10px] font-bold uppercase tracking-[0.10em]" style={{ background: LIFT, borderColor: RULE, color: SLATE, width: "40%" }}>
                  Weight % (total must = 100%)
                </th>
              </tr>
            </thead>
            <tbody>
              {CRITERIA.map((criterion, i) => (
                <tr key={criterion} style={i % 2 === 1 ? { background: LIFT } : undefined}>
                  <td className="px-3 py-2 text-[13px]" style={{ borderBottom: i < CRITERIA.length - 1 ? `1px solid ${RULE}` : "none", color: INK }}>
                    {criterion}
                  </td>
                  <td className="px-3 py-1.5" style={{ borderBottom: i < CRITERIA.length - 1 ? `1px solid ${RULE}` : "none" }}>
                    <input
                      type="text"
                      aria-label={`Weight for ${criterion}`}
                      className="w-full border-b border-transparent bg-transparent py-1 text-[12.5px] outline-none"
                      style={{ color: INK }}
                      onFocus={e => (e.target.style.borderColor = TEAL)}
                      onBlur={e => (e.target.style.borderColor = "transparent")}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ToolSection>

      <ToolDivider />

      <ToolSection label="Step 2 — Score Each Vendor (1–5)">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse" style={{ minWidth: 480 }}>
            <thead>
              <tr>
                <th className="border-b-2 px-3 py-2.5 text-left text-[10px] font-bold uppercase tracking-[0.10em]" style={{ background: LIFT, borderColor: RULE, color: SLATE, width: "34%" }}>Criterion</th>
                <th className="border-b-2 px-3 py-2.5 text-left text-[10px] font-bold uppercase tracking-[0.10em]" style={{ background: LIFT, borderColor: RULE, color: SLATE, width: "22%" }}>Vendor A</th>
                <th className="border-b-2 px-3 py-2.5 text-left text-[10px] font-bold uppercase tracking-[0.10em]" style={{ background: LIFT, borderColor: RULE, color: SLATE, width: "22%" }}>Vendor B</th>
                <th className="border-b-2 px-3 py-2.5 text-left text-[10px] font-bold uppercase tracking-[0.10em]" style={{ background: LIFT, borderColor: RULE, color: SLATE, width: "22%" }}>Vendor C</th>
              </tr>
            </thead>
            <tbody>
              {CRITERIA.map((criterion, i) => (
                <tr key={criterion} style={i % 2 === 1 ? { background: LIFT } : undefined}>
                  <td className="px-3 py-2 text-[12.5px]" style={{ borderBottom: i < CRITERIA.length - 1 ? `1px solid ${RULE}` : "none", color: INK }}>
                    {criterion}
                  </td>
                  {["A","B","C"].map(v => (
                    <td key={v} className="px-3 py-1.5" style={{ borderBottom: i < CRITERIA.length - 1 ? `1px solid ${RULE}` : "none" }}>
                      <input
                        type="text"
                        aria-label={`Vendor ${v} score for ${criterion}`}
                        className="w-full border-b border-transparent bg-transparent py-1 text-[12.5px] outline-none"
                        style={{ color: INK }}
                        onFocus={e => (e.target.style.borderColor = TEAL)}
                        onBlur={e => (e.target.style.borderColor = "transparent")}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ToolSection>

      <ToolDivider />

      <ToolSection label="Step 3 — Qualitative Assessment">
        <TextQ label="Key strengths of your preferred vendor" rows={2} />
        <TextQ label="Weaknesses or risks to address" rows={2} />
        <TextQ label="Questions still to clarify before deciding" rows={2} />
      </ToolSection>

      <ToolSection label="Final Recommendation">
        <DataTable
          columns={[
            { label: "Preferred Vendor", width: "35%" },
            { label: "Reason for Recommendation", width: "65%" },
          ]}
          rowCount={1}
        />
      </ToolSection>
    </ToolPage>
  );
}