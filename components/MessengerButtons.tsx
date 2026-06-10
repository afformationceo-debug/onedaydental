"use client";

import { useLocale } from "next-intl";
import { SiLine, SiKakaotalk, SiInstagram } from "react-icons/si";
import { messengersByLocale, buildMessengerHref, type Messenger } from "@/lib/config";
import type { Locale } from "@/lib/types";
import { trackConsultClick } from "@/lib/track";
import { cn } from "@/lib/cn";

const ICONS: Record<Messenger["type"], React.ComponentType<{ className?: string }>> = {
  line: SiLine,
  kakao: SiKakaotalk,
  instagram: SiInstagram,
};

export default function MessengerButtons({
  treatment = "",
  placement,
  variant = "row",
  className,
}: {
  treatment?: string;
  placement: string;
  variant?: "row" | "stack" | "pills";
  className?: string;
}) {
  const locale = useLocale() as Locale;
  const list = messengersByLocale[locale];

  return (
    <div
      className={cn(
        "flex gap-2.5",
        variant === "stack" && "flex-col",
        variant === "row" && "flex-row flex-wrap",
        variant === "pills" && "flex-row",
        className,
      )}
    >
      {list.map((m) => {
        const Icon = ICONS[m.type];
        return (
          <a
            key={m.type + m.label}
            href={buildMessengerHref(m, locale, treatment)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackConsultClick({ channel: m.type, treatment, locale, placement })
            }
            className={cn(
              "group inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold text-white shadow-md transition active:scale-95",
              variant === "stack" && "w-full",
            )}
            style={{ backgroundColor: m.color, color: m.type === "kakao" ? "#3C1E1E" : "#fff" }}
          >
            <Icon className="size-[18px]" />
            <span>{m.label}</span>
          </a>
        );
      })}
    </div>
  );
}
