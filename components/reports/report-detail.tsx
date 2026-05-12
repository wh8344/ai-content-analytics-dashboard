"use client";

import Link from "next/link";
import { ArrowLeft, Download, FileJson } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { AnalysisResultCard } from "@/components/analyze/analysis-result-card";
import { DashboardShell } from "@/components/dashboard-shell";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { recentAnalysisReports } from "@/src/data/mock-data";
import {
  exportAnalysisAsCsv,
  exportAnalysisAsJson,
  getSavedAnalysisReport,
} from "@/src/lib/analysis-history";
import type { AnalysisResult, RecentAnalysisReport, SavedAnalysisReport } from "@/src/types/analytics";
import { cn } from "@/lib/utils";

function createStaticResult(report: RecentAnalysisReport): AnalysisResult {
  return {
    summary: `${report.title} is a historical mock analysis report for ${report.contentType.toLowerCase()} content. It shows ${report.sentiment.toLowerCase()} sentiment, a ${report.riskLevel.toLowerCase()} risk level, and an AI quality score of ${report.aiScore}.`,
    sentiment: report.sentiment,
    keywords: [report.contentType, report.sentiment, `${report.riskLevel} risk`, "content quality"],
    aiScore: report.aiScore,
    riskLevel: report.riskLevel,
    suggestions: [
      "Review the strongest content signals before publishing similar content.",
      "Compare this report with newer analysis results to identify quality trends.",
      "Use the risk level and sentiment as editorial review inputs.",
    ],
  };
}

function createExportableReport(report: RecentAnalysisReport): SavedAnalysisReport {
  return {
    ...report,
    content: "Historical mock report content is not stored for seeded portfolio reports.",
    result: createStaticResult(report),
  };
}

function BackLink({ className }: { className?: string }) {
  return (
    <Link
      className={cn(
        "inline-flex h-9 items-center justify-center gap-2 rounded-md border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50",
        className,
      )}
      href="/reports"
    >
      <ArrowLeft className="h-4 w-4" />
      Back to Reports
    </Link>
  );
}

export function ReportDetail({ id }: { id: string }) {
  const [savedReport, setSavedReport] = useState<SavedAnalysisReport | null>(null);
  const staticReport = useMemo(
    () => recentAnalysisReports.find((report) => report.id === id) ?? null,
    [id],
  );

  useEffect(() => {
    setSavedReport(getSavedAnalysisReport(id));
  }, [id]);

  const report = savedReport ?? staticReport;
  const result = savedReport?.result ?? (staticReport ? createStaticResult(staticReport) : null);
  const exportableReport = savedReport ?? (staticReport ? createExportableReport(staticReport) : null);

  if (!report || !result || !exportableReport) {
    return (
      <DashboardShell title="Report Detail">
        <div className="space-y-5">
          <PageHeader
            eyebrow="Report detail"
            title="Report not found"
            description="This report may have been removed from local browser history."
          />
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-sm text-zinc-500">Return to the reports archive to choose another report.</p>
              <BackLink className="mt-4" />
            </CardContent>
          </Card>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell title="Report Detail">
      <div className="space-y-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <PageHeader
            eyebrow="Report detail"
            title={report.title}
            description={`${report.contentType} analysis created on ${report.createdAt}.`}
          />
          <BackLink />
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {[
            ["Content Type", report.contentType],
            ["AI Score", String(report.aiScore)],
            ["Sentiment", report.sentiment],
            ["Risk Level", report.riskLevel],
          ].map(([label, value]) => (
            <Card key={label}>
              <CardContent className="p-5">
                <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">{label}</p>
                <p className="mt-2 text-lg font-semibold text-zinc-950">{value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
          <AnalysisResultCard
            onExportCsv={() => exportAnalysisAsCsv(exportableReport)}
            onExportJson={() => exportAnalysisAsJson(exportableReport)}
            result={result}
          />
          <Card>
            <CardHeader>
              <CardTitle>Export Options</CardTitle>
              <CardDescription>Download this analysis for client review or archive use.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" onClick={() => exportAnalysisAsJson(exportableReport)} type="button" variant="outline">
                <FileJson className="h-4 w-4" />
                Export JSON
              </Button>
              <Button className="w-full justify-start" onClick={() => exportAnalysisAsCsv(exportableReport)} type="button" variant="outline">
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Source Content</p>
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  {savedReport?.content ?? "Seeded portfolio report. Source content is not stored."}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}
