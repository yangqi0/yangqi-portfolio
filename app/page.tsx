import type { Metadata } from "next";

import { ExperienceSection } from "./components/experience-section";
import { FinalSection } from "./components/final-section";
import { HeroSection } from "./components/hero-section";
import { ProjectsSection } from "./components/projects-section";
import { ResearchSection } from "./components/research-section";
import { SkillsSection } from "./components/skills-section";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1}>
      <HeroSection />
      <ProjectsSection />
      <ExperienceSection />
      <SkillsSection />
      <ResearchSection />
      <FinalSection />
    </main>
  );
}
