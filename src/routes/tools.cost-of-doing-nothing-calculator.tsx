import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ToolPage, ToolSection, ToolDivider, SectionIntro, Checklist,
} from "@/components/site/ToolPage";

export const Route = createFileRoute("/tools/cost-of-doing-nothing-calculator")({
  head: () => ({
    meta: [
      { title: "Cost of Doing Nothing Calculator | Vula Solutions" },
      { name: "description", content: "A free automation ROI calculator for South African SMEs. Work out what manual, repetitive admin really costs your business each year, and what automation could recover." },
      { property: "og:title", content: "The Cost of Doing Nothing Calculator" },
      { property: "og:description", content: "Manual admin has no invoice, but it has a price. Calculate what repetitive work costs your business each year, in Rand." },
      { property: "og:url", content: "https://vulasolutions.co.za/tools/cost-of-doing-nothing-calculator" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://vulasolutions.co.za/tools/cost-of-doing-nothing-calculator" }],
  }),
  component: CostOfDoingNothingPage,
});

const TEAL = "#01A1B7";
const RULE = "#DDE3E9";
const LIFT = "#F5F7F9";
const INK  = "#0F1923";
const SLATE = "#5A6A7A";
const WARM = "#C45C3A";

const WORKING_WEEKS = 46;

const SCENARIOS = [
  { label: "Conservative", pct: 0.2, note: "20% of manual time recovered" },
  { label: "Realistic", pct: 0.35, note: "35% recovered, typical for a first automation project" },
  { label: "Ambitious", pct: 0.5, note: "50% recovered, for heavily manual operations" },
] as const;

function fmtRand(n: number) {
  return "R " + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function fmtHours(n: number) {
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function NumberField({
  label, hint, value, onChange, prefix,
}: {
  label: string; hint: string; value: string; prefix?: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="rounded border p-4" style={{ borderColor: RULE, background: LIFT }}>
      <label className="block">
        <span className="block text-[11.5px] font-semibold" style={{ color: SLATE }}>{label}</span>
        <span className="mt-0.5 block text-[11px]" style={{ color: SLATE, opacity: 0.8 }}>{hint}</span>
        <div className="mt-2 flex items-baseline gap-1.5">
          {prefix && <span className="text-[15px] font-semibold" style={{ color: SLATE }}>{prefix}</span>}
          <input
            type="number"
            min="0"
            inputMode="numeric"
            value={value}
            onChange={e => onChange(e.target.value)}
            className="w-full border-b-2 bg-transparent pb-1 text-[20px] font-bold outline-none"
            style={{ color: INK, borderColor: RULE }}
            onFocus={e => (e.target.style.borderColor = TEAL)}
            onBlur={e => (e.target.style.borderColor = RULE)}
          />
        </div>
      </label>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded border p-4" style={{ borderColor: accent ? TEAL : RULE, background: accent ? "#E6F6FA" : "#fff" }}>
      <div className="text-[10.5px] font-bold uppercase tracking-[0.10em]" style={{ color: SLATE }}>{label}</div>
      <div className="mt-1.5 text-[24px] font-bold leading-none" style={{ color: accent ? TEAL : INK, fontVariantNumeric: "tabular-nums" }}>{value}</div>
    </div>
  );
}

function CostOfDoingNothingPage() {
  const [people, setPeople] = useState("3");
  const [hours, setHours] = useState("5");
  const [rate, setRate] = useState("250");
  const [scenario, setScenario] = useState<typeof SCENARIOS[number]>(SCENARIOS[1]);

  const p = Math.max(0, Number(people) || 0);
  const h = Math.max(0, Number(hours) || 0);
  const r = Math.max(0, Number(rate) || 0);

  const annualHours = p * h * WORKING_WEEKS;
  const annualCost = annualHours * r;
  const savedHours = annualHours * scenario.pct;
  const savedCost = annualCost * scenario.pct;
  const hasInput = annualCost > 0;

  return (
    <ToolPage
      title="The Cost of Doing Nothing Calculator"
      tagline="Manual admin has no invoice. It still has a price. Work it out here."
      type="Calculator"
      about="Repetitive manual work never arrives as a bill, so it never gets scrutinised like one. This calculator turns the hours your team spends on rekeying, chasing, copying and reconciling into a Rand figure you can actually weigh against the cost of fixing it."
      howTo={["Estimate honestly: think of a normal week, not a good one", "Use the fully loaded hourly cost, not just salary", "Start with the Realistic scenario", "Compare the result against what a fix would cost"]}
    >
      <ToolSection label="Your Numbers">
        <div className="grid gap-4 sm:grid-cols-3">
          <NumberField
            label="People doing repetitive admin"
            hint="Anyone who rekeys, copies between systems, or chases by hand"
            value={people}
            onChange={setPeople}
          />
          <NumberField
            label="Hours per person, per week"
            hint="On manual, repetitive tasks a system could handle"
            value={hours}
            onChange={setHours}
          />
          <NumberField
            label="Average hourly cost"
            hint="Fully loaded: salary plus benefits, tax and overheads"
            value={rate}
            prefix="R"
            onChange={setRate}
          />
        </div>
      </ToolSection>

      <ToolDivider />

      <ToolSection label="What It Costs You">
        <SectionIntro>Based on {WORKING_WEEKS} working weeks per year.</SectionIntro>
        <div className="grid gap-4 sm:grid-cols-2">
          <Stat label="Hours lost per year" value={hasInput ? fmtHours(annualHours) + " hours" : "—"} />
          <Stat label="Cost per year" value={hasInput ? fmtRand(annualCost) : "—"} accent />
          <Stat label="Cost over three years" value={hasInput ? fmtRand(annualCost * 3) : "—"} />
          <div className="rounded border p-4" style={{ borderColor: RULE, background: "#FFF8F6" }}>
            <div className="text-[10.5px] font-bold uppercase tracking-[0.10em]" style={{ color: WARM }}>The part nobody budgets for</div>
            <p className="mt-1.5 text-[12.5px] leading-relaxed" style={{ color: SLATE }}>
              This figure excludes the errors, the delayed invoices, the slow quotes and the opportunities missed while your best people do work a system should be doing.
            </p>
          </div>
        </div>
      </ToolSection>

      <ToolDivider />

      <ToolSection label="What You Could Recover">
        <SectionIntro>Automation rarely removes manual work entirely. Pick a scenario for how much of that time a well-designed fix could realistically hand back.</SectionIntro>
        <div className="mb-5 grid gap-2 sm:grid-cols-3">
          {SCENARIOS.map(s => (
            <button
              key={s.label}
              type="button"
              onClick={() => setScenario(s)}
              className="rounded border px-4 py-3 text-left transition"
              style={{
                borderColor: scenario.label === s.label ? TEAL : RULE,
                background: scenario.label === s.label ? "#E6F6FA" : LIFT,
              }}
            >
              <span className="block text-[13px] font-semibold" style={{ color: INK }}>{s.label}</span>
              <span className="mt-0.5 block text-[11px]" style={{ color: SLATE }}>{s.note}</span>
            </button>
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Stat label="Hours back per year" value={hasInput ? fmtHours(savedHours) + " hours" : "—"} />
          <Stat label="Value recovered per year" value={hasInput ? fmtRand(savedCost) : "—"} accent />
        </div>
        {hasInput && (
          <p className="mt-5 text-[13px] leading-relaxed" style={{ color: INK }}>
            Now compare that to the price of fixing it. A single well-built workflow typically costs R5,000 to R25,000 once off. If your recoverable value above is a multiple of that, the manual way is the expensive way.
          </p>
        )}
      </ToolSection>

      <ToolDivider />

      <ToolSection label="Where the Hours Usually Hide">
        <Checklist items={[
          "Retyping the same information into more than one system",
          "Copying figures between spreadsheets, emails and accounting software",
          "Chasing quotes, approvals or payments by hand",
          "Assembling the same report manually every week or month",
          "Answering the same customer questions one at a time",
          "Fixing errors caused by all of the above",
        ]} />
        <p className="mt-5 text-[12px] leading-relaxed" style={{ color: SLATE }}>
          The calculation assumes {WORKING_WEEKS} productive weeks per year and uses your fully loaded hourly cost. It is a decision-making estimate, not a financial projection. The point is not the exact number; it is whether that number deserves a line on your agenda.
        </p>
      </ToolSection>
    </ToolPage>
  );
}
