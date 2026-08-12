import {
  AlignmentType,
  BorderStyle,
  Document,
  Packer,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from "docx";
import type { EssentialSession, ProfessionalSession, StrategicSession } from "./session-types";

const TEAL = "01A1B7";
const NAVY = "0A1628";
const GRAY = "6B7280";
const WHITE = "FFFFFF";
const TEAL_LIGHT = "E0F7FA";

function fmtDate(d: string) {
  if (!d) return "";
  return new Date(d + "T12:00:00").toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function h1(text: string): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({ text: text.toUpperCase(), bold: true, size: 24, color: TEAL, font: "Calibri" }),
    ],
    spacing: { before: 560, after: 240 },
    border: { bottom: { color: TEAL, space: 4, style: BorderStyle.SINGLE, size: 6 } },
  });
}

function h2(text: string): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: 22, color: NAVY, font: "Calibri" })],
    spacing: { before: 320, after: 120 },
  });
}

function kv(label: string, value: string): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({ text: `${label}: `, bold: true, size: 20, color: GRAY, font: "Calibri" }),
      new TextRun({ text: value || "—", size: 20, font: "Calibri" }),
    ],
    spacing: { after: 80 },
  });
}

function fieldBlock(label: string, value: string): Paragraph[] {
  const lines = value?.trim() ? value.split("\n").filter((l) => l.trim()) : ["—"];
  return [
    new Paragraph({
      children: [new TextRun({ text: label, bold: true, size: 19, color: GRAY, font: "Calibri" })],
      spacing: { before: 200, after: 80 },
    }),
    ...lines.map(
      (line) =>
        new Paragraph({
          children: [new TextRun({ text: line, size: 20, font: "Calibri" })],
          spacing: { after: 80 },
          indent: { left: 200 },
        })
    ),
  ];
}

function sp(): Paragraph {
  return new Paragraph({ children: [new TextRun({ text: "" })], spacing: { after: 120 } });
}

function footer(): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text: "This report is the property of Vula Solutions and the named client. Prepared in confidence.",
        size: 16,
        color: GRAY,
        font: "Calibri",
        italics: true,
      }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { before: 640 },
  });
}

function mkTable(headers: string[], rows: string[][]): Table {
  const makeCell = (text: string, isHeader: boolean, altRow: boolean) =>
    new TableCell({
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: text || "—",
              bold: isHeader,
              size: 18,
              color: isHeader ? WHITE : undefined,
              font: "Calibri",
            }),
          ],
        }),
      ],
      shading: isHeader
        ? { type: ShadingType.CLEAR, color: TEAL, fill: TEAL }
        : altRow
        ? { type: ShadingType.CLEAR, color: TEAL_LIGHT, fill: TEAL_LIGHT }
        : undefined,
      margins: { top: 80, bottom: 80, left: 120, right: 120 },
    });

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        tableHeader: true,
        children: headers.map((h) => makeCell(h, true, false)),
      }),
      ...rows.map(
        (row, i) =>
          new TableRow({
            children: row.map((cell) => makeCell(cell, false, i % 2 !== 0)),
          })
      ),
    ],
  });
}

function coverPage(company: string, tier: string, date: string, consultant: string): Paragraph[] {
  return [
    new Paragraph({ children: [new TextRun({ text: "" })], spacing: { after: 2400 } }),
    new Paragraph({
      children: [new TextRun({ text: "VULA SOLUTIONS", bold: true, size: 48, color: NAVY, font: "Calibri" })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 120 },
    }),
    new Paragraph({
      children: [new TextRun({ text: "Compass™ Report", size: 60, bold: true, color: TEAL, font: "Calibri" })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 960 },
    }),
    new Paragraph({
      children: [new TextRun({ text: company || "Client Name", bold: true, size: 36, color: NAVY, font: "Calibri" })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 160 },
    }),
    new Paragraph({
      children: [new TextRun({ text: `Compass™ ${tier}`, size: 24, color: GRAY, font: "Calibri" })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 160 },
    }),
    new Paragraph({
      children: [new TextRun({ text: date ? fmtDate(date) : "Date not set", size: 22, color: GRAY, font: "Calibri" })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 120 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: `Conducted by: ${consultant || "Vula Solutions"}`, size: 20, color: GRAY, font: "Calibri" }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
    }),
    new Paragraph({
      children: [new TextRun({ text: "CONFIDENTIAL", bold: true, size: 18, color: TEAL, font: "Calibri" })],
      alignment: AlignmentType.CENTER,
    }),
  ];
}

