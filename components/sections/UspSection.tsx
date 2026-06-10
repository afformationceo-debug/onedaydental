import { getLocale, getTranslations } from "next-intl/server";
import { getClinic } from "@/lib/clinic";
import { tx } from "@/lib/i18n-text";
import type { Locale } from "@/lib/types";
import { getIcon } from "@/lib/icons";
import { SectionHeader } from "./Section";
import Reveal from "../Reveal";

export default async function UspSection() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("usp");
  const clinic = getClinic();

  return (
    <section className="bg-surface-soft py-11">
      <SectionHeader kicker={t("kicker")} title={t("title")} />
      <div className="mt-6 grid grid-cols-2 gap-3 px-5">
        {clinic.usps.map((u, i) => {
          const Icon = getIcon(u.icon);
          return (
            <Reveal key={i} delay={i * 0.05}>
              <div className="grain relative h-full overflow-hidden rounded-2xl bg-white p-4 shadow-sm ring-1 ring-ink-100">
                <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-brand-50 to-brand-100 text-brand-600">
                  <Icon className="size-[20px]" strokeWidth={2.2} />
                </span>
                <h3 className="mt-3 text-[14px] font-extrabold text-ink-900">
                  {tx(u.title, locale)}
                </h3>
                <p className="mt-1 text-[12px] leading-relaxed text-ink-500">
                  {tx(u.desc, locale)}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
