import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import styles from "../article.module.css";
import { ArticleHeader } from "../components/article-header";
import {
  getPost,
  postLoaders,
  publishedPosts,
  siteUrl,
} from "../posts";

export const dynamicParams = false;

const socialImage = {
  url: "/blog/building-petitgpt/opengraph-image",
  width: 1200,
  height: 630,
  alt: "PetitGPT technical article by Yang Qi",
};

export function generateStaticParams() {
  return publishedPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPost(slug);

  if (!post) return {};

  const url = `/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author }],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "en_US",
      siteName: "Yang Qi",
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: [post.author],
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [socialImage],
    },
  };
}

export default async function ArticlePage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getPost(slug);
  const loadArticle = postLoaders[slug];

  if (!post || !loadArticle) notFound();

  const { default: Article } = await loadArticle();
  const url = `${siteUrl}/blog/${post.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    mainEntityOfPage: url,
    url,
    author: { "@type": "Person", name: post.author },
    publisher: { "@type": "Person", name: post.author },
  };

  return (
    <main id="main-content" tabIndex={-1}>
      <article className="mx-auto max-w-[76rem] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <ArticleHeader post={post} />
        <div className={styles.body}>
          <Article />
        </div>
      </article>

      <nav aria-label="Article navigation" className="border-t border-[var(--line)] bg-[var(--surface)]">
        <div className="mx-auto flex max-w-[76rem] flex-col gap-4 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <Link className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent-dark)] underline decoration-[var(--link-line)] underline-offset-4 hover:text-[var(--accent)]" href="/blog">
            <span aria-hidden="true">←</span> All technical writing
          </Link>
          <Link className="text-sm font-medium text-[var(--ink-soft)] underline decoration-[var(--link-line)] underline-offset-4 hover:text-[var(--accent)]" href="/#projects">
            Back to selected projects
          </Link>
        </div>
      </nav>

      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
        type="application/ld+json"
      />
    </main>
  );
}
