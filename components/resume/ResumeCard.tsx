import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";

interface ResumeCardProps {
  id: string;
  title: string;
  lastEdited: string;
  onDelete?: (id: string) => void;
}

export function ResumeCard({ id, title, lastEdited, onDelete }: ResumeCardProps) {
  return (
    <div className="flex flex-col gap-3 bg-bg rounded-[var(--radius-lg)] border border-border-subtle p-5">
      <p className="font-heading text-[16px] font-semibold text-text-primary">{title}</p>
      <p className="font-body text-[12px] text-text-tertiary">{lastEdited}</p>
      <div className="flex items-center gap-2">
        <Link
          href={`/resumes/${id}/edit`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-sm)] bg-accent-light text-accent text-[12px] font-medium font-body hover:bg-indigo-100 transition-colors"
        >
          <Pencil size={14} />
          Edit
        </Link>
        {onDelete && (
          <button
            onClick={() => onDelete(id)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-sm)] bg-error-bg text-error text-[12px] font-medium font-body hover:bg-red-100 transition-colors cursor-pointer"
          >
            <Trash2 size={14} />
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
