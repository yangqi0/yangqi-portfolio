import { OutboundLink } from "@/app/components/outbound-link";

import type { BlogPost } from "../posts";

export function ArticleHeader({ post }: { post: BlogPost }) {
  return (
    <header className="border-b border-[var(--line)] pb-10 sm:pb-12 lg:pb-14">
      <p className="font-mono text-xs font-medium tracking-[0.18em] text-[var(--accent)] uppercase">
        {post.series}
      </p>
      <h1 className="mt-5 max-w-5xl text-[clamp(2.8rem,7vw,5.4rem)] leading-[0.96] font-medium tracking-[-0.06em] text-balance">
        {post.title}
      </h1>
      <p className="mt-7 max-w-3xl text-lg leading-8 text-[var(--muted)] sm:text-xl sm:leading-9">
        {post.description}
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-[var(--line)] pt-5 font-mono text-xs text-[var(--muted)]">
        <time dateTime={post.date}>Published {post.displayDate}</time>
        {post.updatedDate && (
          <time dateTime={post.updatedDate}>Updated {post.displayUpdatedDate}</time>
        )}
        <span aria-hidden="true">/</span>
        <span>By {post.author}</span>
        <span aria-hidden="true">/</span>
        <OutboundLink
          className="font-sans font-medium text-[var(--accent-dark)] underline decoration-[var(--link-line)] underline-offset-4 hover:text-[var(--accent)]"
          href={post.repository}
        >
          Source repository
        </OutboundLink>
      </div>
    </header>
  );
}
