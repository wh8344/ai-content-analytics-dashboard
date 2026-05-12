import { AnalyzeWorkflow } from "@/components/analyze/analyze-workflow";
import { DashboardShell } from "@/components/dashboard-shell";
import { PageHeader } from "@/components/page-header";

export default function AnalyzePage() {
  return (
    <DashboardShell title="Analyze">
      <div className="space-y-5">
        <PageHeader
          eyebrow="AI analysis workflow"
          title="Analyze content quality, sentiment, and risk"
          description="Run a client-side mock analysis flow for articles, social posts, comments, marketing copy, and product reviews before connecting a real AI backend."
        />

        <AnalyzeWorkflow />
      </div>
    </DashboardShell>
  );
}