// ─── Essential ────────────────────────────────────────────────────────────────

function essentialBody(s: EssentialSession): (Paragraph | Table)[] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const out: any[] = [];
  const push = (...items: (Paragraph | Table)[]) => out.push(...items);

  push(h1("1. Business Snapshot"));
  push(kv("Company", s.company));
  push(kv("Industry", s.industry));
  push(kv("Company size", s.companySize));
  push(kv("Years in operation", s.yearsInOperation));
  push(kv("Revenue range", s.revenueRange));
  push(kv("Session type", "Compass™ Essential"));
  push(kv("Session date", fmtDate(s.sessionDate)));
  push(kv("Location", s.sessionLocation));
  push(kv("Primary contact", [s.clientName, s.clientTitle].filter(Boolean).join(", ")));
  push(kv("Email", s.email));
  push(kv("Phone", s.phone));
  push(kv("Website", s.website));
  push(sp());
  push(h2("Business Overview"));
  push(...fieldBlock("What the business does", s.businessDescription));
  push(...fieldBlock("Ideal clients", s.targetClients));

  push(h1("2. Discovery — Challenges & Goals"));
  push(...fieldBlock("What brought you to this session", s.whatBroughtYouHere));
  push(...fieldBlock("Biggest challenge right now", s.biggestChallenge));
  push(...fieldBlock("What success looks like in 12 months", s.goalIn12Months));
  push(...fieldBlock("What's been tried that hasn't worked", s.triedBefore));
  push(...fieldBlock("What a successful session outcome looks like", s.sessionSuccess));

  push(h1("3. Audit Findings"));
  push(h2("Digital Presence"));
  push(kv("Website", s.hasWebsite === "Yes" ? s.websiteUrl || "Yes" : s.hasWebsite || "—"));
  push(kv("Mobile-friendly", s.websiteMobile));
  push(kv("Google Business Profile", s.googleBusiness));
  push(kv("Social media", s.socialPlatforms?.join(", ") || "—"));
  push(kv("Online reviews", s.hasOnlineReviews));
  push(kv("Overall digital rating", s.digitalRating));
  if (s.digitalNotes) push(...fieldBlock("Digital notes", s.digitalNotes));

  push(h2("Operations"));
  push(...fieldBlock("Software and tools currently in use", s.currentTools));
  push(...fieldBlock("Biggest manual time drain", s.biggestTimeDrain));
  push(...fieldBlock("Where things fall through the cracks", s.thingsFallThrough));
  push(...fieldBlock("Client experience (before, during, after)", s.clientExperience));
  if (s.operationsNotes) push(...fieldBlock("Operations notes", s.operationsNotes));

  push(h1("4. Opportunity Map"));
  push(...fieldBlock("Key observations from the session", s.keyObservations));
  push(...fieldBlock("Strengths to build on", s.strengthsToBuildOn));
  push(...fieldBlock("Quick wins — achievable within 2 weeks at low cost", s.quickWins));

  push(h1("5. Recommended Roadmap"));
  push(...fieldBlock("Immediate priorities (0–30 days)", s.roadmapImmediate));
  push(...fieldBlock("Short-term priorities (30–90 days)", s.roadmapShortTerm));
  push(...fieldBlock("Longer-term opportunities", s.roadmapLongerTerm));
  if (s.recommendedSolutions?.length)
    push(...fieldBlock("Recommended Vula solutions", s.recommendedSolutions.join(", ")));

  push(h1("6. Agreed Next Steps"));
  push(...fieldBlock("Actions agreed in session", s.agreedActions));
  push(kv("Compass Report delivery date", fmtDate(s.reportDeliveryDate)));
  if (s.additionalNotes) push(...fieldBlock("Additional notes", s.additionalNotes));

  push(sp(), sp(), footer());
  return out;
}

