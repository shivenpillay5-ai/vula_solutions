export type SessionTier = "Essential" | "Professional" | "Strategic";

export type SessionSnapshot = {
  id: string;
  tier: SessionTier;
  savedAt: string;
  company: string;
  clientName: string;
  sessionDate: string;
  data: Record<string, unknown>;
};

const HISTORY_KEY = "vula-sessions-history";

export function saveToHistory(tier: SessionTier, data: Record<string, unknown>): void {
  try {
    const existing = getHistory();
    existing.unshift({
      id: String(Date.now()),
      tier,
      savedAt: new Date().toISOString().split("T")[0],
      company: String(data.company ?? ""),
      clientName: String(data.clientName ?? ""),
      sessionDate: String(data.sessionDate ?? ""),
      data,
    });
    localStorage.setItem(HISTORY_KEY, JSON.stringify(existing));
  } catch {
    // localStorage full or unavailable
  }
}

export function getHistory(): SessionSnapshot[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? (JSON.parse(raw) as SessionSnapshot[]) : [];
  } catch {
    return [];
  }
}

export function deleteFromHistory(id: string): void {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(getHistory().filter((e) => e.id !== id)));
  } catch {
    // ignore
  }
}