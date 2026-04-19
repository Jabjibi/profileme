"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

const slides = [
  {
    title: "Credential Deduplication System",
    summary: "Developed Full-stack Automation system using PostgreSQL upsert mechanism, reducing redundant record creation.",
    metric: "Increased data management efficiency",
  },
  {
    title: "SOC Alert Monitoring Dashboard",
    summary: "Aggregated security alerts from CrowdStrike API to a central dashboard with custom Node.js logic.",
    metric: "Improved operational visibility",
  },
  {
    title: "Automated Task Notification System",
    summary: "Built an automated daily task tracking system to fetch pending tasks via REST API and send Slack alerts.",
    metric: "Achieved zero missed deadlines",
  },
];

export function SliderSection() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 1 | -1) => {
    const scroller = scrollerRef.current;
    if (!scroller) {
      return;
    }

    const firstSlide = scroller.querySelector<HTMLElement>("[data-slide]");
    const slideWidth = firstSlide?.offsetWidth ?? 320;

    scroller.scrollBy({
      left: direction * (slideWidth + 16),
      behavior: "smooth",
    });
  };

  return (
    <section id="slider" className="section-reveal section-reveal-delay-1 mt-14 scroll-mt-20 sm:mt-16">
      <div className="relative overflow-hidden rounded-2xl border border-border/80">
        <div className="relative z-10 space-y-6 p-6 sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
                Highlight Slider
              </p>
              <h2 className="text-2xl font-semibold text-slate-50 sm:text-3xl">Featured Projects</h2>
            </div>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="rounded-full bg-slate-200/10 text-slate-100 hover:bg-slate-200/20"
                onClick={() => handleScroll(-1)}
              >
                <ChevronLeft className="size-5" />
                <span className="sr-only">Previous slide</span>
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="rounded-full bg-slate-200/10 text-slate-100 hover:bg-slate-200/20"
                onClick={() => handleScroll(1)}
              >
                <ChevronRight className="size-5" />
                <span className="sr-only">Next slide</span>
              </Button>
            </div>
          </div>

          <div
            ref={scrollerRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {slides.map((slide) => (
              <article
                key={slide.title}
                data-slide
                className="min-w-[85%] snap-start rounded-xl border border-slate-200/20 bg-slate-950/55 p-5 backdrop-blur sm:min-w-[45%]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">Case Study</p>
                <h3 className="mt-2 text-xl font-semibold text-slate-50">{slide.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{slide.summary}</p>
                <p className="mt-4 text-sm font-medium text-indigo-300">{slide.metric}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
