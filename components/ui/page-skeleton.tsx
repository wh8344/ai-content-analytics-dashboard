import { Card, CardContent } from "@/components/ui/card";

export function PageSkeleton({
  charts = 2,
  metrics = 4,
}: {
  charts?: number;
  metrics?: number;
}) {
  return (
    <div className="space-y-5 animate-fade-up">
      <div className="space-y-3">
        <div className="h-3 w-32 rounded-full bg-zinc-200 animate-pulse-soft" />
        <div className="h-8 w-72 rounded-full bg-zinc-200 animate-pulse-soft" />
        <div className="h-4 w-full max-w-2xl rounded-full bg-zinc-100 animate-pulse-soft" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: metrics }).map((_, index) => (
          <Card key={`metric-${index}`}>
            <CardContent className="p-5">
              <div className="h-4 w-28 rounded-full bg-zinc-100 animate-pulse-soft" />
              <div className="mt-4 h-8 w-20 rounded-full bg-zinc-100 animate-pulse-soft" />
              <div className="mt-5 h-6 w-36 rounded-full bg-zinc-100 animate-pulse-soft" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {Array.from({ length: charts }).map((_, index) => (
          <Card className="min-h-[320px]" key={`chart-${index}`}>
            <CardContent className="p-6">
              <div className="h-5 w-40 rounded-full bg-zinc-100 animate-pulse-soft" />
              <div className="mt-6 h-56 rounded-xl bg-zinc-50 animate-pulse-soft" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
