import type { Locale } from "./types";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://global.oneday-dental.co.kr";

/** Messenger deep-links. locale → preferred channel. */
export interface Messenger {
  type: "line" | "kakao" | "instagram";
  label: string;
  href: string;
  color: string;
}

/** TW primary channel — LINE. URL injected via env (NEXT_PUBLIC_LINE_URL). */
const LINE: Messenger = {
  type: "line",
  label: "LINE",
  href: process.env.NEXT_PUBLIC_LINE_URL || "#",
  color: "#06C755",
};

/** KR domestic — KakaoTalk (optional; falls back to LINE). */
const KAKAO: Messenger = {
  type: "kakao",
  label: "KakaoTalk",
  href: process.env.NEXT_PUBLIC_KAKAO_URL || "#",
  color: "#FAE100",
};

const INSTAGRAM: Messenger = {
  type: "instagram",
  label: "Instagram",
  href: process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE
    ? `https://ig.me/m/${process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE}`
    : "#",
  color: "#E1306C",
};

/**
 * Ordered list of messengers per locale (first = primary CTA).
 * TW target → LINE-first. KR shows Kakao first, then LINE.
 * Channels whose href resolves to "#" (env not set) are filtered out at runtime,
 * with LINE kept as a visible placeholder so the CTA never disappears.
 */
const RAW_BY_LOCALE: Record<Locale, Messenger[]> = {
  ko: [KAKAO, LINE, INSTAGRAM],
  "zh-TW": [LINE, INSTAGRAM],
};

/** Keep configured channels; if none configured, keep LINE as the visible placeholder. */
function filterConfigured(list: Messenger[]): Messenger[] {
  const configured = list.filter((m) => m.href && m.href !== "#");
  return configured.length > 0 ? configured : [LINE];
}

export const messengersByLocale: Record<Locale, Messenger[]> = {
  ko: filterConfigured(RAW_BY_LOCALE.ko),
  "zh-TW": filterConfigured(RAW_BY_LOCALE["zh-TW"]),
};

export function primaryMessenger(locale: Locale): Messenger {
  return messengersByLocale[locale][0];
}

/** Prefill consult message per locale. {treatment} replaced at call site. */
export const consultPrefill: Record<Locale, string> = {
  ko: "원데이치과 홈페이지 보고 {treatment} 상담 문의드려요",
  "zh-TW": "我從 ONEDAY 牙醫官網看到，想諮詢 {treatment}",
};

export function buildMessengerHref(
  m: Messenger,
  _locale: Locale,
  _treatment: string,
): string {
  // LINE / Kakao / IG deep-links don't reliably support prefill text → return as-is.
  return m.href;
}

/** Analytics env slots (server-injected, never hardcoded). */
export const analytics = {
  ga4: process.env.NEXT_PUBLIC_GA4_ID ?? "",
  metaPixel: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "",
  gscVerification: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "",
};
