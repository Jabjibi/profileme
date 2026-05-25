import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, GitBranch } from "lucide-react";
import type { Metadata } from "next";

import { projects } from "@/data/portfolio";
import { Badge } from "@/components/ui/badge";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return projects
    .filter((p) => p.slug)
    .map((p) => ({ slug: p.slug as string }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Tan Portfolio`,
    description: project.description.join(" "),
  };
}

const categoryStyles: Record<string, string> = {
  fullstack:  "border-cyan-200 bg-cyan-50 text-cyan-700",
  frontend:   "border-violet-200 bg-violet-50 text-violet-700",
  automation: "border-emerald-200 bg-emerald-50 text-emerald-700",
  security:   "border-rose-200 bg-rose-50 text-rose-700",
};

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project || !project.details) notFound();

  const { details } = project;

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Top nav */}
      <nav className="sticky top-0 z-50 border-b border-slate-100 bg-[#fafafa]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 sm:px-8">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
          >
            <ArrowLeft className="size-4" />
            Back to projects
          </Link>
          <div className="flex items-center gap-3">
            {details.liveUrl && (
              <a
                href={details.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-slate-700"
              >
                Live Demo <ArrowUpRight className="size-3.5" />
              </a>
            )}
            {details.githubUrl && (
              <a
                href={details.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50"
              >
                <GitBranch className="size-3.5" />
                GitHub
              </a>
            )}
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-5xl px-6 sm:px-8">
        {/* Hero */}
        <section className="pb-12 pt-16 text-center sm:pt-20">
          <Badge
            variant="outline"
            className={`mb-6 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest ${categoryStyles[project.category]}`}
          >
            {project.category}
          </Badge>

          <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            {project.title}
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-500 sm:text-lg">
            {project.description.join(" ")}
          </p>
        </section>

        {/* iPhone mockups */}
        {details.images.length > 0 && (
          <section className="flex items-end justify-center gap-6 py-4 sm:gap-10">
            {details.images.map((src, i) => (
              <div
                key={src}
                className={`relative w-48 shrink-0 drop-shadow-2xl sm:w-64 ${i % 2 === 0 ? "-translate-y-6" : "translate-y-6"}`}
              >
                <Image
                  src={src}
                  alt={`${project.title} screenshot ${i + 1}`}
                  width={390}
                  height={780}
                  className="w-full"
                  priority={i === 0}
                />
              </div>
            ))}
          </section>
        )}

        {/* Divider */}
        <div className="my-16 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

        {/* Content grid */}
        <section className="grid gap-12 pb-24 md:grid-cols-[1.4fr_1fr]">
          <div className="space-y-10">
            {/* Overview */}
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Overview</p>
              <p className="text-base leading-8 text-slate-600 sm:text-lg">{details.overview}</p>
            </div>

            {/* Features */}
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Key Features</p>
              <ul className="space-y-3">
                {details.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-slate-600 sm:text-base">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-violet-400" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Stack */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Built With</p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <Badge
                  key={item}
                  variant="secondary"
                  className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm"
                >
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
