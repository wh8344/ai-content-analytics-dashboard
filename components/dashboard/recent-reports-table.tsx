import type { RecentAnalysisReport, Sentiment } from "@/src/types/analytics";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const sentimentStyles: Record<Sentiment, string> = {
  Positive: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
  Neutral: "bg-slate-100 text-slate-700 ring-slate-600/15",
  Negative: "bg-orange-50 text-orange-700 ring-orange-600/15",
};

function Badge({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <span className={cn("inline-flex whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium ring-1", className)}>
      {children}
    </span>
  );
}

export function RecentReportsTable({ reports }: { reports: RecentAnalysisReport[] }) {
  return (
    <Card className="min-w-0 overflow-hidden">
      <CardHeader className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle>Recent Analysis Reports</CardTitle>
          <CardDescription>Latest AI content analysis jobs across the workspace.</CardDescription>
        </div>
        <span className="text-xs font-medium text-zinc-500">{reports.length} reports</span>
      </CardHeader>
      <CardContent>
        <div className="max-w-full overflow-hidden">
          <table className="w-full table-fixed border-separate border-spacing-0 text-left text-sm">
            <colgroup>
              <col className="w-[50%]" />
              <col className="w-[22%]" />
              <col className="w-[12%]" />
              <col className="w-[16%]" />
            </colgroup>
            <thead>
              <tr className="border-b border-zinc-200 text-xs uppercase text-zinc-500">
                <th className="border-b border-zinc-200 pb-3 pr-3 font-medium">Title</th>
                <th className="border-b border-zinc-200 pb-3 pr-3 font-medium">Type</th>
                <th className="border-b border-zinc-200 pb-3 pr-3 font-medium">Score</th>
                <th className="border-b border-zinc-200 pb-3 font-medium">Sentiment</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr className="text-zinc-700" key={report.id}>
                  <td className="border-b border-zinc-100 py-4 pr-3">
                    <p className="truncate font-medium text-zinc-950" title={report.title}>
                      {report.title}
                    </p>
                  </td>
                  <td className="border-b border-zinc-100 py-4 pr-3 text-zinc-600">
                    <span className="block truncate" title={report.contentType}>
                      {report.contentType}
                    </span>
                  </td>
                  <td className="border-b border-zinc-100 py-4 pr-3">
                    <span className="font-semibold text-zinc-950">{report.aiScore}</span>
                  </td>
                  <td className="border-b border-zinc-100 py-4">
                    <Badge className={sentimentStyles[report.sentiment]}>{report.sentiment}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
