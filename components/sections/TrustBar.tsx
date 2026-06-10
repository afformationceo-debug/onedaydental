import { getTranslations } from "next-intl/server";
import { CalendarCheck, Languages, BadgePercent, FlaskConical } from "lucide-react";

/** Trust strip under the hero — sharp data-row style (放心 anchor). */
export default async function TrustBar() {
  const t = await getTranslations("trustBar");
  const items = [
    { Icon: CalendarCheck, label: t("sameday"), no: "01" },
    { Icon: Languages, label: t("interpreter"), no: "02" },
    { Icon: BadgePercent, label: t("samePrice"), no: "03" },
    { Icon: FlaskConical, label: t("lab"), no: "04" },
  ];

  return (
    <section className="relative z-10 -mt-px border-y border-ink-100 bg-surface">
      <div className="mx-auto grid max-w-screen-2xl grid-cols-2 divide-x divide-y divide-ink-100 sm:grid-cols-4 sm:divide-y-0 lg:px-6">
        {items.map(({ Icon, label, no }) => (
          <div
            key={no}
            className="group flex items-center gap-3 px-4 py-4 transition hover:bg-surface-soft lg:px-6 lg:py-5"
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-900 text-mint-400 transition group-hover:scale-105">
              <Icon className="size-[18px]" strokeWidth={2.2} />
            </span>
            <div className="min-w-0">
              <span className="font-mono text-[10px] font-bold tracking-widest text-mint-600">
                {no}
              </span>
              <p className="truncate text-[12.5px] font-bold leading-tight text-ink-800">
                {label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
