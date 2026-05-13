import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard-shell";
import { DynamicInsights } from "@/components/insights/dynamic-insights";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Review dynamic content strategy recommendations, sentiment trends, and quality opportunities from saved analysis history.",
};

export default function InsightsPage() {
  return (
    <DashboardShell title="Insights">
      <div className="space-y-5">
        <PageHeader
          eyebrow="AI insight center"
          title="Turn saved analyses into content strategy"
          description="Review performance, sentiment, risk, keywords, and rule-based recommendations generated from your saved analysis history."
        />

        <DynamicInsights />
      </div>
    </DashboardShell>
  );
}
