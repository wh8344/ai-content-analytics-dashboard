import { DashboardShell } from "@/components/dashboard-shell";
import { PageHeader } from "@/components/page-header";
import { ReportsTable } from "@/components/reports/reports-table";
import { recentAnalysisReports } from "@/src/data/mock-data";

export default function ReportsPage() {
  return (
    <DashboardShell title="Reports">
      <div className="space-y-5">
        <PageHeader
          eyebrow="Report archive"
          title="Review historical AI analysis reports"
          description="Search and filter previous analysis runs by content type, sentiment, risk level, score, and review status."
        />

        <ReportsTable reports={recentAnalysisReports} />
      </div>
    </DashboardShell>
  );
}
