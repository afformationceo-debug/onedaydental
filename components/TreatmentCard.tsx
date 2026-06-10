import { Link } from "@/i18n/navigation";
import { tx } from "@/lib/i18n-text";
import type { Locale, Treatment } from "@/lib/types";
import { Clock, Activity, ArrowUpRight } from "lucide-react";
import TreatmentImage from "./TreatmentImage";

export const CATEGORY_ICON: Record<string, string> = {
  implant: "Smile",
  tscan: "Activity",
  ortho: "AlignHorizontalDistributeCenter",
  cosmetic: "Sparkles",
  general: "Stethoscope",
};

export default function TreatmentCard({
  treatment: tr,
  locale,
  durationLabel,
  recoveryLabel,
}: {
  treatment: Treatment;
  locale: Locale;
  durationLabel: string;
  recoveryLabel: string;
}) {
  return (
    <Link
      href={`/treatments/${tr.slug}`}
      className="group block overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-ink-100 transition hover:shadow-xl hover:shadow-ink-900/10"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <TreatmentImage
          src={tr.image}
          alt={tx(tr.name, locale)}
          icon={CATEGORY_ICON[tr.category] ?? "Sparkles"}
          className="transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/30 to-transparent" />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-brand-700 backdrop-blur">
          {tx(tr.tagline, locale)}
        </span>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[16px] font-extrabold leading-tight text-ink-900">
            {tx(tr.name, locale)}
          </h3>
          <ArrowUpRight className="mt-0.5 size-5 shrink-0 text-ink-300 transition group-hover:text-brand-500" />
        </div>

        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {tr.highlights.slice(0, 3).map((h, i) => (
            <span
              key={i}
              className="rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-semibold text-brand-700"
            >
              {tx(h, locale)}
            </span>
          ))}
        </div>

        <div className="mt-3.5 flex items-center gap-4 border-t border-ink-50 pt-3 text-[11.5px] font-medium text-ink-500">
          <span className="flex items-center gap-1.5">
            <Clock className="size-3.5 text-brand-400" />
            {durationLabel}: {tx(tr.duration, locale)}
          </span>
          <span className="flex items-center gap-1.5">
            <Activity className="size-3.5 text-brand-400" />
            {tx(tr.recovery, locale)}
          </span>
        </div>
      </div>
    </Link>
  );
}
