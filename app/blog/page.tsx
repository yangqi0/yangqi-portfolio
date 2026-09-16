import type { Metadata } from "next";
import Link from "next/link";

import { publishedPosts } from "./posts";

export const metadata: Metadata = {
  title: "Technical Writing",
  description:
    "Long-form engineering notes by Yang Qi on language-model systems, post-training, evaluation, and mathematically grounded machine learning.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Yang Qi",
    url: "/blog",
    title: "Technical Writing | Yang Qi",
    description:
      "Long-form engineering notes on language-model systems, post-training, evaluation, and mathematical machine learning.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Technical Writing | Yang Qi",
    description:
      "Long-form engineering notes on language-model systems, post-training, evaluation, and mathematical machine learning.",
  },
};

export default function BlogPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <section className="border-b border-[var(--line)] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[76rem] px-5 sm:px-8 lg:px-10">
          <p className="flex items-center gap-3 font-mono text-xs font-medium tracking-[0.18em] text-[var(--accent)] uppercase">
            <span aria-hidden="true" className="h-px w-8 bg-current" />
            Writing / ML systems
          </p>
          <h1 className="mt-6 max-w-4xl text-5xl leading-[0.98] font-medium tracking-[-0.055em] text-balance sm:text-6xl lg:text-7xl">
            Technical Writing
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)] sm:text-xl sm:leading-9">
            Engineering notes on building, training, and debugging machine-learning systems—from model internals and data pipelines to post-training and evaluation.
          </p>
        </div>
      </section>

      <section aria-labelledby="published-heading" className="bg-[var(--surface)] py-14 sm:py-18 lg:py-20">
        <div className="mx-auto max-w-[76rem] px-5 sm:px-8 lg:px-10">
          <div className="grid gap-5 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-10 lg:grid-cols-[12rem_minmax(0,1fr)]">
            <p className="pt-1 font-mono text-xs font-medium tracking-[0.18em] text-[var(--accent)] uppercase">
              01 / Published
            </p>
            <h2 className="text-3xl font-medium tracking-[-0.04em] sm:text-4xl" id="published-heading">
              Essays and engineering notes
            </h2>
          </div>

          <ol className="mt-10 border-t border-[var(--line-strong)] sm:mt-12">
            {publishedPosts.map((post, index) => (
              <li className="grid gap-6 border-b border-[var(--line)] py-9 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-10 lg:grid-cols-[12rem_minmax(0,1fr)] lg:py-11" key={post.slug}>
                <div className="font-mono text-xs leading-6 text-[var(--muted)]">
                  <p>{String(index + 1).padStart(2, "0")}</p>
                  <time dateTime={post.updatedDate ?? post.date}>
                    {post.updatedDate ? `Updated ${post.displayUpdatedDate}` : post.displayDate}
                  </time>
                  <p>{post.author}</p>
                </div>
                <article>
                  <p className="font-mono text-xs font-medium tracking-[0.14em] text-[var(--accent)] uppercase">
                    {post.series}
                  </p>
                  <h3 className="mt-3 max-w-4xl text-2xl leading-tight font-medium tracking-[-0.035em] text-balance sm:text-3xl lg:text-4xl">
                    <Link className="underline decoration-[var(--line-strong)] decoration-1 underline-offset-[0.18em] transition-colors hover:text-[var(--accent-dark)]" href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--muted)] sm:text-lg sm:leading-8">
                    {post.description}
                  </p>
                  <Link className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent-dark)] underline decoration-[var(--link-line)] underline-offset-4 hover:text-[var(--accent)]" href={`/blog/${post.slug}`}>
                    Read article <span aria-hidden="true">→</span>
                  </Link>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
