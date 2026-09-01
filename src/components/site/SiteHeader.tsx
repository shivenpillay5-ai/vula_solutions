import { Link } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { Menu, X, Sun, Moon, ChevronDown, LayoutGrid, BookOpen } from "lucide-react";
import { Logo } from "./Logo";
import { analytics } from "@/lib/analytics";

type NavItem = { to: string; label: string };

const NAV_BEFORE: NavItem[] = [
  { to: "/compass", label: "Compass™" },
  { to: "/solutions", label: "Solutions" },
  { to: "/pricing", label: "Pricing" },
  { to: "/industries", label: "Industries" },
];

const NAV_AFTER: NavItem[] = [
  { to: "/case-studies", label: "Case Studies" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

function ThemeToggle() {
  function toggle() {
    const isDark = document.documentElement.classList.toggle("dark");
    try { localStorage.setItem("vula-theme", isDark ? "dark" : "light"); } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:border-electric/40 hover:text-electric"
    >
      <Sun className="hidden h-4 w-4 dark:block" />
      <Moon className="block h-4 w-4 dark:hidden" />
    </button>
  );
}

function ResourcesDropdown() {
  const [open, setOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  function enter() {
    clearTimeout(timerRef.current);
    setOpen(true);
  }
  function leave() {
    timerRef.current = setTimeout(() => setOpen(false), 150);
  }

  return (
    <div className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        className={`flex items-center gap-1 text-sm font-medium transition-colors ${open ? "text-electric" : "text-muted-foreground hover:text-electric"}`}
      >
        Resources
        <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute left-1/2 top-[calc(100%+12px)] z-50 w-68 -translate-x-1/2 overflow-hidden rounded-2xl border border-border bg-background shadow-xl">
          {/* triangle pointer */}
          <div className="absolute -top-[5px] left-1/2 -translate-x-1/2">
            <div className="h-0 w-0 border-x-[6px] border-b-[6px] border-x-transparent border-b-border" />
            <div className="absolute top-[1px] left-1/2 -translate-x-1/2 h-0 w-0 border-x-[5px] border-b-[5px] border-x-transparent border-b-background" />
          </div>

          <div className="p-1.5">
            <Link
              to="/resources"
              search={{ tab: "tools" } as never}
              onClick={() => setOpen(false)}
              className="flex items-start gap-3 rounded-xl px-3 py-3 transition hover:bg-accent"
            >
              <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-electric/10 text-electric">
                <LayoutGrid className="h-4 w-4" />
              </span>
              <div>
                <div className="text-sm font-semibold text-foreground">Free Tools</div>
                <div className="mt-0.5 text-xs leading-snug text-muted-foreground">Calculators, checklists and templates</div>
              </div>
            </Link>

            <Link
              to="/resources"
              search={{ tab: "articles" } as never}
              onClick={() => setOpen(false)}
              className="flex items-start gap-3 rounded-xl px-3 py-3 transition hover:bg-accent"
            >
              <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-electric/10 text-electric">
                <BookOpen className="h-4 w-4" />
              </span>
              <div>
                <div className="text-sm font-semibold text-foreground">Articles & Guides</div>
                <div className="mt-0.5 text-xs leading-snug text-muted-foreground">Practical reads across 7 business topics</div>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-md print:hidden">
      <div className="container-page flex h-16 items-center justify-between gap-6 lg:h-20">
        <Link to="/" className="flex items-center translate-y-px" aria-label="Vula Solutions home">
          <span className="lg:hidden">
            <Logo showTagline={false} size="sm" markTarget />
          </span>
          <span className="hidden lg:inline-flex">
            <Logo showTagline={false} size="hero" markTarget />
          </span>
        </Link>

        {/* Desktop nav — lg (1024px+) */}
        <nav aria-label="Primary" className="hidden items-center gap-5 text-sm font-medium lg:flex">
          {NAV_BEFORE.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-muted-foreground transition-colors hover:text-electric"
              activeProps={{ className: "text-electric" }}
            >
              {item.label}
            </Link>
          ))}
          <ResourcesDropdown />
          {NAV_AFTER.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-muted-foreground transition-colors hover:text-electric"
              activeProps={{ className: "text-electric" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            to="/contact"
            onClick={() => analytics.bookCompassClick("header")}
            className="inline-flex h-10 items-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-90"
          >
            Start with Compass™
          </Link>
          <ThemeToggle />
        </div>

        {/* Hamburger — below lg */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="inline-flex h-11 w-11 items-center justify-center rounded-md lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            {NAV_BEFORE.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-base font-medium text-foreground/90 transition hover:bg-accent hover:text-electric"
                activeProps={{ className: "bg-accent text-electric" }}
              >
                {item.label}
              </Link>
            ))}

            {/* Resources group */}
            <div className="px-2 pb-0.5 pt-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground/50">Resources</p>
            </div>
            <Link
              to="/resources"
              search={{ tab: "tools" } as never}
              onClick={() => setOpen(false)}
              className="rounded-md px-4 py-2.5 text-base font-medium text-foreground/80 transition hover:bg-accent hover:text-electric"
            >
              Free Tools
            </Link>
            <Link
              to="/resources"
              search={{ tab: "articles" } as never}
              onClick={() => setOpen(false)}
              className="rounded-md px-4 py-2.5 text-base font-medium text-foreground/80 transition hover:bg-accent hover:text-electric"
            >
              Articles & Guides
            </Link>

            {NAV_AFTER.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-base font-medium text-foreground/90 transition hover:bg-accent hover:text-electric"
                activeProps={{ className: "bg-accent text-electric" }}
              >
                {item.label}
              </Link>
            ))}

            <Link
              to="/contact"
              onClick={() => { setOpen(false); analytics.bookCompassClick("header_mobile"); }}
              className="mt-2 inline-flex h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground"
            >
              Book a Compass session
            </Link>
            <div className="pt-1">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
