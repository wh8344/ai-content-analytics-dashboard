import { cn } from "@/lib/utils";

export function ScoreProgress({ score }: { score: number }) {
  const tone =
    score >= 85
      ? "bg-emerald-500"
      : score >= 70
        ? "bg-blue-500"
        : score >= 55
          ? "bg-amber-500"
          : "bg-red-500";

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-zinc-700">AI Score</span>
        <span className="text-sm font-semibold text-zinc-950">{score}/100</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-zinc-100">
        <div
          className={cn("h-full rounded-full transition-all duration-700", tone)}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}
