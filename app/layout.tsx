import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yang Qi | Research Engineer",
  description:
    "Research Engineer working on efficient machine learning architectures, language-model training and post-training, tensor methods, and the mathematical foundations of machine learning.",
  authors: [{ name: "Yang Qi" }],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
