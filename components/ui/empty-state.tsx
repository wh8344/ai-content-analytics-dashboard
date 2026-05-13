import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function EmptyState({
  actionHref,
  actionLabel,
  description,
  icon: Icon,
  title,
}: {
  actionHref?: string;
  actionLabel?: string;
  description: string;
  icon: LucideIcon;
  title: string;
}) {
  return (
    <Card className="border-dashed animate-fade-up">
      <CardContent className="flex min-h-[360px] flex-col items-center justify-center p-8 text-center">
        <div className="grid h-12 w-12 place-items-center rounded-xl border border-zinc-200 bg-[var(--accent-soft)] text-[var(--accent)]">
          <Icon className="h-5 w-5" />
        </div>
        <h2 className="mt-5 text-xl font-semibold tracking-tight text-zinc-950">{title}</h2>
        <p className="mt-2 max-w-md text-sm leading-6 text-zinc-500">{description}</p>
        {actionHref && actionLabel ? (
          <Link
            className="mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-zinc-950 px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
            href={actionHref}
          >
            {actionLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
        ) : null}
      </CardContent>
    </Card>
  );
}
