import { links, mobileNavigation, primaryNavigation } from "@/app/content";

import { OutboundLink } from "./outbound-link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)]/90 bg-[var(--paper)]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[76rem] items-center justify-between gap-5 px-5 sm:px-8 lg:px-10">
        <a
          aria-label="Yang Qi, back to top"
          className="font-mono text-sm font-semibold tracking-[0.08em] text-[var(--ink)] uppercase"
          href="#top"
        >
          Yang Qi
        </a>

        <div className="flex items-center gap-5 sm:gap-7">
          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-6 text-sm text-[var(--muted)] md:flex"
          >
            {primaryNavigation.map((item) => (
              <a
                className="transition-colors hover:text-[var(--ink)]"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <OutboundLink
            ariaLabel="Open Yang Qi's CV PDF in a new tab"
            className="rounded-sm border border-[var(--ink)] px-3 py-1.5 text-sm font-medium transition-colors hover:bg-[var(--ink)] hover:text-white"
            href={links.cv}
          >
            CV
          </OutboundLink>
        </div>
      </div>
      <nav
        aria-label="Mobile section navigation"
        className="overflow-x-auto border-t border-[var(--line)] md:hidden"
      >
        <div className="mx-auto flex max-w-[76rem] gap-6 px-5 py-3 text-xs font-medium whitespace-nowrap text-[var(--muted)] sm:px-8">
          {mobileNavigation.map((item) => (
            <a
              className="hover:text-[var(--ink)]"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
