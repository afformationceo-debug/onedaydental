import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import MessengerButtons from "../MessengerButtons";

export default async function FinalCta() {
  const t = await getTranslations("finalCta");
  return (
    <section className="px-5 py-14 lg:py-20">
      <div className="mx-auto max-w-screen-2xl lg:px-6">
        <div className="tech-glow relative overflow-hidden rounded-2xl border border-brand-800 bg-brand-950 p-8 text-white lg:p-14">
          <div className="tech-grid absolute inset-0 opacity-50" />
          <div className="relative lg:max-w-2xl">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-mint-400">
              ONE DAY · ONE VISIT
            </span>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,5vw,2.6rem)] font-bold leading-[1.12] tracking-tight">
              {t("title")}
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-ink-200 lg:text-[15px]">
              {t("subtitle")}
            </p>
            <Link
              href="/reservation"
              className="group mt-7 inline-flex items-center justify-center gap-2 rounded-lg bg-mint-400 px-7 py-3.5 text-[15px] font-bold text-brand-950 shadow-[0_8px_30px_-8px] shadow-mint-400/60 transition hover:bg-mint-300 active:scale-[0.98]"
            >
              {t("button")}
              <ArrowRight className="size-5 transition group-hover:translate-x-0.5" />
            </Link>
            <div className="mt-5">
              <MessengerButtons placement="final_cta" variant="row" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
