import { createFileRoute } from "@tanstack/react-router";
import {
  ToolPage,
  ToolSection,
  ToolDivider,
  FieldGrid,
  DataTable,
  SectionIntro,
} from "@/components/site/ToolPage";

export const Route = createFileRoute("/documents/invoice-template")({
  head: () => ({ meta: [{ title: "Invoice Template — Vula Internal" }] }),
  component: InvoiceTemplate,
});

function InvoiceTemplate() {
  return (
    <ToolPage
      title="Invoice Template"
      tagline="SA-compliant tax invoice — use INV-YYYY-NNN reference numbering — 14 days net payment terms"
      type="Finance"
      about="SA-compliant tax invoice. Fill in Invoice Details, Bill To, and Services Rendered for each engagement. Use INV-YYYY-NNN reference numbering. Send as PDF — the client pays within 14 days net. Remember to include proof-of-payment instructions and your banking details."
      badge="Internal Template"
      footerVariant="internal"
      backTo="/documents"
      backLabel="Documents"
    >
      <ToolSection label="Invoice Details">
        <FieldGrid
          fields={[
            { label: "Invoice Number", value: "INV-[YYYY]-[NNN]" },
            { label: "Invoice Date", value: "" },
            { label: "Due Date (14 days from invoice date)", value: "" },
            { label: "Payment Terms", value: "14 days net" },
          ]}
        />
      </ToolSection>

      <ToolSection label="Bill From">
        <FieldGrid
          fields={[
            { label: "Company Name", value: "Vula Solutions (Pty) Ltd" },
            { label: "Registration No", value: "" },
            { label: "Address", value: "" },
            { label: "City, Province, Code", value: "" },
            { label: "Email", value: "" },
            { label: "Tel", value: "" },
          ]}
        />
      </ToolSection>

      <ToolSection label="Bill To">
        <FieldGrid
          fields={[
            { label: "Client Company Name", value: "" },
            { label: "Registration / VAT No", value: "" },
            { label: "Address Line 1", value: "" },
            { label: "City, Province, Code", value: "" },
            { label: "Client Email", value: "" },
            { label: "Attention (Contact Name)", value: "" },
          ]}
        />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="Services Rendered">
        <DataTable
          columns={[
            { label: "#", width: "6%" },
            { label: "Description", width: "50%" },
            { label: "Qty", width: "10%" },
            { label: "Unit Price", width: "17%" },
            { label: "Amount", width: "17%" },
          ]}
          rows={[
            ["1", "", "1", "", ""],
            ["2", "", "1", "", ""],
            ["3", "", "1", "", ""],
          ]}
        />
        <FieldGrid
          fields={[
            { label: "Subtotal", value: "" },
            { label: "VAT (15%) — if registered", value: "" },
            { label: "Total Due", value: "" },
            { label: "Less: Deposit Paid", value: "" },
            { label: "Balance Outstanding", value: "" },
          ]}
        />
      </ToolSection>

      <ToolDivider />

      <ToolSection label="Banking Details">
        <FieldGrid
          fields={[
            { label: "Bank", value: "" },
            { label: "Account Name", value: "Vula Solutions (Pty) Ltd" },
            { label: "Account Number", value: "" },
            { label: "Branch Code", value: "" },
            { label: "Account Type", value: "" },
            { label: "Payment Reference", value: "INV-[YYYY]-[NNN] / [Client surname]" },
          ]}
        />
        <SectionIntro>
          Please use the invoice number as your payment reference. If paying by EFT, please send proof of payment to the billing email. For queries, contact Shiven Pillay at the details below.
        </SectionIntro>
      </ToolSection>
    </ToolPage>
  );
}