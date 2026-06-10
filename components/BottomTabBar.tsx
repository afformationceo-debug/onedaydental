"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Home, Smile, CalendarCheck, Star } from "lucide-react";
import { SiLine } from "react-icons/si";
import { primaryMessenger } from "@/lib/config";
import { trackConsultClick } from "@/lib/track";
import type { Locale } from "@/lib/types";
import { cn } from "@/lib/cn";

type Tab = {
  href: "/" | "/treatments" | "/reservation" | "/reviews";
  key: string;
  Icon: typeof Home;
  primary?: boolean;
};

const TABS: Tab[] = [
  { href: "/", key: "home", Icon: Home },
  { href: "/treatments", key: "treatments", Icon: Smile },
  { href: "/reservation", key: "reserve", Icon: CalendarCheck, primary: true },
  { href: "/reviews", key: "reviews", Icon: Star },
];

export default function BottomTabBar() {
  const t = useTranslations("tabbar");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const line = primaryMessenger(locale);

  return (
    <nav
      aria-label="Primary"
      className="sticky bottom-0 z-40 mt-auto border-t border-ink-100 bg-white/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden"
    >
      <ul className="grid grid-cols-5">
        {TABS.map(({ href, key, Icon, primary }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          if (primary) {
            return (
              <li key={href} className="relative">
                <Link
                  href={href}
                  className="flex flex-col items-center gap-1 pb-1.5 pt-2"
                  aria-label={t(key)}
                >
                  <span className="-mt-5 grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-lg shadow-brand-500/30 ring-4 ring-white transition active:scale-95">
                    <Icon className="size-5" strokeWidth={2.4} />
                  </span>
                  <span className="text-[10px] font-bold text-brand-700">{t(key)}</span>
                </Link>
              </li>
            );
          }
          return (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  "flex flex-col items-center gap-1 py-2.5 text-[10px] font-semibold transition",
                  active ? "text-brand-600" : "text-ink-400 hover:text-ink-700",
                )}
              >
                <Icon className="size-[19px]" strokeWidth={active ? 2.5 : 2} />
                <span>{t(key)}</span>
              </Link>
            </li>
          );
        })}

        {/* LINE consult — TW primary conversion channel */}
        <li>
          <a
            href={line.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackConsultClick({ channel: "line", locale, placement: "tabbar" })
            }
            aria-label="LINE"
            className="flex flex-col items-center gap-1 py-2.5 text-[10px] font-bold text-[#06C755] transition active:scale-95"
          >
            <SiLine className="size-[19px]" />
            <span>{t("consult")}</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
