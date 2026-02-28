"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, LayoutDashboard, LayoutTemplate, Settings } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/" },
  { label: "My Resumes", icon: FileText, href: "/resumes" },
  { label: "Templates", icon: LayoutTemplate, href: "/templates" },
  { label: "Settings", icon: Settings, href: "/settings" },
];

export function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <aside className="hidden md:flex flex-col w-[260px] shrink-0 bg-bg border-r border-border-subtle h-full px-4 py-6 gap-2 justify-between">
      <div className="flex items-center gap-2.5 pb-6 px-0">
        <FileText size={28} className="text-accent" />
        <span className="font-heading text-[22px] font-bold text-text-primary">
          ResumeForge
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {navItems.map(({ label, icon: Icon, href }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-[var(--radius-sm)] text-[14px] font-body w-full transition-colors ${
                active
                  ? "bg-accent-light text-accent font-semibold"
                  : "text-text-secondary font-medium hover:bg-bg-surface"
              }`}
            >
              <Icon size={20} strokeWidth={active ? 2.5 : 2} />
              {label}
            </Link>
          );
        })}
      </div>

      <div className="border-t border-border-subtle pt-3">
        <ThemeToggle />
      </div>
    </aside>
  );
}
