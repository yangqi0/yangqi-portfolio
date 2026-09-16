import type { ComponentType } from "react";

export const siteUrl = "https://yangqi-portfolio.vercel.app";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: `${number}-${number}-${number}`;
  displayDate: string;
  updatedDate?: `${number}-${number}-${number}`;
  displayUpdatedDate?: string;
  author: "Yang Qi";
  series: string;
  repository: string;
};

export const publishedPosts = [
  {
    slug: "building-petitgpt",
    title:
      "PetitGPT: Training and Evaluating a 124.6M Language Model on One GPU",
    description:
      "The research-v1 release: 13B pretraining positions on one RTX 4090, a 30-layer model, measured benchmark results, and the trade-offs behind instruction tuning.",
    date: "2026-08-13",
    displayDate: "August 13, 2026",
    updatedDate: "2026-09-16",
    displayUpdatedDate: "September 16, 2026",
    author: "Yang Qi",
    series: "PetitGPT · research-v1",
    repository: "https://github.com/yangqi0/petitgpt",
  },
] as const satisfies readonly BlogPost[];

type ArticleModule = { default: ComponentType };

export const postLoaders: Record<string, () => Promise<ArticleModule>> = {
  "building-petitgpt": () => import("./_articles/building-petitgpt"),
};

export function getPost(slug: string): BlogPost | undefined {
  return publishedPosts.find((post) => post.slug === slug);
}
