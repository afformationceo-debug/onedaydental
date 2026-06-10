import type { Metadata } from "next";
import { locales, localeMeta, type Locale } from "@/i18n/routing";
import { SITE_URL } from "./config";

/** Locale-native SEO keywords for dental medical-tourism search intent (TW target). */
const KEYWORDS: Record<Locale, string[]> = {
  ko: [
    "임플란트",
    "원데이 임플란트",
    "당일 임플란트",
    "치아교정",
    "인비절라인",
    "라미네이트",
    "강남 치과",
    "신논현 치과",
    "원데이치과",
  ],
  "zh-TW": [
    "韓國植牙",
    "韓國植牙推薦",
    "韓國植牙費用",
    "首爾植牙",
    "江南牙科",
    "江南牙醫推薦",
    "韓國牙齒矯正",
    "隱形矯正",
    "Invisalign 隱適美",
    "韓國牙齒貼片",
    "陶瓷貼片",
    "渡韓看牙",
    "韓國牙科",
    "台灣患者專屬",
    "ONEDAY牙醫",
    "韓國oneday牙科",
  ],
};

const OG_TITLE: Record<Locale, string> = {
  ko: "원데이치과 | 강남 신논현 임플란트·치아교정·심미치료",
  "zh-TW":
    "韓國oneday牙科｜台灣患者專屬・韓國植牙推薦｜首爾江南植牙・牙齒矯正・牙齒貼片",
};

const OG_DESC: Record<Locale, string> = {
  ko: "대만 환자 전용 한국 치과. 진짜 당일 완성을 지향하는 원데이 임플란트. 자체 디지털 기공소·T-Scan 교합 분석. 중국어 통역 상주·투명 정찰 수가표 공개. 강남 신논현역 치과.",
  "zh-TW":
    "專為台灣患者打造的韓國植牙。首爾江南植牙、牙齒矯正（隱形矯正 Invisalign）、牙齒貼片（陶瓷貼片）一次到位。渡韓看牙首選——致力當日完成、中文翻譯常駐、價格表透明公開（明確報價、現場不加價、無隱藏費用）。韓國oneday牙科，江南新論峴。",
};

const SITE_NAME: Record<Locale, string> = {
  ko: "원데이치과",
  "zh-TW": "韓國oneday牙科",
};

interface PageMeta {
  locale: Locale;
  path: string; // e.g. "/treatments" (no locale prefix)
  title?: string;
  description?: string;
}

export function buildMetadata({ locale, path, title, description }: PageMeta): Metadata {
  const fullTitle = title ? `${title} | ${SITE_NAME[locale]}` : OG_TITLE[locale];
  const desc = description ?? OG_DESC[locale];
  const canonical = `${SITE_URL}/${locale}${path === "/" ? "" : path}`;

  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[localeMeta[l].htmlLang] = `${SITE_URL}/${l}${path === "/" ? "" : path}`;
  }
  // TW is the primary acquisition market → x-default points to zh-TW
  languages["x-default"] = `${SITE_URL}/zh-TW${path === "/" ? "" : path}`;

  return {
    title: fullTitle,
    description: desc,
    keywords: KEYWORDS[locale],
    alternates: { canonical, languages },
    openGraph: {
      title: fullTitle,
      description: desc,
      url: canonical,
      siteName: SITE_NAME[locale],
      locale: localeMeta[locale].ogLocale,
      type: "website",
      images: [{ url: `${SITE_URL}/gen-img/og.jpg`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
    },
    robots: { index: true, follow: true },
  };
}
