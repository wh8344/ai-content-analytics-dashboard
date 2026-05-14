"use client";

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
import { EmptyState } from "@/components/ui/empty-state";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { getAnalysisHistory } from "@/src/lib/analysis-history";
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
    <EmptyState
      actionHref="/analyze"
      actionLabel="Analyze Content"
      description="Dashboard metrics, charts, and recent reports will appear after you analyze content. Start with one of the built-in samples or paste your own source copy."
      icon={Sparkles}
      title="No dashboard activity yet"
    />
  );
}

function DashboardSkeleton() {
  return <PageSkeleton />;
}

export function DynamicDashboard({
  initialReports = [],
}: {
  initialReports?: SavedAnalysisReport[];
}) {
  const [reports, setReports] = useState<SavedAnalysisReport[] | null>(
    initialReports.length > 0 ? initialReports : null,
  );

  useEffect(() => {
    function refreshReports() {
      const history = getAnalysisHistory();
      setReports(history.length > 0 ? history : initialReports);
    }

    refreshReports();
    window.addEventListener("analysis-history-updated", refreshReports);
    window.addEventListener("storage", refreshReports);

    return () => {
      window.removeEventListener("analysis-history-updated", refreshReports);
      window.removeEventListener("storage", refreshReports);
    };
  }, [initialReports]);

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

      <div className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)]">
        <TrendChart data={analytics.trendData} />
        <SentimentChart data={analytics.sentimentData} />
      </div>

      <div className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <ContentTypeChart data={analytics.contentTypeData} />
        <RecentReportsTable reports={analytics.recentReports} />
      </div>
    </div>
  );
}
