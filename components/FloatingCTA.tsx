"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { SiLine, SiKakaotalk, SiInstagram } from "react-icons/si";
import { ChevronUp } from "lucide-react";
import { messengersByLocale, buildMessengerHref, type Messenger } from "@/lib/config";
import type { Locale } from "@/lib/types";
import { trackConsultClick } from "@/lib/track";
import { cn } from "@/lib/cn";

const ICONS: Record<Messenger["type"], React.ComponentType<{ className?: string }>> = {
  line: SiLine,
  kakao: SiKakaotalk,
  instagram: SiInstagram,
};

export default function FloatingCTA() {
  const locale = useLocale() as Locale;
  const list = messengersByLocale[locale];
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-20 right-3 z-40 flex flex-col items-end gap-2.5 lg:bottom-6 lg:right-6">
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className="pointer-events-auto grid size-10 place-items-center rounded-full border border-ink-100 bg-white/90 text-ink-700 shadow-lg backdrop-blur transition hover:text-brand-600 active:scale-95"
        >
          <ChevronUp className="size-5" />
        </button>
      )}
      {list.map((m, i) => {
        const Icon = ICONS[m.type];
        return (
          <a
            key={m.type}
            href={buildMessengerHref(m, locale, "")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackConsultClick({ channel: m.type, locale, placement: "floating" })
            }
            aria-label={m.label}
            className={cn(
              "pointer-events-auto grid size-12 place-items-center rounded-full text-white shadow-xl transition active:scale-90",
              i === 0 && "animate-[pulse_2.5s_ease-in-out_infinite]",
            )}
            style={{
              backgroundColor: m.color,
              color: m.type === "kakao" ? "#3C1E1E" : "#fff",
            }}
          >
            <Icon className="size-6" />
          </a>
        );
      })}
    </div>
  );
}
