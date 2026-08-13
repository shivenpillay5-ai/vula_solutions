/**
 * Vula Solutions — Business Document Generator
 * Run: node scripts/generate-docs.mjs
 * Output: generated-docs/ folder
 */
import {
  AlignmentType,
  BorderStyle,
  Document,
  Packer,
  PageBreak,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from "docx";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "generated-docs");
if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });

// ─── Brand ────────────────────────────────────────────────────────────────────
const TEAL = "01A1B7";
const NAVY = "0A1628";
const GRAY = "6B7280";
const WHITE = "FFFFFF";
const TEAL_LIGHT = "E8F7FA";
const NAVY_LIGHT = "EEF2F8";
const GOLD = "C9993E";
const FONT = "Calibri";

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Branded logo block */
function logo() {
  return new Paragraph({
    border: { left: { color: TEAL, style: BorderStyle.THICK, size: 24, space: 6 } },
    spacing: { after: 60 },
    children: [
      new TextRun({ text: "VULA", bold: true, color: TEAL, size: 40, font: FONT }),
      new TextRun({ text: "  Solutions", color: NAVY, size: 28, font: FONT }),
    ],
  });
}

/** Thin teal rule */
function rule() {
  return new Paragraph({
    border: { bottom: { color: TEAL, style: BorderStyle.SINGLE, size: 6 } },
    spacing: { after: 240 },
    children: [],
  });
}

/** Empty spacer */
function sp(pts = 12) {
  return new Paragraph({ spacing: { before: 0, after: 0 }, children: [new TextRun({ text: "", size: pts * 2 })] });
}

/** Page break */
function pb() {
  return new Paragraph({ children: [new PageBreak()] });
}

/** H1 — section title on teal background */
function h1(text) {
  return new Paragraph({
    shading: { type: ShadingType.CLEAR, color: "auto", fill: NAVY },
    spacing: { before: 80, after: 160 },
    children: [new TextRun({ text, bold: true, color: WHITE, size: 28, font: FONT })],
  });
}

/** H2 — subsection */
function h2(text) {
  return new Paragraph({
    border: { left: { color: TEAL, style: BorderStyle.THICK, size: 18, space: 6 } },
    spacing: { before: 240, after: 120 },
    children: [new TextRun({ text, bold: true, color: NAVY, size: 24, font: FONT })],
  });
}

/** H3 — minor heading */
function h3(text) {
  return new Paragraph({
    spacing: { before: 160, after: 80 },
    children: [new TextRun({ text, bold: true, color: TEAL, size: 22, font: FONT })],
  });
}

/** Body paragraph */
function body(text, opts = {}) {
  return new Paragraph({
    spacing: { before: 0, after: 120 },
    children: [
      new TextRun({
        text,
        size: 22,
        font: FONT,
        color: opts.color ?? "000000",
        bold: opts.bold ?? false,
        italics: opts.italic ?? false,
      }),
    ],
  });
}

/** Bullet point */
function bullet(text, level = 0) {
  return new Paragraph({
    bullet: { level },
    spacing: { before: 0, after: 80 },
    children: [new TextRun({ text, size: 22, font: FONT })],
  });
}

/** Key-value label pair */
function kv(label, value) {
  return new Paragraph({
    spacing: { before: 0, after: 100 },
    children: [
      new TextRun({ text: `${label}: `, bold: true, size: 22, font: FONT, color: NAVY }),
      new TextRun({ text: value || "[Insert]", size: 22, font: FONT }),
    ],
  });
}

/** Placeholder field */
function field(label) {
  return new Paragraph({
    spacing: { before: 40, after: 100 },
    children: [
      new TextRun({ text: `${label}: `, bold: true, size: 22, font: FONT, color: NAVY }),
      new TextRun({ text: "_______________________________________", size: 22, font: FONT, color: GRAY }),
    ],
  });
}

/** Legal disclaimer in grey */
function disclaimer(text) {
  return new Paragraph({
    shading: { type: ShadingType.CLEAR, color: "auto", fill: NAVY_LIGHT },
    spacing: { before: 120, after: 120 },
    children: [new TextRun({ text, size: 18, font: FONT, color: GRAY, italics: true })],
  });
}

/** Cover page block */
function cover(title, subtitle, meta = []) {
  const children = [];
  children.push(
    logo(),
    rule(),
    sp(32),
    new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: { before: 0, after: 240 },
      children: [new TextRun({ text: title, bold: true, color: NAVY, size: 56, font: FONT })],
    }),
    new Paragraph({
      spacing: { before: 0, after: 480 },
      children: [new TextRun({ text: subtitle, color: TEAL, size: 28, font: FONT })],
    })
  );
  for (const [label, val] of meta) {
    children.push(kv(label, val));
  }
  children.push(sp(24), rule());
  return children;
}

/** Simple bordered table */
function tbl(headers, rows, colWidths) {
  const totalWidth = 9072; // ~6.3 inches in twips (standard page width minus margins)
  const widths = colWidths ?? headers.map(() => Math.floor(totalWidth / headers.length));

  const headerRow = new TableRow({
    tableHeader: true,
    children: headers.map((h, i) =>
      new TableCell({
        width: { size: widths[i], type: WidthType.DXA },
        shading: { type: ShadingType.CLEAR, color: "auto", fill: NAVY },
        children: [
          new Paragraph({
            spacing: { before: 60, after: 60 },
            children: [new TextRun({ text: h, bold: true, color: WHITE, size: 20, font: FONT })],
          }),
        ],
      })
    ),
  });

  const dataRows = rows.map((row, ri) =>
    new TableRow({
      children: row.map((cell, ci) =>
        new TableCell({
          width: { size: widths[ci], type: WidthType.DXA },
          shading: { type: ShadingType.CLEAR, color: "auto", fill: ri % 2 === 0 ? WHITE : TEAL_LIGHT },
          children: [
            new Paragraph({
              spacing: { before: 60, after: 60 },
              children: [new TextRun({ text: String(cell ?? ""), size: 20, font: FONT })],
            }),
          ],
        })
      ),
    })
  );

  return new Table({
    width: { size: totalWidth, type: WidthType.DXA },
    rows: [headerRow, ...dataRows],
  });
}

/** Document wrapper with standard margins */
function doc(children) {
  return new Document({
    sections: [
      {
        properties: {
          page: {
            margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 },
          },
        },
        children,
      },
    ],
  });
}

