import { TextareaHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface TextareaGroupProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  registration?: UseFormRegisterReturn;
  error?: string;
}

export function TextareaGroup({ label, registration, error, className = "", ...props }: TextareaGroupProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-[13px] font-medium text-text-primary font-body">
        {label}
      </label>
      <textarea
        rows={4}
        className="w-full rounded-[var(--radius-sm)] border border-border-default bg-bg p-3.5 text-[14px] text-text-primary placeholder:text-text-tertiary font-body outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors resize-none"
        {...registration}
        {...props}
      />
      {error && (
        <p className="text-[12px] text-error">{error}</p>
      )}
    </div>
  );
}
