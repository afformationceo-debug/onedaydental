"use client";

import { useEffect } from "react";
import { RotateCcw } from "lucide-react";
import { LogoMark } from "@/components/Logo";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // surface to monitoring in production
    console.error("[boundary]", error?.digest ?? error?.message);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <LogoMark className="size-14" />
      <p className="mt-5 text-[17px] font-extrabold text-ink-900">
        暫時發生問題 · 일시적인 오류가 발생했습니다
      </p>
      <p className="mt-2 text-[13px] text-ink-500">
        請再試一次，若持續發生請透過 LINE 與我們聯繫。
      </p>
      <button
        onClick={reset}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-bold text-white transition active:scale-95"
      >
        <RotateCcw className="size-4" />
        重試
      </button>
    </div>
  );
}
