import { Activity, Gauge, MessageSquareText, TrendingUp } from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";
import { MetricCard } from "@/components/metric-card";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const recentAnalyses = [
  { title: "Product review cluster", score: "86", sentiment: "Positive" },
  { title: "Launch email sequence", score: "74", sentiment: "Neutral" },
  { title: "Social comments export", score: "62", sentiment: "Mixed" },
];

export default function DashboardPage() {
  return (
    <DashboardShell title="Dashboard">
      <PageHeader
        eyebrow="Workspace overview"
        title="Monitor content quality and AI-generated insights"
        description="Track sentiment, content score, keyword coverage, and risk signals across your latest content analysis workflows."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Content Score" value="82.4" note="+6.2 this week" icon={Gauge} />
        <MetricCard title="Analyzed Items" value="1,284" note="342 new documents" icon={MessageSquareText} />
        <MetricCard title="Positive Sentiment" value="68%" note="+9% from last batch" icon={TrendingUp} />
        <MetricCard title="Risk Alerts" value="17" note="4 require review" icon={Activity} />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
        <Card>
          <CardHeader>
            <CardTitle>Sentiment Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {[
                ["Positive", "68%", "bg-emerald-500"],
                ["Neutral", "21%", "bg-blue-500"],
                ["Negative", "11%", "bg-amber-500"],
              ].map(([label, value, color]) => (
                <div key={label}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-medium text-zinc-700">{label}</span>
                    <span className="text-zinc-500">{value}</span>
                  </div>
                  <div className="h-2 rounded-full bg-zinc-100">
                    <div className={`h-2 rounded-full ${color}`} style={{ width: value }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Analyses</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentAnalyses.map((item) => (
              <div
                className="flex items-center justify-between rounded-md border border-zinc-200 p-3"
                key={item.title}
              >
                <div>
                  <p className="text-sm font-medium text-zinc-950">{item.title}</p>
                  <p className="text-xs text-zinc-500">{item.sentiment}</p>
                </div>
                <span className="rounded-md bg-zinc-100 px-2 py-1 text-sm font-semibold text-zinc-700">
                  {item.score}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
