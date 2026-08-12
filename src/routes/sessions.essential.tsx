import { useState, useEffect, useCallback } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Download, Check } from "lucide-react";
import { FormSection, Field, AreaField, SelectField, PillRadio, PillCheckbox, TwoCol } from "@/components/session/FormSection";
import { generateEssentialReport } from "@/lib/generate-report";
import type { EssentialSession } from "@/lib/session-types";

export const Route = createFileRoute("/sessions/essential")({
  component: EssentialForm,
});

const today = new Date().toISOString().split("T")[0];
const STORAGE_KEY = "vula-session-essential";

const defaultForm: EssentialSession = {
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

const socialOptions = ["Facebook", "Instagram", "LinkedIn", "TikTok", "X / Twitter", "YouTube", "WhatsApp Business", "None"];
const solutions = ["Launch™", "Flow™", "Accelerate™", "Growth™", "Partner™"];

function EssentialForm() {
  const [form, setForm] = useState<EssentialSession>(() => {
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

  const set = useCallback(<K extends keyof EssentialSession>(field: K, value: EssentialSession[K]) => {
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
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-electric">Compass™ Essential</p>
              <h1 className="mt-1 text-xl font-bold">Client Session Form</h1>
              <p className="mt-1 text-xs text-muted-foreground">90-minute session · 1–2 stakeholders · R5,000</p>
            </div>
            <button
              onClick={handleClear}
              className="shrink-0 text-xs text-muted-foreground hover:text-foreground transition"
            >
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
            <Field label="Client full name" placeholder="First and last name" value={form.clientName} onChange={(e) => set("clientName", e.target.value)} />
            <Field label="Title / role" placeholder="Owner, CEO, COO…" value={form.clientTitle} onChange={(e) => set("clientTitle", e.target.value)} />
          </TwoCol>
          <TwoCol>
            <Field label="Company name" value={form.company} onChange={(e) => set("company", e.target.value)} />
            <Field label="Industry" placeholder="Retail, Professional Services…" value={form.industry} onChange={(e) => set("industry", e.target.value)} />
          </TwoCol>
          <SelectField label="Company size" options={companySizes} value={form.companySize} onChange={(e) => set("companySize", e.target.value)} />
          <TwoCol>
            <Field label="Email address" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} />
            <Field label="Phone number" type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
          </TwoCol>
          <Field label="Website URL" type="url" placeholder="https://" value={form.website} onChange={(e) => set("website", e.target.value)} />
        </FormSection>

        {/* 3. Business Context */}
        <FormSection title="3 — Business Context" description="Establish the foundation — what the business is, who it serves, where it stands.">
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
            hint="Who do you love working with most"
            rows={3}
            placeholder="Type of customer, industry, size, geography…"
            value={form.targetClients}
            onChange={(e) => set("targetClients", e.target.value)}
          />
          <TwoCol>
            <Field label="Years in operation" placeholder="e.g. 3 years" value={form.yearsInOperation} onChange={(e) => set("yearsInOperation", e.target.value)} />
            <SelectField label="Approximate annual revenue" options={revenueRanges} value={form.revenueRange} onChange={(e) => set("revenueRange", e.target.value)} />
          </TwoCol>
          <AreaField
            label="What brought you to this session today?"
            hint="The trigger or pain that made them book"
            rows={3}
            placeholder="What's the one thing that made you pick up the phone?…"
            value={form.whatBroughtYouHere}
            onChange={(e) => set("whatBroughtYouHere", e.target.value)}
          />
        </FormSection>

        {/* 4. Challenges & Goals */}
        <FormSection title="4 — Challenges & Goals" description="Understand where they're stuck and where they want to go.">
          <AreaField
            label="What is your single biggest challenge right now?"
            hint="Let them name it — don't prompt"
            rows={4}
            placeholder="In their own words…"
            value={form.biggestChallenge}
            onChange={(e) => set("biggestChallenge", e.target.value)}
          />
          <AreaField
            label="What does success look like in 12 months?"
            hint="Specific, measurable outcomes if possible"
            rows={4}
            placeholder="Revenue, time saved, headcount, market position, specific capability…"
            value={form.goalIn12Months}
            onChange={(e) => set("goalIn12Months", e.target.value)}
          />
          <AreaField
            label="What have you tried that hasn't worked?"
            hint="Reveals previous investments and frustrations"
            rows={3}
            placeholder="Tools bought, consultants hired, internal projects attempted…"
            value={form.triedBefore}
            onChange={(e) => set("triedBefore", e.target.value)}
          />
          <AreaField
            label="What would a successful outcome from today's session look like?"
            hint="Sets expectations for the Compass Report"
            rows={3}
            placeholder="What do they want to leave with?…"
            value={form.sessionSuccess}
            onChange={(e) => set("sessionSuccess", e.target.value)}
          />
        </FormSection>

        {/* 5. Digital Presence Audit */}
        <FormSection title="5 — Digital Presence Audit" description="Review their current digital footprint objectively.">
          <PillRadio
            label="Do they have a website?"
            options={["Yes", "No", "In progress"]}
            value={form.hasWebsite}
            onChange={(v) => set("hasWebsite", v)}
          />
          {form.hasWebsite === "Yes" && (
            <Field label="Website URL" type="url" placeholder="https://" value={form.websiteUrl} onChange={(e) => set("websiteUrl", e.target.value)} />
          )}
          <PillRadio
            label="Is the website mobile-friendly?"
            options={["Yes", "No", "Unsure", "N/A"]}
            value={form.websiteMobile}
            onChange={(v) => set("websiteMobile", v)}
          />
          <PillRadio
            label="Google Business Profile"
            options={["Yes — claimed & optimised", "Yes — not optimised", "No", "Unsure"]}
            value={form.googleBusiness}
            onChange={(v) => set("googleBusiness", v)}
          />
          <PillCheckbox
            label="Active social media platforms"
            options={socialOptions}
            value={form.socialPlatforms}
            onChange={(v) => set("socialPlatforms", v)}
          />
          <PillRadio
            label="Online reviews (Google, Hellopeter, etc.)"
            options={["Yes — actively managed", "Yes — not managed", "No", "N/A"]}
            value={form.hasOnlineReviews}
            onChange={(v) => set("hasOnlineReviews", v)}
          />
          <PillRadio
            label="Overall digital presence rating"
            options={["Strong", "Adequate", "Needs significant work", "Not started"]}
            value={form.digitalRating}
            onChange={(v) => set("digitalRating", v)}
          />
          <AreaField
            label="Digital notes"
            hint="Anything else worth capturing"
            rows={3}
            placeholder="Specific observations, URLs to review later, client comments…"
            value={form.digitalNotes}
            onChange={(e) => set("digitalNotes", e.target.value)}
          />
        </FormSection>

        {/* 6. Operations Review */}
        <FormSection title="6 — Operations Review" description="Map the internal workings — tools, processes and where time is lost.">
          <AreaField
            label="Software and tools currently in use"
            hint="List everything — even Excel counts"
            rows={4}
            placeholder="Accounting: Xero / QuickBooks\nCRM: None / Spreadsheet\nComms: WhatsApp, email\nOther: …"
            value={form.currentTools}
            onChange={(e) => set("currentTools", e.target.value)}
          />
          <AreaField
            label="What single process takes the most time each week?"
            hint="The biggest manual time drain"
            rows={3}
            placeholder="Describe the process and roughly how many hours it takes…"
            value={form.biggestTimeDrain}
            onChange={(e) => set("biggestTimeDrain", e.target.value)}
          />
          <AreaField
            label="Where do things fall through the cracks?"
            hint="Missed follow-ups, lost quotes, forgotten tasks"
            rows={3}
            placeholder="What breaks down most often and why?…"
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
          <AreaField
            label="Operations notes"
            hint="Observations, patterns, things to follow up on"
            rows={3}
            placeholder="Internal notes…"
            value={form.operationsNotes}
            onChange={(e) => set("operationsNotes", e.target.value)}
          />
        </FormSection>

        {/* 7. Consultant Findings */}
        <FormSection title="7 — Consultant Findings" description="Synthesise what you heard. These go directly into the Compass Report.">
          <AreaField
            label="Key observations from the session"
            hint="The 3–5 most important things you noticed"
            rows={5}
            placeholder="What patterns emerged? What surprised you? What confirmed your initial read?…"
            value={form.keyObservations}
            onChange={(e) => set("keyObservations", e.target.value)}
          />
          <AreaField
            label="Strengths to build on"
            hint="What's working well that the client should protect or leverage"
            rows={4}
            placeholder="Strong client relationships, domain expertise, loyal team, good cash flow, clear niche…"
            value={form.strengthsToBuildOn}
            onChange={(e) => set("strengthsToBuildOn", e.target.value)}
          />
          <AreaField
            label="Quick wins"
            hint="Actions achievable within 2 weeks at low or no cost"
            rows={4}
            placeholder="Claim the Google Business Profile\nSet up a basic follow-up email sequence\nConsolidate tools from 4 to 2\n…"
            value={form.quickWins}
            onChange={(e) => set("quickWins", e.target.value)}
          />
        </FormSection>

        {/* 8. Compass Roadmap */}
        <FormSection title="8 — Compass Roadmap" description="The prioritised plan. This is the core deliverable.">
          <AreaField
            label="Immediate priorities — 0 to 30 days"
            hint="High impact, achievable now"
            rows={5}
            placeholder="1. …\n2. …\n3. …"
            value={form.roadmapImmediate}
            onChange={(e) => set("roadmapImmediate", e.target.value)}
          />
          <AreaField
            label="Short-term priorities — 30 to 90 days"
            hint="Require some planning or investment"
            rows={5}
            placeholder="1. …\n2. …\n3. …"
            value={form.roadmapShortTerm}
            onChange={(e) => set("roadmapShortTerm", e.target.value)}
          />
          <AreaField
            label="Longer-term opportunities"
            hint="Bigger initiatives worth planning toward"
            rows={4}
            placeholder="Strategic moves, larger projects, market expansion…"
            value={form.roadmapLongerTerm}
            onChange={(e) => set("roadmapLongerTerm", e.target.value)}
          />
          <PillCheckbox
            label="Recommended Vula solutions"
            options={solutions}
            value={form.recommendedSolutions}
            onChange={(v) => set("recommendedSolutions", v)}
          />
        </FormSection>

        {/* 9. Agreed Next Steps */}
        <FormSection title="9 — Agreed Next Steps">
          <AreaField
            label="Actions agreed in this session"
            hint="What will each party do before the report is delivered"
            rows={5}
            placeholder="Client: Send through last 3 months of invoices\nVula: Deliver Compass Report by [date]\n…"
            value={form.agreedActions}
            onChange={(e) => set("agreedActions", e.target.value)}
          />
          <Field label="Compass Report delivery date" type="date" value={form.reportDeliveryDate} onChange={(e) => set("reportDeliveryDate", e.target.value)} />
          <AreaField
            label="Additional notes"
            rows={3}
            placeholder="Anything else worth recording before you close the laptop…"
            value={form.additionalNotes}
            onChange={(e) => set("additionalNotes", e.target.value)}
          />
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
          onClick={() => generateEssentialReport(form)}
          className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg transition hover:opacity-90"
        >
          <Download className="h-4 w-4" />
          Download Report
        </button>
      </div>
    </div>
  );
}
