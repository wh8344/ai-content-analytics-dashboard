# AI Content Analytics Dashboard | React + AI SaaS + Data Visualization

## Short Summary

AI Content Analytics Dashboard is a polished SaaS-style analytics product for reviewing content quality, sentiment, keywords, risk level, and AI-generated recommendations. It was built as a portfolio-grade AI dashboard that demonstrates modern React product development, data visualization, and real server-side AI integration.

## Client-Style Problem

Content teams often need a fast way to evaluate articles, social posts, comments, product reviews, and marketing copy before publishing. A useful internal tool should show quality scores, risk signals, sentiment trends, historical reports, and actionable recommendations without requiring a complex backend during the MVP stage.

## Solution

I built a responsive AI analytics dashboard that lets users analyze content, store successful analysis results in browser history, review reports, export report data, and turn saved analysis history into dashboard metrics and insight recommendations.

## Key Features

- Modern SaaS landing page for portfolio presentation
- AI-powered content analysis workflow
- Server-side AI provider route with OpenAI and MiniMax configuration support
- Content type selection for articles, social posts, comments, marketing copy, and product reviews
- Structured analysis result with summary, sentiment, keywords, AI score, risk level, and suggestions
- Saved analysis history using localStorage
- Dynamic dashboard metrics generated from saved reports
- Sentiment, score, and content type visualizations with Recharts
- Reports page with search, filters, detail view, delete, and clear-all actions
- Report detail page with JSON and CSV export
- Insights page with rule-based recommendations from saved analysis history
- Responsive layout for desktop, tablet, and mobile

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui-style components
- Recharts
- Lucide React
- Vercel

## Screenshots

- `screenshots/dashboard.png`
- `screenshots/analyze.png`
- `screenshots/reports.png`
- `screenshots/insights.png`

## Live Demo

[https://ai-content-analytics-dashboard.vercel.app](https://ai-content-analytics-dashboard.vercel.app)

## GitHub

[https://github.com/wh8344/ai-content-analytics-dashboard](https://github.com/wh8344/ai-content-analytics-dashboard)

## Suggested Upwork Portfolio Description

I designed and built a portfolio-grade AI SaaS analytics dashboard for content analysis. The product includes a professional dashboard UI, real AI-powered content analysis through a protected server route, saved analysis history, dynamic metrics, reports, export options, and insights generated from previous analysis results.

This project demonstrates my ability to deliver a polished SaaS MVP quickly using React, Next.js, TypeScript, Tailwind CSS, and data visualization tools. It is built with reusable components, clean UI structure, responsive layouts, and production deployment on Vercel.

## Future Improvements

- Add real user authentication
- Persist reports in a database
- Add team workspaces
- Export reports as PDF
- Add multilingual analysis support
- Add provider-level usage tracking and limits