// ─── Professional ─────────────────────────────────────────────────────────────

function professionalBody(s: ProfessionalSession): (Paragraph | Table)[] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const out: any[] = [];
  const push = (...items: (Paragraph | Table | Table)[]) => out.push(...items);

  push(h1("1. Business Snapshot"));
  push(kv("Company", s.company));
  push(kv("Industry", s.industry));
  push(kv("Company size", s.companySize));
  push(kv("Headcount", s.headcount));
  push(kv("Years in operation", s.yearsInOperation));
  push(kv("Revenue range", s.revenueRange));
  push(kv("Revenue model", s.revenueModel));
  push(kv("Growth trend (last 12 months)", s.growthTrend));
  push(kv("Session type", "Compass™ Professional"));
  push(kv("Session date", fmtDate(s.sessionDate)));
  push(kv("Location", s.sessionLocation));
  push(kv("Primary contact", [s.clientName, s.clientTitle].filter(Boolean).join(", ")));
  push(kv("Email", s.email));
  push(kv("Phone", s.phone));
  push(kv("Website", s.website));
  push(sp());
  push(...fieldBlock("What the business does", s.businessDescription));
  push(...fieldBlock("Ideal clients", s.targetClients));
  push(...fieldBlock("Team structure", s.teamStructure));

  push(h1("2. Stakeholder Register"));
  if (s.stakeholders?.length) {
    push(
      mkTable(
        ["Name", "Title", "Department", "Key Concern"],
        s.stakeholders.map((st) => [st.name, st.title, st.department, st.keyConcern])
      )
    );
  } else {
    push(new Paragraph({ children: [new TextRun({ text: "No stakeholders recorded.", size: 20, font: "Calibri", color: GRAY, italics: true })], spacing: { after: 160 } }));
  }

  push(h1("3. Discovery — Challenges & Goals"));
  push(...fieldBlock("What brought you to this session", s.whatBroughtYouHere));
  push(...fieldBlock("Biggest challenge right now", s.biggestChallenge));
  push(...fieldBlock("What success looks like in 12 months", s.goalIn12Months));
  push(...fieldBlock("What's been tried that hasn't worked", s.triedBefore));
  push(...fieldBlock("Top strategic priorities for the year", s.strategicPriorities));

  push(h1("4. Audit Findings"));
  push(h2("Digital Presence"));
  push(kv("Website", s.hasWebsite === "Yes" ? s.websiteUrl || "Yes" : s.hasWebsite || "—"));
  push(kv("Mobile-friendly", s.websiteMobile));
  push(kv("Google Business Profile", s.googleBusiness));
  push(kv("Social media", s.socialPlatforms?.join(", ") || "—"));
  push(kv("Online reviews", s.hasOnlineReviews));
  push(kv("Overall digital rating", s.digitalRating));
  if (s.digitalNotes) push(...fieldBlock("Digital notes", s.digitalNotes));

  push(h2("Operations"));
  push(...fieldBlock("Software and tools currently in use", s.currentTools));
  push(...fieldBlock("Biggest manual time drain", s.biggestTimeDrain));
  push(...fieldBlock("Where things fall through the cracks", s.thingsFallThrough));
  push(...fieldBlock("Client experience (before, during, after)", s.clientExperience));
  if (s.operationsNotes) push(...fieldBlock("Operations notes", s.operationsNotes));

  push(h2("Competitive Landscape"));
  push(...fieldBlock("Top competitors", s.topCompetitors));
  push(...fieldBlock("Key differentiator", s.keyDifferentiator));
  push(...fieldBlock("How clients typically find you", s.howClientsFind));
  push(...fieldBlock("Where deals are typically lost", s.whereLooseDeals));
  if (s.competitiveNotes) push(...fieldBlock("Competitive notes", s.competitiveNotes));

  push(h2("AI & Automation Readiness"));
  push(...fieldBlock("Most repetitive or manual tasks", s.mostRepetitiveTasks));
  push(...fieldBlock("Data captured and where it lives", s.dataCapture));
  push(...fieldBlock("AI or automation tools currently in use", s.aiToolsInUse));
  push(kv("AI readiness rating (1 = not interested, 5 = ready to implement)", s.aiReadiness));
  push(...fieldBlock("Highest-value automation opportunity", s.topAutomationOpportunity));

  push(h1("5. Opportunity Map"));
  push(...fieldBlock("Key observations from the session", s.keyObservations));
  push(...fieldBlock("Strengths to build on", s.strengthsToBuildOn));
  push(...fieldBlock("Quick wins — achievable within 2 weeks at low cost", s.quickWins));

  push(h1("6. Recommended Roadmap"));
  push(...fieldBlock("Immediate priorities (0–30 days)", s.roadmapImmediate));
  push(...fieldBlock("Short-term priorities (30–90 days)", s.roadmapShortTerm));
  push(...fieldBlock("Longer-term opportunities", s.roadmapLongerTerm));
  if (s.recommendedSolutions?.length)
    push(...fieldBlock("Recommended Vula solutions", s.recommendedSolutions.join(", ")));

  push(h1("7. 2-Week Action Plan"));
  if (s.twoWeekActions?.length) {
    push(
      mkTable(
        ["Action", "Owner", "Due Date", "Priority"],
        s.twoWeekActions.map((a) => [a.action, a.owner, a.dueDate, a.priority])
      )
    );
  } else {
    push(new Paragraph({ children: [new TextRun({ text: "No action items recorded.", size: 20, font: "Calibri", color: GRAY, italics: true })], spacing: { after: 160 } }));
  }

  push(h1("8. Agreed Next Steps"));
  push(...fieldBlock("Actions agreed in session", s.agreedActions));
  push(kv("Compass Report delivery date", fmtDate(s.reportDeliveryDate)));
  if (s.additionalNotes) push(...fieldBlock("Additional notes", s.additionalNotes));

  push(sp(), sp(), footer());
  return out;
}

