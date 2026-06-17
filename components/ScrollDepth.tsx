"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/track";

/**
 * 페이지 스크롤 50% 도달 시 scroll_50 1회 발화. (브리프 §7 — 체류/관여 자동 측정)
 * 0초 이탈 트래픽 대비, 정렬 후 관여도 개선을 사람이 세지 않고 자동 집계한다.
 */
export default function ScrollDepth() {
  const fired = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (fired.current) return;
      const doc = document.documentElement;
      const scrolled = (window.scrollY + window.innerHeight) / doc.scrollHeight;
      if (scrolled >= 0.5) {
        fired.current = true;
        trackEvent("scroll_50");
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
