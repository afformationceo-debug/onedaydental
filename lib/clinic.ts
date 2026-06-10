import "server-only";
import type { ClinicData, I18nText, Locale, TreatmentDetail, TreatmentDetailMap } from "./types";
import data from "@/database/clinic.json";
import detailData from "@/database/treatment_detail.json";

export function getClinic(): ClinicData {
  return data as ClinicData;
}

export function getTreatmentDetail(slug: string): TreatmentDetail | null {
  const map = detailData as TreatmentDetailMap;
  return map[slug] ?? null;
}

/** Resolve a localized text with sensible fallback chain. */
export function t(text: I18nText | undefined, locale: Locale): string {
  if (!text) return "";
  return (
    text[locale] ??
    text.ko ??
    text["zh-TW"] ??
    Object.values(text).find(Boolean) ??
    ""
  );
}

export function getTreatmentBySlug(slug: string) {
  return getClinic().treatments.find((tr) => tr.slug === slug);
}

export function getTreatmentsByCategory(cat: string) {
  return getClinic().treatments.filter((tr) => tr.category === cat);
}
