"use client";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

/** Persist UTM params from the URL into sessionStorage so they survive navigation. */
export function captureUtm() {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  let found = false;
  const store: Record<string, string> = {};
  for (const k of UTM_KEYS) {
    const v = params.get(k);
    if (v) {
      store[k] = v;
      found = true;
    }
  }
  if (found) {
    sessionStorage.setItem("he_utm", JSON.stringify(store));
  }
}

export function getUtm(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(sessionStorage.getItem("he_utm") || "{}");
  } catch {
    return {};
  }
}

/** Generic GA4 event helper — UTM 자동 부착. 노출/스크롤 등 비클릭 이벤트에 사용. */
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", name, { ...params, ...getUtm() });
}

/** Fire a consultation-click event to GA4 + Meta Pixel, tagged with channel/treatment/UTM. */
export function trackConsultClick(opts: {
  channel: string;
  treatment?: string;
  locale: string;
  placement: string;
}) {
  if (typeof window === "undefined") return;
  const utm = getUtm();
  const payload = { ...opts, ...utm };
  window.gtag?.("event", "consult_click", payload);
  // 브리프 §7 — 모든 라인 버튼은 line_click 으로도 발화(라인 도달률 자동 집계).
  if (opts.channel === "line") window.gtag?.("event", "line_click", payload);
  window.fbq?.("track", "Contact", payload);
  // 자체 인입 적재 (구글 시트). keepalive로 LINE 이동 후에도 전송 보장. 실패는 무시.
  try {
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* noop */
  }
}
