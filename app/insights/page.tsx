import { DashboardShell } from "@/components/dashboard-shell";
import { InsightCard } from "@/components/insights/insight-card";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { aiInsights } from "@/src/data/mock-data";
import type { InsightCategory } from "@/src/types/analytics";

const categories: InsightCategory[] = [
  "AI Recommendations",
  "Top Performing Topics",
  "Audience Sentiment Trends",
  "Content Risk Alerts",
  "Content Improvement Opportunities",
];

export default function InsightsPage() {
  return (
    <DashboardShell title="Insights">
      <div className="space-y-5">
        <PageHeader
          eyebrow="AI insight center"
          title="Turn content analysis into editorial decisions"
          description="Review recommendations, emerging topics, sentiment shifts, risk alerts, and improvement opportunities across your content workspace."
        />

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>High Priority Signals</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold text-zinc-950">
                {aiInsights.filter((insight) => insight.priority === "High").length}
              </p>
              <p className="mt-1 text-sm text-zinc-500">Require editorial review this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Insight Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold text-zinc-950">{categories.length}</p>
              <p className="mt-1 text-sm text-zinc-500">Covered across content intelligence</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Generated Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold text-zinc-950">{aiInsights.length}</p>
              <p className="mt-1 text-sm text-zinc-500">Based on latest mock analysis reports</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {categories.map((category) => {
            const items = aiInsights.filter((insight) => insight.category === category);

            return (
              <section key={category}>
                <div className="mb-3 flex items-center justify-between gap-4">
                  <h3 className="text-sm font-semibold text-zinc-950">{category}</h3>
                  <span className="text-xs font-medium text-zinc-500">{items.length} insights</span>
                </div>
                <div className="grid gap-4 lg:grid-cols-2">
                  {items.map((insight) => (
                    <InsightCard insight={insight} key={insight.id} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </DashboardShell>
  );
}
