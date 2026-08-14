import { useState, useEffect } from "react";
import { Lock } from "lucide-react";
import { Logo } from "./Logo";

const GATE_KEY = "vula_internal_v1";
const GATE_PASSWORD = "vula2026";

const TEAL = "#01A1B7";
const INK  = "#0F1923";
const RULE = "#DDE3E9";

export function InternalGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [attempt, setAttempt] = useState("");
  const [error, setError] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(GATE_KEY) === "1") setUnlocked(true);
    setReady(true);
  }, []);

  if (!ready) return null;
  if (unlocked) return <>{children}</>;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (attempt.trim() === GATE_PASSWORD) {
      sessionStorage.setItem(GATE_KEY, "1");
      setUnlocked(true);
    } else {
      setError(true);
      setAttempt("");
    }
  }

  return (
    <div
      style={{ background: "#E8ECF0" }}
      className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-12"
    >
      <div
        className="w-full max-w-[360px] overflow-hidden bg-white"
        style={{ boxShadow: "0 2px 8px rgba(15,25,35,.08),0 8px 28px rgba(15,25,35,.06)" }}
      >
        {/* Header */}
        <div style={{ background: INK }} className="relative px-8 pb-7 pt-7">
          <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: TEAL }} />
          <Logo variant="light" size="hero" showTagline={false} />
          <div className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: "rgba(255,255,255,.45)" }}>
            <Lock className="h-2.5 w-2.5" />
            Internal Access Only
          </div>
        </div>

        {/* Form */}
        <div className="px-8 py-7">
          <p className="mb-5 text-[13px] leading-relaxed" style={{ color: "#5A6A7A" }}>
            This area contains confidential Vula business materials. Enter the internal password to continue.
          </p>
          <form onSubmit={handleSubmit} noValidate>
            <label
              htmlFor="gate-password"
              className="mb-1.5 block text-[11.5px] font-semibold uppercase tracking-[0.10em]"
              style={{ color: "#5A6A7A" }}
            >
              Password
            </label>
            <input
              id="gate-password"
              type="password"
              value={attempt}
              onChange={e => { setAttempt(e.target.value); setError(false); }}
              className="w-full rounded border px-3 py-2.5 text-[13px] outline-none transition"
              style={{
                borderColor: error ? "#ef4444" : RULE,
                color: INK,
              }}
              onFocus={e => (e.target.style.borderColor = TEAL)}
              onBlur={e => (e.target.style.borderColor = error ? "#ef4444" : RULE)}
              autoFocus
              autoComplete="current-password"
              placeholder="Enter password"
            />
            {error && (
              <p className="mt-1.5 text-[11.5px] font-medium text-red-500">
                Incorrect password. Please try again.
              </p>
            )}
            <button
              type="submit"
              className="mt-4 w-full rounded px-4 py-2.5 text-[13px] font-semibold text-white transition hover:opacity-90"
              style={{ background: TEAL }}
            >
              Unlock
            </button>
          </form>
        </div>

        {/* Footer */}
        <div style={{ background: INK }} className="px-8 py-3">
          <p className="text-[10.5px]" style={{ color: "rgba(255,255,255,.25)" }}>
            Not for distribution. Contact info@vulasolutions.co.za for access.
          </p>
        </div>
      </div>
    </div>
  );
}