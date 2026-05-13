"use client";

import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Lightbulb,
  MessageSquareHeart,
  Target,
  WandSparkles,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type {
  AiInsight,
  ContentType,
  Priority,
  SavedAnalysisReport,
  Sentiment,
} from "@/src/types/analytics";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getAnalysisHistory } from "@/src/lib/analysis-history";

type InsightMetrics = {
  totalReports: number;
  averageAiScore: number;
  positiveCount: number;
  neutralCount: number;
  negativeCount: number;
  highRiskCount: number;
  mediumRiskCount: number;
  lowRiskCount: number;
  topKeywords: Array<{ keyword: string; count: number }>;
  bestPerformingContentType: ContentType | "N/A";
  weakestContentType: ContentType | "N/A";
};

const sentimentColors: Record<Sentiment, string> = {
  Positive: "#10b981",
  Neutral: "#64748b",
  Negative: "#f97316",
};

const riskColors = {
  Low: "#10b981",
  Medium: "#f59e0b",
  High: "#ef4444",
};

const priorityStyles: Record<Priority, string> = {
  Low: "bg-zinc-100 text-zinc-700 ring-zinc-600/10",
  Medium: "bg-amber-50 text-amber-700 ring-amber-600/15",
  High: "bg-red-50 text-red-700 ring-red-600/15",
};

function calculateMetrics(reports: SavedAnalysisReport[]): InsightMetrics {
  const scoreTotal = reports.reduce((sum, report) => sum + report.aiScore, 0);
  const byContentType = new Map<ContentType, { total: number; count: number }>();
  const keywordCounts = new Map<string, number>();

  for (const report of reports) {
    const current = byContentType.get(report.contentType) ?? { total: 0, count: 0 };
    byContentType.set(report.contentType, {
      total: current.total + report.aiScore,
      count: current.count + 1,
    });

    for (const keyword of report.result.keywords) {
      const normalized = keyword.trim().toLowerCase();

      if (normalized) {
        keywordCounts.set(normalized, (keywordCounts.get(normalized) ?? 0) + 1);
      }
    }
  }

  const contentTypeScores = Array.from(byContentType.entries()).map(([type, value]) => ({
    type,
    average: value.total / value.count,
  }));

  const sortedContentTypes = contentTypeScores.sort((a, b) => b.average - a.average);

  return {
    totalReports: reports.length,
    averageAiScore: reports.length ? Math.round(scoreTotal / reports.length) : 0,
    positiveCount: reports.filter((report) => report.sentiment === "Positive").length,
    neutralCount: reports.filter((report) => report.sentiment === "Neutral").length,
    negativeCount: reports.filter((report) => report.sentiment === "Negative").length,
    highRiskCount: reports.filter((report) => report.riskLevel === "High").length,
    mediumRiskCount: reports.filter((report) => report.riskLevel === "Medium").length,
    lowRiskCount: reports.filter((report) => report.riskLevel === "Low").length,
    topKeywords: Array.from(keywordCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([keyword, count]) => ({ keyword, count })),
    bestPerformingContentType: sortedContentTypes[0]?.type ?? "N/A",
    weakestContentType: sortedContentTypes.at(-1)?.type ?? "N/A",
  };
}

