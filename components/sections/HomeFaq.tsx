import { getTranslations } from "next-intl/server";
import { HelpCircle, ChevronDown } from "lucide-react";
import { SectionHeader } from "./Section";

/** Home FAQ — medical-tourism objections (당일완성·통역·동일가·체류일). */
export default async function HomeFaq() {
  const t = await getTranslations("faq");
  const items = t.raw("items") as { q: string; a: string }[];

  return (
    <section className="bg-surface-soft py-11">
      <SectionHeader kicker={t("kicker")} title={t("title")} />
      <div className="mt-5 space-y-2.5 px-5">
        {items.map((f, i) => (
          <details
            key={i}
            className="group rounded-2xl border border-ink-100 bg-white p-4 open:bg-brand-50/40"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[14px] font-bold text-ink-900">
              <span className="flex items-center gap-2">
                <HelpCircle className="size-4 shrink-0 text-brand-500" />
                {f.q}
              </span>
              <ChevronDown className="size-4 shrink-0 text-ink-400 transition group-open:rotate-180" />
            </summary>
            <p className="mt-3 pl-6 text-[13.5px] leading-relaxed text-ink-600">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
