import { useState, useEffect, useCallback } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Download, Check } from "lucide-react";
import { FormSection, Field, AreaField, SelectField, PillRadio, PillCheckbox, TwoCol } from "@/components/session/FormSection";
import { StakeholderTable } from "@/components/session/StakeholderTable";
import { ActionPlanTable } from "@/components/session/ActionPlanTable";
import { DepartmentTable } from "@/components/session/DepartmentTable";
import { generateStrategicReport } from "@/lib/generate-report";
import { saveToHistory } from "@/lib/session-history";
import type { StrategicSession } from "@/lib/session-types";

export const Route = createFileRoute("/sessions/strategic")({
  component: StrategicForm,
});

const today = new Date().toISOString().split("T")[0];
const STORAGE_KEY = "vula-session-strategic";

const defaultForm: StrategicSession = {
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
  departments: [],
  externalDependencies: "",
  vision3to5Years: "",
  currentInitiatives: "",
  complianceRequirements: "",
  topRisks: "",
  roadmapNow: "",
  roadmapNext: "",
  roadmapLater: "",
  roadmapFuture: "",
  blueprintWeek1to2: "",
  blueprintWeek3to4: "",
  blueprintMonth2: "",
  blueprintMonth3: "",
  successMetrics: "",
  executiveSponsor: "",
  decisionAuthority: "",
  communicationPlan: "",
  quarterlyReviewDate: "",
  resourceRequirements: "",
};

const companySizes = [
  { value: "21–50 employees", label: "21–50 employees" },
  { value: "51–200 employees", label: "51–200 employees" },
  { value: "201–500 employees", label: "201–500 employees" },
  { value: "500+ employees", label: "500+ employees" },
];

const revenueRanges = [
  { value: "R5M–R20M", label: "R5M–R20M" },
  { value: "R20M–R100M", label: "R20M–R100M" },
  { value: "R100M–R500M", label: "R100M–R500M" },
  { value: "R500M+", label: "R500M+" },
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
  { value: "Restructuring / turnaround", label: "Restructuring / turnaround" },
];

const socialOptions = ["Facebook", "Instagram", "LinkedIn", "TikTok", "X / Twitter", "YouTube", "WhatsApp Business", "None"];
const solutions = ["Launch™", "Flow™", "Accelerate™", "Growth™", "Partner™"];
const aiReadinessOptions = ["1 — Not interested", "2 — Curious", "3 — Exploring options", "4 — Ready to pilot", "5 — Ready to implement"];

