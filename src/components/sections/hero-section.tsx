"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Download, MapPin } from "lucide-react";

import BlurText from "@/components/ui/blur-text";
import FadeContent from "@/components/ui/fade-content";
import { profile } from "@/data/portfolio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const RESUME_FILE_PATH = "/Tanapon-Resume-SoftwareDev.pdf";

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

  return (
    <section id="home" className="relative w-full pt-16">
      <div className="relative flex min-h-[calc(100vh-4rem)] w-full flex-col items-center justify-start overflow-hidden py-10 lg:justify-center lg:py-12">
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_18%_20%,rgba(6,182,212,0.08),transparent_46%),radial-gradient(circle_at_82%_18%,rgba(16,185,129,0.06),transparent_42%)]" />

        <div className="relative z-10 mx-auto flex w-full max-w-7xl justify-center p-6 pointer-events-none sm:p-8 lg:p-12">
          {/* ── Left column ── */}
          <div className="mx-auto w-full max-w-5xl space-y-8 text-center">
            {/* Badge */}
            <FadeContent duration={600} delay={0} translateY={20} threshold={0}>
              <div className="flex justify-center">
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
            </FadeContent>

            {/* Heading — name */}
            <div className="mx-auto flex w-full max-w-5xl flex-col items-center">
              <BlurText
                text={`${profile.name}.`}
                delay={80}
                animateBy="words"
                direction="bottom"
                threshold={0}
                stepDuration={0.4}
                className="w-full justify-center text-center text-5xl leading-tight font-bold tracking-tight text-slate-50 md:text-6xl lg:text-7xl"
              />
              {/* Role — separate BlurText with a delay offset */}
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
                className="mt-2 w-full justify-center text-center text-5xl leading-tight font-bold tracking-tight md:text-6xl lg:text-7xl"
                spanClassName="bg-gradient-to-r from-cyan-300 via-blue-300 to-emerald-300 bg-clip-text text-transparent"
              />
            </div>

            {/* Intro paragraph */}
            <FadeContent duration={700} delay={320} translateY={18} threshold={0}>
              <p className="mx-auto max-w-3xl text-lg font-light leading-relaxed text-slate-200 md:text-xl">
                {profile.intro}
              </p>
            </FadeContent>

            {/* CTA row */}
            <FadeContent duration={700} delay={480} translateY={20} scale={0.96} threshold={0}>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
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
            </FadeContent>
          </div>

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
                    href={RESUME_FILE_PATH}
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
                src={`${RESUME_FILE_PATH}#view=FitH`}
                title="Resume PDF"
                className="h-[75vh] w-full bg-slate-900"
              />
            ) : (
              <div className="flex h-[75vh] items-center justify-center bg-slate-900 px-6">
                <div className="space-y-3 text-center">
                  <p className="text-lg font-semibold text-slate-100">Resume file not found</p>
                  <p className="text-sm text-slate-400">
                    Please add your PDF file at{" "}
                    <span className="font-medium text-slate-200">public/Tanapon-Resume-SoftwareDev.pdf</span>.
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
