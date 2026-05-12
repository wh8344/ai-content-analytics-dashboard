import {
  Activity,
  AlertTriangle,
  Gauge,
  MessageSquareText,
} from "lucide-react";
import type {
  AiInsight,
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

export const aiInsights: AiInsight[] = [
  {
    id: "ins_001",
    title: "Clarify proof points in conversion pages",
    description:
      "High-performing copy consistently includes concrete evidence, customer outcomes, and measurable claims above the fold.",
    category: "AI Recommendations",
    priority: "High",
    createdAt: "Dec 12, 2026",
  },
  {
    id: "ins_002",
    title: "Automation workflow topics are gaining traction",
    description:
      "Articles covering reporting automation and review quality generated the strongest average AI score this month.",
    category: "Top Performing Topics",
    priority: "Medium",
    createdAt: "Dec 12, 2026",
  },
  {
    id: "ins_003",
    title: "Audience sentiment remains positive but more cautious",
    description:
      "Positive sentiment is stable, while neutral responses increased around pricing, implementation effort, and data quality.",
    category: "Audience Sentiment Trends",
    priority: "Medium",
    createdAt: "Dec 11, 2026",
  },
  {
    id: "ins_004",
    title: "Risk language detected in two marketing claims",
    description:
      "Several campaign snippets use broad guarantee-style language that should be reviewed before publishing.",
    category: "Content Risk Alerts",
    priority: "High",
    createdAt: "Dec 11, 2026",
  },
  {
    id: "ins_005",
    title: "Improve introductions for long-form articles",
    description:
      "Long-form content scores higher when the opening paragraph states audience, problem, and promised outcome clearly.",
    category: "Content Improvement Opportunities",
    priority: "Low",
    createdAt: "Dec 10, 2026",
  },
  {
    id: "ins_006",
    title: "Product reviews need stronger feature clustering",
    description:
      "Review summaries become more actionable when feature feedback is grouped by reliability, support, pricing, and usability.",
    category: "AI Recommendations",
    priority: "Medium",
    createdAt: "Dec 10, 2026",
  },
  {
    id: "ins_007",
    title: "Social post hooks outperform generic announcements",
    description:
      "Posts that begin with a pain point or benchmark outperform product-first announcements across engagement indicators.",
    category: "Top Performing Topics",
    priority: "Medium",
    createdAt: "Dec 09, 2026",
  },
  {
    id: "ins_008",
    title: "Negative comments cluster around onboarding friction",
    description:
      "Flagged comments mention setup effort and unclear next steps, suggesting a documentation and onboarding opportunity.",
    category: "Content Risk Alerts",
    priority: "High",
    createdAt: "Dec 09, 2026",
  },
];
