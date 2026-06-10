"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Send, Check, Loader2 } from "lucide-react";
import { primaryMessenger, buildMessengerHref } from "@/lib/config";
import { getUtm, trackConsultClick } from "@/lib/track";
import type { Locale } from "@/lib/types";
import MessengerButtons from "./MessengerButtons";

interface TreatmentOption {
  slug: string;
  name: string;
}

export default function ReservationForm({ treatments }: { treatments: TreatmentOption[] }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("reservation");
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [form, setForm] = useState({ name: "", contact: "", treatment: "", message: "" });

  function update(k: keyof typeof form, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    const utm = getUtm();
    try {
      await fetch("/api/consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, locale, utm }),
      });
    } catch {
      /* messenger is the primary path; ignore network errors */
    }
    trackConsultClick({
      channel: "form",
      treatment: form.treatment,
      locale,
      placement: "reservation_form",
    });
    setState("done");
    // Open the primary messenger with a prefilled message
    const m = primaryMessenger(locale);
    const treatmentLabel =
      treatments.find((tr) => tr.slug === form.treatment)?.name || form.treatment || "";
    const href = buildMessengerHref(m, locale, treatmentLabel);
    window.open(href, "_blank", "noopener,noreferrer");
  }

  const inputCls =
    "w-full rounded-2xl border border-ink-100 bg-white px-4 py-3 text-[14px] text-ink-900 outline-none transition placeholder:text-ink-300 focus:border-brand-400 focus:ring-2 focus:ring-brand-100";

  return (
    <div className="px-5">
      <form onSubmit={onSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <input
            required
            className={inputCls}
            placeholder={t("name")}
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
          />
          <input
            required
            className={inputCls}
            placeholder={t("contact")}
            value={form.contact}
            onChange={(e) => update("contact", e.target.value)}
          />
        </div>
        <select
          className={inputCls}
          value={form.treatment}
          onChange={(e) => update("treatment", e.target.value)}
        >
          <option value="">{t("selectTreatment")}</option>
          {treatments.map((tr) => (
            <option key={tr.slug} value={tr.slug}>
              {tr.name}
            </option>
          ))}
        </select>
        <textarea
          className={inputCls}
          rows={3}
          placeholder={t("message")}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand-500 to-brand-600 py-3.5 text-[15px] font-bold text-white shadow-lg shadow-brand-500/30 transition active:scale-[0.98] disabled:opacity-70"
        >
          {state === "loading" ? (
            <Loader2 className="size-5 animate-spin" />
          ) : state === "done" ? (
            <Check className="size-5" />
          ) : (
            <>
              <Send className="size-[18px]" /> {t("submit")}
            </>
          )}
        </button>
      </form>

      <div className="my-5 flex items-center gap-3 text-[12px] font-medium text-ink-400">
        <span className="h-px flex-1 bg-ink-100" />
        {t("or")}
        <span className="h-px flex-1 bg-ink-100" />
      </div>
      <MessengerButtons placement="reservation_messengers" variant="row" className="justify-center" />
    </div>
  );
}