// ─── Strategic ────────────────────────────────────────────────────────────────

function strategicBody(s: StrategicSession): (Paragraph | Table)[] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const out: any[] = [];
  const push = (...items: (Paragraph | Table)[]) => out.push(...items);

  push(h1("1. Business Snapshot"));
  push(kv("Company", s.company));
  push(kv("Industry", s.industry));
  push(kv("Company size", s.companySize));
  push(kv("Headcount", s.headcount));
  push(kv("Years in operation", s.yearsInOperation));
  push(kv("Revenue range", s.revenueRange));
  push(kv("Revenue model", s.revenueModel));
  push(kv("Growth trend (last 12 months)", s.growthTrend));
  push(kv("Session type", "Compass™ Strategic"));
  push(kv("Session date", fmtDate(s.sessionDate)));
  push(kv("Location", s.sessionLocation));
  push(kv("Primary contact", [s.clientName, s.clientTitle].filter(Boolean).join(", ")));
  push(kv("Email", s.email));
  push(kv("Phone", s.phone));
  push(kv("Website", s.website));
  push(sp());
  push(...fieldBlock("What the business does", s.businessDescription));
  push(...fieldBlock("Ideal clients", s.targetClients));
  push(...fieldBlock("Team structure", s.teamStructure));

  push(h1("2. Stakeholder Register"));
  if (s.stakeholders?.length) {
    push(
      mkTable(
        ["Name", "Title", "Department", "Key Concern"],
        s.stakeholders.map((st) => [st.name, st.title, st.department, st.keyConcern])
      )
    );
  } else {
    push(new Paragraph({ children: [new TextRun({ text: "No stakeholders recorded.", size: 20, font: "Calibri", color: GRAY, italics: true })], spacing: { after: 160 } }));
  }

  push(h1("3. Organisation Map"));
  if (s.departments?.length) {
    push(
      mkTable(
        ["Department", "Head", "Headcount", "Primary Challenge"],
        s.departments.map((d) => [d.department, d.head, d.headcount, d.primaryChallenge])
      )
    );
  } else {
    push(new Paragraph({ children: [new TextRun({ text: "No departments recorded.", size: 20, font: "Calibri", color: GRAY, italics: true })], spacing: { after: 160 } }));
  }
  push(sp());
  push(...fieldBlock("Key external dependencies (vendors, partners, board, regulators)", s.externalDependencies));

  push(h1("4. Discovery — Challenges & Goals"));
  push(...fieldBlock("What brought you to this engagement", s.whatBroughtYouHere));
  push(...fieldBlock("Biggest challenge right now", s.biggestChallenge));
  push(...fieldBlock("What success looks like in 12 months", s.goalIn12Months));
  push(...fieldBlock("What's been tried that hasn't worked", s.triedBefore));
  push(...fieldBlock("Top strategic priorities for the year", s.strategicPriorities));

  push(h1("5. Strategic Context"));
  push(...fieldBlock("3–5 year business vision", s.vision3to5Years));
  push(...fieldBlock("Current strategic initiatives underway", s.currentInitiatives));
  push(...fieldBlock("Regulatory and compliance considerations", s.complianceRequirements));
  push(...fieldBlock("Top business risks", s.topRisks));

  push(h1("6. Audit Findings"));
  push(h2("Digital Presence"));
  push(kv("Website", s.hasWebsite === "Yes" ? s.websiteUrl || "Yes" : s.hasWebsite || "—"));
  push(kv("Mobile-friendly", s.websiteMobile));
  push(kv("Google Business Profile", s.googleBusiness));
  push(kv("Social media", s.socialPlatforms?.join(", ") || "—"));
  push(kv("Online reviews", s.hasOnlineReviews));
  push(kv("Overall digital rating", s.digitalRating));
  if (s.digitalNotes) push(...fieldBlock("Digital notes", s.digitalNotes));

  push(h2("Operations"));
  push(...fieldBlock("Software and tools currently in use", s.currentTools));
  push(...fieldBlock("Biggest manual time drain", s.biggestTimeDrain));
  push(...fieldBlock("Where things fall through the cracks", s.thingsFallThrough));
  push(...fieldBlock("Client experience (before, during, after)", s.clientExperience));
  if (s.operationsNotes) push(...fieldBlock("Operations notes", s.operationsNotes));

  push(h2("Competitive Landscape"));
  push(...fieldBlock("Top competitors", s.topCompetitors));
  push(...fieldBlock("Key differentiator", s.keyDifferentiator));
  push(...fieldBlock("How clients typically find you", s.howClientsFind));
  push(...fieldBlock("Where deals are typically lost", s.whereLooseDeals));
  if (s.competitiveNotes) push(...fieldBlock("Competitive notes", s.competitiveNotes));

  push(h2("AI & Automation Readiness"));
  push(...fieldBlock("Most repetitive or manual tasks", s.mostRepetitiveTasks));
  push(...fieldBlock("Data captured and where it lives", s.dataCapture));
  push(...fieldBlock("AI or automation tools currently in use", s.aiToolsInUse));
  push(kv("AI readiness rating (1 = not interested, 5 = ready to implement)", s.aiReadiness));
  push(...fieldBlock("Highest-value automation opportunity", s.topAutomationOpportunity));

  push(h1("7. Opportunity Map"));
  push(...fieldBlock("Key observations from the engagement", s.keyObservations));
  push(...fieldBlock("Strengths to build on", s.strengthsToBuildOn));
  push(...fieldBlock("Quick wins — achievable within 2 weeks at low cost", s.quickWins));

  push(h1("8. Full Transformation Roadmap"));
  push(...fieldBlock("Now — Immediate actions (0–30 days)", s.roadmapNow));
  push(...fieldBlock("Next — Short-term initiatives (30–90 days)", s.roadmapNext));
  push(...fieldBlock("Later — Medium-term projects (90–180 days)", s.roadmapLater));
  push(...fieldBlock("Future — Long-term transformation (180+ days)", s.roadmapFuture));
  if (s.recommendedSolutions?.length)
    push(...fieldBlock("Recommended Vula solutions", s.recommendedSolutions.join(", ")));

  push(h1("9. 90-Day Blueprint"));
  push(...fieldBlock("Week 1–2", s.blueprintWeek1to2));
  push(...fieldBlock("Week 3–4", s.blueprintWeek3to4));
  push(...fieldBlock("Month 2 milestones", s.blueprintMonth2));
  push(...fieldBlock("Month 3 milestones", s.blueprintMonth3));
  push(...fieldBlock("Success metrics", s.successMetrics));

  push(h1("10. 2-Week Action Plan"));
  if (s.twoWeekActions?.length) {
    push(
      mkTable(
        ["Action", "Owner", "Due Date", "Priority"],
        s.twoWeekActions.map((a) => [a.action, a.owner, a.dueDate, a.priority])
      )
    );
  } else {
    push(new Paragraph({ children: [new TextRun({ text: "No action items recorded.", size: 20, font: "Calibri", color: GRAY, italics: true })], spacing: { after: 160 } }));
  }

  push(h1("11. Governance & Implementation"));
  push(kv("Executive sponsor", s.executiveSponsor));
  push(...fieldBlock("Decision-making authority", s.decisionAuthority));
  push(...fieldBlock("Stakeholder communication plan", s.communicationPlan));
  push(kv("Quarterly review date", fmtDate(s.quarterlyReviewDate)));
  push(...fieldBlock("Resource requirements", s.resourceRequirements));

  push(h1("12. Agreed Next Steps"));
  push(...fieldBlock("Actions agreed in engagement", s.agreedActions));
  push(kv("Compass Report delivery date", fmtDate(s.reportDeliveryDate)));
  if (s.additionalNotes) push(...fieldBlock("Additional notes", s.additionalNotes));

  push(sp(), sp(), footer());
  return out;
}

