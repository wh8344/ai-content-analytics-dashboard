import { NextResponse } from "next/server";
import type { AnalysisResult, ContentType, RiskLevel, Sentiment } from "@/src/types/analytics";

const contentTypes: ContentType[] = [
  "Article",
  "Social Post",
  "Comment",
  "Marketing Copy",
  "Product Review",
];

const sentiments: Sentiment[] = ["Positive", "Neutral", "Negative"];
const riskLevels: RiskLevel[] = ["Low", "Medium", "High"];

const analysisSchema = {
  name: "content_analysis",
  strict: true,
  schema: {
    type: "object",
    additionalProperties: false,
    properties: {
      summary: {
        type: "string",
        description: "A concise business-friendly summary of the content.",
      },
      sentiment: {
        type: "string",
        enum: sentiments,
      },
      keywords: {
        type: "array",
        items: { type: "string" },
        minItems: 3,
        maxItems: 8,
      },
      aiScore: {
        type: "integer",
        minimum: 0,
        maximum: 100,
      },
      riskLevel: {
        type: "string",
        enum: riskLevels,
      },
      suggestions: {
        type: "array",
        items: { type: "string" },
        minItems: 3,
        maxItems: 6,
      },
    },
    required: ["summary", "sentiment", "keywords", "aiScore", "riskLevel", "suggestions"],
  },
};

function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

function isContentType(value: unknown): value is ContentType {
  return typeof value === "string" && contentTypes.includes(value as ContentType);
}

function isSentiment(value: unknown): value is Sentiment {
  return typeof value === "string" && sentiments.includes(value as Sentiment);
}

function isRiskLevel(value: unknown): value is RiskLevel {
  return typeof value === "string" && riskLevels.includes(value as RiskLevel);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isAnalysisResult(value: unknown): value is AnalysisResult {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.summary === "string" &&
    isSentiment(candidate.sentiment) &&
    isStringArray(candidate.keywords) &&
    Number.isInteger(candidate.aiScore) &&
    Number(candidate.aiScore) >= 0 &&
    Number(candidate.aiScore) <= 100 &&
    isRiskLevel(candidate.riskLevel) &&
    isStringArray(candidate.suggestions)
  );
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return jsonError("Invalid JSON request body.");
  }

  const payload = body as Record<string, unknown>;
  const content = typeof payload.content === "string" ? payload.content.trim() : "";
  const contentType = payload.contentType;

  if (!content) {
    return jsonError("Content is required.");
  }

  if (content.length < 20) {
    return jsonError("Content must be at least 20 characters.");
  }

  if (!isContentType(contentType)) {
    return jsonError("A valid content type is required.");
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return jsonError("OPENAI_API_KEY is not configured.", 500);
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.2,
        messages: [
          {
            role: "system",
            content:
              "You are an expert AI content analyst for a SaaS analytics dashboard. Return only structured JSON that matches the schema. Evaluate content quality, sentiment, keywords, business risk, and practical improvement suggestions.",
          },
          {
            role: "user",
            content: `Analyze this ${contentType}:\n\n${content}`,
          },
        ],
        response_format: {
          type: "json_schema",
          json_schema: analysisSchema,
        },
      }),
    });

    if (!response.ok) {
      const details = await response.text();
      console.error("OpenAI API error:", details);
      return jsonError("AI analysis request failed. Please try again.", 502);
    }

    const data = (await response.json()) as {
      choices?: Array<{
        message?: {
          content?: string | null;
          refusal?: string | null;
        };
      }>;
    };

    const message = data.choices?.[0]?.message;

    if (message?.refusal) {
      return jsonError("The AI model refused to analyze this content.", 422);
    }

    if (!message?.content) {
      return jsonError("AI response did not include analysis content.", 502);
    }

    let parsed: unknown;

    try {
      parsed = JSON.parse(message.content);
    } catch {
      return jsonError("AI response was not valid JSON.", 502);
    }

    if (!isAnalysisResult(parsed)) {
      return jsonError("AI response did not match the expected analysis format.", 502);
    }

    return NextResponse.json({ result: parsed });
  } catch (error) {
    console.error("Analyze route error:", error);
    return jsonError("Unexpected server error while analyzing content.", 500);
  }
}
