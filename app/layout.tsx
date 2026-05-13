import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "AI Content Analytics Dashboard",
    template: "%s | AI Content Analytics Dashboard",
  },
  description:
    "A professional AI SaaS dashboard for content analysis, sentiment insights, keywords, risk levels, and reporting.",
  applicationName: "AI Content Analytics Dashboard",
  keywords: [
    "AI SaaS dashboard",
    "content analytics",
    "sentiment analysis",
    "portfolio project",
    "Next.js dashboard",
  ],
  openGraph: {
    title: "AI Content Analytics Dashboard",
    description:
      "A polished AI SaaS dashboard for content scoring, sentiment insights, risk monitoring, and reporting workflows.",
    type: "website",
    siteName: "AI Content Analytics Dashboard",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Content Analytics Dashboard",
    description:
      "A polished AI SaaS dashboard for content scoring, sentiment insights, risk monitoring, and reporting workflows.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
