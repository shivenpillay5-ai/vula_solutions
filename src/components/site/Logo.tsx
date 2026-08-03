export function Logo({
  className,
  variant = "dark",
  showWordmark = true,
  showTagline = true,
}: {
  className?: string;
  variant?: "dark" | "light";
  showWordmark?: boolean;
  showTagline?: boolean;
}) {
  const wordColor = variant === "light" ? "#F8FAFC" : "#0F172A";
  const subColor = variant === "light" ? "#2DD4BF" : "#14B8A6";
  return (
    <span
      className={`inline-flex items-center gap-2.5 ${className ?? ""}`}
      aria-label="Vula Solutions"
    >
      <Mark className="h-9 w-9" variant={variant} />
      {showWordmark && (
        <span
          className="flex flex-col leading-none"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <span
            className="text-[20px] font-semibold tracking-[0.02em]"
            style={{ color: wordColor }}
          >
            VULA
          </span>
          {showTagline && (
            <span
              className="mt-[3px] whitespace-nowrap text-[8px] font-medium uppercase"
              style={{ color: subColor, letterSpacing: "0.24em" }}
            >
              Business Transformation Partner
            </span>
          )}
        </span>
      )}
    </span>
  );
}

export function Mark({
  className,
  variant = "dark",
}: {
  className?: string;
  variant?: "dark" | "light";
}) {
  // Two parallelogram door panels leaning inward to form a V-shaped opening.
  // Left panel: Brand White on dark, Charcoal on light. Right panel: VULA Teal.
  const leftFill = variant === "light" ? "#F8FAFC" : "#0F1720";
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      role="img"
    >
      {/* Left door panel — parallelogram leaning inward */}
      <path d="M14 6 L26 6 L28 56 L16 56 Z" fill={leftFill} />
      {/* Right door panel — mirrored, VULA Teal */}
      <path d="M38 6 L50 6 L48 56 L36 56 Z" fill="#14B8A6" />
    </svg>
  );
}
