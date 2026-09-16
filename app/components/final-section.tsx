import { education, links } from "@/app/content";

import { OutboundLink } from "./outbound-link";

export function FinalSection() {
  return (
    <div className="border-t border-[var(--line)] bg-[var(--paper)] py-12 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-[76rem] px-5 sm:px-8 lg:px-10">
        <p className="font-mono text-xs font-medium tracking-[0.18em] text-[var(--accent)] uppercase">
          05 / Education &amp; contact
        </p>

        <div className="mt-7 grid gap-9 lg:grid-cols-2 lg:gap-14">
          <section
            aria-labelledby="education-heading"
            className="scroll-mt-28 md:scroll-mt-16"
            id="education"
          >
            <h2
              className="text-2xl font-medium tracking-[-0.035em] sm:text-3xl"
              id="education-heading"
            >
              Education
            </h2>
            <ul className="mt-5 border-t border-[var(--line-strong)]">
              {education.map((item) => (
                <li
                  className="border-b border-[var(--line)] py-4"
                  key={item.degree}
                >
                  <p className="leading-6">
                    <span className="font-medium tracking-[-0.015em] text-[var(--ink-soft)]">
                      {item.degree}
                    </span>
                    <span className="text-sm text-[var(--muted)]">
                      {" "}— {item.institution}, {item.year}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section
            aria-labelledby="contact-heading"
            className="scroll-mt-28 border-t border-[var(--line)] pt-8 md:scroll-mt-16 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-14"
            id="contact"
          >
            <h2
              className="text-2xl font-medium tracking-[-0.035em] sm:text-3xl"
              id="contact-heading"
            >
              Contact
            </h2>
            <a
              className="mt-5 inline-flex items-center gap-1.5 text-lg font-medium tracking-[-0.02em] text-[var(--accent-dark)] underline decoration-[var(--link-line)] underline-offset-[0.3em] transition-colors hover:text-[var(--accent)] sm:text-xl"
              href={links.email}
            >
              Email
              <span aria-hidden="true">→</span>
            </a>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-4 text-sm font-medium">
              <OutboundLink href={links.github}>GitHub</OutboundLink>
              <OutboundLink href={links.linkedIn}>LinkedIn</OutboundLink>
              <OutboundLink href={links.scholar}>Google Scholar</OutboundLink>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
