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

function emitHistoryUpdate() {
  window.dispatchEvent(new Event("analysis-history-updated"));
}

function writeAnalysisHistory(reports: SavedAnalysisReport[]) {
  window.localStorage.setItem(analysisHistoryKey, JSON.stringify(reports));
  emitHistoryUpdate();
}

export function getAnalysisHistory(): SavedAnalysisReport[] {
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

export function saveAnalysisResult(
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

  const reports = [report, ...getAnalysisHistory()].slice(0, 25);
  writeAnalysisHistory(reports);

  return report;
}

export function getAnalysisById(id: string) {
  return getAnalysisHistory().find((report) => report.id === id) ?? null;
}

export function deleteAnalysisById(id: string) {
  if (typeof window === "undefined") {
    return false;
  }

  const reports = getAnalysisHistory();
  const nextReports = reports.filter((report) => report.id !== id);
  const didDelete = nextReports.length !== reports.length;
  writeAnalysisHistory(nextReports);

  return didDelete;
}

export function clearAnalysisHistory() {
  if (typeof window === "undefined") {
    return;
  }

  writeAnalysisHistory([]);
}

export const getSavedAnalysisReports = getAnalysisHistory;
export const saveAnalysisReport = saveAnalysisResult;
export const getSavedAnalysisReport = getAnalysisById;

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
