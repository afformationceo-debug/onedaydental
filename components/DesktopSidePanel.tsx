import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getClinic } from "@/lib/clinic";
import { tx } from "@/lib/i18n-text";
import type { Locale } from "@/lib/types";
import {
  ShieldCheck,
  Languages,
  BadgePercent,
  TrainFront,
  MapPin,
  ArrowRight,
} from "lucide-react";
import Logo from "./Logo";
import MessengerButtons from "./MessengerButtons";
import LanguageSwitcher from "./LanguageSwitcher";

export default async function DesktopSidePanel() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations();
  const clinic = getClinic();

  const usps = [
    { Icon: BadgePercent, text: t("trust.samePrice") },
    { Icon: Languages, text: t("trust.interpreter") },
    { Icon: ShieldCheck, text: t("trust.guarantee") },
    { Icon: TrainFront, text: t("trust.registered") },
  ];

  return (
    <aside className="sticky top-0 hidden h-dvh w-[340px] shrink-0 flex-col justify-between overflow-hidden py-10 lg:flex">
      <div>
        <Logo />

        <h2 className="mt-10 text-[2.1rem] font-extrabold leading-[1.15] tracking-tight text-ink-900">
          {tx(clinic.tagline, locale)}
        </h2>
        <p className="mt-4 max-w-[290px] text-[14px] leading-relaxed text-ink-500">
          {tx(clinic.intro, locale).slice(0, 96)}…
        </p>

        <ul className="mt-8 space-y-2.5">
          {usps.map(({ Icon, text }, i) => (
            <li key={i} className="flex items-center gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-surface text-brand-600 shadow-sm ring-1 ring-brand-100">
                <Icon className="size-[18px]" strokeWidth={2.2} />
              </span>
              <span className="text-[13.5px] font-semibold text-ink-700">{text}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-3.5">
        <Link
          href="/reservation"
          className="group flex items-center justify-between rounded-2xl bg-gradient-to-r from-clay-500 to-clay-600 px-5 py-4 text-white shadow-lg shadow-clay-500/30 transition hover:shadow-xl"
        >
          <span className="text-[15px] font-extrabold">{t("hero.ctaPrimary")}</span>
          <ArrowRight className="size-5 transition group-hover:translate-x-1" />
        </Link>
        <div className="flex items-center gap-2 rounded-2xl bg-surface/70 px-4 py-3 text-xs font-semibold text-ink-600 shadow-sm ring-1 ring-ink-100">
          <MapPin className="size-4 shrink-0 text-brand-500" />
          {tx(clinic.address, locale)}
        </div>
        <MessengerButtons placement="side_panel" variant="row" />
        <LanguageSwitcher />
      </div>
    </aside>
  );
}
