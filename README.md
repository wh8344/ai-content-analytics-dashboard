# AI Content Analytics Dashboard

AI Content Analytics Dashboard is a modern AI SaaS dashboard for analyzing content performance, sentiment, keywords, risk level, and AI-generated recommendations.

This project is designed as a professional freelance portfolio piece for GitHub, Upwork, and resume use. It focuses on a polished SaaS product interface, responsive dashboard layouts, AI-powered analysis, and component-based frontend architecture.

## Live Demo

Live demo link: `Coming soon`

## Screenshots

Screenshot placeholders:

- `screenshots/dashboard.png`
- `screenshots/analyze.png`
- `screenshots/reports.png`

## Key Features

- AI analytics dashboard with KPI cards and visual analytics
- Content analysis workflow with switchable AI providers
- Saved analysis history using browser localStorage
- Sentiment and risk visualization using charts and badges
- Reports table with search, filters, and clickable detail pages
- AI insights page with recommendations, topics, sentiment trends, risk alerts, and improvement opportunities
- SaaS settings page with profile, AI model, notifications, theme, and billing plan sections
- JSON and CSV export options for analysis reports
- Responsive modern UI for desktop and mobile layouts
- Server-side MiniMax/OpenAI API route that keeps API keys off the client

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui-style components
- Recharts
- Lucide React
- Vercel

## Project Structure

```text
app/
  dashboard/
  analyze/
  insights/
  reports/
  settings/
components/
  analyze/
  dashboard/
  insights/
  reports/
  ui/
src/
  data/
  lib/
  types/
lib/
```

## Environment Variables

Create a `.env.local` file in the project root:

```bash
AI_PROVIDER=minimax

MINIMAX_API_KEY=your_minimax_token_plan_key_here
MINIMAX_API_BASE_URL=https://api.minimaxi.com/v1
MINIMAX_MODEL=MiniMax-M2.7

OPENAI_API_KEY=your_openai_api_key_here
OPENAI_API_BASE_URL=https://api.openai.com/v1
OPENAI_MODEL=gpt-4o-mini
```

Set `AI_PROVIDER` to `minimax` or `openai`. API keys are used only inside the server API route and are never exposed to the browser. Base URL and model variables are optional defaults for local development.

API key locations:

- OpenAI: `https://platform.openai.com/api-keys`
- MiniMax: `https://platform.minimaxi.com`
- Anthropic Claude: `https://console.anthropic.com/settings/keys`
- Google Gemini: `https://aistudio.google.com/app/apikey`

## How to Run Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the app:

```text
http://localhost:3000
```

Use the AI analysis feature:

1. Open `/analyze`.
2. Paste content with at least 20 characters.
3. Choose a content type.
4. Click `Analyze Content`.
5. The app calls the server route at `/api/analyze`, which sends the request to the configured provider and returns structured analysis JSON.
6. Successful results are saved to browser localStorage and appear in `/reports`.
7. Click `View` in `/reports` to open a report detail page and export JSON or CSV.

Build for production:

```bash
npm run build
```

## Portfolio Value

This project demonstrates:

- React dashboard development
- Data visualization with Recharts
- AI SaaS product UI design
- Component-based architecture
- Server-side AI provider integration
- Client-side analysis history and report detail workflows
- Responsive SaaS application layout
- Fast MVP delivery ability
- Clean frontend structure using TypeScript and reusable components

It is suitable for showcasing frontend engineering skills for AI SaaS products, analytics dashboards, admin panels, and business-facing web applications.

## Current Scope

This project uses mock data for dashboard metrics, insights, and settings. The `/analyze` workflow includes a real server-side AI provider integration for content analysis, and successful reports are stored in browser localStorage. It does not include a database, authentication system, payment integration, or server-side persistent report storage.

## Future Improvements

- Real authentication
- Database persistence
- Export reports as PDF
- Team workspace
- Multi-language support
