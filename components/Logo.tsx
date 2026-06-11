import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * 원형 ONEDAY 엠블럼 마크 (로딩 · 에러 · 404 화면용 경량 SVG).
 * 공식 배지를 단순화한 형태 — 풀 로고 PNG는 <Logo/>가 담당.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden role="img" fill="none">
      <defs>
        <linearGradient id="od-ring" x1="0" y1="0" x2="48" y2="48">
          <stop offset="0%" stopColor="#2a7fd4" />
          <stop offset="100%" stopColor="#1457a0" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="22" fill="url(#od-ring)" />
      <circle cx="24" cy="24" r="16.5" fill="#fff" />
      <text
        x="24"
        y="31.5"
        textAnchor="middle"
        fontSize="22"
        fontWeight="800"
        fontFamily="var(--font-display, system-ui), sans-serif"
        fill="#1457a0"
      >
        1
      </text>
    </svg>
  );
}

/**
 * 원데이치과 공식 로고 (onedaydent.com 공식 자산: 원형 배지 + "ONE DAY DENTISTRY").
 * - variant="dark"  : 밝은 배경(헤더)용 — 공식 컬러 로고 그대로.
 * - variant="light" : 어두운 배경(푸터)용 — 공식 로고를 흰색 칩에 올려 가시성 확보.
 *   (공식 로고가 컬러 1종뿐이라 흰색 워드마크 버전이 없어 칩 방식 채택.)
 */
export default function Logo({
  className,
  variant = "dark",
  priority = false,
}: {
  className?: string;
  variant?: "dark" | "light";
  priority?: boolean;
}) {
  const isLight = variant === "light";
  return (
    <span
      className={cn(
        "inline-flex items-center",
        isLight && "rounded-lg bg-white px-3 py-2 shadow-sm ring-1 ring-black/5",
        className,
      )}
    >
      <Image
        src="/brand/oneday-logo.png"
        alt="ONEDAY Dental · 원데이치과"
        width={325}
        height={72}
        priority={priority}
        sizes="(max-width: 640px) 150px, 180px"
        className="h-7 w-auto select-none sm:h-8"
      />
    </span>
  );
}
