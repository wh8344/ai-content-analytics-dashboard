import { Bell, Search } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Topbar({ title }: { title: string }) {
  return (
    <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/90 backdrop-blur">
      <div className="flex min-h-16 items-center justify-between gap-4 px-4 sm:px-6">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
            AI Content Analytics
          </p>
          <h1 className="truncate text-lg font-semibold text-zinc-950">{title}</h1>
        </div>

        <div className="hidden w-full max-w-sm items-center gap-2 rounded-md border border-zinc-200 bg-white px-3 shadow-sm md:flex">
          <Search className="h-4 w-4 text-zinc-400" />
          <Input
            className="border-0 px-0 shadow-none focus:border-0 focus:ring-0"
            placeholder="Search reports, keywords, content..."
          />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" aria-label="Notifications">
            <Bell className="h-4 w-4" />
          </Button>
          <Avatar />
        </div>
      </div>
    </header>
  );
}
