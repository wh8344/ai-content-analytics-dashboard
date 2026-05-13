import { NextResponse } from "next/server";
import { createConfiguredAiProvider, getConfiguredProviderName } from "@/src/lib/ai-provider";
import type { ContentType } from "@/src/types/analytics";

const contentTypes: ContentType[] = [
  "Article",
  "Social Post",
  "Comment",
  "Marketing Copy",
  "Product Review",
];

function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

function isContentType(value: unknown): value is ContentType {
  return typeof value === "string" && contentTypes.includes(value as ContentType);
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

  try {
    const providerName = getConfiguredProviderName();
    const provider = createConfiguredAiProvider();
    const result = await provider.analyzeContent({ content, contentType });
    return NextResponse.json({ provider: providerName, result });
  } catch (error) {
    console.error("Analyze route error:", error);
    const message =
      error instanceof Error
        ? error.message
        : "Unexpected server error while analyzing content.";
    const status = message.includes("not configured") ? 500 : 502;
    return jsonError(message, status);
  }
}
