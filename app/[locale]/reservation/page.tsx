import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { getClinic } from "@/lib/clinic";
import { tx } from "@/lib/i18n-text";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/types";
import { Clock } from "lucide-react";
import ReservationForm from "@/components/ReservationForm";
import LocationMap from "@/components/LocationMap";
import { SectionHeader } from "@/components/sections/Section";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "reservation" });
  return buildMetadata({ locale: locale as Locale, path: "/reservation", title: t("title") });
}

export default async function ReservationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  setRequestLocale(localeParam);
  const locale = localeParam as Locale;
  const t = await getTranslations();
  const clinic = getClinic();

  return (
    <div className="pb-8 pt-6">
      <SectionHeader
        kicker={t("reservation.kicker")}
        title={t("reservation.title")}
        subtitle={t("reservation.subtitle")}
      />
      <div className="mt-6">
        <ReservationForm
          treatments={clinic.treatments.map((tr) => ({
            slug: tr.slug,
            name: tx(tr.name, locale),
          }))}
        />
      </div>

      <div className="mt-9">
        <LocationMap />
      </div>

      <div className="mx-5 mt-6 rounded-3xl bg-surface-soft p-5">
        <div className="flex items-start gap-2.5 text-[13px] text-ink-700">
          <Clock className="mt-0.5 size-4 shrink-0 text-brand-500" />
          <ul className="space-y-1 font-semibold">
            {clinic.hours.map((h, i) => (
              <li key={i}>{tx(h, locale)}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
