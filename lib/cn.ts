import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a KRW price or return null for "inquire". */
export function formatKRW(value: number | null, locale: string): string | null {
  if (value == null) return null;
  return new Intl.NumberFormat(locale === "ko" ? "ko-KR" : "en-US").format(value);
}
