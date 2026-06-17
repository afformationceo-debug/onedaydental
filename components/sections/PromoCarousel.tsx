import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/types";
import { SectionHeader } from "./Section";

/**
 * 미백/라미 비주얼 마퀴 — 광고(미백/라미)로 유입된 사용자가 히어로 직후
 * "이게 당신이 찾던 시술"을 즉시 비주얼로 확인하게 한다. (브리프 §4-2)
 * - 자동 무한 마퀴(right→left, track 2배 복제 → -50% seamless loop, globals @keyframes marquee).
 * - hover/press 시 일시정지, motion-reduce 시 정지.
 * - 카드 aspect-[9/16] 고정으로 높이 통일(원본 비율 9:13.5~9:17.8이 들쭉날쭉 → object-cover).
 * - 카드 클릭 → 해당 시술 상세.
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
  // 트랙 2배 복제 → -50% translate가 seamless loop. (globals @keyframes marquee)
  const track = [...SLIDES, ...SLIDES];

  return (
    <section className="py-12 lg:py-16">
      <div className="mx-auto max-w-screen-2xl lg:px-6">
        <SectionHeader kicker={t("kicker")} title={t("title")} subtitle={t("subtitle")} />
      </div>

      <div className="group relative mt-7 overflow-hidden">
        {/* 양끝 페이드 마스크 */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-surface to-transparent lg:w-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-surface to-transparent lg:w-20" />

        <ul
          className="flex w-max gap-4 px-4 [animation:marquee_60s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:[animation:none]"
          aria-label={t("title")}
        >
          {track.map((s, i) => (
            <li key={`${s.src}-${i}`} className="shrink-0" aria-hidden={i >= SLIDES.length}>
              <Link
                href={`/treatments/${s.slug}`}
                tabIndex={i >= SLIDES.length ? -1 : 0}
                className="group/card block w-[190px] overflow-hidden rounded-2xl border border-ink-100 bg-surface shadow-tech transition hover:border-mint-400 hover:shadow-lg sm:w-[220px]"
              >
                <div className="relative aspect-[9/16] w-full overflow-hidden bg-surface-soft">
                  <Image
                    src={s.src}
                    alt={i < SLIDES.length ? s.alt[locale] : ""}
                    fill
                    sizes="(max-width: 640px) 190px, 220px"
                    className="object-cover object-top transition duration-500 group-hover/card:scale-[1.03]"
                  />
                </div>
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
