import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { getClinic } from "@/lib/clinic";
import { tx } from "@/lib/i18n-text";
import type { Branch, Locale } from "@/lib/types";
import {
  MapPin,
  TrainFront,
  Plane,
  ExternalLink,
  Phone,
  Stethoscope,
  Building2,
  Info,
} from "lucide-react";
import { SectionHeader } from "./sections/Section";

function buildMaps(branch: Branch, locale: Locale) {
  const q = encodeURIComponent(branch.mapQuery);
  const hl = locale === "zh-TW" ? "zh-TW" : locale;
  return {
    embed: `https://maps.google.com/maps?q=${q}&hl=${hl}&z=16&output=embed`,
    link: `https://www.google.com/maps/search/?api=1&query=${q}`,
  };
}

export default async function LocationMap() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("location");
  const clinic = getClinic();

  return (
    <section className="mx-auto max-w-screen-2xl pt-2 lg:px-6">
      <SectionHeader kicker={t("kicker")} title={t("title")} subtitle={t("subtitle")} />

      {/* Shared transit info — same neighborhood for all 3 halls */}
      <div className="mt-6 space-y-2.5 px-5 lg:px-0">
        <p className="flex items-start gap-2.5 text-[13px] text-ink-600">
          <TrainFront className="mt-0.5 size-4 shrink-0 text-mint-500" />
          {t("subway")}
        </p>
        <p className="flex items-start gap-2.5 text-[13px] text-ink-600">
          <Plane className="mt-0.5 size-4 shrink-0 text-mint-500" />
          {t("airport")}
        </p>
      </div>

      {/* Branch cards — each hall = its own Google Business Profile (NAP 1:1) */}
      <div className="mt-7 px-5 lg:px-0">
        <div className="mb-4 flex items-center gap-2">
          <Building2 className="size-4 text-mint-500" />
          <h3 className="font-display text-[16px] font-bold text-ink-900">
            {t("branchesTitle")}
          </h3>
        </div>

        <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {clinic.branches.map((branch) => {
            const maps = buildMaps(branch, locale);
            return (
              <li
                key={branch.id}
                className="flex flex-col overflow-hidden rounded-xl border border-ink-100 bg-surface transition hover:border-mint-400"
              >
                {branch.image ? (
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={branch.image}
                      alt={branch.imageAlt ? tx(branch.imageAlt, locale) : tx(branch.name, locale)}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                    <span className="absolute left-2.5 top-2.5 rounded-md bg-brand-950/80 px-2.5 py-1 text-[11px] font-bold text-mint-300 backdrop-blur">
                      {tx(branch.name, locale)}
                    </span>
                  </div>
                ) : null}
                <div className="overflow-hidden">
                  <iframe
                    src={maps.embed}
                    title={tx(branch.name, locale)}
                    loading="lazy"
                    className="h-40 w-full border-0"
                    referrerPolicy="no-referrer-when-downgrade"
                    sandbox="allow-scripts allow-same-origin allow-popups"
                  />
                </div>

                <div className="flex flex-1 flex-col gap-2.5 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-display text-[15px] font-bold text-ink-900">
                      {tx(branch.name, locale)}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-md bg-brand-50 px-2.5 py-1 text-[11px] font-bold text-brand-700 ring-1 ring-brand-100">
                      <Stethoscope className="size-3" />
                      {t("servicesLabel")}
                    </span>
                  </div>

                  <p className="text-[13px] font-semibold leading-snug text-ink-700">
                    {tx(branch.services, locale)}
                  </p>

                  <p className="flex items-start gap-2 text-[13px] leading-snug text-ink-600">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-mint-500" />
                    {tx(branch.address, locale)}
                  </p>

                  <div className="mt-auto flex items-center justify-between gap-2 pt-1">
                    <a
                      href={`tel:${branch.phone}`}
                      className="inline-flex items-center gap-1.5 text-[13px] font-bold text-ink-800 transition hover:text-mint-600"
                      aria-label={`${t("callLabel")} ${tx(branch.name, locale)} ${branch.phone}`}
                    >
                      <Phone className="size-3.5 text-mint-500" />
                      {branch.phone}
                    </a>
                    <a
                      href={maps.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-md border border-ink-200 bg-surface px-3 py-1.5 text-[12px] font-bold text-brand-700 transition hover:border-mint-400 hover:bg-surface-soft"
                    >
                      {t("viewMap")}
                      <ExternalLink className="size-3" />
                    </a>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <p className="mt-4 flex items-start gap-2 text-[12px] leading-relaxed text-ink-400">
          <Info className="mt-0.5 size-3.5 shrink-0" />
          {t("sameClinicNote")}
        </p>
      </div>
    </section>
  );
}
