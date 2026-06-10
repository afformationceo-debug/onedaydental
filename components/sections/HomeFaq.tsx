import { getTranslations } from "next-intl/server";
import { HelpCircle, ChevronDown } from "lucide-react";
import { SectionHeader } from "./Section";

/** Home FAQ — medical-tourism objections (당일완성·통역·동일가·체류일). */
export default async function HomeFaq() {
  const t = await getTranslations("faq");
  const items = t.raw("items") as { q: string; a: string }[];

  return (
    <section className="bg-surface py-14 lg:py-20">
      <div className="mx-auto max-w-screen-2xl lg:px-6">
        <SectionHeader kicker={t("kicker")} title={t("title")} />
        <div className="mt-8 overflow-hidden rounded-xl border border-ink-100 lg:mx-0">
          {items.map((f, i) => (
            <details
              key={i}
              className="group border-b border-ink-100 bg-surface px-5 py-1 transition last:border-b-0 open:bg-surface-soft"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-4 text-[14.5px] font-bold text-ink-900">
                <span className="flex items-center gap-3">
                  <span className="grid size-7 shrink-0 place-items-center rounded-md bg-brand-50 text-brand-700 transition group-open:bg-mint-400 group-open:text-brand-950">
                    <HelpCircle className="size-4" />
                  </span>
                  {f.q}
                </span>
                <ChevronDown className="size-5 shrink-0 text-ink-400 transition group-open:rotate-180 group-open:text-mint-500" />
              </summary>
              <p className="pb-5 pl-10 text-[13.5px] leading-relaxed text-ink-600">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
