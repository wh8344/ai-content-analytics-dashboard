"use client";

import Link from "next/link";
import {
  AlertTriangle,
  BarChart3,
  FileText,
  Gauge,
  MessageSquareText,
  Sparkles,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ContentTypeChart } from "@/components/dashboard/content-type-chart";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { RecentReportsTable } from "@/components/dashboard/recent-reports-table";
import { SentimentChart } from "@/components/dashboard/sentiment-chart";
import { TrendChart } from "@/components/dashboard/trend-chart";
import { Card, CardContent } from "@/components/ui/card";
import { getSavedAnalysisReports } from "@/src/lib/analysis-history";
import type {
  ContentType,
  ContentTypeVolume,
  KpiMetric,
  SavedAnalysisReport,
  Sentiment,
  SentimentSegment,
  TrendDataPoint,
} from "@/src/types/analytics";

const contentTypes: ContentType[] = [
  "Article",
  "Social Post",
  "Comment",
  "Marketing Copy",
  "Product Review",
];

const sentimentColors: Record<Sentiment, string> = {
  Positive: "#10b981",
  Neutral: "#64748b",
  Negative: "#f97316",
};

function parseReportTime(report: SavedAnalysisReport) {
  if (report.id.startsWith("local_")) {
    const timestamp = Number(report.id.replace("local_", ""));
    return Number.isFinite(timestamp) ? timestamp : 0;
  }

  const parsed = Date.parse(report.createdAt);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function EmptyDashboard() {
  return (
    <Card className="border-dashed">
      <CardContent className="flex min-h-[420px] flex-col items-center justify-center p-8 text-center">
        <div className="grid h-12 w-12 place-items-center rounded-xl border border-zinc-200 bg-zinc-50">
          <Sparkles className="h-5 w-5 text-zinc-700" />
        </div>
        <h2 className="mt-5 text-xl font-semibold tracking-tight text-zinc-950">
          No analysis history yet
        </h2>
        <p className="mt-2 max-w-md text-sm leading-6 text-zinc-500">
          Dashboard metrics will appear after you analyze content. Start with a sample or paste real
          content to generate your first AI report.
        </p>
        <Link
          className="mt-5 inline-flex h-9 items-center justify-center rounded-md bg-zinc-950 px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
          href="/analyze"
        >
          Analyze Content
        </Link>
      </CardContent>
    </Card>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {["one", "two", "three", "four"].map((item) => (
          <Card key={item}>
            <CardContent className="p-5">
              <div className="h-4 w-32 rounded bg-zinc-100" />
              <div className="mt-4 h-8 w-20 rounded bg-zinc-100" />
              <div className="mt-5 h-6 w-36 rounded bg-zinc-100" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 xl:grid-cols-[1.4fr_0.8fr]">
        <Card className="min-h-[360px]">
          <CardContent className="p-6">
            <div className="h-5 w-40 rounded bg-zinc-100" />
            <div className="mt-6 h-64 rounded bg-zinc-50" />
          </CardContent>
        </Card>
        <Card className="min-h-[360px]">
          <CardContent className="p-6">
            <div className="h-5 w-32 rounded bg-zinc-100" />
            <div className="mt-6 h-64 rounded bg-zinc-50" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function DynamicDashboard() {
  const [reports, setReports] = useState<SavedAnalysisReport[] | null>(null);

  useEffect(() => {
    function refreshReports() {
      setReports(getSavedAnalysisReports());
    }

    refreshReports();
    window.addEventListener("analysis-history-updated", refreshReports);
    window.addEventListener("storage", refreshReports);

    return () => {
      window.removeEventListener("analysis-history-updated", refreshReports);
      window.removeEventListener("storage", refreshReports);
    };
  }, []);

  const analytics = useMemo(() => {
    const reportList = reports ?? [];
    const totalReports = reportList.length;
    const averageAiScore = totalReports
      ? Math.round(reportList.reduce((sum, report) => sum + report.aiScore, 0) / totalReports)
      : 0;
    const positiveCount = reportList.filter((report) => report.sentiment === "Positive").length;
    const neutralCount = reportList.filter((report) => report.sentiment === "Neutral").length;
    const negativeCount = reportList.filter((report) => report.sentiment === "Negative").length;
    const highRiskCount = reportList.filter((report) => report.riskLevel === "High").length;
    const positiveRate = totalReports ? Math.round((positiveCount / totalReports) * 100) : 0;

    const kpis: KpiMetric[] = [
      {
        title: "Total Analyzed Content",
        value: String(totalReports),
        change: `${totalReports} saved ${totalReports === 1 ? "report" : "reports"}`,
        trend: "neutral",
        icon: FileText,
      },
      {
        title: "Average AI Score",
        value: String(averageAiScore),
        change:
          averageAiScore >= 80
            ? "Strong quality baseline"
            : averageAiScore >= 70
              ? "Monitor quality variance"
              : "Needs content improvement",
        trend: averageAiScore >= 80 ? "up" : averageAiScore >= 70 ? "neutral" : "down",
        icon: Gauge,
      },
      {
        title: "Positive Sentiment Rate",
        value: `${positiveRate}%`,
        change: `${positiveCount} positive ${positiveCount === 1 ? "report" : "reports"}`,
        trend: positiveRate >= 60 ? "up" : positiveRate >= 35 ? "neutral" : "down",
        icon: MessageSquareText,
      },
      {
        title: "High Risk Content",
        value: String(highRiskCount),
        change: highRiskCount > 0 ? "Review required" : "No high-risk reports",
        trend: highRiskCount > 0 ? "down" : "up",
        icon: AlertTriangle,
      },
    ];

    const sortedReports = [...reportList].sort((a, b) => parseReportTime(a) - parseReportTime(b));
    const trendData: TrendDataPoint[] = sortedReports.slice(-10).map((report) => ({
      date: report.createdAt,
      score: report.aiScore,
    }));

    const sentimentData: SentimentSegment[] = [
      { name: "Positive", value: positiveCount, color: sentimentColors.Positive },
      { name: "Neutral", value: neutralCount, color: sentimentColors.Neutral },
      { name: "Negative", value: negativeCount, color: sentimentColors.Negative },
    ];

    const contentTypeData: ContentTypeVolume[] = contentTypes.map((type) => ({
      type,
      count: reportList.filter((report) => report.contentType === type).length,
    }));

    return {
      contentTypeData,
      kpis,
      recentReports: reportList.slice(0, 5),
      sentimentData,
      trendData,
    };
  }, [reports]);

  if (reports === null) {
    return <DashboardSkeleton />;
  }

  if (reports.length === 0) {
    return <EmptyDashboard />;
  }

  return (
    <div className="space-y-5">
      {reports.length < 3 ? (
        <div className="flex items-start gap-3 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-800">
          <BarChart3 className="mt-0.5 h-4 w-4 shrink-0" />
          <p>Analyze more content to unlock stronger dashboard trends.</p>
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {analytics.kpis.map((metric) => (
          <KpiCard key={metric.title} metric={metric} />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.4fr_0.8fr]">
        <TrendChart data={analytics.trendData} />
        <SentimentChart data={analytics.sentimentData} />
      </div>

      <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <ContentTypeChart data={analytics.contentTypeData} />
        <RecentReportsTable reports={analytics.recentReports} />
      </div>
    </div>
  );
}
