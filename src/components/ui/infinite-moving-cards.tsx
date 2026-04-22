"use client";

import { cn } from "@/lib/utils";
import React, { useCallback, useEffect } from "react";

type InfiniteCardItem = {
  quote: string;
  name: string;
  title: string;
};

type InfiniteMovingCardsProps = {
  items: InfiniteCardItem[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
};

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: InfiniteMovingCardsProps) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  const getDirection = useCallback(() => {
    if (!containerRef.current) {
      return;
    }

    if (direction === "left") {
      containerRef.current.style.setProperty("--animation-direction", "normal");
    } else {
      containerRef.current.style.setProperty("--animation-direction", "reverse");
    }
  }, [direction]);

  const getSpeed = useCallback(() => {
    if (!containerRef.current) {
      return;
    }

    if (speed === "fast") {
      containerRef.current.style.setProperty("--animation-duration", "20s");
    } else if (speed === "normal") {
      containerRef.current.style.setProperty("--animation-duration", "40s");
    } else {
      containerRef.current.style.setProperty("--animation-duration", "80s");
    }
  }, [speed]);

  const addAnimation = useCallback(() => {
    if (!containerRef.current || !scrollerRef.current) {
      return;
    }

    if (scrollerRef.current.dataset.duplicated !== "true") {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollerRef.current?.appendChild(duplicatedItem);
      });

      scrollerRef.current.dataset.duplicated = "true";
    }

    getDirection();
    getSpeed();
  }, [getDirection, getSpeed]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      return;
    }

    addAnimation();
  }, [addAnimation]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_16%,white_84%,transparent)]",
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-2",
          "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {items.map((item, idx) => (
          <li
            className="relative w-[350px] max-w-full shrink-0 rounded-2xl border border-slate-200/15 bg-slate-950/60 px-6 py-5 backdrop-blur md:w-[550px]"
            key={`${item.name}-${idx}`}
          >
            <blockquote>
              <p className="text-sm font-medium uppercase tracking-[0.12em] text-slate-400">Case Study</p>
              <span className="relative z-20 mt-2 block text-xl leading-[1.35] font-semibold text-slate-100">
                {item.name}
              </span>
              <span className="relative z-20 mt-3 block text-base leading-[1.7] font-normal text-slate-300">
                {item.quote}
              </span>
              <div className="relative z-20 mt-5 flex flex-row items-center">
                <span className="text-base leading-[1.6] font-medium text-cyan-200">{item.title}</span>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};