// ─── 1. Business Plan ─────────────────────────────────────────────────────────
function buildBusinessPlan() {
  const children = [
    // Cover
    ...cover(
      "Business Plan",
      "Vula Solutions (Pty) Ltd",
      [
        ["Prepared by", "Shiven Pillay, Founder"],
        ["Date", "August 2026"],
        ["Version", "1.0 — Confidential"],
        ["Status", "Pre-Launch"],
      ]
    ),
    pb(),

    // 1. Executive Summary
    h1("1.  Executive Summary"),
    body(
      "Vula Solutions is a South African digital transformation consultancy purpose-built to make world-class " +
      "strategic and digital expertise accessible to small and medium enterprises (SMEs). " +
      "Leveraging the proprietary DARES™ Framework — Discover, Assess, Recommend, Execute, Support — " +
      "Vula guides business owners through a structured journey from digital audit to full implementation and " +
      "ongoing support."
    ),
    body(
      "Our flagship service, the Compass™ assessment, delivers a clear, actionable digital roadmap in a single " +
      "session. Priced from R5,000 for a focused 90-minute engagement to R50,000+ for a full leadership strategy " +
      "day, Compass removes the guesswork from digital transformation and replaces it with clarity, prioritised " +
      "initiatives, and a concrete execution plan."
    ),
    body(
      "The business is bootstrapped, with no external funding required in Year 1. Targeting six to eight " +
      "Compass sessions per month by Month 10, combined with downstream delivery projects, the business projects " +
      "revenue of approximately R1,000,000 in Year 1, growing to R2,200,000 in Year 2 and R4,500,000 in Year 3."
    ),
    sp(),

    // 2. Company Overview
    h1("2.  Company Overview"),
    kv("Company Name", "Vula Solutions (Pty) Ltd  [Proposed — see Section 12]"),
    kv("Founder", "Shiven Pillay"),
    kv("Founded", "2026"),
    kv("Location", "South Africa  [Insert city/province]"),
    kv("Contact", "[Insert email]  |  [Insert phone]  |  vulasolutions.co.za"),
    kv("Legal Structure", "Private Company — (Pty) Ltd  [Recommended — see Section 12]"),
    kv("Registration", "[CIPC registration number — to be obtained]"),
    kv("Tax Number", "[SARS income tax number]"),
    kv("VAT", "Not applicable until turnover exceeds R1,000,000 per year"),
    sp(),
    h2("Mission"),
    body(
      "To democratise access to world-class digital transformation expertise for South African SMEs — " +
      "making strategic clarity, implementation support, and measurable growth outcomes available to every " +
      "ambitious business, regardless of size."
    ),
    h2("Vision"),
    body(
      "To be the leading digital transformation partner for South African SMEs by 2030, recognised for " +
      "practical impact, transparent pricing, and the DARES™ methodology."
    ),
    h2("Core Values"),
    bullet("Clarity over jargon — we translate complexity into action"),
    bullet("Transparency — fixed prices, clear deliverables, no surprises"),
    bullet("Impact first — every engagement must deliver measurable value"),
    bullet("Local expertise — built for the South African business environment"),
    bullet("Continuous growth — we apply to ourselves what we recommend to clients"),
    sp(),

    // 3. The Problem
    h1("3.  The Problem"),
    body(
      "South African SMEs collectively account for a significant share of GDP and employment, yet the majority " +
      "remain digitally underserved. The market gap is structural:"
    ),
    bullet("Digital agencies sell execution without strategy — websites and ads built without understanding the business"),
    bullet("Management consultancies are priced out of reach — engagements starting at R200,000+ exclude 99% of SMEs"),
    bullet("Freelancers offer ad hoc tactical help with no framework, accountability, or continuity"),
    bullet("Business owners make costly digital decisions (websites, software, advertising) without a structured assessment"),
    bullet("Wasted spend on digital tools and campaigns is rampant — often R50,000-R500,000+ per business"),
    sp(),
    body(
      "The result: SMEs remain stuck — aware that they need digital transformation, but unable to find a " +
      "trusted, affordable partner to guide them through it systematically."
    ),
    sp(),

    // 4. The Solution
    h1("4.  Our Solution — The DARES™ Framework"),
    body(
      "Vula Solutions operates around the DARES™ Framework — a five-phase proprietary methodology that provides " +
      "structure, rigour, and accountability to the SME digital transformation journey."
    ),
    sp(),
    tbl(
      ["Phase", "What Happens", "Client Outcome"],
      [
        ["D — Discover", "Deep-dive into the business, its markets, processes, and current digital footprint", "Complete picture of where the business stands today"],
        ["A — Assess", "Digital maturity scoring, gap analysis, and competitive benchmarking", "Clear understanding of gaps, opportunities, and risks"],
        ["R — Recommend", "Prioritised, practical roadmap tailored to budget, capacity, and goals", "Actionable plan with clear ROI logic"],
        ["E — Execute", "Implementation of recommended initiatives via Vula delivery products", "Real digital transformation delivered"],
        ["S — Support", "Ongoing fractional support, performance monitoring, and iteration", "Sustained results and continuous improvement"],
      ],
      [1600, 3400, 4072]
    ),
    sp(),
    body(
      "The DARES™ Framework is not just a consulting methodology — it is the engine of the Vula business model. " +
      "Every Compass session creates a documented roadmap that naturally flows into downstream delivery " +
      "projects (Execute phase) and ongoing retainer relationships (Support phase)."
    ),
    sp(),

    // 5. Products & Services
    h1("5.  Products & Services"),
    h2("5.1  Compass™ — Assessment & Strategy"),
    body("The Compass series is the primary discovery and strategy offering. All sessions are delivered by the Vula founder and result in a branded, structured report."),
    sp(),
    tbl(
      ["Tier", "Investment", "Duration", "Stakeholders", "Key Deliverable"],
      [
        ["Compass Essential", "R5,000", "90 minutes", "1 decision-maker", "Digital Presence Report"],
        ["Compass Professional", "R15,000", "Half-day (3-4 hrs)", "Up to 5 stakeholders", "Full Transformation Roadmap"],
        ["Compass Strategic", "R50,000+", "Full day+", "Leadership team", "Enterprise Strategy + 90-Day Blueprint"],
      ],
      [1600, 1400, 1600, 1700, 2772]
    ),
    sp(),
    h2("5.2  Delivery Products — Execute Phase"),
    body("Following a Compass assessment, clients choose delivery engagements aligned to their roadmap:"),
    sp(),
    tbl(
      ["Product", "Description", "Typical Investment"],
      [
        ["Launch™", "Digital presence foundation — brand, website, social media, Google Business Profile", "From R15,000"],
        ["Flow™", "Process automation — CRM, workflow tools, eliminating manual admin", "From R25,000"],
        ["Accelerate™", "Growth marketing — paid media, SEO, email, content strategy", "From R20,000/mo"],
        ["Growth™", "Revenue scaling — conversion rate optimisation, sales enablement, analytics", "From R30,000"],
        ["Partner™", "Ongoing fractional digital transformation support (retainer)", "R8,000–R25,000/mo"],
      ],
      [1400, 5000, 2672]
    ),
    sp(),
    h2("5.3  Revenue Model"),
    body("Compass assessments generate immediate cash flow and create the pipeline for delivery work. The Partner retainer tier creates recurring, predictable revenue as clients mature."),
    bullet("Compass sessions: One-time, fixed-price, high-margin"),
    bullet("Delivery projects: Project-based, milestone-invoiced, sub-contractor enabled"),
    bullet("Partner retainers: Monthly recurring revenue — the long-term goal"),
    sp(),

    // 6. Target Market
    h1("6.  Target Market & Market Size"),
    h2("6.1  Primary Segment"),
    body("South African SMEs generating between R2 million and R50 million in annual revenue. These businesses are:"),
    bullet("Established enough to have digital problems worth solving"),
    bullet("Too small for the large consultancies to serve economically"),
    bullet("Owner-led or with a small management team — fast decision-making"),
    bullet("Actively seeking competitive advantage through technology"),
    sp(),
    h2("6.2  Key Sectors"),
    bullet("Professional services (law, accounting, HR, consulting)"),
    bullet("Retail and e-commerce"),
    bullet("Manufacturing and light industrial"),
    bullet("Logistics and distribution"),
    bullet("Healthcare (private clinics, allied health)"),
    bullet("Hospitality and food service"),
    sp(),
    h2("6.3  Market Size"),
    tbl(
      ["Metric", "Estimate", "Source / Basis"],
      [
        ["Registered SMEs in SA", "~2.9 million", "Stats SA (2023)"],
        ["Formal SMEs in target revenue band", "~250,000", "Estimated 8-10% of registered SMEs"],
        ["TAM — Compass alone (at R5,000 minimum)", "R1.25 billion+", "250,000 × R5,000"],
        ["SAM — Gauteng + Western Cape first", "~80,000 businesses", "Key economic hubs"],
        ["SOM — Year 1 realistic target", "50-80 sessions", "Bootstrapped, solo founder"],
      ],
      [2500, 2000, 4572]
    ),
    sp(),
    h2("6.4  Ideal Client Profile"),
    bullet("Title: Business owner, Managing Director, or General Manager"),
    bullet("Revenue: R2M–R50M per annum"),
    bullet("Team: 5–200 employees"),
    bullet("Pain: Knows digital transformation is needed but doesn't know where to start"),
    bullet("Budget: R5,000–R100,000 for strategy; R20,000–R500,000+ for delivery"),
    bullet("Decision speed: 1–3 weeks from first contact to engagement"),
    sp(),

    // 7. Go-to-Market
    h1("7.  Go-to-Market Strategy"),
    h2("Phase 1 — Foundation (Months 1–3)"),
    bullet("Define Vula brand voice and publish a LinkedIn content series on SA digital transformation"),
    bullet("Offer 2-3 pilot Compass Essential sessions at a reduced rate to generate case studies"),
    bullet("Leverage founder's professional network for warm referrals"),
    bullet("Set up HubSpot (free CRM), branded email, and basic tracking"),
    sp(),
    h2("Phase 2 — Acceleration (Months 4–6)"),
    bullet("Publish first two case studies on the Vula website"),
    bullet("Outreach to SA business networks: BNI chapters, Chamber of Commerce, EO (Entrepreneurs' Organisation)"),
    bullet("Begin monthly LinkedIn newsletter: 'Digital Dispatch — SA SME Edition'"),
    bullet("Target 3-5 paying Compass sessions per month"),
    sp(),
    h2("Phase 3 — Scale (Months 7–12)"),
    bullet("Introduce first Partner retainer client(s)"),
    bullet("Speaking engagements at SA business events and podcasts"),
    bullet("Consider first sub-contractor or associate relationship for delivery capacity"),
    bullet("Target 6-8 Compass sessions per month + 2-4 active delivery projects"),
    sp(),
    h2("Channels"),
    tbl(
      ["Channel", "Tactic", "Investment"],
      [
        ["LinkedIn", "Thought leadership content, DM outreach, video posts", "Time only"],
        ["Referrals", "Structured referral programme — reward introducers", "5-10% referral fee"],
        ["Website / SEO", "Case studies, blog, keyword targeting (SA SME digital)", "Time + R2,000/mo"],
        ["WhatsApp Business", "Pipeline nurturing, quick turnaround on enquiries", "Time only"],
        ["Business Networks", "BNI, Chamber of Commerce, industry associations", "R3,000-R8,000/yr membership"],
      ],
      [1800, 4000, 3272]
    ),
    sp(),

    // 8. Competitive Landscape
    h1("8.  Competitive Landscape"),
    tbl(
      ["Competitor Type", "What They Offer", "Weakness vs. Vula"],
      [
        ["Digital agencies", "Execution: websites, ads, social media", "No strategy layer; sell without diagnosing"],
        ["Large consultancies", "Strategy at enterprise scale", "R200,000+ minimum; not SME-accessible"],
        ["Freelancers", "Ad hoc tactical help", "No framework, no accountability, no continuity"],
        ["Business coaches", "General business mentoring", "Rarely digital-specific; no implementation"],
        ["Software vendors", "Sell tools (CRM, ERP, etc.)", "Self-interested; don't map tool to business need"],
      ],
      [2000, 3000, 4072]
    ),
    sp(),
    h2("Vula's Competitive Differentiation"),
    bullet("Proprietary DARES™ framework — structured, repeatable, defensible IP"),
    bullet("Fixed, transparent pricing — no hidden fees, no scope surprises"),
    bullet("Full spectrum — strategy through implementation through ongoing support"),
    bullet("South African context — built for SA SME regulatory, economic, and cultural realities"),
    bullet("Founder-delivered — clients deal directly with senior expertise, not account managers"),
    sp(),

    // 9. Operations
    h1("9.  Operations"),
    h2("9.1  Delivery Model"),
    bullet("Compass sessions delivered in person or via video call (Google Meet / Teams)"),
    bullet("Reports generated from structured session data (DARES™ methodology)"),
    bullet("Delivery projects managed by founder, with approved sub-contractors for specialist work (web dev, design, paid media)"),
    bullet("Client communication via email and WhatsApp Business"),
    sp(),
    h2("9.2  Tools & Systems"),
    tbl(
      ["Function", "Tool", "Cost"],
      [
        ["CRM & Pipeline", "HubSpot (free tier)", "R0/mo"],
        ["Accounting & Invoicing", "Xero or Wave", "R300-R500/mo"],
        ["Project Management", "Notion or ClickUp (free)", "R0-R200/mo"],
        ["Communication", "Microsoft 365 (email, Word, Teams)", "R300/mo"],
        ["Document Generation", "Custom Vula session app", "Included in website"],
        ["Website & Hosting", "Vula website (cloud hosted)", "R200-R500/mo"],
        ["Design", "Canva Pro", "R350/mo"],
      ],
      [2500, 3000, 3572]
    ),
    sp(),
    h2("9.3  Capacity (Year 1 — Solo Founder)"),
    bullet("Maximum ~8 Compass sessions per month (time constraint)"),
    bullet("Maximum 2-3 concurrent delivery projects"),
    bullet("Headroom for sub-contractor onboarding from Month 6"),
    sp(),

    // 10. Financial Projections
    h1("10.  Financial Projections"),
    disclaimer(
      "Note: These projections are illustrative estimates based on conservative assumptions. Actual results will vary. " +
      "Consult a registered accountant for formal financial modelling."
    ),
    sp(),
    h2("10.1  Revenue Forecast"),
    tbl(
      ["Period", "Compass Revenue", "Delivery Revenue", "Retainers", "Total"],
      [
        ["Q1 2026", "R45,000", "R0", "R0", "R45,000"],
        ["Q2 2026", "R120,000", "R60,000", "R0", "R180,000"],
        ["Q3 2026", "R150,000", "R120,000", "R16,000", "R286,000"],
        ["Q4 2026", "R150,000", "R200,000", "R48,000", "R398,000"],
        ["Year 1 Total", "R465,000", "R380,000", "R64,000", "R909,000"],
        ["Year 2 Estimate", "R720,000", "R900,000", "R360,000", "R1,980,000"],
        ["Year 3 Estimate", "R900,000", "R2,000,000", "R900,000", "R3,800,000"],
      ],
      [1600, 2000, 2000, 1600, 1872]
    ),
    sp(),
    h2("10.2  Cost Structure (Year 1)"),
    tbl(
      ["Cost Item", "Monthly", "Annual"],
      [
        ["Software & tools (CRM, accounting, design)", "R1,500", "R18,000"],
        ["Marketing & content creation", "R2,000", "R24,000"],
        ["Professional fees (legal, accounting, CIPC)", "R1,700", "R20,000"],
        ["Travel & client entertainment", "R1,000", "R12,000"],
        ["Website hosting & domain", "R500", "R6,000"],
        ["Sub-contractor costs (pass-through to client)", "Variable", "Nil (cost neutral)"],
        ["Total Operating Costs", "~R6,700", "~R80,000"],
      ],
      [4000, 2000, 3072]
    ),
    sp(),
    h2("10.3  Profitability (Year 1)"),
    kv("Projected Revenue", "R909,000"),
    kv("Operating Costs", "R80,000"),
    kv("Gross Profit", "R829,000  (91% margin — pre-tax)"),
    kv("Tax (approximate 27% Pty Ltd rate on profit)", "~R224,000"),
    kv("Net After Tax", "~R605,000"),
    sp(),
    body(
      "The business is highly cash-generative from inception due to the consulting model. Low overhead, fixed-price " +
      "products, and 50% upfront deposits ensure strong cash flow management.",
      { italic: true }
    ),
    sp(),

    // 11. Legal & Compliance
    h1("11.  Legal & Compliance"),
    h2("11.1  Recommended Legal Structure: (Pty) Ltd"),
    body("We recommend registering Vula Solutions as a Private Company (Pty) Ltd via CIPC. Key benefits include:"),
    bullet("Limited liability — personal assets (home, savings) are protected from business debts or claims"),
    bullet("Credibility — a registered Pty Ltd is taken more seriously by corporate clients and large SMEs"),
    bullet("Future flexibility — easier to bring in partners, issue equity, or sell the business"),
    bullet("Banking — most SA business banks require a Pty Ltd for business accounts with full features"),
    bullet("Tax structuring — a company can retain earnings at the 27% corporate tax rate vs. up to 45% personal income tax"),
    sp(),
    h2("11.2  Registration Steps"),
    bullet("Register on the CIPC e-Services portal (bizportal.gov.za) — cost: R175"),
    bullet("Reserve company name (optional, R50) — confirm 'Vula Solutions (Pty) Ltd' availability"),
    bullet("Open a dedicated business bank account (Nedbank Business, FNB Business, or Standard Bank)"),
    bullet("Register with SARS for income tax (automatic with CIPC registration)"),
    bullet("Register for VAT only when annual turnover exceeds R1,000,000 (voluntary earlier if beneficial)"),
    bullet("Obtain professional indemnity insurance — especially for strategic advisory work"),
    sp(),
    h2("11.3  Contracts & IP"),
    bullet("All client engagements governed by the Vula Client Contract & NDA (separate document)"),
    bullet("DARES™ Framework and Vula brand are the intellectual property of Vula Solutions"),
    bullet("Consider trademarking DARES™ via the CIPC Trademarks Office once revenue begins"),
    sp(),

    // 12. Risk Analysis
    h1("12.  Risk Analysis"),
    tbl(
      ["Risk", "Likelihood", "Impact", "Mitigation"],
      [
        ["Slow initial client acquisition", "Medium", "High", "Start with warm network; offer 2-3 pilot sessions at reduced rate"],
        ["Key-person dependency (solo founder)", "High", "High", "Document all processes; build sub-contractor relationships early"],
        ["Scope creep on delivery projects", "Medium", "Medium", "Tight SOW templates; milestone payments; change request process"],
        ["Client bad debt / slow payment", "Low-Medium", "Medium", "50% deposit on all engagements; 14-day payment terms"],
        ["Economic downturn (SA macroeconomic)", "Low-Medium", "Medium", "Compass at R5,000 is an affordable entry point even in downturns"],
        ["Competitor copies DARES™ model", "Low", "Low-Medium", "Build brand and case study library; consider trademarking"],
      ],
      [2500, 1200, 1200, 4172]
    ),
    sp(),

    // 13. Appendices
    h1("13.  Appendices"),
    h2("Appendix A — DARES™ Methodology Summary"),
    body("Available in the Vula session documentation and client-facing materials."),
    h2("Appendix B — Compass Tier Comparison"),
    body("Full tier comparison available on vulasolutions.co.za"),
    h2("Appendix C — Sample Compass Report"),
    body("Available on request from the Vula team."),
    h2("Appendix D — Sub-Contractor Register"),
    body("Internal document — to be maintained by the founder as relationships are established."),
    sp(),
    rule(),
    body("Vula Solutions (Pty) Ltd  —  Business Plan  —  Version 1.0  —  Confidential", { color: GRAY }),
  ];

  return doc(children);
}

