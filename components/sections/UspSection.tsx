import Image from "next/image";
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

          // Featured USP with a real facility photo (ONE LAB = 당일완성 근거) — spans both columns
          if (u.image) {
            return (
              <Reveal key={i} delay={i * 0.05} className="col-span-2">
                <div className="relative h-full overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-ink-100">
                  <div className="relative aspect-[16/9] w-full overflow-hidden">
                    <Image
                      src={u.image}
                      alt={tx(u.title, locale)}
                      fill
                      sizes="(max-width: 768px) 100vw, 460px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/15 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <span className="inline-grid size-9 place-items-center rounded-xl bg-white/90 text-brand-600 shadow-sm backdrop-blur">
                        <Icon className="size-[18px]" strokeWidth={2.3} />
                      </span>
                      <h3 className="mt-2 text-[15px] font-extrabold text-white">
                        {tx(u.title, locale)}
                      </h3>
                      <p className="mt-1 text-[12px] leading-relaxed text-white/85">
                        {tx(u.desc, locale)}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          }

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
