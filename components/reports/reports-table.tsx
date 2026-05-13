"use client";

import { Eye, Search, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type {
  ContentType,
  RecentAnalysisReport,
  RiskLevel,
  Sentiment,
} from "@/src/types/analytics";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { cn } from "@/lib/utils";
import {
  clearAnalysisHistory,
  deleteAnalysisById,
  getAnalysisHistory,
} from "@/src/lib/analysis-history";

type ContentTypeFilter = ContentType | "All";
type SentimentFilter = Sentiment | "All";
type RiskFilter = RiskLevel | "All";

const contentTypeOptions: ContentTypeFilter[] = [
  "All",
  "Article",
  "Social Post",
  "Comment",
  "Marketing Copy",
  "Product Review",
];

const sentimentOptions: SentimentFilter[] = ["All", "Positive", "Neutral", "Negative"];

const riskOptions: RiskFilter[] = ["All", "Low", "Medium", "High"];

const sentimentStyles: Record<Sentiment, string> = {
  Positive: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
  Neutral: "bg-slate-100 text-slate-700 ring-slate-600/15",
  Negative: "bg-orange-50 text-orange-700 ring-orange-600/15",
};

const riskStyles: Record<RiskLevel, string> = {
  Low: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
  Medium: "bg-amber-50 text-amber-700 ring-amber-600/15",
  High: "bg-red-50 text-red-700 ring-red-600/15",
};

function Badge({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <span className={cn("inline-flex rounded-md px-2 py-1 text-xs font-medium ring-1", className)}>
      {children}
    </span>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="text-xs font-medium text-zinc-500">
      {label}
      <select
        className="mt-2 h-9 w-full rounded-md border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-800 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export function ReportsTable({ reports = [] }: { reports?: RecentAnalysisReport[] }) {
  const [savedReports, setSavedReports] = useState<RecentAnalysisReport[] | null>(null);
  const [query, setQuery] = useState("");
  const [contentType, setContentType] = useState<ContentTypeFilter>("All");
  const [sentiment, setSentiment] = useState<SentimentFilter>("All");
  const [riskLevel, setRiskLevel] = useState<RiskFilter>("All");

  useEffect(() => {
    function syncReports() {
      setSavedReports(getAnalysisHistory());
    }

    syncReports();
    window.addEventListener("storage", syncReports);
    window.addEventListener("analysis-history-updated", syncReports);

    return () => {
      window.removeEventListener("storage", syncReports);
      window.removeEventListener("analysis-history-updated", syncReports);
    };
  }, []);

  const allReports = useMemo(() => [...(savedReports ?? []), ...reports], [reports, savedReports]);

  const filteredReports = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return allReports.filter((report) => {
      const matchesSearch =
        normalizedQuery.length === 0 ||
        report.title.toLowerCase().includes(normalizedQuery) ||
        report.contentType.toLowerCase().includes(normalizedQuery) ||
        report.status.toLowerCase().includes(normalizedQuery);
      const matchesContentType = contentType === "All" || report.contentType === contentType;
      const matchesSentiment = sentiment === "All" || report.sentiment === sentiment;
      const matchesRisk = riskLevel === "All" || report.riskLevel === riskLevel;

      return matchesSearch && matchesContentType && matchesSentiment && matchesRisk;
    });
  }, [allReports, contentType, query, riskLevel, sentiment]);

  function handleDeleteReport(report: RecentAnalysisReport) {
    const confirmed = window.confirm(`Delete "${report.title}" from analysis history?`);

    if (!confirmed) {
      return;
    }

    deleteAnalysisById(report.id);
  }

  function handleClearAll() {
    const confirmed = window.confirm(
      "Clear all saved analysis history? This will remove reports from Dashboard, Reports, and Insights.",
    );

    if (!confirmed) {
      return;
    }

    clearAnalysisHistory();
    setQuery("");
    setContentType("All");
    setSentiment("All");
    setRiskLevel("All");
  }

  if (savedReports === null) {
    return <PageSkeleton charts={1} metrics={2} />;
  }

  return (
    <Card className="animate-fade-up">
      <CardHeader className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle>Historical Analysis Reports</CardTitle>
            <CardDescription>
              Search and filter completed AI content analysis records.
            </CardDescription>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-zinc-500">
              {filteredReports.length} of {allReports.length} reports
            </span>
            {allReports.length > 0 ? (
              <Button onClick={handleClearAll} size="sm" type="button" variant="outline">
                <Trash2 className="h-4 w-4" />
                Clear All
              </Button>
            ) : null}
          </div>
        </div>

        <div className="grid gap-3 lg:grid-cols-[minmax(240px,1fr)_180px_160px_140px]">
          <div>
            <label className="text-xs font-medium text-zinc-500" htmlFor="report-search">
              Search
            </label>
            <div className="mt-2 flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-3 shadow-sm">
              <Search className="h-4 w-4 text-zinc-400" />
              <Input
                className="border-0 px-0 shadow-none focus:border-0 focus:ring-0"
                id="report-search"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by title, type, or status"
                value={query}
              />
            </div>
          </div>
          <FilterSelect
            label="Content Type"
            onChange={(value) => setContentType(value as ContentTypeFilter)}
            options={contentTypeOptions}
            value={contentType}
          />
          <FilterSelect
            label="Sentiment"
            onChange={(value) => setSentiment(value as SentimentFilter)}
            options={sentimentOptions}
            value={sentiment}
          />
          <FilterSelect
            label="Risk Level"
            onChange={(value) => setRiskLevel(value as RiskFilter)}
            options={riskOptions}
            value={riskLevel}
          />
        </div>
      </CardHeader>
      <CardContent>
        {filteredReports.length === 0 ? (
          allReports.length === 0 ? (
            <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50 px-5 py-12 text-center">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl border border-zinc-200 bg-white text-[var(--accent)]">
                <Search className="h-5 w-5" />
              </div>
              <p className="mt-4 text-sm font-semibold text-zinc-950">No saved reports yet</p>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">
                Saved reports will appear here after you run content analyses. This archive powers the dashboard trends and insight recommendations.
              </p>
              <Link
                className="mt-5 inline-flex h-10 items-center justify-center rounded-lg bg-zinc-950 px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
                href="/analyze"
              >
                Analyze Content
              </Link>
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50 px-5 py-12 text-center">
              <p className="text-sm font-semibold text-zinc-950">No reports match these filters</p>
              <p className="mt-2 text-sm text-zinc-500">
                Adjust the search query or filters to view historical analysis reports.
              </p>
            </div>
          )
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1020px] border-separate border-spacing-0 text-left text-sm">
              <thead>
                <tr className="text-xs uppercase text-zinc-500">
                  <th className="border-b border-zinc-200 pb-3 font-medium">Title</th>
                  <th className="border-b border-zinc-200 pb-3 font-medium">Content Type</th>
                  <th className="border-b border-zinc-200 pb-3 font-medium">AI Score</th>
                  <th className="border-b border-zinc-200 pb-3 font-medium">Sentiment</th>
                  <th className="border-b border-zinc-200 pb-3 font-medium">Risk Level</th>
                  <th className="border-b border-zinc-200 pb-3 font-medium">Created At</th>
                  <th className="border-b border-zinc-200 pb-3 font-medium">Status</th>
                  <th className="border-b border-zinc-200 pb-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map((report) => (
                  <tr className="text-zinc-700" key={report.id}>
                    <td className="border-b border-zinc-100 py-4 pr-4">
                      <p className="font-medium text-zinc-950">{report.title}</p>
                    </td>
                    <td className="border-b border-zinc-100 py-4 pr-4">{report.contentType}</td>
                    <td className="border-b border-zinc-100 py-4 pr-4">
                      <span className="font-semibold text-zinc-950">{report.aiScore}</span>
                    </td>
                    <td className="border-b border-zinc-100 py-4 pr-4">
                      <Badge className={sentimentStyles[report.sentiment]}>{report.sentiment}</Badge>
                    </td>
                    <td className="border-b border-zinc-100 py-4 pr-4">
                      <Badge className={riskStyles[report.riskLevel]}>{report.riskLevel}</Badge>
                    </td>
                    <td className="border-b border-zinc-100 py-4 pr-4 text-zinc-500">
                      {report.createdAt}
                    </td>
                    <td className="border-b border-zinc-100 py-4 pr-4">{report.status}</td>
                    <td className="border-b border-zinc-100 py-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <Link
                          className="inline-flex h-8 items-center justify-center gap-2 rounded-md border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50"
                          href={`/reports/${report.id}`}
                        >
                          <Eye className="h-4 w-4" />
                          View
                        </Link>
                        <button
                          className="inline-flex h-8 items-center justify-center gap-2 rounded-md border border-red-200 bg-white px-3 text-sm font-medium text-red-700 transition-colors hover:bg-red-50"
                          onClick={() => handleDeleteReport(report)}
                          type="button"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
