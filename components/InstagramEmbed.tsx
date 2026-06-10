"use client";

import { useEffect, useRef, useState } from "react";
import { Instagram, Play } from "lucide-react";

/** Lazy, lightweight Instagram post/reel embed (loads iframe only when in view). */
export default function InstagramEmbed({ url }: { url: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // normalize to /embed url
  const embedUrl = url.replace(/\/?$/, "/").replace(/\/$/, "") + "/embed";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative h-[400px] w-[244px] shrink-0 overflow-hidden rounded-2xl bg-ink-50 shadow-md shadow-ink-900/10 ring-1 ring-ink-100"
    >
      {visible ? (
        <iframe
          src={embedUrl}
          title="Instagram review"
          loading="lazy"
          className="h-full w-full border-0"
          scrolling="no"
          sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
          allow="encrypted-media; clipboard-write"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-brand-50 to-ink-50 text-ink-400">
          <span className="grid size-14 place-items-center rounded-2xl bg-white shadow-sm">
            <Instagram className="size-7 text-[#E1306C]" />
          </span>
          <span className="flex items-center gap-1.5 text-xs font-semibold">
            <Play className="size-3.5 fill-current" /> Reel
          </span>
        </div>
      )}
    </div>
  );
}
