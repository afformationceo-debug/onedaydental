import { defineRouting } from "next-intl/routing";

// zh-TW = public TW acquisition site. ko = internal review build (noindex, /ko).
export const locales = ["zh-TW", "ko"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "zh-TW",
  // as-needed: zh-TW (default) has NO prefix (tw.onedaydent.com/ = 繁中, clean URLs),
  // ko lives under /ko (tw.onedaydent.com/ko) as an internal review build.
  localePrefix: "as-needed",
  localeDetection: false,
});

export const localeMeta: Record<
  Locale,
  { label: string; flag: string; htmlLang: string; ogLocale: string }
> = {
  "zh-TW": { label: "繁體中文", flag: "🇹🇼", htmlLang: "zh-Hant-TW", ogLocale: "zh_TW" },
  ko: { label: "한국어", flag: "🇰🇷", htmlLang: "ko", ogLocale: "ko_KR" },
};
