// ============================================================
// 원데이치과 — 블로그 콘텐츠 로더 (SEO/AEO 인프라)
// content/blog/<locale>/<slug>.mdx 를 frontmatter + 본문으로 파싱한다.
// 서버 전용(fs). RSC/빌드 타임에서만 호출 — 클라이언트 import 금지.
//
// 왜 MDX인가: 긴 번체 본문 + 이미지 + Q&A + 백링크 위젯(<ChannelHub/>)을
// 한 파일에서 자유롭게 조판하기 위해. 발행 = .mdx 1개 추가 → 자동 색인.
// ============================================================

import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Locale } from "./types";

const CONTENT_ROOT = path.join(process.cwd(), "content", "blog");

/** 블로그 카테고리 — 시술 키워드 클러스터와 1:1 (식별력 = 韓國+시술). */
export type BlogCategory =
  | "guide" // 渡韓看牙 가이드 (정보탐색 핵심)
  | "laminate" // 陶瓷貼片
  | "whitening" // 牙齒美白
  | "implant" // 全口植牙
  | "crown" // 全瓷修復
  | "ortho"; // 牙齒矯正 (隱形矯正)

export interface BlogFaq {
  q: string;
  a: string;
}

export interface BlogFrontmatter {
  title: string;
  description: string;
  category: BlogCategory;
  keywords: string[];
  cover: string; // /blog/... (public 기준 절대경로)
  coverAlt: string;
  publishedAt: string; // YYYY-MM-DD
  updatedAt?: string; // YYYY-MM-DD
  author?: string;
  /** AEO 핵심 — FAQPage JSON-LD 로 방출되어 AI 검색/리치결과에 잡힌다. */
  faq?: BlogFaq[];
  /** 내부 상호링크 — 관련 시술 slug (clinic.treatments.slug). */
  relatedTreatments?: string[];
  /** 관련 블로그 slug (글↔글 내부링크). */
  relatedPosts?: string[];
  draft?: boolean;
}

export interface BlogPostMeta extends BlogFrontmatter {
  slug: string;
  readingMinutes: number;
}

export interface BlogPost extends BlogPostMeta {
  content: string; // raw MDX body
}

/** 繁中/CJK 기준 대략 분량 — 한자 300자/분. */
function estimateReadingMinutes(body: string): number {
  const chars = body.replace(/\s+/g, "").length;
  return Math.max(1, Math.round(chars / 300));
}

function localeDir(locale: Locale): string {
  return path.join(CONTENT_ROOT, locale);
}

/** 해당 locale 의 모든 slug (확장자 제거). 폴더 없으면 빈 배열. */
export function getPostSlugs(locale: Locale): string[] {
  const dir = localeDir(locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

/** 단일 글 로드. 없으면 null. */
export function getPostBySlug(locale: Locale, slug: string): BlogPost | null {
  const file = path.join(localeDir(locale), `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf-8");
  const { data, content } = matter(raw);
  const fm = data as BlogFrontmatter;

  // 발행 견고성 가드 — 새 글 frontmatter 오타(category/title/cover 누락·오기)가
  // 렌더 시점 TypeError 로 빌드 전체를 무너뜨리지 않도록, 잘못된 글은 건너뛴다.
  if (!fm.title || !fm.cover || !fm.category || !(fm.category in CATEGORY_LABEL)) {
    console.warn(
      `[blog] ${locale}/${slug}.mdx — 필수 frontmatter 누락/오류(title·cover·category). 목록에서 제외됨.`,
    );
    return null;
  }

  return {
    ...fm,
    slug,
    content,
    readingMinutes: estimateReadingMinutes(content),
  };
}

/** 목록용 메타만 (본문 제외) — publishedAt 내림차순. draft 제외. */
export function getAllPosts(locale: Locale): BlogPostMeta[] {
  return getPostSlugs(locale)
    .map((slug) => getPostBySlug(locale, slug))
    .filter((p): p is BlogPost => p !== null && !p.draft)
    .map(({ content: _content, ...meta }) => meta)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

/** generateStaticParams 용 — 전 locale × slug. */
export function getAllBlogParams(
  locales: readonly Locale[],
): { locale: Locale; slug: string }[] {
  return locales.flatMap((locale) =>
    getPostSlugs(locale).map((slug) => ({ locale, slug })),
  );
}

/** 카테고리 표시명 (繁中 / 한국어). */
export const CATEGORY_LABEL: Record<BlogCategory, Record<Locale, string>> = {
  guide: { "zh-TW": "渡韓看牙指南", ko: "도한 가이드" },
  laminate: { "zh-TW": "陶瓷貼片", ko: "라미네이트" },
  whitening: { "zh-TW": "牙齒美白", ko: "치아미백" },
  implant: { "zh-TW": "植牙", ko: "임플란트" },
  crown: { "zh-TW": "全瓷修復", ko: "크라운" },
  ortho: { "zh-TW": "牙齒矯正", ko: "치아교정" },
};