function StrategicForm() {
  const [form, setForm] = useState<StrategicSession>(() => {
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

  const set = useCallback(<K extends keyof StrategicSession>(field: K, value: StrategicSession[K]) => {
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
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-electric">Compass™ Strategic</p>
              <h1 className="mt-1 text-xl font-bold">Client Session Form</h1>
              <p className="mt-1 text-xs text-muted-foreground">Full day or multi-day · Cross-functional team · From R50,000</p>
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
            <Field label="Session start date" type="date" value={form.sessionDate} onChange={(e) => set("sessionDate", e.target.value)} />
            <Field label="Location / format" placeholder="On-site · Video · Hybrid · Address" value={form.sessionLocation} onChange={(e) => set("sessionLocation", e.target.value)} />
          </TwoCol>
          <Field label="Lead consultant" value={form.consultant} onChange={(e) => set("consultant", e.target.value)} />
        </FormSection>

        {/* 2. Client Information */}
        <FormSection title="2 — Client Information">
          <TwoCol>
            <Field label="Primary client name" value={form.clientName} onChange={(e) => set("clientName", e.target.value)} />
            <Field label="Title / role" placeholder="CEO, MD, Director…" value={form.clientTitle} onChange={(e) => set("clientTitle", e.target.value)} />
          </TwoCol>
          <TwoCol>
            <Field label="Company / organisation name" value={form.company} onChange={(e) => set("company", e.target.value)} />
            <Field label="Industry / sector" value={form.industry} onChange={(e) => set("industry", e.target.value)} />
          </TwoCol>
          <TwoCol>
            <SelectField label="Company size" options={companySizes} value={form.companySize} onChange={(e) => set("companySize", e.target.value)} />
            <Field label="Total headcount" placeholder="e.g. 120" value={form.headcount} onChange={(e) => set("headcount", e.target.value)} />
          </TwoCol>
          <TwoCol>
            <Field label="Email address" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} />
            <Field label="Phone number" type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
          </TwoCol>
          <Field label="Website URL" type="url" placeholder="https://" value={form.website} onChange={(e) => set("website", e.target.value)} />
        </FormSection>

        {/* 3. Stakeholder Register */}
        <FormSection title="3 — Stakeholder Register" description="Capture all session participants. There is no cap for Strategic engagements.">
          <StakeholderTable value={form.stakeholders} onChange={(v) => set("stakeholders", v)} max={20} />
        </FormSection>

        {/* 4. Organisation Map */}
        <FormSection title="4 — Organisation Map" description="Map the business structure — every function and its primary challenge.">
          <DepartmentTable value={form.departments} onChange={(v) => set("departments", v)} />
          <AreaField
            label="Key external dependencies"
            hint="Vendors, partners, regulators, board, franchisors"
            rows={3}
            placeholder="List critical external relationships the business depends on…"
            value={form.externalDependencies}
            onChange={(e) => set("externalDependencies", e.target.value)}
          />
        </FormSection>

        {/* 5. Business Context */}
        <FormSection title="5 — Business Context" description="The foundation — what the business is, how it's structured and where it's headed.">
          <AreaField
            label="What does the business do?"
            rows={3}
            placeholder="Core offering, how revenue is generated, what makes it distinctive…"
            value={form.businessDescription}
            onChange={(e) => set("businessDescription", e.target.value)}
          />
          <AreaField
            label="Who are your ideal clients?"
            rows={3}
            placeholder="Customer profile, geography, size, industry…"
            value={form.targetClients}
            onChange={(e) => set("targetClients", e.target.value)}
          />
          <TwoCol>
            <Field label="Years in operation" placeholder="e.g. 12 years" value={form.yearsInOperation} onChange={(e) => set("yearsInOperation", e.target.value)} />
            <SelectField label="Approximate annual revenue" options={revenueRanges} value={form.revenueRange} onChange={(e) => set("revenueRange", e.target.value)} />
          </TwoCol>
          <TwoCol>
            <SelectField label="Revenue model" options={revenueModels} value={form.revenueModel} onChange={(e) => set("revenueModel", e.target.value)} />
            <SelectField label="Growth trend (last 12 months)" options={growthTrends} value={form.growthTrend} onChange={(e) => set("growthTrend", e.target.value)} />
          </TwoCol>
          <AreaField
            label="Team structure"
            hint="How the organisation is structured — divisions, departments, reporting"
            rows={4}
            placeholder="Describe the structure at a high level…"
            value={form.teamStructure}
            onChange={(e) => set("teamStructure", e.target.value)}
          />
        </FormSection>

        {/* 6. Strategic Context */}
        <FormSection title="6 — Strategic Context" description="Understand the organisation's direction, constraints and risks.">
          <AreaField
            label="3–5 year business vision"
            hint="Where does leadership want the organisation to be?"
            rows={4}
            placeholder="By 2028/2030 we want to be…"
            value={form.vision3to5Years}
            onChange={(e) => set("vision3to5Years", e.target.value)}
          />
          <AreaField
            label="Current strategic initiatives underway"
            hint="Major projects, transformations or programmes already in flight"
            rows={4}
            placeholder="ERP implementation, market expansion, merger, rebrand, restructuring…"
            value={form.currentInitiatives}
            onChange={(e) => set("currentInitiatives", e.target.value)}
          />
          <AreaField
            label="Regulatory and compliance considerations"
            hint="Industry regulations, legal constraints, audit requirements"
            rows={3}
            placeholder="POPIA, FSCA, ISO, industry-specific compliance…"
            value={form.complianceRequirements}
            onChange={(e) => set("complianceRequirements", e.target.value)}
          />
          <AreaField
            label="Top business risks"
            hint="The 3–5 risks leadership loses sleep over"
            rows={4}
            placeholder="Key person dependency\nConcentrated client base\nTechnology debt\nCompetitor disruption\n…"
            value={form.topRisks}
            onChange={(e) => set("topRisks", e.target.value)}
          />
        </FormSection>

        {/* 7. Challenges & Goals */}
        <FormSection title="7 — Challenges & Goals" description="The core of the Discover phase — what they're stuck on and what they're building toward.">
          <AreaField
            label="What brought you to this engagement?"
            hint="The trigger — what made them commit to a full-day strategic session"
            rows={3}
            placeholder="What forced the decision to bring in external support?…"
            value={form.whatBroughtYouHere}
            onChange={(e) => set("whatBroughtYouHere", e.target.value)}
          />
          <AreaField
            label="What is the organisation's single biggest challenge right now?"
            rows={4}
            placeholder="In leadership's own words…"
            value={form.biggestChallenge}
            onChange={(e) => set("biggestChallenge", e.target.value)}
          />
          <AreaField
            label="What does success look like in 12 months?"
            hint="Specific, measurable — push beyond vague aspirations"
            rows={4}
            placeholder="Revenue targets, market position, operational milestones, capability built…"
            value={form.goalIn12Months}
            onChange={(e) => set("goalIn12Months", e.target.value)}
          />
          <AreaField
            label="What has been tried that hasn't worked?"
            rows={3}
            placeholder="Previous projects, technology investments, consultants, restructures…"
            value={form.triedBefore}
            onChange={(e) => set("triedBefore", e.target.value)}
          />
          <AreaField
            label="Top strategic priorities for the year"
            hint="What leadership has formally agreed to focus on"
            rows={5}
            placeholder="1. …\n2. …\n3. …\n4. …\n5. …"
            value={form.strategicPriorities}
            onChange={(e) => set("strategicPriorities", e.target.value)}
          />
        </FormSection>

        {/* 8. Digital Presence Audit */}
        <FormSection title="8 — Digital Presence Audit">
          <PillRadio label="Do they have a website?" options={["Yes", "No", "In progress"]} value={form.hasWebsite} onChange={(v) => set("hasWebsite", v)} />
          {form.hasWebsite === "Yes" && (
            <Field label="Website URL" type="url" placeholder="https://" value={form.websiteUrl} onChange={(e) => set("websiteUrl", e.target.value)} />
          )}
          <PillRadio label="Is the website mobile-friendly?" options={["Yes", "No", "Unsure", "N/A"]} value={form.websiteMobile} onChange={(v) => set("websiteMobile", v)} />
          <PillRadio label="Google Business Profile" options={["Yes — claimed & optimised", "Yes — not optimised", "No", "N/A"]} value={form.googleBusiness} onChange={(v) => set("googleBusiness", v)} />
          <PillCheckbox label="Active social media platforms" options={socialOptions} value={form.socialPlatforms} onChange={(v) => set("socialPlatforms", v)} />
          <PillRadio label="Online reviews" options={["Yes — actively managed", "Yes — not managed", "No", "N/A"]} value={form.hasOnlineReviews} onChange={(v) => set("hasOnlineReviews", v)} />
          <PillRadio label="Overall digital presence rating" options={["Strong", "Adequate", "Needs significant work", "Not started"]} value={form.digitalRating} onChange={(v) => set("digitalRating", v)} />
          <AreaField label="Digital notes" rows={3} placeholder="Observations, specific gaps, URLs to review…" value={form.digitalNotes} onChange={(e) => set("digitalNotes", e.target.value)} />
        </FormSection>

        {/* 9. Operations Review */}
        <FormSection title="9 — Operations Review" description="Map the internal workings across all functions.">
          <AreaField
            label="Key software and tools in use across the organisation"
            hint="By department where possible"
            rows={6}
            placeholder="Finance: …\nSales / CRM: …\nOperations / project management: …\nHR: …\nCustomer service: …\nOther: …"
            value={form.currentTools}
            onChange={(e) => set("currentTools", e.target.value)}
          />
          <AreaField
            label="Biggest manual time drain across the organisation"
            rows={4}
            placeholder="Where do teams spend the most time on work a system could do?…"
            value={form.biggestTimeDrain}
            onChange={(e) => set("biggestTimeDrain", e.target.value)}
          />
          <AreaField
            label="Where do things fall through the cracks at scale?"
            hint="Handovers, inter-departmental failures, client experience gaps"
            rows={4}
            placeholder="What breaks down between departments? What do clients complain about?…"
            value={form.thingsFallThrough}
            onChange={(e) => set("thingsFallThrough", e.target.value)}
          />
          <AreaField
            label="Full client experience — before, during and after"
            hint="From awareness through to advocacy"
            rows={5}
            placeholder="How do clients find them → evaluate → engage → receive service → measure value → renew or refer?…"
            value={form.clientExperience}
            onChange={(e) => set("clientExperience", e.target.value)}
          />
          <AreaField label="Operations notes" rows={3} placeholder="Patterns, red flags, cross-functional gaps…" value={form.operationsNotes} onChange={(e) => set("operationsNotes", e.target.value)} />
        </FormSection>

        {/* 10. Competitive Landscape */}
        <FormSection title="10 — Competitive Landscape" description="Market position, differentiation and where they win or lose.">
          <AreaField
            label="Top competitors"
            rows={3}
            placeholder="List by name and what makes each one a threat…"
            value={form.topCompetitors}
            onChange={(e) => set("topCompetitors", e.target.value)}
          />
          <AreaField
            label="Key differentiator"
            hint="Why do clients choose this organisation over alternatives?"
            rows={3}
            placeholder="What's the core reason clients come and stay?…"
            value={form.keyDifferentiator}
            onChange={(e) => set("keyDifferentiator", e.target.value)}
          />
          <AreaField
            label="How do clients typically find the organisation?"
            rows={3}
            placeholder="Referrals, tender processes, direct approach, brand, Google, sector relationships…"
            value={form.howClientsFind}
            onChange={(e) => set("howClientsFind", e.target.value)}
          />
          <AreaField
            label="Where are deals typically lost?"
            rows={3}
            placeholder="Price, speed, trust, capability, brand recognition, procurement process…"
            value={form.whereLooseDeals}
            onChange={(e) => set("whereLooseDeals", e.target.value)}
          />
          <AreaField label="Competitive notes" rows={2} placeholder="Additional observations…" value={form.competitiveNotes} onChange={(e) => set("competitiveNotes", e.target.value)} />
        </FormSection>

        {/* 11. AI & Automation Readiness */}
        <FormSection title="11 — AI & Automation Readiness" description="Technology leverage across the organisation.">
          <AreaField
            label="Most repetitive or manual tasks across the organisation"
            rows={5}
            placeholder="By department:\nFinance: …\nSales: …\nOperations: …\nHR: …"
            value={form.mostRepetitiveTasks}
            onChange={(e) => set("mostRepetitiveTasks", e.target.value)}
          />
          <AreaField
            label="What data does the organisation capture and where does it live?"
            hint="Data is the raw material for AI — understand the landscape"
            rows={4}
            placeholder="Sales data in CRM, financial data in ERP, HR in spreadsheets, client data fragmented across systems…"
            value={form.dataCapture}
            onChange={(e) => set("dataCapture", e.target.value)}
          />
          <AreaField
            label="AI or automation tools currently in use"
            rows={3}
            placeholder="ChatGPT / Copilot for specific teams, Zapier/Make for workflows, RPA, industry-specific tools…"
            value={form.aiToolsInUse}
            onChange={(e) => set("aiToolsInUse", e.target.value)}
          />
          <PillRadio
            label="Organisational AI readiness"
            hint="1 = not interested, 5 = ready to implement at scale"
            options={aiReadinessOptions}
            value={form.aiReadiness}
            onChange={(v) => set("aiReadiness", v)}
          />
          <AreaField
            label="Highest-value automation opportunity at organisational scale"
            rows={3}
            placeholder="The one automation that would have the most measurable impact…"
            value={form.topAutomationOpportunity}
            onChange={(e) => set("topAutomationOpportunity", e.target.value)}
          />
        </FormSection>

        {/* 12. Consultant Findings */}
        <FormSection title="12 — Consultant Findings" description="Synthesise what you heard. These go directly into the Compass Report.">
          <AreaField
            label="Key observations from the engagement"
            hint="The 5–8 most important insights across the session"
            rows={7}
            placeholder="What patterns emerged across functions? What surprised you? What's systemic vs. symptomatic?…"
            value={form.keyObservations}
            onChange={(e) => set("keyObservations", e.target.value)}
          />
          <AreaField
            label="Strengths to build on"
            rows={5}
            placeholder="Strong culture, domain expertise, market position, loyal clients, operational efficiency, financial discipline…"
            value={form.strengthsToBuildOn}
            onChange={(e) => set("strengthsToBuildOn", e.target.value)}
          />
          <AreaField
            label="Quick wins — achievable within 2 weeks at low cost"
            rows={5}
            placeholder="Actions that can start Monday with existing resources…"
            value={form.quickWins}
            onChange={(e) => set("quickWins", e.target.value)}
          />
        </FormSection>

        {/* 13. Full Transformation Roadmap */}
        <FormSection title="13 — Full Transformation Roadmap" description="The staged plan across Now / Next / Later / Future.">
          <AreaField
            label="Now — Immediate actions (0–30 days)"
            hint="High impact, achievable with current resources"
            rows={5}
            placeholder="1. …\n2. …\n3. …"
            value={form.roadmapNow}
            onChange={(e) => set("roadmapNow", e.target.value)}
          />
          <AreaField
            label="Next — Short-term initiatives (30–90 days)"
            hint="Require planning, some investment or new capability"
            rows={5}
            placeholder="1. …\n2. …\n3. …"
            value={form.roadmapNext}
            onChange={(e) => set("roadmapNext", e.target.value)}
          />
          <AreaField
            label="Later — Medium-term projects (90–180 days)"
            hint="Larger scope, multiple stakeholders, meaningful investment"
            rows={5}
            placeholder="1. …\n2. …\n3. …"
            value={form.roadmapLater}
            onChange={(e) => set("roadmapLater", e.target.value)}
          />
          <AreaField
            label="Future — Long-term transformation (180+ days)"
            hint="Strategic shifts, platform changes, structural transformation"
            rows={4}
            placeholder="The horizon work — what the organisation is building toward…"
            value={form.roadmapFuture}
            onChange={(e) => set("roadmapFuture", e.target.value)}
          />
          <PillCheckbox label="Recommended Vula solutions" options={solutions} value={form.recommendedSolutions} onChange={(v) => set("recommendedSolutions", v)} />
        </FormSection>

        {/* 14. 90-Day Blueprint */}
        <FormSection title="14 — 90-Day Blueprint" description="A week-by-week implementation schedule for the first quarter.">
          <AreaField
            label="Week 1–2 sprint"
            hint="Immediate actions, quick setup, internal alignment"
            rows={5}
            placeholder="Specific tasks, who leads each, what done looks like…"
            value={form.blueprintWeek1to2}
            onChange={(e) => set("blueprintWeek1to2", e.target.value)}
          />
          <AreaField
            label="Week 3–4 sprint"
            hint="Build on week 1–2, begin implementation of next priorities"
            rows={5}
            placeholder="Specific tasks and milestones…"
            value={form.blueprintWeek3to4}
            onChange={(e) => set("blueprintWeek3to4", e.target.value)}
          />
          <AreaField
            label="Month 2 milestones"
            hint="What should be live, delivered or measurable by end of month 2?"
            rows={4}
            placeholder="Milestone 1: …\nMilestone 2: …\nMilestone 3: …"
            value={form.blueprintMonth2}
            onChange={(e) => set("blueprintMonth2", e.target.value)}
          />
          <AreaField
            label="Month 3 milestones"
            hint="What should be complete by the end of the 90 days?"
            rows={4}
            placeholder="Milestone 1: …\nMilestone 2: …\nMilestone 3: …"
            value={form.blueprintMonth3}
            onChange={(e) => set("blueprintMonth3", e.target.value)}
          />
          <AreaField
            label="Success metrics for the 90-day period"
            hint="How will we know it's working? Specific, measurable indicators."
            rows={4}
            placeholder="Revenue impact: …\nTime saved: …\nLeads generated: …\nOther: …"
            value={form.successMetrics}
            onChange={(e) => set("successMetrics", e.target.value)}
          />
        </FormSection>

        {/* 15. 2-Week Action Plan */}
        <FormSection title="15 — 2-Week Action Plan" description="Specific actions, owners and deadlines agreed during the session.">
          <ActionPlanTable value={form.twoWeekActions} onChange={(v) => set("twoWeekActions", v)} />
        </FormSection>

        {/* 16. Governance & Implementation */}
        <FormSection title="16 — Governance & Implementation" description="How decisions will be made, who owns the programme, and how it stays on track.">
          <Field
            label="Executive sponsor"
            hint="The person accountable for outcomes"
            placeholder="Name and title"
            value={form.executiveSponsor}
            onChange={(e) => set("executiveSponsor", e.target.value)}
          />
          <AreaField
            label="Decision-making authority"
            hint="Who can approve what without escalation?"
            rows={3}
            placeholder="What decisions can the project team make? What requires executive approval? What requires board sign-off?…"
            value={form.decisionAuthority}
            onChange={(e) => set("decisionAuthority", e.target.value)}
          />
          <AreaField
            label="Stakeholder communication plan"
            hint="How will the organisation be kept informed?"
            rows={3}
            placeholder="Weekly updates to leadership team\nMonthly progress report to board\nAll-staff communication at 30-day mark\n…"
            value={form.communicationPlan}
            onChange={(e) => set("communicationPlan", e.target.value)}
          />
          <Field label="Quarterly review date" type="date" value={form.quarterlyReviewDate} onChange={(e) => set("quarterlyReviewDate", e.target.value)} />
          <AreaField
            label="Resource requirements"
            hint="Budget, headcount, external support, technology"
            rows={4}
            placeholder="Estimated budget: R…\nInternal team time: …\nExternal support: Vula Solutions (ongoing)\nTechnology investment: …"
            value={form.resourceRequirements}
            onChange={(e) => set("resourceRequirements", e.target.value)}
          />
        </FormSection>

        {/* 17. Agreed Next Steps */}
        <FormSection title="17 — Agreed Next Steps">
          <AreaField
            label="Actions agreed in this engagement"
            hint="What will each party do before the Compass Report is delivered"
            rows={5}
            placeholder="Client: …\nVula: Deliver Compass Report by [date]\nFirst quarterly review: [date]\n…"
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
          onClick={() => { saveToHistory("Strategic", form as unknown as Record<string, unknown>); void generateStrategicReport(form); }}
          className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg transition hover:opacity-90"
        >
          <Download className="h-4 w-4" />
          Download Report
        </button>
      </div>
    </div>
  );
}
