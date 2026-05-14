import type { Metadata } from "next";
import { DynamicDashboard } from "@/components/dashboard/dynamic-dashboard";
import { DashboardShell } from "@/components/dashboard-shell";
import { PageHeader } from "@/components/page-header";
import { portfolioAnalysisHistory } from "@/src/data/portfolio-history";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "View KPI metrics, sentiment trends, content volume, and recent AI analysis reports.",
};

export default async function DashboardPage({
  searchParams,
}: {
  searchParams?: Promise<{ demo?: string }>;
}) {
  const params = await searchParams;
  const initialReports = params?.demo === "portfolio" ? portfolioAnalysisHistory : [];

  return (
    <DashboardShell title="Dashboard">
      <div className="space-y-5">
        <PageHeader
          eyebrow="AI content intelligence"
          title="Content analytics command center"
          description="Track content quality, sentiment, risk signals, and review status across every AI-assisted content analysis workflow."
        />

        <DynamicDashboard initialReports={initialReports} />
      </div>
    </DashboardShell>
  );
}
