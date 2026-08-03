import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

const cols = [
  {
    title: "Solutions",
    links: [
      { to: "/compass", label: "Compass™" },
      { to: "/solutions/launch", label: "Launch™" },
      { to: "/solutions/flow", label: "Flow™" },
      { to: "/solutions/accelerate", label: "Accelerate™" },
      { to: "/solutions/growth", label: "Growth™" },
      { to: "/solutions/partner", label: "Partner™" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About" },
      { to: "/industries", label: "Industries" },
      { to: "/case-studies", label: "Case Studies" },
      { to: "/resources", label: "Resources" },
      { to: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { to: "/privacy", label: "Privacy Policy" },
      { to: "/terms", label: "Terms of Use" },
      { to: "/cookies", label: "Cookie Notice" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo className="mb-5" size="lg" />
          <p className="max-w-sm text-sm text-muted-foreground">
            Technology without complexity. Results without compromise.
          </p>
          <Link
            to="/compass"
            className="mt-6 inline-flex h-10 items-center rounded-full border border-border bg-background px-4 text-sm font-medium hover:border-foreground/30"
          >
            Start with Compass™
          </Link>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{c.title}</h4>
            <ul className="space-y-3 text-sm">
              {c.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-foreground/80 transition-colors hover:text-foreground">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="container-page flex flex-col items-start justify-between gap-2 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Vula Solutions. All rights reserved.</p>
          <p>Helping businesses work smarter.</p>
        </div>
      </div>
    </footer>
  );
}