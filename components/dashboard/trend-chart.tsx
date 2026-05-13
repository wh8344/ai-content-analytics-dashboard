"use client";

import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TrendDataPoint } from "@/src/types/analytics";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function TrendChart({ data }: { data: TrendDataPoint[] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Card className="min-h-[360px] min-w-0 overflow-hidden">
      <CardHeader>
        <CardTitle>AI Score Over Time</CardTitle>
        <CardDescription>Average content quality score across analyzed assets.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          {mounted ? (
            <ResponsiveContainer height="100%" width="100%">
              <LineChart data={data} margin={{ left: -16, right: 8, top: 8 }}>
                <CartesianGrid stroke="#e4e4e7" strokeDasharray="4 4" vertical={false} />
                <XAxis
                  axisLine={false}
                  dataKey="date"
                  tick={{ fill: "#71717a", fontSize: 12 }}
                  tickLine={false}
                />
                <YAxis
                  axisLine={false}
                  domain={[0, 100]}
                  tick={{ fill: "#71717a", fontSize: 12 }}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    border: "1px solid #e4e4e7",
                    borderRadius: 8,
                    boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
                  }}
                />
                <Line
                  activeDot={{ r: 5, strokeWidth: 0 }}
                  dataKey="score"
                  dot={false}
                  stroke="#2563eb"
                  strokeWidth={3}
                  type="monotone"
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full rounded-md bg-zinc-50" />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
