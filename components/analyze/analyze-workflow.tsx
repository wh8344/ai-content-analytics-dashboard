"use client";

import { useState } from "react";
import { AlertTriangle, BrainCircuit, FileSearch, ScanLine } from "lucide-react";
import type {
  AnalysisFormState,
  AnalysisResult,
} from "@/src/types/analytics";
import { AnalysisForm } from "@/components/analyze/analysis-form";
import { AnalysisResultCard } from "@/components/analyze/analysis-result-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const initialForm: AnalysisFormState = {
  content: "",
  contentType: "Article",
};

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
            ? "Generating a structured AI analysis report."
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

function ErrorPanel({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Analysis Failed</CardTitle>
        <CardDescription>
          The request could not be completed. Check your API key or try again.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-medium text-red-700">{message}</p>
        </div>
        <Button className="mt-4" onClick={onRetry} type="button" variant="outline">
          Retry Analysis
        </Button>
      </CardContent>
    </Card>
  );
}

export function AnalyzeWorkflow() {
  const [form, setForm] = useState<AnalysisFormState>(initialForm);
  const [error, setError] = useState("");
  const [requestError, setRequestError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  async function handleSubmit() {
    const contentLength = form.content.trim().length;

    if (contentLength === 0) {
      setError("Content cannot be empty.");
      setRequestError("");
      setResult(null);
      return;
    }

    if (contentLength < 20) {
      setError("Content must be at least 20 characters.");
      setRequestError("");
      setResult(null);
      return;
    }

    setError("");
    setRequestError("");
    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: form.content,
          contentType: form.contentType,
        }),
      });

      const data = (await response.json()) as {
        result?: AnalysisResult;
        error?: string;
      };

      if (!response.ok || !data.result) {
        throw new Error(data.error || "AI analysis request failed.");
      }

      setResult(data.result);
    } catch (caughtError) {
      const message =
        caughtError instanceof Error
          ? caughtError.message
          : "Unexpected error while analyzing content.";
      setRequestError(message);
    } finally {
      setIsLoading(false);
    }
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
        {requestError ? (
          <ErrorPanel message={requestError} onRetry={handleSubmit} />
        ) : result ? (
          <AnalysisResultCard result={result} />
        ) : (
          <AnalysisSignalsPanel isLoading={isLoading} />
        )}
      </div>
    </div>
  );
}
