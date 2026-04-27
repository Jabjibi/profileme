"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { projects, type ProjectCategory, type ProjectItem } from "@/data/portfolio";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FadeContent from "@/components/ui/fade-content";
import BlurText from "@/components/ui/blur-text";

const categories = [
  { label: "All", value: "all" },
  { label: "Fullstack", value: "fullstack" },
  { label: "Automation", value: "automation" },
  { label: "Security", value: "security" },
] as const;

const categoryStyles: Record<ProjectCategory, { glow: string; accent: string; badge: string }> = {
  fullstack: {
    glow: "hover:shadow-[0_0_28px_rgba(56,189,248,0.25)]",
    accent: "group-hover:text-cyan-300",
    badge: "border-cyan-300/30 bg-cyan-400/10 text-cyan-200",
  },
  automation: {
    glow: "hover:shadow-[0_0_28px_rgba(74,222,128,0.24)]",
    accent: "group-hover:text-emerald-300",
    badge: "border-emerald-300/30 bg-emerald-400/10 text-emerald-200",
  },
  security: {
    glow: "hover:shadow-[0_0_28px_rgba(251,113,133,0.24)]",
    accent: "group-hover:text-rose-300",
    badge: "border-rose-300/30 bg-rose-400/10 text-rose-200",
  },
};

type CategoryFilter = (typeof categories)[number]["value"];

function isLiveProject(project: ProjectItem) {
  return Boolean(project.link && project.link !== "#");
}

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") {
      return projects;
    }
    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  return (
    <section
      id="projects"
      className="section-reveal mx-auto w-full max-w-6xl scroll-mt-24 px-6 md:px-8"
    >
      <div className="space-y-10">
        {/* Section header */}
        <div className="space-y-4">
          <FadeContent duration={600} delay={0} translateY={20}>
            <div className="flex items-center space-x-3">
              <span className="block h-px w-10 bg-gradient-to-r from-cyan-300 to-emerald-300" />
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-200">Selected Works</p>
            </div>
          </FadeContent>

          <FadeContent duration={650} delay={80} translateY={22}>
            <BlurText
              text="Impact-Driven Projects"
              delay={55}
              animateBy="words"
              direction="bottom"
              threshold={0.1}
              stepDuration={0.36}
              className="text-4xl font-bold tracking-tight text-white md:text-5xl"
            />
          </FadeContent>

          <FadeContent duration={650} delay={160} translateY={20}>
            <p className="max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
              Real projects in full-stack engineering, automation pipelines, and security operations.
            </p>
          </FadeContent>
        </div>

        <Tabs value={activeCategory} onValueChange={(value) => setActiveCategory(value as CategoryFilter)} className="flex flex-col gap-8">
          <FadeContent duration={600} delay={220} translateY={16}>
            <TabsList
              className="inline-flex h-auto max-w-fit self-start justify-start overflow-x-auto rounded-full border border-slate-700/70 bg-slate-900/45 p-1"
            >
              {categories.map((category) => (
                <TabsTrigger
                  key={category.value}
                  value={category.value}
                  className="rounded-full px-5 py-2.5 text-sm font-semibold text-slate-400 transition-all hover:text-white data-[state=active]:bg-slate-800 data-[state=active]:text-white data-[state=active]:shadow-lg"
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </FadeContent>

          <div className="grid gap-6 pt-2 sm:grid-cols-2">
            {filteredProjects.map((project, index) => {
              const style = categoryStyles[project.category];
              const liveProject = isLiveProject(project);

              return (
                <FadeContent
                  key={`${activeCategory}-${project.title}`}
                  duration={600}
                  delay={index * 90}
                  translateY={24}
                  scale={0.97}
                >
                  <Card
                    className={`group relative flex h-full flex-col overflow-hidden border-slate-700/80 bg-slate-950/55 shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-slate-500/75 hover:bg-slate-900/70 ${style.glow}`}
                  >
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-slate-100/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-80" />

                    <CardHeader className="space-y-3 pb-4">
                      <div className="flex items-start justify-between gap-4">
                        <CardTitle className={`text-xl font-bold tracking-tight text-slate-100 transition-colors ${style.accent}`}>
                          {project.title}
                        </CardTitle>
                        <ArrowUpRight className={`size-5 shrink-0 text-slate-600 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 ${style.accent}`} />
                      </div>
                      <CardDescription className="text-sm font-light leading-relaxed text-slate-300">
                        {project.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="mt-auto space-y-6">
                      <div className="flex items-center justify-between gap-3">
                        <Badge variant="outline" className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] ${style.badge}`}>
                          {project.category}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {project.stack.map((item) => (
                          <Badge
                            key={item}
                            variant="secondary"
                            className="border-0 bg-slate-800/70 text-slate-200 transition-colors hover:bg-slate-700/90 hover:text-white"
                          >
                            {item}
                          </Badge>
                        ))}
                      </div>

                      {liveProject ? (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-medium text-cyan-200 transition-colors hover:text-cyan-100"
                        >
                          View Case Study
                          <ArrowUpRight className="size-4" />
                        </a>
                      ) : (
                        <p className="text-sm text-slate-400">Case study available on request.</p>
                      )}
                    </CardContent>
                  </Card>
                </FadeContent>
              );
            })}
          </div>
        </Tabs>
      </div>
    </section>
  );
}
