import Image from "next/image";
import { getLocale } from "next-intl/server";
import { Sparkles } from "lucide-react";
import { getClinic } from "@/lib/clinic";
import { tx } from "@/lib/i18n-text";
import type { Locale } from "@/lib/types";
import Reveal from "../Reveal";

/**
 * "함께한 분들 / 與我們同行的人們" — promotional photos the clinic provided
 * (broadcaster 임성훈 visit). Trust signal, not a testimonial. Conservative on
 * portrait rights: only studio promo shots clearly produced for marketing.
 */
export default async function CelebrityStrip() {
  const locale = (await getLocale()) as Locale;
  const { celebrities } = getClinic();
  if (!celebrities?.photos?.length) return null;

  const [hero, ...rest] = celebrities.photos;

  return (
    <div className="mt-8 px-5">
      <Reveal>
        <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-ink-100">
          <div className="flex items-center gap-2 px-4 pt-4">
            <span className="grid size-7 place-items-center rounded-lg bg-brand-50 text-brand-500">
              <Sparkles className="size-4" strokeWidth={2.2} />
            </span>
            <div>
              <h3 className="text-[15px] font-extrabold leading-tight text-ink-900">
                {tx(celebrities.title, locale)}
              </h3>
              <p className="text-[12px] text-ink-500">{tx(celebrities.subtitle, locale)}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1 p-1 pt-3">
            <div className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-2xl">
              <Image
                src={hero.src}
                alt={tx(hero.alt, locale)}
                fill
                sizes="(max-width: 768px) 100vw, 720px"
                className="object-cover"
              />
            </div>
            {rest.map((p) => (
              <div key={p.src} className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src={p.src}
                  alt={tx(p.alt, locale)}
                  fill
                  sizes="(max-width: 768px) 50vw, 360px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          <p className="px-4 pb-3.5 pt-1 text-[11px] text-ink-400">{tx(celebrities.note, locale)}</p>
        </div>
      </Reveal>
    </div>
  );
}
