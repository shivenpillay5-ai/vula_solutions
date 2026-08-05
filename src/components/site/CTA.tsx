import { Link } from "@tanstack/react-router";

export function CTA({
  title = "Ready to find your direction?",
  body = "Every successful journey starts with knowing where you are. Book a Compass™ session and leave with clarity.",
  primary = { to: "/contact", label: "Start with Compass" },
  secondary = { to: "/compass", label: "Discover Compass™" },
}: {
  title?: string;
  body?: string;
  primary?: { to: string; label: string };
  secondary?: { to: string; label: string };
}) {
  return (
    <section className="py-10 sm:py-14">
      <div className="container-page">
        <div className="gradient-hero relative overflow-hidden rounded-3xl px-8 py-16 text-center sm:px-16 sm:py-20">
          <h2 className="mx-auto max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base text-white/70 sm:text-lg">{body}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to={primary.to}
              className="inline-flex h-11 items-center rounded-full bg-electric px-6 text-sm font-semibold text-white transition hover:opacity-90"
            >
              {primary.label}
            </Link>
            <Link
              to={secondary.to}
              className="inline-flex h-11 items-center rounded-full bg-white px-6 text-sm font-medium text-navy-deep transition hover:bg-white/90"
            >
              {secondary.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
