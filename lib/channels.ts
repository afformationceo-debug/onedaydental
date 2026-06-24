// ============================================================
// 원데이치과 — 공식 채널 SSOT (백링크 상호강화)
// 블로그·푸터·구조화데이터(sameAs)가 모두 이 한 곳을 읽는다.
// 청담봄온 Linktree 패턴: 모든 채널이 서로를 임베딩해 도메인 신뢰를 상호강화.
// URL 은 거래처(원데이치과)가 직접 제공한 공식 링크 — 하드코딩 SSOT.
// ============================================================

export type ChannelId =
  | "website"
  | "line"
  | "instagram"
  | "littly"
  | "map-hall1"
  | "map-hall2"
  | "map-hall3";

export interface Channel {
  id: ChannelId;
  /** react-icons(si) 또는 lucide 식별자 — 렌더 측에서 매핑 */
  icon: "line" | "instagram" | "globe" | "link" | "map";
  label: string; // 繁中 표기
  sublabel?: string; // 보조 설명 (관 주소 등)
  href: string;
  /** 브랜드 컬러 (CTA 강조용) */
  color?: string;
  external: boolean;
}

/** 공식 홈페이지 (canonical) */
const WEBSITE_URL = "https://tw.onedaydent.com/";

/**
 * 공식 채널 전체 목록 — 표시 순서 = 전환 우선순위.
 * LINE(1순위 회수) → Instagram → Littly(허브) → 홈페이지 → 구글맵 3관.
 */
export const CHANNELS: Channel[] = [
  {
    id: "line",
    icon: "line",
    label: "官方 LINE",
    sublabel: "24H 即時諮詢・繁中客服",
    href: "https://lin.ee/ZpAIhzC",
    color: "#06C755",
    external: true,
  },
  {
    id: "instagram",
    icon: "instagram",
    label: "Instagram",
    sublabel: "@oneday_dental_kr",
    href: "https://www.instagram.com/oneday_dental_kr/",
    color: "#E1306C",
    external: true,
  },
  {
    id: "littly",
    icon: "link",
    label: "全部連結 Littly",
    sublabel: "所有官方連結一次擁有",
    href: "https://litt.ly/onedaydentaltw",
    color: "#134c67",
    external: true,
  },
  {
    id: "website",
    icon: "globe",
    label: "官方網站",
    sublabel: "tw.onedaydent.com",
    href: WEBSITE_URL,
    color: "#134c67",
    external: true,
  },
  {
    id: "map-hall1",
    icon: "map",
    label: "1館 Google Map",
    sublabel: "江南區奉恩寺路2巷31號 W大樓 3樓",
    href: "https://maps.app.goo.gl/Aj3NUyUPkgiA15udA",
    color: "#2dd4bf",
    external: true,
  },
  {
    id: "map-hall2",
    icon: "map",
    label: "2館 Google Map",
    sublabel: "江南大道438號 13樓",
    href: "https://maps.app.goo.gl/2rQDHq8LvBhuDUMT9",
    color: "#2dd4bf",
    external: true,
  },
  {
    id: "map-hall3",
    icon: "map",
    label: "3館 Google Map",
    sublabel: "江南大道442號 8樓",
    href: "https://maps.app.goo.gl/K7H5gNuTafr5h5D48",
    color: "#2dd4bf",
    external: true,
  },
];

/** 구조화데이터 sameAs 용 — 공식 소셜/허브 프로필 URL (지도 핀 제외). */
export const SAME_AS: string[] = CHANNELS.filter(
  (c) => c.id === "line" || c.id === "instagram" || c.id === "littly",
).map((c) => c.href);

export function getChannel(id: ChannelId): Channel | undefined {
  return CHANNELS.find((c) => c.id === id);
}
