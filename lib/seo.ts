import type { Metadata } from "next";
import { localeMeta, routing, type Locale } from "@/i18n/routing";
import { SITE_URL } from "./config";

/** Locale-native SEO keywords for dental medical-tourism search intent. */
const KEYWORDS: Record<Locale, string[]> = {
  "zh-TW": [
    "韓國牙齒美白",
    "冷光美白",
    "韓國牙齒貼片",
    "陶瓷貼片",
    "牙齒美白推薦",
    "韓星牙齒",
    "渡韓看牙",
    "韓國牙科",
    "台灣患者專屬",
    "江南牙科",
    "韓國牙齒矯正",
    "隱形矯正",
    "韓國植牙",
    "ONEDAY牙醫",
    "韓國oneday牙科",
  ],
  ko: [
    "치아미백",
    "라미네이트",
    "강남 라미네이트",
    "치아성형",
    "강남 치과",
    "원데이치과",
    "치아교정",
    "투명교정",
    "임플란트",
    "강남 임플란트",
    "T-Scan 교합",
  ],
};

const OG_TITLE: Record<Locale, string> = {
  "zh-TW":
    "韓國oneday牙科｜台灣患者專屬・韓國牙齒美白・陶瓷貼片｜首爾江南美學牙科",
  ko: "원데이치과｜라미네이트・치아미백, 당일 완성을 지향하는 강남 심미치과",
};

const OG_DESC: Record<Locale, string> = {
  "zh-TW":
    "專為台灣患者打造的韓國美學牙科。首爾江南牙齒美白、陶瓷貼片（Laminate）致力當日完成、當天返台。中文翻譯全程常駐、價格表透明公開（明確報價、現場不加價、無隱藏費用）。植牙・牙齒矯正亦一應俱全。韓國oneday牙科，江南新論峴。",
  ko: "라미네이트・치아미백 중심의 심미 치료를 디지털 정밀 진단으로 제공하는 강남 원데이치과. 자체 디지털 기공소(원랩)로 당일 완성을 지향하며, 임플란트・치아교정도 가능합니다.",
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
