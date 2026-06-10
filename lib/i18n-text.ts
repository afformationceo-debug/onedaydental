import type { I18nText, Locale } from "./types";

/** Resolve a localized text with fallback chain: locale -> ko -> zh-TW -> any. */
export function tx(text: I18nText | undefined, locale: Locale): string {
  if (!text) return "";
  return (
    text[locale] ??
    text.ko ??
    text["zh-TW"] ??
    Object.values(text).find(Boolean) ??
    ""
  );
}
