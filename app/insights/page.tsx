import { BadgeAlert, Hash, Lightbulb } from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const insights = [
  { icon: Lightbulb, title: "Audience intent", text: "Customers mention speed, trust, and pricing most often." },
  { icon: Hash, title: "Top keywords", text: "AI workflow, reporting, automation, review quality, conversion." },
  { icon: BadgeAlert, title: "Risk signals", text: "Potential overpromising detected in two marketing snippets." },
];

export default function InsightsPage() {
  return (
    <DashboardShell title="Insights">
      <PageHeader
        eyebrow="AI summaries"
        title="Understand what your content is really saying"
        description="Review generated themes, intent patterns, keyword clusters, and content risks before publishing."
      />

      <div className="grid gap-4 md:grid-cols-3">
        {insights.map(({ icon: Icon, title, text }) => (
          <Card key={title}>
            <CardHeader>
              <div className="mb-3 grid h-9 w-9 place-items-center rounded-md bg-blue-50 text-blue-600">
                <Icon className="h-4 w-4" />
              </div>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-zinc-500">{text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardShell>
  );
}
