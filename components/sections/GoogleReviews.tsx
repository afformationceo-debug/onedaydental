"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Star, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { SiGoogle } from "react-icons/si";
import { GOOGLE_REVIEWS } from "@/lib/google-reviews";
import type { Locale } from "@/lib/types";

/**
 * 실제 Google 지도 5★ 리뷰(1·2·3관 전수, 한국 환자)를 번체로 표시.
 * 6칸씩 페이지네이션(← → · 점 인디케이터) — 리뷰는 읽는 콘텐츠라 정독 가능하게.
 * ★ 사이트 내 표시(번역+출처+원문언어 명시)이며 구글맵 직접 게시가 아니다.
 * 하단 3개관 구글맵 링크로 실제 리뷰임을 검증 가능(투명성).
 */

const PER_PAGE = 6;

const MAPS = [
  { label: "1館", url: "https://maps.app.goo.gl/Aj3NUyUPkgiA15udA" },
  { label: "2館", url: "https://maps.app.goo.gl/2rQDHq8LvBhuDUMT9" },
  { label: "3館", url: "https://maps.app.goo.gl/K7H5gNuTafr5h5D48" },
];

const HALL: Record<string, Record<Locale, string>> = {
  "1": { "zh-TW": "江南 1館", ko: "강남 1관" },
  "2": { "zh-TW": "江南 2館", ko: "강남 2관" },
  "3": { "zh-TW": "江南 3館", ko: "강남 3관" },
};

export default function GoogleReviews() {
  const locale = useLocale() as Locale;
  const t = useTranslations("googleReviews");
  const [page, setPage] = useState(0);

  const pages = Math.ceil(GOOGLE_REVIEWS.length / PER_PAGE);
  const slice = GOOGLE_REVIEWS.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);
  const go = (d: number) => setPage((p) => (p + d + pages) % pages);

  return (
    <section className="py-14 lg:py-20">
      <div className="mx-auto max-w-screen-2xl px-5 lg:px-6">
        {/* Header + desktop nav */}
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[12px] font-bold uppercase tracking-widest text-mint-600">
              {t("kicker")}
            </p>
            <h2 className="mt-2 font-display text-[clamp(1.5rem,4vw,2.1rem)] font-bold leading-tight text-ink-900">
              {t("title")}
            </h2>
            <p className="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-ink-500">
              {t("subtitle")}
            </p>
          </div>
          <div className="hidden shrink-0 items-center gap-2 sm:flex">
            <NavBtn dir="prev" onClick={() => go(-1)} />
            <span className="min-w-[44px] text-center font-mono text-[13px] font-bold text-ink-500">
              {page + 1}/{pages}
            </span>
            <NavBtn dir="next" onClick={() => go(1)} />
          </div>
        </div>

        {/* 6-up grid */}
        <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {slice.map((r, i) => (
            <li
              key={`${page}-${i}`}
              className="flex flex-col rounded-xl border border-ink-100 bg-surface p-5 shadow-tech transition hover:border-mint-400 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-0.5" aria-label="5 / 5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="size-4" style={{ fill: "#f59e0b", color: "#f59e0b" }} strokeWidth={0} />
                  ))}
                </div>
                <SiGoogle className="size-4 text-ink-300" aria-hidden />
              </div>

              <span className="mt-3 inline-flex w-fit items-center rounded-full bg-mint-400/15 px-2.5 py-0.5 text-[11px] font-bold text-mint-600">
                {HALL[r.hall][locale]}
              </span>

              <blockquote className="mt-3 flex-1 text-[13.5px] leading-relaxed text-ink-700">
                “{r.body[locale]}”
              </blockquote>

              <figcaption className="mt-4 border-t border-ink-100 pt-3 text-[11.5px] font-medium text-ink-400">
                {t("source")}
              </figcaption>
            </li>
          ))}
        </ul>

        {/* Mobile nav */}
        <div className="mt-6 flex items-center justify-center gap-4 sm:hidden">
          <NavBtn dir="prev" onClick={() => go(-1)} />
          <span className="font-mono text-[13px] font-bold text-ink-500">
            {page + 1} / {pages}
          </span>
          <NavBtn dir="next" onClick={() => go(1)} />
        </div>

        {/* Page dots */}
        <div className="mt-5 flex flex-wrap justify-center gap-1.5">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              aria-label={`${i + 1}`}
              aria-current={i === page}
              className={`h-1.5 rounded-full transition-all ${
                i === page ? "w-5 bg-mint-500" : "w-1.5 bg-ink-200 hover:bg-ink-300"
              }`}
            />
          ))}
        </div>

        {/* 검증 링크 + 면책 */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
          <span className="text-[12.5px] font-semibold text-ink-500">{t("moreOnGoogle")}</span>
          {MAPS.map((m) => (
            <a
              key={m.label}
              href={m.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-surface px-3.5 py-1.5 text-[12.5px] font-bold text-brand-700 transition hover:border-mint-400 hover:bg-surface-soft"
            >
              <SiGoogle className="size-3.5" />
              {m.label}
              <ExternalLink className="size-3" />
            </a>
          ))}
        </div>

        <p className="mx-auto mt-5 max-w-3xl text-center text-[11.5px] leading-relaxed text-ink-400">
          {t("disclaimer")}
        </p>
      </div>
    </section>
  );
}

function NavBtn({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={dir === "prev" ? "previous" : "next"}
      className="grid size-10 place-items-center rounded-full border border-ink-200 bg-surface text-brand-700 transition hover:border-mint-400 hover:bg-surface-soft active:scale-95"
    >
      {dir === "prev" ? <ChevronLeft className="size-5" /> : <ChevronRight className="size-5" />}
    </button>
  );
}
