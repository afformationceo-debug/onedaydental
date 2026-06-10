"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Lightweight count-up for numeric stats. Animates the leading number in a
 * value string (e.g. "10분" → counts 0→10, keeps suffix). Non-numeric values
 * (e.g. "당일", "0.01mm") render as-is. Respects prefers-reduced-motion and is
 * SEO-safe (final value is the initial render under no-JS / reduced motion).
 */
export default function CountUp({ value }: { value: string }) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";

  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState<string>(value);
  const started = useRef(false);

  useEffect(() => {
    if (target === null) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(`${target}${suffix}`);
      return;
    }
    setDisplay(`0${suffix}`);

    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        const duration = 1100;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(`${Math.round(target * eased)}${suffix}`);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, suffix]);

  return <span ref={ref}>{target === null ? value : display}</span>;
}
