import type { AnalysisResult, ContentType } from "@/src/types/analytics";

export type AnalyzeContentInput = {
  content: string;
  contentType: ContentType;
};

export type AiProvider = {
  analyzeContent(input: AnalyzeContentInput): Promise<AnalysisResult>;
};

type MiniMaxChatResponse = {
  choices?: Array<{
    message?: {
      content?: string | null;
    };
  }>;
};

type OpenAiChatResponse = MiniMaxChatResponse;

export type AiProviderName = "minimax" | "openai";

const sentiments = ["Positive", "Neutral", "Negative"] as const;
const riskLevels = ["Low", "Medium", "High"] as const;
const analysisSystemPrompt =
  'You are an expert AI content analyst for a SaaS analytics dashboard. Return only valid JSON. Do not include markdown, explanations, or thinking text. The JSON must match this shape: {"summary":"string","sentiment":"Positive|Neutral|Negative","keywords":["string"],"aiScore":0,"riskLevel":"Low|Medium|High","suggestions":["string"]}. Keep aiScore as an integer from 0 to 100. Include 3 to 8 keywords and 3 to 6 practical suggestions.';

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

export function isAnalysisResult(value: unknown): value is AnalysisResult {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.summary === "string" &&
    typeof candidate.sentiment === "string" &&
    sentiments.includes(candidate.sentiment as (typeof sentiments)[number]) &&
    isStringArray(candidate.keywords) &&
    Number.isInteger(candidate.aiScore) &&
    Number(candidate.aiScore) >= 0 &&
    Number(candidate.aiScore) <= 100 &&
    typeof candidate.riskLevel === "string" &&
    riskLevels.includes(candidate.riskLevel as (typeof riskLevels)[number]) &&
    isStringArray(candidate.suggestions)
  );
}

function extractJsonObject(content: string) {
  const fencedMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const rawContent = fencedMatch?.[1] ?? content;
  const start = rawContent.indexOf("{");
  const end = rawContent.lastIndexOf("}");

  if (start === -1 || end === -1 || end <= start) {
    throw new Error("AI response did not include a JSON object.");
  }

  return JSON.parse(rawContent.slice(start, end + 1)) as unknown;
}

function getMiniMaxConfig() {
  const apiKey = process.env.MINIMAX_API_KEY;

  if (!apiKey) {
    throw new Error("MINIMAX_API_KEY is not configured.");
  }

  return {
    apiKey,
    baseUrl: process.env.MINIMAX_API_BASE_URL || "https://api.minimaxi.com/v1",
    model: process.env.MINIMAX_MODEL || "MiniMax-M2.7",
  };
}

function getOpenAiConfig() {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured.");
  }

  return {
    apiKey,
    baseUrl: process.env.OPENAI_API_BASE_URL || "https://api.openai.com/v1",
    model: process.env.OPENAI_MODEL || "gpt-4o-mini",
  };
}

export function createMiniMaxProvider(): AiProvider {
  return {
    async analyzeContent({ content, contentType }) {
      const { apiKey, baseUrl, model } = getMiniMaxConfig();
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 30000);

      try {
        const response = await fetch(`${baseUrl}/chat/completions`, {
          method: "POST",
          signal: controller.signal,
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model,
            temperature: 0.2,
            max_tokens: 900,
            messages: [
              {
                role: "system",
                content: analysisSystemPrompt,
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
          throw new Error(`MiniMax request failed with status ${response.status}.`);
        }

        const data = (await response.json()) as MiniMaxChatResponse;
        const contentText = data.choices?.[0]?.message?.content;

        if (!contentText) {
          throw new Error("MiniMax returned an empty response.");
        }

        const parsed = extractJsonObject(contentText);

        if (!isAnalysisResult(parsed)) {
          throw new Error("MiniMax response did not match the expected analysis format.");
        }

        return parsed;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          throw new Error("MiniMax request timed out. Please try again.");
        }

        if (error instanceof SyntaxError) {
          throw new Error("MiniMax returned invalid JSON. Please retry the analysis.");
        }

        throw error;
      } finally {
        clearTimeout(timeout);
      }
    },
  };
}

export function createOpenAiProvider(): AiProvider {
  return {
    async analyzeContent({ content, contentType }) {
      const { apiKey, baseUrl, model } = getOpenAiConfig();
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 30000);

      try {
        const response = await fetch(`${baseUrl}/chat/completions`, {
          method: "POST",
          signal: controller.signal,
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model,
            temperature: 0.2,
            max_tokens: 900,
            messages: [
              {
                role: "system",
                content: analysisSystemPrompt,
              },
              {
                role: "user",
                content: `Analyze this ${contentType}:\n\n${content}`,
              },
            ],
            response_format: { type: "json_object" },
          }),
        });

        if (!response.ok) {
          const details = await response.text();
          console.error("OpenAI API error:", details);
          throw new Error(`OpenAI request failed with status ${response.status}.`);
        }

        const data = (await response.json()) as OpenAiChatResponse;
        const contentText = data.choices?.[0]?.message?.content;

        if (!contentText) {
          throw new Error("OpenAI returned an empty response.");
        }

        const parsed = extractJsonObject(contentText);

        if (!isAnalysisResult(parsed)) {
          throw new Error("OpenAI response did not match the expected analysis format.");
        }

        return parsed;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          throw new Error("OpenAI request timed out. Please try again.");
        }

        if (error instanceof SyntaxError) {
          throw new Error("OpenAI returned invalid JSON. Please retry the analysis.");
        }

        throw error;
      } finally {
        clearTimeout(timeout);
      }
    },
  };
}

export function getConfiguredProviderName(): AiProviderName {
  const provider = process.env.AI_PROVIDER?.toLowerCase();

  if (provider === "openai" || provider === "minimax") {
    return provider;
  }

  return "minimax";
}

export function createConfiguredAiProvider(): AiProvider {
  const provider = getConfiguredProviderName();

  if (provider === "openai") {
    return createOpenAiProvider();
  }

  return createMiniMaxProvider();
}
