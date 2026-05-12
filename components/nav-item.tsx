"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function NavItem({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: LucideIcon;
  label: string;
}) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex h-9 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors",
        active
          ? "bg-zinc-950 text-white"
          : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950",
      )}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </Link>
  );
}
