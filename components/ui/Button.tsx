import { LucideIcon } from "lucide-react";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  icon?: LucideIcon;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  icon: Icon,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center gap-2 px-5 py-2.5 rounded-[var(--radius-md)] text-[15px] font-semibold transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-accent text-white hover:bg-indigo-600 active:bg-indigo-700",
    outline:
      "bg-bg text-text-primary border border-border-default hover:bg-bg-surface active:bg-gray-100",
    ghost: "text-text-secondary hover:bg-bg-surface active:bg-gray-100",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {Icon && <Icon size={16} strokeWidth={2.5} />}
      {children}
    </button>
  );
}
