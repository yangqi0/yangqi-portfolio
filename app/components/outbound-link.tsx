import type { ReactNode } from "react";

type OutboundLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
};

function ArrowUpRight() {
  return (
    <svg
      aria-hidden="true"
      className="size-4 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      fill="none"
      focusable="false"
      viewBox="0 0 16 16"
    >
      <path
        d="M4 12 12 4m0 0H6m6 0v6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function OutboundLink({
  href,
  children,
  className = "",
  ariaLabel,
}: OutboundLinkProps) {
  return (
    <a
      aria-label={ariaLabel}
      className={`group inline-flex items-center gap-1.5 ${className}`}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
      <ArrowUpRight />
    </a>
  );
}
