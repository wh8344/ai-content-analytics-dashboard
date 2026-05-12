import { ContentTypeChart } from "@/components/dashboard/content-type-chart";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { RecentReportsTable } from "@/components/dashboard/recent-reports-table";
import { SentimentChart } from "@/components/dashboard/sentiment-chart";
import { TrendChart } from "@/components/dashboard/trend-chart";
import { DashboardShell } from "@/components/dashboard-shell";
import { PageHeader } from "@/components/page-header";
import {
  aiScoreTrend,
  contentTypeVolumes,
  kpiMetrics,
  recentAnalysisReports,
  sentimentDistribution,
} from "@/src/data/mock-data";

export default function DashboardPage() {
  return (
    <DashboardShell title="Dashboard">
      <div className="space-y-5">
        <PageHeader
          eyebrow="AI content intelligence"
          title="Content analytics command center"
          description="Track content quality, sentiment, risk signals, and review status across every AI-assisted content analysis workflow."
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kpiMetrics.map((metric) => (
            <KpiCard key={metric.title} metric={metric} />
          ))}
        </div>

        <div className="grid gap-4 xl:grid-cols-[1.4fr_0.8fr]">
          <TrendChart data={aiScoreTrend} />
          <SentimentChart data={sentimentDistribution} />
        </div>

        <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
          <ContentTypeChart data={contentTypeVolumes} />
          <RecentReportsTable reports={recentAnalysisReports} />
        </div>
      </div>
    </DashboardShell>
  );
}
