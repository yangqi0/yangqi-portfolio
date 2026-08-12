import { links, researchAreas } from "@/app/content";

import { OutboundLink } from "./outbound-link";
import { SectionHeading } from "./section-heading";

export function ResearchSection() {
  return (
    <section
      aria-labelledby="research-heading"
      className="scroll-mt-28 bg-[var(--surface)] py-16 sm:py-20 md:scroll-mt-16 lg:py-24"
      id="research"
    >
      <div className="mx-auto max-w-[76rem] px-5 sm:px-8 lg:px-10">
        <SectionHeading
          description="Selected themes from a broader research record in mathematics, statistics, and algorithms."
          eyebrow="04 / Research"
          headingId="research-heading"
          title="Selected Research"
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-16">
          <ol className="grid border-t border-[var(--line-strong)] md:grid-cols-3 md:divide-x md:divide-[var(--line)]">
            {researchAreas.map((area, index) => (
              <li
                className="border-b border-[var(--line)] py-5 md:px-6 md:first:pl-0 md:last:pr-0"
                key={area.title}
              >
                <p className="font-mono text-xs tracking-[0.12em] text-[var(--accent)]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-base font-medium tracking-[-0.015em]">
                  {area.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                  {area.description}
                </p>
              </li>
            ))}
          </ol>

          <div className="border-t border-[var(--line-strong)] pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
            <p className="text-sm leading-6 text-[var(--muted)]">
              For papers, citations, and the complete publication record:
            </p>
            <OutboundLink
              className="mt-4 text-base font-medium text-[var(--accent-dark)] underline decoration-[var(--link-line)] underline-offset-4 hover:text-[var(--accent)]"
              href={links.scholar}
            >
              View Google Scholar
            </OutboundLink>
          </div>
        </div>
      </div>
    </section>
  );
}
