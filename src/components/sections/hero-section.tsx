"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowRight, Download, MapPin, Code2, Sparkles } from "lucide-react";

import { Boxes } from "@/components/ui/background-boxes";
import { CountUpNumber } from "@/components/ui/count-up-number";
import { profile } from "@/data/portfolio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [startSnapshotCounters, setStartSnapshotCounters] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isResumeChecking, setIsResumeChecking] = useState(false);
  const [hasResumeFile, setHasResumeFile] = useState<boolean | null>(null);

  const handleOpenResume = async () => {
    setIsResumeChecking(true);
    setHasResumeFile(null);
    setIsResumeOpen(true);

    try {
      const response = await fetch("/resume.pdf", { method: "HEAD", cache: "no-store" });
      setHasResumeFile(response.ok);
    } catch {
      setHasResumeFile(false);
    } finally {
      setIsResumeChecking(false);
    }
  };

  useEffect(() => {
    if (!isResumeOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsResumeOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isResumeOpen]);

  useLayoutEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const triggerCounters = () => {
      window.requestAnimationFrame(() => {
        setStartSnapshotCounters(true);
      });
    };

    const root = sectionRef.current;
    if (!root) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const context = gsap.context(() => {
      const heroTexts = gsap
        .utils
        .toArray<HTMLElement>(".intro-text")
        .filter((element) => !element.classList.contains("intro-cta"));
      const snapshotCard = root.querySelector<HTMLElement>(".intro-snapshot");
      const ctaRow = root.querySelector<HTMLElement>(".intro-cta");
      const ctaItems = ctaRow ? Array.from(ctaRow.children) as HTMLElement[] : [];
      const targets = [...heroTexts, snapshotCard, ctaRow, ...ctaItems].filter(Boolean) as HTMLElement[];

      if (!targets.length) {
        triggerCounters();
        return;
      }

      if (reducedMotion) {
        gsap.set(targets, { autoAlpha: 1, y: 0, scale: 1, rotationX: 0 });
        triggerCounters();
        return;
      }

      if (heroTexts.length) {
        gsap.set(heroTexts, {
          autoAlpha: 0,
          y: 34,
          rotationX: 12,
          transformPerspective: 480,
        });
      }
      if (snapshotCard) {
        gsap.set(snapshotCard, { autoAlpha: 0, y: 22, scale: 0.95 });
      }
      if (ctaItems.length) {
        gsap.set(ctaItems, { autoAlpha: 0, y: 30, scale: 0.9 });
      } else if (ctaRow) {
        gsap.set(ctaRow, { autoAlpha: 0, y: 30, scale: 0.9 });
      }

      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      const introStart = 0.12;
      timeline.add(() => triggerCounters(), introStart + 0.22);

      if (heroTexts.length) {
        timeline.to(heroTexts, {
          autoAlpha: 1,
          y: 0,
          rotationX: 0,
          duration: 0.92,
          stagger: 0.12,
          ease: "power2.out",
        }, introStart);
      }

      if (snapshotCard) {
        timeline.to(snapshotCard, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.86,
          ease: "power2.out",
        }, introStart + 0.08);
      }

      if (ctaItems.length) {
        timeline.to(ctaItems, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.84,
          stagger: 0.1,
          ease: "power2.out",
        }, introStart + 0.24);
      } else if (ctaRow) {
        timeline.to(ctaRow, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.84,
          ease: "power2.out",
        }, introStart + 0.24);
      }
    }, sectionRef);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="home" className="relative w-full pt-16">
      <div className="relative flex min-h-[calc(100vh-4rem)] w-full flex-col items-center justify-start overflow-hidden bg-slate-950 py-10 lg:justify-center lg:py-12">
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_18%_20%,rgba(6,182,212,0.22),transparent_46%),radial-gradient(circle_at_82%_18%,rgba(16,185,129,0.16),transparent_42%),radial-gradient(circle_at_50%_100%,rgba(59,130,246,0.18),transparent_46%)]" />
        <div className="pointer-events-none absolute inset-0 z-0 bg-slate-950 [mask-image:radial-gradient(ellipse_at_center,transparent_12%,black)]" />
        <Boxes className="absolute inset-0 z-0 h-full w-full opacity-70" />
        <div className="relative z-10 w-full max-w-7xl mx-auto grid gap-12 p-6 pointer-events-none sm:p-8 lg:grid-cols-[1.5fr_1fr] lg:items-center lg:gap-16 lg:p-12">
          <div className="space-y-8">
            <div className="intro-text">
              <Badge
                variant="outline"
                className="rounded-full border-cyan-300/35 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200 backdrop-blur-sm transition-all hover:bg-cyan-300/15"
              >
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300" />
                </span>
                Available for new projects
              </Badge>
            </div>

            <h1 className="intro-text max-w-2xl text-5xl font-bold tracking-tight text-slate-50 md:text-6xl lg:text-7xl">
              {profile.name}.
              <span className="mt-2 block bg-gradient-to-r from-cyan-300 via-blue-300 to-emerald-300 bg-clip-text text-transparent">
                {profile.role}
              </span>
            </h1>

            <p className="intro-text max-w-xl text-lg font-light leading-relaxed text-slate-200 md:text-xl">
              {profile.intro}
            </p>

            <div className="intro-text intro-cta flex flex-wrap items-center gap-4 pt-4">
              <Button
                asChild
                className="pointer-events-auto rounded-full bg-slate-100 px-6 text-slate-900 shadow-[0_10px_30px_rgba(148,163,184,0.35)] hover:bg-white"
              >
                <a href="#projects">
                  View Work
                  <ArrowRight className="size-4" />
                </a>
              </Button>
              <Button
                variant="outline"
                type="button"
                onClick={handleOpenResume}
                className="pointer-events-auto rounded-full border-slate-300/20 bg-slate-900/50 px-6 text-slate-200 hover:bg-slate-800/60"
              >
                <Download className="size-4" />
                Resume
              </Button>
              <span className="inline-flex items-center gap-2 text-sm text-slate-300">
                <MapPin className="size-4 text-cyan-200" />
                {profile.location}
              </span>
            </div>
          </div>

          <Card className="intro-snapshot pointer-events-auto border-cyan-300/12 bg-slate-900/50 text-slate-100 backdrop-blur-xl shadow-[0_20px_65px_rgba(2,8,23,0.72)] transition-all">
            <CardContent className="space-y-6 p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 gap-2">
                  <div className="h-5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.75)]" />
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-200">Quick Snapshot</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:gap-5">
                <div className="group relative overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-800/30 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-slate-800/70 hover:shadow-[0_0_20px_rgba(34,211,238,0.18)]">
                  <div className="absolute -right-4 -top-4 opacity-10 transition-transform duration-300 group-hover:scale-150 group-hover:opacity-20">
                    <Sparkles className="size-16 text-cyan-300" />
                  </div>
                  <p className="relative text-3xl font-extrabold tracking-tight text-white mb-1.5 drop-shadow-md">
                    <CountUpNumber start={startSnapshotCounters} to={5} suffix="+" />
                  </p>
                  <p className="relative text-xs font-semibold uppercase tracking-widest text-slate-300">Projects</p>
                </div>
                <div className="group relative overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-800/30 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300/40 hover:bg-slate-800/70 hover:shadow-[0_0_20px_rgba(110,231,183,0.18)]">
                  <div className="absolute -right-4 -top-4 opacity-10 transition-transform duration-300 group-hover:scale-150 group-hover:opacity-20">
                    <Code2 className="size-16 text-emerald-300" />
                  </div>
                  <p className="relative text-3xl font-extrabold tracking-tight text-white mb-1.5 drop-shadow-md">
                    <CountUpNumber start={startSnapshotCounters} to={10} suffix="+" />
                  </p>
                  <p className="relative text-xs font-semibold uppercase tracking-widest text-slate-300">Tech Stacks</p>
                </div>
                <div className="group relative overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-800/30 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-amber-300/40 hover:bg-slate-800/70 hover:shadow-[0_0_20px_rgba(252,211,77,0.16)]">
                  <div className="absolute -right-4 -top-4 opacity-10 transition-transform duration-300 group-hover:scale-150 group-hover:opacity-20">
                    <Sparkles className="size-16 text-amber-300" />
                  </div>
                  <p className="relative text-3xl font-extrabold tracking-tight text-white mb-1.5 drop-shadow-md">
                    <CountUpNumber start={startSnapshotCounters} to={100} suffix="%" />
                  </p>
                  <p className="relative text-xs font-semibold uppercase tracking-widest text-slate-300">Dedication</p>
                </div>
                <div className="group relative overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-800/30 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-300/45 hover:bg-slate-800/70 hover:shadow-[0_0_20px_rgba(125,211,252,0.16)]">
                  <div className="absolute -right-4 -top-4 opacity-10 transition-transform duration-300 group-hover:scale-150 group-hover:opacity-20">
                    <Sparkles className="size-16 text-blue-300" />
                  </div>
                  <p className="relative text-3xl font-extrabold tracking-tight text-white mb-1.5 drop-shadow-md">
                    <CountUpNumber start={startSnapshotCounters} to={1} suffix="+" />
                  </p>
                  <p className="relative text-xs font-semibold uppercase tracking-widest text-slate-300">Years Exp.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {isResumeOpen ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Resume PDF Preview"
          onClick={() => setIsResumeOpen(false)}
        >
          <div
            className="pointer-events-auto w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-700 bg-slate-950 shadow-[0_35px_90px_rgba(2,6,23,0.7)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 border-b border-slate-800 px-4 py-3 sm:px-5">
              <p className="text-sm font-semibold text-slate-100 sm:text-base">Resume Preview</p>
              <div className="flex items-center gap-2">
                {hasResumeFile ? (
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-slate-600 px-3 py-1 text-xs font-medium text-slate-200 transition-colors hover:border-slate-400 hover:text-white"
                  >
                    Open New Tab
                  </a>
                ) : null}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsResumeOpen(false)}
                  className="text-slate-300 hover:text-white"
                >
                  Close
                </Button>
              </div>
            </div>

            {isResumeChecking || hasResumeFile === null ? (
              <div className="flex h-[75vh] items-center justify-center bg-slate-900 px-6">
                <p className="text-sm text-slate-300">Checking resume file...</p>
              </div>
            ) : hasResumeFile ? (
              <iframe
                src="/resume.pdf#view=FitH"
                title="Resume PDF"
                className="h-[75vh] w-full bg-slate-900"
              />
            ) : (
              <div className="flex h-[75vh] items-center justify-center bg-slate-900 px-6">
                <div className="space-y-3 text-center">
                  <p className="text-lg font-semibold text-slate-100">Resume file not found</p>
                  <p className="text-sm text-slate-400">
                    Please add your PDF file at <span className="font-medium text-slate-200">public/resume.pdf</span>.
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