// ─── 2. Client Contract & NDA ─────────────────────────────────────────────────
function buildClientContract() {
  const children = [
    ...cover(
      "Client Agreement\n& NDA",
      "Vula Solutions (Pty) Ltd",
      [
        ["Document type", "Client Contract & Non-Disclosure Agreement"],
        ["Version", "1.0"],
        ["Governing law", "Republic of South Africa"],
      ]
    ),
    disclaimer(
      "TEMPLATE — This document is a starting-point template and has not been reviewed by a qualified South African attorney. " +
      "Have a legal professional review this before using it with clients."
    ),
    pb(),

    h1("SERVICES AGREEMENT & MUTUAL NON-DISCLOSURE"),
    body("This Agreement is entered into between:"),
    sp(),
    h2("Parties"),
    kv("Service Provider", "Vula Solutions (Pty) Ltd  (Registration No: [Insert])  — 'Vula'"),
    kv("Address", "[Insert registered address]"),
    kv("Email", "[Insert]"),
    sp(),
    kv("Client", "[Client full legal name]  (Registration No / ID: [Insert])"),
    kv("Address", "[Insert client address]"),
    kv("Email", "[Insert client email]"),
    sp(),
    body("Together referred to as 'the Parties'. This Agreement governs all engagements between the Parties."),
    sp(),

    h1("1.  Scope of Services"),
    body(
      "Vula will provide the services described in the applicable Proposal or Statement of Work ('SOW'), " +
      "which shall be incorporated into and form part of this Agreement upon signature by both Parties."
    ),
    bullet("Services are described in the attached SOW / Proposal"),
    bullet("Any changes to scope must be agreed in writing via a Change Request"),
    bullet("Vula reserves the right to engage approved sub-contractors for delivery — overall accountability remains with Vula"),
    sp(),

    h1("2.  Fees & Payment"),
    body("2.1  Fees are as set out in the applicable Proposal or SOW."),
    body("2.2  Payment terms:"),
    bullet("50% deposit is payable upon signing this Agreement or the applicable SOW"),
    bullet("Remaining 50% is payable upon delivery of the agreed deliverable(s) or at project milestone"),
    bullet("Retainer fees (Partner tier) are payable monthly in advance"),
    body("2.3  Invoices are due within 14 days of issue."),
    body("2.4  Late payments attract interest at the prime lending rate + 2% per annum, calculated daily."),
    body("2.5  Vula reserves the right to suspend services for accounts overdue by more than 7 days."),
    sp(),

    h1("3.  Confidentiality & Non-Disclosure"),
    body(
      "3.1  Each Party (the 'Receiving Party') agrees to keep confidential all non-public information " +
      "disclosed by the other Party (the 'Disclosing Party') in connection with this Agreement ('Confidential Information')."
    ),
    body("3.2  Confidential Information includes but is not limited to: business plans, financial data, client lists, pricing, strategies, and technical information."),
    body("3.3  The Receiving Party shall:"),
    bullet("Use Confidential Information only for the purposes of this Agreement"),
    bullet("Not disclose Confidential Information to any third party without prior written consent"),
    bullet("Apply the same degree of protection as it applies to its own confidential information (minimum: reasonable care)"),
    body("3.4  Obligations do not apply to information that: (a) is or becomes publicly known through no fault of the Receiving Party; (b) was already known before disclosure; (c) is required to be disclosed by law or court order."),
    body("3.5  This confidentiality obligation survives termination of this Agreement for a period of three (3) years."),
    sp(),

    h1("4.  Intellectual Property"),
    body("4.1  Deliverables: Upon full payment, the Client owns all custom deliverables created specifically for the Client under this Agreement (reports, designs, written content)."),
    body("4.2  Vula IP: The DARES™ Framework, methodology, tools, templates, and software systems remain the sole property of Vula Solutions at all times."),
    body("4.3  Pre-existing IP: Each Party retains ownership of all IP owned prior to this Agreement."),
    body("4.4  The Client grants Vula the right to reference the engagement (client name, sector, anonymised outcomes) in marketing materials unless the Client requests otherwise in writing."),
    sp(),

    h1("5.  Warranties & Limitation of Liability"),
    body("5.1  Vula warrants that services will be performed with reasonable care and skill."),
    body("5.2  Vula does not warrant specific business outcomes — results depend on factors outside Vula's control including market conditions, client implementation, and third-party platforms."),
    body("5.3  To the fullest extent permitted by law, Vula's total liability under or in connection with this Agreement shall not exceed the total fees paid by the Client in the three months prior to the claim."),
    body("5.4  Neither Party shall be liable for indirect, consequential, or special damages."),
    sp(),

    h1("6.  Termination"),
    body("6.1  Either Party may terminate this Agreement on 30 days' written notice."),
    body("6.2  On termination, the Client shall pay for all work completed to the date of termination. Deposits are non-refundable unless Vula is in material breach."),
    body("6.3  Vula may terminate immediately if the Client: fails to pay within 21 days of due date; acts in a manner that is abusive, fraudulent, or in bad faith."),
    sp(),

    h1("7.  General"),
    body("7.1  This Agreement constitutes the entire agreement between the Parties and supersedes all prior representations or agreements."),
    body("7.2  No variation is effective unless in writing and signed by both Parties."),
    body("7.3  This Agreement is governed by the laws of the Republic of South Africa."),
    body("7.4  Any disputes shall first be subject to good-faith mediation before litigation."),
    sp(),

    h1("8.  Signatures"),
    body("By signing below, the Parties agree to the terms of this Agreement."),
    sp(),
    tbl(
      ["For Vula Solutions (Pty) Ltd", "For the Client"],
      [
        ["Signatory: _________________________", "Signatory: _________________________"],
        ["Name: Shiven Pillay", "Name: _________________________"],
        ["Title: Founder & Director", "Title: _________________________"],
        ["Date: _________________________", "Date: _________________________"],
      ],
      [4500, 4572]
    ),
    sp(),
    rule(),
    body("Vula Solutions (Pty) Ltd  —  Client Agreement & NDA  —  v1.0", { color: GRAY }),
  ];

  return doc(children);
}

