import { defineRouting } from "next-intl/routing";

export const locales = ["ko", "zh-TW"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "ko",
  // Every URL carries its locale prefix → clean hreflang + medical-tourism friendly
  localePrefix: "always",
  localeDetection: true,
});

export const localeMeta: Record<
  Locale,
  { label: string; flag: string; htmlLang: string; ogLocale: string }
> = {
  ko: { label: "한국어", flag: "🇰🇷", htmlLang: "ko-KR", ogLocale: "ko_KR" },
  "zh-TW": { label: "繁體中文", flag: "🇹🇼", htmlLang: "zh-Hant-TW", ogLocale: "zh_TW" },
};
