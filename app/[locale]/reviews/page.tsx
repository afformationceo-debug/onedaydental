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
    <div className="mx-auto max-w-screen-2xl pb-12 pt-10 lg:px-6">
      <SectionHeader
        kicker={t("reviews.kicker")}
        title={t("reviews.title")}
        subtitle={t("reviews.subtitle")}
      />

      <div className="mx-5 mt-6 flex items-center gap-3 rounded-lg border border-mint-400/40 bg-mint-400/8 p-4 lg:mx-0">
        <span className="grid size-11 shrink-0 place-items-center rounded-md bg-brand-900 text-mint-400">
          <Sparkles className="size-5" strokeWidth={2.2} />
        </span>
        <div>
          <p className="text-[14px] font-bold text-ink-900">
            {t("reviews.celebrityNote")}
          </p>
          <p className="mt-0.5 font-mono text-[12px] text-ink-500">
            {clinic.reviews.length} stories
          </p>
        </div>
      </div>

      <div className="mt-7">
        <ReviewSlider reviews={clinic.reviews} />
      </div>

      <p className="mx-5 mt-5 text-[11.5px] leading-relaxed text-ink-400 lg:mx-0">
        {t("reviews.disclaimer")}
      </p>

      <div className="mx-5 mt-8 flex justify-center lg:mx-0">
        <MessengerButtons placement="reviews_cta" variant="row" />
      </div>
    </div>
  );
}
