import { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  registration?: UseFormRegisterReturn;
  error?: string;
}

export function InputGroup({ label, registration, error, className = "", ...props }: InputGroupProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-[13px] font-medium text-text-primary font-body">
        {label}
      </label>
      <input
        className="h-[42px] w-full rounded-[var(--radius-sm)] border border-border-default bg-bg px-3.5 text-[14px] text-text-primary placeholder:text-text-tertiary font-body outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors"
        {...registration}
        {...props}
      />
      {error && (
        <p className="text-[12px] text-error">{error}</p>
      )}
    </div>
  );
}
