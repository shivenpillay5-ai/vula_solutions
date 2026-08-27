import { useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Printer, ArrowLeft } from "lucide-react";
import { Logo } from "./Logo";

function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

const TEAL  = "#01A1B7";
const INK   = "#0F1923";
const RULE  = "#DDE3E9";
const LIFT  = "#F5F7F9";
const SLATE = "#5A6A7A";

// ── Wrapper ────────────────────────────────────────────────────────────────────

interface ToolPageProps {
  title: string;
  tagline: string;
  type: string;
  about: string;
  howTo?: string[];
  badge?: string;
  footerVariant?: "compass" | "internal";
  backTo?: string;
  backLabel?: string;
  children: React.ReactNode;
}

export function ToolPage({ title, tagline, type, about, howTo, badge = "Free Business Resource", footerVariant = "compass", backTo = "/resources", backLabel = "Resources", children }: ToolPageProps) {
  const { pathname } = useLocation();
  const pageUrl = `https://vulasolutions.co.za${pathname}`;
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://vulasolutions.co.za/" },
      { "@type": "ListItem", position: 2, name: "Resources", item: "https://vulasolutions.co.za/resources" },
      { "@type": "ListItem", position: 3, name: title, item: pageUrl },
    ],
  };

  return (
    <div style={{ background: "#E8ECF0", WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" } as React.CSSProperties} className="min-h-screen pb-12 print:bg-white print:pb-0">
      <JsonLd data={breadcrumb} />

      {/* Print bar — hidden in print output */}
      <div className="print:hidden sticky top-16 z-30 border-b border-[#DDE3E9] bg-[#F5F7F9]">
        <div className="mx-auto flex max-w-[800px] items-center justify-between gap-3 px-4 py-2.5">
          <div className="flex items-center gap-4">
            <Link
              to={backTo as "/resources"}
              className="inline-flex items-center gap-1 text-[11.5px] font-semibold transition hover:opacity-70"
              style={{ color: TEAL }}
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {backLabel}
            </Link>
            <span style={{ color: RULE }}>/</span>
            <span className="text-[11px] tracking-[0.04em]" style={{ color: SLATE }}>
              {title}
            </span>
          </div>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 rounded px-4 py-2 text-[12px] font-semibold tracking-[0.02em] text-white transition hover:opacity-90"
            style={{ background: TEAL }}
          >
            <Printer className="h-3.5 w-3.5" />
            Print / Save as PDF
          </button>
        </div>
      </div>

      {/* Document card */}
      <div
        className="mx-auto mt-7 max-w-[800px] bg-white print:mt-0 print:max-w-none"
        style={{ boxShadow: "0 2px 8px rgba(15,25,35,.08),0 8px 28px rgba(15,25,35,.06)" }}
      >

        {/* Header */}
        <header style={{ background: INK, WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" } as React.CSSProperties} className="relative px-11 pb-8 pt-9">
          <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: TEAL, WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" } as React.CSSProperties} />

          <div className="mb-5 flex items-start justify-between gap-4">
            <Logo variant="light" size="hero" showTagline={false} />
            <div className="shrink-0 text-right text-[10.5px] leading-relaxed" style={{ color: "rgba(255,255,255,.3)" }}>
              Version 1.0<br />Free Resource
            </div>
          </div>

          <div
            className="mb-3.5 inline-block rounded-sm border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em]"
            style={{ borderColor: "rgba(255,255,255,.2)", color: "rgba(255,255,255,.5)" }}
          >
            {badge}
          </div>

          <h1
            className="mb-2 text-[27px] font-semibold leading-[1.15] text-white"
            style={{ letterSpacing: "-0.022em" }}
          >
            {title}
          </h1>
          <p className="max-w-[480px] text-[13.5px]" style={{ color: "rgba(255,255,255,.54)" }}>
            {tagline}
          </p>
        </header>

        {/* Body */}
        <div className="px-11 pb-11 pt-9">

          {/* About */}
          <div
            className="border-l-[3px] p-4 text-[13px] leading-[1.72]"
            style={{ background: "#E6F6FA", borderColor: TEAL, color: INK, marginBottom: howTo ? 0 : 28 }}
          >
            {about}
          </div>

          {/* How to use */}
          {howTo && (
            <div
              className="flex flex-wrap gap-x-5 gap-y-1.5 border-b pb-6 pt-3"
              style={{ borderColor: RULE, marginBottom: 28 }}
            >
              {howTo.map(item => (
                <div key={item} className="flex items-center gap-1.5 text-[11.5px]" style={{ color: SLATE }}>
                  <span className="h-[5px] w-[5px] shrink-0 rounded-full" style={{ background: TEAL }} />
                  {item}
                </div>
              ))}
            </div>
          )}

          {children}
        </div>

        {/* Footer */}
        {footerVariant === "internal" ? (
          <footer
            style={{ background: INK, WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" } as React.CSSProperties}
            className="flex items-center justify-between gap-4 px-11 py-5"
          >
            <span className="text-[11px]" style={{ color: "rgba(255,255,255,.35)" }}>
              Vula Solutions (Pty) Ltd — Confidential — Internal use only
            </span>
            <span className="text-[11px]" style={{ color: TEAL }}>vula.co.za</span>
          </footer>
        ) : (
          <footer
            style={{ background: INK, WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" } as React.CSSProperties}
            className="flex flex-wrap items-center justify-between gap-7 px-11 py-8"
          >
            <div>
              <div className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: TEAL }}>
                Your next step
              </div>
              <div className="mb-1.5 text-[17px] font-semibold text-white" style={{ letterSpacing: "-0.01em" }}>
                Turn this into a plan — book Compass™
              </div>
              <p className="max-w-[400px] text-[12px] leading-relaxed" style={{ color: "rgba(255,255,255,.48)" }}>
                Completing this {type.toLowerCase()} is the beginning, not the end. Compass™ is Vula's structured
                business discovery session designed to help you prioritise improvements and build a practical roadmap.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex shrink-0 items-center gap-2 rounded px-5 py-2.5 text-[12px] font-bold tracking-[0.04em] text-white transition hover:opacity-90"
              style={{ background: TEAL }}
            >
              Book Compass™ →
            </Link>
          </footer>
        )}

      </div>
    </div>
  );
}

// ── Section ────────────────────────────────────────────────────────────────────

export function ToolSection({ label, children, className = "" }: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mb-7 print:break-inside-avoid ${className}`}>
      <div
        className="mb-3.5 border-l-2 pl-2 text-[12px] font-extrabold uppercase leading-none tracking-[0.14em]"
        style={{ borderColor: TEAL, color: TEAL }}
      >
        {label}
      </div>
      {children}
    </div>
  );
}

export function ToolDivider() {
  return <hr className="mb-7" style={{ border: "none", borderTop: `1px solid ${RULE}` }} />;
}

export function SectionIntro({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-[12px]" style={{ color: SLATE }}>{children}</p>;
}

// ── FieldGrid ─────────────────────────────────────────────────────────────────

export function FieldGrid({ fields }: { fields: Array<string | { label: string; value?: string }> }) {
  return (
    <div>
      {fields.map((field, i) => {
        const label = typeof field === "string" ? field : field.label;
        const dflt  = typeof field === "string" ? "" : (field.value ?? "");
        return (
          <div
            key={label}
            className="grid items-center gap-3 border-b py-[7px]"
            style={{
              gridTemplateColumns: "152px 1fr",
              borderColor: RULE,
              borderTop: i === 0 ? `1px solid ${RULE}` : undefined,
            }}
          >
            <span className="pr-3 text-[11.5px] font-semibold" style={{ color: SLATE }}>{label}</span>
            <input
              type="text"
              aria-label={label}
              defaultValue={dflt}
              className="w-full border-b border-transparent bg-transparent py-0.5 text-[13px] outline-none"
              style={{ color: INK }}
              onFocus={e => (e.target.style.borderColor = TEAL)}
              onBlur={e => (e.target.style.borderColor = "transparent")}
            />
          </div>
        );
      })}
    </div>
  );
}

// ── TextQ ─────────────────────────────────────────────────────────────────────

export function TextQ({ label, rows = 2, value }: { label: string; rows?: number; value?: string }) {
  return (
    <div className="mb-3.5">
      <div className="mb-1.5 text-[11.5px] font-semibold" style={{ color: SLATE }}>{label}</div>
      <textarea
        rows={rows}
        aria-label={label}
        defaultValue={value}
        className="w-full resize-y rounded border p-2.5 text-[13px] leading-relaxed outline-none"
        style={{ borderColor: RULE, background: LIFT, color: INK }}
        onFocus={e => { e.target.style.borderColor = TEAL; e.target.style.background = "#fff"; }}
        onBlur={e => { e.target.style.borderColor = RULE; e.target.style.background = LIFT; }}
      />
    </div>
  );
}

// ── Checklist ─────────────────────────────────────────────────────────────────

export function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="m-0 list-none p-0">
      {items.map((item, i) => (
        <li
          key={item}
          className="flex items-start gap-2.5 border-b py-[7px] text-[13px] print:break-inside-avoid"
          style={{ borderColor: RULE, borderTop: i === 0 ? `1px solid ${RULE}` : undefined }}
        >
          <input
            type="checkbox"
            aria-label={item}
            className="mt-[2px] h-[15px] w-[15px] shrink-0"
            style={{ accentColor: TEAL }}
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

// ── RatingTable ───────────────────────────────────────────────────────────────

export function RatingTable({
  rows,
  intro,
  lowLabel = "Strongly Disagree",
  highLabel = "Strongly Agree",
}: {
  rows: Array<{ label: string; id: string }>;
  intro?: string;
  lowLabel?: string;
  highLabel?: string;
}) {
  const [ratings, setRatings] = useState<Record<string, number>>({});

  return (
    <>
      {intro && <SectionIntro>{intro}</SectionIntro>}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse" style={{ minWidth: 460 }}>
          <thead>
            <tr>
              <th
                className="border-b-2 px-3.5 py-2.5 text-left text-[10px] font-bold uppercase tracking-[0.10em]"
                style={{ background: LIFT, borderColor: RULE, color: SLATE }}
              >
                Statement
              </th>
              {[1,2,3,4,5].map(n => (
                <th
                  key={n}
                  className="border-b-2 px-2 py-2.5 text-center text-[10px] font-bold uppercase tracking-[0.10em]"
                  style={{ background: LIFT, borderColor: RULE, color: SLATE }}
                >
                  {n}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={row.id}>
                <td
                  className="px-3.5 py-2 text-[13px]"
                  style={{ borderBottom: ri < rows.length - 1 ? `1px solid ${RULE}` : "none" }}
                >
                  {row.label}
                </td>
                {[1,2,3,4,5].map(n => (
                  <td
                    key={n}
                    className="px-2 py-2 text-center"
                    style={{ borderBottom: ri < rows.length - 1 ? `1px solid ${RULE}` : "none" }}
                  >
                    <button
                      type="button"
                      onClick={() => setRatings(prev => ({ ...prev, [row.id]: n }))}
                      className="inline-flex h-[27px] w-[27px] items-center justify-center rounded-full border text-[11px] font-semibold transition"
                      style={{
                        background: ratings[row.id] === n ? TEAL : "transparent",
                        borderColor: ratings[row.id] === n ? TEAL : RULE,
                        color: ratings[row.id] === n ? "#fff" : SLATE,
                      }}
                    >
                      {n}
                    </button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-1.5 flex justify-between text-[10.5px]" style={{ color: SLATE }}>
        <span>1 = {lowLabel}</span>
        <span>5 = {highLabel}</span>
      </div>
    </>
  );
}

// ── DataTable ─────────────────────────────────────────────────────────────────

export function DataTable({
  columns,
  rowCount = 5,
  rows,
}: {
  columns: Array<{ label: string; width?: string }>;
  rowCount?: number;
  rows?: string[][];
}) {
  const count = rows ? Math.max(rowCount, rows.length) : rowCount;
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse" style={{ minWidth: 400 }}>
        <thead>
          <tr>
            {columns.map(col => (
              <th
                key={col.label}
                className="border-b-2 px-3 py-2.5 text-left text-[10px] font-bold uppercase tracking-[0.10em]"
                style={{ background: LIFT, borderColor: RULE, color: SLATE, width: col.width }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: count }).map((_, i) => (
            <tr key={i} style={i % 2 === 1 ? { background: LIFT } : undefined}>
              {columns.map((col, j) => (
                <td
                  key={col.label}
                  className="px-3 py-1.5"
                  style={{ borderBottom: i < count - 1 ? `1px solid ${RULE}` : "none" }}
                >
                  <input
                    type="text"
                    aria-label={`${col.label} row ${i + 1}`}
                    defaultValue={rows?.[i]?.[j] ?? ""}
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
  );
}

// ── CommitmentBox ─────────────────────────────────────────────────────────────

export function CommitmentBox({ prompt }: { prompt: string }) {
  return (
    <div className="rounded border p-5" style={{ borderColor: RULE, background: LIFT }}>
      <div className="mb-1 text-[10px] font-extrabold uppercase tracking-[0.16em]" style={{ color: TEAL }}>
        My Commitment
      </div>
      <div className="mb-2.5 text-[12px]" style={{ color: SLATE }}>{prompt}</div>
      <input
        type="text"
        aria-label={prompt}
        className="w-full border-b-[1.5px] bg-transparent py-1.5 text-[14px] font-semibold outline-none"
        style={{ borderColor: RULE, color: INK }}
        onFocus={e => (e.target.style.borderColor = TEAL)}
        onBlur={e => (e.target.style.borderColor = RULE)}
      />
    </div>
  );
}