import type {
  AnalysisFormState,
  AnalysisResult,
  SavedAnalysisReport,
} from "@/src/types/analytics";

export const analysisHistoryKey = "ai-content-analytics-history";

function isSavedReport(value: unknown): value is SavedAnalysisReport {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.id === "string" &&
    typeof candidate.title === "string" &&
    typeof candidate.content === "string" &&
    typeof candidate.createdAt === "string" &&
    typeof candidate.result === "object"
  );
}

export function getSavedAnalysisReports(): SavedAnalysisReport[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(analysisHistoryKey);
    const parsed = raw ? (JSON.parse(raw) as unknown) : [];

    return Array.isArray(parsed) ? parsed.filter(isSavedReport) : [];
  } catch {
    return [];
  }
}

export function saveAnalysisReport(
  form: AnalysisFormState,
  result: AnalysisResult,
): SavedAnalysisReport {
  const now = new Date();
  const titleSource = form.content.trim().replace(/\s+/g, " ");
  const report: SavedAnalysisReport = {
    id: `local_${now.getTime()}`,
    title:
      titleSource.length > 58
        ? `${titleSource.slice(0, 58).trim()}...`
        : titleSource || `${form.contentType} analysis`,
    content: form.content.trim(),
    contentType: form.contentType,
    aiScore: result.aiScore,
    sentiment: result.sentiment,
    riskLevel: result.riskLevel,
    createdAt: now.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
    status: result.riskLevel === "High" ? "Flagged" : "Completed",
    result,
  };

  const reports = [report, ...getSavedAnalysisReports()].slice(0, 25);
  window.localStorage.setItem(analysisHistoryKey, JSON.stringify(reports));
  window.dispatchEvent(new Event("analysis-history-updated"));

  return report;
}

export function getSavedAnalysisReport(id: string) {
  return getSavedAnalysisReports().find((report) => report.id === id) ?? null;
}

export function exportAnalysisAsJson(report: SavedAnalysisReport) {
  const blob = new Blob([JSON.stringify(report, null, 2)], {
    type: "application/json",
  });
  downloadBlob(blob, `${report.id}.json`);
}

export function exportAnalysisAsCsv(report: SavedAnalysisReport) {
  const cells = [
    ["Title", report.title],
    ["Content Type", report.contentType],
    ["AI Score", String(report.aiScore)],
    ["Sentiment", report.sentiment],
    ["Risk Level", report.riskLevel],
    ["Created At", report.createdAt],
    ["Summary", report.result.summary],
    ["Keywords", report.result.keywords.join("; ")],
    ["Suggestions", report.result.suggestions.join("; ")],
  ];
  const csv = cells
    .map((row) => row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  downloadBlob(blob, `${report.id}.csv`);
}

function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
  URL.revokeObjectURL(url);
}
