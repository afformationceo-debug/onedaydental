import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Entrance animation wrapper. Pure CSS (no JS state) so content is ALWAYS
 * rendered visible — SEO-safe, no-JS-safe, and reliable under headless capture.
 * The `both` fill mode guarantees the element settles at full opacity.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("reveal-rise", className)}
      style={delay ? { animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
