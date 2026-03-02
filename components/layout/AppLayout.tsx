import { Sidebar } from "./Sidebar";
import { MobileTabBar } from "./MobileTabBar";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row h-svh bg-bg-surface overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto min-h-0 pb-16 md:pb-0">
        {children}
      </main>
      <MobileTabBar />
    </div>
  );
}
