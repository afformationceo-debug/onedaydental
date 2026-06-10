import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getClinic } from "@/lib/clinic";
import type { Locale } from "@/lib/types";
import { ArrowRight } from "lucide-react";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import UspSection from "@/components/sections/UspSection";
import DoctorAuthority from "@/components/sections/DoctorAuthority";
import BeforeAfter from "@/components/sections/BeforeAfter";
import HomeFaq from "@/components/sections/HomeFaq";
import CategoryChips from "@/components/CategoryChips";
import TreatmentCard from "@/components/TreatmentCard";
import PriceTable from "@/components/PriceTable";
import ReviewSlider from "@/components/ReviewSlider";
import ReservationForm from "@/components/ReservationForm";
import FinalCta from "@/components/sections/FinalCta";
import { SectionHeader } from "@/components/sections/Section";
import Reveal from "@/components/Reveal";
import { tx } from "@/lib/i18n-text";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  setRequestLocale(localeParam);
  const locale = localeParam as Locale;
  const t = await getTranslations();
  const clinic = getClinic();
  const dur = t("common.duration");
  const rec = t("common.recovery");

  return (
    <>
      {/* 1. Hero — 真正的一日完成 + 同價 + count-up + CTA */}
      <Hero />

      {/* 2. Trust badge strip (放心 anchor) */}
      <TrustBar />

      {/* 3. Category quick-nav */}
      <section className="pt-8">
        <CategoryChips />
      </section>

      {/* 4. Why ONEDAY (USPs — 당일동선·중문통역 등) */}
      <UspSection />

      {/* 5. Chief-doctor authority (김진환) */}
      <DoctorAuthority />

      {/* 6. Treatments preview */}
      <section className="py-11">
        <SectionHeader
          kicker={t("categories.kicker")}
          title={t("categories.title")}
          subtitle={t("categories.subtitle")}
        />
        <div className="mt-6 space-y-4 px-5">
          {clinic.treatments.slice(0, 4).map((tr, i) => (
            <Reveal key={tr.id} delay={i * 0.04}>
              <TreatmentCard
                treatment={tr}
                locale={locale}
                durationLabel={dur}
                recoveryLabel={rec}
              />
            </Reveal>
          ))}
        </div>
        <div className="mt-5 px-5">
          <Link
            href="/treatments"
            className="flex items-center justify-center gap-2 rounded-2xl border border-brand-200 bg-brand-50 py-3 text-[14px] font-bold text-brand-700 transition hover:bg-brand-100"
          >
            {t("categories.viewAll")}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      {/* 7. Pricing (수가표 — 同價 강조) */}
      <section className="bg-surface-soft py-11">
        <SectionHeader
          kicker={t("prices.kicker")}
          title={t("prices.title")}
          subtitle={t("prices.subtitle")}
        />
        <div className="mt-6">
          <PriceTable />
        </div>
      </section>

      {/* 8. Before & After (placeholder — imagery pending) */}
      <BeforeAfter />

      {/* 9. Reviews (번체 · 명인/실제 환자 — 별점 미사용) */}
      <section className="bg-surface-soft py-11">
        <SectionHeader
          kicker={t("reviews.kicker")}
          title={t("reviews.title")}
          subtitle={t("reviews.subtitle")}
        />
        <div className="mt-6">
          <ReviewSlider reviews={clinic.reviews} />
        </div>
      </section>

      {/* 10. FAQ (의료관광 반론 — 당일·통역·동일가·체류일) */}
      <HomeFaq />

      {/* 11. Reservation funnel */}
      <section id="reservation" className="py-11">
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
      </section>

      {/* 12. Final LINE CTA */}
      <FinalCta />
    </>
  );
}
