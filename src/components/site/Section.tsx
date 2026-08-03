import type { ReactNode } from "react";

export function Section({
  eyebrow,
  title,
  intro,
  children,
  className = "",
  align = "left",
}: {
  eyebrow?: string;
  title?: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <section className={`py-10 sm:py-14 ${className}`}>
      <div className="container-page">
        {(eyebrow || title || intro) && (
          <div className={`mb-12 max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
            {eyebrow && (
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-electric">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
                {title}
              </h2>
            )}
            {intro && <p className="mt-5 text-lg text-muted-foreground">{intro}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}