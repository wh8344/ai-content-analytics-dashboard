import type {
  RecentAnalysisReport,
  ReportStatus,
  RiskLevel,
  Sentiment,
} from "@/src/types/analytics";
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

const statusStyles: Record<ReportStatus, string> = {
  Completed: "bg-zinc-950 text-white",
  "In Review": "bg-blue-50 text-blue-700 ring-1 ring-blue-600/15",
  Flagged: "bg-red-50 text-red-700 ring-1 ring-red-600/15",
};

function Badge({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <span className={cn("inline-flex rounded-md px-2 py-1 text-xs font-medium ring-1", className)}>
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
        <div className="max-w-full overflow-x-auto">
          <table className="w-full min-w-[860px] border-separate border-spacing-0 text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-200 text-xs uppercase text-zinc-500">
                <th className="border-b border-zinc-200 pb-3 font-medium">Title</th>
                <th className="border-b border-zinc-200 pb-3 font-medium">Content Type</th>
                <th className="border-b border-zinc-200 pb-3 font-medium">AI Score</th>
                <th className="border-b border-zinc-200 pb-3 font-medium">Sentiment</th>
                <th className="border-b border-zinc-200 pb-3 font-medium">Risk Level</th>
                <th className="border-b border-zinc-200 pb-3 font-medium">Created At</th>
                <th className="border-b border-zinc-200 pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr className="text-zinc-700" key={report.id}>
                  <td className="border-b border-zinc-100 py-4 pr-4">
                    <p className="font-medium text-zinc-950">{report.title}</p>
                  </td>
                  <td className="border-b border-zinc-100 py-4 pr-4">{report.contentType}</td>
                  <td className="border-b border-zinc-100 py-4 pr-4">
                    <span className="font-semibold text-zinc-950">{report.aiScore}</span>
                  </td>
                  <td className="border-b border-zinc-100 py-4 pr-4">
                    <Badge className={sentimentStyles[report.sentiment]}>{report.sentiment}</Badge>
                  </td>
                  <td className="border-b border-zinc-100 py-4 pr-4">
                    <Badge className={riskStyles[report.riskLevel]}>{report.riskLevel}</Badge>
                  </td>
                  <td className="border-b border-zinc-100 py-4 pr-4 text-zinc-500">
                    {report.createdAt}
                  </td>
                  <td className="border-b border-zinc-100 py-4">
                    <Badge className={statusStyles[report.status]}>{report.status}</Badge>
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
