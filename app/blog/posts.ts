import type { ComponentType } from "react";

export const siteUrl = "https://yangqi-portfolio.vercel.app";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: `${number}-${number}-${number}`;
  displayDate: string;
  author: "Yang Qi";
  series: string;
  repository: string;
};

export const publishedPosts = [
  {
    slug: "building-petitgpt",
    title:
      "Building PetitGPT: An End-to-End LLM Training and Post-Training Stack on a Single RTX 4090",
    description:
      "From tokenizer and pretraining to SFT, distillation, DPO, and GRPO—and the engineering contracts that make the system trustworthy.",
    date: "2026-08-13",
    displayDate: "August 13, 2026",
    author: "Yang Qi",
    series: "PetitGPT · Part 1",
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
