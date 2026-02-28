"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, LayoutDashboard, LayoutTemplate, Plus, Settings } from "lucide-react";

export function MobileTabBar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="md:hidden flex items-center justify-around bg-bg border-t border-border-subtle h-16 px-6 shrink-0">
      <Link href="/" className={`flex flex-col items-center gap-1 ${isActive("/") ? "text-accent" : "text-text-disabled"}`}>
        <LayoutDashboard size={22} strokeWidth={isActive("/") ? 2.5 : 2} />
        <span className="text-[11px] font-body font-medium">Home</span>
      </Link>
      <Link href="/resumes" className={`flex flex-col items-center gap-1 ${isActive("/resumes") ? "text-accent" : "text-text-disabled"}`}>
        <FileText size={22} strokeWidth={isActive("/resumes") ? 2.5 : 2} />
        <span className="text-[11px] font-body font-medium">Resumes</span>
      </Link>
      <Link href="/resumes/new" className="flex flex-col items-center gap-1">
        <span className="flex items-center justify-center w-11 h-11 rounded-full bg-accent text-white">
          <Plus size={22} strokeWidth={2.5} />
        </span>
      </Link>
      <Link href="/templates" className={`flex flex-col items-center gap-1 ${isActive("/templates") ? "text-accent" : "text-text-disabled"}`}>
        <LayoutTemplate size={22} strokeWidth={2} />
        <span className="text-[11px] font-body font-medium">Templates</span>
      </Link>
      <Link href="/settings" className={`flex flex-col items-center gap-1 ${isActive("/settings") ? "text-accent" : "text-text-disabled"}`}>
        <Settings size={22} strokeWidth={2} />
        <span className="text-[11px] font-body font-medium">Settings</span>
      </Link>
    </nav>
  );
}