// ─── 3. Proposal Template ─────────────────────────────────────────────────────
function buildProposal() {
  const children = [
    ...cover(
      "Engagement Proposal",
      "[Client Company Name]",
      [
        ["Prepared by", "Shiven Pillay, Vula Solutions"],
        ["Prepared for", "[Client Name & Title]"],
        ["Date", "[Date]"],
        ["Reference", "PROP-[YYYY]-[NNN]"],
        ["Valid until", "[Date + 30 days]"],
      ]
    ),
    pb(),

    h1("1.  Executive Summary"),
    body(
      "[2-3 sentence overview of what this proposal covers, the client's key challenges, and what Vula will deliver. " +
      "Write this last — it should summarise the whole proposal in terms the client will immediately recognise.]"
    ),
    sp(),

    h1("2.  About Vula Solutions"),
    body(
      "Vula Solutions is a South African digital transformation consultancy that guides SMEs from digital uncertainty " +
      "to strategic clarity and practical execution. Our proprietary DARES™ Framework — Discover, Assess, Recommend, " +
      "Execute, Support — provides a structured, accountable path through every stage of digital transformation."
    ),
    body(
      "We work exclusively with owner-led and founder-led businesses that are serious about growth, and we deliver " +
      "world-class strategic rigour at SME-accessible price points."
    ),
    sp(),

    h1("3.  Understanding Your Business"),
    body("[Insert 2-4 paragraphs demonstrating that you understand the client's business, their industry, their specific challenges, and what success looks like for them. Reference the Compass session or discovery call.]"),
    sp(),
    h2("Key Challenges Identified"),
    bullet("[Challenge 1 — specific to this client]"),
    bullet("[Challenge 2]"),
    bullet("[Challenge 3]"),
    sp(),
    h2("What Success Looks Like"),
    bullet("[Outcome 1 — what the client wants to achieve]"),
    bullet("[Outcome 2]"),
    bullet("[Outcome 3]"),
    sp(),

    h1("4.  Proposed Engagement"),
    h2("4.1  Engagement Type"),
    body("[Describe which Compass tier and/or which delivery product(s) you are proposing.]"),
    sp(),
    tbl(
      ["Phase", "Service", "Description", "Timeline"],
      [
        ["Phase 1", "[e.g. Compass Professional]", "[Brief description of what will be delivered in this phase]", "[e.g. Week 1-2]"],
        ["Phase 2", "[e.g. Launch™]", "[Brief description]", "[e.g. Week 3-8]"],
        ["Phase 3", "[e.g. Partner™ Retainer]", "[Ongoing monthly support]", "[Month 3 onward]"],
      ],
      [1000, 1800, 4000, 1272]
    ),
    sp(),
    h2("4.2  Deliverables"),
    bullet("[Deliverable 1 — specific, tangible, named]"),
    bullet("[Deliverable 2]"),
    bullet("[Deliverable 3]"),
    bullet("[Deliverable 4]"),
    sp(),

    h1("5.  Investment"),
    tbl(
      ["Item", "Investment (excl. VAT)", "Notes"],
      [
        ["[Phase 1 / Service 1]", "R[Amount]", "[e.g. 50% deposit on signing]"],
        ["[Phase 2 / Service 2]", "R[Amount]", "[e.g. Payable on milestone 1]"],
        ["[Ongoing retainer]", "R[Amount]/month", "[Cancel with 30 days notice]"],
        ["Total Engagement Value", "R[Total]", ""],
      ],
      [3500, 2000, 3572]
    ),
    sp(),
    body("All prices exclude VAT where applicable. Payment terms: 50% deposit on signing; balance per the schedule above.", { italic: true }),
    sp(),

    h1("6.  Timeline"),
    tbl(
      ["Week / Month", "Milestone", "Owner"],
      [
        ["Week 1", "[e.g. Kick-off call + briefing documents]", "Vula + Client"],
        ["Week 2", "[e.g. Discovery session]", "Vula"],
        ["Week 3-4", "[e.g. Report / deliverable delivery]", "Vula"],
        ["Week 5+", "[e.g. Implementation begins]", "Vula"],
        ["Ongoing", "[e.g. Monthly check-in + reporting]", "Vula + Client"],
      ],
      [1800, 5000, 2272]
    ),
    sp(),

    h1("7.  Why Vula Solutions"),
    bullet("Proprietary DARES™ Framework — proven, structured, and repeatable"),
    bullet("Fixed, transparent pricing — no hidden fees"),
    bullet("Senior-led delivery — you work directly with Shiven Pillay, not junior staff"),
    bullet("South African context — built for the realities of doing business in SA"),
    bullet("Full spectrum — from strategy through implementation to ongoing support"),
    sp(),

    h1("8.  Next Steps"),
    body("To accept this proposal:"),
    bullet("1.  Sign and return this proposal (or the accompanying Client Agreement)"),
    bullet("2.  Pay the deposit invoice to confirm the engagement"),
    bullet("3.  We'll schedule the kick-off within [X] business days"),
    sp(),
    body("Questions? Contact Shiven Pillay at [email] or [phone]."),
    sp(),

    h1("9.  Acceptance"),
    body("By signing below, the Client accepts this proposal and the accompanying Vula Solutions Client Agreement."),
    sp(),
    tbl(
      ["For Vula Solutions (Pty) Ltd", "Client Acceptance"],
      [
        ["Signatory: _________________________", "Signatory: _________________________"],
        ["Name: Shiven Pillay", "Name: _________________________"],
        ["Date: _________________________", "Date: _________________________"],
      ],
      [4500, 4572]
    ),
    sp(),
    rule(),
    body("Vula Solutions (Pty) Ltd  —  Proposal Template  —  Confidential", { color: GRAY }),
  ];

  return doc(children);
}

