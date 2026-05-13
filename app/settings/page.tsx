import type { Metadata } from "next";
import {
  Bell,
  BrainCircuit,
  CheckCircle2,
  CreditCard,
  Mail,
  Palette,
  ShieldAlert,
  Sparkles,
  UserRound,
} from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Settings",
  description:
    "Configure the AI analytics workspace, model defaults, notifications, visual theme, and billing presentation.",
};

function StaticSwitch({
  checked = true,
  label,
  description,
}: {
  checked?: boolean;
  label: string;
  description: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-md border border-zinc-200 bg-white p-3">
      <div className="min-w-0">
        <p className="text-sm font-medium text-zinc-950">{label}</p>
        <p className="mt-1 text-sm leading-5 text-zinc-500">{description}</p>
      </div>
      <div
        aria-checked={checked}
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full transition-colors",
          checked ? "bg-zinc-950" : "bg-zinc-200",
        )}
        role="switch"
      >
        <span
          className={cn(
            "absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform",
            checked ? "translate-x-6" : "translate-x-1",
          )}
        />
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm font-medium text-zinc-800">
      {label}
      <div className="mt-2">{children}</div>
    </label>
  );
}

function Select({
  defaultValue,
  options,
}: {
  defaultValue: string;
  options: string[];
}) {
  return (
    <select
      className="h-10 w-full rounded-md border border-zinc-200 bg-white px-3 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
      defaultValue={defaultValue}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default function SettingsPage() {
  return (
    <DashboardShell title="Settings">
      <div className="space-y-5">
        <PageHeader
          eyebrow="Workspace settings"
          title="Configure your AI analytics workspace"
          description="Manage profile details, analysis defaults, notification preferences, theme settings, and billing plan visibility for the demo workspace."
        />

        <div className="grid gap-4 xl:grid-cols-[1fr_380px]">
          <div className="space-y-4">
            <Card>
              <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="mb-3 grid h-9 w-9 place-items-center rounded-md bg-blue-50 text-blue-600">
                    <UserRound className="h-4 w-4" />
                  </div>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>Static account details for the portfolio workspace.</CardDescription>
                </div>
                <Button type="button" variant="outline">
                  Save Changes
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Full Name">
                    <Input defaultValue="Wang Hao" />
                  </Field>
                  <Field label="Work Email">
                    <Input defaultValue="wanghao@example.com" />
                  </Field>
                  <Field label="Company">
                    <Input defaultValue="ContentAI Studio" />
                  </Field>
                  <Field label="Role">
                    <Input defaultValue="Founder / Operator" />
                  </Field>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-3 grid h-9 w-9 place-items-center rounded-md bg-blue-50 text-blue-600">
                  <BrainCircuit className="h-4 w-4" />
                </div>
                <CardTitle>AI Model Settings</CardTitle>
                <CardDescription>
                  Default analysis behavior for future AI-powered content workflows.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Default AI Model">
                    <Select
                      defaultValue="Content Intelligence Pro"
                      options={[
                        "Content Intelligence Pro",
                        "Content Intelligence Lite",
                        "Risk Review Specialist",
                      ]}
                    />
                  </Field>
                  <Field label="Analysis Depth">
                    <Select
                      defaultValue="Standard"
                      options={["Basic", "Standard", "Advanced"]}
                    />
                  </Field>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <StaticSwitch
                    description="Automatically detect core topics and recurring themes."
                    label="Auto keyword extraction"
                  />
                  <StaticSwitch
                    description="Flag legal, trust, and brand safety language."
                    label="Risk detection"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-3 grid h-9 w-9 place-items-center rounded-md bg-blue-50 text-blue-600">
                  <Bell className="h-4 w-4" />
                </div>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Control static notification preferences for reports and alerts.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3">
                <StaticSwitch
                  description="Send a concise email when new report batches are ready."
                  label="Email report summary"
                />
                <StaticSwitch
                  description="Notify reviewers when content receives a high risk rating."
                  label="High risk content alerts"
                />
                <StaticSwitch
                  description="Deliver a weekly summary of score, sentiment, and volume trends."
                  label="Weekly analytics digest"
                />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <div className="mb-3 grid h-9 w-9 place-items-center rounded-md bg-blue-50 text-blue-600">
                  <Palette className="h-4 w-4" />
                </div>
                <CardTitle>Theme Settings</CardTitle>
                <CardDescription>Static preferences for presentation and workspace display.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Field label="Theme Mode">
                  <Select defaultValue="System" options={["Light", "Dark", "System"]} />
                </Field>
                <Field label="Accent Style">
                  <Select defaultValue="Professional Blue" options={["Professional Blue", "Neutral", "High Contrast"]} />
                </Field>
                <div className="rounded-lg border border-dashed border-zinc-300 bg-zinc-50 p-4">
                  <p className="text-sm font-medium text-zinc-950">Preview</p>
                  <div className="mt-3 flex gap-2">
                    <span className="h-8 flex-1 rounded-md bg-zinc-950" />
                    <span className="h-8 flex-1 rounded-md bg-blue-600" />
                    <span className="h-8 flex-1 rounded-md bg-zinc-200" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-3 grid h-9 w-9 place-items-center rounded-md bg-blue-50 text-blue-600">
                  <CreditCard className="h-4 w-4" />
                </div>
                <CardTitle>Billing Plan</CardTitle>
                <CardDescription>Portfolio billing UI only. No real payment is connected.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                        Current Plan
                      </p>
                      <p className="mt-1 text-2xl font-semibold text-zinc-950">Pro</p>
                    </div>
                    <Sparkles className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-medium text-zinc-700">Usage this month</span>
                    <span className="text-zinc-500">18,420 / 25,000 analyses</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-zinc-100">
                    <div className="h-full w-[74%] rounded-full bg-zinc-950" />
                  </div>
                </div>
                <Button className="w-full" type="button">
                  Upgrade Plan
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Workspace Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { icon: CheckCircle2, label: "Mock data loaded" },
                  { icon: ShieldAlert, label: "Risk scoring enabled" },
                  { icon: Mail, label: "Email digest configured" },
                ].map(({ icon: Icon, label }) => (
                  <div className="flex items-center gap-3 rounded-md border border-zinc-200 p-3" key={label}>
                    <Icon className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm font-medium text-zinc-700">{label}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
