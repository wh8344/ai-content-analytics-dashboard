import type { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function MetricCard({
  title,
  value,
  note,
  icon: Icon,
}: {
  title: string;
  value: string;
  note: string;
  icon: LucideIcon;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>{title}</CardTitle>
        <Icon className="h-4 w-4 text-zinc-400" />
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-semibold text-zinc-950">{value}</p>
        <p className="mt-1 text-sm text-zinc-500">{note}</p>
      </CardContent>
    </Card>
  );
}
