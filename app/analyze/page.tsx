import { FileText, ScanLine, Sparkles } from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AnalyzePage() {
  return (
    <DashboardShell title="Analyze">
      <PageHeader
        eyebrow="Content input"
        title="Prepare content for AI analysis"
        description="This mock workspace will later accept articles, product reviews, social posts, and marketing copy for AI-powered scoring."
      />

      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <Card>
          <CardHeader>
            <CardTitle>New Analysis</CardTitle>
            <CardDescription>Paste or upload content to generate insights.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="min-h-64 rounded-lg border border-dashed border-zinc-300 bg-zinc-50 p-5">
              <div className="flex h-full min-h-52 flex-col items-center justify-center text-center">
                <FileText className="h-9 w-9 text-zinc-400" />
                <p className="mt-4 text-sm font-medium text-zinc-950">Content input area</p>
                <p className="mt-2 max-w-sm text-sm text-zinc-500">
                  Backend analysis is intentionally out of scope for step one.
                </p>
                <Button className="mt-5" type="button">
                  <Sparkles className="h-4 w-4" />
                  Mock Analyze
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Analysis Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {["Sentiment", "Keywords", "Risk Level", "Content Score"].map((item) => (
              <div className="flex items-center gap-3 rounded-md border border-zinc-200 p-3" key={item}>
                <ScanLine className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-zinc-700">{item}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
