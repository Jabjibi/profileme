"use client";

import { InfiniteMovingCards } from "../ui/infinite-moving-cards";

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
  const sliderItems = slides.map((slide) => ({
    quote: slide.summary,
    name: slide.title,
    title: slide.metric,
  }));

  return (
    <section id="slider" className="section-reveal section-reveal-delay-1 scroll-mt-20">
      <div className="relative overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-950/50 shadow-[0_20px_60px_rgba(2,6,23,0.55)]">
        <div className="relative z-10 space-y-6 p-6 sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
                Highlight Slider
              </p>
              <h2 className="text-2xl font-semibold text-slate-50 sm:text-3xl">Featured Projects</h2>
            </div>
          </div>

          <InfiniteMovingCards
            items={sliderItems}
            direction="left"
            speed="slow"
            className="max-w-none"
          />
        </div>
      </div>
    </section>
  );
}
