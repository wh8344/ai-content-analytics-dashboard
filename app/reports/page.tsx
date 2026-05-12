import { CalendarDays, Download, FileCheck2 } from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const reports = ["Weekly sentiment report", "Keyword opportunity report", "Risk review summary"];

export default function ReportsPage() {
  return (
    <DashboardShell title="Reports">
      <PageHeader
        eyebrow="Export center"
        title="Package insights into client-ready reports"
        description="Mock report cards show how analysis outputs will later become shareable summaries for stakeholders."
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {reports.map((report) => (
          <Card key={report}>
            <CardHeader>
              <FileCheck2 className="mb-3 h-5 w-5 text-blue-600" />
              <CardTitle>{report}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex items-center gap-2 text-sm text-zinc-500">
                <CalendarDays className="h-4 w-4" />
                Updated 2 hours ago
              </div>
              <Button variant="outline" type="button">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardShell>
  );
}
