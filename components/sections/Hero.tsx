import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight, BadgeCheck, ShieldCheck } from "lucide-react";
import CountUp from "../CountUp";

export default async function Hero() {
  const t = await getTranslations("hero");
  const stats = t.raw("stats") as { value: string; label: string }[];

  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[clamp(440px,76vh,600px)] w-full">
        <Image
          src="/gen-img/hero.jpg"
          alt=""
          fill
          priority
          sizes="(max-width: 500px) 100vw, 500px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/94 via-ink-900/55 to-ink-900/20" />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-900/45 to-transparent" />

        <div className="absolute left-5 right-5 top-5">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-semibold text-white/95 backdrop-blur-md ring-1 ring-white/25">
            <BadgeCheck className="size-3.5 text-clay-300" />
            {t("badge")}
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5 pb-6">
          <h1 className="text-[2.15rem] font-extrabold leading-[1.16] tracking-tight text-white drop-shadow-sm">
            {t("title")}
            <br />
            <span className="bg-gradient-to-r from-clay-300 to-clay-400 bg-clip-text text-transparent">
              {t("titleEm")}
            </span>
          </h1>
          <p className="mt-3 max-w-[92%] text-[13.5px] leading-relaxed text-white/85">
            {t("subtitle")}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            <Link
              href="/reservation"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-clay-500 to-clay-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-clay-900/40 transition active:scale-95"
            >
              {t("ctaPrimary")}
              <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/treatments"
              className="inline-flex items-center gap-2 rounded-full bg-white/12 px-5 py-3 text-sm font-bold text-white backdrop-blur-md ring-1 ring-white/30 transition hover:bg-white/20 active:scale-95"
            >
              {t("ctaSecondary")}
            </Link>
          </div>
        </div>
      </div>

      {/* Trust stats — overlap the fold */}
      <div className="relative -mt-6 px-5">
        <div className="grid grid-cols-3 divide-x divide-ink-100 rounded-2xl bg-white p-3.5 shadow-xl shadow-ink-900/10 ring-1 ring-ink-100">
          {stats.map((s, i) => (
            <div key={i} className="px-1 text-center">
              <p className="text-[19px] font-extrabold leading-none text-brand-600">
                <CountUp value={s.value} />
              </p>
              <p className="mt-1.5 text-[10.5px] font-semibold leading-tight text-ink-500">
                {s.label}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-2.5 flex items-center justify-center gap-1.5 text-[12px] font-bold text-clay-600">
          <ShieldCheck className="size-4" strokeWidth={2.3} />
          {t("trustSamePrice")}
        </div>
      </div>
    </section>
  );
}
