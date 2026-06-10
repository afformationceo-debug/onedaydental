import { cn } from "@/lib/cn";

/** Crisp SVG tooth-mark in lilac→gold gradient (ONEDAY Dental brand). */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden role="img" fill="none">
      <defs>
        <linearGradient id="od-tooth" x1="0" y1="0" x2="48" y2="48">
          <stop offset="0%" stopColor="#a288d1" />
          <stop offset="60%" stopColor="#714fa6" />
          <stop offset="100%" stopColor="#5d4087" />
        </linearGradient>
        <linearGradient id="od-spark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e8c074" />
          <stop offset="100%" stopColor="#c8902f" />
        </linearGradient>
      </defs>
      {/* stylized tooth */}
      <path
        d="M24 7c-4.2 0-6.2-1.6-9.3-1.6C10.3 5.4 7 8.8 7 14.2c0 4 1.2 7 2.4 11.4 1 3.6 1.3 7.4 2 11 .5 2.7 1.4 5.6 3.3 5.6 2.3 0 2.6-3.8 3.4-7.2.7-3 1.4-5 1.9-5 .5 0 1.2 2 1.9 5 .8 3.4 1.1 7.2 3.4 7.2 1.9 0 2.8-2.9 3.3-5.6.7-3.6 1-7.4 2-11C36.8 21.2 41 18.2 41 14.2c0-5.4-3.3-8.8-7.7-8.8C30.2 5.4 28.2 7 24 7Z"
        fill="url(#od-tooth)"
      />
      {/* sparkle = "당일 완성 / 심미" */}
      <path
        d="M34 9.5c.4 1.6.9 2.1 2.5 2.5-1.6.4-2.1.9-2.5 2.5-.4-1.6-.9-2.1-2.5-2.5 1.6-.4 2.1-.9 2.5-2.5Z"
        fill="url(#od-spark)"
      />
    </svg>
  );
}

export default function Logo({
  className,
  variant = "dark",
  showSub = true,
}: {
  className?: string;
  variant?: "dark" | "light";
  showSub?: boolean;
}) {
  const word = variant === "light" ? "text-white" : "text-ink-900";
  const accent = variant === "light" ? "text-brand-200" : "text-brand-600";
  const sub = variant === "light" ? "text-white/60" : "text-ink-400";
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <LogoMark className="size-9 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className={cn("text-[17px] font-extrabold tracking-tight", word)}>
          ONE<span className={accent}>DAY</span>
        </span>
        {showSub && (
          <span
            className={cn(
              "mt-0.5 text-[8.5px] font-semibold uppercase tracking-[0.3em]",
              sub,
            )}
          >
            원데이치과 · DENTAL
          </span>
        )}
      </span>
    </span>
  );
}
