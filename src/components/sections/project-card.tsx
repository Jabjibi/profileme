"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { type ProjectCategory, type ProjectItem } from "@/data/portfolio";
import content from "@/data/sections/projects.json";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const categoryStyles: Record<ProjectCategory, { badge: string }> = {
  fullstack:  { badge: "border-cyan-500/40 bg-cyan-50 text-cyan-700" },
  frontend:   { badge: "border-violet-500/40 bg-violet-50 text-violet-700" },
  automation: { badge: "border-emerald-500/40 bg-emerald-50 text-emerald-700" },
  security:   { badge: "border-rose-500/40 bg-rose-50 text-rose-700" },
};

function isLiveProject(project: ProjectItem) {
  return Boolean(project.link && project.link !== "#");
}

export function ProjectCard({ project }: { project: ProjectItem }) {
  const style = categoryStyles[project.category];
  const liveProject = isLiveProject(project);

  const card = (
    <Card className="group relative flex h-full flex-col overflow-hidden border-border/80 bg-card/55 shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-border hover:bg-muted/70">
      <CardHeader className="space-y-3 pb-4">
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-xl font-bold tracking-tight text-foreground">
            {project.title}
          </CardTitle>
          {(project.slug || liveProject) && (
            <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
          )}
        </div>
        <p className="text-sm font-light leading-relaxed text-muted-foreground">
          {project.description.join(" ")}
        </p>
      </CardHeader>

      <CardContent className="mt-auto space-y-6">
        <Badge
          variant="outline"
          className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] ${style.badge}`}
        >
          {project.category}
        </Badge>

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

        {project.confidential ? (
          <p className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
            <span className="size-1.5 rounded-full bg-amber-400/80" />
            Internship · Confidential
          </p>
        ) : project.slug ? (
          <span className="inline-flex items-center gap-2 text-sm font-medium text-violet-600">
            Read Case Study <ArrowUpRight className="size-4" />
          </span>
        ) : liveProject ? (
          <span className="inline-flex items-center gap-2 text-sm font-medium text-cyan-600">
            {content.caseStudyLink} <ArrowUpRight className="size-4" />
          </span>
        ) : (
          <p className="text-sm text-muted-foreground">{content.caseStudyUnavailable}</p>
        )}
      </CardContent>
    </Card>
  );

  if (project.slug) {
    return <Link href={`/projects/${project.slug}`} className="block h-full">{card}</Link>;
  }
  if (liveProject) {
    return <a href={project.link} target="_blank" rel="noopener noreferrer" className="block h-full">{card}</a>;
  }
  return card;
}
