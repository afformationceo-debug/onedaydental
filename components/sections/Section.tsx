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
      {kicker && <span className="kicker">{kicker}</span>}
      <h2 className="mt-2 text-[1.6rem] font-extrabold leading-tight tracking-tight text-ink-900">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-[15px] leading-relaxed text-ink-500">{subtitle}</p>
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
