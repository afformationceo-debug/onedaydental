import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/types";
import PriceTable from "@/components/PriceTable";
import MessengerButtons from "@/components/MessengerButtons";
import { SectionHeader } from "@/components/sections/Section";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "prices" });
  return buildMetadata({ locale: locale as Locale, path: "/prices", title: t("title") });
}

export default async function PricesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <div className="pb-8 pt-6">
      <SectionHeader
        kicker={t("prices.kicker")}
        title={t("prices.title")}
        subtitle={t("prices.subtitle")}
      />
      <div className="mt-6">
        <PriceTable />
      </div>
      <div className="mx-5 mt-8 rounded-3xl bg-gradient-to-br from-brand-500 to-brand-700 p-5 text-center text-white shadow-lg shadow-brand-500/30">
        <p className="text-[15px] font-extrabold">{t("reservation.title")}</p>
        <p className="mt-1 text-[12.5px] text-white/80">{t("reservation.subtitle")}</p>
        <div className="mt-4 flex justify-center">
          <MessengerButtons placement="prices_cta" variant="row" />
        </div>
      </div>
    </div>
  );
}
