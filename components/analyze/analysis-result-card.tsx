import type { AnalysisResult, RiskLevel, Sentiment } from "@/src/types/analytics";
import { KeywordTags } from "@/components/analyze/keyword-tags";
import { ScoreProgress } from "@/components/analyze/score-progress";
import { SuggestionList } from "@/components/analyze/suggestion-list";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const sentimentStyles: Record<Sentiment, string> = {
  Positive: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
  Neutral: "bg-slate-100 text-slate-700 ring-slate-600/15",
  Negative: "bg-orange-50 text-orange-700 ring-orange-600/15",
};

const riskStyles: Record<RiskLevel, string> = {
  Low: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
  Medium: "bg-amber-50 text-amber-700 ring-amber-600/15",
  High: "bg-red-50 text-red-700 ring-red-600/15",
};

function Badge({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <span className={cn("inline-flex h-8 items-center rounded-md px-2.5 text-xs font-semibold ring-1", className)}>
      {children}
    </span>
  );
}

function ExportAction({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      className="inline-flex h-8 items-center justify-center rounded-md border border-zinc-200 bg-white px-3 text-xs font-semibold text-zinc-700 shadow-sm transition-colors hover:bg-zinc-50"
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

export function AnalysisResultCard({
  result,
  onExportCsv,
  onExportJson,
}: {
  result: AnalysisResult;
  onExportCsv?: () => void;
  onExportJson?: () => void;
}) {
  return (
    <Card className="min-w-0 overflow-hidden">
      <CardHeader className="grid gap-4 border-b border-zinc-100 pb-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <div className="min-w-0">
          <CardTitle>AI Analysis Result</CardTitle>
          <CardDescription>Structured insight generated for the selected content.</CardDescription>
        </div>
        <div className="flex w-fit flex-wrap items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 p-1">
          <Badge className={sentimentStyles[result.sentiment]}>{result.sentiment}</Badge>
          <Badge className={riskStyles[result.riskLevel]}>{result.riskLevel} Risk</Badge>
          {onExportJson ? (
            <ExportAction onClick={onExportJson}>JSON</ExportAction>
          ) : null}
          {onExportCsv ? (
            <ExportAction onClick={onExportCsv}>CSV</ExportAction>
          ) : null}
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Summary</p>
          <p className="mt-2 text-sm leading-6 text-zinc-700">{result.summary}</p>
        </div>

        <ScoreProgress score={result.aiScore} />

        <div>
          <p className="mb-3 text-sm font-semibold text-zinc-950">Detected Keywords</p>
          <KeywordTags keywords={result.keywords} />
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold text-zinc-950">Improvement Suggestions</p>
          <SuggestionList suggestions={result.suggestions} />
        </div>
      </CardContent>
    </Card>
  );
}
