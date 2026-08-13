import { createFileRoute, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Vula Solutions" },
      { name: "description", content: "Book a Compass™ session or send us a short enquiry. We'll get back to you within one business day." },
      { property: "og:title", content: "Contact Vula Solutions" },
      { property: "og:url", content: "https://vulasolutions.co.za/contact" },
    ],
    links: [{ rel: "canonical", href: "https://vulasolutions.co.za/contact" }],
  }),
  component: Contact,
});

function Pill({ value, label, selected, onSelect }: { value: string; label: string; selected: string; onSelect: (v: string) => void }) {
  const active = selected === value;
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={() => onSelect(active ? "" : value)}
      className={`inline-flex items-center rounded-full border px-4 py-2.5 text-sm transition-all duration-150 hover:-translate-y-0.5 ${
        active
          ? "border-electric bg-electric/10 font-medium text-electric"
          : "border-border text-foreground/70 hover:border-electric/40 hover:text-electric"
      }`}
    >
      {label}
    </button>
  );
}

function Contact() {
  const location = useLocation();
  const service = new URLSearchParams(location.search).get("service") ?? "";
  const [sent, setSent] = useState(false);
  const [interest, setInterest] = useState(service);
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's talk about your business."
        intro="Book a Compass™ session or send us a short enquiry. We reply within one business day."
      />
      <Section>
        <div className="grid gap-10 md:grid-cols-[1fr_1.2fr]">

          {/* Left column */}
          <div className="space-y-6">

            {/* Compass card — primary action */}
            <div className="card-premium relative overflow-hidden border-electric/30 p-7">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] rounded-t-[inherit] bg-electric opacity-90" aria-hidden />
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-electric">Recommended starting point</p>
              <h2 className="mt-3 text-lg font-semibold">Book Compass™</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                A 90-minute discovery session with a senior Vula Solutions strategist. You leave with a written Compass Report and a clear picture of what your business should do next.
              </p>
              <a
                href="mailto:hello@shinola.co.za?subject=Compass%E2%84%A2%20booking"
                className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
              >
                Request a Compass™ slot
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            {/* Contact details — secondary */}
            <div className="space-y-4 px-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-electric" />
                <a href="mailto:hello@shinola.co.za" className="transition hover:text-foreground hover:underline">
                  hello@shinola.co.za
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-electric" />
                <span>By appointment</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 shrink-0 text-electric" />
                <span>South Africa · Remote-first</span>
              </div>
            </div>
          </div>

          {/* Right column — enquiry form */}
          <form
            className="card-premium space-y-5 p-7 sm:p-8"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            {sent ? (
              <div className="flex flex-col items-start gap-4 py-10">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-electric/10 text-electric">
                  <CheckCircle2 className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold">We have received your enquiry.</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    A member of the Vula Solutions team will reply within one business day. No pitch, no pressure. Just a straight conversation about your business.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Name" name="name" required />
                  <Field label="Company" name="company" />
                  <Field label="Email" name="email" type="email" required />
                  <Field label="Phone" name="phone" type="tel" />
                </div>

                <div>
                  <p className="text-sm font-medium">I am interested in</p>
                  <input type="hidden" name="interest" value={interest} />
                  <div className="mt-3 space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {[
                        { value: "compass-essential", label: "Compass™ Essential" },
                        { value: "compass-professional", label: "Compass™ Professional" },
                        { value: "compass-strategic", label: "Compass™ Strategic" },
                      ].map(({ value, label }) => (
                        <Pill key={value} value={value} label={label} selected={interest} onSelect={setInterest} />
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { value: "launch", label: "Launch™" },
                        { value: "flow", label: "Flow™" },
                        { value: "accelerate", label: "Accelerate™" },
                        { value: "growth", label: "Growth™" },
                        { value: "partner", label: "Partner™" },
                        { value: "unsure", label: "Not sure yet" },
                      ].map(({ value, label }) => (
                        <Pill key={value} value={value} label={label} selected={interest} onSelect={setInterest} />
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium">
                    Tell us a little about your business
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="A sentence or two about your business and what you are hoping to improve."
                    className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="submit"
                    className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:opacity-90 sm:w-auto sm:justify-start"
                  >
                    Send enquiry
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <p className="flex items-center gap-2 text-xs text-muted-foreground">
                    <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-electric" />
                    No pitch. No pressure. Just a straight answer.
                  </p>
                </div>
              </>
            )}
          </form>

        </div>
      </Section>
    </>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium">
        {label}{required && <span className="ml-0.5 text-electric">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-2 h-11 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}