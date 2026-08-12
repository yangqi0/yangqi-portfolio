import {
  earlierExperience,
  recentExperience,
  type RecentExperience,
} from "@/app/content";

import { SectionHeading } from "./section-heading";

function ExperienceEntry({ experience }: { experience: RecentExperience }) {
  return (
    <article className="grid gap-6 py-8 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-10 lg:grid-cols-[16rem_minmax(0,1fr)] lg:py-10">
      <div className="font-mono text-xs leading-6 text-white/55">
        <p>{experience.dates}</p>
        <p>{experience.location}</p>
      </div>
      <div>
        <h3 className="text-2xl font-medium tracking-[-0.03em]">
          {experience.role}
        </h3>
        <p className="mt-1 text-[var(--accent-light)]">
          {experience.organization}
        </p>
        <ul className="mt-5 max-w-3xl space-y-4 text-[0.95rem] leading-7 text-white/68">
          {experience.points.map((point) => (
            <li className="grid grid-cols-[0.8rem_1fr] gap-3" key={point}>
              <span
                aria-hidden="true"
                className="mt-[0.78rem] h-px w-2 bg-[var(--accent-light)]"
              />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export function ExperienceSection() {
  return (
    <section
      aria-labelledby="experience-heading"
      className="scroll-mt-28 md:scroll-mt-16"
      id="experience"
    >
      <div className="bg-[var(--ink)] py-16 text-white sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[76rem] px-5 sm:px-8 lg:px-10">
          <SectionHeading
            description="Recent machine learning work, supported by a longer record in mathematical and applied research."
            eyebrow="02 / Experience"
            headingId="experience-heading"
            inverse
            title="Experience"
          />

          <div className="mt-10 divide-y divide-white/15 border-t border-white/25 sm:mt-12">
            {recentExperience.map((experience) => (
              <ExperienceEntry
                experience={experience}
                key={`${experience.organization}-${experience.dates}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="border-b border-[var(--line)] bg-[var(--paper)] py-10 sm:py-12">
        <div className="mx-auto grid max-w-[76rem] gap-5 px-5 sm:px-8 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-10 lg:grid-cols-[16rem_minmax(0,1fr)] lg:px-10">
          <h3 className="font-mono text-xs font-medium tracking-[0.16em] text-[var(--muted)] uppercase">
            Earlier research appointments
          </h3>
          <ul className="grid border-t border-[var(--line-strong)] lg:grid-cols-2 lg:gap-x-10">
            {earlierExperience.map((experience) => (
              <li
                className="grid gap-2 border-b border-[var(--line)] py-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-6"
                key={`${experience.organization}-${experience.dates}`}
              >
                <div>
                  <h4 className="text-sm font-medium text-[var(--ink-soft)]">
                    {experience.organization}
                  </h4>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    {experience.role}
                  </p>
                </div>
                <p className="font-mono text-xs text-[var(--muted)]">
                  {experience.dates}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
