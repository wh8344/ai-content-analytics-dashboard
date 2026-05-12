"use client";

import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { SentimentSegment } from "@/src/types/analytics";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function SentimentChart({ data }: { data: SentimentSegment[] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Card className="min-h-[360px]">
      <CardHeader>
        <CardTitle>Sentiment Mix</CardTitle>
        <CardDescription>Distribution of analyzed content sentiment.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-52">
          {mounted ? (
            <ResponsiveContainer height="100%" width="100%">
              <PieChart>
                <Tooltip
                  contentStyle={{
                    border: "1px solid #e4e4e7",
                    borderRadius: 8,
                    boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
                  }}
                />
                <Pie
                  cx="50%"
                  cy="50%"
                  data={data}
                  dataKey="value"
                  innerRadius={54}
                  outerRadius={82}
                  paddingAngle={3}
                  strokeWidth={0}
                >
                  {data.map((entry) => (
                    <Cell fill={entry.color} key={entry.name} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full rounded-md bg-zinc-50" />
          )}
        </div>
        <div className="mt-2 grid gap-2">
          {data.map((item) => (
            <div className="flex items-center justify-between text-sm" key={item.name}>
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="font-medium text-zinc-700">{item.name}</span>
              </div>
              <span className="text-zinc-500">{item.value}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
