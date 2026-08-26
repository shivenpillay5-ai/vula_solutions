import { createFileRoute } from "@tanstack/react-router";
import {
  ToolPage, ToolSection, ToolDivider, SectionIntro, Checklist,
} from "@/components/site/ToolPage";

export const Route = createFileRoute("/tools/popia-basics-checklist")({
  head: () => ({
    meta: [
      { title: "POPIA Basics Checklist for Small Businesses | Vula Solutions" },
      { name: "description", content: "A plain-English POPIA compliance checklist for South African SMEs. Work through nine practical areas, from appointing an information officer to handling data breaches." },
      { property: "og:title", content: "POPIA Basics Checklist for Small Businesses" },
      { property: "og:description", content: "A practical compliance checklist to help South African SMEs understand and meet their POPIA obligations. Written in plain English, not legal jargon." },
      { property: "og:url", content: "https://vulasolutions.co.za/tools/popia-basics-checklist" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://vulasolutions.co.za/tools/popia-basics-checklist" }],
  }),
  component: PopiaBasicsPage,
});

function PopiaBasicsPage() {
  return (
    <ToolPage
      title="POPIA Basics Checklist for Small Businesses"
      tagline="Nine practical areas every South African SME should work through to meet their POPIA obligations."
      type="Checklist"
      about="The Protection of Personal Information Act (POPIA) applies to any South African business that collects, stores or uses personal information. Non-compliance carries fines of up to R10 million and possible imprisonment. This checklist is a plain-English starting point, not legal advice. If you process large volumes of sensitive information, consult a qualified attorney or privacy officer."
      howTo={[
        "Work through each section in order, as earlier sections inform later ones",
        "Tick items you have already addressed",
        "Use unticked items as your POPIA action list",
        "Review this checklist at least once a year or when your business changes",
      ]}
    >

      <ToolSection label="1. Appoint your Information Officer">
        <SectionIntro>
          Every private body in South Africa must designate an Information Officer responsible for POPIA compliance. This is typically the CEO, MD or a senior director, not a junior staff member.
        </SectionIntro>
        <Checklist items={[
          "Designate a senior employee as your Information Officer",
          "Register the Information Officer with the Information Regulator at inforegulator.org.za (mandatory for private bodies)",
          "Make the Information Officer's name and contact details available to staff",
          "Make the Information Officer's contact details available to customers and the public",
          "Ensure the Information Officer understands their duties: overseeing compliance, handling access requests, and liaising with the Regulator",
        ]} />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="2. Know what personal information you hold">
        <SectionIntro>
          You cannot protect what you have not mapped. Personal information includes names, ID numbers, contact details, financial information, health records, employment history and more.
        </SectionIntro>
        <Checklist items={[
          "List every category of personal information your business collects (customer, employee, supplier, prospect data)",
          "Record where each category is stored: CRM, email, cloud storage, spreadsheets, paper files, accounting software",
          "Record why you collected it and what you use it for",
          "Identify any special categories of information you hold: health or medical data, race or ethnic origin, religious beliefs, political views, trade union membership, criminal records, biometric data, or children's personal information. These require extra care.",
          "Note who inside the business can access each category of data",
          "Note which third parties you share personal information with",
        ]} />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="3. Have a lawful basis for every purpose">
        <SectionIntro>
          POPIA requires a lawful reason for every processing activity. The four most common grounds for SMEs are: consent, contract, legal obligation, and legitimate interest. You must identify and document the basis you rely on.
        </SectionIntro>
        <Checklist items={[
          "Client contact details used to deliver a service: the lawful basis is contract",
          "Employee payroll and HR records: the lawful basis is legal obligation and contract",
          "Marketing emails and newsletters: the lawful basis is consent. Use opt-in, not pre-ticked boxes.",
          "Website analytics: the lawful basis is legitimate interest. Document why it outweighs privacy interests.",
          "Job applicant CVs: the lawful basis is consent. Delete unsuccessful applications within a reasonable period.",
          "Document the lawful basis for each processing activity in writing",
          "Do not collect personal information just because it might be useful one day. Collect only what you need for a specific purpose.",
        ]} />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="4. Tell people what you are doing with their data">
        <SectionIntro>
          POPIA requires you to be transparent. Data subjects must know you hold their information, why, and what their rights are, before or at the time you collect it.
        </SectionIntro>
        <Checklist items={[
          "Publish a privacy notice or privacy policy on your website",
          "The privacy notice must include: who you are, what information you collect, why you collect it, who you share it with, how long you keep it, data subject rights, and how to contact you",
          "For consent-based marketing, collect active opt-in consent. No pre-ticked boxes, bundled consent or silence treated as agreement.",
          "Keep a record of when and how consent was given for each individual",
          "Allow people to withdraw consent easily (e.g., unsubscribe link in every marketing email)",
          "Notify individuals at the point of collection if you have not already done so in your privacy notice",
        ]} />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="5. Respect data subject rights">
        <SectionIntro>
          Individuals have rights over their personal information. You must have a simple, documented process for handling these requests promptly.
        </SectionIntro>
        <Checklist items={[
          "Acknowledge and respond to access requests (Form 1 under PAIA) within 30 days",
          "Correct or update inaccurate personal information when requested",
          "Delete personal information when someone withdraws consent, if there is no other lawful basis to retain it",
          "Allow individuals to object to processing based on legitimate interest",
          "Do not charge unreasonable fees for access requests",
          "Train staff who receive enquiries to recognise a data subject request and route it correctly",
          "Document all requests received and how they were resolved",
        ]} />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="6. Secure personal information">
        <SectionIntro>
          POPIA requires you to take reasonable technical and organisational measures to protect personal information against loss, damage, destruction and unlawful access or disclosure.
        </SectionIntro>
        <Checklist items={[
          "Use strong, unique passwords for all systems containing personal data. A password manager makes this practical.",
          "Enable two-factor authentication on email, accounting, CRM and cloud storage accounts",
          "Limit access to personal information to staff who genuinely need it for their role",
          "Encrypt sensitive data where possible, especially financial or health information",
          "Back up personal data regularly and test that backups can be restored",
          "Have a clear process for lost or stolen devices (remote wipe, access revocation)",
          "Lock paper files containing personal information and restrict physical access",
          "Run at least annual security awareness training for staff who handle personal data",
        ]} />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="7. Manage your operators (third-party processors)">
        <SectionIntro>
          An operator is any third party that processes personal information on your behalf, such as your email platform, payroll provider, cloud storage, CRM or accounting software. You remain responsible for how they handle your data.
        </SectionIntro>
        <Checklist items={[
          "List all third-party services that receive or process personal data on your behalf",
          "Common operators to review: Google Workspace, Microsoft 365, Xero or Sage, cloud CRM, payroll system, email marketing platform, website host, analytics provider",
          "Ensure you have a written data processing agreement (or similar contractual terms) with each operator",
          "Check that each operator's privacy policy and security practices are adequate before sharing personal data",
          "Do not allow operators to use your customers' personal data for their own purposes",
          "If an operator suffers a breach that affects your data, you must still comply with your own breach notification obligations",
        ]} />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="8. Know how to respond to a data breach">
        <SectionIntro>
          A breach includes any unauthorised access, accidental disclosure, loss or destruction of personal information. A hacked email account, a laptop left on a taxi, or a spreadsheet sent to the wrong person all qualify.
        </SectionIntro>
        <Checklist items={[
          "Define what counts as a breach for your business and communicate this to staff",
          "Establish a simple breach response process: detect, contain, assess and notify",
          "Notify the Information Regulator (inforegulator.org.za) as soon as reasonably possible after discovering a breach",
          "Notify affected individuals if the breach poses a real risk of harm to them",
          "Document every breach: what happened, what data was involved, who was affected, what you did",
          "Review the cause of each breach and take steps to prevent recurrence",
        ]} />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="9. Delete what you no longer need">
        <SectionIntro>
          POPIA prohibits keeping personal information longer than necessary for the purpose it was collected. Holding unnecessary data is both a compliance risk and a security liability.
        </SectionIntro>
        <Checklist items={[
          "Set retention periods for each category of personal information (e.g., client records 5 years, unsuccessful CV applicants 6 months, marketing contacts until consent is withdrawn)",
          "Note any legal requirements that override your retention period (e.g., SARS requires financial records for 5 years)",
          "Build a regular schedule to review and delete data that has reached its retention period",
          "Permanently delete digital files. Do not just move them to the recycle bin.",
          "Shred or cross-cut paper records. Do not dispose of them in general waste.",
          "Instruct your operators to delete personal data when you terminate the relationship or on request",
          "De-identify data you want to retain for analytics purposes so it can no longer be linked to individuals",
        ]} />
      </ToolSection>

    </ToolPage>
  );
}
