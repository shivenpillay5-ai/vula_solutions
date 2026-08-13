import { createFileRoute, Link, Outlet, useMatches } from "@tanstack/react-router";
import { ClipboardList, Clock, Users, Lock, History } from "lucide-react";

export const Route = createFileRoute("/sessions")({
  head: () => ({ meta: [{ title: "Session Forms — Vula Solutions Internal" }] }),
  component: SessionsLayout,
});

const tiers = [
  {
    label: "Essential",
    to: "/sessions/essential",
    duration: "90-minute session",
    stakeholders: "1–2 stakeholders",
    price: "R5,000",
    color: "text-electric",
    sections: [
      "Session setup & client info",
      "Business context & overview",
      "Challenges & 12-month goals",
      "Digital presence audit",
      "Operations review",
      "Consultant findings & opportunity map",
      "Compass roadmap (0–30 / 30–90 / longer term)",
      "Agreed next steps",
    ],
  },
  {
    label: "Professional",
    to: "/sessions/professional",
    duration: "Half-day session",
    stakeholders: "Up to 5 stakeholders",
    price: "R15,000",
    color: "text-electric",
    sections: [
      "Everything in Essential",
      "Stakeholder register",
      "Business intelligence & growth",
      "Competitive landscape review",
      "AI & automation readiness audit",
      "2-week action plan",
    ],
  },
  {
    label: "Strategic",
    to: "/sessions/strategic",
    duration: "Full day or multi-day",
    stakeholders: "Cross-functional team",
    price: "From R50,000",
    color: "text-electric",
    sections: [
      "Everything in Professional",
      "Organisation map (departments)",
      "Strategic context & 3–5 year vision",
      "Risk register",
      "Full transformation roadmap (Now / Next / Later / Future)",
      "90-day blueprint",
      "Governance & implementation framework",
    ],
  },
];

function SessionsLayout() {
  const matches = useMatches();
  const isChild = matches.some(
    (m) => m.routeId !== "/sessions" && m.routeId.startsWith("/sessions/")
  );
  if (isChild) return <Outlet />;

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-10">
        <div className="mb-3 flex items-center gap-2">
          <Lock className="h-3.5 w-3.5 text-electric" />
          <span className="text-xs font-semibold uppercase tracking-widest text-electric">
            Internal use only
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Compass™ Session Forms</h1>
        <p className="mt-3 text-muted-foreground">
          Fill these in during your client meeting. Each form auto-saves to your browser and generates a
          formatted Compass Report Word document when you're ready.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {tiers.map((t) => (
          <div key={t.label} className="card-premium flex flex-col overflow-hidden">
            <div className="p-7">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                Compass™
              </p>
              <h2 className="text-2xl font-bold">{t.label}</h2>
              <div className="mt-3 space-y-1.5">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-3.5 w-3.5 shrink-0" />
                  {t.duration}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-3.5 w-3.5 shrink-0" />
                  {t.stakeholders}
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <ClipboardList className="h-3.5 w-3.5 shrink-0" />
                  {t.price}
                </div>
              </div>
              <ul className="mt-5 space-y-2">
                {t.sections.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-electric" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-auto border-t border-border px-7 pb-7 pt-5">
              <Link
                to={t.to}
                className="inline-flex h-11 w-full items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground transition hover:opacity-90"
              >
                Open {t.label} Form
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          Not in public navigation. Bookmark:{" "}
          <span className="font-mono text-foreground">/sessions</span>
        </p>
        <Link
          to="/sessions/history"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition hover:text-electric"
        >
          <History className="h-3.5 w-3.5" />
          View session history
        </Link>
      </div>
    </div>
  );
}