// ─── 4. Scope of Work ─────────────────────────────────────────────────────────
function buildSOW() {
  const children = [
    ...cover(
      "Statement of Work",
      "[Project Name]",
      [
        ["Client", "[Client Company Name]"],
        ["Project", "[Project Name / Engagement]"],
        ["SOW Number", "SOW-[YYYY]-[NNN]"],
        ["Date", "[Date]"],
        ["Version", "1.0"],
      ]
    ),
    pb(),

    h1("1.  Project Overview"),
    kv("Client", "[Client Company Name]"),
    kv("Project Name", "[Descriptive project name]"),
    kv("Engagement Type", "[e.g. Compass Professional / Launch™ / Flow™]"),
    kv("Project Manager (Vula)", "Shiven Pillay"),
    kv("Client Contact", "[Name, Title, Email]"),
    kv("Start Date", "[Date]"),
    kv("Target Completion", "[Date]"),
    sp(),

    h1("2.  Background & Objectives"),
    h2("Background"),
    body("[1-2 paragraphs summarising the client's business, their current situation, and why they are engaging Vula.]"),
    sp(),
    h2("Objectives"),
    body("This engagement aims to achieve the following:"),
    bullet("Objective 1: [Specific, measurable]"),
    bullet("Objective 2: [Specific, measurable]"),
    bullet("Objective 3: [Specific, measurable]"),
    sp(),

    h1("3.  Deliverables"),
    body("Vula will deliver the following items within the timeframe and to the standards described:"),
    sp(),
    tbl(
      ["#", "Deliverable", "Description", "Format", "Due Date"],
      [
        ["1", "[Deliverable name]", "[What it contains / what it achieves]", "[e.g. PDF Report]", "[Date]"],
        ["2", "[Deliverable name]", "[Description]", "[e.g. Live website]", "[Date]"],
        ["3", "[Deliverable name]", "[Description]", "[e.g. Word document]", "[Date]"],
        ["4", "[Deliverable name]", "[Description]", "[Format]", "[Date]"],
      ],
      [400, 2000, 3200, 1200, 1272]
    ),
    sp(),

    h1("4.  Timeline & Milestones"),
    tbl(
      ["Milestone", "Description", "Target Date", "Payment Trigger"],
      [
        ["Kick-off", "Project briefing, access provisioning, sign-off on plan", "[Date]", "No"],
        ["Milestone 1", "[Description]", "[Date]", "[e.g. 30% of project fee]"],
        ["Milestone 2", "[Description]", "[Date]", "[e.g. 30% of project fee]"],
        ["Final Delivery", "All deliverables signed off by client", "[Date]", "[e.g. 40% balance]"],
      ],
      [1800, 3200, 1600, 2472]
    ),
    sp(),

    h1("5.  Roles & Responsibilities"),
    h2("Vula Solutions"),
    bullet("Deliver all services as described in this SOW"),
    bullet("Manage project timeline and communicate proactively on any delays"),
    bullet("Provide a single point of contact (Shiven Pillay) throughout the engagement"),
    bullet("Obtain client approval before moving to each new phase"),
    sp(),
    h2("Client"),
    bullet("Provide timely access to information, systems, and key personnel required"),
    bullet("Nominate a single point of contact for approvals and communications"),
    bullet("Review and approve (or request revisions to) deliverables within [5] business days"),
    bullet("Pay invoices per the schedule in Section 7"),
    sp(),

    h1("6.  Out of Scope"),
    body("The following are expressly excluded from this SOW unless agreed in a separate Change Request:"),
    bullet("[Out of scope item 1]"),
    bullet("[Out of scope item 2]"),
    bullet("[Out of scope item 3]"),
    bullet("Any work not explicitly described in Section 3 (Deliverables)"),
    sp(),

    h1("7.  Payment Schedule"),
    tbl(
      ["Invoice", "Amount", "Trigger", "Due"],
      [
        ["Deposit", "50% of total", "On signing of this SOW", "On signing"],
        ["Milestone 1", "[Amount]", "[Milestone trigger]", "14 days from invoice"],
        ["Final Invoice", "Balance", "Client sign-off on final deliverable", "14 days from invoice"],
      ],
      [1500, 1800, 3500, 2272]
    ),
    sp(),

    h1("8.  Assumptions & Dependencies"),
    bullet("[Assumption 1 — e.g. Client will provide logo files and brand assets within 5 days of kick-off]"),
    bullet("[Assumption 2 — e.g. Client has administrative access to their website]"),
    bullet("[Assumption 3 — e.g. Third-party software costs are excluded and will be borne by the Client]"),
    sp(),

    h1("9.  Change Request Process"),
    body(
      "Any change to the scope, timeline, or budget of this engagement must be submitted as a written Change Request. " +
      "Vula will assess the impact and respond within 3 business days. No change will be implemented until " +
      "both Parties sign the Change Request document."
    ),
    sp(),

    h1("10.  Acceptance"),
    body("By signing below, both Parties confirm agreement to the scope, deliverables, and payment terms in this Statement of Work."),
    sp(),
    tbl(
      ["For Vula Solutions (Pty) Ltd", "For the Client"],
      [
        ["Signatory: _________________________", "Signatory: _________________________"],
        ["Name: Shiven Pillay", "Name: _________________________"],
        ["Date: _________________________", "Date: _________________________"],
      ],
      [4500, 4572]
    ),
    sp(),
    rule(),
    body("Vula Solutions (Pty) Ltd  —  Statement of Work  —  Confidential", { color: GRAY }),
  ];

  return doc(children);
}

