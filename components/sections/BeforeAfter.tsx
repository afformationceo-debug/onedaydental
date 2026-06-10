import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ImageIcon, ArrowRight } from "lucide-react";
import { SectionHeader } from "./Section";

/**
 * Before & After placeholder. Real B&A imagery is pending — this renders an
 * honest "준비중 / 案例準備中" state with a structured grid so real pairs can be
 * dropped in later (replace the placeholder tiles with <Image> pairs).
 */
export default async function BeforeAfter() {
  const t = await getTranslations("beforeAfter");

  return (
    <section className="py-11">
      <SectionHeader kicker={t("kicker")} title={t("title")} subtitle={t("subtitle")} />

      <div className="mt-6 grid grid-cols-2 gap-3 px-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="grain relative flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-surface-soft to-brand-50 ring-1 ring-ink-100"
          >
            <span className="grid size-11 place-items-center rounded-xl bg-white/70 text-brand-400 shadow-sm ring-1 ring-brand-100 backdrop-blur">
              <ImageIcon className="size-5" strokeWidth={1.8} />
            </span>
            <span className="text-[11px] font-bold text-ink-400">{t("preparing")}</span>
          </div>
        ))}
      </div>

      <p className="mx-5 mt-4 text-[11.5px] leading-relaxed text-ink-400">{t("note")}</p>

      <div className="mt-5 px-5">
        <Link
          href="/reservation"
          className="group flex items-center justify-center gap-2 rounded-2xl border border-brand-200 bg-brand-50 py-3 text-[14px] font-bold text-brand-700 transition hover:bg-brand-100"
        >
          {t("cta")}
          <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
}
