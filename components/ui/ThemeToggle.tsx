"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className={`flex items-center gap-2.5 px-3.5 py-2.5 w-full rounded-[var(--radius-sm)] text-[14px] font-body font-medium text-text-secondary hover:bg-bg-surface transition-colors cursor-pointer ${className}`}
    >
      {theme === "dark" ? <Sun size={20} strokeWidth={2} /> : <Moon size={20} strokeWidth={2} />}
      {theme === "dark" ? "Light mode" : "Dark mode"}
    </button>
  );
}