// ─── 5. Invoice Template ──────────────────────────────────────────────────────
function buildInvoice() {
  const children = [
    logo(),
    rule(),
    sp(),
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      spacing: { before: 0, after: 80 },
      children: [new TextRun({ text: "TAX INVOICE", bold: true, color: NAVY, size: 36, font: FONT })],
    }),
    sp(),

    tbl(
      ["Invoice Details", ""],
      [
        ["Invoice Number:", "INV-[YYYY]-[NNN]"],
        ["Invoice Date:", "[Date]"],
        ["Due Date:", "[Date + 14 days]"],
        ["Payment Terms:", "14 days net"],
      ],
      [3000, 6072]
    ),
    sp(),

    tbl(
      ["Bill From", "Bill To"],
      [
        [
          "Vula Solutions (Pty) Ltd\nRegistration No: [Insert]\n[Address line 1]\n[City, Province, Code]\nEmail: [Insert]\nTel: [Insert]",
          "[Client Company Name]\n[Registration / VAT No]\n[Address line 1]\n[City, Province, Code]\nEmail: [Client email]\nAttn: [Contact name]",
        ],
      ],
      [4500, 4572]
    ),
    sp(),

    h2("Services Rendered"),
    tbl(
      ["#", "Description", "Qty", "Unit Price", "Amount"],
      [
        ["1", "[Service / Deliverable description]", "1", "R[Amount]", "R[Amount]"],
        ["2", "[Service / Deliverable description]", "1", "R[Amount]", "R[Amount]"],
        ["3", "[Service / Deliverable description]", "1", "R[Amount]", "R[Amount]"],
        ["", "", "", "", ""],
      ],
      [400, 4000, 700, 1500, 1472]
    ),
    sp(),

    tbl(
      ["", ""],
      [
        ["Subtotal:", "R[Subtotal]"],
        ["VAT (15%) — if registered:", "R[VAT amount]  (or N/A)"],
        ["Total Due:", "R[Total]"],
        ["Less: Deposit paid:", "R[Deposit]"],
        ["Balance Outstanding:", "R[Balance]"],
      ],
      [6000, 3072]
    ),
    sp(),

    h2("Banking Details"),
    kv("Bank", "[Bank name — e.g. First National Bank]"),
    kv("Account Name", "Vula Solutions (Pty) Ltd"),
    kv("Account Number", "[Account number]"),
    kv("Branch Code", "[Branch code]"),
    kv("Account Type", "[Cheque / Current]"),
    kv("Reference", "INV-[YYYY]-[NNN]  /  [Client surname]"),
    sp(),

    disclaimer(
      "Please use the invoice number as your payment reference. If paying by EFT, please send proof of payment to [email]. " +
      "For queries, contact Shiven Pillay at [email] or [phone]."
    ),
    sp(),
    body("Thank you for your business.", { bold: true, color: TEAL }),
    sp(),
    rule(),
    body("Vula Solutions (Pty) Ltd  —  [Registration No]  —  [VAT No if applicable]", { color: GRAY }),
  ];

  return doc(children);
}

