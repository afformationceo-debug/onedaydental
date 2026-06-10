import Image from "next/image";
import { tx } from "@/lib/i18n-text";
import type { Doctor, Locale } from "@/lib/types";
import { Stethoscope, Quote } from "lucide-react";

function initials(name: string) {
  const clean = name.replace(/(Dr\.|대표원장|원장|院長|代表)/g, "").trim();
  return clean.slice(0, 2) || "HE";
}

export default function DoctorCard({
  doctor,
  locale,
  specialtyLabel,
}: {
  doctor: Doctor;
  locale: Locale;
  specialtyLabel: string;
}) {
  const name = tx(doctor.name, locale);
  return (
    <article className="overflow-hidden rounded-xl border border-ink-100 bg-surface transition hover:border-mint-400">
      <div className="flex gap-4 p-4">
        <div className="relative size-24 shrink-0 overflow-hidden rounded-lg ring-1 ring-ink-100">
          {doctor.photo ? (
            <Image
              src={doctor.photo}
              alt={name}
              fill
              sizes="96px"
              className="object-cover object-top"
            />
          ) : (
            <div className="grid h-full w-full place-items-center bg-brand-900 text-2xl font-bold text-mint-400">
              {initials(name)}
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-[16px] font-bold leading-tight text-ink-900">
            {name}
          </h3>
          <p className="text-[12.5px] font-semibold text-mint-600">
            {tx(doctor.title, locale)}
          </p>
          <span className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-surface-soft px-2.5 py-1 text-[11px] font-semibold text-ink-600 ring-1 ring-ink-100">
            <Stethoscope className="size-3.5 text-mint-500" />
            {tx(doctor.specialty, locale)}
          </span>
        </div>
      </div>
      <ul className="space-y-1.5 border-t border-ink-100 bg-surface-soft/60 px-4 py-3.5">
        {doctor.career.map((c, i) => (
          <li key={i} className="flex gap-2 text-[12px] leading-relaxed text-ink-600">
            <Quote className="mt-0.5 size-3 shrink-0 text-mint-400" />
            <span>{tx(c, locale)}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
