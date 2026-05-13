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

export function ContentTypeChart({ data }: { data: ContentTypeVolume[] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Card className="min-h-[360px]">
      <CardHeader>
        <CardTitle>Content Type Volume</CardTitle>
        <CardDescription>Analyzed content grouped by source format.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="h-64 min-w-[680px]">
            {mounted ? (
              <ResponsiveContainer height="100%" width="100%">
                <BarChart data={data} margin={{ left: -12, right: 4, top: 8 }}>
                  <CartesianGrid stroke="#e4e4e7" strokeDasharray="4 4" vertical={false} />
                  <XAxis
                    axisLine={false}
                    dataKey="type"
                    interval={0}
                    tick={{ fill: "#71717a", fontSize: 11 }}
                    tickLine={false}
                  />
                  <YAxis
                    axisLine={false}
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
                  <Bar dataKey="count" fill="#18181b" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full rounded-md bg-zinc-50" />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
