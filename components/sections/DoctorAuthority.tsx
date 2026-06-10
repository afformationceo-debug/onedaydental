import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getClinic } from "@/lib/clinic";
import { tx } from "@/lib/i18n-text";
import type { Locale } from "@/lib/types";
import { BadgeCheck, ArrowRight, Stethoscope } from "lucide-react";
import { SectionHeader } from "./Section";

/**
 * Authority spotlight for the lead doctor (Kim Jinhwan) — real career bullets,
 * real photo. Builds trust before treatments per TW dental-benchmark order.
 */
export default async function DoctorAuthority() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("authority");
  const clinic = getClinic();
  const lead = clinic.doctors[0];
  if (!lead) return null;

  const name = tx(lead.name, locale);
  const careers = lead.career.slice(0, 5);

  return (
    <section className="bg-gradient-to-b from-surface to-surface-soft py-11">
      <SectionHeader kicker={t("kicker")} title={t("title")} subtitle={t("subtitle")} />

      <div className="mt-6 px-5">
        <div className="overflow-hidden rounded-[1.75rem] bg-white shadow-md ring-1 ring-ink-100">
          <div className="flex gap-4 p-5">
            <div className="relative size-28 shrink-0 overflow-hidden rounded-2xl ring-1 ring-ink-100">
              {lead.photo ? (
                <Image
                  src={lead.photo}
                  alt={name}
                  fill
                  sizes="112px"
                  className="object-cover object-top"
                />
              ) : (
                <div className="grid h-full w-full place-items-center bg-brand-100 text-brand-600">
                  <Stethoscope className="size-8" />
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-[18px] font-extrabold leading-tight text-ink-900">{name}</h3>
              <p className="text-[12.5px] font-bold text-brand-600">{tx(lead.title, locale)}</p>
              <p className="mt-2 text-[12px] leading-relaxed text-ink-500">
                {tx(lead.specialty, locale)}
              </p>
            </div>
          </div>
          <ul className="space-y-2 border-t border-ink-50 bg-surface-soft/60 px-5 py-4">
            {careers.map((c, i) => (
              <li key={i} className="flex gap-2 text-[12.5px] leading-relaxed text-ink-700">
                <BadgeCheck className="mt-0.5 size-4 shrink-0 text-brand-500" strokeWidth={2.2} />
                <span>{tx(c, locale)}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/about"
            className="flex items-center justify-center gap-1.5 border-t border-ink-50 py-3.5 text-[13px] font-bold text-brand-700 transition hover:bg-brand-50"
          >
            {t("more")}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
