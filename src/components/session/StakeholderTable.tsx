import { Plus, Trash2 } from "lucide-react";
import type { Stakeholder } from "@/lib/session-types";

type Props = {
  value: Stakeholder[];
  onChange: (rows: Stakeholder[]) => void;
  max?: number;
};

const empty = (): Stakeholder => ({ name: "", title: "", department: "", keyConcern: "" });

export function StakeholderTable({ value, onChange, max = 5 }: Props) {
  function update(index: number, field: keyof Stakeholder, val: string) {
    const next = value.map((row, i) => (i === index ? { ...row, [field]: val } : row));
    onChange(next);
  }
  function add() {
    onChange([...value, empty()]);
  }
  function remove(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-3">
      {value.length === 0 && (
        <p className="text-sm text-muted-foreground italic">No stakeholders added yet.</p>
      )}
      {value.map((row, i) => (
        <div key={i} className="grid gap-2 rounded-lg border border-border bg-background p-3 sm:grid-cols-4">
          <input
            placeholder="Full name"
            value={row.name}
            onChange={(e) => update(i, "name", e.target.value)}
            className="rounded border border-border bg-transparent px-2 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-electric focus:outline-none"
          />
          <input
            placeholder="Title / role"
            value={row.title}
            onChange={(e) => update(i, "title", e.target.value)}
            className="rounded border border-border bg-transparent px-2 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-electric focus:outline-none"
          />
          <input
            placeholder="Department"
            value={row.department}
            onChange={(e) => update(i, "department", e.target.value)}
            className="rounded border border-border bg-transparent px-2 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-electric focus:outline-none"
          />
          <div className="flex gap-2">
            <input
              placeholder="Key concern"
              value={row.keyConcern}
              onChange={(e) => update(i, "keyConcern", e.target.value)}
              className="flex-1 rounded border border-border bg-transparent px-2 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-electric focus:outline-none"
            />
            <button
              type="button"
              onClick={() => remove(i)}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded border border-border text-muted-foreground hover:border-red-400 hover:text-red-400 transition"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      ))}
      <div className="flex items-center gap-3">
        <p className="text-xs text-muted-foreground">
          {value.length}/{max} stakeholders
        </p>
        {value.length < max && (
          <button
            type="button"
            onClick={add}
            className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground hover:border-electric/50 hover:text-electric transition"
          >
            <Plus className="h-3 w-3" /> Add stakeholder
          </button>
        )}
      </div>
      <div className="grid grid-cols-4 gap-2 px-3">
        {["Name", "Title", "Department", "Key Concern"].map((h) => (
          <p key={h} className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            {h}
          </p>
        ))}
      </div>
    </div>
  );
}
