import { skills } from "@/app/content";

import { SectionHeading } from "./section-heading";

export function SkillsSection() {
  return (
    <section
      aria-labelledby="skills-heading"
      className="scroll-mt-28 border-b border-[var(--line)] py-16 sm:py-20 md:scroll-mt-16 lg:py-24"
      id="skills"
    >
      <div className="mx-auto max-w-[76rem] px-5 sm:px-8 lg:px-10">
        <SectionHeading
          description="A focused toolkit for machine learning engineering and mathematically grounded research."
          eyebrow="03 / Capabilities"
          headingId="skills-heading"
          title="Technical Skills"
        />

        <ul className="mt-10 grid border-t border-[var(--line-strong)] md:grid-cols-3 md:divide-x md:divide-[var(--line)]">
          {skills.map((skill) => (
            <li
              className="border-b border-[var(--line)] py-6 last:border-b-0 md:border-b-0 md:px-7 md:first:pl-0 md:last:pr-0 lg:px-10"
              key={skill.category}
            >
              <h3 className="font-mono text-xs font-medium leading-5 tracking-[0.12em] text-[var(--accent)] uppercase">
                {skill.category}
              </h3>
              <p className="mt-4 text-[0.95rem] leading-7 text-[var(--muted)]">
                {skill.items}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