// ─── Download helper ──────────────────────────────────────────────────────────

function download(doc: Document, filename: string) {
  Packer.toBlob(doc).then((blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });
}

function makeDoc(cover: Paragraph[], body: (Paragraph | Table)[]): Document {
  return new Document({
    sections: [
      {
        properties: { page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        children: [...cover, new Paragraph({ pageBreakBefore: true, children: [] as any }), ...body] as any,
      },
    ],
  });
}

function slug(s: string) {
  return (s || "Report").replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-]/g, "");
}

export function generateEssentialReport(session: EssentialSession) {
  download(
    makeDoc(coverPage(session.company, "Essential", session.sessionDate, session.consultant), essentialBody(session)),
    `Compass-Essential-${slug(session.company)}-${session.sessionDate || "Draft"}.docx`
  );
}

export function generateProfessionalReport(session: ProfessionalSession) {
  download(
    makeDoc(coverPage(session.company, "Professional", session.sessionDate, session.consultant), professionalBody(session)),
    `Compass-Professional-${slug(session.company)}-${session.sessionDate || "Draft"}.docx`
  );
}

export function generateStrategicReport(session: StrategicSession) {
  download(
    makeDoc(coverPage(session.company, "Strategic", session.sessionDate, session.consultant), strategicBody(session)),
    `Compass-Strategic-${slug(session.company)}-${session.sessionDate || "Draft"}.docx`
  );
}
