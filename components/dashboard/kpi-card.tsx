import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import type { KpiMetric } from "@/src/types/analytics";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function KpiCard({ metric }: { metric: KpiMetric }) {
  const Icon = metric.icon;
  const TrendIcon =
    metric.trend === "up" ? ArrowUpRight : metric.trend === "down" ? ArrowDownRight : Minus;

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-zinc-500">{metric.title}</p>
            <p className="mt-3 text-2xl font-semibold tracking-tight text-zinc-950">
              {metric.value}
            </p>
          </div>
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-zinc-200 bg-zinc-50">
            <Icon className="h-4 w-4 text-zinc-700" />
          </div>
        </div>
        <div
          className={cn(
            "mt-4 inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium",
            metric.trend === "up" && "bg-emerald-50 text-emerald-700",
            metric.trend === "down" && "bg-blue-50 text-blue-700",
            metric.trend === "neutral" && "bg-zinc-100 text-zinc-600",
          )}
        >
          <TrendIcon className="h-3.5 w-3.5" />
          {metric.change}
        </div>
      </CardContent>
    </Card>
  );
}
