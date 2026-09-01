import { Link } from "@tanstack/react-router";
import { Linkedin, Facebook } from "lucide-react";
import { Logo } from "./Logo";

const socials = [
  { href: "https://www.linkedin.com/company/vula-solutions/", label: "Vula Solutions on LinkedIn", Icon: Linkedin },
  { href: "https://www.facebook.com/vulasolutions", label: "Vula Solutions on Facebook", Icon: Facebook },
] as const;

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
      { to: "/pricing", label: "Pricing" },
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
    <footer className="border-t border-border bg-secondary/40 print:hidden">
      <div className="container-page grid gap-8 py-14 sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link to="/" aria-label="Vula Solutions home">
            <Logo className="mb-5" size="lg" />
          </Link>
          <p className="max-w-sm text-sm text-muted-foreground">
            Technology without complexity. Results without compromise.
          </p>
          <Link
            to="/compass"
            className="mt-6 inline-flex h-11 items-center rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            Start with Compass™
          </Link>
          <div className="mt-6 flex items-center gap-3">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:border-electric/40 hover:text-electric"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{c.title}</p>
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
        <div className="container-page flex flex-col items-start justify-between gap-2 pt-6 pb-16 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Vula Solutions. All rights reserved.</p>
          <p>Helping businesses work smarter.</p>
        </div>
      </div>
    </footer>
  );
}
