import Image from "next/image";

import { focusAreas, links } from "@/app/content";

import { OutboundLink } from "./outbound-link";

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-title"
      className="scroll-mt-32 md:scroll-mt-20"
    >
      <div className="mx-auto grid max-w-[76rem] gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,1.65fr)_minmax(16rem,0.65fr)] lg:gap-20 lg:px-10 lg:py-24">
        <div>
          <p className="mb-5 flex items-center gap-3 font-mono text-xs font-medium tracking-[0.16em] text-[var(--accent)] uppercase">
            <span aria-hidden="true" className="h-px w-8 bg-current" />
            ML systems · Tensor methods · Foundations
          </p>
          <h1
            className="text-[clamp(3.75rem,9vw,6.8rem)] leading-[0.9] font-medium tracking-[-0.065em]"
            id="hero-title"
          >
            Yang Qi
          </h1>
          <p className="mt-4 text-2xl font-medium tracking-[-0.035em] text-[var(--ink-soft)] sm:text-3xl">
            Research Engineer
          </p>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)] sm:text-xl sm:leading-9">
            I build ML systems and develop algorithms for efficient learning,
            spanning language-model training and post-training, tensor methods,
            and mathematically grounded machine learning.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <OutboundLink
              ariaLabel="Open Yang Qi's CV PDF in a new tab"
              className="rounded-sm bg-[var(--ink)] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-dark)]"
              href={links.cv}
            >
              CV (PDF)
            </OutboundLink>
            <OutboundLink
              className="text-sm font-medium underline decoration-[var(--link-line)] underline-offset-4 transition-colors hover:text-[var(--accent)]"
              href={links.github}
            >
              GitHub
            </OutboundLink>
            <OutboundLink
              className="text-sm font-medium underline decoration-[var(--link-line)] underline-offset-4 transition-colors hover:text-[var(--accent)]"
              href={links.linkedIn}
            >
              LinkedIn
            </OutboundLink>
            <OutboundLink
              className="text-sm font-medium underline decoration-[var(--link-line)] underline-offset-4 transition-colors hover:text-[var(--accent)]"
              href={links.scholar}
            >
              Google Scholar
            </OutboundLink>
            <a
              className="inline-flex items-center gap-1.5 text-sm font-medium underline decoration-[var(--link-line)] underline-offset-4 transition-colors hover:text-[var(--accent)]"
              href={links.email}
            >
              Email
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <div className="border-t border-[var(--line-strong)] pt-6 lg:border-t-0 lg:border-l lg:pt-1 lg:pl-10">
          <div className="grid grid-cols-[5.5rem_minmax(0,1fr)] items-start gap-5 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-8 lg:block">
            <Image
              alt="Portrait of Yang Qi"
              className="h-auto w-[5.5rem] rounded-sm object-cover sm:w-32 lg:w-36"
              height={600}
              sizes="(min-width: 1024px) 9rem, (min-width: 640px) 8rem, 5.5rem"
              src="/profile.png"
              width={480}
            />

            <div className="lg:mt-6 lg:border-t lg:border-[var(--line)] lg:pt-5">
              <p className="font-mono text-xs font-medium tracking-[0.16em] text-[var(--muted)] uppercase">
                Areas of focus
              </p>
              <ul className="mt-4 divide-y divide-[var(--line)] border-y border-[var(--line)] text-sm">
                {focusAreas.map((focus, index) => (
                  <li className="flex gap-4 py-3" key={focus}>
                    <span
                      aria-hidden="true"
                      className="font-mono text-xs text-[var(--accent)]"
                    >
                      0{index + 1}
                    </span>
                    <span className="font-medium text-[var(--ink-soft)]">
                      {focus}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
