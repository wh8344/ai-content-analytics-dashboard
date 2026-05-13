import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  Clock3,
  LayoutDashboard,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Portfolio Product",
  description:
    "A portfolio-ready AI SaaS dashboard for content analysis, reporting, risk visibility, and workflow presentation.",
};

const featureCards = [
  {
    icon: BrainCircuit,
    title: "AI-powered analytics",
    description:
      "Analyze articles, social posts, reviews, and marketing copy with structured AI scoring and recommendation flows.",
  },
  {
    icon: BarChart3,
    title: "Data visualization",
    description:
      "Present sentiment, score trends, content volume, and historical reports in a clean dashboard experience.",
  },
  {
    icon: ShieldCheck,
    title: "Real AI integration",
    description:
      "Connect to a live model provider while keeping the API key protected behind a server route.",
  },
  {
    icon: LayoutDashboard,
    title: "SaaS dashboard architecture",
    description:
      "A component-based Next.js workspace designed for future auth, database, and team collaboration layers.",
  },
  {
    icon: Zap,
    title: "Fast MVP delivery",
    description:
      "Built to demonstrate how quickly a polished, client-facing AI product can move from concept to portfolio-ready UI.",
  },
  {
    icon: Clock3,
    title: "Freelance-ready scope",
    description:
      "Useful as a GitHub case study, Upwork sample, or resume project that shows product thinking, not just code.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="relative overflow-hidden border-b border-zinc-200/80">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(15,118,110,0.14),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(17,24,39,0.06),transparent_26%)]" />
        <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-5 py-16 sm:px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:py-24">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-600">
              <Sparkles className="h-3.5 w-3.5 text-[var(--accent)]" />
              Portfolio-grade AI SaaS
            </div>
            <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
              AI Content Analytics Dashboard for teams that need signal before publishing.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-600 sm:text-lg">
              A modern analytics workspace for scoring content quality, tracking sentiment, surfacing
              risk, and turning AI analysis history into actionable strategy.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-zinc-950 px-5 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
                href="/dashboard"
              >
                View Dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white px-5 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50"
                href="/analyze"
              >
                Start Analyzing
              </Link>
            </div>
          </div>

          <div className="animate-fade-up-delay">
            <Card className="bg-white/92">
              <CardHeader>
                <CardTitle>Workspace Snapshot</CardTitle>
                <CardDescription>Built to feel like a commercial AI operations product.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                {[
                  ["Dashboard", "Live KPI cards, charts, and recent report summaries."],
                  ["Analyze", "Real AI provider integration with retry, export, and samples."],
                  ["Insights", "Trend recommendations generated from saved analysis history."],
                  ["Reports", "Search, filter, delete, and review analysis records."],
                ].map(([title, description]) => (
                  <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4" key={title}>
                    <p className="text-sm font-semibold text-zinc-950">{title}</p>
                    <p className="mt-2 text-sm leading-6 text-zinc-500">{description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-6 lg:py-18">
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
            Feature Highlights
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950">
            Built for portfolio presentation and believable product demos
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featureCards.map(({ description, icon: Icon, title }) => (
            <Card className="animate-fade-up" key={title}>
              <CardContent className="p-6">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-zinc-950">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-600">{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <footer className="border-t border-zinc-200 bg-white/70">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-10 text-sm text-zinc-600 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div>
            <p className="font-semibold text-zinc-950">AI Content Analytics Dashboard</p>
            <p className="mt-2 max-w-xl leading-7">
              Portfolio product demo built with Next.js, TypeScript, Tailwind CSS, Recharts, and live AI model integration.
            </p>
          </div>
          <div className="grid gap-2 sm:text-right">
            <p>GitHub: placeholder</p>
            <p>Live Demo: placeholder</p>
            <p>Tech Stack: Next.js, TypeScript, Tailwind CSS, Recharts, MiniMax</p>
            <p>Copyright © 2026 AI Content Analytics Dashboard</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
