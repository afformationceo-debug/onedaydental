import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import MessengerButtons from "../MessengerButtons";

export default async function FinalCta() {
  const t = await getTranslations("finalCta");
  return (
    <section className="px-5 py-11">
      <div className="overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-brand-600 to-brand-800 p-7 text-white shadow-xl shadow-brand-900/25">
        <h2 className="text-[1.5rem] font-extrabold leading-tight tracking-tight">
          {t("title")}
        </h2>
        <p className="mt-2 text-[13.5px] leading-relaxed text-white/80">{t("subtitle")}</p>
        <Link
          href="/reservation"
          className="group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-clay-400 to-clay-500 py-3.5 text-[15px] font-extrabold text-white shadow-lg shadow-clay-900/30 transition active:scale-[0.98]"
        >
          {t("button")}
          <ArrowRight className="size-5 transition group-hover:translate-x-0.5" />
        </Link>
        <div className="mt-4 flex justify-center">
          <MessengerButtons placement="final_cta" variant="row" />
        </div>
      </div>
    </section>
  );
}
