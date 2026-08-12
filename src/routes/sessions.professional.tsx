import { useState, useEffect, useCallback } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Download, Check } from "lucide-react";
import { FormSection, Field, AreaField, SelectField, PillRadio, PillCheckbox, TwoCol } from "@/components/session/FormSection";
import { StakeholderTable } from "@/components/session/StakeholderTable";
import { ActionPlanTable } from "@/components/session/ActionPlanTable";
import { generateProfessionalReport } from "@/lib/generate-report";
import type { ProfessionalSession } from "@/lib/session-types";

export const Route = createFileRoute("/sessions/professional")({
  component: ProfessionalForm,
});

const today = new Date().toISOString().split("T")[0];
const STORAGE_KEY = "vula-session-professional";

const defaultForm: ProfessionalSession = {
  sessionDate: today,
  sessionLocation: "",
  consultant: "Shiven Pillay",
  clientName: "",
  clientTitle: "",
  company: "",
  industry: "",
  companySize: "",
  email: "",
  phone: "",
  website: "",
  businessDescription: "",
  targetClients: "",
  yearsInOperation: "",
  revenueRange: "",
  whatBroughtYouHere: "",
  biggestChallenge: "",
  goalIn12Months: "",
  triedBefore: "",
  sessionSuccess: "",
  hasWebsite: "",
  websiteUrl: "",
  websiteMobile: "",
  googleBusiness: "",
  socialPlatforms: [],
  hasOnlineReviews: "",
  digitalRating: "",
  digitalNotes: "",
  currentTools: "",
  biggestTimeDrain: "",
  thingsFallThrough: "",
  clientExperience: "",
  operationsNotes: "",
  keyObservations: "",
  strengthsToBuildOn: "",
  quickWins: "",
  roadmapImmediate: "",
  roadmapShortTerm: "",
  roadmapLongerTerm: "",
  recommendedSolutions: [],
  agreedActions: "",
  reportDeliveryDate: "",
  additionalNotes: "",
  stakeholders: [],
  revenueModel: "",
  growthTrend: "",
  headcount: "",
  teamStructure: "",
  strategicPriorities: "",
  topCompetitors: "",
  keyDifferentiator: "",
  howClientsFind: "",
  whereLooseDeals: "",
  competitiveNotes: "",
  mostRepetitiveTasks: "",
  dataCapture: "",
  aiToolsInUse: "",
  aiReadiness: "",
  topAutomationOpportunity: "",
  twoWeekActions: [],
};

const companySizes = [
  { value: "1–5 employees", label: "1–5 employees" },
  { value: "6–20 employees", label: "6–20 employees" },
  { value: "21–50 employees", label: "21–50 employees" },
  { value: "51–200 employees", label: "51–200 employees" },
  { value: "200+ employees", label: "200+ employees" },
];

const revenueRanges = [
  { value: "Under R1M", label: "Under R1M" },
  { value: "R1M–R5M", label: "R1M–R5M" },
  { value: "R5M–R20M", label: "R5M–R20M" },
  { value: "R20M–R100M", label: "R20M–R100M" },
  { value: "R100M+", label: "R100M+" },
];

const revenueModels = [
  { value: "Product sales", label: "Product sales" },
  { value: "Service-based", label: "Service-based" },
  { value: "Subscription / retainer", label: "Subscription / retainer" },
  { value: "Project-based", label: "Project-based" },
  { value: "Mixed", label: "Mixed" },
];

const growthTrends = [
  { value: "Strong growth (20%+)", label: "Strong growth (20%+)" },
  { value: "Moderate growth (5–20%)", label: "Moderate growth (5–20%)" },
  { value: "Stable", label: "Stable" },
  { value: "Declining", label: "Declining" },
  { value: "Uncertain / don't know", label: "Uncertain / don't know" },
];

const socialOptions = ["Facebook", "Instagram", "LinkedIn", "TikTok", "X / Twitter", "YouTube", "WhatsApp Business", "None"];
const solutions = ["Launch™", "Flow™", "Accelerate™", "Growth™", "Partner™"];
const aiReadinessOptions = ["1 — Not interested", "2 — Curious", "3 — Exploring options", "4 — Ready to pilot", "5 — Ready to implement"];

