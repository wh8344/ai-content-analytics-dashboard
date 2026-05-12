import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Content Analytics Dashboard",
  description:
    "A professional AI SaaS dashboard for content analysis, sentiment insights, keywords, risk levels, and reporting.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