// ─── 6. Welcome Pack ──────────────────────────────────────────────────────────
function buildWelcomePack() {
  const children = [
    ...cover(
      "Welcome to Vula",
      "Your Digital Transformation Journey Begins Here",
      [
        ["Prepared for", "[Client Name]"],
        ["Session type", "[Compass Essential / Professional / Strategic]"],
        ["Session date", "[Date]"],
        ["Your consultant", "Shiven Pillay, Vula Solutions"],
      ]
    ),
    pb(),

    h1("A Personal Welcome"),
    body(
      "Thank you for choosing Vula Solutions. The fact that you are investing time and resources in a structured " +
      "digital transformation conversation says a great deal about how seriously you take your business."
    ),
    body(
      "My commitment to you is simple: every minute of our session will be focused on your business — your " +
      "challenges, your opportunities, and what will actually make a difference for you. No generic advice. " +
      "No unnecessary jargon. Just clarity, practical recommendations, and a clear path forward."
    ),
    body("I am looking forward to working with you.", { italic: true }),
    sp(),
    body("Shiven Pillay", { bold: true }),
    body("Founder, Vula Solutions", { color: GRAY }),
    sp(),

    h1("About Vula Solutions"),
    body(
      "Vula Solutions is a South African digital transformation consultancy built specifically for SMEs. " +
      "We believe that every ambitious South African business deserves access to the same quality of strategic " +
      "digital thinking that large corporations take for granted."
    ),
    body(
      "Everything we do is structured around the DARES™ Framework — our proprietary methodology that ensures " +
      "every engagement delivers measurable, practical, and lasting value."
    ),
    sp(),
    tbl(
      ["Phase", "What This Means for You"],
      [
        ["D — Discover", "We start by truly understanding your business — not just the surface, but the systems, processes, people, and ambitions that drive it"],
        ["A — Assess", "We benchmark your digital maturity, identify gaps, and quantify the opportunities hiding in your current operation"],
        ["R — Recommend", "You receive a prioritised, practical roadmap — not a wishlist, but a plan you can actually execute given your budget and capacity"],
        ["E — Execute", "If you choose to proceed, Vula can implement the recommendations through our delivery products"],
        ["S — Support", "For ongoing clients, we provide fractional strategic support to keep you on track and growing"],
      ],
      [1600, 7472]
    ),
    sp(),

    h1("Preparing for Your Session"),
    body("To get the most from your Compass session, we recommend you:"),
    sp(),
    h2("Before the Session"),
    bullet("Think about: What are the top 3 digital problems costing you time or money right now?"),
    bullet("If possible, note your current monthly spend on: website, advertising, software tools, admin staff"),
    bullet("Have access to your website admin panel (if applicable) — we may look at it together"),
    bullet("Think about: Who are your top 3 competitors? What do they do digitally that you don't?"),
    bullet("Write down your revenue goal for the next 12 months"),
    sp(),
    h2("If You Are Bringing a Team (Professional / Strategic Tiers)"),
    bullet("Brief your team in advance — let them know this is an open, honest conversation"),
    bullet("Encourage them to flag the digital pain points they experience day-to-day"),
    bullet("If there are tensions around digital topics in the team, name them — we address them constructively"),
    sp(),

    h1("What to Expect on the Day"),
    tbl(
      ["Time", "What Happens"],
      [
        ["Opening (15 min)", "Introductions, agenda walk-through, and context-setting"],
        ["Discovery (Varies)", "Deep-dive into your business — context, history, current state, team, and systems"],
        ["Assessment (Varies)", "Digital audit — we review your online presence, tools, and processes together"],
        ["Recommendations (Varies)", "We work through prioritised recommendations in real time"],
        ["Roadmap & Next Steps (15 min)", "Agree on the top priorities and confirm next steps after the session"],
      ],
      [1800, 7272]
    ),
    sp(),
    body("You will receive your written Compass Report within [2-3] business days of the session.", { bold: true }),
    sp(),

    h1("After Your Session"),
    bullet("You will receive a branded Compass Report with your full findings and recommendations"),
    bullet("The report is yours — share it with your team, your board, or your accountant"),
    bullet("Vula will follow up within 5 business days to discuss next steps"),
    bullet("There is no obligation to proceed further — the Compass report stands alone as a valuable document"),
    sp(),

    h1("Contact & Logistics"),
    kv("Consultant", "Shiven Pillay"),
    kv("Email", "[Insert Vula email]"),
    kv("Phone / WhatsApp", "[Insert phone]"),
    kv("Session location", "[In-person address  OR  Video call link will be sent separately]"),
    kv("Session date & time", "[Insert date and time]"),
    sp(),
    body("If anything changes or you have questions before the session, please don't hesitate to reach out.", { italic: true }),
    sp(),
    rule(),
    body("Vula Solutions — Digital Transformation for South African SMEs", { color: TEAL, bold: true }),
  ];

  return doc(children);
}

