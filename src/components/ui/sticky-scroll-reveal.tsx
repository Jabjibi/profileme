"use client";
import React, { useEffect, useMemo, useRef } from "react";
import { cn } from "@/lib/utils";

type StickyScrollItem = {
  title: string;
  description: string;
  content?: React.ReactNode;
};

const BACKGROUND_COLORS = [
  "#0f172a", // slate-900
  "#000000", // black
  "#171717", // neutral-900
];

const LINEAR_GRADIENTS = [
  "linear-gradient(to bottom right, #06b6d4, #10b981)", // cyan-500 to emerald-500
  "linear-gradient(to bottom right, #ec4899, #6366f1)", // pink-500 to indigo-500
  "linear-gradient(to bottom right, #f97316, #eab308)", // orange-500 to yellow-500
];

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: StickyScrollItem[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const cardLength = content.length;

  const backgroundGradient = useMemo(
    () => LINEAR_GRADIENTS[activeCard % LINEAR_GRADIENTS.length],
    [activeCard],
  );

  useEffect(() => {
    const container = ref.current;
    if (!container || cardLength <= 0) {
      return;
    }

    const handleScroll = () => {
      const maxScroll = container.scrollHeight - container.clientHeight;
      if (maxScroll <= 0) {
        setActiveCard(0);
        return;
      }

      const progress = container.scrollTop / maxScroll;
      const cardsBreakpoints = content.map((_, index) => index / cardLength);
      const closestBreakpointIndex = cardsBreakpoints.reduce((acc, breakpoint, index) => {
        const distance = Math.abs(progress - breakpoint);
        if (distance < Math.abs(progress - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      }, 0);

      setActiveCard(closestBreakpointIndex);
    };

    handleScroll();
    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [cardLength, content]);

  return (
    <div
      style={{
        backgroundColor: BACKGROUND_COLORS[activeCard % BACKGROUND_COLORS.length],
      }}
      className="relative flex h-[30rem] justify-center space-x-10 overflow-y-auto rounded-md p-10"
      ref={ref}
    >
      <div className="relative flex items-start px-4">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-20">
              <h2
                style={{ opacity: activeCard === index ? 1 : 0.32 }}
                className="text-2xl font-bold text-slate-100 transition-opacity duration-300"
              >
                {item.title}
              </h2>
              <p
                style={{ opacity: activeCard === index ? 1 : 0.32 }}
                className="mt-10 max-w-sm text-lg text-slate-300 transition-opacity duration-300"
              >
                {item.description}
              </p>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      <div
        style={{ background: backgroundGradient }}
        className={cn(
          "sticky top-10 hidden h-60 w-80 overflow-hidden rounded-md bg-white lg:block",
          contentClassName,
        )}
      >
        {content[activeCard]?.content ?? null}
      </div>
    </div>
  );
};
