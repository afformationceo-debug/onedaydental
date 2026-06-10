import { getLocale } from "next-intl/server";
import { getClinic } from "@/lib/clinic";
import { tx } from "@/lib/i18n-text";
import type { Locale } from "@/lib/types";
import { getIcon } from "@/lib/icons";

/** Horizontal scroll of treatment categories with distinctive icons. */
export default async function CategoryChips() {
  const locale = (await getLocale()) as Locale;
  const clinic = getClinic();

  return (
    <div className="no-scrollbar flex gap-2.5 overflow-x-auto px-5 pb-1">
      {clinic.categories.map((c) => {
        const Icon = getIcon(c.icon);
        return (
          <a
            key={c.id}
            href={`#cat-${c.id}`}
            className="flex shrink-0 items-center gap-2 rounded-2xl border border-ink-100 bg-white px-3.5 py-2.5 shadow-sm transition hover:border-brand-300 hover:shadow-md"
          >
            <span className="grid size-8 place-items-center rounded-xl bg-brand-50 text-brand-600">
              <Icon className="size-[18px]" strokeWidth={2.2} />
            </span>
            <span className="whitespace-nowrap text-[13px] font-bold text-ink-800">
              {tx(c.name, locale)}
            </span>
          </a>
        );
      })}
    </div>
  );
}
