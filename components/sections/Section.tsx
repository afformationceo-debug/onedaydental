import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function SectionHeader({
  kicker,
  title,
  subtitle,
  center,
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={cn("px-5", center && "text-center")}>
      {kicker && (
        <span className={cn("kicker", center && "justify-center")}>{kicker}</span>
      )}
      <h2 className="mt-3 font-display text-[clamp(1.55rem,4.5vw,2.4rem)] font-bold leading-[1.12] tracking-tight text-ink-900">
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-3 max-w-2xl text-[14.5px] leading-relaxed text-ink-500 lg:text-[15.5px]",
            center && "mx-auto",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-10", className)}>
      {children}
    </section>
  );
}
