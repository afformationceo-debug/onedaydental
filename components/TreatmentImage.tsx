import Image from "next/image";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/cn";

/**
 * Renders a treatment image, or a branded placeholder when no real image
 * is available yet (clinic.json `image` empty). Honest — never ships
 * mismatched stock photography. Swap to <Image> automatically once a real
 * asset path is added to the data layer.
 */
export default function TreatmentImage({
  src,
  alt,
  icon = "Sparkles",
  className,
  sizes,
  priority,
}: {
  src?: string;
  alt: string;
  icon?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes ?? "(max-width: 500px) 100vw, 460px"}
        priority={priority}
        className={cn("object-cover", className)}
      />
    );
  }

  const Icon = getIcon(icon);
  return (
    <div
      aria-hidden
      className={cn(
        "grain flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-50 via-surface-soft to-brand-100",
        className,
      )}
    >
      <span className="grid size-16 place-items-center rounded-2xl bg-white/70 text-brand-500 shadow-sm ring-1 ring-brand-100 backdrop-blur">
        <Icon className="size-8" strokeWidth={1.8} />
      </span>
    </div>
  );
}
