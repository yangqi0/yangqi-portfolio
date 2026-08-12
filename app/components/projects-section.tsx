import { projects } from "@/app/content";

import { OutboundLink } from "./outbound-link";
import { SectionHeading } from "./section-heading";

export function ProjectsSection() {
  return (
    <section
      aria-labelledby="projects-heading"
      className="scroll-mt-28 border-t border-[var(--line)] bg-[var(--surface)] py-16 sm:py-20 md:scroll-mt-16 lg:py-24"
      id="projects"
    >
      <div className="mx-auto max-w-[76rem] px-5 sm:px-8 lg:px-10">
        <SectionHeading
          description="Selected work across language-model systems, efficient tensor architectures, and high-dimensional learning theory."
          eyebrow="01 / Selected work"
          headingId="projects-heading"
          prominent
          title="Selected Projects"
        />

        <div className="mt-10 sm:mt-12">
          {projects.map((project) => (
            <article
              className="grid gap-8 border-t border-[var(--line-strong)] py-10 first:pt-8 sm:py-12 lg:grid-cols-[minmax(15rem,0.72fr)_minmax(0,1.28fr)] lg:gap-16"
              key={project.title}
            >
              <div>
                <div className="flex items-center justify-between gap-4 font-mono text-xs font-medium tracking-[0.12em] text-[var(--accent)] uppercase">
                  <span>{project.context}</span>
                  <span aria-hidden="true">{project.index}</span>
                </div>
                <h3 className="mt-4 text-2xl leading-tight font-medium tracking-[-0.035em] sm:text-3xl">
                  {project.title}
                </h3>
                <p className="mt-2 text-base text-[var(--muted)]">
                  {project.subtitle}
                </p>
                {project.links?.length ? (
                  <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-3">
                    {project.links.map((link) => (
                      <li key={`${link.label}-${link.href}`}>
                        <OutboundLink
                          className="text-sm font-medium text-[var(--accent-dark)] underline decoration-[var(--link-line)] underline-offset-4 hover:text-[var(--accent)]"
                          href={link.href}
                        >
                          {link.label}
                        </OutboundLink>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>

              <div>
                <p className="max-w-3xl text-lg leading-8 text-[var(--ink-soft)]">
                  {project.summary}
                </p>
                <ul className="mt-5 space-y-3 text-[0.95rem] leading-7 text-[var(--muted)]">
                  {project.points.map((point) => (
                    <li
                      className="grid grid-cols-[0.8rem_1fr] gap-3"
                      key={point}
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[0.78rem] h-px w-2 bg-[var(--accent)]"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {project.metrics ? (
                  <dl className="mt-7 grid border-y border-[var(--line)] sm:grid-cols-3 sm:divide-x sm:divide-[var(--line)]">
                    {project.metrics.map((metric) => (
                      <div
                        className="border-b border-[var(--line)] py-4 last:border-b-0 sm:border-b-0 sm:px-5 sm:first:pl-0 sm:last:pr-0"
                        key={metric.label}
                      >
                        <dt className="min-h-8 font-mono text-xs leading-4 tracking-[0.08em] text-[var(--muted)] uppercase">
                          {metric.label}
                        </dt>
                        <dd className="mt-2">
                          <span className="block text-2xl font-medium tracking-[-0.035em] text-[var(--ink)]">
                            {metric.value}
                          </span>
                          <span className="mt-0.5 block text-xs text-[var(--muted)]">
                            {metric.detail}
                          </span>
                        </dd>
                      </div>
                    ))}
                  </dl>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
