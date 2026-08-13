import { createFileRoute } from "@tanstack/react-router";
import {
  ToolPage,
  ToolSection,
  ToolDivider,
  FieldGrid,
  TextQ,
  DataTable,
  Checklist,
  SectionIntro,
} from "@/components/site/ToolPage";

export const Route = createFileRoute("/documents/client-contract")({
  head: () => ({ meta: [{ title: "Client Agreement & NDA — Vula Internal" }] }),
  component: ClientContract,
});

function ClientContract() {
  return (
    <ToolPage
      title="Client Agreement & NDA"
      tagline="Services Agreement & Mutual Non-Disclosure — Version 1.0 — Republic of South Africa"
      type="Legal"
      about="Complete the party details and engagement specifics for each client engagement. The legal clauses below reflect the standard agreement terms — read them carefully and note any non-standard arrangements in the relevant sections. Use the Word template (available from the Documents hub) to generate the final document for wet or e-signature. This is an internal working copy only."
      howTo={[
        "Complete the Service Provider and Client party sections",
        "Reference the applicable SOW / Proposal number in Section 1",
        "Enter all fee line items in the Fee Schedule",
        "Record signature dates and confirmations in the Signature Tracker",
      ]}
      badge="Internal Template"
      footerVariant="internal"
      backTo="/documents"
      backLabel="Documents"
    >
      <ToolSection label="Parties — Service Provider">
        <SectionIntro>
          Vula Solutions (Pty) Ltd ('Vula') — details pre-populated where known. Insert registration number and registered address before issuing.
        </SectionIntro>
        <FieldGrid
          fields={[
            { label: "Entity Name", value: "Vula Solutions (Pty) Ltd" },
            { label: "Registration No", value: "" },
            { label: "Registered Address", value: "" },
            { label: "Email", value: "" },
            { label: "Signatory Name", value: "Shiven Pillay" },
            { label: "Signatory Title", value: "" },
          ]}
        />
      </ToolSection>

      <ToolSection label="Parties — Client">
        <SectionIntro>
          Complete all fields using the client's full legal details as they appear on official registration documents.
        </SectionIntro>
        <FieldGrid
          fields={[
            "Client Full Legal Name",
            "Client Registration No / ID No",
            "Client Registered Address",
            "Client Contact Email",
            "Client Signatory Name",
            "Client Signatory Title",
          ]}
        />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="1. Scope of Services">
        <SectionIntro>
          Vula will provide the services described in the applicable Proposal or Statement of Work ('SOW'), which shall be incorporated into and form part of this Agreement upon signature by both Parties. Any changes to scope must be agreed in writing via a Change Request. Vula reserves the right to engage approved sub-contractors for delivery — overall accountability remains with Vula.
        </SectionIntro>
        <FieldGrid
          fields={[
            "SOW / Proposal Reference No",
            "Brief Description of Services",
            "Estimated Start Date",
            "Estimated End Date (if applicable)",
          ]}
        />
        <TextQ label="Change Request notes (if applicable)" rows={2} />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="2. Fees & Payment">
        <SectionIntro>
          Fees are as set out in the applicable Proposal or SOW. A 50% deposit is payable upon signing; the remaining 50% is payable upon delivery of agreed deliverable(s) or at the agreed project milestone. Retainer fees (Partner tier) are payable monthly in advance. Invoices are due within 14 days of issue. Late payments attract interest at the prime lending rate + 2% per annum, calculated daily. Vula reserves the right to suspend services for accounts overdue by more than 7 days.
        </SectionIntro>
        <DataTable
          columns={[
            { label: "Service / Engagement", width: "40%" },
            { label: "Description", width: "35%" },
            { label: "Amount (excl. VAT)", width: "25%" },
          ]}
          rowCount={4}
        />
      </ToolSection>

      <ToolSection label="Payment Terms Confirmed">
        <Checklist
          items={[
            "50% deposit payable upon signing this Agreement or the applicable SOW",
            "Remaining 50% payable upon delivery of agreed deliverable(s) or at project milestone",
            "Retainer fees (Partner tier) payable monthly in advance",
            "Invoices due within 14 days of issue",
            "Late payments attract interest at prime lending rate + 2% per annum, calculated daily",
            "Services may be suspended for accounts overdue by more than 7 days",
          ]}
        />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="3. Confidentiality & Non-Disclosure">
        <SectionIntro>
          Each Party agrees to keep confidential all non-public information disclosed by the other Party, including business plans, financial data, client lists, pricing, strategies, and technical information. The Receiving Party shall use Confidential Information only for the purposes of this Agreement, shall not disclose it to any third party without prior written consent, and shall apply at minimum reasonable care in protecting it. Obligations do not apply to information that: (a) is or becomes publicly known; (b) was already known before disclosure; or (c) is required to be disclosed by law or court order. This confidentiality obligation survives termination for three (3) years.
        </SectionIntro>
        <TextQ label="Any specific confidentiality carve-outs or additions for this client" rows={2} />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="4. Intellectual Property">
        <SectionIntro>
          Deliverables: Upon full payment, the Client owns all custom deliverables created specifically for the Client (reports, designs, written content). Vula IP: The DARES™ Framework, methodology, tools, templates, and software systems remain the sole property of Vula Solutions at all times. Pre-existing IP: Each Party retains ownership of all IP owned prior to this Agreement. The Client grants Vula the right to reference the engagement in marketing materials (client name, sector, anonymised outcomes) unless the Client requests otherwise in writing.
        </SectionIntro>
        <TextQ label="Non-standard IP arrangements for this engagement (e.g. client requests full IP on all custom code, or opts out of marketing reference)" rows={2} />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="5. Warranties & Limitation of Liability">
        <SectionIntro>
          Vula warrants that services will be performed with reasonable care and skill. Vula does not warrant specific business outcomes — results depend on market conditions, client implementation, and third-party platforms. Vula's total liability shall not exceed the total fees paid by the Client under this Agreement in the preceding 12 months. Neither Party shall be liable for indirect, consequential, or special damages.
        </SectionIntro>
      </ToolSection>

      <ToolDivider />

      <ToolSection label="6. Term & Termination">
        <SectionIntro>
          This Agreement commences on the date of signature and continues until terminated. Either Party may terminate with 30 days' written notice. Vula may terminate immediately if the Client fails to pay within 30 days of the due date. On termination: Client pays for all work completed to date; deliverables are released upon receipt of final payment.
        </SectionIntro>
        <FieldGrid
          fields={[
            "Agreement Commencement Date",
            "Notice Period",
          ]}
        />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="7. Dispute Resolution">
        <SectionIntro>
          Parties will attempt to resolve disputes through good-faith negotiation within 10 business days. Unresolved disputes will be referred to a mutually agreed mediator before any legal proceedings. This Agreement is governed by the laws of the Republic of South Africa. The Parties consent to the jurisdiction of the South Gauteng High Court (or the Magistrate's Court of appropriate jurisdiction).
        </SectionIntro>
      </ToolSection>

      <ToolDivider />

      <ToolSection label="8. General">
        <SectionIntro>
          Whole Agreement: This Agreement and any attached SOW/Proposal constitutes the entire agreement between the Parties. Amendment: No amendment is valid unless in writing and signed by both Parties. Cession: Neither Party may cede rights under this Agreement without the other's written consent.
        </SectionIntro>
      </ToolSection>

      <ToolDivider />

      <ToolSection label="Fee Schedule">
        <SectionIntro>
          Complete the fee schedule below to match the applicable Proposal or SOW. All amounts are exclusive of VAT.
        </SectionIntro>
        <DataTable
          columns={[
            { label: "Service / Engagement", width: "40%" },
            { label: "Description", width: "35%" },
            { label: "Amount (excl. VAT)", width: "25%" },
          ]}
          rowCount={5}
        />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="Signature Tracker">
        <SectionIntro>
          Record each milestone in the signing process. Both Parties must sign for the Agreement to be binding. File the fully executed copy securely.
        </SectionIntro>
        <DataTable
          columns={[
            { label: "Action", width: "45%" },
            { label: "Date", width: "25%" },
            { label: "Confirmed By", width: "30%" },
          ]}
          rows={[
            ["Sent to client for review", "", ""],
            ["Vula signed — Shiven Pillay", "", ""],
            ["Client signed", "", ""],
            ["Fully executed copy filed", "", ""],
          ]}
        />
      </ToolSection>
    </ToolPage>
  );
}
