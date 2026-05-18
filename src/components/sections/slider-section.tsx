"use client";

import { InfiniteMovingCards } from "@/components/animations/infinite-moving-cards";
import FadeContent from "@/components/animations/fade-content";
import content from "@/data/sections/slider.json";

export function SliderSection() {
  const sliderItems = content.slides.map((slide) => ({
    quote: slide.summary,
    name: slide.title,
    title: slide.metric,
  }));

  return (
    <section id="slider" className="section-reveal section-reveal-delay-1 scroll-mt-20">
      <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-card/50 shadow-[0_4px_16px_rgba(15,23,42,0.06)]">
        <div className="relative z-10 space-y-6 p-6 sm:p-8">
          <FadeContent duration={600} delay={0} translateY={20}>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600">
                  {content.eyebrow}
                </p>
                <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">{content.heading}</h2>
              </div>
            </div>
          </FadeContent>

          <FadeContent duration={700} delay={140} translateY={24}>
            <InfiniteMovingCards
              items={sliderItems}
              direction="left"
              speed="slow"
              className="max-w-none"
            />
          </FadeContent>
        </div>
      </div>
    </section>
  );
}

