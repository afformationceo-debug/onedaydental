// ============================================================
// BlogCard — 블로그 목록 카드 (글↔홈 내부링크 신호)
// 기존 디자인 토큰(brand/mint/ink/surface) + tech 감성 일관 유지.
// ============================================================

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { CalendarDays, Clock, ArrowUpRight } from "lucide-react";
import { CATEGORY_LABEL, type BlogPostMeta } from "@/lib/blog";
import type { Locale } from "@/lib/types";
import { cn } from "@/lib/cn";

export default function BlogCard({
  post,
  locale,
  priority,
  featured,
}: {
  post: BlogPostMeta;
  locale: Locale;
  priority?: boolean;
  featured?: boolean;
}) {
  const readLabel = locale === "ko" ? "분" : "分鐘";
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-ink-100 bg-surface transition hover:-translate-y-0.5 hover:border-mint-400/50 hover:shadow-tech",
        featured && "sm:col-span-2 sm:flex-row",
      )}
    >
      <div
        className={cn(
          "relative aspect-[16/10] w-full overflow-hidden bg-surface-muted",
          featured && "sm:aspect-auto sm:w-[46%]",
        )}
      >
        <Image
          src={post.cover}
          alt={post.coverAlt}
          fill
          priority={priority}
          sizes={featured ? "(max-width:640px) 100vw, 46vw" : "(max-width:640px) 100vw, 33vw"}
          className="object-cover transition duration-500 group-hover:scale-[1.04]"
        />
        <span className="absolute left-3 top-3 rounded-md bg-brand-950/85 px-2.5 py-1 text-[11px] font-bold text-mint-300 backdrop-blur">
          {CATEGORY_LABEL[post.category][locale]}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="font-display text-[16px] font-bold leading-snug text-ink-900 transition group-hover:text-brand-700 sm:text-[17px]">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-ink-500">
          {post.description}
        </p>
        <div className="mt-auto flex items-center gap-3 pt-4 font-mono text-[11px] text-ink-400">
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="size-3.5" /> {post.publishedAt}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3.5" /> {post.readingMinutes} {readLabel}
          </span>
          <ArrowUpRight className="ml-auto size-4 text-ink-300 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-mint-500" />
        </div>
      </div>
    </Link>
  );
}
