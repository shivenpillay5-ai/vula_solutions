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
  className?: string;
}

const accentBg: Record<NonNullable<ProductCardProps["accent"]>, string> = {
  electric: "from-electric/15 to-electric/0",
  growth: "from-growth/15 to-growth/0",
  navy: "from-navy/15 to-navy/0",
};

export function ProductCard({ name, tagline, description, to, icon: Icon, accent = "electric", className = "" }: ProductCardProps) {
  return (
    <Link
      to={to}
      className={`card-premium group relative flex h-full flex-col overflow-hidden p-7 transition-transform duration-250 hover:-translate-y-[3px] hover:border-electric/25 hover:shadow-[0_32px_70px_-34px_rgba(15,23,42,0.36)] ${className}`}
    >
      <div className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br ${accentBg[accent]} blur-2xl`} aria-hidden />
      <div className="relative flex items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/8 bg-navy-deep text-white transition-all duration-250 group-hover:border-electric/30 group-hover:ring-1 group-hover:ring-electric/45">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <h3 className="text-lg font-semibold tracking-tight transition-colors duration-250 group-hover:text-electric">{name}</h3>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{tagline}</p>
        </div>
      </div>
      <p className="relative mt-5 text-sm leading-relaxed text-muted-foreground">{description}</p>
      <span className="relative mt-auto inline-flex items-center gap-1 pt-6 text-sm font-medium text-electric">
        Explore
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </Link>
  );
}
