import type { ReactNode, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from "react";

type FormSectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function FormSection({ title, description, children }: FormSectionProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="mb-5 border-b border-border pb-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-electric">{title}</p>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      <div className="space-y-5">{children}</div>
    </div>
  );
}

export function Field({
  label,
  hint,
  ...props
}: { label: string; hint?: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
        {hint && <span className="ml-1.5 text-xs font-normal text-muted-foreground">— {hint}</span>}
      </label>
      <input
        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-electric focus:outline-none focus:ring-2 focus:ring-electric/20 transition"
        {...props}
      />
    </div>
  );
}

export function AreaField({
  label,
  hint,
  rows = 4,
  ...props
}: { label: string; hint?: string; rows?: number } & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
        {hint && <span className="ml-1.5 text-xs font-normal text-muted-foreground">— {hint}</span>}
      </label>
      <textarea
        rows={rows}
        className="w-full resize-y rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-electric focus:outline-none focus:ring-2 focus:ring-electric/20 transition"
        {...props}
      />
    </div>
  );
}

export function SelectField({
  label,
  hint,
  options,
  ...props
}: {
  label: string;
  hint?: string;
  options: { value: string; label: string }[];
} & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
        {hint && <span className="ml-1.5 text-xs font-normal text-muted-foreground">— {hint}</span>}
      </label>
      <select
        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-electric focus:outline-none focus:ring-2 focus:ring-electric/20 transition"
        {...props}
      >
        <option value="">— Select —</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function PillRadio({
  label,
  hint,
  options,
  value,
  onChange,
}: {
  label: string;
  hint?: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <p className="mb-1.5 text-sm font-medium text-foreground">
        {label}
        {hint && <span className="ml-1.5 text-xs font-normal text-muted-foreground">— {hint}</span>}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`rounded-full border px-3.5 py-1 text-xs font-medium transition ${
              value === opt
                ? "border-electric bg-electric/10 text-electric"
                : "border-border text-muted-foreground hover:border-electric/40 hover:text-foreground"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export function PillCheckbox({
  label,
  hint,
  options,
  value,
  onChange,
}: {
  label: string;
  hint?: string;
  options: string[];
  value: string[];
  onChange: (v: string[]) => void;
}) {
  function toggle(opt: string) {
    onChange(
      value.includes(opt) ? value.filter((v) => v !== opt) : [...value, opt]
    );
  }
  return (
    <div>
      <p className="mb-1.5 text-sm font-medium text-foreground">
        {label}
        {hint && <span className="ml-1.5 text-xs font-normal text-muted-foreground">— {hint}</span>}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            className={`rounded-full border px-3.5 py-1 text-xs font-medium transition ${
              value.includes(opt)
                ? "border-electric bg-electric/10 text-electric"
                : "border-border text-muted-foreground hover:border-electric/40 hover:text-foreground"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export function TwoCol({ children }: { children: ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-2">{children}</div>;
}
