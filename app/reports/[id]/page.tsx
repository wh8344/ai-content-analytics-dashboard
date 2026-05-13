import type { Metadata } from "next";
import { ReportDetail } from "@/components/reports/report-detail";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `Report ${id}`,
    description: "Review a saved AI analysis report, including score, sentiment, risk, and export actions.",
  };
}

export default async function ReportDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <ReportDetail id={id} />;
}
