import { Pencil, Trash2 } from "lucide-react";

interface EntryCardProps {
  title: string;
  subtitle: string;
  meta?: string;
  description?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function EntryCard({ title, subtitle, meta, description, onEdit, onDelete }: EntryCardProps) {
  return (
    <div className="flex flex-col gap-3 bg-bg rounded-[var(--radius-lg)] border border-border-subtle p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <p className="font-body text-[15px] font-semibold text-text-primary">{title}</p>
          <p className="font-body text-[13px] text-text-secondary">{subtitle}</p>
          {meta && <p className="font-body text-[12px] text-text-tertiary">{meta}</p>}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {onEdit && (
            <button
              onClick={onEdit}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-sm)] bg-accent-light text-accent text-[12px] font-medium font-body hover:bg-indigo-100 transition-colors cursor-pointer"
            >
              <Pencil size={13} />
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-sm)] bg-error-bg text-error text-[12px] font-medium font-body hover:bg-red-100 transition-colors cursor-pointer"
            >
              <Trash2 size={13} />
              Delete
            </button>
          )}
        </div>
      </div>
      {description && (
        <p className="font-body text-[13px] text-text-secondary leading-relaxed">{description}</p>
      )}
    </div>
  );
}
