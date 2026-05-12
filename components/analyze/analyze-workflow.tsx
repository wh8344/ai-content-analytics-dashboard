"use client";

import { useState } from "react";
import { AlertTriangle, BrainCircuit, FileSearch, ScanLine } from "lucide-react";
import type {
  AnalysisFormState,
  AnalysisResult,
  ContentType,
} from "@/src/types/analytics";
import { AnalysisForm } from "@/components/analyze/analysis-form";
import { AnalysisResultCard } from "@/components/analyze/analysis-result-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const initialForm: AnalysisFormState = {
  content: "",
  contentType: "Article",
};

const keywordMap: Record<ContentType, string[]> = {
  Article: ["narrative clarity", "authority", "search intent", "structure"],
  "Social Post": ["engagement", "hook", "audience tone", "shareability"],
  Comment: ["customer friction", "sentiment signal", "support context", "urgency"],
  "Marketing Copy": ["conversion", "positioning", "claim strength", "CTA clarity"],
  "Product Review": ["product quality", "purchase intent", "trust signal", "feature feedback"],
};

const scoreMap: Record<ContentType, number> = {
  Article: 86,
  "Social Post": 81,
  Comment: 74,
  "Marketing Copy": 88,
  "Product Review": 83,
};

function createMockResult(form: AnalysisFormState): AnalysisResult {
  const trimmedContent = form.content.trim();
  const isRisky = /refund|angry|misleading|complaint|broken|legal/i.test(trimmedContent);
  const isPositive = /love|great|excellent|fast|helpful|clear|improved/i.test(trimmedContent);

  return {
    summary: `This ${form.contentType.toLowerCase()} shows a clear central message with enough context for AI-assisted evaluation. The content is readable, commercially usable, and includes signals that can be converted into content quality, sentiment, and risk insights.`,
    sentiment: isRisky ? "Negative" : isPositive ? "Positive" : "Neutral",
    keywords: keywordMap[form.contentType],
    aiScore: isRisky ? Math.max(scoreMap[form.contentType] - 18, 52) : scoreMap[form.contentType],
    riskLevel: isRisky ? "High" : form.contentType === "Marketing Copy" ? "Medium" : "Low",
    suggestions: [
      "Clarify the primary audience and make the opening message more specific.",
      "Add stronger evidence or examples to support the main claim.",
      "Reduce ambiguous wording so the content feels more trustworthy and measurable.",
      "End with a sharper next step that matches the user's intent.",
    ],
  };
}

function AnalysisSignalsPanel({ isLoading }: { isLoading: boolean }) {
  const signals = [
    { label: "Content quality scoring", icon: BrainCircuit },
    { label: "Sentiment classification", icon: ScanLine },
    { label: "Keyword extraction", icon: FileSearch },
    { label: "Risk signal detection", icon: AlertTriangle },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isLoading ? "Analyzing Content" : "Analysis Signals"}</CardTitle>
        <CardDescription>
          {isLoading
            ? "Generating a structured mock AI analysis report."
            : "The workflow evaluates quality, tone, keywords, and risk before returning a result."}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {signals.map((signal) => {
          const Icon = signal.icon;

          return (
            <div
              className="flex items-center gap-3 rounded-md border border-zinc-200 bg-white p-3"
              key={signal.label}
            >
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-zinc-100">
                <Icon className="h-4 w-4 text-zinc-700" />
              </div>
              <span className="text-sm font-medium text-zinc-700">{signal.label}</span>
            </div>
          );
        })}
        {isLoading ? (
          <div className="mt-4 space-y-2">
            <div className="h-2 rounded-full bg-zinc-100">
              <div className="h-2 w-2/3 animate-pulse rounded-full bg-blue-500" />
            </div>
            <p className="text-xs text-zinc-500">Processing tone, clarity, and risk indicators.</p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

export function AnalyzeWorkflow() {
  const [form, setForm] = useState<AnalysisFormState>(initialForm);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  function handleSubmit() {
    const contentLength = form.content.trim().length;

    if (contentLength === 0) {
      setError("Content cannot be empty.");
      setResult(null);
      return;
    }

    if (contentLength < 20) {
      setError("Content must be at least 20 characters.");
      setResult(null);
      return;
    }

    setError("");
    setIsLoading(true);
    setResult(null);

    window.setTimeout(() => {
      setResult(createMockResult(form));
      setIsLoading(false);
    }, 1200);
  }

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_420px]">
      <AnalysisForm
        error={error}
        form={form}
        isLoading={isLoading}
        onChange={setForm}
        onSubmit={handleSubmit}
      />
      <div className="space-y-4">
        {result ? <AnalysisResultCard result={result} /> : <AnalysisSignalsPanel isLoading={isLoading} />}
      </div>
    </div>
  );
}
