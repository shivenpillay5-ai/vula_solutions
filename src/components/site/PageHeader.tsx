import type { ReactNode } from "react";

export function PageHeader({ eyebrow, title, intro, children, breadcrumb }: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  breadcrumb?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70" aria-hidden>
        <div className="absolute -top-24 right-[-10%] h-[400px] w-[600px] rounded-full bg-electric/10 blur-3xl" />
        <div className="absolute -bottom-40 left-[-10%] h-[400px] w-[500px] rounded-full bg-growth/10 blur-3xl" />
      </div>
      <div className="container-page py-12 sm:py-16">
        {breadcrumb && <div className="mb-6">{breadcrumb}</div>}
        {eyebrow && (
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.14em] text-electric">
            {eyebrow}
          </p>
        )}
        <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl md:leading-[1.05]">
          {title}
        </h1>
        {intro && <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{intro}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}