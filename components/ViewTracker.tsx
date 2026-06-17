"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/track";

/**
 * 섹션이 뷰포트에 들어오면 지정 이벤트 1회 발화. (브리프 §7 — price_view / cta_view)
 * 가격·CTA가 실제로 노출됐는지를 IntersectionObserver로 자동 측정한다.
 */
export default function ViewTracker({
  event,
  children,
  className,
  threshold = 0.4,
}: {
  event: string;
  children?: React.ReactNode;
  className?: string;
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const fired = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired.current) {
          fired.current = true;
          trackEvent(event);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [event, threshold]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
