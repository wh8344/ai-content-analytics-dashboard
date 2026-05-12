import { MobileNav } from "@/components/mobile-nav";
import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";

export function DashboardShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="flex">
        <Sidebar />
        <div className="min-w-0 flex-1 pb-20 lg:pb-0">
          <Topbar title={title} />
          <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6">
            {children}
          </main>
        </div>
      </div>
      <MobileNav />
    </div>
  );
}
