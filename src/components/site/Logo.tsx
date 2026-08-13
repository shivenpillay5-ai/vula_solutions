const MARK_LEFT_PATH = "M160 90L0 0V416.667L160 500V90Z";
const MARK_RIGHT_PATH = "M260 90L420 0V416.667L260 500V90Z";

const sizeClasses = {
  sm: { mark: "h-9 w-auto", word: "text-[1.85rem]", gap: "gap-3" },
  md: { mark: "h-10 w-auto", word: "text-[2rem]", gap: "gap-3.5" },
  lg: { mark: "h-12 w-auto", word: "text-[2.35rem]", gap: "gap-4" },
  xl: { mark: "h-14 w-auto", word: "text-[2.75rem]", gap: "gap-4.5" },
  hero: { mark: "h-12 w-auto", word: "text-[1.48rem]", gap: "gap-3" },
} as const;

export function Logo({
  className,
  variant = "dark",
  showWordmark = true,
  showTagline = false,
  size = "md",
  markTarget = false,
}: {
  className?: string;
  variant?: "dark" | "light";
  showWordmark?: boolean;
  showTagline?: boolean;
  size?: keyof typeof sizeClasses;
  markTarget?: boolean;
}) {
  const sizing = sizeClasses[size];

  return (
    <span
      className={`inline-flex items-center ${sizing.gap} ${className ?? ""}`}
      aria-label="Vula Solutions"
    >
      <Mark className={sizing.mark} variant={variant} brandIntroTarget={markTarget} />
      {showWordmark && (
        <span className="flex flex-col leading-none">
          <span
            className={`${sizing.word} font-semibold tracking-[0.02em] ${
              variant === "dark"
                ? "text-[#0F172A] dark:text-[#F8FAFC]"
                : "text-[#F8FAFC]"
            }`}
            style={{ fontFamily: "var(--font-display)" }}
          >
            VULA
          </span>
          {showTagline && (
            <span
              className="mt-1 text-[0.62rem] font-medium uppercase tracking-[0.22em]"
              style={{ color: "#01A1B7", fontFamily: "var(--font-sans)" }}
            >
              Open the door to better business
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
  brandIntroTarget = false,
}: {
  className?: string;
  variant?: "dark" | "light";
  brandIntroTarget?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 420 500"
      className={className}
      aria-hidden="true"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      data-brand-intro-target={brandIntroTarget ? "true" : undefined}
    >
      {variant === "dark" ? (
        <path d={MARK_LEFT_PATH} className="fill-[#0F172A] dark:fill-[#F8FAFC]" />
      ) : (
        <path d={MARK_LEFT_PATH} fill="#F8FAFC" />
      )}
      <path d={MARK_RIGHT_PATH} fill="#01A1B7" />
    </svg>
  );
}