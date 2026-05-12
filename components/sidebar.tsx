"use client";

import {
  BarChart3,
  FileText,
  LayoutDashboard,
  Lightbulb,
  Settings,
  Sparkles,
} from "lucide-react";
import { NavItem } from "@/components/nav-item";

const navigation = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/analyze", label: "Analyze", icon: Sparkles },
  { href: "/insights", label: "Insights", icon: Lightbulb },
  { href: "/reports", label: "Reports", icon: FileText },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="hidden min-h-screen w-64 shrink-0 border-r border-zinc-200 bg-white px-4 py-5 lg:block">
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-zinc-950 text-white">
          <BarChart3 className="h-4 w-4" />
        </div>
        <div>
          <p className="text-sm font-semibold text-zinc-950">ContentAI</p>
          <p className="text-xs text-zinc-500">Analytics workspace</p>
        </div>
      </div>

      <nav className="space-y-1">
        {navigation.map((item) => (
          <NavItem key={item.href} {...item} />
        ))}
      </nav>

      <div className="mt-8 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
          Current plan
        </p>
        <p className="mt-2 text-sm font-semibold text-zinc-950">Portfolio Pro</p>
        <p className="mt-1 text-xs leading-5 text-zinc-500">
          Mock SaaS workspace for content intelligence demos.
        </p>
      </div>
    </aside>
  );
}
