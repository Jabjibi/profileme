"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

type WobbleCardProps = {
  children: React.ReactNode;
  containerClassName?: string;
  className?: string;
};

function getOffset(mouseAxis: number, centerAxis: number, elementAxisSize: number) {
  const distanceFromCenter = mouseAxis - centerAxis;
  const normalized = distanceFromCenter / (elementAxisSize / 2);
  const clamped = Math.max(-1, Math.min(1, normalized));
  const maxOffset = Math.min(16, Math.max(8, elementAxisSize * 0.03));

  return clamped * maxOffset;
}

export const WobbleCard = ({
  children,
  containerClassName,
  className,
}: WobbleCardProps) => {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [canAnimate, setCanAnimate] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateAnimationCapability = () => {
      setCanAnimate(mediaQuery.matches);
    };

    updateAnimationCapability();
    mediaQuery.addEventListener("change", updateAnimationCapability);

    return () => {
      mediaQuery.removeEventListener("change", updateAnimationCapability);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (containerRef.current) {
        gsap.killTweensOf(containerRef.current);
      }
      if (contentRef.current) {
        gsap.killTweensOf(contentRef.current);
      }
    };
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    if (!canAnimate || !containerRef.current || !contentRef.current) {
      return;
    }

    const { clientX, clientY } = event;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = getOffset(clientX, rect.left + rect.width / 2, rect.width);
    const y = getOffset(clientY, rect.top + rect.height / 2, rect.height);

    gsap.to(containerRef.current, {
      x,
      y,
      duration: 0.35,
      ease: "power2.out",
      overwrite: true,
    });

    gsap.to(contentRef.current, {
      x: -x,
      y: -y,
      scale: 1.02,
      duration: 0.35,
      ease: "power2.out",
      overwrite: true,
    });
  };

  const handleMouseEnter = () => {
    if (!canAnimate || !contentRef.current) {
      return;
    }

    gsap.to(contentRef.current, {
      scale: 1.01,
      duration: 0.3,
      ease: "power2.out",
      overwrite: true,
    });
  };

  const handleMouseLeave = () => {
    if (!containerRef.current || !contentRef.current) {
      return;
    }

    gsap.to(containerRef.current, {
      x: 0,
      y: 0,
      duration: 0.45,
      ease: "power3.out",
      overwrite: true,
    });

    gsap.to(contentRef.current, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.45,
      ease: "power3.out",
      overwrite: true,
    });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "mx-auto relative w-full overflow-hidden rounded-2xl bg-indigo-800 will-change-transform",
        containerClassName,
      )}
    >
      <div
        className="relative h-full overflow-hidden [background-image:radial-gradient(88%_100%_at_top,rgba(255,255,255,0.5),rgba(255,255,255,0))] sm:mx-0 sm:rounded-2xl"
        style={{
          boxShadow:
            "0 10px 32px rgba(34, 42, 53, 0.12), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.05), 0 4px 6px rgba(34, 42, 53, 0.08), 0 24px 108px rgba(47, 48, 55, 0.10)",
        }}
      >
        <div
          ref={contentRef}
          className={cn(
            "relative h-full px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12 will-change-transform",
            className,
          )}
        >
          <Noise />
          {children}
        </div>
      </div>
    </section>
  );
};

const Noise = () => {
  return (
    <div
      className="pointer-events-none absolute inset-0 h-full w-full opacity-10 [mask-image:radial-gradient(#fff,transparent,75%)]"
      style={{
        backgroundImage: "radial-gradient(rgba(255,255,255,0.2) 1px, transparent 1px)",
        backgroundSize: "3px 3px",
      }}
    />
  );
};
