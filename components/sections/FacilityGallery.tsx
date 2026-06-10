import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/lib/types";
import { Sparkles, CalendarCheck } from "lucide-react";
import { SectionHeader } from "./Section";
import Reveal from "../Reveal";

/**
 * Facility gallery — shows the REAL 강남 3개관 + 자체 디지털 기공소(원랩).
 * The ONE LAB block is the trust anchor (放心): in-house lab = 당일 완성 근거.
 * All photos are optimized assets under /public/facility (committed).
 */

type Shot = { src: string; alt: { ko: string; "zh-TW": string } };

// ONE LAB feature shots — in-house lab = same-day completion evidence
const ONELAB: Shot[] = [
  {
    src: "/facility/onelab/onelab-11.jpg",
    alt: { ko: "원랩(ONE LAB) — ONEDAY DENTISTRY LAB 자체 기공소", "zh-TW": "ONE LAB — ONEDAY DENTISTRY LAB 自家牙技所" },
  },
  {
    src: "/facility/onelab/onelab-10.jpg",
    alt: { ko: "보철 색조(쉐이드) 가이드 — 자연치 색상 맞춤", "zh-TW": "假牙色階導板 — 配合自然牙色澤" },
  },
  {
    src: "/facility/onelab/onelab-06.jpg",
    alt: { ko: "원랩 입구 — 원내 즉시 제작 동선", "zh-TW": "ONE LAB 入口 — 院內即時製作動線" },
  },
];

// Mixed facility shots across the 3 halls (clinic interiors / equipment)
const HALLS: Shot[] = [
  {
    src: "/facility/hall1/hall1-01.jpg",
    alt: { ko: "제1관 스마일 디자인센터 — 디지털 정밀 진단 장비", "zh-TW": "1館 微笑設計中心 — 數位精密診斷設備" },
  },
  {
    src: "/facility/hall3/hall3-11.jpg",
    alt: { ko: "진료실 — 1인 1체어 진료 공간", "zh-TW": "診療室 — 一人一椅診療空間" },
  },
  {
    src: "/facility/hall2/hall2-01.jpg",
    alt: { ko: "제2관 라운지 — 편안한 대기 공간", "zh-TW": "2館 候診區 — 舒適的休憩空間" },
  },
  {
    src: "/facility/hall3/hall3-08.jpg",
    alt: { ko: "유리벽 진료 공간 — 투명하게 들여다보는 ONEDAY", "zh-TW": "玻璃帷幕診療空間 — 透明可見的 ONEDAY" },
  },
];

export default async function FacilityGallery() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("facility");
  const tr = (s: Shot) => s.alt[locale] ?? s.alt.ko;

  return (
    <section className="py-14 lg:py-20">
      <div className="mx-auto max-w-screen-2xl lg:px-6">
        <SectionHeader kicker={t("kicker")} title={t("title")} subtitle={t("subtitle")} />

        {/* ONE LAB feature — trust anchor (compact, navy framed) */}
        <div className="mt-8 px-5 lg:px-0">
          <Reveal>
            <div className="grid overflow-hidden rounded-xl border border-ink-100 bg-surface lg:grid-cols-[1.4fr_1fr]">
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-brand-950 lg:aspect-auto lg:min-h-[280px]">
                <Image
                  src={ONELAB[0].src}
                  alt={tr(ONELAB[0])}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/85 via-brand-950/10 to-transparent" />
                <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-md bg-mint-400 px-3 py-1.5 text-[11px] font-bold text-brand-950 shadow-md">
                  <CalendarCheck className="size-3.5" strokeWidth={2.4} />
                  {t("onelabBadge")}
                </span>
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h3 className="font-display text-[17px] font-bold text-white">
                    {t("onelabTitle")}
                  </h3>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-ink-200">
                    {t("onelabDesc")}
                  </p>
                </div>
              </div>

              {/* secondary ONE LAB strip */}
              <div className="grid grid-cols-2 gap-1 p-1 lg:grid-cols-1 lg:grid-rows-2">
                {ONELAB.slice(1).map((shot) => (
                  <div
                    key={shot.src}
                    className="relative aspect-[4/3] overflow-hidden rounded-lg lg:aspect-auto"
                  >
                    <Image
                      src={shot.src}
                      alt={tr(shot)}
                      fill
                      sizes="(max-width: 1024px) 50vw, 280px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* 3개관 시설 갤러리 — compact grid */}
        <div className="mt-8 px-5 lg:px-0">
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="size-4 text-mint-500" />
            <h3 className="font-display text-[16px] font-bold text-ink-900">
              {t("hallsTitle")}
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {HALLS.map((shot, i) => (
              <Reveal key={shot.src} delay={i * 0.04} className={i === 0 ? "col-span-2" : ""}>
                <figure className="group relative overflow-hidden rounded-xl border border-ink-100">
                  <div
                    className={`relative w-full overflow-hidden ${
                      i === 0 ? "aspect-[16/9]" : "aspect-[4/3]"
                    }`}
                  >
                    <Image
                      src={shot.src}
                      alt={tr(shot)}
                      fill
                      sizes={
                        i === 0
                          ? "(max-width: 1024px) 100vw, 480px"
                          : "(max-width: 1024px) 50vw, 280px"
                      }
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-950/70 to-transparent opacity-0 transition group-hover:opacity-100" />
                  </div>
                  <figcaption className="absolute inset-x-0 bottom-0 translate-y-1 p-3 text-[11.5px] font-semibold text-white opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                    {tr(shot)}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
