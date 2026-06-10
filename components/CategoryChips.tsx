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
    <div className="no-scrollbar mx-auto flex max-w-screen-2xl gap-2.5 overflow-x-auto px-5 pb-1 lg:px-10">
      {clinic.categories.map((c) => {
        const Icon = getIcon(c.icon);
        return (
          <a
            key={c.id}
            href={`#cat-${c.id}`}
            className="group flex shrink-0 items-center gap-2 rounded-lg border border-ink-100 bg-surface px-3.5 py-2.5 transition hover:border-mint-400 hover:bg-surface-soft"
          >
            <span className="grid size-8 place-items-center rounded-md bg-brand-50 text-brand-700 transition group-hover:bg-mint-400/10 group-hover:text-mint-600">
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
