export const revalidate = 86400;
import type { MetadataRoute } from "next";
import { locales } from "@/i18n/routing";
import { getClinic } from "@/lib/clinic";
import { SITE_URL } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const clinic = getClinic();
  const staticPaths = ["", "/about", "/treatments", "/prices", "/reviews", "/reservation"];
  const treatmentPaths = clinic.treatments.map((tr) => `/treatments/${tr.slug}`);
  const allPaths = [...staticPaths, ...treatmentPaths];

  const entries: MetadataRoute.Sitemap = [];
  for (const path of allPaths) {
    for (const locale of locales) {
      const languages: Record<string, string> = {};
      for (const l of locales) {
        languages[l] = `${SITE_URL}/${l}${path}`;
      }
      entries.push({
        url: `${SITE_URL}/${locale}${path}`,
        lastModified: new Date("2026-06-10"),
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : path.startsWith("/treatments/") ? 0.7 : 0.8,
        alternates: { languages },
      });
    }
  }
  return entries;
}
