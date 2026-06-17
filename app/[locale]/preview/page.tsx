import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import PreviewClient from "./PreviewClient";

// 내부 검수 전용 — 색인 금지(noindex).
export const metadata: Metadata = {
  title: "ONEDAY · 모바일 검수 미리보기",
  robots: { index: false, follow: false },
};

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PreviewClient />;
}
