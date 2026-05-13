import type { Metadata } from "next";
import { DynamicDashboard } from "@/components/dashboard/dynamic-dashboard";
import { DashboardShell } from "@/components/dashboard-shell";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "View KPI metrics, sentiment trends, content volume, and recent AI analysis reports.",
};

export default function DashboardPage() {
  return (
    <DashboardShell title="Dashboard">
      <div className="space-y-5">
        <PageHeader
          eyebrow="AI content intelligence"
          title="Content analytics command center"
          description="Track content quality, sentiment, risk signals, and review status across every AI-assisted content analysis workflow."
        />

        <DynamicDashboard />
      </div>
    </DashboardShell>
  );
}
