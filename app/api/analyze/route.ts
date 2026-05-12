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

const minimaxBaseUrl = process.env.MINIMAX_API_BASE_URL || "https://api.minimaxi.com/v1";
const minimaxModel = process.env.MINIMAX_MODEL || "MiniMax-M2.7";

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

function extractJsonObject(content: string) {
  const fencedMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const rawContent = fencedMatch?.[1] ?? content;
  const start = rawContent.indexOf("{");
  const end = rawContent.lastIndexOf("}");

  if (start === -1 || end === -1 || end <= start) {
    throw new Error("No JSON object found.");
  }

  return JSON.parse(rawContent.slice(start, end + 1)) as unknown;
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

  const apiKey = process.env.MINIMAX_API_KEY;

  if (!apiKey) {
    return jsonError("MINIMAX_API_KEY is not configured.", 500);
  }

  try {
    const response = await fetch(`${minimaxBaseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: minimaxModel,
        temperature: 0.2,
        max_tokens: 900,
        messages: [
          {
            role: "system",
            content:
              'You are an expert AI content analyst for a SaaS analytics dashboard. Return only valid JSON. Do not include markdown, explanations, or thinking text. The JSON must match this shape: {"summary":"string","sentiment":"Positive|Neutral|Negative","keywords":["string"],"aiScore":0,"riskLevel":"Low|Medium|High","suggestions":["string"]}. Keep aiScore as an integer from 0 to 100. Include 3 to 8 keywords and 3 to 6 practical suggestions.',
          },
          {
            role: "user",
            content: `Analyze this ${contentType}:\n\n${content}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const details = await response.text();
      console.error("MiniMax API error:", details);
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

    const contentText = data.choices?.[0]?.message?.content;

    if (!contentText) {
      return jsonError("AI response did not include analysis content.", 502);
    }

    let parsed: unknown;

    try {
      parsed = extractJsonObject(contentText);
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
