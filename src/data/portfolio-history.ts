import type { SavedAnalysisReport } from "@/src/types/analytics";

export const portfolioAnalysisHistory: SavedAnalysisReport[] = [
  {
    id: "portfolio_004",
    title: "Enterprise AI launch campaign copy",
    contentType: "Marketing Copy",
    aiScore: 91,
    sentiment: "Positive",
    riskLevel: "Low",
    createdAt: "May 13, 2026",
    status: "Completed",
    content:
      "A launch campaign introducing an AI analytics suite for growth teams, focused on faster content reviews, risk detection, and executive-ready reporting.",
    result: {
      summary:
        "The campaign copy communicates a clear business outcome, strong value proposition, and a confident product positioning for enterprise buyers.",
      sentiment: "Positive",
      keywords: ["AI analytics", "growth teams", "risk detection", "reporting", "content review"],
      aiScore: 91,
      riskLevel: "Low",
      suggestions: [
        "Add one concrete customer metric to make the value proposition more measurable.",
        "Tighten the call to action for a stronger conversion path.",
        "Keep the executive reporting language consistent across channels.",
      ],
    },
  },
  {
    id: "portfolio_003",
    title: "Product review sentiment audit",
    contentType: "Product Review",
    aiScore: 86,
    sentiment: "Positive",
    riskLevel: "Low",
    createdAt: "May 12, 2026",
    status: "Completed",
    content:
      "A set of customer reviews covering onboarding quality, dashboard usability, reporting speed, and support responsiveness.",
    result: {
      summary:
        "Customer feedback is mostly positive, with strong satisfaction around onboarding and dashboard clarity.",
      sentiment: "Positive",
      keywords: ["onboarding", "dashboard usability", "support", "reporting speed"],
      aiScore: 86,
      riskLevel: "Low",
      suggestions: [
        "Highlight onboarding feedback in sales enablement material.",
        "Track reporting speed comments over the next release cycle.",
        "Convert support praise into a short testimonial snippet.",
      ],
    },
  },
  {
    id: "portfolio_002",
    title: "Social launch thread quality review",
    contentType: "Social Post",
    aiScore: 74,
    sentiment: "Neutral",
    riskLevel: "Medium",
    createdAt: "May 11, 2026",
    status: "In Review",
    content:
      "A social media launch thread announcing new AI content intelligence features with multiple product claims and technical positioning.",
    result: {
      summary:
        "The social thread has useful product details but needs sharper structure and clearer proof points before publishing.",
      sentiment: "Neutral",
      keywords: ["social launch", "product claims", "AI content", "feature release"],
      aiScore: 74,
      riskLevel: "Medium",
      suggestions: [
        "Lead with the business problem before listing product capabilities.",
        "Replace broad claims with a specific workflow example.",
        "Reduce repeated phrasing across the thread.",
      ],
    },
  },
  {
    id: "portfolio_001",
    title: "Community feedback risk scan",
    contentType: "Comment",
    aiScore: 63,
    sentiment: "Negative",
    riskLevel: "High",
    createdAt: "May 10, 2026",
    status: "Flagged",
    content:
      "A collection of community comments raising concerns about unclear pricing, confusing trial limits, and delayed response times.",
    result: {
      summary:
        "The comments indicate frustration around pricing transparency and support expectations, making this content useful for risk review.",
      sentiment: "Negative",
      keywords: ["pricing", "trial limits", "support delay", "customer frustration"],
      aiScore: 63,
      riskLevel: "High",
      suggestions: [
        "Clarify trial limits in product onboarding copy.",
        "Escalate repeated pricing concerns to the product marketing team.",
        "Prepare a response template for support-related comments.",
      ],
    },
  },
];
