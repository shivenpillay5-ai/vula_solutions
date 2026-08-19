import type { ReactNode } from "react";
import { useReveal } from "./Reveal";

export function Section({
  eyebrow,
  title,
  intro,
  children,
  className = "",
  align = "left",
  tone = "light",
}: {
  eyebrow?: string;
  title?: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  className?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
}) {
  const titleClass = tone === "dark" ? "text-white" : "text-foreground";
  const introClass = tone === "dark" ? "text-white/70" : "text-muted-foreground";
  const spacingClass = tone === "dark" ? "py-14 sm:py-20" : "py-10 sm:py-14";
  const reveal = useReveal();

  return (
    <section className={`${spacingClass} ${className}`}>
      <div ref={reveal.ref} className={`container-page ${reveal.className}`}>
        {(eyebrow || title || intro) && (
          <div className={`mb-12 max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
            {eyebrow && (
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-electric">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className={`text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl md:leading-[1.1] ${titleClass}`}>
                {title}
              </h2>
            )}
            {intro && <p className={`mt-5 text-lg ${introClass}`}>{intro}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
