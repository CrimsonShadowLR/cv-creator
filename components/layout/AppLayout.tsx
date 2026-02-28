import { Sidebar } from "./Sidebar";
import { MobileTabBar } from "./MobileTabBar";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-svh bg-bg-surface overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
      <MobileTabBar />
    </div>
  );
}
