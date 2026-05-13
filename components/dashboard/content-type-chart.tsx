"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ContentTypeVolume } from "@/src/types/analytics";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const shortTypeLabels: Record<string, string> = {
  Article: "Article",
  "Social Post": "Social",
  Comment: "Comment",
  "Marketing Copy": "Marketing",
  "Product Review": "Review",
};

export function ContentTypeChart({ data }: { data: ContentTypeVolume[] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Card className="min-h-[360px] min-w-0 overflow-hidden">
      <CardHeader>
        <CardTitle>Content Type Volume</CardTitle>
        <CardDescription>Analyzed content grouped by source format.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          {mounted ? (
            <ResponsiveContainer height="100%" width="100%">
              <BarChart data={data} margin={{ bottom: 8, left: -16, right: 0, top: 8 }}>
                <CartesianGrid stroke="#e4e4e7" strokeDasharray="4 4" vertical={false} />
                <XAxis
                  axisLine={false}
                  dataKey="type"
                  interval={0}
                  minTickGap={0}
                  tick={{ fill: "#71717a", fontSize: 11 }}
                  tickFormatter={(value: string) => shortTypeLabels[value] ?? value}
                  tickLine={false}
                />
                <YAxis
                  allowDecimals={false}
                  axisLine={false}
                  tick={{ fill: "#71717a", fontSize: 12 }}
                  tickLine={false}
                  width={32}
                />
                <Tooltip
                  contentStyle={{
                    border: "1px solid #e4e4e7",
                    borderRadius: 8,
                    boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
                  }}
                />
                <Bar dataKey="count" fill="#18181b" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full rounded-md bg-zinc-50" />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
