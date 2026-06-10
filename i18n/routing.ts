import { defineRouting } from "next-intl/routing";

// Single-locale site. Taiwan (繁體中文) is the only acquisition market.
export const locales = ["zh-TW"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "zh-TW",
  // Every URL carries its locale prefix → clean hreflang + medical-tourism friendly.
  // Root "/" redirects to "/zh-TW".
  localePrefix: "always",
  localeDetection: false,
});

export const localeMeta: Record<
  Locale,
  { label: string; flag: string; htmlLang: string; ogLocale: string }
> = {
  "zh-TW": { label: "繁體中文", flag: "🇹🇼", htmlLang: "zh-Hant-TW", ogLocale: "zh_TW" },
};
