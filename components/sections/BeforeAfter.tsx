import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Info } from "lucide-react";
import { getClinic } from "@/lib/clinic";
import { tx } from "@/lib/i18n-text";
import type { BaCase, BaTreatmentGroup, Locale } from "@/lib/types";
import { SectionHeader } from "./Section";
import Reveal from "../Reveal";

/**
 * Before & After — real intraoral / clinical case pairs from the clinic's own
 * records (implant + ortho). Compliance-first: only tooth/occlusion-centered
 * shots (no identifiable faces), with a per-section "결과 차이 있음" disclaimer.
 */

function BaPair({
  c,
  caption,
  beforeLabel,
  afterLabel,
}: {
  c: BaCase;
  caption: string;
  beforeLabel: string;
  afterLabel: string;
}) {
  return (
    <figure className="overflow-hidden rounded-xl border border-ink-100 bg-surface transition hover:border-mint-400 hover:shadow-tech">
      <div className="grid grid-cols-2 gap-px bg-ink-100">
        {[
          { src: c.before, label: beforeLabel, tone: "bg-ink-600" },
          { src: c.after, label: afterLabel, tone: "bg-mint-500 text-brand-950" },
        ].map((s) => (
          <div key={s.src} className="relative aspect-[4/3] overflow-hidden bg-surface-soft">
            <Image
              src={s.src}
              alt={`${caption} — ${s.label}`}
              fill
              sizes="(max-width: 768px) 50vw, 280px"
              className="object-cover"
            />
            <span
              className={`absolute left-2 top-2 rounded-md px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide text-white shadow-sm ${s.tone}`}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>
      <figcaption className="px-3.5 py-3 text-[12.5px] font-medium leading-relaxed text-ink-700">
        {caption}
      </figcaption>
    </figure>
  );
}

function BaGroup({
  group,
  locale,
  beforeLabel,
  afterLabel,
}: {
  group: BaTreatmentGroup;
  locale: Locale;
  beforeLabel: string;
  afterLabel: string;
}) {
  return (
    <div className="mt-8 px-5 lg:px-0">
      <h3 className="mb-3 flex items-center gap-2 text-[15px] font-bold text-ink-900">
        <span className="h-4 w-1 rounded-full bg-mint-400" aria-hidden />
        {tx(group.title, locale)}
      </h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {group.cases.map((c, i) => (
          <Reveal key={c.id} delay={i * 0.04}>
            <BaPair
              c={c}
              caption={tx(c.caption, locale)}
              beforeLabel={beforeLabel}
              afterLabel={afterLabel}
            />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export default async function BeforeAfter() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("beforeAfter");
  const { ba } = getClinic();

  const beforeLabel = t("before");
  const afterLabel = t("after");

  return (
    <section className="py-14 lg:py-20">
      <div className="mx-auto max-w-screen-2xl lg:px-6">
        <SectionHeader kicker={t("kicker")} title={t("title")} subtitle={t("subtitle")} />

        <BaGroup group={ba.implant} locale={locale} beforeLabel={beforeLabel} afterLabel={afterLabel} />
        <BaGroup group={ba.ortho} locale={locale} beforeLabel={beforeLabel} afterLabel={afterLabel} />

        {/* Medical-advertising compliance disclaimer */}
        <div className="mx-5 mt-7 flex items-start gap-2.5 rounded-lg border border-ink-100 bg-surface-soft px-4 py-3.5 lg:mx-0">
          <Info className="mt-0.5 size-4 shrink-0 text-ink-400" strokeWidth={2} />
          <p className="text-[11.5px] leading-relaxed text-ink-500">{tx(ba.disclaimer, locale)}</p>
        </div>

        <div className="mt-5 px-5 lg:max-w-md lg:px-0">
          <Link
            href="/reservation"
            className="group flex items-center justify-center gap-2 rounded-lg border border-ink-200 bg-surface py-3.5 text-[14px] font-bold text-brand-700 transition hover:border-mint-400 hover:bg-surface-soft"
          >
            {t("cta")}
            <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