function buildRecommendations(metrics: InsightMetrics): AiInsight[] {
  const recommendations: AiInsight[] = [];
  const dominantNegative =
    metrics.negativeCount > metrics.positiveCount && metrics.negativeCount >= metrics.neutralCount;
  const repeatedKeyword = metrics.topKeywords.find((keyword) => keyword.count > 1);

  if (metrics.averageAiScore < 70) {
    recommendations.push({
      id: "rec_clarity",
      title: "Improve clarity and structure",
      description:
        "Average AI score is below 70. Prioritize clearer opening sections, stronger evidence, and tighter calls to action.",
      category: "Content Improvement Opportunities",
      priority: "High",
      createdAt: "Dynamic",
    });
  }

  if (metrics.highRiskCount > 0) {
    recommendations.push({
      id: "rec_risk",
      title: "Review high-risk content before publishing",
      description:
        "High-risk reports are present in the current history. Review claims, compliance language, and sensitive wording.",
      category: "Content Risk Alerts",
      priority: "High",
      createdAt: "Dynamic",
    });
  }

  if (dominantNegative) {
    recommendations.push({
      id: "rec_tone",
      title: "Adjust tone for negative sentiment clusters",
      description:
        "Negative sentiment is currently dominant. Rework language around friction points and add more constructive framing.",
      category: "Audience Sentiment Trends",
      priority: "Medium",
      createdAt: "Dynamic",
    });
  }

  if (metrics.bestPerformingContentType !== "N/A") {
    recommendations.push({
      id: "rec_best_type",
      title: `Create more ${metrics.bestPerformingContentType.toLowerCase()} content`,
      description:
        "This content type currently has the strongest average score. Use it as a repeatable format for future campaigns.",
      category: "Top Performing Topics",
      priority: "Medium",
      createdAt: "Dynamic",
    });
  }

  if (repeatedKeyword) {
    recommendations.push({
      id: "rec_topic_cluster",
      title: `Build a topic cluster around "${repeatedKeyword.keyword}"`,
      description:
        "This keyword appears repeatedly in saved analyses. Consider turning it into a focused content cluster or campaign theme.",
      category: "AI Recommendations",
      priority: "Medium",
      createdAt: "Dynamic",
    });
  }

  if (recommendations.length === 0) {
    recommendations.push({
      id: "rec_baseline",
      title: "Continue building analysis history",
      description:
        "Current results look stable. Add more analyzed content to uncover stronger trend patterns and recommendations.",
      category: "AI Recommendations",
      priority: "Low",
      createdAt: "Dynamic",
    });
  }

  return recommendations;
}

function KpiCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <Card>
      <CardContent className="p-5">
        <p className="text-sm font-medium text-zinc-500">{title}</p>
        <p className="mt-3 text-2xl font-semibold text-zinc-950">{value}</p>
        <p className="mt-1 text-sm text-zinc-500">{description}</p>
      </CardContent>
    </Card>
  );
}

