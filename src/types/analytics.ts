import type { LucideIcon } from "lucide-react";

export type Sentiment = "Positive" | "Neutral" | "Negative";

export type RiskLevel = "Low" | "Medium" | "High";

export type ReportStatus = "Completed" | "In Review" | "Flagged";

export type ContentType =
  | "Article"
  | "Social Post"
  | "Comment"
  | "Marketing Copy"
  | "Product Review";

export type KpiMetric = {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: LucideIcon;
};

export type TrendDataPoint = {
  date: string;
  score: number;
};

export type SentimentSegment = {
  name: Sentiment;
  value: number;
  color: string;
};

export type ContentTypeVolume = {
  type: ContentType;
  count: number;
};

export type RecentAnalysisReport = {
  id: string;
  title: string;
  contentType: ContentType;
  aiScore: number;
  sentiment: Sentiment;
  riskLevel: RiskLevel;
  createdAt: string;
  status: ReportStatus;
};
