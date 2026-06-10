import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getClinic, getTreatmentBySlug, getTreatmentDetail } from "@/lib/clinic";
import { tx } from "@/lib/i18n-text";
import { buildMetadata } from "@/lib/seo";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/lib/types";
import { Clock, Activity, Check, ArrowLeft, ChevronDown, HelpCircle } from "lucide-react";
import MessengerButtons from "@/components/MessengerButtons";
import { SectionHeader } from "@/components/sections/Section";
import TreatmentImage from "@/components/TreatmentImage";
import { CATEGORY_ICON } from "@/components/TreatmentCard";

export function generateStaticParams() {
  const clinic = getClinic();
  return routing.locales.flatMap((locale) =>
    clinic.treatments.map((tr) => ({ locale, slug: tr.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const tr = getTreatmentBySlug(slug);
  if (!tr) return {};
  const detail = getTreatmentDetail(slug);
  const desc = detail
    ? tx(detail.lead, locale as Locale)
    : tx(tr.description, locale as Locale);
  return buildMetadata({
    locale: locale as Locale,
    path: `/treatments/${slug}`,
    title: tx(tr.name, locale as Locale),
    description: desc.slice(0, 155),
  });
}

export default async function TreatmentDetail({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: localeParam, slug } = await params;
  setRequestLocale(localeParam);
  const locale = localeParam as Locale;
  const t = await getTranslations();
  const tr = getTreatmentBySlug(slug);
  if (!tr) notFound();
  const detail = getTreatmentDetail(slug);
  const name = tx(tr.name, locale);

  return (
    <article className="pb-8">
      {/* Hero */}
      <div className="relative h-64 w-full">
        <TreatmentImage
          src={tr.image}
          alt={name}
          icon={CATEGORY_ICON[tr.category] ?? "Sparkles"}
          priority
          sizes="(max-width: 500px) 100vw, 500px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/88 via-ink-900/30 to-ink-900/10" />
        <Link
          href="/treatments"
          className="absolute left-4 top-4 grid size-9 place-items-center rounded-full bg-white/20 text-white backdrop-blur transition hover:bg-white/30"
          aria-label={t("common.backHome")}
        >
          <ArrowLeft className="size-5" />
        </Link>
        <div className="absolute inset-x-0 bottom-0 p-5">
          <span className="rounded-full bg-clay-500/90 px-2.5 py-1 text-[11px] font-bold text-white">
            {tx(tr.tagline, locale)}
          </span>
          <h1 className="mt-2 text-[1.7rem] font-extrabold leading-tight text-white">{name}</h1>
        </div>
      </div>

      {/* Meta */}
      <div className="grid grid-cols-2 gap-3 px-5 pt-5">
        <div className="rounded-2xl bg-surface-soft p-3.5">
          <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase text-ink-400">
            <Clock className="size-3.5 text-brand-500" /> {t("common.duration")}
          </span>
          <p className="mt-1 text-[14px] font-bold text-ink-900">{tx(tr.duration, locale)}</p>
        </div>
        <div className="rounded-2xl bg-surface-soft p-3.5">
          <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase text-ink-400">
            <Activity className="size-3.5 text-brand-500" /> {t("common.recovery")}
          </span>
          <p className="mt-1 text-[14px] font-bold text-ink-900">{tx(tr.recovery, locale)}</p>
        </div>
      </div>

      {/* Lead + highlights */}
      <div className="px-5 pt-6">
        <p className="text-[15.5px] font-semibold leading-relaxed text-ink-800">
          {detail ? tx(detail.lead, locale) : tx(tr.description, locale)}
        </p>
        {detail && (
          <p className="mt-3 text-[14px] leading-relaxed text-ink-600">
            {tx(tr.description, locale)}
          </p>
        )}
        <ul className="mt-5 flex flex-wrap gap-2">
          {tr.highlights.map((h, i) => (
            <li
              key={i}
              className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-[12.5px] font-semibold text-brand-700"
            >
              <Check className="size-3.5" strokeWidth={3} />
              {tx(h, locale)}
            </li>
          ))}
        </ul>
      </div>

      {/* Rich sections */}
      {detail && detail.sections.length > 0 && (
        <div className="mt-8 space-y-6 px-5">
          {detail.sections.map((s, i) => (
            <section key={i}>
              <h2 className="flex items-center gap-2 text-[16px] font-extrabold text-ink-900">
                <span className="grid size-6 place-items-center rounded-lg bg-brand-100 text-[11px] font-black text-brand-700">
                  {i + 1}
                </span>
                {tx(s.heading, locale)}
              </h2>
              <p className="mt-2 pl-8 text-[14px] leading-relaxed text-ink-600">
                {tx(s.body, locale)}
              </p>
            </section>
          ))}
        </div>
      )}

      {/* Mid CTA */}
      <div className="mx-5 mt-8 rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 p-5 text-white shadow-lg shadow-brand-900/25">
        <p className="text-[15px] font-extrabold">{t("cta.consultAbout", { name })}</p>
        <p className="mt-1 text-[12.5px] text-white/80">{t("reservation.subtitle")}</p>
        <div className="mt-4">
          <MessengerButtons treatment={name} placement="treatment_detail" variant="row" />
        </div>
      </div>

      {/* FAQ */}
      {detail && detail.faq.length > 0 && (
        <div className="mt-9 px-5">
          <SectionHeader kicker="FAQ" title={t("treatments.faqTitle")} />
          <div className="mt-4 space-y-2.5">
            {detail.faq.map((f, i) => (
              <details
                key={i}
                className="group rounded-2xl border border-ink-100 bg-white p-4 open:bg-surface-soft"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[14px] font-bold text-ink-900">
                  <span className="flex items-center gap-2">
                    <HelpCircle className="size-4 shrink-0 text-brand-500" />
                    {tx(f.q, locale)}
                  </span>
                  <ChevronDown className="size-4 shrink-0 text-ink-400 transition group-open:rotate-180" />
                </summary>
                <p className="mt-3 pl-6 text-[13.5px] leading-relaxed text-ink-600">
                  {tx(f.a, locale)}
                </p>
              </details>
            ))}
          </div>
        </div>
      )}

      {/* Final CTA */}
      <div className="mx-5 mt-9 rounded-3xl bg-clay-500 p-5 text-center text-white shadow-lg shadow-clay-500/30">
        <p className="text-[16px] font-extrabold">{t("finalCta.title")}</p>
        <p className="mt-1 text-[12.5px] text-white/85">{t("finalCta.subtitle")}</p>
        <div className="mt-4 flex justify-center">
          <MessengerButtons treatment={name} placement="treatment_final" variant="row" />
        </div>
        <Link
          href="/reservation"
          className="mt-3 inline-block text-[12.5px] font-bold text-white/90 underline underline-offset-2"
        >
          {t("reservation.submit")} →
        </Link>
      </div>
    </article>
  );
}
