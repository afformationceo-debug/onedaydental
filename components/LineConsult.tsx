"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { SiLine, SiInstagram } from "react-icons/si";
import { QrCode, MessageCircle, BadgeCheck, Clock3 } from "lucide-react";
import { lineUrl, messengersByLocale, type Messenger } from "@/lib/config";
import { trackConsultClick } from "@/lib/track";
import type { Locale } from "@/lib/types";
import { cn } from "@/lib/cn";

const ICONS: Record<Messenger["type"], React.ComponentType<{ className?: string }>> = {
  line: SiLine,
  instagram: SiInstagram,
  kakao: MessageCircle,
};

/**
 * Direct-to-LINE consult block. Replaces the old name/contact input form.
 * The primary CTA is a crawlable <a href={LINE}> button (no JS gate), so a
 * single tap opens the official LINE channel. A QR slot lets desktop users
 * scan with their phone. Instagram is kept as a secondary channel.
 *
 * @param placement analytics placement tag (e.g. "reservation_page", "home_reservation")
 * @param treatment optional treatment name for analytics
 * @param compact   tighter layout for inline use inside a page section
 */
export default function LineConsult({
  placement,
  treatment = "",
  compact = false,
}: {
  placement: string;
  treatment?: string;
  compact?: boolean;
}) {
  const locale = useLocale() as Locale;
  const t = useTranslations("reservation");
  const lineQr = process.env.NEXT_PUBLIC_LINE_QR;
  // Secondary channels (Instagram etc.) — LINE is rendered as the hero button.
  const secondary = messengersByLocale[locale].filter((m) => m.type !== "line");

  return (
    <div className="mx-auto w-full max-w-3xl px-5">
      <div className="overflow-hidden rounded-xl bg-gradient-to-br from-[#06C755] to-[#04a948] p-6 text-white shadow-xl shadow-[#06C755]/25 sm:p-8">
        <div className={cn("grid items-center gap-6", !compact && "sm:grid-cols-[1fr_auto]")}>
          {/* Copy + primary CTA */}
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-[11px] font-bold backdrop-blur">
              <SiLine className="size-3.5" />
              LINE
            </span>
            <h3 className="mt-3 font-display text-[1.45rem] font-bold leading-tight tracking-tight">
              {t("title")}
            </h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-white/85">
              {t("subtitle")}
            </p>

            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[12.5px] font-semibold text-white/90">
              <li className="inline-flex items-center gap-1.5">
                <BadgeCheck className="size-4" strokeWidth={2.4} />
                {t("free")}
              </li>
              <li className="inline-flex items-center gap-1.5">
                <Clock3 className="size-4" strokeWidth={2.4} />
                {t("oneMinute")}
              </li>
            </ul>

            <a
              href={lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackConsultClick({ channel: "line", treatment, locale, placement })}
              className="mt-5 inline-flex w-full items-center justify-center gap-2.5 rounded-lg bg-white py-4 text-[16px] font-extrabold text-[#06C755] shadow-lg transition hover:shadow-xl active:scale-[0.98] sm:w-auto sm:px-8"
            >
              <SiLine className="size-6" />
              {t("submit")}
            </a>

            {secondary.length > 0 && (
              <div className="mt-4 flex flex-wrap items-center gap-2.5">
                <span className="text-[12px] font-semibold text-white/70">{t("or")}</span>
                {secondary.map((m) => {
                  const Icon = ICONS[m.type];
                  return (
                    <a
                      key={m.type}
                      href={m.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackConsultClick({ channel: m.type, treatment, locale, placement })
                      }
                      className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-2 text-[13px] font-bold backdrop-blur transition hover:bg-white/25"
                    >
                      <Icon className="size-4" />
                      {m.label}
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* QR slot — scan to add the official LINE channel from desktop */}
          {!compact && (
            <div className="hidden flex-col items-center gap-2 sm:flex">
              <div className="grid size-36 place-items-center overflow-hidden rounded-2xl bg-white p-2 shadow-inner">
                {lineQr ? (
                  <Image
                    src={lineQr}
                    alt={t("qrAlt")}
                    width={128}
                    height={128}
                    className="size-full object-contain"
                  />
                ) : (
                  <QrCode className="size-20 text-[#06C755]/40" strokeWidth={1.4} />
                )}
              </div>
              <span className="text-[11.5px] font-semibold text-white/80">{t("scanQr")}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
