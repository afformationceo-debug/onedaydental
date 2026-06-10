import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { getClinic } from "@/lib/clinic";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/types";
import { Sparkles } from "lucide-react";
import ReviewSlider from "@/components/ReviewSlider";
import MessengerButtons from "@/components/MessengerButtons";
import { SectionHeader } from "@/components/sections/Section";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "reviews" });
  return buildMetadata({ locale: locale as Locale, path: "/reviews", title: t("title") });
}

export default async function ReviewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const clinic = getClinic();

  return (
    <div className="pb-8 pt-6">
      <SectionHeader
        kicker={t("reviews.kicker")}
        title={t("reviews.title")}
        subtitle={t("reviews.subtitle")}
      />

      <div className="mx-5 mt-5 flex items-center gap-3 rounded-2xl bg-gradient-to-br from-brand-50 to-surface-soft p-4 ring-1 ring-brand-100">
        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white text-gold-600 shadow-sm ring-1 ring-gold-500/20">
          <Sparkles className="size-5" strokeWidth={2.2} />
        </span>
        <div>
          <p className="text-[14px] font-extrabold text-ink-900">
            {t("reviews.celebrityNote")}
          </p>
          <p className="mt-0.5 text-[12px] text-ink-500">{clinic.reviews.length} stories</p>
        </div>
      </div>

      <div className="mt-6">
        <ReviewSlider reviews={clinic.reviews} />
      </div>

      <p className="mx-5 mt-5 text-[11.5px] leading-relaxed text-ink-400">
        {t("reviews.disclaimer")}
      </p>

      <div className="mx-5 mt-8 flex justify-center">
        <MessengerButtons placement="reviews_cta" variant="row" />
      </div>
    </div>
  );
}
