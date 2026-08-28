import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Vula Solutions" },
      { name: "description", content: "How Vula Solutions collects, uses and protects your personal information in accordance with POPIA." },
      { property: "og:title", content: "Privacy Policy — Vula Solutions" },
      { property: "og:url", content: "https://vulasolutions.co.za/privacy" },
    ],
    links: [{ rel: "canonical", href: "https://vulasolutions.co.za/privacy" }],
  }),
  component: Privacy,
});

const CONTACT_EMAIL = "info@vulasolutions.co.za";
const EFFECTIVE_DATE = "1 August 2025";

function Privacy() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        intro={`Effective date: ${EFFECTIVE_DATE}. This policy explains how Vula Solutions collects, uses, stores and protects your personal information.`}
      />
      <Section>
        <div className="mx-auto max-w-3xl space-y-10 text-sm leading-7">

          <PolicySection title="1. Who we are">
            <p>
              Vula Solutions is the responsible party for personal information collected through this website and
              in the course of providing our services. We are a South African business subject to the Protection
              of Personal Information Act, 2013 (POPIA).
            </p>
            <p className="mt-3">
              For any privacy-related enquiries, contact us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-electric hover:underline">{CONTACT_EMAIL}</a>.
            </p>
          </PolicySection>

          <PolicySection title="2. What personal information we collect">
            <p>We collect only the information you provide directly to us. This includes:</p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-muted-foreground">
              <li>Your name and company name</li>
              <li>Your email address and phone number</li>
              <li>The message or enquiry you submit through our contact form</li>
              <li>Any service interest you indicate when completing our form</li>
            </ul>
            <p className="mt-3">
              We do not collect sensitive personal information as defined under POPIA, and we do not knowingly
              collect information from children under the age of 18.
            </p>
          </PolicySection>

          <PolicySection title="3. Why we collect it (purpose)">
            <p>Your personal information is collected and used for the following purposes:</p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-muted-foreground">
              <li>To respond to your enquiry or service request</li>
              <li>To communicate with you about a Compass™ session or engagement</li>
              <li>To send you information relevant to the service you have indicated interest in</li>
              <li>To comply with any legal obligations that may apply</li>
            </ul>
            <p className="mt-3">
              We will not use your information for any purpose incompatible with the above without first seeking
              your consent.
            </p>
          </PolicySection>

          <PolicySection title="4. Legal basis for processing">
            <p>
              We process your personal information on the basis of your consent (given when you submit a form on
              this website) and our legitimate interest in responding to business enquiries. Where we rely on
              legitimate interest, we have balanced that interest against your right to privacy and are satisfied
              that processing is proportionate and necessary.
            </p>
          </PolicySection>

          <PolicySection title="5. How long we keep your information">
            <p>
              We retain your contact details and the content of your enquiry for as long as is reasonably
              necessary to respond to and follow up on that enquiry, and for up to 24 months thereafter in case
              you re-engage with us.
            </p>
            <p className="mt-3">
              Where an enquiry leads to a client engagement, we retain relevant information for the duration of
              the engagement and for five years thereafter, consistent with standard business record-keeping
              obligations under South African law.
            </p>
            <p className="mt-3">You may request earlier deletion at any time. See section 8 below.</p>
          </PolicySection>

          <PolicySection title="6. Who we share your information with">
            <p>
              We do not sell, rent or trade your personal information. We may share it with the following
              categories of service providers who assist us in operating our business:
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-muted-foreground">
              <li>
                <strong className="font-semibold text-foreground">Form processing services</strong> — the platform
                we use to receive and manage enquiries submitted through this website
              </li>
              <li>
                <strong className="font-semibold text-foreground">Website hosting providers</strong> — the
                infrastructure on which this website is hosted
              </li>
              <li>
                <strong className="font-semibold text-foreground">Email service providers</strong> — used to send
                and receive correspondence with you
              </li>
            </ul>
            <p className="mt-3">
              All third-party processors are contractually required to handle your information securely and only
              for the purposes we specify.
            </p>
            <p className="mt-3">
              Some providers may process your information outside South Africa. Where this occurs, we satisfy
              ourselves that the recipient offers an adequate level of protection consistent with POPIA.
            </p>
          </PolicySection>

          <PolicySection title="7. How we protect your information">
            <p>
              We take reasonable technical and organisational measures to protect your personal information against
              loss, unauthorised access, disclosure or misuse. These include secure communications (HTTPS), access
              controls and working only with reputable third-party services.
            </p>
            <p className="mt-3">
              No method of transmission over the internet is completely secure. If you have reason to believe your
              information has been compromised, please contact us immediately at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-electric hover:underline">{CONTACT_EMAIL}</a>.
            </p>
          </PolicySection>

          <PolicySection title="8. Your rights as a data subject">
            <p>Under POPIA, you have the right to:</p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-muted-foreground">
              <li>
                <strong className="font-semibold text-foreground">Access</strong> — request confirmation of
                whether we hold personal information about you, and to receive a copy
              </li>
              <li>
                <strong className="font-semibold text-foreground">Correction</strong> — request that inaccurate
                or incomplete information be corrected
              </li>
              <li>
                <strong className="font-semibold text-foreground">Deletion</strong> — request that your personal
                information be deleted, subject to any legal retention obligations
              </li>
              <li>
                <strong className="font-semibold text-foreground">Objection</strong> — object to the processing
                of your personal information on grounds relating to your particular situation
              </li>
              <li>
                <strong className="font-semibold text-foreground">Withdrawal of consent</strong> — where
                processing is based on consent, withdraw that consent at any time without affecting the
                lawfulness of prior processing
              </li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, email{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-electric hover:underline">{CONTACT_EMAIL}</a>{" "}
              with the subject line <em>Data Request</em>. We will respond within 30 days.
            </p>
          </PolicySection>

          <PolicySection title="9. Complaints">
            <p>
              If you are unhappy with how we have handled your personal information, you have the right to lodge a
              complaint with South Africa's Information Regulator:
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-muted-foreground">
              <li>
                Website:{" "}
                <a href="https://www.inforegulator.org.za" target="_blank" rel="noopener noreferrer" className="text-electric hover:underline">
                  www.inforegulator.org.za
                </a>
              </li>
              <li>
                Email:{" "}
                <a href="mailto:complaints4@inforegulator.org.za" className="text-electric hover:underline">
                  complaints4@inforegulator.org.za
                </a>
              </li>
              <li>Tel: 010 023 5200</li>
            </ul>
            <p className="mt-3">
              We would appreciate the opportunity to address your concern directly before you escalate to the
              Regulator.
            </p>
          </PolicySection>

          <PolicySection title="10. Cookies">
            <p>
              This website uses only the cookies necessary for the site to function correctly. We do not use
              tracking, advertising or analytics cookies. No third-party cookies are set by this site. For more
              detail, see our{" "}
              <a href="/cookies" className="text-electric hover:underline">Cookie Notice</a>.
            </p>
          </PolicySection>

          <PolicySection title="11. Changes to this policy">
            <p>
              We may update this policy from time to time to reflect changes in our practices or legal
              requirements. The effective date at the top of this page will be updated accordingly. Continued use
              of this website after a change constitutes acceptance of the updated policy.
            </p>
          </PolicySection>

          <p className="border-t border-border pt-6 text-xs text-muted-foreground">
            Last updated: {EFFECTIVE_DATE}. Questions?{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-electric hover:underline">{CONTACT_EMAIL}</a>.
          </p>

        </div>
      </Section>
    </>
  );
}

function PolicySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-4 text-base font-semibold tracking-tight text-foreground">{title}</h2>
      <div className="text-muted-foreground">{children}</div>
    </section>
  );
}