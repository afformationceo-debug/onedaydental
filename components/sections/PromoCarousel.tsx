import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/types";
import { SectionHeader } from "./Section";

/**
 * 미백/라미 비주얼 캐러셀 — 광고(미백/라미)로 유입된 사용자가 히어로 직후
 * "이게 당신이 찾던 시술"을 즉시 비주얼로 확인하게 한다. (브리프 §4-2)
 * 온보딩 캐러셀 카드(9:16, K-뷰티 모델 + 시술 소구, 브랜드 톤 일치)를 가로 스와이프로.
 * 카드 클릭 → 해당 시술 상세. CSS scroll-snap(서버 컴포넌트, JS 0).
 */

type Slide = { src: string; slug: string; alt: Record<Locale, string> };

const SLIDES: Slide[] = [
  { src: "/promo/laminate-1.webp", slug: "laminate", alt: { "zh-TW": "陶瓷貼片・微調齒形", ko: "라미네이트" } },
  { src: "/promo/laminate-2.webp", slug: "laminate", alt: { "zh-TW": "什麼是陶瓷貼片", ko: "라미네이트 설명" } },
  { src: "/promo/laminate-3.webp", slug: "laminate", alt: { "zh-TW": "陶瓷貼片適合的人", ko: "라미네이트 적합 대상" } },
  { src: "/promo/laminate-4.webp", slug: "laminate", alt: { "zh-TW": "陶瓷貼片美學重點", ko: "라미네이트 심미 포인트" } },
  { src: "/promo/whitening-1.webp", slug: "dental-bleaching", alt: { "zh-TW": "牙齒美白・淨白笑容", ko: "치아미백" } },
  { src: "/promo/whitening-2.webp", slug: "dental-bleaching", alt: { "zh-TW": "什麼是牙齒美白", ko: "치아미백 설명" } },
  { src: "/promo/whitening-3.webp", slug: "dental-bleaching", alt: { "zh-TW": "牙齒美白適合的人", ko: "치아미백 적합 대상" } },
  { src: "/promo/whitening-4.webp", slug: "dental-bleaching", alt: { "zh-TW": "牙齒美白重點", ko: "치아미백 포인트" } },
];

export default async function PromoCarousel() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("promo");

  return (
    <section className="py-12 lg:py-16">
      <div className="mx-auto max-w-screen-2xl lg:px-6">
        <SectionHeader kicker={t("kicker")} title={t("title")} subtitle={t("subtitle")} />
      </div>

      <div className="mt-7 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <ul className="flex snap-x snap-mandatory gap-3.5 px-5 lg:px-6">
          {SLIDES.map((s, i) => (
            <li key={i} className="snap-start">
              <Link
                href={`/treatments/${s.slug}`}
                className="group block w-[228px] shrink-0 overflow-hidden rounded-2xl border border-ink-100 bg-surface shadow-tech transition hover:border-mint-400 hover:shadow-lg sm:w-[256px]"
              >
                <Image
                  src={s.src}
                  alt={s.alt[locale]}
                  width={720}
                  height={1200}
                  sizes="(max-width: 640px) 228px, 256px"
                  className="h-auto w-full"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto mt-6 max-w-md px-5 lg:px-0">
        <Link
          href="/treatments"
          className="group flex items-center justify-center gap-2 rounded-lg border border-ink-200 bg-surface py-3.5 text-[14px] font-bold text-brand-700 transition hover:border-mint-400 hover:bg-surface-soft"
        >
          {t("viewAll")}
          <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
}
