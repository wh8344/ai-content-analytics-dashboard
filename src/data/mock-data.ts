import {
  Activity,
  AlertTriangle,
  Gauge,
  MessageSquareText,
} from "lucide-react";
import type {
  ContentTypeVolume,
  KpiMetric,
  RecentAnalysisReport,
  SentimentSegment,
  TrendDataPoint,
} from "@/src/types/analytics";

export const kpiMetrics: KpiMetric[] = [
  {
    title: "Total Analyzed Content",
    value: "18,420",
    change: "+12.8% vs last month",
    trend: "up",
    icon: MessageSquareText,
  },
  {
    title: "Average AI Score",
    value: "84.6",
    change: "+4.2 quality lift",
    trend: "up",
    icon: Gauge,
  },
  {
    title: "Positive Sentiment Rate",
    value: "71.3%",
    change: "+8.1% from previous batch",
    trend: "up",
    icon: Activity,
  },
  {
    title: "High Risk Content",
    value: "126",
    change: "-18.4% unresolved risk",
    trend: "down",
    icon: AlertTriangle,
  },
];

export const aiScoreTrend: TrendDataPoint[] = [
  { date: "Jan", score: 72 },
  { date: "Feb", score: 75 },
  { date: "Mar", score: 78 },
  { date: "Apr", score: 76 },
  { date: "May", score: 81 },
  { date: "Jun", score: 84 },
  { date: "Jul", score: 83 },
  { date: "Aug", score: 86 },
  { date: "Sep", score: 88 },
  { date: "Oct", score: 87 },
  { date: "Nov", score: 90 },
  { date: "Dec", score: 92 },
];

export const sentimentDistribution: SentimentSegment[] = [
  { name: "Positive", value: 71, color: "#10b981" },
  { name: "Neutral", value: 20, color: "#64748b" },
  { name: "Negative", value: 9, color: "#f97316" },
];

export const contentTypeVolumes: ContentTypeVolume[] = [
  { type: "Article", count: 4280 },
  { type: "Social Post", count: 5120 },
  { type: "Comment", count: 3880 },
  { type: "Marketing Copy", count: 2140 },
  { type: "Product Review", count: 3000 },
];

export const recentAnalysisReports: RecentAnalysisReport[] = [
  {
    id: "rep_001",
    title: "Q4 product review sentiment audit",
    contentType: "Product Review",
    aiScore: 91,
    sentiment: "Positive",
    riskLevel: "Low",
    createdAt: "Dec 12, 2026",
    status: "Completed",
  },
  {
    id: "rep_002",
    title: "Enterprise landing page conversion copy",
    contentType: "Marketing Copy",
    aiScore: 86,
    sentiment: "Positive",
    riskLevel: "Medium",
    createdAt: "Dec 11, 2026",
    status: "In Review",
  },
  {
    id: "rep_003",
    title: "Launch announcement social thread",
    contentType: "Social Post",
    aiScore: 79,
    sentiment: "Neutral",
    riskLevel: "Low",
    createdAt: "Dec 10, 2026",
    status: "Completed",
  },
  {
    id: "rep_004",
    title: "Community feedback comment export",
    contentType: "Comment",
    aiScore: 64,
    sentiment: "Negative",
    riskLevel: "High",
    createdAt: "Dec 09, 2026",
    status: "Flagged",
  },
  {
    id: "rep_005",
    title: "AI workflow thought leadership article",
    contentType: "Article",
    aiScore: 88,
    sentiment: "Positive",
    riskLevel: "Low",
    createdAt: "Dec 08, 2026",
    status: "Completed",
  },
];
