import type { Metadata } from "next";
import { localeMeta, routing, type Locale } from "@/i18n/routing";
import { SITE_URL } from "./config";

/** Locale-native SEO keywords for dental medical-tourism search intent. */
const KEYWORDS: Record<Locale, string[]> = {
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
  ko: [
    "임플란트",
    "강남 임플란트",
    "당일 임플란트",
    "원데이 임플란트",
    "치아교정",
    "투명교정",
    "인비절라인",
    "라미네이트",
    "강남 치과",
    "원데이치과",
    "T-Scan 교합",
    "디지털 임플란트",
  ],
};

const OG_TITLE: Record<Locale, string> = {
  "zh-TW":
    "韓國oneday牙科｜台灣患者專屬・韓國植牙推薦｜首爾江南植牙・牙齒矯正・牙齒貼片",
  ko: "원데이치과｜강남 임플란트・치아교정・라미네이트, 당일 완성을 지향하는 강남 치과",
};

const OG_DESC: Record<Locale, string> = {
  "zh-TW":
    "專為台灣患者打造的韓國植牙。首爾江南植牙、牙齒矯正（隱形矯正 Invisalign）、牙齒貼片（陶瓷貼片）一次到位。渡韓看牙首選——致力當日完成、中文翻譯常駐、價格表透明公開（明確報價、現場不加價、無隱藏費用）。韓國oneday牙科，江南新論峴。",
  ko: "신속・정확・투명을 모토로 디지털 정밀 진단을 기반으로 임플란트・치아교정・심미치료를 제공하는 강남 원데이치과. 자체 디지털 기공소(원랩)와 T-Scan 교합 분석으로 내원 횟수를 줄인 치료를 지향합니다.",
};

const SITE_NAME: Record<Locale, string> = {
  "zh-TW": "韓國oneday牙科",
  ko: "원데이치과",
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

  // as-needed routing: default locale (zh-TW) has no prefix; others (ko) use /<locale>.
  const isDefault = locale === routing.defaultLocale;
  const cleanPath = path === "/" ? "" : path;
  const canonical = `${SITE_URL}${isDefault ? "" : `/${locale}`}${cleanPath}`;

  // hreflang only advertises the public locale (zh-TW). ko is an internal review
  // build (noindex) and is intentionally excluded from alternates.
  const zhUrl = `${SITE_URL}${cleanPath}`;
  const languages: Record<string, string> = {
    [localeMeta["zh-TW"].htmlLang]: zhUrl,
    "x-default": zhUrl,
  };

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
      images: [{ url: `${SITE_URL}/facility/og.jpg`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
    },
    // Public site (zh-TW) is indexable; ko is review-only → noindex.
    robots: isDefault
      ? { index: true, follow: true }
      : { index: false, follow: false },
  };
}
