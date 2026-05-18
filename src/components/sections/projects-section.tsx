"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { projects, type ProjectCategory, type ProjectItem } from "@/data/portfolio";
import content from "@/data/sections/projects.json";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FadeContent from "@/components/animations/fade-content";
import BlurText from "@/components/animations/blur-text";

const categories = content.categories as { label: string; value: "all" | ProjectCategory }[];

const categoryStyles: Record<ProjectCategory, { accent: string; badge: string }> = {
  fullstack: {
    accent: "",
    badge: "border-cyan-500/40 bg-cyan-50 text-cyan-700",
  },
  automation: {
    accent: "",
    badge: "border-emerald-500/40 bg-emerald-50 text-emerald-700",
  },
  security: {
    accent: "",
    badge: "border-rose-500/40 bg-rose-50 text-rose-700",
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

        <Tabs value={activeCategory} onValueChange={(value) => setActiveCategory(value as CategoryFilter)} className="flex flex-col gap-8">
          <FadeContent duration={600} delay={220} translateY={16}>
            <TabsList
              className="inline-flex h-auto max-w-fit self-start justify-start overflow-x-auto rounded-full border border-border/70 bg-muted/45 p-1"
            >
              {categories.map((category) => (
                <TabsTrigger
                  key={category.value}
                  value={category.value}
                  className="rounded-full px-5 py-2.5 text-sm font-semibold text-muted-foreground transition-all hover:text-foreground data-[state=active]:bg-muted data-[state=active]:text-foreground data-[state=active]:shadow-lg"
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
                    className="group relative flex h-full flex-col overflow-hidden border-border/80 bg-card/55 shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-border hover:bg-muted/70"
                  >

                    <CardHeader className="space-y-3 pb-4">
                      <div className="flex items-start justify-between gap-4">
                        <CardTitle className="text-xl font-bold tracking-tight text-foreground">
                          {project.title}
                        </CardTitle>
                        <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                      </div>
                      <CardDescription className="text-sm font-light leading-relaxed text-muted-foreground">
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
                            className="border-0 bg-muted/70 text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
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
                          className="inline-flex items-center gap-2 text-sm font-medium text-cyan-600 transition-colors hover:text-cyan-700"
                        >
                          {content.caseStudyLink}
                          <ArrowUpRight className="size-4" />
                        </a>
                      ) : (
                        <p className="text-sm text-muted-foreground">{content.caseStudyUnavailable}</p>
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
