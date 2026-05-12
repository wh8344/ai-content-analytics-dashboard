import {
  AlertTriangle,
  ArrowUpRight,
  Lightbulb,
  MessageSquareHeart,
  Target,
  WandSparkles,
} from "lucide-react";
import type { AiInsight, InsightCategory, Priority } from "@/src/types/analytics";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const categoryIcons = {
  "AI Recommendations": WandSparkles,
  "Top Performing Topics": Target,
  "Audience Sentiment Trends": MessageSquareHeart,
  "Content Risk Alerts": AlertTriangle,
  "Content Improvement Opportunities": Lightbulb,
} satisfies Record<InsightCategory, typeof Lightbulb>;

const priorityStyles: Record<Priority, string> = {
  Low: "bg-zinc-100 text-zinc-700 ring-zinc-600/10",
  Medium: "bg-amber-50 text-amber-700 ring-amber-600/15",
  High: "bg-red-50 text-red-700 ring-red-600/15",
};

export function InsightCard({ insight }: { insight: AiInsight }) {
  const Icon = categoryIcons[insight.category];

  return (
    <Card className="h-full">
      <CardContent className="p-5">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-md bg-blue-50 text-blue-600">
            <Icon className="h-4 w-4" />
          </div>
          <span
            className={cn(
              "rounded-md px-2 py-1 text-xs font-semibold ring-1",
              priorityStyles[insight.priority],
            )}
          >
            {insight.priority}
          </span>
        </div>
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
          {insight.category}
        </p>
        <h3 className="mt-2 text-sm font-semibold leading-6 text-zinc-950">
          {insight.title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-zinc-500">{insight.description}</p>
        <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-4">
          <span className="text-xs font-medium text-zinc-500">{insight.createdAt}</span>
          <ArrowUpRight className="h-4 w-4 text-zinc-400" />
        </div>
      </CardContent>
    </Card>
  );
}
