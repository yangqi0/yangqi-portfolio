export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--surface)]">
      <div className="mx-auto flex max-w-[76rem] flex-col gap-3 px-5 py-5 text-xs text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
        <p>Yang Qi · Research Engineer</p>
        <a
          className="font-medium text-[var(--ink-soft)] transition-colors hover:text-[var(--accent)]"
          href="#top"
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
