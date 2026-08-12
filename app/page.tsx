import { ExperienceSection } from "./components/experience-section";
import { FinalSection } from "./components/final-section";
import { HeroSection } from "./components/hero-section";
import { ProjectsSection } from "./components/projects-section";
import { ResearchSection } from "./components/research-section";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import { SkillsSection } from "./components/skills-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <a
        className="fixed top-3 left-3 z-[100] -translate-y-24 rounded-sm bg-[var(--ink)] px-4 py-2 text-sm font-medium text-white transition-transform focus:translate-y-0"
        href="#main-content"
      >
        Skip to content
      </a>

      <SiteHeader />

      <main id="main-content" tabIndex={-1}>
        <HeroSection />
        <ProjectsSection />
        <ExperienceSection />
        <SkillsSection />
        <ResearchSection />
        <FinalSection />
      </main>

      <SiteFooter />
    </div>
  );
}
