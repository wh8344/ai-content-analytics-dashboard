"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  LayoutDashboard,
  Lightbulb,
  Settings,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/analyze", label: "Analyze", icon: Sparkles },
  { href: "/insights", label: "Insights", icon: Lightbulb },
  { href: "/reports", label: "Reports", icon: FileText },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-zinc-200 bg-white/95 px-2 py-2 backdrop-blur lg:hidden">
      <div className="grid grid-cols-5 gap-1">
        {navigation.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              href={href}
              key={href}
              className={cn(
                "flex h-12 flex-col items-center justify-center gap-1 rounded-md text-[11px] font-medium",
                active ? "bg-zinc-950 text-white" : "text-zinc-500",
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
