"use client";

import { type ProjectCategory } from "@/data/portfolio";
import content from "@/data/sections/projects.json";
import { useProjectFilter } from "@/lib/hooks/useProjectFilter";
import FadeContent from "@/components/animations/fade-content";
import BlurText from "@/components/animations/blur-text";
import { ProjectCard } from "@/components/sections/project-card";

const categories = content.categories as { label: string; value: "all" | ProjectCategory }[];

type CategoryFilter = (typeof categories)[number]["value"];

export function ProjectsSection() {
  const { activeCategory, setActiveCategory, filteredProjects } = useProjectFilter();

  return (
    <section
      id="projects"
      className="section-reveal mx-auto w-full max-w-6xl scroll-mt-24 px-6 md:px-8"
    >
      <div className="space-y-10">
        <div className="space-y-4">
          <FadeContent duration={600} delay={0} translateY={20}>
            <div className="flex items-center space-x-3">
              <span className="block h-px w-10 bg-gradient-to-r from-cyan-300 to-emerald-300" />
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-600">{content.eyebrow}</p>
            </div>
          </FadeContent>

          <FadeContent duration={650} delay={80} translateY={22}>
            <BlurText
              text={content.heading}
              delay={55}
              animateBy="words"
              direction="bottom"
              threshold={0.1}
              stepDuration={0.36}
              className="text-4xl font-bold tracking-tight text-foreground md:text-5xl"
            />
          </FadeContent>

          <FadeContent duration={650} delay={160} translateY={20}>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {content.description}
            </p>
          </FadeContent>
        </div>

        <div className="flex flex-col gap-8">
          <FadeContent duration={600} delay={220} translateY={16}>
            <div
              role="tablist"
              aria-label="Project categories"
              className="inline-flex h-auto max-w-fit self-start justify-start overflow-x-auto rounded-full border border-border/70 bg-muted/45 p-1"
            >
              {categories.map((category) => (
                <button
                  key={category.value}
                  role="tab"
                  aria-selected={activeCategory === category.value}
                  onClick={() => setActiveCategory(category.value as CategoryFilter)}
                  className="rounded-full px-5 py-2.5 text-sm font-semibold text-muted-foreground transition-all hover:text-foreground aria-selected:bg-muted aria-selected:text-foreground aria-selected:shadow-lg"
                >
                  {category.label}
                </button>
              ))}
            </div>
          </FadeContent>

          <div className="grid gap-6 pt-2 sm:grid-cols-2">
            {filteredProjects.map((project, index) => (
              <FadeContent
                key={`${activeCategory}-${project.title}`}
                duration={600}
                delay={index * 90}
                translateY={24}
                scale={0.97}
              >
                <ProjectCard project={project} />
              </FadeContent>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
