"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export function AnimatedCounter({
  target,
  duration = 1800,
  suffix = "",
  prefix = "",
  className = "",
}: {
  target: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const hasRun = useRef(false);

  useEffect(() => {
    if (!isInView || hasRun.current) return;
    hasRun.current = true;

    let current = 0;
    const step = target / (duration / 16);
    let raf: number;

    const tick = () => {
      current = Math.min(current + step, target);
      setValue(Math.round(current));
      if (current < target) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <span className="text-[var(--em)] italic">{value.toLocaleString()}</span>
      {suffix}
    </span>
  );
}
