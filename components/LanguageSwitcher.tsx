"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, localeMeta, type Locale } from "@/i18n/routing";
import { Globe, Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

export default function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function switchTo(l: Locale) {
    router.replace(pathname, { locale: l });
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Change language"
        aria-expanded={open}
        className={cn(
          "flex items-center gap-1.5 rounded-full border border-ink-100 bg-white/80 px-3 py-1.5 text-sm font-semibold text-ink-800 backdrop-blur transition hover:border-brand-300 hover:text-brand-700",
          compact && "px-2.5 py-1 text-xs",
        )}
      >
        <Globe className="size-4 text-brand-500" strokeWidth={2.2} />
        <span>{localeMeta[locale].flag}</span>
        {!compact && <span className="hidden sm:inline">{localeMeta[locale].label}</span>}
        <ChevronDown className={cn("size-3.5 transition", open && "rotate-180")} />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-2xl border border-ink-100 bg-white p-1.5 shadow-xl shadow-ink-900/10"
        >
          {locales.map((l) => (
            <li key={l}>
              <button
                onClick={() => switchTo(l)}
                role="option"
                aria-selected={l === locale}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium transition",
                  l === locale
                    ? "bg-brand-50 text-brand-700"
                    : "text-ink-700 hover:bg-surface-soft",
                )}
              >
                <span className="text-base">{localeMeta[l].flag}</span>
                <span className="flex-1 text-left">{localeMeta[l].label}</span>
                {l === locale && <Check className="size-4 text-brand-500" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
