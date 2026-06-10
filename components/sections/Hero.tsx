import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight, ShieldCheck } from "lucide-react";
import CountUp from "../CountUp";

export default async function Hero() {
  const t = await getTranslations("hero");
  const stats = t.raw("stats") as { value: string; label: string }[];

  return (
    <section className="relative overflow-hidden bg-brand-950 text-white">
      {/* Background image + navy wash + blueprint grid */}
      <div className="absolute inset-0">
        <Image
          src="/gen-img/hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-950 via-brand-950/85 to-brand-800/70" />
        <div className="tech-grid absolute inset-0 opacity-60" />
        <div className="absolute -right-24 -top-24 size-96 rounded-full bg-mint-400/15 blur-3xl" />
        <div className="absolute -bottom-32 left-0 size-80 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto grid w-full max-w-screen-2xl gap-10 px-5 pb-12 pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14 lg:px-10 lg:pb-20 lg:pt-20">
        {/* Left — headline */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-mint-400/30 bg-mint-400/10 px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-mint-300 backdrop-blur">
            <span className="size-1.5 rounded-full bg-mint-400 shadow-[0_0_8px] shadow-mint-400" />
            {t("badge")}
          </span>

          {/* "1 DAY" tech motif */}
          <div className="mt-5 flex items-baseline gap-3">
            <span className="font-mono text-[13px] font-bold uppercase tracking-[0.3em] text-cyan-300">
              ONE
            </span>
            <span className="font-display text-[clamp(3.4rem,12vw,6rem)] font-bold leading-none text-mint-400">
              1
            </span>
            <span className="font-display text-[clamp(1.5rem,5vw,2.4rem)] font-bold uppercase leading-none tracking-tight text-white">
              DAY
            </span>
          </div>

          <h1 className="mt-4 font-display text-[clamp(1.9rem,6vw,3.1rem)] font-bold leading-[1.12] tracking-tight text-white">
            {t("title")}
            <br />
            <span className="bg-gradient-to-r from-mint-300 to-cyan-300 bg-clip-text text-transparent">
              {t("titleEm")}
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-ink-200 lg:text-[15.5px]">
            {t("subtitle")}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href="/reservation"
              className="group inline-flex items-center gap-2 rounded-lg bg-mint-400 px-6 py-3.5 text-sm font-bold text-brand-950 shadow-[0_8px_30px_-8px] shadow-mint-400/60 transition hover:bg-mint-300 active:scale-95"
            >
              {t("ctaPrimary")}
              <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/treatments"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-md transition hover:border-mint-400/50 hover:bg-white/10 active:scale-95"
            >
              {t("ctaSecondary")}
            </Link>
          </div>

          <div className="mt-5 inline-flex items-center gap-2 font-mono text-[12px] font-bold tracking-wide text-mint-300">
            <ShieldCheck className="size-4" strokeWidth={2.3} />
            {t("trustSamePrice")}
          </div>
        </div>

        {/* Right — stat console (data grid, not rounded cards) */}
        <div className="bracket relative rounded-xl border border-white/10 bg-white/[0.04] p-1 backdrop-blur-xl">
          <div className="rounded-lg border border-white/5 bg-brand-950/40">
            <div className="flex items-center justify-between border-b border-white/8 px-4 py-2.5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-300">
              <span>ONEDAY · CLINICAL DATA</span>
              <span className="flex items-center gap-1.5 text-mint-400">
                <span className="size-1.5 animate-pulse rounded-full bg-mint-400" />
                LIVE
              </span>
            </div>
            <div className="grid grid-cols-3 divide-x divide-white/8">
              {stats.map((s, i) => (
                <div key={i} className="px-3 py-6 text-center">
                  <p className="font-display text-[clamp(1.5rem,5vw,2rem)] font-bold leading-none text-white">
                    <CountUp value={s.value} />
                  </p>
                  <p className="mt-2 text-[11px] font-semibold leading-tight text-ink-300">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
