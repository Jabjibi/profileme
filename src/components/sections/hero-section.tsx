"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Code2, Download, MapPin } from "lucide-react";

import BlurText from "@/components/animations/blur-text";
import FadeContent from "@/components/animations/fade-content";
import { profile } from "@/data/portfolio";
import hero from "@/data/sections/hero.json";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const RESUME_FILE_PATH = hero.resumePath;

const colorMap: Record<string, { dot: string; badge: string }> = {
  cyan:    { dot: "bg-cyan-500",    badge: "border-cyan-500/40 bg-cyan-50 text-cyan-700" },
  emerald: { dot: "bg-emerald-500", badge: "border-emerald-500/40 bg-emerald-50 text-emerald-700" },
  blue:    { dot: "bg-sky-500",     badge: "border-sky-500/40 bg-sky-50 text-sky-700" },
  rose:    { dot: "bg-rose-500",    badge: "border-rose-500/40 bg-rose-50 text-rose-700" },
};

export function HeroSection() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isResumeChecking, setIsResumeChecking] = useState(false);
  const [hasResumeFile, setHasResumeFile] = useState<boolean | null>(null);

  const handleOpenResume = async () => {
    setIsResumeChecking(true);
    setHasResumeFile(null);
    setIsResumeOpen(true);

    try {
      const response = await fetch(RESUME_FILE_PATH, { method: "HEAD", cache: "no-store" });
      setHasResumeFile(response.ok);
    } catch {
      setHasResumeFile(false);
    } finally {
      setIsResumeChecking(false);
    }
  };

  useEffect(() => {
    if (!isResumeOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsResumeOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isResumeOpen]);

  return (
    <section id="home" className="relative w-full pt-16">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white via-cyan-50/60 to-emerald-50/40" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(14,165,233,0.10),transparent_46%),radial-gradient(circle_at_82%_18%,rgba(16,185,129,0.08),transparent_42%)]" />

      <div className="relative flex min-h-[calc(100vh-4rem)] w-full items-center overflow-hidden py-10 lg:py-16">

        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

            {/* ── Left column: text ── */}
            <div className="flex flex-col items-center gap-7 text-center lg:items-start lg:text-left">
              <div className="flex w-full flex-col items-center lg:items-start">
                <BlurText
                  text={`${profile.name}.`}
                  delay={80}
                  animateBy="words"
                  direction="bottom"
                  threshold={0}
                  stepDuration={0.4}
                  className="w-full justify-center text-center text-5xl font-bold leading-tight tracking-tight text-foreground md:text-6xl lg:justify-start lg:text-left"
                />
                <BlurText
                  text={profile.role}
                  delay={60}
                  animateBy="words"
                  direction="bottom"
                  threshold={0}
                  stepDuration={0.38}
                  animationFrom={{ filter: "blur(10px)", opacity: 0, y: 30 }}
                  animationTo={[
                    { filter: "blur(4px)", opacity: 0.5, y: -4 },
                    { filter: "blur(0px)", opacity: 1, y: 0 },
                  ]}
                  className="mt-2 w-full justify-center text-center text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:justify-start lg:text-left"
                  spanClassName="bg-gradient-to-r from-cyan-300 via-blue-300 to-emerald-300 bg-clip-text text-transparent"
                />
              </div>

              <FadeContent duration={700} delay={320} translateY={18} threshold={0}>
                <p className="max-w-lg text-base font-light leading-relaxed text-foreground/80 md:text-lg">
                  {profile.intro}
                </p>
              </FadeContent>

              <FadeContent duration={700} delay={480} translateY={20} scale={0.96} threshold={0}>
                <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                  <Button
                    asChild
                    className="rounded-full bg-slate-900 px-6 text-white shadow-[0_10px_30px_rgba(15,23,42,0.18)] hover:bg-slate-800"
                  >
                    <a href="#projects">
                      {hero.cta.primary}
                      <ArrowRight className="size-4" />
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    onClick={handleOpenResume}
                    className="rounded-full border-border/40 bg-muted/50 px-6 text-foreground/80 hover:bg-muted/70"
                  >
                    <Download className="size-4" />
                    {hero.cta.resume}
                  </Button>
                  <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="size-4 text-cyan-300" />
                    {profile.location}
                  </span>
                </div>
              </FadeContent>
            </div>

            {/* ── Right column: skills card ── */}
            <FadeContent duration={750} delay={200} translateY={32} scale={0.97} threshold={0}>
              <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
                {/* Glow backdrop */}
                <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-cyan-500/5 blur-2xl" />

                <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm sm:p-7">
                  {/* Subtle top shimmer */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" />

                  {/* Card header */}
                  <div className="mb-5 flex items-center gap-2.5">
                    <span className="inline-flex size-7 items-center justify-center rounded-lg border border-cyan-300/30 bg-cyan-300/10 text-cyan-300">
                      <Code2 className="size-3.5" />
                    </span>
                    <span className="text-sm font-semibold tracking-wide text-foreground">
                      {hero.skillCard.heading}
                    </span>
                    <span className="ml-auto inline-flex gap-1">
                      {["bg-rose-400/70", "bg-yellow-400/70", "bg-emerald-400/70"].map((c) => (
                        <span key={c} className={`size-2.5 rounded-full ${c}`} />
                      ))}
                    </span>
                  </div>

                  {/* Skill groups */}
                  <div className="grid grid-cols-2 gap-3">
                    {hero.skillCard.groups.map((group, gi) => {
                      const colors = colorMap[group.color] ?? colorMap.cyan;
                      return (
                        <FadeContent
                          key={group.label}
                          duration={500}
                          delay={300 + gi * 80}
                          translateY={12}
                          threshold={0}
                        >
                          <div className="rounded-xl border border-border/50 bg-background/40 p-3">
                            <div className="mb-2.5 flex items-center gap-1.5">
                              <span className={`size-1.5 rounded-full ${colors.dot}`} />
                              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                                {group.label}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {group.skills.map((skill) => (
                                <span
                                  key={skill}
                                  className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${colors.badge}`}
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </FadeContent>
                      );
                    })}
                  </div>

                  {/* Footer: experience */}
                  <div className="mt-4 flex items-center gap-2 border-t border-border/40 pt-4">
                    <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
                    <span className="text-xs text-muted-foreground">{profile.years}</span>
                  </div>
                </div>
              </div>
            </FadeContent>

          </div>
        </div>
      </div>

      {/* Resume modal */}
      {isResumeOpen ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={hero.modal.ariaLabel}
          onClick={() => setIsResumeOpen(false)}
        >
          <div
            className="pointer-events-auto w-full max-w-5xl overflow-hidden rounded-2xl border border-border bg-background shadow-[0_35px_90px_rgba(2,6,23,0.7)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-5">
              <p className="text-sm font-semibold text-foreground sm:text-base">{hero.modal.title}</p>
              <div className="flex items-center gap-2">
                {hasResumeFile ? (
                  <a
                    href={RESUME_FILE_PATH}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-border px-3 py-1 text-xs font-medium text-foreground/80 transition-colors hover:text-foreground"
                  >
                    {hero.modal.openNewTab}
                  </a>
                ) : null}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsResumeOpen(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {hero.modal.close}
                </Button>
              </div>
            </div>

            {isResumeChecking || hasResumeFile === null ? (
              <div className="flex h-[75vh] items-center justify-center bg-muted px-6">
                <p className="text-sm text-muted-foreground">{hero.modal.checking}</p>
              </div>
            ) : hasResumeFile ? (
              <iframe
                src={`${RESUME_FILE_PATH}#view=FitH`}
                title={hero.modal.iframeTitle}
                className="h-[75vh] w-full bg-muted"
              />
            ) : (
              <div className="flex h-[75vh] items-center justify-center bg-muted px-6">
                <div className="space-y-3 text-center">
                  <p className="text-lg font-semibold text-foreground">{hero.modal.notFound.heading}</p>
                  <p className="text-sm text-muted-foreground">
                    {hero.modal.notFound.description}{" "}
                    <span className="font-medium text-foreground/80">{hero.modal.notFound.path}</span>.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </section>
  );
}
