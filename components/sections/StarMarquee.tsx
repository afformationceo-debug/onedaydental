import { getLocale, getTranslations } from "next-intl/server";
import { getClinic } from "@/lib/clinic";
import { tx } from "@/lib/i18n-text";
import { ArrowUpRight, Star } from "lucide-react";
import type { Locale } from "@/lib/types";

/**
 * 참여한 스타 이름 마퀴 — 임성훈 사진 마퀴(CelebrityStrip) 아래에 배치.
 * 실명+직업 칩이 자동으로 흐르고(right→left, track 8배 복제 → -50% seamless),
 * 클릭하면 해당 스타 페이지로 이동한다. (사용자 요청 — 이름만 나열, 누르면 사진)
 */
export default async function StarMarquee() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("reviews");
  const { reviews } = getClinic();
  const stars = reviews.filter((r) => r.starName);
  if (!stars.length) return null;

  // 칩 수가 적어 화면을 못 채우면 끊겨 보이므로 넉넉히 복제(짝수 → -50% seamless).
  const track = Array.from({ length: 8 }).flatMap(() => stars);

  return (
    <div className="mt-6">
      <p className="mb-3 px-5 text-center text-[12.5px] font-semibold text-ink-400 lg:px-0">
        {t("celebrityNote")}
      </p>
      <div className="group relative overflow-hidden py-1">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-surface-soft to-transparent lg:w-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-surface-soft to-transparent lg:w-20" />
        <ul className="flex w-max gap-3 px-3 [animation:marquee_45s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:[animation:none]">
          {track.map((r, i) => (
            <li key={i} aria-hidden={i >= stars.length}>
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={i >= stars.length ? -1 : 0}
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-ink-200 bg-surface px-4 py-2.5 shadow-sm transition hover:border-mint-400 hover:shadow-tech"
              >
                <Star className="size-3.5 shrink-0" style={{ fill: "#f59e0b", color: "#f59e0b" }} strokeWidth={0} />
                {r.starRole && (
                  <span className="text-[11.5px] font-medium text-ink-400">{tx(r.starRole, locale)}</span>
                )}
                <b className="text-[14px] font-bold text-ink-900">{tx(r.starName!, locale)}</b>
                <ArrowUpRight className="size-3.5 shrink-0 text-mint-500" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
