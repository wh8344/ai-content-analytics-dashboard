import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard-shell";
import { PageHeader } from "@/components/page-header";
import { ReportsTable } from "@/components/reports/reports-table";
import { portfolioAnalysisHistory } from "@/src/data/portfolio-history";

export const metadata: Metadata = {
  title: "Reports",
  description:
    "Search, filter, review, and manage the archive of AI content analysis reports.",
};

export default async function ReportsPage({
  searchParams,
}: {
  searchParams?: Promise<{ demo?: string }>;
}) {
  const params = await searchParams;
  const initialReports = params?.demo === "portfolio" ? portfolioAnalysisHistory : [];

  return (
    <DashboardShell title="Reports">
      <div className="space-y-5">
        <PageHeader
          eyebrow="Report archive"
          title="Review historical AI analysis reports"
          description="Search and filter previous analysis runs by content type, sentiment, risk level, score, and review status."
        />

        <ReportsTable reports={initialReports} />
      </div>
    </DashboardShell>
  );
}
