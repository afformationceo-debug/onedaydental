"use client";

import Image from "next/image";
import { Sparkles } from "lucide-react";

type Photo = { src: string; alt: string };

/**
 * Infinite right→left marquee of clinic-provided promo photos (e.g. 임성훈 visit).
 * - Constant-speed CSS loop (duplicated track for seamlessness).
 * - Pauses on hover (desktop) / press.
 * - Compact, fixed-height thumbnails (clean medical-tech restraint).
 */
export default function CelebrityMarquee({
  photos,
  title,
  subtitle,
  note,
}: {
  photos: Photo[];
  title: string;
  subtitle: string;
  note: string;
}) {
  if (!photos.length) return null;
  // Duplicate the set so the -50% translate loops seamlessly.
  const track = [...photos, ...photos];

  return (
    <div className="mx-auto mt-10 max-w-screen-2xl px-5 lg:px-10">
      <div className="overflow-hidden rounded-xl border border-ink-100 bg-surface">
        <div className="flex items-center gap-2.5 px-4 py-3.5">
          <span className="grid size-7 place-items-center rounded-md bg-brand-900 text-mint-400">
            <Sparkles className="size-4" strokeWidth={2.2} />
          </span>
          <div>
            <h3 className="text-[15px] font-bold leading-tight text-ink-900">{title}</h3>
            <p className="text-[12px] text-ink-500">{subtitle}</p>
          </div>
        </div>

        {/* Marquee viewport */}
        <div className="group relative overflow-hidden border-t border-ink-100 bg-surface-soft py-3">
          {/* edge fade masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-surface-soft to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-surface-soft to-transparent" />

          <ul
            className="flex w-max items-center gap-3 px-3 [animation:marquee_36s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:[animation:none]"
            aria-label={title}
          >
            {track.map((p, i) => (
              <li
                key={`${p.src}-${i}`}
                className="relative h-28 w-44 shrink-0 overflow-hidden rounded-lg ring-1 ring-ink-100 sm:h-32 sm:w-52"
                aria-hidden={i >= photos.length}
              >
                <Image
                  src={p.src}
                  alt={i < photos.length ? p.alt : ""}
                  fill
                  sizes="208px"
                  className="object-cover"
                />
              </li>
            ))}
          </ul>
        </div>

        <p className="px-4 py-3 text-[11px] text-ink-400">{note}</p>
      </div>
    </div>
  );
}
