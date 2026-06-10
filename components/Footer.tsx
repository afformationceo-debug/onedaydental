import { getLocale, getTranslations } from "next-intl/server";
import { getClinic } from "@/lib/clinic";
import { tx } from "@/lib/i18n-text";
import type { Locale } from "@/lib/types";
import { MapPin, Clock, Phone } from "lucide-react";
import Logo from "./Logo";

export default async function Footer() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("footer");
  const clinic = getClinic();

  return (
    <footer className="border-t border-ink-100 bg-ink-900 px-5 pb-8 pt-10 text-ink-200">
      <Logo variant="light" />

      <div className="mt-6 space-y-3 text-sm">
        <p className="flex items-start gap-2.5">
          <MapPin className="mt-0.5 size-4 shrink-0 text-brand-300" />
          <span>{tx(clinic.address, locale)}</span>
        </p>
        <div className="flex items-start gap-2.5">
          <Clock className="mt-0.5 size-4 shrink-0 text-brand-300" />
          <ul className="space-y-0.5">
            {clinic.hours.map((h, i) => (
              <li key={i}>{tx(h, locale)}</li>
            ))}
          </ul>
        </div>
        <p className="flex items-center gap-2.5">
          <Phone className="size-4 shrink-0 text-brand-300" />
          <a href={`tel:${clinic.phone}`} className="hover:text-white">
            {clinic.phone}
          </a>
        </p>
      </div>

      <p className="mt-6 border-t border-white/10 pt-5 text-[11px] leading-relaxed text-ink-400">
        {t("disclaimer")}
      </p>
      <p className="mt-3 text-[11px] text-ink-500">{t("rights")}</p>
    </footer>
  );
}
