import { Plus, Trash2 } from "lucide-react";
import type { ActionItem } from "@/lib/session-types";

type Props = {
  value: ActionItem[];
  onChange: (rows: ActionItem[]) => void;
};

const empty = (): ActionItem => ({ action: "", owner: "", dueDate: "", priority: "" });
const priorities = ["High", "Medium", "Low"];

export function ActionPlanTable({ value, onChange }: Props) {
  function update(index: number, field: keyof ActionItem, val: string) {
    onChange(value.map((row, i) => (i === index ? { ...row, [field]: val } : row)));
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
        <p className="text-sm text-muted-foreground italic">No action items added yet.</p>
      )}
      {value.map((row, i) => (
        <div key={i} className="grid gap-2 rounded-lg border border-border bg-background p-3 sm:grid-cols-4">
          <textarea
            placeholder="Action to take"
            rows={2}
            value={row.action}
            onChange={(e) => update(i, "action", e.target.value)}
            className="resize-none rounded border border-border bg-transparent px-2 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-electric focus:outline-none"
          />
          <input
            placeholder="Owner"
            value={row.owner}
            onChange={(e) => update(i, "owner", e.target.value)}
            className="rounded border border-border bg-transparent px-2 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-electric focus:outline-none"
          />
          <input
            type="date"
            value={row.dueDate}
            onChange={(e) => update(i, "dueDate", e.target.value)}
            className="rounded border border-border bg-transparent px-2 py-1.5 text-sm text-foreground focus:border-electric focus:outline-none"
          />
          <div className="flex gap-2">
            <select
              value={row.priority}
              onChange={(e) => update(i, "priority", e.target.value)}
              className="flex-1 rounded border border-border bg-transparent px-2 py-1.5 text-sm text-foreground focus:border-electric focus:outline-none"
            >
              <option value="">Priority</option>
              {priorities.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
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
        <p className="text-xs text-muted-foreground">{value.length} items</p>
        <button
          type="button"
          onClick={add}
          className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground hover:border-electric/50 hover:text-electric transition"
        >
          <Plus className="h-3 w-3" /> Add action
        </button>
      </div>
      <div className="grid grid-cols-4 gap-2 px-3">
        {["Action", "Owner", "Due Date", "Priority"].map((h) => (
          <p key={h} className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            {h}
          </p>
        ))}
      </div>
    </div>
  );
}
