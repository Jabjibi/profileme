"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Download, MapPin } from "lucide-react";
import { IdCard } from "@/components/ui/id-card";

import BlurText from "@/components/animations/blur-text";
import FadeContent from "@/components/animations/fade-content";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { profile } from "@/data/portfolio";
import hero from "@/data/sections/hero.json";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const RESUME_FILE_PATH = hero.resumePath;


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
      <AuroraBackground className="pointer-events-none absolute inset-0" showRadialGradient />

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
                  spanClassName="text-sky-500"
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

            {/* ── Right column: ID card ── */}
            <FadeContent duration={750} delay={200} translateY={32} scale={0.97} threshold={0}>
              <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
                <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-sky-400/8 blur-2xl" />
                <IdCard />
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
