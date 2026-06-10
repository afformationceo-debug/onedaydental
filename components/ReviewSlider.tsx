"use client";

import { useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Quote, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { tx } from "@/lib/i18n-text";
import type { Locale, Review } from "@/lib/types";

/**
 * Story cards (celebrity visits + real patient stories). Text-first, no star
 * ratings — matches TW dental-benchmark compliance tone (실명/시술명/멘트 중심,
 * 별점 미사용). Links out to the source community page when available.
 */
export default function ReviewSlider({ reviews }: { reviews: Review[] }) {
  const t = useTranslations("reviews");
  const locale = useLocale() as Locale;
  const scroller = useRef<HTMLDivElement>(null);

  function scrollBy(dir: 1 | -1) {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * 284, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <div
        ref={scroller}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-2"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {reviews.map((r) => {
          const caption = tx(r.caption, locale);
          return (
            <article
              key={r.id}
              className="flex w-[270px] shrink-0 snap-start flex-col justify-between rounded-3xl bg-white p-5 shadow-sm ring-1 ring-ink-100"
            >
              <div>
                <span className="grid size-9 place-items-center rounded-xl bg-brand-50 text-brand-500">
                  <Quote className="size-4" strokeWidth={2.4} />
                </span>
                <p className="mt-3.5 text-[14.5px] font-semibold leading-relaxed text-ink-800">
                  {caption}
                </p>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-ink-50 pt-3">
                <span className="rounded-full bg-surface-soft px-2.5 py-1 text-[11px] font-bold text-brand-700">
                  {t(`country.${r.country}`)}
                </span>
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11.5px] font-bold text-ink-400 transition hover:text-brand-600"
                >
                  {t("watchMore")}
                  <ExternalLink className="size-3" />
                </a>
              </div>
            </article>
          );
        })}
        {/* trailing spacer so last card isn't flush to edge */}
        <div className="w-1 shrink-0" aria-hidden />
      </div>

      {/* Desktop arrow controls */}
      <button
        onClick={() => scrollBy(-1)}
        aria-label="Previous"
        className="absolute left-1 top-1/2 hidden -translate-y-1/2 place-items-center rounded-full border border-ink-100 bg-surface/90 p-2 text-ink-700 shadow-md backdrop-blur transition hover:text-brand-600 active:scale-90 lg:grid"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        onClick={() => scrollBy(1)}
        aria-label="Next"
        className="absolute right-1 top-1/2 hidden -translate-y-1/2 place-items-center rounded-full border border-ink-100 bg-surface/90 p-2 text-ink-700 shadow-md backdrop-blur transition hover:text-brand-600 active:scale-90 lg:grid"
      >
        <ChevronRight className="size-5" />
      </button>
    </div>
  );
}
