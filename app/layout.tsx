import type { Metadata } from "next";

import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://yangqi-portfolio.vercel.app"),
  title: {
    default: "Yang Qi | Research Engineer",
    template: "%s | Yang Qi",
  },
  description:
    "Research Engineer working on efficient machine learning architectures, language-model training and post-training, tensor methods, and the mathematical foundations of machine learning.",
  authors: [{ name: "Yang Qi" }],
  creator: "Yang Qi",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Yang Qi",
    title: "Yang Qi | Research Engineer",
    description:
      "Research engineering across language-model systems, efficient architectures, tensor methods, and mathematical machine learning.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yang Qi | Research Engineer",
    description:
      "Research engineering across language-model systems, efficient architectures, tensor methods, and mathematical machine learning.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="font-sans">
        <a
          className="skip-link fixed top-3 left-3 z-[100] -translate-y-24 rounded-sm bg-[var(--ink)] px-4 py-2 text-sm font-medium text-white transition-transform focus:translate-y-0"
          href="#main-content"
        >
          Skip to content
        </a>
        <div
          className="flex min-h-screen flex-col bg-[var(--paper)] text-[var(--ink)]"
          id="top"
        >
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
