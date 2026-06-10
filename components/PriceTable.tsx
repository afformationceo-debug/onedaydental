import { getLocale, getTranslations } from "next-intl/server";
import { getClinic } from "@/lib/clinic";
import { tx } from "@/lib/i18n-text";
import type { Locale, PriceItem } from "@/lib/types";
import { BadgePercent, Info } from "lucide-react";

/** Approx KRW(만원) → NT$ conversion. 1만원 ≈ NT$233 (변동 환율, 대략치). */
const NT_PER_MAN = 233;

function PriceCell({
  p,
  locale,
  inquireLabel,
  manLabel,
  approxLabel,
}: {
  p: PriceItem;
  locale: Locale;
  inquireLabel: string;
  manLabel: string;
  approxLabel: string;
}) {
  // 1) free-text range (e.g. "30~50")
  if (p.priceText) {
    const txt = tx(p.priceText, locale);
    const nt =
      locale === "zh-TW"
        ? approxNT(txt)
        : null;
    return (
      <div className="text-right">
        <span className="text-[14px] font-extrabold text-ink-900">
          {txt}
          <span className="ml-0.5 text-[11px] font-bold text-ink-500">{manLabel}</span>
        </span>
        {nt && <p className="text-[10.5px] font-semibold text-ink-400">{nt}</p>}
      </div>
    );
  }

  // 2) numeric (만원) with optional original strikethrough + NT$ approx
  if (p.priceKRW != null) {
    const nt = locale === "zh-TW" ? `${approxLabel} NT$${(p.priceKRW * NT_PER_MAN).toLocaleString("en-US")}` : null;
    return (
      <div className="text-right">
        <span className="inline-flex items-baseline gap-1.5">
          {p.originalKRW != null && (
            <span className="text-[11.5px] font-semibold text-ink-300 line-through">
              {p.originalKRW}
            </span>
          )}
          <span className="text-[15px] font-extrabold text-ink-900">
            {p.priceKRW}
            <span className="ml-0.5 text-[11px] font-bold text-ink-500">{manLabel}</span>
          </span>
        </span>
        {nt && <p className="text-[10.5px] font-semibold text-ink-400">{nt}</p>}
      </div>
    );
  }

  // 3) consult-only
  return (
    <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[11.5px] font-bold text-brand-700">
      {inquireLabel}
    </span>
  );

  /** Convert "30~50" → "約 NT$6,990~11,650" for the TW reader. */
  function approxNT(text: string): string | null {
    const nums = text.match(/\d+/g);
    if (!nums) return null;
    const conv = nums.map((n) => `NT$${(parseInt(n, 10) * NT_PER_MAN).toLocaleString("en-US")}`);
    return `${approxLabel} ${conv.join("~")}`;
  }
}

export default async function PriceTable() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("prices");
  const clinic = getClinic();
  const manLabel = t("unitMan");
  const approxLabel = t("approx");

  // group by category (insertion order preserved)
  const groups = new Map<string, PriceItem[]>();
  for (const p of clinic.prices) {
    const key = tx(p.category, locale);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(p);
  }

  return (
    <div className="px-5">
      <div className="mb-4 flex items-center gap-2 rounded-2xl bg-gold-500/12 px-4 py-3 ring-1 ring-gold-500/25">
        <BadgePercent className="size-5 shrink-0 text-gold-600" />
        <p className="text-[13px] font-bold text-ink-800">{t("samePrice")}</p>
      </div>

      <div className="overflow-hidden rounded-3xl ring-1 ring-ink-100">
        {[...groups.entries()].map(([cat, items]) => (
          <div key={cat}>
            <div className="bg-brand-600 px-4 py-2.5 text-[12px] font-extrabold tracking-wide text-white">
              {cat}
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-surface-soft text-[11px] font-bold uppercase text-ink-400">
                  <th className="px-4 py-2 text-left">{t("colTreatment")}</th>
                  <th className="px-2 py-2 text-center">{t("colUnit")}</th>
                  <th className="px-4 py-2 text-right">{t("colPrice")}</th>
                </tr>
              </thead>
              <tbody>
                {items.map((p) => (
                  <tr key={p.id} className="border-t border-ink-50 bg-white align-top">
                    <td className="px-4 py-3">
                      <p className="text-[13.5px] font-semibold text-ink-800">
                        {tx(p.name, locale)}
                      </p>
                      {p.note && (
                        <p className="mt-0.5 text-[11px] leading-snug text-ink-400">
                          {tx(p.note, locale)}
                        </p>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-2 py-3 text-center text-[12px] text-ink-500">
                      {p.unit ? tx(p.unit, locale) : "-"}
                    </td>
                    <td className="px-4 py-3">
                      <PriceCell
                        p={p}
                        locale={locale}
                        inquireLabel={t("inquire")}
                        manLabel={manLabel}
                        approxLabel={approxLabel}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      <p className="mt-4 flex gap-2 text-[12px] leading-relaxed text-ink-500">
        <Info className="mt-0.5 size-4 shrink-0 text-ink-300" />
        {t("note")}
      </p>
    </div>
  );
}
