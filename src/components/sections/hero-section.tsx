"use client";

import { useLayoutEffect, useState } from "react";
import { gsap } from "gsap";
import { ArrowRight, Download, MapPin, Code2, Sparkles } from "lucide-react";

import { Boxes } from "@/components/ui/background-boxes";
import { CountUpNumber } from "@/components/ui/count-up-number";
import { profile } from "@/data/portfolio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function HeroSection() {
  const [startSnapshotCounters, setStartSnapshotCounters] = useState(false);

  useLayoutEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const triggerCounters = () => {
      window.requestAnimationFrame(() => {
        setStartSnapshotCounters(true);
      });
    };

    const navItems = Array.from(document.querySelectorAll(".intro-nav-item"));
    const snapshotCard = document.querySelector(".intro-snapshot");
    const ctaRow = document.querySelector(".intro-cta");
    const ctaItems = ctaRow ? Array.from(ctaRow.children) : [];
    const heroTexts = document.querySelectorAll(".intro-text:not(.intro-cta)");
    const targets = [...navItems, snapshotCard, ...heroTexts, ctaRow, ...ctaItems].filter(Boolean) as Element[];

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      if (targets.length) {
        const primaryTargets = snapshotCard ? [...navItems, snapshotCard] : navItems;
        gsap.set(targets, { autoAlpha: 0, y: 0, scale: 1, rotationX: 0 });

        const reducedTimeline = gsap.timeline({ defaults: { ease: "none" } });

        if (primaryTargets.length) {
          reducedTimeline.to(primaryTargets, {
            autoAlpha: 1,
            duration: 0.28,
            stagger: 0.04,
          }, 0);
        }

        if (heroTexts.length) {
          reducedTimeline.to(heroTexts, {
            autoAlpha: 1,
            duration: 0.32,
            stagger: 0.05,
          }, 0.05);
        }

        if (ctaItems.length) {
          if (ctaRow) {
            reducedTimeline.set(ctaRow, { autoAlpha: 1 }, 0.09);
          }
          reducedTimeline.to(ctaItems, {
            autoAlpha: 1,
            duration: 0.3,
            stagger: 0.05,
          }, 0.1);
        } else if (ctaRow) {
          reducedTimeline.to(ctaRow, {
            autoAlpha: 1,
            duration: 0.3,
          }, 0.1);
        }

        reducedTimeline.add(() => triggerCounters(), 0.12);

        return () => {
          reducedTimeline.kill();
          gsap.set(targets, { clearProps: "opacity,visibility,transform" });
        };
      }

      triggerCounters();
      return;
    }

    if (targets.length === 0) {
      triggerCounters();
      return;
    }

    // Set initial states (CSS classes already hide content; GSAP ensures transform start points)
    if (navItems.length) gsap.set(navItems, { autoAlpha: 0, y: -20 });
    if (heroTexts.length) gsap.set(heroTexts, { autoAlpha: 0, y: 36, rotationX: 14, transformPerspective: 500 });
    if (snapshotCard) gsap.set(snapshotCard, { autoAlpha: 0, y: 20, scale: 0.95 });
    if (ctaRow) {
      gsap.set(ctaRow, { autoAlpha: 1 });
    }
    if (ctaItems.length) {
      gsap.set(ctaItems, { autoAlpha: 0, y: 34, scale: 0.88 });
    } else if (ctaRow) {
      gsap.set(ctaRow, { autoAlpha: 0, y: 34, scale: 0.88 });
    }

    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    const introStart = 0.18;
    timeline.add(() => triggerCounters(), introStart + 0.25);

    // Choreograph the entrance
    if (navItems.length) {
      timeline.fromTo(
        navItems,
        { autoAlpha: 0, y: -20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: "power2.out",
        },
        introStart
      );
    }
    if (snapshotCard) {
      timeline.fromTo(
        snapshotCard,
        { autoAlpha: 0, y: 20, scale: 0.95 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          ease: "power2.out",
        },
        introStart
      );
    }
    if (heroTexts.length) {
      timeline.fromTo(
        heroTexts,
        { autoAlpha: 0, y: 36, rotationX: 14 },
        {
          autoAlpha: 1,
          y: 0,
          rotationX: 0,
          duration: 1,
          stagger: 0.14,
          ease: "power2.out",
        },
        introStart + 0.1
      );
    }

    if (ctaItems.length) {
      timeline.fromTo(
        ctaItems,
        { autoAlpha: 0, y: 34, scale: 0.88 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.95,
          stagger: 0.1,
          ease: "back.out(1.35)",
        },
        introStart + 0.28
      );
    } else if (ctaRow) {
      timeline.fromTo(
        ctaRow,
        { autoAlpha: 0, y: 34, scale: 0.88 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.95,
          ease: "back.out(1.35)",
        },
        introStart + 0.28
      );
    }

    return () => {
      timeline.kill();
      gsap.set(targets, { clearProps: "opacity,visibility,transform" });
    };
  }, []);

  return (
    <section id="home" className="section-reveal w-full relative pt-16">
      <div className="min-h-[85vh] py-20 lg:py-0 relative w-full overflow-hidden bg-slate-950 flex flex-col items-center justify-center">
        <div className="absolute inset-0 w-full h-full bg-slate-950 z-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] pointer-events-none" />
        <Boxes className="absolute inset-0 w-full h-full z-0 opacity-60" />
        <div className="relative z-10 w-full max-w-7xl mx-auto grid gap-12 p-6 pointer-events-none sm:p-8 lg:grid-cols-[1.5fr_1fr] lg:items-center lg:gap-16 lg:p-12">
          <div className="space-y-8">
            <div className="intro-text opacity-0 invisible">
              <Badge
                variant="secondary"
                className="rounded-full border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-emerald-400 backdrop-blur-sm transition-all hover:bg-emerald-500/20"
              >
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Available for new projects
              </Badge>
            </div>

            <h1 className="intro-text opacity-0 invisible max-w-2xl text-5xl font-bold tracking-tight text-slate-50 md:text-6xl lg:text-7xl">
              {profile.name}.
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400">
                {profile.role}
              </span>
            </h1>

            <p className="intro-text opacity-0 invisible max-w-xl text-lg leading-relaxed text-slate-300 md:text-xl font-light">
              {profile.intro}
            </p>

            <div className="intro-text intro-cta opacity-0 invisible flex flex-wrap items-center gap-4 pt-4">
              <Button
                asChild
                className="pointer-events-auto rounded-full bg-slate-100 px-6 text-slate-900 hover:bg-slate-200"
              >
                <a href="#projects">
                  View Work
                  <ArrowRight className="size-4" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="pointer-events-auto rounded-full border-slate-200/30 bg-slate-900/25 px-6 text-slate-100 hover:bg-slate-800/45"
              >
                <a href="#" aria-label="Download resume">
                  <Download className="size-4" />
                  Resume
                </a>
              </Button>
              <span className="inline-flex items-center gap-2 text-sm text-slate-400">
                <MapPin className="size-4 text-slate-300" />
                {profile.location}
              </span>
            </div>
          </div>

          <Card className="intro-snapshot opacity-0 invisible border-slate-800/60 bg-slate-900/40 text-slate-100 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.4)] transition-all pointer-events-auto">
            <CardContent className="space-y-6 p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 gap-2">
                  <div className="h-5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgb(59,130,246,0.5)]" />
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-300">Quick Snapshot</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:gap-5">
                <div className="group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/30 p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-800/60 hover:shadow-[0_0_20px_rgb(59,130,246,0.15)] hover:border-blue-500/40">
                  <div className="absolute -right-4 -top-4 opacity-10 transition-transform duration-300 group-hover:scale-150 group-hover:opacity-20">
                    <Sparkles className="size-16 text-blue-500" />
                  </div>
                  <p className="relative text-3xl font-extrabold tracking-tight text-white mb-1.5 drop-shadow-md">
                    <CountUpNumber start={startSnapshotCounters} to={5} suffix="+" />
                  </p>
                  <p className="relative text-xs font-semibold text-slate-400 uppercase tracking-widest">Projects</p>
                </div>
                <div className="group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/30 p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-800/60 hover:shadow-[0_0_20px_rgb(16,185,129,0.15)] hover:border-emerald-500/40">
                  <div className="absolute -right-4 -top-4 opacity-10 transition-transform duration-300 group-hover:scale-150 group-hover:opacity-20">
                    <Code2 className="size-16 text-emerald-500" />
                  </div>
                  <p className="relative text-3xl font-extrabold tracking-tight text-white mb-1.5 drop-shadow-md">
                    <CountUpNumber start={startSnapshotCounters} to={10} suffix="+" />
                  </p>
                  <p className="relative text-xs font-semibold text-slate-400 uppercase tracking-widest">Tech Stacks</p>
                </div>
                <div className="group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/30 p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-800/60 hover:shadow-[0_0_20px_rgb(245,158,11,0.15)] hover:border-amber-500/40">
                  <div className="absolute -right-4 -top-4 opacity-10 transition-transform duration-300 group-hover:scale-150 group-hover:opacity-20">
                    <Sparkles className="size-16 text-amber-500" />
                  </div>
                  <p className="relative text-3xl font-extrabold tracking-tight text-white mb-1.5 drop-shadow-md">
                    <CountUpNumber start={startSnapshotCounters} to={100} suffix="%" />
                  </p>
                  <p className="relative text-xs font-semibold text-slate-400 uppercase tracking-widest">Dedication</p>
                </div>
                <div className="group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/30 p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-800/60 hover:shadow-[0_0_20px_rgb(99,102,241,0.15)] hover:border-indigo-500/40">
                  <div className="absolute -right-4 -top-4 opacity-10 transition-transform duration-300 group-hover:scale-150 group-hover:opacity-20">
                    <Sparkles className="size-16 text-indigo-500" />
                  </div>
                  <p className="relative text-3xl font-extrabold tracking-tight text-white mb-1.5 drop-shadow-md">
                    <CountUpNumber start={startSnapshotCounters} to={1} suffix="+" />
                  </p>
                  <p className="relative text-xs font-semibold text-slate-400 uppercase tracking-widest">Years Exp.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
