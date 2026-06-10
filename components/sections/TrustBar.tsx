import { getTranslations } from "next-intl/server";
import { CalendarCheck, Languages, BadgePercent, FlaskConical } from "lucide-react";

/** Compact trust-badge strip right under the hero (放心 anchor). */
export default async function TrustBar() {
  const t = await getTranslations("trustBar");
  const items = [
    { Icon: CalendarCheck, label: t("sameday") },
    { Icon: Languages, label: t("interpreter") },
    { Icon: BadgePercent, label: t("samePrice") },
    { Icon: FlaskConical, label: t("lab") },
  ];

  return (
    <section className="px-5 pt-8">
      <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {items.map(({ Icon, label }, i) => (
          <li
            key={i}
            className="flex items-center gap-2 rounded-2xl border border-brand-100 bg-surface-soft px-3 py-2.5"
          >
            <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-white text-brand-600 shadow-sm ring-1 ring-brand-100">
              <Icon className="size-4" strokeWidth={2.3} />
            </span>
            <span className="text-[11.5px] font-bold leading-tight text-ink-700">
              {label}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
