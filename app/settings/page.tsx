import { KeyRound, ShieldCheck, UserRound } from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <DashboardShell title="Settings">
      <PageHeader
        eyebrow="Workspace controls"
        title="Configure the analytics workspace"
        description="Step one includes static settings cards only. API keys, billing, and team management can be added later."
      />

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { icon: UserRound, title: "Profile", text: "Manage account identity and workspace display details." },
          { icon: KeyRound, title: "API Access", text: "Placeholder for future AI provider configuration." },
          { icon: ShieldCheck, title: "Governance", text: "Review risk scoring rules and reporting permissions." },
        ].map(({ icon: Icon, title, text }) => (
          <Card key={title}>
            <CardHeader>
              <Icon className="mb-3 h-5 w-5 text-zinc-500" />
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
