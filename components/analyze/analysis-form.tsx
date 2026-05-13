"use client";

import { Loader2, Sparkles } from "lucide-react";
import type { AnalysisFormState, ContentType } from "@/src/types/analytics";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const contentTypes: ContentType[] = [
  "Article",
  "Social Post",
  "Comment",
  "Marketing Copy",
  "Product Review",
];

export function AnalysisForm({
  form,
  error,
  isLoading,
  onChange,
  onSubmit,
  onTrySample,
  samples,
}: {
  form: AnalysisFormState;
  error: string;
  isLoading: boolean;
  onChange: (form: AnalysisFormState) => void;
  onSubmit: () => void;
  onTrySample: (sample: AnalysisFormState) => void;
  samples: Array<AnalysisFormState & { label: string }>;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>New Content Analysis</CardTitle>
        <CardDescription>
          Paste content, choose the source type, and generate a structured AI insight report.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-5"
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit();
          }}
        >
          <div>
            <label className="text-sm font-medium text-zinc-800" htmlFor="content-type">
              Content Type
            </label>
            <select
              className="mt-2 h-10 w-full rounded-md border border-zinc-200 bg-white px-3 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isLoading}
              id="content-type"
              onChange={(event) =>
                onChange({ ...form, contentType: event.target.value as ContentType })
              }
              value={form.contentType}
            >
              {contentTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex items-center justify-between gap-3">
              <label className="text-sm font-medium text-zinc-800" htmlFor="analysis-content">
                Content Input
              </label>
              <span className="text-xs text-zinc-500">{form.content.trim().length} characters</span>
            </div>
            <textarea
              className="mt-2 min-h-72 w-full resize-y rounded-md border border-zinc-200 bg-white px-3 py-3 text-sm leading-6 text-zinc-900 shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isLoading}
              id="analysis-content"
              onChange={(event) => onChange({ ...form, content: event.target.value })}
              placeholder="Paste an article, product review, social post, customer comment, or marketing copy to analyze tone, risk, keywords, and clarity."
              value={form.content}
            />
            {error ? <p className="mt-2 text-sm font-medium text-red-600">{error}</p> : null}
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Button className="w-full sm:w-auto" disabled={isLoading} type="submit">
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              {isLoading ? "Analyzing..." : "Analyze Content"}
            </Button>
          </div>

          <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Try sample content
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {samples.map((sample) => (
                <Button
                  className="h-auto min-h-10 whitespace-normal px-3 py-2 text-left text-xs leading-5"
                  disabled={isLoading}
                  key={sample.label}
                  onClick={() => onTrySample(sample)}
                  type="button"
                  variant="outline"
                >
                  {sample.label}
                </Button>
              ))}
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
