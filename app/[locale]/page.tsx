import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getClinic } from "@/lib/clinic";
import type { Locale } from "@/lib/types";
import { ArrowRight } from "lucide-react";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import PromoCarousel from "@/components/sections/PromoCarousel";
import UspSection from "@/components/sections/UspSection";
import DoctorAuthority from "@/components/sections/DoctorAuthority";
import BeforeAfter from "@/components/sections/BeforeAfter";
import CelebrityStrip from "@/components/sections/CelebrityStrip";
import HomeFaq from "@/components/sections/HomeFaq";
import CategoryChips from "@/components/CategoryChips";
import TreatmentExplorer from "@/components/TreatmentExplorer";
import { tx } from "@/lib/i18n-text";
import PriceTable from "@/components/PriceTable";
import ReviewSlider from "@/components/ReviewSlider";
import LineConsult from "@/components/LineConsult";
import FinalCta from "@/components/sections/FinalCta";
import { SectionHeader } from "@/components/sections/Section";
import ScrollDepth from "@/components/ScrollDepth";
import ViewTracker from "@/components/ViewTracker";

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
      {/* 1. Hero — 韓星同款 牙齒美學(陶瓷貼片・牙齒美白) + 단일 LINE CTA */}
      <Hero />

      {/* scroll_50 자동 발화 (브리프 §7 — 0초 이탈 대비 관여 측정) */}
      <ScrollDepth />

      {/* 2. Trust badge strip (放心 anchor) */}
      <TrustBar />

      {/* 2.5 "이게 당신이 찾던 시술" — 미백/라미 비주얼 캐러셀 (브리프 §4-2, 광고 정렬) */}
      <PromoCarousel />

      {/* 3. Category quick-nav */}
      <section className="pt-8">
        <CategoryChips />
      </section>

      {/* 4. Why ONEDAY — "이게 당신이 찾던 것"(당일동선·중문통역·투명가) */}
      <UspSection />

      {/* 5. Pricing — 미백·라미 전면(美學 그룹 최상단). 저관여 결심엔 투명가가 핵심 후킹. */}
      <ViewTracker event="price_view">
        <section id="prices" className="bg-surface-soft py-14 lg:py-20">
          <div className="mx-auto max-w-screen-2xl lg:px-6">
            <SectionHeader
              kicker={t("prices.kicker")}
              title={t("prices.title")}
              subtitle={t("prices.subtitle")}
            />
          </div>
          <div className="mt-8">
            <PriceTable />
          </div>
        </section>
      </ViewTracker>

      {/* 6. Treatments — category TABS (desktop) / ACCORDION (mobile) */}
      <section className="py-14 lg:py-20">
        <SectionHeader
          kicker={t("categories.kicker")}
          title={t("categories.title")}
          subtitle={t("categories.subtitle")}
        />
        <div className="mt-9">
          <TreatmentExplorer
            categories={clinic.categories.map((c) => ({
              id: c.id,
              name: tx(c.name, locale),
              icon: c.icon,
              items: clinic.treatments
                .filter((tr) => tr.category === c.id)
                .map((tr) => ({
                  slug: tr.slug,
                  name: tx(tr.name, locale),
                  tagline: tx(tr.tagline, locale),
                  duration: tx(tr.duration, locale),
                  recovery: tx(tr.recovery, locale),
                  highlights: tr.highlights.map((h) => tx(h, locale)),
                })),
            }))}
            labels={{ duration: dur, recovery: rec, detail: t("categories.viewDetail") }}
          />
        </div>
        <div className="mx-auto mt-8 max-w-md px-5">
          <Link
            href="/treatments"
            className="flex items-center justify-center gap-2 rounded-lg border border-ink-200 bg-surface py-3.5 text-[14px] font-bold text-brand-700 transition hover:border-mint-400 hover:bg-surface-soft"
          >
            {t("categories.viewAll")}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      {/* 7. Chief-doctor authority (신뢰 보강 — 후순위로) */}
      <DoctorAuthority />

      {/* 8. Before & After (라미/미백 위주 — imagery pending) */}
      <BeforeAfter />

      {/* 9. Reviews + 연예인 동행 (韓星同款 포지셔닝 강화) */}
      <section className="bg-surface-soft py-14 lg:py-20">
        <div className="mx-auto max-w-screen-2xl lg:px-6">
          <SectionHeader
            kicker={t("reviews.kicker")}
            title={t("reviews.title")}
            subtitle={t("reviews.subtitle")}
          />
        </div>
        <div className="mt-8">
          <ReviewSlider reviews={clinic.reviews} />
        </div>
        <CelebrityStrip />
      </section>

      {/* 10. FAQ (의료관광 반론 — 당일·통역·동일가·체류일) */}
      <HomeFaq />

      {/* 11. LINE 상담 (단일 회수 경로) */}
      <section id="reservation" className="py-14 lg:py-20">
        <div className="mx-auto max-w-screen-2xl lg:px-6">
          <SectionHeader
            kicker={t("reservation.kicker")}
            title={t("reservation.title")}
            subtitle={t("reservation.subtitle")}
          />
        </div>
        <div className="mt-8">
          <LineConsult placement="home_reservation" />
        </div>
      </section>

      {/* 12. Final LINE CTA (cta_view 노출 추적) */}
      <ViewTracker event="cta_view">
        <FinalCta />
      </ViewTracker>
    </>
  );
}
