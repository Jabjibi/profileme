"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";

type CountUpNumberProps = {
  to: number;
  from?: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  start?: boolean;
};

export function CountUpNumber({
  to,
  from = 0,
  duration = 1.2,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
  start = true,
}: CountUpNumberProps) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const tweenValueRef = useRef({ value: from });

  const numberFormatter = useMemo(() => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }, [decimals]);

  const formatNumber = useCallback(
    (rawValue: number) => {
      const normalizedValue = decimals > 0 ? Number(rawValue.toFixed(decimals)) : Math.round(rawValue);
      return `${prefix}${numberFormatter.format(normalizedValue)}${suffix}`;
    },
    [decimals, numberFormatter, prefix, suffix],
  );

  useEffect(() => {
    if (!elementRef.current) {
      return;
    }

    const element = elementRef.current;
    tweenValueRef.current.value = from;
    element.textContent = formatNumber(from);

    if (!start) {
      return;
    }

    const tween = gsap.to(tweenValueRef.current, {
      value: to,
      duration,
      ease: "power2.out",
      onUpdate: () => {
        element.textContent = formatNumber(tweenValueRef.current.value);
      },
    });

    return () => {
      tween.kill();
    };
  }, [from, to, duration, start, formatNumber]);

  return (
    <span ref={elementRef} className={className}>
      {formatNumber(from)}
    </span>
  );
}
