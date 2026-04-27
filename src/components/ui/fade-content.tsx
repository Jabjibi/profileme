"use client";

import * as React from "react";
import { useRef, useEffect, useState } from "react";

interface FadeContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  blur?: boolean;
  duration?: number;
  delay?: number;
  threshold?: number;
  translateY?: number;
  scale?: number;
}

/**
 * ReactBits-style FadeContent — pure CSS + IntersectionObserver, no GSAP.
 * Fades children in with optional blur, slide, and scale on mount.
 */
const FadeContent: React.FC<FadeContentProps> = ({
  children,
  blur = false,
  duration = 700,
  delay = 0,
  threshold = 0.1,
  translateY = 24,
  scale = 1,
  className = "",
  style,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Already visible on mount (e.g. hero content above the fold)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const initialTransform = `translateY(${translateY}px) scale(${scale < 1 ? scale : 1})`;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        filter: blur && !inView ? "blur(8px)" : "blur(0px)",
        transform: inView ? "translateY(0px) scale(1)" : initialTransform,
        transition: `opacity ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, filter ${duration}ms ease ${delay}ms`,
        willChange: "opacity, transform, filter",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default FadeContent;
