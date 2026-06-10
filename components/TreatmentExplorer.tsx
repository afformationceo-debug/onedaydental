"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { ChevronDown, ArrowUpRight, Clock, Activity } from "lucide-react";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/cn";

export interface ExplorerTreatment {
  slug: string;
  name: string;
  tagline: string;
  duration: string;
  recovery: string;
  highlights: string[];
}
export interface ExplorerCategory {
  id: string;
  name: string;
  icon: string;
  items: ExplorerTreatment[];
}

/**
 * Category TABS (desktop) / ACCORDION (mobile) for treatments.
 * Click a category → its treatments reveal with a smooth transition.
 * Replaces the long-scroll card grid (per UX request).
 */
export default function TreatmentExplorer({
  categories,
  labels,
}: {
  categories: ExplorerCategory[];
  labels: { duration: string; recovery: string; detail: string };
}) {
  const cats = categories.filter((c) => c.items.length > 0);
  const [active, setActive] = useState(cats[0]?.id ?? "");
  const [openMobile, setOpenMobile] = useState<string | null>(cats[0]?.id ?? null);

  if (cats.length === 0) return null;
  const activeCat = cats.find((c) => c.id === active) ?? cats[0];

  return (
    <div className="mx-auto max-w-screen-2xl px-5 lg:px-10">
      {/* ---------- DESKTOP: tab rail + panel ---------- */}
      <div className="hidden lg:block">
        <div
          role="tablist"
          aria-label="Treatment categories"
          className="flex flex-wrap gap-2 border-b border-ink-100 pb-3"
        >
          {cats.map((c) => {
            const Icon = getIcon(c.icon);
            const on = c.id === active;
            return (
              <button
                key={c.id}
                role="tab"
                aria-selected={on}
                onClick={() => setActive(c.id)}
                className={cn(
                  "group inline-flex items-center gap-2.5 rounded-lg border px-4 py-2.5 text-[14px] font-bold transition",
                  on
                    ? "border-brand-900 bg-brand-900 text-white shadow-tech"
                    : "border-ink-100 bg-surface text-ink-600 hover:border-mint-400 hover:text-brand-700",
                )}
              >
                <Icon
                  className={cn("size-[18px]", on ? "text-mint-400" : "text-mint-600")}
                  strokeWidth={2.2}
                />
                {c.name}
                <span
                  className={cn(
                    "font-mono text-[11px] font-bold",
                    on ? "text-mint-400" : "text-ink-300",
                  )}
                >
                  {String(c.items.length).padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          className="reveal-rise mt-7 grid grid-cols-2 gap-5 xl:grid-cols-3"
          key={activeCat.id}
        >
          {activeCat.items.map((tr) => (
            <DetailCard
              key={tr.slug}
              tr={tr}
              labels={labels}
              icon={activeCat.icon}
            />
          ))}
        </div>
      </div>

      {/* ---------- MOBILE: accordion ---------- */}
      <div className="space-y-3 lg:hidden">
        {cats.map((c) => {
          const Icon = getIcon(c.icon);
          const open = openMobile === c.id;
          return (
            <div
              key={c.id}
              className={cn(
                "overflow-hidden rounded-xl border transition",
                open ? "border-brand-900" : "border-ink-100",
              )}
            >
              <button
                aria-expanded={open}
                onClick={() => setOpenMobile(open ? null : c.id)}
                className={cn(
                  "flex w-full items-center gap-3 px-4 py-4 text-left transition",
                  open ? "bg-brand-900 text-white" : "bg-surface text-ink-900",
                )}
              >
                <span
                  className={cn(
                    "grid size-9 shrink-0 place-items-center rounded-lg transition",
                    open
                      ? "bg-mint-400 text-brand-950"
                      : "bg-brand-50 text-brand-700",
                  )}
                >
                  <Icon className="size-[18px]" strokeWidth={2.2} />
                </span>
                <span className="flex-1 text-[15px] font-bold">{c.name}</span>
                <span
                  className={cn(
                    "font-mono text-[12px] font-bold",
                    open ? "text-mint-400" : "text-ink-300",
                  )}
                >
                  {String(c.items.length).padStart(2, "0")}
                </span>
                <ChevronDown
                  className={cn(
                    "size-5 shrink-0 transition-transform",
                    open ? "rotate-180 text-mint-400" : "text-ink-400",
                  )}
                />
              </button>
              <div
                className={cn("collapse-grid", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
              >
                <div className="overflow-hidden">
                  <div className="space-y-3 bg-surface-soft p-3">
                    {c.items.map((tr) => (
                      <DetailCard key={tr.slug} tr={tr} labels={labels} icon={c.icon} compact />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DetailCard({
  tr,
  labels,
  icon,
  compact,
}: {
  tr: ExplorerTreatment;
  labels: { duration: string; recovery: string; detail: string };
  icon: string;
  compact?: boolean;
}) {
  const Icon = getIcon(icon);
  return (
    <Link
      href={`/treatments/${tr.slug}`}
      className={cn(
        "group flex flex-col rounded-xl border border-ink-100 bg-surface p-5 transition hover:border-mint-400 hover:shadow-tech",
        compact && "p-4",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700 transition group-hover:bg-mint-400/10 group-hover:text-mint-600">
          <Icon className="size-[20px]" strokeWidth={2.1} />
        </span>
        <ArrowUpRight className="size-5 shrink-0 text-ink-300 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-mint-500" />
      </div>

      <h4 className="mt-3.5 text-[16px] font-bold leading-tight text-ink-900">
        {tr.name}
      </h4>
      <p className="mt-1 text-[12.5px] leading-relaxed text-ink-500">{tr.tagline}</p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {tr.highlights.slice(0, 3).map((h, i) => (
          <span
            key={i}
            className="rounded-md bg-surface-soft px-2 py-0.5 text-[11px] font-semibold text-brand-700 ring-1 ring-ink-100"
          >
            {h}
          </span>
        ))}
      </div>

      <div className="mt-auto flex flex-col gap-1.5 border-t border-ink-100 pt-3.5 text-[11.5px] font-medium text-ink-500">
        <span className="flex items-start gap-1.5">
          <Clock className="mt-0.5 size-3.5 shrink-0 text-mint-500" />
          <span>
            <b className="font-mono text-[10px] uppercase tracking-wide text-ink-400">
              {labels.duration}
            </b>{" "}
            {tr.duration}
          </span>
        </span>
        <span className="flex items-start gap-1.5">
          <Activity className="mt-0.5 size-3.5 shrink-0 text-mint-500" />
          <span>{tr.recovery}</span>
        </span>
      </div>
    </Link>
  );
}
