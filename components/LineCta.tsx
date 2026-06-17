"use client";

import { useLocale } from "next-intl";
import { SiLine } from "react-icons/si";
import { ArrowRight } from "lucide-react";
import { lineUrl } from "@/lib/config";
import { trackConsultClick } from "@/lib/track";
import type { Locale } from "@/lib/types";
import { cn } from "@/lib/cn";

/**
 * 단일 회수 경로(LINE)용 재사용 CTA. (브리프 §5 — 헤더·본문·sticky 모두 LINE으로 통일)
 * 서버 섹션(Hero, FinalCta 등)에서 import 해서 사용한다.
 * 클릭 시 consult_click + line_click(GA4) + Meta Contact + 구글시트 적재가 모두 발화한다.
 */
export default function LineCta({
  placement,
  label,
  treatment,
  variant = "solid",
  showArrow = true,
  className,
}: {
  placement: string;
  label: string;
  treatment?: string;
  variant?: "solid" | "line" | "outline";
  showArrow?: boolean;
  className?: string;
}) {
  const locale = useLocale() as Locale;

  const styles: Record<string, string> = {
    // 민트 — 다크 히어로/CTA 배경 위 1순위 버튼
    solid:
      "bg-mint-400 text-brand-950 shadow-[0_8px_30px_-8px] shadow-mint-400/60 hover:bg-mint-300",
    // 라인 브랜드 그린 — "加 LINE" 직관적 인지
    line: "bg-[#06C755] text-white shadow-md hover:shadow-lg",
    // 보조(투명) — 다크 배경 위 세컨더리
    outline:
      "border border-white/20 bg-white/5 text-white backdrop-blur-md hover:border-mint-400/50 hover:bg-white/10",
  };

  return (
    <a
      href={lineUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackConsultClick({ channel: "line", treatment, locale, placement })}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-sm font-bold transition active:scale-95",
        styles[variant],
        className,
      )}
    >
      <SiLine className="size-[18px]" />
      {label}
      {showArrow && (
        <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
      )}
    </a>
  );
}