function ProfessionalForm() {
  const [form, setForm] = useState<ProfessionalSession>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...defaultForm, ...JSON.parse(saved) } : defaultForm;
    } catch {
      return defaultForm;
    }
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    setSaved(true);
    const t = setTimeout(() => setSaved(false), 1500);
    return () => clearTimeout(t);
  }, [form]);

  const set = useCallback(<K extends keyof ProfessionalSession>(field: K, value: ProfessionalSession[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  function handleClear() {
    if (window.confirm("Clear all form data? This cannot be undone.")) {
      setForm(defaultForm);
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Page header */}
      <div className="border-b border-border bg-background px-6 py-6">
        <div className="mx-auto max-w-3xl">
          <Link to="/sessions" className="mb-4 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition">
            <ArrowLeft className="h-3 w-3" /> Back to session forms
          </Link>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-electric">Compass™ Professional</p>
              <h1 className="mt-1 text-xl font-bold">Client Session Form</h1>
              <p className="mt-1 text-xs text-muted-foreground">Half-day session · Up to 5 stakeholders · R15,000</p>
            </div>
            <button onClick={handleClear} className="shrink-0 text-xs text-muted-foreground hover:text-foreground transition">
              Clear form
            </button>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="mx-auto max-w-3xl space-y-6 px-6 pt-8">

        {/* 1. Session Setup */}
        <FormSection title="1 — Session Setup">
          <TwoCol>
            <Field label="Session date" type="date" value={form.sessionDate} onChange={(e) => set("sessionDate", e.target.value)} />
            <Field label="Location / format" placeholder="In person · Video call · Address" value={form.sessionLocation} onChange={(e) => set("sessionLocation", e.target.value)} />
          </TwoCol>
          <Field label="Consultant" value={form.consultant} onChange={(e) => set("consultant", e.target.value)} />
        </FormSection>

        {/* 2. Client Information */}
        <FormSection title="2 — Client Information">
          <TwoCol>
            <Field label="Primary client name" placeholder="First and last name" value={form.clientName} onChange={(e) => set("clientName", e.target.value)} />
            <Field label="Title / role" placeholder="Owner, CEO, COO…" value={form.clientTitle} onChange={(e) => set("clientTitle", e.target.value)} />
          </TwoCol>
          <TwoCol>
            <Field label="Company name" value={form.company} onChange={(e) => set("company", e.target.value)} />
            <Field label="Industry" placeholder="Retail, Professional Services…" value={form.industry} onChange={(e) => set("industry", e.target.value)} />
          </TwoCol>
          <TwoCol>
            <SelectField label="Company size" options={companySizes} value={form.companySize} onChange={(e) => set("companySize", e.target.value)} />
            <Field label="Total headcount" placeholder="e.g. 32" value={form.headcount} onChange={(e) => set("headcount", e.target.value)} />
          </TwoCol>
          <TwoCol>
            <Field label="Email address" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} />
            <Field label="Phone number" type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
          </TwoCol>
          <Field label="Website URL" type="url" placeholder="https://" value={form.website} onChange={(e) => set("website", e.target.value)} />
        </FormSection>

        {/* 3. Stakeholder Register */}
        <FormSection title="3 — Stakeholder Register" description="Capture everyone in the room. Up to 5 participants.">
          <StakeholderTable value={form.stakeholders} onChange={(v) => set("stakeholders", v)} max={5} />
        </FormSection>

        {/* 4. Business Context */}
        <FormSection title="4 — Business Context" description="The foundation — what the business is, who it serves, how it's structured.">
          <AreaField
            label="What does the business do?"
            hint="Core offering, how revenue is generated"
            rows={3}
            placeholder="Describe the business in plain language…"
            value={form.businessDescription}
            onChange={(e) => set("businessDescription", e.target.value)}
          />
          <AreaField
            label="Who are your ideal clients?"
            rows={3}
            placeholder="Type of customer, industry, size, geography…"
            value={form.targetClients}
            onChange={(e) => set("targetClients", e.target.value)}
          />
          <TwoCol>
            <Field label="Years in operation" placeholder="e.g. 7 years" value={form.yearsInOperation} onChange={(e) => set("yearsInOperation", e.target.value)} />
            <SelectField label="Approximate annual revenue" options={revenueRanges} value={form.revenueRange} onChange={(e) => set("revenueRange", e.target.value)} />
          </TwoCol>
          <TwoCol>
            <SelectField label="Revenue model" options={revenueModels} value={form.revenueModel} onChange={(e) => set("revenueModel", e.target.value)} />
            <SelectField label="Growth trend (last 12 months)" options={growthTrends} value={form.growthTrend} onChange={(e) => set("growthTrend", e.target.value)} />
          </TwoCol>
          <AreaField
            label="Team structure"
            hint="Departments, functions, reporting lines"
            rows={3}
            placeholder="e.g. Sales (3), Operations (8), Finance (2), Owner-managed…"
            value={form.teamStructure}
            onChange={(e) => set("teamStructure", e.target.value)}
          />
        </FormSection>

        {/* 5. Challenges & Goals */}
        <FormSection title="5 — Challenges & Goals" description="Understand where they're stuck, what they're building toward, and what they've already tried.">
          <AreaField
            label="What brought you to this session?"
            hint="The trigger — what pushed them to act now"
            rows={3}
            placeholder="What's the one thing that made you pick up the phone?…"
            value={form.whatBroughtYouHere}
            onChange={(e) => set("whatBroughtYouHere", e.target.value)}
          />
          <AreaField
            label="What is your single biggest challenge right now?"
            rows={4}
            placeholder="In their own words…"
            value={form.biggestChallenge}
            onChange={(e) => set("biggestChallenge", e.target.value)}
          />
          <AreaField
            label="What does success look like in 12 months?"
            hint="Push for specifics — revenue, time, headcount, capability"
            rows={4}
            placeholder="In 12 months we would have…"
            value={form.goalIn12Months}
            onChange={(e) => set("goalIn12Months", e.target.value)}
          />
          <AreaField
            label="What have you tried that hasn't worked?"
            rows={3}
            placeholder="Tools purchased, consultants engaged, internal projects…"
            value={form.triedBefore}
            onChange={(e) => set("triedBefore", e.target.value)}
          />
          <AreaField
            label="Top 3 strategic priorities for the year"
            hint="What the leadership team has agreed to focus on"
            rows={4}
            placeholder="1. …\n2. …\n3. …"
            value={form.strategicPriorities}
            onChange={(e) => set("strategicPriorities", e.target.value)}
          />
        </FormSection>

        {/* 6. Digital Presence Audit */}
        <FormSection title="6 — Digital Presence Audit" description="Review their current digital footprint objectively.">
          <PillRadio label="Do they have a website?" options={["Yes", "No", "In progress"]} value={form.hasWebsite} onChange={(v) => set("hasWebsite", v)} />
          {form.hasWebsite === "Yes" && (
            <Field label="Website URL" type="url" placeholder="https://" value={form.websiteUrl} onChange={(e) => set("websiteUrl", e.target.value)} />
          )}
          <PillRadio label="Is the website mobile-friendly?" options={["Yes", "No", "Unsure", "N/A"]} value={form.websiteMobile} onChange={(v) => set("websiteMobile", v)} />
          <PillRadio label="Google Business Profile" options={["Yes — claimed & optimised", "Yes — not optimised", "No", "Unsure"]} value={form.googleBusiness} onChange={(v) => set("googleBusiness", v)} />
          <PillCheckbox label="Active social media platforms" options={socialOptions} value={form.socialPlatforms} onChange={(v) => set("socialPlatforms", v)} />
          <PillRadio label="Online reviews (Google, Hellopeter, etc.)" options={["Yes — actively managed", "Yes — not managed", "No", "N/A"]} value={form.hasOnlineReviews} onChange={(v) => set("hasOnlineReviews", v)} />
          <PillRadio label="Overall digital presence rating" options={["Strong", "Adequate", "Needs significant work", "Not started"]} value={form.digitalRating} onChange={(v) => set("digitalRating", v)} />
          <AreaField label="Digital notes" rows={3} placeholder="Specific observations, URLs to review later…" value={form.digitalNotes} onChange={(e) => set("digitalNotes", e.target.value)} />
        </FormSection>

        {/* 7. Operations Review */}
        <FormSection title="7 — Operations Review" description="Map the internal workings — tools, processes and where time is lost.">
          <AreaField
            label="Software and tools currently in use"
            hint="List everything — even Excel counts"
            rows={5}
            placeholder="Accounting: …\nCRM: …\nProject management: …\nComms: …\nOther: …"
            value={form.currentTools}
            onChange={(e) => set("currentTools", e.target.value)}
          />
          <AreaField
            label="What single process takes the most time each week?"
            rows={3}
            placeholder="Describe the process and roughly how many hours it consumes…"
            value={form.biggestTimeDrain}
            onChange={(e) => set("biggestTimeDrain", e.target.value)}
          />
          <AreaField
            label="Where do things fall through the cracks?"
            rows={3}
            placeholder="Missed follow-ups, lost quotes, forgotten tasks, handover failures…"
            value={form.thingsFallThrough}
            onChange={(e) => set("thingsFallThrough", e.target.value)}
          />
          <AreaField
            label="How do clients engage with the business?"
            hint="Before, during and after — the full client journey"
            rows={4}
            placeholder="How do clients find them → enquire → get onboarded → receive service → provide feedback → return or refer?…"
            value={form.clientExperience}
            onChange={(e) => set("clientExperience", e.target.value)}
          />
          <AreaField label="Operations notes" rows={3} placeholder="Internal notes, patterns noticed…" value={form.operationsNotes} onChange={(e) => set("operationsNotes", e.target.value)} />
        </FormSection>

        {/* 8. Competitive Landscape */}
        <FormSection title="8 — Competitive Landscape" description="Understand where they sit in the market and where they win or lose.">
          <AreaField
            label="Top 3 competitors"
            hint="Who they mention without prompting is most telling"
            rows={3}
            placeholder="1. …\n2. …\n3. …"
            value={form.topCompetitors}
            onChange={(e) => set("topCompetitors", e.target.value)}
          />
          <AreaField
            label="What is your key differentiator?"
            hint="Why do clients choose you over competitors?"
            rows={3}
            placeholder="What do you offer that others don't?…"
            value={form.keyDifferentiator}
            onChange={(e) => set("keyDifferentiator", e.target.value)}
          />
          <AreaField
            label="How do clients typically find you?"
            hint="Referrals, Google, social, word of mouth, other"
            rows={3}
            placeholder="Roughly what % comes from each channel?…"
            value={form.howClientsFind}
            onChange={(e) => set("howClientsFind", e.target.value)}
          />
          <AreaField
            label="Where do you typically lose deals?"
            hint="Price, speed, trust, lack of digital presence, unknown brand"
            rows={3}
            placeholder="What reason do prospects give when they don't proceed?…"
            value={form.whereLooseDeals}
            onChange={(e) => set("whereLooseDeals", e.target.value)}
          />
          <AreaField label="Competitive notes" rows={2} placeholder="Additional observations…" value={form.competitiveNotes} onChange={(e) => set("competitiveNotes", e.target.value)} />
        </FormSection>

        {/* 9. AI & Automation Readiness */}
        <FormSection title="9 — AI & Automation Readiness" description="Assess appetite and opportunity for technology leverage.">
          <AreaField
            label="Which tasks are most repetitive or manual?"
            hint="Where is time wasted on work a system could do?"
            rows={4}
            placeholder="Data entry, report generation, follow-up emails, quote building, scheduling…"
            value={form.mostRepetitiveTasks}
            onChange={(e) => set("mostRepetitiveTasks", e.target.value)}
          />
          <AreaField
            label="What data does the business capture, and where does it live?"
            hint="Spreadsheets, systems, in people's heads, nowhere"
            rows={3}
            placeholder="Sales data in Excel, client notes in WhatsApp, invoices in Xero…"
            value={form.dataCapture}
            onChange={(e) => set("dataCapture", e.target.value)}
          />
          <AreaField
            label="AI or automation tools currently in use"
            hint="ChatGPT, Zapier, Make, Copilot, industry-specific tools"
            rows={3}
            placeholder="None / ChatGPT for drafting emails / Zapier for one workflow / …"
            value={form.aiToolsInUse}
            onChange={(e) => set("aiToolsInUse", e.target.value)}
          />
          <PillRadio
            label="AI readiness rating"
            hint="1 = not interested, 5 = ready to implement"
            options={aiReadinessOptions}
            value={form.aiReadiness}
            onChange={(v) => set("aiReadiness", v)}
          />
          <AreaField
            label="Single highest-value automation opportunity"
            hint="The one thing that, if automated, would save the most time or money"
            rows={3}
            placeholder="If we could automate one thing tomorrow, it would be…"
            value={form.topAutomationOpportunity}
            onChange={(e) => set("topAutomationOpportunity", e.target.value)}
          />
        </FormSection>

        {/* 10. Consultant Findings */}
        <FormSection title="10 — Consultant Findings" description="Synthesise what you heard. These go directly into the Compass Report.">
          <AreaField
            label="Key observations from the session"
            hint="The 4–6 most important things you noticed"
            rows={6}
            placeholder="What patterns emerged? What surprised you? What confirmed your initial read?…"
            value={form.keyObservations}
            onChange={(e) => set("keyObservations", e.target.value)}
          />
          <AreaField
            label="Strengths to build on"
            rows={4}
            placeholder="Strong client relationships, domain expertise, loyal team, good margins, clear niche…"
            value={form.strengthsToBuildOn}
            onChange={(e) => set("strengthsToBuildOn", e.target.value)}
          />
          <AreaField
            label="Quick wins — achievable within 2 weeks at low cost"
            rows={5}
            placeholder="Claim the Google Business Profile\nConsolidate duplicate tools\nSet up a follow-up sequence\n…"
            value={form.quickWins}
            onChange={(e) => set("quickWins", e.target.value)}
          />
        </FormSection>

        {/* 11. Recommended Roadmap */}
        <FormSection title="11 — Recommended Roadmap" description="The prioritised plan and recommended solutions.">
          <AreaField
            label="Immediate priorities — 0 to 30 days"
            rows={5}
            placeholder="1. …\n2. …\n3. …"
            value={form.roadmapImmediate}
            onChange={(e) => set("roadmapImmediate", e.target.value)}
          />
          <AreaField
            label="Short-term priorities — 30 to 90 days"
            rows={5}
            placeholder="1. …\n2. …\n3. …"
            value={form.roadmapShortTerm}
            onChange={(e) => set("roadmapShortTerm", e.target.value)}
          />
          <AreaField
            label="Longer-term opportunities"
            rows={4}
            placeholder="Strategic moves, larger projects, market expansion…"
            value={form.roadmapLongerTerm}
            onChange={(e) => set("roadmapLongerTerm", e.target.value)}
          />
          <PillCheckbox label="Recommended Vula solutions" options={solutions} value={form.recommendedSolutions} onChange={(v) => set("recommendedSolutions", v)} />
        </FormSection>

        {/* 12. 2-Week Action Plan */}
        <FormSection title="12 — 2-Week Action Plan" description="Specific actions, owners and deadlines agreed during the session.">
          <ActionPlanTable value={form.twoWeekActions} onChange={(v) => set("twoWeekActions", v)} />
        </FormSection>

        {/* 13. Agreed Next Steps */}
        <FormSection title="13 — Agreed Next Steps">
          <AreaField
            label="Actions agreed in this session"
            hint="What will each party do before the report is delivered"
            rows={5}
            placeholder="Client: …\nVula: Deliver Compass Report by [date]\n…"
            value={form.agreedActions}
            onChange={(e) => set("agreedActions", e.target.value)}
          />
          <Field label="Compass Report delivery date" type="date" value={form.reportDeliveryDate} onChange={(e) => set("reportDeliveryDate", e.target.value)} />
          <AreaField label="Additional notes" rows={3} placeholder="Anything else worth recording before you close the laptop…" value={form.additionalNotes} onChange={(e) => set("additionalNotes", e.target.value)} />
        </FormSection>
      </div>

      {/* Floating action bar */}
      <div className="fixed bottom-6 right-6 flex items-center gap-3">
        {saved && (
          <span className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-muted-foreground">
            <Check className="h-3 w-3 text-electric" /> Saved
          </span>
        )}
        <button
          onClick={() => generateProfessionalReport(form)}
          className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg transition hover:opacity-90"
        >
          <Download className="h-4 w-4" />
          Download Report
        </button>
      </div>
    </div>
  );
}
