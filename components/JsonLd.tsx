import { getClinic } from "@/lib/clinic";
import { tx } from "@/lib/i18n-text";
import type { Locale } from "@/lib/types";
import { localeMeta } from "@/i18n/routing";
import { SITE_URL } from "@/lib/config";

/**
 * Maps "평일 09:30 ~ 18:30" style → schema.org dayOfWeek + open/close.
 * Shared across all branches (same clinic, same hours policy).
 */
const OPENING_HOURS = [
  {
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:30",
    closes: "18:30",
  },
  {
    dayOfWeek: "Saturday",
    opens: "09:30",
    closes: "15:00",
  },
];

const OPENING_HOURS_SPEC = OPENING_HOURS.map((h) => ({
  "@type": "OpeningHoursSpecification",
  dayOfWeek: h.dayOfWeek,
  opens: h.opens,
  closes: h.closes,
}));

/**
 * Three branches (1館/2館/3館) of the SAME clinic (韓國oneday牙科).
 * Each branch is registered as its own Google Business Profile, so we emit
 * a separate Dentist node per branch whose NAP maps 1:1 to its Google Maps
 * listing. parentOrganization + brand express that they belong to one clinic.
 */
export default function JsonLd({ locale }: { locale: Locale }) {
  const clinic = getClinic();
  const lineUrl = process.env.NEXT_PUBLIC_LINE_URL;
  const mapsUrl = process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL;

  const brandName = tx(clinic.name, locale);
  const sameAs = [SITE_URL, lineUrl, mapsUrl].filter(Boolean) as string[];

  // Shared parent organization — same clinic for all 3 branches.
  const parentOrg = {
    "@type": "MedicalOrganization",
    "@id": `${SITE_URL}/#clinic`,
    name: brandName,
    url: `${SITE_URL}/${locale}`,
    medicalSpecialty: "Dentistry",
  } as const;

  const branchNodes = clinic.branches.map((branch) => ({
    "@context": "https://schema.org",
    "@type": "Dentist",
    "@id": `${SITE_URL}/#${branch.id}`,
    name: tx(branch.name, locale),
    description: tx(branch.services, locale),
    url: `${SITE_URL}/${locale}`,
    inLanguage: localeMeta[locale].htmlLang,
    telephone: branch.phone,
    image: `${SITE_URL}/gen-img/og.jpg`,
    priceRange: "$$$",
    medicalSpecialty: "Dentistry",
    // Taiwan is the primary target market for this global landing.
    areaServed: { "@type": "Country", name: "Taiwan", identifier: "TW" },
    availableLanguage: ["zh-TW", "ko"],
    knowsLanguage: ["zh-TW", "ko", "中文"],
    address: {
      "@type": "PostalAddress",
      addressCountry: "KR",
      addressRegion: "Seoul",
      addressLocality: "Gangnam-gu",
      streetAddress: tx(branch.address, locale),
    },
    openingHoursSpecification: OPENING_HOURS_SPEC,
    // Same clinic — express shared brand / parent organization.
    brand: { "@type": "Brand", name: brandName },
    parentOrganization: parentOrg,
    ...(sameAs.length ? { sameAs } : {}),
    ...(lineUrl
      ? {
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer support",
            availableLanguage: ["zh-TW", "ko"],
            url: lineUrl,
          },
        }
      : {}),
  }));

  return (
    <>
      {branchNodes.map((node) => (
        <script
          key={node["@id"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
        />
      ))}
    </>
  );
}
