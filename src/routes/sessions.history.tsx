import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Download, FolderOpen, Trash2, Clock } from "lucide-react";
import { getHistory, deleteFromHistory } from "@/lib/session-history";
import type { SessionSnapshot } from "@/lib/session-history";
import { generateEssentialReport } from "@/lib/generate-report";
import { generateProfessionalReport } from "@/lib/generate-report";
import { generateStrategicReport } from "@/lib/generate-report";
import type { EssentialSession, ProfessionalSession, StrategicSession } from "@/lib/session-types";

export const Route = createFileRoute("/sessions/history")({
  component: SessionHistory,
});

const TIER_STORAGE_KEYS = {
  Essential: "vula-session-essential",
  Professional: "vula-session-professional",
  Strategic: "vula-session-strategic",
} as const;

const TIER_ROUTES = {
  Essential: "/sessions/essential",
  Professional: "/sessions/professional",
  Strategic: "/sessions/strategic",
} as const;

function fmtDate(d: string) {
  if (!d) return "—";
  return new Date(d + "T12:00:00").toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function downloadReport(snapshot: SessionSnapshot) {
  if (snapshot.tier === "Essential")
    void generateEssentialReport(snapshot.data as unknown as EssentialSession);
  else if (snapshot.tier === "Professional")
    void generateProfessionalReport(snapshot.data as unknown as ProfessionalSession);
  else
    void generateStrategicReport(snapshot.data as unknown as StrategicSession);
}

function SessionHistory() {
  const navigate = useNavigate();
  const [entries, setEntries] = useState<SessionSnapshot[]>(() => getHistory());

  function handleDelete(id: string) {
    if (!window.confirm("Remove this session from history? This cannot be undone.")) return;
    deleteFromHistory(id);
    setEntries(getHistory());
  }

  function handleLoad(snapshot: SessionSnapshot) {
    try {
      localStorage.setItem(TIER_STORAGE_KEYS[snapshot.tier], JSON.stringify(snapshot.data));
    } catch {
      // ignore
    }
    navigate({ to: TIER_ROUTES[snapshot.tier] });
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="border-b border-border bg-background px-6 py-6">
        <div className="mx-auto max-w-3xl">
          <Link
            to="/sessions"
            className="mb-4 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition"
          >
            <ArrowLeft className="h-3 w-3" /> Back to session forms
          </Link>
          <h1 className="text-xl font-bold">Session History</h1>
          <p className="mt-1 text-xs text-muted-foreground">
            A snapshot is saved each time you download a report.{" "}
            <span className="font-medium text-foreground">Load</span> reopens a past session in the form;{" "}
            <span className="font-medium text-foreground">Report</span> re-downloads the Word document.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 pt-8">
        {entries.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-24 text-center">
            <Clock className="h-8 w-8 text-muted-foreground/30" />
            <p className="text-sm text-muted-foreground">No sessions saved yet.</p>
            <p className="text-xs text-muted-foreground">
              Download a report from any session form and it will appear here.
            </p>
            <Link
              to="/sessions"
              className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-medium text-foreground transition hover:border-electric/40 hover:text-electric"
            >
              Open a session form
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="card-premium flex flex-col gap-4 p-5 sm:flex-row sm:items-center"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex rounded-full border border-electric/30 bg-electric/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-electric">
                      {entry.tier}
                    </span>
                    {!entry.company && !entry.clientName && (
                      <span className="text-xs italic text-muted-foreground">
                        No client details recorded
                      </span>
                    )}
                  </div>
                  {(entry.company || entry.clientName) && (
                    <p className="mt-1.5 truncate font-semibold leading-tight">
                      {entry.company || entry.clientName}
                    </p>
                  )}
                  {entry.company && entry.clientName && (
                    <p className="truncate text-xs text-muted-foreground">{entry.clientName}</p>
                  )}
                  <div className="mt-1.5 flex gap-4 text-xs text-muted-foreground">
                    {entry.sessionDate && (
                      <span>Session: {fmtDate(entry.sessionDate)}</span>
                    )}
                    <span>Saved: {fmtDate(entry.savedAt)}</span>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <button
                    onClick={() => handleLoad(entry)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-foreground transition hover:border-electric/40 hover:text-electric"
                    title="Load this session back into the form"
                  >
                    <FolderOpen className="h-3.5 w-3.5" />
                    Load
                  </button>
                  <button
                    onClick={() => downloadReport(entry)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition hover:opacity-90"
                    title="Download the Word report"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Report
                  </button>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition hover:text-destructive"
                    title="Remove from history"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}