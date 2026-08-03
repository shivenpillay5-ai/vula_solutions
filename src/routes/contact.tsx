import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Vula Solutions" },
      { name: "description", content: "Book a Compass™ session or send us a short enquiry. We'll get back to you within one business day." },
      { property: "og:title", content: "Contact Vula Solutions" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's talk about your business."
        intro="Book a Compass™ session or send us a short enquiry. We reply within one business day."
      />
      <Section>
        <div className="grid gap-10 md:grid-cols-[1fr_1.2fr]">
          <div className="space-y-6">
            <div className="card-premium p-7">
              <h2 className="text-lg font-semibold">Book Compass™</h2>
              <p className="mt-2 text-sm text-muted-foreground">A 90-minute discovery session with a senior Vula Solutions strategist. Delivered with a written Compass Report.</p>
              <a href="mailto:hello@shinola.co.za?subject=Compass%E2%84%A2%20booking" className="mt-5 inline-flex h-11 items-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground hover:opacity-90">
                Request a Compass™ slot
              </a>
            </div>
            <div className="card-premium space-y-4 p-7 text-sm">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-electric" />
                <a href="mailto:hello@shinola.co.za" className="hover:underline">hello@shinola.co.za</a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-electric" />
                <span>By appointment</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-electric" />
                <span>South Africa · Remote-first</span>
              </div>
            </div>
          </div>
          <form
            className="card-premium space-y-5 p-7"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            {sent ? (
              <div className="flex flex-col items-start gap-3 py-8">
                <CheckCircle2 className="h-6 w-6 text-growth" />
                <h3 className="text-lg font-semibold">Thanks — we'll be in touch shortly.</h3>
                <p className="text-sm text-muted-foreground">A member of the Vula Solutions team will reply within one business day.</p>
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
                  <label htmlFor="interest" className="block text-sm font-medium">I'm interested in</label>
                  <select id="interest" name="interest" className="mt-2 h-11 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                    <option>Compass™ — discovery & strategy</option>
                    <option>Launch™ — website or redesign</option>
                    <option>Flow™ — automation</option>
                    <option>Accelerate™ — AI adoption</option>
                    <option>Growth™ — SEO & visibility</option>
                    <option>Partner™ — ongoing support</option>
                    <option>Not sure yet</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium">Tell us a little about your business</label>
                  <textarea id="message" name="message" rows={5} className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
                <button type="submit" className="inline-flex h-11 items-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground hover:opacity-90">
                  Send enquiry
                </button>
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
        {label}{required && <span className="text-electric"> *</span>}
      </label>
      <input id={name} name={name} type={type} required={required} className="mt-2 h-11 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
    </div>
  );
}