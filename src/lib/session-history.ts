export type SessionTier = "Essential" | "Professional" | "Strategic";

export interface SessionSnapshot {
  id: string;
  tier: SessionTier;
  data: Record<string, unknown>;
  company?: string;
  clientName?: string;
  sessionDate?: string;
  savedAt: string;
}

const HISTORY_KEY = "vula-session-history";
const MAX_ENTRIES = 50;

export function saveToHistory(tier: SessionTier, data: Record<string, unknown>): void {
  try {
    const existing = getHistory();
    const snapshot: SessionSnapshot = {
      id: crypto.randomUUID(),
      tier,
      data,
      company: (data.company as string | undefined) || (data.companyName as string | undefined),
      clientName: (data.clientName as string | undefined) || (data.contactName as string | undefined),
      sessionDate: data.sessionDate as string | undefined,
      savedAt: new Date().toISOString().split("T")[0],
    };
    const updated = [snapshot, ...existing].slice(0, MAX_ENTRIES);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  } catch {
    // ignore storage errors
  }
}

export function getHistory(): SessionSnapshot[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as SessionSnapshot[];
  } catch {
    return [];
  }
}

export function deleteFromHistory(id: string): void {
  try {
    const updated = getHistory().filter((s) => s.id !== id);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  } catch {
    // ignore storage errors
  }
}