function DistributionChart({
  data,
  title,
  description,
}: {
  data: Array<{ name: string; value: number; color: string }>;
  title: string;
  description: string;
}) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="min-h-[320px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-48">
          <ResponsiveContainer height="100%" width="100%">
            <PieChart>
              <Tooltip />
              <Pie
                cx="50%"
                cy="50%"
                data={data}
                dataKey="value"
                innerRadius={48}
                outerRadius={76}
                paddingAngle={3}
                strokeWidth={0}
              >
                {data.map((entry) => (
                  <Cell fill={entry.color} key={entry.name} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 space-y-2">
          {data.map((item) => (
            <div className="flex items-center justify-between text-sm" key={item.name}>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="font-medium text-zinc-700">{item.name}</span>
              </div>
              <span className="text-zinc-500">{total ? item.value : 0}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function RecommendationCard({ insight }: { insight: AiInsight }) {
  const categoryIcon = {
    "AI Recommendations": WandSparkles,
    "Top Performing Topics": Target,
    "Audience Sentiment Trends": MessageSquareHeart,
    "Content Risk Alerts": AlertTriangle,
    "Content Improvement Opportunities": Lightbulb,
  }[insight.category];
  const Icon = categoryIcon;

  return (
    <Card>
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
        <h3 className="mt-2 text-sm font-semibold leading-6 text-zinc-950">{insight.title}</h3>
        <p className="mt-2 text-sm leading-6 text-zinc-500">{insight.description}</p>
      </CardContent>
    </Card>
  );
}

function EmptyState() {
  return (
    <Card>
      <CardContent className="p-10 text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-lg bg-blue-50 text-blue-600">
          <BarChart3 className="h-5 w-5" />
        </div>
        <h3 className="mt-4 text-base font-semibold text-zinc-950">No analysis history yet</h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">
          Insights will appear after you analyze content. Run a sample analysis to unlock
          sentiment trends, risk alerts, top keywords, and AI recommendations.
        </p>
        <Link
          className="mt-5 inline-flex h-9 items-center justify-center gap-2 rounded-md bg-zinc-950 px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
          href="/analyze"
        >
          Analyze Content
          <ArrowRight className="h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  );
}

export function DynamicInsights() {
  const [reports, setReports] = useState<SavedAnalysisReport[]>([]);
  const metrics = useMemo(() => calculateMetrics(reports), [reports]);
  const recommendations = useMemo(() => buildRecommendations(metrics), [metrics]);

  useEffect(() => {
    function syncReports() {
      setReports(getAnalysisHistory());
    }

    syncReports();
    window.addEventListener("storage", syncReports);
    window.addEventListener("analysis-history-updated", syncReports);

    return () => {
      window.removeEventListener("storage", syncReports);
      window.removeEventListener("analysis-history-updated", syncReports);
    };
  }, []);

  if (reports.length === 0) {
    return <EmptyState />;
  }

  const sentimentData = [
    { name: "Positive", value: metrics.positiveCount, color: sentimentColors.Positive },
    { name: "Neutral", value: metrics.neutralCount, color: sentimentColors.Neutral },
    { name: "Negative", value: metrics.negativeCount, color: sentimentColors.Negative },
  ];
  const riskData = [
    { name: "Low", value: metrics.lowRiskCount, color: riskColors.Low },
    { name: "Medium", value: metrics.mediumRiskCount, color: riskColors.Medium },
    { name: "High", value: metrics.highRiskCount, color: riskColors.High },
  ];

  return (
    <div className="space-y-5">
      {reports.length < 3 ? (
        <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700">
          Analyze more content to unlock stronger trend insights.
        </div>
      ) : null}

      <section>
        <div className="mb-3">
          <h3 className="text-sm font-semibold text-zinc-950">Overall Performance Summary</h3>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <KpiCard
            description="Saved analyses in this browser"
            title="Total Reports"
            value={String(metrics.totalReports)}
          />
          <KpiCard
            description="Average quality score"
            title="Average AI Score"
            value={String(metrics.averageAiScore)}
          />
          <KpiCard
            description="Highest scoring content type"
            title="Best Performer"
            value={metrics.bestPerformingContentType}
          />
          <KpiCard
            description="Lowest average scoring type"
            title="Needs Attention"
            value={metrics.weakestContentType}
          />
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <DistributionChart
          data={sentimentData}
          description="Sentiment distribution across saved reports."
          title="Sentiment Trends"
        />
        <DistributionChart
          data={riskData}
          description="Risk level distribution across saved reports."
          title="Risk Alerts"
        />
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <CardHeader>
            <CardTitle>Top Keywords</CardTitle>
            <CardDescription>Most repeated keywords across saved analysis results.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {metrics.topKeywords.length ? (
                metrics.topKeywords.map((item) => (
                  <div
                    className="flex items-center justify-between rounded-md border border-zinc-200 p-3"
                    key={item.keyword}
                  >
                    <span className="text-sm font-medium capitalize text-zinc-800">{item.keyword}</span>
                    <span className="rounded-md bg-zinc-100 px-2 py-1 text-xs font-semibold text-zinc-600">
                      {item.count}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-zinc-500">No keywords available yet.</p>
              )}
            </div>
          </CardContent>
        </Card>

        <div>
          <div className="mb-3 flex items-center justify-between gap-4">
            <h3 className="text-sm font-semibold text-zinc-950">AI Recommendations</h3>
            <span className="text-xs font-medium text-zinc-500">{recommendations.length} generated</span>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {recommendations.map((recommendation) => (
              <RecommendationCard insight={recommendation} key={recommendation.id} />
            ))}
          </div>
        </div>
      </section>

      <section>
        <Card>
          <CardHeader>
            <CardTitle>Content Quality Opportunities</CardTitle>
            <CardDescription>
              Rule-based observations derived from saved AI analysis history.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-3">
            <div className="rounded-md border border-zinc-200 p-3">
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Score Focus</p>
              <p className="mt-2 text-sm font-medium text-zinc-800">
                {metrics.averageAiScore < 70
                  ? "Improve clarity and structure"
                  : "Maintain current quality baseline"}
              </p>
            </div>
            <div className="rounded-md border border-zinc-200 p-3">
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Risk Focus</p>
              <p className="mt-2 text-sm font-medium text-zinc-800">
                {metrics.highRiskCount > 0
                  ? "Review high-risk reports first"
                  : "No high-risk reports detected"}
              </p>
            </div>
            <div className="rounded-md border border-zinc-200 p-3">
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Topic Focus</p>
              <p className="mt-2 text-sm font-medium text-zinc-800">
                {metrics.topKeywords[0]?.keyword
                  ? `Build around ${metrics.topKeywords[0].keyword}`
                  : "Analyze more content for topics"}
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
