import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { ComponentType } from "react";

export interface ProductCardProps {
  name: string;
  tagline: string;
  description: string;
  to: string;
  icon: ComponentType<{ className?: string }>;
  accent?: "electric" | "growth" | "navy";
}

const accentBg: Record<NonNullable<ProductCardProps["accent"]>, string> = {
  electric: "from-electric/15 to-electric/0",
  growth: "from-growth/15 to-growth/0",
  navy: "from-navy/15 to-navy/0",
};

export function ProductCard({ name, tagline, description, to, icon: Icon, accent = "electric" }: ProductCardProps) {
  return (
    <Link
      to={to}
      className="card-premium card-premium-hover group relative flex flex-col overflow-hidden p-7"
    >
      <div className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br ${accentBg[accent]} blur-2xl`} aria-hidden />
      <div className="relative flex items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-foreground">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <h3 className="text-lg font-semibold tracking-tight">{name}</h3>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{tagline}</p>
        </div>
      </div>
      <p className="relative mt-5 text-sm leading-relaxed text-muted-foreground">{description}</p>
      <span className="relative mt-6 inline-flex items-center gap-1 text-sm font-medium text-foreground">
        Explore
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </Link>
  );
}