// ─── 7. Compass Report Template ───────────────────────────────────────────────
function buildCompassTemplate() {
  const children = [
    // Cover
    logo(),
    rule(),
    sp(24),
    new Paragraph({
      shading: { type: ShadingType.CLEAR, color: "auto", fill: NAVY },
      spacing: { before: 0, after: 0 },
      children: [new TextRun({ text: "  COMPASS REPORT", bold: true, color: WHITE, size: 48, font: FONT })],
    }),
    new Paragraph({
      shading: { type: ShadingType.CLEAR, color: "auto", fill: TEAL },
      spacing: { before: 0, after: 480 },
      children: [new TextRun({ text: "  [Session Tier: Essential / Professional / Strategic]", color: WHITE, size: 26, font: FONT })],
    }),
    sp(),
    kv("Prepared for", "[Client Company Name]"),
    kv("Primary contact", "[Name, Title]"),
    kv("Session date", "[Date]"),
    kv("Report date", "[Date]"),
    kv("Prepared by", "Shiven Pillay, Vula Solutions"),
    kv("Report reference", "COMP-[YYYY]-[NNN]"),
    sp(24),
    rule(),
    disclaimer("CONFIDENTIAL — This report has been prepared exclusively for the named client. Not for distribution."),
    pb(),

    // Executive Summary
    h1("Executive Summary"),
    body(
      "[Write 3-4 sentences summarising the key findings and top recommendations from this session. " +
      "This is the paragraph the client reads first and shares with others — make it crisp and impactful.]"
    ),
    sp(),
    h2("Digital Maturity Assessment"),
    tbl(
      ["Dimension", "Current Score (/10)", "Benchmark", "Priority"],
      [
        ["Digital Presence (web, social, SEO)", "[Score]", "7/10", "High / Medium / Low"],
        ["Process Automation", "[Score]", "6/10", "High / Medium / Low"],
        ["Data & Analytics", "[Score]", "5/10", "High / Medium / Low"],
        ["Customer Experience (digital)", "[Score]", "6/10", "High / Medium / Low"],
        ["Marketing & Lead Generation", "[Score]", "6/10", "High / Medium / Low"],
        ["Technology Stack", "[Score]", "6/10", "High / Medium / Low"],
        ["Overall Digital Maturity", "[Average]", "6/10", ""],
      ],
      [3000, 1800, 1600, 2672]
    ),
    sp(),
    h2("Top 3 Priority Recommendations"),
    bullet("1.  [Priority recommendation — most impactful, most urgent]"),
    bullet("2.  [Priority recommendation — significant impact, achievable]"),
    bullet("3.  [Priority recommendation — longer-term, strategic]"),
    sp(),
    pb(),

    // Section 1: Discovery
    h1("1.  Discovery — Business Context"),
    h2("Business Overview"),
    kv("Company", "[Company name]"),
    kv("Industry / Sector", "[Industry]"),
    kv("Years in operation", "[Years]"),
    kv("Annual revenue (approx.)", "[Revenue band]"),
    kv("Number of employees", "[Headcount]"),
    kv("Primary products / services", "[Description]"),
    kv("Geographic footprint", "[Local / National / Regional]"),
    sp(),
    h2("Current Digital Footprint"),
    kv("Website", "[URL or 'None']"),
    kv("Social media presence", "[Platforms active on]"),
    kv("Google Business Profile", "[Yes / No / Claimed but inactive]"),
    kv("E-commerce", "[Yes / No — platform if yes]"),
    kv("CRM / Sales tool", "[Name or 'None']"),
    kv("Key software tools in use", "[List]"),
    sp(),
    h2("Strategic Context"),
    body("[Notes from the discovery conversation — what is the client trying to achieve in the next 12-24 months? What is their biggest fear? What keeps them up at night?]"),
    sp(),
    pb(),

    // Section 2: Assessment
    h1("2.  Assessment — Findings"),
    h2("Strengths (What Is Working)"),
    bullet("[Strength 1]"),
    bullet("[Strength 2]"),
    bullet("[Strength 3]"),
    sp(),
    h2("Gaps & Opportunities (What Is Not Working)"),
    bullet("[Gap 1 — and the cost/impact of leaving it unaddressed]"),
    bullet("[Gap 2]"),
    bullet("[Gap 3]"),
    bullet("[Gap 4]"),
    sp(),
    h2("Key Risks Identified"),
    bullet("[Risk 1]"),
    bullet("[Risk 2]"),
    sp(),
    pb(),

    // Section 3: Recommendations
    h1("3.  Recommendations"),
    body("The following recommendations are prioritised by impact and effort. They are specific to your business context, resource constraints, and goals."),
    sp(),
    tbl(
      ["#", "Recommendation", "Expected Outcome", "Effort", "Priority"],
      [
        ["1", "[Recommendation]", "[Outcome]", "Low / Med / High", "Immediate"],
        ["2", "[Recommendation]", "[Outcome]", "Low / Med / High", "Short-term"],
        ["3", "[Recommendation]", "[Outcome]", "Low / Med / High", "Short-term"],
        ["4", "[Recommendation]", "[Outcome]", "Low / Med / High", "Medium-term"],
        ["5", "[Recommendation]", "[Outcome]", "Low / Med / High", "Medium-term"],
        ["6", "[Recommendation]", "[Outcome]", "Low / Med / High", "Long-term"],
      ],
      [400, 3200, 2600, 1200, 1672]
    ),
    sp(),
    pb(),

    // Section 4: Roadmap
    h1("4.  Digital Transformation Roadmap"),
    h2("Now (0–90 days) — Quick Wins"),
    bullet("[Initiative — specific, actionable]"),
    bullet("[Initiative]"),
    bullet("[Initiative]"),
    sp(),
    h2("Next (90 days–6 months) — Foundation Building"),
    bullet("[Initiative]"),
    bullet("[Initiative]"),
    bullet("[Initiative]"),
    sp(),
    h2("Later (6–12 months) — Growth & Scale"),
    bullet("[Initiative]"),
    bullet("[Initiative]"),
    sp(),
    h2("Future (12+ months) — Strategic Horizon"),
    bullet("[Initiative]"),
    bullet("[Initiative]"),
    sp(),
    pb(),

    // Section 5: Next Steps
    h1("5.  Agreed Next Steps"),
    tbl(
      ["Action", "Owner", "Due Date", "Notes"],
      [
        ["[Action item]", "[Vula / Client]", "[Date]", "[Any relevant notes]"],
        ["[Action item]", "[Owner]", "[Date]", ""],
        ["[Action item]", "[Owner]", "[Date]", ""],
        ["[Action item]", "[Owner]", "[Date]", ""],
        ["Vula to follow up on next steps", "Shiven Pillay", "[Date + 5 days]", ""],
      ],
      [3500, 1500, 1500, 2572]
    ),
    sp(),
    h2("Proposed Vula Engagement (if proceeding)"),
    bullet("[Describe which Vula product(s) are proposed as the next step based on this report's findings]"),
    bullet("[e.g. Launch™ to address digital presence gap — proposal to follow within 5 business days]"),
    sp(),
    body("This report was prepared based on information disclosed during the Compass session. Recommendations are based on the information available at the time of the session.", { italic: true, color: GRAY }),
    sp(),
    rule(),
    body("Vula Solutions (Pty) Ltd  —  Compass Report  —  Confidential", { color: GRAY }),
  ];

  return doc(children);
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log("\n  Generating Vula Solutions documents...\n");

  const documents = [
    ["Vula-Business-Plan-2026.docx", buildBusinessPlan],
    ["Vula-Client-Contract-NDA.docx", buildClientContract],
    ["Vula-Proposal-Template.docx", buildProposal],
    ["Vula-Scope-of-Work-Template.docx", buildSOW],
    ["Vula-Invoice-Template.docx", buildInvoice],
    ["Vula-Client-Welcome-Pack.docx", buildWelcomePack],
    ["Vula-Compass-Report-Template.docx", buildCompassTemplate],
  ];

  for (const [filename, builder] of documents) {
    const document = builder();
    const buffer = await Packer.toBuffer(document);
    const outPath = join(OUT, filename);
    writeFileSync(outPath, buffer);
    console.log(`  ✓  ${filename}`);
  }

  console.log(`\n  Done! Files saved to: generated-docs/\n`);
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
